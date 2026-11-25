import { enterAutoFullscreenLandscape } from './playerShell.js';

const menuHub = document.getElementById('menu-hub');
const cinemaStage = document.getElementById('cinema-stage');
const stageLoader = document.getElementById('stage-loader');
const loaderText = document.getElementById('loader-text');
const btnLaunchCh20 = document.getElementById('btn-launch-ch20');
const btnLaunchCh19 = document.getElementById('btn-launch-ch19');
const btnLaunchCh18 = document.getElementById('btn-launch-ch18');
const btnLaunchCh17 = document.getElementById('btn-launch-ch17');
const btnLaunchCh16 = document.getElementById('btn-launch-ch16');
const btnLaunchCh15 = document.getElementById('btn-launch-ch15');
const btnLaunchCh14 = document.getElementById('btn-launch-ch14');
const btnLaunchCh13 = document.getElementById('btn-launch-ch13');
const btnLaunchCh12 = document.getElementById('btn-launch-ch12');
const btnLaunchCh11 = document.getElementById('btn-launch-ch11');
const btnLaunchCh10 = document.getElementById('btn-launch-ch10');
const btnLaunchCh09 = document.getElementById('btn-launch-ch09');
const btnLaunchCh08 = document.getElementById('btn-launch-ch08');
const btnLaunchCh07 = document.getElementById('btn-launch-ch07');
const btnLaunchCh06 = document.getElementById('btn-launch-ch06');
const btnLaunchCh05 = document.getElementById('btn-launch-ch05');
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

