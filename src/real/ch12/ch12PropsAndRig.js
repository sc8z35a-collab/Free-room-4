import * as THREE from 'three';

/**
 * Chapter 12 Ultra-Quality Custom Hero Props & Physical Rigs:
 * 1. 46mm Circular Green FOC Driver PCB (`丸い緑色の基板` with 6 MOSFET gates & charred split state!)
 * 2. Heavy Cast-Iron Bench Vise + White Ceramic Heatproof Mat + Prototype Joint #1 (`試作関節1号機`)
 *    with 80mm Bare Copper Motor + Planetary Collar + 25cm Brushed Aluminum Shin Bar (`ふわっ` soft spring!)
 * 3. Transparent Workshop Safety Goggles (`保護メガネ` + spark deflection mark) & Red Mushroom E-Stop Button
 * 4. 56-Particle Shoot-Through Explosion (`バァンッ！！` orange & blue-white flash + white smoke plume)
 * 5. Precision ESD Tweezers & 0603 SMD Chip (trembling fingers)
 * 6. Old Silver Twin-Bell Alarm Clock (`古い銀色の目覚まし時計`) + Golden Dead-Time Escapement Visualizer
 * 7. Japanese Kotatsu, Steaming Toshikoshi Soba, Father's Mikan Basket, Kirimoji & 3D Frost Pillars (`霜柱`)
 */

export function createFocCircularPcb46mm(baseMats) {
  const group = new THREE.Group();

  // 46mm diameter x 2.2mm dark emerald solder-mask FR4 circular PCB
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x0c5c34,
    roughness: 0.34,
    metalness: 0.14,
  });
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.023, 0.023, 0.0022, 40), pcbMat);
  disc.castShadow = true;
  disc.receiveShadow = true;
  group.add(disc);

  // Gold-plated concentric power bus ring & mounting holes
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.90, roughness: 0.22 });
  const busRing = new THREE.Mesh(new THREE.TorusGeometry(0.0175, 0.0008, 8, 36), goldMat);
  busRing.rotation.x = Math.PI / 2;
  busRing.position.y = 0.0012;
  group.add(busRing);

  const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.0095, 0.0005, 8, 28), goldMat);
  innerRing.rotation.x = Math.PI / 2;
  innerRing.position.y = 0.0012;
  group.add(innerRing);

  // Center 32-bit FOC Microcontroller (STM32 QFP-48 style)
  const chipMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.42, metalness: 0.18 });
  const mcu = new THREE.Mesh(new THREE.BoxGeometry(0.009, 0.0018, 0.009), chipMat);
  mcu.position.y = 0.0020;
  mcu.rotation.y = Math.PI / 4;
  group.add(mcu);

  // SIX Discrete Power MOSFETs ("六つの小さな電気の門" — 3 High-Side + 3 Low-Side)
  const mosfets = [];
  const gateHalos = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const r = 0.0145;
    const mGroup = new THREE.Group();
    mGroup.position.set(Math.cos(a) * r, 0.0020, Math.sin(a) * r);
    mGroup.rotation.y = -a;

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.0052, 0.0016, 0.0044),
      chipMat.clone()
    );
    const padL = new THREE.Mesh(new THREE.BoxGeometry(0.0012, 0.0006, 0.0040), goldMat);
    padL.position.set(-0.0031, -0.0005, 0);
    const padR = padL.clone();
    padR.position.x = 0.0031;
    mGroup.add(body, padL, padR);

    // Subtle glowing gate indicator ring (high-side amber, low-side cyan)
    const haloMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0xf59e0b : 0x38bdf8,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(new THREE.RingGeometry(0.0028, 0.0042, 16), haloMat);
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.0014;
    mGroup.add(halo);

    group.add(mGroup);
    mosfets.push({ group: mGroup, body, isHigh: i % 2 === 0 });
    gateHalos.push(haloMat);
  }

  // Charred "Roasted Chestnut" Split MOSFET Overlay (visible right after Christmas Eve shoot-through!)
  const charGroup = new THREE.Group();
  charGroup.position.copy(mosfets[1].group.position);
  charGroup.rotation.copy(mosfets[1].group.rotation);
  const sootMat = new THREE.MeshBasicMaterial({
    color: 0x09090b,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide,
  });
  const sootRing = new THREE.Mesh(new THREE.CircleGeometry(0.0095, 24), sootMat);
  sootRing.rotation.x = -Math.PI / 2;
  sootRing.position.y = 0.0003;
  // Two split charred halves tilted apart like a roasted chestnut!
  const charMat = new THREE.MeshStandardMaterial({ color: 0x171717, roughness: 0.96, metalness: 0.05 });
  const halfL = new THREE.Mesh(new THREE.BoxGeometry(0.0026, 0.0022, 0.0048), charMat);
  halfL.position.set(-0.0018, 0.0010, 0);
  halfL.rotation.z = 0.42;
  const halfR = new THREE.Mesh(new THREE.BoxGeometry(0.0026, 0.0022, 0.0048), charMat);
  halfR.position.set(0.0018, 0.0010, 0);
  halfR.rotation.z = -0.45;
  const emberMat = new THREE.MeshBasicMaterial({ color: 0xff5500 });
  const emberCore = new THREE.Mesh(new THREE.SphereGeometry(0.0016, 10, 8), emberMat);
  emberCore.position.set(0, 0.0008, 0);
  charGroup.add(sootRing, halfL, halfR, emberCore);
  charGroup.visible = false;
  group.add(charGroup);

  // Tiny Green Power Status LED ("基板の小さな緑色のランプ")
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0x14532d,
    emissive: 0x22c55e,
    emissiveIntensity: 0.0,
    roughness: 0.2,
  });
  const statusLed = new THREE.Mesh(new THREE.BoxGeometry(0.0024, 0.0014, 0.0016), ledMat);
  statusLed.position.set(0.0, 0.0018, 0.0195);
  group.add(statusLed);

  // 3 Heavy Phase Solder Pads (U=Red, V=Yellow, W=Black)
  const padColors = [0xdc2626, 0xeab308, 0x18181b];
  for (let i = 0; i < 3; i++) {
    const px = (i - 1) * 0.0075;
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.0022, 0.0014, 14), goldMat);
    pad.position.set(px, 0.0015, -0.019);
    const wireStub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0014, 0.0014, 0.014, 10),
      new THREE.MeshStandardMaterial({ color: padColors[i], roughness: 0.5 })
    );
    wireStub.rotation.x = Math.PI / 2;
    wireStub.position.set(px, 0.0015, -0.026);
    group.add(pad, wireStub);
  }

  function setLedOn(on) {
    ledMat.emissiveIntensity = on ? 3.4 : 0.0;
    ledMat.color.setHex(on ? 0x4ade80 : 0x14532d);
  }

  function setBurnState(burned, emberGlow = 0.0) {
    charGroup.visible = burned;
    mosfets[1].body.visible = !burned;
    emberMat.color.setRGB(1.0 * emberGlow + 0.15, 0.32 * emberGlow + 0.04, 0.02);
  }

  function animateGates(t, activeIntensity = 0.0) {
    for (let i = 0; i < 6; i++) {
      const wave = 0.5 + 0.5 * Math.sin(t * 14.0 + i * (Math.PI / 3));
      gateHalos[i].opacity = activeIntensity * (0.25 + 0.75 * wave);
    }
  }

  return { group, setLedOn, setBurnState, animateGates };
}

