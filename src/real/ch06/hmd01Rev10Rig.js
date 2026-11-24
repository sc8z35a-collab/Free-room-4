import * as THREE from 'three';
import { createSTS3215Servo } from '../hardware.js';
import { createHMD01Lower12DOF } from '../ch04/ik12dofRig.js';
import { createHMDCorePCBRig } from '../ch05/hmdCorePcbRig.js';

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

function makeWireTube(points, radius, mat, segs = 16) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segs, radius, 8, false), mat);
  mesh.castShadow = true;
  return mesh;
}

/**
 * Generates high-resolution micro-pebble EVA foam interlocking mat PBR material (20mm thick black mat).
 */
export function createEVAMatPBR() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#181a1f';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle cross-hatch diamond anti-slip EVA tread pattern + interlocking tile border
  ctx.strokeStyle = '#242730';
  ctx.lineWidth = 2;
  for (let i = -512; i < 1024; i += 14) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 512, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(i + 512, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
  }
  // Interlocking puzzle seam lines
  ctx.strokeStyle = '#090a0d';
  ctx.lineWidth = 5;
  ctx.strokeRect(2, 2, 508, 508);
  for (let p = 64; p <= 448; p += 96) {
    ctx.fillStyle = '#121418';
    ctx.fillRect(p - 12, 0, 24, 14);
    ctx.fillRect(p - 12, 498, 24, 14);
    ctx.fillRect(0, p - 12, 14, 24);
    ctx.fillRect(498, p - 12, 14, 24);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 3);
  tex.anisotropy = 8;

  return new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.88,
    metalness: 0.04,
  });
}

/**
 * Builds the Full 16-DOF `HMD-01 Rev 1.0` Humanoid (Exact 380.0mm tall, 1,942g over-engineered build):
 * - 12-DOF Analytic IK Black PLA+ Lower Body
 * - 6 Heavy Brass/Steel M3 Hex Spine Standoffs
 * - Thick 4.0mm Dark-Gray PLA+ Torso Armor Shell (45% Infill) + Glowing Emerald `HMD-CORE-v1` inside
 * - Rear Protruding "Randoseru" Hard Case housing 112g 3S LiPo Battery (high rear CoM culprit!)
 * - Left & Right 2-DOF Shoulder Pitch + Roll Arms (4x STS3215 servos, 16-DOF complete!)
 * - 3mm Thick Humanoid Dummy Head Shell with Visor & Toggleable White Chin Impact Crack
 * - Right-Hip 3-Core Bus Harness with Scissor-Pinch Snap + Electric Spark
 * - Thermal Overheat Glow (`63°C`) on Knee & Hip Servos
 */
