import * as THREE from 'three';

export const REAL_FILM_DURATION = 600.0; // 10 minutes (600.0 seconds)

export const REAL_CHAPTERS = [
  { id: 1, start: 0, end: 70, jp: '第1章・名門ロボ研と完全分業の壁' },
  { id: 2, start: 70, end: 115, jp: '第1章・夕暮れの桜と初期資金18万5千円' },
  { id: 3, start: 115, end: 185, jp: '第1章・秋葉原ガード下とSTS3215選定' },
  { id: 4, start: 185, end: 235, jp: '第1章・6畳一間の工場と沈黙の12.14V' },
  { id: 5, start: 235, end: 268, jp: '第1章・深夜1時の仕様書 1,000,000 bps' },
  { id: 6, start: 268, end: 300, jp: '第1章・午前1時42分「シュッ、カチリ」' },
  { id: 7, start: 300, end: 350, jp: '第2章・HMD-01命名と消しゴムの16自由度' },
  { id: 8, start: 350, end: 395, jp: '第2章・膝9.9kg·cmの罠とストール曲線' },
  { id: 9, start: 395, end: 455, jp: '第2章・3D CAD拘束と『試作右脚v0.1』造形' },
  { id: 10, start: 455, end: 505, jp: '第2章・午前1時15分「パチンッ」最初の白煙' },
  { id: 11, start: 505, end: 550, jp: '第2章・電気回路Ⅰ キルヒホッフとGND浮き' },
  { id: 12, start: 550, end: 600, jp: '第2章・350℃の基板改修と78,420円の再起' },
];

export function getRealChapterForTime(t) {
  for (let i = REAL_CHAPTERS.length - 1; i >= 0; i--) {
    if (t >= REAL_CHAPTERS[i].start) return REAL_CHAPTERS[i];
  }
  return REAL_CHAPTERS[0];
}

