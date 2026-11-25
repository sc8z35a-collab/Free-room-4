export const CH16_DURATION = 150.0;

export const CH16_SCENES = [
  { id: 1, start: 0,   end: 26,  jp: 'Day 445 夜 · XT90-S 無火花接続・Jetson Orin Nano搭載＆実測7.62kg' },
  { id: 2, start: 26,  end: 62,  jp: 'Day 446 午後8時 · 初起立0.3秒——黒豹の如き狂乱発振＆非常停止！' },
  { id: 3, start: 62,  end: 76,  jp: '5日間の水底 · ゲイン半減で「濡れた段ボール箱」のように崩壊' },
  { id: 4, start: 76,  end: 104, jp: 'Day 452 深夜 · 万力左脚1本解剖——三つの『現実の泥』を特定！' },
  { id: 5, start: 104, end: 130, jp: 'Day 455 午後 · 『自動制御』ボード線図 ＆ 七月の渡り廊下の覚醒' },
  { id: 6, start: 130, end: 150, jp: 'Day 455 夜 · 夢を泥沼へ変えろ——『身体の声を聴く夏』へ！' },
];

export const CH16_SUBTITLES = [
  // Cut 01 (0..26s): Day 445 — XT90-S Anti-Spark, Jetson Orin Nano (¥49,800), 7.62kg Final Mass
  { start: 0.4,   end: 10.6,  speaker: 'ナレーション', text: 'カチッ…浅い一段目で1秒息を止め、黄色い『XT90-S』先端の緑色の帯が隠れるまで真っ直ぐ差し込む。25.2Vの火花は、散らなかった。' },
  { start: 10.8,  end: 18.8,  speaker: 'ナレーション', text: 'Day 445夜。カーボン胸郭の奥で¥49,800の小型AI脳『Jetson Orin Nano』が静かに呼吸を始める。三億歩の記憶（1.2MB）はすでに胸へ焼き付けた。' },
  { start: 19.0,  end: 25.8,  speaker: '佐伯 湊', text: '吊りはかりの表示はきっかり『7.62 kg』（HMD-01の4倍超）。「……明日、このベルトを緩めたら、お前はもうこの部屋を歩けるんだな」' },

  // Cut 02 (26..62s): Day 446 20:00 — First Stand Attempt -> 0.1s Hope -> 0.3s Violent Black-Panther Oscillation -> E-Stop!
  { start: 26.4,  end: 36.8,  speaker: '佐伯 湊', text: 'Day 446午後8時。二重の極厚EVAマットへ降ろし、登山用スリングに10cmのたるみ。真っ赤な非常停止に右手を添える。「いくぞ『HMD-02』。初起立——スタート！」' },
  { start: 37.0,  end: 42.0,  speaker: 'ナレーション', text: '最初の0.1秒、両膝がスッと人間らしく伸びかけた。『よし！』と息を吸った直後——『キィィィン……ガガッ！！』甲高い金属の悲鳴！' },
  { start: 42.2,  end: 52.8,  speaker: 'ナレーション', text: 'ガンッ！！ バァンッ！！ 25V・7.62kgの金属塊が罠の黒豹のように狂乱！ 20mm防音マットをえぐり飛ばし、鉄パイプ櫓が激震——湊の膝8cm手前でベルトが『ビシィッ！！』と止めた！' },
  { start: 53.0,  end: 61.8,  speaker: '佐伯 湊', text: 'バチンッ！ 赤い非常停止を叩き潰す。四肢を垂らしギシ…と揺れる巨体と千切れたゴム片。「……なんでだよ……画面の中では、三億歩も綺麗に歩いてたじゃないか……！！」' },

  // Cut 03 (62..76s): Five Days Underwater — Half Gain -> Collapsing Like a Wet Cardboard Box
  { start: 62.4,  end: 75.8,  speaker: 'ナレーション', text: '力を半分に弱めてみれば、今度は床へ触れた瞬間に「濡れた段ボール箱」のように両膝がグニャリと潰れ落ちた。強くすれば0.3秒で発狂、弱くすれば赤ん坊以下——中間が存在しない。' },

  // Cut 04 (76..104s): Day 452 Midnight — Single Left Leg in Bench Vise + Oscilloscope Revealing the 3 Real-World Muds!
  { start: 76.4,  end: 85.8,  speaker: 'ナレーション', text: 'Day 452深夜。左脚1本だけを万力に固定し中古オシロで1/1000秒単位の解剖！ 一つ目の犯人は『4.2ミリ秒の神経遅延』——4ms前の過去へ全力逆ハンドルを切り爆発していた！' },
  { start: 86.0,  end: 94.8,  speaker: 'ナレーション', text: '二つ目の犯人は、8:1鋼鉄遊星歯車とグリスの『静止摩擦（粘り気）』！ 動き出しに「ピタッ」と張り付き「ツルッ」と滑るクセが、弱ゲイン時の崩壊を招いていた！' },
  { start: 95.0,  end: 103.8, speaker: 'ナレーション', text: 'そして三つ目は『骨を伝わる微かな震え』！ 硬いカーボン骨格が弦楽器の胴のように振動を胸のセンサへ響かせ、無菌室育ちのAIを「大地震だ！」とパニックさせていたのだ！' },

  // Cut 05 (104..130s): Day 455 Afternoon — Automatic Control Bode Plot & July Skybridge Epiphany
  { start: 104.4, end: 117.8, speaker: '教授', text: 'Day 455『自動制御』講義。「現実の機械に『遅れゼロ』『摩擦ゼロ』は一つもない。様々な周波数の波を入れ、相手のありのままのクセを測る——それをシステム同定と呼ぶ」' },
  { start: 118.0, end: 129.8, speaker: '佐伯 湊', text: '湿った七月の風が吹く渡り廊下。「……俺、あいつらを『綺麗すぎる温室』で育ててたんだな」——4.2msの遅れもグリスの粘りも、すべて測って『夢の中』へ持ち込めばいい！' },

  // Cut 06 (130..150s): Day 455 Night — Hand on Cool Carbon Thigh & Listening to the Body's True Voice!
  { start: 130.4, end: 139.8, speaker: '佐伯 湊', text: 'その夜、櫓の中で眠る『HMD-02』のひんやりしたカーボン太ももへそっと右手を当てた。「ごめんな。お前の本当の身体の声を聴かずに、よその綺麗な夢を無理やり押し付けてた」' },
  { start: 140.0, end: 149.8, speaker: 'ナレーション', text: '12の関節へ小さな波の電気を流し、本当の身体の声を聴き取るシステム同定が始まる。二度目の夏がすぐそこまで来ていた——次章『第17章：身体の声を聴く夏』へ！' },
];

