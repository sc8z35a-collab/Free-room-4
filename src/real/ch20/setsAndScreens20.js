import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createHMD01Rev18Fighter } from '../ch09/hmd01Rev18Rig.js';
import { createCh10StoryProps } from '../ch10/qddAndHallProps.js';
import { createCarbonFiberMaterial } from '../ch14/hmd02BodyRig.js';
import { createSteelGantry180cmRig } from '../ch14/ch14PropsAndRig.js';
import { createHMD02CompleteRig } from '../ch17/hmd02CompleteRig.js';
import { createDawnCampusPromenadeRig } from './ch20DawnCampusRig.js';

/**
 * Dynamic 520-Day Final Ledger & Journey Summary Screen for Chapter 20!
 */
export function createCh20Screens() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 576;
  const ctx = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const ledgerScreenMat = new THREE.MeshBasicMaterial({ map: tex });

  ctx.fillStyle = '#070c16'; ctx.fillRect(0, 0, 1024, 576);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(0, 0, 1024, 56);
  ctx.fillStyle = '#fde68a'; ctx.font = '900 24px monospace';
  ctx.fillText('FINAL SIMULATION LEDGER // DAY 001 (APR 6) -> DAY 520 (SEP 7)', 24, 37);

  ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.strokeRect(32, 76, 960, 326);
  const rows = [
    ['初期開発資金（大学1年・4月6日）', '  ¥185,000', '#cbd5e1', 128],
    ['17ヶ月間の労働収入（深夜コンビニ・塾・倉庫バイト）', '+ ¥1,064,000', '#34d399', 184],
    ['累計開発投資（部品・工具・失敗のみかん箱すべて）', '- ¥921,880', '#fb923c', 240],
    ['親からの仕送り使用額', '        ¥0', '#7dd3fc', 296],
    ['Day 520 最終口座残高（完全単独開発）', '  ¥327,120', '#fde047', 362],
  ];
  rows.forEach(([label, val, col, y]) => {
    ctx.fillStyle = '#e2e8f0'; ctx.font = y === 362 ? '900 26px sans-serif' : '700 23px sans-serif';
    ctx.fillText(label, 58, y);
    ctx.fillStyle = col; ctx.font = y === 362 ? '900 32px monospace' : '800 26px monospace';
    ctx.fillText(val, 736, y);
  });

  ctx.fillStyle = '#064e3b'; ctx.fillRect(32, 424, 960, 124);
  ctx.strokeStyle = '#10b981'; ctx.lineWidth = 4; ctx.strokeRect(32, 424, 960, 124);
  ctx.fillStyle = '#a7f3d0'; ctx.font = '900 30px sans-serif';
  ctx.fillText('HMD-01 (380mm / 1.78kg) → HMD-02 (720.0mm / 8.18kg / 16-DOF)', 54, 476);
  ctx.fillStyle = '#fde68a'; ctx.font = '800 23px sans-serif';
  ctx.fillText('▶ Day 520 午前5時05分 — ビブラムソール装着完了！ 夜明けのアスファルトへ！', 54, 522);
  tex.needsUpdate = true;

  return { ledgerScreenMat };
}

