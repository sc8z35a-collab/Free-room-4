import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createMasterAssetLibrary } from '../library/masterLibrary.js';
import { createCh17Screens, createCh17World } from './setsAndScreens17.js';
import {
  CH17_DURATION,
  CH17_SCENES,
  getCh17Scene,
  getCh17Subtitle,
  getCh17Cutin,
  evaluateCh17Timeline,
} from './timeline17.js';
import { Ch17AudioEngine } from './audio17.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh17Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH17_DURATION,
    chapters: CH17_SCENES,
    getChapterForTime: getCh17Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第17章 完',
    finSub: '第二部『HMD-02』編 第17章：身体の声を聴く夏 —— 7.62キロの初起立（残金 ¥294,420）→ 第18章『逆流する稲妻と、二度目の夏休み』へ',
    downloadPrefix: 'hmd02_ch17_first_762kg_stand_2m30s_nextgen',
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
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b101b);
  scene.fog = new THREE.FogExp2(0x0b101b, 0.015);

  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.96;

  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.02, 140);
  camera.position.set(-0.08, 0.18, 0.56);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.06;
  controls.maxDistance = 28;
  controls.enabled = false;

  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x2b2420, 0.92);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff5e4, 2.4);
  keyLight.position.set(2.2, 4.2, 2.6);
  keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.2;
  keyLight.shadow.camera.far = 26;
  keyLight.shadow.camera.left = -6.0;
  keyLight.shadow.camera.right = 6.0;
  keyLight.shadow.camera.top = 6.0;
  keyLight.shadow.camera.bottom = -6.0;
  keyLight.shadow.bias = -0.0003;
  keyLight.target.position.set(0, 0.5, 0);
  scene.add(keyLight, keyLight.target);

  const deskSpot = new THREE.SpotLight(0x38bdf8, 3.2, 6.0, Math.PI * 0.48, 0.5, 1.2);
  deskSpot.position.set(0.15, 1.55, -0.55);
  deskSpot.target.position.set(0.0, 0.72, -1.16);
  scene.add(deskSpot, deskSpot.target);

  const rimFill = new THREE.PointLight(0x38bdf8, 1.15, 7.0, 1.2);
  rimFill.position.set(-1.5, 1.4, 1.4);
  scene.add(rimFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'macro_sysid') {
        scene.background.setHex(0x0b101b); scene.fog.color.setHex(0x0b101b); scene.fog.density = 0.012;
        scene.environmentIntensity = 1.15;
        hemiLight.color.setHex(0xe0f2fe); hemiLight.groundColor.setHex(0x281e18); hemiLight.intensity = 0.96;
        keyLight.color.setHex(0xfff7ed); keyLight.intensity = 2.65; keyLight.position.set(1.2, 2.4, 1.6);
        deskSpot.intensity = 3.2; deskSpot.color.setHex(0xfff4d6); deskSpot.position.set(0, 1.1, 0.6);
        deskSpot.target.position.set(0, 0.08, 0);
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 1.1; rimFill.position.set(-0.6, 0.6, 0.5);
      } else if (p === 'isaac_mud_arena') {
        scene.background.setHex(0x1f2633); scene.fog.color.setHex(0x1f2633); scene.fog.density = 0.040;
        scene.environmentIntensity = 1.22;
        hemiLight.color.setHex(0xbae6fd); hemiLight.groundColor.setHex(0x334155); hemiLight.intensity = 1.18;
        keyLight.color.setHex(0xf8fafc); keyLight.intensity = 2.85; keyLight.position.set(3.0, 6.0, 3.6);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 1.45; rimFill.position.set(-1.8, 1.6, 1.8);
      } else if (p === 'exam_bright_july') {
        scene.background.setHex(0xe2e8f0); scene.fog.color.setHex(0xe2e8f0); scene.fog.density = 0.008;
        scene.environmentIntensity = 1.08;
        hemiLight.color.setHex(0xffffff); hemiLight.groundColor.setHex(0x94a3b8); hemiLight.intensity = 1.25;
        keyLight.color.setHex(0xfffbeb); keyLight.intensity = 2.45; keyLight.position.set(1.8, 3.8, 1.6);
        deskSpot.intensity = 0.0; rimFill.intensity = 0.5;
      } else if (p === 'yakiniku_warm_smoke') {
        scene.background.setHex(0x1c100a); scene.fog.color.setHex(0x1c100a); scene.fog.density = 0.024;
        scene.environmentIntensity = 0.92;
        hemiLight.color.setHex(0xfde68a); hemiLight.groundColor.setHex(0x451a03); hemiLight.intensity = 0.95;
        keyLight.color.setHex(0xffedd5); keyLight.intensity = 2.2; keyLight.position.set(0.8, 2.8, 1.6);
        deskSpot.intensity = 3.8; deskSpot.color.setHex(0xfb923c); deskSpot.position.set(0, 1.65, 0.1);
        deskSpot.target.position.set(0, 0.74, 0);
        rimFill.color.setHex(0xf59e0b); rimFill.intensity = 1.5; rimFill.position.set(0, 0.95, 0);
      } else if (p === 'summer_starry_night') {
        scene.background.setHex(0x050914); scene.fog.color.setHex(0x050914); scene.fog.density = 0.014;
        scene.environmentIntensity = 0.65;
        hemiLight.color.setHex(0x60a5fa); hemiLight.groundColor.setHex(0x0f172a); hemiLight.intensity = 0.72;
        keyLight.color.setHex(0xbfdbfe); keyLight.intensity = 1.35; keyLight.position.set(-2.2, 4.5, 2.5);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0xef4444); rimFill.intensity = 1.4; rimFill.position.set(2.15, 3.65, -2.6);
      } else if (p === 'room_miracle_gold') {
        scene.background.setHex(0x0d1526); scene.fog.color.setHex(0x0d1526); scene.fog.density = 0.014;
        scene.environmentIntensity = 1.10;
        hemiLight.color.setHex(0xfef3c7); hemiLight.groundColor.setHex(0x281e18); hemiLight.intensity = 0.98;
        keyLight.color.setHex(0xfffbeb); keyLight.intensity = 2.65; keyLight.position.set(1.8, 3.2, 2.2);
        deskSpot.intensity = 3.6; deskSpot.color.setHex(0xfde68a); deskSpot.position.set(0.1, 1.85, 1.15);
        deskSpot.target.position.set(0, 0.56, 0.30);
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 1.35; rimFill.position.set(-1.3, 1.1, 1.1);
      } else if (p === 'room_omen_spike') {
        scene.background.setHex(0x080c18); scene.fog.color.setHex(0x080c18); scene.fog.density = 0.018;
        scene.environmentIntensity = 0.85;
        hemiLight.color.setHex(0x93c5fd); hemiLight.groundColor.setHex(0x1f1414); hemiLight.intensity = 0.78;
        keyLight.color.setHex(0xdbeafe); keyLight.intensity = 1.85; keyLight.position.set(1.2, 2.4, 1.6);
        deskSpot.intensity = 3.0; deskSpot.color.setHex(0xf59e0b); deskSpot.position.set(0.0, 1.5, -0.6);
        deskSpot.target.position.set(0.0, 1.0, -1.42);
        rimFill.color.setHex(0xef4444); rimFill.intensity = 1.1; rimFill.position.set(0.6, 1.1, -0.8);
      } else {
        // 'room_bode_night'
        scene.background.setHex(0x0a111f); scene.fog.color.setHex(0x0a111f); scene.fog.density = 0.016;
        scene.environmentIntensity = 0.98;
        hemiLight.color.setHex(0xe0f2fe); hemiLight.groundColor.setHex(0x1e1916); hemiLight.intensity = 0.88;
        keyLight.color.setHex(0xfff7ed); keyLight.intensity = 2.3; keyLight.position.set(1.4, 2.8, 1.8);
        deskSpot.intensity = 3.2; deskSpot.color.setHex(0x38bdf8); deskSpot.position.set(0.1, 1.65, -0.5);
        deskSpot.target.position.set(0.0, 0.9, -1.1);
        rimFill.color.setHex(0xfbbf24); rimFill.intensity = 0.9; rimFill.position.set(-1.2, 1.1, 1.0);
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const masterLib = createMasterAssetLibrary(baseMats, ngMats, [
    1, 2, 3, 4, 15, 20, 23, 25, 26, 35, 39, 43, 46, 47, 50, 51, 52, 53, 57, 59, 77, 80, 84, 85,
  ]);
  let pbrReady = false;
  const screens = createCh17Screens();
  const world = createCh17World(scene, baseMats, ngMats, screens, masterLib);
  const audio = new Ch17AudioEngine();

  masterLib.ready.then(() => {
    pbrReady = true;
    if (!disposed) {
      renderer.shadowMap.needsUpdate = true;
      needsRender = true;
    }
  });

  const initialScale = isMobile ? 0.88 : 1.0;
  const pipeline = new NextGenCinemaMacroPipeline(
    renderer,
    window.innerWidth * maxDpr,
    window.innerHeight * maxDpr,
    initialScale
  );

  const drs = new PIDDynamicResolutionController(pipeline, {
    minScale: isMobile ? 0.72 : 0.82,
    maxScale: 1.0,
    targetMs: 15.8,
  });

  let currentTime = Math.max(0, Math.min(CH17_DURATION, initialTime));
  let isPlaying = !startPaused;
  let cameraMode = 'CINEMA';
  let needsRender = true;
  let disposed = false;
  let rafId = 0;
  let frameCount = 0;
  let lastWallMs = performance.now();
  const lookTarget = new THREE.Vector3();

  function setPlaying(play) {
    if (play) {
      audio.resume();
      if (currentTime >= CH17_DURATION - 0.1) {
        currentTime = 0;
        audio.resetForSeek(0);
      }
      isPlaying = true;
      lastWallMs = performance.now();
    } else {
      isPlaying = false;
      audio.pause();
    }
    shell.syncPlayIcon(isPlaying);
    needsRender = true;
  }

  function seekTo(t) {
    currentTime = Math.max(0, Math.min(CH17_DURATION, t));
    audio.resetForSeek(currentTime);
    renderer.shadowMap.needsUpdate = true;
    needsRender = true;
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
    needsRender = true;
    return cameraMode;
  };
  shell.hooks.toggleMute = () => {
    audio.init();
    audio.setMuted(!audio.muted);
    return audio.muted;
  };
  shell.hooks.getAudioStream = () => audio.getRecordingStream();
  shell.hooks.initAudio = () => audio.resume();

  let latestSimLog = null;

  function evaluateFrame(t) {
    const savedPos = camera.position.clone();
    const dof = evaluateCh17Timeline(t, world, screens, lights, camera, lookTarget, (h) => {
      latestSimLog = h.simLog;
    });

    if (cameraMode === 'FREE') {
      camera.position.copy(savedPos);
      controls.update();
    } else {
      camera.lookAt(lookTarget);
    }

    const fx = {
      focusDist: camera.position.distanceTo(lookTarget),
      aperture: dof?.aperture ?? 0.007,
      bloomStrength: dof?.halation ?? 0.28,
      exposure: 1.12,
      aoIntensity: 0.72,
      vignette: 0.24,
    };

    frameCount++;
    if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t,
      subtitle: getCh17Subtitle(t),
      cutin: getCh17Cutin(t),
      simlog: latestSimLog,
      dramaBars: (t >= 28 && t < 48) || (t >= 88 && t < 128),
      fin: t >= CH17_DURATION - 0.15,
    });

    pipeline.render(scene, camera, fx);
  }

  window.addEventListener(
    'resize',
    () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      pipeline.setSize(w * maxDpr, h * maxDpr, drs.currentScale);
      renderer.shadowMap.needsUpdate = true;
      needsRender = true;
    },
    shell.sig
  );

  function tick(nowMs) {
    if (disposed) return;
    rafId = requestAnimationFrame(tick);
    const rawDt = (nowMs - lastWallMs) / 1000;
    const dt = Math.min(0.08, Math.max(0, rawDt));
    lastWallMs = nowMs;

    if (isPlaying && !shell.isScrubbing()) {
      currentTime += dt;
      if (currentTime >= CH17_DURATION) {
        currentTime = CH17_DURATION;
        isPlaying = false;
        audio.pause();
        shell.syncPlayIcon(false);
      }
      audio.update(currentTime);
      needsRender = true;
    }

    if (isPlaying || needsRender || cameraMode === 'FREE') {
      evaluateFrame(currentTime);
      if (isPlaying) {
        drs.sample(rawDt * 1000, window.innerWidth * maxDpr, window.innerHeight * maxDpr);
      }
      needsRender = false;
    }
  }

  window.__CINEMA__ = {
    film: 'ch17',
    isPbrReady: () => pbrReady,
    libraryStats: masterLib.getStats(),
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH17_DURATION, sec));
      renderer.shadowMap.needsUpdate = true;
      evaluateFrame(currentTime);
      if (syncGpu) renderer.getContext().finish();
      needsRender = false;
    },
    getTime: () => currentTime,
    stats: () => ({
      sceneDrawCalls: pipeline.lastSceneCalls || 0,
      totalDrawCalls: pipeline.lastTotalCalls || 0,
      triangles: pipeline.lastSceneTriangles || 0,
      scale: drs.currentScale,
      library: masterLib.getStats(),
    }),
  };

  if (isPlaying) audio.resume();
  shell.syncPlayIcon(isPlaying);
  evaluateFrame(currentTime);
  rafId = requestAnimationFrame(tick);

  function dispose() {
    disposed = true;
    cancelAnimationFrame(rafId);
    audio.dispose();
    controls.dispose();
    shell.dispose();
    masterLib.dispose();
    envRT.dispose();
    pipeline.dispose();
    renderer.dispose();
  }

  return { dispose, seekTo, setPlaying };
}
