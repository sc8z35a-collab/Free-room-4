import * as THREE from 'three';
import { mergeRigidBoxesByMaterial } from './optimizer.js';

function addBox(parent, w, h, d, mat, x = 0, y = 0, z = 0, cast = true) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

/**
 * 1. GIANT MECHA TRACTOR "TT" -> GOD-MECHA "GIGA-TT" (巨重機トラクター TT / 超巨神重機・極TT)
 * Static chassis/cab/hood/exhaust subparts merged by material (Invention #3) + GIGA-TT wings & halo for Act 9!
 */
export function createTractorTT(mats) {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  // Merge all rigid chassis/hood/cab/bumper/exhaust boxes into compact per-material draw calls!
  mergeRigidBoxesByMaterial(body, [
    { w: 5.2, h: 1.5, d: 9.6, mat: mats.tractorBody, x: 0, y: 2.2, z: 0 },
    { w: 4.3, h: 0.45, d: 5.8, mat: mats.tractorBody, x: 0, y: 5.4, z: 2.0 },
    { w: 4.4, h: 3.2, d: 3.8, mat: mats.tractorBody, x: 0, y: 5.6, z: -2.1 },
    { w: 5.6, h: 0.7, d: 1.2, mat: mats.tractorHazard, x: 0, y: 1.6, z: 5.1 },
    { w: 5.4, h: 0.8, d: 1.0, mat: mats.tractorHazard, x: 0, y: 1.8, z: -4.9 },
    { w: 4.0, h: 2.6, d: 5.6, mat: mats.tractorCrimson, x: 0, y: 4.0, z: 2.0 },
    { w: 4.8, h: 0.5, d: 4.3, mat: mats.tractorCrimson, x: 0, y: 7.35, z: -2.1 },
    { w: 3.2, h: 2.2, d: 0.45, mat: mats.tractorEmblemTT, x: 0, y: 4.0, z: 4.95 },
    { w: 0.65, h: 4.8, d: 0.65, mat: mats.tractorSteel, x: -2.25, y: 6.2, z: 1.8 },
    { w: 0.65, h: 4.8, d: 0.65, mat: mats.tractorSteel, x: 2.25, y: 6.2, z: 1.8 },
    { w: 0.55, h: 0.7, d: 2.4, mat: mats.tractorSteel, x: -3.5, y: 1.6, z: 5.2 },
    { w: 0.55, h: 0.7, d: 2.4, mat: mats.tractorSteel, x: 3.5, y: 1.6, z: 5.2 },
    { w: 3.8, h: 1.25, d: 0.35, mat: mats.tractorCore, x: 0, y: 5.9, z: -0.1, cast: false },
    { w: 0.35, h: 1.1, d: 2.6, mat: mats.tractorCore, x: -2.2, y: 5.9, z: -2.1, cast: false },
    { w: 0.35, h: 1.1, d: 2.6, mat: mats.tractorCore, x: 2.2, y: 5.9, z: -2.1, cast: false },
    { w: 0.85, h: 0.6, d: 0.85, mat: mats.tractorCore, x: -2.25, y: 8.7, z: 1.8, cast: false },
    { w: 0.85, h: 0.6, d: 0.85, mat: mats.tractorCore, x: 2.25, y: 8.7, z: 1.8, cast: false },
    { w: 0.8, h: 0.65, d: 0.4, mat: mats.tractorCore, x: -1.7, y: 4.3, z: 4.9, cast: false },
    { w: 0.8, h: 0.65, d: 0.4, mat: mats.tractorCore, x: 1.7, y: 4.3, z: 4.9, cast: false },
  ]);

  const coreCage = addBox(body, 2.2, 1.4, 2.2, mats.tractorCore, 0, 8.2, -2.1, false);

  // 4 Giant Spiked Voxel Wheels (merged per wheel -> 3 draw calls per wheel)
  const wheels = [];
  const makeWheel = (wx, wy, wz, radius, width) => {
    const wg = new THREE.Group();
    wg.position.set(wx, wy, wz);
    const specs = [
      { w: width, h: radius * 2, d: radius * 1.45, mat: mats.tractorTire },
      { w: width, h: radius * 1.45, d: radius * 2, mat: mats.tractorTire },
      { w: width + 0.25, h: radius * 0.72, d: radius * 0.72, mat: mats.tractorHazard },
      { w: width + 0.35, h: radius * 0.35, d: radius * 0.35, mat: mats.tractorCore, cast: false },
    ];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      specs.push({ w: width * 1.06, h: 0.6, d: 0.6, mat: mats.tractorSteel, y: Math.cos(a) * radius, z: Math.sin(a) * radius });
    }
    mergeRigidBoxesByMaterial(wg, specs);
    root.add(wg);
    wheels.push({ group: wg, radius });
  };
  makeWheel(-3.35, 2.65, -2.4, 2.65, 1.85);
  makeWheel(3.35, 2.65, -2.4, 2.65, 1.85);
  makeWheel(-3.05, 1.9, 3.2, 1.9, 1.45);
  makeWheel(3.05, 1.9, 3.2, 1.9, 1.45);

  // Spinning Front Terrain-Shredder Drum (merged -> 2 draw calls!)
  const shredderPivot = new THREE.Group();
  shredderPivot.position.set(0, 1.4, 6.4);
  const shredSpecs = [{ w: 7.6, h: 1.35, d: 1.35, mat: mats.tractorSteel }];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    for (let x = -3.0; x <= 3.0; x += 2.0) {
      shredSpecs.push({ w: 0.55, h: 0.9, d: 0.45, mat: mats.tractorHazard, x, y: Math.cos(a) * 0.92, z: Math.sin(a) * 0.92 });
    }
  }
  mergeRigidBoxesByMaterial(shredderPivot, shredSpecs);
  body.add(shredderPivot);

  // Articulated Domain-Expansion Crane Arms
  const makeCraneArm = (side) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 2.75, 4.9, 1.0);
    mergeRigidBoxesByMaterial(shoulder, [
      { w: 1.0, h: 1.0, d: 1.0, mat: mats.tractorHazard },
      { w: 0.8, h: 0.8, d: 3.2, mat: mats.tractorSteel, x: side * 0.35, y: 0.2, z: 1.6 },
    ]);
    const elbow = new THREE.Group();
    elbow.position.set(side * 0.35, 0.2, 3.2);
    mergeRigidBoxesByMaterial(elbow, [
      { w: 0.9, h: 0.9, d: 0.9, mat: mats.tractorCrimson },
      { w: 0.7, h: 0.7, d: 2.8, mat: mats.tractorBody, z: 1.4 },
      { w: 0.26, h: 0.26, d: 1.3, mat: mats.tractorCore, x: -0.25, y: 0.22, z: 3.2, cast: false },
      { w: 0.26, h: 0.26, d: 1.3, mat: mats.tractorCore, x: 0.25, y: 0.22, z: 3.2, cast: false },
      { w: 0.26, h: 0.26, d: 1.1, mat: mats.tractorSteel, y: -0.22, z: 3.0 },
    ]);
    shoulder.add(elbow);
    body.add(shoulder);
    return { shoulder, elbow };
  };
  const leftArm = makeCraneArm(-1);
  const rightArm = makeCraneArm(1);

  // --- ACT 9-11 TRANSFORMATION: "GIGA-TT" GOD-MECHA ENERGY WINGS & HALO! ---
  const gigaGroup = new THREE.Group();
  gigaGroup.position.set(0, 6.2, -3.6);
  gigaGroup.visible = false;
  body.add(gigaGroup);

  const gigaHalo = new THREE.Mesh(new THREE.TorusGeometry(6.8, 0.28, 6, 28), mats.gigaWing);
  gigaHalo.position.set(0, 2.2, -0.8);
  gigaGroup.add(gigaHalo);

  const gigaWingL = new THREE.Group();
  const gigaWingR = new THREE.Group();
  const buildGigaWing = (parent, side) => {
    const wSpecs = [];
    for (let f = 0; f < 6; f++) {
      wSpecs.push({
        w: 1.1,
        h: 7.5 - f * 0.75,
        d: 0.35,
        mat: f % 2 === 0 ? mats.gigaWing : mats.tractorCore,
        x: side * (2.6 + f * 1.95),
        y: 1.6 + f * 0.85,
        z: -f * 0.3,
        cast: false,
      });
    }
    mergeRigidBoxesByMaterial(parent, wSpecs, false);
  };
  buildGigaWing(gigaWingL, -1);
  buildGigaWing(gigaWingR, 1);
  gigaGroup.add(gigaWingL, gigaWingR);

  function animate(t, { speed = 0, mudra = 0, roar = 0, giga = 0 } = {}) {
    body.position.y = Math.sin(t * 26) * (0.08 + speed * 0.015 + roar * 0.14);
    body.rotation.z = Math.sin(t * 14) * (0.015 + speed * 0.002);

    for (const w of wheels) {
      w.group.rotation.x = (t * speed * 1.4) / w.radius;
    }
    shredderPivot.rotation.x = t * (3.5 + speed * 1.2 + giga * 5.0);

    const m = Math.max(0, Math.min(1, mudra));
    leftArm.shoulder.rotation.set(-0.35 * m - 0.1 * (1 - m) - giga * 0.45, 0.78 * m - 0.25 * (1 - m), 0.2 * (1 - m) - giga * 0.5);
    leftArm.elbow.rotation.set(-0.25 * m, 0.92 * m, 0);
    rightArm.shoulder.rotation.set(-0.35 * m - 0.1 * (1 - m) - giga * 0.45, -0.78 * m + 0.25 * (1 - m), -0.2 * (1 - m) + giga * 0.5);
    rightArm.elbow.rotation.set(-0.25 * m, -0.92 * m, 0);

    const pulse = 1 + 0.35 * Math.sin(t * 16) * (m + roar + giga);
    coreCage.scale.setScalar(0.95 + (m + giga) * 0.55 * pulse);

    gigaGroup.visible = giga > 0.02;
    if (gigaGroup.visible) {
      const gs = Math.max(0.01, giga);
      gigaGroup.scale.setScalar(gs);
      gigaHalo.rotation.z = t * 1.8;
      const flap = Math.sin(t * 4.5) * 0.22;
      gigaWingL.rotation.y = 0.25 + flap;
      gigaWingR.rotation.y = -0.25 - flap;
    }
  }

  return { root, animate };
}

