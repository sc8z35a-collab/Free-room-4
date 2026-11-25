import * as THREE from 'three';

/**
 * Chapter 15 Ultra-Quality Hero Props & Physical Rigs (`第15章：仮想空間の四千人の分身`):
 * 1. 16kg Used Black Full-Tower Workstation (`RTX 3090 24GB` triple-fan GPU, red HDD LED, 350W heat waves + Folding Carry Cart)
 * 2. Physical System Identification Rig: 0.1g Precision Digital Scale (`482.6 g`), Triangular Knife-Edge Ruler CoM Seesaw,
 *    and Twin Piano-Wire Bifilar Torsional Pendulum (`二本吊り振り子`) + Stopwatch (`1.428 s`)
 * 3. High-Performance 400-Instance 3D `Isaac Lab` Clone Army Field (representing 64×64 = 4,096 parallel HMD-02 clones!)
 * 4. Glowing 3D Red 5.0kgf Lateral Impulse Arrow & Impact Ripple Ring
 */

export function createWorkstationRtx3090Rig(baseMats) {
  const group = new THREE.Group();

  // Heavy Scuffed Jet-Black Full-Tower Chassis (16kg, 0.24m W x 0.52m H x 0.48m D)
  const caseMat = new THREE.MeshStandardMaterial({ color: 0x111318, metalness: 0.62, roughness: 0.48 });
  const meshMat = new THREE.MeshStandardMaterial({ color: 0x1e222a, metalness: 0.55, roughness: 0.62 });

  const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.52, 0.48), caseMat);
  chassis.position.y = 0.26;
  chassis.castShadow = true;
  chassis.receiveShadow = true;
  group.add(chassis);

  // Front perforated airflow grille + Red Blinking HDD Access LED ("赤いアクセスランプ")!
  const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.44, 0.012), meshMat);
  frontMesh.position.set(0, 0.26, 0.242);
  const hddLedMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 3.5 });
  const hddLed = new THREE.Mesh(new THREE.SphereGeometry(0.006, 8, 6), hddLedMat);
  hddLed.position.set(0.07, 0.46, 0.248);
  const pwrLed = new THREE.Mesh(
    new THREE.SphereGeometry(0.006, 8, 6),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 2.8 })
  );
  pwrLed.position.set(0.045, 0.46, 0.248);
  group.add(frontMesh, hddLed, pwrLed);

  // Side Tempered Window Revealing the Massive Triple-Fan Used `RTX 3090 24GB` GPU!
  const innerBay = new THREE.Mesh(
    new THREE.PlaneGeometry(0.38, 0.40),
    new THREE.MeshStandardMaterial({ color: 0x090c12, roughness: 0.8 })
  );
  innerBay.rotation.y = Math.PI / 2;
  innerBay.position.set(0.121, 0.26, 0.0);
  group.add(innerBay);

  const gpuShroud = new THREE.Mesh(
    new THREE.BoxGeometry(0.045, 0.068, 0.31),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.82, roughness: 0.28 })
  );
  gpuShroud.position.set(0.105, 0.22, -0.02);
  const gpuGlowBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.006, 0.010, 0.24),
    new THREE.MeshBasicMaterial({ color: 0x4ade80 }) // Classic GeForce RTX emerald glow!
  );
  gpuGlowBar.position.set(0.126, 0.248, -0.02);
  group.add(gpuShroud, gpuGlowBar);

  // 3 Spinning Cooling Fans clearly visible along the RTX 3090 shroud!
  const fans = [];
  for (let i = 0; i < 3; i++) {
    const fPivot = new THREE.Group();
    fPivot.position.set(0.130, 0.214, -0.115 + i * 0.095);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.034, 0.0038, 8, 20),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 })
    );
    ring.rotation.y = Math.PI / 2;
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.009, 0.009, 0.006, 12),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.6, metalness: 0.7 })
    );
    hub.rotation.z = Math.PI / 2;
    for (let b = 0; b < 5; b++) {
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(0.004, 0.056, 0.011),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.55, roughness: 0.35 })
      );
      blade.rotation.x = (b / 5) * Math.PI;
      fPivot.add(blade);
    }
    fPivot.add(ring, hub);
    group.add(fPivot);
    fans.push(fPivot);
  }

  // Shimmering Warm 350W Exhaust Heat Waves Rising from Rear/Top!
  const heatWaves = [];
  for (let i = 0; i < 6; i++) {
    const hm = new THREE.MeshBasicMaterial({ color: 0xfb923c, transparent: true, opacity: 0.0, depthWrite: false });
    const hw = new THREE.Mesh(new THREE.RingGeometry(0.04, 0.055, 20), hm);
    hw.rotation.x = -Math.PI / 2;
    group.add(hw);
    heatWaves.push({ mesh: hw, mat: hm, idx: i });
  }

  // Optional Folding Carry Cart & Elastic Bungee Straps ("折りたたみキャリーカート＆ゴムロープ")
  const cartGroup = new THREE.Group();
  const cartPlate = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.014, 0.34), baseMats.aluminumBrushed);
  cartPlate.position.set(0, -0.008, 0.04);
  const cartHandleL = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.92, 10), baseMats.chromeSteel);
  cartHandleL.position.set(-0.12, 0.45, -0.25);
  const cartHandleR = cartHandleL.clone(); cartHandleR.position.x = 0.12;
  const cartTopBar = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.28, 10), baseMats.blackAnodized);
  cartTopBar.rotation.z = Math.PI / 2; cartTopBar.position.set(0, 0.91, -0.25);
  for (const wx of [-0.15, 0.15]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.024, 18), baseMats.blackAnodized);
    wheel.rotation.z = Math.PI / 2; wheel.position.set(wx, -0.02, -0.20);
    cartGroup.add(wheel);
  }
  // Elastic Red/Black Bungee Cords binding the 16kg tower tightly!
  const strapMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.6 });
  for (const sy of [0.16, 0.36]) {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.016, 0.50), strapMat);
    strap.position.set(0, sy, 0);
    cartGroup.add(strap);
  }
  cartGroup.add(cartPlate, cartHandleL, cartHandleR, cartTopBar);
  cartGroup.visible = false;
  group.add(cartGroup);

  function update(t, heatActive = true) {
    for (const f of fans) f.rotation.x = t * 26.0;
    hddLedMat.emissiveIntensity = 1.2 + Math.abs(Math.sin(t * 17.0)) * 4.0;
    for (const h of heatWaves) {
      if (!heatActive) { h.mat.opacity = 0; continue; }
      const c = (t * 0.8 + h.idx / 6) % 1.0;
      h.mesh.position.set(0, 0.53 + c * 0.24, -0.04 + Math.sin(t * 2 + h.idx) * 0.02);
      h.mesh.scale.setScalar(0.8 + c * 1.4);
      h.mat.opacity = Math.sin(c * Math.PI) * 0.24;
    }
  }

  return { group, cartGroup, update };
}

