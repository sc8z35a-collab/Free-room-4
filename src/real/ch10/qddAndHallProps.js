import * as THREE from 'three';
import { makeRoundedBoxGeo } from '../hardware.js';

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

/**
 * Builds Sakakibara Koichi's breathtaking 650mm slender titanium-gray QDD Humanoid (`Entry No. 39`)!
 * Features thin circular pocket-watch-like silver QDD planetary disc actuators at every joint
 * ("まるで懐中時計を大きくしたような薄くて丸い銀色の円盤"), slender sculpted legs,
 * dynamic cyan compliance rings that glow when absorbing impact, AND a lightning lateral cross-step recovery!
 */
export function createSakakibaraQddHumanoid(baseMats, aluSplintMat) {
  const root = new THREE.Group();
  const pivotGroup = new THREE.Group();
  root.add(pivotGroup);

  const titaniumMat = new THREE.MeshPhysicalMaterial({
    color: 0x8e99a8,
    roughness: 0.28,
    metalness: 0.78,
    clearcoat: 0.35,
  });
  const darkCarbonMat = new THREE.MeshStandardMaterial({
    color: 0x1e2430,
    roughness: 0.42,
    metalness: 0.32,
  });
  const qddDiscMat = new THREE.MeshPhysicalMaterial({
    color: 0xe6edf5,
    roughness: 0.16,
    metalness: 0.94,
    clearcoat: 0.55,
  });
  const complianceRingMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.15,
    roughness: 0.25,
    metalness: 0.4,
  });

  // Helper: Pocket-watch-like thin circular silver QDD disc actuator!
  function makeQddDisc(radius = 0.036, thickness = 0.018, axis = 'x') {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, thickness, 28), qddDiscMat);
    const bevel = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.92, thickness * 0.12, 10, 28), titaniumMat);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.62, 0.0022, 8, 24), complianceRingMat);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.26, radius * 0.26, thickness + 0.003, 18), darkCarbonMat);
    if (axis === 'x') {
      body.rotation.z = Math.PI / 2;
      bevel.rotation.y = Math.PI / 2;
      ring.rotation.y = Math.PI / 2;
      ring.position.x = thickness * 0.5 + 0.001;
      hub.rotation.z = Math.PI / 2;
    } else {
      body.rotation.x = Math.PI / 2;
      ring.position.z = thickness * 0.5 + 0.001;
      hub.rotation.x = Math.PI / 2;
    }
    body.castShadow = true;
    g.add(body, bevel, ring, hub);
    return g;
  }

  // Pelvis (height ~0.355m for a 0.65m tall slender humanoid!)
  const pelvis = new THREE.Group();
  pelvis.position.set(0, 0.355, 0);
  pivotGroup.add(pelvis);

  const pelCore = new THREE.Mesh(makeRoundedBoxGeo(0.118, 0.044, 0.068, 0.012, 2), titaniumMat);
  pelCore.castShadow = true;
  pelvis.add(pelCore);

  // Sleek Torso & Minimal Sensor Head (total standing height = 0.65m!)
  const torso = new THREE.Group();
  torso.position.set(0, 0.032, 0);
  pelvis.add(torso);

  const spineTube = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.028, 0.145, 16), darkCarbonMat);
  spineTube.position.y = 0.072;
  const chestShell = new THREE.Mesh(makeRoundedBoxGeo(0.142, 0.125, 0.078, 0.018, 2), titaniumMat);
  chestShell.position.y = 0.155;
  chestShell.castShadow = true;
  const chestVisor = new THREE.Mesh(new THREE.BoxGeometry(0.088, 0.016, 0.008), complianceRingMat);
  chestVisor.position.set(0, 0.178, 0.039);
  // Subtle rounded sensor head
  const head = new THREE.Mesh(makeRoundedBoxGeo(0.064, 0.052, 0.058, 0.018, 2), titaniumMat);
  head.position.set(0, 0.258, 0.004);
  head.castShadow = true;
  const headLens = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.010, 0.006), complianceRingMat);
  headLens.position.set(0, 0.260, 0.034);
  torso.add(spineTube, chestShell, chestVisor, head, headLens);

  // Arms with Silver Circular QDD Shoulder & Elbow Discs
  function buildQddArm(side) {
    const sh = new THREE.Group();
    sh.position.set(side * 0.094, 0.192, 0);
    sh.add(makeQddDisc(0.031, 0.017, 'x'));

    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.012, 0.125, 14), darkCarbonMat);
    upper.position.y = -0.068;
    upper.castShadow = true;
    sh.add(upper);

    const elbow = new THREE.Group();
    elbow.position.y = -0.132;
    elbow.add(makeQddDisc(0.024, 0.015, 'x'));
    const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.009, 0.118, 12), titaniumMat);
    lower.position.y = -0.062;
    elbow.add(lower);
    sh.add(elbow);
    torso.add(sh);
    return { sh, elbow };
  }
  const leftArm = buildQddArm(-1);
  const rightArm = buildQddArm(1);

  // Long Slender Legs (Thigh 0.165m + Shin 0.165m + Sleek Foot) with iconic Pocket-Watch QDD Discs!
  function buildQddLeg(side) {
    const hip = new THREE.Group();
    hip.position.set(side * 0.056, -0.012, 0);
    hip.add(makeQddDisc(0.038, 0.019, 'x'));
    const hipRollDisc = makeQddDisc(0.028, 0.015, 'z');
    hipRollDisc.position.set(side * 0.012, 0, -0.024);
    hip.add(hipRollDisc);

    const thigh = new THREE.Mesh(makeRoundedBoxGeo(0.026, 0.155, 0.034, 0.008, 2), titaniumMat);
    thigh.position.y = -0.082;
    thigh.castShadow = true;
    hip.add(thigh);

    const knee = new THREE.Group();
    knee.position.y = -0.165;
    knee.add(makeQddDisc(0.035, 0.018, 'x'));

    const shin = new THREE.Mesh(makeRoundedBoxGeo(0.022, 0.155, 0.028, 0.007, 2), darkCarbonMat);
    shin.position.y = -0.080;
    shin.castShadow = true;
    knee.add(shin);

    const ankle = new THREE.Group();
    ankle.position.y = -0.160;
    ankle.add(makeQddDisc(0.022, 0.015, 'x'));

    const foot = new THREE.Mesh(makeRoundedBoxGeo(0.052, 0.016, 0.112, 0.006, 2), titaniumMat);
    foot.position.set(0, -0.014, 0.018);
    foot.castShadow = true;
    ankle.add(foot);

    knee.add(ankle);
    hip.add(knee);
    pelvis.add(hip);
    return { hip, knee, ankle };
  }
  const leftLeg = buildQddLeg(-1);
  const rightLeg = buildQddLeg(1);

  function setComplianceGlow(intensity) {
    complianceRingMat.emissiveIntensity = 0.15 + intensity * 2.2;
  }

  function setNeutralStand() {
    pivotGroup.position.set(0, 0, 0);
    pivotGroup.rotation.set(0, 0, 0);
    pelvis.position.set(0, 0.352, 0);
    pelvis.rotation.set(0, 0, 0);
    torso.rotation.set(0, 0, 0);
    leftLeg.hip.rotation.set(-0.08, 0, 0);
    leftLeg.knee.rotation.set(0.16, 0, 0);
    leftLeg.ankle.rotation.set(-0.08, 0, 0);
    rightLeg.hip.rotation.set(-0.08, 0, 0);
    rightLeg.knee.rotation.set(0.16, 0, 0);
    rightLeg.ankle.rotation.set(-0.08, 0, 0);
    leftArm.sh.rotation.set(0.06, 0, 0.08);
    leftArm.elbow.rotation.set(-0.22, 0, 0);
    rightArm.sh.rotation.set(0.06, 0, -0.08);
    rightArm.elbow.rotation.set(-0.22, 0, 0);
    setComplianceGlow(0.15);
  }

  function setGlideWalk(phase) {
    const s = Math.sin(phase);
    const c = Math.cos(phase);
    pivotGroup.position.set(0, 0, 0);
    pivotGroup.rotation.set(0, 0, 0);
    pelvis.position.set(Math.sin(phase) * 0.012, 0.346 + Math.abs(c) * 0.008, 0);
    pelvis.rotation.set(0.04, 0, -s * 0.03);
    torso.rotation.set(0.04, -s * 0.05, 0);

    leftLeg.hip.rotation.set(-0.14 + s * 0.32, 0, 0);
    leftLeg.knee.rotation.set(0.24 + Math.max(0, -s) * 0.42, 0, 0);
    leftLeg.ankle.rotation.set(-0.10 - s * 0.14, 0, 0);

    rightLeg.hip.rotation.set(-0.14 - s * 0.32, 0, 0);
    rightLeg.knee.rotation.set(0.24 + Math.max(0, s) * 0.42, 0, 0);
    rightLeg.ankle.rotation.set(-0.10 + s * 0.14, 0, 0);

    leftArm.sh.rotation.set(-s * 0.28, 0, 0.08);
    leftArm.elbow.rotation.set(-0.28, 0, 0);
    rightArm.sh.rotation.set(s * 0.28, 0, -0.08);
    rightArm.elbow.rotation.set(-0.28, 0, 0);
    setComplianceGlow(0.25);
  }

  /**
   * Iconic Chapter 10 Shove & Cross-Step Reflex Recovery!
   * u = 0..0.28: serene glide walk
   * u = 0.28..0.46: Sakakibara shoves left shoulder hard -> compliant tendon-like crouch & lean (+X)!
   * u = 0.46..0.74: lightning left-leg cross-step in front of right leg ("シュンッ——タン、タッ！！")!
   * u = 0.74..1.00: elastic hop settle & serene resumed walking!
   */
  function setShoveAndCrossStepRecovery(uRaw) {
    const u = clamp01(uRaw);
    if (u < 0.28) {
      setGlideWalk(u * 16.0);
      pivotGroup.position.x = 0;
      return { xShift: 0, glow: 0.2 };
    }
    const imp = smooth((u - 0.28) / 0.14) * (1 - smooth((u - 0.58) / 0.24));
    const cross = smooth((u - 0.40) / 0.18) * (1 - smooth((u - 0.72) / 0.20));
    const hop = Math.sin(clamp01((u - 0.62) / 0.22) * Math.PI) * 0.032;
    const xShift = smooth((u - 0.28) / 0.50) * 0.26;

    pivotGroup.position.set(xShift, hop, 0);
    pelvis.position.set(0, 0.348 - imp * 0.068, 0); // Soft springy knee crouch absorbing shock!
    pelvis.rotation.set(0.06, 0, -imp * 0.34); // Yields gracefully to the shove!
    torso.rotation.set(0.08, cross * 0.22, imp * 0.14);

    // Left leg whips across in front of right leg to catch lateral momentum!
    leftLeg.hip.rotation.set(-0.25 - cross * 0.48, 0, cross * 0.56);
    leftLeg.knee.rotation.set(0.45 + imp * 0.45, 0, 0);
    leftLeg.ankle.rotation.set(-0.22, 0, -cross * 0.35);

    rightLeg.hip.rotation.set(-0.18 + imp * 0.25, 0, -imp * 0.18);
    rightLeg.knee.rotation.set(0.32 + imp * 0.55, 0, 0);
    rightLeg.ankle.rotation.set(-0.14, 0, imp * 0.16);

    // Arms counter-balance instinctively like a living gymnast!
    leftArm.sh.rotation.set(-0.35, 0, 0.25 + imp * 0.75);
    leftArm.elbow.rotation.set(-0.55, 0, 0);
    rightArm.sh.rotation.set(0.18, 0, -0.25 - imp * 0.65);
    rightArm.elbow.rotation.set(-0.45, 0, 0);

    setComplianceGlow(0.25 + imp * 1.15 + cross * 0.6);
    return { xShift, glow: imp };
  }

  setNeutralStand();

  return {
    root,
    pivotGroup,
    pelvis,
    torso,
    leftLeg,
    rightLeg,
    leftArm,
    rightArm,
    setNeutralStand,
    setGlideWalk,
    setShoveAndCrossStepRecovery,
  };
}

