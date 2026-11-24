import * as THREE from 'three';
import { createHMD01ZmpDynamicRig } from '../ch08/zmpAndLabRig.js';

function makeRoundedBoxGeo(w, h, d, bevel = 0.0015, steps = 2) {
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

/**
 * Generates brushed hand-filed 1.5mm Silver Aluminum Splint PBR material ("手磨きで鈍く光る銀色のアルミの添え木").
 */
export function createHandFiledAluminumMat() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#d4dbe3';
  ctx.fillRect(0, 0, 512, 512);
  // Hand-filed fine parallel micro-scratches catching dramatic specular glint!
  for (let i = 0; i < 620; i++) {
    const y = (i * 19.3) % 512;
    const bright = 185 + ((i * 37) % 65);
    ctx.strokeStyle = `rgba(${bright},${bright + 4},${bright + 10},0.42)`;
    ctx.lineWidth = 1 + (i % 2);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y + ((i % 7) - 3) * 2.2);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshPhysicalMaterial({
    map: tex,
    color: 0xe2e8f0,
    metalness: 0.90,
    roughness: 0.28,
    clearcoat: 0.28,
  });
}

/**
 * Builds `HMD-01 Rev 1.8` Fighter (1,784g, 380mm) extending Rev 1.5 with:
 * - Toggleable White Battle Scratches + Left-Hip Carbon Bolt-Hole Crack (Day 194)
 * - Toggleable 5 Hand-Bent 1.5mm Silver Aluminum Splint Plates ("銀色の添え木"):
 *     1 & 2: Left & Right Shoulder Roots
 *     3 & 4: Left & Right Outer Hip Brackets
 *     5: Chest Arch Reinforcement Splint Band
 * - Full Biomechanical 4-Phase Prone-to-Standing Autonomous Get-Up Animation!
 */
