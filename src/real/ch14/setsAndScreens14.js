import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createNextGenHandRig } from '../nextgen/pbrMicroTextures.js';
import { createHMD01Rev18Fighter } from '../ch09/hmd01Rev18Rig.js';
import { createCh10StoryProps } from '../ch10/qddAndHallProps.js';
import { createNewspaperSilhouetteWall } from '../ch11/ch11PropsAndRig.js';
import { createHMD02BodyRig, createCarbonFiberMaterial } from './hmd02BodyRig.js';
import {
  createWhiteTestBoneRig,
  createSteelGantry180cmRig,
  createUnboxingCncPartsRig,
  createHotCannedCoffeeRig,
} from './ch14PropsAndRig.js';

/**
 * Dynamic Laptop CAD & Factory Checkout Screens for Chapter 14:
 * 1. `cad_015mm`: 4:00 AM Nightmare — Left Hip Screw Hole Clearance = `0.15 mm` [COLLISION RISK!]
 * 2. `cad_115mm`: Relieved Fix — Shifted +1.0mm -> `1.15 mm` [SAFE!] + Quote `¥118,400`
 * 3. `order_start`: Red Order Button Pressed -> `製造開始 (IN PRODUCTION: CNC AL6061 + 4mm CARBON)`
 */
export function createCh14Screens() {
  const lapC = document.createElement('canvas');
  lapC.width = 1024; lapC.height = 640;
  const lx = lapC.getContext('2d');
  const lapTex = new THREE.CanvasTexture(lapC);
  lapTex.colorSpace = THREE.SRGBColorSpace;
  const laptopScreenMat = new THREE.MeshBasicMaterial({ map: lapTex });

  let lastMode = '';
  function updateLaptop(mode) {
    if (mode === lastMode) return;
    lastMode = mode;

    lx.fillStyle = '#090e1a'; lx.fillRect(0, 0, 1024, 640);
    lx.fillStyle = '#1e293b'; lx.fillRect(0, 0, 1024, 52);
    lx.fillStyle = '#38bdf8'; lx.font = '800 22px monospace';
    lx.fillText('CAD INTERFERENCE CHECK // HMD-02 LEFT HIP CNC ALUMINUM BLOCK', 28, 34);

    // CAD Blueprint Grid
    lx.strokeStyle = 'rgba(56, 189, 248, 0.14)'; lx.lineWidth = 1.5;
    for (let x = 32; x < 992; x += 40) { lx.beginPath(); lx.moveTo(x, 68); lx.lineTo(x, 420); lx.stroke(); }
    for (let y = 68; y < 420; y += 40) { lx.beginPath(); lx.moveTo(32, y); lx.lineTo(992, y); lx.stroke(); }

    // Left-side CAD schematic showing Motor Rim vs M4 Bolt Head!
    const fixed = mode !== 'cad_015mm';
    lx.strokeStyle = '#94a3b8'; lx.lineWidth = 8;
    lx.beginPath(); lx.arc(216, 248, 118, 0, Math.PI * 2); lx.stroke();
    lx.fillStyle = '#cbd5e1'; lx.font = '700 19px monospace';
    lx.fillText('80mm MOTOR RIM', 136, 255);

    const boltX = fixed ? 392 : 356;
    lx.fillStyle = fixed ? '#34d399' : '#ef4444';
    lx.beginPath(); lx.arc(boltX, 248, 17, 0, Math.PI * 2); lx.fill();
    lx.strokeStyle = '#f8fafc'; lx.lineWidth = 3;
    lx.beginPath(); lx.arc(boltX, 248, 17, 0, Math.PI * 2); lx.stroke();

    // Dimension Callout (fits cleanly with generous right margin!)
    lx.fillStyle = fixed ? '#34d399' : '#f87171';
    lx.font = '900 36px monospace';
    lx.fillText(fixed ? 'GAP: 1.15 mm [SAFE!]' : 'GAP: 0.15 mm [DANGER!]', 442, 174);
    lx.fillStyle = '#cbd5e1'; lx.font = '700 22px sans-serif';
    lx.fillText(fixed ? '▶ 穴位置を +1.0mm 外側へ修正完了！' : '▶ 左股関節奥のネジ頭がモーター縁に干渉寸前！', 442, 234);
    lx.fillStyle = '#fef08a'; lx.font = '900 29px monospace';
    lx.fillText('海外特注CNC＋4mm炭素見積：¥118,400', 442, 312);
    lx.fillStyle = '#94a3b8'; lx.font = '700 20px sans-serif';
    lx.fillText('※ 0.3mm狂えば12万円が黒い鉄くずに — やり直し不可', 442, 360);

    // Bottom Order Status Banner
    if (mode === 'order_start') {
      lx.fillStyle = '#065f46'; lx.fillRect(32, 448, 960, 152);
      lx.strokeStyle = '#10b981'; lx.lineWidth = 5; lx.strokeRect(32, 448, 960, 152);
      lx.fillStyle = '#a7f3d0'; lx.font = '900 40px sans-serif';
      lx.fillText('✓ 決済完了 ¥118,400 —— 【 製造開始 】', 58, 518);
      lx.fillStyle = '#fde68a'; lx.font = '800 24px sans-serif';
      lx.fillText('白い仮骨3回チェック完遂：黒アルマイトCNCアルミ＆4mm炭素繊維 発注確定！', 58, 572);
    } else {
      lx.fillStyle = '#7f1d1d'; lx.fillRect(32, 448, 960, 152);
      lx.strokeStyle = '#ef4444'; lx.lineWidth = 5; lx.strokeRect(32, 448, 960, 152);
      lx.fillStyle = '#fecaca'; lx.font = '900 31px sans-serif';
      lx.fillText('午前4時の冷や汗 —— まず白いPLA仮骨を原寸大印刷して確認！', 50, 536);
    }
    lapTex.needsUpdate = true;
  }
  updateLaptop('cad_015mm');

  return { laptopScreenMat, updateLaptop };
}

