import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createMasterAssetLibrary } from '../library/masterLibrary.js';
import { createCh14Screens, createCh14World } from './setsAndScreens14.js';
import {
  CH14_DURATION,
  CH14_SCENES,
  getCh14Scene,
  getCh14Subtitle,
  getCh14Cutin,
  evaluateCh14Timeline,
} from './timeline14.js';
import { Ch14AudioEngine } from './audio14.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh14Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH14_DURATION,
    chapters: CH14_SCENES,
    getChapterForTime: getCh14Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第14章 完',
    finSub: '第二部『HMD-02』編 第14章：黒い金属と炭素の骨格（残金 ¥347,220）→ 第15章『仮想空間の四千人の分身』へ',
    downloadPrefix: 'hmd02_ch14_black_cnc_carbon_skeleton_2m30s_nextgen',
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
  scene.background = new THREE.Color(0x060a14);
  scene.fog = new THREE.FogExp2(0x060a14, 0.018);

  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.90;

  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.02, 140);
  camera.position.set(0.05, 0.90, -0.18);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.08;
  controls.maxDistance = 18;
  controls.enabled = false;

  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x2b2420, 0.78);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff5e4, 2.2);
  keyLight.position.set(1.8, 3.6, 2.2);
  keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.3;
  keyLight.shadow.camera.far = 24;
  keyLight.shadow.camera.left = -5.0;
  keyLight.shadow.camera.right = 5.0;
  keyLight.shadow.camera.top = 5.0;
  keyLight.shadow.camera.bottom = -5.0;
  keyLight.shadow.bias = -0.0003;
  keyLight.target.position.set(0, 0.5, 0);
  scene.add(keyLight, keyLight.target);

  const deskSpot = new THREE.SpotLight(0xffe0a3, 3.8, 5.5, Math.PI * 0.48, 0.5, 1.2);
  deskSpot.position.set(0.25, 1.55, -0.15);
  deskSpot.target.position.set(0.0, 0.75, -0.45);
  scene.add(deskSpot, deskSpot.target);

  const rimFill = new THREE.PointLight(0x38bdf8, 1.1, 6.5, 1.2);
  rimFill.position.set(-1.3, 1.2, 1.4);
  scene.add(rimFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'room_4am_dark') {
        scene.background.setHex(0x040710);
        scene.fog.color.setHex(0x040710);
        scene.fog.density = 0.026;
        scene.environmentIntensity = 0.42;
        hemiLight.color.setHex(0x93c5fd); hemiLight.groundColor.setHex(0x0f172a); hemiLight.intensity = 0.38;
        keyLight.color.setHex(0xbae6fd); keyLight.intensity = 0.85; keyLight.position.set(0.6, 2.0, 1.2);
        deskSpot.intensity = 1.2; deskSpot.color.setHex(0x7dd3fc);
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 0.55;
      } else if (p === 'room_desk_bright') {
        scene.background.setHex(0x0d1422);
        scene.fog.color.setHex(0x0d1422);
        scene.fog.density = 0.018;
        scene.environmentIntensity = 0.96;
        hemiLight.color.setHex(0xe0f2fe); hemiLight.groundColor.setHex(0x271e18); hemiLight.intensity = 0.84;
        keyLight.color.setHex(0xfff7ed); keyLight.intensity = 2.45; keyLight.position.set(1.2, 2.8, 1.8);
        deskSpot.intensity = 4.4; deskSpot.color.setHex(0xfff4d6); deskSpot.position.set(0.22, 1.48, -0.20);
        deskSpot.target.position.set(0.0, 0.76, -0.44);
        rimFill.color.setHex(0x7dd3fc); rimFill.intensity = 0.95;
      } else if (p === 'konbini_rain_night') {
        scene.background.setHex(0x080d18);
        scene.fog.color.setHex(0x0c1424);
        scene.fog.density = 0.028;
        scene.environmentIntensity = 0.72;
        hemiLight.color.setHex(0x93c5fd); hemiLight.groundColor.setHex(0x1e293b); hemiLight.intensity = 0.74;
        keyLight.color.setHex(0xfef3c7); keyLight.intensity = 2.25; keyLight.position.set(-1.6, 2.8, 1.2);
        deskSpot.intensity = 2.8; deskSpot.color.setHex(0xfde68a); deskSpot.position.set(-1.4, 2.4, -1.6);
        deskSpot.target.position.set(0.0, 1.1, -1.1);
        rimFill.color.setHex(0x60a5fa); rimFill.intensity = 1.05;
      } else if (p === 'room_may_daylight') {
        scene.background.setHex(0xdbeafe);
        scene.fog.color.setHex(0xe2e8f0);
        scene.fog.density = 0.010;
        scene.environmentIntensity = 1.18;
        hemiLight.color.setHex(0xffffff); hemiLight.groundColor.setHex(0x6b5344); hemiLight.intensity = 1.22;
        keyLight.color.setHex(0xfffbeb); keyLight.intensity = 2.95; keyLight.position.set(2.4, 3.8, 2.4);
        deskSpot.intensity = 1.2; deskSpot.color.setHex(0xfffbeb);
        rimFill.color.setHex(0x93c5fd); rimFill.intensity = 0.75;
      } else {
        // 'room_gantry_birth' — Dramatic warm indirect desk-lamp + cool metallic rim sculpting jet-black CNC HMD-02!
        scene.background.setHex(0x090d16);
        scene.fog.color.setHex(0x090d16);
        scene.fog.density = 0.020;
        scene.environmentIntensity = 1.08;
        hemiLight.color.setHex(0xbae6fd); hemiLight.groundColor.setHex(0x2d2219); hemiLight.intensity = 0.72;
        keyLight.color.setHex(0xffdfaa); keyLight.intensity = 2.45; keyLight.position.set(1.6, 2.2, 1.8);
        deskSpot.intensity = 4.6; deskSpot.color.setHex(0xffd28a); deskSpot.position.set(0.85, 1.62, 0.85);
        deskSpot.target.position.set(0.08, 0.42, 0.18);
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 1.65; rimFill.position.set(-1.1, 0.95, -0.4);
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const masterLib = createMasterAssetLibrary(baseMats, ngMats, [
    1, 2, 3, 4, 15, 20, 23, 25, 26, 35, 39, 46, 47, 50, 51, 52, 53, 57, 59, 77, 80, 84, 85,
  ]);
  let pbrReady = false;
  const screens = createCh14Screens();
  const world = createCh14World(scene, baseMats, ngMats, screens, masterLib);
  const audio = new Ch14AudioEngine();

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

  let currentTime = Math.max(0, Math.min(CH14_DURATION, initialTime));
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
      if (currentTime >= CH14_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(CH14_DURATION, t));
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
    const dof = evaluateCh14Timeline(t, world, screens, lights, camera, lookTarget, (h) => {
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
      subtitle: getCh14Subtitle(t),
      cutin: getCh14Cutin(t),
      simlog: latestSimLog,
      dramaBars: (t >= 76 && t < 90) || t >= 108,
      fin: t >= CH14_DURATION - 0.15,
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
      if (currentTime >= CH14_DURATION) {
        currentTime = CH14_DURATION;
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
    film: 'ch14',
    isPbrReady: () => pbrReady,
    libraryStats: masterLib.getStats(),
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH14_DURATION, sec));
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
