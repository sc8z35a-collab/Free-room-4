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
import { createStageSession } from './playerShell.js';

export function mountVoxelFilm({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: FILM_DURATION,
    chapters: CHAPTERS,
    getChapterForTime,
    onReturnHub,
    widescreen: false,
    finLabel: '完',
    finSub: '天地綻びのクロニクル — 05:00 FULL PRODUCTION',
    downloadPrefix: 'chronicle_of_hokorobi_5min',
  });

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const maxDpr = isMobile ? 1.5 : Math.min(window.devicePixelRatio || 1, 2);

  const renderer = new THREE.WebGLRenderer({
    canvas: shell.canvas,
    antialias: false,
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

  const hemiLight = new THREE.HemisphereLight(0xcde8ff, 0x3b4832, 0.9);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xfff2d6, 2.35);
  sunLight.position.set(68, 86, -76);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
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

  let currentTime = Math.max(0, Math.min(FILM_DURATION, initialTime));
  let isPlaying = !startPaused;
  let needsRender = true;
  let disposed = false;
  let rafId = 0;

  const camModes = ['CINEMA', 'FREE ORBIT', 'FOLLOW'];
  let camModeIdx = 0;
  let lastFxState = { time: 0, bloomStrength: 0.28, chromatic: 0, speedLines: 0, flash: 0, invert: 0, warmth: 0.14 };

  function setPlaying(playing) {
    isPlaying = playing;
    if (playing) {
      try { audio.init(); } catch {}
      if (currentTime >= FILM_DURATION - 0.1) {
        currentTime = 0;
        audio.resetTimeline(0);
      }
    }
    shell.syncPlayIcon(playing);
  }

  function updateSceneAt(t, forceShadow = false) {
    sharedTimeUniform.value = t;
    const state = evaluateDirector(t, actors, env);
    const ch = getChapterForTime(t);

    shadowDirector.update(t, state.focusX, state.focusZ, ch.id, forceShadow);
    world.update(t, state);
    vfx.update(t, state);

    const mode = camModes[camModeIdx];
    if (mode === 'CINEMA') {
      const shakeX = state.shake > 0 ? Math.sin(t * 73.1) * state.shake * 0.6 : 0;
      const shakeY = state.shake > 0 ? Math.cos(t * 61.7) * state.shake * 0.6 : 0;
      camera.position.set(state.camPos.x + shakeX, Math.max(1.2, state.camPos.y + shakeY), state.camPos.z);
      camera.lookAt(state.camTarget);
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

    shell.updateHUD({
      t,
      subtitle: getSubtitleForTime(t),
      cutin: getCutinForTime(t),
      simlog: null,
      dramaBars: state.dramaBars,
      tbc: state.tbcFakeout,
      fin: state.finalEnd,
    });
    needsRender = true;
  }

  shell.hooks.isPlaying = () => isPlaying;
  shell.hooks.setPlaying = setPlaying;
  shell.hooks.seekTo = (sec) => {
    currentTime = Math.max(0, Math.min(FILM_DURATION, sec));
    audio.resetTimeline(currentTime);
    updateSceneAt(currentTime, true);
  };
  shell.hooks.getTime = () => currentTime;
  shell.hooks.cycleCameraMode = () => {
    camModeIdx = (camModeIdx + 1) % camModes.length;
    controls.enabled = camModes[camModeIdx] !== 'CINEMA';
    return camModes[camModeIdx];
  };
  shell.hooks.getCameraMode = () => camModes[camModeIdx];
  shell.hooks.toggleMute = () => {
    audio.setMuted(!audio.muted);
    return audio.muted;
  };
  shell.hooks.getAudioStream = () => audio.getAudioStream();
  shell.hooks.initAudio = () => { try { audio.init(); } catch {} };

  function handleResize() {
    if (disposed) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    pipeline.setSize(Math.floor(w * dpr), Math.floor(h * dpr), drs.currentScale);
    needsRender = true;
  }
  window.addEventListener('resize', handleResize, shell.sig);
  window.addEventListener('orientationchange', () => setTimeout(handleResize, 120), shell.sig);
  controls.addEventListener('change', () => { needsRender = true; });

  if (isPlaying) {
    try { audio.init(); } catch {}
  }
  shell.syncPlayIcon(isPlaying);
  updateSceneAt(currentTime, true);

  window.__CINEMA__ = {
    film: 'voxel',
    seek: (sec, showHud = false, syncGpu = false) => {
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
    }),
  };

  let prevNow = performance.now();
  function animate(now) {
    if (disposed) return;
    rafId = requestAnimationFrame(animate);
    const dt = Math.min(0.05, (now - prevNow) / 1000);
    prevNow = now;

    if (isPlaying && !shell.isScrubbing()) {
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
  rafId = requestAnimationFrame(animate);

  return {
    dispose() {
      disposed = true;
      cancelAnimationFrame(rafId);
      audio.setMuted(true);
      controls.dispose();
      shell.dispose();
      renderer.dispose();
    },
  };
}
