import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createHMD01Rev18Fighter } from '../ch09/hmd01Rev18Rig.js';
import { createCh10StoryProps } from '../ch10/qddAndHallProps.js';
import { createHMD02BodyRig, createCarbonFiberMaterial } from '../ch14/hmd02BodyRig.js';
import { createSteelGantry180cmRig } from '../ch14/ch14PropsAndRig.js';
import { createWorkstationRtx3090Rig } from '../ch15/ch15PropsAndRig.js';
import {
  createXt90sAndJetsonChestRig,
  createGougedEvaMatAndEstopRig,
  createSingleLegViseDiagnosticRig,
} from './ch16PropsAndRig.js';

/**
 * Dynamic Screens & Chalkboards for Chapter 16:
 * 1. `diagScreenMat`: High-speed Sim-to-Real Diagnostic Monitor showing the 3 Real-World Muds:
 *    - `'latency_42ms'`: 4.2ms Neural Loop Delay (`Command` vs `Actual Torque` phase-lag runaway!)
 *    - `'stiction_8to1'`: 8:1 Planetary Gear & Grease Static Friction Deadzone (`ピタッ…ツルッ！`)
 *    - `'vibration_imu'`: Carbon Bone Micro-Vibration contaminating Chest IMU (`大地震パニック`)
 *    - `'sysid_sweep'`: Chapter 17 Teaser — Listening to the real body's voice (`System ID Sine Sweep`)
 * 2. `bodeChalkMat`: Crisp `自動制御` University Chalkboard w/ Bode Plot (`-180°` phase lag & `システム同定`)!
 */
