export const CH18_DURATION = 150.0;

export const CH18_SCENES = [
  { id: 1, start: 0,   end: 24,  jp: '八月最初の金曜夜 · 命綱を外した高架下・秒速0.3mの静かな一歩' },
  { id: 2, start: 24,  end: 50,  jp: '秒速0.9m急制動 → 『36.8V』回生過電圧ブラックアウト＆コンクリート大転倒！' },
  { id: 3, start: 50,  end: 86,  jp: 'モジュラー設計の真価 · 2°曲がった中空軸をわずか『2時間足らず』で完全復旧！' },
  { id: 4, start: 86,  end: 112, jp: '踏切の急行電車で開眼 · 金色の50W 1.5Ω『回生シャントクランプ回路』実装！' },
  { id: 5, start: 112, end: 136, jp: 'Day 496 お盆の夜 · 秒速1.1m無拘束全力走行＆『ザッ——ピタリ！！』急制動制覇！' },
  { id: 6, start: 136, end: 150, jp: '人肌の金色抵抗器 ＆ 26.2V完璧クランプ —— 次なるは両腕と頭部、そして外乱テストへ！' },
];

export const CH18_SUBTITLES = [
  { start: 0.4,   end: 11.8,  speaker: 'ナレーション', text: '八月最初の金曜夜、十ヶ月ぶりの鉄道高架下。白いランタンを灯し、背中の安全フックからカラビナを完全に外す——もう命綱はどこにもない。' },
  { start: 12.0,  end: 23.8,  speaker: '佐伯 湊', text: '『トン……トン……トン……』秒速0.3mの危なげない歩み。「よし、次は秒速0.9メートルまで上げて、5m先でピタッと急停止してみろ！」' },

  { start: 24.4,  end: 34.4,  speaker: 'ナレーション', text: 'タン、タン、タン、タッ——！！ 全力の逆トルクブレーキをかけた瞬間——『ピピッ——バチンッ！！』保護回路が叫び、主電源が一瞬でブラックアウト！！' },
  { start: 34.6,  end: 49.8,  speaker: 'ナレーション', text: 'ガシャァァァンッ！！ 7.62kgの金属塊が受け身もなくコンクリートへ叩きつけられ一回転半！ 右股関節カバーが割れ、8mm鋼鉄中空シャフトが2°『く』の字に曲がっていた。' },

  { start: 50.4,  end: 63.8,  speaker: 'ナレーション', text: 'だが19歳の湊は静かだった。ログが示す『Bus Voltage Peak : 36.8 V』を一目で射抜き、去年とは違う迷いのない手つきで帰路につく。' },
  { start: 64.0,  end: 76.4,  speaker: 'ナレーション', text: '深夜203号室、白いウエスと六角レンチ1本！ ボルト4本で関節ユニットをカセットテープのように5分で『スポッ』と抜き出し、予備の13個目＆新品シャフトへ換装！' },
  { start: 76.6,  end: 85.8,  speaker: '佐伯 湊', text: '大転倒からわずか『二時間足らず』で完全復旧。「……二時間で、直せるようになったんだな、俺」——転んでもその夜のうちに直して立たせられる腕が宿っていた。' },

  { start: 86.4,  end: 98.8,  speaker: '佐伯 湊', text: '翌日の踏切、減速する急行電車の『キィィィン…ヒュゥゥン…』という回生ブレーキ音でハッとする！「行き場を失った電気なら、胸の中に逃がし弁を作って熱へ逃がせばいい！」' },
  { start: 99.0,  end: 111.8, speaker: 'ナレーション', text: '秋葉原で調達した金色の50W・1.5Ω『メタルクラッド抵抗』を黒い背骨フレームへ直付け！ 26.2Vを0.1Vでも超えれば百万分の1秒で熱へ逃がす『回生シャントクランプ回路』完成！' },

  { start: 112.4, end: 124.8, speaker: 'ナレーション', text: 'Day 496お盆の夜、無人の高架下で命綱なしの秒速『1.1 メートル』全力走行！ タンッ、タンッ、タンッ、タンッ！！ 5m一気に駆け抜け急制動レバーを引く！！' },
  { start: 125.0, end: 135.8, speaker: 'ナレーション', text: '『ザッ——ピタリ！！』両膝が深く沈み込み7.62kgの突進を柔らかく吸収——電源は落ちない！ 頭上を急行電車が軽快に走り抜けていった！' },

  { start: 136.4, end: 149.8, speaker: 'ナレーション', text: '波形はきっかり『26.2 V』で定規のように完璧クランプ、背骨の金色抵抗は人肌の温かさ。あとは両腕と頭部を纏い、最後の宿題『全力横突き飛ばし』へ挑むだけだ！' },
];

