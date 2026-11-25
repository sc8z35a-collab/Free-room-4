export const CH20_DURATION = 150.0;

export const CH20_SCENES = [
  { id: 1, start: 0,   end: 24,  jp: 'Day 519 深夜 · ビブラムソール装着 ＆ 520日間・累計投資¥921,880の軌跡' },
  { id: 2, start: 24,  end: 48,  jp: 'Day 520 午前5時05分 · 夜明けの欅並木——初めての『むき出しのアスファルト』へ！' },
  { id: 3, start: 48,  end: 78,  jp: '目隠し未整地踏破 · 黄色い点字ブロック ＆ 枯れ葉の下の『丸い小石（ジャリッ！！）』' },
  { id: 4, start: 78,  end: 104, jp: '午前5時35分 · 金色の朝日の矢が降り注ぐ並木道 ＆ 倉田先輩の缶コーヒー乾杯！' },
  { id: 5, start: 104, end: 126, jp: '駐輪場の脇 · 朝日に伸びる二つの影 ＆ バイザーと拳をかすめる一枚の黄色い葉' },
  { id: 6, start: 126, end: 150, jp: '【完】五百二十日目のストライド ·「帰って新米炊こう」—— 次の季節へ並んで歩み去る' },
];

export const CH20_SUBTITLES = [
  { start: 0.4,   end: 11.4,  speaker: 'ナレーション', text: '最後の7日間、4,096体は坂道と段差と小石原を歩いた。湊は登山靴用のビブラムソールを切り出して足裏へ貼る——初めての遠足に出かける子供に新しい靴を履かせるように。' },
  { start: 11.6,  end: 23.8,  speaker: '佐伯 湊', text: 'Day 519深夜。失敗のみかん箱、17ヶ月で稼いだ¥1,064,000と投資¥921,880、本棚の『HMD-01』。「……長かったな。本当に、長かった」' },

  { start: 24.4,  end: 36.2,  speaker: 'ナレーション', text: 'Day 520午前5時05分。群青から白磁へ溶ける夜明けの欅並木。生まれて初めてマットもベルトもない『むき出しのアスファルト』へ8.18kgの足を下ろす——コツン。' },
  { start: 36.4,  end: 47.8,  speaker: '佐伯 湊', text: '『……シュン、クッ』2度の路面傾斜を足首の電流が感じ取り垂直に自立！ 湊は両手をパーカーのポケットへ入れ左隣へ並んだ。「……いこうか、『HMD-02』」' },

  { start: 48.4,  end: 61.8,  speaker: 'ナレーション', text: 'カツ、トン……カツ、トン……。人間のスニーカーとロボットの澄んだ足音が重なる！ カメラのない『HMD-02』が黄色い点字ブロックの5mm突起を柔らかい足首で何事もなく乗り越えた！' },
  { start: 62.0,  end: 77.8,  speaker: '佐伯 湊', text: '『ジャリッ！！』枯れ葉の下の丸い小石を踏み左足が5cm滑る！ 湊は非常停止の指を止め相棒を信じた——両腕をパッと開き右足を『タンッ！』と踏み出して見事復帰！「……やるじゃねえか」' },

  { start: 78.4,  end: 90.8,  speaker: '倉田', text: '午前5時35分、東の雲が割れ金色の朝日の矢が並木道へ降り注ぐ！ 研究棟から出た倉田先輩が缶コーヒーを持ったまま石のように固まった。「…………うそだろ……」' },
  { start: 91.0,  end: 103.8, speaker: '倉田', text: '「ははっ！ お前ほんっとうに一人で『外の世界』まで連れてきやがったのかよ！！」——温かい缶コーヒーを乾杯のように掲げる。「完敗だよ、佐伯。お前の勝ちだ。……いい相棒になったな」' },

  { start: 104.4, end: 115.8, speaker: 'ナレーション', text: '520日前に靴先を見下ろしていた『駐輪場の脇』で足を止める。朝露のアスファルトに、湊の長い影と72cmの小さな人間の影が、二本くっきりと並んで伸びていた。' },
  { start: 116.0, end: 125.8, speaker: '佐伯 湊', text: '欅の梢から一枚の黄色い葉が舞い落ち、黒いバイザーと丸いゴムの拳をかすめる。「なあ『HMD-02』、まだ自分の『目』も葉を拾う『五本の指』も持ってないんだよな」——終わらない夢が胸で跳ねる。' },

  { start: 126.4, end: 137.8, speaker: '佐伯 湊', text: '「よし。帰ろうぜ、腹減った。帰って新米炊こう」——滑らかに180度ターンした相棒の温かい黒い肩を、友人のようにポンと一度叩いた。' },
  { start: 138.0, end: 149.8, speaker: 'ナレーション', text: 'カツ、トン……カツ、トン……。朝日の満ちた欅並木を正門へ向かって並んで歩いていく。五百二十日目の光の中で、二つの足音はまだ見ぬ次の季節へと軽やかに続いていった——【完】' },
];

