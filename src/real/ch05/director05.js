export const CH05_DURATION = 150.0; // 02:30 (2 minutes 30 seconds — Next-Gen Cinema Macro!)

export const CH05_SCENES = [
  { id: 1, start: 0, end: 30, jp: 'Day 073-080 · KiCad 2層配線・4mΩ逆接保護と深圳JLCPCB発注' },
  { id: 2, start: 30, end: 58, jp: 'Day 081-094 · 七夕の試験勉強・緑の基板開封と360℃バスバー実装' },
  { id: 3, start: 58, end: 80, jp: 'Day 095 · BNO085 磁気干渉(+40°自転)と6軸200Hz融合モード' },
  { id: 4, start: 80, end: 112, jp: 'Day 095-096 · BOTTOM VIEW逆転発覚と午前2時の0.3mm基板手術' },
  { id: 5, start: 112, end: 150, jp: 'Day 098 · 臍の緒の切断！ 3S LiPo自律駆動と200Hz『鷹の姿勢反射』' },
];

export function getCh05Scene(t) {
  for (let i = CH05_SCENES.length - 1; i >= 0; i--) {
    if (t >= CH05_SCENES[i].start) return CH05_SCENES[i];
  }
  return CH05_SCENES[0];
}

const SUBTITLES = [
  // --- SCENE 1 (0 - 30s): KiCad Red/Blue Routing, 8.8mm Busbar, 4mΩ MOSFET & JLCPCB Order ---
  { s: 0.6, e: 8.2, sp: '佐伯 湊', tx: '「……落ち着く。こっちは言葉が通じるぞ。赤は表面銅箔、青は裏面銅箔——二階建ての高速道路網を設計する論理のパズルだ」' },
  { s: 8.4, e: 16.5, sp: 'ナレーション', tx: '外形50×55mmの心臓部『HMD-CORE-v1』。1oz（厚さ35μm）銅箔に12Aを流すため幅8.8mmのレジスト開口母線を引き、4系統スター分岐を構築する。' },
  { s: 16.7, e: 23.5, sp: 'ナレーション', tx: 'オン抵抗わずか4mΩのPch MOSFET理想ダイオード逆接保護で発熱を0.4Wへ抑え込み、10.2V過放電警報ブザーも搭載。' },
  { s: 23.7, e: 29.8, sp: 'ナレーション', tx: '2回目のバイト代68,500円で残高は151,820円へ回復。DRCエラーゼロを確認し、ガーバーデータを中国・深圳のJLCPCBへ発注した（送料込2,450円）。' },

  // --- SCENE 2 (30 - 58s): Tanabata Exam Study, Unboxing 5 Emerald PCBs & 360°C Busbar ---
  { s: 30.3, e: 37.8, sp: 'ナレーション', tx: '前期末試験の単位を落とせば来年の開発時間が死ぬ。七夕の夜、附属図書館で交流フェーザ計算を解き終えたスマホに『羽田通関完了』が灯った！' },
  { s: 38.0, e: 46.2, sp: '佐伯 湊', tx: '「……本物だ、俺の設計した緑のプリント基板だ！ 金色のレジスト開口も『Designed by M.Saeki』の白いシルク文字も寸分の狂いもない！」' },
  { s: 46.4, e: 57.6, sp: 'ナレーション', tx: 'まずは0805チップ部品と電源ICだけを段階実装し、中央の銅帯に360℃で銀色のはんだを蒲鉾状に盛り上げる。5.02V・3.301V、電源回路一発合格！' },

  // --- SCENE 3 (58 - 80s): BNO085 Magnetic Interference vs 6-Axis 200Hz ---
  { s: 58.3, e: 67.2, sp: 'ナレーション', tx: 'ESP32-S3と9軸IMU『BNO085』を実装。だが下半身ユニットへ近づけた途端、股関節サーボ6個の強力なネオジム漏洩磁束で画面のキューブが40度も自転した！' },
  { s: 67.4, e: 79.6, sp: '佐伯 湊', tx: '「磁気干渉か！ 地磁気コンパスを切り離してジャイロと加速度だけの『6軸クォータニオン融合（200Hz）』に書き換えれば……よし、岩のようにピタリと止まった！」' },

  // --- SCENE 4 (80 - 112s): BOTTOM VIEW Mirrored Pinout & 02:00 AM Micro-Surgery! ---
  { s: 80.2, e: 87.6, sp: 'ナレーション', tx: '通電前の導通チェック。基板のGNDと黒線が繋がっていない——恐る恐る3番ピンの白線（DATA）へプローブを当てた瞬間、『ピィィィィーッ！』とブザーが鳴り響いた！' },
  { s: 87.8, e: 95.8, sp: '佐伯 湊', tx: '「うわぁぁぁっ、図面が『裏面視（BOTTOM VIEW）』だ！！ 全4ポートで1番ピン（GND）と3番ピン（DATA）が左右鏡像にひっくり返ってる……！」', shout: true },
  { s: 96.0, e: 104.2, sp: 'ナレーション', tx: '中央2番ピンが+12V規格だったため焼損は免れた。午前2時、拡大鏡の下でデザインナイフを垂直に立て、幅0.3mmの銅箔パターンを顕微鏡手術のように切断する！' },
  { s: 104.4, e: 111.7, sp: 'ナレーション', tx: '極細0.25mmのAWG30ジュンフロン線をX字に交差ハンダ付けし、緑のUV硬化レジストを395nm紫外線ライトで封止——自らのメスで初版基板の傷跡を勲章へ変えた。' },

  // --- SCENE 5 (112 - 150s): Cutting the Umbilical Cord! 3S LiPo & 200Hz Hawk Reflex! ---
  { s: 112.2, e: 120.2, sp: 'ナレーション', tx: 'Day 098夜。改修を終えた『HMD-CORE-v1』と満充電の3S LiPoを背負った自立総重量1,222g——外部電源線もUSBケーブルもすべて取り外し、臍の緒を完全に断ち切った！' },
  { s: 120.4, e: 129.8, sp: 'ナレーション', tx: '合板を左へ8度、前後へ10度と大きく傾ける——5ミリ秒（200Hz）の反射速度で山側の膝が深く折れ、谷側の脚が伸び、足首ロールが傾斜角ぴったりに追従する！' },
  { s: 130.0, e: 139.5, sp: '佐伯 湊', tx: '「……生きてるみたいだ。猛禽類の鷹の頭みたいに、床がどれだけ揺れても緑の心臓と骨盤が空間に釘付けされたまま微動だにしない……！」' },
  { s: 139.7, e: 149.7, sp: 'ナレーション', tx: '夜の窓から今年最初のアブラゼミの声が届く。残り資金126,320円——前期末試験を越えた先、八月の太陽の下でいよいよ全16自由度の全身組立が待っていた。' },
];

