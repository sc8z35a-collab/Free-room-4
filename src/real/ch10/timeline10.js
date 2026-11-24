import * as THREE from 'three';

export const CH10_DURATION = 150.0;

export const CH10_SCENES = [
  { id: 1, start: 0,   end: 24,  jp: 'Day 214 深夜 · 203号室の38本ボルト点検＆ハードケース収納・枕元の夜風' },
  { id: 2, start: 24,  end: 46,  jp: 'Day 215 08:50 · 浜松町 産業貿易センター＆真っ白な大ホール『No.38』' },
  { id: 3, start: 46,  end: 55,  jp: '隣ピット『No.39』榊原恒一＆65cm銀色円盤QDD機との出会い' },
  { id: 4, start: 55,  end: 89,  jp: '11:20 規定審査 · 2mm滑り復帰＆3.0m自律完走『9秒12』・倉田の親指' },
  { id: 5, start: 89,  end: 118, jp: '14:30 外乱テスト · 300g振り子右膝粉砕 vs 榊原QDDクロスステップ反射' },
  { id: 6, start: 118, end: 150, jp: '17:00 夕暮れQDD円盤＆「電気屋の時代」→ 本棚殿堂入り＆オリオン座『HMD-02』【第一部・完】' },
];

export function getCh10Scene(t) {
  for (let i = CH10_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH10_SCENES[i].start) return CH10_SCENES[i];
  }
  return CH10_SCENES[0];
}

export function getCh10Subtitle(t) {
  for (let i = 0; i < CH10_SUBTITLES.length; i++) {
    const s = CH10_SUBTITLES[i];
    if (t >= s.start && t <= s.end) return { speaker: s.speaker, text: s.text };
  }
  return null;
}

export function getCh10Cutin(t) {
  if (t >= 60.8 && t < 64.0) return { text: '2mm滑走 → 自作基板IMU反射復帰！ 仁王立ち！', tone: 'emerald' };
  if (t >= 78.4 && t < 82.8) return { text: '★ ゴール完走！ 記録 9秒12 CLEAR!!（34歩完全自律）', tone: 'amber' };
  if (t >= 94.8 && t < 98.8) return { text: 'パキィンッ、ギャリリッ！！ 右膝ギア粉砕 —「硬すぎる身体」の限界', tone: 'crimson' };
  if (t >= 109.0 && t < 113.2) return { text: 'ドンッ！ → シュンッ・タン、タッ！！ QDD柔軟関節＋クロスステップ反射！！', tone: 'emerald' };
  if (t >= 145.0 && t <= 150.0) return { text: '『 HMD-02 』 —— 【第一部・完】（資金 ¥316,120 / 第二部へ）', tone: 'amber' };
  return null;
}