export function createBenchViseAndJointRig(baseMats, pbr) {
  const group = new THREE.Group();

  // White Heatproof Ceramic Work Mat ("机の下には火に強い白いセラミックの作業マット")
  const matMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 0.006, 0.34),
    pbr.get('ceramicGlazeCream', { repeatX: 2, repeatY: 2, tint: 0xf8fafc })
  );
  matMesh.position.set(0, 0.003, 0);
  matMesh.receiveShadow = true;
  group.add(matMesh);

  // Heavy Cast-Iron Workshop Bench Vise ("万力でしっかりと固定")
  const viseGroup = new THREE.Group();
  const viseBlueMat = new THREE.MeshStandardMaterial({ color: 0x1e3a5f, roughness: 0.55, metalness: 0.62 });
  const ironJawMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.36, metalness: 0.85 });

  const basePlate = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.022, 0.16), viseBlueMat);
  basePlate.position.set(-0.08, 0.017, 0);
  basePlate.castShadow = true;
  const fixedJaw = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.082, 0.115), viseBlueMat);
  fixedJaw.position.set(-0.12, 0.068, 0);
  fixedJaw.castShadow = true;
  const fixedPlate = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.032, 0.112), ironJawMat);
  fixedPlate.position.set(-0.098, 0.090, 0);

  const slideJaw = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.082, 0.115), viseBlueMat);
  slideJaw.position.set(-0.032, 0.068, 0);
  slideJaw.castShadow = true;
  const slidePlate = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.032, 0.112), ironJawMat);
  slidePlate.position.set(-0.052, 0.090, 0);

  // Chrome lead screw & sliding T-handle bar
  const leadScrew = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.14, 14), baseMats.chromeSteel);
  leadScrew.rotation.z = Math.PI / 2;
  leadScrew.position.set(0.028, 0.052, 0);
  const handleHead = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.024, 14), baseMats.chromeSteel);
  handleHead.rotation.z = Math.PI / 2;
  handleHead.position.set(0.095, 0.052, 0);
  const tBar = new THREE.Mesh(new THREE.CylinderGeometry(0.0045, 0.0045, 0.11, 10), baseMats.chromeSteel);
  tBar.position.set(0.095, 0.052, 0);
  tBar.rotation.x = 0.35;
  viseGroup.add(basePlate, fixedJaw, fixedPlate, slideJaw, slidePlate, leadScrew, handleHead, tBar);
  group.add(viseGroup);

  // Clamped Hero Actuator Assembly (80mm Bare Outrunner Motor + 46mm Circular Green FOC PCB!)
  const actuatorGroup = new THREE.Group();
  actuatorGroup.position.set(-0.076, 0.105, 0.0);
  group.add(actuatorGroup);

  // Outer machined black aluminum bell (radius = 0.040m -> 80mm) facing +Z front / PCB on front or side!
  const blackBellMat = new THREE.MeshStandardMaterial({ color: 0x14171d, metalness: 0.84, roughness: 0.26 });
  const copperMat = new THREE.MeshStandardMaterial({ color: 0xd96b27, metalness: 0.90, roughness: 0.24 });

  const statorHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.040, 0.040, 0.026, 36), blackBellMat);
  statorHousing.rotation.x = Math.PI / 2;
  statorHousing.castShadow = true;
  actuatorGroup.add(statorHousing);

  // 18 Visible Red-Copper Stator Coils gleaming inside the rim!
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.0044, 0.0044, 0.020, 8), copperMat);
    coil.rotation.x = Math.PI / 2;
    coil.position.set(Math.cos(a) * 0.029, Math.sin(a) * 0.029, 0.0);
    actuatorGroup.add(coil);
  }

  // Mount the 46mm Circular Green FOC PCB squarely on the front (+Z) face so camera sees every MOSFET!
  const pcb = createFocCircularPcb46mm(baseMats);
  pcb.group.rotation.x = Math.PI / 2;
  pcb.group.position.set(0, 0, 0.0155);
  actuatorGroup.add(pcb.group);

  // Thick Red / Yellow / Black Phase Leads curving down toward PSU / terminal block
  const leadColors = [0xdc2626, 0xeab308, 0x18181b];
  for (let i = 0; i < 3; i++) {
    const zOff = (i - 1) * 0.008;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.02, -0.022, 0.012 + zOff * 0.4),
      new THREE.Vector3(-0.08, -0.058, 0.024 + zOff),
      new THREE.Vector3(-0.18, -0.095, 0.036 + zOff * 1.4),
    ]);
    const wire = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 14, 0.0022, 8, false),
      new THREE.MeshStandardMaterial({ color: leadColors[i], roughness: 0.48 })
    );
    actuatorGroup.add(wire);
  }

  // Prototype Joint #1 Output Hub + 25cm Horizontal Brushed Silver Aluminum Shin Bar (`長さ25センチの銀色のアルミの棒`)
  const shinPivot = new THREE.Group();
  shinPivot.position.set(0, 0, -0.018);
  actuatorGroup.add(shinPivot);

  // Single-stage planetary gear collar (machined silver aluminum)
  const gearCollar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.030, 0.032, 0.016, 28),
    baseMats.aluminumBrushed
  );
  gearCollar.rotation.x = Math.PI / 2;
  shinPivot.add(gearCollar);

  // 6 stainless hex bolts around output flange
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.0024, 0.0024, 0.004, 6), baseMats.chromeSteel);
    bolt.rotation.x = Math.PI / 2;
    bolt.position.set(Math.cos(a) * 0.020, Math.sin(a) * 0.020, -0.008);
    shinPivot.add(bolt);
  }

  // 25cm (0.25m) Horizontal Brushed Silver Aluminum Bar extending cleanly to +X right!
  const alumBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.018, 0.012),
    baseMats.aluminumBrushed
  );
  alumBar.position.set(0.125, 0, -0.012);
  alumBar.castShadow = true;
  shinPivot.add(alumBar);

  // Chamfered tip cap & subtle black centimeter scale ticks along the 25cm bar
  const tipCap = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.013, 16), baseMats.chromeSteel);
  tipCap.rotation.x = Math.PI / 2;
  tipCap.position.set(0.25, 0, -0.012);
  shinPivot.add(tipCap);

  // Magical Translucent Virtual Spring Force-Field Rings (glow emerald/gold when flexing `ふわっ`!)
  const springField = new THREE.Group();
  springField.position.set(0, 0, -0.012);
  const springRings = [];
  for (let i = 0; i < 3; i++) {
    const rMat = new THREE.MeshBasicMaterial({
      color: i === 1 ? 0xfbbf24 : 0x34d399,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const rMesh = new THREE.Mesh(new THREE.RingGeometry(0.036 + i * 0.014, 0.040 + i * 0.014, 36), rMat);
    springField.add(rMesh);
    springRings.push({ mesh: rMesh, mat: rMat });
  }
  actuatorGroup.add(springField);

  function setShinVisible(vis) {
    shinPivot.visible = vis;
  }

  function setJointAngle(rad, fieldGlow = 0.0) {
    shinPivot.rotation.z = rad;
    for (let i = 0; i < springRings.length; i++) {
      springRings[i].mat.opacity = fieldGlow * (0.48 - i * 0.11);
      springRings[i].mesh.scale.setScalar(1.0 + Math.abs(rad) * (0.6 + i * 0.2));
    }
  }

  return { group, actuatorGroup, pcb, shinPivot, setShinVisible, setJointAngle };
}

export function createSafetyGogglesAndEStop(baseMats) {
  const gogglesGroup = new THREE.Group();
  // Wrap-around clear polycarbonate workshop safety goggles ("透明な作業用の保護メガネ")
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0xe0f2fe,
    transparent: true,
    opacity: 0.34,
    roughness: 0.06,
    metalness: 0.1,
    transmission: 0.65,
    side: THREE.DoubleSide,
  });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45 });

  // Curved front visor
  const visor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.075, 0.048, 24, 1, true, -Math.PI * 0.34, Math.PI * 0.68),
    lensMat
  );
  visor.position.set(0, 0.026, -0.045);
  const topRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.075, 0.0032, 8, 24, Math.PI * 0.68),
    frameMat
  );
  topRim.rotation.x = Math.PI / 2;
  topRim.rotation.z = Math.PI * 0.16;
  topRim.position.set(0, 0.050, -0.045);
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.008, 0.11), frameMat);
  armL.position.set(-0.066, 0.036, -0.045);
  const armR = armL.clone();
  armR.position.x = 0.066;

  // Tiny glowing orange hot-spark scorch streak on the right lens surface!
  const sparkStreakMat = new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0.0 });
  const sparkStreak = new THREE.Mesh(new THREE.BoxGeometry(0.0025, 0.018, 0.0025), sparkStreakMat);
  sparkStreak.position.set(0.022, 0.026, 0.028);
  sparkStreak.rotation.z = -0.35;

  gogglesGroup.add(visor, topRim, armL, armR, sparkStreak);

  // Big Red Mushroom Emergency Stop Button ("非常停止の赤いキノコボタン")
  const eStopGroup = new THREE.Group();
  const boxYellow = new THREE.Mesh(
    new THREE.BoxGeometry(0.074, 0.046, 0.074),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.38 })
  );
  boxYellow.position.y = 0.023;
  boxYellow.castShadow = true;
  const collar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.021, 0.023, 0.012, 20),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
  );
  collar.position.y = 0.052;
  const mushroomCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.028, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.55),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.28, metalness: 0.08 })
  );
  mushroomCap.position.y = 0.056;
  mushroomCap.castShadow = true;
  eStopGroup.add(boxYellow, collar, mushroomCap);

  function setEStopPressed(u) {
    mushroomCap.position.y = 0.056 - Math.max(0, Math.min(1, u)) * 0.013;
  }

  function setSparkStreak(opacity) {
    sparkStreakMat.opacity = opacity;
  }

  return { gogglesGroup, eStopGroup, setEStopPressed, setSparkStreak };
}

