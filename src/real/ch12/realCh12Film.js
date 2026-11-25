import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createMasterAssetLibrary } from '../library/masterLibrary.js';
import { createCh12Screens, createCh12World } from './setsAndScreens12.js';
import {
  CH12_DURATION,
  CH12_SCENES,
  getCh12Scene,
  getCh12Subtitle,
  getCh12Cutin,
  evaluateCh12Timeline,
} from './timeline12.js';
import { Ch12AudioEngine } from './audio12.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh12Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH12_DURATION,
    chapters: CH12_SCENES,
    getChapterForTime: getCh12Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第12章 完',
    finSub: '第二部『HMD-02』編 第12章：聖夜の閃光と、柔らかい鉄（残金 ¥386,320）→ 第13章『オシロスコープの幽霊』へ',
    downloadPrefix: 'hmd02_ch12_christmas_flash_soft_iron_2m30s_nextgen',
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
  scene.background = new THREE.Color(0x0c1322);
  scene.fog = new THREE.FogExp2(0x0c1322, 0.018);

  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.88;

  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.02, 140);
  camera.position.set(-0.18, 0.89, -0.22);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.08;
  controls.maxDistance = 18;
  controls.enabled = false;

  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3b332b, 0.85);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff5e4, 2.2);
  keyLight.position.set(1.8, 3.6, 2.2);
  keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.3;
  keyLight.shadow.camera.far = 24;
  keyLight.shadow.camera.left = -5.5;
  keyLight.shadow.camera.right = 5.5;
  keyLight.shadow.camera.top = 5.5;
  keyLight.shadow.camera.bottom = -5.5;
  keyLight.shadow.bias = -0.0003;
  keyLight.target.position.set(0, 0.5, 0);
  scene.add(keyLight, keyLight.target);

  const deskSpot = new THREE.SpotLight(0xffe0a3, 3.6, 5.0, Math.PI * 0.45, 0.5, 1.2);
  deskSpot.position.set(0.18, 1.42, -0.32);
  deskSpot.target.position.set(-0.02, 0.78, -0.48);
  scene.add(deskSpot, deskSpot.target);

  const rimFill = new THREE.PointLight(0x38bdf8, 0.9, 6.5, 1.2);
  rimFill.position.set(-1.4, 1.4, 1.2);
  scene.add(rimFill);

  // Dedicated dynamic blast flash point light right at the 46mm circular PCB for Christmas Eve shoot-through!
  const flashLight = new THREE.PointLight(0xff8c2b, 0.0, 6.0);
  flashLight.position.set(-0.056, 0.88, -0.38);
  scene.add(flashLight);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'room_winter_macro') {
        scene.background.setHex(0x070c16);
        scene.fog.color.setHex(0x070c16);
        scene.fog.density = 0.022;
        scene.environmentIntensity = 0.96;
        hemiLight.color.setHex(0xbae6fd); hemiLight.groundColor.setHex(0x271e18); hemiLight.intensity = 0.68;
        keyLight.color.setHex(0xfff4e0); keyLight.intensity = 2.40; keyLight.position.set(1.2, 2.4, 1.4);
        deskSpot.intensity = 4.6; deskSpot.color.setHex(0xfff4d6); deskSpot.position.set(0.18, 1.38, -0.28);
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 1.05;
      } else if (p === 'xmas_rotary_night') {
        scene.background.setHex(0x050914);
        scene.fog.color.setHex(0x091020);
        scene.fog.density = 0.022;
        scene.environmentIntensity = 0.72;
        hemiLight.color.setHex(0x93c5fd); hemiLight.groundColor.setHex(0x1e1b2e); hemiLight.intensity = 0.75;
        keyLight.color.setHex(0xf8fafc); keyLight.intensity = 2.10; keyLight.position.set(2.0, 5.2, 2.8);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0xfef08a); rimFill.intensity = 1.25;
      } else if (p === 'room_winter_night') {
        scene.background.setHex(0x09101d);
        scene.fog.color.setHex(0x09101d);
        scene.fog.density = 0.020;
        scene.environmentIntensity = 0.78;
        hemiLight.color.setHex(0x94a3b8); hemiLight.groundColor.setHex(0x27201b); hemiLight.intensity = 0.72;
        keyLight.color.setHex(0xfff1d6); keyLight.intensity = 2.15; keyLight.position.set(1.2, 2.8, 1.8);
        deskSpot.intensity = 3.6; deskSpot.color.setHex(0xffd28a); deskSpot.position.set(0.20, 1.36, -0.30);
        rimFill.color.setHex(0x60a5fa); rimFill.intensity = 0.85;
      } else if (p === 'rural_frost_dusk') {
        scene.background.setHex(0x3a2e46);
        scene.fog.color.setHex(0x463650);
        scene.fog.density = 0.014;
        scene.environmentIntensity = 0.92;
        hemiLight.color.setHex(0xfed7aa); hemiLight.groundColor.setHex(0x334155); hemiLight.intensity = 1.05;
        keyLight.color.setHex(0xfdba74); keyLight.intensity = 2.55; keyLight.position.set(-4.2, 2.8, 6.2);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0x93c5fd); rimFill.intensity = 0.95;
      } else if (p === 'kotatsu_warm_home') {
        scene.background.setHex(0x2b1d14);
        scene.fog.color.setHex(0x2b1d14);
        scene.fog.density = 0.018;
        scene.environmentIntensity = 0.98;
        hemiLight.color.setHex(0xfef3c7); hemiLight.groundColor.setHex(0x52260d); hemiLight.intensity = 1.15;
        keyLight.color.setHex(0xffe4b5); keyLight.intensity = 2.25; keyLight.position.set(1.4, 2.8, 1.6);
        deskSpot.intensity = 3.4; deskSpot.color.setHex(0xffc978); deskSpot.position.set(0.0, 1.95, -0.45);
        rimFill.color.setHex(0xfb923c); rimFill.intensity = 0.75;
      } else if (p === 'childhood_midnight') {
        scene.background.setHex(0x0a0f1c);
        scene.fog.color.setHex(0x0a0f1c);
        scene.fog.density = 0.024;
        scene.environmentIntensity = 0.68;
        hemiLight.color.setHex(0x93c5fd); hemiLight.groundColor.setHex(0x0f172a); hemiLight.intensity = 0.65;
        keyLight.color.setHex(0xbae6fd); keyLight.intensity = 1.65; keyLight.position.set(-1.5, 2.2, 1.2);
        deskSpot.intensity = 2.4; deskSpot.color.setHex(0xfde68a); deskSpot.position.set(-0.24, 1.25, -0.78);
        rimFill.color.setHex(0xfbbf24); rimFill.intensity = 0.85;
      } else {
        // 'new_year_morning'
        scene.background.setHex(0xdbeafe);
        scene.fog.color.setHex(0xe0f2fe);
        scene.fog.density = 0.010;
        scene.environmentIntensity = 1.18;
        hemiLight.color.setHex(0xffffff); hemiLight.groundColor.setHex(0xfef3c7); hemiLight.intensity = 1.28;
        keyLight.color.setHex(0xfffbeb); keyLight.intensity = 2.95; keyLight.position.set(2.4, 3.2, 1.8);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0x93c5fd); rimFill.intensity = 0.65;
      }
    },
    setFlashIntensity(v) {
      flashLight.intensity = v;
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  // Preload all Photographic PBR Atlases used across Chapter 12's 4 sets!
  const masterLib = createMasterAssetLibrary(baseMats, ngMats, [
    1, 2, 3, 4, 12, 15, 20, 23, 25, 26, 39, 43, 46, 47, 50, 51, 52, 53, 57, 59, 65, 77, 80, 84, 85,
  ]);
  let pbrReady = false;
  const screens = createCh12Screens();
  const world = createCh12World(scene, baseMats, ngMats, screens, masterLib);
  const audio = new Ch12AudioEngine();

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

  let currentTime = Math.max(0, Math.min(CH12_DURATION, initialTime));
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
      if (currentTime >= CH12_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(CH12_DURATION, t));
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
    const dof = evaluateCh12Timeline(t, world, screens, lights, camera, lookTarget, (h) => {
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
      aperture: dof?.aperture ?? 0.014,
      bloomStrength: dof?.halation ?? 0.28,
      exposure: 1.08,
      aoIntensity: 0.72,
      vignette: 0.24,
    };

    frameCount++;
    if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t,
      subtitle: getCh12Subtitle(t),
      cutin: getCh12Cutin(t),
      simlog: latestSimLog,
      dramaBars: (t >= 52 && t < 65) || (t >= 96 && t < 112) || t >= 126,
      fin: t >= CH12_DURATION - 0.15,
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
      if (currentTime >= CH12_DURATION) {
        currentTime = CH12_DURATION;
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
    film: 'ch12',
    isPbrReady: () => pbrReady,
    libraryStats: masterLib.getStats(),
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH12_DURATION, sec));
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
