export const CH07_DURATION = 150.0; // Exact 02:30 (150 seconds)

export const CH07_SCENES = [
  { id: 1, start: 0, end: 34, jp: 'Day 126-136 · お盆のPETG-CF炭素繊維成形と『1,762 g』減量達成' },
  { id: 2, start: 34, end: 58, jp: 'Day 137-142 · 微分項Kd·ωオイルダンパーPD制御と鉄壁の自立起立' },
  { id: 3, start: 58, end: 82, jp: 'Day 145-146 · サイクロイド軌道と11連続引きずり → +3.2°重力補償' },
  { id: 4, start: 82, end: 118, jp: 'Day 146 03:12 AM · 奇跡の完全自律・人生初二足歩行 4歩(160.0mm)！' },
  { id: 5, start: 118, end: 150, jp: 'Day 150 · 連続16歩の『75℃の熱壁』と動歩行ZMPへの旅立ち' },
];

const SUBTITLES = [
  [0.6, 11.4, 'ナレーション', '8月13日・お盆。母からのLINEに『正月には帰る』と返し、65℃ドライヤーで乾燥させた炭素繊維樹脂『PETG-CF』と0.4mm焼入れ鋼ノズルを投入した。'],
  [12.2, 24.4, 'ナレーション', '青いニトリル手袋をはめ、8日間かけて引き算の設計を断行。背面ランドセル・金属支柱・飾り頭部を全廃し、112g LiPoを胸郭中央へ垂直収納！'],
  [25.2, 33.4, 'ナレーション', 'Day 136夜、マットチャコール『HMD-01 Rev 1.5』完成——キッチンスケールは目標1,800gを38g下回る『1,762 g（-180g減量）』を刻んだ！'],

  [34.6, 44.5, 'ナレーション', 'P制御だけの理想バネは発振する。BNO085の生ジャイロ角速度ωによる微分ブレーキ（Δθ = -Kp·θ - Kd·ω）を組み込み、資金も残高¥224,620へ。'],
  [45.4, 57.4, '佐伯 湊', '指先で胸ロールバーをチョンと突いても揺り戻しゼロ・温度41℃安定。「……立った。完全に自分の三半規管で立ってるぞ……！」'],

  [58.6, 69.5, '佐伯 湊', '離床・着地速度ゼロの『サイクロイド曲線』を実装するも11回連続のつま先引きずり。「計算上20mm浮いてるはずなのに、なんで左足が床を擦るんだ？」'],
  [70.2, 81.4, '佐伯 湊', '深夜2時のスロー動画でギア隙間による-2.8°垂下を発見！「片足支持の瞬間だけ、支持脚の股ロールを+3.2°余分に引き上げてやればいい！」OTA書込完了！'],

  [82.6, 92.8, 'ナレーション', 'Day 146 午前3時12分。+3.2°の重力補償が効き、左足裏の下に15ミリ以上の澄み切った空間が開いた——サイクロイド曲線を描き、無衝撃で『一歩目』着地！'],
  [93.4, 105.6, 'ナレーション', '二歩目、三歩目、四歩目——ケーブル一本繋がず、自らのバッテリーと16個のモータと数式だけで、きっかり『160.0 mm』を踏みしめて静止した！！'],
  [106.4, 117.5, '佐伯 湊', '「…………っ！！」146日間の白煙も傷跡も63℃の絶望も、目の前のわずか16センチの足跡となってすべて報われた。'],

  [118.6, 130.6, 'ナレーション', 'Day 150、1.0m耐久テストの16歩目（64cm地点）——ピピピピッ！ 右膝サーボが上限『75℃』へ到達しサーマルシャットダウン、片膝をついて停止した。'],
  [131.2, 140.6, '佐伯 湊', 'PETG-CF骨格は無傷。焼けたのは1歩2.8秒の準ストール保持電流（1.6A）が生むジュール熱P=I²Rだった。「人間だって空気椅子スロー歩行なら1分で太ももが燃えるよな……」'],
  [141.4, 149.5, 'ナレーション', '九月の乾いた風が吹き込む机の上で、再び教科書第4章を開く——『ZMPと線形倒立振子モデル』。倒れながら前へ駆ける、本物の動歩行への戦いが始まる！'],
];

