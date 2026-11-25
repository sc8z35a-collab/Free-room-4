import * as THREE from 'three';

/**
 * Chapter 18 Bespoke Ultra-Quality Hero Props (`第18章：逆流する稲妻と、二度目の夏休み`):
 * 1. `createViaductAndExpressTrainRig`: Towering concrete railway viaduct + illuminated commuter express
 *    train rushing overhead (`急行電車`), plus white camping lantern casting a glowing pool on concrete!
 * 2. `createModularRepairAndGoldResistorRig`: White shop cloth (`白いウエス`), popped-out modular hip cassette,
 *    visibly bent `2°` hollow 8mm steel shaft (`くの字シャフト`), cracked carbon cover, hex wrench,
 *    and macro Gold `50W 1.5Ω` Aluminum Metal-Clad Braking Resistor (`金色のメタルクラッド抵抗器`)!
 * 3. `createLevelCrossingRig`: Japanese railway level crossing (`踏切遮断機`) w/ yellow/black striped bar,
 *    alternating flashing crimson crossing lamps & decelerating express train (`回生ブレーキ開眼`)!
 */

export function createViaductAndExpressTrainRig(baseMats, pbr) {
  const group = new THREE.Group();

  // Wide Concrete Riverbank Plaza under Railway Viaduct
  const plaza = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 18),
    pbr.get('archWhiteConcrete', { repeatX: 8, repeatY: 6, tint: 0x64748b })
  );
  plaza.rotation.x = -Math.PI / 2; plaza.receiveShadow = true;
  group.add(plaza);

  // Towering Concrete Railway Viaduct Overhead Deck & Heavy Support Piers!
  const concreteMat = pbr.get('archWhiteConcrete', { repeatX: 4, repeatY: 2, tint: 0x475569 });
  const deck = new THREE.Mesh(new THREE.BoxGeometry(28, 0.72, 4.6), concreteMat);
  deck.position.set(0, 4.8, -2.6);
  group.add(deck);
  for (const px of [-6.5, 0.0, 6.5]) {
    const pier = new THREE.Mesh(new THREE.BoxGeometry(1.15, 4.8, 1.15), concreteMat);
    pier.position.set(px, 2.4, -3.6);
    pier.castShadow = true;
    group.add(pier);
  }

  // Illuminated Night Commuter Express Train (`急行電車`) rushing across the viaduct overhead!
  const trainGroup = new THREE.Group();
  trainGroup.position.set(-14, 5.85, -2.4);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.7, roughness: 0.3 });
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.35 });
  const winGlowMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  for (let car = 0; car < 3; car++) {
    const cx = car * 6.4;
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.1, 1.35, 1.4), bodyMat);
    body.position.x = cx;
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(6.12, 0.16, 1.42), stripeMat);
    stripe.position.set(cx, -0.18, 0);
    trainGroup.add(body, stripe);
    for (let w = -2; w <= 2; w++) {
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.48), winGlowMat);
      win.position.set(cx + w * 1.12, 0.18, 0.71);
      trainGroup.add(win);
    }
  }
  group.add(trainGroup);

  // White LED Camping Lantern on Concrete Casting Bright Pool of Light (`白いランタンの光`)!
  const lanternGroup = new THREE.Group();
  lanternGroup.position.set(-1.35, 0, 0.85);
  const lanBase = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.075, 0.045, 18), baseMats.blackAnodized);
  lanBase.position.y = 0.022;
  const lanGlass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.058, 0.058, 0.145, 18),
    new THREE.MeshBasicMaterial({ color: 0xf8fafc })
  );
  lanGlass.position.y = 0.115;
  const lanCap = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.032, 18), baseMats.blackAnodized);
  lanCap.position.y = 0.20;
  const lanLight = new THREE.PointLight(0xe0f2fe, 4.2, 9.0, 1.3);
  lanLight.position.y = 0.22;
  lanternGroup.add(lanBase, lanGlass, lanCap, lanLight);
  group.add(lanternGroup);

  function updateTrain(t) {
    trainGroup.position.x = -18 + ((t * 5.2) % 38);
  }

  return { group, lanternGroup, updateTrain };
}

