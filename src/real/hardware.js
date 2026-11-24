import * as THREE from 'three';

export function makeRoundedBoxGeo(w, h, d, bevel = 0.003, steps = 2) {
  const shape = new THREE.Shape();
  const hw = Math.max(0.001, w * 0.5 - bevel);
  const hh = Math.max(0.001, h * 0.5 - bevel);
  shape.moveTo(-hw, -hh);
  shape.lineTo(hw, -hh);
  shape.lineTo(hw, hh);
  shape.lineTo(-hw, hh);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.001, d - bevel * 2),
    bevelEnabled: true,
    bevelSegments: steps,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
  });
  geo.center();
  return geo;
}

function makeWireTube(points, radius, mat, tubularSegments = 24) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const geo = new THREE.TubeGeometry(curve, tubularSegments, radius, 8, false);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  return mesh;
}

/**
 * Feetech STS3215 Serial Bus Smart Servo (12V, 30 kg·cm, 12-bit Magnetic Encoder)
 * Smooth chamfered polyamide housing, 4 stainless hex bolts, brass spline, rotatable white circular horn.
 */
export function createSTS3215Servo(mats, scale = 1.0) {
  const root = new THREE.Group();
  root.scale.setScalar(scale);

  // Main chamfered black body (45.2mm x 35mm x 24.7mm)
  const bodyGeo = makeRoundedBoxGeo(0.0452, 0.035, 0.0247, 0.0022, 3);
  const body = new THREE.Mesh(bodyGeo, mats.servoBody);
  body.castShadow = true;
  body.receiveShadow = true;
  root.add(body);

  // Side spec label decal strip
  const label = new THREE.Mesh(new THREE.PlaneGeometry(0.032, 0.016), mats.darkAnodized);
  label.position.set(0, -0.001, 0.0125);
  root.add(label);

  // 4 Corner stainless M2 socket cap bolts on top face
  const boltGeo = new THREE.CylinderGeometry(0.0016, 0.0016, 0.0025, 12);
  for (const [bx, bz] of [
    [-0.018, -0.009],
    [0.018, -0.009],
    [-0.018, 0.009],
    [0.018, 0.009],
  ]) {
    const bolt = new THREE.Mesh(boltGeo, mats.chromeSteel);
    bolt.position.set(bx, 0.018, bz);
    root.add(bolt);
  }

  // Rear Dual 3-Pin Half-Duplex UART Daisy-Chain Ports
  const portGeo = new THREE.BoxGeometry(0.009, 0.006, 0.005);
  for (const pz of [-0.0055, 0.0055]) {
    const port = new THREE.Mesh(portGeo, mats.servoHornWhite);
    port.position.set(-0.0225, -0.009, pz);
    root.add(port);
  }

  // Stepped output bearing boss + 25T brass spline
  const bearingBoss = new THREE.Mesh(new THREE.CylinderGeometry(0.0075, 0.0082, 0.0035, 24), mats.darkAnodized);
  bearingBoss.position.set(0.011, 0.0188, 0);
  root.add(bearingBoss);

  const spline = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.005, 20), mats.brass);
  spline.position.set(0.011, 0.021, 0);
  root.add(spline);

  // Rotatable White Circular Servo Horn (180.0° = Goal Position 2048)
  const hornPivot = new THREE.Group();
  hornPivot.position.set(0.011, 0.0225, 0);

  const hornDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.0108, 0.0108, 0.0026, 32), mats.servoHornWhite);
  hornDisc.castShadow = true;
  hornPivot.add(hornDisc);

  const centerHub = new THREE.Mesh(new THREE.CylinderGeometry(0.0042, 0.0045, 0.0036, 20), mats.servoHornWhite);
  centerHub.position.y = 0.0008;
  hornPivot.add(centerHub);

  const centerScrew = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.0042, 14), mats.chromeSteel);
  centerScrew.position.y = 0.0012;
  hornPivot.add(centerScrew);

  // 8 Radial M2 tapping holes + crisp red index pointer for clear visual rotation readout
  const holeGeo = new THREE.CylinderGeometry(0.0009, 0.0009, 0.003, 10);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const hole = new THREE.Mesh(holeGeo, mats.darkAnodized);
    hole.position.set(Math.cos(a) * 0.0076, 0.0002, Math.sin(a) * 0.0076);
    hornPivot.add(hole);
  }

  const indexBar = new THREE.Mesh(new THREE.BoxGeometry(0.0092, 0.0008, 0.0018), mats.wireRed);
  indexBar.position.set(0.005, 0.0016, 0);
  hornPivot.add(indexBar);

  root.add(hornPivot);

  return {
    root,
    hornPivot,
    setHornAngle(rad) {
      hornPivot.rotation.y = rad;
    },
  };
}

/**
 * Bambu Lab A1 3D Printer + Home-Center Concrete Paver Slab (¥450) + Anti-Vibration Rubber Pads (¥980)
 */
