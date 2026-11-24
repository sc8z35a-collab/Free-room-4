import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRealisticMaterialSuite } from '../materials.js';
import { NextGenCinemaMacroPipeline } from '../nextgen/cinemaMacroPipeline.js';
import { createNextGenStudioIBL, createNextGenMicroMaterials } from '../nextgen/pbrMicroTextures.js';
import { createCh05Screens, createCh05World } from './setsAndScreens05.js';
import { Ch05AudioEngine } from './audio05.js';
import {
  CH05_DURATION,
  CH05_SCENES,
  getCh05Scene,
  getCh05Subtitle,
  getCh05Simlog,
  getCh05Cutin,
  evaluateCh05Director,
} from './director05.js';
import { PIDDynamicResolutionController } from '../../optimizer.js';
import { createStageSession } from '../../playerShell.js';

export function mountCh05Film({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: CH05_DURATION,
    chapters: CH05_SCENES,
    getChapterForTime: getCh05Scene,
    onReturnHub,
    widescreen: true,
    finLabel: '第5章 完',
    finSub: '第一世代機『HMD-01』開発記 — 第5章：深圳から届いた緑の基板（02:30）',
    downloadPrefix: 'hmd01_ch05_2m30s_nextgen',
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
  scene.background = new THREE.Color(0x070b14);

  // Next-Gen 1024x512 Multi-Softbox Studio HDRI Environment Reflections!
  const envRT = createNextGenStudioIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.92;

  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.015, 120);
  camera.position.set(0.1, 0.9, 0.2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.10;
  controls.maxDistance = 8;
  controls.enabled = false;

  // Precision Multi-Source Cinema Lighting Rig (tight ±1.8m shadow frustum for sub-millimeter SMD & PCB shadows!)
  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3b332b, 0.78);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.25);
  keyLight.position.set(1.6, 3.4, 1.5);
  keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.3;
  keyLight.shadow.camera.far = 12;
  keyLight.shadow.camera.left = -1.6;
  keyLight.shadow.camera.right = 1.6;
  keyLight.shadow.camera.top = 1.6;
  keyLight.shadow.camera.bottom = -1.6;
  keyLight.shadow.bias = -0.0003;
  keyLight.target.position.set(0.05, 0.75, -0.50);
  scene.add(keyLight, keyLight.target);

  const deskSpot = new THREE.SpotLight(0xffe2ad, 5.8, 3.2, Math.PI * 0.38, 0.5, 1.3);
  deskSpot.position.set(-0.08, 1.15, -0.62);
  deskSpot.target.position.set(0.06, 0.73, -0.48);
  scene.add(deskSpot, deskSpot.target);

  const coolRim = new THREE.PointLight(0x7dd3fc, 0.95, 1.8, 1.4);
  coolRim.position.set(0.32, 0.98, -0.78);
  scene.add(coolRim);

  let curPreset = '';
  const lights = {
    setPreset(p) {
      if (p === curPreset) return;
      curPreset = p;
      renderer.shadowMap.needsUpdate = true;

      if (p === 'library_warm') {
        scene.background.setHex(0x161922);
        scene.environmentIntensity = 0.78;
        hemiLight.color.setHex(0xfef3c7);
        hemiLight.groundColor.setHex(0x292524);
        hemiLight.intensity = 0.95;
        keyLight.color.setHex(0xfffbeb);
        keyLight.intensity = 2.1;
        keyLight.position.set(1.2, 3.2, 1.4);
        deskSpot.intensity = 3.2;
        coolRim.intensity = 0.3;
      } else if (p === 'room_afternoon_sun') {
        scene.background.setHex(0xdbeafe);
        scene.environmentIntensity = 1.15;
        hemiLight.color.setHex(0xe0f2fe);
        hemiLight.groundColor.setHex(0x574c3f);
        hemiLight.intensity = 1.15;
        keyLight.color.setHex(0xfff7ed);
        keyLight.intensity = 2.65;
        keyLight.position.set(-1.5, 3.1, -1.2);
        deskSpot.intensity = 1.8;
        coolRim.intensity = 0.4;
      } else if (p === 'room_night_surgery') {
        scene.background.setHex(0x050811);
        scene.environmentIntensity = 0.58;
        hemiLight.color.setHex(0x94a3b8);
        hemiLight.groundColor.setHex(0x1c1917);
        hemiLight.intensity = 0.48;
        keyLight.color.setHex(0xf8fafc); // Crisp white LED magnifying-loupe ring light!
        keyLight.intensity = 1.65;
        keyLight.position.set(0.2, 2.4, 0.4);
        deskSpot.intensity = 3.8;
        coolRim.intensity = 0.95;
      } else if (p === 'room_night_uv_cure') {
        scene.background.setHex(0x04050d);
        scene.environmentIntensity = 0.34;
        hemiLight.color.setHex(0x6366f1);
        hemiLight.groundColor.setHex(0x14111f);
        hemiLight.intensity = 0.32;
        keyLight.color.setHex(0xc4b5fd);
        keyLight.intensity = 0.65;
        keyLight.position.set(0.2, 2.4, 0.4);
        deskSpot.intensity = 1.15;
        coolRim.intensity = 0.75;
      } else if (p === 'room_hawk_climax') {
        scene.background.setHex(0x070d1c);
        scene.environmentIntensity = 0.72;
        hemiLight.color.setHex(0x93c5fd);
        hemiLight.groundColor.setHex(0x26201b);
        hemiLight.intensity = 0.68;
        keyLight.color.setHex(0xffedd5);
        keyLight.intensity = 1.95;
        keyLight.position.set(1.1, 2.9, 1.2);
        deskSpot.intensity = 5.6;
        coolRim.intensity = 1.25;
      } else {
        // 'room_night_kicad' & 'room_night_macro'
        scene.background.setHex(0x070b14);
        scene.environmentIntensity = 0.65;
        hemiLight.color.setHex(0x64748b);
        hemiLight.groundColor.setHex(0x231f1c);
        hemiLight.intensity = 0.58;
        keyLight.color.setHex(0xffe4b5);
        keyLight.intensity = 1.65;
        keyLight.position.set(0.9, 2.8, 1.1);
        deskSpot.intensity = 5.4;
        coolRim.intensity = 0.85;
      }
    },
  };

  const baseMats = createRealisticMaterialSuite();
  const ngMats = createNextGenMicroMaterials();
  const screens = createCh05Screens();
  const world = createCh05World(scene, baseMats, ngMats, screens);
  const audio = new Ch05AudioEngine();

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

  let currentTime = Math.max(0, Math.min(CH05_DURATION, initialTime));
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
      if (currentTime >= CH05_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(CH05_DURATION, t));
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
    const dir = evaluateCh05Director(t, world, screens, lights);

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

    // Automatic Laser-Exact Optical Lens Autofocus Distance onto the 3D Look Target!
    dir.fx.focusDist = camera.position.distanceTo(lookTarget);

    frameCount++;
    if (frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;

    shell.updateHUD({
      t,
      subtitle: getCh05Subtitle(t),
      cutin: getCh05Cutin(t),
      simlog: getCh05Simlog(t),
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
      if (currentTime >= CH05_DURATION) {
        currentTime = CH05_DURATION;
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
    film: 'ch05',
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(CH05_DURATION, sec));
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