export function createHMD01Rev10FullBody(baseMats, ngMats) {
  const root = new THREE.Group();

  // Outer pivot group anchored at soles (y = 0) so hunting oscillation tilts cleanly around ankles/soles!
  const pivotGroup = new THREE.Group();
  root.add(pivotGroup);

  const lower = createHMD01Lower12DOF(baseMats);
  pivotGroup.add(lower.root);

  const torsoArmorMat = new THREE.MeshPhysicalMaterial({
    color: 0x333842, // Matte dark-gray 4.0mm PLA+ upper body armor
    roughness: 0.56,
    metalness: 0.06,
    clearcoat: 0.14,
  });

  const headShellMat = new THREE.MeshPhysicalMaterial({
    color: 0x3c4350,
    roughness: 0.44,
    metalness: 0.08,
    clearcoat: 0.25,
  });

  const visorMat = new THREE.MeshPhysicalMaterial({
    color: 0x090e18,
    roughness: 0.08,
    metalness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  });

  // Upper Body Assembly mounted atop Pelvis Plate (pelvisPlate top is y = +0.026m in pelvis space)
  const upperBody = new THREE.Group();
  upperBody.position.set(0, 0.026, 0);
  lower.pelvis.add(upperBody);

  // 1. 6x Heavy Brass / Steel M3 Hex Spine Standoff Pillars (Pelvis -> Torso, 24mm tall)
  const spineGroup = new THREE.Group();
  const standoffGeo = new THREE.CylinderGeometry(0.0038, 0.0038, 0.026, 6);
  for (const [sx, sz] of [
    [-0.044, -0.024], [0.044, -0.024],
    [-0.044, 0.024], [0.044, 0.024],
    [0, -0.026], [0, 0.026],
  ]) {
    const pillar = new THREE.Mesh(standoffGeo, sx === 0 ? baseMats.chromeSteel : baseMats.brass);
    pillar.position.set(sx, 0.013, sz);
    pillar.castShadow = true;
    spineGroup.add(pillar);
  }
  upperBody.add(spineGroup);

  // 2. Over-Engineered 4.0mm Thick Dark-Gray PLA+ Chest Cage (y = 0.026..0.118m)
  const chestGroup = new THREE.Group();
  chestGroup.position.set(0, 0.026, 0);
  upperBody.add(chestGroup);

  // Base plate & lower overhanging rib flange (this right-side rib pinches the right-leg cable!)
  const chestFloor = new THREE.Mesh(makeRoundedBoxGeo(0.116, 0.008, 0.072, 0.002, 2), torsoArmorMat);
  chestFloor.position.set(0, 0.004, 0.002);
  chestFloor.castShadow = true;
  chestFloor.receiveShadow = true;
  chestGroup.add(chestFloor);

  // Sharp lower right-front overhang rib flange that acts like scissors on deep squat!
  const pinchRib = new THREE.Mesh(makeRoundedBoxGeo(0.036, 0.014, 0.014, 0.001, 1), torsoArmorMat);
  pinchRib.position.set(-0.042, -0.005, 0.028);
  pinchRib.castShadow = true;
  chestGroup.add(pinchRib);

  // Side walls (thick 4mm+) & upper shoulder yoke
  for (const sx of [-0.054, 0.054]) {
    const wall = new THREE.Mesh(makeRoundedBoxGeo(0.008, 0.088, 0.068, 0.002, 2), torsoArmorMat);
    wall.position.set(sx, 0.046, 0);
    wall.castShadow = true;
    chestGroup.add(wall);
  }
  const chestTop = new THREE.Mesh(makeRoundedBoxGeo(0.124, 0.009, 0.070, 0.002, 2), torsoArmorMat);
  chestTop.position.set(0, 0.090, 0);
  chestTop.castShadow = true;
  chestGroup.add(chestTop);

  // Front armored chest bezel with central cutout window revealing glowing emerald `HMD-CORE-v1`!
  const frontTopBar = new THREE.Mesh(makeRoundedBoxGeo(0.108, 0.018, 0.007, 0.0015, 2), torsoArmorMat);
  frontTopBar.position.set(0, 0.079, 0.033);
  const frontBotBar = new THREE.Mesh(makeRoundedBoxGeo(0.108, 0.018, 0.007, 0.0015, 2), torsoArmorMat);
  frontBotBar.position.set(0, 0.013, 0.033);
  const frontLeftBar = new THREE.Mesh(makeRoundedBoxGeo(0.020, 0.052, 0.007, 0.0015, 2), torsoArmorMat);
  frontLeftBar.position.set(-0.044, 0.046, 0.033);
  const frontRightBar = frontLeftBar.clone();
  frontRightBar.position.x = 0.044;
  chestGroup.add(frontTopBar, frontBotBar, frontLeftBar, frontRightBar);

  // Glowing Emerald `HMD-CORE-v1` PCB mounted inside the Chest Core!
  const chestPcb = createHMDCorePCBRig(baseMats, ngMats, 1.0);
  chestPcb.setAssemblyState({ stage: 'uv_cured', busbarProgress: 1.0, ledOn: true, uvGlow: 0.15 });
  chestPcb.root.rotation.x = Math.PI / 2;
  chestPcb.root.position.set(0, 0.046, 0.018);
  chestGroup.add(chestPcb.root);

  // Subtle green internal LED bounce light inside chest cavity
  const chestGlow = new THREE.PointLight(0x34d399, 0.35, 0.25, 1.8);
  chestGlow.position.set(0, 0.046, 0.045);
  chestGroup.add(chestGlow);

  // 3. Heavy Rear "Randoseru" Hard Battery Case (Protruding Backward -> High Rear CoM Culprit!)
  const randoseruGroup = new THREE.Group();
  randoseruGroup.position.set(0, 0.048, -0.050);
  chestGroup.add(randoseruGroup);

  const backpackShell = new THREE.Mesh(makeRoundedBoxGeo(0.088, 0.076, 0.036, 0.003, 2), torsoArmorMat);
  backpackShell.castShadow = true;
  backpackShell.receiveShadow = true;
  randoseruGroup.add(backpackShell);

  // Blue 3S 1300mAh LiPo pack peeking out the top of the randoseru with Velcro strap & XT60 yellow plug!
  const lipoBody = new THREE.Mesh(
    makeRoundedBoxGeo(0.072, 0.068, 0.024, 0.002, 2),
    new THREE.MeshPhysicalMaterial({ color: 0x0284c7, roughness: 0.28, clearcoat: 0.55 })
  );
  lipoBody.position.set(0, 0.006, -0.002);
  const velcroStrap = new THREE.Mesh(new THREE.BoxGeometry(0.092, 0.014, 0.039), baseMats.rubberBlack);
  velcroStrap.position.set(0, 0.002, 0);
  const xt60Plug = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.009, 0.015), baseMats.xt60Yellow);
  xt60Plug.position.set(-0.024, 0.042, 0.004);
  randoseruGroup.add(lipoBody, velcroStrap, xt60Plug);

  // 4. Left & Right 2-DOF Arms (Shoulder Pitch + Shoulder Roll = 4 New STS3215 Servos!)
  const build2DOFArm = (side) => {
    const shPitch = new THREE.Group();
    shPitch.position.set(side * 0.068, 0.076, 0);
    chestGroup.add(shPitch);

    const srvP = createSTS3215Servo(baseMats, 0.80);
    srvP.root.rotation.z = side * (Math.PI / 2);
    shPitch.add(srvP.root);

    const shRoll = new THREE.Group();
    shRoll.position.set(side * 0.018, -0.004, 0);
    shPitch.add(shRoll);

    const srvR = createSTS3215Servo(baseMats, 0.78);
    srvR.root.rotation.x = Math.PI / 2;
    shRoll.add(srvR.root);

    // Upper arm + slight elbow angle + sleek printed forearm
    const upperArm = new THREE.Mesh(makeRoundedBoxGeo(0.024, 0.074, 0.024, 0.002, 2), baseMats.printedPLA);
    upperArm.position.set(side * 0.006, -0.046, 0);
    upperArm.castShadow = true;
    shRoll.add(upperArm);

    const elbowJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.026, 16), torsoArmorMat);
    elbowJoint.rotation.z = Math.PI / 2;
    elbowJoint.position.set(side * 0.006, -0.084, 0);
    shRoll.add(elbowJoint);

    const forearm = new THREE.Mesh(makeRoundedBoxGeo(0.020, 0.074, 0.022, 0.002, 2), torsoArmorMat);
    forearm.position.set(side * 0.006, -0.118, 0.010);
    forearm.rotation.x = -0.22;
    forearm.castShadow = true;
    shRoll.add(forearm);

    const handTip = new THREE.Mesh(makeRoundedBoxGeo(0.016, 0.022, 0.018, 0.002, 2), baseMats.printedPLA);
    handTip.position.set(side * 0.006, -0.158, 0.019);
    shRoll.add(handTip);

    return { shPitch, shRoll };
  };

  const rightArm = build2DOFArm(-1);
  const leftArm = build2DOFArm(1);

  // 5. 3mm-Thick Dummy Humanoid Head Shell with Camera Visor Window (Top at exact 380.0mm!)
  // Pelvis y=0.200 + upperBody 0.026 + chest 0.026 + chestTop 0.094 + neck 0.008 + head 0.026 -> 0.380m!
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.095, 0.004);
  chestGroup.add(headGroup);

  const neckCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.017, 0.012, 18), baseMats.printedPLA);
  neckCollar.position.y = 0.005;
  headGroup.add(neckCollar);

  const cranium = new THREE.Mesh(makeRoundedBoxGeo(0.056, 0.044, 0.060, 0.006, 3), headShellMat);
  cranium.position.y = 0.032;
  cranium.castShadow = true;
  cranium.receiveShadow = true;
  headGroup.add(cranium);

  const visor = new THREE.Mesh(makeRoundedBoxGeo(0.046, 0.018, 0.010, 0.002, 2), visorMat);
  visor.position.set(0, 0.035, 0.028);
  headGroup.add(visor);

  // Twin subtle camera lens rings behind the dark visor
  for (const ex of [-0.011, 0.011]) {
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.0045, 0.0045, 0.003, 14), baseMats.chromeSteel);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(ex, 0.035, 0.0325);
    headGroup.add(lens);
  }

  // White Impact Stress-Fracture Crack on Chin ("顎の部分がパックリと白くひび割れていた")!
  const chinCrack = new THREE.Group();
  chinCrack.visible = false;
  const crackMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
  const crack1 = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.0024, 0.0025), crackMat);
  crack1.position.set(0.003, 0.016, 0.0308);
  crack1.rotation.z = 0.24;
  const crack2 = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.0020, 0.0025), crackMat);
  crack2.position.set(-0.009, 0.013, 0.0308);
  crack2.rotation.z = -0.36;
  const crack3 = new THREE.Mesh(new THREE.BoxGeometry(0.011, 0.0018, 0.0025), crackMat);
  crack3.position.set(0.015, 0.019, 0.0308);
  crack3.rotation.z = -0.18;
  chinCrack.add(crack1, crack2, crack3);
  headGroup.add(chinCrack);

  // 6. Right-Leg 3-Core Bus Harness crossing the Torso-to-Hip Scissor Gap (Intact vs Snapped!)
  const wireIntact = new THREE.Group();
  wireIntact.add(
    makeWireTube(
      [[-0.036, 0.040, 0.022], [-0.044, 0.012, 0.034], [-0.043, -0.024, 0.024]],
      0.0026,
      baseMats.wireBlack,
      16
    )
  );
  upperBody.add(wireIntact);

  const wireSnapped = new THREE.Group();
  wireSnapped.visible = false;
  // Upper chewed stump + exposed red/white/copper DATA strands!
  wireSnapped.add(
    makeWireTube([[-0.036, 0.040, 0.022], [-0.045, 0.016, 0.035]], 0.0026, baseMats.wireBlack, 10),
    makeWireTube([[-0.045, 0.016, 0.035], [-0.048, 0.009, 0.040]], 0.0009, baseMats.wireRed, 8),
    makeWireTube([[-0.045, 0.016, 0.035], [-0.042, 0.008, 0.039]], 0.0009, baseMats.servoHornWhite, 8),
    makeWireTube([[-0.044, -0.004, 0.034], [-0.043, -0.026, 0.024]], 0.0026, baseMats.wireBlack, 10),
    makeWireTube([[-0.044, -0.004, 0.034], [-0.046, 0.002, 0.038]], 0.0009, ngMats.goldEnigMat, 8)
  );
  upperBody.add(wireSnapped);

  // Delicate multi-ray electric micro-spark burst right at the severed copper pinch point!
  const snapSpark = new THREE.Group();
  snapSpark.position.set(-0.044, 0.010, 0.036);
  snapSpark.visible = false;
  const sparkCoreMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe });
  const sparkRayMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  snapSpark.add(new THREE.Mesh(new THREE.SphereGeometry(0.0024, 10, 8), sparkCoreMat));
  for (let i = 0; i < 6; i++) {
    const ray = new THREE.Mesh(new THREE.BoxGeometry(0.0007, 0.011, 0.0007), i % 2 === 0 ? sparkCoreMat : sparkRayMat);
    ray.rotation.set(i * 0.9, i * 1.1, i * 0.7);
    snapSpark.add(ray);
  }
  upperBody.add(snapSpark);

  // 7. Thermal Overheat Glow Halos on Knees & Hips (63°C PLA+ Heat-Creep Warning!)
  const heatMat = new THREE.MeshBasicMaterial({
    color: 0xff4500,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const heatHalos = [];
  for (const joint of [lower.leftLeg.kneePitch, lower.rightLeg.kneePitch, lower.leftLeg.hipPitch]) {
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.028, 16, 12), heatMat);
    joint.add(halo);
    heatHalos.push(halo);
  }

  // CoM High-Rear Warning Indicator Orb (toggled during Cut 2C / 3A!)
  const comMarker = new THREE.Group();
  comMarker.position.set(0, 0.048, -0.022);
  comMarker.visible = false;
  const comCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.011, 16, 14),
    new THREE.MeshBasicMaterial({ color: 0xf43f5e })
  );
  const comRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.022, 0.002, 10, 28),
    new THREE.MeshBasicMaterial({ color: 0xfb7185 })
  );
  comMarker.add(comCore, comRing);
  chestGroup.add(comMarker);

  function setAssemblyProgress(p) {
    // Smooth progressive assembly reveal in Cut 2A (0..1):
    // 0.00..0.25: 6 Spine Standoffs drop in
    // 0.25..0.55: Thick 4mm Chest Cage + HMD-CORE-v1 drops in
    // 0.55..0.75: Rear Randoseru 3S LiPo Backpack slides onto back
    // 0.75..0.90: Left & Right 2-DOF Arms attach
    // 0.90..1.00: 3mm Dummy Head crowns the top!
    const clamp = (v) => Math.max(0, Math.min(1, v));
    const sSpine = clamp(p / 0.22);
    const sChest = clamp((p - 0.22) / 0.28);
    const sPack = clamp((p - 0.50) / 0.20);
    const sArms = clamp((p - 0.68) / 0.18);
    const sHead = clamp((p - 0.84) / 0.16);

    spineGroup.visible = sSpine > 0.01;
    spineGroup.position.y = (1 - sSpine) * 0.07;

    chestGroup.visible = sChest > 0.01;
    chestGroup.position.y = 0.026 + (1 - sChest) * 0.09;

    randoseruGroup.visible = sPack > 0.01;
    randoseruGroup.position.z = -0.050 - (1 - sPack) * 0.08;

    rightArm.shPitch.visible = sArms > 0.01;
    leftArm.shPitch.visible = sArms > 0.01;
    rightArm.shPitch.position.x = -0.068 - (1 - sArms) * 0.06;
    leftArm.shPitch.position.x = 0.068 + (1 - sArms) * 0.06;

    headGroup.visible = sHead > 0.01;
    headGroup.position.y = 0.095 + (1 - sHead) * 0.07;
  }

  function setPose({
    pelvisPos = [0, 0.20, 0],
    pelvisRot = [0, 0, 0],
    leftArmPitch = 0.12,
    leftArmRoll = 0.08,
    rightArmPitch = 0.12,
    rightArmRoll = -0.08,
    pivotRotX = 0,
    pivotRotZ = 0,
    pivotPosY = 0,
    pivotPosZ = 0,
    rightLegLimp = false,
  } = {}) {
    lower.solveIKPose({
      pelvisPos,
      pelvisRot,
      leftFootPos: [0.042, 0, 0],
      rightFootPos: [-0.042, 0, 0],
    });

    if (rightLegLimp) {
      lower.rightLeg.hipPitch.rotation.x = 0.55;
      lower.rightLeg.kneePitch.rotation.x = -0.85;
      lower.rightLeg.anklePitch.rotation.x = 0.40;
      lower.rightLeg.hipRoll.rotation.z = -0.22;
    }

    leftArm.shPitch.rotation.x = leftArmPitch;
    leftArm.shRoll.rotation.z = leftArmRoll;
    rightArm.shPitch.rotation.x = rightArmPitch;
    rightArm.shRoll.rotation.z = rightArmRoll;

    pivotGroup.position.set(0, pivotPosY, pivotPosZ);
    pivotGroup.rotation.set(pivotRotX, 0, pivotRotZ);
  }

  function setDamageState({
    chinCracked = false,
    wireCut = false,
    spark = 0,
    heatGlow = 0,
    showCom = false,
  } = {}) {
    chinCrack.visible = chinCracked;
    wireIntact.visible = !wireCut;
    wireSnapped.visible = wireCut;
    snapSpark.visible = spark > 0.05;
    if (snapSpark.visible) {
      snapSpark.scale.setScalar(0.5 + spark * 1.1);
      snapSpark.rotation.y += 0.35;
    }
    heatMat.opacity = heatGlow * 0.36;
    comMarker.visible = showCom;
    if (showCom) comRing.rotation.y += 0.04;
  }

  return {
    root,
    pivotGroup,
    lower,
    upperBody,
    chestGroup,
    headGroup,
    setAssemblyProgress,
    setPose,
    setDamageState,
  };
}

