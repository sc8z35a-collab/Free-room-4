export const CH13_DURATION = 150.0;

export const CH13_SCENES = [
  { id: 1, start: 0,   end: 22,  jp: 'Day 281–360 春休み · ¥168,400大量発注＆1,200粒ハンダ付け修行（12基完成）' },
  { id: 2, start: 22,  end: 40,  jp: 'Day 366 満開の二度目の桜 · 大学二年生進級＆『電気電子工学実験Ⅰ』オシロスコープ' },
  { id: 3, start: 40,  end: 62,  jp: 'Day 367 夜 · 6基同時駆動の怪奇現象 — 末端痙攣『ビクッ！』＆通信途絶' },
  { id: 4, start: 62,  end: 82,  jp: '秋葉原ガード下・中古計測器店『整備済 ¥24,800』＆満員電車で抱える宝物' },
  { id: 5, start: 82,  end: 104, jp: 'Day 370 深夜23時 · 消灯の六畳間に浮かぶ青い格子 — 『針山の光のトゲ』幽霊の正体！' },
  { id: 6, start: 104, end: 122, jp: '電気屋の反撃 · 赤白二重螺旋の縒り線＆120Ω終端抵抗＆黒フェライトコア' },
  { id: 7, start: 122, end: 150, jp: 'Day 372 深夜 · 全12基同時駆動＆澄み切った方形波・1m双方向ハプティクス同期！' },
];