export function createBambuLabA1(mats) {
  const root = new THREE.Group();

  // 4 Anti-vibration washing-machine rubber pads (bottom)
  const padGeo = new THREE.CylinderGeometry(0.036, 0.038, 0.016, 20);
  for (const [px, pz] of [
    [-0.16, -0.16],
    [0.16, -0.16],
    [-0.16, 0.16],
    [0.16, 0.16],
  ]) {
    const pad = new THREE.Mesh(padGeo, mats.rubberBlack);
    pad.position.set(px, 0.008, pz);
    pad.castShadow = true;
    pad.receiveShadow = true;
    root.add(pad);
  }

  // Concrete Paver Slab (400 x 400 x 35mm)
  const slab = new THREE.Mesh(makeRoundedBoxGeo(0.41, 0.034, 0.41, 0.003, 2), mats.concrete);
  slab.position.y = 0.033;
  slab.castShadow = true;
  slab.receiveShadow = true;
  root.add(slab);

  // Printer Base Housing
  const baseY = 0.05;
  const chassis = new THREE.Mesh(makeRoundedBoxGeo(0.33, 0.052, 0.36, 0.006, 3), mats.bambuWhite);
  chassis.position.set(0, baseY + 0.026, 0);
  chassis.castShadow = true;
  chassis.receiveShadow = true;
  root.add(chassis);

  // Y-Axis Linear Rail + Moving Gold PEI Heated Bed (256 x 256mm)
  const yRail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.014, 0.35), mats.darkAnodized);
  yRail.position.set(0, baseY + 0.056, 0);
  root.add(yRail);

  const yBed = new THREE.Group();
  yBed.position.set(0, baseY + 0.068, 0);
  const bedAlu = new THREE.Mesh(makeRoundedBoxGeo(0.262, 0.006, 0.262, 0.002, 2), mats.brushedAlu);
  yBed.add(bedAlu);
  const peiSheet = new THREE.Mesh(new THREE.BoxGeometry(0.256, 0.002, 0.256), mats.peiGold);
  peiSheet.position.y = 0.004;
  peiSheet.receiveShadow = true;
  yBed.add(peiSheet);

  // Growing 3D-printed matte black PLA right-leg bracket on PEI bed
  const printedPart = new THREE.Group();
  printedPart.position.set(0, 0.005, 0);
  const partBase = new THREE.Mesh(makeRoundedBoxGeo(0.048, 0.055, 0.038, 0.002, 2), mats.printedPLA);
  partBase.position.y = 0.0275;
  partBase.castShadow = true;
  printedPart.add(partBase);
  const partArmL = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.068, 0.032), mats.printedPLA);
  partArmL.position.set(-0.021, 0.062, 0);
  printedPart.add(partArmL);
  const partArmR = partArmL.clone();
  partArmR.position.x = 0.021;
  printedPart.add(partArmR);
  yBed.add(printedPart);
  root.add(yBed);

  // Twin Z-Axis Brushed Aluminum Columns + Top Bridge
  for (const sx of [-1, 1]) {
    const col = new THREE.Mesh(makeRoundedBoxGeo(0.032, 0.36, 0.042, 0.003, 2), mats.brushedAlu);
    col.position.set(sx * 0.165, baseY + 0.22, -0.02);
    col.castShadow = true;
    root.add(col);
  }
  const topBar = new THREE.Mesh(makeRoundedBoxGeo(0.365, 0.028, 0.046, 0.003, 2), mats.bambuWhite);
  topBar.position.set(0, baseY + 0.405, -0.02);
  topBar.castShadow = true;
  root.add(topBar);

  // Top Spool Holder + Matte Black PLA 1kg Spool
  const spoolMount = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.09, 16), mats.darkAnodized);
  spoolMount.rotation.x = Math.PI / 2;
  spoolMount.position.set(0.05, baseY + 0.455, -0.04);
  root.add(spoolMount);

  const spoolFlangeGeo = new THREE.CylinderGeometry(0.088, 0.088, 0.005, 32);
  for (const sz of [-0.03, 0.03]) {
    const fl = new THREE.Mesh(spoolFlangeGeo, mats.darkAnodized);
    fl.rotation.x = Math.PI / 2;
    fl.position.set(0.05, baseY + 0.49, -0.04 + sz);
    fl.castShadow = true;
    root.add(fl);
  }
  const plaWindings = new THREE.Mesh(new THREE.CylinderGeometry(0.076, 0.076, 0.054, 28), mats.printedPLA);
  plaWindings.rotation.x = Math.PI / 2;
  plaWindings.position.set(0.05, baseY + 0.49, -0.04);
  root.add(plaWindings);

  // Moving X-Axis Gantry + White Extruder Toolhead
  const xGantry = new THREE.Group();
  xGantry.position.set(0, baseY + 0.18, -0.02);
  const xBeam = new THREE.Mesh(new THREE.BoxGeometry(0.31, 0.024, 0.028), mats.brushedAlu);
  xBeam.castShadow = true;
  xGantry.add(xBeam);

  const toolhead = new THREE.Group();
  toolhead.position.set(0, 0.004, 0.026);
  const shroud = new THREE.Mesh(makeRoundedBoxGeo(0.054, 0.068, 0.052, 0.005, 3), mats.bambuWhite);
  shroud.castShadow = true;
  toolhead.add(shroud);
  // Iconic circular extruder indicator wheel
  const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.004, 20), mats.darkAnodized);
  wheel.rotation.x = Math.PI / 2;
  wheel.position.set(0, 0.008, 0.027);
  toolhead.add(wheel);
  // Brass Hotend Nozzle
  const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.0045, 0.014, 14), mats.brass);
  nozzle.rotation.x = Math.PI;
  nozzle.position.set(0, -0.039, 0);
  toolhead.add(nozzle);

  xGantry.add(toolhead);
  root.add(xGantry);

  // Mini Front Touchscreen
  const screenHousing = new THREE.Mesh(makeRoundedBoxGeo(0.062, 0.042, 0.012, 0.002, 2), mats.darkAnodized);
  screenHousing.position.set(0.125, baseY + 0.048, 0.182);
  screenHousing.rotation.x = -0.35;
  root.add(screenHousing);

  function setPrintState(t, { active = false, progress = 0.65 } = {}) {
    const clamped = Math.max(0.01, Math.min(1, progress));
    printedPart.visible = clamped > 0.02;
    printedPart.scale.set(1, clamped, 1);

    const nozzleHeight = 0.095 + clamped * 0.088;
    if (active) {
      xGantry.position.y = baseY + nozzleHeight;
      toolhead.position.x = Math.sin(t * 15.5) * 0.024 + Math.cos(t * 27.0) * 0.008;
      yBed.position.z = Math.cos(t * 13.0) * 0.022;
      wheel.rotation.z = t * 18.0;
    } else {
      xGantry.position.y = baseY + 0.23;
      toolhead.position.x = -0.09;
      yBed.position.z = 0.04;
    }
  }

  return { root, setPrintState, printedPart };
}

