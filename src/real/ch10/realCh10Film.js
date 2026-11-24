import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createMasterAssetLibrary } from '../library/masterLibrary.js';
import { createCh10Screens, createCh10World } from './setsAndScreens10.js';
import {
  CH10_DURATION,
  CH10_SCENES,
  getCh10Scene,
  getCh10Subtitle,
  getCh10Cutin,
  evaluateCh10Timeline,
} from './timeline10.js';
import { Ch10AudioEngine } from './audio10.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh10Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH10_DURATION,
    chapters: CH10_SCENES,
    getChapterForTime: getCh10Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第一部・完',
    finSub: '第一世代機『HMD-01』開発記 第10章（記録 9秒12・名誉退役）→ 第二世代機『HMD-02』へ',
    downloadPrefix: 'hmd01_ch10_part1_finale_2m30s_nextgen',
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
  scene.background = new THREE.Color(0x090d16);
  scene.fog = new THREE.FogExp2(0x090d16, 0.014);

  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.88;

  const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.02, 140);
  camera.position.set(-0.32, 1.16, 0.18);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.10;
  controls.maxDistance = 16;
  controls.enabled = false;

  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3b332b, 0.90);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.3);
  keyLight.position.set(1.5, 3.8, 2.2);
  keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.3;
  keyLight.shadow.camera.far = 22;
  keyLight.shadow.camera.left = -4.5;
  keyLight.shadow.camera.right = 4.5;
  keyLight.shadow.camera.top = 4.5;
  keyLight.shadow.camera.bottom = -4.5;
  keyLight.shadow.bias = -0.0003;
  keyLight.target.position.set(0, 0.5, 0);
  scene.add(keyLight, keyLight.target);

  const deskSpot = new THREE.SpotLight(0xf8fafc, 3.6, 4.2, Math.PI * 0.44, 0.5, 1.25);
  deskSpot.position.set(-0.08, 1.42, -0.56);
  deskSpot.target.position.set(0.0, 0.76, -0.52);
  scene.add(deskSpot, deskSpot.target);

  const rimFill = new THREE.PointLight(0x93c5fd, 0.95, 6.0, 1.2);
  rimFill.position.set(1.2, 1.6, 2.4);
  scene.add(rimFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'room_midnight_desk') {
        scene.background.setHex(0x090d16);
        scene.fog.color.setHex(0x090d16);
        scene.fog.density = 0.024;
        scene.environmentIntensity = 0.74;
        hemiLight.color.setHex(0xdbeafe);
        hemiLight.groundColor.setHex(0x27201a);
        hemiLight.intensity = 0.56;
        keyLight.color.setHex(0xf8fafc);
        keyLight.intensity = 1.75;
        keyLight.position.set(1.1, 2.8, 1.6);
        deskSpot.intensity = 4.2;
        deskSpot.color.setHex(0xf8fafc);
        rimFill.intensity = 0.38;
      } else if (p === 'room_sleep_blue') {
        scene.background.setHex(0x040712);
        scene.fog.color.setHex(0x040712);
        scene.fog.density = 0.030;
        scene.environmentIntensity = 0.45;
        hemiLight.color.setHex(0x60a5fa);
        hemiLight.groundColor.setHex(0x0f172a);
        hemiLight.intensity = 0.45;
        keyLight.color.setHex(0x93c5fd);
        keyLight.intensity = 0.90;
        keyLight.position.set(-0.4, 1.8, -1.4);
        deskSpot.intensity = 0.0;
        rimFill.intensity = 0.55;
      } else if (p === 'hamamatsucho_morning') {
        scene.background.setHex(0x7dd3fc);
        scene.fog.color.setHex(0xbae6fd);
        scene.fog.density = 0.007;
        scene.environmentIntensity = 1.12;
        hemiLight.color.setHex(0xe0f2fe);
        hemiLight.groundColor.setHex(0x64748b);
        hemiLight.intensity = 1.15;
        keyLight.color.setHex(0xfffbeb);
        keyLight.intensity = 2.85;
        keyLight.position.set(4.5, 7.2, 5.5);
        deskSpot.intensity = 0.0;
        rimFill.intensity = 0.25;
      } else if (p === 'hall_bright_white') {
        scene.background.setHex(0xe2e8f0);
        scene.fog.color.setHex(0xe2e8f0);
        scene.fog.density = 0.008;
        scene.environmentIntensity = 1.15;
        hemiLight.color.setHex(0xffffff);
        hemiLight.groundColor.setHex(0x94a3b8);
        hemiLight.intensity = 1.35;
        keyLight.color.setHex(0xffffff);
        keyLight.intensity = 2.45;
        keyLight.position.set(2.2, 6.2, 2.8);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0xe0f2fe);
        rimFill.intensity = 0.65;
      } else if (p === 'hall_spotlight_stage') {
        scene.background.setHex(0xdbe2ea);
        scene.fog.color.setHex(0xdbe2ea);
        scene.fog.density = 0.007;
        scene.environmentIntensity = 1.05;
        hemiLight.color.setHex(0xf8fafc);
        hemiLight.groundColor.setHex(0x64748b);
        hemiLight.intensity = 1.05;
        keyLight.color.setHex(0xffffff);
        keyLight.intensity = 2.95;
        keyLight.position.set(1.2, 5.8, 2.4);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0xbae6fd);
        rimFill.intensity = 0.85;
      } else if (p === 'hall_sunset_amber') {
        scene.background.setHex(0x43241c);
        scene.fog.color.setHex(0x7c3a22);
        scene.fog.density = 0.016;
        scene.environmentIntensity = 0.92;
        hemiLight.color.setHex(0xfdba74);
        hemiLight.groundColor.setHex(0x3b2218);
        hemiLight.intensity = 0.95;
        keyLight.color.setHex(0xfb923c);
        keyLight.intensity = 2.85;
        keyLight.position.set(-4.2, 2.6, 1.8);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0x38bdf8);
        rimFill.intensity = 0.72;
      } else {
        // 'room_orion_finale'
        scene.background.setHex(0x060b18);
        scene.fog.color.setHex(0x060b18);
        scene.fog.density = 0.020;
        scene.environmentIntensity = 0.76;
        hemiLight.color.setHex(0xbae6fd);
        hemiLight.groundColor.setHex(0x271f18);
        hemiLight.intensity = 0.68;
        keyLight.color.setHex(0xfef3c7);
        keyLight.intensity = 1.95;
        keyLight.position.set(1.2, 2.6, 1.4);
        deskSpot.intensity = 3.2;
        deskSpot.color.setHex(0xfef08a);
        rimFill.color.setHex(0x7dd3fc);
        rimFill.intensity = 0.65;
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const masterLib = createMasterAssetLibrary(baseMats, ngMats, [
    1, 2, 3, 4, 15, 19, 20, 25, 26, 39, 42, 47, 49, 51, 52, 53, 57, 60, 67,
  ]);
  let pbrReady = false;
  const screens = createCh10Screens();
  const world = createCh10World(scene, baseMats, ngMats, screens, masterLib);
  const audio = new Ch10AudioEngine();

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

  let currentTime = Math.max(0, Math.min(CH10_DURATION, initialTime));
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
      if (currentTime >= CH10_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(CH10_DURATION, t));
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
    const dof = evaluateCh10Timeline(t, world, screens, lights, camera, lookTarget, (h) => {
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
      aperture: dof?.aperture ?? 0.012,
      bloomStrength: dof?.halation ?? 0.24,
      exposure: 1.06,
      aoIntensity: 0.72,
      vignette: 0.24,
    };

    frameCount++;
    if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t,
      subtitle: getCh10Subtitle(t),
      cutin: getCh10Cutin(t),
      simlog: latestSimLog,
      dramaBars: (t >= 60 && t < 82) || (t >= 94 && t < 116) || t >= 140,
      fin: t >= CH10_DURATION - 0.15,
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
      if (currentTime >= CH10_DURATION) {
        currentTime = CH10_DURATION;
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
    film: 'ch10',
    isPbrReady: () => pbrReady,
    libraryStats: masterLib.getStats(),
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH10_DURATION, sec));
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