export function getCh18Scene(t) {
  for (let i = CH18_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH18_SCENES[i].start) return CH18_SCENES[i];
  }
  return CH18_SCENES[0];
}
export function getCh18Subtitle(t) {
  for (let i = 0; i < CH18_SUBTITLES.length; i++) {
    const s = CH18_SUBTITLES[i];
    if (t >= s.start && t <= s.end) return { speaker: s.speaker, text: s.text };
  }
  return null;
}
export function getCh18Cutin(t) {
  if (t >= 34.0 && t < 43.0) return { text: '警告：36.8V 回生過電圧ブラックアウト！ コンクリート大転倒！！', tone: 'crimson' };
  if (t >= 67.0 && t < 75.5) return { text: 'モジュラー設計：4本ボルトで5分換装 → 転倒から2時間で完全復旧！', tone: 'emerald' };
  if (t >= 100.0 && t < 109.0) return { text: '金色50W 1.5Ω 回生シャントクランプ回路（26.2V上限）背骨直付け！', tone: 'amber' };
  if (t >= 125.0 && t < 133.5) return { text: '秒速1.1m全力走行 → 『ザッ——ピタリ！！』完全急制動達成！！', tone: 'emerald' };
  return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

export function evaluateCh18Timeline(t, world, screens, lights, camera, lookTarget, hudCb) {
  const { hmd02, viaductRig, repairRig, crossingRig, minatoViaduct } = world;

  repairRig.group.visible = false;
  repairRig.goldResGroup.visible = false;
  hmd02.root.rotation.set(0, 0, 0);
  hmd02.goldResistorGroup.visible = t >= 100.0;
  hmd02.setGoldResistorHeat(0.15);
  minatoViaduct.root.visible = true;

  let dof = { focusDist: 1.5, aperture: 0.007, halation: 0.28 };
  let simLog = null;

  // CUT 01 (0..24s): Night Viaduct — Detaching Tether & Smooth 0.3 m/s Untethered Walk!
  if (t < 24.0) {
    const u = t / 24.0;
    world.setActiveSet('viaduct');
    lights.setPreset('viaduct_night');
    viaductRig.updateTrain(t);

    const walkX = lerp(-1.8, 0.2, u);
    const ph = t * 3.4;
    const sL = Math.sin(ph), sR = Math.sin(ph + Math.PI);
    hmd02.root.position.set(walkX, 0.025, 0.4);
    hmd02.root.rotation.y = Math.PI / 2;
    hmd02.setPose({
      liftY: Math.abs(Math.cos(ph)) * 0.018,
      hipLPitch: sL * 0.36, kneeL: sL < 0 ? 0.05 : sL * 0.56,
      hipRPitch: sR * 0.36, kneeR: sR < 0 ? 0.05 : sR * 0.56,
      visorIntensity: 1.35,
    });
    minatoViaduct.root.position.set(walkX - 0.8, 0, 1.35);

    camera.position.set(walkX + 1.45, 0.82, 2.35);
    lookTarget.set(walkX, 0.44, 0.35);
    dof = { focusDist: 2.2, aperture: 0.006, halation: 0.30 };
    simLog = {
      tag: 'AUGUST NIGHT // RAILWAY VIADUCT · ZERO SAFETY TETHER',
      title: '十ヶ月ぶりの高架下 —— 命綱を完全に外し、秒速0.3mの静かな自立歩行！',
      detail: '白いランタンの光の下、頭のない7.62kgの黒い脚がコンクリートを滑らかに踏みしめる',
    };
  }
  // CUT 02 (24..50s): 0.9 m/s Sprint -> Sudden Brake -> 36.8V Blackout -> Concrete Crash!
  else if (t < 50.0) {
    const u = (t - 24.0) / 26.0;
    world.setActiveSet('viaduct');
    viaductRig.updateTrain(t);

    if (t < 35.0) {
      // High-speed 0.9 m/s sprint!
      lights.setPreset('viaduct_night');
      const sU = (t - 24.0) / 11.0;
      const walkX = lerp(-1.6, 1.4, sU);
      const ph = t * 6.4;
      const sL = Math.sin(ph), sR = Math.sin(ph + Math.PI);
      hmd02.root.position.set(walkX, 0.025, 0.4);
      hmd02.root.rotation.y = Math.PI / 2;
      hmd02.setPose({
        torsoPitch: 0.10,
        hipLPitch: sL * 0.52, kneeL: sL < 0 ? 0.06 : sL * 0.78,
        hipRPitch: sR * 0.52, kneeR: sR < 0 ? 0.06 : sR * 0.78,
        visorIntensity: 1.65,
      });
      minatoViaduct.root.position.set(-1.6, 0, 1.5);
      camera.position.set(walkX + 1.35, 0.68, 2.15);
      lookTarget.set(walkX, 0.42, 0.4);
    } else {
      // 35..50s: 36.8V BLACKOUT -> Violent Tumbling Crash onto Concrete (resting cleanly supine ON TOP of ground!)
      lights.setPreset('viaduct_crash');
      const cU = clamp01((t - 35.0) / 3.2);
      const roll = smooth(cU);
      hmd02.root.position.set(lerp(1.4, 2.55, roll), lerp(0.025, 0.095, roll) + Math.sin(roll * Math.PI) * 0.28, 0.4);
      hmd02.root.rotation.set(-roll * Math.PI * 0.5, Math.PI / 2, roll * 0.25);
      hmd02.setPose({
        hipLPitch: 0.28, kneeL: 0.65, hipRPitch: -0.22, kneeR: 0.85,
        visorIntensity: 0.02, // POWER COMPLETELY DEAD!
      });
      minatoViaduct.root.position.set(lerp(-0.4, 1.55, smooth(clamp01((t - 36.5) / 6.0))), 0, 1.35);
      minatoViaduct.root.rotation.y = Math.PI * 0.72;
      camera.position.set(lerp(2.6, 2.25, smooth(clamp01((t - 35) / 15))), lerp(0.95, 0.72, smooth(cU)), 2.15);
      lookTarget.set(2.35, 0.22, 0.42);
    }
    dof = { focusDist: 1.85, aperture: 0.007, halation: 0.34 };
    simLog = {
      tag: 'OVER-VOLTAGE BLACKOUT // 36.8 V CUTOFF · CONCRETE CRASH!',
      title: '『ピピッ——バチンッ！！』急制動の瞬間に全電源喪失 —— 7.62kgがコンクリートへ大転倒！',
      detail: '右股関節カバー破砕＆8mm鋼鉄中空シャフトが2°湾曲。だが19歳の湊は動揺しない',
    };
  }
  // CUT 03 (50..86s): 36.8V Log Diagnosis -> Midnight Room 203 Modular 2-Hour Full Recovery!
  else if (t < 86.0) {
    world.setActiveSet('workbench');
    lights.setPreset('workbench_midnight');
    screens.updateLog('cutoff_36_8v');

    if (t < 64.0) {
      // 50..64s: Sharp look at `Bus Voltage Peak : 36.8 V (Over-Voltage Cutoff!)` telemetry screen!
      const u = (t - 50.0) / 14.0;
      repairRig.group.visible = true;
      camera.position.set(lerp(0.14, 0.0, smooth(u)), 1.02, lerp(-0.56, -0.72, smooth(u)));
      lookTarget.set(0.0, 1.02, -1.36);
      dof = { focusDist: 0.72, aperture: 0.0035, halation: 0.26 };
      simLog = {
        tag: 'TELEMETRY DIAGNOSIS // BUS VOLTAGE PEAK : 36.8 V',
        title: '原因を一目で射抜く：『36.8V 過電圧遮断』—— 12基の筋肉が巨大な発電機へ豹変！',
        detail: '頭の中ではすでに修理手順1番から10番まで綺麗に並んでいた',
      };
    } else {
      // 64..86s: White Shop Cloth, Modular Hip Cassette, 2-deg Bent Hollow Shaft vs Fresh Spare!
      const u = (t - 64.0) / 22.0;
      repairRig.group.visible = true;
      camera.position.set(lerp(-0.26, 0.26, smooth(u)), lerp(1.06, 0.98, smooth(u)), lerp(-0.44, -0.46, smooth(u)));
      lookTarget.set(0.02, 0.76, -0.88);
      dof = { focusDist: 0.54, aperture: 0.005, halation: 0.24 };
      simLog = {
        tag: 'MODULAR DESIGN // 4-BOLT CASSETTE SWAP · 2-HOUR RECOVERY!',
        title: '白いウエスと六角レンチ1本 —— 2°曲がった中空軸をわずか『2時間足らず』で完全復旧！',
        detail: '「二時間で、直せるようになったんだな、俺」——転んでもその夜に直せる本物の腕',
      };
    }
  }
  // CUT 04 (86..112s): Express Train Level Crossing Epiphany -> Gold 50W 1.5Ω Metal-Clad Resistor!
  else if (t < 112.0) {
    if (t < 100.0) {
      const u = (t - 86.0) / 14.0;
      world.setActiveSet('crossing');
      lights.setPreset('crossing_dusk');
      crossingRig.updateCrossing(t);

      camera.position.set(lerp(-1.65, 1.25, smooth(u)), 1.48, lerp(2.65, 2.35, smooth(u)));
      lookTarget.set(-0.25, 1.32, -1.25);
      dof = { focusDist: 3.6, aperture: 0.006, halation: 0.30 };
      simLog = {
        tag: 'LEVEL CROSSING EPIPHANY // EXPRESS TRAIN REGENERATIVE BRAKE',
        title: '踏切を通過する急行電車の『キィィィン…ヒュゥゥン…』—— 胸の中に逃がし弁を作れ！',
        detail: '行き場を失った回生電力を、電車と同じように抵抗器で優しい熱へ逃がす閃き！',
      };
    } else {
      const u = (t - 100.0) / 12.0;
      world.setActiveSet('workbench');
      lights.setPreset('workbench_gold');
      screens.updateLog('clamped_26_2v');
      repairRig.goldResGroup.visible = true;
      repairRig.goldMat.emissiveIntensity = 0.25 + Math.sin(t * 4.0) * 0.25;

      camera.position.set(lerp(-0.18, 0.18, smooth(u)), lerp(0.96, 0.90, smooth(u)), lerp(-0.56, -0.58, smooth(u)));
      lookTarget.set(0.0, 0.77, -0.88);
      dof = { focusDist: 0.38, aperture: 0.005, halation: 0.30 };
      simLog = {
        tag: 'SHUNT CLAMP CIRCUIT // GOLD 50W 1.5Ω METAL-CLAD RESISTOR',
        title: '金色の50W・1.5Ωメタルクラッド抵抗器を黒い背骨へ直付け —— 26.2V上限クランプ完成！',
        detail: '26.2Vを0.1Vでも超えれば百万分の1秒で解放し、暴れる稲妻を優しい熱へ変換する',
      };
    }
  }
  // CUT 05 (112..136s): Day 496 Obon Night — Untethered `1.1 m/s` Sprint & `ザッ——ピタリ！！` Hard Brake!
  else if (t < 136.0) {
    const u = (t - 112.0) / 24.0;
    world.setActiveSet('viaduct');
    lights.setPreset('viaduct_obon_triumph');
    viaductRig.updateTrain(t + 4.0);

    const sprintU = clamp01(u / 0.56);
    const brakeEnv = u >= 0.56 ? Math.sin(clamp01((u - 0.56) / 0.22) * Math.PI) : 0;
    const walkX = lerp(-2.4, 1.8, smooth(sprintU));
    const ph = sprintU * Math.PI * 10.0;
    const sL = sprintU < 1 ? Math.sin(ph) : 0;
    const sR = sprintU < 1 ? Math.sin(ph + Math.PI) : 0;

    hmd02.root.position.set(walkX, 0.025, 0.4);
    hmd02.root.rotation.y = Math.PI / 2;
    hmd02.goldResistorGroup.visible = true;
    hmd02.setGoldResistorHeat(u >= 0.56 ? 0.95 : 0.15);
    hmd02.setPose({
      liftY: -brakeEnv * 0.08 + (sprintU < 1 ? Math.abs(Math.cos(ph)) * 0.02 : 0),
      torsoPitch: sprintU < 1 ? 0.12 : -brakeEnv * 0.10,
      hipLPitch: sprintU < 1 ? sL * 0.56 : 0.22 * brakeEnv,
      kneeL: sprintU < 1 ? (sL < 0 ? 0.05 : sL * 0.82) : 0.55 * brakeEnv + 0.06,
      hipRPitch: sprintU < 1 ? sR * 0.56 : -0.45 * brakeEnv,
      kneeR: sprintU < 1 ? (sR < 0 ? 0.05 : sR * 0.82) : 0.62 * brakeEnv + 0.06,
      visorIntensity: 1.65,
    });
    minatoViaduct.root.position.set(walkX - 1.15, 0, 1.55);

    camera.position.set(walkX + lerp(1.55, 1.25, smooth(u)), lerp(0.84, 0.66, smooth(u)), lerp(2.55, 1.95, smooth(u)));
    lookTarget.set(walkX, 0.44, 0.35);
    dof = { focusDist: 2.1, aperture: 0.006, halation: 0.34 };
    simLog = {
      tag: 'DAY 496 OBON NIGHT // 1.1 m/s UNTETHERED SPRINT & HARD BRAKE!',
      title: '『タンッ、タンッ、ザッ——ピタリ！！』秒速1.1mから急制動完全制覇！ 電源は落ちない！',
      detail: '高架の真上を急行電車が軽快に走り抜ける中、背骨の金色抵抗が人肌の温かさを帯びる',
    };
  }
  // CUT 06 (136..150s): Crisp `26.2 V` Ruler-Flat Clamped Waveform & Teaser for Arms + Head!
  else {
    const u = (t - 136.0) / 14.0;
    world.setActiveSet('workbench');
    lights.setPreset('workbench_gold');
    screens.updateLog('clamped_26_2v');
    repairRig.goldResGroup.visible = false;

    camera.position.set(lerp(0.12, 0.0, smooth(u)), 1.02, lerp(-0.62, -0.74, smooth(u)));
    lookTarget.set(0.0, 1.02, -1.36);
    dof = { focusDist: 0.72, aperture: 0.0035, halation: 0.30 };
    simLog = {
      tag: 'END OF CHAPTER 18 // DAY 496 · BUDGET ¥283,020',
      title: '定規を当てたような『26.2 V』完璧クランプ —— あとは両腕と頭部、そして外乱テスト！',
      detail: '次章：第19章『外乱への反射 ——「生き物」になった瞬間』へ！',
    };
  }

  if (hudCb) hudCb({ simLog });
  return dof;
}
