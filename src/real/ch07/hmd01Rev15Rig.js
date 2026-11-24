import * as THREE from 'three';
import { createSTS3215Servo } from '../hardware.js';
import { createHMD01Lower12DOF } from '../ch04/ik12dofRig.js';
import { createHMDCorePCBRig } from '../ch05/hmdCorePcbRig.js';
import { heightCanvasToNormalTex, createNextGenHandRig } from '../nextgen/pbrMicroTextures.js';

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

function makeWireTube(points, radius, mat, segs = 14) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segs, radius, 8, false), mat);
  mesh.castShadow = true;
  return mesh;
}

/**
 * Procedural 15% Carbon-Fiber Reinforced PETG-CF Material ("光を吸い込む深いマットチャコール梨地肌")
 * with micro-stippled carbon fiber grain albedo + Sobel tangent-space normal map!
 */
export function createPetgCfMaterial() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d');

  const h = document.createElement('canvas');
  h.width = 512;
  h.height = 512;
  const hctx = h.getContext('2d');

  ctx.fillStyle = '#1b1d22';
  ctx.fillRect(0, 0, 512, 512);
  hctx.fillStyle = '#808080';
  hctx.fillRect(0, 0, 512, 512);

  // Fine matte-charcoal pear-skin grain + glinting chopped carbon micro-fibers!
  let seed = 1337;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < 6500; i++) {
    const x = rnd() * 512;
    const y = rnd() * 512;
    const v = 22 + Math.floor(rnd() * 24);
    ctx.fillStyle = `rgb(${v},${v + 1},${v + 4})`;
    ctx.fillRect(x, y, 2, 2);

    const hv = 95 + Math.floor(rnd() * 65);
    hctx.fillStyle = `rgb(${hv},${hv},${hv})`;
    hctx.fillRect(x, y, 2, 2);
  }
  // Tiny subtle carbon fiber micro-specks
  ctx.strokeStyle = 'rgba(130, 145, 165, 0.22)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 420; i++) {
    const x = rnd() * 512;
    const y = rnd() * 512;
    const a = rnd() * Math.PI;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * 5, y + Math.sin(a) * 5);
    ctx.stroke();
  }

  const colTex = new THREE.CanvasTexture(c);
  colTex.colorSpace = THREE.SRGBColorSpace;
  colTex.wrapS = colTex.wrapT = THREE.RepeatWrapping;
  colTex.repeat.set(2, 2);
  const normTex = heightCanvasToNormalTex(h, 2.2);
  normTex.wrapS = normTex.wrapT = THREE.RepeatWrapping;
  normTex.repeat.set(2, 2);

  return new THREE.MeshPhysicalMaterial({
    map: colTex,
    normalMap: normTex,
    normalScale: new THREE.Vector2(0.45, 0.45),
    roughness: 0.72, // Deep light-absorbing matte-charcoal satin!
    metalness: 0.14,
    clearcoat: 0.08,
  });
}

/**
 * Full 16-DOF `HMD-01 Rev 1.5` Subtraction Athlete (Exact 380.0mm tall, Real Mass 1,762g [-180g]):
 * - 15% Carbon-Fiber `PETG-CF` Matte-Charcoal Skeleton (Heat-Resistant Tg ~80°C!)
 * - Zero Rear Backpack: 112g 3S LiPo Nested Vertically Dead-Center Directly Over Hip Axis!
 * - Zero Metal Spine Pillars: Lightweight Diagonal Open-Truss Exoskeleton Ribs!
 * - Zero Dummy Head: Sleek Protective Carbon Arch Rollbar!
 * - Neutral-Axis Translucent PTFE Spiral-Wrapped Harnesses!
 * - Full Real-Time Closed-Form 12-DOF Analytical Bipedal Static-Walk & Cycloid Gait Solver!
 */
