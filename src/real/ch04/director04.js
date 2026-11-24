export const CH04_DURATION = 150.0; // 02:30 (2 minutes 30 seconds — ultra-high density!)

export const CH04_SCENES = [
  { id: 1, start: 0, end: 25, jp: 'Day 050-061 · 初バイト代107,920円と12自由度下半身(1,042g)' },
  { id: 2, start: 25, end: 52, jp: 'Day 062 · 線形代数Ⅰ R^T=R⁻¹と余弦定理42μs逆運動学' },
  { id: 3, start: 52, end: 88, jp: 'Day 064 · 午前2時10分 acosf(1.0000019f)→NaN 暴走事故' },
  { id: 4, start: 88, end: 115, jp: 'Day 065-070 · 膝伸び切り特異点と『三重のフェイルセーフ』' },
  { id: 5, start: 115, end: 150, jp: 'Day 072 · 梅雨の夜の完全接地・骨盤円運動とKiCadへの扉' },
];

export function getCh04Scene(t) {
  for (let i = CH04_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH04_SCENES[i].start) return CH04_SCENES[i];
  }
  return CH04_SCENES[0];
}

const SUBTITLES = [
  // --- SCENE 1 (0 - 25s): ATM ¥107,920, Left-Handed Servo Trap & 1,042g Lower Body ---
  { s: 0.6, e: 6.5, sp: 'ナレーション', tx: '五月二十五日 朝8時40分。深夜コンビニと塾講師の初バイト代48,400円が振り込まれ、口座残高は『107,920円』へ回復した。' },
  { s: 6.7, e: 12.2, sp: '佐伯 湊', tx: '「……よし、これで『左脚』が生やせる！ STS3215追加6個と、10Aピークに耐える12V 15A産業用電源を発注だ」' },
  { s: 12.4, e: 18.6, sp: '佐伯 湊', tx: '「あっぶな……CADで丸ごと鏡像反転したら、この世に存在しない『左利きのサーボ』になっちゃうじゃないか！」' },
  { s: 18.8, e: 24.8, sp: 'ナレーション', tx: 'サーボを180度反転実装して符号配列 joint_sign[12] を定義。実測『1,042 g』——漆黒の12自由度下半身ユニットが完成した。' },

  // --- SCENE 2 (25 - 52s): Linear Algebra R^T = R^-1 & 42us Analytic IK ---
  { s: 25.3, e: 32.5, sp: 'ナレーション', tx: 'Day 062 二限『線形代数Ⅰ』。黒板の直交行列 R^T R = I（転置＝逆行列）が、湊のノートの上で立体的なロボットの座標変換として立ち上がる。' },
  { s: 32.7, e: 41.5, sp: 'ナレーション', tx: '股関節3軸一点交差と足首2軸一点交差により、二点間距離 d を変えられるのは『膝ピッチ軸 θ₄』ただ一つ——高校数学の余弦定理で一発確定する！' },
  { s: 41.7, e: 51.6, sp: '佐伯 湊', tx: '「全部が一本のコードに繋がったぞ……！ ESP32-S3での両脚12軸IK計算時間はわずか『42マイクロ秒』——だが、そこに二つの冷酷な死角が潜んでいた」' },

  // --- SCENE 3 (52 - 88s): 02:10 AM acosf(1.0000019f) -> NaN Bear-Trap Runaway! ---
  { s: 52.3, e: 60.5, sp: 'ナレーション', tx: '六月八日 午前2時10分。12V 15A電源を繋ぎ、周期100Hzで空中足踏み楕円軌道を実行する——透明な自転車を漕ぐように優美で滑らかな動き。' },
  { s: 60.7, e: 67.2, sp: '佐伯 湊', tx: '「すげえ……座標 (x, y, z) を指定しただけで、12個の関節が勝手に協調して動いてる……！」' },
  { s: 67.4, e: 73.8, sp: 'ナレーション', tx: '直立原点 z = -220.0mm へ脚を伸ばす最中、湊は何気なく左膝の隙間へ左手の人差し指を伸ばした。その刹那、丸め誤差で cos_q4 が『1.0000019f』を超えた——' },
  { s: 74.0, e: 80.2, sp: '佐伯 湊', tx: '「——ギャリッ、ガツンッ！！ ぐっ、あぁっ！？ バキィッ！！」', shout: true },
  { s: 80.4, e: 87.8, sp: 'ナレーション', tx: 'acosf が吐き出した『NaN』が速度制限なしの極限角 0x0000 へ化けて全12軸が暴走！ 左膝が指を噛み砕き、自己衝突した左股関節が粉々に砕け散った。' },

  // --- SCENE 4 (88 - 115s): Clinic Bandage, Knee Singularity & Triple Fail-Safe ---
  { s: 88.3, e: 96.8, sp: 'ナレーション', tx: '爪下血腫を負った左指に白いテーピングを巻き、湊は微積ノートを開いた。x → 1 の極限で逆余弦の導関数はマイナス無限大へ発散する——『膝伸び切り特異点』。' },
  { s: 97.0, e: 105.5, sp: '佐伯 湊', tx: '「ロボットは人間の『たぶん大丈夫』を絶対に許さない。数学の例外が、そのまま物理的な凶器になるんだ」' },
  { s: 105.7, e: 114.7, sp: 'ナレーション', tx: '①赤キノコ非常停止スイッチによる物理遮断、②EEPROM制限＆スルーレート脱力監視、③std::clamp保護と中腰姿勢 z = -200mm（膝53.6度）——三重の安全壁を築いた。' },

  // --- SCENE 5 (115 - 150s): June Rainy Night Grounded Circle IK & KiCad ---
  { s: 115.3, e: 123.5, sp: 'ナレーション', tx: 'Day 072 梅雨の夜。曇りガラスの向こうで雨が紫陽花を濡らす中、新品のPLA+で組み直した下半身をゴムマットへ完全に自立接地させた。' },
  { s: 123.7, e: 132.8, sp: 'ナレーション', tx: '両足裏は1ミリも動かず貼り付いたまま、空中の骨盤だけが半径25.0mmの真円を描いて氷の上のように滑らかに旋回する！' },
  { s: 133.0, e: 138.2, sp: '佐伯 湊', tx: '「……綺麗だ。本当に、線形代数の数式がそのまま肉体になってる……」' },
  { s: 138.4, e: 144.2, sp: 'ナレーション', tx: 'だが30周目——『ガクッ』。振動でユニバーサル基板のピンヘッダが瞬断し、ID:11 の通信タイムアウト警告が一閃した。' },
  { s: 144.4, e: 149.7, sp: 'ナレーション', tx: '臍の緒を断ち切り、LiPoとIMUを積んだ本物の心臓部を作るために——湊は傷跡の残る左指で、基板設計CAD『KiCad』をクリックした。' },
];