export function createExplosionAndSmokeRig() {
  const group = new THREE.Group();

  // Blinding Orange & Blue-White Shoot-Through Electric Flash Core ("目が眩むほど鮮やかなオレンジと青白い閃光")
  const flashBlueMat = new THREE.MeshBasicMaterial({
    color: 0xbfe8ff,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const flashBlue = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 12), flashBlueMat);

  const flashOrangeMat = new THREE.MeshBasicMaterial({
    color: 0xff6b1a,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const flashOrange = new THREE.Mesh(new THREE.SphereGeometry(0.095, 16, 12), flashOrangeMat);

  // 56 Flying Sparks (Instanced glowing orange/white streaks!)
  const sparkCount = 56;
  const sparkMat = new THREE.MeshBasicMaterial({
    color: 0xffa834,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sparkInst = new THREE.InstancedMesh(new THREE.BoxGeometry(0.0028, 0.0028, 0.022), sparkMat, sparkCount);
  const sparkDirs = [];
  for (let i = 0; i < sparkCount; i++) {
    const theta = (i * 2.39996) % (Math.PI * 2);
    const phi = 0.15 + ((i * 0.37) % 1.0) * 1.15;
    const speed = 0.45 + ((i * 0.61) % 1.0) * 0.85;
    sparkDirs.push({
      vx: Math.sin(phi) * Math.cos(theta) * speed,
      vy: Math.cos(phi) * speed * 0.9 + 0.18,
      vz: Math.abs(Math.sin(phi) * Math.sin(theta)) * speed + 0.25, // burst out toward viewer/goggles!
    });
  }

  // 18 Billowing Pure White Smoke Puffs ("真っ白な煙が立ち昇る")
  const smokeCount = 18;
  const smokePuffs = [];
  for (let i = 0; i < smokeCount; i++) {
    const sMat = new THREE.MeshBasicMaterial({
      color: 0xf1f5f9,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.024, 12, 10), sMat);
    group.add(puff);
    smokePuffs.push({ mesh: puff, mat: sMat, seed: i * 1.37 });
  }

  group.add(flashBlue, flashOrange, sparkInst);
  const _d = new THREE.Object3D();

  /**
   * @param {number} dtSec seconds since explosion trigger (negative = dormant)
   */
  function update(dtSec) {
    if (dtSec < 0) {
      group.visible = false;
      return;
    }
    group.visible = true;

    // Sharp intense flash during 0.0 .. 0.65s
    const flashDecay = Math.max(0, 1.0 - dtSec / 0.65);
    flashBlueMat.opacity = Math.pow(flashDecay, 1.8) * 0.98;
    flashBlue.scale.setScalar(0.6 + (1 - flashDecay) * 2.4);
    flashOrangeMat.opacity = Math.pow(flashDecay, 1.3) * 0.85;
    flashOrange.scale.setScalar(0.8 + (1 - flashDecay) * 3.2);

    // Ballistic glowing sparks 0.0 .. 1.4s
    const sparkAlpha = Math.max(0, 1.0 - dtSec / 1.4);
    sparkMat.opacity = sparkAlpha;
    for (let i = 0; i < sparkCount; i++) {
      const s = sparkDirs[i];
      const t = Math.min(dtSec, 1.4);
      const px = s.vx * t;
      const py = s.vy * t - 0.55 * t * t;
      const pz = s.vz * t;
      _d.position.set(px, py, pz);
      _d.lookAt(px + s.vx, py + s.vy - 1.1 * t, pz + s.vz);
      _d.scale.setScalar(0.5 + sparkAlpha * 0.8);
      _d.updateMatrix();
      sparkInst.setMatrixAt(i, _d.matrix);
    }
    sparkInst.instanceMatrix.needsUpdate = true;

    // Rising pure white smoke column 0.25s .. 14.0s
    const smokeEnv = dtSec > 0.2 ? Math.min(1.0, (dtSec - 0.2) * 1.2) * Math.max(0.25, 1.0 - dtSec / 18.0) : 0.0;
    for (let i = 0; i < smokeCount; i++) {
      const p = smokePuffs[i];
      const cycle = ((dtSec * 0.42 + i / smokeCount) % 1.0);
      p.mesh.position.set(
        Math.sin(p.seed + dtSec * 1.1) * (0.018 + cycle * 0.05),
        0.01 + cycle * 0.34,
        Math.cos(p.seed * 1.3 + dtSec * 0.9) * (0.014 + cycle * 0.03)
      );
      p.mesh.scale.setScalar(0.55 + cycle * 2.5);
      p.mat.opacity = smokeEnv * Math.sin(cycle * Math.PI) * 0.42;
    }
  }

  return { group, update };
}

export function createTremblingTweezersRig(baseMats) {
  const group = new THREE.Group();

  // Stainless precision ESD tweezers pointing along -X toward a rice-grain 0603 SMD component!
  const bladeL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.0022, 0.0038), baseMats.chromeSteel);
  bladeL.position.set(0.055, 0.001, -0.0022);
  bladeL.rotation.y = 0.025;
  const bladeR = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.0022, 0.0038), baseMats.chromeSteel);
  bladeR.position.set(0.055, 0.001, 0.0022);
  bladeR.rotation.y = -0.025;

  // Tiny rice-grain-sized SMD resistor sitting on the desk waiting to be picked up
  const smdChip = new THREE.Mesh(
    new THREE.BoxGeometry(0.0055, 0.0024, 0.0032),
    new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35 })
  );
  smdChip.position.set(-0.012, -0.014, 0.0);

  const tweezersPivot = new THREE.Group();
  tweezersPivot.add(bladeL, bladeR);
  group.add(tweezersPivot, smdChip);

  function setTremor(t, intensity = 1.0) {
    const jx = (Math.sin(t * 29.0) * 0.0032 + Math.sin(t * 47.0) * 0.0018) * intensity;
    const jy = (Math.cos(t * 33.0) * 0.0026 + Math.sin(t * 53.0) * 0.0014) * intensity;
    const jz = (Math.sin(t * 41.0) * 0.0036) * intensity;
    tweezersPivot.position.set(jx, jy, jz);
    tweezersPivot.rotation.set(jy * 6.0, jz * 5.0, -0.22 + jx * 4.0);
  }

  return { group, setTremor };
}

