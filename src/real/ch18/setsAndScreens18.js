import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createCarbonFiberMaterial } from '../ch14/hmd02BodyRig.js';
import { createHMD02CompleteRig } from '../ch17/hmd02CompleteRig.js';
import {
  createViaductAndExpressTrainRig,
  createModularRepairAndGoldResistorRig,
  createLevelCrossingRig,
} from './ch18PropsAndRig.js';

/**
 * Dynamic Screens for Chapter 18:
 * - `'cutoff_36_8v'`: Smartphone / Monitor showing `Bus Voltage Peak : 36.8 V (Over-Voltage Cutoff!)`
 * - `'clamped_26_2v'`: Razor-flat ruler-clamped `26.2 V` Regenerative Shunt Clamp Waveform -> `24.8 V`!
 */
export function createCh18Screens() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 576;
  const ctx = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const logScreenMat = new THREE.MeshBasicMaterial({ map: tex });

  let last = '';
  function updateLog(mode) {
    if (mode === last) return;
    last = mode;

    ctx.fillStyle = '#070b14'; ctx.fillRect(0, 0, 1024, 576);
    ctx.fillStyle = '#1e293b'; ctx.fillRect(0, 0, 1024, 50);

    if (mode === 'cutoff_36_8v') {
      ctx.fillStyle = '#f87171'; ctx.font = '800 22px monospace';
      ctx.fillText('HMD-02 TELEMETRY LOG // 0.9 m/s EMERGENCY BRAKE BLACKOUT', 22, 33);
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.strokeRect(32, 74, 600, 326);
      ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(44, 286); ctx.lineTo(310, 282); ctx.lineTo(334, 96); // 36.8V LIGHTNING!
      ctx.lineTo(346, 386); ctx.lineTo(618, 386); // BLACKOUT 0V!
      ctx.stroke();
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(334, 96, 16, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#fef08a'; ctx.font = '900 26px monospace';
      ctx.fillText('36.8 V PEAK!!', 362, 108);
      ctx.fillStyle = '#f87171'; ctx.font = '800 22px monospace';
      ctx.fillText('0.0 V [BMS CUTOFF]', 372, 372);

      ctx.fillStyle = '#f8fafc'; ctx.font = '900 26px sans-serif';
      ctx.fillText('12基の筋肉が発電機へ豹変！', 652, 126);
      ctx.fillStyle = '#fca5a5'; ctx.font = '800 22px sans-serif';
      ctx.fillText('Bus Voltage Peak: 36.8V', 652, 178);
      ctx.fillStyle = '#cbd5e1'; ctx.font = '700 20px sans-serif';
      ctx.fillText('回生エネルギーが満充電電池へ', 652, 228);
      ctx.fillText('猛烈に逆流 → 保護回路遮断！', 652, 262);
      ctx.fillText('右股関節8mm中空軸が2°湾曲', 652, 314);

      ctx.fillStyle = '#450a0a'; ctx.fillRect(32, 428, 960, 120);
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 4; ctx.strokeRect(32, 428, 960, 120);
      ctx.fillStyle = '#fecaca'; ctx.font = '900 30px sans-serif';
      ctx.fillText('Bus Voltage Peak : 36.8 V (Over-Voltage Cutoff!)', 56, 480);
      ctx.fillStyle = '#fde68a'; ctx.font = '700 21px sans-serif';
      ctx.fillText('だが19歳の湊は静かだった——頭の中には修理手順1〜10が並んでいた', 56, 524);
    } else {
      ctx.fillStyle = '#34d399'; ctx.font = '800 22px monospace';
      ctx.fillText('REGEN SHUNT CLAMP // 1.1 m/s SPRINT -> HARD BRAKE [SUCCESS!]', 22, 33);
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.strokeRect(32, 74, 600, 326);
      // 26.2V Ruler-Flat Ceiling!
      ctx.strokeStyle = '#eab308'; ctx.setLineDash([8, 6]); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(32, 176); ctx.lineTo(632, 176); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fde047'; ctx.font = '800 20px monospace';
      ctx.fillText('CLAMP CEILING: 26.2 V (50W 1.5Ω)', 48, 162);

      ctx.strokeStyle = '#34d399'; ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(44, 276); ctx.lineTo(250, 274); ctx.lineTo(278, 178);
      ctx.lineTo(418, 178); // RULER-FLAT CLAMPED AT 26.2V!
      ctx.lineTo(468, 286); ctx.lineTo(618, 286);
      ctx.stroke();

      ctx.fillStyle = '#a7f3d0'; ctx.font = '900 26px sans-serif';
      ctx.fillText('定規を当てたような26.2V制御！', 652, 126);
      ctx.fillStyle = '#fde68a'; ctx.font = '800 22px sans-serif';
      ctx.fillText('■ 1.1 m/s 命綱なし全力走行', 652, 178);
      ctx.fillStyle = '#34d399';
      ctx.fillText('■ 5m急制動『ザッ——ピタリ！』', 652, 224);
      ctx.fillStyle = '#cbd5e1'; ctx.font = '700 20px sans-serif';
      ctx.fillText('金色の50W抵抗が運動エネルギーを', 652, 278);
      ctx.fillText('人肌の優しい熱へ変えて鎮めた！', 652, 312);

      ctx.fillStyle = '#064e3b'; ctx.fillRect(32, 428, 960, 120);
      ctx.strokeStyle = '#10b981'; ctx.lineWidth = 4; ctx.strokeRect(32, 428, 960, 120);
      ctx.fillStyle = '#a7f3d0'; ctx.font = '900 30px sans-serif';
      ctx.fillText('✓ 電源ブラックアウト完全克服！ 26.2V 完璧クランプ達成！', 56, 480);
      ctx.fillStyle = '#fde68a'; ctx.font = '700 21px sans-serif';
      ctx.fillText('残るは両腕と頭部の装着、そして『全力横突き飛ばし』外乱テストへ！', 56, 524);
    }
    tex.needsUpdate = true;
  }
  updateLog('cutoff_36_8v');

  return { logScreenMat, updateLog };
}

