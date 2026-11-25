import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createMasterAssetLibrary } from '../library/masterLibrary.js';
import { createCh20Screens, createCh20World } from './setsAndScreens20.js';
import {
  CH20_DURATION, CH20_SCENES, getCh20Scene, getCh20Subtitle, getCh20Cutin, evaluateCh20Timeline,
} from './timeline20.js';
import { Ch20AudioEngine } from './audio20.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh20Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH20_DURATION,
    chapters: CH20_SCENES,
    getChapterForTime: getCh20Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '全20章 完',
    finSub: '『五百二十日目のストライド』最終章（第20章）：Day 001 – Day 520（最終残高 ¥327,120）— Simulation Continues...',
    downloadPrefix: 'hmd02_ch20_day520_grand_finale_2m30s_nextgen',
  });

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const maxDpr = isMobile ? 1.5 : Math.min(window.devicePixelRatio || 1, 2);

  const renderer = new THREE.WebGLRenderer({
    canvas: shell.canvas, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(maxDpr);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false; renderer.shadowMap.needsUpdate = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1220);
  scene.fog = new THREE.FogExp2(0x0b1220, 0.014);

  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture; scene.environmentIntensity = 0.98;

  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.02, 160);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enabled = false;

  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x2b2420, 0.92);
  scene.add(hemiLight);
  const keyLight = new THREE.DirectionalLight(0xfff5e4, 2.45);
  keyLight.position.set(6.5, 5.2, -8.0); keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.5; keyLight.shadow.camera.far = 48;
  keyLight.shadow.camera.left = -14; keyLight.shadow.camera.right = 14;
  keyLight.shadow.camera.top = 14; keyLight.shadow.camera.bottom = -14;
  keyLight.shadow.bias = -0.0003;
  keyLight.target.position.set(0, 0, -15);
  scene.add(keyLight, keyLight.target);

  const rimFill = new THREE.PointLight(0xfde68a, 1.35, 16.0, 1.2);
  rimFill.position.set(3.5, 2.8, -16.0);
  scene.add(rimFill);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p; renderer.shadowMap.needsUpdate = true;
      if (p === 'room_day519_night') {
        scene.background.setHex(0x09101d); scene.fog.color.setHex(0x09101d); scene.fog.density = 0.015;
        scene.environmentIntensity = 0.98;
        hemiLight.color.setHex(0xfef3c7); hemiLight.groundColor.setHex(0x211914); hemiLight.intensity = 0.90;
        keyLight.color.setHex(0xfff7ed); keyLight.intensity = 2.4; keyLight.position.set(1.6, 3.0, 1.8);
        keyLight.target.position.set(0, 0.7, -1.0);
        rimFill.color.setHex(0x38bdf8); rimFill.intensity = 1.0;
      } else if (p === 'dawn_indigo_mist') {
        // Deep indigo-to-porcelain 05:05 AM morning mist!
        scene.background.setHex(0x33415c); scene.fog.color.setHex(0x475569); scene.fog.density = 0.026;
        scene.environmentIntensity = 0.95;
        hemiLight.color.setHex(0xcbd5e1); hemiLight.groundColor.setHex(0x334155); hemiLight.intensity = 1.08;
        keyLight.color.setHex(0xe0f2fe); keyLight.intensity = 2.05; keyLight.position.set(8.0, 4.5, -2.0);
        keyLight.target.position.set(0, 0, -4);
        rimFill.color.setHex(0xbae6fd); rimFill.intensity = 0.85;
      } else if (p === 'dawn_porcelain_early') {
        scene.background.setHex(0x64748b); scene.fog.color.setHex(0x94a3b8); scene.fog.density = 0.022;
        scene.environmentIntensity = 1.05;
        hemiLight.color.setHex(0xe2e8f0); hemiLight.groundColor.setHex(0x475569); hemiLight.intensity = 1.18;
        keyLight.color.setHex(0xfff7ed); keyLight.intensity = 2.45; keyLight.position.set(9.0, 4.2, -10.0);
        keyLight.target.position.set(0, 0, -10);
        rimFill.color.setHex(0xfef3c7); rimFill.intensity = 1.1;
      } else if (p === 'golden_sunrise_rays') {
        // 05:35 AM — Golden Sunrise Breaking Through Zelkova Canopy Casting Long Morning Shadows!
        scene.background.setHex(0xfde68a); scene.fog.color.setHex(0xfed7aa); scene.fog.density = 0.018;
        scene.environmentIntensity = 1.24;
        hemiLight.color.setHex(0xfffbeb); hemiLight.groundColor.setHex(0x78563a); hemiLight.intensity = 1.22;
        keyLight.color.setHex(0xffedd5); keyLight.intensity = 3.25; keyLight.position.set(11.0, 3.8, -16.0);
        keyLight.target.position.set(0, 0, -18);
        rimFill.color.setHex(0xfbbf24); rimFill.intensity = 1.85;
      } else {
        // 'golden_sunrise_finale' — Full Radiant September Morning Sun!
        scene.background.setHex(0xbae6fd); scene.fog.color.setHex(0xfef3c7); scene.fog.density = 0.014;
        scene.environmentIntensity = 1.28;
        hemiLight.color.setHex(0xfffbeb); hemiLight.groundColor.setHex(0x78563a); hemiLight.intensity = 1.28;
        keyLight.color.setHex(0xfffbeb); keyLight.intensity = 3.35; keyLight.position.set(10.0, 4.8, -14.0);
        keyLight.target.position.set(0, 0, -18);
        rimFill.color.setHex(0xfde047); rimFill.intensity = 1.9;
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const masterLib = createMasterAssetLibrary(baseMats, ngMats, [
    1, 2, 3, 4, 15, 20, 23, 25, 26, 35, 39, 43, 46, 47, 50, 51, 52, 53, 57, 59, 77, 80, 84, 85,
  ]);
  let pbrReady = false;
  const screens = createCh20Screens();
  const world = createCh20World(scene, baseMats, ngMats, screens, masterLib);
  const audio = new Ch20AudioEngine();

  masterLib.ready.then(() => {
    pbrReady = true;
    if (!disposed) { renderer.shadowMap.needsUpdate = true; needsRender = true; }
  });

  const initialScale = isMobile ? 0.88 : 1.0;
  const pipeline = new NextGenCinemaMacroPipeline(renderer, window.innerWidth * maxDpr, window.innerHeight * maxDpr, initialScale);
  const drs = new PIDDynamicResolutionController(pipeline, { minScale: isMobile ? 0.72 : 0.82, maxScale: 1.0, targetMs: 15.8 });

  let currentTime = Math.max(0, Math.min(CH20_DURATION, initialTime));
  let isPlaying = !startPaused; let cameraMode = 'CINEMA';
  let needsRender = true; let disposed = false;
  let rafId = 0; let frameCount = 0; let lastWallMs = performance.now();
  const lookTarget = new THREE.Vector3();

  function setPlaying(play) {
    if (play) {
      audio.resume();
      if (currentTime >= CH20_DURATION - 0.1) { currentTime = 0; audio.resetForSeek(0); }
      isPlaying = true; lastWallMs = performance.now();
    } else { isPlaying = false; audio.pause(); }
    shell.syncPlayIcon(isPlaying); needsRender = true;
  }
  function seekTo(t) {
    currentTime = Math.max(0, Math.min(CH20_DURATION, t));
    audio.resetForSeek(currentTime); renderer.shadowMap.needsUpdate = true; needsRender = true;
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
    needsRender = true; return cameraMode;
  };
  shell.hooks.toggleMute = () => { audio.init(); audio.setMuted(!audio.muted); return audio.muted; };
  shell.hooks.getAudioStream = () => audio.getRecordingStream();
  shell.hooks.initAudio = () => audio.resume();

  let latestSimLog = null;
  function evaluateFrame(t) {
    const savedPos = camera.position.clone();
    const dof = evaluateCh20Timeline(t, world, screens, lights, camera, lookTarget, (h) => { latestSimLog = h.simLog; });
    if (cameraMode === 'FREE') { camera.position.copy(savedPos); controls.update(); }
    else { camera.lookAt(lookTarget); }

    const fx = {
      focusDist: camera.position.distanceTo(lookTarget),
      aperture: dof?.aperture ?? 0.005,
      bloomStrength: dof?.halation ?? 0.36,
      exposure: 1.12, aoIntensity: 0.72, vignette: 0.22,
    };
    frameCount++; if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t, subtitle: getCh20Subtitle(t), cutin: getCh20Cutin(t), simlog: latestSimLog,
      dramaBars: t >= 78,
      fin: t >= CH20_DURATION - 0.15,
    });
    pipeline.render(scene, camera, fx);
  }

  window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h); pipeline.setSize(w * maxDpr, h * maxDpr, drs.currentScale);
    renderer.shadowMap.needsUpdate = true; needsRender = true;
  }, shell.sig);

  function tick(nowMs) {
    if (disposed) return;
    rafId = requestAnimationFrame(tick);
    const rawDt = (nowMs - lastWallMs) / 1000;
    const dt = Math.min(0.08, Math.max(0, rawDt));
    lastWallMs = nowMs;
    if (isPlaying && !shell.isScrubbing()) {
      currentTime += dt;
      if (currentTime >= CH20_DURATION) { currentTime = CH20_DURATION; isPlaying = false; audio.pause(); shell.syncPlayIcon(false); }
      audio.update(currentTime); needsRender = true;
    }
    if (isPlaying || needsRender || cameraMode === 'FREE') {
      evaluateFrame(currentTime);
      if (isPlaying) drs.sample(rawDt * 1000, window.innerWidth * maxDpr, window.innerHeight * maxDpr);
      needsRender = false;
    }
  }

  window.__CINEMA__ = {
    film: 'ch20', isPbrReady: () => pbrReady, libraryStats: masterLib.getStats(),
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false; audio.pause(); shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH20_DURATION, sec));
      renderer.shadowMap.needsUpdate = true; evaluateFrame(currentTime);
      if (syncGpu) renderer.getContext().finish();
      needsRender = false;
    },
    getTime: () => currentTime,
    stats: () => ({
      sceneDrawCalls: pipeline.lastSceneCalls || 0,
      totalDrawCalls: pipeline.lastTotalCalls || 0,
      triangles: pipeline.lastSceneTriangles || 0,
      scale: drs.currentScale, library: masterLib.getStats(),
    }),
  };

  if (isPlaying) audio.resume();
  shell.syncPlayIcon(isPlaying); evaluateFrame(currentTime);
  rafId = requestAnimationFrame(tick);

  function dispose() {
    disposed = true; cancelAnimationFrame(rafId);
    audio.dispose(); controls.dispose(); shell.dispose();
    masterLib.dispose(); envRT.dispose(); pipeline.dispose(); renderer.dispose();
  }
  return { dispose, seekTo, setPlaying };
}
