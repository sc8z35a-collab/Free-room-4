import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createHMD01Rev18Fighter, createCh09StoryProps } from './hmd01Rev18Rig.js';

export function createCh09Screens() {
  // 1. Smartphone Screen (Withdrawal Draft Email at 01:00 AM!)
  const phC = document.createElement('canvas');
  phC.width = 512; phC.height = 768;
  const pctx = phC.getContext('2d');
  pctx.fillStyle = '#0f172a'; pctx.fillRect(0, 0, 512, 768);
  pctx.fillStyle = '#1e293b'; pctx.fillRect(0, 0, 512, 92);
  pctx.fillStyle = '#94a3b8'; pctx.font = '800 26px sans-serif';
  pctx.fillText('下書き：全日本競技会 事務局 宛', 24, 58);
  pctx.fillStyle = '#f8fafc'; pctx.font = '800 28px sans-serif';
  pctx.fillText('件名：出場辞退のご連絡', 26, 165);
  pctx.strokeStyle = '#334155'; pctx.lineWidth = 2;
  pctx.beginPath(); pctx.moveTo(24, 192); pctx.lineTo(488, 192); pctx.stroke();
  pctx.fillStyle = '#cbd5e1'; pctx.font = '700 24px sans-serif';
  pctx.fillText('お世話になっております。', 26, 250);
  pctx.fillText('個人参加エントリーの佐伯湊です。', 26, 294);
  pctx.fillText('機体破損のため、誠に勝手ながら', 26, 344);
  pctx.fillText('出場を辞退させていただきたく…', 26, 388);
  pctx.fillStyle = '#ef4444'; pctx.fillRect(320, 640, 160, 64);
  pctx.fillStyle = '#ffffff'; pctx.font = '900 28px sans-serif';
  pctx.fillText('送信', 372, 682);
  const phTex = new THREE.CanvasTexture(phC); phTex.colorSpace = THREE.SRGBColorSpace;
  const withdrawPhoneMat = new THREE.MeshBasicMaterial({ map: phTex });

  // 2. Angled Kitchen Scale LED (`1784 g` — Aluminum Splints Included, Under 1.8kg Limit!)
  const scC = document.createElement('canvas');
  scC.width = 512; scC.height = 256;
  const sctx = scC.getContext('2d');
  sctx.fillStyle = '#06130e'; sctx.fillRect(0, 0, 512, 256);
  sctx.strokeStyle = '#34d399'; sctx.lineWidth = 8; sctx.strokeRect(8, 8, 496, 240);
  sctx.fillStyle = '#34d399'; sctx.font = '900 104px monospace';
  sctx.fillText('1784 g', 34, 152);
  sctx.fillStyle = '#a7f3d0'; sctx.font = '800 26px monospace';
  sctx.fillText('ALU SPLINTS +22g  [UNDER 1800g!]', 18, 218);
  const scTex = new THREE.CanvasTexture(scC); scTex.colorSpace = THREE.SRGBColorSpace;
  const scaleLcdMat = new THREE.MeshBasicMaterial({ map: scTex });

  return {
    withdrawPhoneMat,
    scaleLcdMat,
  };
}

