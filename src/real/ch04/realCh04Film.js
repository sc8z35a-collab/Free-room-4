import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticIBL, createRealisticMaterialSuite } from '../materials.js';
import { createCh04Screens, createCh04World } from './setsAndScreens04.js';
import { Ch04AudioEngine } from './audio04.js';
import {
  CH04_DURATION,
  CH04_SCENES,
  getCh04Scene,
  getCh04Subtitle,
  getCh04Simlog,
  getCh04Cutin,
  evaluateCh04Director,
} from './director04.js';
import {
  FusedKawaseCinemaPipeline,
  PIDDynamicResolutionController,
} from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh04Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH04_DURATION,
    chapters: CH04_SCENES,
    getChapterForTime: getCh04Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第4章 完',
    finSub: '第一世代機『HMD-01』開発記 — 第4章：線形代数の復習と、逆運動学の暴走（02:30）',
    downloadPrefix: 'hmd01_ch04_2m30s',
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
  scene.background = new THREE.Color(0x090e1a);

  const envRT = createRealisticIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.85;

  const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.015, 120);
  camera.position.set(0.2, 0.95, 0.5);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.12;
  controls.maxDistance = 10;
  controls.enabled = false;

  // Multi-Set Physical Cinematography Lighting Rig
  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3b332b, 0.8);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
  keyLight.position.set(2.4, 4.2, 2.0);
  keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.3;
  keyLight.shadow.camera.far = 16;
  keyLight.shadow.camera.left = -2.8;
  keyLight.shadow.camera.right = 2.8;
  keyLight.shadow.camera.top = 2.8;
  keyLight.shadow.camera.bottom = -2.8;
  keyLight.shadow.bias = -0.0004;
  keyLight.target.position.set(0, 0.8, -0.5);
  scene.add(keyLight, keyLight.target);

  const deskSpot = new THREE.SpotLight(0xffe0a8, 5.2, 3.6, Math.PI * 0.36, 0.55, 1.35);
  deskSpot.position.set(-0.14, 1.13, -0.68);
  deskSpot.target.position.set(0.08, 0.73, -0.50);
  scene.add(deskSpot, deskSpot.target);

  const laptopFill = new THREE.PointLight(0x93c5fd, 0.75, 1.6, 1.5);
  laptopFill.position.set(-0.28, 0.88, -0.58);
  scene.add(laptopFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'may_morning') {
        scene.background.setHex(0xe0f2fe);
        scene.environmentIntensity = 1.05;
        hemiLight.color.setHex(0xf0f9ff);
        hemiLight.groundColor.setHex(0x64748b);
        hemiLight.intensity = 1.25;
        keyLight.color.setHex(0xfffbeb);
        keyLight.intensity = 2.55;
        keyLight.position.set(-3.2, 4.0, 2.2);
        deskSpot.intensity = 0;
        laptopFill.intensity = 0;
      } else if (p === 'lecture_june') {
        scene.background.setHex(0xdbeafe);
        scene.environmentIntensity = 0.92;
        hemiLight.color.setHex(0xe2e8f0);
        hemiLight.groundColor.setHex(0x524132);
        hemiLight.intensity = 1.15;
        keyLight.color.setHex(0xfff7ed);
        keyLight.intensity = 2.35;
        keyLight.position.set(-3.0, 4.2, 1.6);
        deskSpot.intensity = 0;
        laptopFill.intensity = 0;
      } else if (p === 'room_daylight') {
        scene.background.setHex(0xdbeafe);
        scene.environmentIntensity = 0.95;
        hemiLight.color.setHex(0xe0f2fe);
        hemiLight.groundColor.setHex(0x574c3f);
        hemiLight.intensity = 1.15;
        keyLight.color.setHex(0xffffff);
        keyLight.intensity = 2.25;
        keyLight.position.set(-1.2, 3.4, -2.4);
        deskSpot.intensity = 1.5;
        laptopFill.intensity = 0.25;
      } else if (p === 'room_night_drama') {
        scene.background.setHex(0x060913);
        scene.environmentIntensity = 0.45;
        hemiLight.color.setHex(0x475569);
        hemiLight.groundColor.setHex(0x1c1917);
        hemiLight.intensity = 0.45;
        keyLight.color.setHex(0xffd89b);
        keyLight.intensity = 1.25;
        keyLight.position.set(-0.8, 2.7, 0.9);
        deskSpot.intensity = 6.2;
        laptopFill.intensity = 0.95;
      } else if (p === 'room_rainy_night') {
        scene.background.setHex(0x070d1c);
        scene.environmentIntensity = 0.56;
        hemiLight.color.setHex(0x818cf8);
        hemiLight.groundColor.setHex(0x231f20);
        hemiLight.intensity = 0.58;
        keyLight.color.setHex(0xe0e7ff);
        keyLight.intensity = 1.45;
        keyLight.position.set(0.6, 2.9, 1.2);
        deskSpot.intensity = 5.4;
        laptopFill.intensity = 0.85;
      } else {
        scene.background.setHex(0x090e1a);
        scene.environmentIntensity = 0.50;
        hemiLight.color.setHex(0x64748b);
        hemiLight.groundColor.setHex(0x26201b);
        hemiLight.intensity = 0.50;
        keyLight.color.setHex(0xffe4b5);
        keyLight.intensity = 1.3;
        keyLight.position.set(-0.9, 2.8, 1.1);
        deskSpot.intensity = 5.0;
        laptopFill.intensity = 0.75;
      }
    },
  };

  const mats = createRealisticMaterialSuite();
  const screens = createCh04Screens();
  const world = createCh04World(scene, mats, screens);
  const audio = new Ch04AudioEngine();

  const initialScale = isMobile ? 0.88 : 1.0;
  const pipeline = new FusedKawaseCinemaPipeline(
    renderer,
    window.innerWidth * maxDpr,
    window.innerHeight * maxDpr,
    initialScale
  );
  pipeline.compositeMat.uniforms.uVignette.value = 0.22;
  pipeline.compositeMat.uniforms.uExposure.value = 1.05;

  const drs = new PIDDynamicResolutionController(pipeline, {
    minScale: isMobile ? 0.72 : 0.82,
    maxScale: 1.0,
    targetMs: 15.8,
  });

  let currentTime = Math.max(0, Math.min(CH04_DURATION, initialTime));
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
      if (currentTime >= CH04_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(CH04_DURATION, t));
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

  function evaluateFrame(t) {
    const dir = evaluateCh04Director(t, world, screens, lights);

    if (cameraMode === 'CINEMA') {
      camera.position.set(dir.cam.pos[0], dir.cam.pos[1], dir.cam.pos[2]);
      lookTarget.set(dir.cam.look[0], dir.cam.look[1], dir.cam.look[2]);
      camera.lookAt(lookTarget);
      if (Math.abs(camera.fov - dir.cam.fov) > 0.05) {
        camera.fov = dir.cam.fov;
        camera.updateProjectionMatrix();
      }
    } else {
      controls.update();
    }

    frameCount++;
    if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t,
      subtitle: getCh04Subtitle(t),
      cutin: getCh04Cutin(t),
      simlog: getCh04Simlog(t),
      dramaBars: dir.dramaBars,
      fin: dir.fin,
    });

    pipeline.render(scene, camera, dir.fx);
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
      if (currentTime >= CH04_DURATION) {
        currentTime = CH04_DURATION;
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
    film: 'ch04',
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH04_DURATION, sec));
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
    envRT.dispose();
    pipeline.sceneRT.dispose();
    pipeline.bloomA.dispose();
    pipeline.bloomB.dispose();
    renderer.dispose();
  }

  return { dispose, seekTo, setPlaying };
}
