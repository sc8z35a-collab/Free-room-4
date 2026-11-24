import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createNextGenHandRig } from '../nextgen/pbrMicroTextures.js';
import {
  createEVAMatPBR,
  createHMD01Rev10FullBody,
  createHeatCreepKneeMacroRig,
  createRev15HologramTruss,
  createCh06Props,
} from './hmd01Rev10Rig.js';

export function createCh06Screens() {
  // 1. Laptop Display (1024 x 640)
  const lapC = document.createElement('canvas');
  lapC.width = 1024;
  lapC.height = 640;
  const lctx = lapC.getContext('2d');
  const lapTex = new THREE.CanvasTexture(lapC);
  lapTex.colorSpace = THREE.SRGBColorSpace;
  const laptopMat = new THREE.MeshBasicMaterial({ map: lapTex });

  // 2. Smartphone Display (768 x 1024)
  const phC = document.createElement('canvas');
  phC.width = 768;
  phC.height = 1024;
  const pctx = phC.getContext('2d');
  const phTex = new THREE.CanvasTexture(phC);
  phTex.colorSpace = THREE.SRGBColorSpace;
  const phoneMat = new THREE.MeshBasicMaterial({ map: phTex });

  // 3. Kitchen Digital Scale LED (512 x 256)
  const scC = document.createElement('canvas');
  scC.width = 512;
  scC.height = 256;
  const sctx = scC.getContext('2d');
  const scTex = new THREE.CanvasTexture(scC);
  scTex.colorSpace = THREE.SRGBColorSpace;
  const scaleLcdMat = new THREE.MeshBasicMaterial({ map: scTex });

  // 4. Digital Room Thermometer LCD (512 x 256)
  const thC = document.createElement('canvas');
  thC.width = 512;
  thC.height = 256;
  const tctx = thC.getContext('2d');
  const thTex = new THREE.CanvasTexture(thC);
  thTex.colorSpace = THREE.SRGBColorSpace;
  const thermoLcdMat = new THREE.MeshBasicMaterial({ map: thTex });

  // 5. University Final Exam Paper (1024 x 768)
  const exC = document.createElement('canvas');
  exC.width = 1024;
  exC.height = 768;
  const ectx = exC.getContext('2d');
  ectx.fillStyle = '#fcfbf7';
  ectx.fillRect(0, 0, 1024, 768);
  ectx.strokeStyle = '#cbd5e1';
  ectx.lineWidth = 3;
  ectx.strokeRect(32, 32, 960, 704);
  ectx.fillStyle = '#0f172a';
  ectx.font = '900 32px serif';
  ectx.fillText('東都農工大学 工学部 前期末試験（Day 101–108）', 60, 96);
  ectx.strokeStyle = '#334155';
  ectx.beginPath();
  ectx.moveTo(56, 118);
  ectx.lineTo(968, 118);
  ectx.stroke();
  ectx.font = '800 26px sans-serif';
  ectx.fillStyle = '#1e293b';
  ectx.fillText('【電気回路Ⅰ・大問二】複合閉回路の網目電流法と電力損失', 64, 180);
  ectx.font = '700 24px monospace';
  ectx.fillStyle = '#1d4ed8';
  ectx.fillText('  P_loss = I² · R_DS(on) = (10A)² × 0.004 Ω = 0.40 W  ✓', 64, 232);
  ectx.font = '800 26px sans-serif';
  ectx.fillStyle = '#1e293b';
  ectx.fillText('【線形代数Ⅰ・大問三】3次元直交変換行列の固有値と逆変換', 64, 340);
  ectx.font = '700 24px monospace';
  ectx.fillStyle = '#047857';
  ectx.fillText('  R ∈ SO(3)  ⇒  R⁻¹ = Rᵀ,  det(R) = +1  [完答]', 64, 392);
  ectx.font = '700 24px sans-serif';
  ectx.fillStyle = '#475569';
  ectx.fillText('—— 机の上の学問と六畳間の鉄と樹脂が、同じ一つの言語になった。', 64, 520);
  const exTex = new THREE.CanvasTexture(exC);
  exTex.colorSpace = THREE.SRGBColorSpace;
  const examPaperMat = new THREE.MeshStandardMaterial({ map: exTex, color: 0xe6e3da, roughness: 0.92 });

  // 6. Midnight `HMD-01 Rev 1.5 大改修計画` Notebook (1024 x 768)
  const nbC = document.createElement('canvas');
  nbC.width = 1024;
  nbC.height = 768;
  const nctx = nbC.getContext('2d');
  nctx.fillStyle = '#f5f2e6';
  nctx.fillRect(0, 0, 1024, 768);
  nctx.strokeStyle = 'rgba(148, 163, 184, 0.34)';
  for (let x = 0; x < 1024; x += 28) { nctx.beginPath(); nctx.moveTo(x, 0); nctx.lineTo(x, 768); nctx.stroke(); }
  for (let y = 0; y < 768; y += 28) { nctx.beginPath(); nctx.moveTo(0, y); nctx.lineTo(1024, y); nctx.stroke(); }
  nctx.fillStyle = '#0f172a';
  nctx.font = '900 34px sans-serif';
  nctx.fillText('HMD-01 Rev 1.5 大改修計画 —『引き算の設計』', 48, 84);
  nctx.strokeStyle = '#047857';
  nctx.lineWidth = 4;
  nctx.beginPath(); nctx.moveTo(48, 104); nctx.lineTo(960, 104); nctx.stroke();
  nctx.font = '800 27px sans-serif';
  nctx.fillStyle = '#0369a1';
  nctx.fillText('一、マイナス180gの徹底減量（1,942g → 1,760g台）', 52, 186);
  nctx.font = '700 22px sans-serif';
  nctx.fillStyle = '#1e293b';
  nctx.fillText('    金属支柱・飾り頭部全廃 → 外骨格トラス一体成形', 52, 230);
  nctx.font = '800 27px sans-serif';
  nctx.fillStyle = '#047857';
  nctx.fillText('二、重心（CoM）の中央集約', 52, 336);
  nctx.font = '700 22px sans-serif';
  nctx.fillStyle = '#1e293b';
  nctx.fillText('    背面ランドセル廃止 → 112g LiPoを胸郭中央へ垂直収納', 52, 380);
  nctx.font = '800 27px sans-serif';
  nctx.fillStyle = '#b45309';
  nctx.fillText('三、耐熱マテリアル投入（Tg 80℃級）', 52, 486);
  nctx.font = '700 22px sans-serif';
  nctx.fillStyle = '#1e293b';
  nctx.fillText('    焼入れ鋼ノズル ＋ 炭素繊維配合『PETG-CF』導入', 52, 530);
  nctx.font = '800 24px monospace';
  nctx.fillStyle = '#0f172a';
  nctx.fillText('REMAINING BUDGET : ¥159,820   [SUMMER DAYS LEFT: 40+]', 52, 668);
  const nbTex = new THREE.CanvasTexture(nbC);
  nbTex.colorSpace = THREE.SRGBColorSpace;
  const rev15NotebookMat = new THREE.MeshStandardMaterial({ map: nbTex, color: 0xc8c3b4, roughness: 0.94 });

  let curLap = '';
  let curPh = '';
  let curSc = '';
  let curTh = '';

  function setLaptopMode(mode) {
    if (mode === curLap) return;
    curLap = mode;
    lctx.fillStyle = '#0a0f18';
    lctx.fillRect(0, 0, 1024, 640);
    lctx.fillStyle = '#161f2e';
    lctx.fillRect(0, 0, 1024, 42);
    lctx.fillStyle = '#94a3b8';
    lctx.font = '700 18px monospace';

    if (mode === 'cad_rev10_overbuild') {
      lctx.fillText('Fusion 360 — HMD-01 Rev 1.0 Full-Body (16-DOF | Height 380.0mm)', 22, 27);
      lctx.fillStyle = '#f8fafc';
      lctx.font = '800 28px sans-serif';
      lctx.fillText('上半身ユニット設計：肉厚 4.0mm / インフィル 45%', 44, 112);
      lctx.fillStyle = '#f59e0b';
      lctx.font = '800 25px monospace';
      lctx.fillText('! WARNING: High Rear CoM (112g LiPo Backpack)', 44, 180);
      lctx.fillStyle = '#ef4444';
      lctx.font = '900 40px monospace';
      lctx.fillText('EST. MASS : 1,942 g  (+142g OVER)', 44, 278);
      lctx.fillStyle = '#94a3b8';
      lctx.font = '700 22px sans-serif';
      lctx.fillText('・真鍮・鋼鉄 M3 六角支柱 ×6 / ダミー頭部シェル搭載', 44, 380);
      lctx.fillText('・絶対防衛ライン 1,800g を超過中 —— 過剰設計の代償', 44, 430);
    } else if (mode === 'imu_hunting_osc') {
      lctx.fillText('HMD-CORE-v1 200Hz IMU Pitch Telemetry — POSITIVE FEEDBACK HUNTING!', 22, 27);
      // Center zero line
      lctx.strokeStyle = '#334155';
      lctx.lineWidth = 2;
      lctx.beginPath(); lctx.moveTo(48, 300); lctx.lineTo(976, 300); lctx.stroke();

      // Exponentially diverging red hunting waveform (-1.8 -> +3.4 -> -6.1 -> +11.5 deg!)
      lctx.strokeStyle = '#ef4444';
      lctx.lineWidth = 6;
      lctx.beginPath();
      for (let x = 56; x <= 940; x += 6) {
        const u = (x - 56) / 884;
        const amp = 16 * Math.exp(u * 2.35);
        const y = 300 + Math.sin(u * Math.PI * 7.5) * amp;
        if (x === 56) lctx.moveTo(x, y); else lctx.lineTo(x, y);
      }
      lctx.stroke();

      lctx.fillStyle = '#f87171';
      lctx.font = '900 32px monospace';
      lctx.fillText('-1.8° → +3.4° → -6.1° → +11.5° [CRASH!]', 54, 108);
      lctx.fillStyle = '#fbbf24';
      lctx.font = '800 24px sans-serif';
      lctx.fillText('慣性モーメント I = Σ m·r² が第5章の 3.5倍 → 位相遅れで正帰還発振！', 54, 540);
    } else if (mode === 'thermal_63c_creep') {
      lctx.fillText('STS3215 Internal Temp Register (0x3F) — THERMAL CREEP ALERT!', 22, 27);
      lctx.fillStyle = '#ef4444';
      lctx.font = '900 46px monospace';
      lctx.fillText('ID 08 L_KNEE : 63.0 °C  [> Tg!]', 54, 152);
      lctx.fillStyle = '#f97316';
      lctx.font = '900 38px monospace';
      lctx.fillText('ID 09 L_HIP  : 61.0 °C  [CRITICAL]', 54, 232);
      lctx.fillStyle = '#f43f5e';
      lctx.font = '800 28px monospace';
      lctx.fillText('PORT 1 (R_LEG) : DATA LINE OPEN — TORQUE LOST', 54, 330);

      // Thermal bar showing PLA+ Tg threshold at 58°C!
      lctx.fillStyle = '#1e293b';
      lctx.fillRect(54, 385, 900, 44);
      lctx.fillStyle = '#ef4444';
      lctx.fillRect(54, 385, 760, 44);
      lctx.strokeStyle = '#fde047';
      lctx.lineWidth = 4;
      lctx.beginPath(); lctx.moveTo(640, 368); lctx.lineTo(640, 446); lctx.stroke();

      lctx.fillStyle = '#fde047';
      lctx.font = '800 23px sans-serif';
      lctx.fillText('PLA+ ガラス転移温度 Tg ≈ 58〜60℃ を突破 → 1.2mm 熱クリープ軟化変形！', 54, 515);
    } else {
      // 'cad_rev15_subtraction'
      lctx.fillText('HMD-01 Rev 1.5 Subtraction Redesign — Open-Truss + PETG-CF', 22, 27);
      lctx.fillStyle = '#34d399';
      lctx.font = '900 38px monospace';
      lctx.fillText('TARGET MASS : 1,760 g  (-182 g!)', 52, 134);
      lctx.fillStyle = '#38bdf8';
      lctx.font = '800 26px sans-serif';
      lctx.fillText('✓ 背面ランドセル全廃 → 112g LiPoを胸部中央・股関節軸真上へ', 52, 232);
      lctx.fillText('✓ 焼入れ鋼ノズル ＋ 炭素繊維樹脂 PETG-CF（耐熱 Tg ≈ 80℃）', 52, 312);
      lctx.fillText('✓ 金属支柱・ダミー頭部全廃 → 外骨格トラス一体成形', 52, 392);
      lctx.fillStyle = '#e2e8f0';
      lctx.font = '800 28px monospace';
      lctx.fillText('BUDGET : ¥159,820  |  STATUS: REBUILDING', 52, 520);
    }
    lapTex.needsUpdate = true;
  }

  function setPhoneMode(mode) {
    if (mode === curPh) return;
    curPh = mode;
    pctx.fillStyle = '#f8fafc';
    pctx.fillRect(0, 0, 768, 1024);
    if (mode === 'order_4x_sts3215') {
      pctx.fillStyle = '#0f172a';
      pctx.fillRect(0, 0, 768, 155);
      pctx.fillStyle = '#ffffff';
      pctx.font = '900 34px sans-serif';
      pctx.fillText('注文確定 — 夏休み初日（Day 108）', 48, 98);
      pctx.fillStyle = '#047857';
      pctx.font = '900 44px sans-serif';
      pctx.fillText('✓ 決済が完了しました', 48, 260);
      pctx.fillStyle = '#0f172a';
      pctx.font = '800 36px monospace';
      pctx.fillText('Feetech STS3215 × 4個', 48, 370);
      pctx.font = '900 76px monospace';
      pctx.fillStyle = '#0369a1';
      pctx.fillText('¥11,800', 48, 495);
      pctx.fillStyle = '#334155';
      pctx.font = '800 32px sans-serif';
      pctx.fillText('両肩ピッチ・ロール用 4軸追加', 48, 610);
      pctx.fillStyle = '#047857';
      pctx.fillText('★ 全16自由度 コンプリート！', 48, 690);
    } else {
      // 'payday_182k'
      pctx.fillStyle = '#0284c7';
      pctx.fillRect(0, 0, 768, 155);
      pctx.fillStyle = '#ffffff';
      pctx.font = '900 34px sans-serif';
      pctx.fillText('むさしの銀行 — Day 111 第3回給与', 44, 98);
      pctx.fillStyle = '#047857';
      pctx.font = '900 46px monospace';
      pctx.fillText('＋¥56,200 入金完了', 48, 265);
      pctx.fillStyle = '#0f172a';
      pctx.font = '900 88px monospace';
      pctx.fillText('¥182,520', 48, 415);
      pctx.fillStyle = '#334155';
      pctx.font = '700 28px sans-serif';
      pctx.fillText('→ 極厚20mm EVA防音マット・PLA+×2・', 48, 540);
      pctx.fillText('   圧着ペンチPA-09一式調達（計¥10,900）', 48, 592);
    }
    phTex.needsUpdate = true;
  }

  function setScaleMode(mode) {
    if (mode === curSc) return;
    curSc = mode;
    sctx.fillStyle = '#090d14';
    sctx.fillRect(0, 0, 512, 256);
    sctx.strokeStyle = '#334155';
    sctx.lineWidth = 6;
    sctx.strokeRect(8, 8, 496, 240);
    if (mode === 'weight_1942g_over') {
      sctx.fillStyle = '#ef4444';
      sctx.font = '900 108px monospace';
      sctx.fillText('1942 g', 34, 152);
      sctx.fillStyle = '#fca5a5';
      sctx.font = '800 28px monospace';
      sctx.fillText('OVER LIMIT +142g (MAX 1800g)', 26, 218);
    } else {
      sctx.fillStyle = '#34d399';
      sctx.font = '900 96px monospace';
      sctx.fillText('-182 g', 54, 150);
      sctx.fillStyle = '#a7f3d0';
      sctx.font = '800 26px monospace';
      sctx.fillText('TARGET REV 1.5 : 1,760 g', 42, 216);
    }
    scTex.needsUpdate = true;
  }

  function setThermoMode(mode) {
    if (mode === curTh) return;
    curTh = mode;
    const hot = mode === 'temp_324c_hot';
    tctx.fillStyle = hot ? '#450a0a' : '#1e293b';
    tctx.fillRect(0, 0, 512, 256);
    tctx.strokeStyle = hot ? '#f97316' : '#64748b';
    tctx.lineWidth = 8;
    tctx.strokeRect(8, 8, 496, 240);
    tctx.fillStyle = hot ? '#fb923c' : '#fde047';
    tctx.font = '900 104px monospace';
    tctx.fillText(hot ? '32.4°C' : '31.2°C', 48, 156);
    tctx.fillStyle = '#f8fafc';
    tctx.font = '800 26px monospace';
    tctx.fillText(hot ? 'ROOM 203  WEST SUN  RH 68%' : 'ROOM 203  AC MAX  AUG HEAT', 34, 218);
    thTex.needsUpdate = true;
  }

  setLaptopMode('cad_rev10_overbuild');
  setPhoneMode('order_4x_sts3215');
  setScaleMode('weight_1942g_over');
  setThermoMode('temp_312c');

  return {
    laptopMat,
    phoneMat,
    scaleLcdMat,
    thermoLcdMat,
    examPaperMat,
    rev15NotebookMat,
    setLaptopMode,
    setPhoneMode,
    setScaleMode,
    setThermoMode,
  };
}

