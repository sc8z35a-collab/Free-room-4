import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createHMD01Rev18Fighter } from '../ch09/hmd01Rev18Rig.js';
import { createCh10StoryProps } from '../ch10/qddAndHallProps.js';
import { createCarbonFiberMaterial } from '../ch14/hmd02BodyRig.js';
import { createSteelGantry180cmRig } from '../ch14/ch14PropsAndRig.js';
import { createWorkstationRtx3090Rig } from '../ch15/ch15PropsAndRig.js';
import { createGougedEvaMatAndEstopRig } from '../ch16/ch16PropsAndRig.js';
import { createHMD02CompleteRig, createDynamicSlackSlingBelt } from './hmd02CompleteRig.js';
import {
  createDigitalForceGaugeRig,
  createSorbothaneImuRig,
  createDomainRandClonesRig,
  createYakinikuGrillRig,
} from './ch17PropsAndRig.js';

/**
 * Dynamic Screens & Exam Paper for Chapter 17:
 * 1. `monScreenMat`:
 *    - `'bode_35hz'`: 1Hz–50Hz Chirp Signal Bode Plot revealing the 35Hz Demonic Resonance Peak!
 *    - `'policy_1_8mb'`: 500M-Step Domain Randomization Complete (`1.8 MB` Policy Ready!)
 *    - `'spike_28_4v'`: Ominous Bus Voltage Spike (`25.2 V -> 28.4 V`) on Step 4 Brake!
 * 2. `examPaperMat`: Crisp `自動制御 前期末試験 大問二（配点40点）` exam sheet!
 */
