import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
  createRealisticIBL,
  createRealisticMaterialSuite,
  createDynamicScreens,
} from './materials.js';
import { createAllEnvironments } from './environments.js';
import { createRealVFX } from './vfx.js';
import { RealFilmAudioEngine } from './audio.js';
import {
  REAL_FILM_DURATION,
  REAL_CHAPTERS,
  getRealChapterForTime,
  getRealSubtitle,
  getRealSimlog,
  getRealCutin,
  evaluateRealDirector,
} from './director.js';
import {
  FusedKawaseCinemaPipeline,
  PIDDynamicResolutionController,
} from '../optimizer.js';
import { createStageSession } from '../playerShell.js';

export function mountRealFilm({ initialTime = 0, startPaused = false, onReturnHub }) {
  const shell = createStageSession({
    duration: REAL_FILM_DURATION,
    chapters: REAL_CHAPTERS,
    getChapterForTime: getRealChapterForTime,
    onReturnHub,
    widescreen: true,
    finLabel: '第2章 完',
    finSub: '第一世代機『HMD-01』開発記 — 第1章・第2章（10:00）',
    downloadPrefix: 'hmd01_ch1_ch2_10min',
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
  scene.background = new THREE.Color(0x0d1118);

  // Physical Image-Based Lighting (PMREM Studio/Daylight Environment Reflections!)
  const envRT = createRealisticIBL(renderer);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.85;

  // Tight near plane (0.015m = 1.5cm) enables extreme tabletop macro shots without clipping!
  const camera = new THREE.PerspectiveCamera(
    36,
    window.innerWidth / window.innerHeight,
    0.015,
    140
  );
  camera.position.set(0.5, 1.2, 1.4);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.12;
  controls.maxDistance = 12;
  controls.enabled = false;

  // ===========================================================================
  // Physically-Balanced Multi-Set Cinematography Lighting Rig
  // ===========================================================================
  const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3f362e, 0.75);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.1);
  keyLight.position.set(2.8, 4.4, 2.4);
  keyLight.castShadow = true;
  const shadowRes = isMobile ? 1024 : 2048;
  keyLight.shadow.mapSize.set(shadowRes, shadowRes);
  keyLight.shadow.camera.near = 0.4;
  keyLight.shadow.camera.far = 18;
  keyLight.shadow.camera.left = -3.6;
  keyLight.shadow.camera.right = 3.6;
  keyLight.shadow.camera.top = 3.6;
  keyLight.shadow.camera.bottom = -3.6;
  keyLight.shadow.bias = -0.0004;
  keyLight.target.position.set(0, 0.8, -0.5);
  scene.add(keyLight, keyLight.target);

  // Warm 3200K Architect Clamp Desk Lamp Spotlight (Key for Midnight Apartment Scenes!)
  const deskSpot = new THREE.SpotLight(0xffdfa6, 4.8, 3.6, Math.PI * 0.34, 0.55, 1.35);
  deskSpot.position.set(-0.14, 1.11, -0.68);
  deskSpot.target.position.set(0.05, 0.72, -0.44);
  scene.add(deskSpot, deskSpot.target);

  // Subtle Cool Laptop Screen Bounce Fill
  const laptopFill = new THREE.PointLight(0x93c5fd, 0.65, 1.6, 1.5);
  laptopFill.position.set(-0.22, 0.88, -0.56);
  scene.add(laptopFill);

  let curLightPreset = '';
  const lights = {
    setPreset(preset) {
      if (preset === curLightPreset) return;
      curLightPreset = preset;
      renderer.shadowMap.needsUpdate = true;

      if (preset === 'club_fluorescent') {
        scene.background.setHex(0xcbd5e1);
        scene.environmentIntensity = 0.95;
        hemiLight.color.setHex(0xe2e8f0);
        hemiLight.groundColor.setHex(0x475569);
        hemiLight.intensity = 1.15;
        keyLight.color.setHex(0xf8fafc);
        keyLight.intensity = 2.0;
        keyLight.position.set(2.2, 4.6, 2.0);
        deskSpot.intensity = 0;
        laptopFill.intensity = 0;
      } else if (preset === 'sunset_golden') {
        scene.background.setHex(0xe88b5a);
        scene.environmentIntensity = 0.92;
        hemiLight.color.setHex(0xfed7aa);
        hemiLight.groundColor.setHex(0x3f2e26);
        hemiLight.intensity = 0.95;
        keyLight.color.setHex(0xffb469);
        keyLight.intensity = 2.85;
        keyLight.position.set(-4.2, 2.6, -2.5);
        deskSpot.intensity = 0;
        laptopFill.intensity = 0;
      } else if (preset === 'akiba_shop') {
        scene.background.setHex(0xd4dce4);
        scene.environmentIntensity = 1.05;
        hemiLight.color.setHex(0xf1f5f9);
        hemiLight.groundColor.setHex(0x4b5563);
        hemiLight.intensity = 1.25;
        keyLight.color.setHex(0xfffbeb);
        keyLight.intensity = 2.15;
        keyLight.position.set(1.4, 4.2, 1.8);
        deskSpot.intensity = 0;
        laptopFill.intensity = 0;
      } else if (preset === 'room_daylight') {
        scene.background.setHex(0xdbeafe);
        scene.environmentIntensity = 0.95;
        hemiLight.color.setHex(0xe0f2fe);
        hemiLight.groundColor.setHex(0x574c3f);
        hemiLight.intensity = 1.15;
        keyLight.color.setHex(0xffffff);
        keyLight.intensity = 2.35;
        keyLight.position.set(-1.2, 3.4, -2.6);
        deskSpot.intensity = 1.2;
        laptopFill.intensity = 0.2;
      } else if (preset === 'room_sunset') {
        scene.background.setHex(0xfb923c);
        scene.environmentIntensity = 0.85;
        hemiLight.color.setHex(0xfed7aa);
        hemiLight.groundColor.setHex(0x43302b);
        hemiLight.intensity = 0.85;
        keyLight.color.setHex(0xffab5e);
        keyLight.intensity = 2.2;
        keyLight.position.set(-1.4, 2.5, -2.6);
        deskSpot.intensity = 2.6;
        laptopFill.intensity = 0.45;
      } else if (preset === 'lecture_morning') {
        scene.background.setHex(0xe0f2fe);
        scene.environmentIntensity = 0.95;
        hemiLight.color.setHex(0xf0f9ff);
        hemiLight.groundColor.setHex(0x524132);
        hemiLight.intensity = 1.18;
        keyLight.color.setHex(0xfffbeb);
        keyLight.intensity = 2.45;
        keyLight.position.set(-3.4, 4.2, 1.6);
        deskSpot.intensity = 0;
        laptopFill.intensity = 0;
      } else if (preset === 'room_night_hero') {
        scene.background.setHex(0x090e1a);
        scene.environmentIntensity = 0.52;
        hemiLight.color.setHex(0x64748b);
        hemiLight.groundColor.setHex(0x27201c);
        hemiLight.intensity = 0.52;
        keyLight.color.setHex(0xffdfad);
        keyLight.intensity = 1.35;
        keyLight.position.set(-0.9, 2.8, 1.1);
        deskSpot.intensity = 5.6;
        laptopFill.intensity = 0.85;
      } else if (preset === 'room_night_drama') {
        scene.background.setHex(0x060913);
        scene.environmentIntensity = 0.44;
        hemiLight.color.setHex(0x475569);
        hemiLight.groundColor.setHex(0x1c1917);
        hemiLight.intensity = 0.44;
        keyLight.color.setHex(0xffd89b);
        keyLight.intensity = 1.15;
        keyLight.position.set(-0.8, 2.7, 0.9);
        deskSpot.intensity = 6.2;
        laptopFill.intensity = 0.95;
      } else {
        // 'room_night_lamp'
        scene.background.setHex(0x090e1a);
        scene.environmentIntensity = 0.48;
        hemiLight.color.setHex(0x64748b);
        hemiLight.groundColor.setHex(0x26201b);
        hemiLight.intensity = 0.48;
        keyLight.color.setHex(0xffe4b5);
        keyLight.intensity = 1.2;
        keyLight.position.set(-0.9, 2.8, 1.1);
        deskSpot.intensity = 4.8;
        laptopFill.intensity = 0.75;
      }
    },
  };

  // Build Realistic Materials, Live Screens, 5 Architectural Sets, VFX & Audio
  const mats = createRealisticMaterialSuite();
  const screens = createDynamicScreens();
  const world = createAllEnvironments(scene, mats, screens);
  const vfx = createRealVFX(scene);
  const audio = new RealFilmAudioEngine();

  const initialScale = isMobile ? 0.88 : 1.0;
  const pipeline = new FusedKawaseCinemaPipeline(
    renderer,
    window.innerWidth * maxDpr,
    window.innerHeight * maxDpr,
    initialScale
  );
  // Crisp natural filmic sharpness & restrained realistic bloom
  pipeline.compositeMat.uniforms.uVignette.value = 0.22;
  pipeline.compositeMat.uniforms.uExposure.value = 1.04;

  const drs = new PIDDynamicResolutionController(pipeline, {
    minScale: isMobile ? 0.72 : 0.82,
    maxScale: 1.0,
    targetMs: 15.8,
  });

  // Playback State
  let currentTime = Math.max(0, Math.min(REAL_FILM_DURATION, initialTime));
  let isPlaying = !startPaused;
  let cameraMode = 'CINEMA';
  let needsRender = true;
  let rafId = 0;
  let frameCount = 0;
  let lastWallMs = performance.now();
  const lookTarget = new THREE.Vector3();

  function setPlaying(play) {
    if (play) {
      audio.init();
      if (currentTime >= REAL_FILM_DURATION - 0.1) {
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
    currentTime = Math.max(0, Math.min(REAL_FILM_DURATION, t));
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
    const dir = evaluateRealDirector(t, world, screens, lights, vfx);

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
      subtitle: getRealSubtitle(t),
      cutin: getRealCutin(t),
      simlog: getRealSimlog(t),
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

  let disposed = false;

  function tick(nowMs) {
    if (disposed) return;
    rafId = requestAnimationFrame(tick);
    const rawDt = (nowMs - lastWallMs) / 1000;
    const dt = Math.min(0.08, Math.max(0, rawDt));
    lastWallMs = nowMs;

    if (isPlaying && !shell.isScrubbing()) {
      currentTime += dt;
      if (currentTime >= REAL_FILM_DURATION) {
        currentTime = REAL_FILM_DURATION;
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
    film: 'hmd01',
    seek: (sec, showHud = false, syncGpu = false) => {
      document.body.classList.toggle('ui-idle', !showHud);
      isPlaying = false;
      audio.pause();
      shell.syncPlayIcon(false);
      currentTime = Math.max(0, Math.min(REAL_FILM_DURATION, sec));
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

  if (isPlaying) {
    audio.init();
  }
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
