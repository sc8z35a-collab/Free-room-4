export const CH09_DURATION = 150.0; // Exact 02:30 (150 seconds — Zero Omissions!)

export const CH09_SCENES = [
  { id: 1, start: 0, end: 16, jp: 'Day 176-182 · 金木犀のキャンパス・田所の誘いと一人帰る坂道' },
  { id: 2, start: 16, end: 40, jp: 'Day 183-188 · 硬質床シートでの転倒＆103号室の静かな苦情' },
  { id: 3, start: 40, end: 73, jp: 'Day 189-194 · 高架下の白ランタン・歯車粉砕・氷雨とみかん箱の絶望' },
  { id: 4, start: 73, end: 102, jp: 'Day 195-197 · 母の新米とチラシ裏メモ → 4日間の手曲げ1.5mm銀色アルミ添え木' },
  { id: 5, start: 102, end: 150, jp: 'Day 198 22:40 · 高架下の青い火花・うつ伏せ完全自立起き上がり＆3m『9秒48』！' },
];

const SUBTITLES = [
  [0.5, 8.8, '佐伯 湊', '10月・金木犀の夕暮れ。田所の食べ放題の誘いを三度目の断り。「……ごめん、これからどうしても片付けなきゃいけない用事があって」'],
  [9.2, 15.6, 'ナレーション', '茜色から群青色へ冷える坂道を一人帰り、誰も返事をしない暗い六畳間の鍵を開けた。'],

  [16.4, 28.6, 'ナレーション', '柔らかなマットを剥がし、本番と同じ硬質床シートを敷く。白い擦り傷を刻みながら何度も転び、30回目でシートからはみ出して木造の床板へ『ゴォンッ！』'],
  [29.2, 39.6, '佐伯 湊', 'コン、コン、コン——外廊下の裸電球の下、103号室の疲れた住人に頭を下げた。「……俺たちには、転ぶ場所すらないのかよ」'],

  [40.4, 49.6, 'ナレーション', '翌夜21時半、登山用リュックと白いランタンを背負い自転車で私鉄のコンクリート高架下へ。頭上を急行電車が轟音で駆け抜ける無人の広場。'],
  [50.2, 61.6, 'ナレーション', 'Day 194 深夜23時半、14本目で激しく宙を舞い、うつ伏せ復帰の瞬間に『ガリッ…カラカラッ！！』右肩と左股の歯車が砕け、十月の氷雨が降り出した。'],
  [62.2, 72.6, '佐伯 湊', '雨に濡れた深夜1時、4月からの失敗作が眠るみかん箱と『出場辞退』の下書き。「……俺は、何やってんだろうな」'],

  [73.4, 85.4, 'ナレーション', '翌朝11時、母からの宅配便——新米5kg、新聞紙包みの赤りんご6個、なめこ汁、そしてチラシ裏のメモ。『小学生の時も壊れた目覚まし時計を夕方まで直してたな』'],
  [86.0, 95.8, '佐伯 湊', '炊きたての新米を頬張り再起。「誰かに勝つためじゃない！」バスタオルを挟んだ卓上万力で1.5mmアルミ板を切り出し、4日間手ヤスリで磨き直角へ曲げた。'],
  [96.2, 101.6, 'ナレーション', '新品の鋼歯車を組み直し、両肩・両股・胸アーチの5箇所へ銀色の添え木を締結——実測『1,784 g』、泥にまみれた小さな闘士『Rev 1.8』誕生！'],

  [102.4, 111.4, 'ナレーション', 'Day 198 午後10時40分、雨上がりの高架下。最終急行が架線に青い火花を散らす中、ランタンの光の輪で『うつ伏せ』から起動！'],
  [112.0, 123.4, '佐伯 湊', '銀色の添え木が衝撃を受け止め、両腕が床を押し上げ、両膝が胸の下へ滑り込む——両腕がパッと開き直立！「……立った……！」'],
  [124.0, 139.2, 'ナレーション', '白いチョークの3メートル直線コースへ弾かれるように駆け出す！ タタッ、タタッ……！！ ストップウォッチが『9秒48』を刻み白線を踏み越えた！'],
  [139.8, 149.5, 'ナレーション', '暗闇の中で、かすかに熱い銀色の肩に額を当てた。みかん箱の前で辞めなくてよかった。11月6日の本番まで、残り17日——光の中へ。'],
];