// Complete Faithful Subtitles adapted directly from Chapters 1 & 2
const SUBTITLES = [
  // --- SCENE 01 (0 - 70s): Clubroom ---
  { s: 2, e: 11, sp: 'ナレーション', tx: '四月六日、東都農工大学・ロボティクス研究会。プレハブの扉を開けると、切削油の匂いと銀色のアルミの切り粉が靴底で鳴った。' },
  { s: 12, e: 22, sp: 'ナレーション', tx: '中央の作業台に鎮座するのは、昨年度のNHK学生ロボコン・ベスト4マシン。極太アルミフレームと4輪メカナムホイール。' },
  { s: 23, e: 34, sp: '倉田（機械3年）', tx: '「二足歩行？ うちは競技で勝つのが目的だからね。ルール上、車輪のほうが秒速3メートルで圧倒的に合理的だよ」' },
  { s: 35, e: 47, sp: '倉田（機械3年）', tx: '「うちは部員40人の完全分業制なんだ。1年は夏までライントレーサーと、先輩のマシンのワイヤーハーネス加工かな」' },
  { s: 48, e: 59, sp: '倉田（機械3年）', tx: '「安全管理上、回路班が旋盤や3D CADを触るのは禁止にしてる。みんな自分の専門に集中して勝つための組織だから」' },
  { s: 60, e: 69, sp: '佐伯 湊', tx: '（完成された組織の歯車になりに来たわけじゃない……俺が作りたいのは、この手で立たせる二足歩行だ）' },

  // --- SCENE 02 (70 - 115s): SunsetCherry Courtyard ---
  { s: 71, e: 82, sp: '佐伯 湊', tx: '「……違うんだよな」' },
  { s: 83, e: 95, sp: 'ナレーション', tx: '春の夕風に葉桜のソメイヨシノが散る。骨格を削り、電源を引き、通信線を繋ぎ、コードを書いて重力に逆らわせる——すべてを自分の手でやりたい。' },
  { s: 96, e: 105, sp: 'ナレーション', tx: '湊は白いA4の入部届を四つ折りに畳んでリュックへしまい込み、スマートフォンの銀行アプリを開いた。' },
  { s: 106, e: 114, sp: 'ナレーション', tx: '『普通預金残高：185,412円』。高校の貯金と春休みの引越バイト代——生活費の流用は一切許されない全開発資本。' },

  // --- SCENE 03 (115 - 185s): Akihabara ---
  { s: 116, e: 128, sp: 'ナレーション', tx: 'Day 003、秋葉原電気街。数百個のパーツ引き出しが壁一面に並ぶガード下の専門店を、湊は憑かれたように歩き回った。' },
  { s: 129, e: 142, sp: 'ナレーション', tx: '全身で16〜20個の関節モーターが必要になる。だが定番の高級シリアルサーボは1個2万円以上——16個で30万円を超え、即座に破綻する。' },
  { s: 143, e: 156, sp: 'ナレーション', tx: 'かといって1個800円の模型用PWMサーボでは、配線が48本のスパゲッティと化し、現在の角度すら読み取れない。' },
  { s: 157, e: 171, sp: '佐伯 湊', tx: '「これだ……Feetech STS3215！ 12V駆動・30kg·cm、非接触12ビット磁気エンコーダ搭載で1個2,950円！」' },
  { s: 172, e: 184, sp: 'ナレーション', tx: 'Bambu Lab A1、防振コンクリート平板、白光FX-600、三和CD771、ESP32-S3とサーボ2個。初日支出94,730円——残り資金90,270円。' },

  // --- SCENE 04 (185 - 235s): Room Setup & Dead Silence ---
  { s: 186, e: 198, sp: 'ナレーション', tx: '築28年『コーポ武蔵野』203号室。6畳一間の畳と折りたたみ机が、今日から佐伯湊の個人ロボット工場になった。' },
  { s: 199, e: 211, sp: 'ナレーション', tx: 'Day 006夜。ESP32-S3の送信ピンに1kΩの保護抵抗を挟み、目標角度180.0度（2048 = 0x0800）の16進数パケットを手計算で組む。' },
  { s: 212, e: 222, sp: 'ナレーション', tx: 'エンターキーを叩く——しかし、机の上のSTS3215はピクリとも動かない。冷蔵庫の低いモーター音だけが部屋に響く。' },
  { s: 223, e: 234, sp: '佐伯 湊', tx: '「テスターの電圧は12.14Vで正常……TXとRXも入れ替えたのに、なぜウンともスンとも言わないんだ……？」' },

  // --- SCENE 05 (235 - 268s): 1,000,000 bps Discovery ---
  { s: 236, e: 247, sp: 'ナレーション', tx: '深夜1時過ぎ。英語と中国語が混在する通信プロトコル仕様書の隅に、湊の目が釘付けになった。' },
  { s: 248, e: 258, sp: '佐伯 湊', tx: '「Address 0x06 : Baud Rate —— 初期値 1,000,000 bps！？ 115,200じゃなくて約9倍速い1メガbpsだったのか！」' },
  { s: 259, e: 267, sp: 'ナレーション', tx: '震える指でコードを『Serial1.begin(1000000)』へ書き換え、マイコンへ再書き込みを実行する——' },

  // --- SCENE 06 (268 - 300s): 01:42 AM First 1-Axis Awakening! ---
  { s: 268, e: 277, sp: 'ナレーション', tx: '午前1時42分——「シュッ、カチリ」。白い円盤型のサーボホーンが、目にも留まらぬ速さで正確に180.0度でピタリと静止した！' },
  { s: 278, e: 291, sp: 'ナレーション', tx: '親指と人差し指でホーンをつまみ、無理やり回そうと力を込める——「ジジジジッ……！」12ビット磁気エンコーダが猛烈な反力で指を押し返す！' },
  { s: 292, e: 299.5, sp: '佐伯 湊', tx: '「……動いた。ただの部品じゃない、姿勢を保とうとする『意思』がある。ここから俺のロボットが始まる！」' },

  // --- SCENE 07 (300 - 350s): Chapter 2 - Erasers & 16 DOF ---
  { s: 301, e: 313, sp: 'ナレーション', tx: '第2章『自由度16の皮算用と、最初の白煙』。湊は計画名を『HMD-01』と名付け、消しゴム2個と割り箸で脚の簡易模型を組んだ。' },
  { s: 314, e: 326, sp: '佐伯 湊', tx: '「予算をケチって片足4軸にすると……重心を横にずらした瞬間、接地側の消しゴムが斜めに浮いてエッジだけで立つのか！」' },
  { s: 327, e: 338, sp: 'ナレーション', tx: '股関節ロールと逆向きに足裏を水平へ保つ『足首ロール軸』、そして旋回用の『股関節ヨー軸』——片足6自由度は絶対に削れない。' },
  { s: 339, e: 349, sp: 'ナレーション', tx: '両脚12軸＋バランス用の両腕4軸＝計16自由度。身長380mm、目標総重量1.80kg——これが『HMD-01』の基本骨格となった。' },

  // --- SCENE 08 (350 - 395s): Knee Torque & Stall Trap ---
  { s: 351, e: 365, sp: 'ナレーション', tx: '片足立ちで膝を45度曲げた静的トルクを計算する。τ = m·g·L·sin45° = 1.5 × 9.81 × 0.093 × 0.707 ≈ 9.9 kg·cm。' },
  { s: 366, e: 379, sp: '佐伯 湊', tx: '「待てよ……仕様書の『30kg·cm』は軸がロックして2.7A流れるストール極限値だ！ 数分でコイルが焼損する領域じゃないか！」' },
  { s: 380, e: 394, sp: 'ナレーション', tx: '連続安全領域は7.5〜10.0kg·cm以下。着地衝撃1.5倍を加味すれば余裕はゼロ——フレーム設計は1グラムの無駄も許されない。' },

  // --- SCENE 09 (395 - 455s): 3D CAD & Bambu Lab A1 Printing ---
  { s: 396, e: 411, sp: 'ナレーション', tx: 'Autodesk Fusionとの格闘。未拘束の青いスケッチ線が真っ赤なエラーで崩壊する洗礼を経て、原点と基準平面による完全拘束を習得する。' },
  { s: 412, e: 429, sp: 'ナレーション', tx: 'Bambu Lab A1が高速でヘッドを走らせ、0.2mmピッチで黒いマットPLAを積層していく。コンクリート平板と防振ゴムが深夜の振動を吸収する。' },
  { s: 430, e: 443, sp: 'ナレーション', tx: 'M2.5穴の熱収縮と、厚さ2mmの片持ちL字ブラケットが指でぐにゃりと撓む失敗を乗り越え、両持ちコの字構造へ再設計。' },
  { s: 444, e: 454, sp: '佐伯 湊', tx: '「よし……股ピッチ・膝ピッチ・足首ピッチ、全長220mm『試作右脚v0.1』完成だ！」' },

  // --- SCENE 10 (455 - 505s): 01:15 AM White Smoke Burnout! ---
  { s: 456, e: 469, sp: 'ナレーション', tx: '四月二十七日 午前1時15分。白いブレッドボードに74HC126バッファICを組み、12V動力電源もジャンパ線で流し込んで屈伸テストを開始した。' },
  { s: 470, e: 480.7, sp: 'ナレーション', tx: '「ウィィン……ウィィン……」黒い右脚が滑らかに宙を蹴る。湊が記念動画を撮ろうとスマホへ手を伸ばした、その瞬間——' },
  { s: 480.8, e: 487.5, sp: '佐伯 湊', tx: '「あっ——パチンッ！！ ……うわっ、白い煙が！！」', shout: true },
  { s: 487.6, e: 496, sp: 'ナレーション', tx: '足首がノギスのケースに引っかかり大電流が急増。振動で黒いGNDピンが浮いた刹那、ESP32-S3のUSB端子から濃い一筋の白い煙が真っ直ぐ立ち昇った！' },
  { s: 496.1, e: 504.5, sp: 'ナレーション', tx: '「ピィィィィーッ！」三和CD771の導通ブザーが鳴り響く。3.3VとGND間の抵抗値は『0.4 Ω』——完全な内部短絡による即死だった。' },

  // --- SCENE 11 (505 - 550s): Morning Lecture KCL Epiphany ---
  { s: 506, e: 519, sp: '藤堂教授', tx: '「キルヒホッフの電流則、∑ I_in = ∑ I_out。電流というものは、必ず電源のマイナス側——グラウンドへ帰ろうとする性質を持つ」' },
  { s: 520, e: 535, sp: '藤堂教授', tx: '「もし12V系の太いGND線が接触不良で浮いたらどうなるか？ 行き場を失った12Vの電流は、信号線を通って3.3Vマイコンへ逆流し焼き切るのだ」' },
  { s: 536, e: 549, sp: '佐伯 湊', tx: '（昨夜の白煙とまったく同じだ……！ 教科書の数式はテストのためじゃない、俺のロボットを燃やさないための生きた武器なんだ！）' },

  // --- SCENE 12 (550 - 600s): 350°C Perfboard & ¥78,420 Restart ---
  { s: 551, e: 566, sp: 'ナレーション', tx: 'Day 024深夜。湊はブレッドボードを引き出しの奥へ封印し、350℃の白光FX-600でユニバーサル基板に極太のすずめっき星形GND母線をハンダ付けした。' },
  { s: 567, e: 581, sp: 'ナレーション', tx: 'AWG18シリコン線、XT60コネクタ、3Aヒューズ、信号保護抵抗。再投入された試作右脚は指で押さえても力強く宙を蹴り、煙は一切出なかった！' },
  { s: 582, e: 592, sp: '佐伯 湊', tx: '「残り開発資金、78,420円。深夜コンビニと塾講師のバイトに応募完了——時間を切り売りしてでも、資金は自分で稼ぐ」' },
  { s: 592.1, e: 599.5, sp: 'ナレーション', tx: '6畳一間の片隅で、黒い試作右脚が静かに次の命令を待っている。全16自由度・二足歩行への挑戦は、まだ始まったばかりだ。' },
];

