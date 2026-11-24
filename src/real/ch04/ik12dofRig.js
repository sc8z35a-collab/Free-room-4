import * as THREE from 'three';
import { createSTS3215Servo } from '../hardware.js';

function makeRoundedBoxGeo(w, h, d, bevel = 0.002, steps = 2) {
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

function makeWireTube(points, radius, mat, segs = 20) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segs, radius, 8, false), mat);
  mesh.castShadow = true;
  return mesh;
}

const L1 = 0.093; // Thigh 93.0 mm
const L2 = 0.093; // Shin 93.0 mm
const H_ANK = 0.034; // Ankle intersection height 34.0 mm
const HIP_HALF_W = 0.042; // 84.0 mm stance width -> ±42.0 mm

/**
 * HMD-01 12-DOF Lower-Body Bipedal Unit (Real-Time Analytic 6-DOF Inverse Kinematics + NaN Shatter Rig!)
 * Built to exact millimeter dimensions: Pelvis 6mm plate (86g) + L/R 6-DOF PLA+ legs (478g x 2) = 1,042g.
 */
export function createHMD01Lower12DOF(mats) {
  const root = new THREE.Group();

  // Pelvis Root (local origin = center between left & right 3-axis hip intersections)
  const pelvis = new THREE.Group();
  pelvis.position.set(0, 0.20, 0);
  root.add(pelvis);

  // 6mm High-Rigidity Matte-Black PLA+ Pelvis Plate (86g) + Brass Heat-Set Inserts
  const pelvisPlate = new THREE.Mesh(makeRoundedBoxGeo(0.132, 0.008, 0.078, 0.002, 2), mats.printedPLA);
  pelvisPlate.position.y = 0.022;
  pelvisPlate.castShadow = true;
  pelvisPlate.receiveShadow = true;
  pelvis.add(pelvisPlate);

  // Brass M3 heat-set nut inserts gleaming on top of pelvis plate
  const insertGeo = new THREE.CylinderGeometry(0.0026, 0.0026, 0.009, 12);
  for (const [ix, iz] of [
    [-0.048, -0.026], [0.048, -0.026],
    [-0.048, 0.026], [0.048, 0.026],
    [0, -0.028], [0, 0.028],
  ]) {
    const ins = new THREE.Mesh(insertGeo, mats.brass);
    ins.position.set(ix, 0.0225, iz);
    pelvis.add(ins);
  }

  // Twin Chrome Eyebolts on Pelvis for Safety Tether Suspension
  const eyeTorusGeo = new THREE.TorusGeometry(0.006, 0.0016, 8, 16);
  for (const sx of [-0.036, 0.036]) {
    const eye = new THREE.Mesh(eyeTorusGeo, mats.chromeSteel);
    eye.position.set(sx, 0.031, 0);
    pelvis.add(eye);
  }

  // Build Symmetrical 6-DOF Articulated Leg (side = -1 for Right Leg [-X], +1 for Left Leg [+X])
  const build6DOFLeg = (side) => {
    // 1. Hip Yaw (Y) -> 2. Hip Roll (Z) -> 3. Hip Pitch (X) all intersecting at (side * 0.042, 0, 0)!
    const hipYaw = new THREE.Group();
    hipYaw.position.set(side * HIP_HALF_W, 0, 0);
    pelvis.add(hipYaw);

    const servoYaw = createSTS3215Servo(mats, 0.82);
    servoYaw.root.position.set(0, 0.012, 0);
    hipYaw.add(servoYaw.root);

    const hipRoll = new THREE.Group();
    hipYaw.add(hipRoll);

    // U-shaped Hip Cradle Bracket (this left-hip cradle shatters at t=74.0s during NaN crash!)
    const hipCradle = new THREE.Group();
    const cradleBridge = new THREE.Mesh(makeRoundedBoxGeo(0.038, 0.012, 0.044, 0.0015, 2), mats.printedPLA);
    cradleBridge.position.y = 0.004;
    cradleBridge.castShadow = true;
    hipCradle.add(cradleBridge);

    const servoRoll = createSTS3215Servo(mats, 0.82);
    servoRoll.root.rotation.x = Math.PI / 2;
    servoRoll.root.position.set(0, -0.002, -0.012);
    hipCradle.add(servoRoll.root);
    hipRoll.add(hipCradle);

    const hipPitch = new THREE.Group();
    hipRoll.add(hipPitch);

    const servoHipPitch = createSTS3215Servo(mats, 0.85);
    servoHipPitch.root.rotation.z = side * (Math.PI / 2); // Mirrored 180° orientation on Left Leg!
    hipPitch.add(servoHipPitch.root);

    // High-rigidity H-Beam Thigh Frame (L1 = 93.0 mm) with ball-bearing boss
    for (const sx of [-0.020, 0.020]) {
      const thighPlate = new THREE.Mesh(makeRoundedBoxGeo(0.005, 0.098, 0.028, 0.0015, 2), mats.printedPLA);
      thighPlate.position.set(sx, -L1 * 0.5, 0);
      thighPlate.castShadow = true;
      hipPitch.add(thighPlate);

      // Chrome flanged ball bearing on outer support side
      const bearing = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.0065, 16), mats.chromeSteel);
      bearing.rotation.z = Math.PI / 2;
      bearing.position.set(sx, -L1, 0);
      hipPitch.add(bearing);
    }
    const hRibThigh = new THREE.Mesh(new THREE.BoxGeometry(0.040, 0.022, 0.006), mats.printedPLA);
    hRibThigh.position.set(0, -L1 * 0.5, -0.010);
    hipPitch.add(hRibThigh);

    // Daisy-chain cable behind knee (where Minato's left index finger reaches at t=71s!)
    hipPitch.add(
      makeWireTube(
        [
          [side * 0.014, -0.012, -0.014],
          [side * 0.022, -0.048, -0.019],
          [side * 0.014, -0.088, -0.015],
        ],
        0.0020,
        mats.wireBlack,
        14
      )
    );

    // 4. Knee Pitch Joint (X) at y = -0.093m
    const kneePitch = new THREE.Group();
    kneePitch.position.set(0, -L1, 0);
    hipPitch.add(kneePitch);

    const servoKnee = createSTS3215Servo(mats, 0.85);
    servoKnee.root.rotation.z = side * (Math.PI / 2);
    kneePitch.add(servoKnee.root);

    // High-rigidity H-Beam Shin Frame (L2 = 93.0 mm)
    for (const sx of [-0.019, 0.019]) {
      const shinPlate = new THREE.Mesh(makeRoundedBoxGeo(0.005, 0.096, 0.026, 0.0015, 2), mats.printedPLA);
      shinPlate.position.set(sx, -L2 * 0.5, 0);
      shinPlate.castShadow = true;
      kneePitch.add(shinPlate);
    }
    const hRibShin = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.020, 0.006), mats.printedPLA);
    hRibShin.position.set(0, -L2 * 0.5, 0.009);
    kneePitch.add(hRibShin);

    // 5. Ankle Pitch (X) -> 6. Ankle Roll (Z) intersecting at y = -0.093m (34.0mm above sole!)
    const anklePitch = new THREE.Group();
    anklePitch.position.set(0, -L2, 0);
    kneePitch.add(anklePitch);

    const servoAnkP = createSTS3215Servo(mats, 0.82);
    servoAnkP.root.rotation.z = side * (Math.PI / 2);
    anklePitch.add(servoAnkP.root);

    const ankleRoll = new THREE.Group();
    anklePitch.add(ankleRoll);

    const servoAnkR = createSTS3215Servo(mats, 0.80);
    servoAnkR.root.rotation.x = Math.PI / 2;
    servoAnkR.root.position.set(0, -0.014, -0.008);
    ankleRoll.add(servoAnkR.root);

    // Foot Sole Plate (110.0mm x 70.0mm, bottom resting exactly at y = -0.034m!)
    const solePlate = new THREE.Mesh(makeRoundedBoxGeo(0.068, 0.006, 0.110, 0.002, 2), mats.printedPLA);
    solePlate.position.set(0, -H_ANK + 0.003, 0.014);
    solePlate.castShadow = true;
    solePlate.receiveShadow = true;
    ankleRoll.add(solePlate);

    return {
      side,
      hipYaw,
      hipRoll,
      hipCradle,
      hipPitch,
      kneePitch,
      anklePitch,
      ankleRoll,
      solePlate,
    };
  };

  const rightLeg = build6DOFLeg(-1); // Robot Right = -X (ID 01..06)
  const leftLeg = build6DOFLeg(1);   // Robot Left  = +X (ID 07..12)

  // ===========================================================================
  // Ballistic Black PLA Shatter Shards for Left-Hip Self-Collision ("バキィッ！！")
  // ===========================================================================
  const shatterGroup = new THREE.Group();
  shatterGroup.visible = false;
  root.add(shatterGroup);

  const shards = [];
  for (let i = 0; i < 18; i++) {
    const sGeo = new THREE.TetrahedronGeometry(0.006 + (i % 4) * 0.0035, 0);
    const sMesh = new THREE.Mesh(sGeo, mats.printedPLA);
    sMesh.castShadow = true;
    shatterGroup.add(sMesh);
    const ang = (i / 18) * Math.PI * 2 + 0.3;
    const spd = 0.55 + (i % 5) * 0.22;
    shards.push({
      mesh: sMesh,
      vx: Math.cos(ang) * spd * 0.65 + 0.15,
      vy: 0.45 + (i % 4) * 0.28,
      vz: Math.sin(ang) * spd * 0.65 + 0.12,
      rx: (i * 3.7) % 9,
      ry: (i * 5.1) % 9,
    });
  }

  // Reusable math scratch objects (zero per-frame GC!)
  const _pelvisQuat = new THREE.Quaternion();
  const _pelvisQuatInv = new THREE.Quaternion();
  const _pelvisEuler = new THREE.Euler();
  const _hipOffset = new THREE.Vector3();
  const _hipWorld = new THREE.Vector3();
  const _thighWorldQuat = new THREE.Quaternion();
  const _hipLocalQuat = new THREE.Quaternion();
  const _hipLocalEuler = new THREE.Euler();
  const _footWorldQuat = new THREE.Quaternion();
  const _shinWorldQuat = new THREE.Quaternion();
  const _shinWorldInv = new THREE.Quaternion();
  const _ankLocalQuat = new THREE.Quaternion();
  const _ankLocalEuler = new THREE.Euler();
  const _qZ = new THREE.Quaternion();
  const _qX = new THREE.Quaternion();
  const _axisZ = new THREE.Vector3(0, 0, 1);
  const _axisX = new THREE.Vector3(1, 0, 0);

  /**
   * Exact Closed-Form 6-DOF Analytic Inverse Kinematics Solver (Law of Cosines + R^T Transpose!)
   * Solves both legs so soles stay 100.00% pinned to target foot coordinates in root space!
   */
  function solveIKPose({
    pelvisPos = [0, 0.20, 0],
    pelvisEuler = [0, 0, 0], // [pitchX, yawY, rollZ]
    rightFootPos = [-HIP_HALF_W, 0, 0],
    leftFootPos = [HIP_HALF_W, 0, 0],
    leftAnkleGlitchRad = 0,
  } = {}) {
    pelvis.position.set(pelvisPos[0], pelvisPos[1], pelvisPos[2]);
    _pelvisEuler.set(pelvisEuler[0], pelvisEuler[1], pelvisEuler[2], 'YXZ');
    pelvis.quaternion.setFromEuler(_pelvisEuler);
    _pelvisQuat.copy(pelvis.quaternion);
    _pelvisQuatInv.copy(_pelvisQuat).invert(); // R^-1 = R^T !!

    const legs = [
      { leg: rightLeg, foot: rightFootPos, glitch: 0 },
      { leg: leftLeg, foot: leftFootPos, glitch: leftAnkleGlitchRad },
    ];

    for (const { leg, foot, glitch } of legs) {
      // World-space hip 3-axis intersection point
      _hipOffset.set(leg.side * HIP_HALF_W, 0, 0).applyQuaternion(_pelvisQuat);
      _hipWorld.set(
        pelvisPos[0] + _hipOffset.x,
        pelvisPos[1] + _hipOffset.y,
        pelvisPos[2] + _hipOffset.z
      );

      // Ankle 2-axis intersection point is H_ANK (34.0mm) directly above flat sole target
      const ax = foot[0];
      const ay = foot[1] + H_ANK;
      const az = foot[2];

      // Vector from Ankle Intersection UP to Hip Intersection: u = P_hip - P_ank
      const ux = _hipWorld.x - ax;
      const uy = _hipWorld.y - ay;
      const uz = _hipWorld.z - az;

      const d = Math.min(L1 + L2 - 0.0002, Math.max(0.05, Math.hypot(ux, uy, uz)));
      // Law of Cosines: cos(q4) = (d^2 - L1^2 - L2^2) / (2 * L1 * L2)
      const cosQ4 = Math.max(-1, Math.min(1, (d * d - L1 * L1 - L2 * L2) / (2 * L1 * L2)));
      const q4 = Math.acos(cosQ4); // Positive knee bend (+X swings shin -Z)

      // Lateral roll plane angle phi & sagittal forward angle psi
      const phi = Math.atan2(ux, uy);
      const u_yz = Math.hypot(ux, uy);
      const psi = Math.atan2(-uz, u_yz); // Foot forward (+Z) relative to hip => -uz > 0

      // World thigh orientation: Roll(-phi around Z) * Pitch(-(psi + q4/2) around X)
      const thighPitch = -(psi + q4 * 0.5);
      _qZ.setFromAxisAngle(_axisZ, -phi);
      _qX.setFromAxisAngle(_axisX, thighPitch);
      _thighWorldQuat.copy(_qZ).multiply(_qX);

      // R_hip = R_pelvis^T * R_thighWorld -> extract exact YZX Euler for Hip Yaw -> Hip Roll -> Hip Pitch!
      _hipLocalQuat.copy(_pelvisQuatInv).multiply(_thighWorldQuat);
      _hipLocalEuler.setFromQuaternion(_hipLocalQuat, 'YZX');
      leg.hipYaw.rotation.set(0, _hipLocalEuler.y, 0);
      leg.hipRoll.rotation.set(0, 0, _hipLocalEuler.z);
      leg.hipPitch.rotation.set(_hipLocalEuler.x, 0, 0);

      // Knee Pitch (+q4)
      leg.kneePitch.rotation.set(q4, 0, 0);

      // Shin world orientation = ThighWorld * RotX(+q4)
      _qX.setFromAxisAngle(_axisX, q4);
      _shinWorldQuat.copy(_thighWorldQuat).multiply(_qX);
      _shinWorldInv.copy(_shinWorldQuat).invert();

      // Foot target orientation = Identity (flat on ground!). R_ankle = R_shin^T * I
      _footWorldQuat.identity();
      _ankLocalQuat.copy(_shinWorldInv).multiply(_footWorldQuat);
      _ankLocalEuler.setFromQuaternion(_ankLocalQuat, 'XZY');
      leg.anklePitch.rotation.set(_ankLocalEuler.x + glitch, 0, 0);
      leg.ankleRoll.rotation.set(0, 0, _ankLocalEuler.z);
    }
  }

  /**
   * Direct Joint Override for the Violent `acosf(1.0000019f) -> NaN -> 0x0000` Runaway Crash!
   */
  function setRawRunawayPose({
    pelvisY = 0.24,
    crashAmt = 0, // 0 = straight-leg z=-220mm singularity, 1 = violent jackknife bear-trap!
    limpAmt = 0,  // 1 = power yanked, hanging limp!
    stallTremor = 0,
    shatterElapsed = -1,
  } = {}) {
    pelvis.position.set(0, pelvisY, 0);
    pelvis.rotation.set(0, 0, 0);

    const tr = stallTremor;
    if (limpAmt > 0.01) {
      // Plug yanked: legs droop limp from jackknife back toward gravity
      const k = 1 - limpAmt;
      rightLeg.hipYaw.rotation.set(0, 0.35 * k, 0);
      rightLeg.hipRoll.rotation.set(0, 0, -0.32 * k);
      rightLeg.hipPitch.rotation.set(1.15 * k + 0.08 * limpAmt, 0, 0);
      rightLeg.kneePitch.rotation.set(1.95 * k + 0.14 * limpAmt, 0, 0);
      rightLeg.anklePitch.rotation.set(-0.9 * k + 0.2 * limpAmt, 0, 0);

      leftLeg.hipYaw.rotation.set(0, -0.42 * k, 0);
      leftLeg.hipRoll.rotation.set(0, 0, 0.38 * k);
      leftLeg.hipPitch.rotation.set(-1.38 * k + 0.12 * limpAmt, 0, 0);
      leftLeg.kneePitch.rotation.set(2.22 * k + 0.18 * limpAmt, 0, 0);
      leftLeg.anklePitch.rotation.set(0.85 * k + 0.22 * limpAmt, 0, 0);
    } else {
      // Violent snap from straight-leg (0) into twisted bear-trap (crashAmt = 1)!
      rightLeg.hipYaw.rotation.set(0, 0.38 * crashAmt + tr, 0);
      rightLeg.hipRoll.rotation.set(0, 0, -0.34 * crashAmt);
      rightLeg.hipPitch.rotation.set(1.18 * crashAmt - tr, 0, 0);
      rightLeg.kneePitch.rotation.set(0.02 + 1.98 * crashAmt + tr, 0, 0);
      rightLeg.anklePitch.rotation.set(-0.95 * crashAmt, 0, 0);
      rightLeg.ankleRoll.rotation.set(0, 0, 0.35 * crashAmt);

      // Left knee slams shut like sheet-metal shears (clamping Minato's finger!) while left hip self-collides!
      leftLeg.hipYaw.rotation.set(0, -0.45 * crashAmt - tr, 0);
      leftLeg.hipRoll.rotation.set(0, 0, 0.40 * crashAmt);
      leftLeg.hipPitch.rotation.set(-1.42 * crashAmt + tr, 0, 0);
      leftLeg.kneePitch.rotation.set(0.02 + 2.28 * crashAmt - tr, 0, 0);
      leftLeg.anklePitch.rotation.set(0.88 * crashAmt, 0, 0);
      leftLeg.ankleRoll.rotation.set(0, 0, -0.38 * crashAmt);
    }

    // Shattering Left-Hip Cradle Fragments ("バキィッ！！")
    if (shatterElapsed >= 0) {
      leftLeg.hipCradle.visible = false;
      shatterGroup.visible = true;
      const g = -4.8;
      for (const s of shards) {
        const dt = Math.min(2.5, shatterElapsed);
        let py = pelvisY + 0.01 + s.vy * dt + 0.5 * g * dt * dt;
        let tFlight = dt;
        if (py < 0.006) {
          // Rest scattered across the walnut desk / rubber mat!
          const disc = Math.max(0, s.vy * s.vy - 2 * g * (pelvisY + 0.004));
          tFlight = (-s.vy - Math.sqrt(disc)) / g;
          py = 0.006;
        }
        s.mesh.position.set(
          HIP_HALF_W + s.vx * tFlight,
          py,
          s.vz * tFlight
        );
        s.mesh.rotation.set(s.rx * tFlight, s.ry * tFlight, (s.rx + s.ry) * 0.5 * tFlight);
      }
    } else {
      leftLeg.hipCradle.visible = true;
      shatterGroup.visible = false;
    }
  }

  function resetCleanCradle() {
    leftLeg.hipCradle.visible = true;
    shatterGroup.visible = false;
  }

  return {
    root,
    pelvis,
    rightLeg,
    leftLeg,
    solveIKPose,
    setRawRunawayPose,
    resetCleanCradle,
  };
}

