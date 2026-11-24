import * as THREE from 'three';
import { MOUNTAIN_PEAKS } from './world.js';

export const FILM_DURATION = 300.0;

export const CHAPTERS = [
  { id: 1, start: 0, end: 24, jp: '遠山連続TNT爆破' },
  { id: 2, start: 24, end: 46, jp: '巨重機TT出現・大地粉砕' },
  { id: 3, start: 46, end: 66, jp: '創造主リウ・大森林増殖' },
  { id: 4, start: 66, end: 86, jp: 'リリス1世総出・ジョセフ阻止戦' },
  { id: 5, start: 86, end: 112, jp: 'TT領域展開「綻び」' },
  { id: 6, start: 112, end: 134, jp: '四条気楽＆狼警戒→モモンガ隕石' },
  { id: 7, start: 134, end: 154, jp: '隕石襲来→りう「あ、やっぱやめた」' },
  { id: 8, start: 154, end: 180, jp: '激怒ジョセフ・おらおらおら！！' },
  { id: 9, start: 180, end: 210, jp: '極・領域再展開＆超巨神GIGA-TT' },
  { id: 10, start: 210, end: 240, jp: '究極虚式「気楽滅殺」＆四勢力総力戦' },
  { id: 11, start: 240, end: 272, jp: '超巨大ムーン・メテオ＆りう×ジョセフ共闘' },
  { id: 12, start: 272, end: 300, jp: '翠玉×黄金・超天地おらおらフィナーレ' },
];

const SUBTITLES = [
  { start: 1.5, end: 6.2, speaker: 'ナレーション', text: '静かな山岳と町を見下ろす渓谷――すべての異変は、遠くの山々から始まった。' },
  { start: 6.8, end: 11.6, speaker: '警報', text: '遠方の五連峰に設置された無数のTNT爆弾が一斉に点火……！' },
  { start: 12.2, end: 22.8, speaker: 'ナレーション', text: '遠くの山から山へ――TNT爆弾が連鎖炸裂し、雄大な山脈が次々と崩壊していく！', shout: true },
  { start: 25.0, end: 30.2, speaker: 'ナレーション', text: '爆煙を裂いて現れた巨重機「TT」――暴走トラクターが大地をさらに引き裂く！' },
  { start: 32.0, end: 44.5, speaker: '巨重機 TT', text: '「ガガガガガガ！！ 進路上の大地ごと粉砕する！！」', shout: true },
  { start: 47.0, end: 52.0, speaker: '創造主リウ', text: '「やれやれ、ひどく荒らしてくれたものだ。ならば――」' },
  { start: 52.4, end: 62.5, speaker: '創造主リウ', text: '「森と森林を、今ここで一気に増殖させよう！！」', shout: true },
  { start: 66.8, end: 71.8, speaker: 'ジョセフ・ジョースター', text: '「なんだこの急に生えてきたジャングルは！？ だが止まるわけにはいかねぇ！」' },
  { start: 72.5, end: 78.2, speaker: 'リリス1世', text: '「全軍総出で包囲せよ！ ジョセフ・ジョースターを絶対にここで止めるのです！」', shout: true },
  { start: 78.8, end: 85.4, speaker: 'ジョセフ・ジョースター', text: '「リリス1世の王立軍団が総出だと！？ 波紋で突破してやるぜ！」' },
  { start: 87.2, end: 93.8, speaker: 'ナレーション', text: 'その瞬間――先ほどのトラクター「TT」が、あり得ない印を結び始めた……！' },
  { start: 94.5, end: 103.5, speaker: 'トラクター TT', text: '「天地創造術式解放――領域展開『綻び』！！」', shout: true },
  { start: 104.2, end: 111.5, speaker: 'リリス1世', text: '「なっ……空も大地も裂けていく！？ トラクターが領域展開だと！？」' },
  { start: 112.5, end: 119.5, speaker: '四条気楽', text: '「ふむ……凄まじい呪力をかぎつけたぞ。この領域ごと、まるごと滅ぼそう。」' },
  { start: 120.5, end: 126.8, speaker: 'オオカミ「まーきリングス」', text: '「アオオオオオン！！（大規模襲来を感知！ 空中旗艦へ緊急警戒信号発信！）」', shout: true },
  { start: 127.6, end: 133.8, speaker: '船長モモンガKF23', text: '「まーきリングスより大規模襲来を確認！ 迷うな――今すぐ隕石を降らせろ！！」', shout: true },
  { start: 134.8, end: 142.4, speaker: 'ナレーション', text: '成層圏を焼き焦がし、無数の巨大隕石が町へと降り注ぐ――万事休すか！？' },
  { start: 143.2, end: 147.0, speaker: '創造主りう', text: '「……あ、やっぱやめた。」' },
  { start: 147.4, end: 153.4, speaker: 'ナレーション', text: '創造主りうの気まぐれな指パッチン一撃で、全ての隕石がキラキラの紙吹雪へ完全粉砕！' },
  { start: 154.5, end: 159.4, speaker: 'ジョセフ・ジョースター', text: '「てめぇ……ここまで盛大に盛り上げといて『やっぱやめた』だとォ！？ 許さねぇ！！」', shout: true },
  { start: 160.0, end: 175.4, speaker: 'ジョセフ・ジョースター', text: '「おらおらおらおらおらおらおらおら！！！！！！！！」', shout: true },
  { start: 175.6, end: 177.0, speaker: 'ナレーション', text: 'こうして、怒涛の三分間は幕を閉じたかに見えたが――' },
  // --- PHASE 2: +2 MINUTES EPIC EXPANSION (3:00 - 5:00) ---
  { start: 179.5, end: 184.2, speaker: '創造主りう', text: '「……ほぉ、本気を出してきたか。終わらせるにはまだ早い――第二幕だ！」' },
  { start: 185.0, end: 194.5, speaker: '超巨神重機 GIGA-TT', text: '「極・領域再展開『極・綻び』！！ 砕け散った領域を喰らい、超巨神形態へ覚醒する！！」', shout: true },
  { start: 196.0, end: 208.0, speaker: 'ナレーション', text: '紅蓮の翼と光輪を広げた『GIGA-TT』が天へ浮上し、天地を貫く四本の裂け目が噴き上がる！' },
  { start: 211.2, end: 221.5, speaker: '四条気楽', text: '「面白くなってきたな……蒼と赫を合わせ、究極虚式『気楽滅殺』で消し飛ばそう！」', shout: true },
  { start: 222.5, end: 230.8, speaker: 'オオカミ「まーきリングス」', text: '「アオオオン！！（五連光輪・完全解放！ 全戦域のロックオン座標を旗艦へ送信！）」', shout: true },
  { start: 231.5, end: 239.4, speaker: 'リリス1世', text: '「王立全軍、天空突撃！！ この混沌を制するのは我が王家です！！」', shout: true },
  { start: 240.6, end: 248.2, speaker: '船長モモンガKF23', text: '「収拾がつかん！ 全エネルギー解放――最終兵器『超巨大ムーン・メテオ』投下ァァァ！！」', shout: true },
  { start: 249.0, end: 256.8, speaker: 'ナレーション', text: '空を覆い尽くす惑星級の超巨大ボクセル隕石が降下――町も渓谷も消滅まで残り数秒！' },
  { start: 257.4, end: 263.8, speaker: '創造主りう', text: '「ジョセフ君、さっきはふざけてごめん。今度は本気だ――創造の翠玉を君の拳に託す！」' },
  { start: 264.4, end: 271.5, speaker: 'ジョセフ・ジョースター', text: '「へっ、最初からそう言えってんだ！ 翠玉と波紋の合わせ技――いくぜェェェ！！」', shout: true },
  { start: 272.6, end: 285.2, speaker: 'ジョセフ・ジョースター', text: '「超・天地おらおらおらおらおらおらおらおら！！！！！！！！」', shout: true },
  { start: 286.0, end: 292.5, speaker: 'ナレーション', text: '翠玉と黄金の拳が超巨大隕石を貫き、900の星々となって夜明けの空へ天の川を描く――！' },
  { start: 293.0, end: 297.6, speaker: '創造主りう', text: '「……うん、最高の五分間だったね。さあ、新しい朝だ。」' },
];