export const CH10_SUBTITLES = [
  // Cut 01 (0..14s): Nov 5 Sat Midnight — Spotless Room 203 Desk
  { start: 0.4,   end: 6.8,   speaker: 'ナレーション', text: '11月5日深夜。半年ぶりに片付いた203号室の机の上、白い光の中に『HMD-01』だけが静かに座っていた。' },
  { start: 7.0,   end: 13.8,  speaker: 'ナレーション', text: 'アルコール布で河川敷の砂埃を拭き、全身38箇所のボルトを指先の感覚だけで確かめる。' },

  // Cut 02 (14..24s): Packing Hard Case + Bedside Frosted Window
  { start: 14.2,  end: 19.0,  speaker: 'ナレーション', text: '波型ウレタンの黒いハードケースへそっと寝かせ、留め具を閉じた瞬間、胸が頼りなく空っぽになった。' },
  { start: 19.2,  end: 23.8,  speaker: 'ナレーション', text: '11月の風がすりガラスを揺らす夜。冷たいケースの角に触れながら、湊は浅い眠りについた。' },

  // Cut 03 (24..35s): Nov 6 Sun 08:50 — Hamamatsucho Exterior
  { start: 24.4,  end: 30.0,  speaker: 'ナレーション', text: 'Day 215（11月6日）午前8時50分。雲ひとつない青空の下、ガラス張りの産業貿易センター浜松町館。' },
  { start: 30.2,  end: 34.8,  speaker: 'ナレーション', text: '東京湾の冷たい潮風が銀杏の落ち葉をさらう中、湊は黒いケースを握りしめて扉を押し開けた。' },

  // Cut 04 (35..46s): Blazing White Hall & Pit Row (No.37 / No.38 / No.39)
  { start: 35.3,  end: 40.6,  speaker: 'ナレーション', text: '体育館より広い真っ白なホール。50卓以上のピットを埋める大学チームと、鏡面切削の赤と青の金属機たち。' },
  { start: 40.8,  end: 45.8,  speaker: 'ナレーション', text: '会場奥の『No.38』、幅90cmの白いパイプ机に椅子一つ。周りが眩しすぎて、ケースを開ける手がためらわれた。' },

  // Cut 05 (46..55s): Encounter with Sakakibara Koichi & 65cm QDD
  { start: 46.2,  end: 50.6,  speaker: '榊原 恒一', text: '「おはよう、お隣いいかな。……へえ、いい面構えしてるね、その子。角を全部手でヤスリがけしてある」' },
  { start: 50.8,  end: 54.9,  speaker: '榊原 恒一', text: '「何回も転んで、諦めずに直してもらったロボットだけの顔だ」——冷えた湊の指先に、温かい血が戻った。' },

  // Cut 06 (55..68s): 11:20 Regulation Stage — Whistle, 2mm Heel Slip & IMU Save!
  { start: 55.4,  end: 60.2,  speaker: 'アナウンス', text: '『No.38 個人参加・佐伯湊、HMD-01！ 大学1年・完全独学での初出場！』——ピィィッ！！' },
  { start: 60.4,  end: 64.5,  speaker: 'ナレーション', text: 'ツルッ！ ワックス床で右かかとが2ミリ滑った瞬間、緑の自作基板が反射的に両腕を突き出し踏み直した！' },
  { start: 64.7,  end: 68.0,  speaker: 'ナレーション', text: '靴底四隅の1ミリゴムが床を噛み、『HMD-01』は眩しい照明の下にすっくと仁王立ちになった！' },

  // Cut 07 (68..80s): 3.0m Autonomous Sprint — 34 Steps, Record 9.12s CLEAR!!
  { start: 68.4,  end: 74.2,  speaker: 'ナレーション', text: 'タタッ、タタッ、タタッ……！！ 4月の焦げた匂いも、6月の血も、10月の雨も、34歩のすべてに重なって走る。' },
  { start: 74.4,  end: 79.8,  speaker: '審判', text: '『ゴール完走！！ 記録、9秒12！！ 見事な自律走行です！！』——ホール全体から割れんばかりの拍手が沸いた。' },

  // Cut 08 (80..89s): Applause, Bowing & Senior Kurata's Thumbs-Up!
  { start: 80.3,  end: 84.8,  speaker: 'ナレーション', text: '最後列の手すりに立つロボ研の先輩・倉田が、苦笑いしながら湊へ向かって静かに親指をグッと立てた。' },
  { start: 85.0,  end: 88.9,  speaker: 'ナレーション', text: '215日間、一人で走ってきた道が初めて世界の光と繋がった。——だがその午後、湊は本当の限界を目撃する。' },

  // Cut 09 (89..103s): 14:30 Disturbance Test — 300g Pendulum & Right-Knee Shatter!
  { start: 89.4,  end: 94.6,  speaker: 'ナレーション', text: '午後2時半、実環境・外乱テスト。天井の300gウレタン振り子が右足支持の腰へ軽く「トン」と触れた瞬間——' },
  { start: 94.8,  end: 99.2,  speaker: 'ナレーション', text: 'パキィンッ、ギャリリッ！！ 逃げ場のない衝撃が右膝の細かい高減速ギアを内側から砕き、機体が崩れ落ちた。' },
  { start: 99.4,  end: 102.9, speaker: 'ナレーション', text: '外力を受け流せない「石のように硬すぎる身体」。自分自身の硬さで砕け散る、位置制御の限界だった。' },

  // Cut 10 (103..118s): Sakakibara's 65cm QDD Hard Shove & Cross-Step Reflex!
  { start: 103.4, end: 108.8, speaker: 'アナウンス', text: '『続いてNo.39 榊原恒一選手！』——65cmの銀色円盤QDD機が音もなく滑り出し、榊原は自らの手で肩を突き飛ばした！' },
  { start: 109.0, end: 113.8, speaker: 'ナレーション', text: 'ドンッ！ シュンッ——タン、タッ！！ 丸い関節が生身の腱のように撓み、0.2秒で左脚が交差して完全に立て直した！' },
  { start: 114.0, end: 117.9, speaker: 'ナレーション', text: '決められた動きではない。自分の身体で傾きを感じ、意思で踏ん張った——紛れもなく『生き物』の反射だった。' },

  // Cut 11 (118..133s): 17:00 Sunset Pit No.39 — Feather-Light QDD Disc & Handshake!
  { start: 118.4, end: 124.2, speaker: '榊原 恒一', text: '「小指で押してごらん。大きく平たいモーターをわずかな歯車で繋げば、衝撃をバネのように逃がし電気で感じ取れる」' },
  { start: 124.4, end: 129.0, speaker: '榊原 恒一', text: '「仮想空間に何千体もの分身を作り何百万回も学習させた。——電気と磁力を操れる『電気屋』が一番強い時代なんだよ」' },
  { start: 129.2, end: 132.9, speaker: 'ナレーション', text: '「いつかまた、同じリンクで会おう」——差し出された右手を、湊は火傷しそうなほど熱い両手で握り返した。' },

  // Cut 12 (133..150s): 22:00 Room 203 — Honored Bookshelf, Orion & 『HMD-02』【第一部・完】
  { start: 133.4, end: 139.2, speaker: '佐伯 湊', text: 'みかん箱には入れなかった。本棚の最上段へ『規定完走証 9秒12』と座らせる。「……ありがとうな。お前がここまで連れてきてくれた」' },
  { start: 139.4, end: 144.6, speaker: 'ナレーション', text: '窓の外にオリオン座が昇る215日目の夜。資金316,120円。柔らかな関節と自ら学ぶ神経を持つ、全高70cm超の第二世代機へ——' },
  { start: 144.8, end: 149.8, speaker: 'ナレーション', text: '真っ白な新しい大学ノートの最初のページ中央に、佐伯湊は力強い筆圧で刻んだ。——『 HMD-02 』【第一部・完】' },
];

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

