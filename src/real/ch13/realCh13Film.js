import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createMasterAssetLibrary } from '../library/masterLibrary.js';
import { createCh13Screens, createCh13World } from './setsAndScreens13.js';
import {
  CH13_DURATION,
  CH13_SCENES,
  getCh13Scene,
  getCh13Subtitle,
  getCh13Cutin,
  evaluateCh13Timeline,
} from './timeline13.js';
import { Ch13AudioEngine } from './audio13.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh13Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH13_DURATION,
    chapters: CH13_SCENES,
    getChapterForTime: getCh13Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第13章 完',
    finSub: '第二部『HMD-02』編 第13章：オシロスコープの幽霊（残金 ¥426,220）→ 第14章『黒い金属と炭素の骨格』へ',
    downloadPrefix: 'hmd02_ch13_oscilloscope_ghost_2m30s_nextgen',
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
  scene.fog = new THREE.FogExp2(0x0b1220, 0.016);

  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.88;

  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.02, 140);
  camera.position.set(0.05, 0.90, -0.18);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.08;
  controls.maxDistance = 20;
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

  const deskSpot = new THREE.SpotLight(0xffe0a3, 3.6, 5.2, Math.PI * 0.48, 0.5, 1.2);
  deskSpot.position.set(0.15, 1.48, -0.25);
  deskSpot.target.position.set(0.0, 0.78, -0.45);
  scene.add(deskSpot, deskSpot.target);

  const rimFill = new THREE.PointLight(0x38bdf8, 0.85, 6.5, 1.2);
  rimFill.position.set(-1.4, 1.4, 1.2);
  scene.add(rimFill);

  // Dedicated glowing blue-cyan CRT screen light for pitch-dark Oscilloscope reveal scenes!
  const scopeGlow = new THREE.PointLight(0x38bdf8, 0.0, 4.5);
  scopeGlow.position.set(-0.08, 0.86, -0.42);
  scene.add(scopeGlow);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'room_spring_lamp') {
        scene.background.setHex(0x0c1322);
        scene.fog.color.setHex(0x0c1322);
        scene.fog.density = 0.018;
        scene.environmentIntensity = 0.90;
        hemiLight.color.setHex(0xe0f2fe); hemiLight.groundColor.setHex(0x271e18); hemiLight.intensity = 0.76;
        keyLight.color.setHex(0xfff4e0); keyLight.intensity = 2.25; keyLight.position.set(1.2, 2.8, 1.8);
        deskSpot.intensity = 4.2; deskSpot.color.setHex(0xfff2d2); deskSpot.position.set(0.15, 1.48, -0.25);
        rimFill.color.setHex(0x7dd3fc); rimFill.intensity = 0.85;
      } else if (p === 'sakura_spring_sun') {
        scene.background.setHex(0x93c5fd);
        scene.fog.color.setHex(0xffe4ec);
        scene.fog.density = 0.006;
        scene.environmentIntensity = 1.18;
        hemiLight.color.setHex(0xfff1f2); hemiLight.groundColor.setHex(0x78553a); hemiLight.intensity = 1.24;
        keyLight.color.setHex(0xfffbeb); keyLight.intensity = 2.95; keyLight.position.set(4.5, 7.5, 4.5);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0xfbcfe8); rimFill.intensity = 0.45;
      } else if (p === 'uni_lab_day') {
        scene.background.setHex(0xe2e8f0);
        scene.fog.color.setHex(0xe2e8f0);
        scene.fog.density = 0.009;
        scene.environmentIntensity = 1.05;
        hemiLight.color.setHex(0xf8fafc); hemiLight.groundColor.setHex(0x64748b); hemiLight.intensity = 1.22;
        keyLight.color.setHex(0xf8fafc); keyLight.intensity = 2.35; keyLight.position.set(2.0, 4.2, 2.4);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 0.50;
      } else if (p === 'akihabara_dim') {
        scene.background.setHex(0x11151c);
        scene.fog.color.setHex(0x11151c);
        scene.fog.density = 0.032;
        scene.environmentIntensity = 0.58;
        hemiLight.color.setHex(0xcbd5e1); hemiLight.groundColor.setHex(0x1e293b); hemiLight.intensity = 0.56;
        keyLight.color.setHex(0xffe9b5); keyLight.intensity = 1.75; keyLight.position.set(0.6, 2.2, 1.4);
        deskSpot.intensity = 4.2; deskSpot.color.setHex(0xfef08a); deskSpot.position.set(0.0, 1.25, -0.45);
        deskSpot.target.position.set(0.0, 0.34, -1.16);
        rimFill.color.setHex(0x94a3b8); rimFill.intensity = 0.55;
      } else if (p === 'train_evening') {
        scene.background.setHex(0x171b24);
        scene.fog.color.setHex(0x171b24);
        scene.fog.density = 0.022;
        scene.environmentIntensity = 0.86;
        hemiLight.color.setHex(0xfef3c7); hemiLight.groundColor.setHex(0x1e293b); hemiLight.intensity = 0.96;
        keyLight.color.setHex(0xffedd5); keyLight.intensity = 2.15; keyLight.position.set(0.4, 2.5, 1.6);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0xfbbf24); rimFill.intensity = 0.85;
      } else {
        // 'room_scope_dark' — Pitch-black Room 203 illuminated ONLY by the glowing blue-grid CRT!
        scene.background.setHex(0x020611);
        scene.fog.color.setHex(0x020611);
        scene.fog.density = 0.035;
        scene.environmentIntensity = 0.24;
        hemiLight.color.setHex(0x38bdf8); hemiLight.groundColor.setHex(0x020617); hemiLight.intensity = 0.26;
        keyLight.color.setHex(0x7dd3fc); keyLight.intensity = 0.42; keyLight.position.set(-0.4, 1.8, 1.2);
        deskSpot.intensity = 0.0;
        rimFill.color.setHex(0x0284c7); rimFill.intensity = 0.55;
      }
    },
    setScopeGlow(v) {
      scopeGlow.intensity = v;
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const masterLib = createMasterAssetLibrary(baseMats, ngMats, [
    1, 2, 3, 4, 15, 20, 23, 25, 26, 39, 46, 47, 50, 51, 52, 53, 57, 59, 77, 80, 84, 85,
  ]);
  let pbrReady = false;
  const screens = createCh13Screens();
  const world = createCh13World(scene, baseMats, ngMats, screens, masterLib);
  const audio = new Ch13AudioEngine();

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

  let currentTime = Math.max(0, Math.min(CH13_DURATION, initialTime));
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
      if (currentTime >= CH13_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(CH13_DURATION, t));
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
    const dof = evaluateCh13Timeline(t, world, screens, lights, camera, lookTarget, (h) => {
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
      aperture: dof?.aperture ?? 0.010,
      bloomStrength: dof?.halation ?? 0.28,
      exposure: 1.08,
      aoIntensity: 0.72,
      vignette: 0.24,
    };

    frameCount++;
    if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t,
      subtitle: getCh13Subtitle(t),
      cutin: getCh13Cutin(t),
      simlog: latestSimLog,
      dramaBars: (t >= 45 && t < 62) || (t >= 82 && t < 104) || t >= 132,
      fin: t >= CH13_DURATION - 0.15,
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
      if (currentTime >= CH13_DURATION) {
        currentTime = CH13_DURATION;
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
    film: 'ch13',
    isPbrReady: () => pbrReady,
    libraryStats: masterLib.getStats(),
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH13_DURATION, sec));
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
