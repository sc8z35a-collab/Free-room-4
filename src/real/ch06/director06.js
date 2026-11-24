export const CH06_DURATION = 150.0; // Exact 02:30 (150 seconds)

export const CH06_SCENES = [
  { id: 1, start: 0, end: 26, jp: 'Day 101-111 · 前期末試験の静寂と真夏の入道雲・全16軸揃う' },
  { id: 2, start: 26, end: 54, jp: 'Day 112-120 · 31℃の過剰設計と全高380mm『Rev 1.0』初合体' },
  { id: 3, start: 54, end: 82, jp: 'Day 121 · 慣性モーメント3.5倍・正帰還ハンチング顔面激突' },
  { id: 4, start: 82, end: 118, jp: 'Day 124 · 猛暑32.4℃の二重破局：断線と63℃熱クリープ変形' },
  { id: 5, start: 118, end: 150, jp: 'Day 125 · 深夜1時の解体と覚醒『引き算の設計 Rev 1.5』' },
];

const SUBTITLES = [
  [0.6, 9.6, 'ナレーション', '7月中旬・前期末試験。電気回路の電力損失も線形代数の転置行列も、六畳間の鉄と樹脂と完全に同じ一つの言語になっていた。'],
  [10.2, 18.8, 'ナレーション', 'Day 108 午後2時40分、試験終了！ 入道雲の下で最後のSTS3215を4個（¥11,800）決済し、全16自由度のアクチュエータが揃った。'],
  [19.2, 25.8, 'ナレーション', '第3回バイト代で残高は18万円台へ回復。極厚20mmの黒EVA防音マットと圧着工具PA-09一式を揃え、夏休みの全身制作へ突入する。'],

  [26.5, 38.5, 'ナレーション', '8月、室温31℃の203号室。過去の破損への恐怖から肉厚4.0mm胸郭、金属支柱6本、背中のランドセル型LiPoケース、飾り頭部まで足し算を重ねた。'],
  [39.4, 47.4, '佐伯 湊', '「……立った。人型だ……」——百二十日かけて現実の物質となった、全高きっかり380.0mmの小さな巨人。'],
  [48.2, 53.8, '佐伯 湊', '実測『1,942 g』——防衛ライン1,800gを142g超過。「……140グラムくらい、制御でなんとかなるだろ」その油断が残酷な代償を招く。'],

  [54.6, 63.4, '佐伯 湊', 'Day 121、20mm防音マット上での完全自立起立テスト。「……よし。手を離すぞ」——最初の0.2秒後、112gの背中が1.8°後ろへ傾いた。'],
  [63.8, 72.8, 'ナレーション', '高重心化で慣性モーメントは第5章の3.5倍！ 応答遅れにより負帰還が正帰還へ化け、-1.8°→+3.4°→-6.1°→+11.5°と激しくハンチング発振！'],
  [73.2, 81.6, 'ナレーション', 'ドゴォンッ！！ 4往復目で踵が浮き、1.94kgの巨体が顔面からマットへ激突——昨日印刷したばかりの頭部シェルの顎が白くパックリ割れた。'],

  [82.5, 91.6, 'ナレーション', 'Day 124 猛暑日の午後3時、西日の室温32.4℃。IMU反射を切り、深いしゃがみ姿勢（z=-135mm）から立ち上がる8回目のトライ——'],
  [92.2, 102.6, '佐伯 湊', 'ブチッ！！ 胸郭下端リブと右股関節の死角に3芯ケーブルが噛み込みDATA線断線！ 右脚が脱力し、きりもみ状に墜落。「くそっ、ケーブル噛んだか……！」'],
  [103.2, 109.8, '佐伯 湊', '「……っ、熱つ！？」左膝サーボは63℃、股関節61℃。さらに湊の血の気を引かせたのは、モータ温度そのものではなかった——'],
  [110.2, 117.6, '佐伯 湊', '「……嘘だろ。プラスチックが、溶けて曲がってる……！？」ガラス転移温度58℃を突破し、PLA+膝ブラケットが飴細工のように1.2mm熱クリープ変形した。'],

  [118.6, 129.6, '佐伯 湊', 'Day 125 深夜1時。解体した残骸とぬるい麦茶の前で気づく。「……俺は、怖くて『足し算』ばっかりしてたんだ」'],
  [130.2, 140.8, 'ナレーション', '『HMD-01 Rev 1.5』三つの絶対条件：一、-180g減量（トラス一体成形・飾り頭部廃止）。二、112g LiPoを胸部中央へ。三、耐熱80℃級『PETG-CF』導入！'],
  [141.4, 149.5, 'ナレーション', '圧着ペンチPA-09が『カチリ』と鳴る。夏休みはまだ四十日以上ある——この八月が終わる前に、必ず自分の足で六畳の床を踏みしめさせる。'],
];

