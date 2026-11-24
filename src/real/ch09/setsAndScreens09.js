import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createHMD01Rev18Fighter, createCh09StoryProps } from './hmd01Rev18Rig.js';

/**
 * Dynamic Screens for Chapter 9:
 * 1. `withdrawPhoneMat` — 01:00 AM "出場辞退のご連絡" draft email glowing beside the mikan box
 * 2. `scaleLcdMat` — `1784 g` digital kitchen scale LCD for silver-splinted `Rev 1.8`
 */
export function createCh09Screens() {
  const phC = document.createElement('canvas');
  phC.width = 512; phC.height = 820;
  const phx = phC.getContext('2d');
  phx.fillStyle = '#0f172a'; phx.fillRect(0, 0, 512, 820);
  phx.fillStyle = '#1e293b'; phx.fillRect(0, 0, 512, 110);
  phx.fillStyle = '#94a3b8'; phx.font = '700 24px sans-serif'; phx.fillText('下書き：全日本競技会 事務局 宛', 26, 68);
  phx.fillStyle = '#f8fafc'; phx.font = '800 32px sans-serif'; phx.fillText('件名：出場辞退のご連絡', 26, 178);
  phx.fillStyle = '#cbd5e1'; phx.font = '600 25px sans-serif';
  phx.fillText('お世話になっております。', 26, 252);
  phx.fillText('個人参加エントリーの佐伯湊です。', 26, 298);
  phx.fillText('機体破損のため、誠に勝手ながら', 26, 356);
  phx.fillText('出場を辞退させていただきたく…', 26, 402);
  phx.fillStyle = '#ef4444'; phx.fillRect(310, 680, 170, 74);
  phx.fillStyle = '#ffffff'; phx.font = '800 30px sans-serif'; phx.fillText('送信', 364, 728);
  const phTex = new THREE.CanvasTexture(phC); phTex.colorSpace = THREE.SRGBColorSpace;

  const scC = document.createElement('canvas');
  scC.width = 512; scC.height = 192;
  const scx = scC.getContext('2d');
  scx.fillStyle = '#071411'; scx.fillRect(0, 0, 512, 192);
  scx.strokeStyle = '#34d399'; scx.lineWidth = 8; scx.strokeRect(8, 8, 496, 176);
  scx.fillStyle = '#34d399'; scx.font = '900 104px monospace'; scx.fillText('1784 g', 36, 128);
  scx.fillStyle = '#a7f3d0'; scx.font = '700 24px monospace'; scx.fillText('ALU SPLINTS +22g  [UNDER 1800g!]', 36, 168);
  const scTex = new THREE.CanvasTexture(scC); scTex.colorSpace = THREE.SRGBColorSpace;

  return {
    withdrawPhoneMat: new THREE.MeshBasicMaterial({ map: phTex }),
    scaleLcdMat: new THREE.MeshBasicMaterial({ map: scTex }),
  };
}

/**
 * Builds ALL 3 Monumental Chapter 9 Sets Powered Directly by the 208-Asset Master Library
 * & 135-Tile Photographic PBR Atlas Bank!
 */
