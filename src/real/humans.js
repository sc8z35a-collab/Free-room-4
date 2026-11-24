import * as THREE from 'three';

/**
 * Vertex-sculpts a high-segment sphere into a realistic human cranial + jawline + cheek + chin head!
 */
function buildSculptedHeadGeometry() {
  const geo = new THREE.SphereGeometry(0.105, 36, 28);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    // Slight vertical cranial elongation
    y *= 1.16;
    // Slight temple narrowing
    x *= 0.91;

    // Taper lower face into realistic jawline & rounded chin
    if (y < 0) {
      const t = Math.min(1, -y / 0.12);
      x *= 1.0 - t * 0.34;
      if (z > 0) {
        z *= 1.0 - t * 0.12;
        // Subtle chin forward projection
        if (t > 0.65 && Math.abs(x) < 0.035) {
          z += 0.008 * (t - 0.65);
        }
      } else {
        // Taper back of skull into occiput/neck
        z *= 1.0 - t * 0.32;
      }
    }

    // Subtle brow ridge & eye socket depression on front (+Z)
    if (z > 0.04) {
      const eyeSocketY = Math.exp(-Math.pow((y - 0.014) / 0.018, 2));
      const eyeSocketX = Math.exp(-Math.pow((Math.abs(x) - 0.034) / 0.02, 2));
      z -= 0.009 * eyeSocketY * eyeSocketX;

      const browY = Math.exp(-Math.pow((y - 0.034) / 0.012, 2));
      z += 0.005 * browY * (1.0 - Math.abs(x) * 4.0);
    }

    pos.setXYZ(i, x, y, z);
  }
  geo.computeVertexNormals();
  return geo;
}

/**
 * Builds layered curved 3D hair locks (smooth tapered strands — zero boxes!)
 */
function buildLayeredHair(parent, hairMat, style = 'youth') {
  const hairGroup = new THREE.Group();
  // Cranial hair cap tilted backward so forehead, brows, eyes, and glasses are completely uncovered!
  const capGeo = new THREE.SphereGeometry(0.109, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.58);
  capGeo.scale(0.93, 1.14, 1.03);
  const cap = new THREE.Mesh(capGeo, hairMat);
  cap.position.set(0, 0.018, -0.012);
  cap.rotation.x = -0.58;
  cap.castShadow = true;
  hairGroup.add(cap);

  // Sculpted tapered bangs & side/back locks (parted above eyebrows)
  const strandCount = style === 'professor' ? 12 : 18;
  for (let i = 0; i < strandCount; i++) {
    const frac = i / strandCount;
    const angle = style === 'professor'
      ? Math.PI * 0.42 + frac * Math.PI * 1.16 // Receding temple, fuller sides/back
      : frac * Math.PI * 2;
    const isFront = Math.cos(angle) > 0.25;
    const len = isFront ? (style === 'kurata' ? 0.032 : 0.038) : 0.078;
    const strandGeo = new THREE.ConeGeometry(0.020, len, 10);
    strandGeo.translate(0, -len * 0.45, 0);
    const strand = new THREE.Mesh(strandGeo, hairMat);

    const rx = Math.sin(angle) * 0.086;
    const rz = Math.cos(angle) * 0.090;
    strand.position.set(rx, isFront ? 0.088 : 0.062, rz);
    strand.rotation.y = angle;
    strand.rotation.x = isFront ? -0.10 : 0.18;
    strand.rotation.z = (i % 2 === 0 ? 1 : -1) * (isFront ? 0.22 : 0.08);
    strand.castShadow = true;
    hairGroup.add(strand);
  }
  parent.add(hairGroup);
  return hairGroup;
}

/**
 * Builds an articulated 5-finger realistic hand (left or right, side = -1 or +1)
 */