const SIMLOGS = [
  { s: 0.5, e: 23.2, tag: 'PCB DESIGN // DAY 076 · KICAD 8.0', title: '特注2層基板『HMD-CORE-v1』(50×55mm)', detail: '1oz(35μm) 8.8mmレジスト開口母線 ／ 4mΩ MOSFET理想ダイオード(0.4W) ／ 4系統スター分岐' },
  { s: 23.5, e: 29.8, tag: 'FAB ORDER // DAY 080 · SHENZHEN', title: '第2回バイト代 +¥68,500 → JLCPCB 発注完了', detail: '一時残高 ¥151,820 ／ エメラルドグリーン2層基板5枚 送料込 ¥2,450' },
  { s: 38.0, e: 57.5, tag: 'BRING-UP // DAY 094 · STEP-BY-STEP', title: '0805 SMD手実装 ＆ 360℃はんだバスバー形成', detail: '実測 5.02 V / 3.301 V 一発合格 ／ 10.2V LiPo過放電警報ブザー動作確認 [PASS]' },
  { s: 58.5, e: 79.5, tag: 'IMU FUSION // DAY 095 · BNO085', title: '股関節ネオジム磁気干渉回避 → 6軸 200Hz', detail: '9軸地磁気モード(+40°自転異常)を廃止 → Game Rotation Vector で重力基準ロック' },
  { s: 83.5, e: 111.5, tag: 'REWORK // DAY 096 · 02:00 AM SURGERY', title: 'BOTTOM VIEW 1-3番ピン反転 → パターンカット改修', detail: '0.3mm銅箔切断 ＋ AWG30ジュンフロンX字クロス配線 ＋ 395nm UV硬化レジスト封止' },
  { s: 112.5, e: 149.6, tag: 'AUTONOMOUS // DAY 098 · HAWK REFLEX', title: '完全ケーブルレス 200Hz 姿勢安定化反射 [PASS]', detail: '自立重量 1,222g (3S LiPo 11.8V) ／ 合板傾斜 ±8°・10° 外乱に対し骨盤水平誤差 0.4°以内！' },
];