function createHumanoidRig(mats, cfg) {
  const root = new THREE.Group();
  root.scale.setScalar(cfg.scale ?? 1.38);

  const pelvis = new THREE.Group();
  pelvis.position.y = 1.05;
  root.add(pelvis);

  const leftLeg = new THREE.Group();
  leftLeg.position.set(-0.22, 0, 0);
  addBox(leftLeg, 0.36, 1.05, 0.38, cfg.legMat, 0, -0.52, 0);
  pelvis.add(leftLeg);

  const rightLeg = new THREE.Group();
  rightLeg.position.set(0.22, 0, 0);
  addBox(rightLeg, 0.36, 1.05, 0.38, cfg.legMat, 0, -0.52, 0);
  pelvis.add(rightLeg);

  const torso = new THREE.Group();
  torso.position.y = 0.05;
  addBox(torso, cfg.chestW ?? 0.88, 1.08, cfg.chestD ?? 0.48, cfg.torsoMat, 0, 0.54, 0);
  pelvis.add(torso);

  const head = new THREE.Group();
  head.position.set(0, 1.12, 0);
  addBox(head, 0.64, 0.64, 0.64, cfg.skinMat ?? mats.skin, 0, 0.32, 0);
  const eyeMat = cfg.eyeMat ?? mats.darkHair;
  mergeRigidBoxesByMaterial(head, [
    { w: 0.12, h: 0.09, d: 0.06, mat: eyeMat, x: -0.15, y: 0.35, z: 0.33, cast: false },
    { w: 0.12, h: 0.09, d: 0.06, mat: eyeMat, x: 0.15, y: 0.35, z: 0.33, cast: false },
  ], false);
  torso.add(head);

  const leftArm = new THREE.Group();
  leftArm.position.set(-(cfg.chestW ?? 0.88) * 0.5 - 0.18, 0.96, 0);
  addBox(leftArm, 0.32, 0.98, 0.34, cfg.armMat ?? cfg.torsoMat, 0, -0.4, 0);
  addBox(leftArm, 0.3, 0.24, 0.3, cfg.handMat ?? cfg.skinMat ?? mats.skin, 0, -0.94, 0);
  torso.add(leftArm);

  const rightArm = new THREE.Group();
  rightArm.position.set((cfg.chestW ?? 0.88) * 0.5 + 0.18, 0.96, 0);
  addBox(rightArm, 0.32, 0.98, 0.34, cfg.armMat ?? cfg.torsoMat, 0, -0.4, 0);
  addBox(rightArm, 0.3, 0.24, 0.3, cfg.handMat ?? cfg.skinMat ?? mats.skin, 0, -0.94, 0);
  torso.add(rightArm);

  return { root, pelvis, torso, head, leftArm, rightArm, leftLeg, rightLeg };
}

/**
 * 2. CREATOR RIU (創造主リウ / 創造主りう)
 */