function buildRealisticHand(mats, side = 1, scale = 1.0) {
  const handRoot = new THREE.Group();
  handRoot.scale.setScalar(scale);

  // Sculpted palm (flattened capsule/ellipsoid)
  const palmGeo = new THREE.SphereGeometry(0.042, 18, 14);
  palmGeo.scale(0.95, 1.12, 0.44);
  const palm = new THREE.Mesh(palmGeo, mats.skin);
  palm.position.set(0, -0.042, 0);
  palm.castShadow = true;
  handRoot.add(palm);

  const fingers = [];
  const fingerSpecs = [
    { x: -0.028 * side, y: -0.078, r: 0.0078, l1: 0.032, l2: 0.026 }, // Index
    { x: -0.009 * side, y: -0.082, r: 0.0082, l1: 0.035, l2: 0.028 }, // Middle
    { x: 0.010 * side, y: -0.079, r: 0.0076, l1: 0.032, l2: 0.025 },  // Ring
    { x: 0.027 * side, y: -0.073, r: 0.0068, l1: 0.026, l2: 0.021 },  // Little
  ];

  for (const fs of fingerSpecs) {
    const knuckle = new THREE.Group();
    knuckle.position.set(fs.x, fs.y, 0.002);
    const seg1 = new THREE.Mesh(new THREE.CapsuleGeometry(fs.r, fs.l1, 6, 10), mats.skin);
    seg1.position.y = -fs.l1 * 0.5;
    seg1.castShadow = true;
    knuckle.add(seg1);

    const midJoint = new THREE.Group();
    midJoint.position.y = -fs.l1 - fs.r * 0.3;
    const seg2 = new THREE.Mesh(new THREE.CapsuleGeometry(fs.r * 0.86, fs.l2, 6, 10), mats.skin);
    seg2.position.y = -fs.l2 * 0.5;
    seg2.castShadow = true;
    midJoint.add(seg2);

    knuckle.add(midJoint);
    handRoot.add(knuckle);
    fingers.push({ knuckle, midJoint });
  }

  // Articulated Opposable Thumb
  const thumbBase = new THREE.Group();
  thumbBase.position.set(-0.036 * side, -0.038, 0.01);
  thumbBase.rotation.z = side * 0.55;
  const tSeg1 = new THREE.Mesh(new THREE.CapsuleGeometry(0.009, 0.026, 6, 10), mats.skin);
  tSeg1.position.y = -0.016;
  tSeg1.castShadow = true;
  thumbBase.add(tSeg1);

  const thumbTip = new THREE.Group();
  thumbTip.position.y = -0.032;
  const tSeg2 = new THREE.Mesh(new THREE.CapsuleGeometry(0.008, 0.022, 6, 10), mats.skin);
  tSeg2.position.y = -0.013;
  tSeg2.castShadow = true;
  thumbTip.add(tSeg2);
  thumbBase.add(thumbTip);
  handRoot.add(thumbBase);

  return { root: handRoot, fingers, thumbBase, thumbTip };
}

/**
 * Creates a full-body, anatomically proportioned, smooth photorealistic 3D human (~1.72m tall)
 */
