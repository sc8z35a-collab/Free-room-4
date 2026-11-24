import * as THREE from 'three';

function makeSoftSmokeTexture() {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
  g.addColorStop(0.0, 'rgba(248, 250, 255, 0.92)');
  g.addColorStop(0.35, 'rgba(232, 238, 246, 0.55)');
  g.addColorStop(0.7, 'rgba(210, 218, 230, 0.18)');
  g.addColorStop(1.0, 'rgba(200, 210, 225, 0.0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createRealVFX(scene) {
  const dummy = new THREE.Object3D();

  // ===========================================================================
  // 1. Drifting Somei-Yoshino Cherry Blossom Petals (Scene 2 Courtyard)
  // ===========================================================================
  const petalGeo = new THREE.SphereGeometry(0.014, 8, 6);
  petalGeo.scale(1.3, 0.18, 0.85);
  const petalMat = new THREE.MeshPhysicalMaterial({
    color: 0xffd6e4,
    roughness: 0.55,
    sheen: 0.4,
    side: THREE.DoubleSide,
  });
  const petalCount = 150;
  const sakuraPetals = new THREE.InstancedMesh(petalGeo, petalMat, petalCount);
  sakuraPetals.visible = false;
  scene.add(sakuraPetals);

  // ===========================================================================
  // 2. HMD-01 380mm 16-DOF Blueprint Hologram & Knee Torque Vector (Scenes 7 & 8)
  // ===========================================================================
  const hmdBlueprint = new THREE.Group();
  hmdBlueprint.position.set(0.02, 0.73, -0.44);
  hmdBlueprint.visible = false;
  scene.add(hmdBlueprint);

  const holoCyan = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.72,
  });
  const holoRingMat = new THREE.MeshBasicMaterial({
    color: 0x34d399,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  });
  const holoWarnMat = new THREE.MeshBasicMaterial({
    color: 0xf97316,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
  });

  // 380mm tall miniature HMD-01 CAD wireframe figure (1:1 physical scale = 0.38m!)
  const torsoWire = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.125, 0.058), holoCyan);
  torsoWire.position.y = 0.255;
  hmdBlueprint.add(torsoWire);

  const headWire = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 10), holoCyan);
  headWire.position.y = 0.348;
  hmdBlueprint.add(headWire);

  const dofRings = [];
  // 6 DOF per leg x 2 + 2 DOF per arm x 2 = 16 glowing joint axis rings!
  const legJointHeights = [0.19, 0.175, 0.16, 0.096, 0.034, 0.022]; // Yaw, Roll, Pitch, Knee, AnkP, AnkR
  for (const sx of [-0.042, 0.042]) {
    const thighW = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.093, 0.03), holoCyan);
    thighW.position.set(sx, 0.142, 0);
    hmdBlueprint.add(thighW);

    const shinW = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.093, 0.028), holoCyan);
    shinW.position.set(sx, 0.056, 0);
    hmdBlueprint.add(shinW);

    const footW = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.012, 0.088), holoCyan);
    footW.position.set(sx, 0.006, 0.012);
    hmdBlueprint.add(footW);

    legJointHeights.forEach((jy, idx) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.016, 0.0022, 8, 20), idx === 3 ? holoWarnMat : holoRingMat);
      ring.position.set(sx, jy, 0);
      if (idx === 0) ring.rotation.x = Math.PI / 2; // Hip Yaw
      else if (idx === 1 || idx === 5) ring.rotation.y = 0; // Roll axis (Z)
      else ring.rotation.y = Math.PI / 2; // Pitch axis (X)
      hmdBlueprint.add(ring);
      dofRings.push(ring);
    });
  }

  for (const sx of [-0.068, 0.068]) {
    const armW = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.01, 0.135, 10), holoCyan);
    armW.position.set(sx, 0.23, 0);
    hmdBlueprint.add(armW);
    for (const ay of [0.295, 0.275]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.015, 0.002, 8, 18), holoRingMat);
      ring.position.set(sx, ay, 0);
      hmdBlueprint.add(ring);
      dofRings.push(ring);
    }
  }

  // Knee 45° Torque Arc Indicator
  const torqueArc = new THREE.Mesh(new THREE.TorusGeometry(0.044, 0.0032, 8, 24, Math.PI * 1.15), holoWarnMat);
  torqueArc.rotation.y = Math.PI / 2;
  torqueArc.position.set(0.042, 0.096, 0);
  hmdBlueprint.add(torqueArc);

  // ===========================================================================
  // 3. Day 022 01:15 AM Short-Circuit Spark + Dense Vertical White Smoke Ribbon!
  //    ("線香よりも濃い一筋の白い煙が、スウッ、と真っ直ぐに立ち昇った")
  // ===========================================================================
  const smokeTex = makeSoftSmokeTexture();

  // 3A. Sharp Blue-White Electrical Pop Spark at 74HC126 & ESP32-S3
  const sparkGroup = new THREE.Group();
  sparkGroup.position.set(-0.008, 0.736, -0.46);
  sparkGroup.visible = false;
  scene.add(sparkGroup);

  const sparkCoreMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 1.0 });
  const sparkCore = new THREE.Mesh(new THREE.SphereGeometry(0.016, 12, 10), sparkCoreMat);
  sparkGroup.add(sparkCore);

  for (let s = 0; s < 10; s++) {
    const ray = new THREE.Mesh(new THREE.CylinderGeometry(0.0008, 0.0002, 0.055, 6), sparkCoreMat);
    ray.rotation.set((s * 1.3) % 3.1, (s * 2.1) % 3.1, (s * 0.9) % 3.1);
    sparkGroup.add(ray);
  }

  const sparkLight = new THREE.PointLight(0x93c5fd, 0, 2.5, 1.6);
  sparkLight.position.set(-0.008, 0.76, -0.46);
  scene.add(sparkLight);

  // 3B. Laminar Vertical White Smoke Ribbon Shader + Soft Billowing Puffs from ESP32-S3 USB Port!
  const smokeOrigin = new THREE.Vector3(-0.026, 0.737, -0.46);
  const ribbonMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uGrow: { value: 0 },
      uDisperse: { value: 0 },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uGrow;
      uniform float uDisperse;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        float h = uv.y * uGrow * 0.36;
        vec3 p = position;
        // Thin concentrated base widening gently as it rises and curls
        float width = mix(0.0045, 0.026 + uDisperse * 0.035, pow(uv.y, 1.35));
        p.x = (uv.x - 0.5) * width;
        p.y = h;
        // Laminar incense-like S-wave curl at upper section
        float curlAmp = pow(uv.y, 1.7) * (0.018 + uDisperse * 0.05);
        p.x += sin(uv.y * 7.5 - uTime * 3.2) * curlAmp;
        p.z += cos(uv.y * 6.2 - uTime * 2.6) * curlAmp * 0.75;
        // Exhaust fan pulls smoke slightly toward -X wall when disperse > 0
        p.x -= pow(uv.y, 1.4) * uDisperse * 0.14;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uGrow;
      uniform float uDisperse;
      varying vec2 vUv;
      void main() {
        float edge = sin(vUv.x * 3.14159265);
        float verticalFade = smoothstep(0.0, 0.08, vUv.y) * (1.0 - smoothstep(0.62, 1.0, vUv.y));
        float alpha = pow(edge, 1.4) * verticalFade * clamp(uGrow * 1.4, 0.0, 1.0) * (1.0 - uDisperse * 0.55) * 0.86;
        gl_FragColor = vec4(vec3(0.94, 0.96, 0.99), alpha);
      }
    `,
  });

  const smokeRibbonA = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 4, 40), ribbonMat);
  smokeRibbonA.position.copy(smokeOrigin);
  const smokeRibbonB = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 4, 40), ribbonMat);
  smokeRibbonB.position.copy(smokeOrigin);
  smokeRibbonB.rotation.y = Math.PI / 2;

  const whiteSmokeGroup = new THREE.Group();
  whiteSmokeGroup.visible = false;
  whiteSmokeGroup.add(smokeRibbonA, smokeRibbonB);

  // Soft Volumetric Puff Sprites rising along the top of the white smoke column
  const puffCount = 28;
  const smokePuffs = [];
  for (let i = 0; i < puffCount; i++) {
    const spMat = new THREE.SpriteMaterial({
      map: smokeTex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const sp = new THREE.Sprite(spMat);
    whiteSmokeGroup.add(sp);
    smokePuffs.push(sp);
  }
  scene.add(whiteSmokeGroup);

  // ===========================================================================
  // 4. Day 024 350°C Rosin Flux Solder Smoke Wisps (Scene 12 Perfboard)
  // ===========================================================================
  const solderOrigin = new THREE.Vector3(0.005, 0.738, -0.434);
  const solderWisps = new THREE.Group();
  solderWisps.visible = false;
  const fluxSprites = [];
  for (let i = 0; i < 14; i++) {
    const spMat = new THREE.SpriteMaterial({
      map: smokeTex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const sp = new THREE.Sprite(spMat);
    solderWisps.add(sp);
    fluxSprites.push(sp);
  }
  scene.add(solderWisps);

  function update(t, {
    sakuraActive = false,
    blueprintMode = 'off', // 'off' | 'dof16' | 'torque'
    sparkTime = -1,
    whiteSmokeActive = false,
    smokeElapsed = 0,
    fanActive = false,
    solderActive = false,
  } = {}) {
    // 1. Drifting Cherry Blossom Petals
    sakuraPetals.visible = sakuraActive;
    if (sakuraActive) {
      for (let i = 0; i < petalCount; i++) {
        const seed = i * 13.71;
        const fall = ((t * 0.42 + seed) % 3.6);
        const px = -3.2 + ((i * 0.47) % 6.8) - fall * 0.55 + Math.sin(t * 1.4 + seed) * 0.25;
        const py = 3.4 - fall * 0.92;
        const pz = -3.6 + ((i * 0.83) % 5.2) + Math.cos(t * 1.1 + seed) * 0.22;
        dummy.position.set(px, Math.max(0.01, py), pz);
        dummy.rotation.set(t * 2.1 + seed, t * 1.7 + seed, Math.sin(t * 3 + seed));
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        sakuraPetals.setMatrixAt(i, dummy.matrix);
      }
      sakuraPetals.instanceMatrix.needsUpdate = true;
    }

    // 2. 16-DOF Blueprint Hologram
    hmdBlueprint.visible = blueprintMode !== 'off';
    if (hmdBlueprint.visible) {
      hmdBlueprint.rotation.y = Math.sin(t * 0.65) * 0.35;
      torqueArc.visible = blueprintMode === 'torque';
      const pulse = 1.0 + Math.sin(t * 6.0) * 0.14;
      dofRings.forEach((r, idx) => {
        r.scale.setScalar(idx % 6 === 3 && blueprintMode === 'torque' ? pulse * 1.25 : 1.0);
      });
    }

    // 3. Electrical Short-Circuit Pop Spark ("パチンッ！！")
    const dtSpark = sparkTime >= 0 ? t - sparkTime : -1;
    if (dtSpark >= 0 && dtSpark < 0.28) {
      sparkGroup.visible = true;
      const intensity = Math.exp(-dtSpark * 16.0);
      sparkGroup.scale.setScalar(0.5 + dtSpark * 4.2);
      sparkGroup.rotation.y = dtSpark * 25.0;
      sparkLight.intensity = intensity * 14.0;
    } else {
      sparkGroup.visible = false;
      sparkLight.intensity = 0;
    }

    // 4. Dense Vertical White Smoke Ribbon from ESP32-S3 USB Connector
    whiteSmokeGroup.visible = whiteSmokeActive && smokeElapsed > 0;
    if (whiteSmokeGroup.visible) {
      const grow = Math.min(1.0, smokeElapsed / 2.2);
      const disperse = fanActive ? Math.min(1.0, Math.max(0, (smokeElapsed - 9.0) / 5.0)) : 0.0;
      ribbonMat.uniforms.uTime.value = t;
      ribbonMat.uniforms.uGrow.value = grow;
      ribbonMat.uniforms.uDisperse.value = disperse;

      for (let i = 0; i < puffCount; i++) {
        const sp = smokePuffs[i];
        const cycle = (smokeElapsed * 0.38 + i / puffCount) % 1.0;
        const h = cycle * 0.44 * grow;
        const fanDrift = fanActive ? Math.pow(cycle, 1.3) * 0.18 * disperse : 0;
        sp.position.set(
          smokeOrigin.x + Math.sin(t * 2.2 + i * 0.9) * 0.016 * cycle - fanDrift,
          smokeOrigin.y + 0.04 + h,
          smokeOrigin.z + Math.cos(t * 1.9 + i * 1.1) * 0.014 * cycle
        );
        const s = 0.018 + cycle * 0.075;
        sp.scale.set(s, s * 1.25, s);
        const fade = Math.sin(cycle * Math.PI) * Math.min(1, smokeElapsed * 0.8) * (1.0 - disperse * 0.55);
        sp.material.opacity = fade * 0.42;
      }
    }

    // 5. Delicate 350°C Rosin Flux Solder Wisps
    solderWisps.visible = solderActive;
    if (solderActive) {
      for (let i = 0; i < fluxSprites.length; i++) {
        const sp = fluxSprites[i];
        const cycle = (t * 0.55 + i / fluxSprites.length) % 1.0;
        sp.position.set(
          solderOrigin.x + Math.sin(t * 3.0 + i) * 0.012 * cycle,
          solderOrigin.y + cycle * 0.18,
          solderOrigin.z + Math.cos(t * 2.5 + i) * 0.010 * cycle
        );
        const s = 0.012 + cycle * 0.036;
        sp.scale.set(s, s, s);
        sp.material.opacity = Math.sin(cycle * Math.PI) * 0.28;
      }
    }
  }

  return { update, hmdBlueprint, whiteSmokeGroup };
}