const CUTINS = [
  { s: 0.4, e: 4.0, kicker: 'CHAPTER 05 · DAY 073 – DAY 098', main: '深圳から届いた緑の基板', sub: 'Custom 2-Layer PCB "HMD-CORE-v1" & 3S LiPo Untethered Autonomy', style: '' },
  { s: 87.6, e: 91.2, kicker: 'DATASHEET TRAP · PCB LAYOUT (BOTTOM VIEW)', main: '1番・3番ピン鏡像反転 発覚！！', sub: '午前2時の顕微鏡手術 — 0.3mm銅箔カット＆AWG30クロス配線へ', style: 'crimson' },
  { s: 113.2, e: 116.8, kicker: 'DAY 098 · ZERO UMBILICAL WIRES · 200Hz IMU', main: '姿勢安定化反射、起動。', sub: 'Untethered 3S LiPo + BNO085 Hawk-Head Leveling (< 0.4° Error)', style: '' },
];

export function getCh05Subtitle(t) {
  for (const s of SUBTITLES) {
    if (t >= s.s && t <= s.e) return { speaker: s.sp, text: s.tx, shout: !!s.shout };
  }
  return null;
}

export function getCh05Simlog(t) {
  for (const l of SIMLOGS) {
    if (t >= l.s && t <= l.e) return l;
  }
  return null;
}