export function createCreatorRiu(mats) {
  const rig = createHumanoidRig(mats, {
    scale: 1.48,
    torsoMat: mats.riuWhite,
    armMat: mats.riuWhite,
    legMat: mats.riuEmerald,
    skinMat: mats.skinPale,
    eyeMat: mats.riuGlow,
    chestW: 0.92,
  });

  addBox(rig.pelvis, 0.96, 0.92, 0.56, mats.riuWhite, 0, -0.35, 0);
  mergeRigidBoxesByMaterial(rig.torso, [
    { w: 0.96, h: 0.22, d: 0.54, mat: mats.riuGold, y: 0.14 },
    { w: 0.42, h: 0.24, d: 0.56, mat: mats.riuGold, x: -0.58, y: 1.02 },
    { w: 0.42, h: 0.24, d: 0.56, mat: mats.riuGold, x: 0.58, y: 1.02 },
    { w: 0.26, h: 1.05, d: 0.53, mat: mats.riuEmerald, y: 0.54 },
  ]);
  mergeRigidBoxesByMaterial(rig.head, [
    { w: 0.72, h: 0.24, d: 0.72, mat: mats.silverHair, y: 0.62, z: -0.02 },
    { w: 0.72, h: 0.58, d: 0.22, mat: mats.silverHair, y: 0.35, z: -0.28 },
    { w: 0.74, h: 0.12, d: 0.74, mat: mats.riuGold, y: 0.54 },
  ]);

  const haloGroup = new THREE.Group();
  haloGroup.position.set(0, 0.95, -0.55);
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.06, 6, 16), mats.riuGold);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.05, 6, 12), mats.riuGlow);
  haloGroup.add(ring1, ring2);
  rig.torso.add(haloGroup);

  const orbInst = new THREE.InstancedMesh(new THREE.BoxGeometry(0.24, 0.24, 0.24), mats.riuGlow, 6);
  const orbDummy = new THREE.Object3D();
  rig.torso.add(orbInst);

  const staff = new THREE.Group();
  staff.position.set(0, -0.88, 0.16);
  addBox(staff, 0.12, 2.8, 0.12, mats.riuGold, 0, 0.4, 0);
  const staffCrystal = addBox(staff, 0.38, 0.55, 0.38, mats.riuGlow, 0, 1.95, 0, false);
  rig.rightArm.add(staff);

  function animate(t, mode = 'float') {
    ring1.rotation.z = t * 1.4;
    ring2.rotation.z = -t * 2.1;
    ring2.rotation.y = Math.sin(t * 1.5) * 0.4;
    staffCrystal.rotation.y = t * 3.5;

    for (let i = 0; i < 6; i++) {
      const a = t * 2.0 + (i / 6) * Math.PI * 2;
      orbDummy.position.set(Math.cos(a) * 1.45, 0.7 + Math.sin(t * 3 + i) * 0.35, Math.sin(a) * 1.45);
      orbDummy.rotation.set(t * 2, t * 2.4, 0);
      orbDummy.updateMatrix();
      orbInst.setMatrixAt(i, orbDummy.matrix);
    }
    orbInst.instanceMatrix.needsUpdate = true;

    rig.pelvis.position.y = 1.05 + Math.sin(t * 2.8) * 0.12;
    rig.leftLeg.rotation.x = 0.12 * Math.sin(t * 2.2);
    rig.rightLeg.rotation.x = -0.12 * Math.sin(t * 2.2);
    rig.head.rotation.set(0, 0, 0);
    staff.visible = true;

    if (mode === 'cast') {
      rig.rightArm.rotation.set(-2.3, 0, 0.2);
      rig.leftArm.rotation.set(-1.5, 0, -0.45);
      rig.torso.rotation.x = 0.16;
    } else if (mode === 'shrug') {
      staff.visible = false;
      rig.head.rotation.set(0.08, 0.18, 0.26);
      rig.leftArm.rotation.set(-0.65, 0, -0.75);
      rig.rightArm.rotation.set(-0.85, 0, 0.65);
      rig.torso.rotation.x = -0.05;
    } else if (mode === 'snap') {
      staff.visible = false;
      rig.head.rotation.set(-0.08, -0.12, 0.1);
      rig.rightArm.rotation.set(-1.9, 0.15, 0.25);
      rig.leftArm.rotation.set(-0.3, 0, -0.35);
      rig.torso.rotation.x = -0.08;
    } else if (mode === 'empower') {
      // Channeling Emerald Genesis directly into Joseph's fists!
      rig.rightArm.rotation.set(-1.6, -0.25, 0.15);
      rig.leftArm.rotation.set(-1.6, 0.25, -0.15);
      rig.torso.rotation.x = 0.1;
    } else {
      rig.rightArm.rotation.set(-0.55, 0, 0.25);
      rig.leftArm.rotation.set(-0.25 + Math.sin(t * 2) * 0.1, 0, -0.2);
      rig.torso.rotation.x = 0.04;
    }
  }

  return { ...rig, animate };
}

/**
 * 3. QUEEN LILITH I (リリス1世) + 4-DRAW-CALL INSTANCED ROYAL LEGION (総出軍団)
 */
export function createLilithFirst(mats) {
  const rig = createHumanoidRig(mats, {
    scale: 1.46,
    torsoMat: mats.lilithArmor,
    armMat: mats.lilithArmor,
    legMat: mats.lilithDark,
    skinMat: mats.skinPale,
    eyeMat: mats.alertRed,
    chestW: 0.84,
  });

  addBox(rig.pelvis, 0.94, 0.85, 0.56, mats.lilithArmor, 0, -0.32, 0);
  mergeRigidBoxesByMaterial(rig.torso, [
    { w: 0.45, h: 0.55, d: 0.54, mat: mats.lilithGold, y: 0.65 },
    { w: 0.36, h: 0.25, d: 0.52, mat: mats.lilithGold, x: -0.55, y: 1.0 },
    { w: 0.36, h: 0.25, d: 0.52, mat: mats.lilithGold, x: 0.55, y: 1.0 },
  ]);
  mergeRigidBoxesByMaterial(rig.head, [
    { w: 0.72, h: 0.26, d: 0.72, mat: mats.lilithDark, y: 0.62, z: -0.04 },
    { w: 0.76, h: 0.82, d: 0.22, mat: mats.lilithDark, y: 0.22, z: -0.3 },
    { w: 0.72, h: 0.16, d: 0.72, mat: mats.lilithGold, y: 0.72 },
    { w: 0.12, h: 0.28, d: 0.12, mat: mats.lilithGold, x: -0.26, y: 0.88, z: 0.26 },
    { w: 0.12, h: 0.28, d: 0.12, mat: mats.lilithGold, x: 0, y: 0.88, z: 0.26 },
    { w: 0.12, h: 0.28, d: 0.12, mat: mats.lilithGold, x: 0.26, y: 0.88, z: 0.26 },
  ]);

  const makeWing = (side) => {
    const wg = new THREE.Group();
    wg.position.set(side * 0.3, 0.88, -0.32);
    const wSpecs = [{ w: 1.25, h: 0.24, d: 0.12, mat: mats.lilithGold, x: side * 0.62, y: 0.25, z: -0.1 }];
    for (let f = 0; f < 5; f++) {
      wSpecs.push({ w: 0.24, h: 1.45 - f * 0.16, d: 0.1, mat: mats.lilithWing, x: side * (0.38 + f * 0.28), y: -0.15 + f * 0.14, z: -0.12, cast: false });
    }
    mergeRigidBoxesByMaterial(wg, wSpecs);
    rig.torso.add(wg);
    return wg;
  };
  const leftWing = makeWing(-1);
  const rightWing = makeWing(1);

  const lance = new THREE.Group();
  lance.position.set(0, -0.88, 0.15);
  addBox(lance, 0.12, 3.2, 0.12, mats.lilithGold, 0, 0.55, 0);
  addBox(lance, 0.28, 0.72, 0.12, mats.alertRed, 0, 2.35, 0, false);
  rig.rightArm.add(lance);

  function animate(t, mode = 'charge') {
    const flap = Math.sin(t * 7.5) * 0.45;
    leftWing.rotation.y = 0.45 + flap;
    rightWing.rotation.y = -0.45 - flap;
    if (mode === 'charge') {
      rig.torso.rotation.x = 0.28;
      rig.rightArm.rotation.set(-1.35 + Math.sin(t * 10) * 0.2, 0, 0.15);
      rig.leftArm.rotation.set(-0.85, 0, -0.5);
      rig.leftLeg.rotation.x = Math.sin(t * 11) * 0.65;
      rig.rightLeg.rotation.x = -Math.sin(t * 11) * 0.65;
    } else if (mode === 'command') {
      rig.torso.rotation.x = 0.08;
      rig.rightArm.rotation.set(-1.75, 0, 0.25);
      rig.leftArm.rotation.set(-0.5, 0, -0.35);
      rig.leftLeg.rotation.x = 0.18;
      rig.rightLeg.rotation.x = -0.18;
    } else {
      rig.torso.rotation.x = 0.05;
      rig.rightArm.rotation.set(-0.6, 0, 0.2);
      rig.leftArm.rotation.set(-0.4, 0, -0.2);
      rig.leftLeg.rotation.x = 0;
      rig.rightLeg.rotation.x = 0;
    }
  }

  return { ...rig, animate };
}

