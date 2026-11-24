import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createMaterialLibrary } from './textures.js';
import { createSkyDome } from './shaders.js';
import { createVoxelWorld } from './world.js';
import {
  createTractorTT,
  createCreatorRiu,
  createLilithFirst,
  createLilithLegion,
  createJosephJoestar,
  createShijoKiraku,
  createWolfMaakiRings,
  createMomongaFlagship,
} from './characters.js';
import { createVFXSystem } from './vfx.js';
import { CinemaAudioEngine } from './audio.js';
import {
  FusedKawaseCinemaPipeline,
  SmartShadowDirector,
  PIDDynamicResolutionController,
} from './optimizer.js';
import {
  FILM_DURATION,
  CHAPTERS,
  getChapterForTime,
  getSubtitleForTime,
  getCutinForTime,
  evaluateDirector,
} from './timeline.js';

// --- URL Query Parameters for Verification & Instant Timestamp Jump ---
const urlParams = new URLSearchParams(window.location.search);
const initialTime = Math.max(0, Math.min(FILM_DURATION, parseFloat(urlParams.get('t') || '0') || 0));
const skipIntro = urlParams.get('noIntro') === '1' || urlParams.has('t');
const startPaused = urlParams.get('paused') === '1';

// --- Minimal DOM References ---
const canvas = document.getElementById('cinema-canvas');
const introOverlay = document.getElementById('intro-overlay');
const btnStartFilm = document.getElementById('btn-start-film');
const tbcOverlay = document.getElementById('tbc-overlay');
const finOverlay = document.getElementById('fin-overlay');
const btnReplay = document.getElementById('btn-replay');
const btnForceLandscape = document.getElementById('btn-force-landscape');

const cutinLayer = document.getElementById('cutin-layer');
const cutinKicker = document.getElementById('cutin-kicker');
const cutinMain = document.getElementById('cutin-main');
const cutinSub = document.getElementById('cutin-sub');

const subtitleWrap = document.getElementById('subtitle-wrap');
const subtitleSpeaker = document.getElementById('subtitle-speaker');
const subtitleText = document.getElementById('subtitle-text');

const scrubChapter = document.getElementById('scrub-chapter');
const timecodeEl = document.getElementById('timecode');
const timelineTrack = document.getElementById('timeline-track');
const timelineFill = document.getElementById('timeline-fill');
const timelineChapters = document.getElementById('timeline-chapters');
const timelineThumb = document.getElementById('timeline-thumb');
const timelineTooltip = document.getElementById('timeline-tooltip');

const btnPlay = document.getElementById('btn-play');
const btnCamMode = document.getElementById('btn-cam-mode');
const btnMute = document.getElementById('btn-mute');
const btnRecord = document.getElementById('btn-record');
const btnFullscreen = document.getElementById('btn-fullscreen');

// --- Auto-Fullscreen & Mobile Landscape Orientation Lock ---
const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
let autoFsAttempted = false;

async function enterAutoFullscreenLandscape() {
  const el = document.documentElement;
  try {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (el.requestFullscreen) {
        await el.requestFullscreen({ navigationUI: 'hide' });
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    }
  } catch {
    // Some embedded iframes or non-gesture calls disallow fullscreen; continue gracefully edge-to-edge!
  }
  try {
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock('landscape');
    }
  } catch {
    // Orientation lock may require installed PWA or supported mobile browser
  }
}

// Attempt automatic fullscreen immediately where browser policy permits (e.g., kiosk/PWA)
if (!skipIntro) {
  enterAutoFullscreenLandscape().catch(() => {});
}

// --- Ultra-Optimized WebGL2 Renderer & Scene ---
const maxDpr = isMobile ? 1.5 : Math.min(window.devicePixelRatio || 1, 2);
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false, // Post-FX Fused Pipeline handles smooth edges + CAS sharpening at 2x lower memory/fill!
  powerPreference: 'high-performance',
  preserveDrawingBuffer: true,
});
renderer.setPixelRatio(maxDpr);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const fog = new THREE.FogExp2(0xf6bb7c, 0.002);
scene.fog = fog;

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.4, 920);
camera.position.set(32, 16, 86);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.maxPolarAngle = Math.PI * 0.49;
controls.minDistance = 4;
controls.maxDistance = 260;
controls.enabled = false;