/**
 * Builds ALL Chapter 14 Monumental Photographic PBR Sets:
 * 1. `room203Set` (4AM CAD/Test-Bone/Unboxing Desk Mode + Full 180cm Steel Safety Gantry + Suspended 720mm HMD-02 + Half-Folded Futon + Bookshelf HMD-01!)
 * 2. `konbiniBackroomSet` (Rainy Friday Midnight Convenience Store Backroom with Stacked Cardboard, Rain Streaks, Manager & Steaming Canned Coffee!)
 */
export function createCh14World(scene, baseMats, ngMats, screens, masterLib) {
  const { pbr } = masterLib;

  const sharedCarbonMat = createCarbonFiberMaterial();
  const hmd02 = createHMD02BodyRig(baseMats, sharedCarbonMat);
  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats, masterLib);
  heroFighter.setBattleState({ scratched: true, hipCracked: true, silverSplints: true });
  const ch10Props = createCh10StoryProps(baseMats, ngMats);
  const newsWall = createNewspaperSilhouetteWall(baseMats);

  const whiteTestBone = createWhiteTestBoneRig(baseMats);
  const gantryRig = createSteelGantry180cmRig(baseMats, pbr);
  const unboxingRig = createUnboxingCncPartsRig(baseMats, sharedCarbonMat);
  const coffeeCan = createHotCannedCoffeeRig(baseMats);

  // Fingernail-detailed right hand for CAD/unboxing precision fit & lifting HMD-02's right ankle & fist-bumping its black knee!
  const macroHand = createNextGenHandRig(baseMats, ngMats, 1);
  macroHand.group.visible = false;
  scene.add(macroHand.group);

  // ===========================================================================
  // SET 1: 『コーポ武蔵野』203号室 — 机の白仮骨・5月5日黒CNC開封・中央180cm鉄パイプ吊り櫓・72cm HMD-02降臨!
  // ===========================================================================
  const room203Set = new THREE.Group();
  scene.add(room203Set);

  const roomFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.6, 5.8),
    pbr.get('darkWalnutStripFloor', { repeatX: 4, repeatY: 4 })
  );
  roomFloor.rotation.x = -Math.PI / 2; roomFloor.receiveShadow = true;
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(5.8, 3.0),
    pbr.get('wallpaperWhiteWoven', { repeatX: 4, repeatY: 2 })
  );
  backWall.position.set(0, 1.5, -1.85);
  const sideWallL = new THREE.Mesh(
    new THREE.PlaneGeometry(5.8, 3.0),
    pbr.get('wallpaperWhiteWoven', { repeatX: 4, repeatY: 2 })
  );
  sideWallL.rotation.y = Math.PI / 2;
  sideWallL.position.set(-1.68, 1.5, 0.4);
  room203Set.add(roomFloor, backWall, sideWallL);

  // Honored Top Bookshelf with Tiny 38cm `HMD-01` Looking Down at Giant 72cm `HMD-02`!
  const shelfGroup = new THREE.Group();
  const shelfWood = pbr.get('parquetWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x9c724c });
  const shelfTop = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.026, 0.34), shelfWood);
  shelfTop.position.set(-1.12, 1.32, -1.58);
  const shelfL = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.72, 0.34), shelfWood);
  shelfL.position.set(-1.58, 0.96, -1.58);
  const shelfR = shelfL.clone(); shelfR.position.x = -0.66;
  ch10Props.certCard.position.set(-0.88, 1.385, -1.56);
  ch10Props.certCard.rotation.set(-0.18, -0.15, 0);
  heroFighter.root.position.set(-1.18, 1.334, -1.56);
  heroFighter.root.rotation.set(0, 0.36, 0);
  heroFighter.setPose({
    pelvisPos: [0, 0.095, 0], pelvisRot: [-0.14, 0, 0],
    leftFootPos: [0.046, 0.02, 0.145], rightFootPos: [-0.046, 0.02, 0.145],
    leftArmPitch: 0.35, rightArmPitch: 0.35, leftArmRoll: 0.14, rightArmRoll: -0.14,
    pivotRotX: 0, pivotPosY: 0,
  });
  shelfGroup.add(shelfTop, shelfL, shelfR, ch10Props.certCard, heroFighter.root);
  room203Set.add(shelfGroup);

  // 720mm Newspaper Silhouette on Back Wall
  newsWall.group.position.set(0.28, 0.72, -1.82);
  newsWall.updateSilhouette(1.0);
  room203Set.add(newsWall.group);

  // Workbench Desk (pushed against back-right wall when Gantry is active, or centered for desk scenes!)
  const deskGroup = new THREE.Group();
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.48, 0.036, 0.78),
    pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x8d6342 })
  );
  deskTop.position.set(0, 0.72, -0.52);
  deskTop.castShadow = true; deskTop.receiveShadow = true;
  for (const lx of [-0.68, 0.68]) {
    for (const lz of [-0.86, -0.18]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.72, 0.038), baseMats.blackAnodized);
      leg.position.set(lx, 0.36, lz);
      deskGroup.add(leg);
    }
  }
  deskGroup.add(deskTop);

  // Laptop on Desk
  const laptopGroup = new THREE.Group();
  laptopGroup.position.set(0.0, 0.738, -0.58);
  const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.012, 0.22), baseMats.aluminumBrushed);
  lapBase.position.y = 0.006;
  const lapLid = new THREE.Group();
  lapLid.position.set(0, 0.012, -0.105);
  lapLid.rotation.x = -0.18;
  const lidBack = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.22, 0.008), baseMats.aluminumBrushed);
  lidBack.position.y = 0.11;
  const lidScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.20), screens.laptopScreenMat);
  lidScreen.position.set(0, 0.11, 0.005);
  lapLid.add(lidBack, lidScreen);
  laptopGroup.add(lapBase, lapLid);

  whiteTestBone.group.position.set(0.0, 0.738, -0.44);
  unboxingRig.group.position.set(0.0, 0.738, -0.48);

  deskGroup.add(laptopGroup, whiteTestBone.group, unboxingRig.group);
  room203Set.add(deskGroup);

  // Monumental 180cm Steel Pipe Safety Gantry + Suspended 720mm HMD-02 + Cross-Legged Minato on Half-Folded Futon!
  gantryRig.group.position.set(0.08, 0.0, 0.18);
  room203Set.add(gantryRig.group);

  // Mount `HMD-02` cleanly suspended 2cm above the 2.4cm rubber mat (`y = 0.044`) inside the iron gantry!
  hmd02.root.position.set(0.08, 0.044, 0.18);
  hmd02.root.rotation.y = 0.0;
  room203Set.add(hmd02.root);

  // Cross-Legged Minato sitting on the narrow futon eye-to-eye with 720mm `HMD-02` ("胡座をかいて座った")!
  const minatoSit = createRealisticHuman(baseMats, {
    role: 'minato_sit_ch14',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoSit.root.position.set(-0.82, -0.68, 0.36);
  minatoSit.root.rotation.y = Math.PI * 0.42;
  minatoSit.leftLeg.hipJoint.rotation.set(-1.45, 0.35, 0.35);
  minatoSit.leftLeg.kneeJoint.rotation.x = 1.65;
  minatoSit.rightLeg.hipJoint.rotation.set(-1.45, -0.35, -0.35);
  minatoSit.rightLeg.kneeJoint.rotation.x = 1.65;
  room203Set.add(minatoSit.root);

  // Subtle holographic virtual training clone outlines flanking HMD-02 in the final 5s teasing Chapter 15!
  const cloneHoloGroup = new THREE.Group();
  const cloneMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.0,
  });
  const cloneOffsets = [[-0.42, -0.25], [0.42, -0.25], [-0.72, -0.52], [0.72, -0.52]];
  for (const [cx, cz] of cloneOffsets) {
    const cg = new THREE.Group();
    cg.position.set(0.08 + cx, 0.044, 0.18 + cz);
    const ct = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.22, 0.09), cloneMat); ct.position.y = 0.50;
    const ch = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.08), cloneMat); ch.position.y = 0.66;
    const cl = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, 0.06), cloneMat); cl.position.set(-0.06, 0.19, 0);
    const cr = cl.clone(); cr.position.x = 0.06;
    cg.add(ct, ch, cl, cr);
    cloneHoloGroup.add(cg);
  }
  room203Set.add(cloneHoloGroup);

  // ===========================================================================
  // SET 2: 金曜深夜・小雨のコンビニバックヤード — 潰した段ボール・無愛想な店長＆温かい缶コーヒー!
  // ===========================================================================
  const konbiniBackroomSet = new THREE.Group();
  konbiniBackroomSet.visible = false;
  scene.add(konbiniBackroomSet);

  const wetGround = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 16),
    pbr.get('crackedDarkAsphalt', { repeatX: 5, repeatY: 5, tint: 0x334155 })
  );
  wetGround.rotation.x = -Math.PI / 2; wetGround.receiveShadow = true;

  const backWallMetal = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 3.6),
    pbr.get('corrugatedZincSteel', { repeatX: 4, repeatY: 2, tint: 0x64748b })
  );
  backWallMetal.position.set(0, 1.8, -2.4);

  const doorMetal = new THREE.Mesh(
    new THREE.PlaneGeometry(1.15, 2.2),
    pbr.get('industrialSteelDoor', { repeatX: 1, repeatY: 1 })
  );
  doorMetal.position.set(-1.6, 1.1, -2.36);

  // Stack of Flattened Cardboard Boxes ("バックヤードで段ボールを潰していると")
  const cbMat = new THREE.MeshStandardMaterial({ color: 0x9a774f, roughness: 0.90 });
  for (let i = 0; i < 6; i++) {
    const cb = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.065, 0.52), cbMat);
    cb.position.set(-1.15, 0.035 + i * 0.068, -1.45);
    cb.rotation.y = (i % 2 === 0 ? 0.06 : -0.04);
    konbiniBackroomSet.add(cb);
  }

  // Minato in Convenience Store Part-Time Apron Vest holding the Steaming Hot Canned Coffee!
  const minatoKonbini = createRealisticHuman(baseMats, {
    role: 'minato_konbini',
    topMat: new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.78 }), // Green konbini uniform!
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoKonbini.root.position.set(-0.55, 0, -1.05);
  minatoKonbini.root.rotation.y = Math.PI * 0.36;
  minatoKonbini.rightArm.shoulder.rotation.set(-0.68, 0, -0.10);
  minatoKonbini.rightArm.elbow.rotation.set(-0.65, 0, 0);
  coffeeCan.group.position.set(0.02, -0.02, 0.06);
  minatoKonbini.rightArm.wrist.add(coffeeCan.group);

  // Gruff Night-Shift Store Manager ("無愛想な店長")
  const managerKonbini = createRealisticHuman(baseMats, {
    role: 'manager_konbini',
    topMat: new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.80 }),
    pantsMat: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.88 }),
    hairMat: new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.85 }),
    hasBackpack: false,
  });
  managerKonbini.root.position.set(0.58, 0, -1.15);
  managerKonbini.root.rotation.y = -Math.PI * 0.38;
  managerKonbini.rightArm.shoulder.rotation.set(-0.45, 0, 0.10);

  // 140 Instanced Midnight Rain Streaks ("小雨の降る金曜深夜")!
  const rainInst = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.004, 0.24, 0.004),
    new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.48 }),
    140
  );
  const _rd = new THREE.Object3D();
  function updateRain(t) {
    for (let i = 0; i < 140; i++) {
      const rx = ((i * 0.61) % 7.0) - 3.5;
      const ry = 3.8 - (((i * 0.43 + t * 5.2) % 3.8));
      const rz = -2.2 + ((i * 0.37) % 4.5);
      _rd.position.set(rx, ry, rz);
      _rd.rotation.z = 0.08;
      _rd.updateMatrix();
      rainInst.setMatrixAt(i, _rd.matrix);
    }
    rainInst.instanceMatrix.needsUpdate = true;
  }

  konbiniBackroomSet.add(wetGround, backWallMetal, doorMetal, minatoKonbini.root, managerKonbini.root, rainInst);

  function setActiveSet(name) {
    room203Set.visible = name === 'room203';
    konbiniBackroomSet.visible = name === 'konbini';
  }

  return {
    setActiveSet,
    deskGroup,
    shelfGroup,
    laptopGroup,
    newsWall,
    whiteTestBone,
    gantryRig,
    unboxingRig,
    hmd02,
    minatoSit,
    cloneHoloGroup,
    cloneMat,
    macroHand,
    coffeeCan,
    minatoKonbini,
    managerKonbini,
    updateRain,
  };
}
