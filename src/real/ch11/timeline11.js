export const CH11_DURATION = 150.0;

export const CH11_SCENES = [
  { id: 1, start: 0,   end: 31,  jp: 'Day 216 朝 · 静かな203号室・剥製のHMD-01と72cmのメジャー' },
  { id: 2, start: 31,  end: 46,  jp: '海外QDD完成品カタログ『¥45,000×16＝72万円超』の絶望と活路' },
  { id: 3, start: 46,  end: 72,  jp: 'Day 221 学園祭 · 赤いハチマキの田所・大盛り焼きそばと公園ベンチ' },
  { id: 4, start: 72,  end: 90,  jp: '北端プレハブ『ロボティクス研究会』· 倉田先輩の爆笑と肩の一撃' },
  { id: 5, start: 90,  end: 122, jp: '12月・海外からの白い小箱 — 直径8cmの『鉄と銅の輪っか』＆三本の裸電線' },
  { id: 6, start: 122, end: 150, jp: 'Day 245 深夜 · 新聞紙二枚の原寸大720mmシルエット・右膝に当てた鉄の輪と結露' },
];

export const CH11_SUBTITLES = [
  // Cut 01 (0..16s): Nov 7 Mon Cold Morning Quiet, Retired HMD-01 & Frozen Pencil
  { start: 0.4,   end: 7.4,   speaker: 'ナレーション', text: '11月7日、月曜の朝。祭りの翌日は音がしない。本棚の最上段で『HMD-01』が剥製の小鳥のように静まり返っている。' },
  { start: 7.6,   end: 15.8,  speaker: 'ナレーション', text: '昨夜勢いで『HMD-02』とだけ書いた白いノート。シャープペンシルを握ったまま、湊の手は十分近く固まってしまった。' },

  // Cut 02 (16..31s): Yellow Steel Tape Measure Pulled Straight Up: 38cm -> 65cm -> 72cm Lock!
  { start: 16.3,  end: 23.4,  speaker: 'ナレーション', text: '金属製のメジャーを床から真上へ伸ばす。38センチを過ぎ、榊原機の65センチを越え——『72センチ』でロックした。' },
  { start: 23.6,  end: 30.8,  speaker: 'ナレーション', text: '折りたたみ机より高く、想定重量は7〜8キロ。もはや模型ではない。「部屋の中にもう一人、小さな誰かが立っている」圧倒的な存在感。' },

  // Cut 03 (31..46s): Overseas QDD Catalog Price Shock (¥45,000 × 16 = ¥720,000+)
  { start: 31.4,  end: 38.6,  speaker: 'ナレーション', text: '海外メーカーの薄型丸関節カタログ。1個4万5千円、16軸で72万円超。貯金31万6千円では片脚すら組めずに蒸発する。' },
  { start: 38.8,  end: 45.8,  speaker: '佐伯 湊', text: '「……買えない」——むき出しの平たいモーターだけを買い、心臓部の丸型基板は自分の頭とハンダごてで作るしかない。' },

  // Cut 04 (46..62s): Day 221 Campus Festival — Golden Ginkgo, Yakisoba Stall & Tadokoro!
  { start: 46.4,  end: 53.6,  speaker: '田所', text: '「おい、佐伯じゃん！ ほらよ、お前最近さらに痩せたから肉大盛りな！」——赤いハチマキの田所が山盛りの焼きそばを差し出した。' },
  { start: 53.8,  end: 61.8,  speaker: '田所', text: '「講義の合間にびっしり図面描いてるだろ。俺らと違う場所で何かすげえ面白いことやってんだなってわかって、安心したわ」' },

  // Cut 05 (62..72s): Eating Warm Yakisoba on Campus Park Bench
  { start: 62.3,  end: 71.8,  speaker: '佐伯 湊', text: '「……ありがとな、田所。落ち着いたら、今度こそ飯行くわ」——ベンチで食べた焼きそばは、久しぶりに胸の奥まで温かくなる味がした。' },

  // Cut 06 (72..90s): Northern Prefab Robotics Clubroom — Kurata's Laugh & Shoulder Slap!
  { start: 72.4,  end: 79.8,  speaker: '佐伯 湊', text: '4月以来のロボ研プレハブ棟。「全部、最初から作り直します。72センチにして、丸い関節の基板から自分で作って、何千回も学習させます」' },
  { start: 80.0,  end: 85.4,  speaker: '倉田', text: '「……ははっ。お前さあ、ほんっとうに大馬鹿野郎だな。でもいいよ、最高だ！ 4月にうちへ入らなかった判断、大正解だったな」' },
  { start: 85.6,  end: 89.8,  speaker: '倉田', text: 'バンッ！ 肩を強く叩く。「指どころか、今度は手首折られるくらいの力が出るぞ。死ぬなよ、一年」——迷いの霧が晴れ渡った。' },

  // Cut 07 (90..104s): Late Nov Winter Chill, 24V Bench PSU & Overseas White Parcel Box
  { start: 90.4,  end: 97.6,  speaker: 'ナレーション', text: '11月下旬、資金374,520円から24V安定化電源と最初の試作部品を発注（-28,600円／残金345,920円）。' },
  { start: 97.8,  end: 103.8, speaker: 'ナレーション', text: '12月に入った夜、海を越えて届いた小さな白い小箱を開けた瞬間——湊は思わず息を詰めてその中身を見つめた。' },

  // Cut 08 (104..122s): Extreme Macro Reveal — Bare 80mm Flat Steel & Copper Outrunner Motor!
  { start: 104.3, end: 112.4, speaker: 'ナレーション', text: '手のひらにずっしり沈む、直径8センチの平たくて黒い『鉄と銅の輪っか』。赤銅色の太い銅線の束と、赤・黄・黒の三本の裸電線。' },
  { start: 112.6, end: 121.8, speaker: 'ナレーション', text: 'ゴリ、ゴリ、ゴリ…… 脳も神経もない鉄の塊。こいつに命を吹き込む直径5cmの丸型FOC基板を、電気屋である自分がゼロから生み出す！' },

  // Cut 09 (122..138s): Day 245 Dec 6 Midnight — Plaid Blanket, Taped Newspapers & Full-Scale 720mm Drawing!
  { start: 122.4, end: 130.6, speaker: 'ナレーション', text: 'Day 245（12月6日）深夜。チェック柄の電気ひざ掛けを腰に巻き、新聞紙二枚を縦に貼った壁へ太い油性マジックで『720mm』を描く。' },
  { start: 130.8, end: 137.8, speaker: 'ナレーション', text: '長い脛、力強い太もも、広い肩幅。本棚の上の38cm『HMD-01』が小さな弟に見える——黒い影が「俺を立たせてみろ」と見返していた。' },

  // Cut 10 (138..150s): Pressing Cold 80mm Motor onto Right Knee & Winter Condensation Droplet!
  { start: 138.3, end: 144.4, speaker: 'ナレーション', text: '冷たい銅コイルの輪を、壁に描いた『HMD-02』の右膝の丸い関節へそっと押し当てる。鉄の冷たさが指先から骨に沁みてくる。' },
  { start: 144.6, end: 149.8, speaker: 'ナレーション', text: '窓ガラスの下端を冬の結露が一筋流れ落ちた。凍える六畳間で、「まだ脳を持たない鉄の輪」との火花散る冬が始まる——。' },
];

