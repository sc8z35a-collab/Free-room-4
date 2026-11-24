export const CH08_DURATION = 150.0; // Exact 02:30 (150 seconds)

export const CH08_SCENES = [
  { id: 1, start: 0, end: 28, jp: 'Day 151-155 · ほうきの倒立振子と3D-LIPM双曲線解（y_max 23.9mm）' },
  { id: 2, start: 28, end: 56, jp: 'Day 156-160 · 原因不明の転倒 → 24MHzロジアナで暴く『13.8msの空白』' },
  { id: 3, start: 56, end: 82, jp: 'Day 161-170 · SYNC WRITE(1.18ms) ＆ FreeRTOSデュアルコア聖域分離(±11μs)' },
  { id: 4, start: 82, end: 122, jp: 'Day 172 · 2.0mを15.2秒で駆けるZMP動歩行 ＆ 100歩連続『48℃』の逆説！' },
  { id: 5, start: 122, end: 150, jp: 'Day 174-175 · 後期開講 ＆『全日本アマチュア二足歩行競技会』個人参戦！' },
];

const SUBTITLES = [
  [0.6, 12.6, '佐伯 湊', '台風一過の朝、手のひらにほうきの柄を立てて気づく。「……歩くって、『倒れるのを邪魔しないこと』なんだな」'],
  [13.4, 27.4, '佐伯 湊', '3D線形倒立振子の双曲線解（時定数151ms・周期0.45秒）を解くと、最大横揺れは42mmの半分『23.9mm』！「24ミリしか揺らさなくていいのか！？」'],

  [28.5, 39.6, 'ナレーション', '周期0.45秒の動歩行を実機投入！ タッ、タッ、タッ——軽快な3歩の直後、4歩目で突然『ガクンッ！』と不規則に顔面から転倒する幽霊バグが発生！'],
  [40.2, 47.8, 'ナレーション', '秋月電子で買った24MHz USBロジックアナライザとICテストクリップをHMD-CORE-v1へ接続し、5秒間の電気信号を毎秒2400万回で捕獲した。'],
  [48.4, 55.6, '佐伯 湊', 'PulseView波形に二つの時間犯罪が映る——逐次通信3.80ms、そして0.5秒に一度襲う『13.8msの空白』！「……Wi-Fiだ！！」'],

  [56.6, 68.8, 'ナレーション', '一括同報『0x83 SYNC WRITE』で通信を1.18msへ短縮。さらにESP32-S3のCore 0へWi-Fiを隔離し、Core 1をBNO085割込み駆動の200Hz聖域コアへ分離！'],
  [69.4, 81.4, 'ナレーション', '2,000周期の実測ジッタは13.8msから『±0.011ms（11マイクロ秒）』へ収束！ 前期フル単完勝＆給与入金で残高も29万円超へ達した。'],

  [82.5, 95.8, '佐伯 湊', 'Day 172、六畳間2.0メートル直線コース。「周期0.45秒、ストライド60ミリ——ZMP動歩行、スタート！」タッ、タッ、タッ、タッ……！！'],
  [96.4, 109.5, '佐伯 湊', '重心が水のように双曲線を描き、4歩目も10歩目も30歩目も軽快に駆け抜け——2.0メートルをわずか15.2秒（34歩）で踏破！「……はやっ……！！」'],
  [110.2, 121.5, 'ナレーション', '休まず3往復・6メートル（100歩超）を連続走破した直後、放射温度計が示した右膝サーボは『48.0℃』！ 止まらず倒れ続けることで熱の壁を打ち破った。'],

  [122.6, 134.8, 'ナレーション', 'Day 174、銀杏舞う後期開講の廊下掲示板——『第19回 全日本アマチュア二足歩行ロボットオープン競技会（11月6日・都内産業貿易センター）』。'],
  [135.4, 149.5, 'ナレーション', '『所属：なし（個人参加）／佐伯 湊（18歳）／HMD-01』参加費3,000円決済完了。大会本番まで残り40日——六畳間の黒い機体が、ついに全国の舞台へ挑む！'],
];