// --- Lighting + Invention #5: SmartShadowDirector (1024x1024 Tight Focused Frustum + Temporal Cache) ---
const hemiLight = new THREE.HemisphereLight(0xcde8ff, 0x3b4832, 0.9);
scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xfff2d6, 2.35);
sunLight.position.set(68, 86, -76);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(1024, 1024); // Tighter 68m frustum -> higher texel density at 4x fewer shadow pixels!
sunLight.shadow.camera.near = 10;
sunLight.shadow.camera.far = 260;
const shadowBounds = 72;
sunLight.shadow.camera.left = -shadowBounds;
sunLight.shadow.camera.right = shadowBounds;
sunLight.shadow.camera.top = shadowBounds;
sunLight.shadow.camera.bottom = -shadowBounds;
sunLight.shadow.bias = -0.0007;
scene.add(sunLight);
scene.add(sunLight.target);

const shadowDirector = new SmartShadowDirector(renderer, sunLight);

const actionLight = new THREE.PointLight(0xff8833, 60, 145, 1.4);
actionLight.position.set(0, 18, 0);
scene.add(actionLight);

// --- Shared GPU Uniform for Invention #1 (Zero-CPU GPU Analytic Kinematics!) ---
const sharedTimeUniform = { value: initialTime };

const sky = createSkyDome();
scene.add(sky.mesh);

const mats = createMaterialLibrary();
const world = createVoxelWorld(scene, mats, sharedTimeUniform);

const actors = {
  tt: createTractorTT(mats),
  riu: createCreatorRiu(mats),
  lilith: createLilithFirst(mats),
  legion: createLilithLegion(scene, mats, 22),
  joseph: createJosephJoestar(mats),
  kiraku: createShijoKiraku(mats),
  wolf: createWolfMaakiRings(mats),
  momongaShip: createMomongaFlagship(mats),
};
scene.add(
  actors.tt.root,
  actors.riu.root,
  actors.lilith.root,
  actors.joseph.root,
  actors.kiraku.root,
  actors.wolf.root,
  actors.momongaShip.root
);

const vfx = createVFXSystem(scene, mats, sharedTimeUniform);
const audio = new CinemaAudioEngine();

const env = { skyUniforms: sky.uniforms, fog, sunLight, hemiLight, actionLight };

// --- Invention #4 & #6: Fused 4-Pass Dual-Kawase Bloom + CAS Pipeline + PID Dynamic Resolution ---
const pipeline = new FusedKawaseCinemaPipeline(
  renderer,
  Math.floor(window.innerWidth * maxDpr),
  Math.floor(window.innerHeight * maxDpr)
);
const drs = new PIDDynamicResolutionController(pipeline, {
  minScale: isMobile ? 0.68 : 0.82,
  maxScale: 1.0,
  targetMs: 15.8,
});

// --- Playback & Minimalist HUD State ---
let currentTime = initialTime;
let isPlaying = false;
let needsRender = true;
const camModes = ['CINEMA', 'FREE ORBIT', 'FOLLOW'];
let camModeIdx = 0;
let lastChapterId = -1;
let idleTimer = null;
let lastFxState = {
  time: 0,
  bloomStrength: 0.28,
  chromatic: 0,
  speedLines: 0,
  flash: 0,
  invert: 0,
  warmth: 0.14,
};

// Populate subtle 1px chapter tick marks along hairline scrubber
for (const ch of CHAPTERS) {
  if (ch.start > 0) {
    const tick = document.createElement('div');
    tick.className = 'chapter-tick';
    tick.style.left = `${(ch.start / FILM_DURATION) * 100}%`;
    timelineChapters.appendChild(tick);
  }
}

