import * as THREE from 'three';
import { createCarbonFiberMaterial } from '../ch14/hmd02BodyRig.js';

/**
 * Next-Gen Complete 16-DOF `HMD-02` Master Humanoid Rig (Chapters 17–20):
 * - Supports authentic story progression:
 *   - `hasUpperBody: false` (Ch.17–18: headless/armless 7.62kg lower-body + torso configuration!)
 *   - `hasUpperBody: true`  (Ch.19–20: complete 16-DOF 720.0mm / 8.18kg final form w/ carbon pipe arms, round rubber fists & visor head!)
 *   - `hasGoldResistor: true` (Ch.18–20: 50W 1.5Ω gold anodized aluminum metal-clad braking resistor bolted to the spine!)
 *   - `hasVibramSoles: true`  (Ch.20: thick grooved Vibram rubber outdoor hiking lug soles!)
 * - Includes 4 cobalt-blue Sorbothane anti-vibration pads under the chest IMU!
 * - Includes real-time curved `TubeGeometry` orange climbing sling belt that physically transitions
 *   from pin-taut vertical tension to a soft drooping `U`-shape (`slack01: 0 -> 1`)!
 */

function makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chromeMat, radius = 0.036, width = 0.022) {
  const g = new THREE.Group();
  const bell = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 28), blackAlumMat);
  bell.rotation.z = Math.PI / 2;
  bell.castShadow = true;

  const copper = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.72, radius * 0.12, 8, 22), copperMat);
  copper.rotation.y = Math.PI / 2;
  copper.position.x = width * 0.46;
  const copper2 = copper.clone();
  copper2.position.x = -width * 0.46;

  const pcb = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.56, radius * 0.56, width + 0.004, 22), pcbGreenMat);
  pcb.rotation.z = Math.PI / 2;

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.26, radius * 0.26, width + 0.007, 16), chromeMat);
  hub.rotation.z = Math.PI / 2;

  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.0018, 0.0018, width + 0.008, 6), chromeMat);
    b.rotation.z = Math.PI / 2;
    b.position.set(0, Math.cos(a) * radius * 0.82, Math.sin(a) * radius * 0.82);
    g.add(b);
  }
  g.add(bell, copper, copper2, pcb, hub);
  return g;
}