/**
 * 3-DOF Prototype Right Leg v0.1 (Hip Pitch / Knee Pitch / Ankle Pitch, 220mm total)
 * Clamped to the front edge of Minato's walnut desk + Rookie Mistake Bracket Props!
 */
export function createPrototypeRightLeg(mats) {
  const root = new THREE.Group();

  // Heavy Anodized C-Clamp gripping desk edge (local y=0 = top surface of 28mm desk)
  const clampTop = new THREE.Mesh(makeRoundedBoxGeo(0.056, 0.014, 0.068, 0.002, 2), mats.darkAnodized);
  clampTop.position.set(0, 0.007, 0);
  clampTop.castShadow = true;
  root.add(clampTop);

  const clampSpine = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.072, 0.018), mats.darkAnodized);
  clampSpine.position.set(0, -0.022, 0.028);
  root.add(clampSpine);

  const clampScrew = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.045, 12), mats.chromeSteel);
  clampScrew.position.set(0, -0.052, 0.005);
  root.add(clampScrew);

  // Pelvis Test Mount + Servo 1 (Hip Pitch)
  const hipMount = new THREE.Mesh(makeRoundedBoxGeo(0.062, 0.042, 0.052, 0.003, 2), mats.printedPLA);
  hipMount.position.set(0, 0.032, 0.032);
  hipMount.castShadow = true;
  root.add(hipMount);

  const servoHip = createSTS3215Servo(mats, 0.95);
  servoHip.root.rotation.z = Math.PI / 2;
  servoHip.root.position.set(0.006, 0.028, 0.055);
  root.add(servoHip.root);

  // Hip Pitch Joint -> Thigh Frame (L1 = 93mm)
  const hipPivot = new THREE.Group();
  hipPivot.position.set(0, 0.022, 0.058);
  root.add(hipPivot);

  for (const sx of [-0.021, 0.021]) {
    const sidePlate = new THREE.Mesh(makeRoundedBoxGeo(0.0045, 0.098, 0.028, 0.0015, 2), mats.printedPLA);
    sidePlate.position.set(sx, -0.046, 0);
    sidePlate.castShadow = true;
    hipPivot.add(sidePlate);
  }
  const thighBridge = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.018, 0.026), mats.printedPLA);
  thighBridge.position.set(0, -0.046, -0.011);
  hipPivot.add(thighBridge);

  // Daisy-chain TTL cable along thigh
  hipPivot.add(
    makeWireTube(
      [
        [0.016, -0.01, -0.012],
        [0.025, -0.046, -0.016],
        [0.016, -0.088, -0.012],
      ],
      0.0022,
      mats.wireBlack,
      14
    )
  );

  // Knee Pitch Joint -> Servo 2 + Shin Frame (L2 = 93mm)
  const kneePivot = new THREE.Group();
  kneePivot.position.set(0, -0.093, 0);
  hipPivot.add(kneePivot);

  const servoKnee = createSTS3215Servo(mats, 0.95);
  servoKnee.root.rotation.z = Math.PI / 2;
  servoKnee.root.position.set(0.006, 0, 0);
  kneePivot.add(servoKnee.root);

  for (const sx of [-0.02, 0.02]) {
    const shinPlate = new THREE.Mesh(makeRoundedBoxGeo(0.0045, 0.096, 0.026, 0.0015, 2), mats.printedPLA);
    shinPlate.position.set(sx, -0.047, 0);
    shinPlate.castShadow = true;
    kneePivot.add(shinPlate);
  }
  kneePivot.add(
    makeWireTube(
      [
        [-0.016, -0.01, -0.012],
        [-0.024, -0.048, -0.015],
        [-0.016, -0.088, -0.012],
      ],
      0.0022,
      mats.wireBlack,
      14
    )
  );

  // Ankle Pitch Joint -> Servo 3 + Foot Sole Plate (34mm height, 105mm length)
  const anklePivot = new THREE.Group();
  anklePivot.position.set(0, -0.093, 0);
  kneePivot.add(anklePivot);

  const servoAnkle = createSTS3215Servo(mats, 0.92);
  servoAnkle.root.rotation.z = Math.PI / 2;
  servoAnkle.root.position.set(0.005, -0.006, 0);
  anklePivot.add(servoAnkle.root);

  const footSole = new THREE.Mesh(makeRoundedBoxGeo(0.064, 0.007, 0.108, 0.002, 2), mats.printedPLA);
  footSole.position.set(0, -0.032, 0.016);
  footSole.castShadow = true;
  anklePivot.add(footSole);

  // Flawed v0.0 Rookie Mistake Props (2.0mm thin L-cantilever bracket & M2.5 screw)
  const flawGroup = new THREE.Group();
  const lVert = new THREE.Mesh(new THREE.BoxGeometry(0.0022, 0.052, 0.026), mats.printedPLA);
  lVert.position.set(0, 0.026, 0);
  lVert.castShadow = true;
  const lBase = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.003, 0.026), mats.printedPLA);
  lBase.position.set(0.018, 0.0015, 0);
  flawGroup.add(lVert, lBase);

  const m25Screw = new THREE.Mesh(new THREE.CylinderGeometry(0.0014, 0.0014, 0.012, 12), mats.chromeSteel);
  m25Screw.rotation.z = 0.45;
  m25Screw.position.set(0.022, 0.008, 0.018);
  flawGroup.add(m25Screw);

  function setAngles(hipRad, kneeRad, ankleRad) {
    hipPivot.rotation.x = hipRad;
    kneePivot.rotation.x = kneeRad;
    anklePivot.rotation.x = ankleRad;
  }

  return {
    root,
    hipPivot,
    kneePivot,
    anklePivot,
    flawGroup,
    lVert,
    setAngles,
  };
}

