export const CH12_DURATION = 150.0;

export const CH12_SCENES = [
  { id: 1, start: 0,   end: 18,  jp: 'Day 246 深夜 · 直径46mm自作丸型FOC基板『六つの電気の門』' },
  { id: 2, start: 18,  end: 34,  jp: 'Day 263 聖夜 · 駅前ロータリーの白い欅イルミネーションと帰路' },
  { id: 3, start: 34,  end: 52,  jp: '聖夜零時 · 万力・24V電源・保護メガネ＆セラミック作業マット' },
  { id: 4, start: 52,  end: 72,  jp: 'バァンッ！！ 24V同時オン閃光破裂・炭化素子と震えるピンセット' },
  { id: 5, start: 72,  end: 96,  jp: 'Day 270 大晦日 · 白い霜柱・実家のこたつ年越しそば＆父のみかん籠' },
  { id: 6, start: 96,  end: 116, jp: '除夜の鐘 · 古い銀色の目覚まし時計と『呼吸の隙間（850ns）』の気づき' },
  { id: 7, start: 116, end: 150, jp: 'Day 280 深夜 · 試作関節1号機『ふわっ』柔らかい人工筋肉＆衝撃吸収！' },
];

export const CH12_SUBTITLES = [
  // Cut 01 (0..18s): Mid-Dec 46mm Circular Green FOC PCB & 6 Power Gates
  { start: 0.4,   end: 8.6,   speaker: 'ナレーション', text: '12月半ば、凍える六畳間。五百円玉よりひと回り大きい『直径46mmの丸い緑色の基板』が、80mm銅モーターの心臓部となる。' },
  { start: 8.8,   end: 17.6,  speaker: 'ナレーション', text: '六つの電気の門を毎秒何万回も開閉し、何十アンペアもの暴れ馬を小さな皿の上に閉じ込める——電気屋の綱渡りだった。' },

  // Cut 02 (18..34s): Day 263 Christmas Eve Station Rotary White Zelkova Illuminations
  { start: 18.4,  end: 26.2,  speaker: 'ナレーション', text: 'Day 263（12月24日）聖夜。駅前ロータリーの欅並木に無数の白いイルミネーションが瞬き、白いケーキの箱を抱えた家族が行き交う。' },
  { start: 26.4,  end: 33.8,  speaker: 'ナレーション', text: 'コートの襟を立て、ポケットで冷えた右手を握りしめる湊。今夜、最初の丸型基板に24ボルトの電気を流す。胸が早鐘を打っていた。' },

  // Cut 03 (34..52s): Midnight Bench Vise, 24V PSU, Ceramic Mat & Safety Goggles
  { start: 34.4,  end: 42.8,  speaker: 'ナレーション', text: '深夜零時。万力で試作モーターを固定し、火に強い白いセラミック作業マットを敷く。榊原の忠告を思い出し、透明な保護メガネをかけた。' },
  { start: 43.0,  end: 51.6,  speaker: '佐伯 湊', text: '「……よし。まずは軽く、10度だけ回って止まれ」——24V電源オン。緑のランプが灯り、エンターキーを叩いた、その瞬間。' },

  // Cut 04 (52..72s): SHOOT-THROUGH EXPLOSION, E-Stop Smash, Charred MOSFET & Trembling Tweezers
  { start: 52.2,  end: 58.0,  speaker: 'ナレーション', text: 'バァンッ！！ 顔から30cm先でオレンジと青白い閃光が炸裂！ 上の門と下の門が百万分の一秒だけ同時オンし、24Vが激突した！' },
  { start: 58.2,  end: 64.2,  speaker: 'ナレーション', text: '赤いキノコ型の非常停止ボタンを叩き潰す。保護メガネの表面を熱い火の粉が弾け飛び、黒い素子は焼けた栗のように炭化して口を開けていた。' },
  { start: 64.4,  end: 71.8,  speaker: 'ナレーション', text: '窓の向こうに遠いクリスマスの明かり。予備基板を組もうとしてもピンセットが震えて止まらない——生まれて初めて、湊は「電気が怖い」と思った。' },

  // Cut 05 (72..96s): Day 270 New Year's Eve — Going Home, Frost Pillars, Mother's Soba & Father's Mikan Basket
  { start: 72.4,  end: 79.8,  speaker: 'ナレーション', text: 'Day 270（12月31日）大晦日。高速バスで帰省した地元の駅前には白い霜柱が立ち、玄関の母の声と煮物の匂いに肩の力が抜けた。' },
  { start: 80.0,  end: 87.6,  speaker: 'ナレーション', text: '居間のこたつで母の年越しそばをすする。口数の少ない父は、湊の硬く変色した親指をちらりと見やり、黙ってみかんの籠を押しやった。' },
  { start: 87.8,  end: 95.6,  speaker: '父', text: '「……好きなことやるのはいいが、目と指だけは守れよ。替えが効かねえんだから」——湊はこたつの下でそっと右手を握りしめた。' },

  // Cut 06 (96..116s): Joya-no-Kane, Old Silver Alarm Clock & The Dead-Time Epiphany (`隙間、か`)
  { start: 96.4,  end: 103.6, speaker: 'ナレーション', text: '遠くから響く除夜の鐘。二階の子供部屋で、小学生の時に自分で直した古い銀色の目覚まし時計が「チッ……チッ……」と時を刻む。' },
  { start: 103.8, end: 111.0, speaker: '佐伯 湊', text: '「……隙間、か」——前の爪が外れきる一拍の『余韻』を待てばぶつからない。電気は怪物じゃない、自分が呼吸の間を奪っただけだった！' },
  { start: 111.2, end: 115.8, speaker: 'ナレーション', text: '元日の朝、指先の震えは綺麗に消えていた。母が持たせてくれた切り餅の包みを抱え、湊は再び東京の六畳間へ戻った。' },

  // Cut 07 (116..150s): Day 280 Midnight — Prototype Joint #1 & The Miraculous Soft Iron (`ふわっ`!)
  { start: 116.4, end: 125.2, speaker: 'ナレーション', text: 'Day 280（1月10日）深夜。呼吸の間（850ns）と二重安全回路を刻んだ2枚目の丸基板＋長さ25cmアルミ棒『試作関節1号機』。24Vオン——爆発しない、無音だ。' },
  { start: 125.4, end: 133.4, speaker: 'ナレーション', text: 'そっと人差し指で押した瞬間——「……ふわっ」。冷たいアルミ棒から返ってきたのは、眠る猫の肉球のように優しくて滑らかな弾力だった！' },
  { start: 133.6, end: 139.2, speaker: 'ナレーション', text: '5cm押し下げて指を離すと『スッ、ピタリ』——跳ね返りゼロ、水飴のクッションに吸い込まれるように音もなく元の水平位置へ静止する。' },
  { start: 139.4, end: 145.4, speaker: '佐伯 湊', text: '拳で「ドンッ！」と叩いても壊れず「シュンッ」と衝撃を逃がす人工の筋肉。「……できた……っ。榊原さんの、あの関節と同じだ……！！」' },
  { start: 145.6, end: 149.8, speaker: 'ナレーション', text: 'これで1個。あと11個、合計12個繋げば72cmの巨人が立ち上がる——まだ知らぬ「見えない磁気の嵐」を前に、一月の夜は静かに更けた。' },
];