export function createCh09World(scene, baseMats, ngMats, screens) {
  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats);
  const props = createCh09StoryProps(baseMats, ngMats, heroFighter.aluSplintMat);

  // ===========================================================================
  // SET 1: 10月の金木犀キャンパス夕暮れ・田所の誘いと一人帰る坂道 (Cuts 01–02)
  // ===========================================================================
  const campusSet = new THREE.Group();
  campusSet.visible = false;
  scene.add(campusSet);

  const asphalt = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 24),
    new THREE.MeshStandardMaterial({ color: 0x3b4048, roughness: 0.92 })
  );
  asphalt.rotation.x = -Math.PI / 2;
  asphalt.receiveShadow = true;
  campusSet.add(asphalt);

  // Crimson-to-Indigo October Sunset Sky Dome Plane!
  const sunsetMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv;
      void main() {
        vec3 horizon = vec3(0.96, 0.36, 0.16); // Burning crimson ("茜色")
        vec3 mid = vec3(0.62, 0.24, 0.38);
        vec3 zenith = vec3(0.08, 0.14, 0.36);  // Deep indigo ("群青色")
        vec3 col = vUv.y < 0.45 ? mix(horizon, mid, vUv.y / 0.45) : mix(mid, zenith, (vUv.y - 0.45) / 0.55);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sunsetSky = new THREE.Mesh(new THREE.PlaneGeometry(24, 12), sunsetMat);
  sunsetSky.position.set(0, 5.2, -10.5);
  campusSet.add(sunsetSky);

  // Lush Kinmokusei (Sweet Osmanthus) Hedges dotted with glowing tiny orange blossoms!
  const hedgeMat = new THREE.MeshStandardMaterial({ color: 0x1e3a1e, roughness: 0.88 });
  const blossomMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
  for (const sx of [-2.4, 2.4]) {
    const hedge = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.15, 14), hedgeMat);
    hedge.position.set(sx, 0.57, -2.5);
    hedge.castShadow = true;
    campusSet.add(hedge);
    for (let b = 0; b < 32; b++) {
      const fl = new THREE.Mesh(new THREE.SphereGeometry(0.032, 6, 5), blossomMat);
      fl.position.set(sx - Math.sign(sx) * 0.48, 0.45 + (b % 5) * 0.14, -8.5 + b * 0.42);
      campusSet.add(fl);
    }
  }

  // Drifting Orange Kinmokusei Petals in the October sunset breeze!
  const petalGeo = new THREE.PlaneGeometry(0.022, 0.022);
  const petalInst = new THREE.InstancedMesh(petalGeo, blossomMat, 72);
  const _pDummy = new THREE.Object3D();
  function updateKinmokuseiPetals(t) {
    for (let i = 0; i < 72; i++) {
      const x = ((i * 1.37) % 4.4) - 2.2 + Math.sin(t * 1.1 + i) * 0.25;
      const y = 2.4 - ((t * 0.35 + i * 0.19) % 2.3);
      const z = -6.0 + ((i * 0.83) % 8.5);
      _pDummy.position.set(x, y, z);
      _pDummy.rotation.set(t + i, t * 0.7 + i, i);
      _pDummy.updateMatrix();
      petalInst.setMatrixAt(i, _pDummy.matrix);
    }
    petalInst.instanceMatrix.needsUpdate = true;
  }
  campusSet.add(petalInst);

  // Minato (with heavy backpack + rolled-up pale-gray hard floor sheet sticking out!)
  const minatoCampus = createRealisticHuman(baseMats, {
    role: 'minato',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: true,
  });
  const sheetRoll = new THREE.Mesh(
    new THREE.CylinderGeometry(0.048, 0.048, 0.62, 16),
    new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.75 })
  );
  sheetRoll.position.set(0.08, 1.38, -0.22);
  sheetRoll.rotation.z = -0.22;
  minatoCampus.root.add(sheetRoll);
  minatoCampus.root.position.set(-0.35, 0, -1.2);
  campusSet.add(minatoCampus.root);

  // Tadokoro ("田所") & 2 Classmates heading off toward station!
  const tadokoro = createRealisticHuman(baseMats, {
    role: 'tadokoro',
    topMat: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 }),
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: true,
  });
  tadokoro.root.position.set(0.65, 0, -1.5);
  tadokoro.root.rotation.y = -0.8;
  campusSet.add(tadokoro.root);

  const mate1 = createRealisticHuman(baseMats, {
    role: 'mate1',
    topMat: new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.82 }),
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  mate1.root.position.set(1.15, 0, -2.6);
  mate1.root.rotation.y = Math.PI;
  campusSet.add(mate1.root);

  // ===========================================================================
  // SET 2: 『コーポ武蔵野』203号室 — 硬質シート・外廊下裸電球103号室住人・みかん箱・新米・万力工房
  // ===========================================================================
  const apartmentSet = new THREE.Group();
  scene.add(apartmentSet);

  const roomWood = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 5.2), baseMats.woodFloor);
  roomWood.rotation.x = -Math.PI / 2;
  roomWood.receiveShadow = true;
  apartmentSet.add(roomWood);

  // Rigid Pale-Gray Hard Linoleum Floor Sheet ("硬質床シート") laid over wooden floor (edge exposed on right!)
  const linoleumMat = new THREE.MeshStandardMaterial({ color: 0xb4bcc8, roughness: 0.52, metalness: 0.04 });
  const roomLinoleum = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.005, 1.75), linoleumMat);
  roomLinoleum.position.set(-0.18, 0.0025, 0.45);
  roomLinoleum.receiveShadow = true;
  apartmentSet.add(roomLinoleum);

  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.6), baseMats.wallPaper);
  backWall.position.set(0, 1.3, -1.95);
  apartmentSet.add(backWall);

  // Open Thin Iron Doorway -> Night Exterior Hallway + Bare Warm Tungsten Bulb + Room 103 Neighbor!
  const doorwayGroup = new THREE.Group();
  doorwayGroup.position.set(-1.35, 0, 0.55);
  doorwayGroup.visible = false;
  // Interior wall panels left/right/top of open doorway (actual hollow opening!)
  const wallDoorL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.5, 1.4), baseMats.wallPaper);
  wallDoorL.position.set(0, 1.25, -1.18);
  const wallDoorR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.5, 1.4), baseMats.wallPaper);
  wallDoorR.position.set(0, 1.25, 1.18);
  const wallDoorTop = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.96), baseMats.wallPaper);
  wallDoorTop.position.set(0, 2.275, 0);
  // Hollow steel door jambs + lintel
  const jambL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 2.05, 0.06), baseMats.darkAnodized);
  jambL.position.set(0, 1.025, -0.45);
  const jambR = jambL.clone(); jambR.position.z = 0.45;
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.06, 0.96), baseMats.darkAnodized);
  lintel.position.set(0, 2.04, 0);
  // Swung-open thin iron apartment door
  const ironDoor = new THREE.Mesh(new THREE.BoxGeometry(0.035, 1.98, 0.84), new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.55, metalness: 0.45 }));
  ironDoor.position.set(-0.32, 1.0, 0.68);
  ironDoor.rotation.y = 0.72;
  // Warm bare tungsten hallway bulb + steel exterior hallway railing
  const bareBulb = new THREE.Mesh(new THREE.SphereGeometry(0.044, 16, 12), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
  bareBulb.position.set(-0.48, 1.96, -0.05);
  const bulbCord = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.25, 8), baseMats.darkAnodized);
  bulbCord.position.set(-0.48, 2.10, -0.05);
  const bulbLight = new THREE.PointLight(0xffcf70, 6.2, 5.2, 1.35);
  bulbLight.position.set(-0.48, 1.88, -0.05);
  const extFloor = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 4.2), baseMats.concrete);
  extFloor.rotation.x = -Math.PI / 2;
  extFloor.position.set(-1.3, 0.002, 0);
  const extRailTop = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 4.0), baseMats.darkAnodized);
  extRailTop.position.set(-1.45, 1.05, 0);

  const neighbor103 = createRealisticHuman(baseMats, {
    role: 'neighbor',
    topMat: new THREE.MeshStandardMaterial({ color: 0x3b485b, roughness: 0.78 }), // Tired salaryman suit jacket
    pantsMat: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.82 }),
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  neighbor103.root.position.set(-0.68, 0, -0.02);
  neighbor103.root.rotation.y = Math.PI * 0.5;
  neighbor103.head.rotation.x = 0.14; // Slightly bowed, exhausted plea
  doorwayGroup.add(wallDoorL, wallDoorR, wallDoorTop, jambL, jambR, lintel, ironDoor, bareBulb, bulbCord, bulbLight, extFloor, extRailTop, neighbor103.root);
  apartmentSet.add(doorwayGroup);

  // Satin Pore-Detailed Walnut Workbench (top y = 0.720m, z = -0.55m)
  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 0, -0.55);
  apartmentSet.add(deskGroup);

  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.028, 0.66), ngMats.walnutProMat);
  deskTop.position.y = 0.706;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  // Angled Kitchen Digital Scale (`1784 g`!)
  const scaleGroup = new THREE.Group();
  scaleGroup.position.set(0.08, 0.720, 0.05);
  scaleGroup.visible = false;
  const scBody = new THREE.Mesh(new THREE.BoxGeometry(0.172, 0.022, 0.215), baseMats.bambuWhite);
  scBody.position.y = 0.011;
  const scPan = new THREE.Mesh(new THREE.BoxGeometry(0.148, 0.004, 0.148), baseMats.brushedAlu);
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
  // SET 3: 鉄道高架下の河川敷広場 — 急行電車・青い架線火花・白ランタン・3mチョーク走路・10月の氷雨!
  // ===========================================================================
  const viaductSet = new THREE.Group();
  viaductSet.visible = false;
  scene.add(viaductSet);

  const concreteGround = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 22),
    new THREE.MeshStandardMaterial({ color: 0x3f434a, roughness: 0.94 })
  );
  concreteGround.rotation.x = -Math.PI / 2;
  concreteGround.receiveShadow = true;
  viaductSet.add(concreteGround);

  // Monumental Concrete Railway Viaduct Deck & 4 Massive Support Piers (framed cleanly so speeding express train is visible!)
  const concMat = new THREE.MeshStandardMaterial({ color: 0x565c66, roughness: 0.90 });
  const viaductDeck = new THREE.Mesh(new THREE.BoxGeometry(20, 0.48, 3.2), concMat);
  viaductDeck.position.set(0, 2.38, -1.6);
  viaductSet.add(viaductDeck);
  for (const px of [-4.2, -1.4, 1.4, 4.2]) {
    const pier = new THREE.Mesh(new THREE.BoxGeometry(0.72, 2.35, 0.80), concMat);
    pier.position.set(px, 1.175, -1.8);
    pier.castShadow = true;
    pier.receiveShadow = true;
    viaductSet.add(pier);
  }

  // Rushing Illuminated Express Train ("急行電車") on top of Viaduct + Blue Catenary Spark!
  const expressTrain = new THREE.Group();
  expressTrain.position.set(-6, 3.16, -1.5);
  const carMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.35, metalness: 0.6 });
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 });
  const winGlowMat = new THREE.MeshBasicMaterial({ color: 0xfef3c7 });
  for (let c = 0; c < 4; c++) {
    const car = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.08, 0.92), carMat);
    car.position.x = c * 3.65;
    expressTrain.add(car);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(3.42, 0.14, 0.94), stripeMat);
    stripe.position.set(c * 3.65, -0.22, 0);
    expressTrain.add(stripe);
    for (let w = 0; w < 4; w++) {
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.38), winGlowMat);
      win.position.set(c * 3.65 - 1.05 + w * 0.70, 0.14, 0.47);
      expressTrain.add(win);
    }
  }
  viaductSet.add(expressTrain);

  // Crackling Electric-Blue Pantograph Catenary Spark ("架線から散った青い火花")!
  const catenarySparkLight = new THREE.PointLight(0x38bdf8, 0, 14, 1.3);
  catenarySparkLight.position.set(0.4, 3.85, -0.8);
  const catenarySparkOrb = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.18, 0),
    new THREE.MeshBasicMaterial({ color: 0x7dd3fc })
  );
  catenarySparkOrb.position.set(0.4, 3.92, -1.1);
  catenarySparkOrb.visible = false;
  viaductSet.add(catenarySparkLight, catenarySparkOrb);

  // Hard Pale-Gray Linoleum Sprint Sheet + White Chalk 0m / 1m / 2m / 3m Lines under Viaduct!
  const viaductSheet = new THREE.Mesh(new THREE.BoxGeometry(1.10, 0.006, 3.60), linoleumMat);
  viaductSheet.position.set(0, 0.003, 1.55);
  viaductSheet.receiveShadow = true;
  viaductSet.add(viaductSheet);

  const chalkMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc, transparent: true, opacity: 0.88 });
  for (let m = 0; m <= 3; m++) {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(0.92, m === 3 ? 0.024 : 0.012), chalkMat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(0, 0.007, m * 1.0);
    viaductSet.add(line);
  }

  // White Camping Lantern + Stopwatch Display Board under Viaduct!
  props.lantern.position.set(-0.56, 0.006, 0.62);
  viaductSet.add(props.lantern);

  props.stopwatchBoard.position.set(-0.48, 0.26, 2.72);
  props.stopwatchBoard.rotation.y = 0.45;
  props.stopwatchBoard.visible = false;
  viaductSet.add(props.stopwatchBoard);

  // Falling October Ice-Rain Streaks ("十月の冷たい氷雨" — 120 instanced streaks!)
  const rainGeo = new THREE.BoxGeometry(0.004, 0.24, 0.004);
  const rainMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.55 });
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
  // Pose genuinely kneeling low beside HMD-01, bowing forward so his forehead touches the warm silver shoulder!
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
    roomLinoleum,
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