export function createRealisticHuman(mats, {
  role = 'minato',
  topMat = mats.hoodieNavy,
  innerMat = mats.shirtWhite,
  pantsMat = mats.jeansDark,
  hairMat = mats.hairBlack,
  hairStyle = 'youth',
  hasBackpack = false,
  hasGlasses = false,
} = {}) {
  const root = new THREE.Group();

  const pelvis = new THREE.Group();
  pelvis.position.y = 0.92;
  root.add(pelvis);

  // Sculpted Hips
  const hipMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.135, 0.08, 10, 18), pantsMat);
  hipMesh.rotation.z = Math.PI / 2;
  hipMesh.scale.set(1, 1, 0.78);
  hipMesh.castShadow = true;
  pelvis.add(hipMesh);

  // Articulated Legs (Thigh -> Knee -> Calf -> Sneaker)
  const makeLeg = (side) => {
    const hipJoint = new THREE.Group();
    hipJoint.position.set(side * 0.095, -0.02, 0);

    const thighGeo = new THREE.CylinderGeometry(0.078, 0.062, 0.42, 18);
    const thigh = new THREE.Mesh(thighGeo, pantsMat);
    thigh.position.y = -0.21;
    thigh.castShadow = true;
    hipJoint.add(thigh);

    const kneeJoint = new THREE.Group();
    kneeJoint.position.y = -0.42;
    const kneeCap = new THREE.Mesh(new THREE.SphereGeometry(0.061, 14, 12), pantsMat);
    kneeJoint.add(kneeCap);

    const calfGeo = new THREE.CylinderGeometry(0.06, 0.046, 0.41, 18);
    const calf = new THREE.Mesh(calfGeo, pantsMat);
    calf.position.y = -0.205;
    calf.castShadow = true;
    kneeJoint.add(calf);

    // Realistic Contoured Sneaker
    const ankleJoint = new THREE.Group();
    ankleJoint.position.y = -0.42;
    const sole = new THREE.Mesh(new THREE.CapsuleGeometry(0.048, 0.14, 8, 14), mats.sneakerWhite);
    sole.rotation.x = Math.PI / 2;
    sole.scale.set(1.05, 1.0, 0.45);
    sole.position.set(0, -0.035, 0.045);
    sole.castShadow = true;
    ankleJoint.add(sole);

    const upperShoe = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.11, 8, 14), role === 'professor' ? mats.darkAnodized : mats.sneakerNavy);
    upperShoe.rotation.x = Math.PI / 2;
    upperShoe.scale.set(0.98, 1.0, 0.68);
    upperShoe.position.set(0, -0.012, 0.038);
    upperShoe.castShadow = true;
    ankleJoint.add(upperShoe);

    kneeJoint.add(ankleJoint);
    hipJoint.add(kneeJoint);
    pelvis.add(hipJoint);
    return { hipJoint, kneeJoint, ankleJoint };
  };

  const leftLeg = makeLeg(-1);
  const rightLeg = makeLeg(1);

  // Spine & Torso
  const spine = new THREE.Group();
  spine.position.y = 0.04;
  pelvis.add(spine);

  const torsoGeo = new THREE.CylinderGeometry(0.175, 0.142, 0.50, 24);
  torsoGeo.scale(1.06, 1.0, 0.68);
  const torsoMesh = new THREE.Mesh(torsoGeo, topMat);
  torsoMesh.position.y = 0.25;
  torsoMesh.castShadow = true;
  spine.add(torsoMesh);

  // Subtle natural V-neck undershirt & jacket/hoodie collar torus
  const innerChest = new THREE.Mesh(new THREE.CircleGeometry(0.052, 3), innerMat);
  innerChest.rotation.z = -Math.PI / 2;
  innerChest.position.set(0, 0.455, 0.118);
  spine.add(innerChest);

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.084, 0.024, 10, 22, Math.PI * 1.45), topMat);
  collar.rotation.set(Math.PI / 2 + 0.18, 0, Math.PI * 0.78);
  collar.position.set(0, 0.495, -0.008);
  spine.add(collar);

  // Optional Freshman Backpack (for Scene 1, 2, 3!)
  const backpack = new THREE.Group();
  backpack.visible = hasBackpack;
  const packBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.135, 0.22, 10, 18), mats.backpackBlack);
  packBody.scale.set(1.05, 1.0, 0.62);
  packBody.position.set(0, 0.28, -0.165);
  packBody.castShadow = true;
  backpack.add(packBody);
  spine.add(backpack);

  // Neck & Sculpted Realistic Head
  const neck = new THREE.Group();
  neck.position.set(0, 0.51, 0);
  const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.058, 0.10, 16), mats.skin);
  neckMesh.position.y = 0.04;
  neck.add(neckMesh);
  spine.add(neck);

  const head = new THREE.Group();
  head.position.set(0, 0.145, 0.008);
  const headMesh = new THREE.Mesh(buildSculptedHeadGeometry(), mats.skin);
  headMesh.castShadow = true;
  head.add(headMesh);

  // Sculpted Nose, Ears, Lips
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.042, 10), mats.skin);
  nose.position.set(0, -0.002, 0.103);
  nose.rotation.x = 0.32;
  head.add(nose);

  for (const sx of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 10), mats.skin);
    ear.scale.set(0.42, 1.15, 0.72);
    ear.position.set(sx * 0.096, 0.0, -0.006);
    head.add(ear);
  }

  const mouth = new THREE.Mesh(new THREE.CapsuleGeometry(0.005, 0.026, 6, 10), mats.lips);
  mouth.rotation.z = Math.PI / 2;
  mouth.position.set(0, -0.046, 0.091);
  head.add(mouth);

  // Realistic Wet Eyeballs + Irises + Blinking Eyelids + Expressive Eyebrows
  const eyelids = [];
  const brows = [];
  for (const sx of [-1, 1]) {
    const eyeGroup = new THREE.Group();
    eyeGroup.position.set(sx * 0.034, 0.015, 0.084);

    const eyeball = new THREE.Mesh(new THREE.SphereGeometry(0.0145, 16, 14), mats.eyeSclera);
    eyeGroup.add(eyeball);

    const iris = new THREE.Mesh(new THREE.CircleGeometry(0.0082, 18), mats.eyeIris);
    iris.position.z = 0.0142;
    eyeGroup.add(iris);

    const lid = new THREE.Mesh(
      new THREE.SphereGeometry(0.0155, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.52),
      mats.skin
    );
    lid.rotation.x = -0.35;
    eyeGroup.add(lid);
    eyelids.push(lid);

    const brow = new THREE.Mesh(new THREE.CapsuleGeometry(0.0042, 0.028, 6, 8), hairMat);
    brow.rotation.z = Math.PI / 2 - sx * 0.06;
    brow.position.set(sx * 0.035, 0.038, 0.095);
    head.add(brow);
    brows.push({ mesh: brow, side: sx });

    head.add(eyeGroup);
  }

  if (hasGlasses) {
    for (const sx of [-1, 1]) {
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.021, 0.0022, 8, 20), mats.darkAnodized);
      rim.position.set(sx * 0.035, 0.015, 0.099);
      head.add(rim);
    }
    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.026, 8), mats.darkAnodized);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.018, 0.10);
    head.add(bridge);
  }

  buildLayeredHair(head, hairMat, hairStyle);
  neck.add(head);

  // Articulated Arms (Shoulder -> UpperArm -> Elbow -> Forearm -> 5-Finger Hand)
  const makeArm = (side) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.195, 0.455, 0);

    const deltoid = new THREE.Mesh(new THREE.SphereGeometry(0.064, 14, 12), topMat);
    shoulder.add(deltoid);

    const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.046, 0.27, 16), topMat);
    upperArm.position.y = -0.135;
    upperArm.castShadow = true;
    shoulder.add(upperArm);

    const elbow = new THREE.Group();
    elbow.position.y = -0.27;
    const elbowSphere = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 10), topMat);
    elbow.add(elbowSphere);

    const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.036, 0.25, 16), topMat);
    forearm.position.y = -0.125;
    forearm.castShadow = true;
    elbow.add(forearm);

    const wrist = new THREE.Group();
    wrist.position.y = -0.25;
    const hand = buildRealisticHand(mats, side, 0.92);
    wrist.add(hand.root);

    elbow.add(wrist);
    shoulder.add(elbow);
    spine.add(shoulder);
    return { shoulder, elbow, wrist, hand };
  };

  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);

  function setPose(t, {
    seated = false,
    walking = 0,
    typing = false,
    lookingDown = 0,
    shock = 0,
    focus = 0,
    speaking = false,
    holdingPhone = false,
    pointingBoard = false,
  } = {}) {
    // Natural periodic eye blink
    const blinkCycle = (t * 0.31 + (role === 'kurata' ? 0.4 : 0.1)) % 1.0;
    const blinkAmt = blinkCycle > 0.96 ? Math.sin(((blinkCycle - 0.96) / 0.04) * Math.PI) : 0;
    for (const lid of eyelids) {
      lid.rotation.x = -0.35 + blinkAmt * 1.15 - shock * 0.28;
    }

    // Eyebrow expression
    for (const b of brows) {
      b.mesh.position.y = 0.038 + shock * 0.008 - focus * 0.004;
      b.mesh.rotation.z = Math.PI / 2 - b.side * (0.06 - focus * 0.18 + shock * 0.12);
    }

    // Subtle jaw/lip speech movement
    mouth.scale.y = speaking ? 1.0 + Math.abs(Math.sin(t * 11.5)) * 1.6 : 1.0 + shock * 1.8;

    // Subtle breathing chest motion
    const breath = Math.sin(t * 2.1) * 0.012;
    spine.rotation.x = breath + lookingDown * 0.18;
    head.rotation.x = lookingDown * 0.35 - shock * 0.12;
    head.rotation.y = Math.sin(t * 0.55) * 0.05;

    if (seated) {
      pelvis.position.y = 0.52;
      leftLeg.hipJoint.rotation.x = -Math.PI * 0.47;
      leftLeg.kneeJoint.rotation.x = Math.PI * 0.48;
      rightLeg.hipJoint.rotation.x = -Math.PI * 0.47;
      rightLeg.kneeJoint.rotation.x = Math.PI * 0.48;
    } else if (walking > 0.01) {
      const w = walking;
      const ph = t * 5.2;
      pelvis.position.y = 0.92 + Math.abs(Math.sin(ph)) * 0.025 * w;
      leftLeg.hipJoint.rotation.x = Math.sin(ph) * 0.45 * w;
      leftLeg.kneeJoint.rotation.x = Math.max(0, -Math.cos(ph) * 0.42 * w);
      rightLeg.hipJoint.rotation.x = -Math.sin(ph) * 0.45 * w;
      rightLeg.kneeJoint.rotation.x = Math.max(0, Math.cos(ph) * 0.42 * w);
    } else {
      pelvis.position.y = 0.92;
      leftLeg.hipJoint.rotation.x = 0.03;
      leftLeg.kneeJoint.rotation.x = 0.04;
      rightLeg.hipJoint.rotation.x = -0.03;
      rightLeg.kneeJoint.rotation.x = 0.04;
    }

    if (typing) {
      leftArm.shoulder.rotation.set(-0.78, 0.18, 0.08);
      leftArm.elbow.rotation.set(-0.82 + Math.sin(t * 14) * 0.06, 0, 0);
      rightArm.shoulder.rotation.set(-0.78, -0.18, -0.08);
      rightArm.elbow.rotation.set(-0.82 + Math.cos(t * 15) * 0.06, 0, 0);
    } else if (holdingPhone) {
      rightArm.shoulder.rotation.set(-0.72, -0.22, -0.1);
      rightArm.elbow.rotation.set(-1.18, 0.25, 0);
      leftArm.shoulder.rotation.set(-0.18, 0, 0.06);
      leftArm.elbow.rotation.set(-0.22, 0, 0);
    } else if (pointingBoard) {
      rightArm.shoulder.rotation.set(-1.15, -0.35, -0.28);
      rightArm.elbow.rotation.set(-0.35, 0, 0);
      leftArm.shoulder.rotation.set(-0.2, 0, 0.08);
      leftArm.elbow.rotation.set(-0.3, 0, 0);
    } else if (shock > 0.3) {
      leftArm.shoulder.rotation.set(-0.95, 0.25, 0.18);
      leftArm.elbow.rotation.set(-1.1, 0, 0);
      rightArm.shoulder.rotation.set(-0.95, -0.25, -0.18);
      rightArm.elbow.rotation.set(-1.1, 0, 0);
    } else if (walking > 0.01) {
      const ph = t * 5.2;
      leftArm.shoulder.rotation.set(-Math.sin(ph) * 0.35 * walking, 0, 0.06);
      leftArm.elbow.rotation.set(-0.22, 0, 0);
      rightArm.shoulder.rotation.set(Math.sin(ph) * 0.35 * walking, 0, -0.06);
      rightArm.elbow.rotation.set(-0.22, 0, 0);
    } else {
      leftArm.shoulder.rotation.set(-0.08, 0, 0.07);
      leftArm.elbow.rotation.set(-0.18, 0, 0);
      rightArm.shoulder.rotation.set(-0.08, 0, -0.07);
      rightArm.elbow.rotation.set(-0.18, 0, 0);
    }
  }

  return {
    root,
    pelvis,
    spine,
    head,
    backpack,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
    setPose,
  };
}

