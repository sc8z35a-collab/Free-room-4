import * as THREE from 'three';
import { createRealisticHuman, createMacroHandRig } from '../humans.js';
import { createHMD01Lower12DOF, createCh04LabProps } from './ik12dofRig.js';

function makeWireTube(points, radius, mat, segs = 18) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segs, radius, 8, false), mat);
  mesh.castShadow = true;
  return mesh;
}

export function createCh04Screens() {
  // 1. Laptop Screen (1024 x 640)
  const lapC = document.createElement('canvas');
  lapC.width = 1024;
  lapC.height = 640;
  const lctx = lapC.getContext('2d');
  const lapTex = new THREE.CanvasTexture(lapC);
  lapTex.colorSpace = THREE.SRGBColorSpace;
  const laptopMat = new THREE.MeshBasicMaterial({ map: lapTex });

  // 2. ATM / Smartphone Screen (768 x 1024)
  const atmC = document.createElement('canvas');
  atmC.width = 768;
  atmC.height = 1024;
  const actx = atmC.getContext('2d');
  const atmTex = new THREE.CanvasTexture(atmC);
  atmTex.colorSpace = THREE.SRGBColorSpace;
  const atmMat = new THREE.MeshBasicMaterial({ map: atmTex });

  // 3. Digital Kitchen Scale Readout (512 x 240)
  const scC = document.createElement('canvas');
  scC.width = 512;
  scC.height = 240;
  const sctx = scC.getContext('2d');
  const scTex = new THREE.CanvasTexture(scC);
  scTex.colorSpace = THREE.SRGBColorSpace;
  sctx.fillStyle = '#18181b';
  sctx.fillRect(0, 0, 512, 240);
  sctx.strokeStyle = '#52525b';
  sctx.lineWidth = 6;
  sctx.strokeRect(8, 8, 496, 224);
  sctx.fillStyle = '#94a3b8';
  sctx.font = '700 24px monospace';
  sctx.fillText('HMD-01 LOWER 12-DOF MASS', 34, 52);
  sctx.fillStyle = '#ef4444';
  sctx.font = '900 104px monospace';
  sctx.fillText('1,042 g', 48, 178);
  const scaleLcdMat = new THREE.MeshBasicMaterial({ map: scTex });

  // 4. Lecture Hall Chalkboard (1280 x 640, Linear Algebra + Law of Cosines IK)
  const cbC = document.createElement('canvas');
  cbC.width = 1280;
  cbC.height = 640;
  const cctx = cbC.getContext('2d');
  cctx.fillStyle = '#183728';
  cctx.fillRect(0, 0, 1280, 640);
  cctx.fillStyle = 'rgba(255,255,255,0.04)';
  cctx.fillRect(60, 50, 1160, 540);
  cctx.fillStyle = '#f8fafc';
  cctx.font = '700 34px serif';
  cctx.fillText('線形代数Ⅰ — 直交行列の転置 R^T = R⁻¹ と 6自由度解析的逆運動学 (IK)', 48, 74);
  cctx.fillStyle = '#fef08a';
  cctx.font = '900 54px serif';
  cctx.fillText('R^T · R = I    ⇒    R⁻¹ = R^T', 74, 180);
  cctx.fillStyle = '#7dd3fc';
  cctx.font = '900 48px serif';
  cctx.fillText('cos θ₄ = (d² - L₁² - L₂²) / (2 L₁ L₂)', 74, 298);
  cctx.fillStyle = '#ffffff';
  cctx.font = '700 27px sans-serif';
  cctx.fillText('・股関節3軸一点交差 ＋ 足首2軸一点交差 ⇒ 直線距離 d は膝ピッチ角 θ₄ のみで確定！', 74, 412);
  cctx.fillText('・転置行列 R^T で「骨盤→足首」を「足首→股関節」へ瞬時に反転（計算時間 42 μs）', 74, 480);
  const cbTex = new THREE.CanvasTexture(cbC);
  cbTex.colorSpace = THREE.SRGBColorSpace;
  const chalkboardMat = new THREE.MeshStandardMaterial({ map: cbTex, roughness: 0.82 });

  // 5. 5mm Grid Engineering Notebook (1024 x 768)
  const nbC = document.createElement('canvas');
  nbC.width = 1024;
  nbC.height = 768;
  const nctx = nbC.getContext('2d');
  const nbTex = new THREE.CanvasTexture(nbC);
  nbTex.colorSpace = THREE.SRGBColorSpace;
  const notebookMat = new THREE.MeshStandardMaterial({ map: nbTex, roughness: 0.85 });

  let curLap = '';
  let curAtm = '';
  let curNb = '';

  function setAtmMode(mode) {
    if (mode === curAtm) return;
    curAtm = mode;
    if (mode === 'atm_balance') {
      actx.fillStyle = '#f1f5f9';
      actx.fillRect(0, 0, 768, 1024);
      actx.fillStyle = '#047857';
      actx.fillRect(0, 0, 768, 150);
      actx.fillStyle = '#ffffff';
      actx.font = '900 38px sans-serif';
      actx.fillText('むさしの銀行 ATM — 残高照会', 48, 95);
      actx.fillStyle = '#475569';
      actx.font = '700 30px sans-serif';
      actx.fillText('普通預金 お引出し可能残高', 54, 260);
      actx.fillStyle = '#0f172a';
      actx.font = '900 108px monospace';
      actx.fillText('¥107,920', 54, 405);
      actx.fillStyle = '#cbd5e1';
      actx.fillRect(54, 465, 660, 4);
      actx.fillStyle = '#047857';
      actx.font = '800 30px sans-serif';
      actx.fillText('＋¥48,400 入金済（深夜コンビニ3回・塾講師5コマ）', 54, 545);
      actx.fillStyle = '#334155';
      actx.font = '700 27px sans-serif';
      actx.fillText('前回残高 ¥59,520 → 左脚6自由度＆12V 15A電源 調達可能！', 54, 625);
    } else {
      actx.fillStyle = '#0f172a';
      actx.fillRect(0, 0, 768, 1024);
      actx.fillStyle = '#38bdf8';
      actx.font = '900 36px sans-serif';
      actx.fillText('✓ 注文確定（左脚＆主電源増強）', 48, 120);
      actx.fillStyle = '#f8fafc';
      actx.font = '700 30px monospace';
      actx.fillText('・Feetech STS3215 × 6個 ... ¥17,700', 48, 250);
      actx.fillText('・産業用電源 12V 15A(180W) . ¥ 3,400', 48, 330);
      actx.fillStyle = '#fde047';
      actx.font = '700 27px sans-serif';
      actx.fillText('※12軸同時駆動時の10Aピーク過電流遮断を根絶', 48, 450);
    }
    atmTex.needsUpdate = true;
  }

  function setLaptopMode(mode) {
    if (mode === curLap) return;
    curLap = mode;
    lctx.fillStyle = '#0d1117';
    lctx.fillRect(0, 0, 1024, 640);
    lctx.fillStyle = '#161b22';
    lctx.fillRect(0, 0, 1024, 40);
    lctx.fillStyle = '#8b949e';
    lctx.font = '700 18px monospace';

    if (mode === 'cad_mirror_trap') {
      lctx.fillText('Autodesk Fusion — HMD01_LeftLeg_v2_MirrorCheck.f3d', 24, 26);
      lctx.strokeStyle = '#38bdf8'; lctx.lineWidth = 4;
      lctx.strokeRect(110, 105, 340, 340);
      lctx.fillStyle = '#38bdf8'; lctx.font = '800 24px sans-serif';
      lctx.fillText('右脚 v2.0 (正転 +1)', 165, 488);

      lctx.strokeStyle = '#ef4444'; lctx.lineWidth = 5;
      lctx.strokeRect(560, 105, 340, 340);
      lctx.fillStyle = 'rgba(239, 68, 68, 0.16)';
      lctx.fillRect(560, 105, 340, 340);
      lctx.fillStyle = '#fca5a5';
      lctx.fillText('✕ 丸ごとミラー＝存在しない左利きサーボ！', 505, 488);
      lctx.fillStyle = '#fde047'; lctx.font = '700 22px monospace';
      lctx.fillText('対策: フレームのみ鏡像化 ＋ 現実のSTS3215を180°反転実装 (joint_sign = -1)', 56, 572);
    } else if (mode === 'vscode_ik_42us') {
      lctx.fillText('VS Code — LegIKSolver.cpp [ESP32-S3 240MHz FPU]', 24, 26);
      const lines = [
        ['// Closed-Form 6-DOF Analytic Inverse Kinematics', '#8b949e'],
        ['float cos_q4 = (d*d - L1*L1 - L2*L2) / (2.0f * L1 * L2);', '#79c0ff'],
        ['float q4 = acosf(cos_q4);   // <-- WARNING: Unclamped float!', '#ffa657'],
        ['Mat3 R_hip = R_pelvis.transpose() * R_thigh; // R^-1 == R^T', '#d2a8ff'],
        ['', '#ffffff'],
        ['> [BENCHMARK] 12-DOF Full IK Execution Time: 42.0 us !!', '#3fb950'],
      ];
      lctx.font = '700 23px monospace';
      lines.forEach(([tx, col], i) => {
        lctx.fillStyle = col;
        lctx.fillText(tx, 36, 112 + i * 68);
      });
    } else if (mode === 'nan_exception') {
      lctx.fillStyle = '#2d0609';
      lctx.fillRect(0, 40, 1024, 600);
      lctx.fillStyle = '#ff6b6b'; lctx.font = '900 31px monospace';
      lctx.fillText('[FATAL] acosf(1.0000019f) => NaN RUNAWAY !!', 42, 120);
      lctx.fillStyle = '#fde047'; lctx.font = '700 23px monospace';
      lctx.fillText('z = -220.0f  ->  d = 186.00018f  ->  cos_q4 = 1.0000019f (> 1.0!)', 42, 205);
      lctx.fillText('NaN -> (uint16_t)0x0000 (Goal = -180.0 deg Extreme Limit!)', 42, 270);
      lctx.fillStyle = '#fca5a5';
      lctx.fillText('Speed = 0 => UNLIMITED 100% MAX TORQUE (30 kg·cm x 12 Axes!)', 42, 340);
      lctx.fillStyle = '#ffffff';
      lctx.fillText('Left Knee Jammed | Left Hip Cradle SHATTERED (Self-Collision)', 42, 430);
    } else if (mode === 'failsafe_code') {
      lctx.fillText('VS Code — LegIKSolver_Safe.cpp [Triple Fail-Safe Active]', 24, 26);
      const lines = [
        ['// 1. Hardware E-Stop: Red Mushroom Main 12V Cutoff (0.1s)', '#f87171'],
        ['// 2. EEPROM Limits (0x09/0x0B) + Slew-Rate <= 5.0 deg/10ms', '#79c0ff'],
        ['float c = std::clamp(cos_q4, -1.0f, 1.0f);', '#3fb950'],
        ['if (!std::isfinite(c)) { emergencyTorqueOff(); return; }', '#3fb950'],
        ['// 3. Singularity-Free Crouched Home: z = -200.0mm (Knee 53.6°)', '#fde047'],
      ];
      lctx.font = '700 23px monospace';
      lines.forEach(([tx, col], i) => {
        lctx.fillStyle = col;
        lctx.fillText(tx, 34, 125 + i * 76);
      });
    } else if (mode === 'circle_ik_ok') {
      lctx.fillText('HMD-01 Real-Time 100Hz IK Telemetry — Pelvis Circle r=25.0mm', 24, 26);
      lctx.strokeStyle = '#34d399'; lctx.lineWidth = 5;
      lctx.beginPath(); lctx.arc(260, 330, 145, 0, Math.PI * 2); lctx.stroke();
      lctx.fillStyle = '#34d399'; lctx.font = '800 25px monospace';
      lctx.fillText('Pelvis 3D Circle: r = 25.0 mm', 460, 210);
      lctx.fillText('Pelvis Height   : z = -200.0 mm (Knee 53.6°)', 460, 275);
      lctx.fillText('Pelvis Roll Mix : +5.0 deg', 460, 340);
      lctx.fillStyle = '#7dd3fc';
      lctx.fillText('Both Foot Soles : 0.00 mm Slip [GLUED]', 460, 415);
      lctx.fillStyle = '#fde047';
      lctx.fillText('Solve Time      : 42 us / 100 Hz', 460, 480);
    } else if (mode === 'circle_ik_warn') {
      lctx.fillText('HMD-01 Real-Time 100Hz IK Telemetry — Lap 30 Glitch', 24, 26);
      lctx.fillStyle = '#dc2626';
      lctx.fillRect(36, 150, 952, 96);
      lctx.fillStyle = '#ffffff'; lctx.font = '900 26px monospace';
      lctx.fillText('[WARN] Servo ID:11 Checksum / Timeout Error (Retry OK)', 54, 208);
      lctx.fillStyle = '#fde047'; lctx.font = '700 24px sans-serif';
      lctx.fillText('原因：12軸の微細振動によるユニバーサル基板ピンヘッダのコンマ数ms接触瞬断', 44, 340);
      lctx.fillStyle = '#7dd3fc';
      lctx.fillText('課題：臍の緒（外部電源線）を断ち、LiPo＋IMU搭載の専用プリント基板(PCB)へ！', 44, 420);
    } else {
      // 'kicad_launch'
      lctx.fillStyle = '#111827';
      lctx.fillRect(0, 40, 1024, 600);
      // Clean KiCad 8.0 Launch Card in center of screen
      lctx.fillStyle = '#1e3a8a';
      lctx.fillRect(332, 155, 360, 260);
      lctx.strokeStyle = '#60a5fa'; lctx.lineWidth = 6;
      lctx.strokeRect(332, 155, 360, 260);
      lctx.fillStyle = '#ffffff'; lctx.font = '900 68px sans-serif';
      lctx.fillText('KiCad', 412, 295);
      lctx.fillStyle = '#93c5fd'; lctx.font = '700 24px monospace';
      lctx.fillText('EDA / PCB Design Suite 8.0', 352, 365);
      lctx.fillStyle = '#34d399'; lctx.font = '800 26px monospace';
      lctx.fillText('New Project: HMD-CORE-v1.kicad_pro', 265, 505);
    }
    lapTex.needsUpdate = true;
  }

  function setNotebookMode(mode) {
    if (mode === curNb) return;
    curNb = mode;
    nctx.fillStyle = '#fcfbf7';
    nctx.fillRect(0, 0, 1024, 768);
    nctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    nctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 24) { nctx.beginPath(); nctx.moveTo(x, 0); nctx.lineTo(x, 768); nctx.stroke(); }
    for (let y = 0; y < 768; y += 24) { nctx.beginPath(); nctx.moveTo(0, y); nctx.lineTo(1024, y); nctx.stroke(); }

    if (mode === 'joint_sign') {
      nctx.fillStyle = '#0f172a'; nctx.font = '800 32px sans-serif';
      nctx.fillText('Day 060 全12関節 座標系符号配列 joint_sign[12]', 44, 74);
      nctx.font = '700 26px monospace';
      nctx.fillStyle = '#1d4ed8';
      nctx.fillText('Right Leg (ID 01..06): { +1, +1, +1, +1, +1, +1 }', 44, 175);
      nctx.fillStyle = '#b91c1c';
      nctx.fillText('Left  Leg (ID 07..12): { -1, -1, -1, -1, -1, +1 } // 180°反転実装', 44, 250);
      nctx.fillStyle = '#0f172a';
      nctx.fillText('実測重量: 右脚 478g ＋ 左脚 478g ＋ 6mm骨盤 86g ＝ 1,042 g', 44, 365);
    } else {
      // 'singularity_calc' (Derivative of arccos(x) -> -infinity!)
      nctx.fillStyle = '#0f172a'; nctx.font = '800 32px sans-serif';
      nctx.fillText('微分積分学Ⅰ — 逆余弦関数の導関数発散と『膝伸び切り特異点』', 40, 72);
      nctx.fillStyle = '#b91c1c'; nctx.font = '900 44px serif';
      nctx.fillText('dθ / dx  =  - 1 / √(1 - x²)   →  -∞   (x → 1.0)', 56, 170);

      // Draw asymptotic singularity curve plunging to -infinity at x=1.0!
      nctx.strokeStyle = '#334155'; nctx.lineWidth = 3;
      nctx.beginPath(); nctx.moveTo(110, 240); nctx.lineTo(110, 650); nctx.moveTo(90, 290); nctx.lineTo(880, 290); nctx.stroke();

      nctx.strokeStyle = '#dc2626'; nctx.lineWidth = 6;
      nctx.beginPath();
      for (let i = 0; i <= 95; i++) {
        const xVal = i / 100;
        const deriv = -1 / Math.sqrt(Math.max(0.015, 1 - xVal * xVal));
        const px = 110 + xVal * 720;
        const py = Math.min(665, 290 - deriv * 48);
        if (i === 0) nctx.moveTo(px, py);
        else nctx.lineTo(px, py);
      }
      nctx.stroke();

      // Safe Crouched Operating Point (x = cos 53.6° ≈ 0.593) vs Cliff at x = 1.0!
      nctx.fillStyle = '#047857';
      nctx.beginPath(); nctx.arc(110 + 0.593 * 720, 350, 12, 0, Math.PI * 2); nctx.fill();
      nctx.font = '800 24px sans-serif';
      nctx.fillText('✓ 安全中腰姿勢 z=-200mm (x≈0.593, 膝53.6°)', 160, 420);
      nctx.fillStyle = '#dc2626';
      nctx.fillText('✕ 特異点の崖 x=1.0 (z=-220mm 直立極限 → 角速度無限大！)', 240, 635);
    }
    nbTex.needsUpdate = true;
  }

  setAtmMode('atm_balance');
  setLaptopMode('cad_mirror_trap');
  setNotebookMode('joint_sign');

  return {
    laptopMat,
    atmMat,
    scaleLcdMat,
    chalkboardMat,
    notebookMat,
    setAtmMode,
    setLaptopMode,
    setNotebookMode,
  };
}