export function createCh06World(scene, baseMats, ngMats, screens) {
  const props = createCh06Props(baseMats, ngMats);

  // ===========================================================================
  // SET 1: 大学講義棟・前期末試験席 (Day 101–108)
  // ===========================================================================
  const lectureHall = new THREE.Group();
  lectureHall.visible = false;
  scene.add(lectureHall);

  const lecFloor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), baseMats.concrete);
  lecFloor.rotation.x = -Math.PI / 2;
  lecFloor.receiveShadow = true;
  lectureHall.add(lecFloor);

  const lecDesk = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.03, 0.65), ngMats.birchPlywoodMat);
  lecDesk.position.set(0, 0.72, -0.50);
  lecDesk.receiveShadow = true;
  lectureHall.add(lecDesk);

  const lecBackWall = new THREE.Mesh(new THREE.PlaneGeometry(6, 3.2), baseMats.wallPaper);
  lecBackWall.position.set(0, 1.6, -1.8);
  lectureHall.add(lecBackWall);

  const examSheet = new THREE.Mesh(new THREE.BoxGeometry(0.297, 0.003, 0.210), screens.examPaperMat);
  examSheet.position.set(-0.02, 0.737, -0.48);
  examSheet.rotation.y = 0.05;
  examSheet.receiveShadow = true;
  lectureHall.add(examSheet);

  props.pencil.position.set(0.11, 0.742, -0.45);
  props.pencil.rotation.y = -0.35;
  lectureHall.add(props.pencil);

  // Minato's left hand resting beside the exam sheet (with subtle healed scar on left index finger!)
  const examLeftHand = createNextGenHandRig(baseMats, ngMats, -1);
  examLeftHand.group.position.set(-0.18, 0.752, -0.43);
  examLeftHand.group.rotation.set(0, -0.35, 0);
  examLeftHand.group.scale.setScalar(0.92);
  const scarMark = new THREE.Mesh(
    new THREE.BoxGeometry(0.008, 0.0018, 0.0022),
    new THREE.MeshStandardMaterial({ color: 0xf4a5a5, roughness: 0.5 })
  );
  scarMark.position.set(-0.028, 0.006, 0.058);
  examLeftHand.group.add(scarMark);
  lectureHall.add(examLeftHand.group);

  // ===========================================================================
  // SET 2: 武蔵野キャンパス木陰のベンチ ＋ 真夏の巨大入道雲シェーダー (Day 108–111)
  // ===========================================================================
  const campusSummer = new THREE.Group();
  campusSummer.visible = false;
  scene.add(campusSummer);

  const summerSkyMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p); vec2 f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
      }
      void main() {
        // Deep vivid August cobalt sky gradient
        vec3 sky = mix(vec3(0.42, 0.74, 0.98), vec3(0.08, 0.34, 0.78), smoothstep(0.0, 0.95, vUv.y));
        // Towering crisp white Cumulonimbus thunderhead ("巨大な入道雲")!
        vec2 cPos = vec2(0.32, 0.42);
        float puff = 0.0;
        puff = max(puff, smoothstep(0.28, 0.16, length((vUv - vec2(0.28, 0.36)) * vec2(1.0, 1.15))));
        puff = max(puff, smoothstep(0.24, 0.12, length((vUv - vec2(0.36, 0.56)) * vec2(1.1, 1.0))));
        puff = max(puff, smoothstep(0.22, 0.11, length((vUv - vec2(0.24, 0.58)) * vec2(1.0, 1.0))));
        puff = max(puff, smoothstep(0.19, 0.09, length((vUv - vec2(0.31, 0.72)) * vec2(1.0, 1.05))));
        float billow = noise(vUv * 12.0 + vec2(uTime * 0.03, 0.0));
        float cloud = smoothstep(0.25, 0.65, puff + (billow - 0.5) * 0.25);
        vec3 cloudCol = mix(vec3(0.84, 0.90, 0.96), vec3(1.0, 0.99, 0.97), smoothstep(0.25, 0.72, vUv.y));
        vec3 col = mix(sky, cloudCol, cloud);

        // Swaying deep-green Keyaki leaves framing top-left & right canopy!
        float sw = sin(uTime * 1.6 + vUv.x * 6.0) * 0.012;
        float leaf = smoothstep(0.34, 0.26, length(vUv - vec2(0.92 + sw, 0.88)));
        leaf = max(leaf, smoothstep(0.28, 0.20, length(vUv - vec2(0.06 - sw, 0.92))));
        col = mix(col, vec3(0.06, 0.24, 0.09), leaf * 0.88);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const skyBackdrop = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 3.6), summerSkyMat);
  skyBackdrop.position.set(0, 1.55, -2.2);
  campusSummer.add(skyBackdrop);

  const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.045, 0.45), ngMats.walnutProMat);
  benchSeat.position.set(0, 0.45, -0.5);
  benchSeat.receiveShadow = true;
  campusSummer.add(benchSeat);

  // Smartphone held upright in bright August shade!
  const campusPhone = new THREE.Group();
  const cpBody = new THREE.Mesh(new THREE.BoxGeometry(0.078, 0.160, 0.008), baseMats.darkAnodized);
  const cpScr = new THREE.Mesh(new THREE.PlaneGeometry(0.072, 0.150), screens.phoneMat);
  cpScr.position.z = 0.0046;
  campusPhone.add(cpBody, cpScr);
  campusPhone.position.set(0.14, 0.88, -0.45);
  campusPhone.rotation.set(-0.14, -0.24, 0.02);
  campusSummer.add(campusPhone);

  // ===========================================================================
  // SET 3: 『コーポ武蔵野』203号室 — Workbench + 20mm Black EVA Joint Mats Floor!
  // ===========================================================================
  const apartment = new THREE.Group();
  scene.add(apartment);

  const roomWood = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 4.6), baseMats.woodFloor);
  roomWood.rotation.x = -Math.PI / 2;
  roomWood.receiveShadow = true;
  apartment.add(roomWood);

  const tatami = new THREE.Mesh(new THREE.BoxGeometry(2.72, 0.018, 3.55), baseMats.tatami);
  tatami.position.set(0.15, 0.009, 0.1);
  tatami.receiveShadow = true;
  apartment.add(tatami);

  // 20mm Thick Black Interlocking EVA Foam Joint Mats covering the floor test arena! (Top surface y = 0.038m!)
  const evaMatPBR = createEVAMatPBR();
  const evaFloor = new THREE.Mesh(new THREE.BoxGeometry(1.90, 0.020, 1.65), evaMatPBR);
  evaFloor.position.set(0.08, 0.028, 0.48);
  evaFloor.receiveShadow = true;
  apartment.add(evaFloor);

  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 2.5), baseMats.wallPaper);
  backWall.position.set(0, 1.25, -1.95);
  apartment.add(backWall);

  // August Window Shader (switches smoothly between scorching West Sun 32.4°C & Midnight 01:00 AM!)
  const winMat = new THREE.ShaderMaterial({
    uniforms: { uMode: { value: 0 }, uTime: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uMode; // 0 = August Day, 1 = Blazing West Sun, 2 = 01:00 AM Midnight
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec3 dayC = mix(vec3(0.68, 0.85, 0.98), vec3(0.28, 0.60, 0.94), vUv.y);
        vec3 sunC = mix(vec3(1.0, 0.56, 0.18), vec3(0.95, 0.34, 0.12), vUv.y);
        vec3 nightC = mix(vec3(0.03, 0.06, 0.14), vec3(0.07, 0.13, 0.26), vUv.y);
        vec3 col = uMode < 1.0 ? mix(dayC, sunC, uMode) : mix(sunC, nightC, uMode - 1.0);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const winPane = new THREE.Mesh(new THREE.PlaneGeometry(1.45, 1.15), winMat);
  winPane.position.set(-0.05, 1.42, -1.935);
  apartment.add(winPane);

  // Satin Pore-Detailed Walnut Workbench (Top surface y = 0.720m, centered at z = -0.55m)
  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 0, -0.55);
  apartment.add(deskGroup);

  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.028, 0.66), ngMats.walnutProMat);
  deskTop.position.y = 0.706;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  // Laptop on Left of Desk
  const laptop = new THREE.Group();
  laptop.position.set(-0.36, 0.726, -0.11);
  laptop.rotation.y = 0.25;
  const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.011, 0.22), baseMats.brushedAlu);
  const lapLid = new THREE.Group();
  lapLid.position.set(0, 0.006, -0.106);
  lapLid.rotation.x = -0.26;
  const lidBack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.21, 0.007), baseMats.brushedAlu);
  lidBack.position.y = 0.105;
  const lidScr = new THREE.Mesh(new THREE.PlaneGeometry(0.30, 0.188), screens.laptopMat);
  lidScr.position.set(0, 0.106, 0.0045);
  lapLid.add(lidBack, lidScr);
  laptop.add(lapBase, lapLid);
  deskGroup.add(laptop);

  // Kitchen Digital Scale on Desk (Top platform at y = 0.742m, Ergonomic Angled Front LED Bezel!)
  const scaleGroup = new THREE.Group();
  scaleGroup.position.set(0.08, 0.720, 0.05);
  const scBody = new THREE.Mesh(new THREE.BoxGeometry(0.172, 0.022, 0.215), baseMats.bambuWhite);
  scBody.position.y = 0.011;
  scBody.castShadow = true;
  scBody.receiveShadow = true;
  const scPan = new THREE.Mesh(new THREE.BoxGeometry(0.148, 0.004, 0.148), baseMats.brushedAlu);
  scPan.position.set(0, 0.024, -0.025);
  scPan.receiveShadow = true;
  const scBezel = new THREE.Mesh(new THREE.BoxGeometry(0.142, 0.044, 0.012), baseMats.bambuWhite);
  scBezel.position.set(0, 0.026, 0.098);
  scBezel.rotation.x = -0.68;
  const scLcd = new THREE.Mesh(new THREE.PlaneGeometry(0.128, 0.048), screens.scaleLcdMat);
  scLcd.position.set(0, 0.030, 0.103);
  scLcd.rotation.x = -0.68;
  scaleGroup.add(scBody, scPan, scBezel, scLcd);
  deskGroup.add(scaleGroup);

  // Digital Room Thermometer standing on Right-Back of Desk ("31.2°C" -> "32.4°C")!
  const thermoGroup = new THREE.Group();
  thermoGroup.position.set(0.38, 0.768, -0.14);
  thermoGroup.rotation.y = -0.35;
  const thBody = new THREE.Mesh(new THREE.BoxGeometry(0.110, 0.092, 0.018), baseMats.bambuWhite);
  thBody.castShadow = true;
  const thLcd = new THREE.Mesh(new THREE.PlaneGeometry(0.096, 0.052), screens.thermoLcdMat);
  thLcd.position.z = 0.0096;
  thermoGroup.add(thBody, thLcd);
  deskGroup.add(thermoGroup);

  // Rev 1.5 Midnight Notebook + Barley Tea + Disassembled Knolling Pile + PA-09 + Hologram on Desk
  const rev15Nb = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.006, 0.20), screens.rev15NotebookMat);
  rev15Nb.position.set(0.16, 0.723, 0.09);
  rev15Nb.rotation.y = -0.08;
  rev15Nb.visible = false;
  deskGroup.add(rev15Nb);

  props.teaGlass.position.set(0.42, 0.720, -0.02);
  props.teaGlass.visible = false;
  props.knollingGroup.position.set(0.24, 0.720, 0.04);
  props.knollingGroup.visible = false;
  props.pa09.position.set(0.08, 0.742, 0.06);
  props.pa09.rotation.set(0.18, 0.22, 0);
  props.pa09.visible = false;
  deskGroup.add(props.teaGlass, props.knollingGroup, props.pa09);

  const rev15Holo = createRev15HologramTruss();
  rev15Holo.root.position.set(0.16, 0.745, 0.06);
  rev15Holo.root.visible = false;
  deskGroup.add(rev15Holo.root);

  // Museum-Grade 2.35x Scale 63°C PLA+ Heat-Creep Knee Macro Rig (shown in Cut 4C!)
  const creepMacroRig = createHeatCreepKneeMacroRig(baseMats, ngMats);
  creepMacroRig.root.position.set(0.08, 0.785, 0.06);
  creepMacroRig.root.visible = false;
  deskGroup.add(creepMacroRig.root);

  // HERO FULL-BODY 16-DOF `HMD-01 Rev 1.0` (moved smoothly between Desk/Scale and EVA Floor!)
  const heroRobot = createHMD01Rev10FullBody(baseMats, ngMats);
  heroRobot.root.position.set(0.08, 0.720, -0.50);
  apartment.add(heroRobot.root);

  // Second Laptop placed beside the EVA Floor Mat for live Floor Telemetry during Scenes 3 & 4!
  const floorLaptop = laptop.clone();
  floorLaptop.position.set(-0.34, 0.044, 0.30);
  floorLaptop.rotation.y = 0.48;
  floorLaptop.visible = false;
  apartment.add(floorLaptop);

  // Twin Next-Gen Fingernail-Detailed Hands for releasing HMD-01 shoulders & reacting to 63°C heat!
  const leftReleaseHand = createNextGenHandRig(baseMats, ngMats, -1);
  const rightReleaseHand = createNextGenHandRig(baseMats, ngMats, 1);
  leftReleaseHand.group.visible = false;
  rightReleaseHand.group.visible = false;
  apartment.add(leftReleaseHand.group, rightReleaseHand.group);

  // Seated Minato silhouette in background of room
  const minatoRoom = createRealisticHuman(baseMats, {
    role: 'minato',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoRoom.root.position.set(-0.55, 0, 0.35);
  minatoRoom.root.rotation.y = 2.4;
  minatoRoom.root.visible = false;
  apartment.add(minatoRoom.root);

  function setActiveSet(name) {
    lectureHall.visible = name === 'lecture';
    campusSummer.visible = name === 'campus';
    apartment.visible = name === 'apartment';
  }

  return {
    setActiveSet,
    lectureHall,
    examLeftHand,
    campusSummer,
    summerSkyMat,
    campusPhone,
    apartment,
    winMat,
    deskGroup,
    laptop,
    floorLaptop,
    scaleGroup,
    thermoGroup,
    rev15Nb,
    rev15Holo,
    creepMacroRig,
    heroRobot,
    leftReleaseHand,
    rightReleaseHand,
    minatoRoom,
    props,
  };
}