export const CH13_SUBTITLES = [
  // Cut 01 (0..22s): ¥168,400 Order & 1,200-Part Soldering Meditation -> 12 Muscles in Organizer Box
  { start: 0.4,   end: 8.6,   speaker: 'ナレーション', text: '1月下旬、震える指で押した『168,400円』の大発注。裸モーター14個、歯車14組、丸基板15枚、ごま粒より小さな部品1,200個超。' },
  { start: 8.8,   end: 15.8,  speaker: 'ナレーション', text: '2月から3月の長い春休み、拡大鏡を覗き込み松脂の甘い煙の中で1,200回以上ハンダを溶かす。写経のような静かな修行の日々。' },
  { start: 16.0,  end: 21.8,  speaker: 'ナレーション', text: 'プラスチックの仕切り箱に5個、8個、10個……そして3月末、ついに12個すべての丸い人工筋肉が美しく並んだ！' },

  // Cut 02 (22..40s): Day 366 Full-Bloom Cherry Blossoms, 2nd-Year Student & Engineering Lab Oscilloscope
  { start: 22.4,  end: 31.6,  speaker: 'ナレーション', text: 'Day 366（4月6日）丸一年。満開のソメイヨシノの下、黒いスーツの新入生とすれ違う十九歳の湊は、もう去年の少年ではなかった。' },
  { start: 31.8,  end: 39.8,  speaker: 'ナレーション', text: '大学二年生の必修『電気電子工学実験Ⅰ』。長机の真ん中で緑と黄色の光の波を映す『オシロスコープ』から、湊は目を離せなかった。' },

  // Cut 03 (40..62s): Day 367 Night — 6-Joint Right Leg Seizure & Cascading CAN Timeouts
  { start: 40.4,  end: 49.4,  speaker: 'ナレーション', text: '翌夜、右脚6個の筋肉を平行な通信線で数珠つなぎにし24Vオン。1番目を押して一斉に電流を吸い込んだ瞬間——「ビクッ！！ ガガッ！！」' },
  { start: 49.6,  end: 56.2,  speaker: 'ナレーション', text: '誰も触っていない右端の5番目と6番目が激しく痙攣して脱力！ 画面には『通信途絶・応答なし』の赤い警告が滝のように流れた。' },
  { start: 56.4,  end: 61.8,  speaker: '佐伯 湊', text: '「……幽霊でもいるのかよ、この線の中に……」——断線ゼロ、テスターも穏やかな24.00V。水面下に目に見えない嵐が潜んでいた。' },

  // Cut 04 (62..82s): Akihabara Back-Alley Used Scope (`¥24,800`) & Hugging It Home on the Train
  { start: 62.4,  end: 73.6,  speaker: 'ナレーション', text: '放課後、秋葉原ガード下奥の薄暗い中古計測器店。棚の最下段で埃をかぶっていた黄色く日焼けしたオシロスコープ——『整備済 24,800円』。' },
  { start: 73.8,  end: 81.8,  speaker: 'ナレーション', text: '帰りの満員電車の中、湊は重さ3キロの『見えない電気を見る窓』を網棚にも乗せず、宝物を守るように両膝の上へしっかり抱えた。' },

  // Cut 05 (82..104s): Day 370 23:00 — Lights Out! The Ghost Revealed on the Blue Grid!
  { start: 82.4,  end: 90.6,  speaker: 'ナレーション', text: 'Day 370午後11時。蛍光灯をパチンと消した暗闇に、青い格子模様の画面が浮かび上がる。細い測定プローブを神経の線へ当てた瞬間——' },
  { start: 90.8,  end: 98.2,  speaker: 'ナレーション', text: '綺麗な四角い波の上に、ガラスの破片か針山のような『激しい光のトゲ』と跳ね返る山彦がびっしり降り注ぎ、言葉を押し潰していた！' },
  { start: 98.4,  end: 103.8, speaker: '佐伯 湊', text: '「……見えた。いたぞ、幽霊の正体が……！」——姿さえ見えてしまえば怖くない。そこは自分が一年間学んできた『電気屋』の庭だ！' },

  // Cut 06 (104..122s): Double-Helix Red/White Twisted Pair, 120Ω Termination Resistor & Ferrite Core!
  { start: 104.4, end: 113.2, speaker: 'ナレーション', text: '赤と白の細い電線を2本揃え、指先が赤く痛くなるまで隙間なく美しい『二重螺旋』に縒り合わせる。飛び込む磁気ノイズが引き算でゼロへ消える！' },
  { start: 113.4, end: 121.8, speaker: 'ナレーション', text: '神経の最末端へ山彦を吸い取る1粒の『120Ω終端抵抗』をハンダ付けし、太い電源線の根元へ黒い磁石の輪『フェライトコア』を通した。' },

  // Cut 07 (122..150s): Day 372 Midnight — ALL 12 Muscles United, Razor-Clean Square Waves & Bilateral Haptics!
  { start: 122.4, end: 131.6, speaker: 'ナレーション', text: 'Day 372深夜、両脚12個すべての丸い筋肉が螺旋の神経で結ばれた。暗闇の画面から針山のトゲは跡形もなく消え、刃物のように澄み切った四角い波が駆け抜ける！' },
  { start: 131.8, end: 138.6, speaker: 'ナレーション', text: '左端の1番目をそっと動かすと、1m離れた右端の12番目が0.001秒の遅れもなく鏡の影のようにピタリと同じ角度で追従した！' },
  { start: 138.8, end: 144.6, speaker: '佐伯 湊', text: '右端を押さえると、1m離れた左端の指先に重みが生々しく返ってくる。「……すげえ……神経が、完全に繋がった……！！」' },
  { start: 144.8, end: 149.8, speaker: 'ナレーション', text: '心臓と神経は完成した。次は7.6kgのパワーを受け止める『黒い金属と炭素の骨格』を手に入れる番だ——春の夜風の中、図面が開かれた。' },
];

export function getCh13Scene(t) {
  for (let i = CH13_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH13_SCENES[i].start) return CH13_SCENES[i];
  }
  return CH13_SCENES[0];
}

export function getCh13Subtitle(t) {
  for (let i = 0; i < CH13_SUBTITLES.length; i++) {
    const s = CH13_SUBTITLES[i];
    if (t >= s.start && t <= s.end) return { speaker: s.speaker, text: s.text };
  }
  return null;
}

