import * as THREE from 'three';

/**
 * Chapter 13 Ultra-Quality Hero Props & Physical Rigs (`第13章：オシロスコープの幽霊`):
 * 1. Illuminated Desktop Magnifier Lamp + Soldering Iron w/ Rosin Smoke + 12-Slot Plastic Organizer Box
 * 2. Vintage Yellowed Akihabara Benchtop Oscilloscope (`整備済 ¥24,800`) w/ Live Animated 768x448 Blue-Grid CRT
 *    (clean_single / ghost_spikes EMI storm / clean_12ch razor square waves) + Sharp Needle Measurement Probe
 * 3. All 12 Circular Artificial Muscles (`12基の丸い人工筋肉`) w/ Silver Levers, Loose Parallel Wires vs
 *    True 3D Red/White Double-Helix Twisted Pair (`二重螺旋`), 120Ω Termination Resistor, Ferrite Core &
 *    Bidirectional Glowing Haptic Nerve Pulses!
 * 4. Extreme-Macro Double-Helix Twisting Jig & Sanwa Multimeter (`24.00 V`)
 */

export function createMagnifierAndOrganizerRig(baseMats) {
  const group = new THREE.Group();

  // Illuminated Desktop Magnifier Ring Lamp ("机の上の拡大鏡")
  const magGroup = new THREE.Group();
  magGroup.position.set(-0.08, 0.0, 0.04);
  const armBase = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.042, 0.016, 20), baseMats.blackAnodized);
  armBase.position.set(-0.22, 0.008, -0.14);
  const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.22, 0.014), baseMats.aluminumBrushed);
  arm1.position.set(-0.18, 0.11, -0.11);
  arm1.rotation.z = -0.35;
  const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.012, 0.014), baseMats.aluminumBrushed);
  arm2.position.set(-0.07, 0.20, -0.05);
  arm2.rotation.y = -0.35;

  const ringHousing = new THREE.Mesh(
    new THREE.TorusGeometry(0.068, 0.010, 12, 32),
    new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35 })
  );
  ringHousing.rotation.x = Math.PI / 2;
  ringHousing.position.set(0.0, 0.165, 0.0);

  const ledRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.060, 0.004, 8, 32),
    new THREE.MeshBasicMaterial({ color: 0xf8fafc })
  );
  ledRing.rotation.x = Math.PI / 2;
  ledRing.position.set(0.0, 0.158, 0.0);

  const lensGlass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.056, 0.056, 0.005, 32),
    new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.24,
      roughness: 0.05,
      transmission: 0.72,
    })
  );
  lensGlass.position.set(0.0, 0.165, 0.0);
  magGroup.add(armBase, arm1, arm2, ringHousing, ledRing, lensGlass);
  group.add(magGroup);

  // Hero Circular Green PCB under the Magnifier + Soldering Iron Tip & Sweet Rising Rosin Smoke!
  const workPcb = new THREE.Mesh(
    new THREE.CylinderGeometry(0.024, 0.024, 0.0024, 32),
    new THREE.MeshStandardMaterial({ color: 0x0c5c34, roughness: 0.34, metalness: 0.14 })
  );
  workPcb.position.set(-0.08, 0.005, 0.04);
  const goldRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.017, 0.0009, 8, 28),
    new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.9, roughness: 0.22 })
  );
  goldRing.rotation.x = Math.PI / 2;
  goldRing.position.set(-0.08, 0.007, 0.04);
  group.add(workPcb, goldRing);

  // Soldering Iron angled gracefully toward the PCB pad
  const ironGroup = new THREE.Group();
  ironGroup.position.set(-0.072, 0.012, 0.044);
  ironGroup.rotation.set(0.18, 0.22, -0.78);
  const ironTip = new THREE.Mesh(new THREE.ConeGeometry(0.0028, 0.022, 10), baseMats.chromeSteel);
  ironTip.position.y = 0.011;
  ironTip.rotation.x = Math.PI;
  const ironBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.0042, 0.0042, 0.075, 12), baseMats.chromeSteel);
  ironBarrel.position.y = 0.058;
  const ironHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.011, 0.009, 0.11, 14),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.55 })
  );
  ironHandle.position.y = 0.145;
  ironGroup.add(ironTip, ironBarrel, ironHandle);
  group.add(ironGroup);

  // Sweet Rising Rosin Smoke Wisps ("松脂の甘い煙がひとすじ立ち昇る")
  const rosinWisps = [];
  for (let i = 0; i < 8; i++) {
    const sm = new THREE.MeshBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.0, depthWrite: false });
    const sp = new THREE.Mesh(new THREE.SphereGeometry(0.008, 10, 8), sm);
    group.add(sp);
    rosinWisps.push({ mesh: sp, mat: sm, idx: i });
  }

  // Steaming White Mug of Cooled Plain Hot Water ("冷めた白湯")
  const mugGroup = new THREE.Group();
  mugGroup.position.set(-0.34, 0.0, 0.12);
  const mugBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.036, 0.033, 0.082, 20),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 })
  );
  mugBody.position.y = 0.041;
  const mugHandle = new THREE.Mesh(new THREE.TorusGeometry(0.020, 0.005, 8, 16, Math.PI), mugBody.material);
  mugHandle.rotation.z = -Math.PI / 2;
  mugHandle.position.set(0.036, 0.044, 0);
  mugGroup.add(mugBody, mugHandle);
  group.add(mugGroup);

  // 12-Slot Plastic Compartment Organizer Box ("プラスチックの仕切り箱" — 5 -> 8 -> 10 -> 12 finished muscles!)
  const boxGroup = new THREE.Group();
  boxGroup.position.set(0.24, 0.0, 0.02);
  boxGroup.rotation.y = -0.14;
  const trayMat = new THREE.MeshPhysicalMaterial({
    color: 0xe2e8f0,
    transparent: true,
    opacity: 0.45,
    roughness: 0.22,
  });
  const trayBase = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.006, 0.28), trayMat);
  trayBase.position.y = 0.003;
  boxGroup.add(trayBase);
  // Outer walls & 4x3 divider ribs
  const wallF = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.036, 0.006), trayMat);
  wallF.position.set(0, 0.018, 0.137);
  const wallB = wallF.clone(); wallB.position.z = -0.137;
  const wallL = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.036, 0.28), trayMat);
  wallL.position.set(-0.187, 0.018, 0);
  const wallR = wallL.clone(); wallR.position.x = 0.187;
  boxGroup.add(wallF, wallB, wallL, wallR);
  for (let c = 1; c <= 3; c++) {
    const div = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.030, 0.27), trayMat);
    div.position.set(-0.187 + c * (0.374 / 4), 0.016, 0);
    boxGroup.add(div);
  }
  for (let r = 1; r <= 2; r++) {
    const div = new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.030, 0.004), trayMat);
    div.position.set(0, 0.016, -0.137 + r * (0.274 / 3));
    boxGroup.add(div);
  }

  // 12 Gleaming Black & Copper Circular Muscles nestled neatly inside the 4x3 compartments!
  const blackBellMat = new THREE.MeshStandardMaterial({ color: 0x14171d, metalness: 0.85, roughness: 0.26 });
  const copperMat = new THREE.MeshStandardMaterial({ color: 0xd96b27, metalness: 0.90, roughness: 0.24 });
  const pcbGreenMat = new THREE.MeshStandardMaterial({ color: 0x0f7640, roughness: 0.36 });
  const boxMuscles = [];
  for (let i = 0; i < 12; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const cellX = -0.140 + col * 0.0935;
    const cellZ = -0.091 + row * 0.091;
    const m = new THREE.Group();
    m.position.set(cellX, 0.018, cellZ);
    const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.022, 24), blackBellMat);
    const cop = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.0045, 6, 20), copperMat);
    cop.rotation.x = Math.PI / 2; cop.position.y = 0.007;
    const pcb = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.021, 0.003, 20), pcbGreenMat);
    pcb.position.y = 0.012;
    m.add(bell, cop, pcb);
    boxGroup.add(m);
    boxMuscles.push(m);
  }
  group.add(boxGroup);

  function update(t, completedCount = 12) {
    for (let i = 0; i < 12; i++) {
      boxMuscles[i].visible = i < completedCount;
    }
    ironGroup.position.set(-0.072 + Math.sin(t * 2.2) * 0.006, 0.012 + Math.abs(Math.sin(t * 3.1)) * 0.004, 0.044);
    for (const w of rosinWisps) {
      const c = (t * 0.65 + w.idx / 8) % 1.0;
      w.mesh.position.set(-0.072 + Math.sin(t * 3 + w.idx) * 0.012, 0.012 + c * 0.14, 0.044 + Math.cos(t * 2 + w.idx) * 0.008);
      w.mesh.scale.setScalar(0.5 + c * 1.9);
      w.mat.opacity = Math.sin(c * Math.PI) * 0.28;
    }
  }

  return { group, update };
}

