import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createHMD01Rev18Fighter } from '../ch09/hmd01Rev18Rig.js';
import { createCh10StoryProps } from '../ch10/qddAndHallProps.js';
import { createHMD02BodyRig, createCarbonFiberMaterial } from '../ch14/hmd02BodyRig.js';
import { createSteelGantry180cmRig } from '../ch14/ch14PropsAndRig.js';
import {
  createWorkstationRtx3090Rig,
  createSysIdMeasurementRig,
  createVirtualCloneArmyRig,
  createImpulseArrow3D,
} from './ch15PropsAndRig.js';

/**
 * Dynamic Wide PC Monitor Displays for Chapter 15:
 * 1. `pain_rules`: Physical-Pain Reward Rewrite (`-I²R / -Impact / +Rhythm / +5kg Push`) + 300M-Step Learning Curve!
 * 2. `policy_ready`: `300,000,000 STEPS COMPLETE · 1.2 MB NEURAL POLICY READY FOR REAL HMD-02`
 */
export function createCh15Screens() {
  const monC = document.createElement('canvas');
  monC.width = 1024; monC.height = 576;
  const mx = monC.getContext('2d');
  const monTex = new THREE.CanvasTexture(monC);
  monTex.colorSpace = THREE.SRGBColorSpace;
  const monitorScreenMat = new THREE.MeshBasicMaterial({ map: monTex });

  let lastMode = '';
  function updateMonitor(mode) {
    if (mode === lastMode) return;
    lastMode = mode;

    mx.fillStyle = '#090e18'; mx.fillRect(0, 0, 1024, 576);
    mx.fillStyle = '#1e293b'; mx.fillRect(0, 0, 1024, 48);
    mx.fillStyle = '#38bdf8'; mx.font = '800 21px monospace';
    mx.fillText('ISAAC LAB // RTX 3090 24GB · 4,096 PARALLEL ENVS · PPO TRAINING', 24, 31);

    // Left Half: Soaring 300-Million-Step Reward Learning Curve!
    mx.strokeStyle = '#334155'; mx.lineWidth = 2; mx.strokeRect(28, 72, 476, 332);
    mx.fillStyle = '#94a3b8'; mx.font = '700 18px monospace';
    mx.fillText('MEAN EPISODE REWARD (0 -> 300,000,000 STEPS)', 42, 98);
    // Curve dips into valley Saturday dawn then soars smoothly to ceiling Sunday!
    mx.strokeStyle = '#34d399'; mx.lineWidth = 5;
    mx.beginPath();
    const pts = [
      [44, 368], [96, 342], [148, 382], [205, 318], [268, 224], [336, 154], [410, 126], [488, 120],
    ];
    pts.forEach(([x, y], i) => (i === 0 ? mx.moveTo(x, y) : mx.lineTo(x, y)));
    mx.stroke();
    mx.fillStyle = '#fbbf24'; mx.font = '700 18px sans-serif';
    mx.fillText('土曜未明の谷', 112, 396);
    mx.fillStyle = '#34d399';
    mx.fillText('日曜・人間歩行収束！', 302, 114);

    // Right Half: Physical-Pain Reward Formula (`現実の身体の痛み`)
    mx.fillStyle = '#f8fafc'; mx.font = '900 26px sans-serif';
    mx.fillText('書き換えた『現実の身体の痛み』報酬則', 528, 104);
    const rules = [
      ['1. 銅線発熱ペナルティ', '-w₁ · Σ (I² R)  [省エネ膝伸展]', '#f87171'],
      ['2. 着地衝撃ペナルティ', '-w₂ · F_impact  [静かな着地]', '#fb923c'],
      ['3. 交互歩行リズム報酬', '+w₃ · Rhythm    [メトロノーム]', '#34d399'],
      ['4. ランダム5kg横外乱', 'Push every 3.0s [反射回復訓練]', '#38bdf8'],
    ];
    rules.forEach(([title, eq, col], idx) => {
      const y = 158 + idx * 62;
      mx.fillStyle = col; mx.font = '800 22px sans-serif'; mx.fillText(title, 532, y);
      mx.fillStyle = '#cbd5e1'; mx.font = '700 19px monospace'; mx.fillText(eq, 532, y + 26);
    });

    // Bottom Status Banner
    if (mode === 'policy_ready') {
      mx.fillStyle = '#064e3b'; mx.fillRect(28, 428, 968, 124);
      mx.strokeStyle = '#10b981'; mx.lineWidth = 4; mx.strokeRect(28, 428, 968, 124);
      mx.fillStyle = '#a7f3d0'; mx.font = '900 32px sans-serif';
      mx.fillText('✓ 累計三億歩 学習完了 —— 神経ファイル: 1.2 MB [EXPORTED]', 52, 480);
      mx.fillStyle = '#fde68a'; mx.font = '800 23px sans-serif';
      mx.fillText('▶ 膝伸展省電力歩行 ＆ 5kg横衝撃クロスステップ復帰 獲得！ 実機移植へ！', 52, 526);
    } else {
      mx.fillStyle = '#1e293b'; mx.fillRect(28, 428, 968, 124);
      mx.strokeStyle = '#38bdf8'; mx.lineWidth = 4; mx.strokeRect(28, 428, 968, 124);
      mx.fillStyle = '#7dd3fc'; mx.font = '900 30px sans-serif';
      mx.fillText('▶ 4,096体の分身が十数年分（累計三億歩）の夢を並列学習中…', 52, 484);
      mx.fillStyle = '#cbd5e1'; mx.font = '700 22px monospace';
      mx.fillText('GPU: RTX 3090 24GB  |  POWER: 350W  |  TEMP: 79°C  |  STEPS/S: 142,000', 52, 528);
    }
    monTex.needsUpdate = true;
  }
  updateMonitor('pain_rules');

  // Lecture Hall Chalkboard with Maxwell's Equations (`電磁気学Ⅱ`)
  const blkC = document.createElement('canvas');
  blkC.width = 768; blkC.height = 320;
  const bx = blkC.getContext('2d');
  bx.fillStyle = '#163829'; bx.fillRect(0, 0, 768, 320);
  bx.fillStyle = 'rgba(248,250,252,0.88)'; bx.font = '700 34px serif';
  bx.fillText('電磁気学Ⅱ — Maxwell Equations', 42, 68);
  bx.font = '700 30px monospace';
  bx.fillText('∇ × E = - ∂B / ∂t', 68, 148);
  bx.fillText('∇ × H = J + ∂D / ∂t', 68, 212);
  bx.fillStyle = '#fde68a'; bx.font = '700 24px monospace';
  bx.fillText('P_loss = I² R  (Joule Heating)', 310, 268);
  const blkTex = new THREE.CanvasTexture(blkC); blkTex.colorSpace = THREE.SRGBColorSpace;
  const chalkBoardMat = new THREE.MeshStandardMaterial({ map: blkTex, roughness: 0.92 });

  return { monitorScreenMat, updateMonitor, chalkBoardMat };
}

