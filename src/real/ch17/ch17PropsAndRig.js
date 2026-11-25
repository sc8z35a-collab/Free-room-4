import * as THREE from 'three';

/**
 * Chapter 17 Bespoke Ultra-Quality Hero Props (`第17章：身体の声を聴く夏 —— 7.62キロの初起立`):
 * 1. `createDigitalForceGaugeRig`: Electronic Digital Force Gauge hooked to the `185.0 mm` black carbon shin tip,
 *    with live animated LCD climbing `0.50 N -> 1.20 N -> 2.05 N (0.38 N·m)` -> sudden `ヌルッ` gear breakaway!
 * 2. `createSorbothaneImuRig`: Ultra-macro open chest IMU PCB with 4 cobalt-blue Sorbothane anti-vibration cushions!
 * 3. `createDomainRandClonesRig`: 400-instance Isaac Lab army upgraded with brutal Domain Randomization handicaps:
 *    500g gray lead blocks strapped on backs, icy blue slippery floor patches & red 6.0ms delay halos!
 * 4. `createYakinikuGrillRig`: Station-front student yakiniku round charcoal table w/ glowing embers, sizzling
 *    curling thin beef tongue (`牛タン`), 4 iced oolong tea mugs (`烏龍茶ジョッキ`), and rising smoke puffs!
 */

export function createDigitalForceGaugeRig(baseMats, carbonMat) {
  const group = new THREE.Group();

  // Horizontal Clamped Knee + `185.0 mm` Black Woven-Carbon Shin Bar
  const blackAlum = new THREE.MeshStandardMaterial({ color: 0x11141a, metalness: 0.88, roughness: 0.22 });
  const kneeHub = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.026, 28), blackAlum);
  kneeHub.rotation.x = Math.PI / 2;
  kneeHub.position.set(-0.14, 0.22, 0);
  const copperRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.027, 0.0045, 8, 22),
    new THREE.MeshStandardMaterial({ color: 0xd96b27, metalness: 0.9, roughness: 0.24 })
  );
  copperRing.position.set(-0.14, 0.22, 0.014);

  const shinPivot = new THREE.Group();
  shinPivot.position.set(-0.14, 0.22, 0);
  const shinBar = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.185, 0.018), carbonMat);
  shinBar.position.set(0, -0.0925, 0);
  const hookPin = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.028, 12), baseMats.chromeSteel);
  hookPin.rotation.x = Math.PI / 2;
  hookPin.position.set(0, -0.175, 0);
  shinPivot.add(shinBar, hookPin);
  group.add(kneeHub, copperRing, shinPivot);

  // Electronic Digital Force Gauge (`デジタルフォースゲージ`) pulling horizontally to the right!
  const gaugeGroup = new THREE.Group();
  gaugeGroup.position.set(0.04, 0.045, 0);
  const hookRod = new THREE.Mesh(new THREE.CylinderGeometry(0.0035, 0.0035, 0.15, 10), baseMats.chromeSteel);
  hookRod.rotation.z = Math.PI / 2;
  hookRod.position.x = -0.10;
  const gaugeBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.145, 0.068, 0.034),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.34, metalness: 0.15 })
  );
  const lcdC = document.createElement('canvas');
  lcdC.width = 256; lcdC.height = 128;
  const lx = lcdC.getContext('2d');
  const lcdTex = new THREE.CanvasTexture(lcdC);
  lcdTex.colorSpace = THREE.SRGBColorSpace;
  const gaugeLcd = new THREE.Mesh(new THREE.PlaneGeometry(0.112, 0.052), new THREE.MeshBasicMaterial({ map: lcdTex }));
  gaugeLcd.position.set(0.006, 0.002, 0.018);
  gaugeGroup.add(hookRod, gaugeBody, gaugeLcd);
  group.add(gaugeGroup);

  let lastVal = -1;
  function updateGauge(u) {
    // u: 0..1 -> ramps 0.50N -> 1.20N -> 2.05N breakaway (`ヌルッ！`) -> 2.18N gliding!
    const force = u < 0.72 ? 0.45 + (u / 0.72) * 1.62 : 2.07 + ((u - 0.72) / 0.28) * 0.14;
    const torque = force * 0.185;
    const moved = u >= 0.72 ? ((u - 0.72) / 0.28) * 0.34 : 0;
    shinPivot.rotation.z = moved;
    gaugeGroup.position.x = 0.04 + moved * 0.16;

    const bucket = Math.round(force * 20);
    if (bucket !== lastVal) {
      lastVal = bucket;
      lx.fillStyle = '#091f1a'; lx.fillRect(0, 0, 256, 128);
      lx.strokeStyle = force >= 2.05 ? '#34d399' : '#38bdf8';
      lx.lineWidth = 4; lx.strokeRect(4, 4, 248, 120);
      lx.fillStyle = '#94a3b8'; lx.font = '700 18px monospace';
      lx.fillText('FORCE GAUGE (L=185mm)', 14, 28);
      lx.fillStyle = force >= 2.05 ? '#4ade80' : '#f8fafc';
      lx.font = '900 44px monospace';
      lx.fillText(`${force.toFixed(2)} N`, 16, 78);
      lx.fillStyle = '#fde68a'; lx.font = '700 20px monospace';
      lx.fillText(force >= 2.05 ? `τ=${torque.toFixed(2)}N·m [SLIP!]` : `τ=${torque.toFixed(2)}N·m [STUCK]`, 14, 112);
      lcdTex.needsUpdate = true;
    }
  }
  updateGauge(0.5);

  return { group, updateGauge };
}