/**
 * Museum-Grade Macro Asset (2.4x Scale) showing the 63°C STS3215 Knee Servo
 * melting & warping the black PLA+ knee bracket ("ドライヤーで炙られた飴細工のように変質し、
 * 真鍮インサートナットの周囲が 1.2mm グニャリと斜めにめり込んで変形")!
 */
export function createHeatCreepKneeMacroRig(baseMats, ngMats) {
  const root = new THREE.Group();
  root.scale.setScalar(2.35);

  // Hot 63°C STS3215 Servo Body
  const servo = createSTS3215Servo(baseMats, 1.0);
  root.add(servo.root);

  // Glossy Heat-Softened Warped Black PLA+ Bracket (Custom Curved/Drooped Geometry!)
  const creepMat = new THREE.MeshPhysicalMaterial({
    color: 0x17191d,
    roughness: 0.24, // Glossy melted-candy sheen around the softened zone!
    metalness: 0.05,
    clearcoat: 0.65,
    clearcoatRoughness: 0.22,
  });

  // Left upright bracket wall — straight on bottom, visibly bowed & twisted near hot servo shaft!
  const wallGeo = new THREE.BoxGeometry(0.0055, 0.068, 0.032, 4, 16, 6);
  const posAttr = wallGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    // Localized candy-soft thermal creep sag around y ≈ +0.012 (near brass insert under load)
    const heatZone = Math.exp(-Math.pow((y - 0.012) / 0.016, 2));
    const bowX = heatZone * 0.0046 + (y > 0.005 ? (y - 0.005) * 0.14 : 0);
    const sagZ = heatZone * Math.sin(z * 65.0) * 0.0014 + heatZone * 0.0032;
    posAttr.setXYZ(i, x + bowX, y - heatZone * 0.0030, z + sagZ);
  }
  wallGeo.computeVertexNormals();
  const warpedWall = new THREE.Mesh(wallGeo, creepMat);
  warpedWall.position.set(0.0155, -0.014, 0);
  warpedWall.castShadow = true;
  warpedWall.receiveShadow = true;
  root.add(warpedWall);

  // Softened glossy melted plastic lip bulged around the sunken brass insert!
  const meltedLip = new THREE.Mesh(new THREE.TorusGeometry(0.0058, 0.0018, 12, 24), creepMat);
  meltedLip.rotation.y = Math.PI / 2;
  meltedLip.rotation.x = 0.34;
  meltedLip.position.set(0.0218, -0.002, 0.0038);
  root.add(meltedLip);

  // Knurled Brass M3 Heat-Set Insert tilted & sunken 1.2mm diagonally into the softened PLA+!
  const brassInsert = new THREE.Mesh(new THREE.CylinderGeometry(0.0042, 0.0042, 0.008, 16), baseMats.brass);
  brassInsert.rotation.z = Math.PI / 2 - 0.36; // Visibly crooked!
  brassInsert.rotation.y = 0.22;
  brassInsert.position.set(0.0226, -0.0024, 0.0042);
  brassInsert.castShadow = true;
  root.add(brassInsert);

  // Subtle thermal infrared glow on the 63°C servo housing
  const irGlow = new THREE.PointLight(0xff4500, 0.65, 0.18, 1.5);
  irGlow.position.set(0.028, 0.005, 0.018);
  root.add(irGlow);

  return { root, irGlow };
}

