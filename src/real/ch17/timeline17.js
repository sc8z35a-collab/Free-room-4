export const CH17_DURATION = 150.0;

export const CH17_SCENES = [
  { id: 1, start: 0,   end: 28,  jp: '聴診器の夏 · フォースゲージ2.05N実測・35Hz魔の共振＆青い防振ゴム4枚' },
  { id: 2, start: 28,  end: 48,  jp: '過酷環境ランダム化訓練 · 氷床・500g鉛・6ms遅延の泥沼で4,096体が修行！' },
  { id: 3, start: 48,  end: 78,  jp: 'Day 476 · 『自動制御』完答・初めての駅前焼肉打ち上げ＆夏の星座' },
  { id: 4, start: 78,  end: 104, jp: 'Day 478 午後9時 · 7.62kg初自立——オレンジの安全ベルトが『Uの字』にたるむ奇跡！' },
  { id: 5, start: 104, end: 128, jp: '胸を3cm押す「ふわっ、スッ」＆ 鉄パイプ櫓内4歩の重厚な初歩行！' },
  { id: 6, start: 128, end: 150, jp: '歓喜の5分後 · オシロスコープの隅に刻まれた白い稲妻『25.2V → 28.4V』！' },
];

export const CH17_SUBTITLES = [
  { start: 0.4,   end: 9.8,   speaker: 'ナレーション', text: 'デジタルフォースゲージを185mmカーボン脛の先端へ引っ掛け1gずつ引く——『2.05 N（0.38 N·m）』を越えた瞬間、グリスが剥がれ『ヌルッ』と回った！' },
  { start: 10.0,  end: 18.8,  speaker: 'ナレーション', text: '1Hz〜50Hzのチャープ信号を流し込むとボード線図が暴き出した——28Hz超の遅れと4.2ms遅延が重なる『35Hz』に、魔の共振点が口を開けていた！' },
  { start: 19.0,  end: 27.8,  speaker: 'ナレーション', text: 'さらに胸の姿勢センサ（IMU）の下へ、衝撃を熱へ変える青い防振ゴム（ソルボセイン）の小さな座布団を4枚挟み込む。骨の震えは嘘のように静まった。' },

  { start: 28.4,  end: 38.2,  speaker: 'ナレーション', text: 'もう綺麗なガラスの温室では育てない！ 4,096体の分身に、6.0ms遅延・硬いグリス・氷の床・背中の500gの鉛——意地悪なハンデ（ドメインランダマイゼーション）を背負わせる！' },
  { start: 38.4,  end: 47.8,  speaker: 'ナレーション', text: '頭脳へ直前5ステップ（0.025秒）の記憶を与え、自分の皮膚感覚でその日の体調と床の滑りを瞬時に察知させる。泥沼の夢で5億ステップの修行が始まった！' },

  { start: 48.4,  end: 56.8,  speaker: 'ナレーション', text: 'Day 476『自動制御』前期末試験。配点40点の大問二は、先週六畳間の床で右膝から測り取ったのと瓜二つの問題だった。終了10分前に全欄完答！' },
  { start: 57.0,  end: 68.8,  speaker: '田所', text: '大学476日目、煙もうもうたる駅前の安焼肉屋で初めての打ち上げ！ 牛タンと烏龍茶で笑い合う。田所「佐伯、ほんとにいい顔になったよな。もうすぐ立つのか？」' },
  { start: 69.0,  end: 77.8,  speaker: 'ナレーション', text: '夏の星座の下、203号室のすりガラス越しに点滅する赤いランプ。「ああ、ここが俺の場所だ」——胸の奥が静かに満たされていた。' },

  { start: 78.4,  end: 87.8,  speaker: '佐伯 湊', text: 'Day 478午後9時。5億歩を生き抜いた1.8MBの魂を書き込み、赤い非常停止に汗ばむ右手を乗せる。「……お前の声は、全部聴いたぞ。……立て、『HMD-02』」' },
  { start: 88.0,  end: 96.4,  speaker: 'ナレーション', text: '甲高い悲鳴は鳴らなかった。聞こえたのは熟練の剣士のような『……シュン、クッ』という澄んだ呼吸音！ 両膝が3cm伸び——オレンジ色の安全ベルトが空中で柔らかな『Uの字』にたるんだ！！' },
  { start: 96.6,  end: 103.8, speaker: 'ナレーション', text: 'ベルトはもう1グラムも支えていない。全高720mm・総重量7.62kgの漆黒の巨人が、静かに呼吸する人間のように重心の揺らぎをふわりと受け流して自立していた！' },

  { start: 104.4, end: 114.8, speaker: '佐伯 湊', text: '黒い胸板を2本の指で3cm後ろへ押してみる——『ふわっ、スッ』！ 柳のように力を吸い込み揺り戻しゼロで戻る。「……立った……本当に、自分の柔らかい膝で立ったぞ……！！」' },
  { start: 115.0, end: 127.8, speaker: 'ナレーション', text: '櫓の中で前進コマンド送信——『……トン。……トン。……トン。……トン。』7.62kgの重厚な裸足のような4歩が響き、狙い通りの位置でピタリと静止した！' },

  { start: 128.4, end: 138.8, speaker: '佐伯 湊', text: 'だが電源を切った5分後、オシロスコープの隅に不穏な数字が残っていた。4歩目の急停止で満充電25.2Vの波形が『28.4 ボルト』へ鋭い槍のように跳ね上がっていたのだ！' },
  { start: 139.0, end: 149.8, speaker: 'ナレーション', text: '「28.4ボルト？ なんで電池の電圧より高く跳ね上がるんだ……？」——来月、命綱を外して全力走行したとき、逆流する『白い稲妻』が最後の試練として牙を剥く！' },
];