export function createSilverAlarmClockRig(baseMats) {
  const group = new THREE.Group();

  // Vintage silver twin-bell alarm clock ("小学生の時に半べそをかきながら自分で直した古い銀色の目覚まし時計")
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xdbe2ea, metalness: 0.90, roughness: 0.24 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.044, 32), silverMat);
  body.rotation.x = Math.PI / 2;
  body.position.y = 0.068;
  body.castShadow = true;

  // High-resolution cream vintage clock face
  const dialC = document.createElement('canvas');
  dialC.width = 512; dialC.height = 512;
  const ctx = dialC.getContext('2d');
  ctx.fillStyle = '#f8f4e6';
  ctx.beginPath(); ctx.arc(256, 256, 248, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 10;
  ctx.beginPath(); ctx.arc(256, 256, 238, 0, Math.PI * 2); ctx.stroke();
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const major = i % 5 === 0;
    const r0 = major ? 196 : 212;
    const r1 = 228;
    ctx.strokeStyle = major ? '#0f172a' : '#64748b';
    ctx.lineWidth = major ? 7 : 3;
    ctx.beginPath();
    ctx.moveTo(256 + Math.cos(a) * r0, 256 + Math.sin(a) * r0);
    ctx.lineTo(256 + Math.cos(a) * r1, 256 + Math.sin(a) * r1);
    ctx.stroke();
  }
  ctx.fillStyle = '#0f172a'; ctx.font = '800 44px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let h = 1; h <= 12; h++) {
    const a = (h / 12) * Math.PI * 2 - Math.PI / 2;
    ctx.fillText(String(h), 256 + Math.cos(a) * 162, 256 + Math.sin(a) * 162);
  }
  const dialTex = new THREE.CanvasTexture(dialC);
  dialTex.colorSpace = THREE.SRGBColorSpace;
  const dialFace = new THREE.Mesh(
    new THREE.CircleGeometry(0.052, 32),
    new THREE.MeshStandardMaterial({ map: dialTex, roughness: 0.55 })
  );
  dialFace.position.set(0, 0.068, 0.023);

  // Hour, Minute, and Crisp Ticking Red Second Hand (`チッ……チッ……`)
  const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.026, 0.002), baseMats.blackAnodized);
  hourHand.position.set(0, 0.068 + 0.009, 0.025);
  hourHand.rotation.z = 0.08; // ~11:58 PM New Year's Eve!
  const minHand = new THREE.Mesh(new THREE.BoxGeometry(0.003, 0.038, 0.002), baseMats.blackAnodized);
  minHand.position.set(0, 0.068 + 0.015, 0.026);
  minHand.rotation.z = 0.16;

  const secPivot = new THREE.Group();
  secPivot.position.set(0, 0.068, 0.0275);
  const secHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.0016, 0.044, 0.0014),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
  );
  secHand.position.y = 0.016;
  secPivot.add(secHand);

  // Twin Silver Bells + Top Hammer + Legs
  const bellL = new THREE.Mesh(new THREE.SphereGeometry(0.024, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), silverMat);
  bellL.position.set(-0.042, 0.122, 0); bellL.rotation.z = 0.52;
  const bellR = bellL.clone();
  bellR.position.x = 0.042; bellR.rotation.z = -0.52;
  const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.008, 0.022, 10), silverMat);
  legL.position.set(-0.036, 0.011, 0); legL.rotation.z = 0.35;
  const legR = legL.clone(); legR.position.x = 0.036; legR.rotation.z = -0.35;

  group.add(body, dialFace, hourHand, minHand, secPivot, bellL, bellR, legL, legR);

  // Floating Golden Holographic Dead-Time Escapement Visualizer (`上門 CLOSE → 隙間 (DEAD-TIME) → 下門 OPEN`)
  const holoC = document.createElement('canvas');
  holoC.width = 768; holoC.height = 384;
  const hx = holoC.getContext('2d');
  const holoTex = new THREE.CanvasTexture(holoC);
  holoTex.colorSpace = THREE.SRGBColorSpace;
  const holoMat = new THREE.MeshBasicMaterial({
    map: holoTex,
    transparent: true,
    opacity: 0.0,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const holoPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.16), holoMat);
  holoPlane.position.set(0.0, 0.22, 0.02);
  group.add(holoPlane);

  function updateClock(t, holoOpacity = 0.0) {
    // Crisp 1-second escapement step with tiny mechanical bounce
    const secFloor = Math.floor(t);
    const frac = t - secFloor;
    const bounce = frac < 0.08 ? Math.sin((frac / 0.08) * Math.PI) * 0.02 : 0;
    secPivot.rotation.z = -(secFloor * (Math.PI / 30) + bounce);

    holoMat.opacity = holoOpacity;
    if (holoOpacity > 0.02) {
      hx.clearRect(0, 0, 768, 384);
      hx.fillStyle = 'rgba(15, 23, 42, 0.86)';
      hx.fillRect(0, 0, 768, 384);
      hx.strokeStyle = '#fbbf24'; hx.lineWidth = 4;
      hx.strokeRect(6, 6, 756, 372);
      hx.fillStyle = '#fde68a'; hx.font = '900 28px sans-serif';
      hx.fillText('時計の歯車 ＝ 半導体の『呼吸の間（DEAD-TIME）』', 32, 48);

      // Upper Gate waveform (Amber)
      hx.strokeStyle = '#f59e0b'; hx.lineWidth = 6;
      hx.beginPath();
      hx.moveTo(40, 150); hx.lineTo(100, 150); hx.lineTo(100, 92); hx.lineTo(310, 92); hx.lineTo(310, 150); hx.lineTo(720, 150);
      hx.stroke();
      hx.fillStyle = '#fbbf24'; hx.font = '700 22px monospace';
      hx.fillText('HIGH GATE (上門 ON → CLOSE)', 110, 82);

      // Glowing Dead-Time Gap Highlight ("静かな隙間 = 850ns")
      const pulse = 0.28 + 0.22 * Math.sin(t * 6.0);
      hx.fillStyle = `rgba(52, 211, 153, ${pulse})`;
      hx.fillRect(310, 76, 90, 224);
      hx.strokeStyle = '#34d399'; hx.lineWidth = 3; hx.setLineDash([8, 6]);
      hx.strokeRect(310, 76, 90, 224);
      hx.setLineDash([]);
      hx.fillStyle = '#6ee7b7'; hx.font = '900 24px sans-serif';
      hx.fillText('隙間', 330, 194);
      hx.font = '700 18px monospace';
      hx.fillText('850ns', 326, 222);

      // Lower Gate waveform (Sky Blue)
      hx.strokeStyle = '#38bdf8'; hx.lineWidth = 6;
      hx.beginPath();
      hx.moveTo(40, 290); hx.lineTo(400, 290); hx.lineTo(400, 232); hx.lineTo(650, 232); hx.lineTo(650, 290); hx.lineTo(720, 290);
      hx.stroke();
      hx.fillStyle = '#7dd3fc'; hx.font = '700 22px monospace';
      hx.fillText('LOW GATE (下門 OPEN)', 412, 222);

      hx.fillStyle = '#e2e8f0'; hx.font = '700 22px sans-serif';
      hx.fillText('一拍待てば衝突しない —— 電気は怪物じゃなかった', 36, 352);
      holoTex.needsUpdate = true;
    }
  }

  return { group, updateClock };
}

