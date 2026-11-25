import * as THREE from 'three';

/**
 * Chapter 16 Ultra-Quality Hero Props & Mechanical Diagnostic Rigs
 * (`第16章：夢と現実の断崖 —— Sim-to-Realの洗礼`):
 * 1. `createXt90sAndJetsonChestRig`: Macro yellow `XT90-S` connector w/ green anti-spark band,
 *    `6S 25.2V 360g` LiPo pack, palm-sized `Jetson Orin Nano` (¥49,800) heatsink + spinning fan,
 *    and hanging `7.62 kg` digital crane scale!
 * 2. `createGougedEvaMatAndEstopRig`: Double-stacked 20mm black EVA shock mat w/ gouge scar + flying torn
 *    rubber debris chunks, plus giant desk-mounted crimson mushroom Emergency Stop button (`非常停止ボタン`)!
 * 3. `createSingleLegViseDiagnosticRig`: Cast-iron vise clamping isolated HMD-02 left leg + cutaway `8:1`
 *    sticky-grease planetary gear stiction visualizer + resonant carbon-bone vibration ripple rings!
 */

export function createXt90sAndJetsonChestRig(baseMats, carbonMat) {
  const group = new THREE.Group();

  // --- A. MACRO ANTI-SPARK `XT90-S` YELLOW CONNECTOR + GREEN BAND (`緑色の帯`) ---
  const xtGroup = new THREE.Group();
  const yellowMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.34, metalness: 0.08 });
  const greenBandMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 0.55,
    roughness: 0.28,
  });
  const redCableMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.55 });
  const blkCableMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.62 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.94, roughness: 0.16 });

  // Fixed Female Socket (Robot Power Rail Side — Right)
  const femaleSide = new THREE.Group();
  femaleSide.position.set(0.065, 0, 0);
  const femBody = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.032, 0.058), yellowMat);
  const femCollar = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.035, 0.062), yellowMat);
  femCollar.position.x = -0.024;
  // Thick 10AWG Silicone Cables leading right toward 12-muscle power bus
  for (const [cz, mat] of [[-0.015, redCableMat], [0.015, blkCableMat]]) {
    const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.0085, 0.0085, 0.16, 12), mat);
    wire.rotation.z = Math.PI / 2;
    wire.position.set(0.105, 0, cz);
    femaleSide.add(wire);
  }
  femaleSide.add(femBody, femCollar);

  // Sliding Male Plug (6S 25.2V LiPo Side — Left) with iconic GREEN Anti-Spark Band!
  const maleSide = new THREE.Group();
  maleSide.position.set(-0.075, 0, 0);
  const maleBody = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.030, 0.054), yellowMat);
  // Iconic Emerald Green Anti-Spark Pre-Charge Band (`先端の緑色の帯`)
  const greenBand = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.031, 0.055), greenBandMat);
  greenBand.position.x = 0.036;
  // Dual Gold 4.5mm Bullet Pins
  for (const cz of [-0.014, 0.014]) {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.0048, 0.0048, 0.024, 12), goldMat);
    pin.rotation.z = Math.PI / 2;
    pin.position.set(0.052, 0, cz);
    maleSide.add(pin);
  }
  // 10AWG Battery Silicone Leads going left
  for (const [cz, mat] of [[-0.015, redCableMat], [0.015, blkCableMat]]) {
    const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.0085, 0.0085, 0.14, 12), mat);
    wire.rotation.z = Math.PI / 2;
    wire.position.set(-0.095, 0, cz);
    maleSide.add(wire);
  }
  maleSide.add(maleBody, greenBand);

  // Subtle Soft Emerald Pre-Charge Glow Ring (No welding spark — gentle pre-charge!)
  const prechargeMat = new THREE.MeshBasicMaterial({
    color: 0x34d399,
    transparent: true,
    opacity: 0.0,
    side: THREE.DoubleSide,
  });
  const prechargeRing = new THREE.Mesh(new THREE.RingGeometry(0.022, 0.036, 24), prechargeMat);
  prechargeRing.rotation.y = Math.PI / 2;
  prechargeRing.position.set(0.02, 0, 0);

  // 6S LiPo 25.2V 360g Battery Pack resting neatly beside the macro XT90-S plug
  const lipoPack = new THREE.Group();
  lipoPack.position.set(-0.21, -0.005, -0.01);
  const lipoWrap = new THREE.Mesh(
    new THREE.BoxGeometry(0.145, 0.044, 0.072),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.35, metalness: 0.15 })
  );
  const lipoLabelC = document.createElement('canvas');
  lipoLabelC.width = 256; lipoLabelC.height = 128;
  const llx = lipoLabelC.getContext('2d');
  llx.fillStyle = '#0f172a'; llx.fillRect(0, 0, 256, 128);
  llx.strokeStyle = '#facc15'; llx.lineWidth = 4; llx.strokeRect(4, 4, 248, 120);
  llx.fillStyle = '#facc15'; llx.font = '900 28px monospace'; llx.fillText('6S LiPo · 25.2V', 14, 44);
  llx.fillStyle = '#f8fafc'; llx.font = '700 22px monospace'; llx.fillText('22.2V NOM / 360g', 14, 80);
  llx.fillStyle = '#34d399'; llx.font = '700 18px monospace'; llx.fillText('XT90-S ANTI-SPARK', 14, 110);
  const lipoTex = new THREE.CanvasTexture(lipoLabelC); lipoTex.colorSpace = THREE.SRGBColorSpace;
  const lipoSticker = new THREE.Mesh(new THREE.PlaneGeometry(0.128, 0.062), new THREE.MeshBasicMaterial({ map: lipoTex }));
  lipoSticker.rotation.x = -Math.PI / 2;
  lipoSticker.position.y = 0.023;
  lipoPack.add(lipoWrap, lipoSticker);

  xtGroup.add(femaleSide, maleSide, prechargeRing, lipoPack);
  group.add(xtGroup);

  // --- B. OPEN CARBON CHEST BAY: PALM-SIZED `JETSON ORIN NANO` (¥49,800) + SPINNING FAN + CARBON COVER ---
  const chestBayGroup = new THREE.Group();
  const bayChassis = new THREE.Mesh(
    new THREE.BoxGeometry(0.185, 0.195, 0.11),
    new THREE.MeshStandardMaterial({ color: 0x11141a, metalness: 0.86, roughness: 0.26 })
  );
  const bayInterior = new THREE.Mesh(
    new THREE.BoxGeometry(0.165, 0.175, 0.095),
    new THREE.MeshStandardMaterial({ color: 0x090d14, roughness: 0.72 })
  );
  bayInterior.position.z = 0.012;
  chestBayGroup.add(bayChassis, bayInterior);

  // Palm-sized `Jetson Orin Nano` Carrier Board + Black Finned Heatsink + Spinning Cooling Fan!
  const jetsonGroup = new THREE.Group();
  jetsonGroup.position.set(0, 0.024, 0.042);
  const jetsonPcb = new THREE.Mesh(
    new THREE.BoxGeometry(0.102, 0.082, 0.010),
    new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.35 })
  );
  const heatsinkBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.082, 0.062, 0.022),
    new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.85, roughness: 0.25 })
  );
  heatsinkBase.position.z = 0.015;
  jetsonGroup.add(jetsonPcb, heatsinkBase);
  // Crisp parallel black aluminum heatsink fins
  for (let i = -5; i <= 5; i++) {
    const fin = new THREE.Mesh(
      new THREE.BoxGeometry(0.080, 0.0022, 0.014),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.88, roughness: 0.22 })
    );
    fin.position.set(0, i * 0.0052, 0.025);
    jetsonGroup.add(fin);
  }
  // Spinning Mini Whisper Fan ("シュゥゥ……")
  const miniFanPivot = new THREE.Group();
  miniFanPivot.position.set(0, 0, 0.032);
  const fanRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.021, 0.0025, 8, 20),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85 })
  );
  const fanHub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.006, 0.006, 0.004, 12),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.8 })
  );
  fanHub.rotation.x = Math.PI / 2;
  for (let b = 0; b < 7; b++) {
    const blade = new THREE.Mesh(
      new THREE.BoxGeometry(0.004, 0.036, 0.002),
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.4 })
    );
    blade.rotation.z = (b / 7) * Math.PI;
    miniFanPivot.add(blade);
  }
  miniFanPivot.add(fanRing, fanHub);
  jetsonGroup.add(miniFanPivot);

  // Glowing Cyan `1.2 MB POLICY` Status LED + High-Speed CAN Bridge PCB below Jetson
  const jetsonLed = new THREE.Mesh(
    new THREE.SphereGeometry(0.0042, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x22d3ee, emissiveIntensity: 3.8 })
  );
  jetsonLed.position.set(0.042, 0.032, 0.012);
  const canBridge = new THREE.Mesh(
    new THREE.BoxGeometry(0.115, 0.042, 0.016),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.35 })
  );
  canBridge.position.set(0, -0.052, 0.045);
  jetsonGroup.add(jetsonLed);
  chestBayGroup.add(jetsonGroup, canBridge);

  // Removable Woven-Carbon Front Chest Plate + 4 Black-Oxide Bolts (`4本の黒染めボルトで閉じる`)
  const chestCover = new THREE.Group();
  const coverPlate = new THREE.Mesh(new THREE.BoxGeometry(0.172, 0.178, 0.007), carbonMat);
  chestCover.add(coverPlate);
  for (const bx of [-0.072, 0.072]) {
    for (const by of [-0.074, 0.074]) {
      const bolt = new THREE.Mesh(
        new THREE.CylinderGeometry(0.0048, 0.0048, 0.012, 10),
        new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9, roughness: 0.25 })
      );
      bolt.rotation.x = Math.PI / 2;
      bolt.position.set(bx, by, 0.004);
      chestCover.add(bolt);
    }
  }
  chestCover.position.set(0, 0, 0.088);
  chestBayGroup.add(chestCover);
  chestBayGroup.visible = false;
  group.add(chestBayGroup);

  // --- C. DIGITAL HANGING CRANE SCALE (`7.62 kg`) HOOKED ONTO GANTRY OVERHEAD BAR ---
  const craneScaleGroup = new THREE.Group();
  const scaleShell = new THREE.Mesh(
    new THREE.BoxGeometry(0.125, 0.088, 0.042),
    new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.36, metalness: 0.12 })
  );
  const scC = document.createElement('canvas');
  scC.width = 256; scC.height = 128;
  const sx = scC.getContext('2d');
  sx.fillStyle = '#071c19'; sx.fillRect(0, 0, 256, 128);
  sx.strokeStyle = '#34d399'; sx.lineWidth = 4; sx.strokeRect(4, 4, 248, 120);
  sx.fillStyle = '#94a3b8'; sx.font = '700 20px monospace'; sx.fillText('HMD-02 FINAL MASS', 16, 32);
  sx.fillStyle = '#4ade80'; sx.font = '900 54px monospace'; sx.fillText('7.62 kg', 14, 98);
  const scTex = new THREE.CanvasTexture(scC); scTex.colorSpace = THREE.SRGBColorSpace;
  const scFace = new THREE.Mesh(new THREE.PlaneGeometry(0.108, 0.056), new THREE.MeshBasicMaterial({ map: scTex }));
  scFace.position.set(0, 0.004, 0.022);
  const topLoop = new THREE.Mesh(new THREE.TorusGeometry(0.018, 0.004, 8, 18), baseMats.chromeSteel);
  topLoop.position.y = 0.060;
  const botHook = new THREE.Mesh(new THREE.TorusGeometry(0.018, 0.004, 8, 18), baseMats.chromeSteel);
  botHook.position.y = -0.060;
  craneScaleGroup.add(scaleShell, scFace, topLoop, botHook);

  function animateXt90s(tNorm) {
    // 0.0 -> 0.42: Slide to Stage-1 click (`カチッ…`) leaving green anti-spark band visible
    // 0.42 -> 0.62: Hold 1 breath while pre-charging capacitors softly
    // 0.62 -> 0.90: Push firmly all the way home (`グッ`) hiding green band with ZERO spark!
    let x = -0.078;
    let glow = 0;
    if (tNorm < 0.42) {
      const k = tNorm / 0.42;
      x = -0.078 + k * 0.062; // stops at -0.016 (green band still peeking out!)
    } else if (tNorm < 0.62) {
      x = -0.016;
      glow = Math.sin(((tNorm - 0.42) / 0.20) * Math.PI) * 0.72;
    } else {
      const k = Math.min(1, (tNorm - 0.62) / 0.28);
      x = -0.016 + k * 0.028; // seats fully home to +0.012 (green band disappears!)
      glow = (1 - k) * 0.25;
    }
    maleSide.position.x = x;
    prechargeMat.opacity = glow;
    prechargeRing.scale.setScalar(0.85 + glow * 0.45);
  }

  function animateJetson(t, coverClose = 0) {
    miniFanPivot.rotation.z = t * 28.0;
    // Slide & lower the woven-carbon chest cover cleanly over the Jetson bay!
    chestCover.position.set(0, (1 - coverClose) * 0.14, 0.074 + (1 - coverClose) * 0.06);
    chestCover.rotation.x = -(1 - coverClose) * 0.45;
  }

  return { group, xtGroup, chestBayGroup, craneScaleGroup, animateXt90s, animateJetson };
}