export function createVintageOscilloscopeRig(baseMats) {
  const group = new THREE.Group();

  // Yellowed, Corner-Scuffed Vintage Benchtop Oscilloscope ("外装が黄色く日焼けして角に擦り傷のある中古オシロスコープ")
  const beigeChassisMat = new THREE.MeshStandardMaterial({ color: 0xd6cbb1, roughness: 0.68, metalness: 0.14 });
  const frontBezelMat = new THREE.MeshStandardMaterial({ color: 0xc9bea4, roughness: 0.58, metalness: 0.18 });
  const darkRecessMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.55 });

  const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.19, 0.28), beigeChassisMat);
  chassis.position.y = 0.095;
  chassis.castShadow = true;
  chassis.receiveShadow = true;

  const frontPlate = new THREE.Mesh(new THREE.BoxGeometry(0.345, 0.175, 0.012), frontBezelMat);
  frontPlate.position.set(0, 0.095, 0.142);

  // Carry handle folded on top
  const handleBar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.012, 0.018), baseMats.blackAnodized);
  handleBar.position.set(0, 0.205, 0.02);

  // CRT Bezel Frame on Left Half
  const screenRecess = new THREE.Mesh(new THREE.BoxGeometry(0.185, 0.132, 0.010), darkRecessMat);
  screenRecess.position.set(-0.068, 0.102, 0.148);

  // High-Resolution 768x448 Animated Blue-Grid Oscilloscope Display!
  const oscC = document.createElement('canvas');
  oscC.width = 768; oscC.height = 448;
  const ox = oscC.getContext('2d');
  const oscTex = new THREE.CanvasTexture(oscC);
  oscTex.colorSpace = THREE.SRGBColorSpace;
  const screenMat = new THREE.MeshBasicMaterial({ map: oscTex });
  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.172, 0.118), screenMat);
  screenMesh.position.set(-0.068, 0.102, 0.154);

  // Rotary Knobs, BNC Jacks & Power LED on Right Control Panel
  const knobMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45 });
  const knobCapMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.35 });
  const knobCoords = [
    [0.068, 0.138, 0.015], [0.124, 0.138, 0.015],
    [0.068, 0.092, 0.012], [0.124, 0.092, 0.012],
    [0.068, 0.052, 0.009], [0.124, 0.052, 0.009],
  ];
  for (const [kx, ky, kr] of knobCoords) {
    const kn = new THREE.Mesh(new THREE.CylinderGeometry(kr, kr * 1.08, 0.018, 16), knobMat);
    kn.rotation.x = Math.PI / 2;
    kn.position.set(kx, ky, 0.154);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(kr * 0.65, kr * 0.65, 0.004, 14), knobCapMat);
    cap.rotation.x = Math.PI / 2;
    cap.position.set(kx, ky, 0.164);
    group.add(kn, cap);
  }
  // 2 Metallic BNC Input Connectors
  for (const bx of [0.068, 0.116]) {
    const bnc = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.018, 12), baseMats.chromeSteel);
    bnc.rotation.x = Math.PI / 2;
    bnc.position.set(bx, 0.024, 0.154);
    group.add(bnc);
  }

  // Handwritten Yellow Akihabara Shop Price Tag ("整備済 ¥24,800") — removable!
  const tagC = document.createElement('canvas');
  tagC.width = 256; tagC.height = 140;
  const tx = tagC.getContext('2d');
  tx.fillStyle = '#fef08a'; tx.fillRect(0, 0, 256, 140);
  tx.strokeStyle = '#dc2626'; tx.lineWidth = 8; tx.strokeRect(4, 4, 248, 132);
  tx.fillStyle = '#b91c1c'; tx.font = '900 30px sans-serif'; tx.fillText('整備済・動作OK', 18, 48);
  tx.fillStyle = '#0f172a'; tx.font = '900 48px monospace'; tx.fillText('¥24,800', 18, 112);
  const tagTex = new THREE.CanvasTexture(tagC); tagTex.colorSpace = THREE.SRGBColorSpace;
  const priceTag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.115, 0.062),
    new THREE.MeshStandardMaterial({ map: tagTex, roughness: 0.85 })
  );
  priceTag.position.set(-0.068, 0.106, 0.158);
  priceTag.rotation.z = -0.05;
  priceTag.visible = false;

  // Sharp Needle Measurement Probe ("細い針のような測定プローブ")
  const probeGroup = new THREE.Group();
  const probeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.0055, 0.007, 0.11, 12), baseMats.blackAnodized);
  probeBody.rotation.z = Math.PI / 2;
  probeBody.position.x = 0.055;
  const probeNeedle = new THREE.Mesh(new THREE.ConeGeometry(0.0018, 0.022, 8), baseMats.chromeSteel);
  probeNeedle.rotation.z = Math.PI / 2;
  probeNeedle.position.x = -0.011;
  probeGroup.add(probeBody, probeNeedle);
  probeGroup.visible = false;

  group.add(chassis, frontPlate, handleBar, screenRecess, screenMesh, priceTag);

  function drawScope(t, mode = 'clean_single') {
    if (mode === 'off') {
      ox.fillStyle = '#071018'; ox.fillRect(0, 0, 768, 448);
      ox.strokeStyle = '#153042'; ox.lineWidth = 2;
      for (let gx = 0; gx <= 10; gx++) { ox.beginPath(); ox.moveTo(gx * 76.8, 0); ox.lineTo(gx * 76.8, 448); ox.stroke(); }
      for (let gy = 0; gy <= 8; gy++) { ox.beginPath(); ox.moveTo(0, gy * 56); ox.lineTo(768, gy * 56); ox.stroke(); }
      oscTex.needsUpdate = true;
      return;
    }

    // Glowing dark-blue CRT graticule background ("青い格子模様の画面")
    ox.fillStyle = '#041224'; ox.fillRect(0, 0, 768, 448);
    ox.strokeStyle = 'rgba(56, 189, 248, 0.30)'; ox.lineWidth = 1.5;
    for (let gx = 0; gx <= 10; gx++) { ox.beginPath(); ox.moveTo(gx * 76.8, 0); ox.lineTo(gx * 76.8, 448); ox.stroke(); }
    for (let gy = 0; gy <= 8; gy++) { ox.beginPath(); ox.moveTo(0, gy * 56); ox.lineTo(768, gy * 56); ox.stroke(); }
    // Center crosshair
    ox.strokeStyle = 'rgba(125, 211, 252, 0.55)'; ox.lineWidth = 2;
    ox.beginPath(); ox.moveTo(0, 224); ox.lineTo(768, 224); ox.moveTo(384, 0); ox.lineTo(384, 448); ox.stroke();

    // Header telemetry bar
    ox.fillStyle = 'rgba(15, 23, 42, 0.78)'; ox.fillRect(0, 0, 768, 40);
    ox.font = '800 20px monospace';
    if (mode === 'ghost_spikes') {
      ox.fillStyle = '#f87171';
      ox.fillText('CH1: CAN-BUS (6x PARALLEL)  |  SEVERE EMI SPIKES & RINGING!!', 16, 27);
    } else if (mode === 'clean_12ch') {
      ox.fillStyle = '#34d399';
      ox.fillText('CH1: TWISTED PAIR + 120Ω TERM (12 JOINTS)  |  NOISE: 0.0mV CLEAN!', 16, 27);
    } else {
      ox.fillStyle = '#fde047';
      ox.fillText('CH1: 1.0V/div   CH2: 2.0V/div   TIME: 2.0us/div   [LAB DEMO]', 16, 27);
    }

    const phase = t * 5.0;

    if (mode === 'lab_demo') {
      // Vivid glowing green sine wave + crisp yellow square wave (Engineering Lab!)
      ox.strokeStyle = '#4ade80'; ox.lineWidth = 4; ox.shadowColor = '#22c55e'; ox.shadowBlur = 10;
      ox.beginPath();
      for (let x = 0; x <= 768; x += 4) {
        const y = 152 + Math.sin(x * 0.035 + phase) * 62;
        if (x === 0) ox.moveTo(x, y); else ox.lineTo(x, y);
      }
      ox.stroke();

      ox.strokeStyle = '#fde047'; ox.lineWidth = 4; ox.shadowColor = '#facc15'; ox.shadowBlur = 10;
      ox.beginPath();
      for (let x = 0; x <= 768; x += 4) {
        const sq = Math.sin(x * 0.028 - phase * 0.7) >= 0 ? -52 : 52;
        const y = 318 + sq;
        if (x === 0) ox.moveTo(x, y); else ox.lineTo(x, y);
      }
      ox.stroke();
      ox.shadowBlur = 0;
    } else if (mode === 'ghost_spikes') {
      // VIOLENT JAGGED GLASS-SHARD SPIKES + RINGING ECHOES crushing the square CAN bus pulses!
      ox.strokeStyle = '#38bdf8'; ox.lineWidth = 3.5; ox.shadowColor = '#0ea5e9'; ox.shadowBlur = 12;
      ox.beginPath();
      for (let x = 0; x <= 768; x += 2) {
        const bit = Math.floor(((x + phase * 36) / 96)) % 2;
        const local = ((x + phase * 36) % 96) / 96;
        const baseY = bit === 0 ? 150 : 300;
        // Reflection ringing right after every rising/falling edge!
        const ring = Math.exp(-local * 6.5) * Math.sin(local * 38.0) * 68;
        // Violent sharp needle spikes ("ガラスの破片か針山のような激しい光のトゲ")!
        const h = Math.sin(x * 1.7 + t * 42) * Math.cos(x * 0.93 - t * 31);
        const spike = Math.abs(h) > 0.72 ? Math.sign(h) * (95 + Math.abs(Math.sin(x * 3.1)) * 55) : h * 26;
        const y = Math.max(46, Math.min(436, baseY + ring + spike));
        if (x === 0) ox.moveTo(x, y); else ox.lineTo(x, y);
      }
      ox.stroke();

      // Secondary red/amber spike flashes highlighting the EMI ghost bursts!
      ox.strokeStyle = 'rgba(248, 113, 113, 0.85)'; ox.lineWidth = 2.5; ox.shadowColor = '#ef4444'; ox.shadowBlur = 10;
      for (let s = 0; s < 14; s++) {
        const sx = ((s * 59 + Math.floor(t * 90)) % 730) + 18;
        const sy0 = 224 + Math.sin(s * 2.1 + t * 18) * 30;
        const sh = (s % 2 === 0 ? -1 : 1) * (88 + (s % 3) * 32);
        ox.beginPath(); ox.moveTo(sx, sy0); ox.lineTo(sx + 2, sy0 + sh); ox.lineTo(sx + 5, sy0); ox.stroke();
      }
      ox.shadowBlur = 0;
    } else {
      // RAZOR-SHARP, GLASS-SMOOTH SQUARE WAVES ("刃物で切り出したように澄み切った四角い光の波")!
      ox.strokeStyle = '#34d399'; ox.lineWidth = 4.5; ox.shadowColor = '#10b981'; ox.shadowBlur = 12;
      ox.beginPath();
      const pattern = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1];
      let prevY = 160;
      for (let x = 0; x <= 768; x += 3) {
        const idx = Math.floor(((x + phase * 30) / 64)) % pattern.length;
        const y = pattern[idx] ? 132 : 268;
        if (x === 0) { ox.moveTo(x, y); }
        else {
          if (y !== prevY) ox.lineTo(x, prevY);
          ox.lineTo(x, y);
        }
        prevY = y;
      }
      ox.stroke();

      // Lower complementary differential CAN-L trace in crisp sky-blue!
      ox.strokeStyle = '#38bdf8'; ox.lineWidth = 3.5; ox.shadowColor = '#0ea5e9'; ox.shadowBlur = 8;
      ox.beginPath();
      prevY = 360;
      for (let x = 0; x <= 768; x += 3) {
        const idx = Math.floor(((x + phase * 30) / 64)) % pattern.length;
        const y = pattern[idx] ? 386 : 302;
        if (x === 0) { ox.moveTo(x, y); }
        else {
          if (y !== prevY) ox.lineTo(x, prevY);
          ox.lineTo(x, y);
        }
        prevY = y;
      }
      ox.stroke();
      ox.shadowBlur = 0;
    }

    oscTex.needsUpdate = true;
  }

  drawScope(0, 'clean_12ch');

  return { group, priceTag, probeGroup, drawScope };
}

