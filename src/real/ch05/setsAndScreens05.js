import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createHMDCorePCBRig, createCh05ToolsAndPackaging } from './hmdCorePcbRig.js';
import { createHawkReflexSystem } from './hawkReflexRig.js';
import { createNextGenHandRig } from '../nextgen/pbrMicroTextures.js';

export function createCh05Screens() {
  // 1. Laptop Display (1024 x 640)
  const lapC = document.createElement('canvas');
  lapC.width = 1024;
  lapC.height = 640;
  const lctx = lapC.getContext('2d');
  const lapTex = new THREE.CanvasTexture(lapC);
  lapTex.colorSpace = THREE.SRGBColorSpace;
  const laptopMat = new THREE.MeshBasicMaterial({ map: lapTex });

  // 2. Smartphone Display (768 x 1024)
  const phC = document.createElement('canvas');
  phC.width = 768;
  phC.height = 1024;
  const pctx = phC.getContext('2d');
  const phTex = new THREE.CanvasTexture(phC);
  phTex.colorSpace = THREE.SRGBColorSpace;
  const phoneMat = new THREE.MeshBasicMaterial({ map: phTex });

  // 3. Sanwa CD771 Multimeter LCD (512 x 280)
  const mmC = document.createElement('canvas');
  mmC.width = 512;
  mmC.height = 280;
  const mctx = mmC.getContext('2d');
  const mmTex = new THREE.CanvasTexture(mmC);
  mmTex.colorSpace = THREE.SRGBColorSpace;
  const meterMat = new THREE.MeshBasicMaterial({ map: mmTex });

  // 4. 5mm Grid AC Phasor / Electronics Exam Notebook (1024 x 768)
  const nbC = document.createElement('canvas');
  nbC.width = 1024;
  nbC.height = 768;
  const nctx = nbC.getContext('2d');
  nctx.fillStyle = '#fcfbf7';
  nctx.fillRect(0, 0, 1024, 768);
  nctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
  for (let x = 0; x < 1024; x += 24) { nctx.beginPath(); nctx.moveTo(x, 0); nctx.lineTo(x, 768); nctx.stroke(); }
  for (let y = 0; y < 768; y += 24) { nctx.beginPath(); nctx.moveTo(0, y); nctx.lineTo(1024, y); nctx.stroke(); }
  nctx.fillStyle = '#0f172a';
  nctx.font = '800 32px sans-serif';
  nctx.fillText('前期末試験対策：電気回路Ⅰ（交流フェーザ計算）＆ 基板電源設計', 42, 72);
  nctx.fillStyle = '#1d4ed8';
  nctx.font = '700 26px monospace';
  nctx.fillText('・Pch MOSFET 理想ダイオード逆接保護 : P = I²·R_DS(on) = 100 × 0.004 = 0.4 W', 42, 168);
  nctx.fillText('・1oz(35μm)銅箔 12A 許容幅 8.8mm ＋ レジスト開口はんだバスバー増強', 42, 236);
  nctx.fillStyle = '#047857';
  nctx.fillText('・Z(jω) = R + j(ωL - 1/ωC)   [単位死守＝来年の開発時間を守る戦い！]', 42, 330);
  const nbTex = new THREE.CanvasTexture(nbC);
  nbTex.colorSpace = THREE.SRGBColorSpace;
  const notebookMat = new THREE.MeshStandardMaterial({ map: nbTex, roughness: 0.85 });

  let curLap = '';
  let curPh = '';
  let curMm = '';

  function setLaptopMode(mode) {
    if (mode === curLap) return;
    curLap = mode;
    lctx.fillStyle = '#0b0f17';
    lctx.fillRect(0, 0, 1024, 640);
    lctx.fillStyle = '#161b22';
    lctx.fillRect(0, 0, 1024, 40);
    lctx.fillStyle = '#94a3b8';
    lctx.font = '700 18px monospace';

    if (mode === 'kicad_routing') {
      lctx.fillStyle = '#05070a';
      lctx.fillRect(0, 40, 1024, 600);
      lctx.fillStyle = '#e2e8f0';
      lctx.fillText('KiCad 8.0 PCB Editor — HMD-CORE-v1 (55.0 x 50.0 mm | 1oz 35um | DRC: 0 Errors)', 22, 26);

      // Yellow Edge.Cuts outline
      lctx.strokeStyle = '#eab308';
      lctx.lineWidth = 4;
      lctx.strokeRect(210, 78, 604, 504);

      // Blue Back-Copper (B.Cu) 4-Way Star Distribution Buses!
      lctx.strokeStyle = '#2563eb';
      lctx.lineWidth = 9;
      for (const bx of [310, 435, 585, 710]) {
        lctx.beginPath(); lctx.moveTo(bx, 110); lctx.lineTo(bx, 555); lctx.stroke();
      }

      // Red Front-Copper (F.Cu) Signal & Power Pours
      lctx.strokeStyle = '#ef4444';
      lctx.lineWidth = 4.5;
      for (let ry = 128; ry <= 520; ry += 42) {
        lctx.beginPath(); lctx.moveTo(240, ry); lctx.lineTo(780, ry); lctx.stroke();
      }

      // Central 8.8mm Exposed Gold Solder-Mask Aperture ("レジスト開口")
      lctx.fillStyle = '#b91c1c';
      lctx.fillRect(245, 296, 534, 68);
      lctx.fillStyle = '#fbbf24';
      lctx.fillRect(262, 310, 500, 40);
      lctx.fillStyle = '#f8fafc';
      for (let vx = 280; vx <= 745; vx += 32) {
        lctx.beginPath(); lctx.arc(vx, 330, 5.5, 0, Math.PI * 2); lctx.fill();
      }

      lctx.fillStyle = '#fde047';
      lctx.font = '800 21px monospace';
      lctx.fillText('8.8mm Busbar + Solder Mask Opening | 4mΩ MOSFET (0.4W) | 4-Port Star', 96, 616);
    } else if (mode === 'jlcpcb_order') {
      lctx.fillStyle = '#f8fafc';
      lctx.fillRect(0, 40, 1024, 600);
      lctx.fillStyle = '#1d4ed8';
      lctx.fillRect(0, 40, 1024, 86);
      lctx.fillStyle = '#ffffff';
      lctx.font = '900 32px sans-serif';
      lctx.fillText('JLCPCB — Gerber Upload & Order Confirmed (Shenzhen)', 42, 95);

      // Emerald 3D preview box
      lctx.fillStyle = '#065f38';
      lctx.fillRect(72, 175, 360, 320);
      lctx.fillStyle = '#fbbf24';
      lctx.fillRect(98, 315, 308, 36);
      lctx.fillStyle = '#ffffff';
      lctx.font = '800 20px monospace';
      lctx.fillText('HMD-CORE-v1', 102, 215);
      lctx.fillText('Designed by M.Saeki', 155, 472);

      lctx.fillStyle = '#0f172a';
      lctx.font = '800 26px monospace';
      lctx.fillText('Layers     : 2 Layers (1 oz = 35 μm Cu)', 475, 225);
      lctx.fillText('PCB Color  : Emerald Green / White Silk', 475, 290);
      lctx.fillText('Quantity   : 5 pcs', 475, 355);
      lctx.fillStyle = '#047857';
      lctx.font = '900 34px monospace';
      lctx.fillText('Total Paid : ¥2,450 (incl. Air Shipping)', 475, 445);
    } else if (mode === 'imu_mag_spin') {
      lctx.fillText('BNO085 Sensor Fusion Monitor — Magnetic Interference vs 6-Axis Mode', 22, 26);
      // Subtle center divider
      lctx.strokeStyle = '#1e293b'; lctx.lineWidth = 2;
      lctx.beginPath(); lctx.moveTo(512, 65); lctx.lineTo(512, 595); lctx.stroke();

      // Left: Wildly rotated 9-axis cube (+40 deg error!)
      lctx.strokeStyle = '#ef4444'; lctx.lineWidth = 5;
      lctx.save();
      lctx.translate(256, 265);
      lctx.rotate(0.68);
      lctx.strokeRect(-92, -92, 184, 184);
      lctx.restore();
      lctx.fillStyle = '#f87171'; lctx.font = '800 24px sans-serif';
      lctx.fillText('✕ 9軸地磁気コンパス併用モード', 68, 470);
      lctx.font = '700 21px sans-serif';
      lctx.fillText('股関節モータ磁束干渉で +40° 勝手に自転！', 52, 512);

      // Right: Rock-steady 6-axis Game Rotation Vector (200Hz)
      lctx.strokeStyle = '#34d399'; lctx.lineWidth = 5;
      lctx.strokeRect(676, 173, 184, 184);
      lctx.fillStyle = '#34d399'; lctx.font = '800 24px sans-serif';
      lctx.fillText('✓ Game Rotation Vector (6軸 200Hz)', 548, 470);
      lctx.font = '700 21px sans-serif';
      lctx.fillText('ジャイロ＋重力基準のみ：誤差 0.1° ピタリ静止！', 536, 512);
    } else if (mode === 'bottom_view_horror') {
      lctx.fillStyle = '#fff1f2';
      lctx.fillRect(0, 40, 1024, 600);
      lctx.fillStyle = '#991b1b';
      lctx.font = '900 28px sans-serif';
      lctx.fillText('5264-3P Connector Datasheet — 古典的フットプリント設計ミス発覚！', 44, 96);

      lctx.strokeStyle = '#dc2626'; lctx.lineWidth = 6;
      lctx.strokeRect(56, 140, 912, 236);
      lctx.fillStyle = '#dc2626'; lctx.font = '900 36px monospace';
      lctx.fillText('PCB Layout Dimension (BOTTOM VIEW) !!', 84, 232);
      lctx.fillStyle = '#1e293b'; lctx.font = '800 23px monospace';
      lctx.fillText('Actual Top: [Pin1: DATA?] [Pin2: +12V] [Pin3: GND?] <- MIRRORED', 76, 318);

      lctx.fillStyle = '#b91c1c'; lctx.font = '800 24px sans-serif';
      lctx.fillText('裏面透視図のまま表面配置 → 全4ポートで 1番(GND) と 3番(DATA) が逆転！', 56, 450);
      lctx.fillStyle = '#047857'; lctx.font = '800 23px sans-serif';
      lctx.fillText('★不幸中の幸い：中央2番ピンが +12V のため焼損回避 → 0.3mm基板手術で完封！', 56, 518);
    } else {
      // 'wifi_udp_hawk' (Day 098 Cable-Free Hawk-Reflex Telemetry!)
      lctx.fillText('HMD-CORE-v1 Wi-Fi UDP Wireless Telemetry [CABLE-FREE AUTONOMOUS]', 22, 26);
      lctx.fillStyle = '#34d399'; lctx.font = '900 29px monospace';
      lctx.fillText('● WI-FI UDP CONNECTED  |  3S LiPo: 11.82 V  |  ERRORS: 0', 38, 120);

      // Live flat emerald horizon line vs oscillating orange board wave!
      lctx.strokeStyle = '#f97316'; lctx.lineWidth = 4;
      lctx.beginPath();
      for (let x = 60; x <= 960; x += 12) {
        const y = 310 + Math.sin(x * 0.025) * 85;
        if (x === 60) lctx.moveTo(x, y); else lctx.lineTo(x, y);
      }
      lctx.stroke();

      lctx.strokeStyle = '#34d399'; lctx.lineWidth = 7;
      lctx.beginPath(); lctx.moveTo(60, 310); lctx.lineTo(960, 310); lctx.stroke();

      lctx.fillStyle = '#fb923c'; lctx.font = '800 23px sans-serif';
      lctx.fillText('─── 合板傾斜外乱 (±8.0° Roll / +10.0° Pitch)', 64, 465);
      lctx.fillStyle = '#34d399';
      lctx.fillText('━━━ 骨盤・HMD-CORE-v1 水平維持角：誤差 0.32° 以内（200Hz 鷹の反射神経！）', 64, 525);
    }
    lapTex.needsUpdate = true;
  }

  function setPhoneMode(mode) {
    if (mode === curPh) return;
    curPh = mode;
    pctx.fillStyle = '#f8fafc';
    pctx.fillRect(0, 0, 768, 1024);
    if (mode === 'paycheck_151k') {
      pctx.fillStyle = '#0f172a';
      pctx.fillRect(0, 0, 768, 145);
      pctx.fillStyle = '#ffffff'; pctx.font = '800 34px sans-serif';
      pctx.fillText('むさしの銀行 — 第2回バイト給与入金', 44, 92);
      pctx.fillStyle = '#047857'; pctx.font = '900 44px monospace';
      pctx.fillText('＋¥68,500 振込完了', 48, 255);
      pctx.fillStyle = '#0f172a'; pctx.font = '900 96px monospace';
      pctx.fillText('¥151,820', 48, 415);
      pctx.fillStyle = '#334155'; pctx.font = '700 28px sans-serif';
      pctx.fillText('→ 深圳 JLCPCB 発注 ＆ 3S LiPo・BNO085 調達！', 48, 540);
    } else {
      // 'dhl_haneda' (Tanabata 20:45 Haneda Customs Cleared!)
      pctx.fillStyle = '#eab308';
      pctx.fillRect(0, 0, 768, 150);
      pctx.fillStyle = '#0f172a'; pctx.font = '900 36px sans-serif';
      pctx.fillText('国際エクスプレス 貨物追跡', 48, 96);
      pctx.fillStyle = '#047857'; pctx.font = '900 38px sans-serif';
      pctx.fillText('✓ 20:45 羽田クロノゲート', 48, 275);
      pctx.fillText('   国際通関完了・発送済！', 48, 340);
      pctx.fillStyle = '#1e293b'; pctx.font = '700 28px monospace';
      pctx.fillText('発地: 中国・深圳 (Shenzhen)', 48, 465);
      pctx.fillText('品名: HMD-CORE-v1 2-Layer PCB (5 pcs)', 48, 530);
    }
    phTex.needsUpdate = true;
  }

  function setMeterMode(mode) {
    if (mode === curMm) return;
    curMm = mode;
    const isErr = mode === 'pin3_short_beep';
    const isWarn = mode === 'gnd_open';
    mctx.fillStyle = isErr ? '#fecaca' : isWarn ? '#fef08a' : '#bbf7d0';
    mctx.fillRect(0, 0, 512, 280);
    mctx.strokeStyle = '#1e293b'; mctx.lineWidth = 8;
    mctx.strokeRect(8, 8, 496, 264);
    mctx.fillStyle = isErr ? '#991b1b' : '#0f172a';
    mctx.font = '800 25px monospace';

    if (mode === 'rail_3v3_pass') {
      mctx.fillText('DC V   3.3V LDO / 5.02V DCDC [PASS]', 24, 54);
      mctx.font = '900 98px monospace';
      mctx.fillText('3.301 V', 48, 192);
    } else if (mode === 'gnd_open') {
      mctx.fillText('CONT   PCB GND <-> BLACK WIRE', 24, 54);
      mctx.font = '900 92px monospace';
      mctx.fillText('O.L  (∞)', 44, 192);
      mctx.font = '800 24px monospace';
      mctx.fillText('SILENCE — NOT CONNECTED?!', 58, 248);
    } else {
      mctx.fillText(')))  PCB GND <-> PIN3 WHITE DATA!', 22, 54);
      mctx.font = '900 96px monospace';
      mctx.fillText('0.1 Ω !!', 42, 192);
      mctx.font = '800 25px monospace';
      mctx.fillText('BEEP!! PIN 1 & 3 REVERSED!', 48, 248);
    }
    mmTex.needsUpdate = true;
  }

  setLaptopMode('kicad_routing');
  setPhoneMode('paycheck_151k');
  setMeterMode('rail_3v3_pass');

  return {
    laptopMat,
    phoneMat,
    meterMat,
    notebookMat,
    setLaptopMode,
    setPhoneMode,
    setMeterMode,
  };
}