/**
 * Glowing Holographic Preview of `HMD-01 Rev 1.5` Subtraction Design:
 * - Open-Truss Exoskeleton (Zero Metal Pillars, Zero Dummy Head!)
 * - 112g 3S LiPo Nested Vertically Dead-Center Inside the Rib Cage (Directly Above Hip Axis!)
 */
export function createRev15HologramTruss() {
  const root = new THREE.Group();
  const holoCyan = new THREE.MeshBasicMaterial({
    color: 0x34d399,
    wireframe: true,
    transparent: true,
    opacity: 0.72,
  });
  const holoSolid = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.24,
  });
  const holoLipo = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.58,
  });

  // Sleek open-truss rib cage (no rear backpack, no decorative head!)
  const trussCage = new THREE.Mesh(new THREE.BoxGeometry(0.092, 0.088, 0.056, 3, 3, 2), holoCyan);
  trussCage.position.y = 0.055;
  root.add(trussCage);

  // Diagonal X-truss reinforcement bars
  const barGeo = new THREE.BoxGeometry(0.003, 0.105, 0.003);
  for (const [bx, rz] of [[-0.044, 0.52], [-0.044, -0.52], [0.044, 0.52], [0.044, -0.52]]) {
    const bar = new THREE.Mesh(barGeo, holoSolid);
    bar.position.set(bx, 0.055, 0);
    bar.rotation.x = rz;
    root.add(bar);
  }

  // 112g LiPo nested VERTICALLY dead-center inside the chest rib cage right over CoM (x=0, z=0)!
  const centerLipo = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.068, 0.026), holoLipo);
  centerLipo.position.set(0, 0.052, 0);
  const comAxis = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0012, 0.0012, 0.14, 8),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  comAxis.position.y = 0.055;
  root.add(centerLipo, comAxis);

  // Base glowing ring
  const baseRing = new THREE.Mesh(
    new THREE.RingGeometry(0.052, 0.058, 36),
    new THREE.MeshBasicMaterial({ color: 0x34d399, side: THREE.DoubleSide, transparent: true, opacity: 0.65 })
  );
  baseRing.rotation.x = -Math.PI / 2;
  root.add(baseRing);

  return { root };
}

