import * as THREE from 'three';
import { createHMDCorePCBRig } from '../ch05/hmdCorePcbRig.js';
import { createEVAMatPBR } from '../ch06/hmd01Rev10Rig.js';
import { createHMD01ZmpDynamicRig, createCh08Props } from './zmpAndLabRig.js';

export function createCh08Screens() {
  // 1. Laptop Display (1024 x 640)
  const lapC = document.createElement('canvas');
  lapC.width = 1024;
  lapC.height = 640;
  const lctx = lapC.getContext('2d');
  const lapTex = new THREE.CanvasTexture(lapC);
  lapTex.colorSpace = THREE.SRGBColorSpace;
  const laptopMat = new THREE.MeshBasicMaterial({ map: lapTex });

  // 2. 3D-LIPM Hyperbolic ODE Notebook (1024 x 768)
  const nbC = document.createElement('canvas');
  nbC.width = 1024;
  nbC.height = 768;
  const nctx = nbC.getContext('2d');
  nctx.fillStyle = '#f3efe2';
  nctx.fillRect(0, 0, 1024, 768);
  nctx.strokeStyle = 'rgba(148, 163, 184, 0.34)';
  for (let x = 0; x < 1024; x += 28) { nctx.beginPath(); nctx.moveTo(x, 0); nctx.lineTo(x, 768); nctx.stroke(); }
  for (let y = 0; y < 768; y += 28) { nctx.beginPath(); nctx.moveTo(0, y); nctx.lineTo(1024, y); nctx.stroke(); }
  nctx.fillStyle = '#0f172a';
  nctx.font = '900 32px serif';
  nctx.fillText('三次元線形倒立振子モデル（3D-LIPM）双曲線関数解', 44, 82);
  nctx.strokeStyle = '#0369a1';
  nctx.lineWidth = 4;
  nctx.beginPath(); nctx.moveTo(44, 104); nctx.lineTo(960, 104); nctx.stroke();
  nctx.fillStyle = '#0369a1';
  nctx.font = '900 32px monospace';
  nctx.fillText('ÿ = (g / z_c) · (y - p_y)   ⇒   cosh / sinh 解', 48, 188);
  nctx.fillStyle = '#1e293b';
  nctx.font = '800 26px monospace';
  nctx.fillText('z_c = 0.225 m  ⇒  T_c = √(z_c / g) = 0.1514 s (151 ms)', 48, 272);
  nctx.fillText('T_step = 0.45 s (2.2 steps/s),  Stride = 60.0 mm', 48, 336);
  nctx.fillStyle = '#047857';
  nctx.font = '900 34px monospace';
  nctx.fillText('y_max = 42.0 · (1 - 1/cosh(0.225/0.1514)) = 23.9 mm !!', 48, 444);
  nctx.fillStyle = '#334155';
  nctx.font = '800 24px sans-serif';
  nctx.fillText('・横揺れは静歩行の半分（42mm → 23.9mm）！空中で自然に折り返す', 48, 540);
  nctx.fillText('・理論歩行速度：13.3 cm/s（従来比 6倍以上のスピードへ！）', 48, 598);
  const nbTex = new THREE.CanvasTexture(nbC);
  nbTex.colorSpace = THREE.SRGBColorSpace;
  const odeNotebookMat = new THREE.MeshStandardMaterial({ map: nbTex, color: 0xb2ac9c, roughness: 0.95 });

  // 3. University Corridor Tournament Poster ("第19回 全日本アマチュア二足歩行ロボットオープン競技会")
  const poC = document.createElement('canvas');
  poC.width = 768;
  poC.height = 1024;
  const pctx = poC.getContext('2d');
  const pg = pctx.createLinearGradient(0, 0, 0, 1024);
  pg.addColorStop(0, '#0f172a');
  pg.addColorStop(0.55, '#1e293b');
  pg.addColorStop(1, '#090d14');
  pctx.fillStyle = pg;
  pctx.fillRect(0, 0, 768, 1024);
  pctx.strokeStyle = '#f59e0b';
  pctx.lineWidth = 14;
  pctx.strokeRect(20, 20, 728, 984);

  pctx.fillStyle = '#f59e0b';
  pctx.fillRect(46, 56, 676, 64);
  pctx.fillStyle = '#0f172a';
  pctx.font = '900 30px sans-serif';
  pctx.fillText('ALL-JAPAN BIPEDAL ROBOT OPEN · 19th', 68, 100);

  pctx.fillStyle = '#ffffff';
  pctx.font = '900 44px sans-serif';
  pctx.fillText('第19回 全日本アマチュア', 72, 224);
  pctx.fillText('二足歩行ロボット', 72, 290);
  pctx.fillStyle = '#38bdf8';
  pctx.font = '900 48px sans-serif';
  pctx.fillText('オープン競技会', 72, 362);

  // Stylized metallic bipedal robot silhouette graphic on poster
  pctx.strokeStyle = '#38bdf8';
  pctx.lineWidth = 6;
  pctx.strokeRect(480, 390, 200, 240);
  pctx.fillStyle = 'rgba(56, 189, 248, 0.16)';
  pctx.fillRect(480, 390, 200, 240);
  pctx.fillStyle = '#34d399';
  pctx.font = '900 28px monospace';
  pctx.fillText('3.0m SPRINT', 494, 480);
  pctx.fillText('AUTONOMOUS', 494, 535);
  pctx.fillText('GET-UP TEST', 494, 590);

  pctx.fillStyle = '#fde047';
  pctx.font = '900 36px monospace';
  pctx.fillText('202X.11.06 [SUN]', 72, 466);
  pctx.fillStyle = '#e2e8f0';
  pctx.font = '800 23px sans-serif';
  pctx.fillText('会場：都内産業貿易センター', 72, 526);
  pctx.fillText('資格：不問（大学・社会人・個人可）', 72, 574);

  pctx.fillStyle = '#1e293b';
  pctx.fillRect(58, 675, 652, 230);
  pctx.strokeStyle = '#34d399';
  pctx.lineWidth = 4;
  pctx.strokeRect(58, 675, 652, 230);
  pctx.fillStyle = '#34d399';
  pctx.font = '900 28px sans-serif';
  pctx.fillText('【公式規定種目】', 84, 728);
  pctx.fillStyle = '#f8fafc';
  pctx.font = '800 25px sans-serif';
  pctx.fillText('① 規定 3.0メートル 自律スプリント歩行', 84, 786);
  pctx.fillText('② 仰向け・うつ伏せからの自立起き上がり審査', 84, 842);
  pctx.fillStyle = '#fbbf24';
  pctx.font = '800 24px monospace';
  pctx.fillText('ENTRY FEE : ¥3,000  |  DEADLINE APPROACHING!', 84, 962);

  const poTex = new THREE.CanvasTexture(poC);
  poTex.colorSpace = THREE.SRGBColorSpace;
  const posterMat = new THREE.MeshStandardMaterial({ map: poTex, color: 0xd8d6d0, roughness: 0.72 });

  let curLap = '';

  function setLaptopMode(mode) {
    if (mode === curLap) return;
    curLap = mode;
    lctx.fillStyle = '#080c14';
    lctx.fillRect(0, 0, 1024, 640);
    lctx.fillStyle = '#141c2b';
    lctx.fillRect(0, 0, 1024, 42);
    lctx.fillStyle = '#94a3b8';
    lctx.font = '700 18px monospace';

    if (mode === 'pulseview_13ms_bug') {
      lctx.fillText('PulseView — 24MHz 8-Channel USB Logic Analyzer [CAPTURED 5.0s]', 22, 27);
      // Grid lines
      lctx.strokeStyle = '#1e293b'; lctx.lineWidth = 1;
      for (let x = 130; x < 990; x += 64) {
        lctx.beginPath(); lctx.moveTo(x, 54); lctx.lineTo(x, 470); lctx.stroke();
      }

      // CH0 Yellow: 5.00ms loop pulses with GIANT 13.8ms FREEZE GAP!
      lctx.fillStyle = '#facc15'; lctx.font = '800 20px monospace';
      lctx.fillText('CH0 LOOP', 18, 128);
      lctx.strokeStyle = '#facc15'; lctx.lineWidth = 3.5;
      lctx.beginPath();
      let x = 130;
      lctx.moveTo(x, 145);
      for (const px of [150, 214, 278, 560, 624, 688, 752, 816, 880]) {
        lctx.lineTo(px, 145); lctx.lineTo(px, 95); lctx.lineTo(px + 28, 95); lctx.lineTo(px + 28, 145);
      }
      lctx.lineTo(980, 145);
      lctx.stroke();

      // Crimson highlight over the 13.8ms Wi-Fi FREEZE GAP!
      lctx.fillStyle = 'rgba(239, 68, 68, 0.28)';
      lctx.fillRect(306, 72, 254, 104);
      lctx.strokeStyle = '#ef4444'; lctx.lineWidth = 3;
      lctx.strokeRect(306, 72, 254, 104);
      lctx.fillStyle = '#fca5a5'; lctx.font = '900 22px monospace';
      lctx.fillText('13.8 ms FREEZE!', 328, 120);
      lctx.font = '800 18px sans-serif';
      lctx.fillText('(Wi-Fi Core 1 割込み!)', 328, 152);

      // CH1 Green: Sequential 0x03 WRITE hogging 3.80ms!
      lctx.fillStyle = '#22c55e'; lctx.font = '800 20px monospace';
      lctx.fillText('CH1 DATA', 18, 258);
      lctx.strokeStyle = '#22c55e'; lctx.lineWidth = 3;
      for (const bx of [150, 214, 560, 624, 688, 752, 816, 880]) {
        lctx.fillStyle = 'rgba(34, 197, 94, 0.35)';
        lctx.fillRect(bx, 224, 48, 42);
        lctx.strokeRect(bx, 224, 48, 42);
      }
      lctx.fillStyle = '#86efac'; lctx.font = '800 20px monospace';
      lctx.fillText('0x03 WRITE x16 : 3.80 ms (PHASE LAG!)', 150, 298);

      // CH2 Cyan: BNO085 5.000ms INT ticks
      lctx.fillStyle = '#38bdf8'; lctx.font = '800 20px monospace';
      lctx.fillText('CH2 INT', 18, 392);
      lctx.strokeStyle = '#38bdf8'; lctx.lineWidth = 3;
      lctx.beginPath(); lctx.moveTo(130, 410);
      for (let gx = 150; gx <= 940; gx += 64) {
        lctx.lineTo(gx, 410); lctx.lineTo(gx, 366); lctx.lineTo(gx + 6, 366); lctx.lineTo(gx + 6, 410);
      }
      lctx.lineTo(980, 410);
      lctx.stroke();

      lctx.fillStyle = '#f87171'; lctx.font = '900 26px sans-serif';
      lctx.fillText('✕ 犯人特定：Wi-Fi割込み 13.8ms空白 ＆ 逐次送信 3.80ms渋滞！', 44, 545);
    } else if (mode === 'pulseview_11us_fixed') {
      lctx.fillText('PulseView — FreeRTOS Dual-Core Isolation + 0x83 SYNC WRITE [2,000 LOOPS]', 22, 27);
      // Crystal-regular emerald pulses!
      lctx.fillStyle = '#34d399'; lctx.font = '800 20px monospace';
      lctx.fillText('CH0 CORE1', 16, 130);
      lctx.strokeStyle = '#34d399'; lctx.lineWidth = 3.5;
      lctx.beginPath(); lctx.moveTo(135, 148);
      for (let gx = 150; gx <= 940; gx += 64) {
        lctx.lineTo(gx, 148); lctx.lineTo(gx, 96); lctx.lineTo(gx + 16, 96); lctx.lineTo(gx + 16, 148);
      }
      lctx.lineTo(980, 148);
      lctx.stroke();

      // Short compact 1.18ms SYNC WRITE bursts!
      lctx.fillStyle = '#38bdf8'; lctx.font = '800 20px monospace';
      lctx.fillText('CH1 SYNC', 16, 254);
      lctx.strokeStyle = '#38bdf8'; lctx.lineWidth = 3;
      for (let gx = 150; gx <= 940; gx += 64) {
        lctx.fillStyle = 'rgba(56, 189, 248, 0.38)';
        lctx.fillRect(gx, 224, 16, 40);
        lctx.strokeRect(gx, 224, 16, 40);
      }

      lctx.fillStyle = '#34d399'; lctx.font = '900 36px monospace';
      lctx.fillText('PERIOD : 5.000 ms ± 0.011 ms (±11 μs!!)', 46, 368);
      lctx.fillStyle = '#38bdf8'; lctx.font = '800 28px monospace';
      lctx.fillText('0x83 SYNC WRITE : 3.80 ms → 1.18 ms  [PHASE LAG: 0]', 46, 434);

      lctx.fillStyle = '#1e293b';
      lctx.fillRect(46, 480, 932, 112);
      lctx.fillStyle = '#fde047'; lctx.font = '800 24px sans-serif';
      lctx.fillText('★ 前期フル単完勝（電気回路Ⅰ:秀S / 線形代数:優A / 微分積分:優A）', 68, 526);
      lctx.fillStyle = '#a7f3d0'; lctx.font = '800 25px monospace';
      lctx.fillText('DAY 170 PAYDAY +¥76,400  |  BALANCE : ¥291,520', 68, 572);
    } else if (mode === 'zmp_2m_telemetry') {
      lctx.fillText('HMD-01 Rev 1.5 ZMP Dynamic Walk Telemetry — DAY 172 2.0m SPRINT', 22, 27);
      lctx.fillStyle = '#34d399'; lctx.font = '900 42px monospace';
      lctx.fillText('2.0m FINISH : 15.2 s (34 STEPS!)', 46, 136);
      lctx.fillStyle = '#38bdf8'; lctx.font = '900 32px monospace';
      lctx.fillText('SPEED: 13.3 cm/s  |  PERIOD: 0.45 s', 46, 214);
      // Smooth continuous hyperbolic cosh wave
      lctx.strokeStyle = '#34d399'; lctx.lineWidth = 5;
      lctx.beginPath();
      for (let x = 56; x <= 950; x += 8) {
        const y = 345 + Math.sin(x * 0.04) * 58;
        if (x === 56) lctx.moveTo(x, y); else lctx.lineTo(x, y);
      }
      lctx.stroke();
      lctx.fillStyle = '#fde047'; lctx.font = '900 36px monospace';
      lctx.fillText('100 STEPS (6m) → R_KNEE : 48.0 °C [COOL!]', 46, 505);
      lctx.fillStyle = '#a7f3d0'; lctx.font = '800 24px sans-serif';
      lctx.fillText('前回64cmで75℃沸騰 → 止まらず倒れ続ける動歩行で熱の壁を突破！', 46, 568);
    } else {
      // 'tournament_entry_ok' (Day 175 Midnight Official Entry Confirmation!)
      lctx.fillStyle = '#07131e';
      lctx.fillRect(0, 42, 1024, 598);
      lctx.fillStyle = '#34d399';
      lctx.fillText('ALL-JAPAN BIPEDAL ROBOT OPEN 19th — OFFICIAL ENTRY CONFIRMED', 22, 27);
      lctx.fillStyle = '#34d399'; lctx.font = '900 38px sans-serif';
      lctx.fillText('✓ 大会エントリー送信完了（決済済 ¥3,000）', 48, 134);
      lctx.strokeStyle = '#38bdf8'; lctx.lineWidth = 3;
      lctx.strokeRect(48, 174, 928, 290);
      lctx.fillStyle = '#f8fafc'; lctx.font = '800 28px sans-serif';
      lctx.fillText('所属団体・チーム名：なし（個人参加）', 80, 240);
      lctx.fillText('製作者氏名　　　　：佐伯 湊（18歳）', 80, 304);
      lctx.fillStyle = '#38bdf8';
      lctx.fillText('エントリー機体名　：HMD-01（380mm / 1,762g / 16軸自律）', 80, 368);
      lctx.fillStyle = '#fde047'; lctx.font = '800 26px monospace';
      lctx.fillText('EVENT : 11月6日［日］都内産業貿易センター（規定3m歩行＆起き上がり）', 80, 434);
      lctx.fillStyle = '#fb923c'; lctx.font = '900 34px monospace';
      lctx.fillText('COUNTDOWN TO TOURNAMENT : 40 DAYS LEFT', 48, 558);
    }
    lapTex.needsUpdate = true;
  }

  setLaptopMode('pulseview_13ms_bug');

  return {
    laptopMat,
    odeNotebookMat,
    posterMat,
    setLaptopMode,
  };
}