export function createTwelveMuscleBusRig(baseMats) {
  const group = new THREE.Group();

  const blackBellMat = new THREE.MeshStandardMaterial({ color: 0x14171d, metalness: 0.85, roughness: 0.25 });
  const copperMat = new THREE.MeshStandardMaterial({ color: 0xd96b27, metalness: 0.90, roughness: 0.24 });
  const pcbGreenMat = new THREE.MeshStandardMaterial({ color: 0x0e6e3c, roughness: 0.35, metalness: 0.14 });
  const mountBaseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });

  const joints = [];
  // 12 Circular Artificial Muscles spanning x = -0.55m .. +0.55m (1.10m full bench span!)
  for (let i = 0; i < 12; i++) {
    const jGroup = new THREE.Group();
    const xPos = -0.55 + (i / 11) * 1.10;
    jGroup.position.set(xPos, 0.0, 0.0);

    // Compact dark L-bracket stand holding the circular actuator upright
    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.012, 0.064), mountBaseMat);
    stand.position.y = 0.006;
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.056, 0.022), mountBaseMat);
    post.position.set(0, 0.034, -0.018);

    // 80mm-class circular black & copper motor body + 46mm green circular FOC PCB facing +Z!
    const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.020, 28), blackBellMat);
    bell.rotation.x = Math.PI / 2;
    bell.position.set(0, 0.054, 0);
    bell.castShadow = true;

    const copperRing = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.004, 6, 20), copperMat);
    copperRing.position.set(0, 0.054, 0.009);

    const pcb = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.020, 0.003, 20), pcbGreenMat);
    pcb.rotation.x = Math.PI / 2;
    pcb.position.set(0, 0.054, 0.011);

    // Individual status LED (emerald OK / crimson fault!)
    const ledMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      emissive: 0x22c55e,
      emissiveIntensity: 2.8,
      roughness: 0.2,
    });
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.0035, 8, 6), ledMat);
    led.position.set(0, 0.072, 0.013);

    // Silver Aluminum Lever Arm extending upward/forward so every twitch & bilateral mirror angle is UNMISTAKABLE!
    const leverPivot = new THREE.Group();
    leverPivot.position.set(0, 0.054, 0.016);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.008, 16), baseMats.chromeSteel);
    hub.rotation.x = Math.PI / 2;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.088, 0.005), baseMats.aluminumBrushed);
    arm.position.set(0, 0.044, 0.003);
    const tipDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.0055, 10, 8),
      new THREE.MeshStandardMaterial({ color: i === 0 || i === 11 ? 0x38bdf8 : 0xe2e8f0, emissive: i === 0 || i === 11 ? 0x0284c7 : 0x000000, emissiveIntensity: 0.6 })
    );
    tipDot.position.set(0, 0.088, 0.004);
    leverPivot.add(hub, arm, tipDot);

    jGroup.add(stand, post, bell, copperRing, pcb, led, leverPivot);
    group.add(jGroup);
    joints.push({ group: jGroup, leverPivot, ledMat, xPos });
  }

  // WIRE SET A: Loose Parallel Straight Communication Wires (for 6-joint EMI ghost seizure!)
  const looseWiresGroup = new THREE.Group();
  const looseRed = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0020, 0.0020, 0.60, 8),
    new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 })
  );
  looseRed.rotation.z = Math.PI / 2;
  looseRed.position.set(-0.26, 0.016, 0.036);
  const looseWhite = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0020, 0.0020, 0.60, 8),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 })
  );
  looseWhite.rotation.z = Math.PI / 2;
  looseWhite.position.set(-0.26, 0.016, 0.048);
  looseWiresGroup.add(looseRed, looseWhite);

  // Translucent Red EMI Noise Arcs spraying off the loose parallel bus during seizure!
  const emiArcs = [];
  for (let i = 0; i < 6; i++) {
    const am = new THREE.MeshBasicMaterial({ color: 0xf87171, transparent: true, opacity: 0.0, side: THREE.DoubleSide, depthWrite: false });
    const arc = new THREE.Mesh(new THREE.RingGeometry(0.016, 0.022, 18), am);
    arc.position.set(-0.50 + i * 0.10, 0.024, 0.042);
    arc.rotation.x = -Math.PI / 2;
    looseWiresGroup.add(arc);
    emiArcs.push({ mesh: arc, mat: am });
  }
  group.add(looseWiresGroup);

  // WIRE SET B: True 3D Red & White DOUBLE-HELIX TWISTED PAIR ("美しく縒り合わされた二重螺旋") + 120Ω Termination + Ferrite Core!
  const twistedGroup = new THREE.Group();
  const helixPtsR = [];
  const helixPtsW = [];
  const steps = 160;
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const x = -0.58 + u * 1.16;
    const ang = u * Math.PI * 36;
    const rad = 0.0042;
    helixPtsR.push(new THREE.Vector3(x, 0.018 + Math.sin(ang) * rad, 0.044 + Math.cos(ang) * rad));
    helixPtsW.push(new THREE.Vector3(x, 0.018 - Math.sin(ang) * rad, 0.044 - Math.cos(ang) * rad));
  }
  const twistR = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(helixPtsR), 180, 0.0020, 6, false),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.42 })
  );
  const twistW = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(helixPtsW), 180, 0.0020, 6, false),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.42 })
  );
  twistedGroup.add(twistR, twistW);

  // 120Ω Termination Resistor at the far-right dead-end (`x = +0.585`)!
  const termRes = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0048, 0.0048, 0.018, 12),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.35 })
  );
  termRes.rotation.z = Math.PI / 2;
  termRes.position.set(0.585, 0.018, 0.044);
  twistedGroup.add(termRes);

  // Black Toroidal Ferrite Core ("黒い磁石の輪・フェライトコア") clamped on the left 24V power trunk!
  const ferriteCore = new THREE.Mesh(
    new THREE.TorusGeometry(0.016, 0.007, 12, 24),
    new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.72, metalness: 0.25 })
  );
  ferriteCore.rotation.y = Math.PI / 2;
  ferriteCore.position.set(-0.59, 0.022, 0.044);
  twistedGroup.add(ferriteCore);

  // Bidirectional Glowing Haptic Nerve Pulses (Emerald = forward 1->12, Golden = force-feedback 12->1!)
  const pulseFwdMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.0 });
  const pulseFwd = new THREE.Mesh(new THREE.SphereGeometry(0.011, 12, 10), pulseFwdMat);
  const pulseBackMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.0 });
  const pulseBack = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 10), pulseBackMat);
  twistedGroup.add(pulseFwd, pulseBack);

  twistedGroup.visible = false;
  group.add(twistedGroup);

  function setMode(mode) {
    const showAll = mode === 'twisted_12';
    for (let i = 0; i < 12; i++) {
      joints[i].group.visible = showAll || i < 6;
    }
    looseWiresGroup.visible = !showAll;
    twistedGroup.visible = showAll;
  }

  function setJointAngles(angleArr, faultIndices = []) {
    const fSet = new Set(faultIndices);
    for (let i = 0; i < 12; i++) {
      joints[i].leverPivot.rotation.z = angleArr[i] || 0;
      const isFault = fSet.has(i);
      joints[i].ledMat.color.setHex(isFault ? 0xef4444 : 0x4ade80);
      joints[i].ledMat.emissive.setHex(isFault ? 0xdc2626 : 0x22c55e);
      joints[i].ledMat.emissiveIntensity = isFault ? 4.2 : 2.4;
    }
  }

  function updateEmiArcs(t, intensity = 0.0) {
    for (let i = 0; i < emiArcs.length; i++) {
      const p = 0.4 + 0.6 * Math.abs(Math.sin(t * 22 + i * 1.4));
      emiArcs[i].mat.opacity = intensity * p;
      emiArcs[i].mesh.scale.setScalar(0.8 + p * 0.9);
    }
  }

  function updateHapticPulses(t, fwdActive = false, backActive = false) {
    pulseFwdMat.opacity = fwdActive ? 0.92 : 0.0;
    if (fwdActive) {
      const u = (t * 1.45) % 1.0;
      pulseFwd.position.set(-0.55 + u * 1.10, 0.022, 0.044);
    }
    pulseBackMat.opacity = backActive ? 0.95 : 0.0;
    if (backActive) {
      const u = (t * 1.65) % 1.0;
      pulseBack.position.set(0.55 - u * 1.10, 0.026, 0.044);
    }
  }

  return { group, joints, setMode, setJointAngles, updateEmiArcs, updateHapticPulses };
}

