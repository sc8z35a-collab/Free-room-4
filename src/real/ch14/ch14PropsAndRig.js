import * as THREE from 'three';

/**
 * Chapter 14 Hero Props & Physical Rigs (`第14章：黒い金属と炭素の骨格`):
 * 1. White 3D-Printed Full-Scale Test Bone (`仮の白い骨`) + Real Circular Muscle + L-Shaped Hex Wrench
 * 2. Monumental 180cm Steel Pipe Safety Gantry (`高さ180cmの鉄パイプ吊り櫓`) + Climbing Nylon Safety Belt +
 *    Thick Black Rubber Floor Mat + Half-Folded Futon (`壁と鉄パイプの隙間の布団`)
 * 3. May 5 Unboxing Parcel Box + Jet-Black CNC Hip Pocket & 4mm Carbon Plates + Ice-on-Ice Fit (`スッ…カチリ`) +
 *    Blue Threadlocker Bottle & Drop (`青い緩み止め液`)
 * 4. Steaming Hot Canned Coffee (`温かい缶コーヒー`)
 */

export function createWhiteTestBoneRig(baseMats) {
  const group = new THREE.Group();

  // Matte-white 3D-printed PLA prototype hip & thigh test frame ("安い白いプラスチックの仮の白い骨")
  const plaWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.72, metalness: 0.04 });
  const hipBlock = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.072, 0.074), plaWhiteMat);
  hipBlock.position.set(0, 0.036, 0);
  hipBlock.castShadow = true;

  const thighPlateF = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.012, 0.165), plaWhiteMat);
  thighPlateF.position.set(0, 0.018, 0.11);
  thighPlateF.castShadow = true;
  const thighPlateTop = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.012, 0.165), plaWhiteMat);
  thighPlateTop.position.set(0, 0.056, 0.11);

  // Real black & copper circular muscle test-fitted onto the white PLA bone!
  const muscle = new THREE.Group();
  muscle.position.set(0, 0.075, 0);
  const bell = new THREE.Mesh(
    new THREE.CylinderGeometry(0.038, 0.038, 0.022, 28),
    new THREE.MeshStandardMaterial({ color: 0x14171d, metalness: 0.85, roughness: 0.25 })
  );
  const cop = new THREE.Mesh(
    new THREE.TorusGeometry(0.027, 0.0045, 6, 22),
    new THREE.MeshStandardMaterial({ color: 0xd96b27, metalness: 0.90, roughness: 0.24 })
  );
  cop.rotation.x = Math.PI / 2; cop.position.y = 0.009;
  const pcb = new THREE.Mesh(
    new THREE.CylinderGeometry(0.021, 0.021, 0.004, 20),
    new THREE.MeshStandardMaterial({ color: 0x0f7640, roughness: 0.35 })
  );
  pcb.position.y = 0.012;
  muscle.add(bell, cop, pcb);

  // Chrome L-shaped Hex Wrench ("六角レンチが入らなくて回せない場所を3箇所発見！")
  const wrenchPivot = new THREE.Group();
  wrenchPivot.position.set(0.068, 0.068, 0.015);
  const wLong = new THREE.Mesh(new THREE.CylinderGeometry(0.0024, 0.0024, 0.095, 6), baseMats.chromeSteel);
  wLong.rotation.z = Math.PI / 2; wLong.position.x = 0.045;
  const wShort = new THREE.Mesh(new THREE.CylinderGeometry(0.0024, 0.0024, 0.028, 6), baseMats.chromeSteel);
  wShort.position.y = -0.012;
  wrenchPivot.add(wLong, wShort);

  // Glowing crimson interference marker ring pointing out the tight tool-clearance corner!
  const warnRing = new THREE.Mesh(
    new THREE.RingGeometry(0.012, 0.017, 20),
    new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide })
  );
  warnRing.rotation.x = -Math.PI / 2;
  warnRing.position.set(0.048, 0.078, 0.015);

  group.add(hipBlock, thighPlateF, thighPlateTop, muscle, wrenchPivot, warnRing);

  function animateWrench(t) {
    wrenchPivot.rotation.y = Math.sin(t * 3.5) * 0.28;
  }

  return { group, animateWrench };
}

