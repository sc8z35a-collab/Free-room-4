import * as THREE from 'three';

function makeWireTube(points, radius, mat, segs = 16) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segs, radius, 8, false), mat);
  mesh.castShadow = true;
  return mesh;
}

/**
 * Builds the Museum-Grade Custom 2-Layer PCB `HMD-CORE-v1` (55.0mm x 50.0mm x 1.6mm)
 * with Progressive SMD Assembly, Hand-Mounded Lead-Free Solder Busbar,
 * and 02:00 AM Craft-Knife + X-Crossed AWG30 Fluoropolymer + UV Solder-Mask Micro-Surgery!
 */
export function createHMDCorePCBRig(baseMats, ngMats, scale = 1.0) {
  const root = new THREE.Group();
  root.scale.setScalar(scale);

  // 6-Face Multi-Material Box: Top/Bottom = 1024x1024 JLCPCB Emerald + Gold ENIG, Sides = Tan FR-4 Fiberglass!
  const boardGeo = new THREE.BoxGeometry(0.055, 0.0016, 0.050);
  const boardMats = [
    ngMats.fr4EdgeMat,
    ngMats.fr4EdgeMat,
    ngMats.hmdCorePcbTopMat,
    ngMats.hmdCorePcbTopMat,
    ngMats.fr4EdgeMat,
    ngMats.fr4EdgeMat,
  ];
  const pcbMesh = new THREE.Mesh(boardGeo, boardMats);
  pcbMesh.castShadow = true;
  pcbMesh.receiveShadow = true;
  root.add(pcbMesh);

  // Brass M3 Standoffs at the 4 corners
  const standGeo = new THREE.CylinderGeometry(0.0018, 0.0018, 0.008, 12);
  for (const [sx, sz] of [[-0.0238, -0.0215], [0.0238, -0.0215], [-0.0238, 0.0215], [0.0238, 0.0215]]) {
    const st = new THREE.Mesh(standGeo, baseMats.brass);
    st.position.set(sx, -0.004, sz);
    root.add(st);
  }

  // ===========================================================================
  // STAGE 1: Power Supply & Protection Stage (0805 Passives, 4mΩ MOSFET, DCDC, LDO, Piezo, Solder Busbar)
  // ===========================================================================
  const powerStage = new THREE.Group();
  root.add(powerStage);

  // 18x Miniature 0805 SMD Chip Resistors & Tan Ceramic Capacitors with Silver End Caps!
  const capTanMat = new THREE.MeshStandardMaterial({ color: 0xb4844e, roughness: 0.35 });
  const smdPositions = [
    [-0.018, -0.005], [-0.014, -0.005], [-0.010, -0.005], [-0.006, -0.005],
    [0.008, -0.006], [0.012, -0.006], [0.016, -0.006], [0.020, -0.006],
    [-0.018, 0.008], [-0.013, 0.008], [0.012, 0.008], [0.017, 0.008],
    [0.015, -0.016], [0.019, -0.016], [0.015, -0.012], [0.019, -0.012],
  ];
  smdPositions.forEach(([px, pz], idx) => {
    const smd = new THREE.Group();
    smd.position.set(px, 0.0012, pz);
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.0020, 0.0008, 0.0012),
      idx % 2 === 0 ? baseMats.icPackage : capTanMat
    );
    const capL = new THREE.Mesh(new THREE.BoxGeometry(0.0004, 0.00085, 0.00125), ngMats.solderBusbarMat);
    capL.position.x = -0.0009;
    const capR = capL.clone();
    capR.position.x = 0.0009;
    smd.add(body, capL, capR);
    powerStage.add(smd);
  });

  // Q1: 4 mΩ Ideal-Diode Reverse-Polarity Protection P-Channel MOSFET (DFN-8)
  const mosfet = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.0012, 0.005), baseMats.icPackage);
  mosfet.position.set(-0.008, 0.0014, -0.004);
  mosfet.castShadow = true;
  powerStage.add(mosfet);

  // Shielded 4R7 SMD Power Inductor + 5V Buck IC + 3.3V Low-Noise SOT-223 LDO
  const inductor = new THREE.Mesh(new THREE.BoxGeometry(0.0065, 0.003, 0.0065), baseMats.darkAnodized);
  inductor.position.set(0.004, 0.0023, -0.012);
  inductor.castShadow = true;
  powerStage.add(inductor);

  const ldo3v3 = new THREE.Mesh(new THREE.BoxGeometry(0.0062, 0.0016, 0.0035), baseMats.icPackage);
  ldo3v3.position.set(0.014, 0.0016, -0.006);
  powerStage.add(ldo3v3);

  // Cylindrical 10.2V LiPo Low-Voltage Piezo Alarm Buzzer (BZ1)
  const buzzer = new THREE.Group();
  buzzer.position.set(0.019, 0.0035, -0.016);
  const bzCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.0045, 0.0045, 0.0055, 22), baseMats.icPackage);
  bzCyl.castShadow = true;
  const bzHole = new THREE.Mesh(new THREE.CylinderGeometry(0.0012, 0.0012, 0.0058, 14), baseMats.rubberBlack);
  buzzer.add(bzCyl, bzHole);
  powerStage.add(buzzer);

  // PCB-Mount Yellow XT60 Battery Input Header on Left Edge
  const xt60 = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.0075, 0.015), baseMats.xt60Yellow);
  xt60.position.set(-0.023, 0.0045, 0.0);
  xt60.castShadow = true;
  powerStage.add(xt60);

  // Glowing Emerald Green 3.3V Power LED
  const pwrLedMat = new THREE.MeshBasicMaterial({ color: 0x166534 });
  const pwrLed = new THREE.Mesh(new THREE.BoxGeometry(0.0018, 0.001, 0.0012), pwrLedMat);
  pwrLed.position.set(0.022, 0.0013, -0.006);
  powerStage.add(pwrLed);

  // HAND-MOUNDED LEAD-FREE SOLDER BUSBAR ("蒲鉾状に盛り上げた銀色のはんだ母線") along central 8.8mm zone!
  const solderBusbar = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.0026, 0.036, 10, 24),
    ngMats.solderBusbarMat
  );
  solderBusbar.rotation.z = Math.PI / 2;
  solderBusbar.scale.set(1.0, 1.0, 0.48); // Smooth convex kamaboko dome!
  solderBusbar.position.set(0.002, 0.0012, 0.0);
  solderBusbar.castShadow = true;
  powerStage.add(solderBusbar);

  // ===========================================================================
  // STAGE 2: Logic, IMU & 4-Way Star Connector Stage (ESP32-S3, BNO085, 74HC126, 4x 5264-3P)
  // ===========================================================================
  const logicStage = new THREE.Group();
  root.add(logicStage);

  // ESP32-S3 Module with Brushed Chrome RF Shield
  const espPcb = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.0012, 0.024), baseMats.pcbEsp);
  espPcb.position.set(-0.012, 0.0016, -0.012);
  const espShield = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.0028, 0.016), baseMats.chromeSteel);
  espShield.position.set(-0.012, 0.0032, -0.010);
  espShield.castShadow = true;
  logicStage.add(espPcb, espShield);

  // BNO085 9-Axis IMU Breakout mounted at exact Board Center-of-Mass!
  const imuBoard = new THREE.Mesh(
    new THREE.BoxGeometry(0.011, 0.0012, 0.009),
    new THREE.MeshPhysicalMaterial({ color: 0x312e81, roughness: 0.3, clearcoat: 0.6 })
  );
  imuBoard.position.set(0.001, 0.0016, 0.009);
  const imuChip = new THREE.Mesh(new THREE.BoxGeometry(0.0042, 0.0011, 0.0038), baseMats.icPackage);
  imuChip.position.set(0.001, 0.0026, 0.009);
  logicStage.add(imuBoard, imuChip);

  // 74HC126 SOIC-14 Half-Duplex Buffer IC
  const hc126 = new THREE.Mesh(new THREE.BoxGeometry(0.0085, 0.0015, 0.0042), baseMats.icPackage);
  hc126.position.set(-0.014, 0.0016, 0.009);
  logicStage.add(hc126);

  // 4x White 5264-3P 3-Pin Wafer Connectors (PORT 1: R_LEG, PORT 2: L_LEG, PORT 3: R_ARM, PORT 4: L_ARM)
  const portXs = [-0.0175, -0.0060, 0.0060, 0.0175];
  for (const px of portXs) {
    const wafer = new THREE.Group();
    wafer.position.set(px, 0.0032, 0.0205);
    const housing = new THREE.Mesh(new THREE.BoxGeometry(0.0076, 0.0048, 0.0042), baseMats.servoHornWhite);
    housing.castShadow = true;
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(0.0076, 0.0068, 0.0010), baseMats.servoHornWhite);
    backWall.position.set(0, 0.001, -0.0018);
    wafer.add(housing, backWall);
    for (const pinDx of [-0.0025, 0, 0.0025]) {
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.00035, 0.00035, 0.0055, 8), ngMats.goldEnigMat);
      pin.position.set(pinDx, 0.0008, 0.0004);
      wafer.add(pin);
    }
    logicStage.add(wafer);
  }

  // ===========================================================================
  // STAGE 3: 02:00 AM Micro-Surgery (Sliced 0.3mm Trace Kerfs + X-Crossed AWG30 Jumpers + UV Mask Drops!)
  // ===========================================================================
  const surgeryStage = new THREE.Group();
  const kerfGroup = new THREE.Group();
  const jumperGroup = new THREE.Group();
  const uvDropsGroup = new THREE.Group();
  surgeryStage.add(kerfGroup, jumperGroup, uvDropsGroup);
  root.add(surgeryStage);

  const wireTeflonRed = new THREE.MeshPhysicalMaterial({ color: 0xf43f5e, roughness: 0.24, clearcoat: 0.65 });
  const wireTeflonCyan = new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, roughness: 0.24, clearcoat: 0.65 });
  const kerfDarkMat = new THREE.MeshStandardMaterial({ color: 0x3f2e1e, roughness: 0.85 });

  for (const px of portXs) {
    // 2 Sliced Copper Trace Kerfs right behind Pin 1 & Pin 3 (dark FR-4 trench + exposed bright copper edges!)
    for (const dx of [-0.0025, 0.0025]) {
      const kerf = new THREE.Mesh(new THREE.BoxGeometry(0.0016, 0.00045, 0.00085), kerfDarkMat);
      kerf.position.set(px + dx, 0.00092, 0.0152);
      const cuEdge = new THREE.Mesh(new THREE.BoxGeometry(0.0015, 0.00048, 0.00025), ngMats.goldEnigMat);
      cuEdge.position.set(px + dx, 0.00095, 0.0146);
      kerfGroup.add(kerf, cuEdge);
    }

    // X-Crossed 0.25mm AWG30 Fluoropolymer Jumper Wires swapping Pin 1 (GND) <-> Pin 3 (DATA)!
    jumperGroup.add(
      makeWireTube(
        [[px - 0.0026, 0.0011, 0.0126], [px, 0.0021, 0.0152], [px + 0.0026, 0.0011, 0.0178]],
        0.00038,
        wireTeflonRed,
        14
      ),
      makeWireTube(
        [[px + 0.0026, 0.0011, 0.0126], [px, 0.0028, 0.0152], [px - 0.0026, 0.0011, 0.0178]],
        0.00038,
        wireTeflonCyan,
        14
      )
    );

    // Glistening Emerald-Green UV-Curable Solder-Mask Resin Droplet ("UV硬化レジストの小さな緑の盛り上がり")
    const drop = new THREE.Mesh(new THREE.SphereGeometry(0.0030, 18, 12), ngMats.uvMaskResinMat);
    drop.scale.set(1.18, 0.38, 1.08);
    drop.position.set(px, 0.0014, 0.0152);
    uvDropsGroup.add(drop);
  }

  function setAssemblyState({
    stage = 'bare', // 'bare' | 'power' | 'full_bug' | 'knife_cut' | 'x_jumper' | 'uv_cured'
    busbarProgress = 1.0,
    ledOn = false,
    uvGlow = 0.0,
  } = {}) {
    powerStage.visible = stage !== 'bare';
    solderBusbar.visible = busbarProgress > 0.02;
    solderBusbar.scale.set(Math.max(0.02, busbarProgress), 1.0, 0.48);

    logicStage.visible =
      stage === 'full_bug' || stage === 'knife_cut' || stage === 'x_jumper' || stage === 'uv_cured';

    kerfGroup.visible = stage === 'knife_cut' || stage === 'x_jumper' || stage === 'uv_cured';
    jumperGroup.visible = stage === 'x_jumper' || stage === 'uv_cured';
    uvDropsGroup.visible = stage === 'uv_cured';

    pwrLedMat.color.setHex(ledOn ? 0x4ade80 : 0x14532d);
    ngMats.uvMaskResinMat.emissiveIntensity = 0.22 + uvGlow * 2.2;
  }

  return {
    root,
    setAssemblyState,
  };
}