export function getCh12Scene(t) {
  for (let i = CH12_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH12_SCENES[i].start) return CH12_SCENES[i];
  }
  return CH12_SCENES[0];
}

export function getCh12Subtitle(t) {
  for (let i = 0; i < CH12_SUBTITLES.length; i++) {
    const s = CH12_SUBTITLES[i];
    if (t >= s.start && t <= s.end) return { speaker: s.speaker, text: s.text };
  }
  return null;
}

export function getCh12Cutin(t) {
  if (t >= 4.0 && t < 8.0) return { text: '直径46mm 自作丸型FOC基板 — 六つの小さな電気の門', tone: 'emerald' };
  if (t >= 52.2 && t < 57.5) return { text: 'バァンッ！！ 24V上下ゲート同時オン破裂 — 保護メガネが右目を救う！', tone: 'crimson' };
  if (t >= 88.2 && t < 93.2) return { text: '父「好きなことやるのはいいが、目と指だけは守れよ」', tone: 'amber' };
  if (t >= 104.2 && t < 109.2) return { text: '時計の歯車 ＝ 半導体の『呼吸の間（DEAD-TIME 850ns）』開眼！', tone: 'amber' };
  if (t >= 127.0 && t < 132.5) return { text: '……ふわっ。無音＆猫の肉球の弾力 — 人工筋肉『試作関節1号機』誕生！', tone: 'emerald' };
  if (t >= 140.2 && t < 144.8) return { text: 'ドンッ！→ シュンッ！ 拳の衝撃を丸ごと飲み込む『柔らかい鉄』', tone: 'emerald' };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

export function evaluateCh12Timeline(t, world, screens, lights, camera, lookTarget, hudCb) {
  const {
    deskGroup,
    shelfGroup,
    laptopGroup,
    psuGroup,
    viseJoint,
    safetyRig,
    explosionRig,
    tweezersRig,
    twelveJointsGroup,
    ghostJointMats,
    condWindow,
    macroHand,
    minatoXmas,
    passerA,
    passerB,
    minatoHomeWalk,
    kotatsuProps,
    fatherHome,
    minatoKotatsu,
    alarmClock,
    kirimojiGroup,
  } = world;

  // Deterministic reset every frame
  deskGroup.visible = true;
  shelfGroup.visible = true;
  laptopGroup.visible = true;
  psuGroup.visible = true;
  viseJoint.group.visible = true;
  viseJoint.setShinVisible(false);
  viseJoint.setJointAngle(0, 0);
  viseJoint.pcb.setLedOn(false);
  viseJoint.pcb.setBurnState(false, 0);
  viseJoint.pcb.animateGates(t, 0);
  safetyRig.gogglesGroup.visible = true;
  safetyRig.eStopGroup.visible = true;
  safetyRig.setEStopPressed(0);
  safetyRig.setSparkStreak(0);
  explosionRig.update(-1);
  tweezersRig.group.visible = false;
  twelveJointsGroup.visible = false;
  macroHand.group.visible = false;
  kirimojiGroup.visible = false;
  lights.setFlashIntensity(0);

  let dof = { focusDist: 0.7, aperture: 0.014, halation: 0.26 };
  let simLog = null;

  // =========================================================================
  // CUT 01 (0..18s): Mid-Dec Room 203 — 46mm Circular Green FOC PCB & 6 Power Gates
  // =========================================================================
  if (t < 18.0) {
    const u = t / 18.0;
    world.setActiveSet('room203');
    lights.setPreset('room_winter_macro');
    screens.updatePsuDisplay('off');
    screens.updateLaptop('bug_deadtime');
    viseJoint.pcb.animateGates(t, 0.85);
    condWindow.setDropletProgress(0.2);

    // Extreme-macro sweeping showcase of the 46mm circular green PCB + 6 MOSFET gates on the 80mm copper motor!
    camera.position.set(lerp(-0.18, 0.06, smooth(u)), lerp(0.89, 0.855, smooth(u)), lerp(-0.22, -0.30, smooth(u)));
    lookTarget.set(-0.056, 0.843, -0.464);
    dof = { focusDist: 0.22, aperture: 0.022, halation: 0.34 };
    simLog = {
      tag: 'DAY 246 // MID-DEC · 46mm CIRCULAR FOC PCB',
      title: '直径46mm『丸い緑色の基板』—— 六つの小さな電気の門',
      detail: '80mm裸銅モーターの真裏に密着させる手製の心臓部（毎秒数万回スイッチング）',
    };
  }
  // =========================================================================
  // CUT 02 (18..34s): Day 263 Christmas Eve — Station Rotary & 320 White Zelkova LEDs!
  // =========================================================================
  else if (t < 34.0) {
    const u = (t - 18.0) / 16.0;
    world.setActiveSet('xmasRotary');
    lights.setPreset('xmas_rotary_night');
    world.updateXmasLeds(t);

    // Minato walks resolutely rightwards along the illuminated sidewalk while scarfed couple with cake box passes opposite!
    minatoXmas.root.position.set(lerp(-2.8, 1.4, u), 0.10, -2.35);
    minatoXmas.root.rotation.set(0, Math.PI * 0.48, 0);
    const walkPh = t * 5.2;
    minatoXmas.leftLeg.hipJoint.rotation.x = Math.sin(walkPh) * 0.34;
    minatoXmas.rightLeg.hipJoint.rotation.x = -Math.sin(walkPh) * 0.34;
    minatoXmas.leftArm.shoulder.rotation.x = -0.25; // hands tucked warmly in coat pockets!
    minatoXmas.rightArm.shoulder.rotation.x = -0.25;

    passerA.root.position.set(lerp(2.6, -2.0, u), 0.10, -3.55);
    passerB.root.position.set(lerp(3.2, -1.4, u), 0.10, -3.85);
    passerA.leftLeg.hipJoint.rotation.x = Math.sin(walkPh + 1.0) * 0.28;
    passerA.rightLeg.hipJoint.rotation.x = -Math.sin(walkPh + 1.0) * 0.28;
    passerB.leftLeg.hipJoint.rotation.x = Math.sin(walkPh + 0.2) * 0.28;
    passerB.rightLeg.hipJoint.rotation.x = -Math.sin(walkPh + 0.2) * 0.28;

    // Cinematic low-angle tracking shot capturing towering glowing white zelkova canopies, cake box & Minato!
    camera.position.set(lerp(-1.6, 0.8, smooth(u)), lerp(1.38, 1.52, smooth(u)), lerp(1.45, 0.95, smooth(u)));
    lookTarget.set(lerp(-1.4, 0.3, smooth(u)), 1.65, -2.6);
    dof = { focusDist: 3.4, aperture: 0.010, halation: 0.44 };
    simLog = {
      tag: 'DAY 263 // DEC 24 SAT · CHRISTMAS EVE',
      title: '聖夜の駅前ロータリー —— 欅並木の白いイルミネーションと白いケーキの箱',
      detail: '寂しくはない。今夜、最初の丸型基板へ初めて24Vの電気を流す',
    };
  }
  // =========================================================================
  // CUT 03 (34..52s): Christmas Eve Midnight — Vise, 24V PSU, Ceramic Mat & Safety Goggles
  // =========================================================================
  else if (t < 52.0) {
    const u = (t - 34.0) / 18.0;
    world.setActiveSet('room203');
    lights.setPreset('room_winter_night');
    const powerOn = u > 0.50;
    screens.updatePsuDisplay(powerOn ? 'arm24' : 'off');
    screens.updateLaptop('bug_deadtime');
    viseJoint.pcb.setLedOn(powerOn);
    viseJoint.pcb.animateGates(t, powerOn ? 0.45 : 0.0);

    // Sweeping wide-to-medium lab shot showing 24V PSU (left), Bench Vise + Ceramic Mat + PCB (center), Goggles & Red E-Stop (right)!
    camera.position.set(lerp(-0.42, 0.16, smooth(u)), lerp(1.10, 0.96, smooth(u)), lerp(0.18, -0.02, smooth(u)));
    lookTarget.set(-0.02, 0.82, -0.50);
    dof = { focusDist: 0.58, aperture: 0.014, halation: 0.28 };
    simLog = {
      tag: 'DEC 24 00:10 // 24V BENCH TEST ARMED',
      title: '万力・白いセラミックマット・24V電源＆透明な保護メガネ',
      detail: '「まずは軽く、10度だけ回って止まれ」—— 緑のランプ点灯、Enterキー押下！',
    };
  }
  // =========================================================================
  // CUT 04 (52..72s): SHOOT-THROUGH EXPLOSION (`バァンッ！！`), E-Stop, Charred MOSFET & Trembling Tweezers!
  // =========================================================================
  else if (t < 72.0) {
    const dt = t - 52.0;
    world.setActiveSet('room203');
    lights.setPreset('room_winter_night');

    if (dt < 5.8) {
      // 52.0 .. 57.8s: BLINDING ORANGE + BLUE-WHITE SHOOT-THROUGH FLASH & FLYING SPARKS!
      const blastT = Math.max(0, dt - 0.15);
      screens.updatePsuDisplay('short');
      explosionRig.update(blastT);
      const flashPow = Math.max(0, 1.0 - blastT / 0.95);
      lights.setFlashIntensity(flashPow * 14.0);
      viseJoint.pcb.setBurnState(blastT > 0.18, Math.max(0.2, 1.0 - blastT / 4.5));
      safetyRig.setSparkStreak(blastT > 0.25 ? Math.min(1.0, (blastT - 0.25) * 2.5) : 0);

      // Camera shake recoil right on the blast!
      const shake = flashPow * 0.022;
      camera.position.set(
        0.04 + Math.sin(t * 75) * shake,
        0.92 + Math.cos(t * 68) * shake,
        lerp(-0.06, 0.08, smooth(dt / 5.8))
      );
      lookTarget.set(-0.02, 0.84, -0.46);
      dof = { focusDist: 0.45, aperture: 0.018, halation: 0.52 + flashPow * 0.4 };
      simLog = {
        tag: 'CRITICAL FAULT // 24V SHOOT-THROUGH EXPLOSION!',
        title: 'バァンッ！！ 上門・下門 同時オン激突 —— オレンジ＆青白い閃光炸裂！',
        detail: '保護メガネの表面で熱い火の粉が弾け飛び、右目を辛うじて守った',
      };
    } else if (dt < 12.2) {
      // 57.8 .. 64.2s: E-Stop Smash + Pure White Smoke + Extreme Macro on Charred "Roasted Chestnut" MOSFET!
      const k = smooth((dt - 5.8) / 6.4);
      screens.updatePsuDisplay('estop');
      explosionRig.update(dt - 0.15);
      viseJoint.pcb.setBurnState(true, Math.max(0.05, 0.65 - k * 0.55));
      safetyRig.setEStopPressed(1.0);
      safetyRig.setSparkStreak(0.85);

      if (k < 0.42) {
        // Right hand smashing down onto the red mushroom E-stop button!
        macroHand.group.visible = true;
        macroHand.group.scale.setScalar(0.58);
        macroHand.group.position.set(0.39, 0.825 - Math.sin((k / 0.42) * Math.PI) * 0.02, -0.47);
        macroHand.group.rotation.set(0.18, Math.PI * 0.52, -0.15);
        camera.position.set(lerp(0.28, 0.12, k / 0.42), lerp(1.04, 0.94, k / 0.42), lerp(-0.08, -0.22, k / 0.42));
        lookTarget.set(0.16, 0.81, -0.47);
      } else {
        // Extreme macro push-in onto the charred split MOSFET with pure white smoke rising!
        const m = smooth((k - 0.42) / 0.58);
        camera.position.set(lerp(0.06, -0.02, m), lerp(0.92, 0.875, m), lerp(-0.18, -0.28, m));
        lookTarget.set(-0.056, 0.844, -0.464);
      }
      dof = { focusDist: 0.24, aperture: 0.020, halation: 0.34 };
      simLog = {
        tag: 'E-STOP ENGAGED // MOSFET CARBONIZED',
        title: '真っ白な煙と焼けた栗のようにパックリ割れた炭化素子',
        detail: '非常停止ボタンを叩き潰す —— 立ち上がった両膝がガクガクと震えていた',
      };
    } else {
      // 64.2 .. 72.0s: Trembling ESD Tweezers failing to pick up a rice-grain 0603 SMD chip!
      const k = smooth((dt - 12.2) / 7.8);
      screens.updatePsuDisplay('estop');
      viseJoint.pcb.setBurnState(true, 0.0);
      tweezersRig.group.visible = true;
      tweezersRig.setTremor(t, 1.15);

      macroHand.group.visible = true;
      macroHand.group.scale.setScalar(0.56);
      macroHand.group.position.set(
        0.255 + Math.sin(t * 29) * 0.004,
        0.778 + Math.cos(t * 33) * 0.003,
        -0.36 + Math.sin(t * 41) * 0.004
      );
      macroHand.group.rotation.set(0.08, Math.PI * 0.52, -0.14);

      camera.position.set(lerp(0.24, 0.16, k), lerp(0.91, 0.87, k), lerp(-0.10, -0.16, k));
      lookTarget.set(0.18, 0.76, -0.36);
      dof = { focusDist: 0.22, aperture: 0.022, halation: 0.28 };
      simLog = {
        tag: 'TRAUMA // FEAR OF HIGH-CURRENT ELECTRICITY',
        title: 'ピンセットが震えて米粒の部品がつまめない —— 初めて知った『電気の恐怖』',
        detail: 'たった一行の数字の間違いが牙を剥く。年末の5日間、電源スイッチを押せなかった',
      };
    }
  }
  // =========================================================================
  // CUT 05 (72..96s): Day 270 New Year's Eve — Frost Pillars & Warm Family Kotatsu!
  // =========================================================================
  else if (t < 96.0) {
    const dt = t - 72.0;
    world.setActiveSet('frostHome');
    kotatsuProps.updateSteam(t);

    if (dt < 8.0) {
      // 72..80s: Dusk Rural Station Lane with 3D White Frost Pillars (`白い霜柱`) & Boston Bag!
      const k = smooth(dt / 8.0);
      lights.setPreset('rural_frost_dusk');
      minatoHomeWalk.root.position.set(0.0, 0, lerp(10.5, 7.6, k));
      const wp = t * 4.8;
      minatoHomeWalk.leftLeg.hipJoint.rotation.x = Math.sin(wp) * 0.30;
      minatoHomeWalk.rightLeg.hipJoint.rotation.x = -Math.sin(wp) * 0.30;

      // Dramatic low-to-medium framing showing BOTH foreground white frost pillars AND Minato's full head-to-toe figure!
      camera.position.set(lerp(-1.55, -1.25, k), lerp(0.58, 1.12, k), lerp(5.4, 4.4, k));
      lookTarget.set(lerp(-0.45, 0.0, k), lerp(0.72, 1.05, k), lerp(8.4, 8.2, k));
      dof = { focusDist: 3.4, aperture: 0.008, halation: 0.34 };
      simLog = {
        tag: 'DAY 270 // DEC 31 SAT · HOMECOMING',
        title: '大晦日の地元駅前 —— 畑の端に立つ白い霜柱とボストンバッグ',
        detail: '母の明るい声と、台所から漂うごぼうと醤油の煮物の匂いに肩の力が抜けた',
      };
    } else {
      // 80..96s: Warm Tatami Kotatsu Living Room — Mother's Toshikoshi Soba & Father pushing Mikan Basket!
      const k = smooth((dt - 8.0) / 16.0);
      lights.setPreset('kotatsu_warm_home');

      // Father silently slides the woven basket of bright orange mikan across the kotatsu toward Minato!
      const pushU = smooth(clamp01((k - 0.30) / 0.38));
      kotatsuProps.mikanBasket.position.set(lerp(0.04, -0.04, pushU), 0.40, lerp(-0.22, 0.08, pushU));
      fatherHome.rightArm.shoulder.rotation.set(lerp(-0.35, -0.78, pushU), 0, 0.08);
      fatherHome.rightArm.elbow.rotation.set(-0.35, 0, 0);
      minatoKotatsu.rightArm.shoulder.rotation.set(-0.42, 0, -0.10);

      // Unobstructed warm 3/4 two-shot showing Father's full head, Minato, Toshikoshi Soba, Mikan Basket & Shoji!
      camera.position.set(lerp(1.42, 1.24, k), lerp(1.22, 1.14, k), lerp(1.22, 0.94, k));
      lookTarget.set(-0.08, 0.72, -0.58);
      dof = { focusDist: 2.1, aperture: 0.008, halation: 0.32 };
      simLog = {
        tag: 'FAMILY HOME // KOTATSU & TOSHIKOSHI SOBA',
        title: '父「好きなことやるのはいいが、目と指だけは守れよ。替えが効かねえんだから」',
        detail: '母の年越しそば、黙って押しやられたみかんの籠 —— こたつの下で右手を握りしめた',
      };
    }
  }
  // =========================================================================
  // CUT 06 (96..116s): Childhood Room — Silver Alarm Clock (`チッ…チッ…`) & Dead-Time Epiphany (`隙間、か`)!
  // =========================================================================
  else if (t < 116.0) {
    const dt = t - 96.0;
    world.setActiveSet('childhood');

    if (dt < 15.0) {
      // 96..111s: Dark midnight childhood room, old silver twin-bell alarm clock + razor-sharp Dead-Time Escapement Hologram!
      const k = smooth(dt / 15.0);
      lights.setPreset('childhood_midnight');
      const holoAlpha = smooth(clamp01((k - 0.34) / 0.25));
      alarmClock.updateClock(t, holoAlpha);

      camera.position.set(lerp(-0.14, 0.01, k), lerp(0.86, 0.92, k), lerp(-0.44, -0.34, k));
      lookTarget.set(0.0, lerp(0.82, 0.89, holoAlpha), -1.04);
      dof = { focusDist: 0.68, aperture: 0.0035, halation: 0.30 };
      simLog = {
        tag: 'NEW YEAR EVE // JOYA-NO-KANE & ALARM CLOCK',
        title: '古い銀色の目覚まし時計『チッ……チッ……』——「……隙間、か」',
        detail: '前の爪が外れきる『一拍の間（DEAD-TIME 850ns）』を置けば、電気は衝突しない！',
      };
    } else {
      // 111..116s: Bright Sunlit New Year's Morning — Finger Tremor Gone & Mother's Wrapped Kirimoji!
      const k = smooth((dt - 15.0) / 5.0);
      lights.setPreset('new_year_morning');
      alarmClock.updateClock(t, 0.0);
      kirimojiGroup.visible = true;

      camera.position.set(lerp(0.24, 0.42, k), lerp(0.96, 1.02, k), lerp(-0.46, -0.36, k));
      lookTarget.set(0.18, 0.80, -1.00);
      dof = { focusDist: 0.62, aperture: 0.013, halation: 0.34 };
      simLog = {
        tag: 'JAN 01-02 // NEW YEAR MORNING · TREMOR GONE',
        title: '元日の澄んだ朝 —— 震えが消えた指先と、母が持たせてくれた切り餅の包み',
        detail: '「また春休みに顔出しなさいよ」—— 深い感謝を胸に、再び東京の六畳間へ',
      };
    }
  }
  // =========================================================================
  // CUT 07 (116..150s): Day 280 (Jan 10 Midnight) — Prototype Joint #1 (`ふわっ` Artificial Muscle!)
  // =========================================================================
  else {
    const dt = t - 116.0;
    world.setActiveSet('room203');
    lights.setPreset('room_winter_macro');
    viseJoint.setShinVisible(true);
    viseJoint.pcb.setLedOn(true);
    viseJoint.pcb.setBurnState(false, 0);
    viseJoint.pcb.animateGates(t, 0.95);
    screens.updatePsuDisplay('soft_foc');

    if (dt < 10.0) {
      // 116..126s: Safe 24V Power-On — Complete Prototype Joint #1 with 25cm Horizontal Silver Aluminum Bar!
      const k = smooth(dt / 10.0);
      screens.updateLaptop('soft_foc', 1.2, 0.0);
      viseJoint.setJointAngle(0, 0.22);

      camera.position.set(lerp(-0.26, 0.10, k), lerp(1.04, 0.94, k), lerp(0.10, 0.02, k));
      lookTarget.set(0.06, 0.84, -0.48);
      dof = { focusDist: 0.52, aperture: 0.015, halation: 0.28 };
      simLog = {
        tag: 'DAY 280 // JAN 10 TUE MIDNIGHT · PROTOTYPE JOINT #1',
        title: '2枚目の丸基板＋長さ25cm銀色アルミ棒『試作関節1号機』—— 24Vオン、完全無音！',
        detail: '呼吸の間（850ns）＋二重過電流遮断。爆発しない、煙も出ない、歯車の唸りすらない',
      };
    } else if (dt < 23.0) {
      // 126..139s: THE MAGIC TOUCH (`……ふわっ。` -> `スッ、ピタリ` critically damped return!)
      const u = (dt - 10.0) / 13.0;
      let angleRad = 0;
      let handYOffset = 0.07;
      let fieldGlow = 0.35;

      if (u < 0.20) {
        // Finger descends gently toward tip of 25cm silver aluminum bar
        const a = smooth(u / 0.20);
        handYOffset = lerp(0.085, 0.012, a);
      } else if (u < 0.62) {
        // Gentle press downward — bar yields smoothly 5cm like a sleeping cat's paw (`ふわっ`)!
        const a = smooth((u - 0.20) / 0.42);
        angleRad = -0.24 * Math.sin(a * Math.PI * 0.5);
        handYOffset = 0.012 + Math.sin(angleRad) * 0.25;
        fieldGlow = 0.35 + a * 0.65;
      } else if (u < 0.72) {
        // Finger snaps upward off the bar -> bar glides smoothly back (`スッ、ピタリ`, ZERO overshoot!)
        const a = smooth((u - 0.62) / 0.10);
        angleRad = lerp(-0.24, -0.06, a);
        handYOffset = lerp(-0.048, 0.085, a);
        fieldGlow = 1.0 - a * 0.4;
      } else {
        // Critically-damped exponential settling to exact 0.00° horizontal!
        const a = (u - 0.72) / 0.28;
        angleRad = -0.06 * Math.exp(-a * 6.5);
        handYOffset = 0.085;
        fieldGlow = 0.6 * Math.exp(-a * 2.5) + 0.22;
      }

      viseJoint.setJointAngle(angleRad, fieldGlow);
      screens.updateLaptop('soft_foc', 1.2, -angleRad * 57.3);

      // Right hand fingertip pressing DIRECTLY atop the tip of the 25cm aluminum bar (x = 0.194)!
      macroHand.group.visible = true;
      macroHand.group.scale.setScalar(0.56);
      macroHand.group.position.set(0.255, 0.858 + handYOffset, -0.50);
      macroHand.group.rotation.set(0.06, Math.PI * 0.52, -0.08 + angleRad * 0.35);

      camera.position.set(lerp(0.10, 0.06, smooth(u)), lerp(0.95, 0.91, smooth(u)), lerp(0.06, -0.02, smooth(u)));
      lookTarget.set(0.08, 0.835, -0.48);
      dof = { focusDist: 0.46, aperture: 0.012, halation: 0.36 };
      simLog = {
        tag: 'BACKDRIVABLE VIRTUAL SPRING // Kp = 1.2 · ZERO COGGING',
        title: u < 0.62 ? '……ふわっ。眠る猫の肉球のように柔らかい金属の弾力！' : '『スッ、ピタリ』—— 跳ね返りゼロ、水飴のクッションのように無音静止！',
        detail: '歯車の引っかかり1mmもなし。磁力のバネがじんわりと温かく指を押し返す',
      };
    } else if (dt < 29.0) {
      // 139..145s: FIST SLAM SHOCK ABSORPTION (`ドンッ！` -> `シュンッ` graceful yield!)
      const u = (dt - 23.0) / 6.0;
      const slamCurve = u < 0.22
        ? smooth(u / 0.22)
        : Math.exp(-((u - 0.22) / 0.26) * 2.2);
      const angleRad = -0.36 * slamCurve;
      viseJoint.setJointAngle(angleRad, 0.35 + slamCurve * 0.65);
      screens.updateLaptop('soft_foc', 18.0, -angleRad * 57.3);

      macroHand.group.visible = true;
      macroHand.group.scale.setScalar(0.58);
      macroHand.group.position.set(0.252, 0.865 + Math.sin(angleRad) * 0.25 + (1 - slamCurve) * 0.06, -0.50);
      macroHand.group.rotation.set(0.16, Math.PI * 0.52, -0.22);

      camera.position.set(0.08, 0.93, 0.06);
      lookTarget.set(0.07, 0.83, -0.48);
      dof = { focusDist: 0.52, aperture: 0.012, halation: 0.38 };
      simLog = {
        tag: 'IMPACT COMPLIANCE // Kp = 18.0 · ACTIVE SHOCK ABSORPTION',
        title: 'ドンッ！→ シュンッ！ 拳の衝撃を折れずに丸ごと飲み込む『人工の筋肉』',
        detail: '「……できた……っ。榊原さんの、あの関節と同じだ……！！」',
      };
    } else {
      // 145..150s: EPIC FINALE — Pullback linking Active Joint #1 to ALL 12 Pulsing Rings on 720mm Wall Silhouette!
      const u = smooth((dt - 29.0) / 5.0);
      viseJoint.setJointAngle(Math.sin(t * 2.4) * 0.04, 0.55);
      screens.updateLaptop('soft_foc', 12.0, 0);
      twelveJointsGroup.visible = true;
      const emiFlicker = dt > 31.5 ? (Math.sin(t * 48.0) > 0.35 ? 1.0 : 0.45) : 1.0;
      for (let i = 0; i < ghostJointMats.length; i++) {
        const g = ghostJointMats[i];
        g.mat.opacity = u * (g.isHero ? 0.96 : 0.72 * emiFlicker);
      }

      camera.position.set(lerp(0.14, 0.22, u), lerp(0.96, 1.12, u), lerp(0.18, 0.68, u));
      lookTarget.set(lerp(0.06, 0.04, u), lerp(0.84, 0.96, u), lerp(-0.52, -1.45, u));
      dof = { focusDist: 1.55, aperture: 0.008, halation: 0.34 };
      simLog = {
        tag: 'END OF CHAPTER 12 // DAY 280 · BUDGET ¥386,320',
        title: 'これで1個 —— あと11個（計12関節）で72cmの巨人が立ち上がる',
        detail: '次章：第13章『オシロスコープの幽霊』— 複数関節を繋いだ瞬間に暴れ出す磁気の嵐へ',
      };
    }
  }

  if (hudCb) hudCb({ simLog });
  return dof;
}