export function createGougedEvaMatAndEstopRig(baseMats, pbr) {
  const matGroup = new THREE.Group();

  // Double-Stacked 20mm Extra-Thick Black EVA Shock Mat ("二重に重ねた極厚EVAマット")
  const evaMat = pbr.get('chalkRingRubberMat', { repeatX: 2, repeatY: 2, tint: 0x1e2128 });
  const lowerPad = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.020, 0.88), evaMat);
  lowerPad.position.y = 0.010; lowerPad.receiveShadow = true;
  const upperPad = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.020, 0.84), evaMat);
  upperPad.position.y = 0.030; upperPad.receiveShadow = true;
  matGroup.add(lowerPad, upperPad);

  // Deep Torn Rubber Gouge Scar on the Upper EVA Mat (Revealed right after the 0.3s heel kick!)
  const scarMat = new THREE.MeshStandardMaterial({ color: 0x090b0f, roughness: 0.96 });
  const gougeScar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.005, 0.055), scarMat);
  gougeScar.position.set(-0.10, 0.041, 0.06);
  gougeScar.rotation.y = 0.28;
  gougeScar.visible = false;
  matGroup.add(gougeScar);

  // 10 Torn Black EVA Rubber Chunks that explode outward and litter the walnut floor!
  const chunks = [];
  const chunkMat = new THREE.MeshStandardMaterial({ color: 0x161920, roughness: 0.92 });
  for (let i = 0; i < 10; i++) {
    const s = 0.014 + (i % 4) * 0.008;
    const m = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), chunkMat);
    m.castShadow = true;
    const angle = -0.8 + (i / 10) * 2.2;
    const dist = 0.28 + (i % 5) * 0.14;
    chunks.push({
      mesh: m,
      start: new THREE.Vector3(-0.10, 0.05, 0.06),
      end: new THREE.Vector3(Math.cos(angle) * dist, s * 0.6, Math.sin(angle) * dist + 0.18),
      peakY: 0.24 + (i % 3) * 0.16,
      rotSpeed: (i % 2 === 0 ? 1 : -1) * (5 + i),
    });
    m.visible = false;
    matGroup.add(m);
  }

  function updateDebris(burstProgress) {
    // burstProgress <= 0: intact mat; 0..1: chunks flying through air; >= 1: scattered on floor!
    const show = burstProgress > 0.001;
    gougeScar.visible = show;
    const p = Math.max(0, Math.min(1, burstProgress));
    for (const c of chunks) {
      c.mesh.visible = show;
      if (!show) continue;
      c.mesh.position.lerpVectors(c.start, c.end, p);
      c.mesh.position.y += Math.sin(p * Math.PI) * c.peakY;
      c.mesh.rotation.set(p * c.rotSpeed, p * c.rotSpeed * 0.7, 0);
    }
  }

  // Desk-Mounted Giant Crimson Mushroom Emergency Stop Switch ("真っ赤なキノコ型の非常停止ボタン")
  const estopGroup = new THREE.Group();
  const estopBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.095, 0.056, 0.095),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.38 }) // Industrial yellow E-stop enclosure
  );
  estopBox.position.y = 0.028;
  const estopCollar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.036, 0.040, 0.012, 24),
    new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.45 })
  );
  estopCollar.position.y = 0.060;
  const estopCap = new THREE.Group();
  estopCap.position.y = 0.078;
  const capStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.014, 0.022, 16),
    new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.3 })
  );
  const capDome = new THREE.Mesh(
    new THREE.CylinderGeometry(0.034, 0.030, 0.018, 28),
    new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.45,
      roughness: 0.20,
    })
  );
  capDome.position.y = 0.012;
  estopCap.add(capStem, capDome);
  estopGroup.add(estopBox, estopCollar, estopCap);

  function setEstopPressed(pressed01) {
    estopCap.position.y = 0.078 - pressed01 * 0.016;
    capDome.material.emissiveIntensity = 0.45 + pressed01 * 1.4;
  }

  return { matGroup, estopGroup, updateDebris, setEstopPressed };
}