export function createKotatsuAndSobaProps(baseMats, pbr) {
  const group = new THREE.Group();

  // Warm Japanese Kotatsu Table ("居間のこたつ")
  const futonMat = pbr.get('quiltedKnitFabric', { repeatX: 3, repeatY: 3, tint: 0xb91c1c });
  const futonSkirt = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.36, 1.36), futonMat);
  futonSkirt.position.y = 0.18;
  futonSkirt.castShadow = true;
  futonSkirt.receiveShadow = true;

  const topMat = pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 2, tint: 0x784421 });
  const tableTop = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.036, 1.06), topMat);
  tableTop.position.y = 0.38;
  tableTop.castShadow = true;
  tableTop.receiveShadow = true;
  group.add(futonSkirt, tableTop);

  // Mother's Steaming Bowl of Toshikoshi Soba ("母の作った年越しそば")
  const sobaGroup = new THREE.Group();
  sobaGroup.position.set(-0.22, 0.40, 0.24);
  const bowlMat = new THREE.MeshStandardMaterial({ color: 0x1e1b18, roughness: 0.28, metalness: 0.15 });
  const bowlOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.056, 0.075, 24), bowlMat);
  bowlOuter.position.y = 0.038;
  const brothDisc = new THREE.Mesh(
    new THREE.CircleGeometry(0.088, 24),
    new THREE.MeshStandardMaterial({ color: 0x3b2410, roughness: 0.12, metalness: 0.08 })
  );
  brothDisc.rotation.x = -Math.PI / 2;
  brothDisc.position.y = 0.068;
  // Buckwheat soba noodle strands
  const noodleMat = new THREE.MeshStandardMaterial({ color: 0x8b7355, roughness: 0.58 });
  for (let i = 0; i < 8; i++) {
    const n = new THREE.Mesh(new THREE.TorusGeometry(0.032 + (i % 3) * 0.012, 0.0045, 6, 14), noodleMat);
    n.rotation.x = Math.PI / 2;
    n.position.set((i - 3.5) * 0.006, 0.071, ((i * 7) % 5 - 2) * 0.008);
    sobaGroup.add(n);
  }
  // Crisp roasted nori sheet (Atlas 65!) & green chopped negi rings
  const nori = new THREE.Mesh(
    new THREE.BoxGeometry(0.042, 0.002, 0.052),
    pbr.get('roastedCrispNoriSheet', { repeatX: 1, repeatY: 1 })
  );
  nori.position.set(-0.035, 0.078, -0.025);
  nori.rotation.set(0.32, 0.4, 0.1);
  const negiMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.45 });
  for (let i = 0; i < 7; i++) {
    const negi = new THREE.Mesh(new THREE.TorusGeometry(0.006, 0.0022, 6, 10), negiMat);
    negi.rotation.x = Math.PI / 2;
    negi.position.set((i - 3) * 0.011, 0.075, ((i * 5) % 3 - 1) * 0.014);
    sobaGroup.add(negi);
  }
  // Wooden chopsticks resting across bowl rim
  const chopMat = new THREE.MeshStandardMaterial({ color: 0xd6b078, roughness: 0.6 });
  const chop1 = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.0038, 0.21, 8), chopMat);
  chop1.rotation.z = Math.PI / 2; chop1.position.set(0.02, 0.078, 0.075);
  const chop2 = chop1.clone(); chop2.position.z = 0.085; chop2.rotation.y = 0.06;

  // Rising warm steam wisps above the soba bowl
  const steamWisps = [];
  for (let i = 0; i < 6; i++) {
    const sm = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, depthWrite: false });
    const sp = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 8), sm);
    sobaGroup.add(sp);
    steamWisps.push({ mesh: sp, mat: sm, idx: i });
  }
  sobaGroup.add(bowlOuter, brothDisc, nori, chop1, chop2);
  group.add(sobaGroup);

  // Father's Woven Bamboo Mikan Basket ("みかんの籠を黙って湊の方へ押しやってくれた")
  const mikanBasket = new THREE.Group();
  mikanBasket.position.set(0.04, 0.40, -0.18);
  const basketMat = new THREE.MeshStandardMaterial({ color: 0xb47b3c, roughness: 0.85 });
  const basketRim = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.088, 0.056, 20), basketMat);
  basketRim.position.y = 0.028;
  mikanBasket.add(basketRim);
  const mikanMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.42 });
  const stemMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });
  const mikanOffsets = [
    [-0.04, 0.052, -0.02], [0.04, 0.052, -0.02], [0.0, 0.052, 0.04],
    [-0.03, 0.056, 0.03], [0.035, 0.056, 0.028], [0.0, 0.088, 0.005],
  ];
  for (const [mx, my, mz] of mikanOffsets) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.032, 14, 12), mikanMat);
    m.scale.set(1.0, 0.82, 1.0);
    m.position.set(mx, my, mz);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.004, 0.006, 6), stemMat);
    stem.position.set(mx, my + 0.026, mz);
    mikanBasket.add(m, stem);
  }
  group.add(mikanBasket);

  // Green tea cup + Father's folded newspaper
  const teaCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.034, 0.028, 0.068, 16),
    pbr.get('ceramicGlazeCream', { repeatX: 1, repeatY: 1, tint: 0xd9e5d6 })
  );
  teaCup.position.set(0.28, 0.434, -0.22);
  group.add(teaCup);

  function updateSteam(t) {
    for (const s of steamWisps) {
      const c = (t * 0.55 + s.idx / 6) % 1.0;
      s.mesh.position.set(Math.sin(t * 2 + s.idx) * 0.02, 0.09 + c * 0.20, Math.cos(t * 1.7 + s.idx) * 0.02);
      s.mesh.scale.setScalar(0.6 + c * 1.5);
      s.mat.opacity = Math.sin(c * Math.PI) * 0.24;
    }
  }

  return { group, sobaGroup, mikanBasket, updateSteam };
}
