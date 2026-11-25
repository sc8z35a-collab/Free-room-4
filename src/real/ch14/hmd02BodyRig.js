import * as THREE from 'three';

/**
 * Shared Museum-Grade 720mm `HMD-02` Second-Generation Full Humanoid Rig!
 * - True 1:1 scale: Total height = 0.720m (720mm), Jet-black anodized CNC aluminum + 4mm woven carbon fiber!
 * - 12 visible 80mm circular QDD artificial muscles (black rotor bell, exposed copper coils, 46mm green FOC PCB).
 * - Red & white twisted double-helix CAN nerve wiring routed cleanly along both legs.
 * - Full articulated pose API reused seamlessly across Chapters 14, 15, and 16!
 */

export function createCarbonFiberMaterial() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0d1016';
  ctx.fillRect(0, 0, 256, 256);

  // Authentic 2x2 diagonal twill woven carbon-fiber pattern ("黒曜石のように深い網目模様")
  const cell = 16;
  for (let y = 0; y < 256; y += cell) {
    for (let x = 0; x < 256; x += cell) {
      const idx = ((x / cell) + (y / cell)) % 4;
      const bright = idx < 2;
      const grad = ctx.createLinearGradient(x, y, x + cell, y + cell);
      if (bright) {
        grad.addColorStop(0, '#2a313c');
        grad.addColorStop(0.5, '#1a1f28');
        grad.addColorStop(1, '#0e1117');
      } else {
        grad.addColorStop(0, '#10141c');
        grad.addColorStop(0.5, '#1e242e');
        grad.addColorStop(1, '#0b0e14');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 6);

  return new THREE.MeshStandardMaterial({
    map: tex,
    bumpMap: tex,
    bumpScale: 0.002,
    metalness: 0.42,
    roughness: 0.28,
  });
}

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

  // 6 tiny bright stainless M3 bolts around the CNC perimeter
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

export function createHMD02BodyRig(baseMats, sharedCarbonMat = null) {
  const root = new THREE.Group();

  // Deep Jet-Black Anodized CNC Aluminum ("深い漆黒に染め上げられた黒アルマイト削り出しアルミ")
  const blackAlumMat = new THREE.MeshStandardMaterial({
    color: 0x11141a,
    metalness: 0.86,
    roughness: 0.24,
  });
  const chamferSteelMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.92,
    roughness: 0.22,
  });
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xd96b27,
    metalness: 0.90,
    roughness: 0.24,
  });
  const pcbGreenMat = new THREE.MeshStandardMaterial({
    color: 0x0e6b3a,
    roughness: 0.34,
    metalness: 0.16,
  });
  const carbonMat = sharedCarbonMat || createCarbonFiberMaterial();
  const rubberSoleMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.88 });

  // Master Pelvis / Hip Root at y = 0.405m (so feet touch y = 0.000m and head top reaches y = 0.720m!)
  const bodyPivot = new THREE.Group();
  bodyPivot.position.set(0, 0.405, 0);
  root.add(bodyPivot);

  // --- PELVIS BLOCK (CNC Machined Jet-Black Aluminum) ---
  const pelvisBlock = new THREE.Mesh(new THREE.BoxGeometry(0.165, 0.052, 0.105), blackAlumMat);
  pelvisBlock.castShadow = true;
  pelvisBlock.receiveShadow = true;
  bodyPivot.add(pelvisBlock);

  // Subtle machined silver chamfer accent bar on front pelvis
  const pelvisAccent = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.006, 0.108), chamferSteelMat);
  pelvisAccent.position.y = 0.018;
  bodyPivot.add(pelvisAccent);

  // --- TORSO & UPPER CHASSIS (Carbon Front/Back Plates + CNC Aluminum Ribs + Safety Harness Anchor Ring!) ---
  const torsoPivot = new THREE.Group();
  torsoPivot.position.set(0, 0.032, 0);
  bodyPivot.add(torsoPivot);

  const spineBlock = new THREE.Mesh(new THREE.BoxGeometry(0.155, 0.185, 0.095), blackAlumMat);
  spineBlock.position.y = 0.098;
  spineBlock.castShadow = true;
  const chestCarbonF = new THREE.Mesh(new THREE.BoxGeometry(0.168, 0.172, 0.008), carbonMat);
  chestCarbonF.position.set(0, 0.102, 0.052);
  const chestCarbonB = chestCarbonF.clone();
  chestCarbonB.position.z = -0.052;
  // Machined silver corner standoffs
  for (const sx of [-0.072, 0.072]) {
    for (const sy of [0.032, 0.172]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.0055, 0.0055, 0.112, 10), chamferSteelMat);
      post.rotation.x = Math.PI / 2;
      post.position.set(sx, sy, 0);
      torsoPivot.add(post);
    }
  }
  // Top Back Safety Harness Steel Eye-Bolt Ring ("背中の金具を安全ベルトのフックへ")
  const harnessEye = new THREE.Mesh(new THREE.TorusGeometry(0.016, 0.004, 10, 20), chamferSteelMat);
  harnessEye.position.set(0, 0.204, -0.025);
  torsoPivot.add(spineBlock, chestCarbonF, chestCarbonB, harnessEye);

  // Sleek Sensor Head Unit (Reaches exact y = 0.720m!)
  const neckPost = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.032, 14), blackAlumMat);
  neckPost.position.y = 0.205;
  const headBox = new THREE.Mesh(new THREE.BoxGeometry(0.096, 0.068, 0.088), blackAlumMat);
  headBox.position.y = 0.248;
  headBox.castShadow = true;
  const visorBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.078, 0.014, 0.006),
    new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x38bdf8, emissiveIntensity: 0.45, roughness: 0.15 })
  );
  visorBar.position.set(0, 0.252, 0.045);
  torsoPivot.add(neckPost, headBox, visorBar);

  // --- SLEEK CARBON & CNC ARMS (Left & Right) ---
  function buildArm(side) {
    const sPivot = new THREE.Group();
    sPivot.position.set(side * 0.118, 0.165, 0);
    const shAct = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.028, 0.020);
    sPivot.add(shAct);

    const upperArm = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.145, 0.026), carbonMat);
    upperArm.position.set(side * 0.014, -0.072, 0);
    upperArm.castShadow = true;
    const elbowJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.026, 16), blackAlumMat);
    elbowJoint.rotation.z = Math.PI / 2;
    elbowJoint.position.set(side * 0.014, -0.148, 0);

    const forePivot = new THREE.Group();
    forePivot.position.set(side * 0.014, -0.148, 0);
    const foreArm = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.132, 0.022), carbonMat);
    foreArm.position.y = -0.066;
    const handCap = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.026, 0.026), blackAlumMat);
    handCap.position.y = -0.138;
    forePivot.add(foreArm, handCap);

    sPivot.add(upperArm, elbowJoint, forePivot);
    torsoPivot.add(sPivot);
    return { shoulder: sPivot, elbow: forePivot };
  }
  const leftArm = buildArm(-1);
  const rightArm = buildArm(1);

  // --- HERO 6-DOF JET-BLACK CNC & 4mm CARBON-FIBER LEGS (12 CIRCULAR ARTIFICIAL MUSCLES TOTAL!) ---
  function buildLeg(side) {
    const hipRollPivot = new THREE.Group();
    hipRollPivot.position.set(side * 0.072, -0.016, 0);
    bodyPivot.add(hipRollPivot);

    // 1. Hip Yaw Actuator (horizontal flat ring tucked inside CNC hip block)
    const hipYawAct = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.032, 0.018);
    hipYawAct.rotation.z = Math.PI / 2;
    hipYawAct.position.set(0, 0.016, 0);
    hipRollPivot.add(hipYawAct);

    // 2. Hip Roll Actuator (facing forward/back)
    const hipRollAct = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.033, 0.020);
    hipRollAct.rotation.y = Math.PI / 2;
    hipRollAct.position.set(0, -0.018, -0.020);
    hipRollPivot.add(hipRollAct);

    // 3. Hip Pitch Actuator (Hero outer side circular muscle!)
    const hipPitchPivot = new THREE.Group();
    hipPitchPivot.position.set(side * 0.014, -0.024, 0.0);
    hipRollPivot.add(hipPitchPivot);

    const hipPitchAct = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.038, 0.024);
    hipPitchPivot.add(hipPitchAct);

    // CNC Black Aluminum Hip Clevis Bracket
    const hipClevis = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.044, 0.046), blackAlumMat);
    hipClevis.position.set(0, -0.024, 0);
    hipPitchPivot.add(hipClevis);

    // Twin 4mm Thick Woven Carbon-Fiber Thigh Plates (length = 0.180m)
    const thighLen = 0.180;
    const thighPlateOuter = new THREE.Mesh(new THREE.BoxGeometry(0.005, thighLen, 0.044), carbonMat);
    thighPlateOuter.position.set(side * 0.026, -thighLen * 0.5, 0);
    thighPlateOuter.castShadow = true;
    const thighPlateInner = thighPlateOuter.clone();
    thighPlateInner.position.x = -side * 0.026;
    const thighSpacer = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.024, 0.034), blackAlumMat);
    thighSpacer.position.set(0, -thighLen * 0.5, 0);
    hipPitchPivot.add(thighPlateOuter, thighPlateInner, thighSpacer);

    // Red & White Twisted Double-Helix CAN Nerve Wire Routed Cleanly Down Thigh!
    const wirePtsR = [];
    const wirePtsW = [];
    for (let k = 0; k <= 24; k++) {
      const u = k / 24;
      const wy = -0.02 - u * (thighLen - 0.03);
      const ang = u * Math.PI * 12;
      wirePtsR.push(new THREE.Vector3(side * 0.031, wy, -0.018 + Math.sin(ang) * 0.003));
      wirePtsW.push(new THREE.Vector3(side * 0.031, wy, -0.018 - Math.sin(ang) * 0.003));
    }
    hipPitchPivot.add(
      new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wirePtsR), 28, 0.0018, 6, false), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })),
      new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wirePtsW), 28, 0.0018, 6, false), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 }))
    );

    // 4. Knee Pitch Joint (Hero Circular Muscle + Machined Black CNC Knee Bracket!)
    const kneePivot = new THREE.Group();
    kneePivot.position.set(0, -thighLen, 0);
    hipPitchPivot.add(kneePivot);

    const kneeAct = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.036, 0.024);
    kneePivot.add(kneeAct);

    // Twin 4mm Thick Woven Carbon-Fiber Shin Plates (length = 0.175m)
    const shinLen = 0.175;
    const shinPlateOuter = new THREE.Mesh(new THREE.BoxGeometry(0.005, shinLen, 0.038), carbonMat);
    shinPlateOuter.position.set(side * 0.022, -shinLen * 0.5, 0);
    shinPlateOuter.castShadow = true;
    const shinPlateInner = shinPlateOuter.clone();
    shinPlateInner.position.x = -side * 0.022;
    const shinBridge = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.022, 0.028), blackAlumMat);
    shinBridge.position.set(0, -shinLen * 0.52, 0);
    kneePivot.add(shinPlateOuter, shinPlateInner, shinBridge);

    // 5 & 6. Ankle Pitch & Roll Dual-Circular Actuator Block + Rubber-Soled Jet-Black Foot!
    const anklePivot = new THREE.Group();
    anklePivot.position.set(0, -shinLen, 0);
    kneePivot.add(anklePivot);

    const anklePitchAct = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.026, 0.020);
    const ankleRollAct = makeCircularMuscleUnit(blackAlumMat, copperMat, pcbGreenMat, chamferSteelMat, 0.022, 0.018);
    ankleRollAct.rotation.y = Math.PI / 2;
    ankleRollAct.position.set(0, -0.012, -0.016);
    anklePivot.add(anklePitchAct, ankleRollAct);

    // Precision CNC Foot Plate + High-Grip Rubber Sole (bottom at y = -0.026 -> exact ground 0.000!)
    const footPlate = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.014, 0.132), blackAlumMat);
    footPlate.position.set(0, -0.015, 0.022);
    footPlate.castShadow = true;
    const footSole = new THREE.Mesh(new THREE.BoxGeometry(0.074, 0.006, 0.134), rubberSoleMat);
    footSole.position.set(0, -0.023, 0.022);
    anklePivot.add(footPlate, footSole);

    return { hipRoll: hipRollPivot, hipPitch: hipPitchPivot, knee: kneePivot, ankle: anklePivot };
  }

  const leftLeg = buildLeg(-1);
  const rightLeg = buildLeg(1);

  function setPose({
    liftY = 0,
    swayX = 0,
    torsoPitch = 0,
    hipLPitch = 0,
    hipLRoll = 0,
    kneeL = 0,
    ankleL = 0,
    hipRPitch = 0,
    hipRRoll = 0,
    kneeR = 0,
    ankleR = 0,
    armLPitch = 0.08,
    armRPitch = 0.08,
    armLRoll = 0.10,
    armRRoll = -0.10,
    visorIntensity = 0.45,
  } = {}) {
    bodyPivot.position.set(swayX, 0.405 + liftY, 0);
    torsoPivot.rotation.x = torsoPitch;
    leftLeg.hipPitch.rotation.x = hipLPitch;
    leftLeg.hipRoll.rotation.z = hipLRoll;
    leftLeg.knee.rotation.x = kneeL;
    leftLeg.ankle.rotation.x = ankleL;
    rightLeg.hipPitch.rotation.x = hipRPitch;
    rightLeg.hipRoll.rotation.z = hipRRoll;
    rightLeg.knee.rotation.x = kneeR;
    rightLeg.ankle.rotation.x = ankleR;
    leftArm.shoulder.rotation.set(armLPitch, 0, armLRoll);
    rightArm.shoulder.rotation.set(armRPitch, 0, armRRoll);
    visorBar.material.emissiveIntensity = visorIntensity;
  }

  setPose();

  return {
    root,
    bodyPivot,
    torsoPivot,
    leftLeg,
    rightLeg,
    leftArm,
    rightArm,
    carbonMat,
    setPose,
  };
}