export function createHMD02CompleteRig(baseMats, options = {}) {
  const {
    sharedCarbonMat = null,
    hasUpperBody = true,
    hasGoldResistor = false,
    hasVibramSoles = false,
  } = options;

  const root = new THREE.Group();

  const blackAlumMat = new THREE.MeshStandardMaterial({ color: 0x11141a, metalness: 0.88, roughness: 0.22 });
  const chamferSteelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.92, roughness: 0.20 });
  const copperMat = new THREE.MeshStandardMaterial({ color: 0xd96b27, metalness: 0.90, roughness: 0.24 });
  const pcbGreenMat = new THREE.MeshStandardMaterial({ color: 0x0e6b3a, roughness: 0.34, metalness: 0.16 });
  const carbonMat = sharedCarbonMat || createCarbonFiberMaterial();
  const rubberSoleMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.88 });
  const vibramMat = new THREE.MeshStandardMaterial({ color: 0x1f242d, roughness: 0.92 });
  const goldResistorMat = new THREE.MeshStandardMaterial({
    color: 0xeab308,
    emissive: 0x92400e,
    emissiveIntensity: 0.15,
    metalness: 0.86,
    roughness: 0.26,
  });

  // Master Pelvis / Hip Root at y = 0.405m (head top = exact 0.720m!)
  const bodyPivot = new THREE.Group();
  bodyPivot.position.set(0, 0.405, 0);
  root.add(bodyPivot);

  // Pelvis Block
  const pelvisBlock = new THREE.Mesh(new THREE.BoxGeometry(0.165, 0.052, 0.105), blackAlumMat);
  pelvisBlock.castShadow = true; pelvisBlock.receiveShadow = true;
  const pelvisAccent = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.006, 0.108), chamferSteelMat);
  pelvisAccent.position.y = 0.018;
  bodyPivot.add(pelvisBlock, pelvisAccent);

  // Torso
  const torsoPivot = new THREE.Group();
  torsoPivot.position.set(0, 0.032, 0);
  bodyPivot.add(torsoPivot);

  const spineBlock = new THREE.Mesh(new THREE.BoxGeometry(0.155, 0.185, 0.095), blackAlumMat);
  spineBlock.position.y = 0.098; spineBlock.castShadow = true;
  const chestCarbonF = new THREE.Mesh(new THREE.BoxGeometry(0.168, 0.172, 0.008), carbonMat);
  chestCarbonF.position.set(0, 0.102, 0.052);
  const chestCarbonB = chestCarbonF.clone(); chestCarbonB.position.z = -0.052;
  for (const sx of [-0.072, 0.072]) {
    for (const sy of [0.032, 0.172]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.0055, 0.0055, 0.112, 10), chamferSteelMat);
      post.rotation.x = Math.PI / 2; post.position.set(sx, sy, 0);
      torsoPivot.add(post);
    }
  }
  const harnessEye = new THREE.Mesh(new THREE.TorusGeometry(0.016, 0.004, 10, 20), chamferSteelMat);
  harnessEye.position.set(0, 0.204, -0.025);
  torsoPivot.add(spineBlock, chestCarbonF, chestCarbonB, harnessEye);

  // Gold 50W 1.5Ω Metal-Clad Regenerative Braking Resistor bolted to Spine Back!
  const goldResistorGroup = new THREE.Group();
  goldResistorGroup.position.set(0, 0.11, -0.064);
  const resBody = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.032, 0.020), goldResistorMat);
  for (let i = -3; i <= 3; i++) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.0022, 0.024), goldResistorMat);
    fin.position.y = i * 0.0045;
    goldResistorGroup.add(fin);
  }
  goldResistorGroup.add(resBody);
  goldResistorGroup.visible = hasGoldResistor;
  torsoPivot.add(goldResistorGroup);

  // Upper Body: Visor Head + 4-Axis Carbon-Pipe Arms w/ Round Rubber Fists!
  const headGroup = new THREE.Group();
  const neckPost = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.032, 14), blackAlumMat);
  neckPost.position.y = 0.205;
  const headBox = new THREE.Mesh(new THREE.BoxGeometry(0.098, 0.068, 0.090), blackAlumMat);
  headBox.position.y = 0.248; headBox.castShadow = true;
  const visorBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.080, 0.015, 0.006),
    new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x38bdf8, emissiveIntensity: 0.75, roughness: 0.14 })
  );
  visorBar.position.set(0, 0.252, 0.046);
  headGroup.add(neckPost, headBox, visorBar);
  headGroup.visible = hasUpperBody;
  torsoPivot.add(headGroup);

  // Subtle status LED on top chest rim when headless (Ch.17-18) so alive breathing reads clearly
  const chestStatusLed = new THREE.Mesh(
    new THREE.BoxGeometry(0.064, 0.008, 0.008),
    new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x38bdf8, emissiveIntensity: 1.2 })
  );
  chestStatusLed.position.set(0, 0.188, 0.055);
  torsoPivot.add(chestStatusLed);

  function buildArm(side) {
    const sPivot = new THREE.Group();
    sPivot.position.set(side * 0.118, 0.165, 0);
    const shAct = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.027, 0.020);
    sPivot.add(shAct);

    const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.142, 14), carbonMat);
    upperArm.position.set(side * 0.014, -0.072, 0); upperArm.castShadow = true;
    const elbowJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.024, 16), blackAlumMat);
    elbowJoint.rotation.z = Math.PI / 2; elbowJoint.position.set(side * 0.014, -0.146, 0);

    const forePivot = new THREE.Group();
    forePivot.position.set(side * 0.014, -0.146, 0);
    const forePipe = new THREE.Mesh(new THREE.CylinderGeometry(0.0095, 0.0095, 0.135, 14), carbonMat);
    forePipe.position.y = -0.068; forePipe.castShadow = true;
    // Iconic Round Rubber Fist (`丸いゴムの拳`)!
    const rubberFist = new THREE.Mesh(new THREE.SphereGeometry(0.021, 16, 14), rubberSoleMat);
    rubberFist.position.y = -0.140; rubberFist.castShadow = true;
    forePivot.add(forePipe, rubberFist);

    sPivot.add(upperArm, elbowJoint, forePivot);
    sPivot.visible = hasUpperBody;
    torsoPivot.add(sPivot);
    return { sPivot, forePivot, rubberFist };
  }
  const armL = buildArm(-1);
  const armR = buildArm(1);

  // Full 6-DOF Legs (12 Circular Artificial Muscles + Red/White CAN Double Helix + Vibram Lug Soles!)
  function buildLeg(side) {
    const hipPitch = new THREE.Group();
    hipPitch.position.set(side * 0.088, -0.015, 0);
    bodyPivot.add(hipPitch);

    const hipRoll = new THREE.Group();
    hipPitch.add(hipRoll);

    const hipActPitch = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.036, 0.022);
    const hipActRoll = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.032, 0.020);
    hipActRoll.rotation.y = Math.PI / 2; hipActRoll.position.set(0, -0.018, -0.028);
    hipRoll.add(hipActPitch, hipActRoll);

    // Twin 4mm Woven-Carbon Thigh Plates
    for (const dx of [-0.022, 0.022]) {
      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.185, 0.044), carbonMat);
      plate.position.set(dx, -0.095, 0); plate.castShadow = true;
      hipRoll.add(plate);
    }
    const thighSpacer = new THREE.Mesh(new THREE.BoxGeometry(0.040, 0.016, 0.034), blackAlumMat);
    thighSpacer.position.set(0, -0.095, 0);
    hipRoll.add(thighSpacer);

    // Red & White Twisted Double-Helix CAN Nerve Wiring along outer thigh
    const redWireMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.45 });
    const whtWireMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.45 });
    for (let i = 0; i < 8; i++) {
      const seg = new THREE.Mesh(
        new THREE.BoxGeometry(0.0045, 0.016, 0.0055),
        i % 2 === 0 ? redWireMat : whtWireMat
      );
      seg.position.set(side * 0.028, -0.035 - i * 0.019, 0.012);
      seg.rotation.z = side * 0.25;
      hipRoll.add(seg);
    }

    const kneePivot = new THREE.Group();
    kneePivot.position.set(0, -0.185, 0);
    hipRoll.add(kneePivot);
    const kneeAct = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.035, 0.022);
    kneePivot.add(kneeAct);

    // Twin 4mm Woven-Carbon Shin Plates (`185.0 mm`!)
    for (const dx of [-0.019, 0.019]) {
      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.185, 0.038), carbonMat);
      plate.position.set(dx, -0.092, 0); plate.castShadow = true;
      kneePivot.add(plate);
    }
    const shinSpacer = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.014, 0.030), blackAlumMat);
    shinSpacer.position.set(0, -0.092, 0);
    kneePivot.add(shinSpacer);

    const anklePivot = new THREE.Group();
    anklePivot.position.set(0, -0.185, 0);
    kneePivot.add(anklePivot);
    const ankleAct = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.028, 0.020);
    anklePivot.add(ankleAct);

    // CNC Foot Plate + Thick Grooved Vibram Rubber Lug Sole!
    const footPlate = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.012, 0.138), blackAlumMat);
    footPlate.position.set(0, -0.012, 0.022); footPlate.castShadow = true;
    const footPad = new THREE.Mesh(new THREE.BoxGeometry(0.070, 0.008, 0.142), hasVibramSoles ? vibramMat : rubberSoleMat);
    footPad.position.set(0, -0.020, 0.022);
    anklePivot.add(footPlate, footPad);

    if (hasVibramSoles) {
      // Sculpted deep Vibram hiking lug tread bars underneath sole!
      for (let t = -3; t <= 3; t++) {
        const lug = new THREE.Mesh(new THREE.BoxGeometry(0.066, 0.005, 0.009), vibramMat);
        lug.position.set(0, -0.025, 0.022 + t * 0.019);
        anklePivot.add(lug);
      }
    }

    return { hipPitch, hipRoll, kneePivot, anklePivot };
  }
  const legL = buildLeg(-1);
  const legR = buildLeg(1);

  function setUpperBodyVisible(vis) {
    headGroup.visible = vis;
    armL.sPivot.visible = vis;
    armR.sPivot.visible = vis;
  }

  function setGoldResistorHeat(heat01) {
    goldResistorGroup.visible = true;
    goldResistorMat.emissiveIntensity = 0.12 + heat01 * 1.45;
  }

  function setPose(p = {}) {
    bodyPivot.position.y = 0.405 + (p.liftY ?? 0);
    bodyPivot.rotation.set(p.pelvisPitch ?? 0, p.pelvisYaw ?? 0, p.pelvisRoll ?? 0);
    torsoPivot.rotation.set(p.torsoPitch ?? 0, p.torsoYaw ?? 0, p.torsoRoll ?? 0);

    legL.hipPitch.rotation.x = p.hipLPitch ?? 0;
    legL.hipRoll.rotation.z = p.hipLRoll ?? 0;
    legL.kneePivot.rotation.x = p.kneeL ?? 0;
    legL.anklePivot.rotation.x = p.ankleL ?? 0;
    legL.anklePivot.rotation.z = p.ankleLRoll ?? 0;

    legR.hipPitch.rotation.x = p.hipRPitch ?? 0;
    legR.hipRoll.rotation.z = p.hipRRoll ?? 0;
    legR.kneePivot.rotation.x = p.kneeR ?? 0;
    legR.anklePivot.rotation.x = p.ankleR ?? 0;
    legR.anklePivot.rotation.z = p.ankleRRoll ?? 0;

    armL.sPivot.rotation.set(p.armLPitch ?? 0.05, 0, p.armLRoll ?? 0.08);
    armL.forePivot.rotation.x = p.elbowL ?? -0.18;
    armR.sPivot.rotation.set(p.armRPitch ?? 0.05, 0, p.armRRoll ?? -0.08);
    armR.forePivot.rotation.x = p.elbowR ?? -0.18;

    const vi = p.visorIntensity ?? 0.85;
    visorBar.material.emissiveIntensity = vi;
    chestStatusLed.material.emissiveIntensity = vi;
  }

  return {
    root,
    bodyPivot,
    torsoPivot,
    headGroup,
    armL,
    armR,
    legL,
    legR,
    goldResistorGroup,
    setUpperBodyVisible,
    setGoldResistorHeat,
    setPose,
  };
}

