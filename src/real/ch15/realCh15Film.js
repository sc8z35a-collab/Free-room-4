import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createMasterAssetLibrary } from '../library/masterLibrary.js';
import { createCh15Screens, createCh15World } from './setsAndScreens15.js';
import {
  CH15_DURATION,
  CH15_SCENES,
  getCh15Scene,
  getCh15Subtitle,
  getCh15Cutin,
  evaluateCh15Timeline,
} from './timeline15.js';
import { Ch15AudioEngine } from './audio15.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh15Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH15_DURATION,
    chapters: CH15_SCENES,
    getChapterForTime: getCh15Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第15章 完',
    finSub: '第二部『HMD-02』編 第15章：仮想空間の四千人の分身（残金 ¥255,420）→ 第16章『夢と現実の断崖（Sim-to-Real）』へ',
    downloadPrefix: 'hmd02_ch15_4096_virtual_clones_2m30s_nextgen',
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
  scene.background = new THREE.Color(0x0b1220);
  scene.fog = new THREE.FogExp2(0x0b1220, 0.018);

  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.92;

  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.02, 140);
  camera.position.set(0.92, 1.08, 1.22);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.08;
  controls.maxDistance = 24;
  controls.enabled = false;

  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x2b2420, 0.85);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff5e4, 2.3);
  keyLight.position.set(2.2, 4.2, 2.6);
  keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.3;
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

  const rimFill = new THREE.PointLight(0x38bdf8, 1.1, 7.0, 1.2);
  rimFill.position.set(-1.5, 1.4, 1.4);
  scene.add(rimFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'train_evening') {
        scene.background.setHex(0x161c28);
        scene.fog.color.setHex(0x161c28);
        scene.fog.density = 0.020;
        scene.environmentIntensity = 0.88;
        hemiLight.color.setHex(0xfef3c7); hemiLight.groundColor.setHex(0x1e293b); hemiLight.intensity = 1.02;
        keyLight.color.setHex(0xffedd5); keyLight.intensity = 2.25; keyLight.position.set(0.6, 2.6, 1.8);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0xfbbf24); rimFill.intensity = 0.85;
      } else if (p === 'room_gpu_night') {
        scene.background.setHex(0x060b16);
        scene.fog.color.setHex(0x060b16);
        scene.fog.density = 0.022;
        scene.environmentIntensity = 0.76;
        hemiLight.color.setHex(0x7dd3fc); hemiLight.groundColor.setHex(0x1c1412); hemiLight.intensity = 0.62;
        keyLight.color.setHex(0xbae6fd); keyLight.intensity = 1.65; keyLight.position.set(1.2, 2.2, 1.5);
        deskSpot.intensity = 3.8; deskSpot.color.setHex(0x7dd3fc); deskSpot.position.set(0.25, 1.48, -0.65);
        deskSpot.target.position.set(0.15, 0.45, -1.16);
        rimFill.color.setHex(0xfb923c); rimFill.intensity = 1.35; rimFill.position.set(0.6, 0.45, -0.75);
      } else if (p === 'room_sysid_lab') {
        scene.background.setHex(0x0d1422);
        scene.fog.color.setHex(0x0d1422);
        scene.fog.density = 0.016;
        scene.environmentIntensity = 0.98;
        hemiLight.color.setHex(0xe0f2fe); hemiLight.groundColor.setHex(0x271e18); hemiLight.intensity = 0.86;
        keyLight.color.setHex(0xfff7ed); keyLight.intensity = 2.45; keyLight.position.set(1.4, 2.8, 1.8);
        deskSpot.intensity = 4.2; deskSpot.color.setHex(0xfff4d6); deskSpot.position.set(0.0, 1.65, -0.35);
        deskSpot.target.position.set(0.0, 0.78, -0.82);
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 0.95; rimFill.position.set(-1.3, 1.2, 1.2);
      } else if (p === 'isaac_virtual_grid') {
        // Sleek Misty Gray NVIDIA Isaac Lab Simulation Atmosphere!
        scene.background.setHex(0x262c38);
        scene.fog.color.setHex(0x262c38);
        scene.fog.density = 0.042;
        scene.environmentIntensity = 1.25;
        hemiLight.color.setHex(0xe2e8f0); hemiLight.groundColor.setHex(0x334155); hemiLight.intensity = 1.18;
        keyLight.color.setHex(0xf8fafc); keyLight.intensity = 2.85; keyLight.position.set(3.2, 6.2, 3.8);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 1.45; rimFill.position.set(-1.8, 1.6, 1.8);
      } else {
        // 'lecture_rainy_day' — Soft overcast rainy June university lecture hall!
        scene.background.setHex(0xcbd5e1);
        scene.fog.color.setHex(0xcbd5e1);
        scene.fog.density = 0.010;
        scene.environmentIntensity = 0.96;
        hemiLight.color.setHex(0xe2e8f0); hemiLight.groundColor.setHex(0x64748b); hemiLight.intensity = 1.15;
        keyLight.color.setHex(0xf1f5f9); keyLight.intensity = 2.15; keyLight.position.set(-2.0, 3.6, 2.2);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0x93c5fd); rimFill.intensity = 0.65;
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const masterLib = createMasterAssetLibrary(baseMats, ngMats, [
    1, 2, 3, 4, 15, 20, 23, 25, 26, 35, 39, 43, 46, 47, 50, 51, 52, 53, 57, 59, 77, 80, 84, 85,
  ]);
  let pbrReady = false;
  const screens = createCh15Screens();
  const world = createCh15World(scene, baseMats, ngMats, screens, masterLib);
  const audio = new Ch15AudioEngine();

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

  let currentTime = Math.max(0, Math.min(CH15_DURATION, initialTime));
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
      audio.init();
      if (currentTime >= CH15_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(CH15_DURATION, t));
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
  shell.hooks.initAudio = () => audio.init();

  let latestSimLog = null;

  function evaluateFrame(t) {
    const savedPos = camera.position.clone();
    const dof = evaluateCh15Timeline(t, world, screens, lights, camera, lookTarget, (h) => {
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
      aperture: dof?.aperture ?? 0.008,
      bloomStrength: dof?.halation ?? 0.28,
      exposure: 1.10,
      aoIntensity: 0.72,
      vignette: 0.24,
    };

    frameCount++;
    if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t,
      subtitle: getCh15Subtitle(t),
      cutin: getCh15Cutin(t),
      simlog: latestSimLog,
      dramaBars: (t >= 46 && t < 82) || t >= 104,
      fin: t >= CH15_DURATION - 0.15,
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
      if (currentTime >= CH15_DURATION) {
        currentTime = CH15_DURATION;
        isPlaying = false;
        audio.pause();
        shell.syncPlayIcon(false);
      }
      audio.update(currentTime, isPlaying);
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
    film: 'ch15',
    isPbrReady: () => pbrReady,
    libraryStats: masterLib.getStats(),
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH15_DURATION, sec));
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

  if (isPlaying) audio.init();
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