/**
 * INVENTION #3B: 4-Draw-Call Instanced Articulated Royal Legion!
 * Replaces 308 draw calls (22 soldiers x 14 boxes) with ONLY 4 InstancedMeshes!
 */
export function createLilithLegion(scene, mats, count = 22) {
  const group = new THREE.Group();
  scene.add(group);

  const armorInst = new THREE.InstancedMesh(new THREE.BoxGeometry(1.02, 2.35, 0.65), mats.knightArmor, count);
  const helmetInst = new THREE.InstancedMesh(new THREE.BoxGeometry(0.76, 0.78, 0.76), mats.knightSteel, count);
  const spearInst = new THREE.InstancedMesh(new THREE.BoxGeometry(0.14, 3.1, 0.14), mats.lilithGold, count);
  const bannerInst = new THREE.InstancedMesh(new THREE.BoxGeometry(0.95, 1.35, 0.12), mats.lilithWing, count);

  armorInst.castShadow = true;
  armorInst.receiveShadow = true;
  helmetInst.castShadow = true;
  armorInst.frustumCulled = false;
  helmetInst.frustumCulled = false;
  spearInst.frustumCulled = false;
  bannerInst.frustumCulled = false;
  group.add(armorInst, helmetInst, spearInst, bannerInst);

  const soldiers = [];
  for (let i = 0; i < count; i++) {
    soldiers.push({
      angle: (i / count) * Math.PI * 2,
      ring: i < 10 ? 1 : 2,
      phase: i * 0.73,
      hasBanner: i % 3 === 0,
    });
  }

  const dummy = new THREE.Object3D();

  function update(t, visible, centerPos, radiusScale = 1, fighting = false, airborneY = 0) {
    group.visible = visible;
    if (!visible) return;

    for (let i = 0; i < count; i++) {
      const s = soldiers[i];
      const baseR = (s.ring === 1 ? 6.2 : 10.5) * radiusScale;
      const a = s.angle + (fighting ? Math.sin(t * 1.4 + s.phase) * 0.28 : 0);
      const sx = centerPos.x + Math.cos(a) * baseR;
      const sz = centerPos.z + Math.sin(a) * baseR;
      const hop = airborneY > 0
        ? airborneY + Math.sin(t * 4.5 + s.phase) * 1.4
        : (fighting ? Math.abs(Math.sin(t * 8.5 + s.phase)) * 0.65 : Math.abs(Math.sin(t * 6 + s.phase)) * 0.22);
      const yaw = Math.atan2(centerPos.x - sx, centerPos.z - sz);

      // Armored knight body
      dummy.position.set(sx, hop + 1.18, sz);
      dummy.rotation.set(fighting ? 0.14 : 0.04, yaw, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      armorInst.setMatrixAt(i, dummy.matrix);

      // Steel helmet
      dummy.position.set(sx, hop + 2.75, sz);
      dummy.rotation.set(0, yaw, 0);
      dummy.updateMatrix();
      helmetInst.setMatrixAt(i, dummy.matrix);

      // Thrusting golden spear
      const thrust = fighting ? Math.sin(t * 13 + s.phase) * 0.55 : 0;
      const fwdX = Math.sin(yaw);
      const fwdZ = Math.cos(yaw);
      dummy.position.set(sx + fwdZ * 0.65 + fwdX * (0.45 + thrust), hop + 2.1, sz - fwdX * 0.65 + fwdZ * (0.45 + thrust));
      dummy.rotation.set(fighting ? 1.15 : 0.45, yaw, 0);
      dummy.updateMatrix();
      spearInst.setMatrixAt(i, dummy.matrix);

      // Fluttering crimson royal banner
      if (s.hasBanner) {
        dummy.position.set(sx - fwdX * 0.45, hop + 3.45, sz - fwdZ * 0.45);
        dummy.rotation.set(0, yaw + Math.sin(t * 9 + s.phase) * 0.35, 0);
        dummy.scale.set(1, 1, 1);
      } else {
        dummy.position.set(0, -50, 0);
        dummy.scale.setScalar(0.0001);
      }
      dummy.updateMatrix();
      bannerInst.setMatrixAt(i, dummy.matrix);
    }

    armorInst.instanceMatrix.needsUpdate = true;
    helmetInst.instanceMatrix.needsUpdate = true;
    spearInst.instanceMatrix.needsUpdate = true;
    bannerInst.instanceMatrix.needsUpdate = true;
  }

  return { group, soldiers, update };
}

/**
 * 4. JOSEPH JOESTAR (ジョセフ・ジョースター)
 * Upgraded with 2-Draw-Call Instanced 64-Fist ORA-ORA Rig supporting BOTH Purple-Gold (Act 8)
 * AND Divine Emerald-Gold Cosmic ORA-ORA Overdrive (Act 12)!
 */
export function createJosephJoestar(mats) {
  const rig = createHumanoidRig(mats, {
    scale: 1.5,
    torsoMat: mats.josephJacket,
    armMat: mats.josephJacket,
    legMat: mats.josephPants,
    skinMat: mats.skin,
    eyeMat: mats.darkHair,
    chestW: 1.02,
    chestD: 0.54,
  });

  mergeRigidBoxesByMaterial(rig.torso, [
    { w: 0.52, h: 1.0, d: 0.56, mat: mats.josephShirt, y: 0.52, z: 0.02 },
    { w: 1.04, h: 0.16, d: 0.58, mat: mats.tractorHazard, y: 0.08 },
    { w: 0.86, h: 0.22, d: 0.66, mat: mats.josephScarf, y: 1.02 },
  ]);
  mergeRigidBoxesByMaterial(rig.head, [
    { w: 0.72, h: 0.26, d: 0.72, mat: mats.darkHair, y: 0.66 },
    { w: 0.26, h: 0.28, d: 0.28, mat: mats.darkHair, x: -0.22, y: 0.82, z: 0.12 },
    { w: 0.28, h: 0.34, d: 0.28, mat: mats.darkHair, x: 0.08, y: 0.86, z: 0.18 },
    { w: 0.24, h: 0.26, d: 0.26, mat: mats.darkHair, x: 0.26, y: 0.8, z: 0.06 },
    { w: 0.7, h: 0.13, d: 0.7, mat: mats.josephHeadband, y: 0.5, z: 0.01 },
  ]);

  // Billowing Striped Scarf
  const scarfSegs = [];
  let scarfParent = rig.torso;
  for (let i = 0; i < 5; i++) {
    const seg = new THREE.Group();
    seg.position.set(i === 0 ? 0.26 : 0, i === 0 ? 0.96 : 0, i === 0 ? -0.35 : -0.44);
    addBox(seg, 0.36 - i * 0.02, 0.12, 0.46, mats.josephScarf, 0, 0, -0.22);
    scarfParent.add(seg);
    scarfParent = seg;
    scarfSegs.push(seg);
  }

  const hamonLeft = addBox(rig.leftArm, 0.42, 0.42, 0.42, mats.hamonGold, 0, -0.96, 0, false);
  const hamonRight = addBox(rig.rightArm, 0.42, 0.42, 0.42, mats.hamonGold, 0, -0.96, 0, false);

  const angerMark = new THREE.Group();
  angerMark.position.set(0.56, 0.72, 0.25);
  mergeRigidBoxesByMaterial(angerMark, [
    { w: 0.36, h: 0.09, d: 0.09, mat: mats.alertRed, y: 0.12, cast: false },
    { w: 0.09, h: 0.36, d: 0.09, mat: mats.alertRed, x: 0.12, cast: false },
    { w: 0.36, h: 0.09, d: 0.09, mat: mats.alertRed, y: -0.12, cast: false },
    { w: 0.09, h: 0.36, d: 0.09, mat: mats.alertRed, x: -0.12, cast: false },
  ], false);
  angerMark.visible = false;
  rig.head.add(angerMark);

  // INVENTION #3C: 2-Draw-Call Instanced 64-Fist ORA-ORA Barrage Rig (down from 96 draw calls!)
  const oraGroup = new THREE.Group();
  oraGroup.position.set(0, 1.55, 0.9);
  oraGroup.visible = false;
  rig.root.add(oraGroup);

  const fistGeo = new THREE.BoxGeometry(0.54, 0.5, 2.25);
  const oraInstA = new THREE.InstancedMesh(fistGeo, mats.oraFist, 36);
  const oraInstB = new THREE.InstancedMesh(fistGeo, mats.oraFistGold, 28);
  oraInstA.frustumCulled = false;
  oraInstB.frustumCulled = false;
  oraGroup.add(oraInstA, oraInstB);

  const fistMeta = [];
  for (let i = 0; i < 64; i++) {
    fistMeta.push({
      isB: i >= 36,
      idx: i >= 36 ? i - 36 : i,
      laneX: ((i % 8) - 3.5) * 0.56 + Math.sin(i * 2.1) * 0.22,
      laneY: ((Math.floor(i / 8) % 6) - 2.5) * 0.45 + Math.cos(i * 1.7) * 0.18,
      phase: (i / 64) * Math.PI * 2,
      speed: 14 + (i % 5) * 2.2,
    });
  }
  const fistDummy = new THREE.Object3D();

  function animate(t, mode = 'run') {
    const isOra = mode === 'ora' || mode === 'cosmicOra';
    const wind = isOra ? 2.6 : mode === 'rage' ? 1.8 : 1.0;
    for (let i = 0; i < scarfSegs.length; i++) {
      scarfSegs[i].rotation.x = 0.22 + Math.sin(t * 9 * wind - i * 0.85) * 0.26;
      scarfSegs[i].rotation.y = Math.cos(t * 6 * wind - i * 0.7) * 0.22;
    }

    const showHamon = mode === 'battle' || mode === 'rage' || isOra || mode === 'empowered';
    hamonLeft.visible = showHamon;
    hamonRight.visible = showHamon;
    if (showHamon) {
      hamonLeft.material = (mode === 'cosmicOra' || mode === 'empowered') ? mats.riuGlow : mats.hamonGold;
      hamonRight.material = mats.hamonGold;
      hamonLeft.rotation.set(t * 14, t * 11, 0);
      hamonRight.rotation.set(-t * 13, t * 15, 0);
      const s = isOra ? 1.55 : mode === 'empowered' ? 1.35 : 0.95 + Math.sin(t * 24) * 0.25;
      hamonLeft.scale.setScalar(s);
      hamonRight.scale.setScalar(s);
    }

    angerMark.visible = mode === 'rage' || mode === 'ora';
    if (angerMark.visible) {
      angerMark.scale.setScalar(1.0 + Math.abs(Math.sin(t * 18)) * 0.45);
      angerMark.rotation.z = Math.sin(t * 20) * 0.18;
    }

    oraGroup.visible = isOra;
    if (isOra) {
      // Switch primary barrage material to Emerald Creation Glow during Act 12 Cosmic Finale!
      oraInstA.material = mode === 'cosmicOra' ? mats.oraFistEmerald : mats.oraFist;
      const reachMul = mode === 'cosmicOra' ? 12.5 : 8.0;
      const scaleMul = mode === 'cosmicOra' ? 1.45 : 1.0;

      for (let i = 0; i < fistMeta.length; i++) {
        const f = fistMeta[i];
        const cycle = ((t * f.speed + f.phase) % (Math.PI * 2)) / (Math.PI * 2);
        const reach = cycle * reachMul;
        const sc = (Math.sin(cycle * Math.PI) * 1.45 + 0.35) * scaleMul;
        fistDummy.position.set(f.laneX * (0.65 + cycle * 1.35) * scaleMul, f.laneY * (0.65 + cycle * 1.2) * scaleMul, reach);
        fistDummy.rotation.set(0, 0, 0);
        fistDummy.scale.set(sc * 0.85, sc * 0.85, sc * 1.1);
        fistDummy.updateMatrix();
        if (f.isB) oraInstB.setMatrixAt(f.idx, fistDummy.matrix);
        else oraInstA.setMatrixAt(f.idx, fistDummy.matrix);
      }
      oraInstA.instanceMatrix.needsUpdate = true;
      oraInstB.instanceMatrix.needsUpdate = true;
    }

    if (mode === 'run') {
      rig.torso.rotation.set(0.22, 0, 0);
      rig.leftLeg.rotation.x = Math.sin(t * 12) * 0.75;
      rig.rightLeg.rotation.x = -Math.sin(t * 12) * 0.75;
      rig.leftArm.rotation.set(-Math.sin(t * 12) * 0.85, 0, -0.2);
      rig.rightArm.rotation.set(Math.sin(t * 12) * 0.85, 0, 0.2);
      rig.pelvis.position.y = 1.05 + Math.abs(Math.sin(t * 12)) * 0.14;
    } else if (mode === 'battle' || mode === 'empowered') {
      rig.torso.rotation.set(0.15, Math.sin(t * 10) * 0.25, 0);
      rig.leftLeg.rotation.x = 0.32;
      rig.rightLeg.rotation.x = -0.32;
      rig.leftArm.rotation.set(-1.35 + Math.sin(t * 15) * 0.45, 0.2, -0.35);
      rig.rightArm.rotation.set(-1.35 - Math.sin(t * 15) * 0.45, -0.2, 0.35);
    } else if (mode === 'rage') {
      rig.torso.rotation.set(-0.15, Math.sin(t * 48) * 0.08, 0);
      rig.leftLeg.rotation.x = 0.15;
      rig.rightLeg.rotation.x = -0.15;
      rig.leftArm.rotation.set(-0.65, 0, -0.65);
      rig.rightArm.rotation.set(-0.65, 0, 0.65);
      rig.head.rotation.x = -0.15;
    } else if (isOra) {
      rig.torso.rotation.set(0.28, Math.sin(t * 45) * 0.25, 0);
      rig.leftLeg.rotation.x = 0.4;
      rig.rightLeg.rotation.x = -0.38;
      rig.leftArm.rotation.set(-1.55 + Math.sin(t * 58) * 0.65, 0.15, -0.15);
      rig.rightArm.rotation.set(-1.55 - Math.sin(t * 58) * 0.65, -0.15, 0.15);
    } else {
      rig.torso.rotation.set(-0.14, 0.32, 0.08);
      rig.leftLeg.rotation.x = 0.25;
      rig.rightLeg.rotation.x = -0.25;
      rig.rightArm.rotation.set(-1.9, 0.2, 0.35);
      rig.leftArm.rotation.set(-0.9, 0.4, -0.6);
      rig.head.rotation.set(-0.1, -0.25, 0);
    }
  }

  return { ...rig, animate };
}

/**
 * 5. SHIJO KIRAKU (四条気楽)
 * Upgraded with Twin Azure + Crimson Convergence Orbs -> Hollow Violet Annihilation Beam (Act 10)!
 */
export function createShijoKiraku(mats) {
  const rig = createHumanoidRig(mats, {
    scale: 1.5,
    torsoMat: mats.kirakuCoat,
    armMat: mats.kirakuCoat,
    legMat: mats.kirakuCoat,
    skinMat: mats.skinPale,
    eyeMat: mats.kirakuEye,
    chestW: 0.88,
  });

  mergeRigidBoxesByMaterial(rig.torso, [
    { w: 0.96, h: 0.28, d: 0.56, mat: mats.kirakuCoat, y: 1.05, z: -0.02 },
    { w: 0.2, h: 1.05, d: 0.52, mat: mats.kirakuTrim, y: 0.54 },
  ]);
  addBox(rig.pelvis, 0.96, 0.92, 0.58, mats.kirakuCoat, 0, -0.35, -0.06);
  mergeRigidBoxesByMaterial(rig.head, [
    { w: 0.76, h: 0.32, d: 0.76, mat: mats.silverHair, y: 0.68, z: -0.02 },
    { w: 0.26, h: 0.32, d: 0.26, mat: mats.silverHair, x: -0.2, y: 0.88, z: 0.08 },
    { w: 0.28, h: 0.38, d: 0.28, mat: mats.silverHair, x: 0.14, y: 0.92, z: 0.05 },
    { w: 0.68, h: 0.18, d: 0.14, mat: mats.kirakuCoat, y: 0.37, z: 0.29 },
    { w: 0.16, h: 0.09, d: 0.08, mat: mats.kirakuEye, x: -0.15, y: 0.37, z: 0.36, cast: false },
    { w: 0.16, h: 0.09, d: 0.08, mat: mats.kirakuEye, x: 0.15, y: 0.37, z: 0.36, cast: false },
  ]);

  const orbInst = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.28, 1), mats.kirakuOrb, 4);
  const orbDummy = new THREE.Object3D();
  rig.torso.add(orbInst);

  // Singularity Core + Act 10 Twin Azure/Crimson Fusion Orbs + Hollow Annihilation Beam!
  const singularity = new THREE.Group();
  singularity.position.set(0, 0.95, 1.85);
  const coreSphere = new THREE.Mesh(new THREE.IcosahedronGeometry(0.65, 2), mats.kirakuOrb);
  const outerRing = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.07, 6, 18), mats.kirakuEye);
  singularity.add(coreSphere, outerRing);
  rig.torso.add(singularity);

  const orbBlue = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), mats.kirakuBlue);
  const orbRed = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), mats.kirakuRed);
  orbBlue.visible = false;
  orbRed.visible = false;
  rig.torso.add(orbBlue, orbRed);

  const hollowBeam = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 2.2, 46, 12, 1, true), mats.kirakuHollow);
  hollowBeam.rotation.x = Math.PI / 2;
  hollowBeam.position.set(0, 0.95, 25);
  hollowBeam.visible = false;
  rig.torso.add(hollowBeam);

  function animate(t, charge = 0, hollowPhase = 0) {
    rig.pelvis.position.y = 1.05 + Math.sin(t * 3.1) * 0.18;
    rig.torso.rotation.x = 0.06;
    rig.rightArm.rotation.set(-1.55 - (charge + hollowPhase) * 0.22, -0.15, 0.12);
    rig.leftArm.rotation.set(hollowPhase > 0.1 ? -1.5 : -0.4, 0, -0.35);

    for (let i = 0; i < 4; i++) {
      const a = t * 3.2 + (i / 4) * Math.PI * 2;
      orbDummy.position.set(Math.cos(a) * 1.4, 0.7 + Math.sin(t * 4 + i) * 0.4, Math.sin(a) * 1.4);
      orbDummy.rotation.set(t * 3, t * 2, 0);
      orbDummy.updateMatrix();
      orbInst.setMatrixAt(i, orbDummy.matrix);
    }
    orbInst.instanceMatrix.needsUpdate = true;

    const totalCharge = Math.max(charge, hollowPhase);
    singularity.visible = totalCharge > 0.02;
    if (singularity.visible) {
      const s = 0.25 + totalCharge * 2.5 + Math.sin(t * 28) * 0.12 * totalCharge;
      singularity.scale.setScalar(s);
      coreSphere.rotation.set(t * 5, t * 7, 0);
      outerRing.rotation.set(t * 6, -t * 4, t * 3);
    }

    // Act 10 Twin Azure + Crimson Convergence -> Blinding Hollow Violet Beam!
    const merging = hollowPhase > 0.02 && hollowPhase < 0.55;
    orbBlue.visible = merging;
    orbRed.visible = merging;
    if (merging) {
      const sep = (1 - hollowPhase / 0.55) * 3.8;
      orbBlue.position.set(-sep, 1.0 + Math.sin(t * 14) * 0.3, 1.85);
      orbRed.position.set(sep, 1.0 - Math.sin(t * 14) * 0.3, 1.85);
    }
    const firing = hollowPhase >= 0.52;
    hollowBeam.visible = firing;
    if (firing) {
      const w = 0.65 + Math.sin(t * 32) * 0.25;
      hollowBeam.scale.set(w, 1, w);
    }
  }

  return { ...rig, animate };
}