/**
 * Dynamic Real-Time Curved Orange Climbing Safety Sling Belt (`空中で柔らかなUの字にたるむ安全ベルト`)!
 * Uses a 20-segment instanced / linked ribbon curve that smoothly transitions from
 * pin-taut straight vertical tension (`slack01 = 0`) to a dramatic soft drooping U-curve (`slack01 = 1`)!
 */
export function createDynamicSlackSlingBelt(baseMats) {
  const group = new THREE.Group();
  const beltMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.72 }); // Vibrant climbing orange!
  const segCount = 24;
  const segs = [];
  for (let i = 0; i < segCount; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.058, 0.008), beltMat);
    m.castShadow = true;
    group.add(m);
    segs.push(m);
  }
  const carabiner = new THREE.Mesh(new THREE.TorusGeometry(0.020, 0.0045, 8, 18), baseMats.chromeSteel);
  group.add(carabiner);

  const pA = new THREE.Vector3();
  const pB = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const upAxis = new THREE.Vector3(0, 1, 0);
  const quat = new THREE.Quaternion();

  function updateBelt(topY = 1.76, botY = 0.67, slack01 = 0, swayX = 0) {
    // When slack01 = 0: straight vertical taut belt from topY down to botY!
    // When slack01 = 1: belt bows gracefully outward in a soft drooping U-loop along +Z/-Z & +X!
    const bowZ = slack01 * 0.24;
    const bowX = slack01 * 0.10 + swayX;
    const sagDip = slack01 * 0.22;

    const ptAt = (u, out) => {
      const s = Math.sin(u * Math.PI);
      const y = topY + (botY - topY) * u - Math.pow(s, 1.4) * sagDip;
      const z = -0.022 - s * bowZ;
      const x = Math.sin(u * Math.PI) * bowX;
      return out.set(x, y, z);
    };

    for (let i = 0; i < segCount; i++) {
      const u0 = i / segCount;
      const u1 = (i + 1) / segCount;
      ptAt(u0, pA);
      ptAt(u1, pB);
      const m = segs[i];
      m.position.lerpVectors(pA, pB, 0.5);
      dir.subVectors(pB, pA);
      const len = Math.max(0.01, dir.length());
      m.scale.set(1, (len * 1.12) / 0.058, 1);
      dir.normalize();
      quat.setFromUnitVectors(upAxis, dir);
      m.quaternion.copy(quat);
    }
    carabiner.position.set(swayX * 0.15, botY, -0.022);
  }

  updateBelt(1.76, 0.67, 0);
  return { group, updateBelt };
}
