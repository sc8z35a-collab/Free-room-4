import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createCh06Screens, createCh06World } from './setsAndScreens06.js';
import { Ch06AudioEngine } from './audio06.js';
import {
  CH06_DURATION,
  CH06_SCENES,
  getCh06Scene,
  getCh06Subtitle,
  getCh06Simlog,
  getCh06Cutin,
  evaluateCh06Director,
} from './director06.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh06Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH06_DURATION,
    chapters: CH06_SCENES,
    getChapterForTime: getCh06Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第6章 完',
    finSub: '第一世代機『HMD-01』開発記 — 第6章：夏休みの全身組立と、起立不能の重力（02:30）',
    downloadPrefix: 'hmd01_ch06_2m30s_nextgen',
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

  // Next-Gen 1024x512 Multi-Softbox Studio HDRI Environment Reflections!
  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.88;

  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.015, 120);
  camera.position.set(0.1, 0.9, 0.2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.10;
  controls.maxDistance = 8;
  controls.enabled = false;

  // Precision Multi-Source Cinema Lighting Rig covering both Workbench & EVA Floor Arena!
  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3b332b, 0.82);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.25);
  keyLight.position.set(1.5, 3.2, 1.4);
  keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.3;
  keyLight.shadow.camera.far = 12;
  keyLight.shadow.camera.left = -2.0;
  keyLight.shadow.camera.right = 2.0;
  keyLight.shadow.camera.top = 2.0;
  keyLight.shadow.camera.bottom = -2.0;
  keyLight.shadow.bias = -0.0003;
  keyLight.target.position.set(0.08, 0.45, -0.05);
  scene.add(keyLight, keyLight.target);

  const deskSpot = new THREE.SpotLight(0xffe2ad, 4.8, 3.6, Math.PI * 0.42, 0.5, 1.3);
  deskSpot.position.set(-0.06, 1.35, -0.58);
  deskSpot.target.position.set(0.08, 0.75, -0.48);
  scene.add(deskSpot, deskSpot.target);

  const floorFill = new THREE.PointLight(0x93c5fd, 0.85, 2.8, 1.4);
  floorFill.position.set(0.38, 0.72, 0.88);
  scene.add(floorFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'lecture_cool') {
        scene.background.setHex(0xdce6f2);
        scene.environmentIntensity = 0.86;
        hemiLight.color.setHex(0xe0f2fe);
        hemiLight.groundColor.setHex(0x475569);
        hemiLight.intensity = 1.05;
        keyLight.color.setHex(0xf8fafc);
        keyLight.intensity = 2.05;
        keyLight.position.set(1.1, 3.4, 1.0);
        deskSpot.intensity = 1.4;
        floorFill.intensity = 0.2;
      } else if (p === 'summer_cumulonimbus') {
        scene.background.setHex(0x38bdf8);
        scene.environmentIntensity = 1.15;
        hemiLight.color.setHex(0xe0f2fe);
        hemiLight.groundColor.setHex(0x4d3f2f);
        hemiLight.intensity = 1.25;
        keyLight.color.setHex(0xfff7ed);
        keyLight.intensity = 2.65;
        keyLight.position.set(1.8, 3.6, 1.6);
        deskSpot.intensity = 0.6;
        floorFill.intensity = 0.3;
      } else if (p === 'room_aug_31c') {
        scene.background.setHex(0x0c111d);
        scene.environmentIntensity = 0.82;
        hemiLight.color.setHex(0xfef3c7);
        hemiLight.groundColor.setHex(0x2d241e);
        hemiLight.intensity = 0.76;
        keyLight.color.setHex(0xfff1d6);
        keyLight.intensity = 2.15;
        keyLight.position.set(1.2, 3.1, 1.3);
        deskSpot.intensity = 4.6;
        floorFill.intensity = 0.5;
      } else if (p === 'room_eva_test') {
        scene.background.setHex(0x111726);
        scene.environmentIntensity = 0.92;
        hemiLight.color.setHex(0xe2e8f0);
        hemiLight.groundColor.setHex(0x27272a);
        hemiLight.intensity = 0.92;
        keyLight.color.setHex(0xfff7ed);
        keyLight.intensity = 2.35;
        keyLight.position.set(1.6, 2.8, 1.8);
        deskSpot.intensity = 1.4;
        floorFill.color.setHex(0xbae6fd);
        floorFill.intensity = 1.65;
      } else if (p === 'room_west_sun_32c') {
        // Blazing August 3:00 PM West Sun ("西日が差し込む32.4℃の密室")!
        scene.background.setHex(0x1f120b);
        scene.environmentIntensity = 0.95;
        hemiLight.color.setHex(0xfdba74);
        hemiLight.groundColor.setHex(0x3b1d12);
        hemiLight.intensity = 0.88;
        keyLight.color.setHex(0xfb923c);
        keyLight.intensity = 2.95;
        keyLight.position.set(-1.8, 1.7, -1.2);
        deskSpot.intensity = 1.8;
        floorFill.color.setHex(0xfed7aa);
        floorFill.intensity = 1.55;
      } else if (p === 'room_heat_macro') {
        // Dramatic warm-crimson inspection spot over the 63°C heat-crept PLA+ knee bracket!
        scene.background.setHex(0x0c070a);
        scene.environmentIntensity = 0.72;
        hemiLight.color.setHex(0xfecaca);
        hemiLight.groundColor.setHex(0x1f1414);
        hemiLight.intensity = 0.56;
        keyLight.color.setHex(0xfff1f2);
        keyLight.intensity = 2.15;
        keyLight.position.set(0.8, 2.4, 1.2);
        deskSpot.intensity = 4.2;
        floorFill.intensity = 0.4;
      } else {
        // 'room_midnight_01am' (Serene blue-amber 01:00 AM epiphany!)
        scene.background.setHex(0x050914);
        scene.environmentIntensity = 0.66;
        hemiLight.color.setHex(0x64748b);
        hemiLight.groundColor.setHex(0x1c1917);
        hemiLight.intensity = 0.54;
        keyLight.color.setHex(0xffdfa8);
        keyLight.intensity = 1.55;
        keyLight.position.set(0.9, 2.6, 1.1);
        deskSpot.intensity = 4.8;
        floorFill.color.setHex(0x38bdf8);
        floorFill.intensity = 0.55;
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const screens = createCh06Screens();
  const world = createCh06World(scene, baseMats, ngMats, screens);
  const audio = new Ch06AudioEngine();

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

  let currentTime = Math.max(0, Math.min(CH06_DURATION, initialTime));
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
      if (currentTime >= CH06_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(CH06_DURATION, t));
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
    const dir = evaluateCh06Director(t, world, screens, lights);

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

    // Automatic Laser-Exact Optical Lens Autofocus onto the exact 3D Look Target!
    dir.fx.focusDist = camera.position.distanceTo(lookTarget);

    frameCount++;
    if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t,
      subtitle: getCh06Subtitle(t),
      cutin: getCh06Cutin(t),
      simlog: getCh06Simlog(t),
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
      if (currentTime >= CH06_DURATION) {
        currentTime = CH06_DURATION;
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
    film: 'ch06',
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH06_DURATION, sec));
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
    pipeline.dispose();
    renderer.dispose();
  }

  return { dispose, seekTo, setPlaying };
}