const SIMLOGS = [
  [0, 13, 'INVERTED PENDULUM // DAY 151', 'ほうきの柄の直感：重力を推進力に変える', '静止ブレーキを捨て、前へ倒れ込む勢いをそのまま歩幅へ変換'],
  [13, 28, '3D-LIPM ODE // DAY 152-155', '双曲線関数解：時定数 Tc = 151.4 ms', '周期 0.45s / 歩幅 60mm / 横揺れ半減 y_max = 23.9 mm（13.3 cm/s）'],
  [28, 40, 'PHANTOM BUG // DAY 156-158', '4歩目の不規則フリーズ転倒（シリコン足底装着）', '151ms時定数の動歩行で数ミリ秒の遅延が致命的転倒を引き起こす'],
  [40, 56, 'LOGIC ANALYZER // DAY 159-160 · 24MHz', 'PulseViewで『13.8 ms Wi-Fi割込み空白』特定！', 'CH0: 13.8msフリーズ / CH1: 0x03逐次送信 3.80ms 位相遅れ'],
  [56, 82, 'HARD REALTIME // DAY 161-170 · ESP32-S3', 'SYNC WRITE(1.18ms) ＆ FreeRTOS デュアルコア分離', 'Core 1聖域化 → 周期 5.000ms ±0.011ms（±11μs！）/ 前期フル単・残金¥291,520'],
  [82, 110, 'ZMP DYNAMIC WALK // DAY 172 · 2.0m RUNWAY', '★ 2.0mを 15.2秒（34歩・13.3cm/s）で完全走破！', '双曲線23.9mm重心移動＋着地コンプライアンス＋キャプチャポイント停止'],
  [110, 122, 'THERMAL PARADOX // 100+ STEPS (6.0m)', '放射温度計：右膝サーボ『48.0 °C』で完全冷却！', '前回64cmで75℃沸騰 → 10倍の6m走破で48℃（逆起電力と準ストール解放）'],
  [122, 150, 'TOURNAMENT ENTRY // DAY 174-175', '全日本アマチュア二足歩行競技会（11/6）個人参戦！', '所属なし・個人参加：佐伯 湊（18歳）/ HMD-01 / 本番まで残り40日'],
];

const CUTINS = [
  [14.2, 17.8, '3D-LIPM 双曲線解：横揺れ半減 y_max = 23.9 mm（周期 0.45秒）', 'emerald'],
  [48.5, 53.5, 'PulseView 特定：Wi-Fi割込み『13.8 ms 意識喪失』＆ 通信 3.80 ms！', 'crimson'],
  [70.2, 75.0, 'FreeRTOS デュアルコア聖域分離 → 周期 5.000 ms ± 0.011 ms（±11μs！）', 'emerald'],
  [97.0, 102.5, '2.0メートル 15.2秒（34歩）完全走破！！ 100歩連続『48.0 ℃』！', 'emerald'],
  [136.5, 143.5, '第19回 全日本アマチュア二足歩行競技会 — 個人参加エントリー完了！', 'amber'],
];

export function getCh08Scene(t) {
  for (let i = CH08_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH08_SCENES[i].start) return CH08_SCENES[i];
  }
  return CH08_SCENES[0];
}
export function getCh08Subtitle(t) {
  for (const [s, e, spk, txt] of SUBTITLES) if (t >= s && t <= e) return { speaker: spk, text: txt };
  return null;
}
export function getCh08Simlog(t) {
  for (const [s, e, tag, title, detail] of SIMLOGS) if (t >= s && t <= e) return { tag, title, detail };
  return SIMLOGS[0];
}
export function getCh08Cutin(t) {
  for (const [s, e, text, tone] of CUTINS) if (t >= s && t <= e) return { text, tone };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };
const lerp3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

