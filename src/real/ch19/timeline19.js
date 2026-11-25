export const CH19_DURATION = 150.0;

export const CH19_SCENES = [
  { id: 1, start: 0,   end: 24,  jp: '最終完全体『HMD-02』降臨 · 両腕＆頭部統合・全高720mm / 8.18kg / 16自由度！' },
  { id: 2, start: 24,  end: 46,  jp: '全身16関節の三昼夜学習 · 自然な腕振りと『鳥の翼』バランス反射を自律獲得！' },
  { id: 3, start: 46,  end: 64,  jp: 'Day 511（8月29日）· HMD-01初歩行から丸一年——「お前の続きを、やってくる」' },
  { id: 4, start: 64,  end: 86,  jp: '肩の5cm手前で凍る右手 · 11月6日の悪夢を振り払い両頬を叩く決意！' },
  { id: 5, start: 86,  end: 122, jp: '『ドンッ！！』全力掌底突き飛ばし → 鳥の翼＆25cmクロスステップ『キュッ！！』＆涙の抱擁！' },
  { id: 6, start: 122, end: 150, jp: '深夜の着信 · 田所の絶叫＆榊原恒一からの祝辞 —— 胸を張って『外の世界』へ！' },
];

export const CH19_SUBTITLES = [
  { start: 0.4,   end: 12.2,  speaker: 'ナレーション', text: '八月後半、『HMD-02』の両肩に細いカーボンパイプの両腕・丸いゴムの拳、精悍な黒バイザーの頭部が宿った！ 全高720.0mm・重量8.18kg・全16自由度の最終完全体！' },
  { start: 12.4,  end: 23.8,  speaker: 'ナレーション', text: 'もはや実験装置ではなかった。暗いバイザーの奥から真っ直ぐ見つめ返す、無口で頼もしい小さな青年が六畳間に立っていた。' },

  { start: 24.4,  end: 45.8,  speaker: 'ナレーション', text: '三昼夜の全身16関節学習。「腕を何度振れ」と一切書かずに任せた結果、自然な腕振りと——突き飛ばされた瞬間に両腕を『鳥の翼』のようにパッと広げて回転を食い止める技を自ら編み出した！' },

  { start: 46.4,  end: 63.8,  speaker: '佐伯 湊', text: 'Day 511（8月29日夜）。去年の夏、本棚の上の『HMD-01』が16cmの初3歩を踏み出してからきっかり丸一年。「……行ってくるよ。お前の続きを、やってくる」' },

  { start: 64.4,  end: 75.8,  speaker: 'ナレーション', text: '夜の河川敷高架下。自然すぎる人型ランナーの横へ並び右手を構える——だが肩の5cm手前でピタリと凍りつく。11月6日の『パキィンッ！』という破壊音が耳の奥に蘇っていた。' },
  { start: 76.0,  end: 85.8,  speaker: '佐伯 湊', text: '「何ビビってんだよ、俺は」——両頬をパチンと叩く。「一番近くで作ってきた俺自身が、こいつの強さを信じてやらなくてどうするんだ！」' },

  { start: 86.4,  end: 94.8,  speaker: 'ナレーション', text: '再び秒速0.8mで歩かせ、右足一本に8.18kgが乗る最も不安定な瞬間——湊は体重を乗せた右手の掌底で左肩を真横から『ドンッ！！』と容赦なく全力で突き飛ばした！！' },
  { start: 95.0,  end: 105.8, speaker: 'ナレーション', text: '破壊音は鳴らない！ 柳の枝のように衝撃を吸い込み、両腕が鳥の翼のように『パッ！』と跳ね上がる！ 浮いた左脚が右脛の前を剃刀のように交差し『キュッ！！』と25cm外側を踏みしめた！！' },
  { start: 106.0, end: 121.8, speaker: '佐伯 湊', text: '何事もなかったかのように両腕を下ろし歩き続ける相棒。湊は笑いながら膝をつき、温かいカーボンの両肩を抱きしめた。「……すげえよ、お前……本当に、生き物になっちゃったじゃないか……！！」' },

  { start: 122.4, end: 132.8, speaker: '田所', text: '深夜203号室、10秒の動画を送信。3分未満で田所から連続着信！『突き飛ばされた時の腕の広げ方ヤバすぎだろ、中に小さい人間入ってんじゃねえのかこれ！！ 鳥肌止まんねえ！！』' },
  { start: 133.0, end: 149.8, speaker: '榊原 恒一', text: 'そして榊原恒一から静かな返信——『あの日の僕の機体よりもずっと自然でしなやかだ。胸を張って、本物の「外の世界」の地面を歩かせてやりなさい。完成、本当におめでとう』——いざ最終章・五百二十日目の朝へ！' },
];