/**
 * Builds ALL 4 Monumental Chapter 15 Sets:
 * 1. `trainCartSet`: Evening Chuo-Line Train w/ Minato bracing 16kg RTX 3090 Full-Tower on Folding Carry Cart
 * 2. `room203Set`: Room 203 w/ Roaring RTX 3090 Under Desk, 0.1g Scale + Knife-Edge Ruler + Twin Piano-Wire Bifilar Pendulum + Sleeping Real 720mm HMD-02!
 * 3. `virtualArenaSet`: Endless Misty Gray Gridded `Isaac Lab` 3D Arena w/ 400 Instanced 3D Clones + Full-Detail Hero 720mm HMD-02 + 3D 5kgf Impulse Arrow!
 * 4. `lectureHallSet`: Rainy June `電磁気学Ⅱ` University Lecture Room w/ Minato & Tadokoro!
 */
export function createCh15World(scene, baseMats, ngMats, screens, masterLib) {
  const { pbr } = masterLib;

  const sharedCarbonMat = createCarbonFiberMaterial();
  const realHmd02 = createHMD02BodyRig(baseMats, sharedCarbonMat);
  const heroVirtualHmd02 = createHMD02BodyRig(baseMats, sharedCarbonMat);
  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats, masterLib);
  heroFighter.setBattleState({ scratched: true, hipCracked: true, silverSplints: true });
  const ch10Props = createCh10StoryProps(baseMats, ngMats);

  const gantryRig = createSteelGantry180cmRig(baseMats, pbr);
  const workstationRoom = createWorkstationRtx3090Rig(baseMats);
  const workstationTrain = createWorkstationRtx3090Rig(baseMats);
  workstationTrain.cartGroup.visible = true;
  const sysIdRig = createSysIdMeasurementRig(baseMats, sharedCarbonMat);
  const cloneArmy = createVirtualCloneArmyRig(baseMats);
  const impulseArrow = createImpulseArrow3D();

  // ===========================================================================
  // SET 1: 中央線・夕暮れの車内 — 折りたたみキャリーカートに縛った16kg中古RTX 3090鉄箱を両足で挟む湊!
  // ===========================================================================
  const trainCartSet = new THREE.Group();
  scene.add(trainCartSet);

  const tFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 3.6),
    pbr.get('carpetTileDark', { repeatX: 3, repeatY: 2, tint: 0x64748b })
  );
  tFloor.rotation.x = -Math.PI / 2;
  const tWall = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 2.6),
    pbr.get('archWhiteConcrete', { repeatX: 3, repeatY: 1, tint: 0xdbe2ea })
  );
  tWall.position.set(0, 1.3, -1.2);
  const tWin = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 1.15),
    new THREE.MeshBasicMaterial({ color: 0x9a3412 }) // Warm May 13 evening sunset glow through Chuo-Line window
  );
  tWin.position.set(0, 1.52, -1.18);
  const tWinSky = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 0.48),
    new THREE.MeshBasicMaterial({ color: 0xfb923c })
  );
  tWinSky.position.set(0, 1.24, -1.175);
  const tPole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.5, 12), baseMats.chromeSteel);
  tPole.position.set(-0.55, 1.25, -0.58);
  trainCartSet.add(tFloor, tWall, tWin, tWinSky, tPole);

  const minatoTrain = createRealisticHuman(baseMats, {
    role: 'minato_train_ch15',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: true,
  });
  minatoTrain.root.position.set(-0.22, 0, -0.68);
  minatoTrain.root.rotation.y = 0.25;
  minatoTrain.leftArm.shoulder.rotation.set(-0.85, 0, 0.28);
  minatoTrain.leftArm.elbow.rotation.set(-0.55, 0, 0);
  workstationTrain.group.position.set(0.04, 0.06, -0.32);
  workstationTrain.group.rotation.y = 0.35;
  trainCartSet.add(minatoTrain.root, workstationTrain.group);

  // ===========================================================================
  // SET 2: 『コーポ武蔵野』203号室 — 机下の350W黒鉄箱・0.1gはかり＆三角定規・二本吊り振り子・櫓の眠るHMD-02!
  // ===========================================================================
  const room203Set = new THREE.Group();
  room203Set.visible = false;
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
  room203Set.add(roomFloor, backWall);

  // Retired HMD-01 on Top Bookshelf
  const shelfGroup = new THREE.Group();
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
  shelfGroup.add(shelfTop, shelfL, shelfR, ch10Props.certCard, heroFighter.root);
  room203Set.add(shelfGroup);

  // Workbench Desk with Roaring 16kg RTX 3090 Full-Tower Tucked Underneath + Wide PC Monitor + SysID Instruments!
  const deskGroup = new THREE.Group();
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.48, 0.036, 0.78),
    pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x8d6342 })
  );
  deskTop.position.set(0, 0.72, -1.22);
  deskTop.castShadow = true; deskTop.receiveShadow = true;
  for (const lx of [-0.68, 0.68]) {
    for (const lz of [-1.56, -0.88]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.72, 0.038), baseMats.blackAnodized);
      leg.position.set(lx, 0.36, lz);
      deskGroup.add(leg);
    }
  }
  deskGroup.add(deskTop);

  // 16kg RTX 3090 Full-Tower Workstation roaring cleanly clear of desk legs!
  workstationRoom.group.position.set(0.26, 0.0, -1.04);
  workstationRoom.group.rotation.y = -0.58;
  deskGroup.add(workstationRoom.group);

  // Wide 27-inch PC Monitor on Desk showing Isaac Lab 300M-Step Learning Curve & Physical-Pain Reward Formula!
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(0.0, 0.738, -1.42);
  const monStand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.014, 0.14), baseMats.blackAnodized);
  monStand.position.set(0, 0.007, -0.02);
  const monNeck = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.026), baseMats.blackAnodized);
  monNeck.position.set(0, 0.08, -0.030);
  const monFrame = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.38, 0.022), baseMats.blackAnodized);
  monFrame.position.y = 0.28;
  const monFace = new THREE.Mesh(new THREE.PlaneGeometry(0.61, 0.345), screens.monitorScreenMat);
  monFace.position.set(0, 0.28, 0.013);
  monitorGroup.add(monStand, monNeck, monFrame, monFace);
  deskGroup.add(monitorGroup);

  // Precision 0.1g Scale + Knife-Edge Ruler Seesaw on Desk
  sysIdRig.group.position.set(0.0, 0.738, -1.04);
  deskGroup.add(sysIdRig.group);
  room203Set.add(deskGroup);

  // 180cm Steel Pipe Safety Gantry 1 Meter Behind Desk + Sleeping Real 720mm HMD-02 + Bifilar Piano-Wire Pendulum!
  gantryRig.group.position.set(0.08, 0.0, 0.32);
  room203Set.add(gantryRig.group);

  realHmd02.root.position.set(0.08, 0.044, 0.32);
  realHmd02.root.rotation.y = Math.PI; // Facing desk/camera nicely!
  room203Set.add(realHmd02.root);

  sysIdRig.bifilarGroup.position.set(0.08, 0.86, 0.32);
  sysIdRig.bifilarGroup.visible = false;
  room203Set.add(sysIdRig.bifilarGroup);

  // ===========================================================================
  // SET 3: 『Isaac Lab』仮想空間 — 果てしない灰色格子大地・4,096体分身軍団＆フル詳細ヒーローHMD-02!
  // ===========================================================================
  const virtualArenaSet = new THREE.Group();
  virtualArenaSet.visible = false;
  scene.add(virtualArenaSet);

  // Endless Crisp Gray Isaac Lab Floor Grid CanvasTexture!
  const gridC = document.createElement('canvas');
  gridC.width = 512; gridC.height = 512;
  const gx = gridC.getContext('2d');
  gx.fillStyle = '#363c48'; gx.fillRect(0, 0, 512, 512);
  gx.strokeStyle = '#525b6e'; gx.lineWidth = 4;
  for (let i = 0; i <= 4; i++) {
    const p = i * 128;
    gx.beginPath(); gx.moveTo(p, 0); gx.lineTo(p, 512); gx.stroke();
    gx.beginPath(); gx.moveTo(0, p); gx.lineTo(512, p); gx.stroke();
  }
  gx.strokeStyle = '#64748b'; gx.lineWidth = 6;
  gx.strokeRect(0, 0, 512, 512);
  const gridTex = new THREE.CanvasTexture(gridC);
  gridTex.colorSpace = THREE.SRGBColorSpace;
  gridTex.wrapS = THREE.RepeatWrapping; gridTex.wrapT = THREE.RepeatWrapping;
  gridTex.repeat.set(42, 42);

  const arenaFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(84, 84),
    new THREE.MeshStandardMaterial({ map: gridTex, roughness: 0.78, metalness: 0.12 })
  );
  arenaFloor.rotation.x = -Math.PI / 2;
  arenaFloor.receiveShadow = true;
  virtualArenaSet.add(arenaFloor);

  // 400 Instanced 3D Clones Stretching to the Horizon + Full-Detail Hero HMD-02 in Foreground!
  virtualArenaSet.add(cloneArmy.group);
  heroVirtualHmd02.root.position.set(0, 0, 0.35);
  virtualArenaSet.add(heroVirtualHmd02.root);

  // Overheating Crimson Warning Rings on Hero HMD-02's Knees during Reward Hack #2 (Splayed Shuffle!)
  const overheatMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
  const overheatRingL = new THREE.Mesh(new THREE.RingGeometry(0.044, 0.058, 24), overheatMat);
  overheatRingL.rotation.y = Math.PI / 2; overheatRingL.position.set(-0.11, 0.21, 0.35);
  const overheatRingR = overheatRingL.clone(); overheatRingR.position.x = 0.11;
  virtualArenaSet.add(overheatRingL, overheatRingR);

  // Glowing Crimson 3D Lateral 5kg Impulse Arrow ("5キロ相当の激しい衝撃！")
  impulseArrow.group.position.set(0.18, 0.56, 0.35);
  virtualArenaSet.add(impulseArrow.group);

  // ===========================================================================
  // SET 4: 6月梅雨の『電磁気学Ⅱ』講義室 — 雨粒の窓・数式黒板・向き合って語り合う湊＆田所!
  // ===========================================================================
  const lectureHallSet = new THREE.Group();
  lectureHallSet.visible = false;
  scene.add(lectureHallSet);

  const lecFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    pbr.get('parquetWoodFloor', { repeatX: 4, repeatY: 4, tint: 0x8a6d52 })
  );
  lecFloor.rotation.x = -Math.PI / 2;
  const lecWall = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 4.0),
    pbr.get('archWhiteConcrete', { repeatX: 4, repeatY: 2 })
  );
  lecWall.position.set(0, 2.0, -2.55);
  const chalkBoard = new THREE.Mesh(new THREE.PlaneGeometry(2.45, 1.04), screens.chalkBoardMat);
  chalkBoard.position.set(-0.15, 1.72, -2.50);
  const rainWindow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.75, 1.55),
    pbr.get('condensationGlass', { repeatX: 2, repeatY: 2 })
  );
  rainWindow.position.set(2.05, 1.72, -2.48);

  // Long University Lecture Desk in front of seated Minato & Tadokoro + Open Notebook
  const lecDesk = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.05, 0.56),
    pbr.get('birchPlywoodSheet', { repeatX: 3, repeatY: 1 })
  );
  lecDesk.position.set(0, 0.74, -0.18);
  const lecNotebook = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.012, 0.18),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 })
  );
  lecNotebook.position.set(-0.36, 0.772, -0.16);
  lecNotebook.rotation.y = 0.14;

  const minatoLec = createRealisticHuman(baseMats, {
    role: 'minato_lec',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoLec.root.position.set(-0.46, -0.44, -0.62);
  minatoLec.root.rotation.y = 0.42; // Seated 3/4 front-right turning gently toward Tadokoro!
  minatoLec.leftLeg.hipJoint.rotation.x = -1.42;
  minatoLec.rightLeg.hipJoint.rotation.x = -1.42;
  minatoLec.rightArm.shoulder.rotation.set(-0.62, 0, -0.10);

  const tadokoroLec = createRealisticHuman(baseMats, {
    role: 'tadokoro_lec',
    topMat: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.82 }),
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  tadokoroLec.root.position.set(0.46, -0.44, -0.62);
  tadokoroLec.root.rotation.y = -0.52; // Turning 3/4 front-left toward Minato in disbelief ("ホラーかよそれ")!
  tadokoroLec.leftLeg.hipJoint.rotation.x = -1.42;
  tadokoroLec.rightLeg.hipJoint.rotation.x = -1.42;
  tadokoroLec.leftArm.shoulder.rotation.set(-0.72, 0.25, 0.22);

  lectureHallSet.add(lecFloor, lecWall, chalkBoard, rainWindow, lecDesk, lecNotebook, minatoLec.root, tadokoroLec.root);

  function setActiveSet(name) {
    trainCartSet.visible = name === 'trainCart';
    room203Set.visible = name === 'room203';
    virtualArenaSet.visible = name === 'virtualArena';
    lectureHallSet.visible = name === 'lectureHall';
  }

  return {
    setActiveSet,
    workstationTrain,
    workstationRoom,
    deskGroup,
    monitorGroup,
    gantryRig,
    realHmd02,
    sysIdRig,
    cloneArmy,
    heroVirtualHmd02,
    overheatMat,
    overheatRingL,
    overheatRingR,
    impulseArrow,
    minatoLec,
    tadokoroLec,
  };
}