const CUTINS = [
  { start: 0.8, end: 4.2, kicker: 'VOXEL CINEMA · 05:00 FULL PRODUCTION', main: '天地綻びのクロニクル', sub: 'CHRONICLE OF THE UNRAVELING', style: '' },
  { start: 26.2, end: 29.0, kicker: 'HEAVY DESTRUCTION UNIT', main: '巨重機「TT」出現', sub: 'TURBO TRACTOR AWAKENED', style: '' },
  { start: 73.2, end: 76.0, kicker: 'ROYAL INTERCEPTION FORCE', main: 'リリス1世・全軍総出', sub: 'STOP JOSEPH JOESTAR', style: 'style-domain' },
  { start: 95.8, end: 100.2, kicker: '天地創造術式解放', main: '領域展開「綻び」', sub: 'DOMAIN EXPANSION · HOKOROBI', style: 'style-domain' },
  { start: 127.4, end: 129.6, kicker: 'ORBITAL METEOR STRIKE', main: '船長モモンガKF23 発令', sub: 'CONFIRMED BY WOLF MAAKI RINGS', style: '' },
  { start: 143.3, end: 146.6, kicker: 'CREATOR RIU', main: '「あ、やっぱやめた。」', sub: 'WAIT... NAH, NEVER MIND.', style: 'style-casual' },
  { start: 160.2, end: 164.2, kicker: 'JOSEPH JOESTAR · OVERDRIVE', main: 'おらおらおらおらおら！！！！！！！！', sub: 'ORA ORA ORA ORA ORA!!!!!!!!', style: 'style-ora' },
  // Phase 2 Cut-ins
  { start: 185.2, end: 189.2, kicker: 'PHASE II · AWAKENED FORM', main: '超巨神重機「GIGA-TT」', sub: 'DOMAIN RE-EXPANSION · EXTREME HOKOROBI', style: 'style-domain' },
  { start: 213.4, end: 216.6, kicker: 'SHIJO KIRAKU · ULTIMATE', main: '究極虚式「気楽滅殺」', sub: 'HOLLOW SINGULARITY ANNIHILATION', style: 'style-ora' },
  { start: 243.5, end: 246.8, kicker: 'CAPTAIN MOMONGA KF23 · FINAL WEAPON', main: '超巨大ムーン・メテオ', sub: 'ORBITAL PLANETOID DROP', style: 'style-domain' },
  { start: 273.0, end: 277.2, kicker: 'EMERALD × GOLDEN OVERDRIVE', main: '超・天地おらおらおら！！！！！！！！', sub: 'COSMIC CREATION ORA FINALE', style: 'style-casual' },
];

function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
function lerp(a, b, t) { return a + (b - a) * clamp01(t); }
function smoothstep(a, b, x) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}
function lerpVec(out, a, b, t) {
  const k = clamp01(t);
  out.set(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k);
  return out;
}

export function getChapterForTime(t) {
  for (let i = CHAPTERS.length - 1; i >= 0; i--) {
    if (t >= CHAPTERS[i].start) return CHAPTERS[i];
  }
  return CHAPTERS[0];
}
export function getSubtitleForTime(t) {
  for (const s of SUBTITLES) if (t >= s.start && t <= s.end) return s;
  return null;
}
export function getCutinForTime(t) {
  for (const c of CUTINS) if (t >= c.start && t <= c.end) return c;
  return null;
}

/**
 * Deterministic 300-Second (5-Minute, 12-Act) Cinema Director!
 */