// Simulation Log Telemetry Cards (faithful to the novel's iconic chapter headers/telemetry!)
const SIMLOGS = [
  { s: 1.5, e: 14, tag: 'LOG // DAY 001 · 04.06', title: '東都農工大学 ロボティクス研究会', detail: '部員40名・完全分業体制 ／ NHK学生ロボコン ベスト4（4輪メカナム＋空圧）' },
  { s: 100, e: 114, tag: 'CAPITAL // DAY 001 · 17:48', title: '初期開発資本：¥185,412', detail: '高校貯金＋春休み引越バイト代（生活費・仕送りの流用厳禁）' },
  { s: 156, e: 183, tag: 'SPEC // DAY 003 · AKIHABARA', title: 'Feetech STS3215 シリアルバスサーボ', detail: '12V / 30 kg·cm / 12-bit磁気エンコーダ(4096分割) / 半二重TTL / ¥2,950' },
  { s: 204, e: 233, tag: 'DEBUG // DAY 006 · 23:15', title: 'UART TX Packet -> ID:0x01 Goal:2048', detail: 'Baud: 115,200 bps | Supply: 12.14 V | Servo ACK: TIMEOUT' },
  { s: 268, e: 296, tag: 'ONLINE // DAY 007 · 01:42 AM', title: 'FIRST AXIS ACTIVE — 1,000,000 bps', detail: 'Present Pos: 2048 (180.0°) | 12-bit Magnetic Holding Torque Verified' },
  { s: 334, e: 349, tag: 'BLUEPRINT // DAY 009 · HMD-01', title: '第一世代機『HMD-01』基本諸元', detail: '身長 380 mm ／ 総重量目標 1.80 kg ／ 全16自由度 (脚6軸×2 ＋ 腕2軸×2)' },
  { s: 368, e: 393, tag: 'THERMAL // DAY 012 · TORQUE TRAP', title: '膝ピッチ静負荷 9.9 kg·cm vs 定格上限', detail: '30 kg·cm＝2.7Aストール焼損極限 ／ 連続安全域 7.5〜10.0 kg·cm（余裕 0g）' },
  { s: 414, e: 452, tag: 'FABRICATION // DAY 020 · BAMBU A1', title: '試作右脚 v0.1（3自由度ピッチ検証機）', detail: '全長 220 mm (大腿93+下腿93+足首34) ／ マットブラックPLA 0.20mm積層' },
  { s: 481.5, e: 504, tag: 'FATAL // DAY 022 · 01:15 AM', title: 'OVER-VOLTAGE BACKFEED — SHORT 0.4 Ω', detail: '原因: ブレッドボードGNDピン浮き → 12V動力電流がDATA線経由で3.3V系へ逆流' },
  { s: 510, e: 547, tag: 'THEORY // DAY 023 · 1st PERIOD', title: '電気回路Ⅰ：キルヒホッフの電流則 (KCL)', detail: '∑ I_in = ∑ I_out ／ 大電流リターンパス喪失時のGPIO保護ダイオード突破現象' },
  { s: 568, e: 598, tag: 'REV 0.2 // DAY 024 · 23:00', title: 'ユニバーサル基板 スターGND改修 [PASS]', detail: 'AWG18＋XT60＋3Aヒューズ＋直列保護抵抗 ／ 残り開発資金：¥78,420' },
];

const CUTINS = [
  { s: 268.0, e: 272.2, kicker: 'DAY 007 · 01:42 AM · 1,000,000 bps', main: '最初の1軸、起動。', sub: 'Feetech STS3215 — Goal Position 2048 (180.0°)', style: '' },
  { s: 300.2, e: 305.0, kicker: 'CHAPTER 02 · DAY 008 – DAY 024', main: '自由度16の皮算用と、最初の白煙', sub: 'Project HMD-01 — Height 380mm / 16 DOF / Target 1.80kg', style: '' },
  { s: 481.5, e: 485.2, kicker: 'DAY 022 · 01:15 AM · FLOATING GND FAULT', main: 'パチンッ！！ — 最初の白煙', sub: 'ESP32-S3 & 74HC126 焼損 ／ 3.3V-GND間 0.4 Ω 完全短絡', style: 'crimson' },
];

export function getRealSubtitle(t) {
  for (const s of SUBTITLES) {
    if (t >= s.s && t <= s.e) return { speaker: s.sp, text: s.tx, shout: !!s.shout };
  }
  return null;
}

export function getRealSimlog(t) {
  for (const l of SIMLOGS) {
    if (t >= l.s && t <= l.e) return l;
  }
  return null;
}