export function createCh16Screens() {
  const diagC = document.createElement('canvas');
  diagC.width = 1024; diagC.height = 576;
  const dx = diagC.getContext('2d');
  const diagTex = new THREE.CanvasTexture(diagC);
  diagTex.colorSpace = THREE.SRGBColorSpace;
  const diagScreenMat = new THREE.MeshBasicMaterial({ map: diagTex });

  let lastDiag = '';
  function updateDiagScreen(mode) {
    if (mode === lastDiag) return;
    lastDiag = mode;

    dx.fillStyle = '#070b14'; dx.fillRect(0, 0, 1024, 576);
    dx.fillStyle = '#1e293b'; dx.fillRect(0, 0, 1024, 50);
    dx.fillStyle = '#38bdf8'; dx.font = '800 22px monospace';
    dx.fillText('HMD-02 SIM-TO-REAL AUTOPSY // 1,000 Hz OSCILLOSCOPE + CAN LOG', 22, 33);

    // Grid plot region
    dx.strokeStyle = '#334155'; dx.lineWidth = 2; dx.strokeRect(32, 74, 580, 330);
    dx.strokeStyle = '#1e293b'; dx.lineWidth = 1;
    for (let x = 90; x < 610; x += 58) {
      dx.beginPath(); dx.moveTo(x, 74); dx.lineTo(x, 404); dx.stroke();
    }
    for (let y = 128; y < 404; y += 55) {
      dx.beginPath(); dx.moveTo(32, y); dx.lineTo(612, y); dx.stroke();
    }

    if (mode === 'latency_42ms') {
      // Command wave (amber) vs 4.2ms delayed actual response (cyan) -> growing oscillation!
      dx.strokeStyle = '#f59e0b'; dx.lineWidth = 4; dx.beginPath();
      for (let i = 0; i <= 540; i += 4) {
        const u = i / 540;
        const amp = 28 + u * 96;
        const y = 240 - Math.sin(u * Math.PI * 6.5) * amp;
        if (i === 0) dx.moveTo(52 + i, y); else dx.lineTo(52 + i, y);
      }
      dx.stroke();

      dx.strokeStyle = '#22d3ee'; dx.lineWidth = 4; dx.beginPath();
      for (let i = 0; i <= 540; i += 4) {
        const u = Math.max(0, (i - 36) / 540);
        const amp = 28 + u * 96;
        const y = 240 - Math.sin(u * Math.PI * 6.5) * amp;
        if (i === 0) dx.moveTo(52 + i, y); else dx.lineTo(52 + i, y);
      }
      dx.stroke();

      // Highlight 4.2ms gap marker
      dx.fillStyle = 'rgba(239,68,68,0.28)'; dx.fillRect(216, 86, 36, 304);
      dx.fillStyle = '#f87171'; dx.font = '900 22px monospace';
      dx.fillText('Δt = 4.2 ms DELAY!', 180, 110);

      dx.fillStyle = '#f8fafc'; dx.font = '900 26px sans-serif';
      dx.fillText('① 神経の遅れ：4.2 ms', 636, 114);
      dx.fillStyle = '#fbbf24'; dx.font = '700 20px sans-serif';
      dx.fillText('■ 仮想空間：時間遅れ 0.0 ms', 636, 162);
      dx.fillStyle = '#22d3ee';
      dx.fillText('■ 実機体内：IMU→Jetson→CAN', 636, 198);
      dx.fillText('　 合計 4.2ミリ秒のタイムラグ！', 636, 228);
      dx.fillStyle = '#f87171'; dx.font = '800 21px sans-serif';
      dx.fillText('4ms前の過去へ全力逆ハンドル', 636, 286);
      dx.fillText('→ 0.3秒で自己増幅・暴走発振！', 636, 320);

      dx.fillStyle = '#450a0a'; dx.fillRect(32, 428, 960, 120);
      dx.strokeStyle = '#ef4444'; dx.lineWidth = 4; dx.strokeRect(32, 428, 960, 120);
      dx.fillStyle = '#fecaca'; dx.font = '900 30px sans-serif';
      dx.fillText('犯人 #1 特定：現実の『4.2ミリ秒の神経遅延』', 56, 480);
      dx.fillStyle = '#fde68a'; dx.font = '700 22px monospace';
      dx.fillText('IMU(0.8ms) + Bridge(0.9ms) + Jetson NN(1.4ms) + CAN/FOC(1.1ms) = 4.2ms', 56, 524);
    } else if (mode === 'stiction_8to1') {
      // Static Friction Deadzone Staircase ("ピタッ…ツルッ！")
      dx.strokeStyle = '#64748b'; dx.setLineDash([8, 6]); dx.lineWidth = 3;
      dx.beginPath(); dx.moveTo(60, 368); dx.lineTo(570, 108); dx.stroke();
      dx.setLineDash([]);
      dx.strokeStyle = '#fb923c'; dx.lineWidth = 5;
      dx.beginPath();
      dx.moveTo(60, 368); dx.lineTo(245, 368); // Stuck in grease!
      dx.lineTo(258, 250); // Sudden breakaway slip!
      dx.lineTo(570, 130);
      dx.stroke();
      dx.fillStyle = '#fbbf24'; dx.font = '800 20px sans-serif';
      dx.fillText('静止摩擦の引っかかり（ピタッ）', 68, 344);
      dx.fillStyle = '#f87171';
      dx.fillText('急激な滑り出し（ツルッ！）', 268, 242);

      dx.fillStyle = '#f8fafc'; dx.font = '900 26px sans-serif';
      dx.fillText('② 歯車とグリスの粘り', 636, 114);
      dx.fillStyle = '#fb923c'; dx.font = '700 20px sans-serif';
      dx.fillText('■ 8:1 鋼鉄遊星歯車＋グリス', 636, 166);
      dx.fillStyle = '#cbd5e1';
      dx.fillText('仮想空間は0.01Nで氷のように動く', 636, 212);
      dx.fillText('実機は動き出しに強い静止摩擦！', 636, 246);
      dx.fillStyle = '#f87171'; dx.font = '800 20px sans-serif';
      dx.fillText('ゲイン半減で膝が1mmも動かず', 636, 300);
      dx.fillText('→ 濡れた段ボールのように崩壊', 636, 334);

      dx.fillStyle = '#431407'; dx.fillRect(32, 428, 960, 120);
      dx.strokeStyle = '#f97316'; dx.lineWidth = 4; dx.strokeRect(32, 428, 960, 120);
      dx.fillStyle = '#fed7aa'; dx.font = '900 30px sans-serif';
      dx.fillText('犯人 #2 特定：8:1遊星歯車の『グリス静止摩擦（Stiction）』', 56, 480);
      dx.fillStyle = '#fde68a'; dx.font = '700 22px monospace';
      dx.fillText('BREAKAWAY TORQUE: 0.68 N·m  |  VIRTUAL SIM ASSUMED: 0.00 N·m', 56, 524);
    } else if (mode === 'vibration_imu') {
      // High-frequency ringing spike noise contaminating Chest IMU!
      dx.strokeStyle = '#f43f5e'; dx.lineWidth = 3; dx.beginPath();
      for (let i = 0; i <= 540; i += 2) {
        const u = i / 540;
        const env = u > 0.18 ? Math.exp(-(u - 0.18) * 2.2) : 0.05;
        const ring = Math.sin(i * 0.85) * 125 * env + Math.sin(i * 1.9) * 45 * env;
        const y = 240 - ring;
        if (i === 0) dx.moveTo(52 + i, y); else dx.lineTo(52 + i, y);
      }
      dx.stroke();
      dx.fillStyle = '#fb7185'; dx.font = '800 18px monospace';
      dx.fillText('CHEST IMU: +/-480 deg/s STRUCTURAL RINGING!', 52, 106);

      dx.fillStyle = '#f8fafc'; dx.font = '900 26px sans-serif';
      dx.fillText('③ 骨を伝わる微かな震え', 636, 114);
      dx.fillStyle = '#fb7185'; dx.font = '700 20px sans-serif';
      dx.fillText('■ カーボン骨格＝弦楽器の胴', 636, 166);
      dx.fillStyle = '#cbd5e1';
      dx.fillText('足裏の衝撃＆モーター振動が', 636, 212);
      dx.fillText('そのまま胸の姿勢センサへ響く！', 636, 246);
      dx.fillStyle = '#f87171'; dx.font = '800 20px sans-serif';
      dx.fillText('無菌室育ちのAIが「大地震だ！」', 636, 300);
      dx.fillText('と誤認して全身パニック発振！', 636, 334);

      dx.fillStyle = '#4c0519'; dx.fillRect(32, 428, 960, 120);
      dx.strokeStyle = '#f43f5e'; dx.lineWidth = 4; dx.strokeRect(32, 428, 960, 120);
      dx.fillStyle = '#fecdd3'; dx.font = '900 30px sans-serif';
      dx.fillText('犯人 #3 特定：カーボン骨格を伝う『構造共振・IMUノイズ』', 56, 480);
      dx.fillStyle = '#fde68a'; dx.font = '700 20px monospace';
      dx.fillText('RESONANCE PEAK: 142 Hz  |  ALL 3 REAL-WORLD MUDS IDENTIFIED', 56, 524);
    } else {
      // 'sysid_sweep': Hopeful clean cyan chirp wave listening to HMD-02's true body!
      dx.strokeStyle = '#34d399'; dx.lineWidth = 4; dx.beginPath();
      for (let i = 0; i <= 540; i += 2) {
        const u = i / 540;
        const y = 240 - Math.sin(u * u * Math.PI * 14) * 90;
        if (i === 0) dx.moveTo(52 + i, y); else dx.lineTo(52 + i, y);
      }
      dx.stroke();
      dx.fillStyle = '#a7f3d0'; dx.font = '900 26px sans-serif';
      dx.fillText('身体の声を聴く：システム同定', 628, 114);
      dx.fillStyle = '#38bdf8'; dx.font = '700 20px sans-serif';
      dx.fillText('■ 4.2ms遅延 → 夢の中へ実装', 628, 168);
      dx.fillText('■ グリス静止摩擦 → 夢の中へ', 628, 208);
      dx.fillText('■ 骨格微振動ノイズ → 夢の中へ', 628, 248);
      dx.fillStyle = '#fde68a'; dx.font = '800 21px sans-serif';
      dx.fillText('夢を現実以上の泥沼へ変える！', 628, 308);

      dx.fillStyle = '#064e3b'; dx.fillRect(32, 428, 960, 120);
      dx.strokeStyle = '#10b981'; dx.lineWidth = 4; dx.strokeRect(32, 428, 960, 120);
      dx.fillStyle = '#a7f3d0'; dx.font = '900 30px sans-serif';
      dx.fillText('▶ CHIRP SINE SWEEP 実行中 — 12関節の『本当の声』を実測！', 56, 480);
      dx.fillStyle = '#fde68a'; dx.font = '700 22px monospace';
      dx.fillText('NEXT: CHAPTER 17 — 身体の声を聴く夏 ＆ 7.62kg 初起立へ！', 56, 524);
    }

    diagTex.needsUpdate = true;
  }
  updateDiagScreen('latency_42ms');

  // --- BODE PLOT CHALKBOARD (`自動制御` 階段教室) ---
  const bC = document.createElement('canvas');
  bC.width = 1024; bC.height = 440;
  const bx = bC.getContext('2d');
  bx.fillStyle = '#163829'; bx.fillRect(0, 0, 1024, 440);
  bx.fillStyle = 'rgba(248,250,252,0.92)'; bx.font = '700 34px serif';
  bx.fillText('自動制御 — むだ時間 e^(-sL) と ボード線図（発振限界）', 36, 56);

  // Left Graph: Gain & Phase Bode Plot showing -180 deg crossover!
  bx.strokeStyle = 'rgba(226,232,240,0.65)'; bx.lineWidth = 2;
  bx.strokeRect(48, 86, 460, 290);
  // -180 deg dashed stability limit line
  bx.strokeStyle = '#fca5a5'; bx.setLineDash([8, 6]);
  bx.beginPath(); bx.moveTo(48, 298); bx.lineTo(508, 298); bx.stroke();
  bx.setLineDash([]);
  bx.fillStyle = '#fca5a5'; bx.font = '700 20px monospace';
  bx.fillText('-180° (OSCILLATION!)', 62, 288);

  // Gain curve (white)
  bx.strokeStyle = '#f8fafc'; bx.lineWidth = 4;
  bx.beginPath();
  bx.moveTo(60, 132); bx.lineTo(250, 136); bx.quadraticCurveTo(360, 152, 492, 232);
  bx.stroke();
  // Phase curve plunging steeply past -180 deg due to dead time L!
  bx.strokeStyle = '#fde047'; bx.lineWidth = 4;
  bx.beginPath();
  bx.moveTo(60, 198); bx.quadraticCurveTo(250, 212, 345, 298); bx.lineTo(445, 366);
  bx.stroke();
  // Red circle right at -180 deg unstable crossover
  bx.strokeStyle = '#ef4444'; bx.lineWidth = 4;
  bx.beginPath(); bx.arc(345, 298, 14, 0, Math.PI * 2); bx.stroke();
  bx.fillStyle = '#fde047'; bx.font = '700 20px monospace';
  bx.fillText('∠G(jω) = -ωL', 354, 240);

  // Right Side Key Lecture Principles ("システム同定")
  bx.fillStyle = '#f8fafc'; bx.font = '700 28px sans-serif';
  bx.fillText('現実の機械に「遅れゼロ」', 544, 134);
  bx.fillText('「摩擦ゼロ」は存在しない。', 544, 174);
  bx.fillStyle = '#7dd3fc'; bx.font = '800 30px sans-serif';
  bx.fillText('→ システム同定 (System ID)', 544, 244);
  bx.fillStyle = '#fde68a'; bx.font = '700 23px sans-serif';
  bx.fillText('様々な周波数の波を流し込み、', 544, 296);
  bx.fillText('相手の『ありのままのクセ』を測れ！', 544, 336);

  const bTex = new THREE.CanvasTexture(bC); bTex.colorSpace = THREE.SRGBColorSpace;
  const bodeChalkMat = new THREE.MeshStandardMaterial({ map: bTex, roughness: 0.92 });

  return { diagScreenMat, updateDiagScreen, bodeChalkMat };
}

