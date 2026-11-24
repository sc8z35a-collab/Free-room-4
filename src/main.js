import { enterAutoFullscreenLandscape } from './playerShell.js';

const menuHub = document.getElementById('menu-hub');
const cinemaStage = document.getElementById('cinema-stage');
const stageLoader = document.getElementById('stage-loader');
const loaderText = document.getElementById('loader-text');
const btnLaunchCh04 = document.getElementById('btn-launch-ch04');
const btnLaunchHmd = document.getElementById('btn-launch-hmd');
const btnLaunchVoxel = document.getElementById('btn-launch-voxel');
const themeMeta = document.querySelector('meta[name="theme-color"]');

let activeSession = null;
let launching = false;

function returnToMainMenuHub() {
  if (activeSession) {
    try {
      activeSession.dispose();
    } catch (err) {
      console.warn('Session dispose error:', err);
    }
    activeSession = null;
  }
  stageLoader?.classList.remove('visible');
  cinemaStage.hidden = true;
  menuHub.hidden = false;
  document.body.className = 'hub-active';
  if (themeMeta) themeMeta.setAttribute('content', '#ffffff');
}

async function launchFilm(kind, { initialTime = 0, startPaused = false, fromUserGesture = false } = {}) {
  if (launching) return;
  launching = true;

  if (fromUserGesture) {
    enterAutoFullscreenLandscape().catch(() => {});
  }

  if (activeSession) {
    try {
      activeSession.dispose();
    } catch {}
    activeSession = null;
  }

  menuHub.hidden = true;
  cinemaStage.hidden = false;
  document.body.className = 'stage-active';
  if (themeMeta) themeMeta.setAttribute('content', '#040508');

  if (loaderText) {
    loaderText.textContent =
      kind === 'ch04'
        ? '極限リアル3D『第4章：線形代数の復習と、逆運動学の暴走（02:30）』を構築中…'
        : kind === 'hmd'
        ? '極限リアル3D『HMD-01 開発記 第1章・第2章（10:00）』を構築中…'
        : '物理破壊ボクセル3D『天地綻びのクロニクル（05:00）』を構築中…';
  }
  stageLoader?.classList.add('visible');

  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  try {
    if (kind === 'ch04') {
      const { mountCh04Film } = await import('./real/ch04/realCh04Film.js');
      activeSession = mountCh04Film({
        initialTime,
        startPaused,
        onReturnHub: returnToMainMenuHub,
      });
    } else if (kind === 'hmd') {
      const { mountRealFilm } = await import('./real/realFilm.js');
      activeSession = mountRealFilm({
        initialTime,
        startPaused,
        onReturnHub: returnToMainMenuHub,
      });
    } else {
      const { mountVoxelFilm } = await import('./voxelFilm.js');
      activeSession = mountVoxelFilm({
        initialTime,
        startPaused,
        onReturnHub: returnToMainMenuHub,
      });
    }
  } catch (err) {
    console.error('Failed to mount 3D film:', err);
    returnToMainMenuHub();
  } finally {
    stageLoader?.classList.remove('visible');
    launching = false;
  }
}

btnLaunchCh04?.addEventListener('click', () => {
  launchFilm('ch04', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchHmd?.addEventListener('click', () => {
  launchFilm('hmd', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchVoxel?.addEventListener('click', () => {
  launchFilm('voxel', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

// Deep-link query params (?film=ch04|hmd|voxel&t=...&paused=1)
const params = new URLSearchParams(window.location.search);
const queryFilm = params.get('film');
if (queryFilm === 'ch04' || queryFilm === 'hmd' || queryFilm === 'voxel') {
  const initialTime = Math.max(0, Number(params.get('t') || 0));
  const startPaused = params.get('paused') === '1';
  launchFilm(queryFilm, { initialTime, startPaused, fromUserGesture: false });
}