/**
 * Chapter 4 Precision Laboratory Equipment:
 * 1. Aluminum Test Gantry Stand + Slack/Taut Safety Tether
 * 2. Industrial Perforated-Mesh 12V 15A (180W) Switching PSU + Spinning Fan
 * 3. Clamped Red Mushroom Push-Lock Emergency Stop Switch
 * 4. Stainless Digital Kitchen Scale (1,042g)
 * 5. Sculpted Left-Hand Macro Rig (Normal -> Bruised Purple Nail Hematoma -> White Medical Tape Bandage!)
 */
export function createCh04LabProps(mats, scaleLcdMat) {
  // 1. Extruded 2020 Aluminum Test Gantry Stand (試験スタンド)
  const gantry = new THREE.Group();
  const basePlate = new THREE.Mesh(makeRoundedBoxGeo(0.28, 0.008, 0.22, 0.002, 2), mats.rubberBlack);
  basePlate.position.y = 0.004;
  basePlate.receiveShadow = true;
  gantry.add(basePlate);

  for (const sx of [-0.125, 0.125]) {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.36, 0.020), mats.brushedAlu);
    col.position.set(sx, 0.184, -0.04);
    col.castShadow = true;
    gantry.add(col);
  }
  const crossBar = new THREE.Mesh(new THREE.BoxGeometry(0.275, 0.020, 0.020), mats.brushedAlu);
  crossBar.position.set(0, 0.365, -0.04);
  crossBar.castShadow = true;
  gantry.add(crossBar);

  const forwardArm = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.020, 0.085), mats.brushedAlu);
  forwardArm.position.set(0, 0.365, -0.005);
  gantry.add(forwardArm);

  // Taut vs Slack Safety Suspension Cords
  const cordMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7 });
  const tautCords = new THREE.Group();
  for (const sx of [-0.036, 0.036]) {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.0014, 0.0014, 0.095, 8), cordMat);
    c.position.set(sx * 0.5, 0.312, 0.01);
    c.rotation.z = sx * 3.2;
    tautCords.add(c);
  }
  gantry.add(tautCords);

  const slackCord = makeWireTube(
    [[-0.036, 0.225, 0], [-0.055, 0.27, 0.025], [0, 0.355, 0.01], [0.055, 0.27, 0.025], [0.036, 0.225, 0]],
    0.0015,
    cordMat,
    20
  );
  slackCord.visible = false;
  gantry.add(slackCord);

  // 2. Industrial Perforated-Mesh 12V 15A (180W) Switching Power Supply
  const psu15A = new THREE.Group();
  const psuCage = new THREE.Mesh(makeRoundedBoxGeo(0.115, 0.050, 0.198, 0.002, 2), mats.brushedAlu);
  psuCage.position.y = 0.025;
  psuCage.castShadow = true;
  psu15A.add(psuCage);

  // Perforated honeycomb/slot top vent grille decal + internal cooling fan
  const fanHub = new THREE.Group();
  fanHub.position.set(0, 0.0505, -0.03);
  const fanRing = new THREE.Mesh(new THREE.RingGeometry(0.008, 0.036, 24), mats.darkAnodized);
  fanRing.rotation.x = -Math.PI / 2;
  fanHub.add(fanRing);
  for (let b = 0; b < 7; b++) {
    const bl = new THREE.Mesh(new THREE.BoxGeometry(0.007, 0.001, 0.028), mats.chromeSteel);
    bl.position.z = 0.016;
    const piv = new THREE.Group();
    piv.rotation.y = (b / 7) * Math.PI * 2;
    piv.add(bl);
    fanHub.add(piv);
  }
  psu15A.add(fanHub);

  // Screw Terminal Block + Green Power LED + Thick Red/Black 12V Output Leads
  const termBlock = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.018, 0.022), mats.rubberBlack);
  termBlock.position.set(0, 0.016, 0.095);
  psu15A.add(termBlock);
  for (let s = 0; s < 7; s++) {
    const scr = new THREE.Mesh(new THREE.CylinderGeometry(0.0028, 0.0028, 0.004, 10), mats.chromeSteel);
    scr.position.set(-0.036 + s * 0.012, 0.026, 0.095);
    psu15A.add(scr);
  }
  const psuLedMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
  const psuLed = new THREE.Mesh(new THREE.SphereGeometry(0.0026, 10, 8), psuLedMat);
  psuLed.position.set(0.044, 0.026, 0.088);
  psu15A.add(psuLed);

  // 3. Red Mushroom-Head Emergency Stop Switch (プッシュロック・ターンリセット式非常停止スイッチ)
  const eStopUnit = new THREE.Group();
  const yellowBox = new THREE.Mesh(makeRoundedBoxGeo(0.072, 0.054, 0.072, 0.004, 2), mats.xt60Yellow);
  yellowBox.position.y = 0.027;
  yellowBox.castShadow = true;
  eStopUnit.add(yellowBox);

  const collarRing = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.026, 0.006, 24), mats.servoHornWhite);
  collarRing.position.y = 0.056;
  eStopUnit.add(collarRing);

  const mushroomStem = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.018, 18), mats.darkAnodized);
  mushroomStem.position.y = 0.064;
  eStopUnit.add(mushroomStem);

  const mushroomCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.024, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.58),
    new THREE.MeshPhysicalMaterial({ color: 0xdc2626, roughness: 0.24, clearcoat: 0.65 })
  );
  mushroomCap.scale.set(1, 0.68, 1);
  mushroomCap.position.y = 0.068;
  mushroomCap.castShadow = true;
  eStopUnit.add(mushroomCap);

  // Heavy C-Clamp securing E-Stop to desk front-right corner
  const esClamp = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.068, 0.028), mats.darkAnodized);
  esClamp.position.set(0, -0.022, 0.026);
  eStopUnit.add(esClamp);

  // 4. Stainless Digital Kitchen Scale (1,042 g)
  const kitchenScale = new THREE.Group();
  const scaleBase = new THREE.Mesh(makeRoundedBoxGeo(0.155, 0.018, 0.205, 0.004, 2), mats.brushedAlu);
  scaleBase.position.y = 0.009;
  scaleBase.castShadow = true;
  scaleBase.receiveShadow = true;
  kitchenScale.add(scaleBase);

  const scaleLcd = new THREE.Mesh(new THREE.PlaneGeometry(0.072, 0.034), scaleLcdMat);
  scaleLcd.rotation.x = -Math.PI / 2;
  scaleLcd.position.set(0, 0.0186, 0.072);
  kitchenScale.add(scaleLcd);

  // 5. Sculpted Left-Hand Macro Rig (Normal -> Bruised Purple Hematoma -> White Medical Tape!)
  const leftHandRig = new THREE.Group();
  const lSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.030, 0.20, 20), mats.hoodieNavy);
  lSleeve.rotation.x = Math.PI / 2;
  lSleeve.position.set(0, 0, 0.14);
  leftHandRig.add(lSleeve);

  const lPalm = new THREE.Mesh(new THREE.SphereGeometry(0.029, 18, 14), mats.skin);
  lPalm.scale.set(0.95, 0.44, 1.12);
  lPalm.position.set(0, 0, 0.015);
  lPalm.castShadow = true;
  leftHandRig.add(lPalm);

  // Left Index Finger (extends along -Z to reach into knee bracket / show injury / click mouse!)
  const indexPivot = new THREE.Group();
  indexPivot.position.set(0.018, 0.002, -0.015);
  const idxSeg1 = new THREE.Mesh(new THREE.CapsuleGeometry(0.0056, 0.024, 6, 10), mats.skin);
  idxSeg1.rotation.x = Math.PI / 2;
  idxSeg1.position.z = -0.014;
  idxSeg1.castShadow = true;
  indexPivot.add(idxSeg1);

  const idxTipGroup = new THREE.Group();
  idxTipGroup.position.z = -0.028;
  const idxSeg2 = new THREE.Mesh(new THREE.CapsuleGeometry(0.0050, 0.020, 6, 10), mats.skin);
  idxSeg2.rotation.x = Math.PI / 2;
  idxSeg2.position.z = -0.012;
  idxSeg2.castShadow = true;
  idxTipGroup.add(idxSeg2);

  // Injury Layer: Dark-purple subungual hematoma (爪下血腫) + crimson laceration line!
  const hematomaGroup = new THREE.Group();
  hematomaGroup.visible = false;
  const purpleNail = new THREE.Mesh(
    new THREE.SphereGeometry(0.0046, 12, 10),
    new THREE.MeshPhysicalMaterial({ color: 0x3b0764, roughness: 0.25, clearcoat: 0.85 })
  );
  purpleNail.scale.set(0.85, 0.35, 1.35);
  purpleNail.position.set(0, 0.0038, -0.016);
  const bloodCut = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.0018, 0.009, 4, 8),
    new THREE.MeshPhysicalMaterial({ color: 0x991b1b, roughness: 0.15, clearcoat: 1.0 })
  );
  bloodCut.rotation.z = Math.PI / 2;
  bloodCut.position.set(0, -0.0038, -0.013);
  hematomaGroup.add(purpleNail, bloodCut);
  idxTipGroup.add(hematomaGroup);

  // Bandage Layer: Clean white medical gauze & tape wrapped around left index finger!
  const bandageMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0068, 0.0066, 0.028, 18),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.88 })
  );
  bandageMesh.rotation.x = Math.PI / 2;
  bandageMesh.position.set(0, 0, -0.011);
  bandageMesh.visible = false;
  idxTipGroup.add(bandageMesh);

  indexPivot.add(idxTipGroup);
  leftHandRig.add(indexPivot);

  // Remaining 3 fingers + thumb gently curled
  for (let f = 0; f < 3; f++) {
    const fg = new THREE.Mesh(new THREE.CapsuleGeometry(0.0052, 0.036, 6, 10), mats.skin);
    fg.rotation.x = Math.PI / 2 - 0.55;
    fg.position.set(0.005 - f * 0.012, -0.009, -0.025);
    fg.castShadow = true;
    leftHandRig.add(fg);
  }
  const lThumb = new THREE.Mesh(new THREE.CapsuleGeometry(0.0058, 0.028, 6, 10), mats.skin);
  lThumb.rotation.set(Math.PI / 2 - 0.3, -0.45, 0);
  lThumb.position.set(0.026, -0.006, -0.005);
  leftHandRig.add(lThumb);

  function setLeftFingerState(state = 'normal', flex = 0) {
    hematomaGroup.visible = state === 'bruised';
    bandageMesh.visible = state === 'bandaged';
    indexPivot.rotation.x = -flex * 0.35;
    idxTipGroup.rotation.x = -flex * 0.45;
  }

  return {
    gantry,
    tautCords,
    slackCord,
    psu15A,
    fanHub,
    psuLedMat,
    eStopUnit,
    kitchenScale,
    leftHandRig,
    setLeftFingerState,
  };
}