export function evaluateCh08Director(t, world, screens, lights) {
  const cam = { pos: [0, 1.0, 0.2], look: [0, 0.8, -0.5], fov: 28 };
  const fx = {
    bloomStrength: 0.22,
    exposure: 1.06,
    aperture: 0.014,
    aoIntensity: 0.72,
    vignette: 0.26,
  };
  let dramaBars = false;

  // Reset per-frame visibility
  world.setActiveSet('apartment');
  world.winMat.uniforms.uNight.value = 0.0;

  world.props.broomRig.visible = false;
  world.odeNb.visible = false;
  world.props.lipmHolo.visible = false;
  world.labPcb.root.visible = false;
  world.props.logicGroup.visible = false;
  world.props.dualCoreHolo.visible = false;
  world.floorLaptop.visible = false;
  world.props.irGun.visible = false;
  world.heroZmp.root.visible = false;

  // ===========================================================================
  // SCENE 1 (0 – 28s): 台風一過の秋朝 — ほうきの倒立振子 ＆ 3D-LIPM双曲線解 (y_max = 23.9mm)
  // ===========================================================================
  if (t < 28) {
    lights.setPreset('room_autumn_morning');
    if (t < 13.0) {
      // Cut 1A: Wooden Broomstick Dynamically Balanced on Minato's Open Palm gliding forward!
      world.props.broomRig.visible = true;
      const u = t / 13.0;
      const swayX = Math.sin(t * 2.1) * 0.045;
      const leanZ = 0.14 + Math.sin(t * 2.1) * 0.06;
      world.props.broomRig.position.set(0.06 + swayX, 0.94, -0.02 + u * 0.12);
      world.props.broomPivot.rotation.set(leanZ, 0, -swayX * 2.2);

      fx.aperture = 0.015;
      cam.pos = lerp3([-0.26, 1.06, 0.36], [0.24, 1.04, 0.40], u);
      cam.look = [0.06 + swayX * 0.5, 1.06, -0.50];
      cam.fov = 33;
    } else {
      // Cut 1B: Open 3D-LIPM ODE Notebook + Glowing Hyperbolic Cosh (23.9mm) vs Static (42.0mm) Hologram!
      world.odeNb.visible = true;
      world.props.lipmHolo.visible = true;
      const u = (t - 13.0) / 15.0;
      const orbU = (t * 0.32) % 1.0;
      world.props.holoOrb.position.set(Math.sin(orbU * Math.PI * 3.0) * 0.018, 0.068, -0.10 + orbU * 0.20);

      fx.aperture = 0.013;
      fx.bloomStrength = 0.26;
      cam.pos = lerp3([0.30, 0.99, -0.02], [-0.04, 0.95, -0.04], u);
      cam.look = [0.14, 0.77, -0.49];
      cam.fov = 30;
    }
  }

  // ===========================================================================
  // SCENE 2 (28 – 56s): 0.45秒の4歩目フリーズ転倒 → 24MHzロジアナ ＆ PulseView『13.8ms空白』特定！
  // ===========================================================================
  else if (t < 56) {
    if (t < 40.0) {
      // Cut 2A: 0.45s Fast Steps 1..3 -> Phantom 13.8ms Wi-Fi Freeze & Faceplant on Step 4!
      lights.setPreset('room_eva_day');
      world.heroZmp.root.visible = true;
      const stepFloat = Math.max(0, (t - 28.4) / 0.45);
      // Freeze glitch strikes at step 3.4 -> faceplant!
      const { forwardZ } = world.heroZmp.setDynamicZmpWalk(Math.min(4.6, stepFloat), {
        maxSteps: 6,
        stride: 0.060,
        showZmpDots: stepFloat < 3.4,
        glitchAtStep: 3.4,
      });
      world.heroZmp.root.position.set(0.10, 0.038, 0.15 + Math.min(0.22, forwardZ));
      world.heroZmp.root.rotation.set(0, 0, 0);

      const u = (t - 28.0) / 12.0;
      fx.aperture = 0.014;
      cam.pos = lerp3([0.62, 0.34, 0.96], [0.54, 0.28, 1.12], u);
      cam.look = [0.10, 0.21, 0.18 + Math.min(0.22, forwardZ)];
      cam.fov = 32;
    } else if (t < 48.0) {
      // Cut 2B-1: Museum-Grade Macro on Akizuki 24MHz USB Logic Analyzer + 3 Colorful IC Test Clips on `HMD-CORE-v1`!
      lights.setPreset('room_lab_night');
      world.winMat.uniforms.uNight.value = 1.0;
      world.labPcb.root.visible = true;
      world.props.logicGroup.visible = true;
      const u = (t - 40.0) / 8.0;
      fx.aperture = 0.016;
      cam.pos = lerp3([-0.06, 0.86, -0.22], [0.22, 0.85, -0.24], u);
      cam.look = [0.09, 0.745, -0.485];
      cam.fov = 26;
    } else {
      // Cut 2B-2: PulseView 24MHz Digital Waveform — Crimson Highlighted "13.8 ms FREEZE GAP (Wi-Fi Core 1 Interrupt!)"
      lights.setPreset('room_lab_night');
      world.winMat.uniforms.uNight.value = 1.0;
      dramaBars = true;
      screens.setLaptopMode('pulseview_13ms_bug');
      const u = (t - 48.0) / 8.0;
      fx.aperture = 0.006;
      cam.pos = lerp3([-0.16, 0.90, -0.24], [-0.23, 0.86, -0.35], u);
      cam.look = [-0.32, 0.835, -0.73];
      cam.fov = 28;
    }
  }

  // ===========================================================================
  // SCENE 3 (56 – 82s): 0x83 SYNC WRITE(1.18ms) ＆ FreeRTOS デュアルコア聖域分離(±11μs)！
  // ===========================================================================
  else if (t < 82) {
    lights.setPreset('room_lab_night');
    world.winMat.uniforms.uNight.value = 1.0;
    screens.setLaptopMode('pulseview_11us_fixed');

    if (t < 69.0) {
      // Cut 3A: Macro over `HMD-CORE-v1` + Glowing Floating ESP32-S3 Dual-Core Sanctuary Hologram (Core 0 vs Core 1!)
      world.labPcb.root.visible = true;
      world.props.logicGroup.visible = true;
      world.props.dualCoreHolo.visible = true;
      const u = (t - 56.0) / 13.0;
      world.props.dualCoreHolo.position.y = 0.754 + Math.sin(t * 2.4) * 0.003;
      fx.aperture = 0.014;
      fx.bloomStrength = 0.26;
      cam.pos = lerp3([0.16, 0.86, -0.22], [-0.04, 0.85, -0.23], u);
      cam.look = [0.06, 0.778, -0.495];
      cam.fov = 26;
    } else {
      // Cut 3B: PulseView 2,000-Cycle Crystal Clock Perfection (5.000ms ±0.011ms!) + Semester 1 Straight-S/A + ¥291,520!
      const u = (t - 69.0) / 13.0;
      fx.aperture = 0.006;
      cam.pos = lerp3([-0.16, 0.90, -0.24], [-0.23, 0.86, -0.35], u);
      cam.look = [-0.32, 0.835, -0.73];
      cam.fov = 28;
    }
  }

  // ===========================================================================
  // SCENE 4 (82 – 122s): 2.0mを15.2秒で駆けるZMP動歩行 ＆ 100歩連続『48.0℃』IRレーザー計測！！
  // ===========================================================================
  else if (t < 122) {
    lights.setPreset('room_eva_day');
    screens.setLaptopMode('zmp_2m_telemetry');
    world.floorLaptop.visible = true;
    world.heroZmp.root.visible = true;
    world.heroZmp.root.rotation.set(0, 0, 0);

    if (t < 110.0) {
      // Cuts 4A & 4B: Continuous Brisk 0.45s ZMP Dynamic Walk across full 2.0m Runway (34 Steps -> 15.2s!)
      dramaBars = t >= 95.0;
      const stepFloat = clamp01((t - 82.5) / 24.5) * 33.33;
      const { forwardZ } = world.heroZmp.setDynamicZmpWalk(stepFloat, {
        maxSteps: 33.33,
        stride: 0.060,
        showZmpDots: true,
        glitchAtStep: -1,
      });
      const worldZ = 0.15 + forwardZ; // 0.15m -> 2.15m (exact 2.00m green finish tape!)
      world.heroZmp.root.position.set(0.10, 0.038, worldZ);

      if (t < 96.0) {
        // Cut 4A: Low Side-Tracking Cinema Dolly capturing Full 380mm Rollbar-to-Sole ZMP Sprint!
        fx.aperture = 0.013;
        cam.pos = [0.78, 0.36, worldZ + 0.72];
        cam.look = [0.10, 0.23, worldZ + 0.04];
        cam.fov = 32;
      } else {
        // Cut 4B: Hero Finish-Line Reception Camera — Full 380mm Arch Rollbar + 2.0m Finish Line + Telemetry Laptop!
        const u = (t - 96.0) / 14.0;
        fx.aperture = 0.012;
        cam.pos = lerp3([0.58, 0.38, 2.94], [0.32, 0.33, 3.04], u);
        cam.look = [0.02, 0.23, Math.min(2.15, worldZ)];
        cam.fov = 33;
      }
    } else {
      // Cut 4C: Cinema Macro — Yellow/Black Non-Contact IR Laser Thermometer aiming glowing Red Laser onto Right Knee -> "48.0 °C"!
      dramaBars = true;
      world.heroZmp.setDynamicZmpWalk(33.33, { maxSteps: 33.33, stride: 0.060, showZmpDots: false });
      world.heroZmp.root.position.set(0.10, 0.038, 2.15);
      world.heroZmp.root.rotation.set(0, 0.35, 0);

      world.props.irGun.visible = true;
      world.props.irGun.position.set(0.18, 0.145, 2.48);
      world.props.irGun.rotation.set(-0.08, 0.28, 0);

      const u = (t - 110.0) / 12.0;
      fx.aperture = 0.014;
      fx.bloomStrength = 0.28;
      cam.pos = lerp3([0.32, 0.24, 2.74], [0.24, 0.22, 2.66], u);
      cam.look = [0.14, 0.175, 2.30];
      cam.fov = 26;
    }
  }

  // ===========================================================================
  // SCENE 5 (122 – 150s): 銀杏舞う後期開講・競技会ポスター → 深夜の個人エントリー完了（残り40日）！
  // ===========================================================================
  else {
    if (t < 135.0) {
      // Cut 5A: Sunlit Autumn University Corridor Corkboard — Pushing into "第19回 全日本アマチュア二足歩行ロボットオープン競技会" Poster!
      world.setActiveSet('corridor');
      lights.setPreset('corridor_autumn');
      const u = (t - 122.0) / 13.0;
      fx.aperture = 0.008;
      cam.pos = lerp3([0.16, 1.48, 0.28], [0.03, 1.48, -0.18], smooth(u));
      cam.look = [0.02, 1.48, -1.16];
      cam.fov = 34;
    } else {
      // Cut 5B: Midnight Walnut Workbench — Full 380mm `HMD-01 Rev 1.5` Standing Beside Glowing "ENTRY CONFIRMED!" Laptop!
      world.setActiveSet('apartment');
      lights.setPreset('room_midnight_entry');
      world.winMat.uniforms.uNight.value = 1.0;
      dramaBars = true;
      screens.setLaptopMode('tournament_entry_ok');

      world.heroZmp.root.visible = true;
      world.heroZmp.setDynamicZmpWalk(0, { maxSteps: 1, showZmpDots: false });
      world.heroZmp.setPose({ pelvisPos: [0, 0.206, 0], leftArmPitch: 0.06, rightArmPitch: 0.06 });
      world.heroZmp.root.position.set(0.16, 0.720, -0.52);
      world.heroZmp.root.rotation.set(0, -0.28, 0);

      const u = (t - 135.0) / 15.0;
      fx.aperture = 0.011;
      fx.bloomStrength = 0.26;
      cam.pos = lerp3([-0.22, 0.90, -0.06], [0.02, 0.98, 0.56], smooth(u));
      cam.look = lerp3([-0.24, 0.84, -0.68], [-0.04, 0.90, -0.56], smooth(u));
      cam.fov = 33;
    }
  }

  return { cam, fx, dramaBars, fin: t >= 149.2 };
}
