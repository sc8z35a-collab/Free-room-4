import * as THREE from 'three';
import { createHMD01Rev15Athlete, createPetgCfMaterial } from '../ch07/hmd01Rev15Rig.js';
import { createNextGenHandRig } from '../nextgen/pbrMicroTextures.js';

function makeWireTube(points, radius, mat, segs = 14) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segs, radius, 8, false), mat);
  mesh.castShadow = true;
  return mesh;
}

/**
 * Wraps `HMD-01 Rev 1.5` (PETG-CF, 1,762g, 380mm) with Chapter 8 Upgrades:
 * - 1.0mm High-Friction Silicone Rubber Sole Pads at all 4 corners of each foot
 * - Genuine Real-Time Analytic 3D-LIPM ZMP Dynamic Walking Gait Solver:
 *     * Step period 0.45s (2.2 steps/s), stride 60.0mm (13.3 cm/s)
 *     * Hyperbolic cosh/sinh lateral pelvis sway y_max = 23.9mm (half the static 42mm wobble!)
 *     * Brisk anti-phase arm counter-swing + forward dynamic lean (+4.5°)
 *     * Phantom Wi-Fi 13.8ms Freeze Glitch & Faceplant (Cut 2A)
 *     * Capture-Point Deceleration Braking Step at 2.0m Finish Line (Cut 4B)
 */