const SIMLOGS = [
  [0, 11, 'EXAMS // DAY 101-108 · LECTURE HALL', '電気回路Ⅰ・線形代数Ⅰ 完答', 'R^T = R^-1 と 4mΩ MOSFET — 机上の理論と六畳間の現実が一致'],
  [11, 26, 'SUMMER BREAK // DAY 108-111', '全16自由度 STS3215 コンプリート！', '両肩4軸追加 ¥11,800 / 第3回給与後 残高 ¥182,520 / 20mm EVAマット調達'],
  [26, 48, 'OVERBUILD // DAY 112-120 · ROOM 203 (31.2°C)', 'HMD-01 Rev 1.0 全身初合体 [380.0 mm]', '4.0mm胸郭 + 真鍮支柱×6 + 背面ランドセルLiPo + ダミー頭部シェル'],
  [48, 54, 'MASS ALERT // KITCHEN SCALE', '実測 1,942 g — 絶対防衛ライン +142g 超過', '高重心・背面偏重レイアウト — 慣性モーメント I = Σ m·r² が3.5倍へ'],
  [54, 82, 'INSTABILITY // DAY 121 · EVA MAT TEST', '正帰還ハンチング発振 → 顔面激突！', '-1.8° → +3.4° → -6.1° → +11.5° / 顎部シェル白色亀裂発生'],
  [82, 103, 'CATASTROPHE 01 // DAY 124 · WEST SUN 32.4°C', '深しゃがみ起立 → 右脚DATA線噛み込み断線', '胸郭下端リブと股関節のハサミ死角で被覆破断 → きりもみ転倒'],
  [103, 118, 'CATASTROPHE 02 // THERMAL CREEP 63.0°C', 'PLA+ ガラス転移温度(Tg 58℃)突破・軟化変形', '左膝 63℃ / 左股 61℃ → 真鍮インサート周囲が 1.2mm 飴細工状に沈降'],
  [118, 150, 'EPIPHANY // DAY 125 · 01:00 AM', '『引き算の設計』HMD-01 Rev 1.5 再起計画', '目標 1,760g台 / 胸部中央垂直LiPo / 焼入れ鋼ノズル + PETG-CF / 残金 ¥159,820'],
];

const CUTINS = [
  [39.5, 42.6, '全高 380.0 mm — 全16自由度『HMD-01 Rev 1.0』初合体！', 'amber'],
  [48.5, 51.8, '実測 1,942 g（防衛ライン +142 g 超過）', 'crimson'],
  [66.2, 74.0, '正帰還ハンチング発振！ 慣性モーメント 3.5倍 → 顔面激突！！', 'crimson'],
  [95.4, 99.6, '右脚バスケーブル噛み込み断線 ＆ 63℃『PLA+』熱クリープ！！', 'crimson'],
  [131.0, 136.5, '引き算の設計『HMD-01 Rev 1.5』— -180g減量・中央LiPo・PETG-CF', 'amber'],
];

export function getCh06Scene(t) {
  for (let i = CH06_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH06_SCENES[i].start) return CH06_SCENES[i];
  }
  return CH06_SCENES[0];
}
export function getCh06Subtitle(t) {
  for (const [s, e, spk, txt] of SUBTITLES) if (t >= s && t <= e) return { speaker: spk, text: txt };
  return null;
}
export function getCh06Simlog(t) {
  for (const [s, e, tag, title, detail] of SIMLOGS) if (t >= s && t <= e) return { tag, title, detail };
  return SIMLOGS[0];
}
export function getCh06Cutin(t) {
  for (const [s, e, text, tone] of CUTINS) if (t >= s && t <= e) return { text, tone };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };
const lerp3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

export function evaluateCh06Director(t, world, screens, lights) {
  const cam = { pos: [0, 1.0, 0.2], look: [0, 0.8, -0.5], fov: 28 };
  const fx = {
    bloomStrength: 0.22,
    exposure: 1.06,
    aperture: 0.014,
    aoIntensity: 0.72,
    vignette: 0.26,
  };
  let dramaBars = false;

  // Reset per-frame visibility & shaders
  world.setActiveSet('apartment');
  world.summerSkyMat.uniforms.uTime.value = t;
  world.winMat.uniforms.uTime.value = t;
  world.winMat.uniforms.uMode.value = 0.0;

  world.heroRobot.root.visible = false;
  world.scaleGroup.visible = false;
  world.thermoGroup.visible = false;
  world.floorLaptop.visible = false;
  world.leftReleaseHand.group.visible = false;
  world.rightReleaseHand.group.visible = false;
  world.creepMacroRig.root.visible = false;
  world.rev15Nb.visible = false;
  world.rev15Holo.root.visible = false;
  world.props.teaGlass.visible = false;
  world.props.knollingGroup.visible = false;
  world.props.pa09.visible = false;
  world.minatoRoom.root.visible = false;

  // ===========================================================================
  // SCENE 1 (0 – 26s): 前期末試験の静寂 (Lecture Hall) & 真夏の入道雲 (Campus Summer)
  // ===========================================================================
  if (t < 26) {
    if (t < 11.0) {
      // Cut 1A: Cool Lecture Hall Final Exam Desk + Mechanical Pencil + Scarred Left Index Finger!
      world.setActiveSet('lecture');
      lights.setPreset('lecture_cool');
      fx.aperture = 0.016;
      const u = t / 11.0;
      world.props.pencil.position.x = 0.09 + Math.sin(t * 7.5) * 0.008;
      cam.pos = lerp3([-0.14, 0.96, -0.18], [0.10, 0.92, -0.22], u);
      cam.look = [-0.02, 0.742, -0.47];
      cam.fov = 29;
    } else {
      // Cut 1B: Blazing August Cumulonimbus Sky on Campus Shade Bench + Smartphone 4x STS3215 -> Payday ¥182,520!
      world.setActiveSet('campus');
      lights.setPreset('summer_cumulonimbus');
      screens.setPhoneMode(t < 19.0 ? 'order_4x_sts3215' : 'payday_182k');
      fx.aperture = 0.011;
      const u = (t - 11.0) / 15.0;
      cam.pos = lerp3([0.04, 0.92, -0.02], [0.16, 0.90, -0.16], u);
      cam.look = [0.06, 0.92, -0.60];
      cam.fov = 34;
    }
  }

  // ===========================================================================
  // SCENE 2 (26 – 54s): 室温31℃の過剰設計 → 全高380.0mm 初合体 → キッチンスケール 1,942 g!
  // ===========================================================================
  else if (t < 54) {
    lights.setPreset('room_aug_31c');
    screens.setLaptopMode('cad_rev10_overbuild');
    screens.setThermoMode('temp_312c');
    screens.setScaleMode('weight_1942g_over');

    world.thermoGroup.visible = true;
    world.heroRobot.root.visible = true;
    world.heroRobot.setDamageState({ chinCracked: false, wireCut: false, spark: 0, heatGlow: 0, showCom: t >= 48.0 });

    if (t < 39.0) {
      // Cut 2A: Over-Engineered Upper Body Progressive Assembly on Walnut Desk (6 Standoffs -> 4mm Chest -> Randoseru -> Arms -> Head!)
      const u = (t - 26.0) / 13.0;
      world.heroRobot.root.position.set(0.08, 0.720, -0.50);
      world.heroRobot.root.rotation.set(0, 0.25 + Math.sin(u * Math.PI * 1.4) * 0.45, 0);
      world.heroRobot.setAssemblyProgress(smooth(u * 1.05));
      world.heroRobot.setPose({ pelvisPos: [0, 0.205, 0], leftArmRoll: 0.10, rightArmRoll: -0.10 });
      fx.aperture = 0.015;
      cam.pos = lerp3([-0.28, 1.04, 0.24], [0.36, 1.02, 0.22], u);
      cam.look = [0.08, 0.93, -0.50];
      cam.fov = 31;
    } else if (t < 48.0) {
      // Cut 2B: Hero Low-Angle Vertical Tilt-Up Reveal ("……立った。人型だ……" Full 380.0mm Small Giant Head-to-Toe!)
      dramaBars = true;
      const u = (t - 39.0) / 9.0;
      world.heroRobot.root.position.set(0.08, 0.720, -0.50);
      world.heroRobot.root.rotation.set(0, -0.16 + u * 0.36, 0);
      world.heroRobot.setAssemblyProgress(1.0);
      world.heroRobot.setPose({ pelvisPos: [0, 0.208, 0], leftArmPitch: 0.08, rightArmPitch: 0.08 });
      fx.aperture = 0.015;
      cam.pos = lerp3([0.04, 0.88, 0.38], [0.16, 1.04, 0.36], u);
      cam.look = lerp3([0.08, 0.90, -0.50], [0.08, 0.94, -0.50], u);
      cam.fov = 33;
    } else {
      // Cut 2C: Kitchen Digital Scale Reveal — Glowing Red "1942 g (+142g OVER)" clearly visible above subtitle + Full Silhouette!
      world.scaleGroup.visible = true;
      world.scaleGroup.position.set(0.08, 0.720, 0.05);
      world.heroRobot.root.position.set(0.08, 0.746, -0.522);
      world.heroRobot.root.rotation.set(0, -0.62, 0); // Profile 3/4 view showing bulky protruding rear Randoseru!
      world.heroRobot.setAssemblyProgress(1.0);
      world.heroRobot.setPose({ pelvisPos: [0, 0.205, 0] });
      const u = (t - 48.0) / 6.0;
      fx.aperture = 0.011;
      cam.pos = lerp3([0.24, 1.08, 0.20], [0.12, 1.03, 0.08], u);
      cam.look = [0.08, 0.84, -0.47];
      cam.fov = 33;
    }
  }

  // ===========================================================================
  // SCENE 3 (54 – 82s): Day 121 EVAマット自立テスト → 慣性モーメント3.5倍・正帰還ハンチング発振 ＆ 顔面激突！！
  // ===========================================================================
  else if (t < 82) {
    lights.setPreset('room_eva_test');
    screens.setLaptopMode('imu_hunting_osc');
    world.floorLaptop.visible = true;
    world.heroRobot.root.visible = true;
    world.heroRobot.setAssemblyProgress(1.0);
    // Stand centered on the 20mm black interlocking EVA joint mats (top y = 0.038m!)
    world.heroRobot.root.position.set(0.10, 0.038, 0.44);
    world.heroRobot.root.rotation.set(0, 0.45, 0);

    if (t < 63.6) {
      // Cut 3A: Minato's Twin Hands Release Shoulders -> 0.2s Breathless Stillness -> -1.8° Rear Tilt Begins!
      const u = (t - 54.0) / 9.6;
      const spread = smooth((t - 57.5) / 2.6);
      world.leftReleaseHand.group.visible = true;
      world.rightReleaseHand.group.visible = true;
      world.leftReleaseHand.group.position.set(0.10 - 0.125 - spread * 0.14, 0.34, 0.44 + 0.04);
      world.leftReleaseHand.group.rotation.set(0.15, 0.45, -0.1);
      world.rightReleaseHand.group.position.set(0.10 + 0.125 + spread * 0.14, 0.34, 0.44 - 0.04);
      world.rightReleaseHand.group.rotation.set(0.15, -2.65, 0.1);

      const initialDrift = t > 61.5 ? -0.032 * smooth((t - 61.5) / 2.0) : 0;
      world.heroRobot.setPose({
        pelvisPos: [0, 0.195, 0],
        pivotRotX: initialDrift,
        leftArmPitch: 0.18,
        rightArmPitch: 0.18,
      });
      world.heroRobot.setDamageState({ chinCracked: false, showCom: t > 60.5 });

      fx.aperture = 0.014;
      cam.pos = lerp3([0.56, 0.36, 1.24], [0.50, 0.34, 1.16], u);
      cam.look = [0.06, 0.23, 0.42];
      cam.fov = 31;
    } else if (t < 75.8) {
      // Cut 3B: Exponential Positive-Feedback Hunting Oscillation (-1.8° -> +3.4° -> -6.1° -> +11.5°) & FACEPLANT!!
      dramaBars = true;
      const deg = Math.PI / 180;
      let tiltX = 0;
      let armSwing = 0;
      let posY = 0;
      let posZ = 0;
      let shakeX = 0;
      let shakeY = 0;
      let cracked = false;

      if (t < 72.3) {
        // 4 escalating hunting half-cycles!
        const hu = (t - 63.6) / 8.7; // 0..1
        const ampDeg = 1.8 * Math.exp(hu * 1.98); // 1.8° -> 13.0°!
        tiltX = Math.sin(hu * Math.PI * 7.0 - Math.PI * 0.5) * ampDeg * deg;
        armSwing = -tiltX * 1.6;
      } else if (t < 73.15) {
        // Heels lift off EVA mat -> violent forward tip-over faceplant!
        const fu = smooth((t - 72.3) / 0.85);
        tiltX = lerp(12.5 * deg, 88.5 * deg, fu * fu);
        posY = Math.sin(fu * Math.PI) * 0.025 + fu * 0.042;
        posZ = fu * 0.035;
        armSwing = -0.65 * fu;
      } else {
        // Face-down slammed onto 20mm EVA mat + camera impact shockwave!
        tiltX = 88.5 * deg;
        posY = 0.042;
        posZ = 0.035;
        armSwing = -0.65;
        cracked = true;
        const decay = Math.exp(-(t - 73.15) * 9.0);
        shakeX = Math.sin(t * 75) * 0.018 * decay;
        shakeY = Math.cos(t * 92) * 0.016 * decay;
      }

      world.heroRobot.setPose({
        pelvisPos: [0, 0.195, 0],
        pivotRotX: tiltX,
        pivotPosY: posY,
        pivotPosZ: posZ,
        leftArmPitch: 0.15 + armSwing,
        rightArmPitch: 0.15 + armSwing,
      });
      world.heroRobot.setDamageState({ chinCracked: cracked, showCom: false });

      fx.aperture = 0.013;
      const u = (t - 63.6) / 12.2;
      const basePos = lerp3([0.58, 0.35, 1.18], [0.50, 0.30, 1.24], u);
      cam.pos = [basePos[0] + shakeX, basePos[1] + shakeY, basePos[2]];
      cam.look = [0.04, 0.22, 0.42];
      cam.fov = 33;
    } else {
      // Cut 3C: Macro Aftermath — Fallen Robot on Black EVA Mat rolled slightly on back/side so the Bright White Chin Crack faces camera!
      world.heroRobot.setPose({
        pelvisPos: [0, 0.195, 0],
        pivotRotX: -1.32,
        pivotRotZ: 0.35,
        pivotPosY: 0.072,
        pivotPosZ: 0.02,
        leftArmPitch: 0.35,
        rightArmPitch: 0.25,
      });
      world.heroRobot.setDamageState({ chinCracked: true });
      const u = (t - 75.8) / 6.2;
      fx.aperture = 0.015;
      // Head is up-left from chest core along the fallen torso axis; pull back slightly so cracked chin + visor + chest shine!
      cam.pos = lerp3([-0.04, 0.34, 0.38], [-0.12, 0.30, 0.34], u);
      cam.look = [-0.16, 0.14, 0.06];
      cam.fov = 26;
    }
  }

  // ===========================================================================
  // SCENE 4 (82 – 118s): 猛暑32.4℃西日の二重破局 — 右脚ケーブル噛み込み断線 ＆ 63℃『PLA+』熱クリープ変形！！
  // ===========================================================================
  else if (t < 118) {
    lights.setPreset('room_west_sun_32c');
    world.winMat.uniforms.uMode.value = 1.0; // Blazing orange west sun!
    screens.setThermoMode('temp_324c_hot');
    screens.setLaptopMode('thermal_63c_creep');
    world.thermoGroup.visible = true;
    world.floorLaptop.visible = true;
    world.heroRobot.root.visible = true;
    world.heroRobot.setAssemblyProgress(1.0);
    world.heroRobot.root.position.set(0.10, 0.038, 0.44);
    world.heroRobot.root.rotation.set(0, 0.35, 0);

    if (t < 91.8) {
      // Cut 4A: 32.4°C West-Sun Deep Squat Stand-Up Strain (z = -135mm -> -175mm, +16mm forward offset, strained tremble!)
      const u = (t - 82.0) / 9.8;
      const squatH = lerp(0.138, 0.174, smooth(u));
      const strainJitter = Math.sin(t * 42) * 0.0018 * u;
      world.heroRobot.setPose({
        pelvisPos: [0, squatH + strainJitter, 0.016],
        pelvisRot: [0.16 * (1 - u * 0.3), 0, 0],
        leftArmPitch: -0.35,
        rightArmPitch: -0.35,
      });
      world.heroRobot.setDamageState({ chinCracked: true, wireCut: false, heatGlow: u * 0.75 });
      fx.aperture = 0.014;
      cam.pos = lerp3([0.56, 0.32, 1.18], [0.42, 0.28, 1.02], u);
      cam.look = [0.06, 0.21, 0.44];
      cam.fov = 31;
    } else if (t < 97.6) {
      // Cut 4B-1: EXTREME MACRO on the Closing Torso-Rib / Right-Hip Scissor Pinch -> WIRE SNAP ("ブチッ！！") + MICRO-SPARK!
      dramaBars = true;
      const u = (t - 91.8) / 5.8;
      const snapped = t >= 95.4;
      const spark = snapped ? Math.max(0, 1 - (t - 95.4) * 2.4) : 0;
      world.heroRobot.setPose({
        pelvisPos: [0, lerp(0.174, 0.184, u), 0.016],
        pelvisRot: [0.11, 0, 0],
      });
      world.heroRobot.setDamageState({ chinCracked: true, wireCut: snapped, spark, heatGlow: 0.9 });
      fx.aperture = 0.017;
      fx.bloomStrength = snapped ? 0.32 : 0.22;
      // Macro probe zoomed directly into the right-hip pinch gap!
      cam.pos = lerp3([-0.03, 0.275, 0.70], [0.01, 0.258, 0.64], u);
      cam.look = [0.065, 0.235, 0.46];
      cam.fov = 22;
    } else if (t < 103.5) {
      // Cut 4B-2: Corkscrew Collapse onto Right Shoulder (Right Leg Limp, Left Leg Kicks Alone!)
      dramaBars = true;
      const fu = smooth((t - 97.6) / 1.4);
      world.heroRobot.setPose({
        pelvisPos: [0, lerp(0.185, 0.21, fu), 0.012],
        pivotRotZ: lerp(0, 1.48, fu * fu),
        pivotRotX: lerp(0, 0.32, fu),
        pivotPosY: fu * 0.045,
        rightLegLimp: true,
        leftArmPitch: -0.6,
        rightArmPitch: 0.5,
      });
      world.heroRobot.setDamageState({ chinCracked: true, wireCut: true, heatGlow: 1.0 });
      fx.aperture = 0.014;
      const u = (t - 97.6) / 5.9;
      cam.pos = lerp3([0.48, 0.34, 1.02], [0.34, 0.28, 0.94], u);
      cam.look = [0.02, 0.15, 0.44];
      cam.fov = 31;
    } else if (t < 109.2) {
      // Cut 4C-1: Minato's Hand Touches 63°C Knee -> Sharp Recoil ("……っ、熱つ！？") + Laptop 63°C Telemetry!
      const u = (t - 103.5) / 5.7;
      world.heroRobot.setPose({
        pelvisPos: [0, 0.20, 0.01],
        pivotRotZ: 1.48,
        pivotRotX: 0.32,
        pivotPosY: 0.045,
        rightLegLimp: true,
      });
      world.heroRobot.setDamageState({ chinCracked: true, wireCut: true, heatGlow: 1.0 });

      // Right hand reaches down, touches hot knee at t=105.0s, then jerks back rapidly!
      world.rightReleaseHand.group.visible = true;
      const recoil = t < 105.2 ? 0.0 : smooth((t - 105.2) / 0.45);
      world.rightReleaseHand.group.position.set(0.06 + recoil * 0.14, 0.13 + recoil * 0.12, 0.50 + recoil * 0.08);
      world.rightReleaseHand.group.rotation.set(0.4, -1.8, 0.2);

      fx.aperture = 0.011;
      cam.pos = lerp3([-0.14, 0.24, 0.72], [-0.18, 0.21, 0.58], u);
      cam.look = lerp3([0.02, 0.14, 0.44], [-0.30, 0.15, 0.31], smooth((u - 0.35) / 0.5));
      cam.fov = 30;
    } else {
      // Cut 4C-2: MUSEUM-GRADE ULTRA-MACRO on 2.35x Warped 63°C Heat-Crept Black PLA+ Knee Bracket & Sunken 1.2mm Brass Insert!
      dramaBars = true;
      lights.setPreset('room_heat_macro');
      world.heroRobot.root.visible = false;
      world.floorLaptop.visible = false;
      world.creepMacroRig.root.visible = true;
      const u = (t - 109.2) / 8.8;
      world.creepMacroRig.root.rotation.set(0.14, -0.78 + u * 0.75, -0.05);
      fx.aperture = 0.016;
      fx.bloomStrength = 0.26;
      cam.pos = lerp3([0.28, 0.87, -0.10], [-0.04, 0.85, -0.09], u);
      cam.look = [0.09, 0.775, -0.49];
      cam.fov = 26;
    }
  }

  // ===========================================================================
  // SCENE 5 (118 – 150s): Day 125 深夜1時の解体と覚醒 —『引き算の設計』Rev 1.5 ＆ PA-09圧着の再起！
  // ===========================================================================
  else {
    lights.setPreset('room_midnight_01am');
    world.winMat.uniforms.uMode.value = 2.0; // Deep 01:00 AM summer midnight!
    screens.setLaptopMode('cad_rev15_subtraction');
    screens.setScaleMode('weight_parts_audit');

    world.props.teaGlass.visible = true;
    world.scaleGroup.visible = true;
    world.scaleGroup.position.set(-0.02, 0.720, 0.06);

    if (t < 130.0) {
      // Cut 5A: 01:00 AM Forensic Knolling Autopsy on Walnut Workbench + Lukewarm Barley Tea + Scale "-182g" (Zero Overlap!)
      world.props.knollingGroup.visible = true;
      const u = (t - 118.0) / 12.0;
      fx.aperture = 0.014;
      cam.pos = lerp3([-0.06, 1.04, 0.04], [0.34, 1.00, 0.00], u);
      cam.look = [0.14, 0.74, -0.50];
      cam.fov = 31;
    } else if (t < 141.0) {
      // Cut 5B: Open `HMD-01 Rev 1.5 大改修計画` Notebook + Glowing Rotating Rev 1.5 Open-Truss Central-LiPo Hologram + CAD!
      world.scaleGroup.visible = false;
      world.rev15Nb.visible = true;
      world.rev15Holo.root.visible = true;
      world.rev15Holo.root.rotation.y = (t - 130.0) * 0.75;
      const u = (t - 130.0) / 11.0;
      fx.aperture = 0.012;
      fx.bloomStrength = 0.26;
      cam.pos = lerp3([0.30, 1.00, 0.02], [-0.04, 0.96, 0.00], u);
      cam.look = lerp3([0.10, 0.79, -0.49], [-0.10, 0.81, -0.55], u * 0.65);
      cam.fov = 32;
    } else {
      // Cut 5C: Crisp Macro Close-Up of Green-Handled Engineer `PA-09` Crimper Squeezing Shut ("カチリ！") on Gold Pin!
      dramaBars = true;
      world.scaleGroup.visible = false;
      world.rev15Nb.visible = true;
      world.props.pa09.visible = true;
      const u = (t - 141.0) / 9.0;
      // Squeeze smoothly shut at t=143.5s ("カチリ！")
      const sq = smooth((t - 142.2) / 1.3);
      world.props.setPa09Squeeze(sq);

      fx.aperture = 0.016;
      cam.pos = lerp3([0.18, 0.84, -0.22], [-0.02, 0.845, -0.21], u);
      cam.look = [0.06, 0.742, -0.49];
      cam.fov = 25;
    }
  }

  return { cam, fx, dramaBars, fin: t >= 149.2 };
}