export function createCh18World(scene, baseMats, ngMats, screens, masterLib) {
  const { pbr } = masterLib;
  const sharedCarbonMat = createCarbonFiberMaterial();

  // Headless / Armless 7.62kg HMD-02 (matching Ch.18's "頭のない肩口を見下ろし"!)
  const hmd02 = createHMD02CompleteRig(baseMats, {
    sharedCarbonMat,
    hasUpperBody: false,
    hasGoldResistor: true,
  });

  const viaductRig = createViaductAndExpressTrainRig(baseMats, pbr);
  const repairRig = createModularRepairAndGoldResistorRig(baseMats, sharedCarbonMat);
  const crossingRig = createLevelCrossingRig(baseMats, pbr);

  // ===========================================================================
  // SET 1: 夜の鉄道高架下河川敷広場（白いランタン・急行電車・命綱ゼロ高速走行＆転倒＆急制動！）
  // ===========================================================================
  const viaductSet = new THREE.Group();
  scene.add(viaductSet);
  viaductSet.add(viaductRig.group);
  viaductSet.add(hmd02.root);

  const minatoViaduct = createRealisticHuman(baseMats, {
    role: 'minato_viaduct_ch18',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoViaduct.root.position.set(-1.35, 0, 1.35);
  minatoViaduct.root.rotation.y = 0.55;
  viaductSet.add(minatoViaduct.root);

  // ===========================================================================
  // SET 2: 203号室 深夜の作業机（白いウエス・2時間完全復旧・36.8V/26.2Vモニター・金色50W抵抗）
  // ===========================================================================
  const workbenchSet = new THREE.Group();
  workbenchSet.visible = false;
  scene.add(workbenchSet);

  const wbFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.6, 5.6),
    pbr.get('darkWalnutStripFloor', { repeatX: 4, repeatY: 4 })
  );
  wbFloor.rotation.x = -Math.PI / 2;
  const wbWall = new THREE.Mesh(
    new THREE.PlaneGeometry(5.6, 3.0),
    pbr.get('wallpaperWhiteWoven', { repeatX: 4, repeatY: 2 })
  );
  wbWall.position.set(0, 1.5, -1.65);
  const wbDesk = new THREE.Mesh(
    new THREE.BoxGeometry(1.56, 0.036, 0.82),
    pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x8d6342 })
  );
  wbDesk.position.set(0, 0.72, -1.0);
  repairRig.group.position.set(0, 0.738, -0.88);
  repairRig.goldResGroup.position.set(0, 0.738, -0.88);

  const monGroup = new THREE.Group();
  monGroup.position.set(0, 0.738, -1.36);
  const mFrame = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.38, 0.022), baseMats.blackAnodized);
  mFrame.position.y = 0.28;
  const mFace = new THREE.Mesh(new THREE.PlaneGeometry(0.61, 0.345), screens.logScreenMat);
  mFace.position.set(0, 0.28, 0.013);
  monGroup.add(mFrame, mFace);
  workbenchSet.add(wbFloor, wbWall, wbDesk, repairRig.group, repairRig.goldResGroup, monGroup);

  // ===========================================================================
  // SET 3: 私鉄急行電車の踏切（回生ブレーキの音で閃く湊！）
  // ===========================================================================
  const crossingSet = new THREE.Group();
  crossingSet.visible = false;
  scene.add(crossingSet);
  crossingSet.add(crossingRig.group);

  const minatoCross = createRealisticHuman(baseMats, {
    role: 'minato_crossing',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: true,
  });
  minatoCross.root.position.set(0.35, 0, 0.42);
  minatoCross.root.rotation.y = Math.PI * 0.92;
  crossingSet.add(minatoCross.root);

  function setActiveSet(name) {
    viaductSet.visible = name === 'viaduct';
    workbenchSet.visible = name === 'workbench';
    crossingSet.visible = name === 'crossing';
  }

  return {
    setActiveSet,
    hmd02,
    viaductRig,
    repairRig,
    crossingRig,
    minatoViaduct,
  };
}