export function createCh08World(scene, baseMats, ngMats, screens) {
  const props = createCh08Props(baseMats, ngMats);

  // ===========================================================================
  // SET 1: 大学講義棟 廊下掲示板 ＆ 銀杏舞う秋窓 (Day 174)
  // ===========================================================================
  const corridorSet = new THREE.Group();
  corridorSet.visible = false;
  scene.add(corridorSet);

  const corFloor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), baseMats.concrete);
  corFloor.rotation.x = -Math.PI / 2;
  corFloor.receiveShadow = true;
  corridorSet.add(corFloor);

  const corWall = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 3.2), baseMats.wallPaper);
  corWall.position.set(0, 1.6, -1.2);
  corridorSet.add(corWall);

  // Cork bulletin board with wooden frame
  const corkMat = new THREE.MeshStandardMaterial({ color: 0xb08354, roughness: 0.92 });
  const boardFrame = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.05, 0.03), ngMats.walnutProMat);
  boardFrame.position.set(0, 1.48, -1.18);
  const corkFace = new THREE.Mesh(new THREE.PlaneGeometry(1.36, 0.96), corkMat);
  corkFace.position.set(0, 1.48, -1.162);
  corridorSet.add(boardFrame, corkFace);

  // Tournament Poster pinned prominently with 4 gleaming red pushpins!
  const posterMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.75), screens.posterMat);
  posterMesh.position.set(0.02, 1.48, -1.156);
  corridorSet.add(posterMesh);

  const pinMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
  for (const [px, py] of [[-0.23, 1.82], [0.27, 1.82], [-0.23, 1.14], [0.27, 1.14]]) {
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.008, 12, 10), pinMat);
    pin.position.set(px, py, -1.150);
    corridorSet.add(pin);
  }

  // Secondary muted notices on the left of the corkboard for campus authenticity
  const noticeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.88 });
  const n1 = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.38), noticeMat);
  n1.position.set(-0.46, 1.56, -1.158);
  n1.rotation.z = 0.04;
  corridorSet.add(n1);

  // ===========================================================================
  // SET 2: 『コーポ武蔵野』203号室 — Workbench + 2.0m Straight ZMP EVA Runway!
  // ===========================================================================
  const apartment = new THREE.Group();
  scene.add(apartment);

  const roomWood = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 6.0), baseMats.woodFloor);
  roomWood.rotation.x = -Math.PI / 2;
  roomWood.receiveShadow = true;
  apartment.add(roomWood);

  const tatami = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.018, 4.4), baseMats.tatami);
  tatami.position.set(0.12, 0.009, 0.55);
  tatami.receiveShadow = true;
  apartment.add(tatami);

  // 2.0m Straight Black Interlocking EVA Runway (top y = 0.038m!)
  const evaMatPBR = createEVAMatPBR();
  const evaRunway = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.020, 2.80), evaMatPBR);
  evaRunway.position.set(0.10, 0.028, 1.05);
  evaRunway.receiveShadow = true;
  apartment.add(evaRunway);

  // Crisp White/Emerald Runway Tape Markers (0.0m, 0.5m, 1.0m, 1.5m, 2.0m FINISH!)
  const runwayMarks = new THREE.Group();
  runwayMarks.position.set(0.10, 0.039, 0.15);
  for (let i = 0; i <= 4; i++) {
    const isFinish = i === 4;
    const isStart = i === 0;
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(0.64, isFinish ? 0.018 : 0.009),
      new THREE.MeshBasicMaterial({
        color: isFinish ? 0x34d399 : isStart ? 0xf8fafc : 0x64748b,
        transparent: true,
        opacity: isFinish || isStart ? 0.92 : 0.65,
      })
    );
    line.rotation.x = -Math.PI / 2;
    line.position.set(0, 0, i * 0.50);
    runwayMarks.add(line);
  }
  apartment.add(runwayMarks);

  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 2.6), baseMats.wallPaper);
  backWall.position.set(0, 1.3, -1.95);
  apartment.add(backWall);

  // Window Shader: 0 = Crisp Post-Typhoon September Blue Sky, 1 = Midnight Deep Indigo!
  const winMat = new THREE.ShaderMaterial({
    uniforms: { uNight: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uNight;
      varying vec2 vUv;
      void main() {
        vec3 autumn = mix(vec3(0.76, 0.90, 1.0), vec3(0.18, 0.52, 0.92), vUv.y);
        vec3 night = mix(vec3(0.02, 0.04, 0.11), vec3(0.06, 0.11, 0.24), vUv.y);
        gl_FragColor = vec4(mix(autumn, night, uNight), 1.0);
      }
    `,
  });
  const winPane = new THREE.Mesh(new THREE.PlaneGeometry(1.45, 1.15), winMat);
  winPane.position.set(-0.05, 1.42, -1.935);
  apartment.add(winPane);

  // Satin Pore-Detailed Walnut Workbench (top y = 0.720m, z = -0.55m)
  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 0, -0.55);
  apartment.add(deskGroup);

  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.30, 0.028, 0.66), ngMats.walnutProMat);
  deskTop.position.y = 0.706;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  // Laptop on Left of Desk
  const laptop = new THREE.Group();
  laptop.position.set(-0.34, 0.726, -0.10);
  laptop.rotation.y = 0.25;
  const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.011, 0.22), baseMats.brushedAlu);
  const lapLid = new THREE.Group();
  lapLid.position.set(0, 0.006, -0.106);
  lapLid.rotation.x = -0.26;
  const lidBack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.21, 0.007), baseMats.brushedAlu);
  lidBack.position.y = 0.105;
  const lidScr = new THREE.Mesh(new THREE.PlaneGeometry(0.30, 0.188), screens.laptopMat);
  lidScr.position.set(0, 0.106, 0.0045);
  lapLid.add(lidBack, lidScr);
  laptop.add(lapBase, lapLid);
  deskGroup.add(laptop);

  // Open 3D-LIPM ODE Notebook + Glowing Hyperbolic ZMP Hologram on Desk (Cut 1B)
  const odeNb = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.008, 0.23), screens.odeNotebookMat);
  odeNb.position.set(0.14, 0.724, 0.06);
  odeNb.rotation.y = -0.06;
  odeNb.receiveShadow = true;
  odeNb.visible = false;
  deskGroup.add(odeNb);

  props.lipmHolo.position.set(0.14, 0.742, 0.06);
  props.lipmHolo.visible = false;
  deskGroup.add(props.lipmHolo);

  // Workbench Macro `HMD-CORE-v1` + 24MHz Logic Analyzer + 3 IC Clips + Dual-Core Hologram (Cuts 2B & 3A)
  const labPcb = createHMDCorePCBRig(baseMats, ngMats, 1.65);
  labPcb.setAssemblyState({ stage: 'uv_cured', busbarProgress: 1.0, ledOn: true, uvGlow: 0.15 });
  labPcb.root.position.set(0.06, 0.734, 0.06);
  labPcb.root.visible = false;
  deskGroup.add(labPcb.root);

  props.logicGroup.position.set(0.06, 0.720, 0.06);
  props.logicGroup.visible = false;
  props.dualCoreHolo.position.set(0.06, 0.752, 0.05);
  props.dualCoreHolo.visible = false;
  deskGroup.add(props.logicGroup, props.dualCoreHolo);

  // Broomstick Inverted Pendulum Rig hovering above Desk (Cut 1A)
  props.broomRig.position.set(0.08, 0.88, 0.04);
  props.broomRig.visible = false;
  deskGroup.add(props.broomRig);

  // Floor Telemetry Laptop beside 2.0m EVA Runway (Cut 4B)
  const floorLaptop = laptop.clone();
  floorLaptop.position.set(-0.34, 0.044, 1.92);
  floorLaptop.rotation.y = 0.52;
  floorLaptop.visible = false;
  apartment.add(floorLaptop);

  // Non-Contact IR Laser Thermometer Gun (Cut 4C)
  props.irGun.visible = false;
  apartment.add(props.irGun);

  // HERO DYNAMIC ZMP `HMD-01 Rev 1.5` (with 1.0mm silicone grip pads & 3D-LIPM gait!)
  const heroZmp = createHMD01ZmpDynamicRig(baseMats, ngMats);
  heroZmp.setAssemblyProgress(1.0);
  heroZmp.root.position.set(0.10, 0.038, 0.15);
  apartment.add(heroZmp.root);

  function setActiveSet(name) {
    corridorSet.visible = name === 'corridor';
    apartment.visible = name === 'apartment';
  }

  return {
    setActiveSet,
    corridorSet,
    apartment,
    winMat,
    deskGroup,
    laptop,
    floorLaptop,
    odeNb,
    labPcb,
    runwayMarks,
    heroZmp,
    props,
  };
}