export function createHMD01Rev18Fighter(baseMats, ngMats) {
  const rig = createHMD01ZmpDynamicRig(baseMats, ngMats);
  const aluSplintMat = createHandFiledAluminumMat();
  const boltGeo = new THREE.CylinderGeometry(0.0024, 0.0024, 0.004, 10);

  // ===========================================================================
  // 1. White Battle Scratches + Left-Hip Bolt-Hole Fracture Crack
  // ===========================================================================
  const scratchMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
  const scratchesGroup = new THREE.Group();
  scratchesGroup.visible = false;
  const scratchCoords = [
    [-0.044, -0.04, 0.015, 0.35],
    [0.044, -0.05, 0.015, -0.28],
    [-0.025, 0.055, 0.031, 0.55],
    [0.032, 0.070, 0.031, -0.40],
  ];
  for (const [sx, sy, sz, rz] of scratchCoords) {
    const sc = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.0018, 0.0015), scratchMat);
    sc.position.set(sx, sy, sz);
    sc.rotation.z = rz;
    scratchesGroup.add(sc);
  }
  rig.lower.pelvis.add(scratchesGroup);

  const hipCrackGroup = new THREE.Group();
  hipCrackGroup.visible = false;
  const hc1 = new THREE.Mesh(new THREE.BoxGeometry(0.0028, 0.028, 0.0028), scratchMat);
  hc1.position.set(0.056, -0.012, 0.016);
  hc1.rotation.z = 0.28;
  const hc2 = new THREE.Mesh(new THREE.BoxGeometry(0.0024, 0.018, 0.0028), scratchMat);
  hc2.position.set(0.052, -0.024, 0.016);
  hc2.rotation.z = -0.35;
  hipCrackGroup.add(hc1, hc2);
  rig.lower.pelvis.add(hipCrackGroup);

  // ===========================================================================
  // 2. Five Hand-Bent 1.5mm Silver Aluminum Splints ("銀色の添え木" — Boxer's Tape!)
  // ===========================================================================
  const splintsGroup = new THREE.Group();
  splintsGroup.visible = false;

  // Splints 1 & 2: Left & Right Shoulder Root L-Brackets wrapping the shoulder joints!
  for (const side of [-1, 1]) {
    const shPlate = new THREE.Group();
    const topFlange = new THREE.Mesh(makeRoundedBoxGeo(0.026, 0.003, 0.038, 0.0008, 1), aluSplintMat);
    topFlange.position.set(side * 0.054, 0.091, 0);
    const sideFlange = new THREE.Mesh(makeRoundedBoxGeo(0.003, 0.032, 0.038, 0.0008, 1), aluSplintMat);
    sideFlange.position.set(side * 0.066, 0.076, 0);
    for (const bz of [-0.011, 0.011]) {
      const b = new THREE.Mesh(boltGeo, baseMats.chromeSteel);
      b.rotation.z = Math.PI / 2;
      b.position.set(side * 0.068, 0.076, bz);
      shPlate.add(b);
    }
    shPlate.add(topFlange, sideFlange);
    splintsGroup.add(shPlate);
  }

  // Splint 5: Chest Arch Curved Silver Reinforcement Band crowning the rollbar!
  const archBandCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.038, 0.090, 0),
    new THREE.Vector3(-0.032, 0.132, 0.005),
    new THREE.Vector3(0, 0.146, 0.007),
    new THREE.Vector3(0.032, 0.132, 0.005),
    new THREE.Vector3(0.038, 0.090, 0),
  ]);
  const archSplint = new THREE.Mesh(new THREE.TubeGeometry(archBandCurve, 22, 0.0034, 8, false), aluSplintMat);
  splintsGroup.add(archSplint);
  rig.chestGroup.add(splintsGroup);

  // Splints 3 & 4: Left & Right Outer Hip U-Splint Gussets mounted on Pelvis/Hips!
  const hipSplints = new THREE.Group();
  hipSplints.visible = false;
  for (const side of [-1, 1]) {
    const hVert = new THREE.Mesh(makeRoundedBoxGeo(0.0032, 0.044, 0.046, 0.0008, 1), aluSplintMat);
    hVert.position.set(side * 0.068, 0.004, 0);
    const hTop = new THREE.Mesh(makeRoundedBoxGeo(0.022, 0.0032, 0.046, 0.0008, 1), aluSplintMat);
    hTop.position.set(side * 0.058, 0.027, 0);
    for (const [by, bz] of [[0.012, -0.014], [0.012, 0.014], [-0.010, -0.014], [-0.010, 0.014]]) {
      const b = new THREE.Mesh(boltGeo, baseMats.chromeSteel);
      b.rotation.z = Math.PI / 2;
      b.position.set(side * 0.070, by, bz);
      hipSplints.add(b);
    }
    hipSplints.add(hVert, hTop);
  }
  rig.lower.pelvis.add(hipSplints);

  function setBattleState({ scratched = false, hipCracked = false, silverSplints = false } = {}) {
    scratchesGroup.visible = scratched;
    hipCrackGroup.visible = hipCracked;
    splintsGroup.visible = silverSplints;
    hipSplints.visible = silverSplints;
  }

  /**
   * Biomechanical 4-Phase Prone-to-Standing Autonomous Get-Up Sequence!
   * u in [0..1]:
   *   0.00..0.25: Prone face-down on hard linoleum sheet -> arms brace beneath chest
   *   0.25..0.55: Push-up phase! Arms push torso powerfully off floor (if failStrippedGear, collapses at u=0.44!)
   *   0.55..0.82: Deep knee-tuck phase! Both legs fold tightly under chest shifting weight onto soles
   *   0.82..1.00: Arms snap free & spread wide for balance -> rises tall into poised upright stance!
   */
  function setProneGetUpProgress(u, { failStrippedGear = false } = {}) {
    const clamp = (x) => Math.max(0, Math.min(1, x));
    const smooth = (x) => { const c = clamp(x); return c * c * (3 - 2 * c); };
    const lerp = (a, b, t) => a + (b - a) * clamp(t);

    rig.zmpVisual.visible = false;

    if (failStrippedGear) {
      // Struggles to push up -> at u=0.45 gears shatter ("ガリッ…カラカラッ") -> right arm goes limp & collapses back flat!
      const rise = u < 0.45 ? smooth(u / 0.45) : Math.max(0, 1 - smooth((u - 0.45) / 0.25));
      const pivotX = lerp(1.52, 1.05, rise);
      const pivotY = lerp(0.044, 0.088, rise);
      rig.setPose({
        pelvisPos: [0, 0.190, 0],
        leftFootPos: [0.042, 0, 0],
        rightFootPos: [-0.042, 0, 0],
        leftArmPitch: lerp(-0.4, -1.25, rise),
        rightArmPitch: u > 0.45 ? 0.55 : lerp(-0.4, -1.25, rise), // Right arm goes totally limp/floppy!
        leftArmRoll: 0.14,
        rightArmRoll: u > 0.45 ? -0.45 : -0.14,
        pivotRotX: pivotX,
        pivotRotZ: u > 0.45 ? 0.26 * smooth((u - 0.45) / 0.28) : 0,
        pivotPosY: pivotY,
      });
      return;
    }

    // SUCCESSFUL 4-PHASE PRONE GET-UP (Rev 1.8 Silver Splints!)
    const p1 = smooth(u / 0.25);              // Brace arms
    const p2 = smooth((u - 0.22) / 0.34);     // Push-up torso
    const p3 = smooth((u - 0.52) / 0.30);     // Tuck knees under chest & plant soles
    const p4 = smooth((u - 0.80) / 0.20);     // Snap arms free & stand proud!

    const pivotX = lerp(1.52, 0.82, p2) * (1 - p3) + lerp(0.32, 0.0, p4) * p3;
    const pivotY = lerp(0.045, 0.025, p2) * (1 - p3);
    const pelH = lerp(0.195, 0.142, p3 * (1 - p4)) + lerp(0, 0.064, p4);
    const armPitch = lerp(-0.25, -1.35, p1 * (1 - p3)) + lerp(-0.55, 0.08, p4) * p3;
    const armSpread = lerp(0.10, 0.52, p3 * (1 - p4 * 0.78));

    rig.setPose({
      pelvisPos: [0, pelH, 0],
      pelvisRot: [lerp(0.28, 0.0, p4) * p3, 0, 0],
      leftFootPos: [0.042, 0, 0],
      rightFootPos: [-0.042, 0, 0],
      leftArmPitch: armPitch,
      rightArmPitch: armPitch,
      leftArmRoll: armSpread,
      rightArmRoll: -armSpread,
      pivotRotX: pivotX,
      pivotPosY: pivotY,
    });
  }

  return {
    ...rig,
    aluSplintMat,
    setBattleState,
    setProneGetUpProgress,
  };
}

