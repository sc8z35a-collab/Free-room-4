export async function enterAutoFullscreenLandscape() {
  const el = document.documentElement;
  try {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (el.requestFullscreen) {
        await el.requestFullscreen({ navigationUI: 'hide' });
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    }
  } catch {}
  try {
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock('landscape');
    }
  } catch {}
}

export function formatMMSS(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Shared Minimalist Cinema Stage Controller for both 3D films.
 * Manages fresh canvas lifecycle, timeline scrubbing, auto-vanishing HUD,
 * 60fps WebM recording, keyboard shortcuts, and clean teardown back to the Hub.
 */
export function createStageSession({
  duration,
  chapters,
  getChapterForTime,
  onReturnHub,
  widescreen = false,
  finLabel = '完',
  finSub = '',
  downloadPrefix = 'cinema_3d',
}) {
  const ac = new AbortController();
  const sig = { signal: ac.signal };

  const canvasHost = document.getElementById('canvas-host');
  canvasHost.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.id = 'cinema-canvas';
  canvasHost.appendChild(canvas);

  const simlogOverlay = document.getElementById('simlog-overlay');
  const simlogTag = document.getElementById('simlog-tag');
  const simlogTitle = document.getElementById('simlog-title');
  const simlogDetail = document.getElementById('simlog-detail');

  const cutinLayer = document.getElementById('cutin-layer');
  const cutinKicker = document.getElementById('cutin-kicker');
  const cutinMain = document.getElementById('cutin-main');
  const cutinSub = document.getElementById('cutin-sub');

  const subtitleWrap = document.getElementById('subtitle-wrap');
  const subtitleSpeaker = document.getElementById('subtitle-speaker');
  const subtitleText = document.getElementById('subtitle-text');

  const tbcOverlay = document.getElementById('tbc-overlay');
  const finOverlay = document.getElementById('fin-overlay');
  const finMarkEl = document.getElementById('fin-mark');
  const finSubEl = document.getElementById('fin-sub');

  const scrubChapter = document.getElementById('scrub-chapter');
  const timecodeEl = document.getElementById('timecode');
  const timelineTrack = document.getElementById('timeline-track');
  const timelineFill = document.getElementById('timeline-fill');
  const timelineChapters = document.getElementById('timeline-chapters');
  const timelineThumb = document.getElementById('timeline-thumb');
  const timelineTooltip = document.getElementById('timeline-tooltip');

  const btnBackHub = document.getElementById('btn-back-hub');
  const btnPlay = document.getElementById('btn-play');
  const btnCamMode = document.getElementById('btn-cam-mode');
  const btnMute = document.getElementById('btn-mute');
  const btnRecord = document.getElementById('btn-record');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const btnReplay = document.getElementById('btn-replay');
  const btnFinHub = document.getElementById('btn-fin-hub');
  const btnForceLandscape = document.getElementById('btn-force-landscape');

  // Reset DOM overlays cleanly
  finMarkEl.textContent = finLabel;
  finSubEl.textContent = finSub;
  finOverlay.classList.remove('visible');
  tbcOverlay.classList.remove('visible');
  simlogOverlay.classList.remove('visible');
  cutinLayer.className = '';
  subtitleWrap.classList.remove('visible');
  document.body.classList.toggle('cinema-widescreen', widescreen);
  document.body.classList.remove('drama-bars');

  timelineTrack.setAttribute('aria-valuemax', String(duration));
  timelineChapters.innerHTML = '';
  for (const ch of chapters) {
    if (ch.start > 0) {
      const tick = document.createElement('div');
      tick.className = 'chapter-tick';
      tick.style.left = `${(ch.start / duration) * 100}%`;
      timelineChapters.appendChild(tick);
    }
  }

  let idleTimer = null;
  let scrubbing = false;
  let lastChapterId = -1;
  let mediaRecorder = null;
  let recordedChunks = [];

  const durationStr = formatMMSS(duration);

  const hooks = {
    isPlaying: () => false,
    setPlaying: () => {},
    seekTo: () => {},
    getTime: () => 0,
    cycleCameraMode: () => 'CINEMA',
    getCameraMode: () => 'CINEMA',
    toggleMute: () => false,
    getAudioStream: () => null,
    initAudio: () => {},
  };

  function pokeUI(delay = 3200) {
    document.body.classList.remove('ui-idle');
    clearTimeout(idleTimer);
    if (hooks.isPlaying() && hooks.getCameraMode() === 'CINEMA') {
      idleTimer = setTimeout(() => {
        if (hooks.isPlaying()) document.body.classList.add('ui-idle');
      }, delay);
    }
  }

  window.addEventListener('pointermove', () => pokeUI(3200), sig);
  window.addEventListener('pointerdown', (e) => {
    if (e.target === canvas) {
      if (document.body.classList.contains('ui-idle')) pokeUI(3200);
      else if (hooks.isPlaying() && hooks.getCameraMode() === 'CINEMA') {
        clearTimeout(idleTimer);
        document.body.classList.add('ui-idle');
      }
    } else {
      pokeUI(3200);
    }
  }, sig);

  btnBackHub.addEventListener('click', () => onReturnHub?.(), sig);
  btnFinHub.addEventListener('click', () => onReturnHub?.(), sig);

  btnPlay.addEventListener('click', () => {
    hooks.setPlaying(!hooks.isPlaying());
  }, sig);

  btnReplay.addEventListener('click', () => {
    finOverlay.classList.remove('visible');
    hooks.seekTo(0);
    hooks.setPlaying(true);
  }, sig);

  btnCamMode.addEventListener('click', () => {
    const mode = hooks.cycleCameraMode();
    btnCamMode.classList.toggle('active', mode !== 'CINEMA');
    btnCamMode.title = `カメラ: ${mode} (C)`;
    if (mode !== 'CINEMA') {
      clearTimeout(idleTimer);
      document.body.classList.remove('ui-idle');
    }
  }, sig);

  btnMute.addEventListener('click', () => {
    const muted = hooks.toggleMute();
    btnMute.textContent = muted ? '🔇' : '🔊';
  }, sig);

  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      enterAutoFullscreenLandscape().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, sig);

  btnForceLandscape?.addEventListener('click', () => {
    enterAutoFullscreenLandscape().catch(() => {});
  }, sig);

  // Scrubber
  function timeFromPointer(clientX) {
    const rect = timelineTrack.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (clientX - rect.left) / Math.max(1, rect.width)));
    return frac * duration;
  }
  timelineTrack.addEventListener('pointerdown', (e) => {
    scrubbing = true;
    timelineTrack.setPointerCapture(e.pointerId);
    hooks.seekTo(timeFromPointer(e.clientX));
  }, sig);
  timelineTrack.addEventListener('pointermove', (e) => {
    const hoverT = timeFromPointer(e.clientX);
    const ch = getChapterForTime(hoverT);
    timelineTooltip.style.left = `${(hoverT / duration) * 100}%`;
    timelineTooltip.textContent = `${formatMMSS(hoverT)} · ${ch.jp}`;
    if (scrubbing) hooks.seekTo(hoverT);
  }, sig);
  timelineTrack.addEventListener('pointerup', () => { scrubbing = false; }, sig);

  // 60fps WebM Recorder
  btnRecord.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      return;
    }
    hooks.initAudio();
    try {
      const videoStream = canvas.captureStream(60);
      const tracks = [...videoStream.getVideoTracks()];
      const audioStream = hooks.getAudioStream();
      if (audioStream) tracks.push(...audioStream.getAudioTracks());
      const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
        ? 'video/webm;codecs=vp9,opus'
        : 'video/webm';
      recordedChunks = [];
      mediaRecorder = new MediaRecorder(new MediaStream(tracks), { mimeType: mime, videoBitsPerSecond: 12_000_000 });
      mediaRecorder.ondataavailable = (ev) => { if (ev.data?.size > 0) recordedChunks.push(ev.data); };
      mediaRecorder.onstop = () => {
        btnRecord.classList.remove('recording');
        const url = URL.createObjectURL(new Blob(recordedChunks, { type: mime }));
        const a = document.createElement('a');
        a.href = url;
        a.download = `${downloadPrefix}_${Date.now()}.webm`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
      };
      mediaRecorder.start(200);
      btnRecord.classList.add('recording');
      if (!hooks.isPlaying()) hooks.setPlaying(true);
    } catch (err) {
      console.warn('Recorder unavailable:', err);
    }
  }, sig);

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      hooks.setPlaying(!hooks.isPlaying());
    } else if (e.key === 'Escape') {
      onReturnHub?.();
    } else if (e.key === 'c' || e.key === 'C') {
      btnCamMode.click();
    } else if (e.key === 'm' || e.key === 'M') {
      btnMute.click();
    } else if (e.key === 'f' || e.key === 'F') {
      btnFullscreen.click();
    } else if (e.key === 'ArrowRight') {
      hooks.seekTo(hooks.getTime() + 5);
    } else if (e.key === 'ArrowLeft') {
      hooks.seekTo(hooks.getTime() - 5);
    } else if (e.key >= '1' && e.key <= '9') {
      const ch = chapters[Number(e.key) - 1];
      if (ch) hooks.seekTo(ch.start + 0.05);
    }
  }, sig);

  function updateHUD({ t, subtitle, cutin, simlog, dramaBars = false, tbc = false, fin = false }) {
    document.body.classList.toggle('drama-bars', dramaBars);

    const pct = (t / duration) * 100;
    timelineFill.style.width = `${pct}%`;
    timelineThumb.style.left = `${pct}%`;
    timecodeEl.textContent = `${formatMMSS(t)} / ${durationStr}`;

    const ch = getChapterForTime(t);
    if (ch.id !== lastChapterId) {
      lastChapterId = ch.id;
      scrubChapter.textContent = `${String(ch.id).padStart(2, '0')} · ${ch.jp}`;
    }

    if (subtitle) {
      subtitleSpeaker.textContent = subtitle.speaker || '';
      subtitleText.textContent = subtitle.text;
      subtitleText.classList.toggle('shout', !!subtitle.shout);
      subtitleWrap.classList.add('visible');
    } else {
      subtitleWrap.classList.remove('visible');
    }

    if (cutin) {
      cutinKicker.textContent = cutin.kicker || '';
      cutinMain.textContent = cutin.main || '';
      cutinSub.textContent = cutin.sub || '';
      cutinLayer.className = `visible ${cutin.style || ''}`.trim();
    } else {
      cutinLayer.className = '';
    }

    if (simlog) {
      simlogTag.textContent = simlog.tag || '';
      simlogTitle.textContent = simlog.title || '';
      simlogDetail.textContent = simlog.detail || '';
      simlogOverlay.classList.add('visible');
    } else {
      simlogOverlay.classList.remove('visible');
    }

    tbcOverlay.classList.toggle('visible', !!tbc);
    finOverlay.classList.toggle('visible', !!fin);
  }

  function syncPlayIcon(playing) {
    btnPlay.textContent = playing ? '⏸' : '▶';
    if (playing) {
      finOverlay.classList.remove('visible');
      pokeUI(2800);
    } else {
      clearTimeout(idleTimer);
      document.body.classList.remove('ui-idle');
    }
  }

  function dispose() {
    clearTimeout(idleTimer);
    ac.abort();
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      try { mediaRecorder.stop(); } catch {}
    }
    simlogOverlay.classList.remove('visible');
    cutinLayer.className = '';
    subtitleWrap.classList.remove('visible');
    tbcOverlay.classList.remove('visible');
    finOverlay.classList.remove('visible');
    btnCamMode.classList.remove('active');
    btnMute.textContent = '🔊';
    canvasHost.innerHTML = '';
  }

  return {
    canvas,
    sig,
    hooks,
    isScrubbing: () => scrubbing,
    updateHUD,
    syncPlayIcon,
    pokeUI,
    dispose,
  };
}