const SIMLOGS = [
  { s: 0.5, e: 11.8, tag: 'CHAPTER 04 // DAY 050 · 05.25', title: '初バイト給与入金 ＋¥48,400 → 残高 ¥107,920', detail: 'STS3215 追加6個 (¥17,700) ＋ 産業用電源 12V 15A / 180W (¥3,400) 調達' },
  { s: 18.0, e: 24.8, tag: 'ASSEMBLY // DAY 061 · LOWER 12-DOF', title: 'HMD-01 下半身12自由度ユニット完成', detail: '実測重量 1,042 g (右脚478g＋左脚478g＋6mm骨盤86g) ／ joint_sign[12] 定義済' },
  { s: 26.0, e: 51.5, tag: 'MATH // DAY 062 · ANALYTIC IK', title: '直交行列転置 R⁻¹ = R^T ＆ 余弦定理 6自由度IK', detail: 'cos θ₄ = (d² - L₁² - L₂²) / 2L₁L₂ ／ ESP32-S3 FPU 12軸演算時間：42 μs' },
  { s: 74.0, e: 87.8, tag: 'FATAL // DAY 064 · 02:10 AM', title: 'acosf(1.0000019f) → NaN → 0x0000 暴走事故', detail: 'Speed=0 (100%最大出力) 全12軸暴走 ／ 左人差し指 裂傷・爪下血腫 ＆ 左股クレイドル粉砕' },
  { s: 90.0, e: 114.5, tag: 'SAFETY // DAY 070 · TRIPLE FAIL-SAFE', title: '膝伸び切り特異点回避 ＆ 三重フェイルセーフ', detail: '①物理非常停止スイッチ ②EEPROM制限＋5°/10ms脱力監視 ③std::clamp＋中腰 z=-200mm(53.6°)' },
  { s: 116.0, e: 138.0, tag: 'PASS // DAY 072 · 100Hz GROUNDED IK', title: '自立荷重・骨盤3次元水平円運動 (r = 25.0 mm)', detail: '両足裏スリップ 0.00 mm ／ 骨盤ロール +5.0° 複合追従 ／ 残り開発資金：¥83,320' },
  { s: 138.5, e: 149.6, tag: 'NEXT // DAY 072 · KICAD EDA', title: '[WARN] Servo ID:11 Pin-Header Glitch', detail: '次章課題：専用プリント基板『HMD-CORE-v1』設計・深圳(JLCPCB)発注 ＆ 3S LiPo自律化' },
];