/**
 * Day 009 Eraser + Wooden Chopsticks 4-DOF vs 6-DOF Ankle-Roll Demonstration Model
 */
export function createEraserChopstickRig(mats) {
  const root = new THREE.Group();
  const chopstickMat = new THREE.MeshStandardMaterial({ color: 0xdcc296, roughness: 0.72 });
  const sleeveBlue = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.55 });

  const makeFootLeg = (side) => {
    // Pivot placed on the outer edge of the eraser so edge-tipping looks physically exact!
    const edgePivot = new THREE.Group();
    edgePivot.position.set(side * 0.052, 0, 0);

    const eraserGroup = new THREE.Group();
    eraserGroup.position.set(-side * 0.014, 0.007, 0);
    const pvc = new THREE.Mesh(makeRoundedBoxGeo(0.026, 0.013, 0.055, 0.0015, 2), mats.servoHornWhite);
    pvc.castShadow = true;
    eraserGroup.add(pvc);
    const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.027, 0.0138, 0.034), sleeveBlue);
    sleeve.position.z = -0.004;
    eraserGroup.add(sleeve);
    edgePivot.add(eraserGroup);

    const ankleRollJoint = new THREE.Group();
    ankleRollJoint.position.set(-side * 0.014, 0.014, 0);
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.0026, 0.0034, 0.165, 12), chopstickMat);
    stick.position.y = 0.082;
    stick.castShadow = true;
    ankleRollJoint.add(stick);
    edgePivot.add(ankleRollJoint);

    root.add(edgePivot);
    return { edgePivot, ankleRollJoint };
  };

  const left = makeFootLeg(-1);
  const right = makeFootLeg(1);

  const pelvisBar = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.115, 12), chopstickMat);
  pelvisBar.rotation.z = Math.PI / 2;
  pelvisBar.position.set(0, 0.176, 0);
  pelvisBar.castShadow = true;
  root.add(pelvisBar);

  function updateDemo(t, hasAnkleRoll = false) {
    const sway = Math.max(0, Math.sin(t * 2.2)) * 0.34;
    if (!hasAnkleRoll) {
      // Without ankle roll: shifting CoM right tips the right eraser onto its outer edge and lifts left foot awkwardly!
      right.edgePivot.rotation.z = -sway;
      right.ankleRollJoint.rotation.z = 0;
      left.edgePivot.position.y = sway * 0.055;
      left.edgePivot.rotation.z = -sway * 0.7;
      pelvisBar.position.x = sway * 0.048;
      pelvisBar.rotation.z = Math.PI / 2 - sway * 0.85;
    } else {
      // With ankle roll opposing hip roll: right eraser sole stays 100% flat on the desk!
      right.edgePivot.rotation.z = 0;
      right.ankleRollJoint.rotation.z = -sway * 0.65;
      left.edgePivot.position.y = sway * 0.04;
      left.edgePivot.rotation.z = 0;
      left.ankleRollJoint.rotation.z = -sway * 0.65;
      pelvisBar.position.x = sway * 0.052;
      pelvisBar.rotation.z = Math.PI / 2;
    }
  }

  return { root, updateDemo };
}

/**
 * Complete Electronics & Engineering Workbench Props on Minato's Walnut Desk
 * Includes Laptop, Smartphone, Sanwa CD771 Multimeter, Hakko FX-600 Iron, Digital Caliper + Case,
 * 5mm Grid Notebook, Folded A4 Club Form, and the 3 Circuit Evolution States!
 */