export function createSteelGantry180cmRig(baseMats, pbr) {
  const group = new THREE.Group();

  // Monumental 1.80m x 1.08m x 0.96m Matte-Black Steel Pipe Safety Gantry ("高さ180センチの鉄パイプの櫓")!
  const pipeMat = new THREE.MeshStandardMaterial({ color: 0x1e242c, metalness: 0.78, roughness: 0.36 });
  const clampMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, roughness: 0.34 });

  const W = 1.08;
  const D = 0.94;
  const H = 1.80;
  const r = 0.019;

  // 4 Vertical Steel Pipe Columns
  for (const px of [-W / 2, W / 2]) {
    for (const pz of [-D / 2, D / 2]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(r, r, H, 14), pipeMat);
      col.position.set(px, H / 2, pz);
      col.castShadow = true;
      // Heavy metal corner tee joints at bottom & top
      for (const cy of [0.04, H - 0.02]) {
        const joint = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.056, 0.056), clampMat);
        joint.position.set(px, cy, pz);
        group.add(joint);
      }
      group.add(col);
    }
  }
  // Top & Bottom Perimeter Crossbars
  for (const py of [0.04, H - 0.02]) {
    for (const pz of [-D / 2, D / 2]) {
      const barX = new THREE.Mesh(new THREE.CylinderGeometry(r, r, W, 12), pipeMat);
      barX.rotation.z = Math.PI / 2; barX.position.set(0, py, pz);
      group.add(barX);
    }
    for (const px of [-W / 2, W / 2]) {
      const barZ = new THREE.Mesh(new THREE.CylinderGeometry(r, r, D, 12), pipeMat);
      barZ.rotation.x = Math.PI / 2; barZ.position.set(px, py, 0);
      group.add(barZ);
    }
  }
  // Central Heavy Overhead Crossbar supporting the Climbing Nylon Safety Belt!
  const centerCross = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.05, r * 1.05, W, 14), pipeMat);
  centerCross.rotation.z = Math.PI / 2;
  centerCross.position.set(0, H - 0.02, 0);
  group.add(centerCross);

  // Heavy Climbing Nylon Safety Harness Belt & Steel Carabiner Hook ("登山用の丈夫なナイロンベルト")
  const beltMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.78 });
  const beltStrap = new THREE.Mesh(new THREE.BoxGeometry(0.036, 1.12, 0.008), beltMat);
  beltStrap.position.set(0, H - 0.58, -0.022);
  const carabiner = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.005, 8, 18), baseMats.chromeSteel);
  carabiner.position.set(0, 0.665, -0.022);
  group.add(beltStrap, carabiner);

  // Thick Black Shock-Absorbing Rubber Floor Mat underneath ("分厚いゴムマット")
  const rubberMat = new THREE.Mesh(
    new THREE.BoxGeometry(W - 0.06, 0.024, D - 0.06),
    pbr.get('chalkRingRubberMat', { repeatX: 2, repeatY: 2, tint: 0x262930 })
  );
  rubberMat.position.set(0, 0.012, 0);
  rubberMat.receiveShadow = true;
  group.add(rubberMat);

  // Minato's Half-Folded Narrow Futon Squeezed Right Beside the Steel Pipe Gantry ("壁と鉄パイプの隙間に半分折った布団")!
  const futonGroup = new THREE.Group();
  futonGroup.position.set(-1.02, 0.0, 0.15);
  const futonPad = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 0.075, 1.62),
    pbr.get('quiltedKnitFabric', { repeatX: 2, repeatY: 3, tint: 0x334155 })
  );
  futonPad.position.y = 0.038;
  futonPad.receiveShadow = true;
  const futonFold = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.14, 1.60),
    pbr.get('quiltedKnitFabric', { repeatX: 1, repeatY: 3, tint: 0x475569 })
  );
  futonFold.position.set(-0.26, 0.10, 0);
  const pillow = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.09, 0.24),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.85 })
  );
  pillow.position.set(0.05, 0.11, -0.58);
  futonGroup.add(futonPad, futonFold, pillow);
  group.add(futonGroup);

  return { group, beltStrap, carabiner, futonGroup };
}

