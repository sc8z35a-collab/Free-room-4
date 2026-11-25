import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createMasterAssetLibrary } from '../library/masterLibrary.js';
import { createCh18Screens, createCh18World } from './setsAndScreens18.js';
import {
  CH18_DURATION, CH18_SCENES, getCh18Scene, getCh18Subtitle, getCh18Cutin, evaluateCh18Timeline,
} from './timeline18.js';
import { Ch18AudioEngine } from './audio18.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh18Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH18_DURATION,
    chapters: CH18_SCENES,
    getChapterForTime: getCh18Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第18章 完',
    finSub: '第二部『HMD-02』編 第18章：逆流する稲妻と、二度目の夏休み（残金 ¥283,020）→ 第19章『外乱への反射』へ',
    downloadPrefix: 'hmd02_ch18_regen_lightning_2m30s_nextgen',
  });

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const maxDpr = isMobile ? 1.5 : Math.min(window.devicePixelRatio || 1, 2);

  const renderer = new THREE.WebGLRenderer({
    canvas: shell.canvas, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(maxDpr);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070d18);
  scene.fog = new THREE.FogExp2(0x070d18, 0.022);

  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.88;

  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.02, 140);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enabled = false;

  const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x1e293b, 0.82);
  scene.add(hemiLight);
  const keyLight = new THREE.DirectionalLight(0xe0f2fe, 2.1);
  keyLight.position.set(2.5, 4.8, 3.2); keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.2; keyLight.shadow.camera.far = 28;
  keyLight.shadow.camera.left = -7; keyLight.shadow.camera.right = 7;
  keyLight.shadow.camera.top = 7; keyLight.shadow.camera.bottom = -7;
  keyLight.shadow.bias = -0.0003;
  scene.add(keyLight, keyLight.target);

  const rimFill = new THREE.PointLight(0x38bdf8, 1.2, 9.0, 1.2);
  rimFill.position.set(-1.5, 1.6, 1.8);
  scene.add(rimFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p; renderer.shadowMap.needsUpdate = true;
      if (p === 'viaduct_night') {
        scene.background.setHex(0x070d18); scene.fog.color.setHex(0x070d18); scene.fog.density = 0.022;
        scene.environmentIntensity = 0.88;
        hemiLight.color.setHex(0x93c5fd); hemiLight.groundColor.setHex(0x1e293b); hemiLight.intensity = 0.84;
        keyLight.color.setHex(0xe0f2fe); keyLight.intensity = 2.05;
        rimFill.color.setHex(0xfef08a); rimFill.intensity = 1.2;
      } else if (p === 'viaduct_crash') {
        scene.background.setHex(0x12080d); scene.fog.color.setHex(0x12080d); scene.fog.density = 0.026;
        scene.environmentIntensity = 0.85;
        hemiLight.color.setHex(0xfecaca); hemiLight.groundColor.setHex(0x1c1214); hemiLight.intensity = 0.88;
        keyLight.color.setHex(0xffedd5); keyLight.intensity = 2.15;
        rimFill.color.setHex(0xef4444); rimFill.intensity = 1.8;
      } else if (p === 'viaduct_obon_triumph') {
        scene.background.setHex(0x091322); scene.fog.color.setHex(0x091322); scene.fog.density = 0.018;
        scene.environmentIntensity = 0.98;
        hemiLight.color.setHex(0xbae6fd); hemiLight.groundColor.setHex(0x1e293b); hemiLight.intensity = 0.94;
        keyLight.color.setHex(0xfffbeb); keyLight.intensity = 2.4;
        rimFill.color.setHex(0xf59e0b); rimFill.intensity = 1.45;
      } else if (p === 'crossing_dusk') {
        scene.background.setHex(0x1f2738); scene.fog.color.setHex(0x1f2738); scene.fog.density = 0.016;
        scene.environmentIntensity = 0.96;
        hemiLight.color.setHex(0xfed7aa); hemiLight.groundColor.setHex(0x1e293b); hemiLight.intensity = 0.98;
        keyLight.color.setHex(0xffedd5); keyLight.intensity = 2.25;
        rimFill.color.setHex(0xef4444); rimFill.intensity = 1.2;
      } else if (p === 'workbench_gold') {
        scene.background.setHex(0x0b1120); scene.fog.color.setHex(0x0b1120); scene.fog.density = 0.014;
        scene.environmentIntensity = 1.08;
        hemiLight.color.setHex(0xfef3c7); hemiLight.groundColor.setHex(0x231a14); hemiLight.intensity = 0.92;
        keyLight.color.setHex(0xfffbeb); keyLight.intensity = 2.55;
        rimFill.color.setHex(0xeab308); rimFill.intensity = 1.3;
      } else {
        scene.background.setHex(0x090f1d); scene.fog.color.setHex(0x090f1d); scene.fog.density = 0.015;
        scene.environmentIntensity = 1.02;
        hemiLight.color.setHex(0xe0f2fe); hemiLight.groundColor.setHex(0x1f1916); hemiLight.intensity = 0.9;
        keyLight.color.setHex(0xfff7ed); keyLight.intensity = 2.4;
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 1.0;
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const masterLib = createMasterAssetLibrary(baseMats, ngMats, [
    1, 2, 3, 4, 15, 20, 23, 25, 26, 35, 39, 43, 46, 47, 50, 51, 52, 53, 57, 59, 77, 80, 84, 85,
  ]);
  let pbrReady = false;
  const screens = createCh18Screens();
  const world = createCh18World(scene, baseMats, ngMats, screens, masterLib);
  const audio = new Ch18AudioEngine();

  masterLib.ready.then(() => {
    pbrReady = true;
    if (!disposed) { renderer.shadowMap.needsUpdate = true; needsRender = true; }
  });

  const initialScale = isMobile ? 0.88 : 1.0;
  const pipeline = new NextGenCinemaMacroPipeline(renderer, window.innerWidth * maxDpr, window.innerHeight * maxDpr, initialScale);
  const drs = new PIDDynamicResolutionController(pipeline, { minScale: isMobile ? 0.72 : 0.82, maxScale: 1.0, targetMs: 15.8 });

  let currentTime = Math.max(0, Math.min(CH18_DURATION, initialTime));
  let isPlaying = !startPaused;
  let cameraMode = 'CINEMA';
  let needsRender = true;
  let disposed = false;
  let rafId = 0; let frameCount = 0; let lastWallMs = performance.now();
  const lookTarget = new THREE.Vector3();

  function setPlaying(play) {
    if (play) {
      audio.resume();
      if (currentTime >= CH18_DURATION - 0.1) { currentTime = 0; audio.resetForSeek(0); }
      isPlaying = true; lastWallMs = performance.now();
    } else { isPlaying = false; audio.pause(); }
    shell.syncPlayIcon(isPlaying); needsRender = true;
  }
  function seekTo(t) {
    currentTime = Math.max(0, Math.min(CH18_DURATION, t));
    audio.resetForSeek(currentTime); renderer.shadowMap.needsUpdate = true; needsRender = true;
  }

  shell.hooks.isPlaying = () => isPlaying;
  shell.hooks.setPlaying = setPlaying;
  shell.hooks.seekTo = seekTo;
  shell.hooks.getTime = () => currentTime;
  shell.hooks.getCameraMode = () => cameraMode;
  shell.hooks.cycleCameraMode = () => {
    cameraMode = cameraMode === 'CINEMA' ? 'FREE' : 'CINEMA';
    controls.enabled = cameraMode === 'FREE';
    if (cameraMode === 'FREE') controls.target.copy(lookTarget);
    needsRender = true; return cameraMode;
  };
  shell.hooks.toggleMute = () => { audio.init(); audio.setMuted(!audio.muted); return audio.muted; };
  shell.hooks.getAudioStream = () => audio.getRecordingStream();
  shell.hooks.initAudio = () => audio.resume();

  let latestSimLog = null;
  function evaluateFrame(t) {
    const savedPos = camera.position.clone();
    const dof = evaluateCh18Timeline(t, world, screens, lights, camera, lookTarget, (h) => { latestSimLog = h.simLog; });
    if (cameraMode === 'FREE') { camera.position.copy(savedPos); controls.update(); }
    else { camera.lookAt(lookTarget); }

    const fx = {
      focusDist: camera.position.distanceTo(lookTarget),
      aperture: dof?.aperture ?? 0.007,
      bloomStrength: dof?.halation ?? 0.28,
      exposure: 1.12, aoIntensity: 0.72, vignette: 0.24,
    };
    frameCount++; if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t, subtitle: getCh18Subtitle(t), cutin: getCh18Cutin(t), simlog: latestSimLog,
      dramaBars: (t >= 24 && t < 50) || (t >= 112 && t < 136),
      fin: t >= CH18_DURATION - 0.15,
    });
    pipeline.render(scene, camera, fx);
  }

  window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h); pipeline.setSize(w * maxDpr, h * maxDpr, drs.currentScale);
    renderer.shadowMap.needsUpdate = true; needsRender = true;
  }, shell.sig);

  function tick(nowMs) {
    if (disposed) return;
    rafId = requestAnimationFrame(tick);
    const rawDt = (nowMs - lastWallMs) / 1000;
    const dt = Math.min(0.08, Math.max(0, rawDt));
    lastWallMs = nowMs;
    if (isPlaying && !shell.isScrubbing()) {
      currentTime += dt;
      if (currentTime >= CH18_DURATION) { currentTime = CH18_DURATION; isPlaying = false; audio.pause(); shell.syncPlayIcon(false); }
      audio.update(currentTime); needsRender = true;
    }
    if (isPlaying || needsRender || cameraMode === 'FREE') {
      evaluateFrame(currentTime);
      if (isPlaying) drs.sample(rawDt * 1000, window.innerWidth * maxDpr, window.innerHeight * maxDpr);
      needsRender = false;
    }
  }

  window.__CINEMA__ = {
    film: 'ch18', isPbrReady: () => pbrReady, libraryStats: masterLib.getStats(),
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false; audio.pause(); shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH18_DURATION, sec));
      renderer.shadowMap.needsUpdate = true; evaluateFrame(currentTime);
      if (syncGpu) renderer.getContext().finish();
      needsRender = false;
    },
    getTime: () => currentTime,
    stats: () => ({
      sceneDrawCalls: pipeline.lastSceneCalls || 0,
      totalDrawCalls: pipeline.lastTotalCalls || 0,
      triangles: pipeline.lastSceneTriangles || 0,
      scale: drs.currentScale, library: masterLib.getStats(),
    }),
  };

  if (isPlaying) audio.resume();
  shell.syncPlayIcon(isPlaying); evaluateFrame(currentTime);
  rafId = requestAnimationFrame(tick);

  function dispose() {
    disposed = true; cancelAnimationFrame(rafId);
    audio.dispose(); controls.dispose(); shell.dispose();
    masterLib.dispose(); envRT.dispose(); pipeline.dispose(); renderer.dispose();
  }
  return { dispose, seekTo, setPlaying };
}