export function getCh19Scene(t) {
  for (let i = CH19_SCENES.length - 1; i >= 0; i--) { if (t >= CH19_SCENES[i].start) return CH19_SCENES[i]; }
  return CH19_SCENES[0];
}
export function getCh19Subtitle(t) {
  for (let i = 0; i < CH19_SUBTITLES.length; i++) {
    const s = CH19_SUBTITLES[i];
    if (t >= s.start && t <= s.end) return { speaker: s.speaker, text: s.text };
  }
  return null;
}
export function getCh19Cutin(t) {
  if (t >= 3.0 && t < 11.0) return { text: 'HMD-02 最終完全形態 誕生！（720.0mm / 8.18kg / 全16自由度）', tone: 'emerald' };
  if (t >= 29.0 && t < 37.0) return { text: '全身16関節協調学習：『鳥の翼』アームフレア反射を自律獲得！', tone: 'amber' };
  if (t >= 92.5 && t < 103.5) return { text: '『ドンッ！！』→ 鳥の翼展開＆25cmクロスステップ復帰『キュッ！！』', tone: 'emerald' };
  if (t >= 135.0 && t < 144.0) return { text: '榊原恒一より祝辞 ——「胸を張って、本物の『外の世界』へ！」', tone: 'amber' };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

export function evaluateCh19Timeline(t, world, screens, lights, camera, lookTarget, hudCb) {
  const { hmd02Room, hmd02Virtual, hmd02Viaduct, cloneArmy, viaductRig, minatoViaduct, scuffRing, scuffMat } = world;

  scuffMat.opacity = 0;
  let dof = { focusDist: 1.4, aperture: 0.007, halation: 0.30 };
  let simLog = null;

  // CUT 01 (0..24s): Hero 360° Showcase of Complete 16-DOF `HMD-02` (720.0mm / 8.18kg — Carbon Arms + Rubber Fists + Visor Head!)
  if (t < 24.0) {
    const u = t / 24.0;
    world.setActiveSet('room203');
    lights.setPreset('room_hero_reveal');
    const breathe = Math.sin(t * 2.2) * 0.008;
    hmd02Room.setPose({
      liftY: breathe,
      armLPitch: 0.06, armLRoll: 0.10, elbowL: -0.22,
      armRPitch: 0.06, armRRoll: -0.10, elbowR: -0.22,
      visorIntensity: 1.45,
    });

    const ang = lerp(-0.68, 0.72, smooth(u));
    camera.position.set(Math.sin(ang) * 1.45, lerp(0.46, 0.78, smooth(u)), 0.32 + Math.cos(ang) * 1.45);
    lookTarget.set(0.0, lerp(0.44, 0.56, smooth(u)), 0.32);
    dof = { focusDist: 1.45, aperture: 0.006, halation: 0.34 };
    simLog = {
      tag: 'COMPLETE 16-DOF FORM // 720.0mm · 8.18 kg · CARBON ARMS & VISOR',
      title: '両腕・丸いゴムの拳・精悍な黒バイザー —— 最終完全体『HMD-02』降臨！',
      detail: '実験装置から「無口で頼もしい小さな青年」へ。六畳間の空気が一変した',
    };
  }
  // CUT 02 (24..46s): 16-DOF Virtual Arena — Natural Arm Swing & Bird-Wing Balance Flare!
  else if (t < 46.0) {
    const u = (t - 24.0) / 22.0;
    world.setActiveSet('virtual');
    lights.setPreset('isaac_virtual_16dof');
    cloneArmy.updateArmy(t, 'human_stride');

    const flare = u > 0.45 && u < 0.85 ? Math.sin(((u - 0.45) / 0.40) * Math.PI) : 0;
    const ph = t * 3.8;
    const sL = Math.sin(ph), sR = Math.sin(ph + Math.PI);
    hmd02Virtual.root.position.set(flare * 0.14, Math.abs(Math.cos(ph)) * 0.02, 0.38);
    hmd02Virtual.root.rotation.set(0, 0, -flare * 0.18);
    hmd02Virtual.setPose({
      hipLPitch: sL * 0.44, kneeL: sL < 0 ? 0.05 : sL * 0.65, hipLRoll: flare * 0.35,
      hipRPitch: sR * 0.44, kneeR: sR < 0 ? 0.05 : sR * 0.65,
      armLPitch: -sL * 0.42 - flare * 0.25, armLRoll: 0.12 + flare * 1.35, elbowL: -0.18 + flare * 0.15,
      armRPitch: -sR * 0.42 - flare * 0.25, armRRoll: -0.12 - flare * 1.35, elbowR: -0.18 + flare * 0.15,
      visorIntensity: 1.5,
    });

    camera.position.set(lerp(1.35, -1.15, smooth(u)), 0.72, 1.85);
    lookTarget.set(0.0, 0.48, 0.35);
    dof = { focusDist: 1.75, aperture: 0.006, halation: 0.30 };
    simLog = {
      tag: 'FULL-BODY 16-DOF RL // NATURAL ARM SWING & BIRD-WING REFLEX',
      title: '誰にも教わらず獲得した『鳥の翼』—— 突き飛ばされると両腕を空へ大きく広げる！',
      detail: '「一番少ない電気で、一番転ばずに歩け」——ただそれだけの命令から生まれた生き物の知恵',
    };
  }
  // CUT 03 (46..64s): Day 511 (Aug 29) — Exactly 365 Days Since HMD-01's First 3 Steps!
  else if (t < 64.0) {
    const u = (t - 46.0) / 18.0;
    world.setActiveSet('room203');
    lights.setPreset('room_nostalgia_365');
    camera.position.set(lerp(-0.55, -0.82, smooth(u)), lerp(1.52, 1.48, smooth(u)), lerp(-0.55, -0.78, smooth(u)));
    lookTarget.set(-1.12, 1.44, -1.56);
    dof = { focusDist: 0.92, aperture: 0.005, halation: 0.28 };
    simLog = {
      tag: 'DAY 511 // AUG 29 · EXACTLY 365 DAYS SINCE HMD-01 FIRST 3 STEPS',
      title: '本棚の一番上の『HMD-01』を見上げる ——「……行ってくるよ。お前の続きを、やってくる」',
      detail: '去年の8月29日午前3時、16センチのすり足で涙した夜から、ちょうど丸一年',
    };
  }
  // CUT 04 (64..86s): Night Viaduct — Hand Freezing 5cm From Shoulder -> Slapping Both Cheeks in Resolve!
  else if (t < 86.0) {
    const u = (t - 64.0) / 22.0;
    world.setActiveSet('viaduct');
    lights.setPreset('viaduct_tense_ch19');
    viaductRig.updateTrain(t);

    const walkX = lerp(-1.5, 1.4, smooth(clamp01(u * 1.15)));
    const ph = t * 3.8;
    const sL = Math.sin(ph), sR = Math.sin(ph + Math.PI);
    hmd02Viaduct.root.position.set(walkX, 0.025, 0.45);
    hmd02Viaduct.root.rotation.set(0, Math.PI / 2, 0);
    hmd02Viaduct.setPose({
      hipLPitch: sL * 0.40, kneeL: sL < 0 ? 0.05 : sL * 0.60,
      hipRPitch: sR * 0.40, kneeR: sR < 0 ? 0.05 : sR * 0.60,
      armLPitch: -sL * 0.35, armRPitch: -sR * 0.35,
      visorIntensity: 1.35,
    });

    // Minato hesitates with frozen hand, then slaps cheeks in fierce determination!
    minatoViaduct.root.position.set(-0.25, 0, 1.05);
    minatoViaduct.root.rotation.y = Math.PI * 0.92;
    const slap = u > 0.65 ? Math.sin(clamp01((u - 0.65) / 0.20) * Math.PI) : 0;
    minatoViaduct.rightArm.shoulder.rotation.set(-0.95 - slap * 0.9, 0.2, -0.15 - slap * 0.4);
    minatoViaduct.rightArm.elbow.rotation.set(-0.4 - slap * 1.1, 0, 0);
    minatoViaduct.leftArm.shoulder.rotation.set(-0.2 - slap * 1.5, -0.2, 0.15 + slap * 0.4);
    minatoViaduct.leftArm.elbow.rotation.set(-0.2 - slap * 1.2, 0, 0);

    camera.position.set(lerp(0.55, -0.95, smooth(u)), lerp(1.18, 1.28, smooth(u)), lerp(2.45, 2.15, smooth(u)));
    lookTarget.set(lerp(0.0, -0.22, smooth(u)), lerp(0.75, 1.22, smooth(u)), lerp(0.55, 1.02, smooth(u)));
    dof = { focusDist: 1.85, aperture: 0.006, halation: 0.28 };
    simLog = {
      tag: 'NOV 6 TRAUMA // HAND FROZEN 5cm FROM SHOULDER',
      title: '「何ビビってんだよ、俺は」—— 両頬を叩き、相棒の強さを信じ抜く決意！',
      detail: '一番近くで作ってきた俺自身が、こいつの柔らかい筋肉を信じてやらなくてどうするんだ！',
    };
  }
  // CUT 05 (86..122s): THE LEGENDARY `0.4s` PALM SHOVE -> BIRD-WING FLARE + 25cm CROSS-STEP -> TEARFUL HUG!!
  else if (t < 122.0) {
    const u = (t - 86.0) / 36.0;
    world.setActiveSet('viaduct');
    lights.setPreset('viaduct_living_miracle');
    viaductRig.updateTrain(t + 3.0);

    if (t < 107.0) {
      // 86..107s: Full-Weight Palm Shove (`ドンッ！！`) -> Bird-Wing Arm Flare + 25cm Cross-Step (`キュッ！！`)!
      const sU = (t - 86.0) / 21.0;
      const shoveEnv = sU >= 0.26 && sU <= 0.48 ? Math.sin(((sU - 0.26) / 0.22) * Math.PI) : 0;
      const recoverEnv = sU >= 0.34 && sU <= 0.78 ? Math.sin(((sU - 0.34) / 0.44) * Math.PI) : 0;
      const ph = t * 4.0;
      const sL = Math.sin(ph), sR = Math.sin(ph + Math.PI);

      // HMD-02 walks forward along +Z toward camera, gets shoved sideways toward +X, flares BOTH arms like bird wings & cross-steps!
      const sideShift = smooth(clamp01((sU - 0.28) / 0.25)) * 0.28;
      hmd02Viaduct.root.position.set(sideShift, 0.025, lerp(-0.85, 0.95, smooth(sU)));
      hmd02Viaduct.root.rotation.set(0, -recoverEnv * 0.16, -shoveEnv * 0.24 - recoverEnv * 0.12);
      hmd02Viaduct.setGoldResistorHeat(0.2 + recoverEnv * 1.1);
      hmd02Viaduct.setPose({
        liftY: -recoverEnv * 0.075,
        torsoPitch: 0.06 + recoverEnv * 0.14,
        hipRPitch: (1 - recoverEnv) * sR * 0.40 - recoverEnv * 0.24,
        kneeR: (1 - recoverEnv) * (sR < 0 ? 0.05 : sR * 0.62) + recoverEnv * 0.68,
        hipLPitch: (1 - recoverEnv) * sL * 0.40 - recoverEnv * 0.58,
        kneeL: (1 - recoverEnv) * (sL < 0 ? 0.05 : sL * 0.62) + recoverEnv * 0.64,
        hipLRoll: recoverEnv * 0.52, // RAZOR-SHARP 25cm CROSS-STEP ACROSS RIGHT SHIN!
        // BOTH CARBON ARMS FLARE WIDE LIKE BIRD WINGS (`パッ！`)!
        armLPitch: (1 - recoverEnv) * (-sL * 0.36) - recoverEnv * 0.25,
        armLRoll: 0.12 + recoverEnv * 1.48,
        elbowL: -0.18 + recoverEnv * 0.14,
        armRPitch: (1 - recoverEnv) * (-sR * 0.36) - recoverEnv * 0.25,
        armRRoll: -0.12 - recoverEnv * 1.48,
        elbowR: -0.18 + recoverEnv * 0.14,
        visorIntensity: 1.65,
      });

      // Scuff shockwave ring right where left sole plants 25cm outside!
      scuffRing.position.set(sideShift + 0.14, 0.012, hmd02Viaduct.root.position.z + 0.06);
      scuffRing.scale.setScalar(0.6 + recoverEnv * 1.8);
      scuffMat.opacity = recoverEnv * 0.85;

      // Minato stepping in on left (-X) delivering a decisive palm shove (`掌底`)!
      minatoViaduct.root.position.set(-0.56 + shoveEnv * 0.26, 0, lerp(-0.4, 0.15, smooth(clamp01(sU * 1.4))));
      minatoViaduct.root.rotation.y = Math.PI * 0.46;
      minatoViaduct.rightArm.shoulder.rotation.set(-1.35 * (0.35 + shoveEnv * 0.65), 0, -0.12);
      minatoViaduct.rightArm.elbow.rotation.set(-0.65 * (1 - shoveEnv), 0, 0);
      minatoViaduct.leftArm.shoulder.rotation.set(-0.35, 0, 0.12);
      minatoViaduct.leftArm.elbow.rotation.set(-0.25, 0, 0);

      camera.position.set(lerp(0.55, -0.35, smooth(sU)), lerp(0.76, 0.64, smooth(sU)), lerp(1.95, 2.45, smooth(sU)));
      lookTarget.set(sideShift * 0.45, 0.48, hmd02Viaduct.root.position.z);
      dof = { focusDist: 1.95, aperture: 0.006, halation: 0.36 };
      simLog = {
        tag: 'DAY 511 // 0.4s LIVING REFLEX · BIRD-WING FLARE + 25cm CROSS-STEP!',
        title: '『ドンッ！！』→ 両腕が鳥の翼のように『パッ！』と開き『キュッ！！』と交差踏み出し復帰！！',
        detail: '機械っぽさは微塵もない——重力の中で「倒れたくない」と自ら反射した『生き物』の瞬間！',
      };
    } else {
      // 107..122s: Minato laughing and kneeling beside HMD-02, placing BOTH hands warmly on its carbon shoulders!
      const hU = (t - 107.0) / 15.0;
      hmd02Viaduct.root.position.set(0.28, 0.025, 0.95);
      hmd02Viaduct.root.rotation.set(0, -0.45, 0);
      hmd02Viaduct.setGoldResistorHeat(0.45);
      hmd02Viaduct.setPose({
        liftY: Math.sin(t * 2.5) * 0.008,
        armLPitch: 0.08, armLRoll: 0.12, armRPitch: 0.08, armRRoll: -0.12,
        visorIntensity: 1.55,
      });

      // Minato crouched/standing warmly facing HMD-02, both arms gently holding its warm carbon shoulders!
      minatoViaduct.root.position.set(-0.34, -0.38, 1.12);
      minatoViaduct.root.rotation.y = Math.PI * 0.36;
      minatoViaduct.leftLeg.hipJoint.rotation.x = -0.75;
      minatoViaduct.rightLeg.hipJoint.rotation.x = -0.75;
      minatoViaduct.rightArm.shoulder.rotation.set(-1.12, 0.25, -0.18);
      minatoViaduct.rightArm.elbow.rotation.set(-0.35, 0, 0);
      minatoViaduct.leftArm.shoulder.rotation.set(-1.12, -0.25, 0.18);
      minatoViaduct.leftArm.elbow.rotation.set(-0.35, 0, 0);

      camera.position.set(lerp(1.18, 0.85, smooth(hU)), lerp(1.12, 1.04, smooth(hU)), lerp(3.05, 2.85, smooth(hU)));
      lookTarget.set(-0.04, 0.76, 1.04);
      dof = { focusDist: 1.75, aperture: 0.006, halation: 0.34 };
      simLog = {
        tag: 'THE MOMENT IT BECAME ALIVE // WARM CARBON SHOULDERS',
        title: '「……ははっ……すげえよ、お前……本当に、生き物になっちゃったじゃないか……！！」',
        detail: '胸の奥の冷却ファンの音と、湊自身の心臓の鼓動が重なって鳴っていた',
      };
    }
  }
  // CUT 06 (122..150s): Late-Night Room 203 — Tadokoro's Hype Chat -> Sakakibara Koichi's Heartfelt Email!
  else {
    const u = (t - 122.0) / 28.0;
    world.setActiveSet('room203');
    lights.setPreset('room_hero_reveal');
    screens.updateMsgScreen(t < 133.0 ? 'tadokoro_chat' : 'sakakibara_email');

    camera.position.set(lerp(0.08, 0.0, smooth(u)), 1.02, lerp(-0.62, -0.74, smooth(u)));
    lookTarget.set(0.0, 1.02, -1.42);
    dof = { focusDist: 0.72, aperture: 0.0035, halation: 0.28 };
    simLog = t < 133.0 ? {
      tag: 'LATE NIGHT // TADOKORO EXPLOSIVE REPLIES (< 3 MIN)',
      title: '田所『中に小さい人間入ってんじゃねえのかこれ！！ 鳥肌止まんねえ！！』',
      detail: '10秒間の突き飛ばし復帰動画に、深夜の画面が激しく震えた',
    } : {
      tag: 'END OF CHAPTER 19 // EMAIL FROM KOICHI SAKAKIBARA · BUDGET ¥331,320',
      title: '榊原恒一『胸を張って、本物の「外の世界」の地面を歩かせてやりなさい。完成おめでとう』',
      detail: '次章：【最終章・第20章】五百二十日目の朝、アスファルトを踏みしめて —— 感動のフィナーレへ！',
    };
  }

  if (hudCb) hudCb({ simLog });
  return dof;
}