export function getCh17Scene(t) {
  for (let i = CH17_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH17_SCENES[i].start) return CH17_SCENES[i];
  }
  return CH17_SCENES[0];
}

export function getCh17Subtitle(t) {
  for (let i = 0; i < CH17_SUBTITLES.length; i++) {
    const s = CH17_SUBTITLES[i];
    if (t >= s.start && t <= s.end) return { speaker: s.speaker, text: s.text };
  }
  return null;
}

export function getCh17Cutin(t) {
  if (t >= 4.0 && t < 9.2) return { text: '静止摩擦 実測：2.05 N（0.38 N·m）— 8:1遊星歯車の『ヌルッ』を数値化！', tone: 'emerald' };
  if (t >= 12.0 && t < 17.5) return { text: 'ボード線図解析：35Hz『魔の共振点』を寸分なく暴き出す！', tone: 'amber' };
  if (t >= 31.0 && t < 37.0) return { text: '過酷環境ランダム化：氷床・500g鉛・6ms遅延で5億ステップ修行！', tone: 'amber' };
  if (t >= 90.0 && t < 97.5) return { text: '奇跡の瞬間！ オレンジ安全ベルトが『Uの字』にたるみ 7.62kg 初自立達成！！', tone: 'emerald' };
  if (t >= 117.0 && t < 124.5) return { text: '『トン…トン…トン…トン』—— 7.62kg 夢と現実の断崖を越えた初4歩！', tone: 'emerald' };
  if (t >= 132.5 && t < 141.0) return { text: '不穏予兆：急停止時の回生電力により主電源が 25.2V → 28.4V へ急上昇！', tone: 'crimson' };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

export function evaluateCh17Timeline(t, world, screens, lights, camera, lookTarget, hudCb) {
  const {
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
  } = world;

  // Deterministic reset
  forceGaugeRig.group.visible = false;
  sorboRig.group.visible = false;
  minatoRoom.root.visible = false;
  hmd02.root.position.set(0, 0.042, 0);
  hmd02.root.rotation.set(0, 0, 0);

  let dof = { focusDist: 1.2, aperture: 0.007, halation: 0.28 };
  let simLog = null;

  // =========================================================================
  // CUT 01 (0..28s): Digital Force Gauge (2.05N) -> 35Hz Bode Plot -> 4 Blue Sorbothane Pads!
  // =========================================================================
  if (t < 28.0) {
    if (t < 10.0) {
      const u = t / 10.0;
      world.setActiveSet('macroSysId');
      lights.setPreset('macro_sysid');
      forceGaugeRig.group.visible = true;
      forceGaugeRig.updateGauge(u);

      camera.position.set(lerp(-0.08, 0.08, smooth(u)), lerp(0.18, 0.14, smooth(u)), lerp(0.56, 0.46, smooth(u)));
      lookTarget.set(-0.02, 0.11, 0.0);
      dof = { focusDist: 0.52, aperture: 0.005, halation: 0.24 };
      simLog = {
        tag: 'SYSTEM ID // DIGITAL FORCE GAUGE (185.0mm CARBON SHIN)',
        title: '聴診器を当てるように：2.05 N（0.38 N·m）でグリスが剥がれる『ヌルッ』を実測！',
        detail: '室温31℃と深夜22℃で粘りが3割変わる——愛おしい肉体のクセをすべて数値化',
      };
    } else if (t < 19.0) {
      const u = (t - 10.0) / 9.0;
      world.setActiveSet('room203');
      lights.setPreset('room_bode_night');
      workstationRoom.update(t, true);
      screens.updateMonitor('bode_35hz');

      camera.position.set(lerp(0.08, 0.0, smooth(u)), 1.02, lerp(-0.62, -0.74, smooth(u)));
      lookTarget.set(0.0, 1.02, -1.42);
      dof = { focusDist: 0.72, aperture: 0.0035, halation: 0.26 };
      simLog = {
        tag: 'CHIRP SIGNAL 1Hz -> 50Hz // 35Hz DEMONIC RESONANCE PEAK!',
        title: 'ボード線図が暴いた『35Hz 魔の共振点』—— 0.3秒の狂乱金属音の正体を特定！',
        detail: '28Hz超の筋肉応答遅れと4.2msの通信遅延が重なり、自分の揺れを無限増幅していた',
      };
    } else {
      const u = (t - 19.0) / 9.0;
      world.setActiveSet('macroSysId');
      lights.setPreset('macro_sysid');
      sorboRig.group.visible = true;
      sorboRig.animateSorbothane(u);

      camera.position.set(lerp(0.20, -0.14, smooth(u)), lerp(0.18, 0.13, smooth(u)), lerp(0.26, 0.22, smooth(u)));
      lookTarget.set(0.0, 0.025, 0.0);
      dof = { focusDist: 0.30, aperture: 0.005, halation: 0.28 };
      simLog = {
        tag: 'VIBRATION ISOLATION // 4× COBALT-BLUE SORBOTHANE CUSHIONS',
        title: '胸の姿勢センサの下へ『青い防振ゴム座布団（ソルボセイン）』4枚を挟み込む！',
        detail: '衝撃を熱に変えて吸い取る防振構造により、カーボン骨を伝わる微振動が嘘のように静まった',
      };
    }
  }
  // =========================================================================
  // CUT 02 (28..48s): Domain Randomization — Ice Patches, 500g Lead Weights & 5-Step Memory Ribbon!
  // =========================================================================
  else if (t < 48.0) {
    const u = (t - 28.0) / 20.0;
    world.setActiveSet('domainRand');
    lights.setPreset('isaac_mud_arena');
    drClones.updateArmy(t);

    const ph = t * 3.6;
    const sL = Math.sin(ph), sR = Math.sin(ph + Math.PI);
    heroVirtual.root.position.set(0, Math.abs(Math.cos(ph)) * 0.02, 0.45);
    heroVirtual.setPose({
      torsoPitch: 0.06,
      hipLPitch: sL * 0.44, kneeL: sL < 0 ? 0.06 : sL * 0.68,
      hipRPitch: sR * 0.44, kneeR: sR < 0 ? 0.06 : sR * 0.68,
      visorIntensity: 1.35,
    });
    memRing.rotation.z = t * 2.5;
    memRing.scale.setScalar(0.95 + Math.sin(t * 4.0) * 0.08);

    camera.position.set(lerp(1.42, -1.15, smooth(u)), lerp(1.12, 0.72, smooth(u)), lerp(2.25, 1.75, smooth(u)));
    lookTarget.set(0.0, 0.42, lerp(-1.4, 0.32, smooth(u)));
    dof = { focusDist: 1.85, aperture: 0.006, halation: 0.30 };
    simLog = {
      tag: 'DOMAIN RANDOMIZATION // 500M STEPS · 5-STEP (0.025s) MEMORY',
      title: '泥沼の夢：6.0ms遅延・氷の床・背中の500g鉛で4,096体の分身を徹底鍛錬！',
      detail: '直前5ステップの皮膚感覚から「今日のグリスと床の滑り」を瞬時に察知して自動適応する',
    };
  }
  // =========================================================================
  // CUT 03 (48..78s): Day 476 Exam Victory -> Station-Front Smoky Yakiniku -> Summer Stars & Room 203!
  // =========================================================================
  else if (t < 78.0) {
    if (t < 57.0) {
      const u = (t - 48.0) / 9.0;
      world.setActiveSet('examDesk');
      lights.setPreset('exam_bright_july');

      camera.position.set(lerp(-0.16, 0.14, smooth(u)), lerp(1.22, 1.14, smooth(u)), lerp(0.32, 0.24, smooth(u)));
      lookTarget.set(0.0, 0.74, 0.04);
      dof = { focusDist: 0.56, aperture: 0.004, halation: 0.20 };
      simLog = {
        tag: 'DAY 476 // JULY 25 TUE · AUTOMATIC CONTROL FINAL EXAM',
        title: '配点40点の大問二は、先週六畳間で右膝から測り取ったのと瓜二つの問題！',
        detail: '鉛筆が止まる瞬間は一度もなかった——試験終了10分前、全欄完答！',
      };
    } else if (t < 69.0) {
      const u = (t - 57.0) / 12.0;
      world.setActiveSet('yakiniku');
      lights.setPreset('yakiniku_warm_smoke');
      yakinikuRig.updateGrill(t);

      camera.position.set(lerp(-0.36, 0.36, smooth(u)), lerp(1.36, 1.28, smooth(u)), lerp(1.56, 1.44, smooth(u)));
      lookTarget.set(0.0, 0.96, -0.35);
      dof = { focusDist: 1.65, aperture: 0.006, halation: 0.34 };
      simLog = {
        tag: 'DAY 476 EVENING // FIRST COLLEGE YAKINIKU WITH TADOKORO & FRIENDS',
        title: '煙もうもうたる駅前の安焼肉屋 —— 大学476日目、同級生たちと囲む丸テーブル！',
        detail: '「お前ほんとにいい顔になったよな」「立ったら絶対、動画だけでも見せろよな！」',
      };
    } else {
      const u = (t - 69.0) / 9.0;
      world.setActiveSet('summerNight');
      lights.setPreset('summer_starry_night');
      const blink = 0.55 + Math.abs(Math.sin(t * 9.0)) * 0.45;
      redWinLedMat.color.setRGB(blink, 0.12 * blink, 0.12 * blink);
      redWinHalo.material.opacity = 0.18 + blink * 0.28;

      camera.position.set(lerp(-1.25, -0.65, smooth(u)), lerp(1.45, 1.68, smooth(u)), lerp(3.45, 2.75, smooth(u)));
      lookTarget.set(1.15, lerp(2.45, 3.55, smooth(u)), -3.6);
      dof = { focusDist: 6.2, aperture: 0.004, halation: 0.34 };
      simLog = {
        tag: 'SUMMER CONSTELLATIONS // ROOM 203 CORNER WINDOW RED LED',
        title: '二階角部屋のすりガラス越しに点滅する赤いランプ ——「ああ、ここが俺の場所だ」',
        detail: 'みんなと笑う温かさを胸に抱き、鍵を開けて鉄パイプの待つ六畳間へ帰る',
      };
    }
  }
  // =========================================================================
  // CUT 04 (78..104s): Day 478 21:00 — THE 7.62kg STANDING MIRACLE & ORANGE U-SHAPED SLACK BELT!!
  // =========================================================================
  else if (t < 104.0) {
    world.setActiveSet('room203');
    workstationRoom.update(t, true);
    screens.updateMonitor('policy_1_8mb');

    if (t < 88.0) {
      // Tense pre-launch: orange safety belt pulled taut holding 7.62kg HMD-02!
      const u = (t - 78.0) / 10.0;
      lights.setPreset('room_bode_night');
      hmd02.root.position.set(0, 0.042, 0);
      hmd02.setPose({ liftY: -0.03, hipLPitch: -0.20, kneeL: 0.40, hipRPitch: -0.20, kneeR: 0.40, visorIntensity: 0.85 });
      dynamicBelt.updateBelt(1.76, 0.64, 0.0, 0);

      camera.position.set(lerp(0.85, 0.42, smooth(u)), lerp(0.92, 0.82, smooth(u)), lerp(1.75, 1.55, smooth(u)));
      lookTarget.set(0.0, 0.58, 0.30);
      dof = { focusDist: 1.35, aperture: 0.007, halation: 0.28 };
      simLog = {
        tag: 'DAY 478 // JULY 27 THU 21:00 · 1.8 MB POLICY DEPLOYED',
        title: '汗ばむ右手を赤い非常停止へ ——「お前の声は、全部聴いたぞ。立て、『HMD-02』」',
        detail: 'オレンジ色の安全スリングにたるみ10cm。静寂の六畳間で起動キーが押される',
      };
    } else {
      // 88..104s: THE MIRACLE! Knees glide up 3cm -> Orange Safety Belt DROOPS INTO A SOFT U-SHAPE!
      const u = (t - 88.0) / 16.0;
      lights.setPreset('room_miracle_gold');
      const rise = smooth(clamp01(u * 2.2));
      const breathe = Math.sin(t * 2.4) * 0.008 * rise; // subtle living human micro-breathing!
      hmd02.root.position.set(0, 0.042, 0);
      hmd02.setPose({
        liftY: lerp(-0.03, 0.012, rise) + breathe,
        hipLPitch: lerp(-0.20, -0.04, rise) + breathe * 1.5,
        kneeL: lerp(0.40, 0.08, rise) - breathe * 2.0,
        hipRPitch: lerp(-0.20, -0.04, rise) + breathe * 1.5,
        kneeR: lerp(0.40, 0.08, rise) - breathe * 2.0,
        pelvisRoll: Math.sin(t * 1.3) * 0.018 * rise,
        visorIntensity: 1.55,
      });
      // REAL-TIME CURVED ORANGE BELT LOSING TENSION AND DROOPING INTO A SOFT U-SHAPE!
      dynamicBelt.updateBelt(1.76, 0.67 + rise * 0.03, rise, Math.sin(t * 1.5) * 0.015 * rise);

      // Sweeping heroic arc showing BOTH the U-shaped drooping orange belt AND HMD-02 standing unassisted!
      camera.position.set(lerp(-0.92, 0.98, smooth(u)), lerp(0.96, 0.82, smooth(u)), lerp(1.78, 1.62, smooth(u)));
      lookTarget.set(0.0, lerp(0.84, 0.62, smooth(u)), 0.30);
      dof = { focusDist: 1.55, aperture: 0.006, halation: 0.34 };
      simLog = {
        tag: 'MIRACLE ACHIEVED // 7.62 kg FIRST AUTONOMOUS STAND!!',
        title: '『……シュン、クッ』オレンジの安全ベルトが柔らかな『Uの字』を描いて完全にたるんだ！！',
        detail: 'ベルトは1グラムも支えていない——生身の人間のように呼吸しながら重力を完全に手なずける！',
      };
    }
  }
  // =========================================================================
  // CUT 05 (104..128s): Gentle 3cm Chest Push (`ふわっ、スッ`) & 4 Dignified Steps Inside the Gantry!
  // =========================================================================
  else if (t < 128.0) {
    world.setActiveSet('room203');
    lights.setPreset('room_miracle_gold');
    workstationRoom.update(t, true);
    screens.updateMonitor('policy_1_8mb');

    if (t < 115.0) {
      // 104..115s: Minato gently pushes HMD-02's black carbon chest back 3cm -> willow-branch elastic absorption!
      const u = (t - 104.0) / 11.0;
      const pushEnv = Math.sin(smooth(clamp01((u - 0.15) / 0.65)) * Math.PI);
      hmd02.root.position.set(0, 0.042, -pushEnv * 0.042);
      hmd02.setPose({
        liftY: -pushEnv * 0.032,
        torsoPitch: -pushEnv * 0.12,
        hipLPitch: -0.05 - pushEnv * 0.22,
        kneeL: 0.10 + pushEnv * 0.42,
        hipRPitch: -0.05 - pushEnv * 0.22,
        kneeR: 0.10 + pushEnv * 0.42,
        visorIntensity: 1.5,
      });
      dynamicBelt.updateBelt(1.76, 0.70 - pushEnv * 0.02, 1.0, 0);

      minatoRoom.root.visible = true;
      minatoRoom.root.position.set(0.62, 0.0, 0.50);
      minatoRoom.root.rotation.y = -Math.PI * 0.65;
      minatoRoom.leftArm.shoulder.rotation.set(-0.92 - pushEnv * 0.14, 0.24, 0.16);
      minatoRoom.leftArm.elbow.rotation.set(-0.22 + pushEnv * 0.14, 0, 0);

      camera.position.set(lerp(-0.98, -0.78, smooth(u)), 0.78, lerp(1.58, 1.48, smooth(u)));
      lookTarget.set(0.14, 0.56, 0.34);
      dof = { focusDist: 1.45, aperture: 0.006, halation: 0.32 };
      simLog = {
        tag: 'SOFT COMPLIANCE TEST // 3cm CHEST PUSH -> WILLOW RECOVERY',
        title: '黒い胸板を2本指で3cm押す ——『ふわっ、スッ』筋肉と腱のように柔らかく受け流す！',
        detail: '「……立った……本当に、自分の柔らかい膝で立ったぞ……！！」',
      };
    } else {
      // 115..128s: 4 Dignified Heavy Steps Inside the Steel Gantry (`……トン。……トン。……トン。……トン。`)!
      const u = (t - 115.0) / 13.0;
      const walkU = clamp01((u - 0.08) / 0.78);
      const ph = walkU * Math.PI * 4.0; // Exact 4 steps!
      const env = Math.sin(clamp01(walkU) * Math.PI);
      const sL = Math.sin(ph) * (walkU < 1 ? 1 : 0);
      const sR = Math.sin(ph + Math.PI) * (walkU < 1 ? 1 : 0);
      hmd02.root.position.set(0, 0.042, lerp(-0.16, 0.16, walkU));
      hmd02.setPose({
        liftY: Math.abs(Math.cos(ph)) * 0.018 * env,
        hipLPitch: sL * 0.34,
        kneeL: sL < 0 ? 0.06 : sL * 0.55,
        hipRPitch: sR * 0.34,
        kneeR: sR < 0 ? 0.06 : sR * 0.55,
        visorIntensity: 1.55,
      });
      dynamicBelt.updateBelt(1.76, 0.70, 1.0, 0);

      camera.position.set(lerp(0.58, 0.36, smooth(u)), lerp(0.58, 0.62, smooth(u)), lerp(1.62, 1.56, smooth(u)));
      lookTarget.set(0.0, 0.42, 0.30 + lerp(-0.12, 0.14, walkU));
      dof = { focusDist: 1.35, aperture: 0.006, halation: 0.32 };
      simLog = {
        tag: 'DAY 478 // FIRST 4 HEAVY STEPS INSIDE THE 180cm GANTRY!',
        title: '『……トン。……トン。……トン。……トン。』7.62kgの重厚な4歩が六畳間に響き渡る！',
        detail: '軽いプラスチックの音ではない。人間が裸足で静かに歩いたかのような、確かな足音',
      };
    }
  }
  // =========================================================================
  // CUT 06 (128..150s): 5 Minutes Later — Ominous `25.2V -> 28.4V` White Lightning Spike on Oscilloscope!
  // =========================================================================
  else {
    const u = (t - 128.0) / 22.0;
    world.setActiveSet('room203');
    lights.setPreset('room_omen_spike');
    workstationRoom.update(t, true);
    screens.updateMonitor('spike_28_4v');
    hmd02.root.position.set(0, 0.042, 0.16);
    hmd02.setPose({ visorIntensity: 0.45 });
    dynamicBelt.updateBelt(1.76, 0.70, 1.0, 0);

    // Smooth dramatic push-in straight to the glowing `25.2V -> 28.4V` regenerative voltage spike trace!
    camera.position.set(lerp(0.28, 0.0, smooth(u)), lerp(0.98, 1.02, smooth(u)), lerp(-0.34, -0.74, smooth(u)));
    lookTarget.set(0.0, 1.02, -1.42);
    dof = { focusDist: 0.72, aperture: 0.0035, halation: 0.34 };
    simLog = {
      tag: 'END OF CHAPTER 17 // DAY 478 · BUDGET ¥294,420',
      title: '「……28.4ボルト？ なんで電池の電圧より高く跳ね上がるんだ……？」',
      detail: '次章：第18章『逆流する稲妻と、二度目の夏休み』—— 命綱なし全力走行で襲う回生過電圧の罠へ！',
    };
  }

  if (hudCb) hudCb({ simLog });
  return dof;
}