export function createUnboxingCncPartsRig(baseMats, carbonMat) {
  const group = new THREE.Group();

  const blackAlumMat = new THREE.MeshStandardMaterial({ color: 0x11141a, metalness: 0.88, roughness: 0.22 });
  const copperMat = new THREE.MeshStandardMaterial({ color: 0xd96b27, metalness: 0.90, roughness: 0.24 });
  const pcbGreenMat = new THREE.MeshStandardMaterial({ color: 0x0e6b3a, roughness: 0.34 });

  // Open Heavy Parcel Cardboard Box & White Protective Foam Sheet on Left-Back
  const boxMat = new THREE.MeshStandardMaterial({ color: 0xb08a5a, roughness: 0.88 });
  const parcelBox = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.11, 0.24), boxMat);
  parcelBox.position.set(-0.26, 0.055, -0.08);
  parcelBox.rotation.y = 0.18;
  const foamSheet = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 0.008, 0.34),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.82 })
  );
  foamSheet.position.set(0.06, 0.004, 0.06);
  group.add(parcelBox, foamSheet);

  // Laid-Out 4mm Thick Woven Carbon-Fiber Thigh & Shin Plates ("厚さ4ミリのカーボンの太ももと脛プレート")!
  for (let i = 0; i < 4; i++) {
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.006, 0.18), carbonMat);
    plate.position.set(0.16 + i * 0.058, 0.012, 0.06);
    plate.rotation.y = (i % 2 === 0 ? 0.05 : -0.04);
    plate.castShadow = true;
    group.add(plate);
  }

  // HERO Precision CNC Black Aluminum Hip Pocket ("股関節の黒いアルミの受け皿")!
  const hipPocket = new THREE.Group();
  hipPocket.position.set(-0.04, 0.012, 0.08);
  const pocketBase = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.022, 0.115), blackAlumMat);
  pocketBase.position.y = 0.011;
  // Machined circular recess wall (inner r = 0.039m for exact 0.038m muscle!)
  const pocketRing = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.008, 12, 32), blackAlumMat);
  pocketRing.rotation.x = Math.PI / 2;
  pocketRing.position.y = 0.024;
  // Bright silver machined chamfer rim showing CNC toolpath polish!
  const chamfer = new THREE.Mesh(new THREE.TorusGeometry(0.039, 0.0018, 8, 32), baseMats.chromeSteel);
  chamfer.rotation.x = Math.PI / 2;
  chamfer.position.y = 0.031;
  hipPocket.add(pocketBase, pocketRing, chamfer);
  group.add(hipPocket);

  // Animated Circular Artificial Muscle Sliding Into the CNC Hip Pocket ("スッ……カチリ" Ice-on-Ice Fit!)
  const slidingMuscle = new THREE.Group();
  const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.022, 28), blackAlumMat);
  const cop = new THREE.Mesh(new THREE.TorusGeometry(0.027, 0.0045, 8, 22), copperMat);
  cop.rotation.x = Math.PI / 2; cop.position.y = 0.009;
  const pcb = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.021, 0.004, 22), pcbGreenMat);
  pcb.position.y = 0.012;
  slidingMuscle.add(bell, cop, pcb);
  slidingMuscle.position.set(-0.04, 0.095, 0.08);
  group.add(slidingMuscle);

  // Subtle cyan/silver precision-fit shimmer ring that flashes right on "カチリ"!
  const fitGlowMat = new THREE.MeshBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
  const fitGlow = new THREE.Mesh(new THREE.RingGeometry(0.038, 0.052, 32), fitGlowMat);
  fitGlow.rotation.x = -Math.PI / 2;
  fitGlow.position.set(-0.04, 0.036, 0.08);
  group.add(fitGlow);

  // Blue Threadlocker Bottle ("青い液を一滴ずつ垂らして締め上げる") + Black High-Strength Bolt + Glowing Blue Drop!
  const lockGroup = new THREE.Group();
  lockGroup.position.set(0.06, 0.01, 0.14);
  const bottleBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.034, 0.068, 0.022),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
  );
  bottleBody.position.set(0.09, 0.034, -0.02);
  const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.006, 0.028, 10), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
  nozzle.position.set(0.09, 0.082, -0.02);
  // Black steel M4 socket-head bolt
  const heroBolt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0055, 0.0055, 0.032, 12),
    new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.88, roughness: 0.25 })
  );
  heroBolt.rotation.z = Math.PI / 2;
  heroBolt.position.set(-0.01, 0.016, 0.0);
  const boltHead = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.010, 12), heroBolt.material);
  boltHead.rotation.z = Math.PI / 2;
  boltHead.position.set(-0.030, 0.016, 0.0);
  // Vibrant glistening BLUE threadlocker drop right on the bolt threads!
  const blueDrop = new THREE.Mesh(
    new THREE.SphereGeometry(0.0052, 12, 10),
    new THREE.MeshPhysicalMaterial({ color: 0x2563eb, emissive: 0x1d4ed8, emissiveIntensity: 0.8, roughness: 0.08, transmission: 0.4 })
  );
  blueDrop.position.set(0.002, 0.022, 0.0);
  lockGroup.add(bottleBody, nozzle, heroBolt, boltHead, blueDrop);
  lockGroup.visible = false;
  group.add(lockGroup);

  function setFitProgress(u) {
    const p = Math.max(0, Math.min(1, u));
    slidingMuscle.position.y = 0.095 - p * 0.064; // seats flush at y=0.031!
    fitGlowMat.opacity = p > 0.92 ? Math.sin(((p - 0.92) / 0.08) * Math.PI) * 0.92 : 0.0;
  }

  return { group, lockGroup, blueDrop, setFitProgress };
}

export function createHotCannedCoffeeRig(baseMats) {
  const group = new THREE.Group();
  const canBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.026, 0.026, 0.104, 20),
    new THREE.MeshStandardMaterial({ color: 0x92400e, metalness: 0.55, roughness: 0.28 })
  );
  const goldBand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0266, 0.0266, 0.032, 20),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.72, roughness: 0.24 })
  );
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.026, 0.006, 20), baseMats.chromeSteel);
  lid.position.y = 0.053;

  const steamPuffs = [];
  for (let i = 0; i < 5; i++) {
    const sm = new THREE.MeshBasicMaterial({ color: 0xf8fafc, transparent: true, opacity: 0.28, depthWrite: false });
    const sp = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 6), sm);
    group.add(sp);
    steamPuffs.push({ mesh: sp, mat: sm, idx: i });
  }
  group.add(canBody, goldBand, lid);

  function updateSteam(t) {
    for (const s of steamPuffs) {
      const c = (t * 0.75 + s.idx / 5) % 1.0;
      s.mesh.position.set(Math.sin(t * 2.4 + s.idx) * 0.015, 0.065 + c * 0.14, Math.cos(t * 1.9 + s.idx) * 0.012);
      s.mesh.scale.setScalar(0.5 + c * 1.6);
      s.mat.opacity = Math.sin(c * Math.PI) * 0.30;
    }
  }

  return { group, updateSteam };
}
