import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createCh08Screens, createCh08World } from './setsAndScreens08.js';
import { Ch08AudioEngine } from './audio08.js';
import {
  CH08_DURATION,
  CH08_SCENES,
  getCh08Scene,
  getCh08Subtitle,
  getCh08Simlog,
  getCh08Cutin,
  evaluateCh08Director,
} from './director08.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh08Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH08_DURATION,
    chapters: CH08_SCENES,
    getChapterForTime: getCh08Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第8章 完',
    finSub: '第一世代機『HMD-01』開発記 — 第8章：ZMP（ゼロモーメントポイント）と1ミリ秒の壁（02:30）',
    downloadPrefix: 'hmd01_ch08_2m30s_nextgen',
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

  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.015, 120);
  camera.position.set(0.1, 0.9, 0.2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.10;
  controls.maxDistance = 8;
  controls.enabled = false;

  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3b332b, 0.84);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.25);
  keyLight.position.set(1.5, 3.2, 1.4);
  keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.3;
  keyLight.shadow.camera.far = 14;
  keyLight.shadow.camera.left = -2.6;
  keyLight.shadow.camera.right = 2.6;
  keyLight.shadow.camera.top = 2.6;
  keyLight.shadow.camera.bottom = -2.6;
  keyLight.shadow.bias = -0.0003;
  keyLight.target.position.set(0.10, 0.35, 0.85);
  scene.add(keyLight, keyLight.target);

  const deskSpot = new THREE.SpotLight(0xffe2ad, 3.2, 3.6, Math.PI * 0.42, 0.5, 1.3);
  deskSpot.position.set(-0.06, 1.35, -0.58);
  deskSpot.target.position.set(0.08, 0.75, -0.48);
  scene.add(deskSpot, deskSpot.target);

  const runwayFill = new THREE.PointLight(0xbae6fd, 1.55, 4.5, 1.2);
  runwayFill.position.set(0.45, 0.95, 1.85);
  scene.add(runwayFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'room_autumn_morning') {
        scene.background.setHex(0x18263d);
        scene.environmentIntensity = 0.94;
        hemiLight.color.setHex(0xe0f2fe);
        hemiLight.groundColor.setHex(0x3a3028);
        hemiLight.intensity = 0.88;
        keyLight.color.setHex(0xfff7e6);
        keyLight.intensity = 1.95;
        keyLight.position.set(1.3, 3.2, 1.2);
        deskSpot.intensity = 1.9;
        runwayFill.intensity = 0.4;
      } else if (p === 'room_eva_day') {
        scene.background.setHex(0x111827);
        scene.environmentIntensity = 0.92;
        hemiLight.color.setHex(0xe2e8f0);
        hemiLight.groundColor.setHex(0x27272a);
        hemiLight.intensity = 0.92;
        keyLight.color.setHex(0xf8fafc);
        keyLight.intensity = 2.35;
        keyLight.position.set(1.6, 3.0, 2.2);
        deskSpot.intensity = 1.4;
        runwayFill.color.setHex(0xbae6fd);
        runwayFill.intensity = 1.85;
      } else if (p === 'room_lab_night') {
        scene.background.setHex(0x050914);
        scene.environmentIntensity = 0.68;
        hemiLight.color.setHex(0x94a3b8);
        hemiLight.groundColor.setHex(0x1c1917);
        hemiLight.intensity = 0.56;
        keyLight.color.setHex(0xffedd5);
        keyLight.intensity = 1.85;
        keyLight.position.set(0.9, 2.6, 1.0);
        deskSpot.intensity = 4.2;
        runwayFill.intensity = 0.35;
      } else if (p === 'corridor_autumn') {
        scene.background.setHex(0xe5dfd3);
        scene.environmentIntensity = 0.92;
        hemiLight.color.setHex(0xfef3c7);
        hemiLight.groundColor.setHex(0x4b4237);
        hemiLight.intensity = 1.05;
        keyLight.color.setHex(0xfffbeb);
        keyLight.intensity = 1.95;
        keyLight.position.set(-1.4, 2.8, 1.8);
        deskSpot.intensity = 0.5;
        runwayFill.intensity = 0.2;
      } else {
        // 'room_midnight_entry' (Heroic midnight tournament entry glow!)
        scene.background.setHex(0x040712);
        scene.environmentIntensity = 0.72;
        hemiLight.color.setHex(0x7dd3fc);
        hemiLight.groundColor.setHex(0x18181b);
        hemiLight.intensity = 0.58;
        keyLight.color.setHex(0xffe4b5);
        keyLight.intensity = 1.75;
        keyLight.position.set(1.0, 2.7, 1.2);
        deskSpot.intensity = 3.8;
        runwayFill.color.setHex(0x34d399);
        runwayFill.intensity = 0.65;
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const screens = createCh08Screens();
  const world = createCh08World(scene, baseMats, ngMats, screens);
  const audio = new Ch08AudioEngine();

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

  let currentTime = Math.max(0, Math.min(CH08_DURATION, initialTime));
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
      if (currentTime >= CH08_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(CH08_DURATION, t));
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
    const dir = evaluateCh08Director(t, world, screens, lights);

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
      subtitle: getCh08Subtitle(t),
      cutin: getCh08Cutin(t),
      simlog: getCh08Simlog(t),
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
      if (currentTime >= CH08_DURATION) {
        currentTime = CH08_DURATION;
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
    film: 'ch08',
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH08_DURATION, sec));
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