/**
 * Builds the 3 Photorealistic Sets for Chapter 4:
 * 1. `atmCorner`: Station-front Convenience Store ATM in bright May morning sun
 * 2. `lecture`: Linear Algebra Tiered Lecture Hall + 3D Interactive IK Triangle Hologram
 * 3. `apartment`: Room 203 with Rain-Streaked Window + Wet Hydrangeas + 12-DOF IK Lab!
 */
export function createCh04World(scene, mats, screens) {
  // ===========================================================================
  // SET 1: 駅前コンビニ ATM コーナー (May 25, 08:40 AM Morning Sunlight)
  // ===========================================================================
  const atmCorner = new THREE.Group();
  scene.add(atmCorner);

  const convFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(7.0, 7.0),
    new THREE.MeshPhysicalMaterial({ color: 0xe5e7eb, roughness: 0.24, clearcoat: 0.45 })
  );
  convFloor.rotation.x = -Math.PI / 2;
  convFloor.receiveShadow = true;
  atmCorner.add(convFloor);

  const convWall = new THREE.Mesh(
    new THREE.PlaneGeometry(7.0, 3.2),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 })
  );
  convWall.position.set(0, 1.6, -2.2);
  convWall.receiveShadow = true;
  atmCorner.add(convWall);

  // Convenience Store Signature Green/Orange/Blue Stripe Header on Glass Storefront
  const glassFront = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.8), mats.glassClear);
  glassFront.rotation.y = Math.PI / 2;
  glassFront.position.set(-1.95, 1.4, -0.2);
  atmCorner.add(glassFront);

  const stripeColors = [0x16a34a, 0xf97316, 0x0284c7];
  stripeColors.forEach((hex, idx) => {
    const st = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.08, 4.2),
      new THREE.MeshBasicMaterial({ color: hex })
    );
    st.position.set(-1.94, 2.35 - idx * 0.09, -0.2);
    atmCorner.add(st);
  });

  // Bank ATM Kiosk Machine
  const atmMachine = new THREE.Group();
  atmMachine.position.set(0.15, 0, -1.45);
  const atmLower = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.92, 0.66), mats.bambuWhite);
  atmLower.position.y = 0.46;
  atmLower.castShadow = true;
  atmMachine.add(atmLower);

  const atmUpper = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.62, 0.44), mats.darkAnodized);
  atmUpper.position.set(0, 1.22, -0.09);
  atmUpper.castShadow = true;
  atmMachine.add(atmUpper);

  const atmScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.54), screens.atmMat);
  atmScreen.position.set(0, 1.22, 0.134);
  atmMachine.add(atmScreen);

  // Glowing green card-slot bezel
  const cardSlot = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 0.025, 0.04),
    new THREE.MeshBasicMaterial({ color: 0x22c55e })
  );
  cardSlot.position.set(0.20, 0.95, 0.22);
  atmMachine.add(cardSlot);
  atmCorner.add(atmMachine);

  const minatoAtm = createRealisticHuman(mats, {
    role: 'minato',
    topMat: mats.hoodieNavy,
    pantsMat: mats.jeansDark,
    hairMat: mats.hairBlack,
    hasBackpack: true,
  });
  minatoAtm.root.position.set(0.15, 0, -0.62);
  minatoAtm.root.rotation.y = Math.PI;
  atmCorner.add(minatoAtm.root);

  // ===========================================================================
  // SET 2: 東都農工大学 講義棟 2限『線形代数Ⅰ』階段教室 + 3D IK Hologram
  // ===========================================================================
  const lecture = new THREE.Group();
  lecture.visible = false;
  scene.add(lecture);

  const lecFloor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), mats.woodFloor);
  lecFloor.rotation.x = -Math.PI / 2;
  lecFloor.receiveShadow = true;
  lecture.add(lecFloor);

  const lecWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 4.2), mats.wallPaper);
  lecWall.position.set(0, 2.1, -3.4);
  lecture.add(lecWall);

  const cbFrame = new THREE.Mesh(
    new THREE.BoxGeometry(3.92, 1.78, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x543824, roughness: 0.65 })
  );
  cbFrame.position.set(0, 1.92, -3.36);
  lecture.add(cbFrame);

  const cbMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 1.66), screens.chalkboardMat);
  cbMesh.position.set(0, 1.92, -3.33);
  lecture.add(cbMesh);

  for (let row = 0; row < 3; row++) {
    const rz = -0.65 + row * 1.15;
    const ry = row * 0.14;
    const lDesk = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.72, 0.44), mats.deskWood);
    lDesk.position.set(0, ry + 0.36, rz);
    lDesk.castShadow = true;
    lDesk.receiveShadow = true;
    lecture.add(lDesk);
  }

  const minatoLec = createRealisticHuman(mats, {
    role: 'minato',
    topMat: mats.hoodieNavy,
    pantsMat: mats.jeansDark,
    hairMat: mats.hairBlack,
    hasBackpack: false,
  });
  minatoLec.root.position.set(0.15, 0.14, 0.88);
  minatoLec.root.rotation.y = Math.PI;
  lecture.add(minatoLec.root);

  // 3D Mathematical Law-of-Cosines IK & Orthogonal Matrix Hologram above Lecture Desk!
  const ikHolo = new THREE.Group();
  ikHolo.position.set(0.15, 1.08, 0.52);
  lecture.add(ikHolo);

  const holoHipNode = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 14), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
  holoHipNode.position.set(0, 0.14, 0);
  const holoKneeNode = new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 14), new THREE.MeshBasicMaterial({ color: 0xf97316 }));
  const holoAnkNode = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 14), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
  holoAnkNode.position.set(0, -0.06, 0);
  ikHolo.add(holoHipNode, holoKneeNode, holoAnkNode);

  // Distance vector `d` line + L1 & L2 bars + RGB Coordinate Frame Triad
  const dBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 0.20, 10), new THREE.MeshBasicMaterial({ color: 0x34d399 }));
  dBeam.position.set(0, 0.04, 0);
  ikHolo.add(dBeam);

  const l1Bar = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.115, 10), new THREE.MeshBasicMaterial({ color: 0x7dd3fc }));
  const l2Bar = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.115, 10), new THREE.MeshBasicMaterial({ color: 0x7dd3fc }));
  ikHolo.add(l1Bar, l2Bar);

  // ===========================================================================
  // SET 3: 『コーポ武蔵野』203号室 — 梅雨の雨窓・紫陽花・12自由度IK実験室
  // ===========================================================================
  const apartment = new THREE.Group();
  apartment.visible = false;
  scene.add(apartment);

  const roomWood = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 4.6), mats.woodFloor);
  roomWood.rotation.x = -Math.PI / 2;
  roomWood.receiveShadow = true;
  apartment.add(roomWood);

  const tatamiArea = new THREE.Mesh(new THREE.BoxGeometry(2.72, 0.018, 3.55), mats.tatami);
  tatamiArea.position.set(0.15, 0.009, 0.1);
  tatamiArea.receiveShadow = true;
  apartment.add(tatamiArea);

  const roomBackWall = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 2.5), mats.wallPaper);
  roomBackWall.position.set(0, 1.25, -1.95);
  roomBackWall.receiveShadow = true;
  apartment.add(roomBackWall);

  const roomLeftWall = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 2.5), mats.wallPaper);
  roomLeftWall.rotation.y = Math.PI / 2;
  roomLeftWall.position.set(-1.75, 1.25, 0.1);
  apartment.add(roomLeftWall);

  // Frosted Rain-Streaked Window Shader + Wet Hydrangeas (紫陽花) Outside!
  const rainWindowMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uRain: { value: 0 },
      uDaylight: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uRain;
      uniform float uDaylight;
      varying vec2 vUv;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void main() {
        vec3 nightCol = mix(vec3(0.04, 0.07, 0.15), vec3(0.10, 0.14, 0.26), vUv.y);
        // Subtle blurred purple/blue hydrangea glow near lower window outside in June rain!
        float hydA = smoothstep(0.32, 0.02, length(vUv - vec2(0.28, 0.18)));
        float hydB = smoothstep(0.30, 0.02, length(vUv - vec2(0.68, 0.20)));
        nightCol += vec3(0.28, 0.16, 0.55) * hydA * (0.4 + 0.6 * uRain);
        nightCol += vec3(0.14, 0.32, 0.68) * hydB * (0.4 + 0.6 * uRain);

        vec3 dayCol = mix(vec3(0.76, 0.85, 0.96), vec3(0.88, 0.94, 1.0), vUv.y);
        vec3 col = mix(nightCol, dayCol, uDaylight);

        if (uRain > 0.01) {
          vec2 st = vUv * vec2(26.0, 5.0);
          float colId = floor(st.x);
          float speed = 0.8 + hash(vec2(colId, 1.0)) * 1.4;
          float yDrop = fract(st.y + uTime * speed + hash(vec2(colId, 2.0)));
          float xOff = (fract(st.x) - 0.5);
          float streak = smoothstep(0.18, 0.0, abs(xOff)) * smoothstep(0.45, 0.02, yDrop);
          col += vec3(0.42, 0.54, 0.72) * streak * uRain * 0.65;
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const windowPane = new THREE.Mesh(new THREE.PlaneGeometry(1.45, 1.15), rainWindowMat);
  windowPane.position.set(-0.05, 1.42, -1.935);
  apartment.add(windowPane);

  const sashFrame = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.04, 0.05), mats.brushedAlu);
  sashFrame.position.set(-0.05, 0.84, -1.92);
  apartment.add(sashFrame);

  // Walnut Engineering Desk (Top Surface at y = 0.720m, centered at x = 0, z = -0.55m)
  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 0, -0.55);

  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.028, 0.64), mats.deskWood);
  deskTop.position.y = 0.706;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  for (const [lx, lz] of [[-0.56, -0.27], [0.56, -0.27], [-0.56, 0.27], [0.56, 0.27]]) {
    const dLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.695, 14), mats.darkAnodized);
    dLeg.position.set(lx, 0.348, lz);
    deskGroup.add(dLeg);
  }

  // Architect Clamp Desk Lamp
  const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.072, 0.11, 22, 1, true), mats.darkAnodized);
  lampShade.position.set(-0.14, 1.13, -0.15);
  lampShade.rotation.z = 0.32;
  deskGroup.add(lampShade);

  // Laptop on Left Side of Desk
  const laptop = new THREE.Group();
  laptop.position.set(-0.34, 0.726, -0.11);
  laptop.rotation.y = 0.26;
  const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.011, 0.22), mats.brushedAlu);
  lapBase.castShadow = true;
  laptop.add(lapBase);
  const lapLid = new THREE.Group();
  lapLid.position.set(0, 0.006, -0.106);
  lapLid.rotation.x = -0.28;
  const lidBack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.21, 0.007), mats.brushedAlu);
  lidBack.position.y = 0.105;
  const lidScr = new THREE.Mesh(new THREE.PlaneGeometry(0.30, 0.188), screens.laptopMat);
  lidScr.position.set(0, 0.106, 0.004);
  lapLid.add(lidBack, lidScr);
  laptop.add(lapLid);
  deskGroup.add(laptop);

  // 5mm Grid Notebook & Wireless Mouse (for KiCad click at end of Ch.4!)
  const notebook = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.006, 0.19), screens.notebookMat);
  notebook.position.set(-0.30, 0.723, 0.15);
  notebook.rotation.y = 0.14;
  notebook.receiveShadow = true;
  deskGroup.add(notebook);

  const mouseMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.018, 0.032, 8, 14), mats.darkAnodized);
  mouseMesh.rotation.x = Math.PI / 2;
  mouseMesh.scale.set(1.3, 1.0, 0.65);
  mouseMesh.position.set(-0.14, 0.729, 0.14);
  deskGroup.add(mouseMesh);

  // Chapter 2 Relic: Universal Perfboard with Octopus Tangle of Pin-Header Wires!
  const octopusBoard = new THREE.Group();
  octopusBoard.position.set(-0.08, 0.726, -0.18);
  const perfMesh = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.004, 0.065), mats.perfboard);
  perfMesh.position.y = 0.008;
  octopusBoard.add(perfMesh);
  // Pin header strip + 10 octopus wires snaking toward the 12-DOF robot!
  const wireMats = [mats.wireRed, mats.wireBlack, mats.wireYellow, mats.wireBlue];
  for (let w = 0; w < 8; w++) {
    const ox = -0.028 + w * 0.008;
    octopusBoard.add(
      makeWireTube(
        [[ox, 0.012, 0.01], [ox + 0.03, 0.042 + (w % 3) * 0.009, 0.06], [0.11, 0.025, 0.12 + (w % 2) * 0.02]],
        0.0016,
        wireMats[w % wireMats.length],
        14
      )
    );
  }
  deskGroup.add(octopusBoard);

  // Mount Chapter 4 Lab Props & HMD-01 12-DOF Lower-Body Robot on Desk!
  const lab = createCh04LabProps(mats, screens.scaleLcdMat);

  lab.gantry.position.set(0.09, 0.72, 0.02);
  deskGroup.add(lab.gantry);

  lab.psu15A.position.set(0.35, 0.72, -0.13);
  lab.psu15A.rotation.y = -0.25;
  deskGroup.add(lab.psu15A);

  // Red Mushroom Emergency-Stop Switch clamped 50cm safe on Front-Right Corner of Desk!
  lab.eStopUnit.position.set(0.50, 0.72, 0.27);
  deskGroup.add(lab.eStopUnit);

  lab.kitchenScale.position.set(0.09, 0.72, 0.03);
  deskGroup.add(lab.kitchenScale);

  const robot12 = createHMD01Lower12DOF(mats);
  robot12.root.position.set(0.09, 0.728, 0.02);
  deskGroup.add(robot12.root);

  apartment.add(deskGroup);

  // Left-Hand Macro Rig (normal -> bruised purple nail -> white bandage!) & Right-Hand Macro Rig (for E-Stop!)
  apartment.add(lab.leftHandRig);
  const rightMacroHand = createMacroHandRig(mats);
  rightMacroHand.group.visible = false;
  apartment.add(rightMacroHand.group);

  const minatoRoom = createRealisticHuman(mats, {
    role: 'minato',
    topMat: mats.hoodieNavy,
    pantsMat: mats.jeansDark,
    hairMat: mats.hairBlack,
    hasBackpack: false,
  });
  minatoRoom.root.position.set(0, 0, 0.10);
  minatoRoom.root.rotation.y = Math.PI;
  apartment.add(minatoRoom.root);

  const sets = { atmCorner, lecture, apartment };
  function setActiveSet(name) {
    for (const [k, g] of Object.entries(sets)) g.visible = k === name;
  }

  function updateIkHolo(t) {
    const flex = 0.045 + Math.sin(t * 2.4) * 0.03;
    holoAnkNode.position.set(0, -0.08 + flex, 0);
    const midY = (0.14 + holoAnkNode.position.y) * 0.5;
    holoKneeNode.position.set(0, midY, 0.04 + flex * 0.8);
    dBeam.position.y = midY;
    dBeam.scale.y = (0.14 - holoAnkNode.position.y) / 0.20;

    l1Bar.position.set(0, (0.14 + midY) * 0.5, holoKneeNode.position.z * 0.5);
    l1Bar.lookAt(holoHipNode.getWorldPosition(new THREE.Vector3()));
    l1Bar.rotateX(Math.PI / 2);

    l2Bar.position.set(0, (midY + holoAnkNode.position.y) * 0.5, holoKneeNode.position.z * 0.5);
    l2Bar.lookAt(holoKneeNode.getWorldPosition(new THREE.Vector3()));
    l2Bar.rotateX(Math.PI / 2);

    ikHolo.rotation.y = Math.sin(t * 0.7) * 0.35;
  }

  return {
    sets,
    setActiveSet,
    minatoAtm,
    minatoLec,
    ikHolo,
    updateIkHolo,
    rainWindowMat,
    deskGroup,
    laptop,
    notebook,
    mouseMesh,
    octopusBoard,
    lab,
    robot12,
    rightMacroHand,
    minatoRoom,
  };
}