export function createSorbothaneImuRig(baseMats, carbonMat) {
  const group = new THREE.Group();

  // Carbon Chest Plate Base
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.010, 0.18), carbonMat);
  plate.position.y = 0.005;
  group.add(plate);

  // 4 Vibrant Cobalt-Blue Sorbothane Anti-Vibration Cushions (`青い特殊な防振ゴムの小さな座布団4枚`)!
  const sorboMat = new THREE.MeshPhysicalMaterial({
    color: 0x2563eb,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.45,
    roughness: 0.22,
    clearcoat: 0.6,
  });
  const pads = [];
  const corners = [[-0.048, -0.036], [0.048, -0.036], [-0.048, 0.036], [0.048, 0.036]];
  for (const [cx, cz] of corners) {
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.016, 0.014, 20), sorboMat);
    pad.position.set(cx, 0.017, cz);
    group.add(pad);
    pads.push(pad);
  }

  // Green IMU Sensor PCB descending softly onto the 4 Blue Sorbothane Cushions!
  const imuGroup = new THREE.Group();
  const pcb = new THREE.Mesh(
    new THREE.BoxGeometry(0.125, 0.006, 0.095),
    new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.32 })
  );
  const imuChip = new THREE.Mesh(
    new THREE.BoxGeometry(0.028, 0.007, 0.028),
    new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.35 })
  );
  imuChip.position.y = 0.006;
  const imuLed = new THREE.Mesh(
    new THREE.SphereGeometry(0.004, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 3.5 })
  );
  imuLed.position.set(0.042, 0.006, 0.025);
  imuGroup.add(pcb, imuChip, imuLed);
  group.add(imuGroup);

  // Vibration Absorption Ripples inside the Blue Rubber turning shock into calm heat!
  const calmRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
  const calmRing = new THREE.Mesh(new THREE.RingGeometry(0.055, 0.072, 32), calmRingMat);
  calmRing.rotation.x = -Math.PI / 2;
  calmRing.position.y = 0.016;
  group.add(calmRing);

  function animateSorbothane(u) {
    const seat = Math.max(0, Math.min(1, u * 1.4));
    imuGroup.position.y = 0.027 + (1 - seat) * 0.045;
    for (const p of pads) {
      p.scale.y = 1.0 - seat * 0.16; // gentle elastic squish under the IMU board!
    }
    calmRingMat.opacity = seat > 0.7 ? (1 - (seat - 0.7) / 0.3) * 0.65 + 0.25 : 0;
  }

  return { group, animateSorbothane };
}