const SIMLOGS = [
  [0, 12, 'OBON // DAY 126-130 · ROOM 203', 'PETG-CF 炭素繊維15% ＋ 焼入れ鋼ノズル', '65℃ 6時間乾燥 / 耐熱 Tg ~80℃ 梨地マットチャコール骨格成形'],
  [12, 34, 'SUBTRACTION // DAY 131-136 · REV 1.5', 'HMD-01 Rev 1.5 減量達成『1,762 g』', '-180g減量（背面ケース・支柱・頭部全廃 / 胸部中央垂直LiPo / PTFE配線）'],
  [34, 58, 'PD DAMPING // DAY 137-142', 'ジャイロ角速度ブレーキ『Δθ = -Kp·θ - Kd·ω』', '外乱突きの揺り戻しゼロ・温度41℃安定 / 第4回給与後 残高 ¥224,620'],
  [58, 82, 'GAIT DEBUG // DAY 145-146 · 02:00 AM', 'サイクロイド曲線 ＋ 股ロール +3.2° 重力補償', '片足支持-2.8°垂下（トレンデレンブルグ徴候）をフィードフォワードで完封'],
  [82, 118, 'HISTORIC WALK // DAY 146 · 03:12 AM', '★完全自律・ケーブルレス人生初二足歩行 成功！', '4ステップ・前進 160.0 mm（無衝撃サイクロイド着地・エラー 0）'],
  [118, 141, 'THERMAL WALL // DAY 150 · STEP 16 (64cm)', 'ID:04 右膝サーボ 75℃ サーマルシャットダウン', '1歩2.8秒の準ストール1.6A → 100%ジュール熱 P=I²R（PETG-CF骨格は無傷）'],
  [141, 150, 'NEXT HORIZON // SEPTEMBER 2', '静歩行卒業 → 第4章『ZMP ＆ 線形倒立振子』へ', '0.4秒リズムの動歩行で逆起電力を活かし、11月の競技会へ挑む'],
];

const CUTINS = [
  [25.6, 29.2, '実測 1,762 g（-180 g 減量達成・目標クリア！）', 'emerald'],
  [84.5, 89.2, 'Day 146 午前3時12分 — 人生初の完全自律二足歩行！！', 'emerald'],
  [104.5, 108.5, '4ステップ・160.0 mm 踏破！！ [CABLE-FREE PASS]', 'emerald'],
  [123.6, 128.5, 'CRITICAL : 右膝 75℃ 到達 — 準ストール発熱シャットダウン！', 'crimson'],
  [142.2, 147.2, '第4章『ZMP（ゼロモーメントポイント）と線形倒立振子モデル』', 'amber'],
];

export function getCh07Scene(t) {
  for (let i = CH07_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH07_SCENES[i].start) return CH07_SCENES[i];
  }
  return CH07_SCENES[0];
}
export function getCh07Subtitle(t) {
  for (const [s, e, spk, txt] of SUBTITLES) if (t >= s && t <= e) return { speaker: spk, text: txt };
  return null;
}
export function getCh07Simlog(t) {
  for (const [s, e, tag, title, detail] of SIMLOGS) if (t >= s && t <= e) return { tag, title, detail };
  return SIMLOGS[0];
}
export function getCh07Cutin(t) {
  for (const [s, e, text, tone] of CUTINS) if (t >= s && t <= e) return { text, tone };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };
const lerp3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