export function createSysIdMeasurementRig(baseMats, carbonMat) {
  const group = new THREE.Group();

  // 1. 0.1g Precision Digital Scale ("0.1グラム単位で測れる精密はかり") on Left!
  const scaleGroup = new THREE.Group();
  scaleGroup.position.set(-0.24, 0.0, 0.02);
  const scaleBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.024, 0.22),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.35 })
  );
  scaleBase.position.y = 0.012;
  const scalePan = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.008, 0.145), baseMats.aluminumBrushed);
  scalePan.position.set(0, 0.028, -0.024);
  const lcdC = document.createElement('canvas');
  lcdC.width = 256; lcdC.height = 80;
  const lx = lcdC.getContext('2d');
  lx.fillStyle = '#0f291e'; lx.fillRect(0, 0, 256, 80);
  lx.fillStyle = '#4ade80'; lx.font = '900 50px monospace'; lx.fillText('482.6 g', 18, 56);
  const lcdTex = new THREE.CanvasTexture(lcdC); lcdTex.colorSpace = THREE.SRGBColorSpace;
  const scaleLcd = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.032), new THREE.MeshBasicMaterial({ map: lcdTex }));
  scaleLcd.rotation.x = -Math.PI / 2;
  scaleLcd.position.set(0, 0.025, 0.078);
  // Disassembled carbon thigh + circular muscle sitting on the scale pan!
  const weighedPart = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.034, 0.13), carbonMat);
  weighedPart.position.set(0, 0.050, -0.024);
  const weighedMotor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.034, 0.034, 0.022, 24),
    new THREE.MeshStandardMaterial({ color: 0x14171d, metalness: 0.85, roughness: 0.24 })
  );
  weighedMotor.position.set(0, 0.078, -0.05);
  scaleGroup.add(scaleBase, scalePan, scaleLcd, weighedPart, weighedMotor);
  group.add(scaleGroup);

  // 2. Triangular Aluminum Ruler Knife-Edge CoM Seesaw ("三角柱のアルミ定規の刃の上で水平に釣り合う重心測定")!
  const seesawGroup = new THREE.Group();
  seesawGroup.position.set(0.16, 0.0, 0.04);
  const triRuler = new THREE.Mesh(
    new THREE.CylinderGeometry(0.016, 0.016, 0.16, 3),
    baseMats.aluminumBrushed
  );
  triRuler.rotation.x = Math.PI / 2;
  triRuler.rotation.z = Math.PI; // sharp knife-edge pointing straight UP!
  triRuler.position.y = 0.012;

  const balancePivot = new THREE.Group();
  balancePivot.position.set(0, 0.032, 0);
  const balancedLeg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.014, 0.046), carbonMat);
  const legJointEnd = new THREE.Mesh(
    new THREE.CylinderGeometry(0.032, 0.032, 0.022, 24),
    new THREE.MeshStandardMaterial({ color: 0x14171d, metalness: 0.85, roughness: 0.25 })
  );
  legJointEnd.position.set(-0.088, 0.012, 0);
  // Crisp cyan laser/scribed CoM indicator line right at the fulcrum!
  const comMark = new THREE.Mesh(
    new THREE.BoxGeometry(0.004, 0.018, 0.052),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
  );
  balancePivot.add(balancedLeg, legJointEnd, comMark);
  seesawGroup.add(triRuler, balancePivot);
  group.add(seesawGroup);

  // 3. Twin Piano-Wire Bifilar Torsional Pendulum ("二本吊り振り子による本物の慣性モーメント測定")!
  const bifilarGroup = new THREE.Group();
  bifilarGroup.position.set(0.0, 0.0, 0.0);
  const wireMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 });
  const wireL = new THREE.Mesh(new THREE.CylinderGeometry(0.0014, 0.0014, 0.92, 6), wireMat);
  wireL.position.set(-0.09, 0.46, 0);
  const wireR = wireL.clone(); wireR.position.x = 0.09;

  const pendPivot = new THREE.Group();
  pendPivot.position.set(0, 0.0, 0);
  const pendBar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.024, 0.052), carbonMat);
  const pendMotor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.036, 0.036, 0.026, 26),
    new THREE.MeshStandardMaterial({ color: 0x14171d, metalness: 0.85, roughness: 0.24 })
  );
  pendMotor.position.set(-0.085, 0.016, 0);
  const pendCop = new THREE.Mesh(
    new THREE.TorusGeometry(0.026, 0.0045, 8, 22),
    new THREE.MeshStandardMaterial({ color: 0xd96b27, metalness: 0.9, roughness: 0.24 })
  );
  pendCop.rotation.x = Math.PI / 2; pendCop.position.set(-0.085, 0.028, 0);
  // Glowing cyan rotational inertia arc showing torsional period measurement!
  const arcMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65, side: THREE.DoubleSide });
  const inertiaArc = new THREE.Mesh(new THREE.RingGeometry(0.145, 0.154, 32, 1, -0.8, 1.6), arcMat);
  inertiaArc.rotation.x = -Math.PI / 2;
  pendPivot.add(wireL, wireR, pendBar, pendMotor, pendCop, inertiaArc);
  bifilarGroup.add(pendPivot);

  function animateSeesaw(t) {
    // Settles gently into dead-level horizontal equilibrium!
    balancePivot.rotation.z = Math.sin(t * 2.6) * 0.045;
  }

  function animateBifilar(t) {
    // Smooth harmonic torsional oscillation around Y axis ("軽く左右にひねって揺らす")!
    pendPivot.rotation.y = Math.sin(t * 2.8) * 0.58;
  }

  return { group, bifilarGroup, animateSeesaw, animateBifilar };
}