const LOADER_LABELS = {
  ch20: '次世代340種資産＆792実写PBR【最終章・第20章：五百二十日目の朝、アスファルトを踏みしめて（02:30）】を構築中…',
  ch19: '次世代340種資産＆792実写PBR『第19章：外乱への反射 ——「生き物」になった瞬間（02:30）』を構築中…',
  ch18: '次世代340種資産＆792実写PBR『第18章：逆流する稲妻と、二度目の夏休み（02:30）』を構築中…',
  ch17: '次世代340種資産＆792実写PBR『第17章：身体の声を聴く夏 —— 7.62キロの初起立（02:30）』を構築中…',
  ch16: '次世代340種資産＆792実写PBR『第16章：夢と現実の断崖 —— Sim-to-Realの洗礼（02:30）』を構築中…',
  ch15: '次世代340種資産＆792実写PBR『第15章：仮想空間の四千人の分身（02:30）』を構築中…',
  ch14: '次世代340種資産＆792実写PBR『第14章：黒い金属と炭素の骨格（02:30）』を構築中…',
  ch13: '次世代340種資産＆792実写PBR『第13章：オシロスコープの幽霊（02:30）』を構築中…',
  ch12: '次世代340種資産＆792実写PBR『第12章：聖夜の閃光と、柔らかい鉄（02:30）』を構築中…',
  ch11: '次世代340種資産＆792実写PBR『第11章（第二部開幕）：白紙への回帰と、冬の設計図（02:30）』を構築中…',
  ch10: '次世代340種資産＆792実写PBR『第10章（第一部・完）：小さな完走と限界（02:30）』を構築中…',
  ch09: '次世代マクロ3D『第9章：破壊と修復のループ、銀色の添え木（02:30）』を構築中…',
  ch08: '次世代マクロ3D『第8章：ZMP（ゼロモーメントポイント）と1ミリ秒の壁（02:30）』を構築中…',
  ch07: '次世代マクロ3D『第7章：すり足の一歩と、75℃の熱壁（02:30）』を構築中…',
  ch06: '次世代マクロ3D『第6章：夏休みの全身組立と、起立不能の重力（02:30）』を構築中…',
  ch05: '次世代マクロ3D『第5章：深圳から届いた緑の基板（02:30）』を構築中…',
  ch04: '極限リアル3D『第4章：線形代数の復習と、逆運動学の暴走（02:30）』を構築中…',
  hmd: '極限リアル3D『HMD-01 開発記 第1章・第2章（10:00）』を構築中…',
  voxel: '物理破壊ボクセル3D『天地綻びのクロニクル（05:00）』を構築中…',
};

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
    loaderText.textContent = LOADER_LABELS[kind] || LOADER_LABELS.ch20;
  }
  stageLoader?.classList.add('visible');

  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  try {
    if (kind === 'ch20') {
      const { mountCh20Film } = await import('./real/ch20/realCh20Film.js');
      activeSession = mountCh20Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch19') {
      const { mountCh19Film } = await import('./real/ch19/realCh19Film.js');
      activeSession = mountCh19Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch18') {
      const { mountCh18Film } = await import('./real/ch18/realCh18Film.js');
      activeSession = mountCh18Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch17') {
      const { mountCh17Film } = await import('./real/ch17/realCh17Film.js');
      activeSession = mountCh17Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch16') {
      const { mountCh16Film } = await import('./real/ch16/realCh16Film.js');
      activeSession = mountCh16Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch15') {
      const { mountCh15Film } = await import('./real/ch15/realCh15Film.js');
      activeSession = mountCh15Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch14') {
      const { mountCh14Film } = await import('./real/ch14/realCh14Film.js');
      activeSession = mountCh14Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch13') {
      const { mountCh13Film } = await import('./real/ch13/realCh13Film.js');
      activeSession = mountCh13Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch12') {
      const { mountCh12Film } = await import('./real/ch12/realCh12Film.js');
      activeSession = mountCh12Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch11') {
      const { mountCh11Film } = await import('./real/ch11/realCh11Film.js');
      activeSession = mountCh11Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch10') {
      const { mountCh10Film } = await import('./real/ch10/realCh10Film.js');
      activeSession = mountCh10Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch09') {
      const { mountCh09Film } = await import('./real/ch09/realCh09Film.js');
      activeSession = mountCh09Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch08') {
      const { mountCh08Film } = await import('./real/ch08/realCh08Film.js');
      activeSession = mountCh08Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch07') {
      const { mountCh07Film } = await import('./real/ch07/realCh07Film.js');
      activeSession = mountCh07Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch06') {
      const { mountCh06Film } = await import('./real/ch06/realCh06Film.js');
      activeSession = mountCh06Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch05') {
      const { mountCh05Film } = await import('./real/ch05/realCh05Film.js');
      activeSession = mountCh05Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'ch04') {
      const { mountCh04Film } = await import('./real/ch04/realCh04Film.js');
      activeSession = mountCh04Film({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else if (kind === 'hmd') {
      const { mountRealFilm } = await import('./real/realFilm.js');
      activeSession = mountRealFilm({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    } else {
      const { mountVoxelFilm } = await import('./voxelFilm.js');
      activeSession = mountVoxelFilm({ initialTime, startPaused, onReturnHub: returnToMainMenuHub });
    }
  } catch (err) {
    console.error('Failed to mount 3D film:', err);
    returnToMainMenuHub();
  } finally {
    stageLoader?.classList.remove('visible');
    launching = false;
  }
}

btnLaunchCh20?.addEventListener('click', () => {
  launchFilm('ch20', { initialTime: 0, startPaused: false, fromUserGesture: true });
});
btnLaunchCh19?.addEventListener('click', () => {
  launchFilm('ch19', { initialTime: 0, startPaused: false, fromUserGesture: true });
});
btnLaunchCh18?.addEventListener('click', () => {
  launchFilm('ch18', { initialTime: 0, startPaused: false, fromUserGesture: true });
});
btnLaunchCh17?.addEventListener('click', () => {
  launchFilm('ch17', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh16?.addEventListener('click', () => {
  launchFilm('ch16', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh15?.addEventListener('click', () => {
  launchFilm('ch15', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh14?.addEventListener('click', () => {
  launchFilm('ch14', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh13?.addEventListener('click', () => {
  launchFilm('ch13', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh12?.addEventListener('click', () => {
  launchFilm('ch12', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh11?.addEventListener('click', () => {
  launchFilm('ch11', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh10?.addEventListener('click', () => {
  launchFilm('ch10', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh09?.addEventListener('click', () => {
  launchFilm('ch09', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh08?.addEventListener('click', () => {
  launchFilm('ch08', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh07?.addEventListener('click', () => {
  launchFilm('ch07', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh06?.addEventListener('click', () => {
  launchFilm('ch06', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh05?.addEventListener('click', () => {
  launchFilm('ch05', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchCh04?.addEventListener('click', () => {
  launchFilm('ch04', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchHmd?.addEventListener('click', () => {
  launchFilm('hmd', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

btnLaunchVoxel?.addEventListener('click', () => {
  launchFilm('voxel', { initialTime: 0, startPaused: false, fromUserGesture: true });
});

// Deep-link query params (?film=ch15|ch14|ch13|ch12|ch11|...|hmd|voxel&t=...&paused=1)
const params = new URLSearchParams(window.location.search);
const queryFilm = params.get('film');
if (queryFilm && queryFilm in LOADER_LABELS) {
  const initialTime = Math.max(0, Number(params.get('t') || 0));
  const startPaused = params.get('paused') === '1';
  launchFilm(queryFilm, { initialTime, startPaused, fromUserGesture: false });
}