export function createModularRepairAndGoldResistorRig(baseMats, carbonMat) {
  const group = new THREE.Group();

  // Crisp White Shop Cloth (`白いウエス`) on Room 203 Workbench
  const cloth = new THREE.Mesh(
    new THREE.BoxGeometry(0.56, 0.006, 0.38),
    new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.92 })
  );
  cloth.position.y = 0.003; cloth.receiveShadow = true;
  group.add(cloth);

  // Popped-Out Modular Hip Joint Cassette (`ボルト4本でカセットテープのようにスポッと抜ける関節ユニット`)!
  const cassetteGroup = new THREE.Group();
  cassetteGroup.position.set(-0.14, 0.036, 0.0);
  const blackAlum = new THREE.MeshStandardMaterial({ color: 0x11141a, metalness: 0.86, roughness: 0.24 });
  const copper = new THREE.MeshStandardMaterial({ color: 0xd96b27, metalness: 0.90, roughness: 0.24 });
  const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.040, 0.040, 0.030, 28), blackAlum);
  const coil = new THREE.Mesh(new THREE.TorusGeometry(0.029, 0.0045, 8, 22), copper);
  coil.rotation.x = Math.PI / 2; coil.position.y = 0.015;
  const pcb = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.006, 22),
    new THREE.MeshStandardMaterial({ color: 0x0e6b3a, roughness: 0.34 })
  );
  pcb.position.y = 0.016;
  cassetteGroup.add(housing, coil, pcb);
  group.add(cassetteGroup);

  // Visibly Bent `2°` Hollow 8mm Steel Shaft (`くの字に曲がった中空連結シャフト`) + Fresh Straight Spare Shaft!
  const bentShaft = new THREE.Group();
  bentShaft.position.set(0.03, 0.018, 0.06);
  const sHalf1 = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.065, 16), baseMats.chromeSteel);
  sHalf1.rotation.z = Math.PI / 2 + 0.08; sHalf1.position.x = -0.030;
  const sHalf2 = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.065, 16), baseMats.chromeSteel);
  sHalf2.rotation.z = Math.PI / 2 - 0.08; sHalf2.position.x = 0.030;
  const bendWarn = new THREE.Mesh(
    new THREE.RingGeometry(0.014, 0.020, 20),
    new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide })
  );
  bendWarn.rotation.x = -Math.PI / 2; bendWarn.position.y = 0.010;
  bentShaft.add(sHalf1, sHalf2, bendWarn);

  const straightSpare = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.125, 16), baseMats.chromeSteel);
  straightSpare.rotation.z = Math.PI / 2;
  straightSpare.position.set(0.03, 0.014, -0.04);

  // Cracked Carbon Outer Cover Plate (`割れたカーボン外装カバー`)
  const crackL = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.006, 0.065), carbonMat);
  crackL.position.set(0.18, 0.010, 0.05); crackL.rotation.y = 0.14;
  const crackR = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.006, 0.065), carbonMat);
  crackR.position.set(0.232, 0.010, 0.062); crackR.rotation.y = -0.18;

  // Hex Wrench resting cleanly beside the cassette
  const wrenchLong = new THREE.Mesh(new THREE.CylinderGeometry(0.0032, 0.0032, 0.12, 8), baseMats.chromeSteel);
  wrenchLong.rotation.z = Math.PI / 2; wrenchLong.position.set(-0.08, 0.010, -0.11);
  const wrenchShort = new THREE.Mesh(new THREE.CylinderGeometry(0.0032, 0.0032, 0.036, 8), baseMats.chromeSteel);
  wrenchShort.rotation.x = Math.PI / 2; wrenchShort.position.set(-0.14, 0.010, -0.095);
  group.add(bentShaft, straightSpare, crackL, crackR, wrenchLong, wrenchShort);

  // --- MACRO GOLD `50W 1.5Ω` ALUMINUM METAL-CLAD BRAKING RESISTOR (`金色のメタルクラッド抵抗器`) ---
  const goldResGroup = new THREE.Group();
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xeab308,
    emissive: 0xd97706,
    emissiveIntensity: 0.35,
    metalness: 0.88,
    roughness: 0.22,
  });
  const spineMount = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.014, 0.16), blackAlum);
  spineMount.position.y = 0.007;
  const resCore = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.042, 0.046), goldMat);
  resCore.position.y = 0.036;
  for (let i = -4; i <= 4; i++) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.112, 0.003, 0.054), goldMat);
    fin.position.set(0, 0.022 + (i + 4) * 0.0045, 0);
    goldResGroup.add(fin);
  }
  for (const lx of [-0.072, 0.072]) {
    const tab = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.006, 0.022), baseMats.chromeSteel);
    tab.position.set(lx, 0.036, 0);
    const wire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0045, 0.0045, 0.09, 10),
      new THREE.MeshStandardMaterial({ color: lx < 0 ? 0xdc2626 : 0x18181b, roughness: 0.5 })
    );
    wire.rotation.z = Math.PI / 2; wire.position.set(lx * 1.65, 0.036, 0);
    goldResGroup.add(tab, wire);
  }
  // Glowing Gold Label Sticker (`50W 1.5Ω CLAMP @ 26.2V`)
  const rC = document.createElement('canvas'); rC.width = 256; rC.height = 96;
  const rx = rC.getContext('2d');
  rx.fillStyle = '#a16207'; rx.fillRect(0, 0, 256, 96);
  rx.fillStyle = '#fef9c3'; rx.font = '900 32px monospace'; rx.fillText('50W  1.5 Ω', 28, 46);
  rx.font = '700 20px monospace'; rx.fillText('CLAMP @ 26.2 V', 28, 80);
  const rTex = new THREE.CanvasTexture(rC); rTex.colorSpace = THREE.SRGBColorSpace;
  const rLbl = new THREE.Mesh(new THREE.PlaneGeometry(0.096, 0.036), new THREE.MeshBasicMaterial({ map: rTex }));
  rLbl.rotation.x = -Math.PI / 2; rLbl.position.y = 0.060;
  goldResGroup.add(spineMount, resCore, rLbl);
  goldResGroup.visible = false;

  return { group, goldResGroup, goldMat };
}