export function createCh09World(scene, baseMats, ngMats, screens, masterLib) {
  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats);
  const props = createCh09StoryProps(baseMats, ngMats, heroFighter.aluSplintMat, masterLib);

  // ===========================================================================
  // SET 1: 10月・金木犀のキャンパス夕暮れ坂道 — Master Library `loc_campus_kinmokusei_slope`!
  // ===========================================================================
  const campusSet = new THREE.Group();
  scene.add(campusSet);

  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {},
    vertexShader: `varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vP; void main(){
      float h = clamp(normalize(vP).y * 1.45 + 0.10, 0.0, 1.0);
      vec3 c1 = vec3(0.95, 0.42, 0.22);
      vec3 c2 = vec3(0.55, 0.26, 0.48);
      vec3 c3 = vec3(0.08, 0.14, 0.34);
      vec3 col = h < 0.42 ? mix(c1, c2, h / 0.42) : mix(c2, c3, (h - 0.42) / 0.58);
      gl_FragColor = vec4(col, 1.0);
    }`,
  });
  campusSet.add(new THREE.Mesh(new THREE.SphereGeometry(48, 24, 16), skyMat));

  // Summon entire photographic asphalt + tactile paving + curbs + kinmokusei hedges + fallen leaves + streetlamps!
  const campusSlope = masterLib.spawn('loc_campus_kinmokusei_slope');
  campusSet.add(campusSlope);

  // Extra street trees & vending machine in campus background for rich urban depth!
  const campusTree1 = masterLib.spawn('nat_street_tree_green'); campusTree1.position.set(-4.6, 0, -6.5);
  const campusTree2 = masterLib.spawn('nat_ginkgo_tree_autumn'); campusTree2.position.set(4.5, 0, -5.2);
  const campusVending = masterLib.spawn('arch_vending_machine_night'); campusVending.position.set(2.95, 0.06, -9.2); campusVending.rotation.y = -Math.PI * 0.5;
  campusSet.add(campusTree1, campusTree2, campusVending);

  // 72 Drifting Fragrant Orange Kinmokusei Petals in the October breeze!
  const petalInst = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(0.032, 0.032),
    new THREE.MeshBasicMaterial({ color: 0xfb923c, side: THREE.DoubleSide }),
    72
  );
  const _pDummy = new THREE.Object3D();
  function updateKinmokuseiPetals(t) {
    for (let i = 0; i < 72; i++) {
      const px = ((i * 0.61 + t * 0.32) % 5.6) - 2.8;
      const py = 0.25 + ((i * 0.37 - t * 0.18 + 10) % 2.4);
      const pz = -5.5 + ((i * 0.47) % 8.0);
      _pDummy.position.set(px, py, pz);
      _pDummy.rotation.set(t * 2.1 + i, t * 1.4, i);
      _pDummy.updateMatrix();
      petalInst.setMatrixAt(i, _pDummy.matrix);
    }
    petalInst.instanceMatrix.needsUpdate = true;
  }
  campusSet.add(petalInst);

  // Minato holding rolled photographic Hard Linoleum Sheet Tube (`prop_rolled_linoleum_sheet`)!
  const minatoCampus = createRealisticHuman(baseMats, {
    role: 'minato_campus',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: true,
  });
  const rolledSheet = masterLib.spawn('prop_rolled_linoleum_sheet');
  rolledSheet.position.set(-0.22, 1.24, -0.18);
  rolledSheet.rotation.set(0.18, 0, 0.22);
  minatoCampus.root.add(rolledSheet);
  campusSet.add(minatoCampus.root);

  const tadokoro = createRealisticHuman(baseMats, {
    role: 'tadokoro',
    topMat: new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.78 }),
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: true,
  });
  const mate1 = createRealisticHuman(baseMats, {
    role: 'mate1',
    topMat: new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.78 }),
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  campusSet.add(tadokoro.root, mate1.root);

  // ===========================================================================
  // SET 2: 『コーポ武蔵野』203号室 — Master Library Photographic Walnut Floor, Hard Linoleum, Open Iron Hallway & Tool-Filled Workbench!
  // ===========================================================================
  const apartmentSet = new THREE.Group();
  scene.add(apartmentSet);

  const roomPracticeFloor = masterLib.spawn('loc_room203_practice_floor');
  apartmentSet.add(roomPracticeFloor);

  // Open Thin Iron Doorway -> Night Exterior Hallway + Bare Warm Tungsten Bulb + Room 103 Neighbor!
  const doorwayGroup = masterLib.spawn('loc_room203_hallway_103');
  doorwayGroup.position.set(-1.35, 0, 0.55);
  doorwayGroup.visible = false;
  const bulbLight = new THREE.PointLight(0xffcf70, 6.4, 5.2, 1.35);
  bulbLight.position.set(-0.48, 1.88, -0.05);
  const neighbor103 = createRealisticHuman(baseMats, {
    role: 'neighbor',
    topMat: new THREE.MeshStandardMaterial({ color: 0x3b485b, roughness: 0.78 }),
    pantsMat: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.82 }),
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  neighbor103.root.position.set(-0.68, 0, -0.02);
  neighbor103.root.rotation.y = Math.PI * 0.5;
  neighbor103.head.rotation.x = 0.14;
  doorwayGroup.add(bulbLight, neighbor103.root);
  apartmentSet.add(doorwayGroup);

  // Photographic Walnut Workbench stocked with caliper, multimeter, LED lamp, hex wrenches (`loc_room203_workbench`)!
  const deskGroup = masterLib.spawn('loc_room203_workbench');
  deskGroup.position.set(0, 0, -0.55);
  apartmentSet.add(deskGroup);

  // Angled Kitchen Digital Scale (`1784 g`!)
  const scaleGroup = new THREE.Group();
  scaleGroup.position.set(0.08, 0.720, 0.05);
  scaleGroup.visible = false;
  const scBody = new THREE.Mesh(new THREE.BoxGeometry(0.172, 0.022, 0.215), baseMats.bambuWhite);
  scBody.position.y = 0.011;
  const scPan = new THREE.Mesh(new THREE.BoxGeometry(0.148, 0.004, 0.148), masterLib.pbr.get('brushedStainlessDoor'));
  scPan.position.set(0, 0.024, -0.025);
  const scBezel = new THREE.Mesh(new THREE.BoxGeometry(0.142, 0.044, 0.012), baseMats.bambuWhite);
  scBezel.position.set(0, 0.026, 0.098); scBezel.rotation.x = -0.68;
  const scLcd = new THREE.Mesh(new THREE.PlaneGeometry(0.128, 0.048), screens.scaleLcdMat);
  scLcd.position.set(0, 0.030, 0.103); scLcd.rotation.x = -0.68;
  scaleGroup.add(scBody, scPan, scBezel, scLcd);
  deskGroup.add(scaleGroup);

  // Withdrawal Draft Phone beside Mikan Box at 01:00 AM!
  const draftPhone = new THREE.Group();
  const dpBody = new THREE.Mesh(new THREE.BoxGeometry(0.076, 0.154, 0.008), baseMats.darkAnodized);
  const dpScr = new THREE.Mesh(new THREE.PlaneGeometry(0.070, 0.144), screens.withdrawPhoneMat);
  dpScr.position.z = 0.0046;
  draftPhone.add(dpBody, dpScr);
  draftPhone.position.set(0.24, 0.052, 0.45);
  draftPhone.rotation.set(-1.12, -0.22, 0);
  draftPhone.visible = false;
  apartmentSet.add(draftPhone);

  // Mount Mikan Box, Mom's Care Package, Steaming Rice Bowl & Bath-Towel Vise Workshop!
  props.mikanBox.position.set(-0.02, 0.0, 0.42);
  props.mikanBox.visible = false;
  props.carePkg.position.set(0.0, 0.0, 0.42);
  props.carePkg.visible = false;
  apartmentSet.add(props.mikanBox, props.carePkg);

  props.riceBowl.position.set(-0.22, 0.720, 0.08);
  props.riceBowl.visible = false;
  props.metalworkGroup.position.set(0.06, 0.720, 0.04);
  props.metalworkGroup.visible = false;
  deskGroup.add(props.riceBowl, props.metalworkGroup);

  // ===========================================================================
  // SET 3: 私鉄コンクリート高架下 — Master Library Rust Concrete Piers, Tire-Marked Floor, Bicycle, Hiking Pack, Train & Chalk Track!
  // ===========================================================================
  const viaductSet = new THREE.Group();
  viaductSet.visible = false;
  scene.add(viaductSet);

  const viaductUnderpass = masterLib.spawn('loc_viaduct_underpass_night');
  const viaductSprintTrack = masterLib.spawn('loc_viaduct_sprint_arena');
  const expressTrain = masterLib.spawn('loc_commuter_train_deck');
  expressTrain.position.set(-6, 3.16, -1.5);
  viaductSet.add(viaductUnderpass, viaductSprintTrack, expressTrain);

  // Crackling Electric-Blue Pantograph Catenary Spark ("架線から散った青い火花")!
  const catenarySparkLight = new THREE.PointLight(0x38bdf8, 0, 14, 1.3);
  catenarySparkLight.position.set(0.4, 3.85, -0.8);
  const catenarySparkOrb = masterLib.spawn('arch_catenary_spark_arc');
  catenarySparkOrb.position.set(0.4, 3.92, -1.1);
  catenarySparkOrb.visible = false;
  viaductSet.add(catenarySparkLight, catenarySparkOrb);

  // White Camping Lantern + Stopwatch Display Board under Viaduct!
  props.lantern.position.set(-0.56, 0.006, 0.62);
  viaductSet.add(props.lantern);

  props.stopwatchBoard.position.set(-0.48, 0.26, 2.72);
  props.stopwatchBoard.rotation.y = 0.45;
  props.stopwatchBoard.visible = false;
  viaductSet.add(props.stopwatchBoard);

  // Falling October Ice-Rain Streaks ("十月の冷たい氷雨" — 120 instanced streaks!)
  const rainGeo = new THREE.BoxGeometry(0.004, 0.24, 0.004);
  const rainMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.58 });
  const rainInst = new THREE.InstancedMesh(rainGeo, rainMat, 120);
  rainInst.visible = false;
  const _rDummy = new THREE.Object3D();
  function updateRain(t) {
    for (let i = 0; i < 120; i++) {
      const rx = ((i * 0.73) % 4.6) - 2.3;
      const ry = 3.2 - ((t * 4.8 + i * 0.31) % 3.2);
      const rz = -0.5 + ((i * 0.59) % 3.8);
      _rDummy.position.set(rx, ry, rz);
      _rDummy.rotation.set(0, 0, 0.14);
      _rDummy.updateMatrix();
      rainInst.setMatrixAt(i, _rDummy.matrix);
    }
    rainInst.instanceMatrix.needsUpdate = true;
  }
  viaductSet.add(rainInst);

  // Kneeling Minato for Finale Forehead-to-Silver-Shoulder Scene!
  const minatoKneel = createRealisticHuman(baseMats, {
    role: 'minato_kneel',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoKneel.pelvis.position.y = 0.24;
  minatoKneel.leftLeg.hipJoint.rotation.set(-1.32, 0, 0);
  minatoKneel.leftLeg.kneeJoint.rotation.set(2.35, 0, 0);
  minatoKneel.rightLeg.hipJoint.rotation.set(-1.32, 0, 0);
  minatoKneel.rightLeg.kneeJoint.rotation.set(2.35, 0, 0);
  minatoKneel.spine.rotation.set(0.95, 0, 0);
  minatoKneel.head.rotation.set(0.28, 0, 0);
  minatoKneel.leftArm.shoulder.rotation.set(-0.78, 0.18, 0.16);
  minatoKneel.leftArm.elbow.rotation.set(-0.42, 0, 0);
  minatoKneel.rightArm.shoulder.rotation.set(-0.78, -0.18, -0.16);
  minatoKneel.rightArm.elbow.rotation.set(-0.42, 0, 0);
  minatoKneel.root.position.set(-0.62, 0.0, 2.98);
  minatoKneel.root.rotation.set(0, Math.PI * 0.5, 0);
  minatoKneel.root.visible = false;
  viaductSet.add(minatoKneel.root);

  // Mount Hero Fighter directly into Scene so it moves seamlessly between Room & Viaduct!
  scene.add(heroFighter.root);

  function setActiveSet(name) {
    campusSet.visible = name === 'campus';
    apartmentSet.visible = name === 'apartment';
    viaductSet.visible = name === 'viaduct';
  }

  return {
    setActiveSet,
    campusSet,
    updateKinmokuseiPetals,
    minatoCampus,
    tadokoro,
    mate1,
    apartmentSet,
    doorwayGroup,
    scaleGroup,
    draftPhone,
    viaductSet,
    expressTrain,
    catenarySparkLight,
    catenarySparkOrb,
    rainInst,
    updateRain,
    minatoKneel,
    heroFighter,
    props,
  };
}