/**
 * Extreme-Macro Spare Silver QDD Planetary Disc Actuator ("予備の丸い銀色の関節")
 * Resting on palm / pit table with feather-light backdrivable lever arm ("氷の上でコマを回すようにスルスル")!
 */
export function createSpareQddDiscMacro(baseMats) {
  const group = new THREE.Group();

  const silverMachined = new THREE.MeshPhysicalMaterial({
    color: 0xe8eff7,
    roughness: 0.15,
    metalness: 0.94,
    clearcoat: 0.6,
  });
  const copperStator = new THREE.MeshPhysicalMaterial({
    color: 0xd97706,
    roughness: 0.28,
    metalness: 0.88,
  });
  const cyanPulseMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.75,
    roughness: 0.25,
  });

  // Outer machined aluminum disc casing (diameter 84mm, thin 24mm)
  const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.022, 36), silverMachined);
  housing.castShadow = true;
  housing.receiveShadow = true;
  group.add(housing);

  // Subtle glimpse of flat pancake brushless copper windings through cooling slots!
  const statorBand = new THREE.Mesh(new THREE.CylinderGeometry(0.0425, 0.0425, 0.006, 36), copperStator);
  group.add(statorBand);

  // 8 precision perimeter M3 socket bolts
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.0028, 0.0028, 0.024, 10), baseMats.darkAnodized);
    bolt.position.set(Math.cos(a) * 0.034, 0, Math.sin(a) * 0.034);
    group.add(bolt);
  }

  // Output hub & short rotating silver lever arm!
  const rotorGroup = new THREE.Group();
  rotorGroup.position.y = 0.013;
  const outputCap = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.006, 24), baseMats.darkAnodized);
  const currentRing = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.0018, 8, 32), cyanPulseMat);
  currentRing.rotation.x = Math.PI / 2;
  const leverArm = new THREE.Mesh(makeRoundedBoxGeo(0.088, 0.006, 0.015, 0.002, 2), silverMachined);
  leverArm.position.set(0.040, 0.004, 0);
  leverArm.castShadow = true;
  rotorGroup.add(outputCap, currentRing, leverArm);
  group.add(rotorGroup);

  return { group, rotorGroup, cyanPulseMat };
}