export function createLevelCrossingRig(baseMats, pbr) {
  const group = new THREE.Group();

  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 14),
    pbr.get('asphaltRoadDry', { repeatX: 4, repeatY: 4, tint: 0x475569 })
  );
  road.rotation.x = -Math.PI / 2;
  group.add(road);

  // Railway Track Rails + Gravel Bed
  for (const rz of [-1.45, -2.55]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(18, 0.05, 0.06), baseMats.chromeSteel);
    rail.position.set(0, 0.03, rz);
    group.add(rail);
  }

  // Yellow & Black Striped Crossing Gate Pole (`踏切遮断機`) & Alternating Red Flashing Lamps!
  const polePost = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.35, 12), baseMats.blackAnodized);
  polePost.position.set(-1.35, 1.18, -0.45);
  const lampLMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const lampRMat = new THREE.MeshBasicMaterial({ color: 0x450a0a });
  const lampL = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 12), lampLMat);
  lampL.position.set(-1.52, 1.92, -0.38);
  const lampR = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 12), lampRMat);
  lampR.position.set(-1.18, 1.92, -0.38);

  // Striped Gate Bar Lowered Horizontal
  for (let i = 0; i < 12; i++) {
    const seg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.022, 0.24, 10),
      new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0xfacc15 : 0x18181b, roughness: 0.45 })
    );
    seg.rotation.z = Math.PI / 2;
    seg.position.set(-1.2 + i * 0.24, 0.92, -0.42);
    group.add(seg);
  }
  group.add(polePost, lampL, lampR);

  // Passing Private-Rail Express Train (`キィィィン…ヒュゥゥン…` Regenerative Braking!)
  const crossTrain = new THREE.Group();
  crossTrain.position.set(-10, 1.45, -2.0);
  const cBodyMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.65, roughness: 0.3 });
  const cStripeMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.35 });
  const cWinMat = new THREE.MeshBasicMaterial({ color: 0xfef3c7 });
  for (let car = 0; car < 3; car++) {
    const cx = car * 6.2;
    const b = new THREE.Mesh(new THREE.BoxGeometry(6.0, 2.2, 1.6), cBodyMat);
    b.position.x = cx;
    const st = new THREE.Mesh(new THREE.BoxGeometry(6.02, 0.24, 1.62), cStripeMat);
    st.position.set(cx, -0.25, 0);
    crossTrain.add(b, st);
    for (let w = -2; w <= 2; w++) {
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.62), cWinMat);
      win.position.set(cx + w * 1.1, 0.25, 0.81);
      crossTrain.add(win);
    }
  }
  group.add(crossTrain);

  function updateCrossing(t) {
    const flash = Math.floor(t * 2.8) % 2 === 0;
    lampLMat.color.setHex(flash ? 0xff2222 : 0x3b0707);
    lampRMat.color.setHex(flash ? 0x3b0707 : 0xff2222);
    // Decelerating smoothly past the crossing!
    crossTrain.position.x = -10 + ((t * 3.4) % 22);
  }

  return { group, updateCrossing };
}