export function createDomainRandClonesRig(baseMats) {
  const group = new THREE.Group();
  const ROWS = 16;
  const COLS = 16;
  const COUNT = ROWS * COLS;

  const torsoGeo = new THREE.BoxGeometry(0.16, 0.21, 0.10);
  const visorGeo = new THREE.BoxGeometry(0.076, 0.018, 0.016);
  const legGeo = new THREE.BoxGeometry(0.042, 0.34, 0.044);
  const leadGeo = new THREE.BoxGeometry(0.11, 0.075, 0.065); // 500g Gray Lead Weight Block!

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x151820, metalness: 0.82, roughness: 0.28 });
  const visorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const leadMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.72, roughness: 0.45 });

  const torsoInst = new THREE.InstancedMesh(torsoGeo, bodyMat, COUNT);
  const visorInst = new THREE.InstancedMesh(visorGeo, visorMat, COUNT);
  const legLInst = new THREE.InstancedMesh(legGeo, bodyMat, COUNT);
  const legRInst = new THREE.InstancedMesh(legGeo, bodyMat, COUNT);
  const leadInst = new THREE.InstancedMesh(leadGeo, leadMat, COUNT);
  group.add(torsoInst, visorInst, legLInst, legRInst, leadInst);

  // Slippery Icy Blue Floor Patches scattered across the brutal arena!
  const iceMat = new THREE.MeshPhysicalMaterial({
    color: 0x7dd3fc,
    emissive: 0x0284c7,
    emissiveIntensity: 0.22,
    roughness: 0.08,
    metalness: 0.12,
    transparent: true,
    opacity: 0.72,
  });
  for (let i = 0; i < 18; i++) {
    const patch = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.008, 1.15), iceMat);
    const rx = ((i * 7) % 13) - 6;
    const rz = -1.4 - ((i * 5) % 12) * 1.1;
    patch.position.set(rx * 1.1, 0.004, rz);
    group.add(patch);
  }

  const dummy = new THREE.Object3D();
  function updateArmy(t) {
    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const bx = (c - (COLS - 1) / 2) * 1.25;
        const bz = -1.2 - r * 1.35;
        const phase = t * 3.5 + (r * 0.45 + c * 0.35);
        const sL = Math.sin(phase);
        const sR = Math.sin(phase + Math.PI);
        const hasLead = (r + c) % 2 === 0;
        const tilt = ((r * 3 + c) % 5 === 0) ? 0.16 * Math.sin(t * 2.4 + idx) : 0.04;

        dummy.position.set(bx, 0.50 + Math.abs(Math.cos(phase)) * 0.02, bz);
        dummy.rotation.set(0.06, 0, tilt);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        torsoInst.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(bx, 0.66, bz + 0.045);
        dummy.rotation.set(0, 0, tilt);
        dummy.updateMatrix();
        visorInst.setMatrixAt(idx, dummy.matrix);

        // 500g Lead Weight Strapped on Back!
        dummy.position.set(bx, 0.52, bz - 0.08);
        dummy.rotation.set(0, 0, tilt);
        dummy.scale.setScalar(hasLead ? 1.0 : 0.001);
        dummy.updateMatrix();
        leadInst.setMatrixAt(idx, dummy.matrix);

        dummy.scale.setScalar(1);
        dummy.position.set(bx - 0.06, 0.20, bz + sL * 0.08);
        dummy.rotation.set(sL * 0.42, 0, 0);
        dummy.updateMatrix();
        legLInst.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(bx + 0.06, 0.20, bz + sR * 0.08);
        dummy.rotation.set(sR * 0.42, 0, 0);
        dummy.updateMatrix();
        legRInst.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    torsoInst.instanceMatrix.needsUpdate = true;
    visorInst.instanceMatrix.needsUpdate = true;
    leadInst.instanceMatrix.needsUpdate = true;
    legLInst.instanceMatrix.needsUpdate = true;
    legRInst.instanceMatrix.needsUpdate = true;
  }
  updateArmy(0);

  return { group, updateArmy };
}