export function createDoubleHelixMacroRig(baseMats) {
  const group = new THREE.Group();

  // Extreme-Macro Red & White Tight Double Helix ("赤と白の細い電線をきつく、美しい二重螺旋に縒り合わせる")
  const ptsR = [];
  const ptsW = [];
  for (let i = 0; i <= 120; i++) {
    const u = i / 120;
    const x = -0.18 + u * 0.36;
    const ang = u * Math.PI * 18;
    const r = 0.0085;
    ptsR.push(new THREE.Vector3(x, Math.sin(ang) * r, Math.cos(ang) * r));
    ptsW.push(new THREE.Vector3(x, -Math.sin(ang) * r, -Math.cos(ang) * r));
  }
  const helixR = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsR), 140, 0.0044, 10, false),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.36 })
  );
  const helixW = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsW), 140, 0.0044, 10, false),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.36 })
  );
  const helixPivot = new THREE.Group();
  helixPivot.position.set(0, 0.055, 0);
  helixPivot.add(helixR, helixW);

  // Magnified 120Ω Metal-Film Termination Resistor (Blue body + Brown-Red-Brown-Gold bands!)
  const resGroup = new THREE.Group();
  resGroup.position.set(0.205, 0.055, 0.0);
  const resBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.011, 0.011, 0.034, 18),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.32 })
  );
  resBody.rotation.z = Math.PI / 2;
  const bandColors = [0x78350f, 0xdc2626, 0x78350f, 0xeab308]; // 1-2-0-5% = 120Ω!
  for (let b = 0; b < 4; b++) {
    const band = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0114, 0.0114, 0.0032, 18),
      new THREE.MeshStandardMaterial({ color: bandColors[b], roughness: 0.3 })
    );
    band.rotation.z = Math.PI / 2;
    band.position.x = -0.010 + b * 0.0068;
    resGroup.add(band);
  }
  resGroup.add(resBody);

  // Magnified Black Toroidal Ferrite Core Ring ("黒い磁石の輪・フェライトコア") clamped on left!
  const ferrite = new THREE.Mesh(
    new THREE.TorusGeometry(0.028, 0.011, 14, 28),
    new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.65, metalness: 0.25 })
  );
  ferrite.rotation.y = Math.PI / 2;
  ferrite.position.set(-0.185, 0.055, 0);

  group.add(helixPivot, resGroup, ferrite);

  function animateTwist(t) {
    helixPivot.rotation.x = t * 2.2;
  }

  return { group, animateTwist };
}

export function createSanwaMultimeterRig() {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.095, 0.028, 0.145),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.55 })
  );
  body.position.y = 0.014;
  const lcdC = document.createElement('canvas');
  lcdC.width = 256; lcdC.height = 128;
  const x = lcdC.getContext('2d');
  x.fillStyle = '#9ca88f'; x.fillRect(0, 0, 256, 128);
  x.fillStyle = '#111827'; x.font = '900 58px monospace'; x.fillText('24.00V', 20, 82);
  x.font = '700 20px monospace'; x.fillText('DC AUTO  SANWA', 20, 114);
  const lcdTex = new THREE.CanvasTexture(lcdC); lcdTex.colorSpace = THREE.SRGBColorSpace;
  const lcd = new THREE.Mesh(new THREE.PlaneGeometry(0.076, 0.038), new THREE.MeshBasicMaterial({ map: lcdTex }));
  lcd.rotation.x = -Math.PI / 2;
  lcd.position.set(0, 0.029, -0.038);
  const dial = new THREE.Mesh(
    new THREE.CylinderGeometry(0.024, 0.026, 0.008, 20),
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45 })
  );
  dial.position.set(0, 0.031, 0.018);
  group.add(body, lcd, dial);
  return { group };
}