export function createHMD01ZmpDynamicRig(baseMats, ngMats) {
  const petgCfMat = createPetgCfMaterial();
  const rev15 = createHMD01Rev15Athlete(baseMats, ngMats, petgCfMat);

  // Add 1.0mm High-Friction Silicone Grip Pads at all 4 corners of both soles!
  const siliconeMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.92 });
  const padGeo = new THREE.BoxGeometry(0.016, 0.0018, 0.018);
  for (const leg of [rev15.lower.leftLeg, rev15.lower.rightLeg]) {
    for (const [px, pz] of [[-0.023, -0.042], [0.023, -0.042], [-0.023, 0.042], [0.023, 0.042]]) {
      const pad = new THREE.Mesh(padGeo, siliconeMat);
      pad.position.set(px, -0.0036, pz);
      leg.solePlate.add(pad);
    }
  }

  // Live Glowing Golden ZMP Floor Projection Ring + Emerald CoM Projection Dot!
  const zmpVisual = new THREE.Group();
  const zmpMarker = new THREE.Mesh(
    new THREE.RingGeometry(0.012, 0.018, 24),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide, transparent: true, opacity: 0.88 })
  );
  zmpMarker.rotation.x = -Math.PI / 2;
  const comMarker = new THREE.Mesh(
    new THREE.CircleGeometry(0.009, 20),
    new THREE.MeshBasicMaterial({ color: 0x34d399, side: THREE.DoubleSide, transparent: true, opacity: 0.92 })
  );
  comMarker.rotation.x = -Math.PI / 2;
  comMarker.position.y = 0.0005;
  zmpVisual.add(zmpMarker, comMarker);
  rev15.root.add(zmpVisual);

  const cosh = (x) => 0.5 * (Math.exp(x) + Math.exp(-x));

  /**
   * Evaluates Continuous Analytic ZMP 3D-LIPM Dynamic Walking at continuous step index `stepFloat`!
   * Each integer increment = 1 brisk 0.45s step (+60.0mm forward travel).
   */
  function setDynamicZmpWalk(stepFloat, {
    maxSteps = 12,
    stride = 0.060,
    footLift = 0.024,
    showZmpDots = true,
    glitchAtStep = -1, // If >= 0, triggers 13.8ms Wi-Fi freeze glitch & faceplant!
  } = {}) {
    zmpVisual.visible = showZmpDots;

    const clampedStep = Math.max(0, Math.min(maxSteps, stepFloat));
    const stepIdx = Math.floor(clampedStep);
    const tau = clampedStep - stepIdx; // 0..1 within current 0.45s step

    // Capture-Point smooth braking stop on final step!
    const isStopped = stepFloat >= maxSteps;
    const isRightStance = stepIdx % 2 === 0; // Even steps: Right (-X) supports, Left (+X) swings!

    // True Hyperbolic Cosh Lateral Sway: y_max = 23.9mm (NOT 42.0mm!)
    // u in [-1, +1] centered at mid-step (tau = 0.5)
    const Tc = 0.1514;
    const halfT = 0.225;
    const tLocal = (tau - 0.5) * 0.45;
    const coshNorm = (1 - cosh(tLocal / Tc) / cosh(halfT / Tc)); // Peaks at 0.569 when tau=0.5!
    const swayDir = isRightStance ? -1 : 1;
    const pelX = isStopped ? 0 : swayDir * 0.042 * coshNorm; // Exact 23.9mm peak lateral sway!

    // Continuous smooth forward progression (no stopping between steps!)
    const forwardZ = clampedStep * stride;

    // Cycloid swing trajectory for the airborne foot!
    const cycS = tau - Math.sin(2 * Math.PI * tau) / (2 * Math.PI);
    const cycH = 0.5 * (1 - Math.cos(2 * Math.PI * tau));

    let lZ, rZ, lY = 0, rY = 0;
    if (isStopped) {
      lZ = maxSteps * stride;
      rZ = maxSteps * stride;
    } else if (isRightStance) {
      // Right foot planted at stepIdx * stride; Left swings from (stepIdx - 1) to (stepIdx + 1)
      rZ = stepIdx * stride;
      const lStart = Math.max(0, (stepIdx - 1) * stride);
      const lEnd = Math.min(maxSteps * stride, (stepIdx + 1) * stride);
      lZ = lStart + (lEnd - lStart) * cycS;
      lY = footLift * cycH;
    } else {
      // Left foot planted at stepIdx * stride; Right swings from (stepIdx - 1) to (stepIdx + 1)
      lZ = stepIdx * stride;
      const rStart = Math.max(0, (stepIdx - 1) * stride);
      const rEnd = Math.min(maxSteps * stride, (stepIdx + 1) * stride);
      rZ = rStart + (rEnd - rStart) * cycS;
      rY = footLift * cycH;
    }

    // Dynamic forward lean (+4.5°) & crisp anti-phase arm counter-swing!
    const armPhase = Math.sin(clampedStep * Math.PI);
    const dynamicLean = isStopped ? 0.0 : 0.078;
    const compRoll = isStopped ? 0 : (isRightStance ? -0.042 : 0.042) * Math.sin(Math.PI * tau);

    // Move robot root forward along Z while solving local IK cleanly around root!
    const baseZ = forwardZ;
    let pivotRotX = 0;
    let pivotRotZ = 0;
    let pivotPosY = 0;

    if (glitchAtStep > 0 && stepFloat >= glitchAtStep) {
      // 13.8ms Wi-Fi Interrupt Freeze Glitch -> Trips on Step 4 -> Faceplant!
      const g = Math.min(1, (stepFloat - glitchAtStep) / 1.15);
      const ease = g * g;
      pivotRotX = ease * 1.48;
      pivotRotZ = ease * 0.16;
      pivotPosY = ease * 0.042;
      zmpVisual.visible = false;
    }

    rev15.setPose({
      pelvisPos: [pelX, 0.200 + (isStopped ? 0.004 : 0), 0],
      pelvisRot: [dynamicLean, 0, compRoll],
      leftFootPos: [0.042, lY, lZ - baseZ],
      rightFootPos: [-0.042, rY, rZ - baseZ],
      leftArmPitch: isStopped ? 0.08 : 0.12 - armPhase * 0.34,
      leftArmRoll: 0.12,
      rightArmPitch: isStopped ? 0.08 : 0.12 + armPhase * 0.34,
      rightArmRoll: -0.12,
      pivotRotX,
      pivotRotZ,
      pivotPosY,
    });

    // Position ZMP ring directly under stance foot & CoM emerald dot at pelvis projection!
    zmpMarker.position.set(isStopped ? 0 : swayDir * 0.042, 0.002, 0);
    comMarker.position.set(pelX, 0.003, 0);

    return { forwardZ, pelX, isStopped };
  }

  return {
    ...rev15,
    petgCfMat,
    zmpVisual,
    setDynamicZmpWalk,
  };
}

/**
 * Chapter 8 Specialized Engineering Props:
 * 1. Wooden Broomstick Inverted Pendulum balanced on Minato's Palm (Cut 1A)
 * 2. 3D Hyperbolic Cosh ZMP (`23.9mm`) vs Static (`42.0mm`) Comparison Hologram (Cut 1B)
 * 3. Akizuki 8ch 24MHz USB Logic Analyzer + 3 Colorful Micro IC Test-Hook Clips (Cut 2B)
 * 4. ESP32-S3 FreeRTOS Dual-Core Sanctuary Architecture Hologram (Cut 3A)
 * 5. Yellow/Black Non-Contact IR Laser Thermometer Gun + Red Laser Beam + `48.0°C` Backlit LCD (Cut 4C)
 */