/**
 * 6. WOLF "MAAKI RINGS" (オオカミ「まーきリングス」)
 * Upgraded with 5-Ring Aerial Flight Overdrive Mode for Act 10!
 */
export function createWolfMaakiRings(mats) {
  const root = new THREE.Group();
  root.scale.setScalar(1.45);

  const body = new THREE.Group();
  body.position.y = 1.35;
  root.add(body);

  mergeRigidBoxesByMaterial(body, [
    { w: 1.05, h: 0.92, d: 2.25, mat: mats.wolfFur },
    { w: 1.15, h: 0.98, d: 0.95, mat: mats.wolfDark, y: 0.08, z: 0.65 },
    { w: 1.14, h: 0.36, d: 1.25, mat: mats.wolfArmor, y: 0.34, z: -0.15 },
  ]);

  const neck = new THREE.Group();
  neck.position.set(0, 0.32, 1.05);
  addBox(neck, 0.68, 0.72, 0.68, mats.wolfFur, 0, 0.25, 0.18);
  body.add(neck);

  const head = new THREE.Group();
  head.position.set(0, 0.55, 0.35);
  mergeRigidBoxesByMaterial(head, [
    { w: 0.76, h: 0.68, d: 0.82, mat: mats.wolfFur, y: 0.1, z: 0.15 },
    { w: 0.44, h: 0.26, d: 0.68, mat: mats.wolfFur, y: 0.05, z: 0.78 },
    { w: 0.18, h: 0.14, d: 0.12, mat: mats.wolfArmor, y: 0.12, z: 1.12 },
    { w: 0.18, h: 0.44, d: 0.2, mat: mats.wolfDark, x: -0.26, y: 0.58, z: 0.02 },
    { w: 0.18, h: 0.44, d: 0.2, mat: mats.wolfDark, x: 0.26, y: 0.58, z: 0.02 },
    { w: 0.78, h: 0.15, d: 0.24, mat: mats.wolfVisor, y: 0.24, z: 0.48, cast: false },
  ]);

  const jaw = new THREE.Group();
  jaw.position.set(0, -0.12, 0.45);
  addBox(jaw, 0.38, 0.16, 0.58, mats.wolfDark, 0, -0.06, 0.28);
  head.add(jaw);
  neck.add(head);

  const tail = new THREE.Group();
  tail.position.set(0, 0.18, -1.1);
  mergeRigidBoxesByMaterial(tail, [
    { w: 0.36, h: 0.36, d: 1.35, mat: mats.wolfFur, y: 0.1, z: -0.62 },
    { w: 0.32, h: 0.32, d: 0.45, mat: mats.wolfDark, y: 0.16, z: -1.32 },
  ]);
  body.add(tail);

  const legs = [];
  for (const [lx, lz] of [[-0.36, 0.75], [0.36, 0.75], [-0.36, -0.8], [0.36, -0.8]]) {
    const leg = new THREE.Group();
    leg.position.set(lx, -0.32, lz);
    mergeRigidBoxesByMaterial(leg, [
      { w: 0.3, h: 1.05, d: 0.32, mat: mats.wolfFur, y: -0.5 },
      { w: 0.34, h: 0.22, d: 0.4, mat: mats.wolfArmor, y: -0.96, z: 0.06 },
    ]);
    body.add(leg);
    legs.push(leg);
  }

  // Iconic "Maaki Rings" (3 base + 2 overdrive outer rings!)
  const ringsGroup = new THREE.Group();
  ringsGroup.position.set(0, 0.25, 0.15);
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.085, 6, 20), mats.maakiRing);
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.92, 0.065, 6, 20), mats.wolfVisor);
  const ringC = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.06, 6, 16), mats.maakiRing);
  const ringD = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.075, 6, 22), mats.maakiRing);
  const ringE = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.06, 6, 24), mats.alertRed);
  ringD.visible = false;
  ringE.visible = false;
  ringsGroup.add(ringA, ringB, ringC, ringD, ringE);
  body.add(ringsGroup);

  const sonarRings = [];
  for (let i = 0; i < 4; i++) {
    const sr = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.09, 6, 22), mats.alertRed);
    sr.rotation.x = Math.PI / 2;
    sr.visible = false;
    root.add(sr);
    sonarRings.push(sr);
  }

  function animate(t, howlIntensity = 0, overdrive = 0) {
    const spd = 1 + overdrive * 1.8;
    ringA.rotation.set(t * 2.2 * spd, t * 1.6 * spd, 0);
    ringB.rotation.set(-t * 1.4 * spd, t * 2.6 * spd, Math.PI / 3);
    ringC.rotation.set(Math.PI / 4, -t * 3.1 * spd, t * 1.8 * spd);
    ringD.visible = overdrive > 0.1;
    ringE.visible = overdrive > 0.1;
    if (ringD.visible) {
      ringD.rotation.set(t * 3.5, -t * 2.2, 0.5);
      ringE.rotation.set(-t * 2.6, t * 3.8, -0.4);
    }

    const h = Math.max(0, Math.min(1, howlIntensity));
    neck.rotation.x = -0.15 - h * 0.72;
    head.rotation.x = -h * 0.38;
    jaw.rotation.x = h * (0.48 + Math.sin(t * 22) * 0.08);
    tail.rotation.y = Math.sin(t * 5 * spd) * 0.25;
    tail.rotation.x = 0.25 + h * 0.25;

    body.position.y = 1.35 + h * 0.12;
    const gallop = overdrive > 0.2 ? Math.sin(t * 16) * 0.65 : 0;
    legs[0].rotation.x = -0.18 * h + gallop;
    legs[1].rotation.x = -0.18 * h - gallop;
    legs[2].rotation.x = 0.15 * h - gallop;
    legs[3].rotation.x = 0.15 * h + gallop;

    for (let i = 0; i < sonarRings.length; i++) {
      const sr = sonarRings[i];
      sr.visible = h > 0.15;
      if (sr.visible) {
        const p = ((t * 1.35 + i * 0.25) % 1.0);
        sr.position.set(0, 2.4 + p * 38, 1.2 + p * 4);
        sr.scale.setScalar(0.6 + p * 6.5);
      }
    }
  }

  return { root, animate };
}