const SIMLOGS = [
  [0, 16, 'OCTOBER // DAY 176-182 · CAMPUS', '金木犀の夕暮れ：普通の大学生活との分岐点', '田所の誘いを断り、硬質床シートを背負って一人203号室へ'],
  [16, 40, 'HARD FLOOR // DAY 183-188 · ROOM 203', '硬質床での転倒ラッシュ ＆ 103号室からの苦情', '柔らかなマットを剥がし起き上がり特訓 → 夜間衝撃音で室内練習断念'],
  [40, 62, 'VIADUCT // DAY 189-194 · 23:30 PM', '私鉄コンクリート高架下 → 歯車粉砕 ＆ 氷雨', '白ランタン下の14本目転倒で右肩・左股ギア破損＋炭素フレーム亀裂'],
  [62, 73, 'ROCK BOTTOM // DAY 195 · 01:00 AM', 'みかん箱の墓標 ＆ 出場辞退メールの下書き', '4月からの破損部品の山と予備モータ枯渇の絶望'],
  [73, 86, 'CARE PACKAGE // DAY 195 · 11:00 AM', '母の新米5kg・赤りんご6個・チラシ裏のメモ', '小4の目覚まし時計の記憶と炊きたての新米で原点回帰'],
  [86, 102, 'SILVER SPLINTS // DAY 195-197 (-¥23,800)', '手曲げ 1.5mm アルミ添え木 5箇所補強 [1,784 g]', 'バスタオル挟み万力・手ヤスリ・鋼歯車換装 → Rev 1.8 完成'],
  [102, 124, 'AUTONOMOUS GET-UP // DAY 198 · 22:40 PM', '★ うつ伏せからの完全自立起き上がり 成功！', '高架下の青い架線火花と白ランタンの下、人の指一本借りず起立'],
  [124, 150, '3.0m SPRINT // 9.48 SECONDS CLEAR!', '硬質床 3.0m スプリント『9秒48』達成！', '残金 ¥267,720 / 銀色の肩に額を当て、11月6日の本番まで残り17日'],
];

const CUTINS = [
  [29.5, 33.5, 'コン、コン、コン — 103号室からの静かな苦情', 'crimson'],
  [54.4, 59.0, 'ガリッ…カラカラッ！！ 金属歯車粉砕 ＆ 左股亀裂・十月の氷雨', 'crimson'],
  [96.5, 101.2, 'HMD-01 Rev 1.8 — 手曲げ1.5mm銀色アルミ添え木 [1,784 g]', 'emerald'],
  [119.5, 123.6, '★ うつ伏せからの完全自立起き上がり 成功！！', 'emerald'],
  [137.2, 141.6, '硬質床 3.0m スプリント『9秒48』達成！！（大会まで残り17日）', 'amber'],
];

export function getCh09Scene(t) {
  for (let i = CH09_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH09_SCENES[i].start) return CH09_SCENES[i];
  }
  return CH09_SCENES[0];
}
export function getCh09Subtitle(t) {
  for (const [s, e, spk, txt] of SUBTITLES) if (t >= s && t <= e) return { speaker: spk, text: txt };
  return null;
}
export function getCh09Simlog(t) {
  for (const [s, e, tag, title, detail] of SIMLOGS) if (t >= s && t <= e) return { tag, title, detail };
  return SIMLOGS[0];
}
export function getCh09Cutin(t) {
  for (const [s, e, text, tone] of CUTINS) if (t >= s && t <= e) return { text, tone };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };
const lerp3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