export function getRealCutin(t) {
  for (const c of CUTINS) {
    if (t >= c.s && t <= c.e) return c;
  }
  return null;
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function smooth(v) {
  const c = clamp01(v);
  return c * c * (3 - 2 * c);
}

function lerp3(a, b, alpha) {
  const s = smooth(alpha);
  return [
    a[0] + (b[0] - a[0]) * s,
    a[1] + (b[1] - a[1]) * s,
    a[2] + (b[2] - a[2]) * s,
  ];
}

/**
 * Evaluates the entire 10-minute (600.0s) photorealistic world, lighting, screens,
 * actors, hardware kinematics, VFX, and camera choreography at exact timestamp `t`.
 */
export function evaluateRealDirector(t, world, screens, lights, vfx) {
  const cam = {
    pos: [0, 1.4, 2.0],
    look: [0, 1.0, -0.5],
    fov: 40,
  };
  const fx = {
    time: t,
    bloomStrength: 0.18,
    chromatic: 0.0,
    speedLines: 0.0,
    flash: 0.0,
    invert: 0.0,
    warmth: 0.06,
  };

  let activeSet = 'apartment';
  let sakuraActive = false;
  let blueprintMode = 'off';
  let sparkTime = -1;
  let whiteSmokeActive = false;
  let smokeElapsed = 0;
  let fanActive = false;
  let solderActive = false;
  let dramaBars = false;

  // Default visibility resets inside apartment
  world.macroHand.group.visible = false;
  world.minatoRoom.root.visible = true;
  world.chairGroup.visible = true;
  world.protoLeg.root.visible = false;
  world.protoLeg.flawGroup.visible = false;
  world.eraserRig.root.visible = false;

  // ===========================================================================
  // SCENE 01 (0 – 70s): 名門『ロボティクス研究会』プレハブ部室
  // ===========================================================================
  if (t < 70) {
    activeSet = 'clubroom';
    lights.setPreset('club_fluorescent');

    const kSpeak = t >= 23 && t < 59;
    world.kurata.setPose(t, {
      speaking: kSpeak,
      pointingBoard: t >= 35 && t < 56,
    });
    world.minatoClub.setPose(t, {
      walking: t < 9 ? 0.55 : 0,
      lookingDown: t < 8 ? 0.45 : 0.08,
      focus: 0.4,
    });
    world.minatoClub.root.position.set(0.32, 0, t < 9 ? 1.55 - (t / 9) * 0.9 : 0.65);

    if (t < 12) {
      // Shot 1A: Low-angle macro tracking aluminum swarf underfoot -> tilt up to Robocon quad-mecanum machine!
      const u = t / 12;
      cam.pos = lerp3([0.48, 0.24, 1.55], [0.85, 1.08, 0.95], u);
      cam.look = lerp3([0.22, 0.04, 0.65], [-0.22, 0.98, -0.48], u);
      cam.fov = 38;
    } else if (t < 34) {
      // Shot 1B: Orbiting medium close-up of the quad-mecanum wheels, pneumatic cylinders & Kurata
      const u = (t - 12) / 22;
      cam.pos = lerp3([-0.95, 1.12, 0.52], [0.55, 1.32, 0.58], u);
      cam.look = lerp3([-0.15, 0.96, -0.48], [0.42, 1.35, -0.85], u);
      cam.fov = 36;
    } else if (t < 56) {
      // Shot 1C: Push-in on Kurata tapping the "完全分業体制 / 回路班は旋盤・3D CAD禁止" Whiteboard
      const u = (t - 34) / 22;
      cam.pos = lerp3([1.15, 1.52, -0.55], [0.72, 1.58, -1.35], u);
      cam.look = lerp3([0.65, 1.58, -3.12], [0.65, 1.62, -3.12], u);
      cam.fov = 35;
    } else {
      // Shot 1D: Tight portrait close-up on Minato's conflicted eyes & quiet resolve
      const u = (t - 56) / 14;
      cam.pos = lerp3([0.12, 1.56, -0.12], [0.20, 1.58, 0.02], u);
      cam.look = [0.32, 1.56, 0.65];
      cam.fov = 30;
    }
  }

  // ===========================================================================
  // SCENE 02 (70 – 115s): 夕暮れの駐輪場・ソメイヨシノと18万5千円
  // ===========================================================================
  else if (t < 115) {
    activeSet = 'courtyard';
    sakuraActive = true;
    lights.setPreset('sunset_golden');
    fx.warmth = 0.24;
    fx.bloomStrength = 0.24;
    screens.setPhoneMode('bank_185k');

    const showPhone = t >= 96;
    world.courtPhone.visible = showPhone;
    world.minatoCourtyard.setPose(t, {
      holdingPhone: showPhone,
      lookingDown: showPhone ? 0.52 : 0.12,
      speaking: t >= 71 && t <= 76,
      focus: 0.5,
    });

    if (t < 88) {
      // Shot 2A: Golden sunset medium shot with parked bicycles & drifting cherry petals
      const u = (t - 70) / 18;
      cam.pos = lerp3([-1.35, 1.46, 1.45], [-0.65, 1.52, 0.98], u);
      cam.look = lerp3([-0.15, 1.42, -0.55], [0.15, 1.48, -0.35], u);
      cam.fov = 36;
    } else if (t < 101) {
      // Shot 2B: Close-up profile of Minato looking down as sakura petals drift past
      const u = (t - 88) / 13;
      cam.pos = lerp3([0.78, 1.52, 0.35], [0.62, 1.46, 0.28], u);
      cam.look = [0.18, 1.44, -0.28];
      cam.fov = 32;
    } else {
      // Shot 2C: Crisp upright over-the-shoulder macro on Smartphone showing "¥185,412"
      const u = (t - 101) / 14;
      cam.pos = lerp3([0.21, 1.28, 0.30], [0.23, 1.25, 0.25], u);
      cam.look = [0.28, 1.18, 0.02];
      cam.fov = 31;
    }
  }

  // ===========================================================================
  // SCENE 03 (115 – 185s): 秋葉原ガード下・電子部品店とSTS3215選定
  // ===========================================================================
  else if (t < 185) {
    activeSet = 'akihabara';
    lights.setPreset('akiba_shop');
    fx.warmth = 0.04;

    world.akibaSTS.setHornAngle(Math.sin(t * 1.4) * 0.6);
    world.minatoAkiba.setPose(t, {
      walking: t < 132 ? 0.5 : 0,
      lookingDown: t >= 132 ? 0.45 : 0.1,
      speaking: t >= 157 && t <= 169,
      focus: 0.65,
    });
    world.minatoAkiba.root.position.set(0.05, 0, t < 132 ? 1.4 - ((t - 115) / 17) * 1.58 : -0.18);

    if (t < 134) {
      // Shot 3A: Tracking shot down the 240-drawer Akihabara component aisle
      const u = (t - 115) / 19;
      cam.pos = lerp3([-0.68, 1.42, 1.85], [-0.52, 1.35, 0.45], u);
      cam.look = lerp3([0.0, 1.25, -1.2], [0.0, 1.08, -0.82], u);
      cam.fov = 40;
    } else if (t < 158) {
      // Shot 3B: Lateral dolly across glass counter comparing ¥800 PWM -> ¥35,000 Pro -> Feetech STS3215!
      const u = (t - 134) / 24;
      cam.pos = lerp3([-0.42, 1.12, -0.34], [0.02, 1.08, -0.40], u);
      cam.look = lerp3([-0.28, 0.96, -0.78], [0.0, 0.99, -0.76], u);
      cam.fov = 30;
    } else {
      // Shot 3C: Hero macro orbit around the Feetech STS3215 on its riser
      const u = (t - 158) / 27;
      world.minatoAkiba.root.visible = false; // Clear foreground macro view
      cam.pos = lerp3([-0.16, 1.07, -0.52], [0.18, 1.06, -0.54], u);
      cam.look = [0.0, 1.00, -0.76];
      cam.fov = 26;
    }
  }

  // ===========================================================================
  // SCENE 04 (185 – 235s): 6畳一間の工場設営と沈黙の12.14V
  // ===========================================================================
  else if (t < 235) {
    activeSet = 'apartment';
    lights.setPreset('room_night_lamp');
    world.windowGlowMat.color.setHex(0x0b1528);

    screens.setLaptopMode('code_115200');
    screens.setMeterMode('12v');
    screens.setNotebookMode(t < 200 ? 'akiba_list' : 'hex_packet');
    world.bambuA1.setPrintState(t, { active: false, progress: 0.0 });
    world.bench.setBenchState({ circuit: 'single_1mbps', t });
    world.bench.heroServo.setHornAngle(-0.72); // Still unaligned before 1Mbps fix!

    world.minatoRoom.setPose(t, {
      seated: true,
      typing: t >= 202 && t < 214,
      lookingDown: 0.42,
      focus: 0.7,
      speaking: t >= 223 && t <= 233,
    });

    if (t < 203) {
      // Shot 4A: Wide cinematic establishing crane across 6-mat room (Tatami + Desk + Bambu Lab A1 on concrete slab!)
      const u = (t - 185) / 18;
      cam.pos = lerp3([1.28, 1.56, 1.38], [0.85, 1.28, 0.72], u);
      cam.look = lerp3([0.12, 0.78, -0.58], [0.05, 0.78, -0.52], u);
      cam.fov = 42;
    } else if (t < 221) {
      // Shot 4B: Over-shoulder shot of Laptop (115200 bps) + silent STS3215 + 1kΩ resistor on desk
      const u = (t - 203) / 18;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([-0.06, 0.96, -0.10], [0.08, 0.88, -0.16], u);
      cam.look = lerp3([-0.14, 0.80, -0.62], [0.04, 0.76, -0.45], u);
      cam.fov = 34;
    } else {
      // Shot 4C: Macro close-up on Sanwa CD771 Multimeter reading "12.14 V"
      const u = (t - 221) / 14;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([-0.24, 0.92, -0.18], [-0.28, 0.88, -0.22], u);
      cam.look = [-0.36, 0.745, -0.42];
      cam.fov = 27;
    }
  }

  // ===========================================================================
  // SCENE 05 (235 – 268s): 深夜1時の仕様書・1,000,000 bpsの発見
  // ===========================================================================
  else if (t < 268) {
    activeSet = 'apartment';
    lights.setPreset('room_night_lamp');
    world.windowGlowMat.color.setHex(0x070e1c);

    screens.setLaptopMode(t < 256 ? 'datasheet_1mbps' : 'code_1mbps');
    screens.setNotebookMode('hex_packet');
    world.bambuA1.setPrintState(t, { active: false, progress: 0.0 });
    world.bench.setBenchState({ circuit: 'single_1mbps', t });
    world.bench.heroServo.setHornAngle(-0.72);

    world.minatoRoom.setPose(t, {
      seated: true,
      typing: t >= 256,
      shock: t >= 246 && t < 255 ? 0.65 : 0.0,
      focus: 0.85,
      speaking: t >= 248 && t <= 257,
    });

    if (t < 246) {
      // Shot 5A: Close portrait of Minato's eyes lit by the laptop screen in the dark room
      const u = (t - 235) / 11;
      cam.pos = lerp3([-0.38, 1.18, -0.36], [-0.28, 1.16, -0.32], u);
      cam.look = [0.0, 1.16, 0.05];
      cam.fov = 30;
    } else if (t < 258) {
      // Shot 5B: Crisp close-up on Laptop Datasheet highlighting "0x06 Baud Rate = 1,000,000 bps (1Mbps) !!"
      const u = (t - 246) / 12;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([-0.14, 0.90, -0.34], [-0.18, 0.86, -0.40], u);
      cam.look = [-0.25, 0.83, -0.68];
      cam.fov = 28;
    } else {
      // Shot 5C: Rapid typing + push-in toward the waiting STS3215 servo right before 01:42 AM!
      const u = (t - 258) / 10;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([-0.12, 0.88, -0.24], [0.04, 0.82, -0.25], u);
      cam.look = lerp3([-0.18, 0.81, -0.64], [0.055, 0.76, -0.44], u);
      cam.fov = 30;
    }
  }

  // ===========================================================================
  // SCENE 06 (268 – 300s): 午前1時42分『シュッ、カチリ』— 最初の1軸と反力！
  // ===========================================================================
  else if (t < 300) {
    activeSet = 'apartment';
    lights.setPreset('room_night_hero');
    dramaBars = true;
    fx.bloomStrength = 0.24;
    fx.warmth = 0.14;
    if (t < 268.35) fx.flash = (1.0 - (t - 268.0) / 0.35) * 0.28;

    screens.setLaptopMode('code_1mbps');
    screens.setNotebookMode('hex_packet');
    world.bambuA1.setPrintState(t, { active: false, progress: 0.0 });
    world.bench.setBenchState({ circuit: 'single_1mbps', t });

    // 01:42 AM SNAP: At t=268.0s, horn snaps from -0.72 rad to 0.00 rad (exact 180.0° center!) in 90ms!
    let hornAngle = 0;
    if (t < 268.10) {
      const snapU = clamp01((t - 268.0) / 0.09);
      hornAngle = -0.72 * (1.0 - snapU);
    } else if (t >= 278 && t < 293) {
      // Minato's fingers try to twist clockwise -> 12-bit magnetic encoder fights back with micro-vibration!
      const strain = smooth((t - 278) / 2.0) * (1.0 - smooth((t - 290.5) / 2.0));
      hornAngle = strain * 0.085 + Math.sin(t * 62.0) * 0.014 * strain;
    }
    world.bench.heroServo.setHornAngle(hornAngle);

    if (t < 278) {
      // Shot 6A: Extreme Macro Tabletop Close-up on STS3215 White Circular Horn snapping to 180.0°!
      const u = (t - 268) / 10;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([0.01, 0.815, -0.30], [0.11, 0.805, -0.32], u);
      cam.look = [0.068, 0.768, -0.44];
      cam.fov = 25;
    } else if (t < 293) {
      // Shot 6B: Extreme Macro Finger-Pinch Shot! Sculpted thumb & index finger pinch the white horn ("ジジジジッ…！")
      const u = (t - 278) / 15;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      world.macroHand.group.visible = true;
      const reach = smooth((t - 278) / 1.4);
      const strain = smooth((t - 279.2) / 1.8) * (1.0 - smooth((t - 290.8) / 1.8));
      world.macroHand.group.position.set(0.092, 0.808 + (1 - reach) * 0.03, -0.352 + (1 - reach) * 0.05);
      world.macroHand.group.rotation.set(-0.22, 0.24, 0);
      world.macroHand.setPinchPose(0.88 + strain * 0.22, strain * 0.12 + Math.sin(t * 58) * 0.01 * strain);

      cam.pos = lerp3([-0.08, 0.84, -0.25], [-0.04, 0.83, -0.27], u);
      cam.look = [0.068, 0.774, -0.435];
      cam.fov = 28;
    } else {
      // Shot 6C: Warm portrait of Minato smiling quietly in the dark 6-mat room — End of Chapter 1!
      const u = (t - 293) / 7;
      world.minatoRoom.setPose(t, { seated: true, focus: 0.2, speaking: true });
      cam.pos = lerp3([0.42, 1.15, -0.25], [0.55, 1.18, -0.18], u);
      cam.look = [0.0, 1.14, 0.04];
      cam.fov = 32;
    }
  }

  // ===========================================================================
  // SCENE 07 (300 – 350s): 第2章『HMD-01』消しゴム模型と16自由度の必然性
  // ===========================================================================
  else if (t < 350) {
    activeSet = 'apartment';
    lights.setPreset('room_daylight');
    world.windowGlowMat.color.setHex(0xdbeafe);
    fx.warmth = 0.05;

    screens.setNotebookMode('dof_torque');
    screens.setLaptopMode('cad_leg');
    world.bambuA1.setPrintState(t, { active: false, progress: 0.0 });
    world.bench.setBenchState({ circuit: 'none', t });

    if (t < 333) {
      // Shot 7A & 7B: Eraser + Wooden Chopsticks Rig demonstrating edge-tipping (no ankle roll) vs flat sole (with ankle roll)!
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      world.eraserRig.root.visible = true;
      const hasAnkleRoll = t >= 321;
      world.eraserRig.updateDemo(t, hasAnkleRoll);

      const u = (t - 300) / 33;
      cam.pos = lerp3([-0.14, 0.83, -0.14], [0.16, 0.82, -0.15], u);
      cam.look = [0.02, 0.79, -0.43];
      cam.fov = 29;
    } else {
      // Shot 7C: Full 380mm HMD-01 16-DOF CAD Wireframe Blueprint Hologram rising above the 5mm grid notebook!
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      blueprintMode = 'dof16';
      const u = (t - 333) / 17;
      cam.pos = lerp3([-0.26, 1.06, 0.24], [0.28, 1.04, 0.22], u);
      cam.look = [0.04, 0.90, -0.44];
      cam.fov = 36;
    }
  }

  // ===========================================================================
  // SCENE 08 (350 – 395s): 膝9.9 kg·cmの罠とストール焼損曲線
  // ===========================================================================
  else if (t < 395) {
    activeSet = 'apartment';
    lights.setPreset('room_sunset');
    world.windowGlowMat.color.setHex(0xfdba74);
    fx.warmth = 0.18;

    screens.setNotebookMode('dof_torque');
    screens.setLaptopMode('torque_curve');
    world.bambuA1.setPrintState(t, { active: false, progress: 0.0 });
    world.bench.setBenchState({ circuit: 'none', t });
    blueprintMode = t < 370 ? 'torque' : 'off';

    if (t < 370) {
      // Shot 8A: Pan across 5mm Grid Notebook ("τ_static = 9.9 kg·cm") + glowing 45° Knee Torque Vector
      const u = (t - 350) / 20;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([0.28, 0.96, -0.12], [0.12, 0.90, -0.14], u);
      cam.look = lerp3([0.22, 0.73, -0.40], [0.04, 0.84, -0.44], u);
      cam.fov = 31;
    } else {
      // Shot 8B: Push-in on Laptop STS3215 Torque-Speed-Current Curve (30 kg·cm = 2.7A Stall Burnout!)
      const u = (t - 370) / 25;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([-0.10, 0.92, -0.28], [-0.18, 0.86, -0.39], u);
      cam.look = [-0.25, 0.83, -0.68];
      cam.fov = 28;
    }
  }

  // ===========================================================================
  // SCENE 09 (395 – 455s): 3D CAD拘束エラーとBambu Lab A1『試作右脚v0.1』造形
  // ===========================================================================
  else if (t < 455) {
    activeSet = 'apartment';
    lights.setPreset('room_night_lamp');
    world.windowGlowMat.color.setHex(0x0f172a);

    screens.setLaptopMode(t < 406 ? 'cad_error' : 'cad_leg');
    screens.setNotebookMode('dof_torque');
    world.bench.setBenchState({ circuit: 'none', t });

    if (t < 412) {
      // Shot 9A: Laptop Fusion 3D CAD unconstrained red error -> fully constrained 3-DOF right leg assembly!
      const u = (t - 395) / 17;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      world.bambuA1.setPrintState(t, { active: false, progress: 0.1 });
      cam.pos = lerp3([-0.12, 0.91, -0.30], [-0.19, 0.86, -0.38], u);
      cam.look = [-0.25, 0.83, -0.68];
      cam.fov = 29;
    } else if (t < 432) {
      // Shot 9B: High-speed Bambu Lab A1 printing matte-black PLA atop Concrete Slab & Anti-Vibration Rubber!
      const u = (t - 412) / 20;
      world.bambuA1.setPrintState(t, { active: true, progress: 0.22 + u * 0.72 });
      world.minatoRoom.setPose(t, { seated: true, focus: 0.6 });
      cam.pos = lerp3([0.52, 0.68, -0.06], [0.68, 0.62, -0.18], u);
      cam.look = lerp3([0.92, 0.56, -0.58], [0.92, 0.54, -0.58], u);
      cam.fov = 32;
    } else if (t < 444) {
      // Shot 9C: Rookie mistake inspection on desk — 2.0mm L-cantilever bracket visibly flexing + M2.5 screw!
      const u = (t - 432) / 12;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      world.bambuA1.setPrintState(t, { active: false, progress: 1.0 });
      world.protoLeg.flawGroup.visible = true;
      world.protoLeg.lVert.rotation.z = Math.sin(t * 5.0) * 0.14; // Visible cantilever flex!
      cam.pos = lerp3([-0.06, 0.82, -0.22], [0.14, 0.81, -0.24], u);
      cam.look = [0.06, 0.745, -0.41];
      cam.fov = 26;
    } else {
      // Shot 9D: Hero reveal of completed 220mm 3-DOF Prototype Right Leg v0.1 clamped to desk front edge!
      const u = (t - 444) / 11;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      world.bambuA1.setPrintState(t, { active: false, progress: 1.0 });
      world.protoLeg.root.visible = true;
      world.protoLeg.setAngles(-0.22, 0.44, -0.22);
      cam.pos = lerp3([0.38, 0.72, -0.02], [0.02, 0.68, 0.02], u);
      cam.look = [0.16, 0.63, -0.24];
      cam.fov = 31;
    }
  }

  // ===========================================================================
  // SCENE 10 (455 – 505s): 午前1時15分『パチンッ！！』— 最初の白煙と0.4Ω短絡！
  // ===========================================================================
  else if (t < 505) {
    activeSet = 'apartment';
    lights.setPreset('room_night_drama');
    world.windowGlowMat.color.setHex(0x060b16);
    dramaBars = t >= 480.5;

    const burnt = t >= 481.5;
    screens.setLaptopMode(burnt ? 'sine_error' : 'code_1mbps');
    screens.setPhoneMode('camera_rec');
    screens.setMeterMode(t >= 494 ? 'short' : '12v');
    world.bambuA1.setPrintState(t, { active: false, progress: 1.0 });
    world.protoLeg.root.visible = true;

    // 3-DOF Right Leg Motion:
    // t=455..480.8: smooth 2-second sine-wave crouch & kick!
    // t=480.8..481.5: ankle snags hard caliper case ("ガツン") & stalls under max current!
    // t>=481.5: power dies -> leg hangs limp under gravity!
    let hipA = 0, kneeA = 0, ankA = 0;
    let snagAmt = 0;
    let gndLift = 0;

    if (t < 480.8) {
      const s = Math.sin((t - 455) * Math.PI);
      hipA = -0.35 + s * 0.32;
      kneeA = 0.68 - s * 0.45;
      ankA = -0.32 + s * 0.25;
      gndLift = clamp01((t - 468) / 12.8) * 0.45; // Vibration slowly loosens black GND pin!
    } else if (t < 481.5) {
      // Snagged hard against caliper case — violent stall tremor + black GND pin lifts out!
      const uSnag = (t - 480.8) / 0.7;
      const tremor = Math.sin(t * 90) * 0.025;
      hipA = -0.62 + tremor;
      kneeA = 0.22 - tremor;
      ankA = -0.45 + tremor;
      snagAmt = 0.65 + uSnag * 0.35;
      gndLift = 0.45 + uSnag * 0.55;
    } else {
      // Dead short — servos lose holding torque and droop limp
      const droop = smooth((t - 481.5) / 0.6);
      hipA = -0.62 * (1 - droop) - 0.05 * droop;
      kneeA = 0.22 * (1 - droop) + 0.12 * droop;
      ankA = -0.45 * (1 - droop) + 0.08 * droop;
      snagAmt = 0.35;
      gndLift = 1.0;
    }
    world.protoLeg.setAngles(hipA, kneeA, ankA);
    world.bench.setBenchState({
      circuit: 'breadboard_burn',
      gndLift,
      burnt,
      caliperSnag: snagAmt,
      t,
    });

    // Spark + White Smoke Ribbon + Exhaust Fan!
    sparkTime = 481.5;
    if (t >= 481.5 && t < 481.85) {
      const imp = 1.0 - (t - 481.5) / 0.35;
      fx.flash = imp * 0.55;
      fx.chromatic = imp * 0.45;
    }
    if (t >= 481.55) {
      whiteSmokeActive = true;
      smokeElapsed = t - 481.55;
    }
    if (t >= 490.0) {
      fanActive = true;
      world.fanBlades.rotation.z = (t - 490.0) * 24.0;
    }

    if (t < 469) {
      // Shot 10A: Medium-close tabletop shot showing BOTH the kicking 3-DOF black PLA leg AND the breadboard!
      const u = (t - 455) / 14;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([0.36, 0.78, 0.06], [-0.14, 0.79, 0.04], u);
      cam.look = [0.08, 0.68, -0.34];
      cam.fov = 35;
    } else if (t < 481.5) {
      // Shot 10B: Tight suspense shot framing the swinging leg, caliper case on desk edge & trembling loose black GND pin!
      const u = (t - 469) / 12.5;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([0.24, 0.82, -0.04], [0.12, 0.80, -0.14], u);
      cam.look = lerp3([0.14, 0.72, -0.32], [0.05, 0.735, -0.42], u);
      cam.fov = 31;
    } else if (t < 494) {
      // Shot 10C: ICONIC CLIMAX MACRO — Breadboard + Cracked 74HC126 + Dense Vertical Ribbon of White Smoke rising straight out of ESP32-S3!
      const u = (t - 481.5) / 12.5;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([-0.16, 0.85, -0.10], [0.14, 0.87, -0.10], u);
      cam.look = [-0.015, 0.775, -0.46];
      cam.fov = 31;
    } else {
      // Shot 10D: Macro on Sanwa CD771 screaming "0.4 Ω BEEP!! DEAD SHORT" with lingering smoke behind!
      const u = (t - 494) / 11;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([-0.24, 0.90, -0.16], [-0.30, 0.86, -0.21], u);
      cam.look = [-0.36, 0.745, -0.42];
      cam.fov = 28;
    }
  }

  // ===========================================================================
  // SCENE 11 (505 – 550s): 1限『電気回路Ⅰ』キルヒホッフとGND浮きの答え合わせ
  // ===========================================================================
  else if (t < 550) {
    activeSet = 'lecture';
    lights.setPreset('lecture_morning');
    fx.warmth = 0.08;
    screens.setChalkProgress(1);
    screens.setNotebookMode('perfboard_plan');

    world.profTodo.setPose(t, {
      speaking: t < 536,
      pointingBoard: t >= 518 && t < 538,
    });
    world.minatoLecture.setPose(t, {
      seated: true,
      shock: t >= 522 && t < 538 ? 0.55 : 0.1,
      focus: 0.9,
      lookingDown: t >= 540 ? 0.35 : 0.0,
    });

    if (t < 521) {
      // Shot 11A: Wide university lecture hall shot past seated Minato toward Prof. Todo & Chalkboard
      const u = (t - 505) / 16;
      cam.pos = lerp3([1.15, 1.65, 1.95], [0.55, 1.56, 1.45], u);
      cam.look = [-0.25, 1.72, -3.1];
      cam.fov = 38;
    } else if (t < 537) {
      // Shot 11B: Full readable shot of Green Chalkboard: "∑ I_in = ∑ I_out" & "✕ GND浮き → DATA信号線へ12V逆流！"
      const u = (t - 521) / 16;
      cam.pos = lerp3([-0.25, 1.88, 0.38], [0.18, 1.88, 0.25], u);
      cam.look = [0.0, 1.90, -3.32];
      cam.fov = 38;
    } else {
      // Shot 11C: Close-up on Minato's epiphany at the lecture desk
      const u = (t - 537) / 13;
      cam.pos = lerp3([-0.32, 1.36, 0.12], [0.02, 1.34, 0.18], u);
      cam.look = [0.15, 1.28, 0.88];
      cam.fov = 29;
    }
  }

  // ===========================================================================
  // SCENE 12 (550 – 600s): 350℃ユニバーサル基板改修・残高78,420円からの再起！
  // ===========================================================================
  else {
    activeSet = 'apartment';
    lights.setPreset('room_night_hero');
    world.windowGlowMat.color.setHex(0x0b162c);
    fx.warmth = 0.15;
    fx.bloomStrength = 0.22;

    const soldering = t < 567;
    solderActive = soldering;

    screens.setLaptopMode('telemetry_ok');
    screens.setMeterMode('pass');
    screens.setNotebookMode('perfboard_plan');
    screens.setPhoneMode('job_apply');
    world.bambuA1.setPrintState(t, { active: false, progress: 1.0 });
    world.protoLeg.root.visible = true;

    world.bench.setBenchState({
      circuit: 'perfboard_final',
      solderActive: soldering,
      t,
    });

    if (soldering) {
      world.protoLeg.setAngles(-0.18, 0.36, -0.18);
    } else {
      // Triumphant strong, rock-solid 3-DOF sine-wave kick with ZERO smoke!
      const s = Math.sin((t - 567) * Math.PI * 1.1);
      world.protoLeg.setAngles(-0.32 + s * 0.34, 0.64 - s * 0.46, -0.30 + s * 0.28);
    }

    if (t < 567) {
      // Shot 12A: Extreme Macro 350°C Soldering on Green FR-4 Perfboard (Shiny Star-GND + AWG18 + XT60 + 3A Fuse + Flux Wisps!)
      const u = (t - 550) / 17;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([-0.15, 0.83, -0.22], [0.12, 0.82, -0.24], u);
      cam.look = [0.0, 0.742, -0.44];
      cam.fov = 26;
    } else if (t < 583) {
      // Shot 12B: Hero Action Shot — 3-DOF Right Leg kicking strongly against finger load + Perfboard + Green PASS Telemetry!
      const u = (t - 567) / 16;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      if (t >= 572 && t < 580) {
        world.macroHand.group.visible = true;
        world.macroHand.group.position.set(0.16, 0.56, -0.10);
        world.macroHand.group.rotation.set(-0.15, 0.1, 0);
        world.macroHand.setPinchPose(0.4, 0);
      }
      cam.pos = lerp3([0.38, 0.76, 0.08], [-0.18, 0.82, 0.06], u);
      cam.look = [0.06, 0.69, -0.36];
      cam.fov = 35;
    } else if (t < 592) {
      // Shot 12C: Close-up on 5mm Grid Notebook ("残り開発資金: ¥78,420") & Smartphone ("深夜コンビニ・塾講師バイト応募完了")
      const u = (t - 583) / 9;
      world.minatoRoom.root.visible = false;
      world.chairGroup.visible = false;
      cam.pos = lerp3([0.18, 0.92, -0.12], [-0.04, 0.90, -0.10], u);
      cam.look = lerp3([0.22, 0.73, -0.40], [-0.08, 0.73, -0.34], u);
      cam.fov = 29;
    } else {
      // Shot 12D: Emotional Final Crane Pullback across the 6-mat room as Minato watches the kicking black-PLA right leg!
      dramaBars = true;
      const u = (t - 592) / 8;
      world.minatoRoom.setPose(t, { seated: true, focus: 0.35 });
      cam.pos = lerp3([0.62, 1.08, 0.38], [1.18, 1.42, 1.15], u);
      cam.look = lerp3([0.12, 0.78, -0.35], [0.08, 0.85, -0.45], u);
      cam.fov = 38;
    }
  }

  world.setActiveSet(activeSet);
  vfx.update(t, {
    sakuraActive,
    blueprintMode,
    sparkTime,
    whiteSmokeActive,
    smokeElapsed,
    fanActive,
    solderActive,
  });

  return {
    cam,
    fx,
    dramaBars,
    fin: t >= REAL_FILM_DURATION - 0.15,
  };
}