export function getCh13Cutin(t) {
  if (t >= 16.5 && t < 21.0) return { text: '1,200粒のハンダ付け完遂 — 人工筋肉 全12基 揃い踏み！', tone: 'emerald' };
  if (t >= 46.2 && t < 51.2) return { text: 'ビクッ！！ 6基同時駆動の怪奇 — 末端痙攣＆CAN通信途絶！', tone: 'crimson' };
  if (t >= 66.0 && t < 71.0) return { text: '秋葉原ガード下・中古オシロスコープ『整備済 ¥24,800』導入！', tone: 'amber' };
  if (t >= 92.0 && t < 98.0) return { text: '幽霊の正体 ＝ 針山のEMIスパイク＆配線反射（山彦）捕捉！', tone: 'crimson' };
  if (t >= 108.0 && t < 114.0) return { text: '電気屋の知恵：赤白二重螺旋縒り線 ＋ 120Ω終端抵抗 ＋ フェライトコア', tone: 'amber' };
  if (t >= 134.0 && t < 141.5) return { text: '全12基完全同期＆双方向力覚フィードバック — 神経、完全開通！', tone: 'emerald' };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

export function evaluateCh13Timeline(t, world, screens, lights, camera, lookTarget, hudCb) {
  const {
    deskGroup,
    shelfGroup,
    laptopGroup,
    magnifierOrg,
    vintageScope,
    muscleBus,
    doubleHelixMacro,
    sanwaMeter,
    cncSkeletonGroup,
    macroHandR,
    macroHandL,
    minatoSpring,
    freshmanA,
    freshmanB,
    labScopeHero,
    labScopeL,
    labScopeR,
    shopHeroScope,
  } = world;

  // Deterministic reset every frame
  deskGroup.visible = true;
  shelfGroup.visible = true;
  laptopGroup.visible = false;
  magnifierOrg.group.visible = false;
  vintageScope.group.visible = false;
  vintageScope.probeGroup.visible = false;
  vintageScope.priceTag.visible = false;
  muscleBus.group.visible = false;
  doubleHelixMacro.group.visible = false;
  sanwaMeter.group.visible = false;
  cncSkeletonGroup.visible = false;
  macroHandR.group.visible = false;
  macroHandL.group.visible = false;
  lights.setScopeGlow(0);

  let dof = { focusDist: 0.7, aperture: 0.010, halation: 0.26 };
  let simLog = null;

  // =========================================================================
  // CUT 01 (0..22s): ¥168,400 Order & Spring Break 1,200-SMD Soldering -> 12 Muscles Complete!
  // =========================================================================
  if (t < 22.0) {
    world.setActiveSet('room203');
    lights.setPreset('room_spring_lamp');

    if (t < 9.0) {
      // 0..9s: Massive ¥168,400 Parts Order Checkout on Laptop!
      const k = smooth(t / 9.0);
      laptopGroup.visible = true;
      laptopGroup.position.set(0.0, 0.738, -0.58);
      laptopGroup.rotation.y = 0.0;
      screens.updateLaptop('order_168k');

      camera.position.set(lerp(0.05, 0.0, k), lerp(0.90, 0.86, k), lerp(-0.18, -0.25, k));
      lookTarget.set(0.0, 0.85, -0.68);
      dof = { focusDist: 0.45, aperture: 0.004, halation: 0.24 };
      simLog = {
        tag: 'DAY 281 // LATE JAN · MASS PRODUCTION ORDER',
        title: '震える指で押した『¥168,400』の大発注 —— 12基量産への砂漠',
        detail: '裸モーター14個・歯車14組・丸基板15枚・ごま粒より小さな部品1,200個超',
      };
    } else {
      // 9..22s: Magnifier Lamp + Soldering Iron Rosin Smoke + 12-Slot Organizer Filling 5 -> 8 -> 10 -> 12!
      const u = (t - 9.0) / 13.0;
      magnifierOrg.group.visible = true;
      const doneCount = Math.min(12, Math.max(5, Math.floor(5 + u * 8.5)));
      magnifierOrg.update(t, doneCount);

      camera.position.set(lerp(-0.16, 0.28, smooth(u)), lerp(1.02, 1.14, smooth(u)), lerp(-0.08, -0.02, smooth(u)));
      lookTarget.set(lerp(-0.08, 0.22, smooth(u)), 0.78, -0.42);
      dof = { focusDist: 0.48, aperture: 0.011, halation: 0.28 };
      simLog = {
        tag: `SPRING BREAK // 1,200+ SMD SOLDERING (${doneCount} / 12 COMPLETE)`,
        title: doneCount >= 12 ? '3月末・全12基の丸い人工筋肉完成！ 右手中指に刻まれたハンダごてダコ' : `拡大鏡と松脂の煙 —— 仕切り箱に増える丸い筋肉（${doneCount} / 12基）`,
        detail: '誰にも褒められない写経のような2ヶ月間。冷めた白湯と静かな喜び',
      };
    }
  }
  // =========================================================================
  // CUT 02 (22..40s): Day 366 Full-Bloom Cherry Blossoms & 2nd-Year Engineering Lab Oscilloscope!
  // =========================================================================
  else if (t < 40.0) {
    if (t < 32.0) {
      // 22..32s: Full-Bloom Somei-Yoshino Campus Gate, 180 Swirling Pink Petals & Black-Suited Freshmen!
      const k = smooth((t - 22.0) / 10.0);
      world.setActiveSet('sakura');
      lights.setPreset('sakura_spring_sun');
      world.updateSakuraPetals(t);

      minatoSpring.root.position.set(-0.65, 0, lerp(-1.2, -3.4, k));
      minatoSpring.root.rotation.set(0, Math.PI, 0);
      const wp = t * 4.8;
      minatoSpring.leftLeg.hipJoint.rotation.x = Math.sin(wp) * 0.28;
      minatoSpring.rightLeg.hipJoint.rotation.x = -Math.sin(wp) * 0.28;

      freshmanA.root.position.set(0.85, 0, lerp(-5.2, -2.6, k));
      freshmanB.root.position.set(1.55, 0, lerp(-5.6, -3.0, k));
      freshmanA.leftLeg.hipJoint.rotation.x = Math.sin(wp + 0.8) * 0.26;
      freshmanA.rightLeg.hipJoint.rotation.x = -Math.sin(wp + 0.8) * 0.26;

      // Crisp 3/4 wide shot showing towering pink sakura canopies, petals, freshmen & calm 19-year-old Minato!
      camera.position.set(lerp(-2.2, -1.6, k), lerp(1.58, 1.65, k), lerp(1.8, 0.4, k));
      lookTarget.set(0.15, 1.85, -4.2);
      dof = { focusDist: 4.5, aperture: 0.008, halation: 0.34 };
      simLog = {
        tag: 'DAY 366 // APR 06 THU · ONE FULL YEAR',
        title: '満開の二度目の桜 —— 大学二年生へ進級した十九歳の静かな目つき',
        detail: '黒いスーツの新入生とすれ違い、本棚のHMD-01と12個の筋肉を胸に実験棟へ',
      };
    } else {
      // 32..40s: 2nd-Year Electrical Engineering Lab (`電気電子工学実験Ⅰ`) — Glowing Lab Oscilloscope!
      const k = smooth((t - 32.0) / 8.0);
      world.setActiveSet('uniLab');
      lights.setPreset('uni_lab_day');
      labScopeHero.drawScope(t, 'lab_demo');
      labScopeL.drawScope(t + 1.2, 'lab_demo');
      labScopeR.drawScope(t + 2.4, 'lab_demo');

      camera.position.set(lerp(-0.42, -0.06, k), lerp(1.16, 0.96, k), lerp(-0.12, -0.58, k));
      lookTarget.set(-0.04, 0.92, -1.12);
      dof = { focusDist: 0.65, aperture: 0.004, halation: 0.26 };
      simLog = {
        tag: 'ELECTRICAL ENGINEERING LAB I // BENCHTOP OSCILLOSCOPE',
        title: '『電気電子工学実験Ⅰ』—— 緑と黄色の光の波を映すオシロスコープに釘付け',
        detail: '油とオゾンの匂いがする広い実験室。見えない電気の波を映す魔法の窓',
      };
    }
  }
  // =========================================================================
  // CUT 03 (40..62s): Day 367 Night — 6-Joint Right Leg EMI Seizure & Cascading CAN Timeouts!
  // =========================================================================
  else if (t < 62.0) {
    const dt = t - 40.0;
    world.setActiveSet('room203');
    lights.setPreset('room_spring_lamp');
    muscleBus.group.visible = true;
    muscleBus.setMode('loose_6');
    laptopGroup.visible = true;
    laptopGroup.position.set(0.42, 0.738, -0.66);
    laptopGroup.rotation.y = -0.32;
    sanwaMeter.group.visible = true;

    const seizing = dt >= 5.5;
    if (!seizing) {
      // Calm 3 seconds -> hand presses Joint #1
      const p = smooth(clamp01((dt - 2.5) / 2.8));
      muscleBus.setJointAngles([-0.38 * p, 0, 0, 0, 0, 0], []);
      muscleBus.updateEmiArcs(t, 0.0);
      screens.updateLaptop('order_168k');
    } else {
      // VIOLENT EMI SEIZURE on Joint #5 (idx 4) & Joint #6 (idx 5) -> limp drop!
      const szT = dt - 5.5;
      const twitch5 = szT < 4.5 ? Math.sin(t * 58) * 0.72 + Math.cos(t * 37) * 0.35 : -1.18;
      const twitch6 = szT < 4.5 ? Math.cos(t * 64) * 0.85 - Math.sin(t * 43) * 0.32 : -1.25;
      muscleBus.setJointAngles([-0.25, 0.04, -0.03, 0.05, twitch5, twitch6], [4, 5]);
      muscleBus.updateEmiArcs(t, 0.88);
      screens.updateLaptop('can_timeout');
    }

    if (dt < 12.5) {
      // Frame the 6 chained muscles with loose parallel wires + violent twitching on #5 & #6!
      const k = smooth(dt / 12.5);
      camera.position.set(lerp(-0.42, -0.05, k), lerp(1.06, 0.96, k), lerp(0.28, 0.16, k));
      lookTarget.set(lerp(-0.30, -0.18, k), 0.80, -0.34);
      dof = { focusDist: 0.65, aperture: 0.008, halation: 0.30 };
      simLog = {
        tag: seizing ? 'ANOMALY // JOINTS #5 & #6 VIOLENT SEIZURE!' : 'DAY 367 // 6-JOINT RIGHT LEG DAISY CHAIN',
        title: seizing ? 'ビクッ！！ ガガッ！！ 誰も触っていない右端の5番・6番が勝手に痙攣＆脱力！' : '右脚6基を平行な2本の通信線で数珠つなぎ —— 24V電源オン',
        detail: seizing ? '6個すべてが一斉に電流を吸い込んだ瞬間にだけ現れる『見えない亡霊』' : '1個・2個なら完璧に動いた。だから6個でも動くはずだった…',
      };
    } else {
      // Swing across to Sanwa Multimeter reading calm `24.00V` + Laptop flooding with RED `通信途絶` warnings!
      const k = smooth((dt - 12.5) / 9.5);
      camera.position.set(lerp(0.26, 0.22, k), lerp(1.04, 0.95, k), lerp(0.06, -0.16, k));
      lookTarget.set(0.38, 0.83, -0.58);
      dof = { focusDist: 0.52, aperture: 0.004, halation: 0.28 };
      simLog = {
        tag: 'SANWA MULTIMETER: 24.00V NORMAL // CAN BUS TIMEOUT',
        title: '「……幽霊でもいるのかよ、この線の中に……」',
        detail: '断線なし・電圧24.00V一定 —— テスターでは水面下の高速な嵐が見えない！',
      };
    }
  }
  // =========================================================================
  // CUT 04 (62..82s): Akihabara Underpass Used Equipment Shop (`¥24,800`) & Evening Train Home!
  // =========================================================================
  else if (t < 82.0) {
    if (t < 74.0) {
      // 62..74s: Dim Akihabara Back-Alley Used Scope Shop — Spotlight on Yellowed Scope (`整備済 ¥24,800`)!
      const k = smooth((t - 62.0) / 12.0);
      world.setActiveSet('akihabara');
      lights.setPreset('akihabara_dim');
      shopHeroScope.priceTag.visible = true;
      shopHeroScope.drawScope(0, 'off');

      camera.position.set(lerp(-0.48, 0.06, k), lerp(1.12, 0.42, k), lerp(0.55, -0.56, k));
      lookTarget.set(0.02, lerp(0.75, 0.35, k), -1.16);
      dof = { focusDist: 0.72, aperture: 0.005, halation: 0.30 };
      simLog = {
        tag: 'AKIHABARA UNDERPASS // USED TEST EQUIPMENT SHOP',
        title: '秋葉原ガード下の薄暗い中古店 —— 埃をかぶった『整備済 ¥24,800』オシロスコープ',
        detail: 'どんな高級な服やスマホよりも欲しかった、傷だらけの『目に見えない電気を見る窓』',
      };
    } else {
      // 74..82s: Evening Chuo-Line Commuter Train — Minato Hugging the 3kg Scope Like a Treasure!
      const k = smooth((t - 74.0) / 8.0);
      world.setActiveSet('train');
      lights.setPreset('train_evening');
      world.updateTrainStreaks(t);

      camera.position.set(lerp(0.68, 0.38, k), lerp(1.12, 1.02, k), lerp(1.15, 0.85, k));
      lookTarget.set(0.0, 0.82, -0.52);
      dof = { focusDist: 1.5, aperture: 0.010, halation: 0.34 };
      simLog = {
        tag: 'CHUO LINE // RETURNING TO MUSASHINO',
        title: '満員電車の中、重さ3kgの計測器を壊れやすい宝物のように両膝の上に抱えて',
        detail: '網棚にも乗せず、まっすぐ203号室へ持ち帰った',
      };
    }
  }
  // =========================================================================
  // CUT 05 (82..104s): Day 370 23:00 — LIGHTS OUT! THE GHOST REVEALED ON THE BLUE GRID!
  // =========================================================================
  else if (t < 104.0) {
    const u = (t - 82.0) / 22.0;
    world.setActiveSet('room203');
    lights.setPreset('room_scope_dark');
    lights.setScopeGlow(3.2);

    vintageScope.group.visible = true;
    vintageScope.group.position.set(0.0, 0.738, -0.66);
    vintageScope.probeGroup.visible = true;
    muscleBus.group.visible = true;
    muscleBus.setMode('loose_6');
    muscleBus.updateEmiArcs(t, u > 0.25 ? 0.92 : 0.0);
    muscleBus.setJointAngles([-0.15, 0, 0, 0, Math.sin(t * 50) * 0.45, Math.cos(t * 54) * 0.52], u > 0.25 ? [4, 5] : []);

    vintageScope.drawScope(t, u > 0.25 ? 'ghost_spikes' : 'clean_12ch');

    if (u < 0.36) {
      // Touch sharp needle measurement probe to parallel wire in the dark blue-lit room!
      const k = smooth(u / 0.36);
      macroHandR.group.visible = true;
      macroHandR.group.scale.setScalar(0.54);
      macroHandR.group.position.set(0.08, 0.768, -0.30);
      macroHandR.group.rotation.set(0.06, Math.PI * 0.52, -0.08);

      camera.position.set(lerp(-0.22, -0.08, k), lerp(1.00, 0.92, k), lerp(0.10, -0.14, k));
      lookTarget.set(-0.06, 0.82, -0.58);
      dof = { focusDist: 0.56, aperture: 0.008, halation: 0.38 };
    } else {
      // EXTREME RAZOR-SHARP MACRO PUSH-IN ONTO THE GLOWING BLUE CRT SCREEN REVEALING THE JAGGED GLASS-SHARD SPIKES!
      const k = smooth((u - 0.36) / 0.64);
      camera.position.set(lerp(-0.08, -0.068, k), lerp(0.89, 0.842, k), lerp(-0.18, -0.325, k));
      lookTarget.set(-0.068, 0.840, -0.506);
      dof = { focusDist: 0.22, aperture: 0.0025, halation: 0.36 };
    }
    simLog = {
      tag: 'DAY 370 // 23:00 LIGHTS OUT · OSCILLOSCOPE CAPTURE',
      title: u > 0.25 ? '「……見えた。いたぞ、幽霊の正体が……！」—— 針山の光のトゲ＆山彦反射！' : '蛍光灯を消した暗闇に浮かぶ青い格子模様 —— 測定プローブ接触！',
      detail: '姿さえ見えれば怖くない。そこは自分が一年間学んできた『電気屋』の庭だ！',
    };
  }
  // =========================================================================
  // CUT 06 (104..122s): Electrical Engineer's Counterattack — Double-Helix Twisted Pair, 120Ω & Ferrite Core!
  // =========================================================================
  else if (t < 122.0) {
    const u = (t - 104.0) / 18.0;
    world.setActiveSet('room203');
    lights.setPreset('room_spring_lamp');
    doubleHelixMacro.group.visible = true;
    doubleHelixMacro.animateTwist(t);

    // Sweeping ultra-close macro showcasing Ferrite Core (left) -> Tight Red/White Double Helix (center) -> 120Ω Termination Resistor (right)!
    camera.position.set(lerp(-0.18, 0.20, smooth(u)), lerp(0.88, 0.85, smooth(u)), lerp(-0.12, -0.14, smooth(u)));
    lookTarget.set(lerp(-0.08, 0.08, smooth(u)), 0.793, -0.44);
    dof = { focusDist: 0.34, aperture: 0.008, halation: 0.28 };
    simLog = {
      tag: 'EMI COUNTERMEASURE // DOUBLE-HELIX + 120Ω + FERRITE',
      title: '赤と白の『美しい二重螺旋』縒り線 ＋ 山彦を吸う120Ω終端抵抗 ＋ 黒いフェライトコア',
      detail: '百年以上の電話線の知恵 —— 飛び込む磁気ノイズを引き算でゼロへ打ち消す！',
    };
  }
  // =========================================================================
  // CUT 07 (122..150s): Day 372 Midnight — ALL 12 Muscles United, Razor-Clean Waves & Bilateral Haptics!
  // =========================================================================
  else {
    const dt = t - 122.0;
    world.setActiveSet('room203');
    vintageScope.group.visible = true;
    vintageScope.group.position.set(-0.34, 0.785, -0.68);
    vintageScope.drawScope(t, 'clean_12ch');
    muscleBus.group.visible = true;
    muscleBus.setMode('twisted_12');
    laptopGroup.visible = true;
    laptopGroup.position.set(0.42, 0.738, -0.68);
    laptopGroup.rotation.y = -0.26;

    if (dt < 10.0) {
      // 122..132s: Dark Lab — Razor-Clean Glass-Smooth Square Waves on Scope with ALL 12 Muscles Awake!
      const k = smooth(dt / 10.0);
      lights.setPreset('room_scope_dark');
      lights.setScopeGlow(2.8);
      muscleBus.setJointAngles(new Array(12).fill(0), []);
      muscleBus.updateHapticPulses(t, true, false);
      screens.updateLaptop('bilateral_ok', 0);

      camera.position.set(lerp(-0.408, -0.32, k), lerp(0.892, 0.99, k), lerp(-0.33, 0.04, k));
      lookTarget.set(lerp(-0.408, -0.22, k), lerp(0.888, 0.86, k), lerp(-0.526, -0.50, k));
      dof = { focusDist: 0.48, aperture: 0.0035, halation: 0.34 };
      simLog = {
        tag: 'DAY 372 // ALL 12 MUSCLES ONLINE · 0.0mV NOISE',
        title: '針山のトゲは跡形もなく消えた —— 刃物のように澄み切った四角い光の波！',
        detail: '両脚12基すべての人工筋肉が一斉に踏ん張っても、嵐の翌朝の湖面のように穏やか',
      };
    } else if (dt < 22.0) {
      // 132..144s: BILATERAL HAPTIC MIRROR TELEOPERATION (`#01 ⇄ #12`, 1m apart, 0.001s sync!)
      const u = (dt - 10.0) / 12.0;
      lights.setPreset('room_spring_lamp');
      lights.setScopeGlow(1.6);

      // Smooth sinusoidal tilt of Joint #1 mirrored instantaneously by Joint #12 (1m away)!
      const mirrorRad = Math.sin(u * Math.PI * 2.0) * 0.58;
      const mirrorDeg = -mirrorRad * 57.3;
      const angles = new Array(12).fill(0);
      angles[0] = mirrorRad;
      angles[11] = mirrorRad;
      // Subtle gentle wave across middle joints showing alive tension
      for (let m = 1; m <= 10; m++) angles[m] = mirrorRad * 0.08;
      muscleBus.setJointAngles(angles, []);

      const backForceActive = u > 0.48;
      muscleBus.updateHapticPulses(t, true, backForceActive);
      screens.updateLaptop('bilateral_ok', mirrorDeg);

      // Left hand tilting Joint #1 on far left (`x = -0.55`) & Right hand resisting Joint #12 on far right (`x = +0.55`)!
      macroHandL.group.visible = true;
      macroHandL.group.scale.setScalar(0.52);
      macroHandL.group.position.set(-0.64 - Math.sin(mirrorRad) * 0.06, 0.865, -0.32);
      macroHandL.group.rotation.set(0.08, -Math.PI * 0.52, 0.06);

      macroHandR.group.visible = backForceActive;
      macroHandR.group.scale.setScalar(0.52);
      macroHandR.group.position.set(0.64 - Math.sin(mirrorRad) * 0.06, 0.865, -0.32);
      macroHandR.group.rotation.set(0.08, Math.PI * 0.52, -0.06);

      // Dramatic wide front-above shot capturing ALL 12 gleaming muscles, BOTH hands 1m apart & bidirectional nerve pulses!
      camera.position.set(0.0, lerp(1.12, 1.06, smooth(u)), lerp(0.86, 0.72, smooth(u)));
      lookTarget.set(0.0, 0.82, -0.38);
      dof = { focusDist: 1.15, aperture: 0.008, halation: 0.34 };
      simLog = {
        tag: backForceActive ? 'BILATERAL HAPTICS // FORCE FEEDBACK #12 → #01!' : 'MIRROR TELEOP // JOINT #01 → JOINT #12 (0.001s SYNC)',
        title: backForceActive ? '「……すげえ……神経が、完全に繋がった……！！」' : '1m離れた1番目と12番目が、鏡に映った影のように0.001秒の遅れもなく完全同期！',
        detail: backForceActive ? '右端の抵抗が、細い螺旋の電線を伝わって左手の指先へ生々しく返ってくる！' : '『ここからは電気屋が一番強い世界だよ』—— 榊原の言葉の意味が全身を駆け巡る',
      };
    } else {
      // 144..150s: EPIC FINALE PULLBACK — All 12 Muscles + Clean Oscilloscope + Black CNC Aluminum & Carbon Skeleton Teaser!
      const u = smooth((dt - 22.0) / 6.0);
      lights.setPreset('room_spring_lamp');
      lights.setScopeGlow(1.4);
      muscleBus.setJointAngles(new Array(12).fill(Math.sin(t * 2.0) * 0.08), []);
      muscleBus.updateHapticPulses(t, true, true);
      screens.updateLaptop('bilateral_ok', 0);
      cncSkeletonGroup.visible = true;

      camera.position.set(lerp(0.0, 0.16, u), lerp(1.06, 1.18, u), lerp(0.76, 1.08, u));
      lookTarget.set(0.02, lerp(0.84, 1.04, u), lerp(-0.50, -1.42, u));
      dof = { focusDist: 1.8, aperture: 0.007, halation: 0.34 };
      simLog = {
        tag: 'END OF CHAPTER 13 // DAY 372 · BUDGET ¥426,220',
        title: '心臓（12基）と神経は完成 —— 次は『黒い金属と炭素の骨格』へ！',
        detail: '次章：第14章『黒い金属と炭素の骨格』— 72cmの巨人がついに六畳間へ姿を現す日',
      };
    }
  }

  if (hudCb) hudCb({ simLog });
  return dof;
}