export function getCh05Cutin(t) {
  for (const c of CUTINS) {
    if (t >= c.s && t <= c.e) return c;
  }
  return null;
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function smooth(v) {
  const c = clamp01(v);
  return c * c * (3 - 2 * c);
}

function lerp3(a, b, u) {
  const s = smooth(u);
  return [
    a[0] + (b[0] - a[0]) * s,
    a[1] + (b[1] - a[1]) * s,
    a[2] + (b[2] - a[2]) * s,
  ];
}

export function evaluateCh05Director(t, world, screens, lights) {
  const cam = { pos: [0, 0.95, 0.2], look: [0.06, 0.74, -0.49], fov: 30 };
  const fx = {
    time: t,
    aperture: 0.011, // Optical Bokeh Depth-of-Field aperture
    aoStrength: 0.54,
    bloomStrength: 0.22,
    warmth: 0.08,
    flash: 0.0,
    chromatic: 0.004,
  };
  let dramaBars = false;

  // Clean per-frame visibility defaults
  world.setActiveSet('apartment');
  world.minatoRoom.root.visible = false;
  world.loupeGroup.visible = false;
  world.ironRig.visible = false;
  world.tools.unboxGroup.visible = false;
  world.tools.craftKnife.visible = false;
  world.tools.uvTorch.visible = false;
  world.tools.uvSpotLight.intensity = 0;
  world.tools.lipoPack.visible = false;
  world.heroPcb.root.visible = false;
  world.hawkSystem.root.visible = false;
  world.rightToolHand.group.visible = false;
  world.multimeter.visible = true;

  world.skyWinMat.uniforms.uTime.value = t;
  world.skyWinMat.uniforms.uAfternoon.value = t >= 38 && t < 58 ? 1.0 : 0.0;

  // ===========================================================================
  // SCENE 1 (0 – 30s): KiCad 赤×青2層ルーティング・4mΩ逆接保護・JLCPCB深圳発注
  // ===========================================================================
  if (t < 30) {
    lights.setPreset('room_night_kicad');
    screens.setLaptopMode(t < 22.0 ? 'kicad_routing' : 'jlcpcb_order');
    screens.setPhoneMode('paycheck_151k');

    if (t < 9.5) {
      // Cut 1A: Atmospheric Over-Shoulder Push-In onto Pitch-Black KiCad Red/Blue 2-Layer Highway!
      const u = t / 9.5;
      world.minatoRoom.root.visible = true;
      world.minatoRoom.setPose(t, { seated: true, typing: true, focus: 0.8 });
      fx.aperture = 0.008;
      cam.pos = lerp3([0.36, 1.16, 0.36], [0.12, 1.02, 0.02], u);
      cam.look = [-0.28, 0.84, -0.68];
      cam.fov = 35;
    } else if (t < 22.0) {
      // Cut 1B: Razor-Sharp Macro on KiCad 8.0 PCB Editor (8.8mm Gold Solder-Mask Opening + 4-Port Star Bus!)
      const u = (t - 9.5) / 12.5;
      fx.aperture = 0.006;
      cam.pos = lerp3([-0.15, 0.90, -0.25], [-0.24, 0.86, -0.36], u);
      cam.look = [-0.33, 0.835, -0.74];
      cam.fov = 28;
    } else {
      // Cut 1C: JLCPCB Shenzhen Gerber Order Confirmed (Emerald Green, 5 pcs, ¥2,450!)
      const u = (t - 22.0) / 8.0;
      fx.aperture = 0.006;
      cam.pos = lerp3([-0.26, 0.86, -0.35], [-0.18, 0.88, -0.28], u);
      cam.look = [-0.33, 0.835, -0.74];
      cam.fov = 28;
    }
  }

  // ===========================================================================
  // SCENE 2 (30 – 58s): 七夕の図書館フェーザ勉強・羽田通関・5枚のエメラルド基板開封＆360℃バスバー！
  // ===========================================================================
  else if (t < 58) {
    if (t < 38.0) {
      // Cut 2A: Tanabata Night University Library Carrel — AC Phasor Notebook + "20:45 羽田通関完了" Smartphone!
      world.setActiveSet('library');
      lights.setPreset('library_warm');
      screens.setPhoneMode('dhl_haneda');
      fx.aperture = 0.012;
      const u = (t - 30.0) / 8.0;
      cam.pos = lerp3([-0.12, 0.98, 0.08], [0.08, 0.92, -0.04], u);
      cam.look = lerp3([-0.02, 0.78, -0.46], [0.16, 0.83, -0.46], u);
      cam.fov = 32;
    } else if (t < 46.5) {
      // Cut 2B: Glorious Afternoon Unboxing — Yellow DHL Bag + Blue JLCPCB Box + 5 Gleaming Emerald `HMD-CORE-v1` PCBs!
      lights.setPreset('room_afternoon_sun');
      fx.warmth = 0.14;
      fx.aperture = 0.015; // Rich cinema macro bokeh!
      world.tools.unboxGroup.visible = true;
      world.heroPcb.root.visible = true;
      world.heroPcb.setAssemblyState({ stage: 'bare', busbarProgress: 0 });
      world.heroPcb.root.position.set(0.02, 0.742, 0.08);
      world.heroPcb.root.rotation.set(-0.22, 0.28, 0.05); // Tilted to catch specular sunlight across gold ENIG & silk!

      const u = (t - 38.0) / 8.5;
      cam.pos = lerp3([-0.08, 0.88, -0.22], [0.18, 0.86, -0.24], u);
      cam.look = [0.06, 0.742, -0.48];
      cam.fov = 28;
    } else {
      // Cut 2C: Step-by-Step 0805 SMD Bring-up + 360°C Hakko Iron Mounding the Shiny Silver Solder Busbar + 3.301V PASS!
      lights.setPreset('room_night_macro');
      screens.setMeterMode('rail_3v3_pass');
      fx.aperture = 0.016;
      world.heroPcb.root.visible = true;
      world.heroPcb.root.position.set(0.06, 0.734, 0.06);
      world.heroPcb.root.rotation.set(0, 0, 0);

      const busbarProg = clamp01((t - 46.8) / 6.5);
      world.heroPcb.setAssemblyState({ stage: 'power', busbarProgress: busbarProg, ledOn: t >= 53.5 });

      if (t < 54.0) {
        world.ironRig.visible = true;
        const ironX = 0.035 + busbarProg * 0.055;
        world.ironRig.position.set(ironX, 0.748, 0.082);
        world.ironRig.rotation.set(-0.58, 0.42, 0);

        const u = (t - 46.5) / 7.5;
        cam.pos = lerp3([-0.08, 0.84, -0.28], [0.16, 0.83, -0.30], u);
        cam.look = [0.06, 0.738, -0.49];
        cam.fov = 26;
      } else {
        // Quick verification pan to Sanwa CD771 showing "3.301 V [PASS]"!
        const u = (t - 54.0) / 4.0;
        fx.aperture = 0.010;
        cam.pos = lerp3([-0.24, 0.88, -0.18], [-0.28, 0.86, -0.22], u);
        cam.look = [-0.36, 0.758, -0.44];
        cam.fov = 28;
      }
    }
  }

  // ===========================================================================
  // SCENE 3 (58 – 80s): BNO085 股関節ネオジム磁気干渉 (+40°自転) → 6軸200Hz融合ロック！
  // ===========================================================================
  else if (t < 80) {
    lights.setPreset('room_night_macro');
    screens.setLaptopMode('imu_mag_spin');
    world.heroPcb.root.visible = true;
    world.heroPcb.root.position.set(0.06, 0.734, 0.06);
    world.heroPcb.root.rotation.set(0, 0, 0);
    world.heroPcb.setAssemblyState({ stage: 'full_bug', busbarProgress: 1.0, ledOn: true });

    if (t < 68.0) {
      // Cut 3A: Macro Orbit over Fully Populated `HMD-CORE-v1` (ESP32-S3 + BNO085 IMU at CoM + 4x White 5264-3P Ports!)
      const u = (t - 58.0) / 10.0;
      fx.aperture = 0.016;
      cam.pos = lerp3([-0.09, 0.83, -0.29], [0.18, 0.82, -0.31], u);
      cam.look = [0.06, 0.738, -0.485];
      cam.fov = 26;
    } else {
      // Cut 3B: Laptop Visualizer comparing 9-Axis +40° Magnetic Spin vs 6-Axis 200Hz Game Rotation Vector!
      const u = (t - 68.0) / 12.0;
      fx.aperture = 0.006;
      cam.pos = lerp3([-0.16, 0.90, -0.26], [-0.24, 0.86, -0.36], u);
      cam.look = [-0.33, 0.835, -0.74];
      cam.fov = 28;
    }
  }

  // ===========================================================================
  // SCENE 4 (80 – 112s): BOTTOM VIEW 1-3番ピン鏡像逆転発覚 ＆ 午前2時の0.3mm顕微鏡手術！！
  // ===========================================================================
  else if (t < 112) {
    lights.setPreset('room_night_surgery');
    dramaBars = t >= 87.5;
    screens.setLaptopMode('bottom_view_horror');
    screens.setMeterMode(t < 83.5 ? 'gnd_open' : 'pin3_short_beep');

    world.heroPcb.root.visible = true;
    world.heroPcb.root.position.set(0.06, 0.734, 0.06);
    world.heroPcb.root.rotation.set(0, 0, 0);

    if (t < 87.6) {
      // Cut 4A: Sanwa CD771 Continuity Check — GND Silence ("O.L") -> Pin 3 White Wire SCREAMS ("0.1 Ω BEEP!!")!
      world.heroPcb.setAssemblyState({ stage: 'full_bug', busbarProgress: 1.0, ledOn: false });
      fx.aperture = 0.010;
      const u = (t - 80.0) / 7.6;
      cam.pos = lerp3([-0.22, 0.89, -0.16], [-0.29, 0.86, -0.21], u);
      cam.look = [-0.36, 0.758, -0.44];
      cam.fov = 28;
    } else if (t < 95.8) {
      // Cut 4B: Datasheet Horror — "PCB Layout Dimension (BOTTOM VIEW) !!"
      world.heroPcb.setAssemblyState({ stage: 'full_bug', busbarProgress: 1.0, ledOn: false });
      fx.aperture = 0.006;
      const u = (t - 87.6) / 8.2;
      cam.pos = lerp3([-0.16, 0.90, -0.26], [-0.24, 0.86, -0.36], u);
      cam.look = [-0.33, 0.835, -0.74];
      cam.fov = 28;
    } else if (t < 104.2) {
      // Cut 4C: 02:00 AM MICRO-SURGERY PART 1 — OLFA Surgical Blade slicing 0.3mm copper traces under Magnifying Loupe!
      world.loupeGroup.visible = true;
      world.tools.craftKnife.visible = true;
      // Rotate PCB 180° under the loupe so the 4 inner trace-cut zones sit unobstructed in front of the white 5264-3P housings!
      world.heroPcb.root.rotation.set(0, Math.PI, 0);
      world.heroPcb.setAssemblyState({
        stage: t < 97.6 ? 'full_bug' : 'knife_cut',
        busbarProgress: 1.0,
        ledOn: false,
      });

      const cutPortIdx = Math.min(3, Math.floor(((t - 95.8) / 8.4) * 4));
      const traceLocalX = 0.06 - [-0.0175, -0.0060, 0.0060, 0.0175][cutPortIdx] * 1.68 - 0.0025 * 1.68;
      const scrape = Math.sin(t * 22.0) * 0.0012;
      world.tools.craftKnife.position.set(traceLocalX + 0.0050, 0.7442, 0.0422 + scrape);
      world.tools.craftKnife.rotation.set(-0.62, 0.58, 0);

      fx.aperture = 0.015; // Crisp macro probe lens Depth-of-Field!
      const u = (t - 95.8) / 8.4;
      cam.pos = lerp3([-0.02, 0.835, -0.365], [0.13, 0.830, -0.370], u);
      cam.look = [0.06, 0.736, -0.512];
      cam.fov = 23;
    } else {
      // Cut 4D: 02:00 AM MICRO-SURGERY PART 2 — X-Crossed 0.25mm AWG30 Jumpers + 395nm Violet UV Curing Resin Drops!
      world.loupeGroup.visible = true;
      world.heroPcb.root.rotation.set(0, Math.PI, 0);
      const uvOn = t >= 106.8;
      if (uvOn) lights.setPreset('room_night_uv_cure');
      world.heroPcb.setAssemblyState({
        stage: uvOn ? 'uv_cured' : 'x_jumper',
        busbarProgress: 1.0,
        ledOn: false,
        uvGlow: uvOn ? 1.15 : 0.0,
      });

      if (uvOn) {
        world.tools.uvTorch.visible = true;
        const sweepX = 0.06 + Math.sin((t - 106.8) * 2.2) * 0.028;
        world.tools.uvTorch.position.set(sweepX, 0.768, 0.035);
        world.tools.uvSpotLight.intensity = 0.45;
      }

      fx.aperture = 0.015;
      fx.bloomStrength = uvOn ? 0.25 : 0.20;
      const u = (t - 104.2) / 7.8;
      cam.pos = lerp3([0.13, 0.832, -0.368], [-0.02, 0.836, -0.362], u);
      cam.look = [0.06, 0.736, -0.512];
      cam.fov = 23;
    }
  }

  // ===========================================================================
  // SCENE 5 (112 – 150s): 臍の緒の完全切断！ 3S LiPo自律駆動 ＆ 200Hz『鷹の姿勢反射』クライマックス！！
  // ===========================================================================
  else {
    lights.setPreset('room_hawk_climax');
    dramaBars = t >= 140.0;
    screens.setLaptopMode('wifi_udp_hawk');
    world.multimeter.visible = false;
    world.hawkSystem.root.visible = true;

    // Choreograph Birch Plywood Balance Board Tilt:
    // 112..116s: Flat boot-up ("ピポッ！")
    // 116..124s: +8.0° Left Roll ("右端を持ち上げて左へ8度傾ける") -> Right knee folds deep, Left extends, Pelvis 0.0°!
    // 124..131s: -8.0° Right Roll -> +10.0° Forward Pitch ("手前側を持ち上げて前後へ10度傾ける")!
    // 131..143s: Dynamic 3D Circular Swashplate Swirl ("斜め方向へぐるりと揺らす" — Hawk's Head Stabilization!)
    // 143..150s: Return to serene horizontal rest as first summer cicada cries outside!
    let bRoll = 0;
    let bPitch = 0;
    const deg = Math.PI / 180;

    if (t >= 116.0 && t < 124.0) {
      const env = smooth((t - 116.0) / 1.6) * (1 - smooth((t - 122.4) / 1.4));
      bRoll = 8.5 * deg * env;
    } else if (t >= 124.0 && t < 131.5) {
      const uP = (t - 124.0) / 7.5;
      bRoll = -7.5 * deg * Math.sin(uP * Math.PI);
      bPitch = 10.0 * deg * smooth((t - 125.5) / 1.5) * (1 - smooth((t - 130.0) / 1.3));
    } else if (t >= 131.5 && t < 143.5) {
      const env = smooth((t - 131.5) / 1.2) * (1 - smooth((t - 141.8) / 1.5));
      const ang = (t - 131.5) * 2.3;
      bRoll = Math.cos(ang) * 8.5 * deg * env;
      bPitch = Math.sin(ang) * 9.0 * deg * env;
    }

    world.hawkSystem.updateHawkReflex({
      boardRoll: bRoll,
      boardPitch: bPitch,
      showHands: t >= 115.5 && t < 144.0,
    });

    if (t < 118.5) {
      // Cut 5A: Hero Reveal of 100% UNTETHERED `1,222g` Unit (Repaired Emerald `HMD-CORE-v1` + Blue `3S LiPo` atop Pelvis!)
      const u = (t - 112.0) / 6.5;
      fx.aperture = 0.012;
      cam.pos = lerp3([0.32, 1.02, -0.18], [-0.06, 1.00, -0.16], u);
      cam.look = [0.10, 0.96, -0.51];
      cam.fov = 30;
    } else if (t < 131.5) {
      // Cut 5B: ICONIC FRONT EYE-LEVEL SHOT — Board tilts ±8.5° & +10°, legs pump like a sailor's knees, Pelvis & Emerald PCB stay PINNED DEAD-LEVEL!
      const u = (t - 118.5) / 13.0;
      fx.aperture = 0.010;
      cam.pos = lerp3([0.04, 0.90, 0.14], [0.18, 0.91, 0.12], u);
      cam.look = [0.10, 0.88, -0.51];
      cam.fov = 35;
    } else if (t < 141.5) {
      // Cut 5C: Dramatic 3/4 Wide Shot framing BOTH the 3D Swirling Hawk-Reflex Robot AND Wireless Wi-Fi UDP Flat-Line Telemetry!
      const u = (t - 131.5) / 10.0;
      fx.aperture = 0.008;
      cam.pos = lerp3([0.38, 0.98, 0.18], [-0.14, 0.96, 0.20], u);
      cam.look = [-0.04, 0.87, -0.56];
      cam.fov = 37;
    } else {
      // Cut 5D: Poetic Early-Summer Night Pullback — Glowing Emerald Heart on the Quiet Desk & Open July Window with Cicada Cry!
      const u = (t - 141.5) / 8.5;
      fx.aperture = 0.010;
      cam.pos = lerp3([0.28, 0.98, 0.10], [0.58, 1.18, 0.55], u);
      cam.look = lerp3([0.10, 0.92, -0.51], [0.02, 1.02, -0.85], u);
      cam.fov = 36;
    }
  }

  return {
    cam,
    fx,
    dramaBars,
    fin: t >= CH05_DURATION - 0.12,
  };
}