export function evaluateDirector(t, actors, env) {
  const state = {
    ttPos: new THREE.Vector3(0, 0, -112),
    ttTrenchZ: -120,
    josephPos: new THREE.Vector3(0, 0, 12),
    wolfPos: new THREE.Vector3(-34, 14, 14),
    domainIntensity: 0,
    camPos: new THREE.Vector3(0, 20, 75),
    camTarget: new THREE.Vector3(0, 8, -40),
    camFov: 48,
    shake: 0,
    chromatic: 0,
    speedLines: 0,
    flash: 0,
    invert: 0,
    warmth: 0.14,
    bloomStrength: 0.28,
    dramaBars: false,
    heroFollowPos: new THREE.Vector3(0, 4, 0),
    focusX: 0,
    focusZ: 0,
    tbcFakeout: t >= 177.2 && t < 179.4,
    finalEnd: t >= 297.2,
  };

  // --- 1. CHARACTER BLOCKING ACROSS ALL 12 ACTS (0s .. 300s) ---

  // A. Giant Mecha Tractor TT -> God-Mecha GIGA-TT
  const ttVisible = t >= 24.4;
  actors.tt.root.visible = ttVisible;
  if (ttVisible) {
    let ttZ = -110, ttY = 0, ttSpeed = 0, mudra = 0, roar = 0, giga = 0;

    if (t < 26.8) {
      const p = smoothstep(24.4, 26.8, t);
      ttZ = lerp(-114, -96, p);
      ttY = Math.sin(((t - 24.4) / 2.0) * Math.PI) * 3.8;
      ttSpeed = 16; roar = 1.0;
    } else if (t < 46.0) {
      ttZ = lerp(-96, -16, clamp01((t - 26.8) / 19.2));
      ttSpeed = 24; roar = 0.7;
    } else if (t < 184.0) {
      ttZ = -16;
      mudra = smoothstep(87.0, 95.2, t) * (1 - smoothstep(147.2, 152.0, t));
      roar = t >= 93.0 && t <= 104.0 ? 1.0 : 0.15;
    } else if (t < 285.5) {
      // ACT 9-12: GIGA-TT AWAKENS & LEVITATES OVER THE VALLEY/BRIDGE!
      const rise = smoothstep(184.0, 193.0, t);
      giga = smoothstep(184.5, 190.5, t);
      ttZ = lerp(-16, 12, rise);
      ttY = lerp(0, 12.5, rise) + Math.sin(t * 2.2) * 1.1;
      roar = 1.0;
    } else {
      // Sunrise Finale: TT lands gently and parks peacefully near the town bridge
      const land = smoothstep(285.5, 290.5, t);
      giga = 1 - land;
      ttZ = lerp(12, 6, land);
      ttY = lerp(12.5, 0, land);
    }

    actors.tt.root.position.set(0, ttY, ttZ);
    actors.tt.root.rotation.set(t < 26.2 ? -0.18 : 0, 0, 0);
    actors.tt.animate(t, { speed: ttSpeed, mudra, roar, giga });
    state.ttPos.set(0, ttY, ttZ);
    state.ttTrenchZ = t >= 46.0 ? -16 : ttZ;
  }

  // B. Creator Riu (創造主リウ / りう)
  const riuVisible = t >= 46.0;
  actors.riu.root.visible = riuVisible;
  if (riuVisible) {
    let rx = 0, ry = 4, rz = -28, rotY = 0, rotX = 0, mode = 'float';

    if (t < 52.2) {
      ry = lerp(38, 1.5, smoothstep(46.0, 52.0, t));
      rz = -28;
    } else if (t < 66.0) {
      ry = t < 54.0 ? lerp(1.5, 0.2, smoothstep(52.2, 53.1, t)) : 1.8 + Math.sin(t * 2) * 0.5;
      rz = -28;
      mode = t < 59.0 ? 'cast' : 'float';
    } else if (t < 139.0) {
      rx = -14; ry = 14 + Math.sin(t * 1.5) * 0.8; rz = 6; rotY = 0.4;
    } else if (t < 143.0) {
      const p = smoothstep(139.0, 142.8, t);
      rx = lerp(-14, 0, p); ry = lerp(14, 11.2, p); rz = lerp(6, 48.2, p);
    } else if (t < 147.0) {
      ry = 11.2 + Math.sin(t * 2.5) * 0.25; rz = 48.2; mode = 'shrug';
    } else if (t < 160.2) {
      ry = lerp(11.2, 3.6, smoothstep(149.0, 154.0, t)); rz = 48.2;
      mode = t < 150.5 ? 'snap' : 'shrug';
    } else if (t < 179.4) {
      const p = clamp01((t - 160.2) / 15.0);
      rx = Math.sin(t * 18) * 1.8; ry = 3.6 + p * 26; rz = 48.2 - p * 44;
      rotY = t * 9; rotX = p * 8; mode = 'shrug';
    } else if (t < 256.0) {
      // ACT 9-11A: Riu recovers gracefully mid-air & watches the 4-faction clash!
      const p = smoothstep(179.4, 183.0, t);
      rx = lerp(0, -10, smoothstep(190, 200, t));
      ry = lerp(24, 18, p) + Math.sin(t * 2.2) * 0.6;
      rz = lerp(24, 38, smoothstep(190, 210, t));
      rotY = 0.2; mode = 'float';
    } else if (t < 286.0) {
      // ACT 11B-12A: Descends right beside Joseph on the town plaza & infuses Emerald Genesis!
      const p = smoothstep(256.0, 258.5, t);
      rx = lerp(-10, -2.8, p);
      ry = lerp(18, 0.2, p);
      rz = lerp(38, 58.0, p);
      rotY = Math.PI * 0.72;
      mode = t >= 260.0 ? 'empower' : 'float';
    } else {
      // Sunrise Reunion Finale!
      rx = -3.2; ry = 0.2; rz = 59.0; rotY = 0.35; mode = 'float';
    }

    actors.riu.root.position.set(rx, ry, rz);
    actors.riu.root.rotation.set(rotX, rotY, 0);
    actors.riu.animate(t, mode);
  }

  // C. Joseph Joestar (ジョセフ・ジョースター)
  const josephVisible = t >= 66.0;
  actors.joseph.root.visible = josephVisible;
  if (josephVisible) {
    let jx = 0, jy = 0, jz = 12, jRotY = Math.PI, jRotX = 0, jMode = 'run';

    if (t < 74.5) {
      jz = lerp(16, 2.0, clamp01((t - 66.0) / 8.5));
      jMode = 'run';
    } else if (t < 87.5) {
      jx = Math.sin(t * 2.4) * 1.4; jz = 2.0 + Math.cos(t * 2.1) * 1.1;
      jRotY = Math.PI + Math.sin(t * 3.5) * 0.9; jMode = 'battle';
    } else if (t < 134.0) {
      jx = -3.5; jz = 3.0; jRotY = Math.PI - 0.15; jMode = 'battle';
    } else if (t < 154.0) {
      jz = 60.5; jMode = 'battle';
    } else if (t < 159.8) {
      jz = 60.5; jMode = 'rage';
    } else if (t < 176.2) {
      jx = Math.sin(t * 32) * 0.16;
      jz = lerp(60.5, 58.2, smoothstep(159.8, 162.5, t));
      jMode = 'ora';
    } else if (t < 179.4) {
      jz = 59.5; jRotY = 0.28; jMode = 'pose';
    } else if (t < 257.0) {
      // Bracing on the town plaza watching GIGA-TT & Moon-Meteor!
      jx = 2.2; jz = 58.5; jRotY = Math.PI; jMode = 'battle';
    } else if (t < 271.8) {
      // Being supercharged by Creator Riu's Emerald Genesis!
      jx = 2.2; jz = 58.5; jRotY = Math.PI - 0.15; jMode = 'empowered';
    } else if (t < 285.8) {
      // ACT 12 CLIMAX: ROCKETS SKYWARD ON EMERALD PILLAR & UNLEASHES COSMIC ORA-ORA INTO MOON-METEOR!
      const rise = smoothstep(271.8, 276.5, t);
      jx = Math.sin(t * 28) * 0.22;
      jy = lerp(0, 24.5, rise);
      jz = lerp(58.5, 43.0, rise);
      jRotY = Math.PI;
      jRotX = -0.52; // Tilted heroically upward punching straight into the descending Moon-Meteor!
      jMode = 'cosmicOra';
    } else {
      // Sunrise Finale: Lands gracefully beside Riu on the open sunlit cobblestone plaza!
      const land = smoothstep(285.8, 290.5, t);
      jx = lerp(0, 2.6, land);
      jy = lerp(24.5, 0, land);
      jz = lerp(43.0, 59.5, land);
      jRotY = -0.22; jRotX = 0; jMode = 'pose';
    }

    actors.joseph.root.position.set(jx, jy, jz);
    actors.joseph.root.rotation.set(jRotX, jRotY, 0);
    actors.joseph.animate(t, jMode);
    state.josephPos.set(jx, jy, jz);
  }

  // D. Queen Lilith I + 4-Draw-Call Instanced Royal Legion
  const lilithVisible = (t >= 71.5 && t < 176.0) || t >= 229.0;
  actors.lilith.root.visible = lilithVisible;
  if (lilithVisible) {
    let lx = 0, ly = 16, lz = -4, lMode = 'command';
    if (t < 76.0) {
      const p = smoothstep(71.5, 76.0, t);
      ly = lerp(22, 6.2, p); lz = lerp(-12, -5.0, p);
    } else if (t < 87.0) {
      lx = Math.cos(t * 2.2) * 4.6; ly = 2.6 + Math.sin(t * 4) * 1.2; lz = -4.2 + Math.sin(t * 2.2) * 2.5; lMode = 'charge';
    } else if (t < 176.0) {
      lx = 8.5; ly = 5.5 + Math.sin(t * 2.2) * 0.9; lz = -2.5; lMode = 'idle';
    } else if (t < 285.5) {
      // ACT 10-11: Airborne Royal Sky-Charge over the town gate!
      lx = Math.sin(t * 1.4) * 8.0;
      ly = 11.5 + Math.cos(t * 2.6) * 1.6;
      lz = 26.0;
      lMode = t < 245 ? 'charge' : 'command';
    } else {
      // Sunrise Reunion Salute!
      lx = 9.5; ly = 2.2 + Math.sin(t * 2) * 0.35; lz = 51.0; lMode = 'command';
    }
    actors.lilith.root.position.set(lx, ly, lz);
    actors.lilith.root.lookAt(t >= 285.5 ? 0 : 0, t >= 285.5 ? 2.5 : 10, t >= 285.5 ? 59 : (t < 87 ? state.josephPos.z : 12));
    actors.lilith.animate(t, lMode);
  }

  const legionVisible = (t >= 72.8 && t < 136.0) || (t >= 229.5 && t < 265.0);
  const legionAirborne = t >= 229.5 ? 5.5 : 0;
  const legionCenter = t >= 229.5 ? new THREE.Vector3(0, 0, 26.0) : new THREE.Vector3(0, 0, 2.0);
  const legionRadius = t < 77.5 ? lerp(2.2, 1.0, smoothstep(72.8, 77.5, t)) : t >= 229.5 ? 1.35 : (t > 98 ? 1.55 : 1.0);
  actors.legion.update(t, legionVisible, legionCenter, legionRadius, (t >= 76.5 && t <= 88.0) || (t >= 230.0 && t <= 245.0), legionAirborne);

  // E. Shijo Kiraku (四条気楽)
  const kirakuVisible = (t >= 111.5 && t < 150.0) || t >= 209.5;
  actors.kiraku.root.visible = kirakuVisible;
  if (kirakuVisible) {
    let kx = 12, ky = 26.5, kz = -6, charge = 0, hollowPhase = 0;
    if (t < 150.0) {
      ky = lerp(56, 26.5, smoothstep(111.5, 116.5, t)) + Math.sin(t * 2.2) * 0.55;
      charge = smoothstep(114.2, 121.0, t) * (1 - smoothstep(147.2, 149.5, t));
      actors.kiraku.root.position.set(kx, ky, kz);
      actors.kiraku.root.lookAt(0, 8, -16);
    } else if (t < 285.5) {
      // ACT 10-11: Descends over the town archway & fires Ultimate Hollow Violet Beam at GIGA-TT!
      kx = 18; ky = 25.0 + Math.sin(t * 2.0) * 0.7; kz = 18;
      hollowPhase = smoothstep(211.5, 221.0, t) * (1 - smoothstep(229.5, 232.0, t));
      charge = t >= 245 && t < 285 ? 0.5 : 0;
      actors.kiraku.root.position.set(kx, ky, kz);
      actors.kiraku.root.lookAt(0, 12.5, 12);
    } else {
      // Sunrise Finale: Perched coolly atop the Clocktower balcony watching the sunrise!
      kx = 0; ky = 22.8; kz = 72.5;
      actors.kiraku.root.position.set(kx, ky, kz);
      actors.kiraku.root.lookAt(0, 4, 58);
    }
    actors.kiraku.animate(t, charge, hollowPhase);
  }

  // F. Wolf "Maaki Rings" (オオカミ「まーきリングス」)
  const wolfVisible = t >= 119.5;
  actors.wolf.root.visible = wolfVisible;
  if (wolfVisible) {
    let wx = -34, wy = 14.0, wz = 14, wRotY = 0.85, howl = 0, overdrive = 0;
    if (t < 222.0) {
      howl = smoothstep(121.2, 122.4, t) * (1 - smoothstep(126.5, 128.5, t));
    } else if (t < 242.0) {
      // ACT 10: 5-Ring Aerial Overdrive Flight leaping across the fractured valley!
      const p = smoothstep(222.0, 235.0, t);
      wx = lerp(-34, -14, p);
      wy = 14.0 + Math.sin(p * Math.PI) * 12.0 + 4.0 * p;
      wz = lerp(14, 24, p);
      wRotY = 1.1;
      howl = smoothstep(224.0, 226.0, t) * (1 - smoothstep(230.0, 233.0, t));
      overdrive = 1.0;
    } else {
      // Returns to watchtower cliff & howls joyfully at sunrise!
      howl = t >= 291.0 ? 0.85 : 0;
      overdrive = t < 285.5 ? 0.6 : 0;
    }
    actors.wolf.root.position.set(wx, wy, wz);
    actors.wolf.root.rotation.y = wRotY;
    actors.wolf.animate(t, howl, overdrive);
    state.wolfPos.set(wx, wy, wz);
  }

  // G. Captain Momonga KF23 + Sky-Corsair Flagship
  const shipVisible = t >= 124.5;
  actors.momongaShip.root.visible = shipVisible;
  if (shipVisible) {
    let sx = 28, sy = 64, sz = 26, rotY = 0.65, alert = 0, launch = 0;
    if (t < 240.0) {
      const glide = smoothstep(124.5, 130.0, t);
      sx = lerp(68, 28, glide); sy = 64 + Math.sin(t * 0.8) * 1.0; sz = lerp(42, 26, glide);
      alert = smoothstep(125.5, 127.0, t) * (1 - smoothstep(147.0, 149.0, t));
      launch = smoothstep(130.2, 131.6, t) * (1 - smoothstep(147.2, 149.0, t));
    } else if (t < 286.0) {
      sx = 26; sy = 68 + Math.sin(t * 1.1) * 1.0; sz = 24;
      alert = 1.0;
      launch = smoothstep(242.0, 244.0, t);
    } else {
      // Celebratory low sunrise flyover above the intact voxel town!
      const fly = clamp01((t - 286.0) / 14.0);
      sx = lerp(52, -38, fly);
      sy = 38 + Math.sin(t * 1.2) * 0.8;
      sz = 20;
      rotY = 1.45;
    }
    actors.momongaShip.root.position.set(sx, sy, sz);
    actors.momongaShip.root.rotation.y = rotY;
    actors.momongaShip.root.updateMatrixWorld(true);
    actors.momongaShip.animate(t, { alert, launch });
  }

  // --- 2. ATMOSPHERIC SKY, LIGHTING, DOMAIN EXPANSION & POST-FX MOOD ---
  const domain1 = smoothstep(100.0, 103.2, t) * (1 - smoothstep(147.2, 148.6, t));
  const domain2 = smoothstep(184.0, 187.5, t) * (1 - smoothstep(285.5, 287.5, t));
  const domainIntensity = Math.max(domain1, domain2);
  state.domainIntensity = domainIntensity;

  const emeraldAura =
    Math.max(
      smoothstep(46.5, 53.5, t) * (1 - smoothstep(63.5, 68.5, t)),
      smoothstep(258.5, 264.0, t) * (1 - smoothstep(286.5, 290.0, t))
    );
  const apocalypse =
    Math.max(
      smoothstep(131.5, 137.0, t) * (1 - smoothstep(147.1, 147.6, t)),
      smoothstep(244.0, 251.0, t) * (1 - smoothstep(285.5, 286.8, t))
    );
  const jojoShift =
    Math.max(
      smoothstep(155.2, 160.2, t) * (1 - smoothstep(176.2, 178.0, t)),
      smoothstep(272.0, 275.0, t) * (1 - smoothstep(285.5, 287.0, t))
    );

  const zenith = new THREE.Color(0x1c5199);
  const horizon = new THREE.Color(0xf6bb7c);
  const sunCol = new THREE.Color(0xfff1c4);

  if (t >= 24 && t < 48) {
    const k = smoothstep(22, 28, t) * (1 - smoothstep(44, 49, t));
    zenith.lerp(new THREE.Color(0x3a2d36), k); horizon.lerp(new THREE.Color(0xd96b38), k);
  }
  if (emeraldAura > 0.01) {
    zenith.lerp(new THREE.Color(0x0c4a46), emeraldAura * 0.65); horizon.lerp(new THREE.Color(0x5eead4), emeraldAura * 0.48);
  }
  if (t >= 68 && t < 100) {
    const k = smoothstep(69, 74, t) * (1 - smoothstep(97, 100, t));
    zenith.lerp(new THREE.Color(0x2a1438), k * 0.75); horizon.lerp(new THREE.Color(0xe6495c), k * 0.72);
  }
  if (apocalypse > 0.01) {
    zenith.lerp(new THREE.Color(0x160405), apocalypse * 0.9); horizon.lerp(new THREE.Color(0xe84810), apocalypse * 0.88);
  }
  if (t >= 147.2 && t < 156.0) {
    const k = smoothstep(147.2, 147.8, t) * (1 - smoothstep(154.0, 156.0, t));
    zenith.lerp(new THREE.Color(0x1f8be8), k); horizon.lerp(new THREE.Color(0xbcebff), k);
  }
  if (t >= 285.5) {
    // Breathtaking Golden-Peach Dawn Sunrise Finale!
    const dawn = smoothstep(285.5, 290.0, t);
    zenith.lerp(new THREE.Color(0x1d4e89), dawn);
    horizon.lerp(new THREE.Color(0xffb478), dawn);
  }

  env.skyUniforms.uTime.value = t;
  env.skyUniforms.uZenithColor.value.copy(zenith);
  env.skyUniforms.uHorizonColor.value.copy(horizon);
  env.skyUniforms.uSunColor.value.copy(sunCol);
  env.skyUniforms.uDomainIntensity.value = domainIntensity * (1 - apocalypse * 0.45);
  env.skyUniforms.uEmeraldAura.value = emeraldAura;
  env.skyUniforms.uJojoShift.value = jojoShift;

  env.fog.color.copy(horizon).lerp(new THREE.Color(0x120612), domainIntensity * 0.75);
  env.fog.density = 0.002 + domainIntensity * 0.0014 + apocalypse * 0.0016;

  env.sunLight.intensity = 2.35 * (1 - domainIntensity * 0.42) + jojoShift * 0.35;
  env.sunLight.color.setHex(apocalypse > 0.3 ? 0xff9b54 : domainIntensity > 0.3 ? 0xff9ab0 : jojoShift > 0.3 ? 0xffdf80 : 0xfff2d6);
  env.hemiLight.intensity = 0.9 - domainIntensity * 0.2 + emeraldAura * 0.25;

  if (t >= 12 && t <= 24) {
    env.actionLight.color.setHex(0xff6b1a); env.actionLight.intensity = 175;
    env.actionLight.position.set(lerp(-90, 90, clamp01((t - 12) / 10)), 34, -110);
  } else if (t >= 46 && t <= 66) {
    env.actionLight.color.setHex(0x34d399); env.actionLight.intensity = 85; env.actionLight.position.set(0, 12, -28);
  } else if (t >= 93 && t <= 122) {
    env.actionLight.color.setHex(t >= 112 ? 0xa855f7 : 0xef233c); env.actionLight.intensity = 105;
    env.actionLight.position.set(t >= 112 ? 12 : 0, t >= 112 ? 28 : 11, t >= 112 ? -6 : -14);
  } else if (t >= 132 && t < 147.2) {
    env.actionLight.color.setHex(0xff5a12); env.actionLight.intensity = 140; env.actionLight.position.set(0, 26, 52);
  } else if (t >= 159.5 && t <= 176.5) {
    env.actionLight.color.setHex(Math.sin(t * 28) > 0 ? 0xfacc15 : 0xc026d3); env.actionLight.intensity = 95;
    env.actionLight.position.set(state.josephPos.x, 4.5, state.josephPos.z - 3.5);
  } else if (t >= 184 && t < 244) {
    env.actionLight.color.setHex(t >= 211 && t < 230 ? 0xc026d3 : 0xef233c); env.actionLight.intensity = 120;
    env.actionLight.position.set(0, 20, 14);
  } else if (t >= 244 && t < 286) {
    env.actionLight.color.setHex(t >= 260 ? 0x34d399 : 0xff5a12); env.actionLight.intensity = 135;
    env.actionLight.position.set(0, t >= 272 ? 28 : 42, 40);
  } else {
    env.actionLight.intensity = 25;
  }

  // Impact Shocks (All 12 Acts!)
  for (const pk of MOUNTAIN_PEAKS) {
    const dt = t - pk.detonateTime;
    if (dt >= 0 && dt < 1.8) {
      const k = Math.exp(-dt * 2.6);
      state.shake = Math.max(state.shake, k * 2.1);
      state.chromatic = Math.max(state.chromatic, k * 1.05);
      if (dt < 0.14) state.flash = Math.max(state.flash, (1 - dt / 0.14) * 0.58);
    }
  }
  for (const shockT of [99.9, 179.4, 184.5, 217.5, 285.5]) {
    const dt = t - shockT;
    if (dt >= 0 && dt < 2.6) {
      const k = Math.exp(-dt * 1.6);
      state.shake = Math.max(state.shake, k * 2.2);
      state.chromatic = Math.max(state.chromatic, k * 1.15);
      if (dt < 0.2) state.invert = Math.max(state.invert, (1 - dt / 0.2) * 0.8);
      if (shockT === 285.5 && dt < 0.45) state.flash = Math.max(state.flash, (1 - dt / 0.45) * 0.85);
    }
  }
  if (t >= 147.2 && t < 148.2) {
    const dt = t - 147.2;
    state.flash = Math.max(state.flash, Math.exp(-dt * 5.0) * 0.72);
    state.chromatic = Math.max(state.chromatic, Math.exp(-dt * 3.0) * 0.75);
  }
  if ((t >= 160.0 && t <= 176.2) || (t >= 273.0 && t <= 285.5)) {
    state.shake = Math.max(state.shake, 0.52 + Math.abs(Math.sin(t * 36)) * 0.42);
    state.chromatic = Math.max(state.chromatic, 0.45 + Math.abs(Math.sin(t * 28)) * 0.35);
    state.speedLines = 0.55;
    const beat = (t * 2.2) % 1.0;
    if (beat < 0.038) state.invert = Math.max(state.invert, 0.72);
  } else if ((t >= 30 && t <= 44) || (t >= 75 && t <= 84) || (t >= 134 && t <= 142.8) || (t >= 216 && t <= 238)) {
    state.speedLines = 0.32;
  }

  state.dramaBars = (t >= 94.0 && t <= 104.0) || (t >= 159.5 && t <= 176.5) || (t >= 184.5 && t <= 194.0) || (t >= 272.5 && t <= 286.0);
  state.bloomStrength = Math.min(0.42, 0.24 + domainIntensity * 0.1 + apocalypse * 0.12 + jojoShift * 0.1 + state.flash * 0.14);

  // --- 3. CHOREOGRAPHED MULTI-ANGLE CAMERA DIRECTOR (0s .. 300s) ---
  const P = state.camPos;
  const T = state.camTarget;

  if (t < 6.5) {
    const p = smoothstep(0, 6.5, t);
    lerpVec(P, [32, 16, 86], [10, 26, 26], p); lerpVec(T, [0, 12, 30], [0, 18, -110], p);
    state.camFov = 48; state.focusZ = 40;
  } else if (t < 11.8) {
    const p = smoothstep(6.5, 11.8, t);
    lerpVec(P, [-56, 28, -54], [-18, 26, -68], p); lerpVec(T, [-45, 22, -118], [0, 24, -112], p);
    state.camFov = 42; state.focusZ = -110;
  } else if (t < 24.0) {
    const p = clamp01((t - 11.8) / 12.2);
    lerpVec(P, [-72, 34, -22], [74, 38, -26], p); lerpVec(T, [-78, 22, -122], [80, 24, -122], p);
    state.camFov = 54; state.focusX = lerp(-90, 90, p); state.focusZ = -118;
  } else if (t < 30.2) {
    const p = smoothstep(24.0, 30.2, t);
    lerpVec(P, [11, 9.5, -76], [-13, 8.8, -66], p); T.set(0, 4.6, state.ttPos.z + 2.5);
    state.camFov = 48; state.focusZ = state.ttPos.z;
  } else if (t < 38.5) {
    const p = clamp01((t - 30.2) / 8.3);
    P.set(Math.sin(p * Math.PI) * 10 + 4, 4.4 + p * 2.0, state.ttPos.z + 18.5);
    T.set(0, 3.6, state.ttPos.z + 2.0);
    state.camFov = 54; state.focusZ = state.ttPos.z;
  } else if (t < 46.0) {
    const p = smoothstep(38.5, 46.0, t);
    const a = lerp(-0.6, 0.85, p);
    P.set(Math.sin(a) * 24, 9.5 - p * 3.0, state.ttPos.z + Math.cos(a) * 22);
    T.set(0, 4.5, state.ttPos.z);
    state.camFov = 48; state.focusZ = state.ttPos.z;
  } else if (t < 53.2) {
    const p = clamp01((t - 46.0) / 7.2);
    const a = lerp(-0.7, 0.7, p);
    const riuY = actors.riu.root.position.y;
    P.set(Math.sin(a) * 13, riuY + 3.2, -28 + Math.cos(a) * 13); T.set(0, riuY + 2.4, -28);
    state.camFov = 44; state.focusZ = -28;
  } else if (t < 66.0) {
    const p = smoothstep(53.2, 66.0, t);
    lerpVec(P, [11, 8.5, -14], [-38, 32, 22], p); lerpVec(T, [0, 3.8, -28], [0, 10, -34], p);
    state.camFov = 54; state.focusZ = -28;
  } else if (t < 72.2) {
    const jPos = state.josephPos;
    P.set(jPos.x + 5.2, 3.6, jPos.z - 8.5); T.set(jPos.x, 2.5, jPos.z);
    state.camFov = 46; state.focusZ = jPos.z;
  } else if (t < 77.5) {
    const p = smoothstep(72.2, 77.5, t);
    lerpVec(P, [-8, 5.5, 8], [12, 11.5, 10], p);
    T.set(actors.lilith.root.position.x, actors.lilith.root.position.y + 2.2, actors.lilith.root.position.z);
    state.camFov = 48; state.focusZ = 0;
  } else if (t < 86.0) {
    const p = (t - 77.5) / 8.5;
    const a = p * Math.PI * 1.45;
    P.set(Math.sin(a) * 16.5, 8.2 + Math.sin(p * Math.PI) * 3.0, 2.0 + Math.cos(a) * 16.5);
    T.set(0, 2.8, 1.5);
    state.camFov = 50; state.focusZ = 2;
  } else if (t < 95.5) {
    const p = smoothstep(86.0, 95.5, t);
    lerpVec(P, [15, 7.5, 4], [7.2, 6.2, -2.5], p); lerpVec(T, [0, 5.2, -16], [0, 5.2, -14], p);
    state.camFov = lerp(46, 38, p); state.focusZ = -16;
  } else if (t < 101.2) {
    const p = smoothstep(95.5, 101.2, t);
    lerpVec(P, [7.2, 6.2, -2.5], [-6.8, 6.4, -2.2], p); T.set(0, 5.0, -14.5);
    state.camFov = lerp(38, 46, p); state.focusZ = -15;
  } else if (t < 112.0) {
    const p = smoothstep(101.2, 112.0, t);
    const a = lerp(-0.22, 0.38, p); const rad = lerp(21, 36, p);
    P.set(Math.sin(a) * rad, lerp(11, 22, p), -14 + Math.cos(a) * rad); T.set(0, 9.5, -16);
    state.camFov = 56; state.focusZ = -15;
  } else if (t < 120.2) {
    const p = smoothstep(112.0, 120.2, t);
    const a = lerp(-0.35, 0.55, p);
    const kp = actors.kiraku.root.position;
    P.set(kp.x - Math.sin(a) * 10.5 - 3.5, kp.y + 1.4, kp.z - Math.cos(a) * 10.5); T.set(kp.x, kp.y + 2.3, kp.z);
    state.camFov = 42; state.focusZ = -6;
  } else if (t < 127.0) {
    const p = smoothstep(120.2, 127.0, t);
    lerpVec(P, [-24.5, 17.6, 20.5], [-26.0, 18.8, 10.2], p); T.set(-34, 16.5, 14);
    state.camFov = 42; state.focusX = -34; state.focusZ = 14;
  } else if (t < 134.2) {
    const shipRoot = actors.momongaShip.root;
    if (t < 131.6) {
      const q = smoothstep(127.0, 131.6, t);
      P.copy(shipRoot.localToWorld(new THREE.Vector3(lerp(-7.2, 4.6, q), lerp(9.4, 8.6, q), lerp(-15.5, -14.2, q))));
      T.copy(shipRoot.localToWorld(new THREE.Vector3(0, 6.4, -4.2)));
      state.camFov = 46;
    } else {
      const q = smoothstep(131.6, 134.2, t);
      P.copy(shipRoot.localToWorld(new THREE.Vector3(lerp(-14, -26, q), lerp(11, 18, q), lerp(-18, -30, q))));
      T.copy(shipRoot.localToWorld(new THREE.Vector3(0, 3.0, -3.0)));
      state.camFov = 54;
    }
    state.focusX = shipRoot.position.x; state.focusZ = shipRoot.position.z;
  } else if (t < 142.8) {
    const p = smoothstep(134.2, 142.8, t);
    lerpVec(P, [-23, 14.5, 75], [18, 12.5, 72], p); lerpVec(T, [0, 16.5, 48], [0, 11.5, 48], p);
    state.camFov = 58; state.focusZ = 52;
  } else if (t < 147.2) {
    const p = smoothstep(142.8, 147.2, t);
    lerpVec(P, [7.2, 13.8, 59.0], [-5.5, 13.8, 58.4], p); T.set(-0.4, 14.2, 48.2);
    state.camFov = 44; state.focusZ = 50;
  } else if (t < 154.0) {
    const p = smoothstep(147.2, 154.0, t);
    lerpVec(P, [-4, 13, 56], [20, 17, 74], p); lerpVec(T, [0, 13, 49], [0, 10, 52], p);
    state.camFov = 52; state.focusZ = 52;
  } else if (t < 159.8) {
    const p = smoothstep(154.0, 159.8, t);
    lerpVec(P, [8.5, 4.8, 52.5], [2.8, 3.4, 54.8], p); T.set(0, 3.1, 60.5);
    state.camFov = lerp(46, 36, p); state.focusZ = 58;
  } else if (t < 176.2) {
    const jp = state.josephPos;
    if (t < 164.5) {
      const p = (t - 159.8) / 4.7;
      P.set(lerp(8.2, 5.2, p), 3.6, jp.z - lerp(4.5, 8.8, p)); T.set(jp.x, 2.9, jp.z - 2.6);
      state.camFov = 52;
    } else if (t < 170.5) {
      const p = (t - 164.5) / 6.0;
      const a = lerp(-0.85, 0.95, p);
      P.set(jp.x + Math.cos(a) * 11.5 * (p < 0.5 ? -1 : 1), 4.8 + Math.sin(p * Math.PI) * 2.4, jp.z - 4.2 + Math.sin(a) * 5.2);
      T.set(jp.x, 3.0, jp.z - 3.0);
      state.camFov = 54;
    } else {
      const p = smoothstep(170.5, 176.2, t);
      P.set(lerp(-7.5, 7.5, p), lerp(3.8, 6.4, p), jp.z - lerp(9.5, 13.5, p)); T.set(jp.x, 3.2, jp.z - 1.5);
      state.camFov = lerp(54, 46, p);
    }
    state.focusZ = 56;
  } else if (t < 179.4) {
    const p = smoothstep(176.2, 179.4, t);
    const jp = state.josephPos;
    lerpVec(P, [4.8, 3.2, jp.z + 6.8], [7.8, 4.4, jp.z + 9.8], p); T.set(jp.x, 2.8, jp.z);
    state.camFov = 42; state.focusZ = 58;

  // ==================== PHASE 2 CAMERA DIRECTION (3:00 - 5:00) ====================
  } else if (t < 184.5) {
    // Shot 9.1: Fake-out Shatter -> Crane up to grinning Creator Riu mid-air!
    const p = smoothstep(179.4, 184.5, t);
    const rp = actors.riu.root.position;
    P.set(rp.x + lerp(-6.5, 6.5, p), rp.y + 1.8, rp.z + 10.5); T.set(rp.x, rp.y + 2.2, rp.z);
    state.camFov = 44; state.focusZ = rp.z;
  } else if (t < 210.0) {
    // Shot 9.2: Awe-inspiring rising orbit around GIGA-TT awakening with crimson-gold wings & 4 fracture pillars!
    const p = smoothstep(184.5, 210.0, t);
    const a = lerp(-0.55, 0.72, p);
    const rad = lerp(22, 34, p);
    const tp = state.ttPos;
    P.set(tp.x + Math.sin(a) * rad, tp.y + lerp(5, 14, p), tp.z + Math.cos(a) * rad);
    T.set(tp.x, tp.y + 5.5, tp.z);
    state.camFov = 54; state.focusZ = tp.z;
  } else if (t < 222.2) {
    // Shot 10.1: Dramatic heroic angle on Shijo Kiraku fusing Azure+Crimson orbs into Hollow Violet Beam!
    const p = smoothstep(210.0, 222.2, t);
    const kp = actors.kiraku.root.position;
    P.set(kp.x + lerp(8.5, -10.0, p), kp.y + 2.4, kp.z + lerp(10.5, 14.0, p));
    T.set(lerp(kp.x, 8, p), lerp(kp.y + 1.8, 19, p), lerp(kp.z, 15, p));
    state.camFov = 48; state.focusZ = 15;
  } else if (t < 231.0) {
    // Shot 10.2: Dynamic tracking flight alongside Wolf "Maaki Rings" soaring off the cliff with 5 rings!
    const wp = state.wolfPos;
    const p = smoothstep(222.2, 231.0, t);
    P.set(wp.x + lerp(10.5, 13.5, p), wp.y + 3.2, wp.z + lerp(8.5, -6.0, p));
    T.set(wp.x, wp.y + 1.8, wp.z);
    state.camFov = 46; state.focusX = wp.x; state.focusZ = wp.z;
  } else if (t < 240.0) {
    // Shot 10.3: Wide aerial melee panorama showing Queen Lilith I & 22 airborne knights charging GIGA-TT!
    const p = smoothstep(231.0, 240.0, t);
    lerpVec(P, [-26, 20, 44], [28, 22, 42], p); lerpVec(T, [0, 12, 18], [0, 14, 16], p);
    state.camFov = 56; state.focusZ = 20;
  } else if (t < 248.2) {
    // Shot 11.1: Captain Momonga KF23 bridge close-up -> pullback as Final Weapon Moon-Meteor drops!
    const shipRoot = actors.momongaShip.root;
    if (t < 244.5) {
      const q = smoothstep(240.0, 244.5, t);
      P.copy(shipRoot.localToWorld(new THREE.Vector3(lerp(6.5, -5.5, q), 8.8, lerp(-14.5, -15.5, q))));
      T.copy(shipRoot.localToWorld(new THREE.Vector3(0, 6.4, -4.2)));
      state.camFov = 46;
    } else {
      const q = smoothstep(244.5, 248.2, t);
      lerpVec(P, [18, 66, 62], [-22, 54, 88], q); lerpVec(T, [0, 118, 34], [0, 82, 34], q);
      state.camFov = 58;
    }
    state.focusZ = 34;
  } else if (t < 257.2) {
    // Shot 11.2: Unobstructed Town Square vista (in front of Clocktower!) looking up at the colossal planetoid Moon-Meteor!
    const p = smoothstep(248.2, 257.2, t);
    lerpVec(P, [-20, 8.5, 65], [20, 10.5, 65], p); lerpVec(T, [0, 74, 34], [0, 52, 34], p);
    state.camFov = 62; state.focusZ = 42;
  } else if (t < 272.0) {
    // Shot 11.3: Emotional & epic team-up orbit around Creator Riu & Joseph Joestar powering up Emerald-Gold Hamon!
    const p = smoothstep(257.2, 272.0, t);
    const a = lerp(-0.55, 0.62, p);
    P.set(Math.sin(a) * 12.5, lerp(4.2, 7.8, p), 58.2 + Math.cos(a) * 11.5);
    T.set(0, lerp(3.0, 5.2, p), 57.5);
    state.camFov = 46; state.focusZ = 56;
  } else if (t < 285.6) {
    // Shot 12.1: COSMIC EMERALD-GOLD ORA-ORA OVERDRIVE! Following Joseph rocketing up into the colossal Moon-Meteor!
    const jp = state.josephPos;
    const p = smoothstep(272.0, 285.6, t);
    const a = lerp(-0.9, 1.15, p);
    P.set(jp.x + Math.sin(a) * 18.0, jp.y + lerp(2.0, 8.5, p), jp.z + Math.cos(a) * 17.5);
    T.set(0, lerp(jp.y + 8.0, 38.0, p * 0.75), lerp(jp.z - 2.0, 35.0, p));
    state.camFov = 58; state.focusZ = 40;
  } else if (t < 291.0) {
    // Shot 12.2: Colossal Moon-Meteor Shatter into 900-Star Milky-Way Aurora across the breaking Dawn Sky!
    const p = smoothstep(285.6, 291.0, t);
    lerpVec(P, [-28, 22, 82], [22, 26, 86], p); lerpVec(T, [0, 42, 34], [0, 28, 34], p);
    state.camFov = 60; state.focusZ = 48;
  } else {
    // Shot 12.3: Grand Golden-Sunrise Reunion Crane Shot over the intact sunlit Voxel Town & entire cast!
    const p = smoothstep(291.0, 300.0, t);
    lerpVec(P, [14, 5.2, 72], [-28, 20, 88], p);
    lerpVec(T, [0, 3.2, 58], [0, 10, 42], p);
    state.camFov = lerp(44, 52, p); state.focusZ = 56;
  }

  state.heroFollowPos.copy(T);
  return state;
}
