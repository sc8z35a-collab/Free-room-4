import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createHMD01Rev18Fighter } from '../ch09/hmd01Rev18Rig.js';
import { createCh10StoryProps } from '../ch10/qddAndHallProps.js';
import { createCarbonFiberMaterial } from '../ch14/hmd02BodyRig.js';
import { createSteelGantry180cmRig } from '../ch14/ch14PropsAndRig.js';
import { createVirtualCloneArmyRig } from '../ch15/ch15PropsAndRig.js';
import { createHMD02CompleteRig } from '../ch17/hmd02CompleteRig.js';
import { createViaductAndExpressTrainRig } from '../ch18/ch18PropsAndRig.js';

/**
 * Dynamic Late-Night Message & Email Screen for Chapter 19:
 * - `'tadokoro_chat'`: Explosive rapid-fire replies from Tadokoro ("中に小さい人間入ってんじゃねえのかこれ！！")
 * - `'sakakibara_email'`: Moving heartfelt email from Sakakibara Koichi ("完成、本当におめでとう")!
 */
export function createCh19Screens() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 576;
  const ctx = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const msgScreenMat = new THREE.MeshBasicMaterial({ map: tex });

  let last = '';
  function updateMsgScreen(mode) {
    if (mode === last) return;
    last = mode;

    ctx.fillStyle = '#080e1a'; ctx.fillRect(0, 0, 1024, 576);
    ctx.fillStyle = '#1e293b'; ctx.fillRect(0, 0, 1024, 54);

    if (mode === 'tadokoro_chat') {
      ctx.fillStyle = '#38bdf8'; ctx.font = '800 24px sans-serif';
      ctx.fillText('MESSAGES // 田所（送信から3分未満・連続着信！）', 26, 36);

      // Video thumbnail sent by Minato (right bubble)
      ctx.fillStyle = '#0f766e'; ctx.fillRect(580, 76, 408, 72);
      ctx.fillStyle = '#f8fafc'; ctx.font = '800 22px sans-serif';
      ctx.fillText('▶ HMD02_shove_cross_step.mp4 (0:10)', 600, 118);

      // Tadokoro's hype reply bubbles (left)
      ctx.fillStyle = '#1e293b'; ctx.fillRect(36, 174, 830, 82);
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 3; ctx.strokeRect(36, 174, 830, 82);
      ctx.fillStyle = '#f8fafc'; ctx.font = '900 27px sans-serif';
      ctx.fillText('「おい待て待て待て！！ 今これ何！？ お前が作ったのか！？」', 56, 224);

      ctx.fillStyle = '#1e293b'; ctx.fillRect(36, 280, 952, 118);
      ctx.strokeStyle = '#34d399'; ctx.lineWidth = 3; ctx.strokeRect(36, 280, 952, 118);
      ctx.fillStyle = '#a7f3d0'; ctx.font = '900 27px sans-serif';
      ctx.fillText('「突き飛ばされた時の腕の広げ方ヤバすぎだろ、', 56, 330);
      ctx.fillText('　中に小さい人間入ってんじゃねえのかこれ！！ 鳥肌止まんねえ！！」', 56, 374);

      ctx.fillStyle = '#0f172a'; ctx.fillRect(36, 434, 952, 108);
      ctx.fillStyle = '#fde68a'; ctx.font = '800 24px sans-serif';
      ctx.fillText('▶ Day 511（8月29日）— HMD-01の初3歩からきっかり365日目の奇跡！', 58, 498);
    } else {
      ctx.fillStyle = '#fde68a'; ctx.font = '800 24px sans-serif';
      ctx.fillText('INBOX // From: 榊原 恒一 <k.sakakibara@...>', 26, 36);

      ctx.fillStyle = '#0f172a'; ctx.fillRect(32, 74, 960, 470);
      ctx.strokeStyle = '#eab308'; ctx.lineWidth = 3; ctx.strokeRect(32, 74, 960, 470);

      const lines = [
        ['佐伯くん、久しぶり。動画を三回繰り返して見ました。', '#f8fafc', 124],
        ['正直に言って、言葉を失うほど驚いています。たった十ヶ月足らずで、', '#e2e8f0', 174],
        ['駆動基板から全身の強化学習まで一人でやり切ったんだね。', '#e2e8f0', 214],
        ['突き飛ばされた瞬間の膝の抜き方と腕の使い方は、', '#7dd3fc', 268],
        ['あの日の僕の機体よりもずっと自然でしなやかだ。', '#7dd3fc', 310],
        ['もうその子は、平らな部屋の中やシートの上だけで守ってやる必要はないよ。', '#fde68a', 372],
        ['胸を張って、本物の「外の世界」の地面を歩かせてやりなさい。', '#fde68a', 414],
        ['完成、本当におめでとう。 —— 榊原 恒一', '#34d399', 486],
      ];
      lines.forEach(([txt, col, y]) => {
        ctx.fillStyle = col;
        ctx.font = y === 486 ? '900 30px serif' : '700 24px sans-serif';
        ctx.fillText(txt, 60, y);
      });
    }
    tex.needsUpdate = true;
  }
  updateMsgScreen('tadokoro_chat');

  return { msgScreenMat, updateMsgScreen };
}

