import * as THREE from 'three';
import { createNextGenHandRig } from '../nextgen/pbrMicroTextures.js';
import { createEVAMatPBR } from '../ch06/hmd01Rev10Rig.js';
import {
  createPetgCfMaterial,
  createHMD01Rev15Athlete,
  createCh07Props,
} from './hmd01Rev15Rig.js';

export function createCh07Screens() {
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

  // 3. Kitchen Digital Scale LED (512 x 256)
  const scC = document.createElement('canvas');
  scC.width = 512;
  scC.height = 256;
  const sctx = scC.getContext('2d');
  const scTex = new THREE.CanvasTexture(scC);
  scTex.colorSpace = THREE.SRGBColorSpace;
  const scaleLcdMat = new THREE.MeshBasicMaterial({ map: scTex });

  // 4. Open Textbook Ch.4: "ZMPと線形倒立振子モデル" (1024 x 768)
  const tbC = document.createElement('canvas');
  tbC.width = 1024;
  tbC.height = 768;
  const tbctx = tbC.getContext('2d');
  tbctx.fillStyle = '#f4f0e4';
  tbctx.fillRect(0, 0, 1024, 768);
  // Center book spine crease shadow
  const grad = tbctx.createLinearGradient(490, 0, 534, 0);
  grad.addColorStop(0, 'rgba(15,23,42,0)');
  grad.addColorStop(0.5, 'rgba(15,23,42,0.22)');
  grad.addColorStop(1, 'rgba(15,23,42,0)');
  tbctx.fillStyle = grad;
  tbctx.fillRect(490, 0, 44, 768);

  // Left page
  tbctx.fillStyle = '#0f172a';
  tbctx.font = '900 30px serif';
  tbctx.fillText('第4章  ZMP と線形倒立振子モデル', 42, 92);
  tbctx.strokeStyle = '#334155';
  tbctx.lineWidth = 3;
  tbctx.beginPath(); tbctx.moveTo(42, 114); tbctx.lineTo(470, 114); tbctx.stroke();
  tbctx.font = '700 22px sans-serif';
  tbctx.fillStyle = '#1e293b';
  tbctx.fillText('4.1 静歩行の熱限界と動歩行への移行', 42, 180);
  tbctx.fillStyle = '#0369a1';
  tbctx.font = '800 24px monospace';
  tbctx.fillText('p_ZMP = x - (z_c / g) · ẍ', 46, 260);
  tbctx.fillStyle = '#334155';
  tbctx.font = '700 20px sans-serif';
  tbctx.fillText('・前へ倒れ込む重力の勢いをそのまま利用', 42, 345);
  tbctx.fillText('・0.4秒で次の足を差し出し準ストールを回避', 42, 395);
  tbctx.fillText('・逆起電力発生 → 消費電流＆発熱を劇的低減', 42, 445);

  // Right page
  tbctx.fillStyle = '#0f172a';
  tbctx.font = '900 28px serif';
  tbctx.fillText('Linear Inverted Pendulum (LIPM)', 555, 92);
  tbctx.fillStyle = '#047857';
  tbctx.font = '800 24px monospace';
  tbctx.fillText('ẍ = (g / z_c) · (x - p_ZMP)', 560, 188);
  tbctx.fillText('T_c = √(z_c / g) ≈ 0.143 s', 560, 245);
  tbctx.fillStyle = '#b45309';
  tbctx.font = '800 22px sans-serif';
  tbctx.fillText('NEXT: 11月二足歩行競技会へ！', 560, 620);
  const tbTex = new THREE.CanvasTexture(tbC);
  tbTex.colorSpace = THREE.SRGBColorSpace;
  const textbookMat = new THREE.MeshStandardMaterial({ map: tbTex, color: 0xada696, roughness: 0.95 });

  let curLap = '';
  let curPh = '';
  let curSc = '';

  function setLaptopMode(mode) {
    if (mode === curLap) return;
    curLap = mode;
    lctx.fillStyle = '#090e17';
    lctx.fillRect(0, 0, 1024, 640);
    lctx.fillStyle = '#151e2e';
    lctx.fillRect(0, 0, 1024, 42);
    lctx.fillStyle = '#94a3b8';
    lctx.font = '700 18px monospace';

    if (mode === 'pd_damping_compare') {
      lctx.fillText('HMD-CORE-v1 200Hz Attitude PD Controller — Oil-Damper D-Term Tuning', 22, 27);
      // Center divider
      lctx.strokeStyle = '#1e293b'; lctx.lineWidth = 2;
      lctx.beginPath(); lctx.moveTo(512, 62); lctx.lineTo(512, 595); lctx.stroke();

      // Left: Undamped P-only red spring oscillation
      lctx.strokeStyle = '#ef4444'; lctx.lineWidth = 4;
      lctx.beginPath();
      for (let x = 44; x <= 470; x += 6) {
        const u = (x - 44) / 426;
        const y = 250 + Math.sin(u * Math.PI * 8) * (45 + u * 55);
        if (x === 44) lctx.moveTo(x, y); else lctx.lineTo(x, y);
      }
      lctx.stroke();
      lctx.fillStyle = '#f87171'; lctx.font = '800 23px sans-serif';
      lctx.fillText('✕ P制御のみ（減衰なし理想バネ）', 52, 420);
      lctx.font = '700 21px monospace';
      lctx.fillText('Δθ = -Kp·θ → 位相遅れで無限発振', 52, 462);

      // Right: Critically damped PD response
      lctx.strokeStyle = '#34d399'; lctx.lineWidth = 5;
      lctx.beginPath();
      for (let x = 550; x <= 976; x += 6) {
        const u = (x - 550) / 426;
        const y = 250 - Math.exp(-u * 6.5) * Math.sin(u * Math.PI * 1.4 + 0.6) * 95;
        if (x === 550) lctx.moveTo(x, y); else lctx.lineTo(x, y);
      }
      lctx.stroke();
      lctx.fillStyle = '#34d399'; lctx.font = '800 23px sans-serif';
      lctx.fillText('✓ PD制御（ジャイロ角速度ブレーキ）', 550, 420);
      lctx.font = '800 22px monospace';
      lctx.fillText('Δθ = -Kp·θ - Kd·ω [TEMP 41°C]', 550, 462);

      lctx.fillStyle = '#38bdf8'; lctx.font = '800 22px monospace';
      lctx.fillText('DAY 142 PAYDAY +¥84,600  |  BALANCE: ¥224,620', 220, 560);
    } else if (mode === 'cycloid_gravity_comp') {
      lctx.fillText('C++ Gait State Machine — Cycloid Swing & +3.2° Gravity Feedforward [OTA]', 22, 27);
      lctx.fillStyle = '#38bdf8'; lctx.font = '900 28px monospace';
      lctx.fillText('x(τ) = S·(τ - sin(2πτ)/2π)   z(τ) = H/2·(1 - cos(2πτ))', 46, 128);
      lctx.fillStyle = '#f87171'; lctx.font = '800 25px sans-serif';
      lctx.fillText('✕ 補正なし：片足支持でギア隙間＋たわみ -2.8° 垂下 → 床引きずり！', 46, 224);
      lctx.fillStyle = '#34d399'; lctx.font = '800 26px sans-serif';
      lctx.fillText('✓ 重力補償フィードフォワード：支持脚 股ロール +3.2° 先行引き上げ', 46, 308);
      lctx.fillStyle = '#0f172a';
      lctx.fillRect(46, 360, 932, 132);
      lctx.strokeStyle = '#34d399'; lctx.lineWidth = 3;
      lctx.strokeRect(46, 360, 932, 132);
      lctx.fillStyle = '#e2e8f0'; lctx.font = '700 24px monospace';
      lctx.fillText('float comp = +3.2f * DEG2RAD * sinf(M_PI * tau);', 72, 415);
      lctx.fillText('stanceHipRoll += comp; // Wi-Fi OTA FLASH 100% OK!', 72, 462);
    } else if (mode === 'walk_success_160mm') {
      lctx.fillText('HMD-01 Rev 1.5 Autonomous Telemetry — DAY 146 03:12 AM', 22, 27);
      lctx.fillStyle = '#34d399'; lctx.font = '900 44px monospace';
      lctx.fillText('★ FIRST AUTONOMOUS WALK PASS!', 56, 150);
      lctx.fillStyle = '#f8fafc'; lctx.font = '900 38px monospace';
      lctx.fillText('4 STEPS  |  DISTANCE : 160.0 mm', 56, 250);
      lctx.fillStyle = '#38bdf8'; lctx.font = '800 28px monospace';
      lctx.fillText('CABLE-FREE  |  MASS: 1,762 g  |  ERRORS: 0', 56, 345);
      lctx.fillStyle = '#a7f3d0'; lctx.font = '800 26px sans-serif';
      lctx.fillText('左足+40mm → 右足+80mm → 左足+80mm → 160.0mm 完全無衝撃着地！', 56, 460);
    } else {
      // 'thermal_75c_wall' (Day 150 Step 16 64cm 75°C Thermal Shutdown!)
      lctx.fillStyle = '#2a0808';
      lctx.fillRect(0, 42, 1024, 598);
      lctx.fillStyle = '#fca5a5';
      lctx.fillText('HMD-CORE-v1 CRITICAL ALARM — STEP 16 (64 cm) QUASI-STALL THERMAL WALL!', 22, 27);
      lctx.fillStyle = '#ef4444'; lctx.font = '900 38px monospace';
      lctx.fillText('[CRITICAL] ID:04 R_Knee : 75°C >= LIMIT', 42, 126);
      lctx.fillStyle = '#fde047'; lctx.font = '800 28px monospace';
      lctx.fillText('[PROTECT] Thermal Shutdown! Torque Released.', 42, 188);

      // Temperature rising curve hitting 75°C ceiling!
      lctx.strokeStyle = '#ef4444'; lctx.lineWidth = 6;
      lctx.beginPath();
      lctx.moveTo(64, 430);
      lctx.quadraticCurveTo(420, 390, 740, 248);
      lctx.lineTo(940, 248);
      lctx.stroke();

      lctx.strokeStyle = '#fde047'; lctx.lineWidth = 3;
      lctx.setLineDash([10, 8]);
      lctx.beginPath(); lctx.moveTo(64, 248); lctx.lineTo(960, 248); lctx.stroke();
      lctx.setLineDash([]);

      lctx.fillStyle = '#f8fafc'; lctx.font = '800 24px sans-serif';
      lctx.fillText('1歩2.8秒の静歩行 → ω≈0 で 1.6A 保持電流の100%がジュール熱 (P=I²R) へ！', 48, 508);
      lctx.fillStyle = '#34d399';
      lctx.fillText('✓ PETG-CF 骨格の変形：0.00 mm（無傷） → 次は『動歩行 ZMP』へ！', 48, 560);
    }
    lapTex.needsUpdate = true;
  }

  function setPhoneMode(mode) {
    if (mode === curPh) return;
    curPh = mode;
    pctx.fillStyle = '#dbeafe';
    pctx.fillRect(0, 0, 768, 1024);
    pctx.fillStyle = '#1e3a8a';
    pctx.fillRect(0, 0, 768, 130);
    pctx.fillStyle = '#ffffff'; pctx.font = '900 38px sans-serif';
    pctx.fillText('母さん（実家）— 8月13日 お盆', 44, 84);

    // Mom's white bubble
    pctx.fillStyle = '#ffffff';
    pctx.fillRect(42, 190, 560, 150);
    pctx.fillStyle = '#0f172a'; pctx.font = '800 32px sans-serif';
    pctx.fillText('お盆くらい帰ってこないの？', 68, 252);
    pctx.fillText('畑のスイカ冷えてるよ 🍉', 68, 306);

    // Minato's green reply bubble
    pctx.fillStyle = '#86efac';
    pctx.fillRect(150, 410, 576, 170);
    pctx.fillStyle = '#052e16'; pctx.font = '800 30px sans-serif';
    pctx.fillText('ごめん、夏期講習のシフトと', 176, 472);
    pctx.fillText('作ってるやつが山場だから、', 176, 518);
    pctx.fillText('正月には帰る', 176, 562);

    pctx.fillStyle = '#334155'; pctx.font = '700 24px monospace';
    pctx.fillText('既読 13:42   [PETG-CF 65°C DRYING...]', 210, 625);
    phTex.needsUpdate = true;
  }

  function setScaleMode(mode) {
    if (mode === curSc) return;
    curSc = mode;
    sctx.fillStyle = '#06120c';
    sctx.fillRect(0, 0, 512, 256);
    sctx.strokeStyle = '#10b981';
    sctx.lineWidth = 8;
    sctx.strokeRect(8, 8, 496, 240);
    sctx.fillStyle = '#34d399';
    sctx.font = '900 108px monospace';
    sctx.fillText('1762 g', 34, 152);
    sctx.fillStyle = '#a7f3d0';
    sctx.font = '800 28px monospace';
    sctx.fillText('-180g PASS!  (MAX 1800g)', 36, 218);
    scTex.needsUpdate = true;
  }

  setLaptopMode('pd_damping_compare');
  setPhoneMode('obon_mom_line');
  setScaleMode('weight_1762g_pass');

  return {
    laptopMat,
    phoneMat,
    scaleLcdMat,
    textbookMat,
    setLaptopMode,
    setPhoneMode,
    setScaleMode,
  };
}