export function createCh05World(scene, baseMats, ngMats, screens) {
  // ===========================================================================
  // SET 1: 大学附属図書館 夜の自習席・駐輪場スマホ確認 (Day 093 Tanabata Night)
  // ===========================================================================
  const librarySet = new THREE.Group();
  librarySet.visible = false;
  scene.add(librarySet);

  const libFloor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), baseMats.woodFloor);
  libFloor.rotation.x = -Math.PI / 2;
  libFloor.receiveShadow = true;
  librarySet.add(libFloor);

  // Study carrel desk + partition + AC phasor exam notebook + upright smartphone!
  const carrel = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.03, 0.65), ngMats.walnutProMat);
  carrel.position.set(0, 0.72, -0.5);
  carrel.castShadow = true;
  carrel.receiveShadow = true;
  librarySet.add(carrel);

  const carrelBack = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.48, 0.025), ngMats.birchPlywoodMat);
  carrelBack.position.set(0, 0.96, -0.82);
  librarySet.add(carrelBack);

  const libNb = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.006, 0.21), screens.notebookMat);
  libNb.position.set(-0.14, 0.738, -0.46);
  libNb.rotation.y = 0.12;
  librarySet.add(libNb);

  const libPhone = new THREE.Group();
  const lpBody = new THREE.Mesh(new THREE.BoxGeometry(0.076, 0.156, 0.008), baseMats.darkAnodized);
  const lpScr = new THREE.Mesh(new THREE.PlaneGeometry(0.070, 0.148), screens.phoneMat);
  lpScr.position.z = 0.0046;
  libPhone.add(lpBody, lpScr);
  libPhone.position.set(0.18, 0.84, -0.46);
  libPhone.rotation.set(-0.26, -0.22, 0);
  librarySet.add(libPhone);

  // ===========================================================================
  // SET 2: 『コーポ武蔵野』203号室 — Next-Gen Micro-Electronics & Hawk-Reflex Lab!
  // ===========================================================================
  const apartment = new THREE.Group();
  scene.add(apartment);

  const roomWood = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 4.6), baseMats.woodFloor);
  roomWood.rotation.x = -Math.PI / 2;
  roomWood.receiveShadow = true;
  apartment.add(roomWood);

  const tatami = new THREE.Mesh(new THREE.BoxGeometry(2.72, 0.018, 3.55), baseMats.tatami);
  tatami.position.set(0.15, 0.009, 0.1);
  tatami.receiveShadow = true;
  apartment.add(tatami);

  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 2.5), baseMats.wallPaper);
  backWall.position.set(0, 1.25, -1.95);
  apartment.add(backWall);

  // Summer July Open Window with Keyaki Tree Silhouette & Evening/Night Sky Shader
  const skyWinMat = new THREE.ShaderMaterial({
    uniforms: { uAfternoon: { value: 0 }, uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uAfternoon;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec3 night = mix(vec3(0.04, 0.08, 0.18), vec3(0.09, 0.16, 0.32), vUv.y);
        vec3 aft = mix(vec3(0.72, 0.86, 0.98), vec3(0.45, 0.72, 0.96), vUv.y);
        vec3 col = mix(night, aft, uAfternoon);
        // Subtle swaying Keyaki tree canopy silhouette outside in early summer breeze!
        float sway = sin(uTime * 1.4 + vUv.y * 4.0) * 0.02;
        float canopy = smoothstep(0.42, 0.36, length(vUv - vec2(0.76 + sway, 0.28)));
        col = mix(col, col * 0.32 + vec3(0.02, 0.08, 0.04), canopy * 0.85);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const winPane = new THREE.Mesh(new THREE.PlaneGeometry(1.45, 1.15), skyWinMat);
  winPane.position.set(-0.05, 1.42, -1.935);
  apartment.add(winPane);

  // Satin Pore-Detailed Walnut Engineering Desk (Top Surface y = 0.720m, centered at z = -0.55m)
  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 0, -0.55);
  apartment.add(deskGroup);

  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.028, 0.64), ngMats.walnutProMat);
  deskTop.position.y = 0.706;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  // Illuminated Articulated Magnifying Loupe Lamp ("デスクライトの真下に拡大鏡をセット")!
  const loupeGroup = new THREE.Group();
  loupeGroup.position.set(0.06, 0.91, 0.03);
  loupeGroup.visible = false;
  const loupeRing = new THREE.Mesh(new THREE.TorusGeometry(0.058, 0.006, 12, 32), baseMats.bambuWhite);
  loupeRing.rotation.x = Math.PI / 2;
  const loupeGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.054, 0.054, 0.004, 32), baseMats.glassClear);
  loupeGroup.add(loupeRing, loupeGlass);
  deskGroup.add(loupeGroup);

  // 14-inch Laptop on Left Side of Desk
  const laptop = new THREE.Group();
  laptop.position.set(-0.35, 0.726, -0.11);
  laptop.rotation.y = 0.25;
  const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.011, 0.22), baseMats.brushedAlu);
  lapBase.castShadow = true;
  laptop.add(lapBase);
  const lapLid = new THREE.Group();
  lapLid.position.set(0, 0.006, -0.106);
  lapLid.rotation.x = -0.26;
  const lidBack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.21, 0.007), baseMats.brushedAlu);
  lidBack.position.y = 0.105;
  const lidScr = new THREE.Mesh(new THREE.PlaneGeometry(0.30, 0.188), screens.laptopMat);
  lidScr.position.set(0, 0.106, 0.0045);
  lapLid.add(lidBack, lidScr);
  laptop.add(lapLid);
  deskGroup.add(laptop);

  // Sanwa CD771 Multimeter on Left-Front of Desk
  const multimeter = new THREE.Group();
  multimeter.position.set(-0.36, 0.742, 0.14);
  multimeter.rotation.set(0.15, 0.34, 0);
  const mmBody = new THREE.Mesh(new THREE.BoxGeometry(0.086, 0.034, 0.165), baseMats.sanwaHolster);
  mmBody.castShadow = true;
  const mmLcd = new THREE.Mesh(new THREE.PlaneGeometry(0.068, 0.042), screens.meterMat);
  mmLcd.rotation.x = -Math.PI / 2;
  mmLcd.position.set(0, 0.0176, -0.038);
  const mmDial = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.023, 0.009, 24), baseMats.darkAnodized);
  mmDial.position.set(0, 0.018, 0.024);
  multimeter.add(mmBody, mmLcd, mmDial);
  deskGroup.add(multimeter);

  // Hakko FX-600 Soldering Iron (360°C for mounding the lead-free solder busbar!)
  const ironRig = new THREE.Group();
  ironRig.visible = false;
  const ironHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.0105, 0.11, 20), baseMats.hakkoBlue);
  ironHandle.rotation.x = Math.PI / 2;
  ironHandle.position.z = 0.095;
  const ironCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.015, 20), baseMats.wireYellow);
  ironCollar.rotation.x = Math.PI / 2;
  ironCollar.position.z = 0.045;
  const ironShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.0038, 0.0046, 0.055, 18), baseMats.chromeSteel);
  ironShaft.rotation.x = Math.PI / 2;
  ironShaft.position.z = 0.015;
  const ironTip = new THREE.Mesh(new THREE.ConeGeometry(0.0036, 0.022, 16), ngMats.solderBusbarMat);
  ironTip.rotation.x = -Math.PI / 2;
  ironTip.position.z = -0.022;
  ironRig.add(ironHandle, ironCollar, ironShaft, ironTip);
  deskGroup.add(ironRig);

  // HERO WORKBENCH `HMD-CORE-v1` PCB (1.68x tabletop macro scale so 0805 passives & X-jumpers shine!)
  const heroPcb = createHMDCorePCBRig(baseMats, ngMats, 1.68);
  heroPcb.root.position.set(0.06, 0.734, 0.06);
  deskGroup.add(heroPcb.root);

  // Unboxing Box + OLFA Craft Knife + 395nm UV Torch + Standalone 3S LiPo
  const tools = createCh05ToolsAndPackaging(baseMats, ngMats);
  tools.unboxGroup.position.set(0.10, 0.72, 0.02);
  tools.craftKnife.visible = false;
  tools.uvTorch.visible = false;
  tools.lipoPack.position.set(0.25, 0.72, -0.06);
  tools.lipoPack.rotation.y = -0.35;
  deskGroup.add(tools.unboxGroup, tools.craftKnife, tools.uvTorch, tools.lipoPack);

  // CLIMAX DAY 098 HAWK-REFLEX SYSTEM (40cm Birch Plywood Board + Untethered 1,222g 12-DOF Robot + Dual Hands!)
  const hawkSystem = createHawkReflexSystem(baseMats, ngMats);
  hawkSystem.root.position.set(0.10, 0.72, 0.04);
  hawkSystem.root.visible = false;
  deskGroup.add(hawkSystem.root);

  // Additional Macro Hand Rig for holding Knife / Probe
  const rightToolHand = createNextGenHandRig(baseMats, ngMats, 1);
  rightToolHand.group.visible = false;
  deskGroup.add(rightToolHand.group);

  const minatoRoom = createRealisticHuman(baseMats, {
    role: 'minato',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoRoom.root.position.set(0, 0, 0.12);
  minatoRoom.root.rotation.y = Math.PI;
  apartment.add(minatoRoom.root);

  function setActiveSet(name) {
    librarySet.visible = name === 'library';
    apartment.visible = name === 'apartment';
  }

  return {
    setActiveSet,
    librarySet,
    libPhone,
    apartment,
    skyWinMat,
    deskGroup,
    loupeGroup,
    laptop,
    multimeter,
    ironRig,
    heroPcb,
    tools,
    hawkSystem,
    rightToolHand,
    minatoRoom,
  };
}