function setHeroNeutralStand(hero, zPos = 0, yaw = 0) {
  hero.root.position.set(0, 0, zPos);
  hero.root.rotation.set(0, yaw, 0);
  hero.setPose({
    pelvisPos: [0, 0.205, 0],
    pelvisRot: [0, 0, 0],
    leftFootPos: [0.042, 0, 0],
    rightFootPos: [-0.042, 0, 0],
    leftArmPitch: 0.08,
    rightArmPitch: 0.08,
    leftArmRoll: 0.10,
    rightArmRoll: -0.10,
    pivotRotX: 0,
    pivotPosY: 0,
  });
}

function setHeroSitting(hero, x, y, z, yaw = 0) {
  hero.root.position.set(x, y, z);
  hero.root.rotation.set(0, yaw, 0);
  hero.setPose({
    pelvisPos: [0, 0.095, 0],
    pelvisRot: [-0.14, 0, 0],
    leftFootPos: [0.046, 0.02, 0.145],
    rightFootPos: [-0.046, 0.02, 0.145],
    leftArmPitch: 0.35,
    rightArmPitch: 0.35,
    leftArmRoll: 0.14,
    rightArmRoll: -0.14,
    pivotRotX: 0,
    pivotPosY: 0,
  });
}

function setHeroFastSprint(hero, u, zStart = 0, zEnd = 3.0) {
  const z = lerp(zStart, zEnd, smooth(u));
  const phase = u * Math.PI * 34; // Authentic 34 steps!
  const s = Math.sin(phase);
  const c = Math.cos(phase);
  const stopFade = 1 - smooth((u - 0.94) / 0.06);
  hero.root.position.set(0, 0.012, z);
  hero.root.rotation.set(0, 0, 0);
  hero.setPose({
    pelvisPos: [s * 0.008 * stopFade, 0.200 + Math.abs(c) * 0.007 * stopFade, 0],
    pelvisRot: [0.10 * stopFade, 0, -s * 0.03 * stopFade],
    leftFootPos: [0.042, Math.max(0, s) * 0.034 * stopFade, s * 0.072 * stopFade],
    rightFootPos: [-0.042, Math.max(0, -s) * 0.034 * stopFade, -s * 0.072 * stopFade],
    leftArmPitch: -s * 0.55 * stopFade,
    rightArmPitch: s * 0.55 * stopFade,
    leftArmRoll: 0.12,
    rightArmRoll: -0.12,
    pivotRotX: 0,
    pivotPosY: 0,
  });
}

/**
 * Evaluates EVERY SINGLE FRAME of Chapter 10 (0.0s .. 150.0s, ZERO OMISSIONS!)
 */