export function evaluateCh07Director(t, world, screens, lights) {
  const cam = { pos: [0, 1.0, 0.2], look: [0, 0.8, -0.5], fov: 28 };
  const fx = {
    bloomStrength: 0.22,
    exposure: 1.06,
    aperture: 0.014,
    aoIntensity: 0.72,
    vignette: 0.26,
  };
  let dramaBars = false;

  // Reset per-frame visibility & animations
  world.winMat.uniforms.uTime.value = t;
  world.winMat.uniforms.uMode.value = 0.0;
  world.props.cfSpool.rotation.z = -t * 0.45;

  world.deskPhone.visible = false;
  world.props.dryerGroup.visible = false;
  world.props.nozzleGroup.visible = false;
  world.scaleGroup.visible = false;
  world.textbook.visible = false;
  world.props.zmpHolo.visible = false;
  world.floorLaptop.visible = false;
  world.props.cycloidArc.visible = false;
  world.props.trackMarks.visible = false;
  world.endurGroup.visible = false;
  world.pokeHand.group.visible = false;
  world.props.blueHandLeft.group.visible = false;
  world.props.blueHandRight.group.visible = false;
  world.heroRev15.root.visible = false;

  for (const padMat of world.props.stepPads) padMat.opacity = 0.0;

  // ===========================================================================
  // SCENE 1 (0 – 34s): お盆のPETG-CF 65℃乾燥・焼入れ鋼ノズル → Rev 1.5組立 → 1,762 g達成!
  // ===========================================================================
  if (t < 34) {
    lights.setPreset('room_obon_day');
    world.winMat.uniforms.uMode.value = 0.0;
    screens.setPhoneMode('obon_mom_line');
    screens.setScaleMode('weight_1762g_pass');
    screens.setLaptopMode('pd_damping_compare');

    if (t < 12.0) {
      // Cut 1A: Mom's Obon LINE + Spinning 65°C PETG-CF Filament Dryer + 0.4mm Hardened Steel Nozzle!
      world.deskPhone.visible = true;
      world.props.dryerGroup.visible = true;
      world.props.nozzleGroup.visible = true;
      world.props.nozzleGroup.rotation.y = 0.35 + t * 0.35;

      const u = t / 12.0;
      fx.aperture = 0.014;
      cam.pos = lerp3([-0.24, 0.90, -0.14], [0.22, 0.89, -0.12], u);
      cam.look = lerp3([-0.10, 0.79, -0.49], [0.09, 0.79, -0.52], u);
      cam.fov = 29;
    } else if (t < 25.0) {
      // Cut 1B: Blue Nitrile Gloves & Progressive Subtraction Assembly of Matte-Charcoal `HMD-01 Rev 1.5`!
      world.heroRev15.root.visible = true;
      world.heroRev15.root.position.set(0.08, 0.720, -0.50);
      const u = (t - 12.0) / 13.0;
      world.heroRev15.root.rotation.set(0, -0.35 + u * 0.85, 0);
      world.heroRev15.setAssemblyProgress(smooth(u * 1.06));
      world.heroRev15.setPose({ pelvisPos: [0, 0.202, 0] });

      // Blue nitrile-gloved hands framing the carbon truss assembly!
      world.props.blueHandLeft.group.visible = true;
      world.props.blueHandRight.group.visible = true;
      world.props.blueHandLeft.group.position.set(-0.12, 0.94, -0.48);
      world.props.blueHandLeft.group.rotation.set(0.2, 0.4, -0.1);
      world.props.blueHandRight.group.position.set(0.28, 0.94, -0.48);
      world.props.blueHandRight.group.rotation.set(0.2, -2.7, 0.1);

      fx.aperture = 0.015;
      cam.pos = lerp3([-0.14, 1.02, 0.28], [0.26, 0.99, 0.26], u);
      cam.look = [0.08, 0.92, -0.50];
      cam.fov = 31;
    } else {
      // Cut 1C: Kitchen Scale Victory — Emerald "1762 g (-180g PASS!)" + Sleek Full-Body Profile!
      dramaBars = true;
      world.scaleGroup.visible = true;
      world.heroRev15.root.visible = true;
      world.heroRev15.setAssemblyProgress(1.0);
      world.heroRev15.root.position.set(0.08, 0.746, -0.522);
      world.heroRev15.root.rotation.set(0, -0.48, 0); // Shows zero rear backpack & sleek vertical center LiPo!
      world.heroRev15.setPose({ pelvisPos: [0, 0.205, 0] });

      const u = (t - 25.0) / 9.0;
      fx.aperture = 0.012;
      cam.pos = lerp3([0.24, 1.08, 0.26], [0.10, 1.00, 0.18], u);
      cam.look = [0.08, 0.86, -0.48];
      cam.fov = 33;
    }
  }

  // ===========================================================================
  // SCENE 2 (34 – 58s): 微分項Kd·ωオイルダンパーPD制御 ＆ 指突き外乱テスト (41℃安定!)
  // ===========================================================================
  else if (t < 58) {
    lights.setPreset('room_eva_clean');
    screens.setLaptopMode('pd_damping_compare');

    if (t < 45.0) {
      // Cut 2A: Laptop PD Oil-Damper Comparison (P-only oscillation vs PD critical damping + Day 142 ¥224,620!)
      const u = (t - 34.0) / 11.0;
      fx.aperture = 0.006;
      cam.pos = lerp3([-0.18, 0.90, -0.24], [-0.25, 0.86, -0.36], u);
      cam.look = [-0.34, 0.835, -0.73];
      cam.fov = 28;
    } else {
      // Cut 2B: EVA Mat Finger Poke Test! Finger pokes arched rollbar at t=49.5s -> -3.2° critically-damped return to 0.00°!
      world.floorLaptop.visible = true;
      world.props.trackMarks.visible = true;
      world.heroRev15.root.visible = true;
      world.heroRev15.setAssemblyProgress(1.0);
      world.heroRev15.root.position.set(0.10, 0.038, 0.26);
      world.heroRev15.root.rotation.set(0, 0.42, 0);

      // Critically damped impulse response: theta(dt) = -3.6° * (dt/tau) * exp(1 - dt/tau)
      let tiltRad = 0;
      if (t >= 49.5) {
        const dt = t - 49.5;
        const tau = 0.26;
        tiltRad = -0.062 * (dt / tau) * Math.exp(1.0 - dt / tau);
      }
      world.heroRev15.setPose({
        pelvisPos: [0, 0.198, 0],
        pivotRotX: tiltRad,
        leftArmPitch: 0.12 - tiltRad * 1.4,
        rightArmPitch: 0.12 - tiltRad * 1.4,
      });

      // Minato's index finger reaches cleanly from the right side to tap the arched rollbar at t=49.5s then withdraws!
      world.pokeHand.group.visible = true;
      const pokeIn = smooth((t - 47.6) / 1.7);
      const pokeOut = smooth((t - 50.0) / 1.4);
      const pokeReach = pokeIn * (1 - pokeOut);
      world.pokeHand.group.position.set(0.32 - pokeReach * 0.13, 0.36, 0.28);
      world.pokeHand.group.rotation.set(0.05, Math.PI * 0.5, 0);

      const u = (t - 45.0) / 13.0;
      fx.aperture = 0.014;
      cam.pos = lerp3([0.58, 0.35, 1.12], [0.48, 0.32, 1.04], u);
      cam.look = [0.06, 0.23, 0.26];
      cam.fov = 31;
    }
  }

  // ===========================================================================
  // SCENE 3 (58 – 82s): サイクロイド曲線と11連続つま先引きずり → +3.2°重力補償OTA!
  // ===========================================================================
  else if (t < 82) {
    lights.setPreset('room_03am_walk');
    world.winMat.uniforms.uMode.value = 1.0;
    screens.setLaptopMode('cycloid_gravity_comp');

    if (t < 70.0) {
      // Cut 3A: Floor-Level Slow-Mo Camera watching 11th Toe-Drag Failure (Trendelenburg -2.8° Sag!) + Glowing Cyan Cycloid Arc!
      world.props.trackMarks.visible = true;
      world.props.cycloidArc.visible = true;
      world.heroRev15.root.visible = true;
      world.heroRev15.setAssemblyProgress(1.0);
      world.heroRev15.root.position.set(0.10, 0.038, 0.26);
      world.heroRev15.root.rotation.set(0, 0, 0);

      const u = (t - 58.0) / 12.0;
      const failP = clamp01(u * 0.72);
      const stumble = u > 0.58 ? smooth((u - 0.58) / 0.25) : 0;
      world.heroRev15.setStaticWalkProgress(failP, { enableGravityComp: false });
      world.heroRev15.pivotGroup.rotation.x = stumble * 0.24; // Stumbles forward when inner edge scrapes!
      world.heroRev15.pivotGroup.rotation.z = stumble * 0.14;

      fx.aperture = 0.016;
      cam.pos = lerp3([0.36, 0.14, 0.62], [0.28, 0.11, 0.54], u);
      cam.look = [0.12, 0.10, 0.28];
      cam.fov = 26;
    } else {
      // Cut 3B: 02:00 AM Laptop — 4-Line C++ "+3.2° Hip-Roll Gravity Feedforward" Wi-Fi OTA Flash!
      const u = (t - 70.0) / 12.0;
      fx.aperture = 0.006;
      cam.pos = lerp3([-0.18, 0.90, -0.24], [-0.25, 0.86, -0.36], u);
      cam.look = [-0.34, 0.835, -0.73];
      cam.fov = 28;
    }
  }

  // ===========================================================================
  // SCENE 4 (82 – 118s): 午前3時12分の奇跡 — 完全自律4ステップ『160.0 mm』人生初二足歩行！！
  // ===========================================================================
  else if (t < 118) {
    lights.setPreset('room_03am_walk');
    world.winMat.uniforms.uMode.value = 1.0; // Deep quiet 03:12 AM midnight!
    screens.setLaptopMode('walk_success_160mm');
    dramaBars = t >= 84.0;

    world.floorLaptop.visible = true;
    world.props.trackMarks.visible = true;
    world.heroRev15.root.visible = true;
    world.heroRev15.setAssemblyProgress(1.0);
    world.heroRev15.root.position.set(0.10, 0.038, 0.26);
    world.heroRev15.root.rotation.set(0, 0, 0);

    // Map t in [82..106] -> walkProgress p in [0.0 .. 4.0] smoothly across 4 real analytic steps!
    const walkP = clamp01((t - 82.5) / 23.0) * 4.0;
    world.heroRev15.setStaticWalkProgress(walkP, { enableGravityComp: true });

    // Light up each emerald footprint pad as each foot touches down silently!
    world.props.stepPads[0].opacity = smooth((walkP - 0.88) / 0.12) * 0.45;
    world.props.stepPads[1].opacity = smooth((walkP - 1.88) / 0.12) * 0.45;
    world.props.stepPads[2].opacity = smooth((walkP - 2.88) / 0.12) * 0.45;
    world.props.stepPads[3].opacity = smooth((walkP - 3.76) / 0.16) * 0.55;

    if (t < 93.0) {
      // Cut 4A: Low Floor-Level Macro on Step 1 — Crystal-Clear 22mm Gap Beneath Left Sole + Glowing Cycloid Curve!
      world.props.cycloidArc.visible = true;
      const u = (t - 82.0) / 11.0;
      fx.aperture = 0.015;
      cam.pos = lerp3([0.36, 0.13, 0.58], [0.30, 0.16, 0.66], u);
      cam.look = [0.11, 0.11, 0.29];
      cam.fov = 26;
    } else if (t < 106.0) {
      // Cut 4B: Dynamic Cinema Tracking Dolly capturing ALL 4 Untethered Steps (Full 380mm Rollbar-to-Sole Framed!)
      const u = (t - 93.0) / 13.0;
      const zTrack = 0.28 + (walkP / 4.0) * 0.14;
      fx.aperture = 0.013;
      cam.pos = lerp3([0.62, 0.36, 1.16], [0.52, 0.34, 1.28], u);
      cam.look = [0.06, 0.23, zTrack];
      cam.fov = 32;
    } else {
      // Cut 4C: Emotional Quiet Triumph — Standing Poised 160.0mm Past Start Line with Full Arch Rollbar & 4 Footprints!
      const u = (t - 106.0) / 12.0;
      fx.aperture = 0.014;
      cam.pos = lerp3([0.46, 0.34, 1.28], [0.24, 0.29, 1.34], u);
      cam.look = [0.04, 0.23, 0.38];
      cam.fov = 31;
    }
  }

  // ===========================================================================
  // SCENE 5 (118 – 150s): 連続16歩(64cm)『75℃の熱壁』シャットダウン → 教科書第4章『ZMPと線形倒立振子』!
  // ===========================================================================
  else {
    world.winMat.uniforms.uMode.value = 2.0; // Crisp early-September autumn sky!
    screens.setLaptopMode('thermal_75c_wall');

    if (t < 131.0) {
      // Cut 5A: 1.0m 3-Mat Endurance Track — Step 16 (64cm) Right Knee Hits 75°C Crimson & Marathon-Runner 1-Knee Collapse!
      lights.setPreset('room_sept_thermal');
      dramaBars = t >= 123.5;
      world.endurGroup.visible = true;
      world.floorLaptop.visible = true;
      world.floorLaptop.position.set(-0.36, 0.044, 0.72);
      world.heroRev15.root.visible = true;
      world.heroRev15.setAssemblyProgress(1.0);
      world.heroRev15.root.position.set(0.10, 0.038, 0.88); // 64cm down the 1.0m walkway!
      world.heroRev15.root.rotation.set(0, 0.38, 0);

      const u = (t - 118.0) / 13.0;
      const heatRamp = smooth((t - 118.5) / 5.0);
      const collapse = smooth((t - 124.2) / 1.5);
      world.heroRev15.setPose({
        pelvisPos: [-0.032 * (1 - collapse), 0.185, 0],
        leftFootPos: [0.042, 0.018 * (1 - collapse), 0.035],
        rightFootPos: [-0.042, 0, 0],
        leftArmPitch: 0.15 + collapse * 0.45,
        rightArmPitch: 0.15 + collapse * 0.45,
        rightKneeHeat: heatRamp,
        oneKneeCollapse: collapse,
      });

      fx.aperture = 0.013;
      cam.pos = lerp3([0.52, 0.34, 1.62], [0.36, 0.28, 1.54], u);
      cam.look = [0.02, 0.19, 0.86];
      cam.fov = 31;
    } else if (t < 141.0) {
      // Cut 5B: Close Inspection of Unscathed Razor-Straight PETG-CF Right Knee + 75°C Joule Heat Telemetry!
      lights.setPreset('room_sept_thermal');
      world.endurGroup.visible = true;
      world.floorLaptop.visible = true;
      world.floorLaptop.position.set(-0.36, 0.044, 0.72);
      world.heroRev15.root.visible = true;
      world.heroRev15.setAssemblyProgress(1.0);
      world.heroRev15.root.position.set(0.10, 0.038, 0.88);
      world.heroRev15.root.rotation.set(0, 0.38, 0);
      world.heroRev15.setPose({
        pelvisPos: [0, 0.185, 0],
        leftFootPos: [0.042, 0, 0.035],
        rightFootPos: [-0.042, 0, 0],
        leftArmPitch: 0.60,
        rightArmPitch: 0.60,
        rightKneeHeat: 0.75,
        oneKneeCollapse: 1.0,
      });

      const u = (t - 131.0) / 10.0;
      fx.aperture = 0.008;
      cam.pos = lerp3([0.16, 0.24, 1.32], [-0.14, 0.22, 1.08], u);
      cam.look = lerp3([0.08, 0.14, 0.88], [-0.34, 0.15, 0.72], smooth(u));
      cam.fov = 29;
    } else {
      // Cut 5C: Crisp Early-September Breeze — Open Ch.4 Textbook "ZMPと線形倒立振子モデル" + Glowing 3D LIPM Hologram!
      lights.setPreset('room_sept_breeze');
      dramaBars = true;
      world.textbook.visible = true;
      world.props.zmpHolo.visible = true;
      // Gentle forward-falling dynamic-walk pendulum oscillation!
      const u = (t - 141.0) / 9.0;
      world.props.zmpHolo.rotation.y = -0.35 + u * 0.95;

      fx.aperture = 0.015;
      fx.bloomStrength = 0.28;
      cam.pos = lerp3([0.30, 0.98, -0.02], [-0.02, 0.94, -0.06], u);
      cam.look = [0.12, 0.78, -0.50];
      cam.fov = 30;
    }
  }

  return { cam, fx, dramaBars, fin: t >= 149.2 };
}