function formatMMSS(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function setPlaying(playing) {
  isPlaying = playing;
  btnPlay.textContent = playing ? '⏸' : '▶';
  if (playing) {
    audio.init();
    if (currentTime >= FILM_DURATION - 0.1) {
      currentTime = 0;
      audio.resetTimeline(0);
    }
    finOverlay.classList.remove('visible');
    pokeUI(1600);
  } else {
    document.body.classList.remove('ui-idle');
  }
}

function seekTo(sec) {
  currentTime = Math.max(0, Math.min(FILM_DURATION, sec));
  audio.resetTimeline(currentTime);
  updateSceneAt(currentTime, true);
}

function pokeUI(delay = 2000) {
  document.body.classList.remove('ui-idle');
  clearTimeout(idleTimer);
  if (isPlaying && camModes[camModeIdx] === 'CINEMA') {
    idleTimer = setTimeout(() => {
      if (isPlaying) document.body.classList.add('ui-idle');
    }, delay);
  }
}

window.addEventListener('pointermove', () => pokeUI(2000));
window.addEventListener('pointerdown', (e) => {
  // Automatically trigger fullscreen + mobile landscape on the very first gesture!
  if (!autoFsAttempted && !skipIntro) {
    autoFsAttempted = true;
    enterAutoFullscreenLandscape().catch(() => {});
  }
  if (e.target === canvas && introOverlay.classList.contains('hidden')) {
    if (document.body.classList.contains('ui-idle')) pokeUI(2400);
    else if (isPlaying && camModes[camModeIdx] === 'CINEMA') document.body.classList.add('ui-idle');
  } else {
    pokeUI(2400);
  }
});

// --- Start, Rotate & Replay Triggers ---
btnStartFilm.addEventListener('click', () => {
  autoFsAttempted = true;
  enterAutoFullscreenLandscape().catch(() => {});
  introOverlay.classList.add('hidden');
  audio.init();
  seekTo(0);
  setPlaying(true);
});

btnForceLandscape?.addEventListener('click', () => {
  enterAutoFullscreenLandscape().catch(() => {});
  if (!introOverlay.classList.contains('hidden')) {
    introOverlay.classList.add('hidden');
    audio.init();
    seekTo(0);
    setPlaying(true);
  }
});

btnReplay.addEventListener('click', () => {
  finOverlay.classList.remove('visible');
  seekTo(0);
  setPlaying(true);
});

btnPlay.addEventListener('click', () => {
  if (!introOverlay.classList.contains('hidden')) introOverlay.classList.add('hidden');
  setPlaying(!isPlaying);
});

// --- Razor-Thin Timeline Scrubbing ---
let scrubbing = false;
function timeFromPointer(clientX) {
  const rect = timelineTrack.getBoundingClientRect();
  const frac = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  return frac * FILM_DURATION;
}
timelineTrack.addEventListener('pointerdown', (e) => {
  scrubbing = true;
  timelineTrack.setPointerCapture(e.pointerId);
  seekTo(timeFromPointer(e.clientX));
});
timelineTrack.addEventListener('pointermove', (e) => {
  const hoverT = timeFromPointer(e.clientX);
  const ch = getChapterForTime(hoverT);
  timelineTooltip.style.left = `${(hoverT / FILM_DURATION) * 100}%`;
  timelineTooltip.textContent = `${formatMMSS(hoverT)} · ${ch.jp}`;
  if (scrubbing) seekTo(hoverT);
});
timelineTrack.addEventListener('pointerup', () => { scrubbing = false; });

// --- Minimalist Ghost Corner Buttons ---
function setCameraMode(idx) {
  camModeIdx = idx % camModes.length;
  const mode = camModes[camModeIdx];
  btnCamMode.classList.toggle('active', mode !== 'CINEMA');
  btnCamMode.title = `カメラ: ${mode} (C)`;
  controls.enabled = mode !== 'CINEMA';
  if (mode === 'FREE ORBIT') document.body.classList.remove('ui-idle');
}
btnCamMode.addEventListener('click', () => setCameraMode(camModeIdx + 1));

btnMute.addEventListener('click', () => {
  audio.setMuted(!audio.muted);
  btnMute.textContent = audio.muted ? '🔇' : '🔊';
});

btnFullscreen.addEventListener('click', () => {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    enterAutoFullscreenLandscape().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
});

// --- 1-Click 60fps WebM Video + Audio Recorder ---
let mediaRecorder = null;
let recordedChunks = [];
btnRecord.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    return;
  }
  audio.init();
  try {
    const videoStream = canvas.captureStream(60);
    const tracks = [...videoStream.getVideoTracks()];
    const audioStream = audio.getAudioStream();
    if (audioStream) tracks.push(...audioStream.getAudioTracks());
    const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus' : 'video/webm';
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(new MediaStream(tracks), { mimeType: mime, videoBitsPerSecond: 12_000_000 });
    mediaRecorder.ondataavailable = (ev) => { if (ev.data?.size > 0) recordedChunks.push(ev.data); };
    mediaRecorder.onstop = () => {
      btnRecord.classList.remove('recording');
      const url = URL.createObjectURL(new Blob(recordedChunks, { type: mime }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `chronicle_of_hokorobi_5min_${Date.now()}.webm`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    };
    mediaRecorder.start(200);
    btnRecord.classList.add('recording');
    if (!isPlaying) {
      introOverlay.classList.add('hidden');
      setPlaying(true);
    }
  } catch (err) {
    console.warn('Recorder unavailable:', err);
  }
});