export function createCh19World(scene, baseMats, ngMats, screens, masterLib) {
  const { pbr } = masterLib;
  const sharedCarbonMat = createCarbonFiberMaterial();

  // COMPLETE 16-DOF `HMD-02` FINAL FORM (720.0mm / 8.18kg — Both Arms + Rubber Fists + Visor Head + Gold Resistor!)
  const hmd02Room = createHMD02CompleteRig(baseMats, {
    sharedCarbonMat, hasUpperBody: true, hasGoldResistor: true,
  });
  const hmd02Virtual = createHMD02CompleteRig(baseMats, {
    sharedCarbonMat, hasUpperBody: true, hasGoldResistor: true,
  });
  const hmd02Viaduct = createHMD02CompleteRig(baseMats, {
    sharedCarbonMat, hasUpperBody: true, hasGoldResistor: true,
  });

  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats, masterLib);
  heroFighter.setBattleState({ scratched: true, hipCracked: true, silverSplints: true });
  const ch10Props = createCh10StoryProps(baseMats, ngMats);
  const gantryRig = createSteelGantry180cmRig(baseMats, pbr);
  const cloneArmy = createVirtualCloneArmyRig(baseMats);
  const viaductRig = createViaductAndExpressTrainRig(baseMats, pbr);

  // ===========================================================================
  // SET 1: 203号室 — 完全体16自由度HMD-02 (8.18kg) ＆ 本棚のHMD-01 ＆ 深夜メッセージモニター
  // ===========================================================================
  const room203Set = new THREE.Group();
  scene.add(room203Set);

  const rFloor = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 5.8), pbr.get('darkWalnutStripFloor', { repeatX: 4, repeatY: 4 }));
  rFloor.rotation.x = -Math.PI / 2; rFloor.receiveShadow = true;
  const rWall = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 3.0), pbr.get('wallpaperWhiteWoven', { repeatX: 4, repeatY: 2 }));
  rWall.position.set(0, 1.5, -1.85);
  room203Set.add(rFloor, rWall);

  // Top Bookshelf w/ Retired HMD-01 ("お前の続きを、やってくる" — 365 days later!)
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
  room203Set.add(shelfTop, shelfL, shelfR, ch10Props.certCard, heroFighter.root);

  // Desk + Late-Night Monitor (Tadokoro Chat & Sakakibara Koichi Email!)
  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.036, 0.78), pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x8d6342 }));
  deskTop.position.set(0, 0.72, -1.22);
  const monGroup = new THREE.Group();
  monGroup.position.set(0, 0.738, -1.42);
  const mFrame = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.38, 0.022), baseMats.blackAnodized);
  mFrame.position.y = 0.28;
  const mFace = new THREE.Mesh(new THREE.PlaneGeometry(0.61, 0.345), screens.msgScreenMat);
  mFace.position.set(0, 0.28, 0.013);
  monGroup.add(mFrame, mFace);
  room203Set.add(deskTop, monGroup);

  // Complete 16-DOF HMD-02 standing proudly beside the 180cm Steel Gantry!
  gantryRig.group.position.set(0.0, 0, 0.32);
  if (gantryRig.beltStrap) gantryRig.beltStrap.visible = false;
  if (gantryRig.carabiner) gantryRig.carabiner.visible = false;
  hmd02Room.root.position.set(0.0, 0.042, 0.32);
  room203Set.add(gantryRig.group, hmd02Room.root);

  // ===========================================================================
  // SET 2: 16自由度仮想空間（腕振り＆鳥の翼バランス学習！）
  // ===========================================================================
  const virtualSet = new THREE.Group();
  virtualSet.visible = false;
  scene.add(virtualSet);
  const gC = document.createElement('canvas'); gC.width = 512; gC.height = 512;
  const gx = gC.getContext('2d');
  gx.fillStyle = '#313744'; gx.fillRect(0, 0, 512, 512);
  gx.strokeStyle = '#525b6e'; gx.lineWidth = 4;
  for (let i = 0; i <= 4; i++) {
    const p = i * 128;
    gx.beginPath(); gx.moveTo(p, 0); gx.lineTo(p, 512); gx.stroke();
    gx.beginPath(); gx.moveTo(0, p); gx.lineTo(512, p); gx.stroke();
  }
  const gTex = new THREE.CanvasTexture(gC); gTex.colorSpace = THREE.SRGBColorSpace;
  gTex.wrapS = THREE.RepeatWrapping; gTex.wrapT = THREE.RepeatWrapping; gTex.repeat.set(40, 40);
  const vFloor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ map: gTex, roughness: 0.78 }));
  vFloor.rotation.x = -Math.PI / 2;
  hmd02Virtual.root.position.set(0, 0, 0.38);
  virtualSet.add(vFloor, cloneArmy.group, hmd02Virtual.root);

  // ===========================================================================
  // SET 3: 8月29日夜の高架下広場 — 掌底の全力突き飛ばし＆鳥の翼＋クロスステップ復帰＆抱擁！！
  // ===========================================================================
  const viaductSet = new THREE.Group();
  viaductSet.visible = false;
  scene.add(viaductSet);
  viaductSet.add(viaductRig.group, hmd02Viaduct.root);

  // Crisp White Rubber Scuff Shockwave Ring on Concrete at exact Cross-Step Impact (`キュッ！！`)!
  const scuffMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
  const scuffRing = new THREE.Mesh(new THREE.RingGeometry(0.06, 0.14, 28), scuffMat);
  scuffRing.rotation.x = -Math.PI / 2;
  scuffRing.position.set(0, 0.012, 0.55);
  viaductSet.add(scuffRing);

  const minatoViaduct = createRealisticHuman(baseMats, {
    role: 'minato_ch19_shove',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  viaductSet.add(minatoViaduct.root);

  function setActiveSet(name) {
    room203Set.visible = name === 'room203';
    virtualSet.visible = name === 'virtual';
    viaductSet.visible = name === 'viaduct';
  }

  return {
    setActiveSet,
    hmd02Room,
    hmd02Virtual,
    hmd02Viaduct,
    cloneArmy,
    viaductRig,
    minatoViaduct,
    scuffRing,
    scuffMat,
  };
}