/**
 * Builds ALL 4 Monumental Chapter 16 Sets:
 * 1. `room203Set`: Room 203 w/ 180cm Steel Gantry, 720mm `HMD-02`, Hanging `7.62 kg` Scale,
 *    Double 20mm EVA Shock Mat + Explosive Gouge Debris, Desk w/ Giant Red Mushroom E-Stop,
 *    Isolated Single-Leg Vise + Scratched Used Oscilloscope + 1000Hz Autopsy Monitor,
 *    and Minato standing/kneeling beside the gantry!
 * 2. `macroIntegrationSet`: Studio Macro Stage for `XT90-S` Anti-Spark Click & Open Carbon Chest `Jetson Orin Nano`!
 * 3. `lectureAutoCtrlSet`: Stepped `自動制御` Lecture Hall w/ Bode Plot Chalkboard, Silver-Haired Professor & Minato!
 * 4. `corridorSkybridgeSet`: Humid July Overcast Skybridge Walkway w/ Handrail & Minato's Epiphany!
 */
export function createCh16World(scene, baseMats, ngMats, screens, masterLib) {
  const { pbr } = masterLib;
  const sharedCarbonMat = createCarbonFiberMaterial();

  const hmd02 = createHMD02BodyRig(baseMats, sharedCarbonMat);
  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats, masterLib);
  heroFighter.setBattleState({ scratched: true, hipCracked: true, silverSplints: true });
  const ch10Props = createCh10StoryProps(baseMats, ngMats);

  const gantryRig = createSteelGantry180cmRig(baseMats, pbr);
  const workstationRoom = createWorkstationRtx3090Rig(baseMats);
  const xtJetsonRig = createXt90sAndJetsonChestRig(baseMats, sharedCarbonMat);
  const matEstopRig = createGougedEvaMatAndEstopRig(baseMats, pbr);
  const viseDiagRig = createSingleLegViseDiagnosticRig(baseMats, sharedCarbonMat);

  // ===========================================================================
  // SET 1: マイクロ電装統合ステージ（XT90-S 緑帯アンチスパーク接続 ＆ Jetson Orin Nano 胸郭）
  // ===========================================================================
  const macroIntegrationSet = new THREE.Group();
  scene.add(macroIntegrationSet);

  const macroTable = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 2.4),
    pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 2, tint: 0x7c573a })
  );
  macroTable.rotation.x = -Math.PI / 2;
  macroTable.receiveShadow = true;
  const macroBgWall = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 2.4),
    pbr.get('wallpaperWhiteWoven', { repeatX: 3, repeatY: 2, tint: 0x1e293b })
  );
  macroBgWall.position.set(0, 1.1, -1.0);
  xtJetsonRig.group.position.set(0, 0.036, 0);
  xtJetsonRig.chestBayGroup.position.set(0, 0.11, 0);
  macroIntegrationSet.add(macroTable, macroBgWall, xtJetsonRig.group);

  // ===========================================================================
  // SET 2: 『コーポ武蔵野』203号室 — 7.62kg HMD-02・180cm櫓・極厚EVAマット破片・赤非常停止・万力左脚解剖！
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

  // Retired 38cm `HMD-01` (1.76kg) watching silently from Top Bookshelf
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

  // Workbench Desk w/ Giant Red Mushroom E-Stop, Diagnostic Wide Monitor, Single-Leg Vise & Used RTX 3090!
  const deskGroup = new THREE.Group();
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.56, 0.036, 0.78),
    pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x8d6342 })
  );
  deskTop.position.set(0, 0.72, -1.22);
  deskTop.castShadow = true; deskTop.receiveShadow = true;
  for (const lx of [-0.72, 0.72]) {
    for (const lz of [-1.56, -0.88]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.72, 0.038), baseMats.blackAnodized);
      leg.position.set(lx, 0.36, lz);
      deskGroup.add(leg);
    }
  }
  deskGroup.add(deskTop);

  // RTX 3090 tower under desk
  workstationRoom.group.position.set(0.32, 0.0, -1.14);
  workstationRoom.group.rotation.y = -0.35;
  deskGroup.add(workstationRoom.group);

  // Wide Diagnostic PC Monitor on Desk (Neck cleanly behind frame!)
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(0.16, 0.738, -1.42);
  const monStand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.014, 0.14), baseMats.blackAnodized);
  monStand.position.set(0, 0.007, -0.02);
  const monNeck = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.026), baseMats.blackAnodized);
  monNeck.position.set(0, 0.08, -0.030);
  const monFrame = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.38, 0.022), baseMats.blackAnodized);
  monFrame.position.y = 0.28;
  const monFace = new THREE.Mesh(new THREE.PlaneGeometry(0.61, 0.345), screens.diagScreenMat);
  monFace.position.set(0, 0.28, 0.013);
  monitorGroup.add(monStand, monNeck, monFrame, monFace);
  deskGroup.add(monitorGroup);

  // Giant Red Mushroom E-Stop fixed at front-right corner of desk!
  matEstopRig.estopGroup.position.set(0.58, 0.738, -0.92);
  deskGroup.add(matEstopRig.estopGroup);

  // Isolated Single-Leg Vise Diagnostic Rig on left-center of desk!
  viseDiagRig.group.position.set(-0.32, 0.738, -1.04);
  viseDiagRig.group.rotation.y = 0.25;
  viseDiagRig.group.visible = false;
  deskGroup.add(viseDiagRig.group);
  room203Set.add(deskGroup);

  // 180cm Steel Pipe Safety Gantry in Center of Room 203 + Double 20mm EVA Mat + Hanging `7.62 kg` Scale + `HMD-02`!
  const gantryPivot = new THREE.Group();
  gantryPivot.position.set(0.0, 0.0, 0.30);
  gantryPivot.add(gantryRig.group);
  matEstopRig.matGroup.position.set(0, 0.0, 0);
  gantryPivot.add(matEstopRig.matGroup);

  // Digital Hanging Crane Scale (`7.62 kg`) hooked to gantry overhead beam!
  xtJetsonRig.craneScaleGroup.position.set(0, 1.06, 0.04);
  xtJetsonRig.craneScaleGroup.visible = false;
  gantryPivot.add(xtJetsonRig.craneScaleGroup);

  // 720mm Jet-Black `HMD-02` inside the 180cm Steel Gantry!
  const hmd02Anchor = new THREE.Group();
  hmd02Anchor.position.set(0, 0.042, 0);
  hmd02Anchor.add(hmd02.root);
  gantryPivot.add(hmd02Anchor);
  room203Set.add(gantryPivot);

  // Cyan Sine-Wave System ID Pulse Rings around HMD-02's Joints during the Warm Finale (`身体の声を聴く`)!
  const sweepMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
  const sweepRings = [];
  for (const [rx, ry] of [[-0.08, 0.40], [0.08, 0.40], [-0.08, 0.22], [0.08, 0.22]]) {
    const sr = new THREE.Mesh(new THREE.RingGeometry(0.040, 0.050, 24), sweepMat);
    sr.position.set(rx, ry, 0.06);
    hmd02Anchor.add(sr);
    sweepRings.push(sr);
  }

  // Minato in Room 203 (Standing beside gantry / slamming E-stop / kneeling / touching HMD-02's thigh!)
  const minatoRoom = createRealisticHuman(baseMats, {
    role: 'minato_ch16_room',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoRoom.root.position.set(0.68, 0.0, 0.16);
  minatoRoom.root.rotation.y = -Math.PI * 0.56;
  room203Set.add(minatoRoom.root);

  // ===========================================================================
  // SET 3: 7月4日『自動制御』階段教室 — ボード線図黒板・白髪の教授・聴き入る湊!
  // ===========================================================================
  const lectureAutoCtrlSet = new THREE.Group();
  lectureAutoCtrlSet.visible = false;
  scene.add(lectureAutoCtrlSet);

  const lecFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(11, 10),
    pbr.get('parquetWoodFloor', { repeatX: 4, repeatY: 4, tint: 0x85674c })
  );
  lecFloor.rotation.x = -Math.PI / 2;
  const lecWall = new THREE.Mesh(
    new THREE.PlaneGeometry(11, 4.2),
    pbr.get('archWhiteConcrete', { repeatX: 4, repeatY: 2 })
  );
  lecWall.position.set(0, 2.1, -2.6);
  const bodeBoard = new THREE.Mesh(new THREE.PlaneGeometry(3.15, 1.35), screens.bodeChalkMat);
  bodeBoard.position.set(0.18, 1.72, -2.54);
  const podium = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 1.02, 0.46),
    pbr.get('walnutWoodFloor', { repeatX: 1, repeatY: 1, tint: 0x735238 })
  );
  podium.position.set(-1.15, 0.51, -1.72);

  // Silver-haired Professor (`白髪の教授`) gesturing beside the Bode Plot chalkboard!
  const prof = createRealisticHuman(baseMats, {
    role: 'professor_ctrl',
    topMat: new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.78 }),
    pantsMat: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.82 }),
    hairMat: new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.65 }), // Silver-white hair!
    hasBackpack: false,
  });
  prof.root.position.set(-1.26, 0.0, -1.48);
  prof.root.rotation.y = 0.58;
  prof.rightArm.shoulder.rotation.set(-1.15, 0.35, -0.35);
  prof.rightArm.elbow.rotation.set(-0.35, 0, 0);

  // Foreground Stepped Desk & Minato listening intently
  const stepDesk = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 0.05, 0.50),
    pbr.get('birchPlywoodSheet', { repeatX: 2, repeatY: 1 })
  );
  stepDesk.position.set(0.2, 0.92, -0.15);
  const minatoLec = createRealisticHuman(baseMats, {
    role: 'minato_ctrl_lec',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoLec.root.position.set(0.28, -0.25, 0.25);
  minatoLec.root.rotation.y = Math.PI * 0.94;
  minatoLec.leftLeg.hipJoint.rotation.x = -1.4;
  minatoLec.rightLeg.hipJoint.rotation.x = -1.4;

  lectureAutoCtrlSet.add(lecFloor, lecWall, bodeBoard, podium, prof.root, stepDesk, minatoLec.root);

  // ===========================================================================
  // SET 4: 大学渡り廊下の手すり — 湿った七月の風の中で両手のひらを見つめる湊の覚醒!
  // ===========================================================================
  const corridorSkybridgeSet = new THREE.Group();
  corridorSkybridgeSet.visible = false;
  scene.add(corridorSkybridgeSet);

  const corrFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(8.0, 2.8),
    pbr.get('archWhiteConcrete', { repeatX: 4, repeatY: 2, tint: 0x94a3b8 })
  );
  corrFloor.rotation.x = -Math.PI / 2;
  const corrRoof = new THREE.Mesh(
    new THREE.BoxGeometry(8.0, 0.14, 2.8),
    pbr.get('archWhiteConcrete', { repeatX: 4, repeatY: 2, tint: 0x64748b })
  );
  corrRoof.position.set(0, 2.75, 0);
  // Aluminum Skybridge Handrail (`渡り廊下の手すり`) + Vertical Balusters
  const railTop = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 8.0, 14), baseMats.aluminumBrushed);
  railTop.rotation.z = Math.PI / 2;
  railTop.position.set(0, 1.05, -0.95);
  const railMid = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 8.0, 10), baseMats.aluminumBrushed);
  railMid.rotation.z = Math.PI / 2;
  railMid.position.set(0, 0.56, -0.95);
  corridorSkybridgeSet.add(corrFloor, corrRoof, railTop, railMid);
  for (let px = -3.0; px <= 3.0; px += 0.85) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 1.06, 10), baseMats.aluminumBrushed);
    post.position.set(px, 0.53, -0.95);
    corridorSkybridgeSet.add(post);
  }
  // Distant Campus Building Silhouette & July Overcast Trees beyond the skybridge
  const distCampus = new THREE.Mesh(
    new THREE.BoxGeometry(10, 4.8, 1.2),
    pbr.get('archWhiteConcrete', { repeatX: 5, repeatY: 2, tint: 0x7c8aa0 })
  );
  distCampus.position.set(0, 1.8, -9.5);
  corridorSkybridgeSet.add(distCampus);

  // Minato leaning gently over the skybridge rail, looking down at both open palms!
  const minatoSky = createRealisticHuman(baseMats, {
    role: 'minato_skybridge',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: true,
  });
  minatoSky.root.position.set(0.0, 0.0, -0.58);
  minatoSky.root.rotation.y = Math.PI * 0.92;
  minatoSky.leftArm.shoulder.rotation.set(-1.05, 0.15, 0.18);
  minatoSky.leftArm.elbow.rotation.set(-0.85, 0, 0);
  minatoSky.rightArm.shoulder.rotation.set(-1.05, -0.15, -0.18);
  minatoSky.rightArm.elbow.rotation.set(-0.85, 0, 0);
  corridorSkybridgeSet.add(minatoSky.root);

  function setActiveSet(name) {
    macroIntegrationSet.visible = name === 'macroIntegration';
    room203Set.visible = name === 'room203';
    lectureAutoCtrlSet.visible = name === 'lectureAutoCtrl';
    corridorSkybridgeSet.visible = name === 'corridorSkybridge';
  }

  return {
    setActiveSet,
    hmd02,
    hmd02Anchor,
    gantryPivot,
    gantryRig,
    workstationRoom,
    xtJetsonRig,
    matEstopRig,
    viseDiagRig,
    deskGroup,
    monitorGroup,
    minatoRoom,
    minatoSky,
    sweepMat,
    sweepRings,
  };
}