export function evaluateCh10Timeline(t, world, screens, lights, camera, lookTarget, hudCb) {
  const {
    heroFighter,
    qddBot,
    spareQddMacro,
    macroHand,
    props,
    deskGroup,
    bedsideGroup,
    retirementGroup,
    minatoExt,
    minatoHall,
    sakakibara,
    kurataBalcony,
  } = world;

  // Reset shared transient elements cleanly every frame (guarantees 100% deterministic scrubbing!)
  heroFighter.root.visible = true;
  heroFighter.root.scale.setScalar(1);
  heroFighter.setBattleState({ scratched: true, hipCracked: false, silverSplints: true });
  qddBot.root.visible = false;
  spareQddMacro.group.visible = false;
  macroHand.group.visible = false;
  deskGroup.visible = false;
  bedsideGroup.visible = false;
  retirementGroup.visible = false;
  props.hardCase.visible = false;
  props.maintenanceTools.visible = false;
  props.hmd02Notebook.visible = false;
  props.mechPencil.visible = false;
  props.pendulumPivot.visible = false;
  props.shatterGroup.visible = false;
  props.rlGhostGroup.visible = false;
  minatoHall.root.visible = false;

  let dof = { focusDist: 1.8, aperture: 0.012, halation: 0.24 };
  let simLog = null;
  let cutIn = null;

  // =========================================================================
  // CUT 01 (0..14s): Nov 5 Sat Midnight — Spotless Desk, Alcohol Wipe & 38 Bolts
  // =========================================================================
  if (t < 14.0) {
    const u = t / 14.0;
    world.setActiveSet('room203');
    lights.setPreset('room_midnight_desk');
    deskGroup.visible = true;
    props.maintenanceTools.visible = true;

    setHeroSitting(heroFighter, 0.0, 0.720, -0.52, 0.10);
    // Slender right hand reaching delicately from +X side so fingers touch shoulder without blocking torso!
    macroHand.group.visible = true;
    macroHand.group.scale.setScalar(0.66);
    const wipe = Math.sin(u * Math.PI * 5);
    macroHand.group.position.set(0.32 + wipe * 0.014, 0.92 + Math.cos(u * Math.PI * 5) * 0.008, -0.49);
    macroHand.group.rotation.set(0.12, Math.PI * 0.52, -0.10 + wipe * 0.05);

    camera.position.set(lerp(-0.28, 0.22, smooth(u)), lerp(1.12, 1.04, smooth(u)), lerp(0.16, 0.04, smooth(u)));
    lookTarget.set(0.02, 0.89, -0.52);
    dof = { focusDist: 0.72, aperture: 0.016, halation: 0.28 };
    simLog = {
      tag: 'DAY 214 // NOV 05 MIDNIGHT · ROOM 203',
      title: '決戦前夜：38本のボルト点検と銀色の添え木',
      detail: '資金 ¥267,720 → ¥316,120  |  HMD-01 (380mm / 1,784g)  |  最終清拭完了',
    };
  }
  // =========================================================================
  // CUT 02 (14..24s): Hard Case Wave-Foam Packing -> Lights Out Beside Futon
  // =========================================================================
  else if (t < 24.0) {
    const u = (t - 14.0) / 10.0;
    world.setActiveSet('room203');

    if (u < 0.52) {
      const k = u / 0.52;
      lights.setPreset('room_midnight_desk');
      deskGroup.visible = true;
      props.hardCase.visible = true;

      // HMD-01 snugly centered supine inside the wave-foam hard case as lid closes ("パチン、パチン")!
      heroFighter.root.position.set(0.16, 0.858, -0.55);
      heroFighter.root.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
      heroFighter.setPose({
        pelvisPos: [0, 0.20, 0],
        pelvisRot: [0, 0, 0],
        leftFootPos: [0.04, 0, 0],
        rightFootPos: [-0.04, 0, 0],
        leftArmPitch: 0.04,
        rightArmPitch: 0.04,
        leftArmRoll: 0.05,
        rightArmRoll: -0.05,
        pivotRotX: 0,
        pivotPosY: 0,
      });
      const lidClose = smooth((k - 0.34) / 0.56);
      props.lidPivot.rotation.x = lerp(-1.45, 0.0, lidClose);
      heroFighter.root.visible = lidClose < 0.88;

      camera.position.set(lerp(0.20, 0.06, k), lerp(1.24, 1.12, k), lerp(0.02, -0.02, k));
      lookTarget.set(0.0, 0.82, -0.55);
      dof = { focusDist: 0.65, aperture: 0.018, halation: 0.25 };
    } else {
      const k = (u - 0.52) / 0.48;
      lights.setPreset('room_sleep_blue');
      bedsideGroup.visible = true;
      heroFighter.root.visible = false;
      macroHand.group.visible = false;

      camera.position.set(lerp(0.62, 0.28, smooth(k)), lerp(0.58, 0.82, smooth(k)), lerp(1.18, 0.88, smooth(k)));
      lookTarget.set(lerp(0.24, -0.10, smooth(k)), lerp(0.16, 0.65, smooth(k)), lerp(0.14, -0.65, smooth(k)));
      dof = { focusDist: 1.05, aperture: 0.015, halation: 0.28 };
    }
    simLog = {
      tag: 'DAY 214 // NOV 05 02:40 AM',
      title: '黒いハードケースと、11月の木枯らし',
      detail: '初めて六畳間と高架下の外へ —— 明日、浜松町へ',
    };
  }
  // =========================================================================
  // CUT 03 (24..35s): Nov 6 Sun 08:50 — Hamamatsucho Trade Center Exterior!
  // =========================================================================
  else if (t < 35.0) {
    const u = (t - 24.0) / 11.0;
    world.setActiveSet('exterior');
    lights.setPreset('hamamatsucho_morning');
    heroFighter.root.visible = false;
    world.updateGinkgoLeaves(t);

    const walkZ = lerp(2.2, -2.6, smooth(u));
    minatoExt.root.position.set(-0.35, 0, walkZ);
    minatoExt.root.rotation.y = Math.PI;
    const step = Math.sin(t * 5.8);
    minatoExt.leftLeg.hipJoint.rotation.x = step * 0.34;
    minatoExt.rightLeg.hipJoint.rotation.x = -step * 0.34;
    minatoExt.leftArm.shoulder.rotation.x = -step * 0.26;
    minatoExt.rightArm.shoulder.rotation.x = 0.08;

    camera.position.set(lerp(1.85, 0.95, smooth(u)), lerp(1.25, 1.85, smooth(u)), lerp(4.2, 1.4, smooth(u)));
    lookTarget.set(0.0, lerp(1.5, 3.6, smooth(u)), -4.2);
    dof = { focusDist: 4.5, aperture: 0.008, halation: 0.34 };
    simLog = {
      tag: 'DAY 215 // NOV 06 08:50 · HAMAMATSUCHO',
      title: '東京都立 産業貿易センター 浜松町館',
      detail: '雲ひとつない11月の青空・東京湾の潮風と銀杏並木',
    };
  }
  // =========================================================================
  // CUT 04 (35..46s): Vast Blazing-White Hall & Pit Row (No.37 / No.38 / No.39)
  // =========================================================================
  else if (t < 46.0) {
    const u = (t - 35.0) / 11.0;
    world.setActiveSet('hall');
    lights.setPreset('hall_bright_white');
    screens.updateScoreboard('run', 0);

    heroFighter.root.position.set(0.18, 0.736, -4.18);
    heroFighter.root.rotation.set(0, 0.15, 0);
    heroFighter.setPose({
      pelvisPos: [0, 0.205, 0], pelvisRot: [0, 0, 0],
      leftFootPos: [0.042, 0, 0], rightFootPos: [-0.042, 0, 0],
      leftArmPitch: 0.06, rightArmPitch: 0.06, leftArmRoll: 0.08, rightArmRoll: -0.08,
      pivotRotX: 0, pivotPosY: 0,
    });
    qddBot.root.visible = true;
    qddBot.root.position.set(1.38, 0.736, -4.18);
    qddBot.root.rotation.set(0, -0.25, 0);
    qddBot.setNeutralStand();

    minatoHall.root.visible = true;
    minatoHall.root.position.set(-0.08, 0, -4.78);
    minatoHall.root.rotation.set(0, 0.05, 0);
    sakakibara.root.position.set(1.25, 0, -4.82);
    sakakibara.root.rotation.set(0, -0.25, 0);

    camera.position.set(lerp(-2.4, 0.32, smooth(u)), lerp(1.85, 1.38, smooth(u)), lerp(-1.35, -2.05, smooth(u)));
    lookTarget.set(lerp(-1.1, 0.25, smooth(u)), lerp(1.12, 1.12, smooth(u)), -4.2);
    dof = { focusDist: 2.3, aperture: 0.009, halation: 0.26 };
    simLog = {
      tag: 'EXHIBITION HALL // PIT ROW No.37 – No.39',
      title: '50卓以上のピットと、幅90cmの孤独な『No.38』',
      detail: '大学チーム鏡面CNC機（赤・青） vs 個人参加・佐伯湊',
    };
  }
  // =========================================================================
  // CUT 05 (46..55s): Encounter with Sakakibara Koichi & 65cm Silver QDD Discs!
  // =========================================================================
  else if (t < 55.0) {
    const u = (t - 46.0) / 9.0;
    world.setActiveSet('hall');
    lights.setPreset('hall_bright_white');

    heroFighter.root.position.set(0.18, 0.736, -4.18);
    heroFighter.root.rotation.set(0, 0.35, 0);
    heroFighter.setPose({
      pelvisPos: [0, 0.205, 0], pelvisRot: [0, 0, 0],
      leftFootPos: [0.042, 0, 0], rightFootPos: [-0.042, 0, 0],
      leftArmPitch: 0.06, rightArmPitch: 0.06, leftArmRoll: 0.08, rightArmRoll: -0.08,
      pivotRotX: 0, pivotPosY: 0,
    });
    qddBot.root.visible = true;
    qddBot.root.position.set(1.26, 0.736, -4.18);
    qddBot.root.rotation.set(0, -0.42, 0);
    qddBot.setNeutralStand();

    minatoHall.root.visible = true;
    minatoHall.root.position.set(-0.18, 0, -4.78);
    minatoHall.root.rotation.set(0, 0.55, 0);
    sakakibara.root.position.set(0.72, 0, -4.74);
    sakakibara.root.rotation.set(0, -0.62, 0);

    // Pulled back cleanly so Minato, Sakakibara's face, HMD-01, coffee can, and full 65cm QDD all shine in frame!
    camera.position.set(lerp(1.38, 0.58, smooth(u)), lerp(1.36, 1.24, smooth(u)), lerp(-1.88, -2.18, smooth(u)));
    lookTarget.set(lerp(0.88, 0.52, smooth(u)), lerp(1.18, 1.14, smooth(u)), -4.28);
    dof = { focusDist: 2.15, aperture: 0.011, halation: 0.22 };
    simLog = {
      tag: 'PIT No.39 // 個人参加・榊原 恒一',
      title: '65cm 銀色円盤QDD機 ＆「傷だらけのアルミのいい顔」',
      detail: '懐中時計のような薄い円盤関節 — そして初めての理解者',
    };
  }
  // =========================================================================
  // CUT 06 (55..68s): 11:20 Regulation Stage — Whistle, 2mm Heel Slip & IMU Save!
  // =========================================================================
  else if (t < 68.0) {
    const u = (t - 55.0) / 13.0;
    world.setActiveSet('hall');
    lights.setPreset('hall_spotlight_stage');
    screens.updateScoreboard('run', 0);

    minatoHall.root.visible = true;
    minatoHall.root.position.set(-0.62, 0, -0.78);
    minatoHall.root.rotation.set(0, 0.28, 0);

    const getUpU = clamp01((u - 0.08) / 0.80);
    heroFighter.root.position.set(0, 0.012, 0.0);
    heroFighter.root.rotation.set(0, 0, 0);
    heroFighter.setProneGetUpProgress(getUpU);

    if (u >= 0.42 && u < 0.74) {
      const slipP = Math.sin(clamp01((u - 0.42) / 0.32) * Math.PI);
      heroFighter.root.position.z = -slipP * 0.032;
      heroFighter.root.rotation.x = -slipP * 0.22;
      if (u >= 0.46 && u < 0.64) {
        cutIn = {
          kicker: 'IMU REFLEX SAVE · 0.18s',
          main: '2mm滑走 → 自作基板反射復帰！',
          sub: '1mm四隅ゴムグリップ × 両腕カウンターバランスで仁王立ち！',
        };
      }
    }

    camera.position.set(lerp(0.88, 0.54, smooth(u)), lerp(0.54, 0.36, smooth(u)), lerp(0.95, 0.68, smooth(u)));
    lookTarget.set(0.0, lerp(0.14, 0.24, smooth(u)), 0.0);
    dof = { focusDist: 0.95, aperture: 0.014, halation: 0.28 };
    simLog = {
      tag: '11:20 OFFICIAL STAGE // ENTRY No.38 HMD-01',
      title: '規定審査①：うつ伏せ自立起き上がり（ワックス床 2mm滑走）',
      detail: '完全自律・コントローラ操作禁止  |  IMU姿勢制御で奇跡の踏ん張り',
    };
  }
  // =========================================================================
  // CUT 07 (68..80s): 3.0m Autonomous Sprint — 34 Steps, Record `9秒12` CLEAR!!
  // =========================================================================
  else if (t < 80.0) {
    const u = (t - 68.0) / 12.0;
    world.setActiveSet('hall');
    lights.setPreset('hall_spotlight_stage');

    const runU = clamp01(u / 0.90);
    const liveClock = Math.min(9.12, runU * 9.12);
    screens.updateScoreboard(u >= 0.90 ? 'clear' : 'run', liveClock);
    setHeroFastSprint(heroFighter, runU, 0.0, 3.04);

    minatoHall.root.visible = true;
    minatoHall.root.position.set(-0.55, 0, -0.58);
    minatoHall.root.rotation.set(0, 0.12, 0);

    const zCur = lerp(0.0, 3.04, smooth(runU));
    camera.position.set(lerp(0.86, 1.15, smooth(u)), lerp(0.38, 0.72, smooth(u)), zCur + lerp(1.18, 1.38, smooth(u)));
    lookTarget.set(0.0, lerp(0.24, 0.42, smooth(u)), Math.min(2.6, zCur - 0.15));
    dof = { focusDist: 1.5, aperture: 0.010, halation: 0.30 };

    if (u >= 0.88) {
      cutIn = {
        kicker: 'OFFICIAL RECORD · 34 STEPS AUTONOMOUS',
        main: 'ゴール完走！ 9秒12 CLEAR!!',
        sub: '第19回 全日本アマチュア二足歩行競技会 · No.38 佐伯湊 HMD-01',
      };
    }
    simLog = {
      tag: 'OFFICIAL 3.0m SPRINT // 34 STEPS AUTONOMOUS',
      title: `規定審査②：3.0m直線自律歩行 [ ${liveClock.toFixed(2)} s ]`,
      detail: u >= 0.90 ? '★ ゴール完走認定！！ 記録 9秒12 — 割れんばかりの拍手' : 'タタッ、タタッ…… 重力を推進力に変える34歩のストライド',
    };
  }
  // =========================================================================
  // CUT 08 (80..89s): Applause, Minato Bowing & Senior Kurata's Thumbs-Up!
  // =========================================================================
  else if (t < 89.0) {
    const u = (t - 80.0) / 9.0;
    world.setActiveSet('hall');
    lights.setPreset('hall_bright_white');
    screens.updateScoreboard('clear', 9.12);

    minatoHall.root.visible = true;
    minatoHall.root.position.set(0.0, 0, 2.75);
    minatoHall.root.rotation.set(0, Math.PI, 0);
    setHeroNeutralStand(heroFighter, 3.02, Math.PI);

    if (u < 0.45) {
      const k = u / 0.45;
      camera.position.set(lerp(1.25, 0.85, k), lerp(0.95, 1.25, k), lerp(4.1, 3.6, k));
      lookTarget.set(0.0, 1.05, 2.75);
      dof = { focusDist: 1.6, aperture: 0.012, halation: 0.28 };
    } else {
      const k = smooth((u - 0.45) / 0.55);
      // Generous headroom framing Kurata's full face, olive work blouson & raised thumbs-up!
      camera.position.set(lerp(0.62, 0.14, k), lerp(2.05, 3.22, k), lerp(-1.8, -2.95, k));
      lookTarget.set(0.0, lerp(2.75, 3.36, k), -5.35);
      dof = { focusDist: 2.35, aperture: 0.011, halation: 0.26 };
    }
    simLog = {
      tag: 'THUNDERING APPLAUSE // KURATA ON REAR BALCONY',
      title: '割れんばかりの拍手と、ロボ研・倉田先輩の無言の親指',
      detail: '215日間の孤独な開発が、初めて世界の光と繋がった瞬間',
    };
  }
  // =========================================================================
  // CUT 09 (89..103s): 14:30 Disturbance Test — 300g Pendulum & Knee Shatter!
  // =========================================================================
  else if (t < 103.0) {
    const u = (t - 89.0) / 14.0;
    world.setActiveSet('hall');
    lights.setPreset('hall_spotlight_stage');
    props.pendulumPivot.visible = true;

    const hitU = 0.42;
    screens.updateScoreboard(u >= hitU ? 'shatter' : 'run', 0);

    const swingAngle = u < hitU
      ? lerp(-0.48, 0.0, smooth(u / hitU))
      : Math.sin((u - hitU) * Math.PI * 2.2) * 0.16 * (1 - clamp01((u - hitU) / 0.58));
    props.pendulumPivot.rotation.z = swingAngle;

    if (u < hitU) {
      setHeroFastSprint(heroFighter, 0.35 + u * 0.12, 0.9, 1.35);
      heroFighter.root.position.set(0, 0.012, 1.20);
    } else {
      const fallU = smooth((u - hitU) / 0.26);
      heroFighter.setBattleState({ scratched: true, hipCracked: true, silverSplints: true });
      heroFighter.root.position.set(fallU * 0.14, lerp(0.012, 0.06, fallU), 1.20);
      heroFighter.root.rotation.set(0, 0, -fallU * 1.48);
      heroFighter.setPose({
        pelvisPos: [0, lerp(0.20, 0.14, fallU), 0],
        pelvisRot: [0, 0, -fallU * 0.35],
        leftFootPos: [0.045, 0, 0],
        rightFootPos: [-0.075, 0.03 * fallU, -0.04 * fallU],
        leftArmPitch: 0.45 * fallU,
        rightArmPitch: -0.65 * fallU,
        leftArmRoll: 0.55 * fallU,
        rightArmRoll: -0.45 * fallU,
        pivotRotX: 0,
        pivotPosY: 0,
      });

      const sparkU = clamp01((u - hitU) / 0.28);
      props.shatterGroup.visible = sparkU < 1.0;
      props.shatterFlash.scale.setScalar(Math.max(0.01, (1 - sparkU) * 1.6));
      props.shatterTeeth.forEach((tooth, i) => {
        const ang = (i / 10) * Math.PI * 2;
        tooth.position.set(Math.cos(ang) * sparkU * 0.28, Math.sin(sparkU * Math.PI) * 0.18 - sparkU * 0.10, Math.sin(ang) * sparkU * 0.24);
        tooth.rotation.set(sparkU * 9 + i, sparkU * 7, i);
      });

      if (u >= hitU && u < hitU + 0.28) {
        cutIn = {
          kicker: 'DISTURBANCE TEST · 300g PENDULUM IMPACT',
          main: 'パキィンッ、ギャリリッ！！ 右膝ギア粉砕',
          sub: '高減速比ギアは外力を逃がせない ——「石のように硬すぎる身体」の限界',
        };
      }
    }

    camera.position.set(lerp(0.82, 0.56, smooth(u)), lerp(0.46, 0.28, smooth(u)), lerp(2.15, 1.82, smooth(u)));
    lookTarget.set(lerp(0.0, 0.08, smooth(u)), lerp(0.24, 0.14, smooth(u)), 1.20);
    dof = { focusDist: 0.92, aperture: 0.016, halation: 0.28 };
    simLog = {
      tag: '14:30 DISTURBANCE TEST // 300g URETHANE PENDULUM',
      title: u < hitU ? '外乱テスト：300g振り子が右腰へ接触する瞬間' : '右膝モーター内部ギア破断 —— 位置制御の限界',
      detail: '逃げ場のない衝撃を歯先ひとつで受け止め、自らの硬さで砕け散った',
    };
  }
  // =========================================================================
  // CUT 10 (103..118s): 5 Min Later — Sakakibara QDD Hard Shove & Cross-Step Reflex!
  // =========================================================================
  else if (t < 118.0) {
    const u = (t - 103.0) / 15.0;
    world.setActiveSet('hall');
    lights.setPreset('hall_spotlight_stage');
    screens.updateScoreboard('qdd', 0);
    heroFighter.root.visible = false;

    qddBot.root.visible = true;
    const zWalk = lerp(0.35, 1.75, smooth(u));
    qddBot.root.position.set(0.0, 0.012, zWalk);
    qddBot.root.rotation.set(0, 0, 0);

    const shoveU = clamp01((u - 0.16) / 0.72);
    qddBot.setShoveAndCrossStepRecovery(shoveU);

    const shoveThrust = Math.sin(clamp01((u - 0.34) / 0.16) * Math.PI);
    sakakibara.root.position.set(-0.66 + shoveThrust * 0.24, 0, zWalk - 0.05);
    sakakibara.root.rotation.set(0, Math.PI / 2, 0);
    sakakibara.rightArm.shoulder.rotation.set(-1.35 * shoveThrust, 0, 0);
    sakakibara.rightArm.elbow.rotation.set(-0.25 * (1 - shoveThrust), 0, 0);

    minatoHall.root.visible = true;
    minatoHall.root.position.set(1.25, 0, 1.15);
    minatoHall.root.rotation.set(0, -1.45, 0);

    if (u >= 0.40 && u < 0.66) {
      cutIn = {
        kicker: 'ENTRY No.39 · 650mm QDD + RL NEURAL REFLEX',
        main: 'ドンッ！ → シュンッ・タン、タッ！！',
        sub: '生身の腱のように撓む円盤関節 ＋ 0.2秒の左脚クロスステップ完全復帰！！',
      };
    }

    camera.position.set(lerp(0.95, 0.48, smooth(u)), lerp(0.62, 0.46, smooth(u)), zWalk + lerp(1.32, 1.15, smooth(u)));
    lookTarget.set(0.08, 0.34, zWalk);
    dof = { focusDist: 1.35, aperture: 0.012, halation: 0.34 };
    simLog = {
      tag: 'ENTRY No.39 // SAKAKIBARA 65cm QDD HUMANOID',
      title: '大人の手で全力突き飛ばし → 柔軟衝撃吸収 ＆ クロスステップ反射',
      detail: 'バックドライバブル QDD 関節 × 強化学習神経 — 紛れもない『生き物』の反射',
    };
  }
  // =========================================================================
  // CUT 11 (118..133s): 17:00 Sunset Pit No.39 — Spare QDD Disc, RL Ghosts & Handshake!
  // =========================================================================
  else if (t < 133.0) {
    const u = (t - 118.0) / 15.0;
    world.setActiveSet('hall');
    lights.setPreset('hall_sunset_amber');
    heroFighter.root.visible = false;

    // Spare 84mm Silver QDD Disc spinning feather-light like ice — completely unobstructed!
    spareQddMacro.group.visible = true;
    const spin = u * Math.PI * 7.5;
    spareQddMacro.rotorGroup.rotation.y = spin;
    spareQddMacro.cyanPulseMat.emissiveIntensity = 0.75 + Math.abs(Math.sin(t * 5.0)) * 0.9;

    const ghostVis = u > 0.34;
    props.rlGhostGroup.visible = ghostVis;
    if (ghostVis) {
      props.rlGhosts.forEach((g, i) => {
        const ph = t * 5.5 + i * 0.9;
        g.rotation.z = Math.sin(ph) * 0.42;
        g.position.y = 0.02 + Math.abs(Math.cos(ph)) * 0.03;
      });
    }

    if (u < 0.68) {
      // Hand enters cleanly from the right (+X) side touching the spinning lever edge without blocking the disc!
      macroHand.group.visible = true;
      macroHand.group.scale.setScalar(0.58);
      macroHand.group.position.set(1.33, 0.785, -4.11);
      macroHand.group.rotation.set(0.08, Math.PI * 0.52, -0.12);

      camera.position.set(lerp(1.22, 1.02, smooth(u / 0.68)), lerp(0.95, 0.93, smooth(u / 0.68)), lerp(-3.76, -3.72, smooth(u / 0.68)));
      lookTarget.set(1.12, 0.77, -4.14);
      dof = { focusDist: 0.44, aperture: 0.018, halation: 0.36 };
    } else {
      const k = smooth((u - 0.68) / 0.32);
      minatoHall.root.visible = true;
      minatoHall.root.position.set(0.62, 0, -4.72);
      minatoHall.root.rotation.set(0, Math.PI * 0.5, 0);
      minatoHall.rightArm.shoulder.rotation.set(-0.68, 0, 0);
      minatoHall.rightArm.elbow.rotation.set(-0.38, 0, 0);
      sakakibara.root.position.set(1.50, 0, -4.72);
      sakakibara.root.rotation.set(0, -Math.PI * 0.5, 0);
      sakakibara.rightArm.shoulder.rotation.set(-0.68, 0, 0);
      sakakibara.rightArm.elbow.rotation.set(-0.38, 0, 0);

      // Frame BOTH Minato & Sakakibara's faces AND their clasped hands in warm amber sunset!
      camera.position.set(1.06, lerp(1.36, 1.40, k), lerp(-2.65, -2.85, k));
      lookTarget.set(1.06, 1.32, -4.72);
      dof = { focusDist: 1.95, aperture: 0.012, halation: 0.40 };
    }

    simLog = {
      tag: '17:00 SUNSET HALL // PIT No.39 · QDD & RL',
      title: '羽のように回る銀色QDD円盤 ＆「電気屋が一番強い時代」',
      detail: 'バックドライバブル・トルク制御 × 仮想空間数百万回の強化学習',
    };
  }
  // =========================================================================
  // CUT 12 (133..150s): 22:00 Room 203 — Honored Bookshelf, Orion & 『HMD-02』【第一部・完】
  // =========================================================================
  else {
    const u = (t - 133.0) / 17.0;
    world.setActiveSet('room203');
    lights.setPreset('room_orion_finale');

    if (u < 0.48) {
      const k = u / 0.48;
      retirementGroup.visible = true;
      setHeroSitting(heroFighter, -0.28, 1.254, -1.33, 0.24);
      heroFighter.setBattleState({ scratched: true, hipCracked: true, silverSplints: true });

      // Cleanly frame BOTH HMD-01 + Completion Certificate AND the full gleaming Orion Constellation!
      camera.position.set(lerp(-0.18, 0.26, smooth(k)), lerp(1.44, 1.48, smooth(k)), lerp(-0.18, -0.10, smooth(k)));
      lookTarget.set(lerp(-0.04, 0.34, smooth(k)), lerp(1.38, 1.46, smooth(k)), -1.45);
      dof = { focusDist: 1.32, aperture: 0.012, halation: 0.34 };
      simLog = {
        tag: 'DAY 215 // 22:00 · ROOM 203 HONORED RETIREMENT',
        title: '本棚最上段の特等席『規定完走証 9秒12』＆ 冬のオリオン座',
        detail: 'ありがとうな。お前がここまで連れてきてくれたんだ',
      };
    } else {
      const k = smooth((u - 0.48) / 0.52);
      deskGroup.visible = true;
      retirementGroup.visible = true;
      setHeroSitting(heroFighter, -0.28, 1.254, -1.33, 0.24);

      props.hmd02Notebook.visible = true;
      props.mechPencil.visible = true;
      const writeP = clamp01((k - 0.08) / 0.72);
      props.updateHmd02Notebook(writeP);
      props.mechPencil.position.set(lerp(-0.075, 0.085, writeP), 0.752, 0.045 + Math.sin(writeP * 24) * 0.006);

      camera.position.set(lerp(0.14, 0.0, k), lerp(1.06, 1.02, k), lerp(-0.18, -0.34, k));
      lookTarget.set(0.0, 0.73, -0.51);
      dof = { focusDist: 0.42, aperture: 0.014, halation: 0.32 };

      if (k > 0.72) {
        cutIn = {
          kicker: 'DAY 215 · END OF PART I  |  BUDGET ¥316,120',
          main: '『 HMD-02 』 —— 【第一部・完】',
          sub: '全高70cm超・柔らかいQDD関節と自ら学ぶ神経へ、新たな300日が始まる',
        };
      }
      simLog = {
        tag: 'END OF PART I // DAY 215 · BUDGET ¥316,120',
        title: '白紙の大学ノート中央に刻む次の名前 —— 『HMD-02』',
        detail: '【第一部・完】 第二部（第11章〜）『HMD-02』編へ続く',
      };
    }
  }

  if (hudCb) hudCb({ simLog, cutIn });
  return dof;
}