// --- Keyboard Shortcuts ---
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (!introOverlay.classList.contains('hidden')) {
      btnStartFilm.click();
    } else {
      setPlaying(!isPlaying);
    }
  } else if (e.key === 'c' || e.key === 'C') setCameraMode(camModeIdx + 1);
  else if (e.key === 'm' || e.key === 'M') btnMute.click();
  else if (e.key === 'f' || e.key === 'F') btnFullscreen.click();
  else if (e.key === 'ArrowRight') seekTo(currentTime + 5);
  else if (e.key === 'ArrowLeft') seekTo(currentTime - 5);
  else if (e.key >= '1' && e.key <= '9') {
    const ch = CHAPTERS[Number(e.key) - 1];
    if (ch) seekTo(ch.start + 0.05);
  }
});

// --- Responsive Resize & Mobile Orientation Change ---
function handleResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h);
  camera.aspect = w / h;
  // Slightly wider automatic FOV in ultra-wide mobile landscape (20:9) so tall heroes never crop!
  camera.updateProjectionMatrix();
  pipeline.setSize(Math.floor(w * dpr), Math.floor(h * dpr), drs.currentScale);
  needsRender = true;
}
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', () => setTimeout(handleResize, 120));
controls.addEventListener('change', () => { needsRender = true; });