/**
 * Chapter 6 Precision Props:
 * - Engineer `PA-09` Green-Handled Precision Crimping Pliers + Gold Pin + Stripped Right-Leg Wire
 * - Disassembled Rev 1.0 Forensic Knolling Pile (Thick Chest Plate, 6 Standoffs, Cracked Head, Randoseru)
 * - Glass of Lukewarm Barley Tea (`麦茶`)
 * - Mechanical Pencil (`0.5mm`) for Lecture Hall Exam
 */
export function createCh06Props(baseMats, ngMats) {
  // 1. Engineer `PA-09` Precision Crimping Pliers (Iconic Emerald-Green Handles + Black Oxide Jaws!)
  const pa09 = new THREE.Group();
  const handleMat = new THREE.MeshPhysicalMaterial({ color: 0x16a34a, roughness: 0.42, clearcoat: 0.25 });

  const jawUpper = new THREE.Group();
  const jUpMetal = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.0055, 0.0085), baseMats.darkAnodized);
  jUpMetal.position.set(-0.018, 0.0034, 0);
  const jUpTip = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.0038, 0.0065), baseMats.chromeSteel);
  jUpTip.position.set(-0.040, 0.0024, 0);
  const hUpGreen = new THREE.Mesh(makeRoundedBoxGeo(0.095, 0.0095, 0.013, 0.002, 2), handleMat);
  hUpGreen.position.set(0.052, 0.014, 0);
  hUpGreen.rotation.z = 0.16;
  jawUpper.add(jUpMetal, jUpTip, hUpGreen);

  const jawLower = new THREE.Group();
  const jLoMetal = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.0055, 0.0085), baseMats.darkAnodized);
  jLoMetal.position.set(-0.018, -0.0034, 0);
  const jLoTip = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.0038, 0.0065), baseMats.chromeSteel);
  jLoTip.position.set(-0.040, -0.0024, 0);
  const hLoGreen = new THREE.Mesh(makeRoundedBoxGeo(0.095, 0.0095, 0.013, 0.002, 2), handleMat);
  hLoGreen.position.set(0.052, -0.014, 0);
  hLoGreen.rotation.z = -0.16;
  jawLower.add(jLoMetal, jLoTip, hLoGreen);

  const pivotPin = new THREE.Mesh(new THREE.CylinderGeometry(0.0048, 0.0048, 0.011, 16), baseMats.chromeSteel);
  pivotPin.rotation.x = Math.PI / 2;
  pa09.add(jawUpper, jawLower, pivotPin);

  // Gleaming gold crimp terminal pin + exposed copper core + stripped white DATA wire inside PA-09 jaws!
  const crimpWireGroup = new THREE.Group();
  const goldPin = new THREE.Mesh(new THREE.BoxGeometry(0.013, 0.0028, 0.0028), ngMats.goldEnigMat);
  goldPin.position.set(-0.046, 0, 0);
  const whiteWire = makeWireTube([[-0.052, 0, 0], [-0.082, -0.003, 0.012], [-0.118, -0.006, 0.028]], 0.0016, baseMats.servoHornWhite, 12);
  crimpWireGroup.add(goldPin, whiteWire);
  pa09.add(crimpWireGroup);

  function setPa09Squeeze(u) {
    // u = 0 (open jaws) -> u = 1 (ratchet locked "カチリ！")
    const ang = (1 - u) * 0.22;
    jawUpper.rotation.z = -ang;
    jawLower.rotation.z = ang;
  }

  // 2. Glass of Lukewarm Barley Tea (`麦茶のグラス`)
  const teaGlass = new THREE.Group();
  const glassCup = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.028, 0.105, 24, 1, true), baseMats.glassClear);
  glassCup.position.y = 0.053;
  const teaLiquid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.030, 0.026, 0.055, 22),
    new THREE.MeshPhysicalMaterial({ color: 0x78350f, roughness: 0.12, transmission: 0.45, transparent: true, opacity: 0.88 })
  );
  teaLiquid.position.y = 0.029;
  teaGlass.add(glassCup, teaLiquid);

  // 3. Disassembled Forensic Knolling Pile for Cut 5A ("解体されたHMD-01の残骸")
  const knollingGroup = new THREE.Group();
  const kArmorMat = new THREE.MeshPhysicalMaterial({ color: 0x333842, roughness: 0.56, clearcoat: 0.12 });

  const oldChest = new THREE.Mesh(makeRoundedBoxGeo(0.112, 0.012, 0.070, 0.002, 2), kArmorMat);
  oldChest.position.set(-0.06, 0.006, 0.02);
  oldChest.rotation.y = 0.14;
  oldChest.castShadow = true;
  knollingGroup.add(oldChest);

  // 6 heavy brass/steel standoffs laid neatly in a row
  for (let i = 0; i < 6; i++) {
    const p = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0038, 0.0038, 0.026, 6),
      i < 4 ? baseMats.brass : baseMats.chromeSteel
    );
    p.rotation.z = Math.PI / 2;
    p.position.set(0.045, 0.004, -0.025 + i * 0.011);
    p.castShadow = true;
    knollingGroup.add(p);
  }

  // Fallen cracked dummy head shell on desk
  const fallenHead = new THREE.Group();
  const fhBody = new THREE.Mesh(makeRoundedBoxGeo(0.054, 0.042, 0.058, 0.005, 2), kArmorMat);
  const fhVisor = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.016, 0.008), baseMats.darkAnodized);
  fhVisor.position.set(0, 0.004, 0.027);
  const fhCrack = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.0024, 0.0025), new THREE.MeshBasicMaterial({ color: 0xf8fafc }));
  fhCrack.position.set(0.002, -0.014, 0.029);
  fhCrack.rotation.z = 0.25;
  fallenHead.add(fhBody, fhVisor, fhCrack);
  fallenHead.position.set(0.115, 0.021, 0.032);
  fallenHead.rotation.set(0.12, -0.58, -0.22);
  knollingGroup.add(fallenHead);

  // Discarded Randoseru hard backpack shell
  const oldBackpack = new THREE.Mesh(makeRoundedBoxGeo(0.084, 0.034, 0.072, 0.003, 2), kArmorMat);
  oldBackpack.position.set(-0.08, 0.017, -0.068);
  oldBackpack.rotation.y = -0.24;
  oldBackpack.castShadow = true;
  knollingGroup.add(oldBackpack);

  // 4. Mechanical Pencil (0.5mm) for Lecture Hall Exam
  const pencil = new THREE.Group();
  const pBody = new THREE.Mesh(new THREE.CylinderGeometry(0.0042, 0.0042, 0.145, 14), baseMats.darkAnodized);
  pBody.rotation.z = Math.PI / 2;
  const pTip = new THREE.Mesh(new THREE.ConeGeometry(0.0042, 0.018, 14), baseMats.chromeSteel);
  pTip.rotation.z = Math.PI / 2;
  pTip.position.x = -0.081;
  pencil.add(pBody, pTip);

  return {
    pa09,
    setPa09Squeeze,
    teaGlass,
    knollingGroup,
    pencil,
  };
}