export function createCh17Screens() {
  const mC = document.createElement('canvas');
  mC.width = 1024; mC.height = 576;
  const mx = mC.getContext('2d');
  const mTex = new THREE.CanvasTexture(mC);
  mTex.colorSpace = THREE.SRGBColorSpace;
  const monScreenMat = new THREE.MeshBasicMaterial({ map: mTex });

  let lastMode = '';
  function updateMonitor(mode) {
    if (mode === lastMode) return;
    lastMode = mode;

    mx.fillStyle = '#070c16'; mx.fillRect(0, 0, 1024, 576);
    mx.fillStyle = '#1e293b'; mx.fillRect(0, 0, 1024, 50);

    if (mode === 'bode_35hz') {
      mx.fillStyle = '#38bdf8'; mx.font = '800 22px monospace';
      mx.fillText('SYSTEM ID // 1Hz -> 50Hz CHIRP SIGNAL BODE PLOT (RIGHT KNEE)', 22, 33);
      mx.strokeStyle = '#334155'; mx.lineWidth = 2; mx.strokeRect(32, 74, 560, 326);
      // -180 deg dashed limit
      mx.strokeStyle = '#ef4444'; mx.setLineDash([8, 6]);
      mx.beginPath(); mx.moveTo(32, 300); mx.lineTo(592, 300); mx.stroke();
      mx.setLineDash([]);
      mx.fillStyle = '#fca5a5'; mx.font = '700 18px monospace';
      mx.fillText('-180° PHASE LIMIT (4.2ms DELAY)', 46, 288);

      // Flat tracking up to 20Hz, sharp drop after 28Hz -> 35Hz Demonic Resonance Peak!
      mx.strokeStyle = '#34d399'; mx.lineWidth = 5;
      mx.beginPath();
      mx.moveTo(46, 152); mx.lineTo(280, 156); mx.quadraticCurveTo(360, 165, 420, 114);
      mx.lineTo(452, 232); mx.lineTo(576, 365);
      mx.stroke();
      // Glowing Crimson Circle at 35Hz Resonance Point!
      mx.strokeStyle = '#ef4444'; mx.lineWidth = 5;
      mx.beginPath(); mx.arc(420, 114, 18, 0, Math.PI * 2); mx.stroke();
      mx.fillStyle = '#f87171'; mx.font = '900 22px monospace';
      mx.fillText('35 Hz RESONANCE!', 392, 92);

      mx.fillStyle = '#f8fafc'; mx.font = '900 26px sans-serif';
      mx.fillText('魔の共振点を寸分なく特定！', 618, 116);
      mx.fillStyle = '#34d399'; mx.font = '700 20px sans-serif';
      mx.fillText('■ 1Hz〜20Hz：遅れなくピタリ追従', 618, 168);
      mx.fillStyle = '#fbbf24';
      mx.fillText('■ 28Hz超：筋肉の返事が急激に遅延', 618, 212);
      mx.fillStyle = '#f87171'; mx.font = '800 21px sans-serif';
      mx.fillText('■ 35Hz付近：4.2ms遅延と重なり', 618, 266);
      mx.fillText('　 無限自己増幅する魔の共振点！', 618, 300);

      mx.fillStyle = '#450a0a'; mx.fillRect(32, 428, 960, 120);
      mx.strokeStyle = '#ef4444'; mx.lineWidth = 4; mx.strokeRect(32, 428, 960, 120);
      mx.fillStyle = '#fecaca'; mx.font = '900 29px sans-serif';
      mx.fillText('0.3秒の狂乱金属音の正体 ＝ 35Hz共振 ＋ 摩擦 0.38 N·m！', 56, 480);
      mx.fillStyle = '#fde68a'; mx.font = '700 21px monospace';
      mx.fillText('STATIC FRICTION: 2.05N (0.38 N·m)  |  SORBOTHANE 4x IMU MOUNTED', 56, 524);
    } else if (mode === 'spike_28_4v') {
      mx.fillStyle = '#f87171'; mx.font = '800 22px monospace';
      mx.fillText('OSCILLOSCOPE CH1 // MAIN 6S BATTERY BUS VOLTAGE (STEP 4 BRAKE)', 22, 33);
      mx.strokeStyle = '#334155'; mx.lineWidth = 2; mx.strokeRect(32, 74, 620, 326);
      // Nominal 25.2V line
      mx.strokeStyle = '#38bdf8'; mx.setLineDash([8, 6]);
      mx.beginPath(); mx.moveTo(32, 268); mx.lineTo(652, 268); mx.stroke();
      mx.setLineDash([]);
      mx.fillStyle = '#7dd3fc'; mx.font = '700 18px monospace';
      mx.fillText('FULL CHARGE 25.2 V', 44, 256);

      // Sharp White-Hot Lightning Spike soaring to 28.4 V!
      mx.strokeStyle = '#f8fafc'; mx.lineWidth = 5;
      mx.beginPath();
      mx.moveTo(42, 272); mx.lineTo(360, 270); mx.lineTo(376, 108); // RAZOR SPIKE!
      mx.lineTo(396, 258); mx.lineTo(640, 272);
      mx.stroke();
      mx.strokeStyle = '#ef4444'; mx.lineWidth = 4;
      mx.beginPath(); mx.arc(376, 108, 16, 0, Math.PI * 2); mx.stroke();
      mx.fillStyle = '#fef08a'; mx.font = '900 26px monospace';
      mx.fillText('PEAK: 28.4 V !!', 404, 118);

      mx.fillStyle = '#f8fafc'; mx.font = '900 26px sans-serif';
      mx.fillText('不穏な白い稲妻の予兆', 678, 122);
      mx.fillStyle = '#fde68a'; mx.font = '800 22px sans-serif';
      mx.fillText('満充電 25.2V のはずが', 678, 174);
      mx.fillStyle = '#f87171'; mx.font = '900 26px sans-serif';
      mx.fillText('急停止で 28.4V へ跳上！', 678, 218);
      mx.fillStyle = '#cbd5e1'; mx.font = '700 19px sans-serif';
      mx.fillText('モーターが発電機へ豹変し', 678, 274);
      mx.fillText('電気を逆流させる『回生電力』', 678, 308);

      mx.fillStyle = '#450a0a'; mx.fillRect(32, 428, 960, 120);
      mx.strokeStyle = '#f59e0b'; mx.lineWidth = 4; mx.strokeRect(32, 428, 960, 120);
      mx.fillStyle = '#fef08a'; mx.font = '900 29px sans-serif';
      mx.fillText('⚠ 警告：急制動時の回生過電圧（25.2V → 28.4V）を初観測！', 56, 480);
      mx.fillStyle = '#fed7aa'; mx.font = '700 21px monospace';
      mx.fillText('NEXT: CHAPTER 18 — 命綱なし全力走行で牙を剥く『逆流する稲妻』へ！', 56, 524);
    } else {
      mx.fillStyle = '#34d399'; mx.font = '800 22px monospace';
      mx.fillText('DOMAIN RANDOMIZATION // 500,000,000 STEPS · POLICY 1.8 MB READY', 22, 33);
      mx.fillStyle = '#064e3b'; mx.fillRect(32, 90, 960, 440);
      mx.strokeStyle = '#10b981'; mx.lineWidth = 4; mx.strokeRect(32, 90, 960, 440);
      mx.fillStyle = '#a7f3d0'; mx.font = '900 40px sans-serif';
      mx.fillText('✓ 5億ステップ過酷環境訓練 完了！', 72, 180);
      mx.fillStyle = '#f8fafc'; mx.font = '800 28px monospace';
      mx.fillText('POLICY: hmd02_sim2real_500m.onnx (1.8 MB)', 72, 250);
      mx.fillStyle = '#fde68a'; mx.font = '700 24px sans-serif';
      mx.fillText('・摩擦ランダム化（0.25〜0.55 N·m） ＆ 遅延（3.5〜6.0 ms）', 72, 326);
      mx.fillText('・直前5ステップ（0.025秒）履歴入力による即時体調適応', 72, 382);
      mx.fillStyle = '#7dd3fc'; mx.font = '900 30px sans-serif';
      mx.fillText('▶ 7.62 kg 自立起立 ＆ 櫓内4歩テスト 準備完了！', 72, 464);
    }
    mTex.needsUpdate = true;
  }
  updateMonitor('bode_35hz');

  // Crisp Exam Paper (`自動制御 前期末試験 大問二・配点40点`)
  const eC = document.createElement('canvas');
  eC.width = 512; eC.height = 640;
  const ex = eC.getContext('2d');
  ex.fillStyle = '#f8fafc'; ex.fillRect(0, 0, 512, 640);
  ex.strokeStyle = '#0f172a'; ex.lineWidth = 3; ex.strokeRect(20, 20, 472, 600);
  ex.fillStyle = '#0f172a'; ex.font = '900 24px serif';
  ex.fillText('東都農工大学 前期末試験『自動制御』', 38, 66);
  ex.font = '800 22px sans-serif';
  ex.fillText('大問二（配点 40点）', 38, 118);
  ex.font = '700 18px sans-serif';
  ex.fillText('むだ時間 L を含むモーター制御系の', 38, 154);
  ex.fillText('ボード線図より発振を防ぐ安定余裕を求めよ。', 38, 182);
  // Drawn Bode plot + neat pencil handwritten answer!
  ex.strokeStyle = '#334155'; ex.lineWidth = 2; ex.strokeRect(48, 206, 416, 190);
  ex.strokeStyle = '#2563eb'; ex.lineWidth = 3;
  ex.beginPath(); ex.moveTo(64, 240); ex.quadraticCurveTo(240, 250, 390, 368); ex.stroke();
  ex.fillStyle = '#1d4ed8'; ex.font = '700 20px monospace';
  ex.fillText('ω_c = 2π·28Hz, L = 4.2ms', 54, 444);
  ex.fillText('PM = 180° + ∠G(jω_c) > 35°', 54, 480);
  ex.fillStyle = '#059669'; ex.font = '900 26px sans-serif';
  ex.fillText('✓ 試験終了10分前・全欄完答！', 54, 558);
  const eTex = new THREE.CanvasTexture(eC); eTex.colorSpace = THREE.SRGBColorSpace;
  const examPaperMat = new THREE.MeshStandardMaterial({ map: eTex, roughness: 0.88 });

  return { monScreenMat, updateMonitor, examPaperMat };
}