/**
 * Dedicated High-Detail Macro Right Hand + Forearm Sleeve Rig for extreme tabletop close-ups!
 * (e.g. pinching the white STS3215 servo horn at 01:42 AM and feeling the 12-bit encoder torque pushback!)
 */
export function createMacroHandRig(mats) {
  const group = new THREE.Group();

  const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.044, 0.28, 22), mats.hoodieNavy);
  sleeve.rotation.x = Math.PI / 2;
  sleeve.position.set(0, 0, 0.19);
  sleeve.castShadow = true;
  group.add(sleeve);

  const wristMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.034, 0.06, 18), mats.skin);
  wristMesh.rotation.x = Math.PI / 2;
  wristMesh.position.set(0, 0, 0.04);
  group.add(wristMesh);

  const hand = buildRealisticHand(mats, 1, 0.68);
  hand.root.rotation.x = Math.PI / 2;
  group.add(hand.root);

  function setPinchPose(pinchAmt = 1.0, twistAngle = 0) {
    group.rotation.z = twistAngle;
    // Index finger & thumb pinch downward onto horn rim; middle/ring/little curl softly
    hand.fingers[0].knuckle.rotation.x = -0.48 * pinchAmt;
    hand.fingers[0].midJoint.rotation.x = -0.58 * pinchAmt;
    for (let i = 1; i < 4; i++) {
      hand.fingers[i].knuckle.rotation.x = -(0.78 + i * 0.08);
      hand.fingers[i].midJoint.rotation.x = -0.88;
    }
    hand.thumbBase.rotation.x = -0.45 * pinchAmt;
    hand.thumbTip.rotation.x = -0.38 * pinchAmt;
  }

  return { group, hand, setPinchPose };
}
