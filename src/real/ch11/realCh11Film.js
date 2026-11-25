import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createMasterAssetLibrary } from '../library/masterLibrary.js';
import { createCh11Screens, createCh11World } from './setsAndScreens11.js';
import {
  CH11_DURATION,
  CH11_SCENES,
  getCh11Scene,
  getCh11Subtitle,
  getCh11Cutin,
  evaluateCh11Timeline,
} from './timeline11.js';
import { Ch11AudioEngine } from './audio11.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh11Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH11_DURATION,
    chapters: CH11_SCENES,
    getChapterForTime: getCh11Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第11章 完',
    finSub: '第二部『HMD-02』編 第11章：白紙への回帰と、冬の設計図（残金 ¥345,920）→ 第12章『火花と焦土の冬休み』へ',
    downloadPrefix: 'hmd02_ch11_winter_blueprint_2m30s_nextgen',
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
  scene.background = new THREE.Color(0x0b1120);
  scene.fog = new THREE.FogExp2(0x0b1120, 0.014);

  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.88;

  const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.02, 140);
  camera.position.set(-0.62, 1.52, -0.56);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.08;
  controls.maxDistance = 16;
  controls.enabled = false;

  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3b332b, 0.90);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
  keyLight.position.set(1.8, 3.8, 2.2);
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
  deskSpot.position.set(-0.08, 1.44, -0.48);
  deskSpot.target.position.set(0.02, 0.76, -0.50);
  scene.add(deskSpot, deskSpot.target);

  const rimFill = new THREE.PointLight(0x93c5fd, 0.85, 6.0, 1.2);
  rimFill.position.set(1.2, 1.5, 1.8);
  scene.add(rimFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'room_cold_morning') {
        scene.background.setHex(0x162033);
        scene.fog.color.setHex(0x162033);
        scene.fog.density = 0.018;
        scene.environmentIntensity = 0.84;
        hemiLight.color.setHex(0xe0f2fe);
        hemiLight.groundColor.setHex(0x3b322b);
        hemiLight.intensity = 0.88;
        keyLight.color.setHex(0xf0f9ff);
        keyLight.intensity = 2.25;
        keyLight.position.set(2.4, 3.2, 1.4);
        deskSpot.intensity = 1.6;
        deskSpot.color.setHex(0xf8fafc);
        rimFill.intensity = 0.45;
      } else if (p === 'festival_autumn_sun') {
        scene.background.setHex(0x93c5fd);
        scene.fog.color.setHex(0xcfe8ff);
        scene.fog.density = 0.007;
        scene.environmentIntensity = 1.15;
        hemiLight.color.setHex(0xfef3c7);
        hemiLight.groundColor.setHex(0x78553a);
        hemiLight.intensity = 1.18;
        keyLight.color.setHex(0xfffbeb);
        keyLight.intensity = 2.90;
        keyLight.position.set(4.8, 7.2, 4.2);
        deskSpot.intensity = 0.0;
        rimFill.intensity = 0.28;
      } else if (p === 'clubroom_daylight') {
        scene.background.setHex(0xdce3ec);
        scene.fog.color.setHex(0xdce3ec);
        scene.fog.density = 0.010;
        scene.environmentIntensity = 1.05;
        hemiLight.color.setHex(0xf8fafc);
        hemiLight.groundColor.setHex(0x64748b);
        hemiLight.intensity = 1.18;
        keyLight.color.setHex(0xfff7ed);
        keyLight.intensity = 2.45;
        keyLight.position.set(2.8, 4.2, 2.2);
        deskSpot.intensity = 0.0;
        rimFill.intensity = 0.45;
      } else if (p === 'room_winter_macro') {
        scene.background.setHex(0x070b14);
        scene.fog.color.setHex(0x070b14);
        scene.fog.density = 0.025;
        scene.environmentIntensity = 0.96;
        hemiLight.color.setHex(0xbae6fd);
        hemiLight.groundColor.setHex(0x271e18);
        hemiLight.intensity = 0.58;
        keyLight.color.setHex(0xffedd5);
        keyLight.intensity = 2.35;
        keyLight.position.set(1.2, 2.4, 1.4);
        deskSpot.intensity = 4.6;
        deskSpot.color.setHex(0xfff7ed);
        rimFill.color.setHex(0x38bdf8);
        rimFill.intensity = 0.85;
      } else {
        // 'room_winter_night'
        scene.background.setHex(0x060b16);
        scene.fog.color.setHex(0x060b16);
        scene.fog.density = 0.022;
        scene.environmentIntensity = 0.74;
        hemiLight.color.setHex(0x93c5fd);
        hemiLight.groundColor.setHex(0x27201b);
        hemiLight.intensity = 0.68;
        keyLight.color.setHex(0xfef3c7);
        keyLight.intensity = 1.95;
        keyLight.position.set(1.1, 2.8, 1.5);
        deskSpot.intensity = 3.2;
        deskSpot.color.setHex(0xfef08a);
        rimFill.color.setHex(0x7dd3fc);
        rimFill.intensity = 0.65;
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  // Preload all Photographic PBR Atlases across Chapter 11 (including brand-new Batch 6 Atlases 77, 80, 84, 85!)
  const masterLib = createMasterAssetLibrary(baseMats, ngMats, [
    1, 2, 3, 4, 15, 20, 23, 25, 26, 39, 43, 46, 47, 50, 51, 52, 53, 57, 59, 77, 80, 84, 85,
  ]);
  let pbrReady = false;
  const screens = createCh11Screens();
  const world = createCh11World(scene, baseMats, ngMats, screens, masterLib);
  const audio = new Ch11AudioEngine();

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

  let currentTime = Math.max(0, Math.min(CH11_DURATION, initialTime));
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
      if (currentTime >= CH11_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(CH11_DURATION, t));
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
    const dof = evaluateCh11Timeline(t, world, screens, lights, camera, lookTarget, (h) => {
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
      subtitle: getCh11Subtitle(t),
      cutin: getCh11Cutin(t),
      simlog: latestSimLog,
      dramaBars: (t >= 20 && t < 39) || (t >= 104 && t < 122) || t >= 136,
      fin: t >= CH11_DURATION - 0.15,
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
      if (currentTime >= CH11_DURATION) {
        currentTime = CH11_DURATION;
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
    film: 'ch11',
    isPbrReady: () => pbrReady,
    libraryStats: masterLib.getStats(),
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH11_DURATION, sec));
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