const CUTINS = [
  { s: 0.4, e: 4.2, kicker: 'CHAPTER 04 · DAY 049 – DAY 072', main: '線形代数の復習と、逆運動学の暴走', sub: '12-DOF Lower Body Integration & 42μs Analytic Inverse Kinematics', style: '' },
  { s: 74.0, e: 77.6, kicker: 'FLOAT ROUNDING SINGULARITY · cos_q4 = 1.0000019f', main: 'NaN 暴走 — ギャリッ、バキィッ！！', sub: 'acosf Domain Error -> uint16_t 0x0000 @ Unlimited Full Stall Torque', style: 'crimson' },
];

export function getCh04Subtitle(t) {
  for (const s of SUBTITLES) {
    if (t >= s.s && t <= s.e) return { speaker: s.sp, text: s.tx, shout: !!s.shout };
  }
  return null;
}

export function getCh04Simlog(t) {
  for (const l of SIMLOGS) {
    if (t >= l.s && t <= l.e) return l;
  }
  return null;
}

export function getCh04Cutin(t) {
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

function lerp3(a, b, u) {
  const s = smooth(u);
  return [
    a[0] + (b[0] - a[0]) * s,
    a[1] + (b[1] - a[1]) * s,
    a[2] + (b[2] - a[2]) * s,
  ];
}

export function evaluateCh04Director(t, world, screens, lights) {
  const cam = { pos: [0, 1.3, 1.4], look: [0, 0.85, -0.5], fov: 35 };
  const fx = {
    time: t,
    bloomStrength: 0.18,
    chromatic: 0,
    speedLines: 0,
    flash: 0,
    invert: 0,
    warmth: 0.06,
  };
  let dramaBars = false;

  // Safe per-frame visibility defaults
  world.lab.leftHandRig.visible = false;
  world.rightMacroHand.group.visible = false;
  world.minatoRoom.root.visible = false;
  world.lab.kitchenScale.visible = false;
  world.lab.gantry.visible = true;
  world.lab.tautCords.visible = true;
  world.lab.slackCord.visible = false;
  world.lab.psu15A.visible = true;
  world.lab.eStopUnit.visible = t >= 100;
  world.robot12.root.visible = true;
  world.robot12.resetCleanCradle();

  world.rainWindowMat.uniforms.uTime.value = t;
  world.rainWindowMat.uniforms.uRain.value = t >= 115 ? 1.0 : 0.0;
  world.rainWindowMat.uniforms.uDaylight.value = t >= 88 && t < 115 ? 1.0 : 0.0;

  // ===========================================================================
  // SCENE 1 (0 – 25s): 駅前コンビニATM『¥107,920』＆ 左利きサーボの罠 ＆ 1,042g下半身完成
  // ===========================================================================
  if (t < 25) {
    if (t < 11.5) {
      // Set 1: Station-front Convenience Store ATM Corner (Bright May Morning Sun)
      world.setActiveSet('atmCorner');
      lights.setPreset('may_morning');
      fx.warmth = 0.12;
      screens.setAtmMode(t < 7.0 ? 'atm_balance' : 'order_confirm');

      world.minatoAtm.setPose(t, {
        lookingDown: 0.18,
        speaking: t >= 6.7,
        focus: 0.45,
      });

      if (t < 5.5) {
        // Cut 1A: Medium establishing shot inside bright morning convenience store ATM corner
        const u = t / 5.5;
        cam.pos = lerp3([-0.75, 1.38, 0.55], [-0.42, 1.34, 0.12], u);
        cam.look = [0.12, 1.22, -1.25];
        cam.fov = 38;
      } else {
        // Cut 1B: Crisp readable close-up on ATM Screen ("¥107,920 / +¥48,400" -> Order Confirmed!)
        const u = (t - 5.5) / 6.0;
        world.minatoAtm.root.visible = false;
        cam.pos = lerp3([-0.14, 1.25, -0.32], [0.08, 1.23, -0.38], u);
        cam.look = [0.15, 1.21, -1.31];
        cam.fov = 34;
      }
      world.minatoAtm.root.visible = t < 5.5;
    } else {
      // Set 3: Room 203 — Left-Handed Servo CAD Mirror Trap & 1,042g 12-DOF Unit on Scale!
      world.setActiveSet('apartment');
      lights.setPreset('room_night_lamp');
      screens.setLaptopMode('cad_mirror_trap');
      screens.setNotebookMode('joint_sign');

      world.lab.gantry.visible = false;
      world.lab.kitchenScale.visible = true;
      // Place 12-DOF robot cleanly atop the digital kitchen scale (y = 0.72 + 0.019 = 0.739)!
      world.robot12.root.position.set(0.09, 0.739, 0.02);
      world.robot12.solveIKPose({
        pelvisPos: [0, 0.20, 0],
        pelvisEuler: [0, 0, 0],
        rightFootPos: [-0.042, 0, 0],
        leftFootPos: [0.042, 0, 0],
      });

      if (t < 18.5) {
        // Cut 1C: Push-in on Laptop Fusion CAD ("✕ 丸ごとミラー＝存在しない左利きサーボ！")
        const u = (t - 11.5) / 7.0;
        cam.pos = lerp3([-0.18, 0.92, -0.26], [-0.24, 0.87, -0.36], u);
        cam.look = [-0.32, 0.835, -0.74];
        cam.fov = 29;
      } else {
        // Cut 1D: Hero Orbit around Completed 12-DOF Lower-Body Unit on Kitchen Scale ("1,042 g")!
        const u = (t - 18.5) / 6.5;
        cam.pos = lerp3([-0.16, 0.88, -0.06], [0.34, 0.86, -0.08], u);
        cam.look = [0.09, 0.82, -0.50];
        cam.fov = 33;
      }
    }
  }

  // ===========================================================================
  // SCENE 2 (25 – 52s): 2限『線形代数Ⅰ』R^T=R⁻¹ ＆ 余弦定理 42μs IK実装
  // ===========================================================================
  else if (t < 52) {
    if (t < 42.0) {
      world.setActiveSet('lecture');
      lights.setPreset('lecture_june');
      world.updateIkHolo(t);
      world.minatoLec.setPose(t, { seated: true, focus: 0.85, lookingDown: t >= 34 ? 0.28 : 0.0 });

      if (t < 33.5) {
        // Cut 2A: Full Readable Green Chalkboard (R^T R = I => R^-1 = R^T & Law of Cosines cos θ4)
        const u = (t - 25.0) / 8.5;
        cam.pos = lerp3([-0.28, 1.88, 0.35], [0.22, 1.88, 0.22], u);
        cam.look = [0.0, 1.92, -3.33];
        cam.fov = 38;
      } else {
        // Cut 2B: Close-up on 3D Mathematical Law-of-Cosines IK Triangle Hologram floating above Minato's desk!
        const u = (t - 33.5) / 8.5;
        cam.pos = lerp3([-0.24, 1.24, 0.08], [0.46, 1.22, 0.12], u);
        cam.look = [0.15, 1.12, 0.56];
        cam.fov = 33;
      }
    } else {
      // Back in Room 203 coding LegIKSolver.cpp -> 42.0 us benchmark (with unclamped acosf!)
      world.setActiveSet('apartment');
      lights.setPreset('room_night_lamp');
      screens.setLaptopMode('vscode_ik_42us');
      screens.setNotebookMode('joint_sign');
      world.robot12.root.position.set(0.09, 0.728, 0.02);
      world.robot12.solveIKPose({ pelvisPos: [0, 0.235, 0], rightFootPos: [-0.042, 0.04, 0], leftFootPos: [0.042, 0.04, 0] });

      const u = (t - 42.0) / 10.0;
      cam.pos = lerp3([-0.14, 0.92, -0.22], [-0.25, 0.86, -0.37], u);
      cam.look = [-0.32, 0.835, -0.74];
      cam.fov = 28;
    }
  }

  // ===========================================================================
  // SCENE 3 (52 – 88s): 午前2時10分 空中楕円IK → acosf(1.0000019f) NaN暴走・左股粉砕！！
  // ===========================================================================
  else if (t < 88) {
    world.setActiveSet('apartment');
    lights.setPreset('room_night_drama');
    world.robot12.root.position.set(0.09, 0.728, 0.02);

    const plugPulled = t >= 79.5;
    const crashed = t >= 74.0;
    dramaBars = t >= 73.5;

    screens.setLaptopMode(crashed ? 'nan_exception' : 'vscode_ik_42us');
    screens.setNotebookMode('joint_sign');

    // Spin 12V 15A PSU cooling fan until Minato yanks the AC wall plug at t=79.5s!
    if (!plugPulled) {
      world.lab.fanHub.rotation.y = t * 28.0;
      world.lab.psuLedMat.color.setHex(0x22c55e);
    } else {
      world.lab.psuLedMat.color.setHex(0x14281d);
    }

    if (t < 67.0) {
      // Phase 3A (52..67s): Silky-smooth 100Hz Aerial Bicycle-Pedal Ellipse (z = -195mm suspended!)
      const ph = (t - 52.0) * 3.8;
      world.robot12.solveIKPose({
        pelvisPos: [0, 0.245, 0],
        pelvisEuler: [0, 0, 0],
        rightFootPos: [-0.042, 0.050 + Math.sin(ph) * 0.018, Math.cos(ph) * 0.032],
        leftFootPos: [0.042, 0.050 - Math.sin(ph) * 0.018, -Math.cos(ph) * 0.032],
      });

      const u = (t - 52.0) / 15.0;
      cam.pos = lerp3([0.44, 0.92, -0.02], [-0.14, 0.88, -0.04], u);
      cam.look = [0.12, 0.86, -0.53];
      cam.fov = 34;
    } else if (t < 74.0) {
      // Phase 3B (67..74.0s): Slow linear extension to straight-leg singularity z=-220.0mm!
      // Minato reaches his sculpted LEFT INDEX FINGER into the extending left-knee H-beam gap!
      const extU = clamp01((t - 67.0) / 6.95);
      const footClearance = 0.050 - extU * 0.0249; // Pelvis at 0.245 -> foot at 0.0251 => distance = 0.2199m -> STRAIGHT!
      world.robot12.solveIKPose({
        pelvisPos: [0, 0.245, 0],
        pelvisEuler: [0, 0, 0],
        rightFootPos: [-0.042, footClearance, 0],
        leftFootPos: [0.042, footClearance, 0],
      });

      // Left index finger reaching into Left Knee (+X = 0.09 + 0.042 = 0.132, y ≈ 0.87, z = -0.52)
      const reach = smooth((t - 68.5) / 2.8);
      world.lab.leftHandRig.visible = true;
      world.lab.setLeftFingerState('normal', 0.15);
      world.lab.leftHandRig.position.set(0.145, 0.875, -0.455 + (1 - reach) * 0.09);
      world.lab.leftHandRig.rotation.set(0.08, 0.18, 0);

      const u = (t - 67.0) / 7.0;
      cam.pos = lerp3([0.34, 0.91, -0.18], [0.25, 0.89, -0.27], u);
      cam.look = [0.132, 0.87, -0.52];
      cam.fov = 28;
    } else if (t < 80.2) {
      // Phase 3C (74.0..80.2s): VIOLENT NaN BEAR-TRAP CRASH + SHATTERING LEFT HIP + 15A STALL HOWL -> PLUG YANK!
      const dtCrash = t - 74.0;
      const snapAmt = clamp01(dtCrash / 0.085); // 85ms explosive bear-trap snap!
      const limpAmt = plugPulled ? smooth((t - 79.5) / 0.45) : 0;
      const tremor = !plugPulled ? Math.sin(t * 95.0) * 0.032 : 0;

      if (dtCrash < 0.35) {
        const imp = 1 - dtCrash / 0.35;
        fx.flash = imp * 0.58;
        fx.chromatic = imp * 0.55;
      }

      world.robot12.setRawRunawayPose({
        pelvisY: 0.245,
        crashAmt: snapAmt,
        limpAmt,
        stallTremor: tremor,
        shatterElapsed: dtCrash >= 0.12 ? dtCrash - 0.12 : -1, // Shatters at +120ms ("バキィッ！！")!
      });

      // Finger clamped from side angle (sleeve clear of camera!) at 74.0..76.2s, then wrenched back!
      if (t < 76.4) {
        const pullBack = smooth((t - 75.2) / 1.1);
        world.lab.leftHandRig.visible = true;
        world.lab.setLeftFingerState(dtCrash > 0.1 ? 'bruised' : 'normal', 0.35);
        world.lab.leftHandRig.position.set(
          0.075 - pullBack * 0.08,
          0.865 + tremor * 0.15,
          -0.47 + pullBack * 0.08
        );
        world.lab.leftHandRig.rotation.set(0.08, -0.78, 0);
      }

      // Subtle handheld camera shock on impact!
      const shake = dtCrash < 0.6 ? Math.sin(t * 72) * 0.012 * (1 - dtCrash / 0.6) : 0;
      const u = dtCrash / 6.2;
      cam.pos = lerp3([0.32 + shake, 0.92 - shake, -0.06], [-0.08, 0.90, -0.05], u);
      cam.look = [0.11, 0.85, -0.52];
      cam.fov = 35;
    } else {
      // Phase 3D (80.2..88.0s): Haunting Side-Profile Macro on Bruised Purple Subungual Hematoma Finger + Shattered PLA Shards!
      world.robot12.setRawRunawayPose({
        pelvisY: 0.245,
        crashAmt: 1,
        limpAmt: 1,
        stallTremor: 0,
        shatterElapsed: 4.0,
      });

      world.lab.leftHandRig.visible = true;
      world.lab.setLeftFingerState('bruised', 0.08);
      world.lab.leftHandRig.position.set(-0.02, 0.815, -0.34);
      world.lab.leftHandRig.rotation.set(0.15, -1.25, -0.45); // Side/top presentation so purple bruised nail & cut are 100% clear!

      const u = (t - 80.2) / 7.8;
      cam.pos = lerp3([0.05, 0.86, -0.17], [0.12, 0.85, -0.19], u);
      cam.look = [0.025, 0.81, -0.36];
      cam.fov = 28;
    }
  }

  // ===========================================================================
  // SCENE 4 (88 – 115s): 膝伸び切り特異点 dθ/dx → -∞ と『三重のフェイルセーフ』
  // ===========================================================================
  else if (t < 115) {
    world.setActiveSet('apartment');
    lights.setPreset('room_daylight');
    fx.warmth = 0.05;

    screens.setNotebookMode('singularity_calc');
    screens.setLaptopMode('failsafe_code');
    world.robot12.root.position.set(0.09, 0.728, 0.02);
    // Safe Crouched Home Posture: z = -200.0mm (pelvis at 0.20m above soles => Knee = 53.6°!)
    world.robot12.solveIKPose({
      pelvisPos: [0, 0.20, 0],
      pelvisEuler: [0, 0, 0],
      rightFootPos: [-0.042, 0, 0],
      leftFootPos: [0.042, 0, 0],
    });
    world.lab.tautCords.visible = false;
    world.lab.slackCord.visible = true;

    if (t < 99.5) {
      // Cut 4A: Close-up on Calculus Singularity Curve in Notebook + White-Bandaged Left Index Finger!
      const u = (t - 88.0) / 11.5;
      world.lab.leftHandRig.visible = true;
      world.lab.setLeftFingerState('bandaged', 0.2);
      world.lab.leftHandRig.position.set(-0.18, 0.755, -0.28);
      world.lab.leftHandRig.rotation.set(-0.22, 0.38, 0);

      cam.pos = lerp3([-0.24, 0.96, -0.12], [-0.30, 0.93, -0.16], u);
      cam.look = [-0.28, 0.73, -0.39];
      cam.fov = 30;
    } else if (t < 107.5) {
      // Cut 4B: Macro Close-Up on Clamped Red Mushroom Emergency-Stop Switch + Right Hand poised ready!
      const u = (t - 99.5) / 8.0;
      world.rightMacroHand.group.visible = true;
      const press = t >= 103.3 && t < 104.6 ? smooth((t - 103.3) / 0.25) * (1 - smooth((t - 104.2) / 0.3)) : 0;
      world.rightMacroHand.group.position.set(0.56, 0.83 - press * 0.018, -0.15);
      world.rightMacroHand.group.rotation.set(-0.25, 0.35, 0);
      world.rightMacroHand.setPinchPose(0.35, 0);

      cam.pos = lerp3([0.32, 0.86, -0.05], [0.38, 0.84, -0.08], u);
      cam.look = [0.50, 0.775, -0.28];
      cam.fov = 28;
    } else {
      // Cut 4C: Laptop Fail-Safe C++ Code (std::clamp + isfinite + z = -200mm Knee 53.6°)
      const u = (t - 107.5) / 7.5;
      cam.pos = lerp3([-0.16, 0.91, -0.26], [-0.24, 0.87, -0.36], u);
      cam.look = [-0.32, 0.835, -0.74];
      cam.fov = 29;
    }
  }

  // ===========================================================================
  // SCENE 5 (115 – 150s): 梅雨の夜の完全接地・骨盤3次元水平円運動 (r=25mm) ＆ KiCadクリック！
  // ===========================================================================
  else {
    world.setActiveSet('apartment');
    lights.setPreset('room_rainy_night');
    fx.warmth = 0.08;
    fx.bloomStrength = 0.22;
    dramaBars = t >= 144.0;

    world.lab.tautCords.visible = false;
    world.lab.slackCord.visible = true; // Slack safety tether — 100% self-supporting on rubber mat!
    world.lab.fanHub.rotation.y = t * 22.0;
    world.robot12.root.position.set(0.09, 0.728, 0.02);

    // Real-Time 100Hz 3D Pelvis Horizontal Circle (r = 25.0mm) + 5° Roll while BOTH SOLES STAY GLUED!
    let px = 0, pz = 0, pRoll = 0, glitch = 0;
    if (t >= 119.0 && t < 142.0) {
      const ramp = smooth((t - 119.0) / 1.8) * (1 - smooth((t - 140.2) / 1.5));
      const ang = (t - 119.0) * 2.65;
      px = Math.cos(ang) * 0.025 * ramp; // r = 25.0 mm!
      pz = Math.sin(ang) * 0.025 * ramp;
      const rollMix = smooth((t - 127.0) / 1.5);
      pRoll = Math.sin(ang * 0.5) * (5.0 * Math.PI / 180) * rollMix * ramp; // +5.0° Roll!

      // Lap 30 Pin-Header Glitch at t = 138.5s ("ガクッ" — 0.12s twitch on left ankle!)
      if (t >= 138.5 && t < 138.68) {
        glitch = 0.26 * Math.sin(((t - 138.5) / 0.18) * Math.PI);
      }
    }

    world.robot12.solveIKPose({
      pelvisPos: [px, 0.20, pz],
      pelvisEuler: [0, 0, pRoll],
      rightFootPos: [-0.042, 0, 0], // 0.00 mm slip — mathematically glued to rubber mat!
      leftFootPos: [0.042, 0, 0],
      leftAnkleGlitchRad: glitch,
    });

    screens.setNotebookMode('singularity_calc');
    if (t < 138.5) screens.setLaptopMode('circle_ik_ok');
    else if (t < 144.2) screens.setLaptopMode('circle_ik_warn');
    else screens.setLaptopMode('kicad_launch');

    if (t < 121.0) {
      // Cut 5A: Atmospheric June Rainy Window + Hydrangeas outside -> pan down to grounded 12-DOF robot!
      const u = (t - 115.0) / 6.0;
      cam.pos = lerp3([0.42, 1.24, 0.35], [0.32, 0.94, 0.06], u);
      cam.look = lerp3([-0.02, 1.32, -1.85], [0.09, 0.85, -0.53], u);
      cam.fov = 36;
    } else if (t < 138.2) {
      // Cut 5B: MESMERIZING LOW-ANGLE TABLETOP SHOWCASE — Glued soles + r=25mm circling pelvis + hand poised by Red E-Stop!
      const u = (t - 121.0) / 17.2;
      world.rightMacroHand.group.visible = true;
      world.rightMacroHand.group.position.set(0.58, 0.78, -0.14);
      world.rightMacroHand.group.rotation.set(-0.18, 0.32, 0);
      world.rightMacroHand.setPinchPose(0.4, 0);

      cam.pos = lerp3([-0.14, 0.82, -0.06], [0.36, 0.83, -0.04], u);
      cam.look = [0.12, 0.83, -0.51];
      cam.fov = 33;
    } else if (t < 144.2) {
      // Cut 5C: Lap 30 Glitch ("ガクッ") -> Rack-focus to Octopus Pin-Header Perfboard & Laptop [WARN] ID:11!
      const u = (t - 138.2) / 6.0;
      cam.pos = lerp3([0.06, 0.88, -0.22], [-0.16, 0.88, -0.30], u);
      cam.look = lerp3([-0.06, 0.75, -0.68], [-0.26, 0.82, -0.73], u);
      cam.fov = 31;
    } else {
      // Cut 5D: Final Shot — White-Bandaged Left Index Finger clicks Mouse to launch "KiCad 8.0"!
      const u = (t - 144.2) / 5.8;
      world.lab.leftHandRig.visible = true;
      const clickFlex = t >= 146.4 && t < 147.0 ? 0.55 : 0.18;
      world.lab.setLeftFingerState('bandaged', clickFlex);
      world.lab.leftHandRig.position.set(-0.155, 0.762, -0.34);
      world.lab.leftHandRig.rotation.set(-0.20, -0.12, 0);

      cam.pos = lerp3([-0.02, 0.92, -0.10], [-0.08, 0.90, -0.16], u);
      cam.look = [-0.25, 0.80, -0.62];
      cam.fov = 34;
    }
  }

  return {
    cam,
    fx,
    dramaBars,
    fin: t >= CH04_DURATION - 0.12,
  };
}
