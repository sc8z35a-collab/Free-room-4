import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createMasterAssetLibrary } from '../library/masterLibrary.js';
import { createCh19Screens, createCh19World } from './setsAndScreens19.js';
import {
  CH19_DURATION, CH19_SCENES, getCh19Scene, getCh19Subtitle, getCh19Cutin, evaluateCh19Timeline,
} from './timeline19.js';
import { Ch19AudioEngine } from './audio19.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh19Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH19_DURATION,
    chapters: CH19_SCENES,
    getChapterForTime: getCh19Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第19章 完',
    finSub: '第二部『HMD-02』編 第19章：外乱への反射 ——「生き物」になった瞬間（残金 ¥331,320）→ 【最終章・第20章】へ',
    downloadPrefix: 'hmd02_ch19_living_reflex_2m30s_nextgen',
  });

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const maxDpr = isMobile ? 1.5 : Math.min(window.devicePixelRatio || 1, 2);

  const renderer = new THREE.WebGLRenderer({
    canvas: shell.canvas, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(maxDpr);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false; renderer.shadowMap.needsUpdate = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1220);
  scene.fog = new THREE.FogExp2(0x0b1220, 0.016);

  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture; scene.environmentIntensity = 0.98;

  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.02, 140);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enabled = false;

  const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x241d18, 0.92);
  scene.add(hemiLight);
  const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.45);
  keyLight.position.set(2.4, 4.4, 2.8); keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.2; keyLight.shadow.camera.far = 28;
  keyLight.shadow.camera.left = -7; keyLight.shadow.camera.right = 7;
  keyLight.shadow.camera.top = 7; keyLight.shadow.camera.bottom = -7;
  keyLight.shadow.bias = -0.0003;
  scene.add(keyLight, keyLight.target);

  const rimFill = new THREE.PointLight(0x38bdf8, 1.35, 9.0, 1.2);
  rimFill.position.set(-1.5, 1.5, 1.8);
  scene.add(rimFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p; renderer.shadowMap.needsUpdate = true;
      if (p === 'room_hero_reveal') {
        scene.background.setHex(0x0b1220); scene.fog.color.setHex(0x0b1220); scene.fog.density = 0.014;
        scene.environmentIntensity = 1.08;
        hemiLight.color.setHex(0xfef3c7); hemiLight.groundColor.setHex(0x231b16); hemiLight.intensity = 0.95;
        keyLight.color.setHex(0xfffbeb); keyLight.intensity = 2.55;
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 1.45;
      } else if (p === 'isaac_virtual_16dof') {
        scene.background.setHex(0x242a36); scene.fog.color.setHex(0x242a36); scene.fog.density = 0.040;
        scene.environmentIntensity = 1.25;
        hemiLight.color.setHex(0xe2e8f0); hemiLight.groundColor.setHex(0x334155); hemiLight.intensity = 1.18;
        keyLight.color.setHex(0xf8fafc); keyLight.intensity = 2.85;
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 1.45;
      } else if (p === 'room_nostalgia_365') {
        scene.background.setHex(0x0f1522); scene.fog.color.setHex(0x0f1522); scene.fog.density = 0.015;
        scene.environmentIntensity = 0.96;
        hemiLight.color.setHex(0xfde68a); hemiLight.groundColor.setHex(0x2b2018); hemiLight.intensity = 0.92;
        keyLight.color.setHex(0xffedd5); keyLight.intensity = 2.35;
        rimFill.color.setHex(0xf59e0b); rimFill.intensity = 1.1;
      } else if (p === 'viaduct_living_miracle') {
        scene.background.setHex(0x081324); scene.fog.color.setHex(0x081324); scene.fog.density = 0.018;
        scene.environmentIntensity = 1.04;
        hemiLight.color.setHex(0xbae6fd); hemiLight.groundColor.setHex(0x1e293b); hemiLight.intensity = 0.96;
        keyLight.color.setHex(0xfffbeb); keyLight.intensity = 2.45;
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 1.65;
      } else {
        scene.background.setHex(0x070d18); scene.fog.color.setHex(0x070d18); scene.fog.density = 0.022;
        scene.environmentIntensity = 0.88;
        hemiLight.color.setHex(0x93c5fd); hemiLight.groundColor.setHex(0x1e293b); hemiLight.intensity = 0.85;
        keyLight.color.setHex(0xe0f2fe); keyLight.intensity = 2.1;
        rimFill.color.setHex(0xfef08a); rimFill.intensity = 1.25;
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const masterLib = createMasterAssetLibrary(baseMats, ngMats, [
    1, 2, 3, 4, 15, 20, 23, 25, 26, 35, 39, 43, 46, 47, 50, 51, 52, 53, 57, 59, 77, 80, 84, 85,
  ]);
  let pbrReady = false;
  const screens = createCh19Screens();
  const world = createCh19World(scene, baseMats, ngMats, screens, masterLib);
  const audio = new Ch19AudioEngine();

  masterLib.ready.then(() => {
    pbrReady = true;
    if (!disposed) { renderer.shadowMap.needsUpdate = true; needsRender = true; }
  });

  const initialScale = isMobile ? 0.88 : 1.0;
  const pipeline = new NextGenCinemaMacroPipeline(renderer, window.innerWidth * maxDpr, window.innerHeight * maxDpr, initialScale);
  const drs = new PIDDynamicResolutionController(pipeline, { minScale: isMobile ? 0.72 : 0.82, maxScale: 1.0, targetMs: 15.8 });

  let currentTime = Math.max(0, Math.min(CH19_DURATION, initialTime));
  let isPlaying = !startPaused; let cameraMode = 'CINEMA';
  let needsRender = true; let disposed = false;
  let rafId = 0; let frameCount = 0; let lastWallMs = performance.now();
  const lookTarget = new THREE.Vector3();

  function setPlaying(play) {
    if (play) {
      audio.resume();
      if (currentTime >= CH19_DURATION - 0.1) { currentTime = 0; audio.resetForSeek(0); }
      isPlaying = true; lastWallMs = performance.now();
    } else { isPlaying = false; audio.pause(); }
    shell.syncPlayIcon(isPlaying); needsRender = true;
  }
  function seekTo(t) {
    currentTime = Math.max(0, Math.min(CH19_DURATION, t));
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
    const dof = evaluateCh19Timeline(t, world, screens, lights, camera, lookTarget, (h) => { latestSimLog = h.simLog; });
    if (cameraMode === 'FREE') { camera.position.copy(savedPos); controls.update(); }
    else { camera.lookAt(lookTarget); }

    const fx = {
      focusDist: camera.position.distanceTo(lookTarget),
      aperture: dof?.aperture ?? 0.007,
      bloomStrength: dof?.halation ?? 0.30,
      exposure: 1.12, aoIntensity: 0.72, vignette: 0.24,
    };
    frameCount++; if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t, subtitle: getCh19Subtitle(t), cutin: getCh19Cutin(t), simlog: latestSimLog,
      dramaBars: (t >= 24 && t < 46) || (t >= 86 && t < 122),
      fin: t >= CH19_DURATION - 0.15,
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
      if (currentTime >= CH19_DURATION) { currentTime = CH19_DURATION; isPlaying = false; audio.pause(); shell.syncPlayIcon(false); }
      audio.update(currentTime); needsRender = true;
    }
    if (isPlaying || needsRender || cameraMode === 'FREE') {
      evaluateFrame(currentTime);
      if (isPlaying) drs.sample(rawDt * 1000, window.innerWidth * maxDpr, window.innerHeight * maxDpr);
      needsRender = false;
    }
  }

  window.__CINEMA__ = {
    film: 'ch19', isPbrReady: () => pbrReady, libraryStats: masterLib.getStats(),
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false; audio.pause(); shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH19_DURATION, sec));
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