/**
 * Builds ALL Chapter 10 Story Props (Zero Omissions!):
 * 1. Black Resin Hard Case with sculpted wavy dark urethane foam bed + twin silver latches
 * 2. Alcohol wipe cloth + L-shaped steel hex wrench
 * 3. Competitor Anodized Red & Blue CNC Metallic Robots on pit gantry stands
 * 4. 300g Soft Urethane Ceiling Pendulum on overhead gantry wire + shatter sparks
 * 5. White Official Completion Certificate Card (`規定完走証：記録 9秒12`)
 * 6. Honored Bookshelf Top Shelf with Engineering Textbooks
 * 7. Brand-New Blank University Notebook with animated handwriting stroke for `HMD-02`
 * 8. Translucent Cyan RL Virtual Training Ghost Clones
 */
export function createCh10StoryProps(baseMats, ngMats) {
  // 1. Black Resin Hard Case ("黒い樹脂製のハードケース＋波型ウレタン緩衝材")
  const hardCase = new THREE.Group();
  const caseShellMat = new THREE.MeshPhysicalMaterial({ color: 0x161920, roughness: 0.42, metalness: 0.14, clearcoat: 0.25 });
  const foamMat = new THREE.MeshStandardMaterial({ color: 0x262b34, roughness: 0.96, metalness: 0.02 });
  const caseBase = new THREE.Mesh(makeRoundedBoxGeo(0.46, 0.11, 0.32, 0.014, 2), caseShellMat);
  caseBase.position.y = 0.055;
  caseBase.castShadow = true;
  caseBase.receiveShadow = true;
  const foamBed = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.032, 0.28), foamMat);
  foamBed.position.y = 0.098;
  hardCase.add(caseBase, foamBed);

  // Sculpted wavy egg-crate foam ribs across the bottom bed!
  for (let r = 0; r < 9; r++) {
    const rib = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.41, 10), foamMat);
    rib.rotation.z = Math.PI / 2;
    rib.position.set(0, 0.114, -0.115 + r * 0.029);
    hardCase.add(rib);
  }

  // Hinged Lid with Twin Silver Latches
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, 0.11, -0.16);
  const lidMesh = new THREE.Mesh(makeRoundedBoxGeo(0.46, 0.055, 0.32, 0.014, 2), caseShellMat);
  lidMesh.position.set(0, 0.028, 0.16);
  lidMesh.castShadow = true;
  const lidFoam = new THREE.Mesh(new THREE.BoxGeometry(0.41, 0.018, 0.27), foamMat);
  lidFoam.position.set(0, 0.008, 0.16);
  lidPivot.add(lidMesh, lidFoam);
  for (const lx of [-0.14, 0.14]) {
    const latch = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.032, 0.016), baseMats.chromeSteel);
    latch.position.set(lx, 0.002, 0.324);
    lidPivot.add(latch);
  }
  const handle = new THREE.Mesh(makeRoundedBoxGeo(0.12, 0.018, 0.024, 0.005, 2), baseMats.darkAnodized);
  handle.position.set(0, 0.055, 0.172);
  hardCase.add(lidPivot, handle);

  // 2. Alcohol Wipe Cloth & 2.5mm Steel Hex Wrench
  const maintenanceTools = new THREE.Group();
  const cloth = new THREE.Mesh(makeRoundedBoxGeo(0.085, 0.006, 0.075, 0.003, 2), new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.92 }));
  cloth.position.set(-0.22, 0.004, 0.08);
  cloth.rotation.y = 0.28;
  const hexLong = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 0.078, 6), baseMats.chromeSteel);
  hexLong.rotation.z = Math.PI / 2;
  hexLong.position.set(0.18, 0.004, 0.12);
  const hexShort = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 0.024, 6), baseMats.chromeSteel);
  hexShort.rotation.x = Math.PI / 2;
  hexShort.position.set(0.218, 0.004, 0.132);
  maintenanceTools.add(cloth, hexLong, hexShort);

  // 3. Competitor Shiny Anodized Red & Blue CNC Metallic Robots on Gantry Stands!
  function makeCncCompetitor(colorHex) {
    const g = new THREE.Group();
    const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.012, 0.18), baseMats.brushedAlu);
    const standPole = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.52, 12), baseMats.chromeSteel);
    standPole.position.set(0, 0.26, -0.06);
    const standHook = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.014, 0.09), baseMats.chromeSteel);
    standHook.position.set(0, 0.51, -0.02);
    g.add(standBase, standPole, standHook);

    const anoMat = new THREE.MeshPhysicalMaterial({ color: colorHex, roughness: 0.16, metalness: 0.90, clearcoat: 0.7 });
    const torso = new THREE.Mesh(makeRoundedBoxGeo(0.13, 0.14, 0.08, 0.012, 2), anoMat);
    torso.position.y = 0.34;
    const head = new THREE.Mesh(makeRoundedBoxGeo(0.06, 0.05, 0.055, 0.01, 2), anoMat);
    head.position.y = 0.445;
    for (const sx of [-1, 1]) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.18, 0.032), anoMat);
      arm.position.set(sx * 0.09, 0.30, 0);
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.21, 0.044), anoMat);
      leg.position.set(sx * 0.042, 0.16, 0);
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.016, 0.095), baseMats.chromeSteel);
      foot.position.set(sx * 0.042, 0.048, 0.015);
      g.add(arm, leg, foot);
    }
    g.add(torso, head);
    return g;
  }
  const redCncBot = makeCncCompetitor(0xdc2626);
  const blueCncBot = makeCncCompetitor(0x2563eb);

  // 4. 300g Soft Urethane Ceiling Pendulum ("天井から吊るされた300g柔らかいウレタン巻きの振り子")
  const pendulumPivot = new THREE.Group();
  pendulumPivot.position.set(-0.02, 2.25, 0.0);
  const pWire = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.0022, 2.02, 8), baseMats.chromeSteel);
  pWire.position.y = -1.01;
  const pBob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.044, 0.044, 0.095, 20),
    new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.88 }) // Soft urethane foam yellow-gold wrap!
  );
  pBob.rotation.z = Math.PI / 2;
  pBob.position.y = -2.02;
  pBob.castShadow = true;
  pendulumPivot.add(pWire, pBob);

  // Shatter Spark Burst + Flying Broken Gear Teeth for "パキィンッ、ギャリリッ！！"
  const shatterGroup = new THREE.Group();
  const shatterTeeth = [];
  for (let i = 0; i < 10; i++) {
    const tMesh = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.006, 0.005), baseMats.chromeSteel);
    shatterGroup.add(tMesh);
    shatterTeeth.push(tMesh);
  }
  const shatterFlash = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.042, 0),
    new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.9 })
  );
  shatterGroup.add(shatterFlash);
  shatterGroup.visible = false;

  // 5. White Official Completion Certificate Card ("規定完走証：記録 9秒12")
  const certC = document.createElement('canvas');
  certC.width = 512; certC.height = 360;
  const cx = certC.getContext('2d');
  cx.fillStyle = '#f8f6ee'; cx.fillRect(0, 0, 512, 360);
  cx.strokeStyle = '#1e3a8a'; cx.lineWidth = 10; cx.strokeRect(16, 16, 480, 328);
  cx.strokeStyle = '#ca8a04'; cx.lineWidth = 3; cx.strokeRect(26, 26, 460, 308);
  cx.fillStyle = '#1e3a8a'; cx.font = '900 36px serif'; cx.fillText('規 定 完 走 証', 132, 82);
  cx.fillStyle = '#334155'; cx.font = '700 22px sans-serif';
  cx.fillText('第19回 全日本アマチュア二足歩行競技会', 52, 126);
  cx.fillStyle = '#0f172a'; cx.font = '800 26px sans-serif';
  cx.fillText('No.38  佐伯 湊  （機体：HMD-01）', 58, 178);
  cx.fillStyle = '#b91c1c'; cx.font = '900 54px monospace';
  cx.fillText('記録  9秒12', 94, 250);
  cx.fillStyle = '#475569'; cx.font = '600 18px sans-serif';
  cx.fillText('自立起き上がり ＆ 3.0m直線自律歩行 完走認定', 64, 298);
  // Gold emblem seal
  cx.fillStyle = '#eab308'; cx.beginPath(); cx.arc(432, 272, 28, 0, Math.PI * 2); cx.fill();
  const certTex = new THREE.CanvasTexture(certC); certTex.colorSpace = THREE.SRGBColorSpace;
  const certCard = new THREE.Mesh(
    new THREE.BoxGeometry(0.145, 0.102, 0.003),
    new THREE.MeshStandardMaterial({ map: certTex, color: 0xd4cfc2, roughness: 0.92 })
  );

  // 6. Brand-New Blank University Notebook with Dynamic Handwriting (`HMD-02`)!
  const nbC = document.createElement('canvas');
  nbC.width = 1024; nbC.height = 720;
  const nx = nbC.getContext('2d');
  const nbTex = new THREE.CanvasTexture(nbC);
  nbTex.colorSpace = THREE.SRGBColorSpace;
  let lastNbProg = -1;
  function updateHmd02Notebook(progress) {
    const p = clamp01(progress);
    if (Math.abs(p - lastNbProg) < 0.015) return;
    lastNbProg = p;
    nx.fillStyle = '#ebe6d8'; nx.fillRect(0, 0, 1024, 720);
    // Crisp ruled notebook lines + center fold crease
    nx.strokeStyle = 'rgba(100,116,139,0.28)'; nx.lineWidth = 2;
    for (let y = 76; y < 680; y += 34) {
      nx.beginPath(); nx.moveTo(42, y); nx.lineTo(982, y); nx.stroke();
    }
    nx.fillStyle = 'rgba(15,23,42,0.12)'; nx.fillRect(508, 0, 8, 720);

    // Date & Budget header cleanly separated left & right of center crease!
    nx.fillStyle = '#334155'; nx.font = '700 21px monospace';
    nx.fillText('DAY 215 · NOV 06 | ¥316,120', 558, 62);
    nx.fillStyle = '#475569'; nx.font = '600 20px sans-serif';
    nx.fillText('第二世代機 開発ノート — QDD ＆ 強化学習', 54, 62);

    // Bold Graphite Center Title: "HMD-02" revealed smoothly stroke by stroke!
    const text = 'HMD-02';
    const chars = Math.ceil(p * text.length);
    if (chars > 0) {
      nx.save();
      nx.fillStyle = '#0f172a';
      nx.font = '900 132px serif';
      nx.fillText(text.slice(0, chars), 252, 368);
      if (p > 0.72) {
        nx.strokeStyle = '#0f172a'; nx.lineWidth = 6;
        nx.beginPath();
        nx.moveTo(246, 396);
        nx.lineTo(246 + smooth((p - 0.72) / 0.25) * 532, 396);
        nx.stroke();
      }
      if (p > 0.88) {
        nx.fillStyle = '#1e3a8a'; nx.font = '700 26px sans-serif';
        nx.fillText('全高 70cm超 · 準ダイレクトドライブ (QDD) · 強化学習自律二足歩行', 158, 456);
      }
      nx.restore();
    }
    nbTex.needsUpdate = true;
  }
  updateHmd02Notebook(0);
  const hmd02Notebook = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.010, 0.225),
    new THREE.MeshStandardMaterial({ map: nbTex, color: 0xcfc9ba, roughness: 0.94 })
  );
  hmd02Notebook.receiveShadow = true;

  // Mechanical pencil poised to write `HMD-02`
  const mechPencil = new THREE.Group();
  const mpBody = new THREE.Mesh(new THREE.CylinderGeometry(0.0042, 0.0042, 0.14, 12), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.4 }));
  mpBody.position.y = 0.07;
  const mpTip = new THREE.Mesh(new THREE.ConeGeometry(0.0042, 0.018, 12), baseMats.chromeSteel);
  mpTip.rotation.x = Math.PI;
  mpTip.position.y = -0.008;
  mechPencil.add(mpBody, mpTip);

  // 7. Translucent Cyan RL Virtual Ghost Clones (for Sakakibara's "仮想空間に何千体もの分身")
  const rlGhostGroup = new THREE.Group();
  const ghostMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.38 });
  const rlGhosts = [];
  for (let gx = -2; gx <= 2; gx++) {
    for (let gz = -1; gz <= 1; gz++) {
      if (gx === 0 && gz === 0) continue;
      const gg = new THREE.Group();
      const gt = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.036, 0.014), ghostMat);
      gt.position.y = 0.072;
      const gl1 = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.056, 0.008), ghostMat);
      gl1.position.set(-0.008, 0.028, 0);
      const gl2 = gl1.clone(); gl2.position.x = 0.008;
      gg.add(gt, gl1, gl2);
      gg.position.set(gx * 0.072, 0.01, -0.14 + gz * 0.068);
      rlGhostGroup.add(gg);
      rlGhosts.push(gg);
    }
  }
  rlGhostGroup.visible = false;

  return {
    hardCase,
    lidPivot,
    maintenanceTools,
    redCncBot,
    blueCncBot,
    pendulumPivot,
    shatterGroup,
    shatterTeeth,
    shatterFlash,
    certCard,
    hmd02Notebook,
    updateHmd02Notebook,
    mechPencil,
    rlGhostGroup,
    rlGhosts,
  };
}