export function createHMD01Rev15Athlete(baseMats, ngMats, petgCfMat) {
  const root = new THREE.Group();
  const pivotGroup = new THREE.Group();
  root.add(pivotGroup);

  // Build 12-DOF lower body using our matte-charcoal PETG-CF material!
  const cfMats = { ...baseMats, printedPLA: petgCfMat };
  const lower = createHMD01Lower12DOF(cfMats);
  pivotGroup.add(lower.root);

  const ptfeTubeMat = new THREE.MeshPhysicalMaterial({
    color: 0xe2e8f0,
    roughness: 0.25,
    metalness: 0.05,
    transparent: true,
    opacity: 0.78,
    clearcoat: 0.5,
  });

  // Upper Body Assembly mounted atop Pelvis Plate (y = +0.026m)
  const upperBody = new THREE.Group();
  upperBody.position.set(0, 0.026, 0);
  lower.pelvis.add(upperBody);

  // 1. Diagonal Triangular Open-Truss Carbon Spine Ribs (Zero Heavy Metal Pillars -> -38g!)
  const trussSpine = new THREE.Group();
  const ribGeo = new THREE.BoxGeometry(0.005, 0.044, 0.005);
  for (const sx of [-0.042, 0.042]) {
    for (const [sz, rx] of [[-0.018, 0.44], [0.018, -0.44]]) {
      const rib = new THREE.Mesh(ribGeo, petgCfMat);
      rib.position.set(sx, 0.015, sz * 0.5);
      rib.rotation.x = rx;
      rib.castShadow = true;
      trussSpine.add(rib);
    }
    const vert = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.032, 0.006), petgCfMat);
    vert.position.set(sx, 0.014, 0);
    trussSpine.add(vert);
  }
  upperBody.add(trussSpine);

  // 2. Slim Monocoque Carbon-Fiber Open-Truss Chest Cage (y = 0.026..0.114m)
  const chestGroup = new THREE.Group();
  chestGroup.position.set(0, 0.026, 0);
  upperBody.add(chestGroup);

  // Lightweight skeleton corner rails & diagonal X-truss sides (no bulky solid 4mm walls!)
  const cornerPostGeo = new THREE.BoxGeometry(0.0065, 0.088, 0.0065);
  for (const [cx, cz] of [[-0.048, -0.026], [0.048, -0.026], [-0.048, 0.026], [0.048, 0.026]]) {
    const post = new THREE.Mesh(cornerPostGeo, petgCfMat);
    post.position.set(cx, 0.044, cz);
    post.castShadow = true;
    chestGroup.add(post);
  }
  // Open-truss side X-diagonals
  const sideDiagGeo = new THREE.BoxGeometry(0.0045, 0.098, 0.0045);
  for (const sx of [-0.048, 0.048]) {
    const d1 = new THREE.Mesh(sideDiagGeo, petgCfMat);
    d1.position.set(sx, 0.044, 0);
    d1.rotation.x = 0.54;
    const d2 = new THREE.Mesh(sideDiagGeo, petgCfMat);
    d2.position.set(sx, 0.044, 0);
    d2.rotation.x = -0.54;
    chestGroup.add(d1, d2);
  }
  // Top & bottom thin carbon ring frames
  const ringTop = new THREE.Mesh(makeRoundedBoxGeo(0.106, 0.007, 0.060, 0.0015, 2), petgCfMat);
  ringTop.position.y = 0.086;
  ringTop.castShadow = true;
  const ringBot = new THREE.Mesh(makeRoundedBoxGeo(0.104, 0.007, 0.058, 0.0015, 2), petgCfMat);
  ringBot.position.y = 0.003;
  ringBot.castShadow = true;
  chestGroup.add(ringTop, ringBot);

  // 3. VERTICAL DEAD-CENTER 112g `3S 1300mAh LiPo` Battery ("股関節軸の真上・心臓の位置に垂直収納" -> Zero Rear Offset!)
  const centerLipo = new THREE.Group();
  centerLipo.position.set(0, 0.045, -0.004);
  const lipoCore = new THREE.Mesh(
    makeRoundedBoxGeo(0.036, 0.072, 0.026, 0.002, 2),
    new THREE.MeshPhysicalMaterial({ color: 0x0284c7, roughness: 0.26, clearcoat: 0.6 })
  );
  lipoCore.castShadow = true;
  const lipoStrap = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.012, 0.030), baseMats.rubberBlack);
  const lipoXt60 = new THREE.Mesh(new THREE.BoxGeometry(0.013, 0.009, 0.013), baseMats.xt60Yellow);
  lipoXt60.position.set(-0.010, 0.040, 0.006);
  centerLipo.add(lipoCore, lipoStrap, lipoXt60);
  chestGroup.add(centerLipo);

  // 4. Glowing Emerald `HMD-CORE-v1` Mounted Parallel 8mm in Front of the Vertical LiPo!
  const chestPcb = createHMDCorePCBRig(baseMats, ngMats, 0.96);
  chestPcb.setAssemblyState({ stage: 'uv_cured', busbarProgress: 1.0, ledOn: true, uvGlow: 0.16 });
  chestPcb.root.rotation.x = Math.PI / 2;
  chestPcb.root.position.set(0, 0.045, 0.022);
  chestGroup.add(chestPcb.root);

  const chestGlow = new THREE.PointLight(0x34d399, 0.32, 0.24, 1.8);
  chestGlow.position.set(0, 0.045, 0.048);
  chestGroup.add(chestGlow);

  // 5. Sleek Protective Carbon Arch Rollbar ("最小限のアーチ型ロールバー", Top at exact 380.0mm!)
  const archCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.036, 0.088, 0),
    new THREE.Vector3(-0.030, 0.128, 0.004),
    new THREE.Vector3(0, 0.140, 0.006),
    new THREE.Vector3(0.030, 0.128, 0.004),
    new THREE.Vector3(0.036, 0.088, 0),
  ]);
  const rollbar = new THREE.Mesh(new THREE.TubeGeometry(archCurve, 24, 0.0052, 10, false), petgCfMat);
  rollbar.castShadow = true;
  // Secondary rear diagonal rollbar brace
  const rearBrace = makeWireTube([[0, 0.138, 0.005], [0, 0.114, -0.022], [0, 0.088, -0.025]], 0.0038, petgCfMat, 12);
  chestGroup.add(rollbar, rearBrace);

  // 6. Neutral-Axis PTFE Spiral-Wrapped Harnesses routed cleanly through the hip rotation centers (Zero Pinch!)
  for (const sx of [-1, 1]) {
    upperBody.add(
      makeWireTube(
        [[sx * 0.020, 0.042, 0.016], [sx * 0.036, 0.014, 0.002], [sx * 0.042, -0.018, 0.000]],
        0.0028,
        ptfeTubeMat,
        14
      )
    );
  }

  // 7. Lightweight Thin-Truss 2-DOF Arms (4x STS3215 Shoulder Servos for Counter-Balance Swing!)
  const buildLightArm = (side) => {
    const shPitch = new THREE.Group();
    shPitch.position.set(side * 0.062, 0.072, 0);
    chestGroup.add(shPitch);

    const srvP = createSTS3215Servo(baseMats, 0.78);
    srvP.root.rotation.z = side * (Math.PI / 2);
    shPitch.add(srvP.root);

    const shRoll = new THREE.Group();
    shRoll.position.set(side * 0.016, -0.004, 0);
    shPitch.add(shRoll);

    const srvR = createSTS3215Servo(baseMats, 0.76);
    srvR.root.rotation.x = Math.PI / 2;
    shRoll.add(srvR.root);

    const upperArm = new THREE.Mesh(makeRoundedBoxGeo(0.018, 0.070, 0.018, 0.002, 2), petgCfMat);
    upperArm.position.set(side * 0.005, -0.044, 0);
    upperArm.castShadow = true;
    const forearm = new THREE.Mesh(makeRoundedBoxGeo(0.015, 0.070, 0.016, 0.002, 2), petgCfMat);
    forearm.position.set(side * 0.005, -0.112, 0.009);
    forearm.rotation.x = -0.22;
    forearm.castShadow = true;
    shRoll.add(upperArm, forearm);

    return { shPitch, shRoll };
  };
  const rightArm = buildLightArm(-1);
  const leftArm = buildLightArm(1);

  // 8. Thermal Shutdown Crimson Glow Halo on Right Knee (`ID:04 R_Knee_Pitch: 75°C!`)
  const rKneeHeatMat = new THREE.MeshBasicMaterial({
    color: 0xff2200,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const rKneeHeatHalo = new THREE.Mesh(new THREE.SphereGeometry(0.032, 18, 14), rKneeHeatMat);
  lower.rightLeg.kneePitch.add(rKneeHeatHalo);

  function setAssemblyProgress(p) {
    const clamp = (v) => Math.max(0, Math.min(1, v));
    const sSpine = clamp(p / 0.25);
    const sChest = clamp((p - 0.20) / 0.28);
    const sLipo = clamp((p - 0.44) / 0.22);
    const sArms = clamp((p - 0.64) / 0.20);
    const sRoll = clamp((p - 0.80) / 0.20);

    trussSpine.visible = sSpine > 0.01;
    trussSpine.position.y = (1 - sSpine) * 0.05;
    chestGroup.visible = sChest > 0.01;
    chestGroup.position.y = 0.026 + (1 - sChest) * 0.07;
    centerLipo.visible = sLipo > 0.01;
    centerLipo.position.y = 0.045 + (1 - sLipo) * 0.09; // Drops vertically straight into heart slot!
    rightArm.shPitch.visible = sArms > 0.01;
    leftArm.shPitch.visible = sArms > 0.01;
    rollbar.visible = sRoll > 0.01;
    rearBrace.visible = sRoll > 0.01;
  }

  function setPose({
    pelvisPos = [0, 0.20, 0],
    pelvisRot = [0, 0, 0],
    leftFootPos = [0.042, 0, 0],
    rightFootPos = [-0.042, 0, 0],
    leftArmPitch = 0.12,
    leftArmRoll = 0.08,
    rightArmPitch = 0.12,
    rightArmRoll = -0.08,
    pivotRotX = 0,
    pivotRotZ = 0,
    pivotPosY = 0,
    pivotPosZ = 0,
    rightKneeHeat = 0,
    oneKneeCollapse = 0, // 0..1: Step 16 75°C thermal shutdown marathon-runner collapse!
  } = {}) {
    lower.solveIKPose({
      pelvisPos,
      pelvisRot,
      leftFootPos,
      rightFootPos,
    });

    if (oneKneeCollapse > 0.01) {
      // Right knee loses torque -> drops gracefully onto right knee in marathon-runner exhaustion pose!
      const c = oneKneeCollapse;
      lower.pelvis.position.y = pelvisPos[1] - c * 0.085;
      lower.pelvis.position.z = pelvisPos[2] + c * 0.040;
      lower.pelvis.rotation.x = pelvisRot[0] + c * 0.42;
      lower.rightLeg.hipPitch.rotation.x += c * 0.25;
      lower.rightLeg.kneePitch.rotation.x -= c * 0.95;
      lower.rightLeg.anklePitch.rotation.x += c * 0.45;
      lower.leftLeg.hipPitch.rotation.x -= c * 0.35;
      lower.leftLeg.kneePitch.rotation.x += c * 0.45;
    }

    leftArm.shPitch.rotation.x = leftArmPitch;
    leftArm.shRoll.rotation.z = leftArmRoll;
    rightArm.shPitch.rotation.x = rightArmPitch;
    rightArm.shRoll.rotation.z = rightArmRoll;

    pivotGroup.position.set(0, pivotPosY, pivotPosZ);
    pivotGroup.rotation.set(pivotRotX, 0, pivotRotZ);
    rKneeHeatMat.opacity = rightKneeHeat * 0.48;
  }

  /**
   * Exact Analytic 4-Step Static Bipedal Gait Evaluator (160.0 mm Total Forward Travel!):
   * Uses genuine Cycloid Foot Trajectory:
   *   x(tau) = S * (tau - sin(2*PI*tau) / (2*PI))
   *   z(tau) = 0.5 * H * (1 - cos(2*PI*tau))
   * with lateral CoM shifts (±42.0mm), +3.2° stance hip-roll gravity compensation, and counter-arm swing!
   *
   * progress `p` in [0, 4]:
   *   [0..1]: Shift right (+42mm) -> Left Foot swings +40mm forward (Step 1: 40mm)
   *   [1..2]: Shift left (-42mm)  -> Right Foot swings +80mm forward (Step 2: 80mm)
   *   [2..3]: Shift right (+42mm) -> Left Foot swings +80mm forward (Step 3: 120mm)
   *   [3..4]: Shift left (-42mm)  -> Right Foot swings +40mm forward (Step 4: 160mm) -> Re-center!
   */
  function setStaticWalkProgress(p, { enableGravityComp = true } = {}) {
    const smooth = (u) => {
      const c = Math.max(0, Math.min(1, u));
      return c * c * (3 - 2 * c);
    };
    const cycloidS = (tau) => tau - Math.sin(2 * Math.PI * tau) / (2 * Math.PI);
    const cycloidH = (tau) => 0.5 * (1 - Math.cos(2 * Math.PI * tau));

    const H_LIFT = 0.022; // 22mm crisp foot clearance above EVA mat!
    const SHIFT_X = 0.036; // CoM shift directly over stance foot (±X)
    const COMP_RAD = enableGravityComp ? 0.045 : -0.052; // +2.6..3.2° proud lift vs -2.8° Trendelenburg drop!

    let lZ = 0, lY = 0;
    let rZ = 0, rY = 0;
    let pelX = 0, pelZ = 0, pelRoll = 0;
    let armSpread = 0.10;
    let lArmP = 0.12, rArmP = 0.12;

    if (p <= 1.0) {
      // STEP 1: Right Stance (-X), Left Foot (+X) swings 0 -> +40mm!
      const shiftU = smooth(p / 0.32);
      const swingTau = Math.max(0, Math.min(1, (p - 0.32) / 0.58));
      pelX = -SHIFT_X * shiftU;
      pelZ = 0.015 * cycloidS(swingTau);
      lZ = 0.040 * cycloidS(swingTau);
      lY = H_LIFT * cycloidH(swingTau);
      const compEnv = Math.sin(Math.PI * swingTau);
      pelRoll = -COMP_RAD * compEnv; // Proud lift of left side (or sag if disabled!)
      armSpread = 0.10 + 0.18 * shiftU;
      rArmP = 0.12 + 0.20 * compEnv;
      lArmP = 0.12 - 0.15 * compEnv;
    } else if (p <= 2.0) {
      // STEP 2: Left Stance (+X at z=+40mm), Right Foot (-X) swings 0 -> +80mm!
      const q = p - 1.0;
      const shiftU = smooth(q / 0.32);
      const swingTau = Math.max(0, Math.min(1, (q - 0.32) / 0.58));
      lZ = 0.040;
      pelX = -SHIFT_X + 2 * SHIFT_X * shiftU;
      pelZ = 0.015 + 0.035 * shiftU + 0.025 * cycloidS(swingTau);
      rZ = 0.080 * cycloidS(swingTau);
      rY = H_LIFT * cycloidH(swingTau);
      const compEnv = Math.sin(Math.PI * swingTau);
      pelRoll = COMP_RAD * compEnv;
      armSpread = 0.26;
      lArmP = 0.12 + 0.22 * compEnv;
      rArmP = 0.12 - 0.16 * compEnv;
    } else if (p <= 3.0) {
      // STEP 3: Right Stance (-X at z=+80mm), Left Foot (+X) swings +40mm -> +120mm!
      const q = p - 2.0;
      const shiftU = smooth(q / 0.32);
      const swingTau = Math.max(0, Math.min(1, (q - 0.32) / 0.58));
      rZ = 0.080;
      pelX = SHIFT_X - 2 * SHIFT_X * shiftU;
      pelZ = 0.075 + 0.025 * shiftU + 0.025 * cycloidS(swingTau);
      lZ = 0.040 + 0.080 * cycloidS(swingTau);
      lY = H_LIFT * cycloidH(swingTau);
      const compEnv = Math.sin(Math.PI * swingTau);
      pelRoll = -COMP_RAD * compEnv;
      armSpread = 0.26;
      rArmP = 0.12 + 0.22 * compEnv;
      lArmP = 0.12 - 0.16 * compEnv;
    } else {
      // STEP 4: Left Stance (+X at z=+120mm), Right Foot (-X) swings +80mm -> +160mm & closes stance!
      const q = Math.min(1, p - 3.0);
      const shiftU = smooth(q / 0.28);
      const swingTau = Math.max(0, Math.min(1, (q - 0.28) / 0.48));
      const settleU = smooth((q - 0.78) / 0.22);
      lZ = 0.120 + 0.040 * settleU * 0.0; // Left stays at 120mm? Wait: Step 3 puts Left at 120mm, Step 4 brings Right from 80->160 or 120->160! Let's bring Left to 160 in Step 3 (+80 -> 120 -> 160)!
      lZ = 0.160; // Actually let's make Step 3 land Left at 160 (40->120? No: 0->40, 0->80, 40->120, 80->160? Let's match novel exact: L:+40, R:+80, L:+80(=120), R:+40(=120) or L:+40, R:+80, L:+80(=120), R:+80(=160), L:+40(=160) -> let's land BOTH cleanly at 160.0mm!)
      lZ = 0.160;
      pelX = (-SHIFT_X + 2 * SHIFT_X * shiftU) * (1 - settleU);
      pelZ = 0.125 + 0.035 * Math.min(1, shiftU * 0.5 + cycloidS(swingTau) * 0.5);
      rZ = 0.080 + 0.080 * cycloidS(swingTau);
      rY = H_LIFT * cycloidH(swingTau);
      const compEnv = Math.sin(Math.PI * swingTau);
      pelRoll = COMP_RAD * compEnv;
      armSpread = 0.26 * (1 - settleU) + 0.08 * settleU;
      lArmP = 0.12 + 0.18 * compEnv;
      rArmP = 0.12 - 0.12 * compEnv;
    }

    // Ensure Step 3 lands Left cleanly at +160mm so Step 4 matches both soles side-by-side at exactly 160.0mm!
    if (p > 2.0 && p <= 3.0) {
      const q = p - 2.0;
      const swingTau = Math.max(0, Math.min(1, (q - 0.32) / 0.58));
      lZ = 0.040 + 0.120 * cycloidS(swingTau);
    }

    setPose({
      pelvisPos: [pelX, 0.198, pelZ],
      pelvisRot: [0, 0, pelRoll],
      leftFootPos: [0.042, lY, lZ],
      rightFootPos: [-0.042, rY, rZ],
      leftArmPitch: lArmP,
      leftArmRoll: armSpread,
      rightArmPitch: rArmP,
      rightArmRoll: -armSpread,
    });
  }

  return {
    root,
    pivotGroup,
    lower,
    upperBody,
    chestGroup,
    setAssemblyProgress,
    setPose,
    setStaticWalkProgress,
  };
}

/**
 * Chapter 7 Hero Props:
 * - Translucent-Domed 65°C Filament Dryer with spinning Matte-Charcoal PETG-CF Spool
 * - Dark Gunmetal 0.4mm Hardened Steel Magnetic Hotend Nozzle
 * - Blue Nitrile-Gloved Hand Rig (protecting against chopped carbon micro-fibers!)
 * - Glowing 3D Cycloid Trajectory Arc Guide & 4-Step 160.0mm Illuminated Footprint Track
 * - Glowing 3D Linear Inverted Pendulum (LIPM) & ZMP Hologram hovering over Open Ch.4 Textbook
 */
export function createCh07Props(baseMats, ngMats, petgCfMat) {
  // 1. 65°C Filament Dryer Box with Translucent Dome + Spinning Charcoal PETG-CF Spool!
  const dryerGroup = new THREE.Group();
  const dryerBase = new THREE.Mesh(makeRoundedBoxGeo(0.21, 0.065, 0.115, 0.006, 2), baseMats.bambuWhite);
  dryerBase.position.y = 0.0325;
  dryerBase.castShadow = true;
  dryerGroup.add(dryerBase);

  const domeMat = new THREE.MeshPhysicalMaterial({
    color: 0xf1f5f9,
    roughness: 0.14,
    transparent: true,
    opacity: 0.38,
    clearcoat: 1.0,
  });
  const dryerDome = new THREE.Mesh(new THREE.CylinderGeometry(0.098, 0.098, 0.095, 28, 1, false, 0, Math.PI), domeMat);
  dryerDome.rotation.z = Math.PI / 2;
  dryerDome.rotation.y = Math.PI / 2;
  dryerDome.position.set(0, 0.068, 0);
  dryerGroup.add(dryerDome);

  const cfSpool = new THREE.Group();
  cfSpool.position.set(0, 0.115, 0);
  const spoolRimGeo = new THREE.CylinderGeometry(0.078, 0.078, 0.004, 28);
  const rim1 = new THREE.Mesh(spoolRimGeo, baseMats.darkAnodized);
  rim1.rotation.x = Math.PI / 2;
  rim1.position.z = -0.026;
  const rim2 = rim1.clone();
  rim2.position.z = 0.026;
  const filamentRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.048, 28), petgCfMat);
  filamentRoll.rotation.x = Math.PI / 2;
  cfSpool.add(rim1, rim2, filamentRoll);
  dryerGroup.add(cfSpool);

  // Glowing "65°C" Dryer Front LED Display
  const dLedC = document.createElement('canvas');
  dLedC.width = 256; dLedC.height = 128;
  const dlx = dLedC.getContext('2d');
  dlx.fillStyle = '#090d14'; dlx.fillRect(0, 0, 256, 128);
  dlx.fillStyle = '#fb923c'; dlx.font = '900 58px monospace'; dlx.fillText('65°C', 28, 72);
  dlx.fillStyle = '#94a3b8'; dlx.font = '800 22px monospace'; dlx.fillText('PETG-CF DRYING', 18, 112);
  const dLedTex = new THREE.CanvasTexture(dLedC);
  dLedTex.colorSpace = THREE.SRGBColorSpace;
  const dryerLcd = new THREE.Mesh(new THREE.PlaneGeometry(0.064, 0.032), new THREE.MeshBasicMaterial({ map: dLedTex }));
  dryerLcd.position.set(0, 0.034, 0.0585);
  dryerGroup.add(dryerLcd);

  // 2. 0.4mm Hardened Steel Magnetic Hotend Nozzle (Dark Gunmetal Heatblock + Heatsink Fins + Hex Nozzle Tip!)
  const nozzleGroup = new THREE.Group();
  const gunmetalMat = new THREE.MeshPhysicalMaterial({ color: 0x272a30, roughness: 0.24, metalness: 0.88, clearcoat: 0.35 });
  const hs = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.034, 0.018), baseMats.brushedAlu);
  hs.position.y = 0.028;
  const block = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.014, 0.018), gunmetalMat);
  block.position.y = 0.002;
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.0055, 0.012, 6), gunmetalMat);
  tip.rotation.x = Math.PI;
  tip.position.y = -0.010;
  nozzleGroup.add(hs, block, tip);

  // 3. Blue Nitrile-Gloved Hand Rig ("青いニトリル手袋をはめ")
  const nitrileMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    roughness: 0.34,
    metalness: 0.02,
    clearcoat: 0.42,
  });
  const nitrileNg = { ...ngMats, skinNextGen: nitrileMat, fingernailMat: nitrileMat };
  const blueHandLeft = createNextGenHandRig(baseMats, nitrileNg, -1);
  const blueHandRight = createNextGenHandRig(baseMats, nitrileNg, 1);

  // 4. Glowing 3D Cycloid Trajectory Arc Ribbon ("サイクロイド曲線")
  const cycPts = [];
  for (let i = 0; i <= 24; i++) {
    const tau = i / 24;
    const z = 0.080 * (tau - Math.sin(2 * Math.PI * tau) / (2 * Math.PI));
    const y = 0.028 * 0.5 * (1 - Math.cos(2 * Math.PI * tau));
    cycPts.push(new THREE.Vector3(0.042, y + 0.004, z));
  }
  const cycCurve = new THREE.CatmullRomCurve3(cycPts);
  const cycloidArc = new THREE.Mesh(
    new THREE.TubeGeometry(cycCurve, 32, 0.0022, 8, false),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
  );

  // 5. White Start-Line & 160.0mm Footprint Markers + 1.0m Endurance Track Ticks on EVA Mat
  const trackMarks = new THREE.Group();
  const tapeMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc, transparent: true, opacity: 0.82 });
  const startLine = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.008), tapeMat);
  startLine.rotation.x = -Math.PI / 2;
  startLine.position.set(0, 0.001, -0.055);
  trackMarks.add(startLine);

  const goldLine = new THREE.Mesh(
    new THREE.PlaneGeometry(0.46, 0.008),
    new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.9 })
  );
  goldLine.rotation.x = -Math.PI / 2;
  goldLine.position.set(0, 0.0012, 0.160 + 0.055);
  trackMarks.add(goldLine);

  // 4 glowing footprint pads lighting up as each step lands!
  const stepPads = [];
  const padCoords = [[0.042, 0.040], [-0.042, 0.080], [0.042, 0.160], [-0.042, 0.160]];
  for (const [px, pz] of padCoords) {
    const m = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.0 });
    const pad = new THREE.Mesh(new THREE.PlaneGeometry(0.074, 0.116), m);
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(px, 0.0015, pz + 0.014);
    trackMarks.add(pad);
    stepPads.push(m);
  }

  // 6. Glowing 3D Linear Inverted Pendulum (LIPM) & ZMP Hologram hovering over Open Ch.4 Textbook!
  const zmpHolo = new THREE.Group();
  const holoGreen = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.78 });
  const holoAmber = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.90 });
  const holoCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.72 });

  // Support foot polygon & ZMP glowing point on base plane
  const zmpFoot = new THREE.Mesh(new THREE.RingGeometry(0.022, 0.026, 28), holoGreen);
  zmpFoot.rotation.x = -Math.PI / 2;
  const zmpDot = new THREE.Mesh(new THREE.SphereGeometry(0.006, 14, 12), holoAmber);
  // Leaning pendulum rod + CoM mass orb + forward velocity vector arrow!
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.0022, 0.115, 10), holoCyan);
  rod.position.set(0, 0.054, 0.022);
  rod.rotation.x = 0.36;
  const comMass = new THREE.Mesh(new THREE.SphereGeometry(0.014, 18, 14), holoGreen);
  comMass.position.set(0, 0.106, 0.042);
  const velArrow = new THREE.Mesh(new THREE.ConeGeometry(0.008, 0.026, 12), holoAmber);
  velArrow.rotation.x = Math.PI / 2;
  velArrow.position.set(0, 0.106, 0.088);
  const velShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.036, 8), holoAmber);
  velShaft.rotation.x = Math.PI / 2;
  velShaft.position.set(0, 0.106, 0.062);
  zmpHolo.add(zmpFoot, zmpDot, rod, comMass, velArrow, velShaft);

  return {
    dryerGroup,
    cfSpool,
    nozzleGroup,
    blueHandLeft,
    blueHandRight,
    cycloidArc,
    trackMarks,
    stepPads,
    zmpHolo,
  };
}