export function getCh20Scene(t) {
  for (let i = CH20_SCENES.length - 1; i >= 0; i--) { if (t >= CH20_SCENES[i].start) return CH20_SCENES[i]; }
  return CH20_SCENES[0];
}
export function getCh20Subtitle(t) {
  for (let i = 0; i < CH20_SUBTITLES.length; i++) {
    const s = CH20_SUBTITLES[i];
    if (t >= s.start && t <= s.end) return { speaker: s.speaker, text: s.text };
  }
  return null;
}
export function getCh20Cutin(t) {
  if (t >= 26.0 && t < 35.0) return { text: 'DAY 520（9月7日 05:05）— 生まれて初めての『むき出しのアスファルト』へ！', tone: 'amber' };
  if (t >= 52.0 && t < 60.0) return { text: '視覚ゼロ未整地踏破：黄色い点字ブロックの5mm突起を柔らかく吸収！', tone: 'emerald' };
  if (t >= 66.0 && t < 74.5) return { text: '『ジャリッ！！』小石スリップ → 非常停止を押し留め自律バランス復帰！！', tone: 'emerald' };
  if (t >= 80.5 && t < 90.0) return { text: '昇る金色の朝日の矢 —— 倉田先輩「完敗だよ、佐伯。いい相棒になったな」', tone: 'amber' };
  if (t >= 134.0 && t < 147.0) return { text: '『五百二十日目のストライド』完 —— Simulation Continues...', tone: 'emerald' };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

function animateSideBySideWalk(minato, hmd02, zPos, t, walking = true, facingBack = false, slipEnv = 0) {
  const dir = facingBack ? 0 : Math.PI;
  const ph = walking ? t * 4.4 : 0;
  const sL = walking ? Math.sin(ph) : 0;
  const sR = walking ? Math.sin(ph + Math.PI) : 0;

  // Minato on Left (-0.42), hands comfortably in hoodie pockets!
  minato.root.position.set(-0.42, 0, zPos);
  minato.root.rotation.set(0, dir, 0);
  minato.leftLeg.hipJoint.rotation.x = sL * 0.36;
  minato.rightLeg.hipJoint.rotation.x = sR * 0.36;
  minato.leftArm.shoulder.rotation.set(0.18, 0, 0.14);
  minato.leftArm.elbow.rotation.set(-0.55, 0, 0);
  minato.rightArm.shoulder.rotation.set(0.18, 0, -0.14);
  minato.rightArm.elbow.rotation.set(-0.55, 0, 0);

  // HMD-02 on Right (+0.36), marching shoulder-to-shoulder at Minato's waist height!
  hmd02.root.position.set(0.36 + slipEnv * 0.12, 0.028, zPos);
  hmd02.root.rotation.set(0, dir, -slipEnv * 0.16);
  hmd02.setGoldResistorHeat(0.28 + slipEnv * 0.55);
  hmd02.setPose({
    liftY: walking ? Math.abs(Math.cos(ph)) * 0.022 - slipEnv * 0.04 : Math.sin(t * 2.2) * 0.008,
    torsoPitch: walking ? 0.05 : 0.0,
    hipLPitch: sL * 0.44 - slipEnv * 0.35,
    kneeL: sL < 0 ? 0.05 : sL * 0.65 + slipEnv * 0.45,
    hipLRoll: slipEnv * 0.25,
    hipRPitch: sR * 0.44,
    kneeR: sR < 0 ? 0.05 : sR * 0.65 + slipEnv * 0.35,
    armLPitch: -sL * 0.38,
    armLRoll: 0.12 + slipEnv * 1.15,
    armRPitch: -sR * 0.38,
    armRRoll: -0.12 - slipEnv * 1.15,
    visorIntensity: 1.45,
  });
}

export function evaluateCh20Timeline(t, world, screens, lights, camera, lookTarget, hudCb) {
  const { hmd02Room, hmd02Campus, vibramMacro, campusRig, minatoCampus, kurataCampus } = world;

  vibramMacro.visible = false;
  campusRig.heroLeaf.visible = false;
  campusRig.pebble.position.set(0.28, 0.022, -10.4);

  let dof = { focusDist: 1.6, aperture: 0.006, halation: 0.30 };
  let simLog = null;

  // CUT 01 (0..24s): Vibram Lug Sole Fitting -> Day 519 Midnight 520-Day Final Ledger!
  if (t < 24.0) {
    world.setActiveSet('room519');
    lights.setPreset('room_day519_night');
    hmd02Room.setPose({ visorIntensity: 0.85 });

    if (t < 11.5) {
      const u = t / 11.5;
      vibramMacro.visible = true;
      camera.position.set(lerp(-0.24, 0.24, smooth(u)), lerp(0.96, 0.92, smooth(u)), lerp(-0.56, -0.58, smooth(u)));
      lookTarget.set(0.0, 0.78, -0.96);
      dof = { focusDist: 0.45, aperture: 0.005, halation: 0.24 };
      simLog = {
        tag: 'DAY 519 // VIBRAM OUTDOOR LUG SOLES FITTED TO HMD-02',
        title: '登山靴用の溝付きビブラムソールを足裏へ —— 初めての遠足へ新しい靴を履かせるように',
        detail: '最後の7日間、坂道・段差・小石原を『目隠し』で歩く未整地強化学習を完了',
      };
    } else {
      const u = (t - 11.5) / 12.5;
      camera.position.set(lerp(0.10, 0.0, smooth(u)), 1.02, lerp(-0.62, -0.74, smooth(u)));
      lookTarget.set(0.0, 1.02, -1.42);
      dof = { focusDist: 0.72, aperture: 0.0035, halation: 0.26 };
      simLog = {
        tag: 'DAY 519 MIDNIGHT // 17 MONTHS · ¥921,880 INVESTED · ZERO DEBT',
        title: '「……長かったな。本当に、長かった」—— 明朝、五百二十日目の朝が来る',
        detail: 'みかん箱の失敗も、本棚のHMD-01も、すべての軌跡を背に午前4時半へ目覚ましをセット',
      };
    }
  }
  // CUT 02 (24..48s): Day 520 05:05 — Deep Indigo-to-Porcelain Dawn Zelkova Promenade & Raw Asphalt Start!
  else if (t < 48.0) {
    const u = (t - 24.0) / 24.0;
    world.setActiveSet('dawnCampus');
    lights.setPreset('dawn_indigo_mist');
    campusRig.updateAtmosphere(t, 0.15 * u);

    const walking = t >= 37.5;
    const zPos = walking ? lerp(1.2, -3.2, clamp01((t - 37.5) / 10.5)) : 1.2;
    animateSideBySideWalk(minatoCampus, hmd02Campus, zPos, t, walking, false, 0);

    camera.position.set(lerp(1.45, 0.78, smooth(u)), lerp(0.95, 0.88, smooth(u)), zPos - lerp(2.2, 2.8, smooth(u)));
    lookTarget.set(0.0, 0.72, zPos);
    dof = { focusDist: 2.6, aperture: 0.005, halation: 0.30 };
    simLog = {
      tag: 'DAY 520 // SEP 7 THU 05:05 · DAWN ZELKOVA PROMENADE',
      title: '生まれて初めての『むき出しのアスファルト』——「……いこうか、『HMD-02』」',
      detail: 'マットもベルトもない本物の大地。両手をポケットに入れ、一人と一体が肩を並べて踏み出す',
    };
  }
  // CUT 03 (48..78s): Yellow Tactile Braille Blocks (48..62s) & Hidden Round Pebble Slip Recovery (62..78s)!
  else if (t < 78.0) {
    world.setActiveSet('dawnCampus');
    lights.setPreset('dawn_porcelain_early');
    campusRig.updateAtmosphere(t, 0.35);

    if (t < 62.0) {
      const u = (t - 48.0) / 14.0;
      const zPos = lerp(-3.6, -7.2, u);
      animateSideBySideWalk(minatoCampus, hmd02Campus, zPos, t, true, false, 0);

      camera.position.set(lerp(1.55, 1.15, smooth(u)), 0.56, zPos - 1.95);
      lookTarget.set(0.15, 0.38, zPos - 0.15);
      dof = { focusDist: 2.1, aperture: 0.005, halation: 0.28 };
      simLog = {
        tag: 'BLIND UNEVEN TERRAIN // YELLOW TACTILE BRAILLE BLOCKS',
        title: 'カツ、トン……カメラなしで黄色い点字ブロックの5mm突起を柔らかい足首で踏破！',
        detail: '人間のスニーカーとロボットの足音が、夜明けの並木道にまったく同じテンポで響く',
      };
    } else {
      const u = (t - 62.0) / 16.0;
      const zPos = lerp(-8.8, -12.6, u);
      const slipEnv = u >= 0.25 && u <= 0.58 ? Math.sin(((u - 0.25) / 0.33) * Math.PI) : 0;
      animateSideBySideWalk(minatoCampus, hmd02Campus, zPos, t, true, false, slipEnv);
      // Pebble rolls away sharply on `ジャリッ！！`
      const roll = clamp01((u - 0.26) / 0.32);
      campusRig.pebble.position.set(0.28 + roll * 0.55, 0.022, -10.4 - roll * 0.25);

      camera.position.set(lerp(-1.15, 1.25, smooth(u)), 0.62, zPos - 1.85);
      lookTarget.set(0.25, 0.45, zPos);
      dof = { focusDist: 2.0, aperture: 0.005, halation: 0.30 };
      simLog = {
        tag: 'PEBBLE SLIP RECOVERY // TRUST OVER E-STOP!',
        title: '『ジャリッ！！』枯れ葉の下の丸い小石で5cmスリップ → 両腕展開＆自律復帰！「やるじゃねえか」',
        detail: 'ポケットの中の非常停止に親指が触れかけた——だが湊は指を止め、相棒を信じ抜いた',
      };
    }
  }
  // CUT 04 (78..104s): 05:35 — GOLDEN SUNRISE GOD-RAYS BURST + Senior Kurata's Canned Coffee Toast!!
  else if (t < 104.0) {
    const u = (t - 78.0) / 26.0;
    world.setActiveSet('dawnCampus');
    lights.setPreset('golden_sunrise_rays');
    campusRig.updateAtmosphere(t, smooth(clamp01(u * 2.0)));

    const zPos = lerp(-13.8, -16.8, smooth(u));
    animateSideBySideWalk(minatoCampus, hmd02Campus, zPos, t, true, false, 0);

    // Kurata raises his warm canned coffee in a joyful toast ("完敗だよ、佐伯。いい相棒になったな")!
    const toast = smooth(clamp01((u - 0.35) / 0.35));
    kurataCampus.rightArm.shoulder.rotation.set(-0.45 - toast * 1.15, 0.15, -0.15);
    kurataCampus.rightArm.elbow.rotation.set(-0.55 - toast * 0.35, 0, 0);

    camera.position.set(lerp(-1.35, -0.95, smooth(u)), lerp(1.12, 1.24, smooth(u)), lerp(-17.8, -19.2, smooth(u)));
    lookTarget.set(0.85, 0.96, -15.4);
    dof = { focusDist: 3.6, aperture: 0.004, halation: 0.42 };
    simLog = {
      tag: '05:35 AM // GOLDEN SUNRISE GOD-RAYS · SENIOR KURATA TOAST',
      title: '東の雲が割れ金色の朝日の矢が降り注ぐ —— 倉田「完敗だよ、佐伯。いい相棒になったな」',
      detail: '徹夜明けの缶コーヒーを乾杯のように掲げ、誰よりも嬉しそうに笑った',
    };
  }
  // CUT 05 (104..126s): Day-1 Bicycle Parking Lot — Dual Long Morning Shadows & Falling Yellow Zelkova Leaf!
  else if (t < 126.0) {
    const u = (t - 104.0) / 22.0;
    world.setActiveSet('dawnCampus');
    lights.setPreset('golden_sunrise_rays');
    campusRig.updateAtmosphere(t, 1.0);

    const zStop = -22.2;
    animateSideBySideWalk(minatoCampus, hmd02Campus, zStop, t, false, false, 0);

    // Hero Single Golden-Yellow Leaf fluttering down past HMD-02's dark visor and round rubber fist!
    campusRig.heroLeaf.visible = true;
    const lfU = clamp01((u - 0.15) / 0.72);
    campusRig.heroLeaf.position.set(
      0.36 + 0.14 * Math.sin(lfU * Math.PI * 2.2),
      lerp(1.38, 0.04, lfU),
      zStop - 0.06 + Math.cos(lfU * Math.PI) * 0.08
    );
    campusRig.heroLeaf.rotation.set(lfU * 5.0, lfU * 3.5, lfU * 2.0);

    camera.position.set(lerp(1.42, 0.96, smooth(u)), lerp(1.18, 0.88, smooth(u)), zStop - lerp(2.65, 1.85, smooth(u)));
    lookTarget.set(0.05, lerp(0.55, 0.62, smooth(u)), zStop);
    dof = { focusDist: 2.2, aperture: 0.005, halation: 0.40 };
    simLog = {
      tag: 'DAY-1 BICYCLE PARKING LOT // TWO SIDE-BY-SIDE SHADOWS & GOLDEN LEAF',
      title: '朝日に伸びる二つの影、バイザーと丸い拳をかすめる一枚の黄色い葉',
      detail: '「まだ自分の『目』も『五本の指』も持ってないんだよな」——終わらない次の夢が胸で跳ねる',
    };
  }
  // CUT 06 (126..150s): GRAND FINALE — 180° Turn & Walking Away Side-by-Side Into the Golden Morning Light! 【完】
  else {
    const u = (t - 126.0) / 24.0;
    world.setActiveSet('dawnCampus');
    lights.setPreset('golden_sunrise_finale');
    campusRig.updateAtmosphere(t, 1.0);

    const walkU = clamp01((u - 0.14) / 0.86);
    const zPos = lerp(-22.2, -13.5, walkU);
    animateSideBySideWalk(minatoCampus, hmd02Campus, zPos, t, u >= 0.14, true, 0);

    // Majestic rising crane pull-back as Minato & HMD-02 walk away side-by-side into the sunlit campus!
    camera.position.set(lerp(0.65, 0.0, smooth(u)), lerp(1.02, 2.35, smooth(u)), lerp(-24.8, -26.2, smooth(u)));
    lookTarget.set(0.0, lerp(0.86, 0.95, smooth(u)), zPos + 2.0);
    dof = { focusDist: 5.5, aperture: 0.004, halation: 0.46 };
    simLog = {
      tag: 'THE END // DAY 520 · FIVE HUNDRED TWENTY DAYS OF STRIDE 【完】',
      title: '「よし。帰ろうぜ、腹減った。帰って新米炊こう」—— 二つの足音は次の季節へ！',
      detail: 'Simulation Continues... — 次期構想：視覚統合（VLA）＆五指触覚ハンドへ',
    };
  }

  if (hudCb) hudCb({ simLog });
  return dof;
}