// --- Deterministic World + HUD + Shadow Update ---
function updateSceneAt(t, forceShadow = false) {
  sharedTimeUniform.value = t;
  const state = evaluateDirector(t, actors, env);
  const ch = getChapterForTime(t);

  // Invention #5: Smart Focused Shadow Refresh
  shadowDirector.update(t, state.focusX, state.focusZ, ch.id, forceShadow);

  world.update(t, state);
  vfx.update(t, state);

  // Camera
  const mode = camModes[camModeIdx];
  if (mode === 'CINEMA') {
    const shakeX = state.shake > 0 ? Math.sin(t * 73.1) * state.shake * 0.6 : 0;
    const shakeY = state.shake > 0 ? Math.cos(t * 61.7) * state.shake * 0.6 : 0;
    camera.position.set(state.camPos.x + shakeX, Math.max(1.2, state.camPos.y + shakeY), state.camPos.z);
    camera.lookAt(state.camTarget);
    // Automatic aspect compensation for ultra-wide 20:9 smartphones so framing matches 16:9 cinema!
    const aspectBoost = camera.aspect > 1.9 ? (camera.aspect - 1.78) * 6.5 : 0;
    const targetFov = state.camFov + aspectBoost;
    if (Math.abs(camera.fov - targetFov) > 0.05) {
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
    }
  } else if (mode === 'FOLLOW') {
    controls.target.lerp(state.heroFollowPos, 0.14);
    controls.update();
  } else {
    controls.update();
  }

  lastFxState = {
    time: t,
    bloomStrength: state.bloomStrength,
    chromatic: state.chromatic,
    speedLines: state.speedLines,
    flash: state.flash,
    invert: state.invert,
    warmth: state.warmth,
  };

  document.body.classList.toggle('drama-bars', state.dramaBars);

  const pct = (t / FILM_DURATION) * 100;
  timelineFill.style.width = `${pct}%`;
  timelineThumb.style.left = `${pct}%`;
  timecodeEl.textContent = `${formatMMSS(t)} / 05:00`;

  if (ch.id !== lastChapterId) {
    lastChapterId = ch.id;
    scrubChapter.textContent = `${String(ch.id).padStart(2, '0')} · ${ch.jp}`;
  }

  const sub = getSubtitleForTime(t);
  if (sub) {
    subtitleSpeaker.textContent = sub.speaker || '';
    subtitleText.textContent = sub.text;
    subtitleText.classList.toggle('shout', !!sub.shout);
    subtitleWrap.classList.add('visible');
  } else {
    subtitleWrap.classList.remove('visible');
  }

  const cut = getCutinForTime(t);
  if (cut) {
    cutinKicker.textContent = cut.kicker;
    cutinMain.textContent = cut.main;
    cutinSub.textContent = cut.sub;
    cutinLayer.className = `visible ${cut.style || ''}`.trim();
  } else {
    cutinLayer.className = '';
  }

  tbcOverlay.classList.toggle('visible', state.tbcFakeout);
  finOverlay.classList.toggle('visible', state.finalEnd);
  needsRender = true;
}

// --- Debug & Telemetry Hook for Visual QA & Performance Benchmarking ---
window.__CINEMA__ = {
  seek: (sec, showHud = false, syncGpu = false) => {
    introOverlay.classList.add('hidden');
    document.body.classList.toggle('ui-idle', !showHud);
    isPlaying = false;
    currentTime = Math.max(0, Math.min(FILM_DURATION, sec));
    updateSceneAt(currentTime, true);
    pipeline.render(scene, camera, lastFxState);
    if (syncGpu) renderer.getContext().finish();
    needsRender = false;
  },
  getTime: () => currentTime,
  stats: () => ({
    sceneDrawCalls: pipeline.lastSceneCalls || 0,
    totalDrawCalls: pipeline.lastTotalCalls || 0,
    triangles: pipeline.lastSceneTriangles || 0,
    geometries: renderer.info.memory.geometries,
    textures: renderer.info.memory.textures,
    renderScale: drs.currentScale,
    pipelinePasses: 4,
  }),
};

// --- Startup ---
document.body.classList.add('ui-idle');
if (skipIntro) {
  introOverlay.classList.add('hidden');
  if (!startPaused) {
    isPlaying = true;
    btnPlay.textContent = '⏸';
  }
}
updateSceneAt(currentTime, true);

// --- 60fps Main Animation Loop with Closed-Loop PID DRS ---
let prevNow = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, (now - prevNow) / 1000);
  prevNow = now;

  if (isPlaying && !scrubbing) {
    currentTime += dt;
    if (currentTime >= FILM_DURATION) {
      currentTime = FILM_DURATION;
      setPlaying(false);
    }
    audio.update(currentTime, isPlaying);
    updateSceneAt(currentTime, false);
  } else if (camModes[camModeIdx] !== 'CINEMA') {
    if (controls.update()) needsRender = true;
  }

  if (isPlaying || needsRender) {
    const r0 = performance.now();
    pipeline.render(scene, camera, lastFxState);
    const frameMs = performance.now() - r0;
    if (isPlaying) {
      const dpr = renderer.getPixelRatio();
      drs.sample(frameMs, Math.floor(window.innerWidth * dpr), Math.floor(window.innerHeight * dpr));
    }
    needsRender = false;
  }
}
requestAnimationFrame(animate);