export function createVirtualCloneArmyRig(baseMats) {
  const group = new THREE.Group();

  // 20 x 20 = 400 Instanced 3D HMD-02 Clones stretching across the endless Isaac Lab grid!
  // (Each clone composed of instanced Torso+Head + Left Leg + Right Leg for super-expressive real-time motion!)
  const GRID = 20;
  const COUNT = GRID * GRID;

  const torsoMat = new THREE.MeshStandardMaterial({ color: 0x151922, metalness: 0.82, roughness: 0.28 });
  const legMat = new THREE.MeshStandardMaterial({ color: 0x1f2633, metalness: 0.72, roughness: 0.34 });
  const visorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

  const torsoInst = new THREE.InstancedMesh(new THREE.BoxGeometry(0.16, 0.24, 0.10), torsoMat, COUNT);
  const legLInst = new THREE.InstancedMesh(new THREE.BoxGeometry(0.045, 0.36, 0.055), legMat, COUNT);
  const legRInst = new THREE.InstancedMesh(new THREE.BoxGeometry(0.045, 0.36, 0.055), legMat, COUNT);
  const visorInst = new THREE.InstancedMesh(new THREE.BoxGeometry(0.085, 0.022, 0.022), visorMat, COUNT);

  group.add(torsoInst, legLInst, legRInst, visorInst);

  const _d = new THREE.Object3D();

  /**
   * @param {number} t
   * @param {'collapse'|'crab_hop'|'splayed_shuffle'|'human_stride'} mode
   */
  function updateArmy(t, mode) {
    let idx = 0;
    for (let gz = 0; gz < GRID; gz++) {
      for (let gx = 0; gx < GRID; gx++) {
        // Leave clean hero runway space right at (0, 0) for our full-detail Hero HMD-02!
        const baseX = (gx - GRID / 2 + 0.5) * 1.45;
        const baseZ = -gz * 1.55 - 1.4;
        const seed = gx * 1.37 + gz * 2.91;

        let px = baseX;
        let py = 0.52;
        let pz = baseZ;
        let rx = 0, ry = 0, rz = 0;
        let lRx = 0, rRx = 0, lRz = 0, rRz = 0;

        if (mode === 'collapse') {
          // Rapid domino collapse & reset cycle!
          const cyc = ((t * 1.35 + (seed % 1.0)) % 1.0);
          const fall = Math.min(1, cyc * 2.2);
          py = 0.52 - fall * 0.42;
          rx = fall * 1.42 * Math.sin(seed);
          rz = fall * 1.38 * Math.cos(seed);
          lRx = -fall * 0.8;
          rRx = fall * 0.9;
        } else if (mode === 'crab_hop') {
          // Hilarious Reward Hack #1: Sideways crab torso + furious ONE-LEG HOPPING!
          const hop = Math.abs(Math.sin(t * 9.5 + seed));
          py = 0.50 + hop * 0.16;
          pz = baseZ + ((t * 1.4) % 4.0);
          ry = 0.72;
          rz = 0.28;
          lRx = -0.75; lRz = -0.35; // dragged stiff left leg!
          rRx = -0.35 + hop * 0.55;
        } else if (mode === 'splayed_shuffle') {
          // Hilarious Reward Hack #2: Leaning impossibly backward + splayed hyper-fast shuffle!
          const sh = Math.sin(t * 22.0 + seed);
          py = 0.45;
          pz = baseZ + ((t * 0.9) % 3.0);
          rx = -0.46; // leaning way back!
          lRz = -0.32; rRz = 0.32; // wide splayed crab knees!
          lRx = sh * 0.22; rRx = -sh * 0.22;
        } else {
          // HUMAN-LIKE SYNCHRONIZED STRIDE ("一糸乱れぬ群舞のように悠然と歩いていた")!
          const ph = t * 4.2 + (seed % 0.45);
          const stride = Math.sin(ph);
          py = 0.52 + Math.abs(Math.cos(ph)) * 0.025;
          pz = baseZ + ((t * 0.85) % 3.2);
          rx = 0.04;
          lRx = stride * 0.42;
          rRx = -stride * 0.42;
        }

        // Torso
        _d.position.set(px, py, pz);
        _d.rotation.set(rx, ry, rz);
        _d.scale.set(1, 1, 1);
        _d.updateMatrix();
        torsoInst.setMatrixAt(idx, _d.matrix);

        // Glowing Sky-Blue Visor
        _d.position.set(px, py + 0.16, pz + 0.045);
        _d.rotation.set(rx, ry, rz);
        _d.updateMatrix();
        visorInst.setMatrixAt(idx, _d.matrix);

        // Left & Right Legs
        _d.position.set(px - 0.075, py - 0.28, pz);
        _d.rotation.set(lRx, ry, lRz);
        _d.updateMatrix();
        legLInst.setMatrixAt(idx, _d.matrix);

        _d.position.set(px + 0.075, py - 0.28, pz);
        _d.rotation.set(rRx, ry, rRz);
        _d.updateMatrix();
        legRInst.setMatrixAt(idx, _d.matrix);

        idx++;
      }
    }
    torsoInst.instanceMatrix.needsUpdate = true;
    visorInst.instanceMatrix.needsUpdate = true;
    legLInst.instanceMatrix.needsUpdate = true;
    legRInst.instanceMatrix.needsUpdate = true;
  }

  return { group, updateArmy };
}

export function createImpulseArrow3D() {
  const group = new THREE.Group();
  const arrowMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.34, 14), arrowMat);
  shaft.rotation.z = Math.PI / 2;
  shaft.position.x = 0.23;
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.052, 0.12, 16), arrowMat);
  head.rotation.z = Math.PI / 2;
  head.position.x = 0.04;

  const rippleMat = new THREE.MeshBasicMaterial({
    color: 0xf87171,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
  });
  const ripple = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.075, 28), rippleMat);
  ripple.rotation.y = Math.PI / 2;
  ripple.position.x = -0.02;

  group.add(shaft, head, ripple);
  group.visible = false;

  return { group, ripple, rippleMat };
}
