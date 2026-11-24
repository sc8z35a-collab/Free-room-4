import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createMasterAssetLibrary } from '../library/masterLibrary.js';
import { createCh09Screens, createCh09World } from './setsAndScreens09.js';
import { Ch09AudioEngine } from './audio09.js';
import {
  CH09_DURATION,
  CH09_SCENES,
  getCh09Scene,
  getCh09Subtitle,
  getCh09Simlog,
  getCh09Cutin,
  evaluateCh09Director,
} from './director09.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh09Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH09_DURATION,
    chapters: CH09_SCENES,
    getChapterForTime: getCh09Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第9章 完',
    finSub: '第一世代機『HMD-01』開発記 — 第9章：破壊と修復のループ、銀色の添え木（02:30）',
    downloadPrefix: 'hmd01_ch09_2m30s_nextgen',
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

  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.88;

  const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.015, 140);
  camera.position.set(0.1, 1.0, 0.6);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.10;
  controls.maxDistance = 12;
  controls.enabled = false;

  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3b332b, 0.84);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
  keyLight.position.set(1.5, 3.4, 1.8);
  keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.3;
  keyLight.shadow.camera.far = 18;
  keyLight.shadow.camera.left = -3.2;
  keyLight.shadow.camera.right = 3.2;
  keyLight.shadow.camera.top = 3.2;
  keyLight.shadow.camera.bottom = -3.2;
  keyLight.shadow.bias = -0.0003;
  keyLight.target.position.set(0, 0.4, 0.6);
  scene.add(keyLight, keyLight.target);

  const deskSpot = new THREE.SpotLight(0xffe2ad, 3.4, 3.8, Math.PI * 0.44, 0.5, 1.3);
  deskSpot.position.set(-0.06, 1.35, -0.58);
  deskSpot.target.position.set(0.06, 0.74, -0.48);
  scene.add(deskSpot, deskSpot.target);

  const rimFill = new THREE.PointLight(0x93c5fd, 0.9, 4.5, 1.3);
  rimFill.position.set(0.85, 0.95, 1.85);
  scene.add(rimFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'campus_kinmokusei') {
        scene.background.setHex(0x2d1b2e);
        scene.environmentIntensity = 0.96;
        hemiLight.color.setHex(0xfdba74);
        hemiLight.groundColor.setHex(0x27202b);
        hemiLight.intensity = 1.05;
        keyLight.color.setHex(0xfb923c);
        keyLight.intensity = 2.65;
        keyLight.position.set(-2.5, 2.2, -3.5);
        deskSpot.intensity = 0;
        rimFill.intensity = 0.35;
      } else if (p === 'room_hard_practice') {
        scene.background.setHex(0x101522);
        scene.environmentIntensity = 0.88;
        hemiLight.color.setHex(0xe2e8f0);
        hemiLight.groundColor.setHex(0x2a241e);
        hemiLight.intensity = 0.86;
        keyLight.color.setHex(0xfff7ed);
        keyLight.intensity = 2.25;
        keyLight.position.set(1.4, 3.0, 1.6);
        deskSpot.intensity = 1.2;
        rimFill.intensity = 1.2;
      } else if (p === 'room_doorway_bulb') {
        scene.background.setHex(0x05070e);
        scene.environmentIntensity = 0.42;
        hemiLight.color.setHex(0x64748b);
        hemiLight.groundColor.setHex(0x181410);
        hemiLight.intensity = 0.42;
        keyLight.color.setHex(0xffd27d);
        keyLight.intensity = 0.95;
        keyLight.position.set(-1.8, 2.2, 0.6);
        deskSpot.intensity = 0.4;
        rimFill.intensity = 0.4;
      } else if (p === 'viaduct_night') {
        scene.background.setHex(0x050812);
        scene.environmentIntensity = 0.48;
        hemiLight.color.setHex(0x475569);
        hemiLight.groundColor.setHex(0x111318);
        hemiLight.intensity = 0.46;
        keyLight.color.setHex(0x93c5fd);
        keyLight.intensity = 0.95;
        keyLight.position.set(1.8, 3.5, 2.5);
        deskSpot.intensity = 0;
        rimFill.color.setHex(0x60a5fa);
        rimFill.intensity = 0.75;
      } else if (p === 'room_01am_despair') {
        scene.background.setHex(0x03050a);
        scene.environmentIntensity = 0.35;
        hemiLight.color.setHex(0x475569);
        hemiLight.groundColor.setHex(0x141210);
        hemiLight.intensity = 0.42;
        keyLight.color.setHex(0x94a3b8);
        keyLight.intensity = 0.85;
        keyLight.position.set(0.6, 2.2, 1.2);
        deskSpot.intensity = 0.5;
        rimFill.color.setHex(0x38bdf8);
        rimFill.intensity = 0.6;
      } else if (p === 'room_morning_hope') {
        scene.background.setHex(0xdbeafe);
        scene.environmentIntensity = 1.05;
        hemiLight.color.setHex(0xfef3c7);
        hemiLight.groundColor.setHex(0x473c30);
        hemiLight.intensity = 1.08;
        keyLight.color.setHex(0xfffbeb);
        keyLight.intensity = 2.45;
        keyLight.position.set(1.4, 3.2, 1.6);
        deskSpot.intensity = 1.2;
        rimFill.intensity = 0.5;
      } else if (p === 'room_craft_focus') {
        scene.background.setHex(0x080c16);
        scene.environmentIntensity = 0.82;
        hemiLight.color.setHex(0xdbeafe);
        hemiLight.groundColor.setHex(0x28211b);
        hemiLight.intensity = 0.74;
        keyLight.color.setHex(0xfff3d6);
        keyLight.intensity = 2.05;
        keyLight.position.set(1.1, 2.8, 1.2);
        deskSpot.intensity = 3.8;
        rimFill.intensity = 0.6;
      } else {
        // 'viaduct_climax' (Crisp rain-washed night + bright white lantern pool!)
        scene.background.setHex(0x040711);
        scene.environmentIntensity = 0.62;
        hemiLight.color.setHex(0x7dd3fc);
        hemiLight.groundColor.setHex(0x14171f);
        hemiLight.intensity = 0.56;
        keyLight.color.setHex(0xe0f2fe);
        keyLight.intensity = 1.45;
        keyLight.position.set(1.6, 3.2, 3.6);
        deskSpot.intensity = 0;
        rimFill.color.setHex(0xbae6fd);
        rimFill.intensity = 1.45;
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const masterLib = createMasterAssetLibrary(baseMats, ngMats, [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 16, 25, 26, 39, 40, 48, 51, 56, 57]);
  let pbrReady = false;
  const screens = createCh09Screens();
  const world = createCh09World(scene, baseMats, ngMats, screens, masterLib);
  const audio = new Ch09AudioEngine();

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

  let currentTime = Math.max(0, Math.min(CH09_DURATION, initialTime));
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
      if (currentTime >= CH09_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(CH09_DURATION, t));
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
    const dir = evaluateCh09Director(t, world, screens, lights);

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

    dir.fx.focusDist = camera.position.distanceTo(lookTarget);

    frameCount++;
    if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t,
      subtitle: getCh09Subtitle(t),
      cutin: getCh09Cutin(t),
      simlog: getCh09Simlog(t),
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
      if (currentTime >= CH09_DURATION) {
        currentTime = CH09_DURATION;
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
    film: 'ch09',
    isPbrReady: () => pbrReady,
    libraryStats: masterLib.getStats(),
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH09_DURATION, sec));
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