export function createCh07World(scene, baseMats, ngMats, screens) {
  const petgCfMat = createPetgCfMaterial();
  const props = createCh07Props(baseMats, ngMats, petgCfMat);

  const apartment = new THREE.Group();
  scene.add(apartment);

  const roomWood = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 5.2), baseMats.woodFloor);
  roomWood.rotation.x = -Math.PI / 2;
  roomWood.receiveShadow = true;
  apartment.add(roomWood);

  const tatami = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.018, 3.8), baseMats.tatami);
  tatami.position.set(0.12, 0.009, 0.25);
  tatami.receiveShadow = true;
  apartment.add(tatami);

  // Extended 3-Mat 1.0m Black Interlocking EVA Walkway on Tatami (top y = 0.038m!)
  const evaMatPBR = createEVAMatPBR();
  const evaWalkway = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.020, 2.25), evaMatPBR);
  evaWalkway.position.set(0.10, 0.028, 0.65);
  evaWalkway.receiveShadow = true;
  apartment.add(evaWalkway);

  // White Tape Start-Line, 160.0mm Finish Line & 4 Glowing Footprint Step Pads on EVA Mat!
  props.trackMarks.position.set(0.10, 0.038, 0.26);
  apartment.add(props.trackMarks);

  // 1.0m Endurance Track Distance Ticks (20cm / 40cm / 64cm thermal wall!)
  const endurGroup = new THREE.Group();
  endurGroup.position.set(0.10, 0.039, 0.26);
  endurGroup.visible = false;
  for (let cm = 20; cm <= 100; cm += 20) {
    const tick = new THREE.Mesh(
      new THREE.PlaneGeometry(0.52, 0.007),
      new THREE.MeshBasicMaterial({ color: cm === 60 ? 0xf87171 : 0x94a3b8, transparent: true, opacity: 0.72 })
    );
    tick.rotation.x = -Math.PI / 2;
    tick.position.set(0, 0, cm * 0.01);
    endurGroup.add(tick);
  }
  apartment.add(endurGroup);

  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.6), baseMats.wallPaper);
  backWall.position.set(0, 1.3, -1.95);
  apartment.add(backWall);

  // Window Shader: 0 = Obon Bright Haze, 1 = 03:12 AM Deep Midnight, 2 = Sept 2 Crisp Autumn Breeze!
  const winMat = new THREE.ShaderMaterial({
    uniforms: { uMode: { value: 0 }, uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uMode;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec3 obon = mix(vec3(0.88, 0.94, 1.0), vec3(0.42, 0.72, 0.96), vUv.y);
        vec3 night = mix(vec3(0.02, 0.04, 0.11), vec3(0.05, 0.10, 0.22), vUv.y);
        vec3 sept = mix(vec3(0.95, 0.84, 0.68), vec3(0.36, 0.66, 0.92), vUv.y);
        vec3 col = uMode < 1.0 ? mix(obon, night, uMode) : mix(night, sept, uMode - 1.0);
        gl_FragColor = vec4(col, 1.0);
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
  laptop.position.set(-0.36, 0.726, -0.10);
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

  // Smartphone resting upright on desk for Obon Mom LINE (Cut 1A)
  const deskPhone = new THREE.Group();
  const dpBody = new THREE.Mesh(new THREE.BoxGeometry(0.078, 0.158, 0.008), baseMats.darkAnodized);
  const dpScr = new THREE.Mesh(new THREE.PlaneGeometry(0.072, 0.148), screens.phoneMat);
  dpScr.position.z = 0.0046;
  deskPhone.add(dpBody, dpScr);
  deskPhone.position.set(-0.14, 0.798, 0.05);
  deskPhone.rotation.set(-0.22, 0.24, 0);
  deskPhone.visible = false;
  deskGroup.add(deskPhone);

  // 65°C Filament Dryer + 0.4mm Hardened Steel Magnetic Nozzle on Desk (Cut 1A)
  props.dryerGroup.position.set(0.14, 0.720, -0.02);
  props.dryerGroup.rotation.y = -0.22;
  props.dryerGroup.visible = false;
  props.nozzleGroup.position.set(0.01, 0.742, 0.11);
  props.nozzleGroup.rotation.set(0.28, 0.35, -0.15);
  props.nozzleGroup.visible = false;
  deskGroup.add(props.dryerGroup, props.nozzleGroup);

  // Ergonomic Angled-Bezel Kitchen Digital Scale showing Emerald "1762 g (-180g PASS!)"
  const scaleGroup = new THREE.Group();
  scaleGroup.position.set(0.08, 0.720, 0.05);
  scaleGroup.visible = false;
  const scBody = new THREE.Mesh(new THREE.BoxGeometry(0.172, 0.022, 0.215), baseMats.bambuWhite);
  scBody.position.y = 0.011;
  scBody.castShadow = true;
  scBody.receiveShadow = true;
  const scPan = new THREE.Mesh(new THREE.BoxGeometry(0.148, 0.004, 0.148), baseMats.brushedAlu);
  scPan.position.set(0, 0.024, -0.025);
  scPan.receiveShadow = true;
  const scBezel = new THREE.Mesh(new THREE.BoxGeometry(0.142, 0.044, 0.012), baseMats.bambuWhite);
  scBezel.position.set(0, 0.026, 0.098);
  scBezel.rotation.x = -0.68;
  const scLcd = new THREE.Mesh(new THREE.PlaneGeometry(0.128, 0.048), screens.scaleLcdMat);
  scLcd.position.set(0, 0.030, 0.103);
  scLcd.rotation.x = -0.68;
  scaleGroup.add(scBody, scPan, scBezel, scLcd);
  deskGroup.add(scaleGroup);

  // Open Humanoid Robot Textbook Ch.4 ("ZMPと線形倒立振子モデル") + Glowing 3D LIPM Hologram!
  const textbook = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.014, 0.23), screens.textbookMat);
  textbook.position.set(0.12, 0.727, 0.05);
  textbook.rotation.y = -0.08;
  textbook.receiveShadow = true;
  textbook.visible = false;
  deskGroup.add(textbook);

  props.zmpHolo.position.set(0.14, 0.745, 0.04);
  props.zmpHolo.visible = false;
  deskGroup.add(props.zmpHolo);

  // HERO ATHLETE `HMD-01 Rev 1.5` (PETG-CF, 1,762g, 380.0mm)
  const heroRev15 = createHMD01Rev15Athlete(baseMats, ngMats, petgCfMat);
  heroRev15.root.position.set(0.08, 0.720, -0.50);
  apartment.add(heroRev15.root);

  // Floor Telemetry Laptop + Glowing Cycloid Guide Ribbon + Poke Hand + Blue Nitrile Hands!
  const floorLaptop = laptop.clone();
  floorLaptop.position.set(-0.36, 0.044, 0.28);
  floorLaptop.rotation.y = 0.55;
  floorLaptop.visible = false;
  apartment.add(floorLaptop);

  props.cycloidArc.position.set(0.10, 0.038, 0.26);
  props.cycloidArc.visible = false;
  apartment.add(props.cycloidArc);

  const pokeHand = createNextGenHandRig(baseMats, ngMats, 1);
  pokeHand.group.visible = false;
  apartment.add(pokeHand.group);

  props.blueHandLeft.group.visible = false;
  props.blueHandRight.group.visible = false;
  apartment.add(props.blueHandLeft.group, props.blueHandRight.group);

  return {
    apartment,
    winMat,
    deskGroup,
    laptop,
    floorLaptop,
    deskPhone,
    scaleGroup,
    textbook,
    endurGroup,
    heroRev15,
    pokeHand,
    props,
  };
}