export function createCh20World(scene, baseMats, ngMats, screens, masterLib) {
  const { pbr } = masterLib;
  const sharedCarbonMat = createCarbonFiberMaterial();

  // COMPLETE 16-DOF `HMD-02` WITH VIBRAM GROOVED OUTDOOR LUG SOLES & GOLD RESISTOR!
  const hmd02Campus = createHMD02CompleteRig(baseMats, {
    sharedCarbonMat, hasUpperBody: true, hasGoldResistor: true, hasVibramSoles: true,
  });
  const hmd02Room = createHMD02CompleteRig(baseMats, {
    sharedCarbonMat, hasUpperBody: true, hasGoldResistor: true, hasVibramSoles: true,
  });

  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats, masterLib);
  heroFighter.setBattleState({ scratched: true, hipCracked: true, silverSplints: true });
  const ch10Props = createCh10StoryProps(baseMats, ngMats);
  const gantryRig = createSteelGantry180cmRig(baseMats, pbr);
  const campusRig = createDawnCampusPromenadeRig(baseMats, pbr);

  // ===========================================================================
  // SET 1: Day 519 深夜の203号室（ビブラムソール装着・みかん箱・520日家計簿・HMD-01＆HMD-02）
  // ===========================================================================
  const room519Set = new THREE.Group();
  scene.add(room519Set);

  const rFloor = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 5.8), pbr.get('darkWalnutStripFloor', { repeatX: 4, repeatY: 4 }));
  rFloor.rotation.x = -Math.PI / 2; rFloor.receiveShadow = true;
  const rWall = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 3.0), pbr.get('wallpaperWhiteWoven', { repeatX: 4, repeatY: 2 }));
  rWall.position.set(0, 1.5, -1.85);
  room519Set.add(rFloor, rWall);

  // Top Shelf w/ Retired HMD-01
  const shelfWood = pbr.get('parquetWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x9c724c });
  const shelfTop = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.026, 0.34), shelfWood);
  shelfTop.position.set(-1.12, 1.32, -1.58);
  const shelfL = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.72, 0.34), shelfWood);
  shelfL.position.set(-1.58, 0.96, -1.58);
  const shelfR = shelfL.clone(); shelfR.position.x = -0.66;
  ch10Props.certCard.position.set(-0.88, 1.385, -1.56);
  heroFighter.root.position.set(-1.18, 1.334, -1.56);
  heroFighter.root.rotation.set(0, 0.36, 0);
  heroFighter.setPose({
    pelvisPos: [0, 0.095, 0], pelvisRot: [-0.14, 0, 0],
    leftFootPos: [0.046, 0.02, 0.145], rightFootPos: [-0.046, 0.02, 0.145],
    leftArmPitch: 0.35, rightArmPitch: 0.35, leftArmRoll: 0.14, rightArmRoll: -0.14,
    pivotRotX: 0, pivotPosY: 0,
  });
  room519Set.add(shelfTop, shelfL, shelfR, ch10Props.certCard, heroFighter.root);

  // Desk + 520-Day Final Ledger Monitor + Macro Vibram Sole Boot Bench!
  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.036, 0.78), pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x8d6342 }));
  deskTop.position.set(0, 0.72, -1.22);
  const monGroup = new THREE.Group();
  monGroup.position.set(0, 0.738, -1.42);
  const mFrame = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.38, 0.022), baseMats.blackAnodized);
  mFrame.position.y = 0.28;
  const mFace = new THREE.Mesh(new THREE.PlaneGeometry(0.61, 0.345), screens.ledgerScreenMat);
  mFace.position.set(0, 0.28, 0.013);
  monGroup.add(mFrame, mFace);
  room519Set.add(deskTop, monGroup);

  // Nostalgic Tangerine Cardboard Box (`みかんの空き箱`) filled with 17 months of failed parts!
  const mikanBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.24, 0.28),
    new THREE.MeshStandardMaterial({ color: 0xb08a5a, roughness: 0.88 })
  );
  mikanBox.position.set(0.86, 0.12, -1.05);
  mikanBox.rotation.y = -0.25;
  room519Set.add(mikanBox);

  // Macro Vibram Lug Sole Showcase on Desk (`登山靴用ビブラムソール貼り付け`)
  const vibramMacro = new THREE.Group();
  vibramMacro.position.set(0, 0.76, -0.96);
  const metalFoot = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.018, 0.22), baseMats.blackAnodized);
  metalFoot.position.y = 0.022;
  const lugBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.116, 0.012, 0.228),
    new THREE.MeshStandardMaterial({ color: 0x1e242d, roughness: 0.92 })
  );
  lugBase.position.y = 0.008;
  for (let i = -4; i <= 4; i++) {
    const lug = new THREE.Mesh(
      new THREE.BoxGeometry(0.108, 0.008, 0.014),
      new THREE.MeshStandardMaterial({ color: 0x2a313c, roughness: 0.88 })
    );
    lug.position.set(0, 0.036, i * 0.023); // flipped sole-up so treads shine clearly to camera!
    vibramMacro.add(lug);
  }
  const yellowBadge = new THREE.Mesh(
    new THREE.BoxGeometry(0.032, 0.004, 0.020),
    new THREE.MeshBasicMaterial({ color: 0xfacc15 }) // Iconic yellow Vibram octagon badge!
  );
  yellowBadge.position.set(0, 0.037, 0);
  vibramMacro.add(metalFoot, lugBase, yellowBadge);
  room519Set.add(vibramMacro);

  gantryRig.group.position.set(0.0, 0, 0.35);
  if (gantryRig.beltStrap) gantryRig.beltStrap.visible = false;
  if (gantryRig.carabiner) gantryRig.carabiner.visible = false;
  hmd02Room.root.position.set(0.0, 0.042, 0.35);
  room519Set.add(gantryRig.group, hmd02Room.root);

  // ===========================================================================
  // SET 2: Day 520 夜明けの東都農工大学 欅並木プロムナード（朝日・点字ブロック・小石・倉田先輩・駐輪場！）
  // ===========================================================================
  const dawnCampusSet = new THREE.Group();
  dawnCampusSet.visible = false;
  scene.add(dawnCampusSet);
  dawnCampusSet.add(campusRig.group, hmd02Campus.root);

  // Minato walking side-by-side with HMD-02 (hands comfortably in his navy hoodie pockets!)
  const minatoCampus = createRealisticHuman(baseMats, {
    role: 'minato_day520_finale',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  dawnCampusSet.add(minatoCampus.root);

  // Senior Kurata (`四年生・白衣の上から作業ブルゾン・缶コーヒー片手`) outside the Research Building!
  const kurataCampus = createRealisticHuman(baseMats, {
    role: 'kurata_day520',
    topMat: new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.78 }), // Lab coat!
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  kurataCampus.root.position.set(2.85, 0, -15.5);
  kurataCampus.root.rotation.y = -Math.PI * 0.62;
  // Warm canned coffee held up in Kurata's right hand to toast Minato ("完敗だよ、佐伯。いい相棒になったな")!
  const coffeeCan = new THREE.Mesh(
    new THREE.CylinderGeometry(0.026, 0.026, 0.095, 16),
    new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.75, roughness: 0.25 })
  );
  coffeeCan.position.set(0, -0.28, 0.03);
  kurataCampus.rightArm.elbow.add(coffeeCan);
  dawnCampusSet.add(kurataCampus.root);

  function setActiveSet(name) {
    room519Set.visible = name === 'room519';
    dawnCampusSet.visible = name === 'dawnCampus';
  }

  return {
    setActiveSet,
    hmd02Room,
    hmd02Campus,
    vibramMacro,
    campusRig,
    minatoCampus,
    kurataCampus,
  };
}