export function createCh08Props(baseMats, ngMats) {
  // 1. Broomstick Inverted Pendulum Rig balanced on Minato's Open Palm!
  const broomRig = new THREE.Group();
  const palmHand = createNextGenHandRig(baseMats, ngMats, 1);
  palmHand.group.rotation.set(0, 0, Math.PI); // Palm facing UP!
  palmHand.group.position.set(0, 0, 0);
  broomRig.add(palmHand.group);

  const broomPivot = new THREE.Group();
  broomPivot.position.set(0, 0.018, -0.010);
  const broomWoodMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.62 });
  const broomStick = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.58, 20), broomWoodMat);
  broomStick.position.y = 0.29;
  broomStick.castShadow = true;
  const broomCap = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.024, 18), baseMats.rubberBlack);
  broomCap.position.y = 0.012;
  broomPivot.add(broomStick, broomCap);
  broomRig.add(broomPivot);

  // 2. 3D Hyperbolic Cosh ZMP (23.9mm) vs Static (42.0mm) Trajectory Hologram over ODE Notebook!
  const lipmHolo = new THREE.Group();
  const footBoxGeo = new THREE.BoxGeometry(0.032, 0.003, 0.052);
  const footMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true, transparent: true, opacity: 0.65 });
  for (let i = 0; i < 4; i++) {
    const f = new THREE.Mesh(footBoxGeo, footMat);
    f.position.set(i % 2 === 0 ? -0.032 : 0.032, 0.002, -0.09 + i * 0.055);
    lipmHolo.add(f);
  }
  // Wide static 42mm gray square-ish curve vs Sleek narrow 23.9mm glowing emerald hyperbolic cosh curve!
  const staticPts = [];
  const zmpPts = [];
  for (let i = 0; i <= 48; i++) {
    const u = i / 48;
    const z = -0.10 + u * 0.20;
    const sWave = Math.sin(u * Math.PI * 3.0);
    staticPts.push(new THREE.Vector3(Math.sign(sWave) * Math.pow(Math.abs(sWave), 0.45) * 0.032, 0.048, z));
    zmpPts.push(new THREE.Vector3(sWave * 0.018, 0.068, z)); // Half the lateral amplitude (23.9mm vs 42mm!)
  }
  lipmHolo.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(staticPts), 48, 0.0014, 6, false),
      new THREE.MeshBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.55 })
    ),
    new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(zmpPts), 48, 0.0028, 8, false),
      new THREE.MeshBasicMaterial({ color: 0x34d399 })
    )
  );
  // Moving glowing CoM orb riding along the emerald hyperbolic curve!
  const holoOrb = new THREE.Mesh(
    new THREE.SphereGeometry(0.0075, 14, 12),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  lipmHolo.add(holoOrb);

  // 3. Akizuki 8ch 24MHz USB Logic Analyzer + 3 Colorful Micro IC Test-Hook Clips!
  const logicGroup = new THREE.Group();
  const laBody = new THREE.Mesh(new THREE.BoxGeometry(0.054, 0.014, 0.028), baseMats.darkAnodized);
  laBody.position.set(0.082, 0.007, 0.010);
  laBody.castShadow = true;
  logicGroup.add(laBody);

  // Label sticker "24MHz 8CH LOGIC"
  const laC = document.createElement('canvas');
  laC.width = 256; laC.height = 128;
  const lcx = laC.getContext('2d');
  lcx.fillStyle = '#0f172a'; lcx.fillRect(0, 0, 256, 128);
  lcx.fillStyle = '#38bdf8'; lcx.font = '900 32px monospace'; lcx.fillText('24MHz 8CH', 22, 54);
  lcx.fillStyle = '#34d399'; lcx.font = '800 22px monospace'; lcx.fillText('USB LOGIC ANALYZER', 14, 98);
  const laTex = new THREE.CanvasTexture(laC);
  laTex.colorSpace = THREE.SRGBColorSpace;
  const laSticker = new THREE.Mesh(new THREE.PlaneGeometry(0.048, 0.024), new THREE.MeshBasicMaterial({ map: laTex }));
  laSticker.rotation.x = -Math.PI / 2;
  laSticker.position.set(0.082, 0.0145, 0.010);
  logicGroup.add(laSticker);

  // 3 Colorful Dupont Leads + Micro IC Test-Hook Clips attached onto `HMD-CORE-v1` pads!
  const clipSpecs = [
    { col: 0xfacc15, target: [-0.018, 0.014, 0.026], start: [0.055, 0.008, 0.002] }, // CH0 Yellow (GPIO LOOP)
    { col: 0x22c55e, target: [0.010, 0.014, 0.032], start: [0.055, 0.008, 0.010] },  // CH1 Green (1Mbps DATA)
    { col: 0x38bdf8, target: [0.002, 0.014, 0.012], start: [0.055, 0.008, 0.018] },  // CH2 Cyan (BNO085 INT)
  ];
  for (const cs of clipSpecs) {
    const cMat = new THREE.MeshPhysicalMaterial({ color: cs.col, roughness: 0.32, clearcoat: 0.45 });
    // Mini test-hook barrel upright over PCB pad!
    const hook = new THREE.Mesh(new THREE.CylinderGeometry(0.0032, 0.0022, 0.024, 12), cMat);
    hook.position.set(cs.target[0], cs.target[1] + 0.008, cs.target[2]);
    hook.rotation.z = -0.25;
    hook.castShadow = true;
    logicGroup.add(hook);
    // Curved flexible silicone lead connecting analyzer -> test hook
    const mid = [
      (cs.start[0] + cs.target[0]) * 0.5,
      0.042,
      (cs.start[2] + cs.target[2]) * 0.5,
    ];
    logicGroup.add(makeWireTube([cs.start, mid, [cs.target[0] + 0.003, cs.target[1] + 0.018, cs.target[2]]], 0.0011, cMat, 16));
  }

  // 4. ESP32-S3 FreeRTOS Dual-Core Isolation Hologram hovering over `HMD-CORE-v1`!
  const dualCoreHolo = new THREE.Group();
  const makeCoreBlock = (title, sub, hex) => {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 160;
    const ctx = c.getContext('2d');
    ctx.fillStyle = 'rgba(8, 14, 26, 0.92)';
    ctx.fillRect(0, 0, 256, 160);
    ctx.strokeStyle = hex;
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, 248, 152);
    ctx.fillStyle = hex;
    ctx.font = '900 34px monospace';
    ctx.fillText(title, 20, 62);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '800 22px sans-serif';
    ctx.fillText(sub, 20, 118);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(
      new THREE.PlaneGeometry(0.052, 0.033),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.94, side: THREE.DoubleSide })
    );
  };
  const core0 = makeCoreBlock('CORE 0', 'Wi-Fi / UDP隔離', '#f97316');
  core0.position.set(-0.032, 0.048, 0);
  const core1 = makeCoreBlock('CORE 1', '200Hz 聖域コア', '#34d399');
  core1.position.set(0.032, 0.048, 0);
  const atomicBridge = new THREE.Mesh(
    new THREE.BoxGeometry(0.014, 0.005, 0.004),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
  );
  atomicBridge.position.set(0, 0.048, 0);
  dualCoreHolo.add(core0, core1, atomicBridge);

  // 5. Yellow/Black Non-Contact IR Laser Thermometer Gun + Red Laser Beam + `48.0 °C` Backlit LCD!
  const irGun = new THREE.Group();
  const yellowGunMat = new THREE.MeshPhysicalMaterial({ color: 0xfacc15, roughness: 0.32, clearcoat: 0.35 });
  const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.046, 0.115), yellowGunMat);
  barrel.position.set(0, 0.045, 0);
  barrel.castShadow = true;
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.095, 0.038), baseMats.rubberBlack);
  grip.position.set(0, -0.015, 0.025);
  grip.rotation.x = 0.25;
  grip.castShadow = true;
  const lensRim = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.018, 0.012, 18), baseMats.darkAnodized);
  lensRim.rotation.x = Math.PI / 2;
  lensRim.position.set(0, 0.045, -0.060);

  // Crisp Backlit `48.0 °C` LCD on rear face of IR Thermometer Gun!
  const irC = document.createElement('canvas');
  irC.width = 256; irC.height = 192;
  const ix = irC.getContext('2d');
  ix.fillStyle = '#042f2e'; ix.fillRect(0, 0, 256, 192);
  ix.strokeStyle = '#34d399'; ix.lineWidth = 8; ix.strokeRect(6, 6, 244, 180);
  ix.fillStyle = '#34d399'; ix.font = '900 56px monospace'; ix.fillText('48.0°C', 22, 102);
  ix.fillStyle = '#a7f3d0'; ix.font = '800 20px monospace'; ix.fillText('100 STEPS / COOL!', 22, 154);
  const irTex = new THREE.CanvasTexture(irC);
  irTex.colorSpace = THREE.SRGBColorSpace;
  const irLcd = new THREE.Mesh(new THREE.PlaneGeometry(0.036, 0.028), new THREE.MeshBasicMaterial({ map: irTex }));
  irLcd.position.set(0, 0.046, 0.0585);
  irGun.add(barrel, grip, lensRim, irLcd);

  // Glowing Red IR Aiming Laser Beam + Target Dot!
  const laserMat = new THREE.MeshBasicMaterial({ color: 0xff1e42, transparent: true, opacity: 0.85 });
  const laserBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.0012, 0.0012, 0.30, 8), laserMat);
  laserBeam.rotation.x = Math.PI / 2;
  laserBeam.position.set(0, 0.045, -0.21);
  const laserDot = new THREE.Mesh(new THREE.SphereGeometry(0.0055, 12, 10), new THREE.MeshBasicMaterial({ color: 0xff3b5c }));
  laserDot.position.set(0, 0.045, -0.36);
  irGun.add(laserBeam, laserDot);

  return {
    broomRig,
    broomPivot,
    lipmHolo,
    holoOrb,
    logicGroup,
    dualCoreHolo,
    irGun,
  };
}