export function createYakinikuGrillRig(baseMats, pbr) {
  const group = new THREE.Group();

  // Warm Wooden Round Yakiniku Table
  const tableTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.68, 0.68, 0.042, 32),
    pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 2, tint: 0x7c4d2f })
  );
  tableTop.position.y = 0.72; tableTop.receiveShadow = true;
  const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.72, 16), baseMats.blackAnodized);
  tableLeg.position.y = 0.36;
  group.add(tableTop, tableLeg);

  // Sunken Charcoal Shichirin Grill w/ Glowing Orange Embers & Wire Mesh
  const grillRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.18, 0.018, 10, 28),
    baseMats.chromeSteel
  );
  grillRim.rotation.x = Math.PI / 2; grillRim.position.y = 0.752;
  const emberBed = new THREE.Mesh(
    new THREE.CylinderGeometry(0.165, 0.165, 0.014, 24),
    new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xea580c, emissiveIntensity: 2.2, roughness: 0.7 })
  );
  emberBed.position.y = 0.742;
  group.add(grillRim, emberBed);

  // Grill Grate Wires
  for (let i = -5; i <= 5; i++) {
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.0022, 0.33, 6), baseMats.chromeSteel);
    bar.rotation.z = Math.PI / 2;
    bar.position.set(0, 0.758, i * 0.028);
    group.add(bar);
  }

  // Sizzling Curled Thin Beef Tongue Slices (`網の上で丸まって焦げる薄い牛タン`)!
  const meatMat = new THREE.MeshStandardMaterial({ color: 0x8c3b2b, roughness: 0.48 });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3;
    const slice = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.005, 14), meatMat);
    slice.position.set(Math.cos(a) * 0.085, 0.764, Math.sin(a) * 0.085);
    slice.rotation.set(0.18, a, 0.12);
    group.add(slice);
  }

  // 4 Frosted Iced Oolong Tea Mugs (`氷の入った烏龍茶ジョッキ`) around the round table!
  const mugGlassMat = new THREE.MeshPhysicalMaterial({ color: 0x92400e, roughness: 0.15, transmission: 0.55, opacity: 0.88, transparent: true });
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI * 0.25;
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.034, 0.125, 16), mugGlassMat);
    mug.position.set(Math.cos(a) * 0.44, 0.805, Math.sin(a) * 0.44);
    const iceTop = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.012, 12), new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.2 }));
    iceTop.position.set(Math.cos(a) * 0.44, 0.862, Math.sin(a) * 0.44);
    group.add(mug, iceTop);
  }

  // Rising Translucent Yakiniku Smoke Puffs ("煙もうもうたる安焼肉屋")!
  const smokes = [];
  for (let i = 0; i < 12; i++) {
    const smMat = new THREE.MeshBasicMaterial({ color: 0xfef3c7, transparent: true, opacity: 0.14, depthWrite: false });
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.055 + (i % 3) * 0.025, 10, 8), smMat);
    group.add(puff);
    smokes.push({ mesh: puff, mat: smMat, idx: i });
  }

  function updateGrill(t) {
    emberBed.material.emissiveIntensity = 1.9 + Math.sin(t * 5.2) * 0.45;
    for (const s of smokes) {
      const c = (t * 0.35 + s.idx / 12) % 1.0;
      s.mesh.position.set(
        Math.sin(t * 1.4 + s.idx * 2.1) * (0.04 + c * 0.16),
        0.79 + c * 0.72,
        Math.cos(t * 1.1 + s.idx * 1.7) * (0.04 + c * 0.14)
      );
      s.mesh.scale.setScalar(0.7 + c * 2.1);
      s.mat.opacity = Math.sin(c * Math.PI) * 0.16;
    }
  }

  return { group, updateGrill };
}