/**
 * 7. CAPTAIN MOMONGA KF23 + SKY-CORSAIR FLAGSHIP (船長モモンガKF23 & 空中旗艦)
 * Rigid ship hull/deck/bridge/thrusters/cannons merged into compact per-material batches!
 */
export function createMomongaFlagship(mats) {
  const root = new THREE.Group();
  const ship = new THREE.Group();
  root.add(ship);

  mergeRigidBoxesByMaterial(ship, [
    { w: 10.5, h: 4.2, d: 22.0, mat: mats.shipHull },
    { w: 8.0, h: 3.2, d: 6.0, mat: mats.shipHull, y: 0.3, z: -13.0 },
    { w: 5.2, h: 2.4, d: 4.2, mat: mats.shipHull, y: 0.6, z: -17.2 },
    { w: 5.2, h: 1.1, d: 2.4, mat: mats.shipHull, x: -7.6, y: 0.5, z: 1.5 },
    { w: 5.2, h: 1.1, d: 2.4, mat: mats.shipHull, x: 7.6, y: 0.5, z: 1.5 },
    { w: 7.6, h: 2.2, d: 7.4, mat: mats.shipHull, y: 3.4, z: -3.5 },
    { w: 11.4, h: 0.65, d: 22.8, mat: mats.shipTrim, y: 2.25 },
    { w: 1.8, h: 2.2, d: 1.8, mat: mats.shipTrim, x: -10.2, y: 0.6, z: 1.5 },
    { w: 1.8, h: 2.2, d: 1.8, mat: mats.shipTrim, x: 10.2, y: 0.6, z: 1.5 },
    { w: 0.3, h: 2.6, d: 4.2, mat: mats.momongaBadge, x: -5.35, y: 0.3, z: -2.5, cast: false },
    { w: 0.3, h: 2.6, d: 4.2, mat: mats.momongaBadge, x: 5.35, y: 0.3, z: -2.5, cast: false },
    { w: 2.2, h: 2.2, d: 2.4, mat: mats.tractorSteel, x: -3.4, z: 11.8 },
    { w: 2.2, h: 2.2, d: 2.4, mat: mats.tractorSteel, x: 0, z: 11.8 },
    { w: 2.2, h: 2.2, d: 2.4, mat: mats.tractorSteel, x: 3.4, z: 11.8 },
    { w: 1.6, h: 1.6, d: 0.8, mat: mats.shipThruster, x: -3.4, z: 13.1, cast: false },
    { w: 1.6, h: 1.6, d: 0.8, mat: mats.shipThruster, x: 0, z: 13.1, cast: false },
    { w: 1.6, h: 1.6, d: 0.8, mat: mats.shipThruster, x: 3.4, z: 13.1, cast: false },
    { w: 4.8, h: 1.4, d: 1.8, mat: mats.tractorBody, y: 5.1, z: -6.2 },
    { w: 1.8, h: 1.4, d: 2.2, mat: mats.tractorBody, x: -4.2, y: 3.3, z: -7.5 },
    { w: 1.8, h: 1.4, d: 2.2, mat: mats.tractorBody, x: 4.2, y: 3.3, z: -7.5 },
    { w: 1.8, h: 1.4, d: 2.2, mat: mats.tractorBody, x: -4.2, y: 3.3, z: 4.5 },
    { w: 1.8, h: 1.4, d: 2.2, mat: mats.tractorBody, x: 4.2, y: 3.3, z: 4.5 },
  ]);

  const rotors = [];
  for (const side of [-1, 1]) {
    const rotor = new THREE.Group();
    rotor.position.set(side * 10.2, 2.1, 1.5);
    mergeRigidBoxesByMaterial(rotor, [
      { w: 9.6, h: 0.22, d: 0.95, mat: mats.tractorSteel },
      { w: 0.95, h: 0.22, d: 9.6, mat: mats.tractorSteel },
    ]);
    ship.add(rotor);
    rotors.push(rotor);
  }

  const alertBeacon = addBox(ship, 1.2, 1.2, 1.2, mats.alertRed, -2.6, 5.6, -6.2, false);
  const alertBeaconR = addBox(ship, 1.2, 1.2, 1.2, mats.alertRed, 2.6, 5.6, -6.2, false);

  const leverPivot = new THREE.Group();
  leverPivot.position.set(1.1, 5.7, -5.8);
  addBox(leverPivot, 0.22, 1.45, 0.22, mats.tractorSteel, 0, 0.72, 0);
  addBox(leverPivot, 0.68, 0.45, 0.45, mats.alertRed, 0, 1.5, 0, false);
  ship.add(leverPivot);

  const cannonMuzzles = [];
  for (const [cx, cz] of [[-4.2, -7.5], [4.2, -7.5], [-4.2, 4.5], [4.2, 4.5]]) {
    const barrel = addBox(ship, 0.95, 0.95, 4.2, mats.tractorSteel, cx, 4.5, cz - 1.2);
    barrel.rotation.x = 0.55;
    cannonMuzzles.push(addBox(ship, 1.15, 1.15, 0.5, mats.tractorCore, cx, 5.65, cz - 2.95, false));
  }

  // CAPTAIN MOMONGA KF23
  const captain = new THREE.Group();
  captain.position.set(0, 4.5, -4.1);
  captain.rotation.y = Math.PI;
  captain.scale.setScalar(1.45);
  ship.add(captain);

  const capBody = new THREE.Group();
  capBody.position.y = 0.85;
  captain.add(capBody);

  mergeRigidBoxesByMaterial(capBody, [
    { w: 0.34, h: 0.75, d: 0.34, mat: mats.momongaCoat, x: -0.22, y: -0.45 },
    { w: 0.34, h: 0.75, d: 0.34, mat: mats.momongaCoat, x: 0.22, y: -0.45 },
    { w: 0.95, h: 1.05, d: 0.62, mat: mats.momongaCoat, y: 0.45 },
    { w: 0.48, h: 0.85, d: 0.66, mat: mats.momongaBelly, y: 0.42, z: 0.02 },
    { w: 0.36, h: 0.26, d: 0.42, mat: mats.momongaBadge, x: -0.58, y: 0.9, cast: false },
    { w: 0.36, h: 0.26, d: 0.42, mat: mats.momongaBadge, x: 0.58, y: 0.9, cast: false },
  ]);

  const leftMembrane = addBox(capBody, 1.05, 0.92, 0.1, mats.momongaFur, -0.88, 0.42, -0.18);
  const rightMembrane = addBox(capBody, 1.05, 0.92, 0.1, mats.momongaFur, 0.88, 0.42, -0.18);
  const capTail = addBox(capBody, 0.48, 1.25, 0.38, mats.momongaFur, 0, 0.62, -0.54);
  capTail.rotation.x = -0.35;

  const capHead = new THREE.Group();
  capHead.position.set(0, 1.05, 0);
  mergeRigidBoxesByMaterial(capHead, [
    { w: 0.76, h: 0.68, d: 0.72, mat: mats.momongaFur, y: 0.34 },
    { w: 0.52, h: 0.36, d: 0.12, mat: mats.momongaBelly, y: 0.26, z: 0.34 },
    { w: 0.26, h: 0.34, d: 0.16, mat: mats.momongaFur, x: -0.34, y: 0.68 },
    { w: 0.26, h: 0.34, d: 0.16, mat: mats.momongaFur, x: 0.34, y: 0.68 },
    { w: 0.22, h: 0.2, d: 0.12, mat: mats.wolfVisor, x: -0.18, y: 0.42, z: 0.36, cast: false },
    { w: 0.22, h: 0.2, d: 0.12, mat: mats.wolfVisor, x: 0.18, y: 0.42, z: 0.36, cast: false },
    { w: 1.08, h: 0.16, d: 0.92, mat: mats.momongaCoat, y: 0.72 },
    { w: 0.74, h: 0.34, d: 0.64, mat: mats.momongaCoat, y: 0.92 },
    { w: 0.26, h: 0.22, d: 0.12, mat: mats.shipTrim, y: 0.92, z: 0.34 },
  ]);
  capBody.add(capHead);

  const capLeftArm = new THREE.Group();
  capLeftArm.position.set(-0.62, 0.86, 0);
  addBox(capLeftArm, 0.3, 0.82, 0.3, mats.momongaCoat, 0, -0.34, 0);
  capBody.add(capLeftArm);

  const capRightArm = new THREE.Group();
  capRightArm.position.set(0.62, 0.86, 0);
  addBox(capRightArm, 0.3, 0.82, 0.3, mats.momongaCoat, 0, -0.34, 0);
  capBody.add(capRightArm);

  function animate(t, { alert = 0, launch = 0 } = {}) {
    ship.position.y = Math.sin(t * 1.9) * 0.85;
    ship.rotation.z = Math.sin(t * 1.3) * 0.03;
    rotors[0].rotation.y = t * 14;
    rotors[1].rotation.y = -t * 14;

    const blink = alert > 0.1 ? (Math.sin(t * 18) > 0 ? 1.45 : 0.65) : 0.6;
    alertBeacon.scale.setScalar(blink);
    alertBeaconR.scale.setScalar(blink);

    const l = Math.max(0, Math.min(1, launch));
    leverPivot.rotation.x = -0.45 + l * 1.15;
    capLeftArm.rotation.set(-1.35 + l * 0.85, 0, -0.25);
    capRightArm.rotation.set(-1.85 * (1 - l) - 0.55 * l, 0, 0.55);
    leftMembrane.rotation.y = -0.2 - l * 0.35;
    rightMembrane.rotation.y = 0.2 + l * 0.35;
    capTail.rotation.z = Math.sin(t * 8) * 0.16;

    const flash = l > 0.35 ? 1.0 + Math.abs(Math.sin(t * 32)) * 1.2 : 0.6;
    for (const m of cannonMuzzles) m.scale.setScalar(flash);
  }

  return { root, captain, animate };
}