export function getCh11Scene(t) {
  for (let i = CH11_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH11_SCENES[i].start) return CH11_SCENES[i];
  }
  return CH11_SCENES[0];
}

export function getCh11Subtitle(t) {
  for (let i = 0; i < CH11_SUBTITLES.length; i++) {
    const s = CH11_SUBTITLES[i];
    if (t >= s.start && t <= s.end) return { speaker: s.speaker, text: s.text };
  }
  return null;
}

export function getCh11Cutin(t) {
  if (t >= 23.0 && t < 27.0) return { text: '目標全高 720 mm（想定重量 7.5kg）— もはや模型ではない', tone: 'amber' };
  if (t >= 34.5 && t < 38.5) return { text: '市販QDD 16軸＝¥720,000超 → 自作丸型基板で 1/5 突破へ！', tone: 'crimson' };
  if (t >= 83.2 && t < 87.2) return { text: '倉田「大馬鹿野郎だな。でもいいよ、最高だ！ 死ぬなよ、一年」', tone: 'emerald' };
  if (t >= 106.0 && t < 110.5) return { text: '直径80mm 裸銅コイル＆赤・黄・黒3相裸電線 —『鉄と銅の輪っか』', tone: 'amber' };
  if (t >= 139.0 && t < 144.0) return { text: '原寸大 720mm『HMD-02』右膝へ — 火花散る冬の幕開け！', tone: 'emerald' };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

export function evaluateCh11Timeline(t, world, screens, lights, camera, lookTarget, hudCb) {
  const {
    deskGroup,
    shelfGroup,
    laptopGroup,
    psu24v,
    ch10Props,
    tapeMeasure,
    bareMotor,
    wallMotor,
    newsWall,
    condWindow,
    minatoWinter,
    breathPuff,
    macroHand,
    yakiStall,
    tadokoroFest,
    minatoFest,
    kurataClub,
    minatoClub,
  } = world;

  // Reset per-frame transient states cleanly (100% deterministic scrubbing!)
  deskGroup.visible = false;
  shelfGroup.visible = true;
  laptopGroup.visible = false;
  psu24v.visible = false;
  ch10Props.hmd02Notebook.visible = false;
  ch10Props.mechPencil.visible = false;
  tapeMeasure.group.visible = false;
  bareMotor.parcelBox.visible = false;
  bareMotor.group.visible = false;
  bareMotor.focHolo.visible = false;
  wallMotor.group.visible = false;
  newsWall.group.visible = false;
  newsWall.marker.visible = false;
  minatoWinter.root.visible = false;
  breathPuff.visible = false;
  macroHand.group.visible = false;

  let dof = { focusDist: 1.5, aperture: 0.012, halation: 0.24 };
  let simLog = null;

  // =========================================================================
  // CUT 01 (0..16s): Nov 7 Mon Cold Morning Quiet, Retired HMD-01 & Frozen Pencil
  // =========================================================================
  if (t < 16.0) {
    const u = t / 16.0;
    world.setActiveSet('room203');
    lights.setPreset('room_cold_morning');
    deskGroup.visible = true;
    ch10Props.hmd02Notebook.visible = true;
    ch10Props.mechPencil.visible = true;
    ch10Props.updateHmd02Notebook(1.0);
    condWindow.setDropletProgress(0.0);

    if (u < 0.48) {
      const k = smooth(u / 0.48);
      // Quiet morning shot of retired HMD-01 perched like a songbird beside its `規定完走証 9秒12`!
      camera.position.set(lerp(-0.62, -0.82, k), lerp(1.52, 1.44, k), lerp(-0.56, -0.70, k));
      lookTarget.set(-0.92, 1.36, -1.40);
      dof = { focusDist: 0.85, aperture: 0.014, halation: 0.22 };
    } else {
      const k = smooth((u - 0.48) / 0.52);
      // Tilt down to the open `HMD-02` blank notebook with Minato's hand frozen over the page!
      macroHand.group.visible = true;
      macroHand.group.scale.setScalar(0.60);
      macroHand.group.position.set(0.205, 0.782, -0.44);
      macroHand.group.rotation.set(0.10, Math.PI * 0.52, -0.08);

      camera.position.set(lerp(-0.18, 0.06, k), lerp(1.14, 1.04, k), lerp(-0.04, -0.18, k));
      lookTarget.set(0.02, 0.74, -0.46);
      dof = { focusDist: 0.50, aperture: 0.015, halation: 0.24 };
    }
    simLog = {
      tag: 'DAY 216 // NOV 07 MON · QUIET MORNING',
      title: '祭りの翌朝の静寂 —— 剥製の『HMD-01』と止まった手',
      detail: '一度手に入れた歩ける正解をすべて捨て、再び白紙の暗闇へ',
    };
  }
  // =========================================================================
  // CUT 02 (16..31s): Yellow Steel Tape Measure Pulled Up: 38cm -> 65cm -> 72cm!
  // =========================================================================
  else if (t < 31.0) {
    const u = (t - 16.0) / 15.0;
    world.setActiveSet('room203');
    lights.setPreset('room_cold_morning');
    deskGroup.visible = true;
    tapeMeasure.group.visible = true;

    const extU = smooth(clamp01(u / 0.72));
    const curHeight = lerp(0.08, 0.72, extU);
    tapeMeasure.setHeightMeters(curHeight);

    // Dramatic vertical tilt chasing the rising yellow tape blade past 38cm -> 65cm -> 72cm lock!
    camera.position.set(lerp(0.38, 0.58, extU), lerp(0.24, 0.62, extU), lerp(0.95, 1.38, extU));
    lookTarget.set(-0.06, lerp(0.18, 0.44, extU), 0.26);
    dof = { focusDist: 1.05, aperture: 0.013, halation: 0.28 };
    const cmInt = Math.round(curHeight * 100);
    simLog = {
      tag: `VERTICAL SCALE // TARGET HEIGHT: ${cmInt} cm`,
      title: cmInt >= 70 ? '72cm（720mm）ロック —— 部屋にもう一人立つ圧倒的存在感' : `金属メジャー伸長中：${cmInt} cm（旧HMD-01: 38cm / 榊原機: 65cm）`,
      detail: '想定重量 7.5kg クラスの鉄と電気の塊 — 折りたたみ机の天板を超える全高',
    };
  }
  // =========================================================================
  // CUT 03 (31..46s): Overseas QDD Catalog Price Shock (¥45,000 × 16 = ¥720,000+)
  // =========================================================================
  else if (t < 46.0) {
    const u = (t - 31.0) / 15.0;
    world.setActiveSet('room203');
    lights.setPreset('room_cold_morning');
    deskGroup.visible = true;
    laptopGroup.visible = true;

    camera.position.set(lerp(0.10, 0.0, smooth(u)), lerp(0.93, 0.87, smooth(u)), lerp(-0.10, -0.22, smooth(u)));
    lookTarget.set(0.0, 0.84, -0.60);
    dof = { focusDist: 0.44, aperture: 0.014, halation: 0.28 };
    simLog = {
      tag: 'REALITY CHECK // OVERSEAS QDD CATALOG',
      title: '完成品モジュール 1個 ¥45,000 × 16軸 ＝ ¥720,000超（総額100万）',
      detail: '残金 ¥316,120 では片脚すら組めない → 裸モーター＋自作丸型FOC基板で 1/5 コストへ！',
    };
  }
  // =========================================================================
  // CUT 04 (46..62s): Day 221 Campus Festival — Golden Ginkgo, Yakisoba & Tadokoro!
  // =========================================================================
  else if (t < 62.0) {
    const u = (t - 46.0) / 16.0;
    world.setActiveSet('festival');
    lights.setPreset('festival_autumn_sun');
    world.updateFestLeaves(t);
    yakiStall.updateSmoke(t);

    // Tadokoro stands center-right behind the sizzling griddle wearing his bright RED HACHIMAKI!
    tadokoroFest.root.position.set(0.16, 0, -3.62);
    tadokoroFest.root.rotation.set(0, -0.22, 0);
    tadokoroFest.rightArm.shoulder.rotation.set(-0.85 + Math.sin(t * 4.5) * 0.14, 0, -0.10);
    tadokoroFest.rightArm.elbow.rotation.set(-0.55, 0, 0);

    // Minato stands front-left in clean 3/4 profile so he NEVER blocks Tadokoro or the griddle!
    minatoFest.root.position.set(-0.78, 0, -2.28);
    minatoFest.root.rotation.set(0, Math.PI * 0.74, 0);
    minatoFest.leftLeg.hipJoint.rotation.x = 0;
    minatoFest.leftLeg.kneeJoint.rotation.x = 0;
    minatoFest.rightLeg.hipJoint.rotation.x = 0;
    minatoFest.rightLeg.kneeJoint.rotation.x = 0;

    yakiStall.yakisobaPack.position.set(lerp(0.08, -0.34, smooth(u)), 0.96 + Math.sin(u * Math.PI) * 0.12, lerp(-2.98, -2.54, smooth(u)));

    // Crisp right-front 3/4 two-shot framing Tadokoro (red hachimaki), steaming griddle, yakisoba sign, and Minato!
    camera.position.set(lerp(1.12, 0.72, smooth(u)), lerp(1.56, 1.48, smooth(u)), lerp(-0.55, -1.08, smooth(u)));
    lookTarget.set(-0.14, 1.38, -3.12);
    dof = { focusDist: 2.35, aperture: 0.010, halation: 0.30 };
    simLog = {
      tag: 'DAY 221 // NOV 12 SAT · UNIVERSITY FESTIVAL',
      title: '東都農工大 学園祭 — 赤いハチマキの田所と肉大盛り焼きそば',
      detail: '「俺らと違う場所で何かすげえ面白いことやってんだなってわかって、安心したわ」',
    };
  }
  // =========================================================================
  // CUT 05 (62..72s): Eating Warm Yakisoba on Campus Park Bench
  // =========================================================================
  else if (t < 72.0) {
    const u = (t - 62.0) / 10.0;
    world.setActiveSet('festival');
    lights.setPreset('festival_autumn_sun');
    world.updateFestLeaves(t);
    yakiStall.updateSmoke(t);

    // Minato sits warmly on the green slatted park bench holding the steaming yakisoba pack!
    minatoFest.root.position.set(-2.12, -0.34, -0.32);
    minatoFest.root.rotation.set(0, 0.65, 0);
    minatoFest.leftLeg.hipJoint.rotation.x = -1.42;
    minatoFest.leftLeg.kneeJoint.rotation.x = 1.42;
    minatoFest.rightLeg.hipJoint.rotation.x = -1.42;
    minatoFest.rightLeg.kneeJoint.rotation.x = 1.42;
    minatoFest.rightArm.shoulder.rotation.set(-0.65, 0, -0.15);
    minatoFest.rightArm.elbow.rotation.set(-0.75, 0, 0);

    yakiStall.yakisobaPack.position.set(-1.90, 0.72, -0.10);

    camera.position.set(lerp(-0.65, -0.92, smooth(u)), lerp(1.22, 1.15, smooth(u)), lerp(1.25, 0.92, smooth(u)));
    lookTarget.set(-2.05, 0.96, -0.30);
    dof = { focusDist: 1.8, aperture: 0.012, halation: 0.32 };
    simLog = {
      tag: 'CAMPUS BENCH // GOLDEN GINKGO TREES',
      title: '胸の奥まで温かくなる焼きそば —— 透明じゃなかった居場所',
      detail: 'そして四月以来、北端のプレハブ棟『ロボティクス研究会』へ足を向ける',
    };
  }
  // =========================================================================
  // CUT 06 (72..90s): Northern Prefab Robotics Clubroom — Kurata's Laugh & Shoulder Slap!
  // =========================================================================
  else if (t < 90.0) {
    const u = (t - 72.0) / 18.0;
    world.setActiveSet('clubroom');
    lights.setPreset('clubroom_daylight');

    // Kurata listens stunned -> bursts out laughing -> slaps Minato's shoulder ("バンッ！") at u >= 0.60!
    const slapU = clamp01((u - 0.60) / 0.18);
    const slapPulse = Math.sin(slapU * Math.PI);
    kurataClub.root.position.set(0.36 - slapPulse * 0.10, 0, -0.85);
    kurataClub.root.rotation.set(0, -Math.PI * 0.48, 0);
    kurataClub.rightArm.shoulder.rotation.set(-0.92 * slapPulse - 0.18, 0, 0.08);
    kurataClub.rightArm.elbow.rotation.set(-0.62 - slapPulse * 0.18, 0, 0);

    minatoClub.root.position.set(-0.28, 0, -0.85);
    minatoClub.root.rotation.set(0, Math.PI * 0.48, 0);
    minatoClub.rightArm.shoulder.rotation.set(-0.1, 0, 0);

    camera.position.set(lerp(0.15, 0.06, smooth(u)), lerp(1.42, 1.38, smooth(u)), lerp(1.45, 1.15, smooth(u)));
    lookTarget.set(0.04, 1.30, -0.92);
    dof = { focusDist: 2.1, aperture: 0.011, halation: 0.24 };
    simLog = {
      tag: 'NORTH PREFAB // ROBOTICS CLUBROOM EXHIBITION',
      title: '倉田先輩「大馬鹿野郎だな。でもいいよ、最高だ！ 死ぬなよ、一年」',
      detail: '胸の霧が完全に晴れた — 一度の正解を捨てるのは後退ではなく助走',
    };
  }
  // =========================================================================
  // CUT 07 (90..104s): Late Nov Winter Chill, 24V PSU & Overseas White Parcel Box!
  // =========================================================================
  else if (t < 104.0) {
    const u = (t - 90.0) / 14.0;
    world.setActiveSet('room203');
    lights.setPreset('room_winter_night');
    deskGroup.visible = true;
    psu24v.visible = true;
    bareMotor.parcelBox.visible = true;
    bareMotor.group.visible = true;
    condWindow.setDropletProgress(0.15);

    camera.position.set(lerp(-0.46, 0.16, smooth(u)), lerp(1.12, 1.02, smooth(u)), lerp(0.18, -0.10, smooth(u)));
    lookTarget.set(-0.08, 0.78, -0.52);
    dof = { focusDist: 0.62, aperture: 0.016, halation: 0.28 };
    simLog = {
      tag: 'DAY 234 // LATE NOV · BUDGET ¥374,520 → ¥345,920',
      title: '24V可変安定化電源 ＆ 海を越えて届いた白い小箱（-¥28,600）',
      detail: '年末集中シフトを申請し、最初の『実験用の種』が冬の六畳間へ届く',
    };
  }
  // =========================================================================
  // CUT 08 (104..122s): EXTREME MACRO HERO REVEAL — Bare 80mm Steel & Copper Outrunner Motor!
  // =========================================================================
  else if (t < 122.0) {
    const u = (t - 104.0) / 18.0;
    world.setActiveSet('room203');
    lights.setPreset('room_winter_macro');
    deskGroup.visible = true;
    psu24v.visible = true;
    bareMotor.parcelBox.visible = true;
    bareMotor.group.visible = true;

    // Stepped magnetic cogging rotation ("ゴリ、ゴリ、ゴリ")!
    const cogRaw = u * 8.0;
    const cogStep = Math.floor(cogRaw) + smooth(cogRaw % 1.0);
    bareMotor.rotorGroup.rotation.y = cogStep * 0.42;

    // Holographic 5cm circular custom FOC driver PCB ring appears at u > 0.48!
    bareMotor.focHolo.visible = u > 0.48;
    if (bareMotor.focHolo.visible) {
      bareMotor.focHolo.rotation.y = t * 1.4;
      bareMotor.focHolo.position.y = 0.056 + Math.sin(t * 3.0) * 0.005;
    }

    // Slender fingernail-detailed right hand reaches cleanly from +X right side turning rotor rim!
    macroHand.group.visible = true;
    macroHand.group.scale.setScalar(0.56);
    macroHand.group.position.set(0.172, 0.802, -0.50);
    macroHand.group.rotation.set(0.08, Math.PI * 0.52, -0.10 + Math.sin(t * 6) * 0.04);

    // Sweeping ultra-close macro orbit showcasing copper coils + RED/YELLOW/BLACK bare wires!
    camera.position.set(lerp(0.18, -0.14, smooth(u)), lerp(0.95, 0.91, smooth(u)), lerp(-0.22, -0.20, smooth(u)));
    lookTarget.set(0.04, 0.78, -0.52);
    dof = { focusDist: 0.34, aperture: 0.020, halation: 0.34 };
    simLog = {
      tag: 'MACRO SPECIMEN // 80mm RAW BLDC OUTRUNNER MOTOR',
      title: '直径8cmの『鉄と銅の輪っか』— 剥き出しの赤銅コイル＆赤・黄・黒3相裸線',
      detail: 'ゴリ、ゴリ…… 脳も神経もない塊へ、直径5cm自作丸型FOC基板で命を吹き込む！',
    };
  }
  // =========================================================================
  // CUT 09 (122..138s): Day 245 Dec 6 Midnight — Plaid Blanket & Full-Scale 720mm Wall Drawing!
  // =========================================================================
  else if (t < 138.0) {
    const u = (t - 122.0) / 16.0;
    world.setActiveSet('room203');
    lights.setPreset('room_winter_night');
    newsWall.group.visible = true;
    condWindow.setDropletProgress(0.25);

    const drawP = smooth(clamp01(u / 0.76));
    newsWall.updateSilhouette(drawP);

    // Black permanent marker traces the 720mm silhouette while drawing, then Minato steps back admiring!
    newsWall.marker.visible = drawP < 0.96;
    if (newsWall.marker.visible) {
      newsWall.marker.position.set(Math.sin(drawP * 20) * 0.14, lerp(0.10, 0.72, drawP), 0.04);
    }

    minatoWinter.root.visible = true;
    const stepBack = smooth((u - 0.72) / 0.28);
    // Position Minato cleanly to the left wearing his plaid waist blanket without blocking the 720mm silhouette!
    minatoWinter.root.position.set(-0.76 - stepBack * 0.14, 0, -1.06 + stepBack * 0.18);
    minatoWinter.root.rotation.set(0, 0.85, 0);
    minatoWinter.rightArm.shoulder.rotation.set(lerp(-0.95, -0.10, stepBack), 0, 0);

    // Subtle white winter breath puff rising near Minato's mouth
    breathPuff.visible = true;
    const bp = (t * 0.65) % 1.0;
    breathPuff.position.set(minatoWinter.root.position.x + 0.14 + bp * 0.14, 1.50 + bp * 0.08, minatoWinter.root.position.z + 0.10);
    breathPuff.scale.setScalar(0.6 + bp * 1.1);

    // Wide cinematic framing showing Minato (plaid blanket), FULL 720mm newspaper silhouette, AND tiny 38cm HMD-01 above!
    camera.position.set(lerp(0.22, 0.08, smooth(u)), lerp(0.62, 0.88, smooth(u)), lerp(-0.36, 0.36, smooth(u)));
    lookTarget.set(lerp(0.02, -0.22, smooth(u)), lerp(0.46, 0.76, smooth(u)), -1.55);
    dof = { focusDist: 1.55, aperture: 0.011, halation: 0.26 };
    simLog = {
      tag: 'DAY 245 // DEC 06 MIDNIGHT · FULL SCALE 1:1',
      title: 'チェック柄電気ひざ掛け＆新聞紙二枚の原寸大『720mm』シルエット',
      detail: 'でかい — 本棚の38cm『HMD-01』が弟に見える影が「俺を立たせてみろ」と見返す',
    };
  }
  // =========================================================================
  // CUT 10 (138..150s): Pressing Cold 80mm Motor onto Right Knee & Winter Condensation Droplet!
  // =========================================================================
  else {
    const u = (t - 138.0) / 12.0;
    world.setActiveSet('room203');
    lights.setPreset('room_winter_night');
    newsWall.group.visible = true;
    newsWall.updateSilhouette(1.0);
    wallMotor.group.visible = true;

    if (u < 0.58) {
      const k = smooth(u / 0.58);
      // Cold bare 80mm copper motor pressed directly onto the drawn right-knee circle on the newspaper wall!
      wallMotor.group.position.set(0.11, 0.34, lerp(-1.46, -1.59, k));
      macroHand.group.visible = true;
      macroHand.group.scale.setScalar(0.56);
      macroHand.group.position.set(0.245, 0.34, lerp(-1.45, -1.58, k));
      macroHand.group.rotation.set(0.05, Math.PI * 0.52, 0.0);

      camera.position.set(lerp(0.16, 0.12, k), lerp(0.42, 0.36, k), lerp(-0.98, -1.08, k));
      lookTarget.set(0.10, 0.34, -1.59);
      dof = { focusDist: 0.55, aperture: 0.016, halation: 0.32 };
      simLog = {
        tag: 'DAY 245 // COLD IRON ON RIGHT KNEE JOINT',
        title: '壁の『HMD-02』右膝へ冷たい銅コイルの輪を押し当てる',
        detail: 'まずはこの1個を自分の電気で生き物のように回す — すべてはそこから始まる',
      };
    } else {
      const k = smooth((u - 0.58) / 0.42);
      // Glide smoothly across to the winter condensation window as a glistening droplet rolls down!
      condWindow.setDropletProgress(k);
      camera.position.set(lerp(0.75, 0.94, k), lerp(1.04, 0.96, k), lerp(-0.88, -0.96, k));
      lookTarget.set(0.96, lerp(1.10, 0.88, k), -1.61);
      dof = { focusDist: 0.68, aperture: 0.015, halation: 0.36 };
      simLog = {
        tag: 'END OF CHAPTER 11 // DAY 245 · BUDGET ¥345,920',
        title: '窓ガラスを流れ落ちる冬の結露 —— 火花散る冬の幕開け',
        detail: '次章：第12章『火花と焦土の冬休み』— 自作丸型FOC基板の挑戦へ続く',
      };
    }
  }

  if (hudCb) hudCb({ simLog });
  return dof;
}