export function evaluateCh09Director(t, world, screens, lights) {
  const cam = { pos: [0, 1.0, 0.2], look: [0, 0.8, -0.5], fov: 30 };
  const fx = {
    bloomStrength: 0.22,
    exposure: 1.06,
    aperture: 0.014,
    aoIntensity: 0.72,
    vignette: 0.26,
  };
  let dramaBars = false;

  // Reset per-frame toggles
  world.setActiveSet('apartment');
  world.heroFighter.root.visible = false;
  world.doorwayGroup.visible = false;
  world.scaleGroup.visible = false;
  world.draftPhone.visible = false;
  world.props.mikanBox.visible = false;
  world.props.carePkg.visible = false;
  world.props.riceBowl.visible = false;
  world.props.metalworkGroup.visible = false;
  world.props.stopwatchBoard.visible = false;
  world.rainInst.visible = false;
  world.catenarySparkOrb.visible = false;
  world.catenarySparkLight.intensity = 0;
  world.minatoKneel.root.visible = false;

  // ===========================================================================
  // SCENE 1 (0 – 16s): 金木犀のキャンパス夕暮れ・田所の誘いと一人帰る坂道
  // ===========================================================================
  if (t < 16) {
    world.setActiveSet('campus');
    lights.setPreset('campus_kinmokusei');
    world.updateKinmokuseiPetals(t);

    if (t < 9.0) {
      // Cut 01: Tadokoro & Classmates waving goodbye while Minato stands alone with rolled hard floor sheet!
      const u = t / 9.0;
      world.tadokoro.root.position.set(0.65 + u * 0.45, 0, -1.5 - u * 1.4);
      world.tadokoro.root.rotation.y = Math.PI - 0.35;
      world.mate1.root.position.set(1.15 + u * 0.25, 0, -2.6 - u * 1.6);
      world.minatoCampus.root.position.set(-0.35, 0, -1.2);
      world.minatoCampus.root.rotation.y = 0.25;

      fx.aperture = 0.012;
      cam.pos = lerp3([0.15, 1.42, 1.45], [-0.15, 1.38, 1.15], u);
      cam.look = [0.05, 1.25, -1.6];
      cam.fov = 34;
    } else {
      // Cut 02: Minato walking alone opposite the crowd under burning crimson-to-indigo October sky!
      const u = (t - 9.0) / 7.0;
      world.tadokoro.root.position.set(1.3, 0, -4.5 - u * 2.0);
      world.mate1.root.position.set(1.6, 0, -5.2 - u * 2.0);
      world.minatoCampus.root.position.set(-0.35, 0, -1.0 + u * 1.4);
      world.minatoCampus.root.rotation.y = 0;

      fx.aperture = 0.013;
      cam.pos = lerp3([-0.75, 1.35, 1.75], [-0.45, 1.45, 2.25], u);
      cam.look = [-0.25, 1.25, -1.8];
      cam.fov = 35;
    }
  }

  // ===========================================================================
  // SCENE 2 (16 – 40s): 硬質床シートでの転倒ラッシュ ＆ 103号室の静かな苦情（裸電球）
  // ===========================================================================
  else if (t < 40) {
    world.setActiveSet('apartment');
    if (t < 29.0) {
      // Cut 03: Hard pale-gray linoleum sheet -> White battle scratches -> Falls off sheet edge onto bare wood ("ゴォンッ！")
      lights.setPreset('room_hard_practice');
      world.heroFighter.root.visible = true;
      world.heroFighter.setBattleState({ scratched: true, hipCracked: false, silverSplints: false });

      if (t < 23.0) {
        // High-tempo slip & sideways crash across hard sheet
        const u = (t - 16.0) / 7.0;
        const step = clamp01(u * 1.15) * 4.5;
        world.heroFighter.setDynamicZmpWalk(step, { maxSteps: 5, stride: 0.065, showZmpDots: false, glitchAtStep: 2.6 });
        world.heroFighter.root.position.set(-0.18, 0.005, 0.28 + Math.min(0.18, step * 0.05));
        world.heroFighter.root.rotation.set(0, 0.25, 0);
        cam.pos = lerp3([0.48, 0.34, 1.08], [0.36, 0.26, 0.96], u);
        cam.look = [-0.14, 0.19, 0.42];
        cam.fov = 32;
      } else {
        // 30th prone get-up attempt -> tips backward off sheet edge onto exposed bare wooden floorboard ("ゴォンッ！")
        const u = (t - 23.0) / 6.0;
        const fallWood = smooth((t - 26.5) / 0.55);
        world.heroFighter.setProneGetUpProgress(lerp(0.25, 0.72, clamp01(u * 1.4)), { failStrippedGear: false });
        world.heroFighter.pivotGroup.rotation.x -= fallWood * 1.65;
        world.heroFighter.root.position.set(0.32 + fallWood * 0.14, 0.004, 0.48); // Right off the pale-gray sheet edge onto bare wood!
        world.heroFighter.root.rotation.set(0, 0.4, 0);
        const shake = t >= 26.9 ? Math.sin(t * 75) * 0.015 * Math.exp(-(t - 26.9) * 8) : 0;
        cam.pos = [0.76 + shake, 0.34 + shake, 1.18];
        cam.look = [0.34, 0.16, 0.48];
        cam.fov = 32;
      }
    } else {
      // Cut 04: Thin Iron Door Opens to Night Exterior Hallway Bare Bulb -> Room 103 Neighbor's Quiet Plea!
      lights.setPreset('room_doorway_bulb');
      dramaBars = true;
      world.doorwayGroup.visible = true;
      world.heroFighter.root.visible = true;
      world.heroFighter.setBattleState({ scratched: true, hipCracked: false, silverSplints: false });
      world.heroFighter.setProneGetUpProgress(0.05, { failStrippedGear: false });
      world.heroFighter.root.position.set(0.22, 0.004, 0.48);

      const u = (t - 29.0) / 11.0;
      fx.aperture = 0.012;
      if (t < 36.2) {
        // Facing open iron door & tired Room 103 neighbor beneath warm bare tungsten bulb!
        cam.pos = lerp3([0.12, 1.46, 0.56], [-0.18, 1.48, 0.56], smooth((t - 29.0) / 7.2));
        cam.look = [-2.05, 1.48, 0.53];
        cam.fov = 42;
      } else {
        // Looking back down at the lonely fallen robot on the floor ("俺たちには、転ぶ場所すらないのかよ")
        cam.pos = [-0.65, 0.88, 0.92];
        cam.look = [0.18, 0.12, 0.48];
        cam.fov = 34;
      }
    }
  }

  // ===========================================================================
  // SCENE 3 (40 – 73s): 私鉄高架下の白ランタン・歯車粉砕・10月の氷雨 ＆ 深夜1時みかん箱の絶望
  // ===========================================================================
  else if (t < 73) {
    if (t < 62.0) {
      // Cuts 05 & 06: Concrete Railway Viaduct Underpass + Overhead Express Train + White Lantern + Stripped Gears + Rain!
      world.setActiveSet('viaduct');
      lights.setPreset('viaduct_night');
      world.heroFighter.root.visible = true;
      world.heroFighter.setBattleState({ scratched: true, hipCracked: t >= 54.5, silverSplints: false });
      world.props.lantern.position.set(-0.56, 0.006, 0.65);

      // Rushing overhead illuminated Express Train across bridge deck (timed right across frame at t=44-48s!)
      const trainCycle = ((t - 40.0) * 3.8) % 24.0;
      world.expressTrain.position.x = -19.5 + trainCycle;

      if (t < 50.0) {
        // Cut 05: Establishing monumental viaduct piers, speeding illuminated express train overhead, and lone white lantern pool below!
        const u = (t - 40.0) / 10.0;
        world.heroFighter.setDynamicZmpWalk(u * 4.0, { maxSteps: 6, stride: 0.060, showZmpDots: false });
        world.heroFighter.root.position.set(0, 0.006, 0.45 + u * 0.22);
        world.heroFighter.root.rotation.set(0, 0, 0);
        fx.aperture = 0.010;
        cam.pos = lerp3([2.15, 1.15, 4.15], [1.45, 0.92, 3.35], smooth(u));
        cam.look = [-0.15, 1.38, -0.35];
        cam.fov = 46;
      } else {
        // Cut 06: Day 194 23:30 — Prone Push-Up -> Stripped Metal Gear Collapse ("ガリッ…カラカラッ") + Left Hip Crack + Falling Ice Rain!
        dramaBars = true;
        const u = (t - 50.0) / 12.0;
        world.heroFighter.root.position.set(0, 0.006, 0.72);
        world.heroFighter.root.rotation.set(0, 1.05, 0);
        world.heroFighter.setProneGetUpProgress(clamp01(u * 1.15), { failStrippedGear: true });

        if (t >= 55.5) {
          world.rainInst.visible = true;
          world.updateRain(t);
        }
        fx.aperture = 0.014;
        cam.pos = lerp3([0.74, 0.42, 1.48], [0.58, 0.34, 1.34], u);
        cam.look = [-0.04, 0.14, 0.72];
        cam.fov = 34;
      }
    } else {
      // Cut 07: 01:00 AM Dark Unlit 203 Room — Mikan Cardboard Graveyard Box + Glowing "出場辞退" Draft Email!
      world.setActiveSet('apartment');
      lights.setPreset('room_01am_despair');
      dramaBars = true;
      world.props.mikanBox.visible = true;
      world.draftPhone.visible = true;

      const u = (t - 62.0) / 11.0;
      fx.aperture = 0.013;
      cam.pos = lerp3([-0.14, 0.56, 0.94], [0.18, 0.50, 0.88], u);
      cam.look = [0.06, 0.08, 0.43];
      cam.fov = 32;
    }
  }

  // ===========================================================================
  // SCENE 4 (73 – 102s): 翌朝11時 母の新米・りんご・チラシ裏メモ → 炊きたてご飯 → 4日間の手曲げ1.5mm銀色アルミ添え木 [1,784g]!
  // ===========================================================================
  else if (t < 102) {
    world.setActiveSet('apartment');
    if (t < 86.0) {
      // Cut 08: Morning Sunlight Entryway — Mom's Care Package (5kg 新米, 6 Red Apples, Nameko Soup, Handwritten Flyer Memo!)
      lights.setPreset('room_morning_hope');
      world.props.carePkg.visible = true;
      const u = (t - 73.0) / 13.0;
      fx.aperture = 0.013;
      cam.pos = lerp3([0.36, 0.56, 0.96], [-0.14, 0.44, 0.74], smooth(u));
      cam.look = [-0.02, 0.10, 0.42];
      cam.fov = 30;
    } else if (t < 96.2) {
      // Cut 09A: Steaming Hot White Rice Bowl + 4-Day Bath-Towel Desktop Vise, 1.5mm Silver Aluminum Sheet Bending & Hand-Filing + New Steel Gears!
      lights.setPreset('room_craft_focus');
      world.props.riceBowl.visible = true;
      world.props.metalworkGroup.visible = true;

      // Animate rising warm steam puffs, reciprocating hand file ("シュッ、シュッ"), and crisp 90° bend!
      const u = (t - 86.0) / 10.2;
      world.props.steamPuffs.forEach((p, idx) => {
        p.position.y = 0.095 + ((t * 0.055 + idx * 0.03) % 0.11);
      });
      world.props.steelFile.position.x = -0.02 + Math.sin(t * 14.0) * 0.032;
      world.props.aluBentFlange.rotation.x = smooth((t - 90.0) / 4.5) * (Math.PI * 0.48);

      fx.aperture = 0.013;
      cam.pos = lerp3([-0.24, 1.00, 0.16], [0.16, 0.96, 0.12], u);
      cam.look = [-0.03, 0.79, -0.50];
      cam.fov = 35;
    } else {
      // Cut 09B: Hero Transformation — Scarred Matte-Black + 5 Gleaming Hand-Bent Silver Aluminum Splints on Scale (`1784 g`!)
      lights.setPreset('room_craft_focus');
      dramaBars = true;
      world.scaleGroup.visible = true;
      world.heroFighter.root.visible = true;
      world.heroFighter.setBattleState({ scratched: true, hipCracked: false, silverSplints: true });
      world.heroFighter.setPose({ pelvisPos: [0, 0.205, 0], leftArmPitch: 0.08, rightArmPitch: 0.08 });
      world.heroFighter.root.position.set(0.08, 0.746, -0.522);
      world.heroFighter.root.rotation.set(0, -0.28 + ((t - 96.2) / 5.8) * 0.56, 0);

      const u = (t - 96.2) / 5.8;
      fx.aperture = 0.011;
      cam.pos = lerp3([0.24, 1.02, 0.56], [-0.06, 0.98, 0.52], u);
      cam.look = [0.08, 0.92, -0.50];
      cam.fov = 35;
    }
  }

  // ===========================================================================
  // SCENE 5 (102 – 150s): Day 198 22:40 高架下の青い火花・うつ伏せ完全自立起き上がり → 3m『9秒48』スプリント → 銀色の肩に額を当てる!
  // ===========================================================================
  else {
    world.setActiveSet('viaduct');
    lights.setPreset('viaduct_climax');
    dramaBars = true;
    world.heroFighter.root.visible = true;
    world.heroFighter.setBattleState({ scratched: true, hipCracked: false, silverSplints: true });

    // Final express train rushing overhead + crackling blue pantograph catenary spark at t=104..107s!
    world.expressTrain.position.x = -12 + ((t - 102.0) * 6.2) % 28.0;
    const sparkOn = t >= 104.0 && t <= 107.2 && Math.sin(t * 48) > 0.15;
    world.catenarySparkOrb.visible = sparkOn;
    world.catenarySparkLight.intensity = sparkOn ? 18.0 : 0.0;

    if (t < 124.0) {
      // Cut 10: White Lantern Pool — 4-Phase Biomechanical Prone-to-Standing Autonomous Get-Up ("……立った……！")
      world.props.lantern.position.set(-0.56, 0.006, 0.25);
      const getUpU = smooth((t - 105.0) / 16.5);
      world.heroFighter.setProneGetUpProgress(getUpU, { failStrippedGear: false });
      world.heroFighter.root.position.set(0, 0.006, 0.05);
      world.heroFighter.root.rotation.set(0, 0.32, 0);

      const u = (t - 102.0) / 22.0;
      fx.aperture = 0.014;
      cam.pos = lerp3([0.74, 0.42, 1.32], [0.54, 0.35, 1.12], u);
      cam.look = [0, lerp(0.14, 0.24, getUpU), 0.08];
      cam.fov = 33;
    } else if (t < 140.0) {
      // Cut 11: Blistering 3.0m White-Chalk Hard-Linoleum Sprint -> Stopwatch Freezes at "09.48 s"!
      world.props.lantern.position.set(-0.56, 0.006, 1.65);
      world.props.stopwatchBoard.visible = true;

      const sprintU = clamp01((t - 124.0) / 14.2); // 0 -> 1 across 3.00m!
      const swTime = Math.min(9.48, sprintU * 9.48);
      world.props.updateStopwatch(swTime, sprintU >= 0.995);

      // 40 rapid brisk 75mm strides across 3.00m!
      const stepFloat = sprintU * 40.0;
      const { forwardZ } = world.heroFighter.setDynamicZmpWalk(stepFloat, {
        maxSteps: 40.0,
        stride: 0.075,
        showZmpDots: false,
      });
      const worldZ = Math.min(3.00, forwardZ);
      world.heroFighter.root.position.set(0, 0.006, worldZ);
      world.heroFighter.root.rotation.set(0, 0, 0);

      fx.aperture = 0.013;
      if (t < 134.0) {
        // Low-angle tracking dolly racing right alongside the silver-splinted fighter!
        cam.pos = [0.76, 0.34, worldZ + 0.68];
        cam.look = [0, 0.23, worldZ + 0.04];
        cam.fov = 33;
      } else {
        // Finish-line hero reception with glowing "09.48 s" stopwatch board!
        const fu = (t - 134.0) / 6.0;
        cam.pos = lerp3([0.52, 0.35, 3.82], [0.24, 0.32, 3.92], fu);
        cam.look = [-0.08, 0.23, 2.96];
        cam.fov = 33;
      }
    } else {
      // Cut 12: Emotional Finale — Kneeling Minato Gently Presses Forehead Against Warm Silver Aluminum Shoulder (17 Days Left!)
      world.props.lantern.position.set(-0.54, 0.006, 2.42);
      world.minatoKneel.root.visible = true;
      world.heroFighter.setDynamicZmpWalk(40.0, { maxSteps: 40.0, stride: 0.075, showZmpDots: false });
      world.heroFighter.setPose({ pelvisPos: [0, 0.205, 0], leftArmPitch: 0.06, rightArmPitch: 0.06 });
      world.heroFighter.root.position.set(0, 0.006, 3.00);
      world.heroFighter.root.rotation.set(0, -0.35, 0);

      const u = (t - 140.0) / 10.0;
      fx.aperture = 0.013;
      fx.bloomStrength = 0.26;
      cam.pos = lerp3([0.22, 0.44, 4.18], [0.42, 0.58, 4.55], smooth(u));
      cam.look = [-0.24, 0.34, 2.98];
      cam.fov = 35;
    }
  }

  return { cam, fx, dramaBars, fin: t >= 149.2 };
}