export function createElectronicsBench(mats, screens) {
  const root = new THREE.Group();

  // --- 1. 14-inch Brushed Aluminum Engineering Laptop ---
  const laptop = new THREE.Group();
  laptop.position.set(-0.26, 0.006, -0.14);
  laptop.rotation.y = 0.24;

  const lapBase = new THREE.Mesh(makeRoundedBoxGeo(0.32, 0.011, 0.22, 0.002, 2), mats.brushedAlu);
  lapBase.castShadow = true;
  lapBase.receiveShadow = true;
  laptop.add(lapBase);

  const kbRecess = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.11), mats.darkAnodized);
  kbRecess.rotation.x = -Math.PI / 2;
  kbRecess.position.set(0, 0.006, -0.025);
  laptop.add(kbRecess);

  const lapLidPivot = new THREE.Group();
  lapLidPivot.position.set(0, 0.006, -0.106);
  lapLidPivot.rotation.x = -0.32; // Slightly reclined open screen

  const lapLid = new THREE.Mesh(makeRoundedBoxGeo(0.32, 0.21, 0.007, 0.002, 2), mats.brushedAlu);
  lapLid.position.set(0, 0.105, 0);
  lapLid.castShadow = true;
  lapLidPivot.add(lapLid);

  const lapScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.30, 0.188), screens.laptopMat);
  lapScreen.position.set(0, 0.106, 0.004);
  lapLidPivot.add(lapScreen);

  laptop.add(lapLidPivot);
  root.add(laptop);

  // --- 2. Sanwa CD771 Digital Multimeter + Red/Black Probes ---
  const multimeter = new THREE.Group();
  multimeter.position.set(-0.36, 0.024, 0.13);
  multimeter.rotation.set(0.14, 0.36, 0);

  const mmBody = new THREE.Mesh(makeRoundedBoxGeo(0.086, 0.036, 0.168, 0.005, 3), mats.sanwaHolster);
  mmBody.castShadow = true;
  multimeter.add(mmBody);

  const mmLcd = new THREE.Mesh(new THREE.PlaneGeometry(0.068, 0.044), screens.meterMat);
  mmLcd.rotation.x = -Math.PI / 2;
  mmLcd.position.set(0, 0.0188, -0.040);
  multimeter.add(mmLcd);

  const mmDial = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, 0.01, 24), mats.darkAnodized);
  mmDial.position.set(0, 0.019, 0.022);
  multimeter.add(mmDial);

  // Red & Black Probe Handles
  const makeProbe = (mat, px, pz, ry) => {
    const p = new THREE.Group();
    p.position.set(px, 0.008, pz);
    p.rotation.y = ry;
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.0045, 0.0055, 0.095, 14), mat);
    handle.rotation.x = Math.PI / 2;
    handle.castShadow = true;
    p.add(handle);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.0015, 0.022, 10), mats.chromeSteel);
    tip.rotation.x = -Math.PI / 2;
    tip.position.z = -0.058;
    p.add(tip);
    return p;
  };
  const probeRed = makeProbe(mats.wireRed, -0.24, 0.15, -0.35);
  const probeBlack = makeProbe(mats.wireBlack, -0.21, 0.17, -0.22);
  root.add(multimeter, probeRed, probeBlack);

  // --- 3. Hakko FX-600 Temperature-Controlled Soldering Iron & Stand ---
  const solderStation = new THREE.Group();
  solderStation.position.set(0.36, 0, -0.06);

  const standBase = new THREE.Mesh(makeRoundedBoxGeo(0.082, 0.018, 0.115, 0.003, 2), mats.darkAnodized);
  standBase.position.y = 0.009;
  standBase.castShadow = true;
  solderStation.add(standBase);

  const sponge = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.009, 0.048), mats.wireYellow);
  sponge.position.set(0, 0.02, 0.024);
  solderStation.add(sponge);

  const ironGroup = new THREE.Group();
  ironGroup.position.set(0, 0.068, -0.01);
  ironGroup.rotation.set(0.62, -0.3, 0);

  const ironHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.0095, 0.011, 0.115, 18), mats.hakkoBlue);
  ironHandle.rotation.x = Math.PI / 2;
  ironHandle.castShadow = true;
  ironGroup.add(ironHandle);

  const dialRing = new THREE.Mesh(new THREE.CylinderGeometry(0.0115, 0.0115, 0.016, 18), mats.wireYellow);
  dialRing.rotation.x = Math.PI / 2;
  dialRing.position.z = 0.015;
  ironGroup.add(dialRing);

  const ironBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.0042, 0.005, 0.068, 16), mats.chromeSteel);
  ironBarrel.rotation.x = Math.PI / 2;
  ironBarrel.position.z = -0.088;
  ironGroup.add(ironBarrel);

  const ironTip = new THREE.Mesh(new THREE.ConeGeometry(0.004, 0.024, 14), mats.solderShiny);
  ironTip.rotation.x = -Math.PI / 2;
  ironTip.position.z = -0.132;
  ironGroup.add(ironTip);

  solderStation.add(ironGroup);
  root.add(solderStation);

  // --- 4. 150mm Digital Caliper & Hard Plastic Caliper Case (on Desk Front-Right Edge!) ---
  const caliper = new THREE.Group();
  caliper.position.set(0.28, 0.004, 0.09);
  caliper.rotation.y = -0.42;
  const calBeam = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.0035, 0.014), mats.chromeSteel);
  calBeam.castShadow = true;
  caliper.add(calBeam);
  const calSlider = new THREE.Mesh(makeRoundedBoxGeo(0.056, 0.009, 0.032, 0.0015, 2), mats.darkAnodized);
  calSlider.position.set(-0.03, 0.003, 0.005);
  caliper.add(calSlider);
  root.add(caliper);

  // Caliper Case positioned near the right-leg swing zone for Day 022 01:15 AM snag!
  const caliperCase = new THREE.Mesh(makeRoundedBoxGeo(0.245, 0.026, 0.088, 0.004, 2), mats.darkAnodized);
  caliperCase.position.set(0.18, 0.013, 0.255);
  caliperCase.rotation.y = -0.12;
  caliperCase.castShadow = true;
  root.add(caliperCase);

  // --- 5. 5mm Grid Engineering Notebook + Smartphone + Folded A4 Club Form ---
  const notebook = new THREE.Mesh(makeRoundedBoxGeo(0.26, 0.006, 0.195, 0.001, 1), screens.notebookMat);
  notebook.position.set(0.22, 0.003, 0.15);
  notebook.rotation.y = -0.16;
  notebook.receiveShadow = true;
  root.add(notebook);

  const phone = new THREE.Group();
  phone.position.set(-0.08, 0.006, 0.21);
  phone.rotation.y = 0.15;
  const phBody = new THREE.Mesh(makeRoundedBoxGeo(0.074, 0.008, 0.152, 0.003, 2), mats.darkAnodized);
  phBody.castShadow = true;
  phone.add(phBody);
  const phScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.068, 0.144), screens.phoneMat);
  phScreen.rotation.x = -Math.PI / 2;
  phScreen.position.y = 0.0045;
  phone.add(phScreen);
  root.add(phone);

  const foldedForm = new THREE.Mesh(
    new THREE.BoxGeometry(0.105, 0.003, 0.148),
    new THREE.MeshStandardMaterial({ color: 0xf4f4f0, roughness: 0.85 })
  );
  foldedForm.position.set(-0.42, 0.002, 0.22);
  foldedForm.rotation.y = 0.42;
  root.add(foldedForm);

  // ===========================================================================
  // CIRCUIT STATE A: Day 006–007 Single-Axis 1Mbps Setup (ESP32-S3 + 1kΩ + Hero STS3215)
  // ===========================================================================
  const stateSingle = new THREE.Group();
  stateSingle.position.set(0.02, 0, 0.09);

  const makeESP32 = () => {
    const g = new THREE.Group();
    const pcb = new THREE.Mesh(makeRoundedBoxGeo(0.028, 0.003, 0.064, 0.001, 1), mats.pcbEsp);
    pcb.position.y = 0.009;
    pcb.castShadow = true;
    g.add(pcb);
    const rfCan = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.0032, 0.020), mats.chromeSteel);
    rfCan.position.set(0, 0.012, -0.016);
    g.add(rfCan);
    const usbC = new THREE.Mesh(makeRoundedBoxGeo(0.009, 0.0035, 0.0075, 0.0008, 2), mats.chromeSteel);
    usbC.position.set(0, 0.012, 0.030);
    g.add(usbC);
    return { group: g, usbC };
  };

  const espA = makeESP32();
  espA.group.position.set(-0.085, 0, 0.01);
  stateSingle.add(espA.group);

  // Axial 1 kΩ Carbon-Film Resistor (Tan body + color bands)
  const resistorMat = new THREE.MeshStandardMaterial({ color: 0xd9b98b, roughness: 0.45 });
  const resistor1k = new THREE.Mesh(new THREE.CylinderGeometry(0.0026, 0.0026, 0.011, 14), resistorMat);
  resistor1k.rotation.z = Math.PI / 2;
  resistor1k.position.set(-0.038, 0.014, 0.01);
  stateSingle.add(resistor1k);

  // Hero STS3215 Servo on desk (slightly scaled 1.32x for ultra-tactile macro presence!)
  const heroServo = createSTS3215Servo(mats, 1.32);
  heroServo.root.position.set(0.035, 0.023, 0.02);
  heroServo.root.rotation.y = -0.18;
  stateSingle.add(heroServo.root);

  stateSingle.add(
    makeWireTube([[-0.072, 0.012, 0.01], [-0.038, 0.014, 0.01], [0.002, 0.014, 0.02]], 0.0018, mats.wireYellow, 18),
    makeWireTube([[-0.12, 0.006, -0.04], [-0.02, 0.008, -0.01], [0.004, 0.011, 0.015]], 0.0022, mats.wireRed, 18),
    makeWireTube([[-0.12, 0.006, -0.03], [-0.075, 0.01, 0.015], [0.004, 0.011, 0.026]], 0.0022, mats.wireBlack, 18)
  );
  root.add(stateSingle);

  // ===========================================================================
  // CIRCUIT STATE B: Day 022 Solderless Breadboard + 74HC126 + Loose Black GND Pin!
  // ===========================================================================
  const stateBreadboard = new THREE.Group();
  stateBreadboard.position.set(-0.01, 0, 0.09);

  const bb = new THREE.Mesh(makeRoundedBoxGeo(0.165, 0.0095, 0.056, 0.0015, 2), mats.breadboard);
  bb.position.y = 0.0048;
  bb.castShadow = true;
  bb.receiveShadow = true;
  stateBreadboard.add(bb);

  const espB = makeESP32();
  espB.group.rotation.y = Math.PI / 2;
  espB.group.position.set(-0.046, 0.005, 0);
  stateBreadboard.add(espB.group);

  // 74HC126 DIP-14 Buffer IC straddling center channel
  const ic74hc126 = new THREE.Mesh(makeRoundedBoxGeo(0.019, 0.0045, 0.008, 0.0006, 1), mats.icPackage);
  ic74hc126.position.set(0.018, 0.0115, 0);
  ic74hc126.castShadow = true;
  stateBreadboard.add(ic74hc126);

  // Jumper wire arches
  stateBreadboard.add(
    makeWireTube([[-0.025, 0.01, -0.012], [-0.004, 0.032, -0.008], [0.014, 0.01, -0.006]], 0.0016, mats.wireYellow, 16),
    makeWireTube([[0.022, 0.01, 0.006], [0.048, 0.034, 0.012], [0.072, 0.01, 0.02]], 0.0018, mats.wireBlue, 16),
    makeWireTube([[-0.07, 0.01, -0.022], [0.0, 0.026, -0.022], [0.068, 0.01, -0.022]], 0.0022, mats.wireRed, 16)
  );

  // THE LOOSE BLACK GND JUMPER PIN (vibrates & lifts out at Day 022 01:15 AM!)
  const looseGndGroup = new THREE.Group();
  looseGndGroup.position.set(0.058, 0.01, 0.022);
  const gndPinMetal = new THREE.Mesh(new THREE.CylinderGeometry(0.0007, 0.0007, 0.009, 8), mats.chromeSteel);
  gndPinMetal.position.y = -0.002;
  looseGndGroup.add(gndPinMetal);
  const gndHousing = new THREE.Mesh(new THREE.BoxGeometry(0.0035, 0.012, 0.0035), mats.wireBlack);
  gndHousing.position.y = 0.007;
  looseGndGroup.add(gndHousing);
  looseGndGroup.add(
    makeWireTube([[0, 0.013, 0], [0.025, 0.036, 0.028], [0.065, 0.005, 0.045]], 0.0022, mats.wireBlack, 14)
  );
  stateBreadboard.add(looseGndGroup);
  root.add(stateBreadboard);

  // ===========================================================================
  // CIRCUIT STATE C: Day 024 Universal Perfboard + AWG18 + XT60 + 3A Fuse + Shiny Star-GND!
  // ===========================================================================
  const statePerfboard = new THREE.Group();
  statePerfboard.position.set(0.0, 0, 0.09);

  const perf = new THREE.Mesh(makeRoundedBoxGeo(0.095, 0.003, 0.072, 0.001, 1), mats.perfboard);
  perf.position.y = 0.012;
  perf.castShadow = true;
  statePerfboard.add(perf);

  // Brass M3 Standoffs
  for (const [sx, sz] of [[-0.042, -0.03], [0.042, -0.03], [-0.042, 0.03], [0.042, 0.03]]) {
    const standoff = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 0.011, 10), mats.brass);
    standoff.position.set(sx, 0.006, sz);
    statePerfboard.add(standoff);
  }

  const espC = makeESP32();
  espC.group.rotation.y = Math.PI / 2;
  espC.group.position.set(-0.012, 0.008, -0.012);
  statePerfboard.add(espC.group);

  // Yellow XT60 High-Current Connector
  const xt60 = new THREE.Mesh(makeRoundedBoxGeo(0.016, 0.009, 0.018, 0.0015, 2), mats.xt60Yellow);
  xt60.position.set(-0.048, 0.017, 0.018);
  xt60.castShadow = true;
  statePerfboard.add(xt60);

  // 3A Automotive Blade Fuse
  const fuse = new THREE.Mesh(
    makeRoundedBoxGeo(0.014, 0.013, 0.005, 0.001, 1),
    new THREE.MeshPhysicalMaterial({ color: 0xa855f7, transparent: true, opacity: 0.82, roughness: 0.15, clearcoat: 0.8 })
  );
  fuse.position.set(-0.022, 0.019, 0.02);
  statePerfboard.add(fuse);

  // Thick shiny silver Star-GND tinned copper busbar & conical solder fillets!
  const starBus = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.0022, 0.076, 14), mats.solderShiny);
  starBus.rotation.z = Math.PI / 2;
  starBus.position.set(0.005, 0.015, 0.026);
  statePerfboard.add(starBus);

  for (let i = 0; i < 6; i++) {
    const fillet = new THREE.Mesh(new THREE.ConeGeometry(0.0032, 0.0038, 12), mats.solderShiny);
    fillet.position.set(-0.024 + i * 0.011, 0.0152, 0.026);
    statePerfboard.add(fillet);
  }

  // Thick AWG18 Red & Black Silicone Power Cables
  statePerfboard.add(
    makeWireTube([[-0.095, 0.006, 0.022], [-0.068, 0.016, 0.022], [-0.052, 0.017, 0.021]], 0.0034, mats.wireRed, 16),
    makeWireTube([[-0.095, 0.006, 0.014], [-0.068, 0.016, 0.014], [-0.052, 0.017, 0.015]], 0.0034, mats.wireBlack, 16),
    makeWireTube([[0.036, 0.016, 0.015], [0.072, 0.022, 0.045], [0.11, 0.015, 0.12]], 0.003, mats.wireRed, 16),
    makeWireTube([[0.036, 0.016, 0.025], [0.072, 0.020, 0.052], [0.11, 0.015, 0.13]], 0.003, mats.wireBlack, 16)
  );
  root.add(statePerfboard);

  function setBenchState({
    circuit = 'single_1mbps',
    gndLift = 0,
    burnt = false,
    caliperSnag = 0,
    solderActive = false,
    t = 0,
  } = {}) {
    stateSingle.visible = circuit === 'single_1mbps';
    stateBreadboard.visible = circuit === 'breadboard_burn';
    statePerfboard.visible = circuit === 'perfboard_final';

    // Loose black GND pin lifting & vibrating
    looseGndGroup.position.y = 0.01 + gndLift * 0.0075;
    looseGndGroup.rotation.z = gndLift * 0.22 + (gndLift > 0.1 ? Math.sin(t * 48) * 0.04 : 0);

    // Cracked burnt 74HC126 swap
    ic74hc126.material = burnt ? mats.icBurnt : mats.icPackage;

    // Caliper case jolt when ankle snags it
    caliperCase.position.set(0.18 + caliperSnag * 0.018, 0.013 + caliperSnag * 0.006, 0.255 + caliperSnag * 0.012);
    caliperCase.rotation.z = caliperSnag * 0.14;

    // Soldering iron conical tip touching Star-GND fillet during Scene 12 soldering shot
    if (solderActive) {
      ironGroup.position.set(-0.295 + Math.sin(t * 2.4) * 0.008, 0.096 + Math.sin(t * 6) * 0.002, 0.265);
      ironGroup.rotation.set(-0.62, 0.55, 0);
    } else {
      ironGroup.position.set(0, 0.068, -0.01);
      ironGroup.rotation.set(0.62, -0.3, 0);
    }
  }

  // World-space anchor for white smoke rising directly from ESP32-S3 USB-C port on breadboard!
  const espSmokeLocalPos = new THREE.Vector3(-0.086, 0.022, 0.09);

  return {
    root,
    laptop,
    multimeter,
    probeRed,
    probeBlack,
    solderStation,
    ironGroup,
    caliper,
    caliperCase,
    notebook,
    phone,
    foldedForm,
    heroServo,
    espSmokeLocalPos,
    setBenchState,
  };
}