export function getCh16Scene(t) {
  for (let i = CH16_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH16_SCENES[i].start) return CH16_SCENES[i];
  }
  return CH16_SCENES[0];
}

export function getCh16Subtitle(t) {
  for (let i = 0; i < CH16_SUBTITLES.length; i++) {
    const s = CH16_SUBTITLES[i];
    if (t >= s.start && t <= s.end) return { speaker: s.speaker, text: s.text };
  }
  return null;
}

export function getCh16Cutin(t) {
  if (t >= 3.5 && t < 8.5) return { text: 'XT90-S アンチスパーク接続 — 25.2V 無火花・予備充電完了！', tone: 'emerald' };
  if (t >= 20.0 && t < 25.0) return { text: 'HMD-02 完全自律電装統合 — 実測最終重量『7.62 kg』！', tone: 'amber' };
  if (t >= 42.5 && t < 51.5) return { text: '警告：初起立0.3秒で全身大発振！ 20mm防音マット破壊！！', tone: 'crimson' };
  if (t >= 53.5 && t < 58.0) return { text: 'E-STOP 非常停止発動 — 登山用スリングが膝8cm手前で阻止！', tone: 'crimson' };
  if (t >= 78.0 && t < 84.5) return { text: 'Sim-to-Real 犯人①：4.2msの神経遅延（位相遅れ自己増幅）！', tone: 'amber' };
  if (t >= 106.0 && t < 113.0) return { text: '自動制御：むだ時間とボード線図 — 答えは『システム同定』！', tone: 'emerald' };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

export function evaluateCh16Timeline(t, world, screens, lights, camera, lookTarget, hudCb) {
  const {
    hmd02,
    hmd02Anchor,
    gantryPivot,
    gantryRig,
    workstationRoom,
    xtJetsonRig,
    matEstopRig,
    viseDiagRig,
    minatoRoom,
    sweepMat,
    sweepRings,
  } = world;

  // Deterministic reset every seek/frame
  xtJetsonRig.xtGroup.visible = false;
  xtJetsonRig.chestBayGroup.visible = false;
  xtJetsonRig.craneScaleGroup.visible = false;
  viseDiagRig.group.visible = false;
  matEstopRig.updateDebris(0);
  matEstopRig.setEstopPressed(0);
  gantryPivot.rotation.set(0, 0, 0);
  gantryPivot.position.set(0.0, 0.0, 0.30);
  hmd02Anchor.position.set(0, 0.042, 0);
  hmd02Anchor.rotation.set(0, 0, 0);
  hmd02.root.position.set(0, 0, 0);
  hmd02.root.rotation.set(0, 0, 0);
  if (gantryRig.beltStrap) {
    gantryRig.beltStrap.visible = true;
    gantryRig.beltStrap.rotation.set(0, 0, 0);
  }
  if (gantryRig.carabiner) gantryRig.carabiner.visible = true;
  minatoRoom.root.visible = true;
  minatoRoom.root.position.set(0.68, 0.0, 0.16);
  minatoRoom.root.rotation.set(0, -Math.PI * 0.56, 0);
  minatoRoom.leftLeg.hipJoint.rotation.x = 0;
  minatoRoom.rightLeg.hipJoint.rotation.x = 0;
  minatoRoom.rightArm.shoulder.rotation.set(-0.2, 0, -0.08);
  minatoRoom.rightArm.elbow.rotation.set(-0.2, 0, 0);
  minatoRoom.leftArm.shoulder.rotation.set(-0.15, 0, 0.08);
  minatoRoom.leftArm.elbow.rotation.set(-0.15, 0, 0);
  sweepMat.opacity = 0;

  let dof = { focusDist: 1.1, aperture: 0.008, halation: 0.28 };
  let simLog = null;

  // =========================================================================
  // CUT 01 (0..26s): Day 445 Night — XT90-S Anti-Spark -> Jetson Orin Nano -> 7.62kg Crane Scale!
  // =========================================================================
  if (t < 26.0) {
    if (t < 10.8) {
      // 0..10.8s: Extreme Macro of Yellow `XT90-S` Anti-Spark Green Band Click-In (ZERO spark!)
      const u = t / 10.8;
      world.setActiveSet('macroIntegration');
      lights.setPreset('macro_studio');
      xtJetsonRig.xtGroup.visible = true;
      xtJetsonRig.animateXt90s(u);

      camera.position.set(lerp(-0.18, -0.02, smooth(u)), lerp(0.28, 0.21, smooth(u)), lerp(0.45, 0.35, smooth(u)));
      lookTarget.set(-0.07, 0.04, 0.0);
      dof = { focusDist: 0.42, aperture: 0.005, halation: 0.24 };
      simLog = {
        tag: 'DAY 445 // 6S LiPo 25.2V · XT90-S ANTI-SPARK CONNECTOR',
        title: '『カチッ……グッ』緑の帯が隠れるまで押し込む —— 25.2Vの火花は散らなかった',
        detail: '浅い予備充電接点でコンデンサを優しく満たし、溶接のような青い火花を完全防止',
      };
    } else if (t < 19.0) {
      // 10.8..19.0s: Open Carbon Chest Bay revealing palm-sized `Jetson Orin Nano` (¥49,800) + Whisper Fan!
      const u = (t - 10.8) / 8.2;
      world.setActiveSet('macroIntegration');
      lights.setPreset('macro_studio');
      xtJetsonRig.chestBayGroup.visible = true;
      xtJetsonRig.animateJetson(t, smooth((u - 0.55) / 0.45));

      camera.position.set(lerp(0.22, -0.16, smooth(u)), lerp(0.22, 0.18, smooth(u)), lerp(0.42, 0.34, smooth(u)));
      lookTarget.set(0.0, 0.12, 0.04);
      dof = { focusDist: 0.38, aperture: 0.006, halation: 0.28 };
      simLog = {
        tag: 'JETSON ORIN NANO (¥49,800) // 1.2 MB POLICY LOADED',
        title: '手のひらサイズの黒いAI脳『Jetson Orin Nano』＆1.2MBの三億歩の記憶を胸郭へ封印！',
        detail: '小さな冷却ファンが「シュゥゥ…」と呼吸を始め、4本の黒染めボルトでカーボン胸板を閉じる',
      };
    } else {
      // 19.0..26.0s: Room 203 — Hanging Digital Crane Scale reads `7.62 kg` above Jet-Black `HMD-02`!
      const u = (t - 19.0) / 7.0;
      world.setActiveSet('room203');
      lights.setPreset('room_calm_night');
      workstationRoom.update(t, true);
      xtJetsonRig.craneScaleGroup.visible = true;
      hmd02Anchor.position.set(0, 0.14, 0);
      hmd02.setPose({ visorIntensity: 0.95 });
      minatoRoom.root.visible = false;

      camera.position.set(lerp(0.24, -0.22, smooth(u)), lerp(1.08, 0.72, smooth(u)), lerp(1.12, 1.56, smooth(u)));
      lookTarget.set(0.0, lerp(1.04, 0.62, smooth(u)), 0.30);
      dof = { focusDist: 1.1, aperture: 0.006, halation: 0.28 };
      simLog = {
        tag: 'COMPLETE AUTONOMOUS MASS // 7.62 kg (4.3× HMD-01)',
        title: '吊りはかりの表示はきっかり『7.62 kg』——「明日、お前はもうこの部屋を歩けるんだな」',
        detail: '7ヶ月半の苦労が報われると信じて眠りにつく。足元に口を開ける『断崖』も知らずに',
      };
    }
  }
  // =========================================================================
  // CUT 02 (26..62s): Day 446 20:00 — First Stand Attempt -> 0.1s Hope -> 0.3s Violent Explosion -> E-Stop!
  // =========================================================================
  else if (t < 62.0) {
    world.setActiveSet('room203');
    workstationRoom.update(t, true);

    if (t < 37.0) {
      // 26..37s: Lowered onto Double 20mm EVA Mat + 10cm Belt Slack + Right Hand Hovering Over Crimson E-Stop!
      const u = (t - 26.0) / 11.0;
      lights.setPreset('room_tense_test');
      hmd02Anchor.position.set(0, lerp(0.11, 0.042, smooth(u * 1.4)), 0);
      hmd02.setPose({ hipLPitch: -0.18, kneeL: 0.36, hipRPitch: -0.18, kneeR: 0.36, visorIntensity: 1.25 });
      // Minato stepping half-step outside gantry toward the desk crimson E-stop button!
      minatoRoom.root.position.set(0.76, 0.0, -0.34);
      minatoRoom.root.rotation.y = -Math.PI * 0.78;
      minatoRoom.rightArm.shoulder.rotation.set(-0.92, 0.12, -0.12);
      minatoRoom.rightArm.elbow.rotation.set(-0.42, 0, 0);

      camera.position.set(lerp(-0.92, 0.88, smooth(u)), lerp(0.86, 0.92, smooth(u)), lerp(1.62, 1.25, smooth(u)));
      lookTarget.set(lerp(0.05, 0.25, smooth(u)), lerp(0.46, 0.56, smooth(u)), lerp(0.28, -0.10, smooth(u)));
      dof = { focusDist: 1.5, aperture: 0.007, halation: 0.28 };
      simLog = {
        tag: 'DAY 446 // JUNE 25 SUN 20:00 · FIRST REAL-WORLD STAND TEST',
        title: '極厚20mm EVAマットへ降ろし、赤の非常停止に手を添える ——「初起立、スタート！」',
        detail: '200Hzで姿勢を読み、三億歩の知能が25.2V・12基の人工筋肉へ初めて力を解き放つ',
      };
    } else if (t < 42.0) {
      // 37..42s: First 0.1s Hopeful Extension (`よし！`) -> Sudden High-Pitched Shriek (`キィィィン…ガガッ！！`)!
      const u = (t - 37.0) / 5.0;
      lights.setPreset('room_tense_test');
      const tremor = u > 0.55 ? Math.sin(t * 72.0) * ((u - 0.55) / 0.45) * 0.22 : 0;
      hmd02.setPose({
        liftY: lerp(-0.04, 0.02, smooth(Math.min(1, u * 1.8))),
        hipLPitch: lerp(-0.18, -0.02, smooth(u)) + tremor,
        kneeL: lerp(0.36, 0.06, smooth(u)) + Math.abs(tremor) * 1.1,
        hipRPitch: lerp(-0.18, -0.02, smooth(u)) - tremor,
        kneeR: lerp(0.36, 0.06, smooth(u)) + Math.abs(tremor) * 1.1,
        visorIntensity: 1.5 + Math.abs(tremor) * 4.0,
      });
      minatoRoom.root.visible = false;

      camera.position.set(lerp(0.24, -0.18, smooth(u)), 0.52, lerp(1.38, 1.18, smooth(u)));
      lookTarget.set(0.0, 0.42, 0.30);
      dof = { focusDist: 1.05, aperture: 0.006, halation: 0.34 };
      simLog = {
        tag: 't = +0.10s -> +0.18s // HIGH-FREQUENCY METALLIC SHRIEK!',
        title: '最初の0.1秒で両膝が伸びた直後 ——『キィィィン……ガガッ！！』金属の悲鳴！',
        detail: '右足首と左股関節から、聞いたこともない高周波の発振が全身へ広がり始める',
      };
    } else if (t < 53.0) {
      // 42..53s: THE 0.3s VIOLENT BLACK-PANTHER OSCILLATION EXPLOSION! (Gouged EVA Mat Flying + Gantry Shaking!)
      const u = (t - 42.0) / 11.0;
      lights.setPreset('room_alarm_chaos');
      const osc1 = Math.sin(t * 46.0);
      const osc2 = Math.cos(t * 53.0);
      // Violent camera handheld shake + entire 180cm steel gantry rattling!
      const shake = (1 - u * 0.2) * 0.024;
      gantryPivot.rotation.set(osc1 * 0.022, 0, osc2 * 0.028);

      // Left aluminum heel gouges 20mm EVA mat & blasts chunks outward; right knee kicks chest-high; body flings sideways!
      matEstopRig.updateDebris(clamp01((u - 0.08) * 2.2));
      const fling = smooth(clamp01((u - 0.28) / 0.35));
      hmd02Anchor.position.set(fling * 0.22 + osc1 * 0.06, 0.14 + fling * 0.12 + Math.abs(osc2) * 0.05, fling * 0.12);
      hmd02Anchor.rotation.set(osc2 * 0.42, osc1 * 0.38, -fling * 0.48 + osc1 * 0.25);
      hmd02.setPose({
        torsoPitch: osc1 * 0.35,
        hipLPitch: -0.95 + osc1 * 0.65,
        kneeL: 0.3 + Math.abs(osc2) * 1.45,
        hipRPitch: -1.45 + osc2 * 0.55, // Right knee violently slamming up toward chest!
        kneeR: 1.65 - Math.abs(osc1) * 0.9,
        armLPitch: -1.1 + osc2 * 0.8,
        armRPitch: 0.8 + osc1 * 0.9,
        armLRoll: 0.65,
        armRRoll: -0.65,
        visorIntensity: 2.8,
      });
      // Minato flinching back just outside gantry (8cm from the flying 7.62kg titan!)
      minatoRoom.root.position.set(0.84, 0.0, 0.22);
      minatoRoom.root.rotation.y = -Math.PI * 0.55;
      minatoRoom.leftArm.shoulder.rotation.set(-1.1, 0, 0.35);
      minatoRoom.rightArm.shoulder.rotation.set(-1.05, 0, -0.35);

      camera.position.set(lerp(-0.55, 0.42, smooth(u)) + osc1 * shake, 0.72 + osc2 * shake, lerp(1.88, 1.76, smooth(u)));
      lookTarget.set(0.14, 0.54, 0.30);
      dof = { focusDist: 1.60, aperture: 0.007, halation: 0.40 };
      simLog = {
        tag: 'SIM-TO-REAL CATASTROPHE // 0.3s VIOLENT OSCILLATION EXPLOSION!',
        title: '『ガンッ！！ バァンッ！！』7.62kg黒豹の狂乱 —— 20mm防音マット破壊＆櫓激震！',
        detail: '湊の左膝わずか8cm手前で、背中の登山用スリングが『ビシィッ！！』と空中で食い止める！',
      };
    } else {
      // 53..62s: Crimson Mushroom E-Stop Slammed (`バチンッ！`) -> Limp Hanged Marionette Swaying Above Torn Rubber Chunks!
      const u = (t - 53.0) / 9.0;
      lights.setPreset('room_cold_aftermath');
      matEstopRig.updateDebris(1.0); // Shredded black rubber chunks scattered across floor!
      matEstopRig.setEstopPressed(1.0);
      const sway = Math.sin(t * 2.1) * 0.09;
      hmd02Anchor.position.set(sway * 0.35, 0.22, 0.0);
      hmd02Anchor.rotation.set(0.18, sway * 0.6, sway);
      hmd02.setPose({
        torsoPitch: 0.28, // Lifeless slumped head/torso like a hanged marionette!
        hipLPitch: 0.16, kneeL: 0.34,
        hipRPitch: 0.22, kneeR: 0.28,
        armLPitch: 0.32, armRPitch: 0.32,
        visorIntensity: 0.04, // Power DEAD after relay cut!
      });
      minatoRoom.root.visible = false;

      if (u < 0.38) {
        // First 3.4s: Macro slam of the Giant Red Mushroom E-Stop (`バチンッ！`)!
        camera.position.set(0.84, 0.96, -0.58);
        lookTarget.set(0.58, 0.78, -0.92);
        dof = { focusDist: 0.46, aperture: 0.005, halation: 0.30 };
      } else {
        // Remaining 5.6s: Full-frame chilling shot of the limp hanging 7.62kg titan swaying over the torn black EVA chunks!
        const k = smooth((u - 0.38) / 0.62);
        camera.position.set(lerp(-0.42, 0.32, k), lerp(0.68, 0.74, k), lerp(1.92, 1.84, k));
        lookTarget.set(0.0, lerp(0.52, 0.58, k), 0.30);
        dof = { focusDist: 1.60, aperture: 0.007, halation: 0.26 };
      }
      simLog = {
        tag: 'E-STOP ENGAGED // 25.2V MAIN RELAY CUT · AFTERMATH',
        title: '『バチンッ！』主電源遮断 —— 首を吊られた操り人形と、食いちぎられた黒いゴム片',
        detail: '「なんでだよ……画面の中では、三億歩も綺麗に歩いてたじゃないか……！！」',
      };
    }
  }
  // =========================================================================
  // CUT 03 (62..76s): 5 Days Underwater — Half Gain -> Collapsing Like a Wet Cardboard Box!
  // =========================================================================
  else if (t < 76.0) {
    const u = (t - 62.0) / 14.0;
    world.setActiveSet('room203');
    lights.setPreset('room_cold_aftermath');
    workstationRoom.update(t, true);
    matEstopRig.updateDebris(1.0);
    minatoRoom.root.visible = false;

    // Gain halved to 50%: as soon as soles touch mat, knees buckle helplessly like a wet cardboard box!
    const collapse = smooth(clamp01((u - 0.14) / 0.48));
    hmd02Anchor.position.set(0, lerp(0.05, 0.042, collapse), 0);
    hmd02.setPose({
      liftY: -collapse * 0.24,
      torsoPitch: collapse * 0.62,
      hipLPitch: -collapse * 1.25,
      kneeL: collapse * 2.15,
      hipRPitch: -collapse * 1.22,
      kneeR: collapse * 2.12,
      armLPitch: collapse * 0.72,
      armRPitch: collapse * 0.72,
      visorIntensity: 0.35,
    });

    camera.position.set(lerp(0.88, -0.68, smooth(u)), lerp(0.76, 0.48, smooth(u)), lerp(1.48, 1.32, smooth(u)));
    lookTarget.set(0.0, lerp(0.42, 0.24, collapse), 0.30);
    dof = { focusDist: 1.25, aperture: 0.008, halation: 0.26 };
    simLog = {
      tag: 'GAIN ×0.50 TEST // WET-CARDBOARD COLLAPSE (NO MIDDLE GROUND)',
      title: '力を半減すれば『濡れた段ボール箱』のようにグニャリと崩壊 —— 中間が存在しない！',
      detail: '強くすれば0.3秒で発狂、弱くすれば立ち上がることすらできない。5日間の暗い水底',
    };
  }
  // =========================================================================
  // CUT 04 (76..104s): Day 452 Midnight — Isolated Left Leg in Bench Vise + 3 Real-World Muds Autopsy!
  // =========================================================================
  else if (t < 104.0) {
    world.setActiveSet('room203');
    lights.setPreset('room_autopsy_lab');
    workstationRoom.update(t, true);
    viseDiagRig.group.visible = true;
    minatoRoom.root.visible = false;

    if (t < 86.0) {
      // 76..86s: Culprit #1 — `4.2 ms` Neural Loop Latency (Monitor + Oscillating Vise Leg!)
      const u = (t - 76.0) / 10.0;
      screens.updateDiagScreen('latency_42ms');
      viseDiagRig.updateDiagnostic(t, 'latency');

      camera.position.set(lerp(-0.18, 0.14, smooth(u)), lerp(1.06, 1.02, smooth(u)), lerp(-0.34, -0.52, smooth(u)));
      lookTarget.set(lerp(-0.04, 0.16, smooth(u)), 1.01, -1.36);
      dof = { focusDist: 0.92, aperture: 0.004, halation: 0.26 };
      simLog = {
        tag: 'AUTOPSY #01 // 4.2 ms NEURAL LATENCY (1/240s TIME LAG)',
        title: '現実の泥①『4.2ミリ秒の神経の遅れ』—— 過去の自分へ全力逆ハンドルで暴走！',
        detail: 'IMU→変換基板→Jetson推論→CAN→FOC。遅れゼロ育ちのAIは4.2msのズレで即座に発振',
      };
    } else if (t < 95.0) {
      // 86..95s: Culprit #2 — `8:1` Steel Planetary Gear & Sticky Amber Grease Stiction (`ピタッ…ツルッ！`)
      const u = (t - 86.0) / 9.0;
      screens.updateDiagScreen('stiction_8to1');
      viseDiagRig.updateDiagnostic(t, 'stiction');

      camera.position.set(lerp(-0.52, -0.18, smooth(u)), lerp(1.08, 1.04, smooth(u)), lerp(-0.62, -0.66, smooth(u)));
      lookTarget.set(-0.32, 1.04, -1.04);
      dof = { focusDist: 0.45, aperture: 0.005, halation: 0.26 };
      simLog = {
        tag: 'AUTOPSY #02 // 8:1 PLANETARY GEAR & STICKY GREASE STICTION',
        title: '現実の泥②『歯車とグリスの静止摩擦』—— 動き出しの引っかかり（ピタッ…ツルッ！）',
        detail: '繊細な弱トルク命令がグリスの粘りに負けて1mmも回らず、濡れた紙のように崩れていた',
      };
    } else {
      // 95..104s: Culprit #3 — Resonant Carbon-Bone Micro-Vibration Shooting Into Chest IMU!
      const u = (t - 95.0) / 9.0;
      screens.updateDiagScreen('vibration_imu');
      viseDiagRig.updateDiagnostic(t, 'vibration');

      camera.position.set(lerp(-0.48, 0.08, smooth(u)), lerp(1.05, 1.02, smooth(u)), lerp(-0.54, -0.52, smooth(u)));
      lookTarget.set(lerp(-0.28, 0.02, smooth(u)), 1.01, -1.24);
      dof = { focusDist: 0.72, aperture: 0.004, halation: 0.30 };
      simLog = {
        tag: 'AUTOPSY #03 // 142 Hz CARBON-BONE RESONANCE -> IMU PANIC',
        title: '現実の泥③『骨を伝わる微かな震え』—— 弦楽器の胴のように振動が胸センサへ響く！',
        detail: '無菌室の夢しか知らぬAIが、骨の微振動を「大地震が来た！」と誤認してパニック発振',
      };
    }
  }
  // =========================================================================
  // CUT 05 (104..130s): Day 455 Afternoon — `自動制御` Bode Plot Lecture & Humid July Skybridge Epiphany!
  // =========================================================================
  else if (t < 130.0) {
    if (t < 118.0) {
      // 104..118s: Stepped `自動制御` Lecture Hall — Bode Plot (-180° Dead-Time Oscillation) & Silver-Haired Professor!
      const u = (t - 104.0) / 14.0;
      world.setActiveSet('lectureAutoCtrl');
      lights.setPreset('lecture_july_cloudy');

      camera.position.set(lerp(-0.45, 0.42, smooth(u)), lerp(1.54, 1.56, smooth(u)), lerp(0.95, 0.65, smooth(u)));
      lookTarget.set(-0.08, 1.56, -2.45);
      dof = { focusDist: 2.8, aperture: 0.004, halation: 0.22 };
      simLog = {
        tag: 'DAY 455 // AUTOMATIC CONTROL · BODE PLOT & SYSTEM IDENTIFICATION',
        title: '『自動制御』ボード線図 —— 現実の機械に遅れゼロ・摩擦ゼロは存在しない！',
        detail: '様々な周波数の波を入れ、相手のありのままのクセを測り取る『システム同定』が開眼の鍵',
      };
    } else {
      // 118..130s: Humid July Overcast Skybridge Walkway — Scenic 3/4 Medium Shot of Minato Leaning on Rail!
      const u = (t - 118.0) / 12.0;
      world.setActiveSet('corridorSkybridge');
      lights.setPreset('skybridge_july_wind');

      camera.position.set(lerp(1.62, 1.24, smooth(u)), lerp(1.54, 1.48, smooth(u)), lerp(0.62, 0.08, smooth(u)));
      lookTarget.set(0.0, 1.38, -0.62);
      dof = { focusDist: 1.75, aperture: 0.006, halation: 0.24 };
      simLog = {
        tag: 'JULY SKYBRIDGE EPIPHANY // BRING REAL-WORLD MUD INTO THE DREAM!',
        title: '「……俺、あいつらを『綺麗すぎる温室』で育ててたんだな」',
        detail: '4.2msの遅れも、グリスの粘りも、骨の震えも——すべて測って『夢の世界』へ丸ごと持ち込む！',
      };
    }
  }
  // =========================================================================
  // CUT 06 (130..150s): Day 455 Night — Hand on Cool Carbon Body & Listening to the Body's Voice!
  // =========================================================================
  else {
    const u = (t - 130.0) / 20.0;
    world.setActiveSet('room203');
    lights.setPreset('room_summer_hope');
    workstationRoom.update(t, true);
    screens.updateDiagScreen('sysid_sweep');

    // HMD-02 hangs peacefully in the 180cm gantry as gentle cyan sine-sweep ripples pulse across its muscles!
    hmd02Anchor.position.set(0, 0.18, 0);
    const gentleWave = Math.sin(t * 2.6) * 0.14;
    hmd02.setPose({
      hipLPitch: gentleWave,
      kneeL: Math.max(0.08, -gentleWave * 1.4),
      hipRPitch: -gentleWave * 0.6,
      kneeR: Math.max(0.08, gentleWave * 1.1),
      visorIntensity: 1.25,
    });
    sweepMat.opacity = u > 0.35 ? (0.45 + Math.sin(t * 5.0) * 0.3) * smooth((u - 0.35) / 0.25) : 0;
    for (let i = 0; i < sweepRings.length; i++) {
      sweepRings[i].scale.setScalar(0.9 + Math.sin(t * 4.5 + i * 1.2) * 0.22);
    }

    // Minato stands beside the 180cm gantry (zero leg clipping!), gently resting his right hand toward HMD-02!
    minatoRoom.root.position.set(0.66, 0.0, 0.36);
    minatoRoom.root.rotation.y = -Math.PI * 0.44;
    minatoRoom.leftLeg.hipJoint.rotation.x = 0;
    minatoRoom.rightLeg.hipJoint.rotation.x = 0;
    minatoRoom.rightArm.shoulder.rotation.set(-0.78, 0.18, -0.22);
    minatoRoom.rightArm.elbow.rotation.set(-0.22, 0, 0);
    minatoRoom.leftArm.shoulder.rotation.set(-0.18, 0, 0.10);

    if (u < 0.68) {
      const k = smooth(u / 0.68);
      camera.position.set(lerp(-0.62, -0.48, k), lerp(1.06, 1.02, k), lerp(2.12, 2.02, k));
      lookTarget.set(0.24, 0.78, 0.28);
      dof = { focusDist: 1.85, aperture: 0.006, halation: 0.30 };
    } else {
      // Final wide heroic pull-back showing Minato, HMD-02 glowing softly in the 180cm gantry & the System-ID sweep monitor!
      const k = smooth((u - 0.68) / 0.32);
      camera.position.set(lerp(-0.48, -0.82, k), lerp(1.02, 1.10, k), lerp(2.02, 2.38, k));
      lookTarget.set(0.20, 0.76, 0.18);
      dof = { focusDist: 2.15, aperture: 0.005, halation: 0.30 };
    }
    simLog = {
      tag: 'END OF CHAPTER 16 // DAY 455 · BUDGET ¥243,820',
      title: '「ごめんな。お前の本当の身体の声を聴かずに、綺麗な夢を押し付けてた」',
      detail: '次章：第17章『身体の声を聴く夏』—— 実機の遅れと粘りを刻むシステム同定＆7.62kg初起立へ！',
    };
  }

  if (hudCb) hudCb({ simLog });
  return dof;
}