export function createSingleLegViseDiagnosticRig(baseMats, carbonMat) {
  const group = new THREE.Group();

  // Heavy Cast-Iron Bench Vise clamping ONE Isolated HMD-02 Left Leg!
  const viseMat = new THREE.MeshStandardMaterial({ color: 0x1e3a5f, metalness: 0.65, roughness: 0.52 });
  const viseBase = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.048, 0.12), viseMat);
  viseBase.position.y = 0.024;
  const jawL = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.068, 0.10), viseMat);
  jawL.position.set(-0.042, 0.072, 0);
  const jawR = jawL.clone(); jawR.position.x = 0.042;
  const viseScrew = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.16, 12), baseMats.chromeSteel);
  viseScrew.rotation.z = Math.PI / 2; viseScrew.position.set(0.09, 0.052, 0);
  group.add(viseBase, jawL, jawR, viseScrew);

  // Isolated HMD-02 Left Leg (Clamped Upright at Hip Joint -> Thigh -> Knee -> Shin)
  const legRoot = new THREE.Group();
  legRoot.position.set(0, 0.088, 0);
  const blackAlum = new THREE.MeshStandardMaterial({ color: 0x11141a, metalness: 0.88, roughness: 0.22 });
  const hipBlock = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.062, 0.062), blackAlum);
  const thighPivot = new THREE.Group();
  thighPivot.position.set(0, 0.028, 0);
  const thighBar = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.22, 0.022), carbonMat);
  thighBar.position.y = 0.11;
  const kneeJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.028, 28), blackAlum);
  kneeJoint.rotation.x = Math.PI / 2; kneeJoint.position.y = 0.22;
  const shinBar = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.16, 0.018), carbonMat);
  shinBar.position.set(0.065, 0.25, 0);
  shinBar.rotation.z = -1.15;
  thighPivot.add(thighBar, kneeJoint, shinBar);
  legRoot.add(hipBlock, thighPivot);
  group.add(legRoot);

  // Cutaway `8:1` Steel Planetary Gear & Sticky Amber Grease Stiction Visualizer (Mounted cleanly on Knee Front!)
  const gearCutaway = new THREE.Group();
  gearCutaway.position.set(0, 0.22, 0.022);
  const steelGearMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.92, roughness: 0.22 });
  const greaseMat = new THREE.MeshPhysicalMaterial({
    color: 0xf59e0b,
    emissive: 0xb45309,
    emissiveIntensity: 0.45,
    transparent: true,
    opacity: 0.82,
    roughness: 0.12,
  });
  const outerRingGear = new THREE.Mesh(new THREE.TorusGeometry(0.034, 0.0055, 10, 28), steelGearMat);
  const sunGear = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.012, 16), steelGearMat);
  sunGear.rotation.x = Math.PI / 2;
  const planetCarrier = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const pGear = new THREE.Mesh(new THREE.CylinderGeometry(0.0105, 0.0105, 0.012, 14), steelGearMat);
    pGear.rotation.x = Math.PI / 2;
    pGear.position.set(Math.cos(a) * 0.021, Math.sin(a) * 0.021, 0);
    // Sticky viscous amber grease glob bridging tooth contact!
    const greaseGlob = new THREE.Mesh(new THREE.SphereGeometry(0.0075, 10, 8), greaseMat);
    greaseGlob.position.set(Math.cos(a + 0.35) * 0.025, Math.sin(a + 0.35) * 0.025, 0.004);
    planetCarrier.add(pGear, greaseGlob);
  }
  gearCutaway.add(outerRingGear, sunGear, planetCarrier);
  thighPivot.add(gearCutaway);

  // Resonant Structural Micro-Vibration Rings Shooting Up the Carbon Femur ("弦楽器の胴のように響く骨の震え")!
  const vibRings = [];
  for (let i = 0; i < 6; i++) {
    const vm = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
    const vr = new THREE.Mesh(new THREE.RingGeometry(0.032, 0.040, 24), vm);
    vr.rotation.x = Math.PI / 2;
    vr.position.set(0, 0.04 + i * 0.038, 0);
    thighPivot.add(vr);
    vibRings.push({ mesh: vr, mat: vm, idx: i });
  }

  function updateDiagnostic(t, mode) {
    // mode: 'latency' | 'stiction' | 'vibration'
    gearCutaway.visible = mode === 'stiction';
    if (mode === 'stiction') {
      // Stick-slip motion: stays stuck under grease, then snaps forward suddenly ("ピタッ…ツルッ！")
      const cyc = (t * 1.4) % 1.0;
      const slip = cyc < 0.65 ? cyc * 0.08 : 0.052 + ((cyc - 0.65) / 0.35) * 0.95;
      planetCarrier.rotation.z = slip * Math.PI * 0.85;
      sunGear.rotation.z = -slip * Math.PI * 2.4;
      thighPivot.rotation.z = Math.sin(slip * Math.PI) * 0.14;
    } else if (mode === 'vibration') {
      thighPivot.rotation.z = Math.sin(t * 58.0) * 0.018;
    } else {
      thighPivot.rotation.z = Math.sin(t * 7.5) * 0.12;
    }

    for (const r of vibRings) {
      if (mode !== 'vibration') {
        r.mat.opacity = 0;
        continue;
      }
      const wave = (t * 2.4 + r.idx / 6) % 1.0;
      r.mesh.position.y = 0.03 + wave * 0.21;
      r.mesh.scale.setScalar(0.85 + Math.sin(wave * Math.PI) * 0.65);
      r.mat.opacity = Math.sin(wave * Math.PI) * 0.88;
    }
  }

  return { group, updateDiagnostic };
}