/**
 * Builds ALL 5 Monumental Chapter 17 Sets:
 * 1. `macroSysIdSet`: Digital Force Gauge (`2.05 N`) & Blue Sorbothane 4-Pad IMU Macro Stage
 * 2. `domainRandSet`: Brutal 400-Instance Domain Randomization Arena (Ice patches + 500g Lead weights!)
 * 3. `examAndYakinikuSet`: Bright Exam Desk (`自動制御` 40pt) + Smoky Station-Front Yakiniku Grill w/ 4 Friends!
 * 4. `summerNightWalkSet`: Starry July Night Street + 2nd-Floor Corpo Musashino Window w/ Blinking Red LED!
 * 5. `room203Set`: Room 203 w/ 180cm Steel Gantry, Dynamic U-Slack Orange Belt, `7.62 kg` Headless `HMD-02`,
 *    Fresh EVA Mat, Red E-Stop, Bode/28.4V Monitor, and Minato pushing HMD-02's chest!
 */
export function createCh17World(scene, baseMats, ngMats, screens, masterLib) {
  const { pbr } = masterLib;
  const sharedCarbonMat = createCarbonFiberMaterial();

  const hmd02 = createHMD02CompleteRig(baseMats, { sharedCarbonMat, hasUpperBody: false, hasGoldResistor: false });
  const heroVirtual = createHMD02CompleteRig(baseMats, { sharedCarbonMat, hasUpperBody: false, hasGoldResistor: false });
  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats, masterLib);
  heroFighter.setBattleState({ scratched: true, hipCracked: true, silverSplints: true });
  const ch10Props = createCh10StoryProps(baseMats, ngMats);

  const gantryRig = createSteelGantry180cmRig(baseMats, pbr);
  // Hide static straight belt so our real-time curved orange U-slack belt shines!
  if (gantryRig.beltStrap) gantryRig.beltStrap.visible = false;
  if (gantryRig.carabiner) gantryRig.carabiner.visible = false;
  const dynamicBelt = createDynamicSlackSlingBelt(baseMats);

  const workstationRoom = createWorkstationRtx3090Rig(baseMats);
  const matEstopRig = createGougedEvaMatAndEstopRig(baseMats, pbr);
  const forceGaugeRig = createDigitalForceGaugeRig(baseMats, sharedCarbonMat);
  const sorboRig = createSorbothaneImuRig(baseMats, sharedCarbonMat);
  const drClones = createDomainRandClonesRig(baseMats);
  const yakinikuRig = createYakinikuGrillRig(baseMats, pbr);

  // ===========================================================================
  // SET 1: 聴診器マクロステージ（デジタルフォースゲージ 2.05N ＆ 青いソルボセイン4枚）
  // ===========================================================================
  const macroSysIdSet = new THREE.Group();
  scene.add(macroSysIdSet);

  const mTable = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 2.4),
    pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 2, tint: 0x7c573a })
  );
  mTable.rotation.x = -Math.PI / 2; mTable.receiveShadow = true;
  const mBg = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 2.4),
    pbr.get('wallpaperWhiteWoven', { repeatX: 3, repeatY: 2, tint: 0x1e293b })
  );
  mBg.position.set(0, 1.1, -1.0);
  forceGaugeRig.group.position.set(0, 0.02, 0);
  sorboRig.group.position.set(0, 0.0, 0);
  sorboRig.group.visible = false;
  macroSysIdSet.add(mTable, mBg, forceGaugeRig.group, sorboRig.group);

  // ===========================================================================
  // SET 2: 過酷環境ランダム化仮想空間（氷床・500g鉛重り・6.0ms遅延の4,096体修行場）
  // ===========================================================================
  const domainRandSet = new THREE.Group();
  domainRandSet.visible = false;
  scene.add(domainRandSet);

  const gC = document.createElement('canvas');
  gC.width = 512; gC.height = 512;
  const gx = gC.getContext('2d');
  gx.fillStyle = '#2d333f'; gx.fillRect(0, 0, 512, 512);
  gx.strokeStyle = '#475569'; gx.lineWidth = 4;
  for (let i = 0; i <= 4; i++) {
    const p = i * 128;
    gx.beginPath(); gx.moveTo(p, 0); gx.lineTo(p, 512); gx.stroke();
    gx.beginPath(); gx.moveTo(0, p); gx.lineTo(512, p); gx.stroke();
  }
  const gTex = new THREE.CanvasTexture(gC);
  gTex.colorSpace = THREE.SRGBColorSpace;
  gTex.wrapS = THREE.RepeatWrapping; gTex.wrapT = THREE.RepeatWrapping; gTex.repeat.set(36, 36);
  const drFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(72, 72),
    new THREE.MeshStandardMaterial({ map: gTex, roughness: 0.78, metalness: 0.14 })
  );
  drFloor.rotation.x = -Math.PI / 2;
  domainRandSet.add(drFloor, drClones.group);

  // Hero Clone in Foreground carrying a 500g Gray Lead Block on Back + Glowing 5-Step Memory Ribbon Ring!
  heroVirtual.root.position.set(0, 0, 0.45);
  const heroLead = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.075, 0.065),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.75, roughness: 0.42 })
  );
  heroLead.position.set(0, 0.54, -0.09);
  heroVirtual.root.add(heroLead);
  const memRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.24, 0.007, 8, 36),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
  );
  memRing.rotation.x = Math.PI / 2; memRing.position.set(0, 0.48, 0.45);
  domainRandSet.add(heroVirtual.root, memRing);

  // ===========================================================================
  // SET 3A: 前期末試験教室（自動制御 40点大問二 完答デスク）
  // ===========================================================================
  const examDeskSet = new THREE.Group();
  examDeskSet.visible = false;
  scene.add(examDeskSet);

  const exDesk = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.04, 0.9),
    pbr.get('birchPlywoodSheet', { repeatX: 2, repeatY: 1 })
  );
  exDesk.position.set(0, 0.72, 0);
  const exPaper = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.40), screens.examPaperMat);
  exPaper.rotation.x = -Math.PI / 2;
  exPaper.position.set(0, 0.742, 0.04);
  const pencil = new THREE.Mesh(
    new THREE.CylinderGeometry(0.004, 0.004, 0.16, 8),
    new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.4 })
  );
  pencil.rotation.z = Math.PI / 2; pencil.rotation.y = 0.42;
  pencil.position.set(0.16, 0.748, 0.14);
  examDeskSet.add(exDesk, exPaper, pencil);

  // ===========================================================================
  // SET 3B: 駅前の煙もうもうたる学生向け安焼肉屋（丸テーブル・七輪・烏龍茶・田所＆仲間と湊！）
  // ===========================================================================
  const yakinikuSet = new THREE.Group();
  yakinikuSet.visible = false;
  scene.add(yakinikuSet);

  const yFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 7),
    pbr.get('darkWalnutStripFloor', { repeatX: 3, repeatY: 3, tint: 0x5c3e2a })
  );
  yFloor.rotation.x = -Math.PI / 2;
  const yWall = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 3.2),
    pbr.get('parquetWoodFloor', { repeatX: 3, repeatY: 2, tint: 0x784a2a })
  );
  yWall.position.set(0, 1.6, -2.0);
  yakinikuSet.add(yFloor, yWall, yakinikuRig.group);

  // Minato (Left), Tadokoro (Center-Back), and Classmate (Right) seated happily around the sizzling round grill!
  const makeDiner = (role, shirtHex, px, pz, ry) => {
    const h = createRealisticHuman(baseMats, {
      role,
      topMat: new THREE.MeshStandardMaterial({ color: shirtHex, roughness: 0.78 }),
      pantsMat: baseMats.jeansDark,
      hairMat: baseMats.hairBlack,
      hasBackpack: false,
    });
    h.root.position.set(px, -0.44, pz);
    h.root.rotation.y = ry;
    h.leftLeg.hipJoint.rotation.x = -1.42;
    h.rightLeg.hipJoint.rotation.x = -1.42;
    h.rightArm.shoulder.rotation.set(-0.92, 0.18, -0.15);
    h.rightArm.elbow.rotation.set(-0.48, 0, 0);
    return h;
  };
  const minatoYaki = makeDiner('minato_yaki', 0x1e3a5f, -0.78, -0.35, 0.85);
  const tadokoroYaki = makeDiner('tadokoro_yaki', 0x334155, 0.0, -0.84, 0.0);
  const friendYaki = makeDiner('friend_yaki', 0x7c2d12, 0.78, -0.35, -0.85);
  yakinikuSet.add(minatoYaki.root, tadokoroYaki.root, friendYaki.root);

  // ===========================================================================
  // SET 3C: 夏の星座と二階角部屋（すりガラス越しに点滅する計算機の赤いランプ！）
  // ===========================================================================
  const summerNightSet = new THREE.Group();
  summerNightSet.visible = false;
  scene.add(summerNightSet);

  const aptRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 14),
    pbr.get('asphaltRoadDry', { repeatX: 4, repeatY: 4, tint: 0x334155 })
  );
  aptRoad.rotation.x = -Math.PI / 2;
  const aptBuilding = new THREE.Mesh(
    new THREE.BoxGeometry(6.8, 5.4, 3.6),
    pbr.get('archWhiteConcrete', { repeatX: 3, repeatY: 2, tint: 0x64748b })
  );
  aptBuilding.position.set(0, 2.7, -5.2);
  // 2nd Floor Corner Room 203 Frosted Glass Window + Warm Faint Glow + Blinking Red RTX 3090 LED!
  const win203 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.45, 1.05),
    new THREE.MeshBasicMaterial({ color: 0x1e293b })
  );
  win203.position.set(1.85, 3.85, -3.38);
  const redWinLedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const redWinLed = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), redWinLedMat);
  redWinLed.position.set(2.15, 3.65, -3.32);
  const redWinHalo = new THREE.Mesh(
    new THREE.CircleGeometry(0.24, 20),
    new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.35 })
  );
  redWinHalo.position.set(2.15, 3.65, -3.35);

  // Twinkling Summer Night Constellation Stars!
  const starGeo = new THREE.BufferGeometry();
  const starPos = [];
  for (let i = 0; i < 120; i++) {
    starPos.push((Math.random() - 0.5) * 28, 5.8 + Math.random() * 10, -14 - Math.random() * 6);
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xe0f2fe, size: 0.14 }));

  const minatoWalk = createRealisticHuman(baseMats, {
    role: 'minato_summer_walk',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: true,
  });
  minatoWalk.root.position.set(-0.4, 0, 1.4);
  minatoWalk.root.rotation.y = Math.PI * 0.88;
  summerNightSet.add(aptRoad, aptBuilding, win203, redWinLed, redWinHalo, stars, minatoWalk.root);

  // ===========================================================================
  // SET 4: 『コーポ武蔵野』203号室 — 7.62kg 初自立＆U字にたるむオレンジ安全ベルト＆櫓内4歩＆28.4V稲妻！
  // ===========================================================================
  const room203Set = new THREE.Group();
  room203Set.visible = false;
  scene.add(room203Set);

  const roomFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.8, 5.8),
    pbr.get('darkWalnutStripFloor', { repeatX: 4, repeatY: 4 })
  );
  roomFloor.rotation.x = -Math.PI / 2; roomFloor.receiveShadow = true;
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(5.8, 3.0),
    pbr.get('wallpaperWhiteWoven', { repeatX: 4, repeatY: 2 })
  );
  backWall.position.set(0, 1.5, -1.85);
  room203Set.add(roomFloor, backWall);

  // Retired HMD-01 on shelf
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

  // Desk w/ Wide Monitor (Bode 35Hz / 28.4V Spike), Red E-Stop, and RTX 3090 under desk
  const deskGroup = new THREE.Group();
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.56, 0.036, 0.78),
    pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x8d6342 })
  );
  deskTop.position.set(0, 0.72, -1.22);
  for (const lx of [-0.72, 0.72]) {
    for (const lz of [-1.56, -0.88]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.72, 0.038), baseMats.blackAnodized);
      leg.position.set(lx, 0.36, lz); deskGroup.add(leg);
    }
  }
  deskGroup.add(deskTop);
  workstationRoom.group.position.set(0.32, 0.0, -1.14);
  workstationRoom.group.rotation.y = -0.35;
  deskGroup.add(workstationRoom.group);

  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(0.0, 0.738, -1.42);
  const monStand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.014, 0.14), baseMats.blackAnodized);
  monStand.position.set(0, 0.007, -0.02);
  const monNeck = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.026), baseMats.blackAnodized);
  monNeck.position.set(0, 0.08, -0.030);
  const monFrame = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.38, 0.022), baseMats.blackAnodized);
  monFrame.position.y = 0.28;
  const monFace = new THREE.Mesh(new THREE.PlaneGeometry(0.61, 0.345), screens.monScreenMat);
  monFace.position.set(0, 0.28, 0.013);
  monitorGroup.add(monStand, monNeck, monFrame, monFace);
  deskGroup.add(monitorGroup);

  matEstopRig.estopGroup.position.set(0.58, 0.738, -0.92);
  deskGroup.add(matEstopRig.estopGroup);
  room203Set.add(deskGroup);

  // 180cm Steel Gantry + Fresh Unscratched EVA Mat + Real-Time Curved Orange U-Slack Belt + 7.62kg HMD-02!
  const gantryPivot = new THREE.Group();
  gantryPivot.position.set(0.0, 0.0, 0.30);
  gantryPivot.add(gantryRig.group, matEstopRig.matGroup, dynamicBelt.group);
  hmd02.root.position.set(0, 0.042, 0);
  gantryPivot.add(hmd02.root);
  room203Set.add(gantryPivot);

  // Minato beside gantry (reaching in gently to push HMD-02's chest 3cm!)
  const minatoRoom = createRealisticHuman(baseMats, {
    role: 'minato_ch17_room',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoRoom.root.position.set(0.68, 0.0, 0.42);
  minatoRoom.root.rotation.y = -Math.PI * 0.42;
  room203Set.add(minatoRoom.root);

  function setActiveSet(name) {
    macroSysIdSet.visible = name === 'macroSysId';
    domainRandSet.visible = name === 'domainRand';
    examDeskSet.visible = name === 'examDesk';
    yakinikuSet.visible = name === 'yakiniku';
    summerNightSet.visible = name === 'summerNight';
    room203Set.visible = name === 'room203';
  }

  return {
    setActiveSet,
    hmd02,
    heroVirtual,
    dynamicBelt,
    workstationRoom,
    forceGaugeRig,
    sorboRig,
    drClones,
    yakinikuRig,
    redWinLedMat,
    redWinHalo,
    minatoRoom,
    memRing,
  };
}