/**
 * Builds EVERY Chapter 9 Story Prop (Zero Omissions!):
 * 1. Mikan Cardboard Graveyard Box ("みかん箱の墓標": April smoked MCU, May snapped leg, August warped knee, stripped servo)
 * 2. Mom's Care Package ("新米5kg・新聞紙包み赤りんご6個・なめこ汁・スーパーのチラシ裏メモ")
 * 3. Steaming Fresh White Rice Bowl ("炊きたて新米の湯気")
 * 4. 4-Day Hand-Metalworking Station ("四つ折りバスタオル挟み卓上万力・1.5mmアルミ板・鉄工ヤスリ・鋼歯車交換ピンセット")
 * 5. White Battery-Powered Camping Lantern ("白いキャンプ用ランタン")
 * 6. Handheld Digital Stopwatch (`09.48 s`)
 */
export function createCh09StoryProps(baseMats, ngMats, aluSplintMat, masterLib = null) {
  const pbr = masterLib?.pbr || null;
  const cardMat = pbr
    ? pbr.get('wovenCanvasBurlap', { repeatX: 2, repeatY: 2, tint: 0xc29359, roughness: 0.90 })
    : new THREE.MeshStandardMaterial({ color: 0xb68b57, roughness: 0.90 });

  // 1. Mikan Cardboard Graveyard Box ("みかん箱") — populated with Master Library broken parts!
  const mikanBox = new THREE.Group();
  const boxBottom = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.012, 0.24), cardMat);
  boxBottom.position.y = 0.006;
  const wallF = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 0.008), cardMat);
  wallF.position.set(0, 0.07, 0.12);
  const wallB = wallF.clone(); wallB.position.z = -0.12;
  const wallL = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.14, 0.24), cardMat);
  wallL.position.set(-0.16, 0.07, 0);
  const wallR = wallL.clone(); wallR.position.x = 0.16;
  mikanBox.add(boxBottom, wallF, wallB, wallL, wallR);

  // Authentic Orange "みかん" Print Label on Front of Box!
  const mkC = document.createElement('canvas');
  mkC.width = 256; mkC.height = 128;
  const mkx = mkC.getContext('2d');
  mkx.fillStyle = '#b68b57'; mkx.fillRect(0, 0, 256, 128);
  mkx.strokeStyle = '#c2410c'; mkx.lineWidth = 6; mkx.strokeRect(10, 10, 236, 108);
  mkx.fillStyle = '#ea580c'; mkx.font = '900 48px serif'; mkx.fillText('特選 みかん', 18, 76);
  mkx.fillStyle = '#7c2d12'; mkx.font = '700 18px sans-serif'; mkx.fillText('失敗作・破損部品（4月〜10月）', 18, 106);
  const mkTex = new THREE.CanvasTexture(mkC); mkTex.colorSpace = THREE.SRGBColorSpace;
  const mkLabel = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.10), new THREE.MeshStandardMaterial({ map: mkTex, roughness: 0.9 }));
  mkLabel.position.set(0, 0.072, 0.125);
  mikanBox.add(mkLabel);

  // Broken Graveyard Contents spawned directly from the 208-Asset Master Library!
  if (masterLib) {
    const deadPcb = masterLib.spawn('part_pcb_burnt_april');
    deadPcb.position.set(-0.08, 0.072, 0.02); deadPcb.rotation.set(0.32, 0.4, -0.2);
    const warpedPla = masterLib.spawn('part_frame_pla_warped');
    warpedPla.position.set(0.02, 0.078, -0.02);
    const crackedHip = masterLib.spawn('part_frame_petgcf_cracked');
    crackedHip.position.set(-0.03, 0.084, -0.05); crackedHip.rotation.set(0.4, 0.6, -0.2);
    const strippedServo = masterLib.spawn('part_servo_stripped');
    strippedServo.position.set(0.08, 0.078, 0.04); strippedServo.rotation.set(-0.3, 0.5, 0.25);
    const snappedHorn = masterLib.spawn('part_servo_horn_snapped');
    snappedHorn.position.set(-0.01, 0.096, 0.05); snappedHorn.rotation.x = 0.4;
    const gearShards = masterLib.spawn('part_gear_teeth_shards');
    gearShards.position.set(0.03, 0.068, 0.02);
    const snappedWire = masterLib.spawn('part_wire_snapped_data');
    snappedWire.position.set(-0.06, 0.086, -0.02);
    mikanBox.add(deadPcb, warpedPla, crackedHip, strippedServo, snappedHorn, gearShards, snappedWire);
  }

  // 2. Mom's Care Package ("新米5kg・新聞紙包み赤りんご6個・なめこ汁・チラシ裏メモ")
  const carePkg = new THREE.Group();
  const cpBase = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.014, 0.32), cardMat);
  cpBase.position.y = 0.007;
  const cpF = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.010), cardMat); cpF.position.set(0, 0.08, 0.16);
  const cpB = cpF.clone(); cpB.position.z = -0.16;
  const cpL = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.16, 0.32), cardMat); cpL.position.set(-0.21, 0.08, 0);
  const cpR = cpL.clone(); cpR.position.x = 0.21;
  carePkg.add(cpBase, cpF, cpB, cpL, cpR);

  // 5kg White "新米" Rice Bag
  const riceC = document.createElement('canvas');
  riceC.width = 256; riceC.height = 256;
  const rcx = riceC.getContext('2d');
  rcx.fillStyle = '#f8f5ec'; rcx.fillRect(0, 0, 256, 256);
  rcx.strokeStyle = '#dc2626'; rcx.lineWidth = 10; rcx.strokeRect(14, 14, 228, 228);
  rcx.fillStyle = '#0f172a'; rcx.font = '900 72px serif'; rcx.fillText('新米', 54, 128);
  rcx.fillStyle = '#b91c1c'; rcx.font = '800 32px sans-serif'; rcx.fillText('実家精米 5kg', 28, 198);
  const riceTex = new THREE.CanvasTexture(riceC); riceTex.colorSpace = THREE.SRGBColorSpace;
  const riceBag = new THREE.Mesh(makeRoundedBoxGeo(0.17, 0.095, 0.23, 0.018, 2), new THREE.MeshStandardMaterial({ map: riceTex, roughness: 0.85 }));
  riceBag.position.set(-0.10, 0.062, -0.01);
  riceBag.castShadow = true;
  carePkg.add(riceBag);

  // 6 Bright Red Apples nestled in crumpled newspaper collars (spawned from Master Library!)
  for (let i = 0; i < 6; i++) {
    const ax = 0.055 + (i % 3) * 0.058;
    const az = -0.06 + Math.floor(i / 3) * 0.078;
    const appleUnit = masterLib ? masterLib.spawn('prop_red_apple_newspaper') : new THREE.Group();
    appleUnit.scale.setScalar(0.82);
    appleUnit.position.set(ax, 0.014, az);
    carePkg.add(appleUnit);
  }

  // Instant Nameko Miso Soup Packets tucked along front edge!
  for (let s = 0; s < 3; s++) {
    const pkt = masterLib ? masterLib.spawn('prop_nameko_miso_cup') : new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.012, 0.048), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
    pkt.scale.setScalar(0.70);
    pkt.position.set(0.04 + s * 0.055, 0.022, 0.115);
    carePkg.add(pkt);
  }

  // Mother's Handwritten Memo on Back of a Supermarket Flyer ("急に寒くなったから新米送ります…")!
  const noteC = document.createElement('canvas');
  noteC.width = 512; noteC.height = 384;
  const ncx = noteC.getContext('2d');
  ncx.fillStyle = '#f7f3e3'; ncx.fillRect(0, 0, 512, 384);
  ncx.strokeStyle = '#cbd5e1'; ncx.lineWidth = 4; ncx.strokeRect(8, 8, 496, 368);
  ncx.fillStyle = '#1e293b'; ncx.font = '800 24px sans-serif';
  ncx.fillText('急に寒くなったから新米送ります。', 26, 62);
  ncx.fillText('ちゃんとご飯炊いて食べてる？', 26, 106);
  ncx.fillStyle = '#0369a1'; ncx.font = '800 22px sans-serif';
  ncx.fillText('父さんが「小学生の時も壊れた目覚まし', 26, 174);
  ncx.fillText('時計を夕方まで半べそで直してたな」って', 26, 214);
  ncx.fillText('笑ってたよ。', 26, 254);
  ncx.fillStyle = '#b91c1c'; ncx.font = '800 23px sans-serif';
  ncx.fillText('指だけは気をつけて、風邪ひかないようにね', 26, 330);
  const noteTex = new THREE.CanvasTexture(noteC); noteTex.colorSpace = THREE.SRGBColorSpace;
  const momNote = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.003, 0.135), new THREE.MeshStandardMaterial({ map: noteTex, color: 0xcfc9b8, roughness: 0.94 }));
  momNote.position.set(-0.08, 0.115, 0.02);
  momNote.rotation.set(0.08, 0.12, -0.04);
  carePkg.add(momNote);

  // 3. Steaming Freshly Cooked White Rice Bowl + Chopsticks ("炊きたての新米")
  const riceBowl = masterLib ? masterLib.spawn('prop_steaming_rice_bowl') : new THREE.Group();
  if (masterLib) {
    const chopsticks = masterLib.spawn('prop_chopsticks_pair');
    chopsticks.position.set(0.01, 0.008, 0.088);
    chopsticks.rotation.y = 0.16;
    riceBowl.add(chopsticks);
  }
  const steamPuffs = [];
  const steamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.34, depthWrite: false });
  for (let i = 0; i < 4; i++) {
    const sf = new THREE.Mesh(new THREE.SphereGeometry(0.018 + i * 0.004, 12, 10), steamMat);
    sf.position.set((i - 1.5) * 0.012, 0.095 + i * 0.024, 0);
    riceBowl.add(sf);
    steamPuffs.push(sf);
  }

  // 4. 4-Day Hand-Metalworking Station (Photographic Woven Bath Towel + Blue Desktop Vise + 1.5mm Alu Sheet + Reciprocating Steel File + Greased Steel Gears + Tools!)
  const metalworkGroup = new THREE.Group();
  const bathTowel = masterLib
    ? masterLib.spawn('tool_bath_towel_folded')
    : new THREE.Mesh(makeRoundedBoxGeo(0.28, 0.022, 0.20, 0.006, 2), new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.96 }));
  bathTowel.position.set(-0.04, 0.012, 0);
  metalworkGroup.add(bathTowel);

  // Blue Cast-Iron Desktop Vise sitting atop the photographic bath towel!
  const viseUnit = masterLib ? masterLib.spawn('tool_bench_vise_blue') : new THREE.Group();
  viseUnit.position.set(-0.04, 0.022, 0);
  metalworkGroup.add(viseUnit);

  // Gleaming 1.5mm Silver Aluminum Sheet clamped in the vise & bending cleanly to 90°!
  const aluVertical = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.026, 0.0022), aluSplintMat);
  aluVertical.position.set(-0.04, 0.105, 0.0);
  const aluBentFlange = new THREE.Group();
  aluBentFlange.position.set(-0.04, 0.116, 0.0);
  const flangeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.034, 0.0022), aluSplintMat);
  flangeMesh.position.set(0, 0.017, 0);
  aluBentFlange.add(flangeMesh);
  metalworkGroup.add(aluVertical, aluBentFlange);

  // Steel Hand File reciprocating across the gleaming aluminum edge ("シュッ、シュッ")!
  const steelFile = masterLib ? masterLib.spawn('tool_steel_file_bastard') : new THREE.Group();
  steelFile.position.set(-0.02, 0.132, 0.008);
  metalworkGroup.add(steelFile);

  // Open Servo Gearbox beside the vise with gleaming New Steel Replacement Gears + Grease & Hex Wrench!
  const gearbox = new THREE.Group();
  gearbox.position.set(0.18, 0.015, 0.02);
  const gbCase = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.026, 0.048), pbr ? pbr.get('darkSlateMetal') : baseMats.darkAnodized);
  gearbox.add(gbCase);
  if (masterLib) {
    const g1 = masterLib.spawn('part_gear_steel_spur'); g1.position.set(-0.018, 0.016, -0.004);
    const g2 = masterLib.spawn('part_gear_steel_spur'); g2.position.set(0.002, 0.016, 0.006);
    const g3 = masterLib.spawn('part_gear_steel_spur'); g3.position.set(0.020, 0.016, -0.004);
    const grease = masterLib.spawn('tool_grease_tube'); grease.position.set(0.17, 0.012, -0.10); grease.rotation.set(Math.PI / 2, 0, 0.42);
    const hexKey = masterLib.spawn('tool_hex_wrench_25mm'); hexKey.position.set(-0.18, 0.004, 0.13); hexKey.rotation.y = -0.35;
    gearbox.add(g1, g2, g3);
    metalworkGroup.add(grease, hexKey);
  }
  metalworkGroup.add(gearbox);

  // 5. White Battery-Powered Camping Lantern ("白いキャンプ用ランタン")
  const lantern = masterLib ? masterLib.spawn('prop_camping_lantern_white') : new THREE.Group();
  const lanLight = new THREE.PointLight(0xe0f2fe, 4.4, 4.8, 1.35);
  lanLight.position.set(0, 0.16, 0);
  lantern.add(lanLight);

  // 6. Digital Stopwatch Prop / Overlay Board (`09.48 s`)
  const swC = document.createElement('canvas');
  swC.width = 512; swC.height = 256;
  const swx = swC.getContext('2d');
  const swTex = new THREE.CanvasTexture(swC);
  swTex.colorSpace = THREE.SRGBColorSpace;
  function updateStopwatch(sec, stopped = false) {
    swx.fillStyle = '#070c14'; swx.fillRect(0, 0, 512, 256);
    swx.strokeStyle = stopped ? '#34d399' : '#38bdf8'; swx.lineWidth = 10; swx.strokeRect(8, 8, 496, 240);
    swx.fillStyle = stopped ? '#34d399' : '#f8fafc';
    swx.font = '900 102px monospace';
    swx.fillText(`${sec.toFixed(2)} s`, 42, 152);
    swx.fillStyle = stopped ? '#a7f3d0' : '#94a3b8';
    swx.font = '800 26px monospace';
    swx.fillText(stopped ? '3.0m SPRINT CLEAR!! [REV 1.8]' : 'HARD LINOLEUM 3.0m SPRINT...', 32, 218);
    swTex.needsUpdate = true;
  }
  updateStopwatch(0, false);

  const stopwatchBoard = new THREE.Mesh(
    new THREE.PlaneGeometry(0.36, 0.18),
    new THREE.MeshBasicMaterial({ map: swTex })
  );

  return {
    mikanBox,
    carePkg,
    riceBowl,
    steamPuffs,
    metalworkGroup,
    aluBentFlange,
    steelFile,
    lantern,
    lanLight,
    stopwatchBoard,
    updateStopwatch,
  };
}