/**
 * Builds Chapter 5 Precision Unboxing, Micro-Surgery Tools & 3S LiPo Battery Equipment:
 * - Yellow DHL Courier Pouch + Blue JLCPCB Box + 4 Extra Fanned Bare `HMD-CORE-v1` PCBs
 * - OLFA Yellow/Black Precision Art Knife (30° Surgical Blade)
 * - Stainless ESD Fine-Point Tweezers
 * - 395nm Purple UV LED Penlight + Volumetric Beam Cone + SpotLight
 * - 3S 1300mAh 45C LiPo Battery Pack (11.1V/12.6V, 112g)
 */
export function createCh05ToolsAndPackaging(baseMats, ngMats) {
  // 1. JLCPCB Blue Box + Yellow Courier Bag + 4 Extra Bare Emerald PCBs (5-Pack Unboxing!)
  const unboxGroup = new THREE.Group();

  const yellowBag = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.008, 0.14),
    new THREE.MeshPhysicalMaterial({ color: 0xfacc15, roughness: 0.35, clearcoat: 0.4 })
  );
  yellowBag.position.set(-0.11, 0.004, -0.03);
  yellowBag.rotation.y = 0.22;
  yellowBag.receiveShadow = true;
  unboxGroup.add(yellowBag);

  const jlcBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.095, 0.028, 0.082),
    new THREE.MeshPhysicalMaterial({ color: 0x1d4ed8, roughness: 0.42, clearcoat: 0.25 })
  );
  jlcBox.position.set(-0.085, 0.018, -0.04);
  jlcBox.rotation.y = 0.14;
  jlcBox.castShadow = true;
  unboxGroup.add(jlcBox);

  // 4 Fanned Spare Emerald Bare PCBs ("5枚セットで届いた鮮やかな緑色のプリント基板")
  for (let i = 0; i < 4; i++) {
    const spare = createHMDCorePCBRig(baseMats, ngMats, 1.35);
    spare.setAssemblyState({ stage: 'bare', busbarProgress: 0 });
    spare.root.position.set(0.03 + i * 0.022, 0.003 + i * 0.0032, 0.02 - i * 0.012);
    spare.root.rotation.set(0.04 * i, -0.18 + i * 0.11, -0.03 * i);
    unboxGroup.add(spare.root);
  }

  // 2. OLFA Yellow/Black Precision Craft Knife (デザインナイフ)
  const craftKnife = new THREE.Group();
  const knifeHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0045, 0.0052, 0.125, 18),
    new THREE.MeshPhysicalMaterial({ color: 0xfacc15, roughness: 0.32, clearcoat: 0.35 })
  );
  knifeHandle.rotation.x = Math.PI / 2;
  knifeHandle.position.z = 0.075;
  knifeHandle.castShadow = true;
  craftKnife.add(knifeHandle);

  const knifeGrip = new THREE.Mesh(new THREE.CylinderGeometry(0.0054, 0.0050, 0.032, 18), baseMats.rubberBlack);
  knifeGrip.rotation.x = Math.PI / 2;
  knifeGrip.position.z = 0.028;
  craftKnife.add(knifeGrip);

  const knifeCollet = new THREE.Mesh(new THREE.CylinderGeometry(0.0032, 0.0044, 0.016, 16), baseMats.brass);
  knifeCollet.rotation.x = Math.PI / 2;
  knifeCollet.position.z = 0.008;
  craftKnife.add(knifeCollet);

  // Razor-sharp 30° surgical steel blade tip at local (0, 0, -0.012)!
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, 0);
  bladeShape.lineTo(0.014, 0.0045);
  bladeShape.lineTo(0.014, 0.0005);
  bladeShape.closePath();
  const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, { depth: 0.0004, bevelEnabled: false });
  const bladeMesh = new THREE.Mesh(bladeGeo, baseMats.chromeSteel);
  bladeMesh.rotation.y = Math.PI / 2;
  bladeMesh.position.set(-0.0002, -0.001, -0.012);
  craftKnife.add(bladeMesh);

  // 3. 395nm Purple UV LED Curing Penlight + Volumetric Beam Cone!
  const uvTorch = new THREE.Group();
  const torchBody = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.11, 20), baseMats.darkAnodized);
  torchBody.position.y = 0.105;
  torchBody.castShadow = true;
  const torchEmitter = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0062, 0.0062, 0.003, 20),
    new THREE.MeshBasicMaterial({ color: 0xc084fc })
  );
  torchEmitter.position.y = 0.049;
  uvTorch.add(torchBody, torchEmitter);

  const uvBeamConeMat = new THREE.MeshBasicMaterial({
    color: 0x9333ea,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const uvBeamCone = new THREE.Mesh(new THREE.ConeGeometry(0.036, 0.072, 24, 1, true), uvBeamConeMat);
  uvBeamCone.position.y = 0.014;
  uvTorch.add(uvBeamCone);

  const uvSpotLight = new THREE.PointLight(0x9333ea, 0, 0.38, 1.4);
  uvSpotLight.position.set(0, 0.042, 0);
  uvTorch.add(uvSpotLight);

  // 4. Standalone 3S 1300mAh 45C LiPo Battery Pack (11.1V / 12.6V, 112g)
  const lipoPack = new THREE.Group();
  const lipoBody = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.022, 0.035), ngMats.lipoWrapBlue);
  lipoBody.position.y = 0.011;
  lipoBody.castShadow = true;
  lipoPack.add(lipoBody);
  const lipoLabel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.056, 0.024),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
  );
  lipoLabel.rotation.x = -Math.PI / 2;
  lipoLabel.position.y = 0.0222;
  lipoPack.add(lipoLabel);

  return {
    unboxGroup,
    craftKnife,
    uvTorch,
    uvSpotLight,
    lipoPack,
  };
}