/**
 * NHK Student Robocon Best-4 Quad-Mecanum + Pneumatic Cylinder Robot (Scene 1 Clubroom)
 */
export function createRoboconMecanumMachine(mats) {
  const root = new THREE.Group();

  // Aluminum 2020/4040 T-slot perimeter chassis (0.78m x 0.78m)
  const beamGeoX = new THREE.BoxGeometry(0.78, 0.04, 0.04);
  const beamGeoZ = new THREE.BoxGeometry(0.04, 0.04, 0.78);
  for (const y of [0.11, 0.46]) {
    for (const z of [-0.36, 0.36]) {
      const bx = new THREE.Mesh(beamGeoX, mats.brushedAlu);
      bx.position.set(0, y, z);
      bx.castShadow = true;
      root.add(bx);
    }
    for (const x of [-0.36, 0.36]) {
      const bz = new THREE.Mesh(beamGeoZ, mats.brushedAlu);
      bz.position.set(x, y, 0);
      bz.castShadow = true;
      root.add(bz);
    }
  }
  for (const [x, z] of [[-0.36, -0.36], [0.36, -0.36], [-0.36, 0.36], [0.36, 0.36]]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.52, 0.04), mats.brushedAlu);
    post.position.set(x, 0.34, z);
    post.castShadow = true;
    root.add(post);
  }

  // 4 Detailed 45°-Roller Mecanum Wheels
  const rollerGeo = new THREE.CapsuleGeometry(0.018, 0.038, 6, 12);
  for (const [wx, wz, handed] of [
    [-0.41, -0.30, 1],
    [0.41, -0.30, -1],
    [-0.41, 0.30, -1],
    [0.41, 0.30, 1],
  ]) {
    const wheel = new THREE.Group();
    wheel.position.set(wx, 0.095, wz);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.056, 22), mats.darkAnodized);
    hub.rotation.z = Math.PI / 2;
    hub.castShadow = true;
    wheel.add(hub);

    for (let r = 0; r < 8; r++) {
      const a = (r / 8) * Math.PI * 2;
      const roller = new THREE.Mesh(rollerGeo, mats.rubberBlack);
      roller.position.set(0, Math.cos(a) * 0.076, Math.sin(a) * 0.076);
      roller.rotation.set(a, handed * 0.78, 0);
      wheel.add(roller);
    }
    root.add(wheel);
  }

  // Twin Stainless Pneumatic Cylinders + Blue Polyurethane Air Tubes + Red E-Stop
  for (const sx of [-0.14, 0.14]) {
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.38, 20), mats.chromeSteel);
    cyl.rotation.x = -0.38;
    cyl.position.set(sx, 0.38, 0.04);
    cyl.castShadow = true;
    root.add(cyl);

    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.24, 14), mats.solderShiny);
    rod.rotation.x = -0.38;
    rod.position.set(sx, 0.54, -0.03);
    root.add(rod);
  }

  // Compressed air reservoir tank & blue pneumatic hoses
  const airTank = new THREE.Mesh(new THREE.CapsuleGeometry(0.058, 0.26, 10, 20), mats.petBottle);
  airTank.rotation.z = Math.PI / 2;
  airTank.position.set(0, 0.20, -0.18);
  root.add(airTank);

  root.add(
    makeWireTube([[0, 0.25, -0.18], [-0.18, 0.36, -0.08], [-0.14, 0.34, 0.06]], 0.0045, mats.wireBlue, 18),
    makeWireTube([[0, 0.25, -0.18], [0.18, 0.36, -0.08], [0.14, 0.34, 0.06]], 0.0045, mats.wireBlue, 18)
  );

  const eStop = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.022, 0.022, 18), mats.wireRed);
  eStop.position.set(0.32, 0.49, 0.34);
  root.add(eStop);

  return { root };
}
