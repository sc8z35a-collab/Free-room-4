import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createNextGenHandRig } from '../nextgen/pbrMicroTextures.js';
import { createHMD01Rev18Fighter } from '../ch09/hmd01Rev18Rig.js';
import { createCh10StoryProps } from '../ch10/qddAndHallProps.js';
import { createNewspaperSilhouetteWall } from '../ch11/ch11PropsAndRig.js';
import {
  createMagnifierAndOrganizerRig,
  createVintageOscilloscopeRig,
  createTwelveMuscleBusRig,
  createDoubleHelixMacroRig,
  createSanwaMultimeterRig,
} from './ch13PropsAndRig.js';

/**
 * Dynamic Laptop Screens for Chapter 13:
 * 1. Massive ¥168,400 14-Axis Mass-Production Checkout (`order_168k`)
 * 2. Cascading RED `通信途絶・応答なし` CAN-Bus Timeout Log (`can_timeout`)
 * 3. All 12 Joints Synchronized & Bilateral Haptics Live Telemetry (`bilateral_ok`)
 */
export function createCh13Screens() {
  const lapC = document.createElement('canvas');
  lapC.width = 1024; lapC.height = 640;
  const lx = lapC.getContext('2d');
  const lapTex = new THREE.CanvasTexture(lapC);
  lapTex.colorSpace = THREE.SRGBColorSpace;
  const laptopScreenMat = new THREE.MeshBasicMaterial({ map: lapTex });

  let lastKey = '';
  function updateLaptop(mode, angleDeg = 0) {
    const key = `${mode}_${Math.round(angleDeg)}`;
    if (key === lastKey) return;
    lastKey = key;

    lx.fillStyle = '#0b1120'; lx.fillRect(0, 0, 1024, 640);
    lx.fillStyle = '#1e293b'; lx.fillRect(0, 0, 1024, 52);

    if (mode === 'order_168k') {
      lx.fillStyle = '#38bdf8'; lx.font = '800 22px monospace';
      lx.fillText('COMPONENTS CHECKOUT // HMD-02 12-JOINT MASS PRODUCTION', 28, 34);
      lx.fillStyle = '#f8fafc'; lx.font = '900 32px sans-serif';
      lx.fillText('『HMD-02』人工筋肉 全12基＋予備2基 一括発注カート', 32, 108);

      const rows = [
        ['80mm 裸銅アウトランナーモーター (予備込)', '× 14 個', '¥89,600'],
        ['薄型遊星歯車セット (1段減速)', '× 14 組', '¥44,800'],
        ['直径46mm 自作丸型FOC基板 (FR4緑)', '× 15 枚', '¥14,200'],
        ['0603 SMDチップ抵抗・コンデンサ・MOSFET', '× 1,260 個', '¥19,800'],
      ];
      lx.font = '700 24px sans-serif';
      rows.forEach(([label, qty, price], idx) => {
        const y = 172 + idx * 58;
        lx.fillStyle = '#cbd5e1'; lx.fillText(label, 38, y);
        lx.fillStyle = '#7dd3fc'; lx.fillText(qty, 620, y);
        lx.fillStyle = '#fef08a'; lx.fillText(price, 810, y);
      });

      lx.fillStyle = '#7f1d1d'; lx.fillRect(32, 424, 960, 174);
      lx.strokeStyle = '#ef4444'; lx.lineWidth = 5; lx.strokeRect(32, 424, 960, 174);
      lx.fillStyle = '#fef08a'; lx.font = '900 48px monospace';
      lx.fillText('合計引き落とし額：¥168,400', 58, 496);
      lx.fillStyle = '#86efac'; lx.font = '800 28px sans-serif';
      lx.fillText('▶ 震える指で注文確定 —— 1,200粒のハンダ付け修行へ！', 58, 560);
    } else if (mode === 'can_timeout') {
      lx.fillStyle = '#f87171'; lx.font = '900 22px monospace';
      lx.fillText('CAN-BUS MONITOR // 6-JOINT RIGHT LEG DAISY CHAIN [CRITICAL ERROR]', 28, 34);
      const errs = [
        '[ERR 00:03.114] JOINT #05 : CAN RX CRC FAULT — UNEXPECTED TORQUE SPIKE!!',
        '[ERR 00:03.118] JOINT #06 : 通信途絶・応答なし (BUS-OFF TIMEOUT)',
        '[ERR 00:03.122] JOINT #05 : 通信途絶・応答なし (WATCHDOG RESET)',
        '[ERR 00:03.126] JOINT #06 : MOTOR DISABLED — 脱力 (LIMP STATE)',
        '[ERR 00:03.131] CAN BUS   : 128+ FRAME COLLISIONS DETECTED IN 20ms!!',
        '[ERR 00:03.140] JOINT #05 : 通信途絶・応答なし — CHECK NOISE / EMI!',
      ];
      lx.font = '800 23px monospace';
      errs.forEach((line, idx) => {
        lx.fillStyle = idx % 2 === 0 ? '#fca5a5' : '#ef4444';
        lx.fillText(line, 32, 118 + idx * 62);
      });
      lx.fillStyle = '#450a0a'; lx.fillRect(32, 494, 960, 108);
      lx.strokeStyle = '#ef4444'; lx.lineWidth = 4; lx.strokeRect(32, 494, 960, 108);
      lx.fillStyle = '#fef2f2'; lx.font = '900 32px sans-serif';
      lx.fillText('⚠ 断線ゼロ・電源24.00V正常 —— 電線の中に『見えない亡霊』！', 52, 560);
    } else {
      lx.fillStyle = '#34d399'; lx.font = '900 22px monospace';
      lx.fillText('HMD-02 NERVE BUS // ALL 12 ARTIFICIAL MUSCLES ONLINE [0.001s SYNC]', 28, 34);
      lx.fillStyle = '#f8fafc'; lx.font = '900 34px sans-serif';
      lx.fillText('12基同時駆動＆双方向力覚テレオペレーション：完全同期！', 32, 114);
      lx.fillStyle = '#34d399'; lx.font = '900 44px monospace';
      lx.fillText(`JOINT #01: ${angleDeg >= 0 ? '+' : ''}${angleDeg.toFixed(1)}°  ⇄  JOINT #12: ${angleDeg >= 0 ? '+' : ''}${angleDeg.toFixed(1)}°`, 36, 206);
      lx.fillStyle = '#7dd3fc'; lx.font = '800 26px monospace';
      lx.fillText('BUS TOPOLOGY : RED/WHITE DOUBLE-HELIX TWISTED PAIR + 120Ω + FERRITE', 36, 282);
      lx.fillText('CAN ERRORS   : 0 / 100,000 FRAMES (EMI NOISE: COMPLETELY ELIMINATED)', 36, 334);
      lx.fillStyle = '#064e3b'; lx.fillRect(32, 412, 960, 178);
      lx.strokeStyle = '#10b981'; lx.lineWidth = 5; lx.strokeRect(32, 412, 960, 178);
      lx.fillStyle = '#a7f3d0'; lx.font = '900 34px sans-serif';
      lx.fillText('▶ 双方向ハプティクス確認：1m先の抵抗が指先へ生々しく返る！', 56, 488);
      lx.fillStyle = '#fde68a'; lx.font = '800 26px sans-serif';
      lx.fillText('「ここからは電気屋が一番強い世界だよ」—— 心臓と神経、完全開通！', 56, 550);
    }
    lapTex.needsUpdate = true;
  }
  updateLaptop('order_168k');

  return { laptopScreenMat, updateLaptop };
}

/**
 * Builds ALL 5 Monumental Chapter 13 Sets powered by the 340-Asset Master Library & 88-Atlas (792-Tile) PBR Engine!
 */
export function createCh13World(scene, baseMats, ngMats, screens, masterLib) {
  const { pbr, spawn } = masterLib;

  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats, masterLib);
  heroFighter.setBattleState({ scratched: true, hipCracked: true, silverSplints: true });
  const ch10Props = createCh10StoryProps(baseMats, ngMats);
  const newsWall = createNewspaperSilhouetteWall(baseMats);

  const magnifierOrg = createMagnifierAndOrganizerRig(baseMats);
  const vintageScope = createVintageOscilloscopeRig(baseMats);
  const muscleBus = createTwelveMuscleBusRig(baseMats);
  const doubleHelixMacro = createDoubleHelixMacroRig(baseMats);
  const sanwaMeter = createSanwaMultimeterRig();

  // Dual fingernail-detailed hands for soldering, oscilloscope probing, and bilateral Joint #1 <-> Joint #12 haptic test!
  const macroHandR = createNextGenHandRig(baseMats, ngMats, 1);
  macroHandR.group.visible = false;
  scene.add(macroHandR.group);

  const macroHandL = createNextGenHandRig(baseMats, ngMats, -1);
  macroHandL.group.visible = false;
  scene.add(macroHandL.group);

  // ===========================================================================
  // SET 1: 『コーポ武蔵野』203号室 — 拡大鏡＆12個仕切り箱・12基筋肉バス・中古オシロ・二重螺旋マクロ＆黒アルミ骨格!
  // ===========================================================================
  const room203Set = new THREE.Group();
  scene.add(room203Set);

  const roomFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 5.4),
    pbr.get('darkWalnutStripFloor', { repeatX: 4, repeatY: 4 })
  );
  roomFloor.rotation.x = -Math.PI / 2; roomFloor.receiveShadow = true;
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(5.4, 2.9),
    pbr.get('wallpaperWhiteWoven', { repeatX: 4, repeatY: 2 })
  );
  backWall.position.set(0, 1.45, -1.65);
  room203Set.add(roomFloor, backWall);

  // Honored Bookshelf with Retired HMD-01 & `規定完走証 9秒12`
  const shelfGroup = new THREE.Group();
  const shelfWood = pbr.get('parquetWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x9c724c });
  const shelfTop = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.026, 0.34), shelfWood);
  shelfTop.position.set(-1.12, 1.24, -1.42);
  const shelfL = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.68, 0.34), shelfWood);
  shelfL.position.set(-1.58, 0.92, -1.42);
  const shelfR = shelfL.clone(); shelfR.position.x = -0.66;
  ch10Props.certCard.position.set(-0.88, 1.305, -1.40);
  ch10Props.certCard.rotation.set(-0.18, -0.15, 0);
  heroFighter.root.position.set(-1.18, 1.254, -1.40);
  heroFighter.root.rotation.set(0, 0.32, 0);
  heroFighter.setPose({
    pelvisPos: [0, 0.095, 0], pelvisRot: [-0.14, 0, 0],
    leftFootPos: [0.046, 0.02, 0.145], rightFootPos: [-0.046, 0.02, 0.145],
    leftArmPitch: 0.35, rightArmPitch: 0.35, leftArmRoll: 0.14, rightArmRoll: -0.14,
    pivotRotX: 0, pivotPosY: 0,
  });
  shelfGroup.add(shelfTop, shelfL, shelfR, ch10Props.certCard, heroFighter.root);
  room203Set.add(shelfGroup);

  // Eye-level 720mm `HMD-02` Newspaper Silhouette Wall + Black CNC Aluminum & Carbon Skeleton Hologram (Ch.14 Teaser!)
  newsWall.group.position.set(0.05, 0.72, -1.62);
  newsWall.updateSilhouette(1.0);
  room203Set.add(newsWall.group);

  const cncSkeletonGroup = new THREE.Group();
  cncSkeletonGroup.position.set(0.05, 0.81, -1.58);
  const cncMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.45,
    metalness: 0.92,
    roughness: 0.22,
    transparent: true,
    opacity: 0.88,
  });
  const carbonMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    emissive: 0x10b981,
    emissiveIntensity: 0.32,
    metalness: 0.65,
    roughness: 0.35,
  });
  // Sleek machined torso frame + carbon thigh/shin struts matching the 720mm wall drawing!
  const skTorso = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.17, 0.03), cncMat);
  skTorso.position.set(0, 0.51, 0);
  const skPelvis = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.05, 0.03), cncMat);
  skPelvis.position.set(0, 0.39, 0);
  for (const sx of [-0.075, 0.075]) {
    const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.014, 0.15, 12), carbonMat);
    thigh.position.set(sx, 0.32, 0);
    const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.012, 0.16, 12), carbonMat);
    shin.position.set(sx, 0.18, 0);
    const kneeRing = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.005, 8, 20), cncMat);
    kneeRing.position.set(sx, 0.26, 0.01);
    cncSkeletonGroup.add(thigh, shin, kneeRing);
  }
  cncSkeletonGroup.add(skTorso, skPelvis);
  cncSkeletonGroup.visible = false;
  room203Set.add(cncSkeletonGroup);

  // Main 1.56m Workbench Desk (`作業机`)
  const deskGroup = new THREE.Group();
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.56, 0.036, 0.80),
    pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x8d6342 })
  );
  deskTop.position.set(0, 0.72, -0.52);
  deskTop.castShadow = true; deskTop.receiveShadow = true;
  for (const lx of [-0.72, 0.72]) {
    for (const lz of [-0.86, -0.18]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.72, 0.038), baseMats.blackAnodized);
      leg.position.set(lx, 0.36, lz);
      deskGroup.add(leg);
    }
  }
  deskGroup.add(deskTop);

  // Mount Magnifier + Organizer Box, 12-Muscle Bus, Vintage Oscilloscope, Double-Helix Macro, Sanwa Meter & Laptop!
  magnifierOrg.group.position.set(0.0, 0.738, -0.44);
  muscleBus.group.position.set(0.0, 0.738, -0.34);
  vintageScope.group.position.set(0.0, 0.738, -0.68);
  vintageScope.probeGroup.position.set(-0.08, 0.758, -0.30);
  doubleHelixMacro.group.position.set(0.0, 0.738, -0.44);
  sanwaMeter.group.position.set(0.38, 0.738, -0.34);
  sanwaMeter.group.rotation.y = -0.35;

  const laptopGroup = new THREE.Group();
  laptopGroup.position.set(0.42, 0.738, -0.66);
  laptopGroup.rotation.y = -0.32;
  const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.012, 0.22), baseMats.aluminumBrushed);
  lapBase.position.y = 0.006;
  const lapLid = new THREE.Group();
  lapLid.position.set(0, 0.012, -0.105);
  lapLid.rotation.x = -0.20;
  const lidBack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.21, 0.008), baseMats.aluminumBrushed);
  lidBack.position.y = 0.105;
  const lidScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.30, 0.19), screens.laptopScreenMat);
  lidScreen.position.set(0, 0.105, 0.005);
  lapLid.add(lidBack, lidScreen);
  laptopGroup.add(lapBase, lapLid);

  deskGroup.add(
    magnifierOrg.group,
    muscleBus.group,
    vintageScope.group,
    vintageScope.probeGroup,
    doubleHelixMacro.group,
    sanwaMeter.group,
    laptopGroup
  );
  room203Set.add(deskGroup);

  // ===========================================================================
  // SET 2: Day 366（4月6日）満開のソメイヨシノ・大学正門＆実験棟自動ドア (`二度目の桜`)!
  // ===========================================================================
  const sakuraCampusSet = new THREE.Group();
  sakuraCampusSet.visible = false;
  scene.add(sakuraCampusSet);

  const springSkyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, uniforms: {},
    vertexShader: `varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vP; void main(){
      float h = clamp(normalize(vP).y * 1.4 + 0.08, 0.0, 1.0);
      vec3 col = mix(vec3(0.95, 0.96, 1.0), vec3(0.34, 0.64, 0.96), pow(h, 0.68));
      gl_FragColor = vec4(col, 1.0);
    }`,
  });
  sakuraCampusSet.add(new THREE.Mesh(new THREE.SphereGeometry(65, 24, 16), springSkyMat));

  const campusPlaza = spawn('arch_herringbone_brick_plaza', { w: 26, d: 28 });
  sakuraCampusSet.add(campusPlaza);

  // FOUR Towering Full-Bloom Pink Somei-Yoshino Cherry Blossom Trees ("見上げるほどのソメイヨシノが満開")!
  const sakBarkMat = pbr.get('treeBarkRealistic', { repeatX: 1, repeatY: 3, tint: 0x5c4738 });
  const sakCanopyMat1 = new THREE.MeshStandardMaterial({ color: 0xffd1e3, roughness: 0.78 });
  const sakCanopyMat2 = new THREE.MeshStandardMaterial({ color: 0xfbcfe8, roughness: 0.75 });
  const sakPos = [[-3.4, -2.5], [3.4, -2.5], [-3.8, -7.2], [3.8, -7.2]];
  for (const [sx, sz] of sakPos) {
    const tGroup = new THREE.Group();
    tGroup.position.set(sx, 0, sz);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.26, 2.8, 12), sakBarkMat);
    trunk.position.y = 1.4;
    const crownOffsets = [
      [0, 3.6, 0, 1.55, sakCanopyMat1],
      [-0.95, 3.2, 0.4, 1.15, sakCanopyMat2],
      [0.95, 3.3, -0.3, 1.20, sakCanopyMat1],
      [0.2, 4.3, 0.2, 1.05, sakCanopyMat2],
    ];
    for (const [cx, cy, cz, cr, cm] of crownOffsets) {
      const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(cr, 1), cm);
      puff.position.set(cx, cy, cz);
      tGroup.add(puff);
    }
    tGroup.add(trunk);
    sakuraCampusSet.add(tGroup);
  }

  // Experiment Building Reflective Glass Facade in Background ("実験棟の自動ドア")
  const expBldg = new THREE.Mesh(
    new THREE.BoxGeometry(11, 5.2, 1.5),
    pbr.get('whiteFacadeTileGrid', { repeatX: 4, repeatY: 2 })
  );
  expBldg.position.set(0, 2.6, -11.5);
  const autoDoorGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 2.5),
    new THREE.MeshPhysicalMaterial({ color: 0x93c5fd, metalness: 0.35, roughness: 0.08, transparent: true, opacity: 0.72 })
  );
  autoDoorGlass.position.set(0, 1.25, -10.72);
  sakuraCampusSet.add(expBldg, autoDoorGlass);

  // 19-year-old Minato (familiar hoodie & sneakers) + Two Freshmen in Crisp Black Suits Holding Club Flyers!
  const minatoSpring = createRealisticHuman(baseMats, {
    role: 'minato_spring',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: true,
  });
  minatoSpring.root.position.set(-0.6, 0, -1.6);
  minatoSpring.root.rotation.y = Math.PI;
  sakuraCampusSet.add(minatoSpring.root);

  const freshmanA = createRealisticHuman(baseMats, {
    role: 'freshman_a',
    topMat: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.72 }),
    pantsMat: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.75 }),
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  const flyers = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.04, 0.30),
    new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8 })
  );
  flyers.position.set(0.02, -0.08, 0.10);
  freshmanA.rightArm.wrist.add(flyers);
  freshmanA.root.position.set(0.85, 0, -4.4);
  freshmanA.root.rotation.y = 0.0;
  sakuraCampusSet.add(freshmanA.root);

  const freshmanB = createRealisticHuman(baseMats, {
    role: 'freshman_b',
    topMat: new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.72 }),
    pantsMat: new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.75 }),
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  freshmanB.root.position.set(1.55, 0, -4.8);
  freshmanB.root.rotation.y = 0.0;
  sakuraCampusSet.add(freshmanB.root);

  // 180 Instanced Swirling Pink Sakura Petals ("満開の花びらを春風に散らしていた")!
  const sakuraPetals = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(0.052, 0.036),
    new THREE.MeshBasicMaterial({ color: 0xffc8dd, side: THREE.DoubleSide }),
    180
  );
  const _sp = new THREE.Object3D();
  function updateSakuraPetals(t) {
    for (let i = 0; i < 180; i++) {
      const px = ((i * 0.67 + t * 0.85) % 10.0) - 5.0;
      const py = 4.6 - ((i * 0.37 + t * 0.72) % 4.4);
      const pz = -9.5 + ((i * 0.53) % 10.5);
      _sp.position.set(px, py, pz);
      _sp.rotation.set(t * 2.4 + i, t * 1.9 + i * 0.6, i);
      _sp.updateMatrix();
      sakuraPetals.setMatrixAt(i, _sp.matrix);
    }
    sakuraPetals.instanceMatrix.needsUpdate = true;
  }
  sakuraCampusSet.add(sakuraPetals);

  // ===========================================================================
  // SET 3: 大学2年 必修『電気電子工学実験Ⅰ』実験室 — 並ぶオシロスコープの緑と黄色の光の波!
  // ===========================================================================
  const uniLabSet = new THREE.Group();
  uniLabSet.visible = false;
  scene.add(uniLabSet);

  const labFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    pbr.get('exhibitionWhiteTile', { repeatX: 6, repeatY: 6, tint: 0xdbe2ea })
  );
  labFloor.rotation.x = -Math.PI / 2; labFloor.receiveShadow = true;
  const labWall = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 3.6),
    pbr.get('archWhiteConcrete', { repeatX: 4, repeatY: 2 })
  );
  labWall.position.set(0, 1.8, -3.2);
  const labBench = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.82, 1.0),
    pbr.get('birchPlywoodSheet', { repeatX: 3, repeatY: 1, tint: 0xb8b2a6 })
  );
  labBench.position.set(0, 0.41, -1.2);
  labBench.receiveShadow = true;

  const labScopeHero = createVintageOscilloscopeRig(baseMats);
  labScopeHero.group.position.set(0.0, 0.82, -1.12);
  const labScopeL = createVintageOscilloscopeRig(baseMats);
  labScopeL.group.position.set(-1.15, 0.82, -1.16);
  const labScopeR = createVintageOscilloscopeRig(baseMats);
  labScopeR.group.position.set(1.15, 0.82, -1.16);
  uniLabSet.add(labFloor, labWall, labBench, labScopeHero.group, labScopeL.group, labScopeR.group);

  // ===========================================================================
  // SET 4: 秋葉原ガード下・薄暗い中古計測器専門店 (`整備済 ¥24,800`)!
  // ===========================================================================
  const akihabaraShopSet = new THREE.Group();
  akihabaraShopSet.visible = false;
  scene.add(akihabaraShopSet);

  const shopFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(6.5, 6.5),
    pbr.get('viaductConcreteRust', { repeatX: 3, repeatY: 3 })
  );
  shopFloor.rotation.x = -Math.PI / 2;
  const shopWall = new THREE.Mesh(
    new THREE.PlaneGeometry(6.5, 3.2),
    pbr.get('concreteCinderBlock', { repeatX: 3, repeatY: 2, tint: 0x64748b })
  );
  shopWall.position.set(0, 1.6, -1.8);

  // Heavy Industrial Steel Storage Rack Stacked with Vintage Oscilloscopes!
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.72, roughness: 0.45 });
  for (const sx of [-1.25, 1.25]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.2, 0.05), steelMat);
    post.position.set(sx, 1.1, -1.25);
    akihabaraShopSet.add(post);
  }
  for (const sy of [0.22, 0.84, 1.46]) {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.04, 0.56), steelMat);
    shelf.position.set(0, sy, -1.25);
    akihabaraShopSet.add(shelf);
  }
  // Background stacked vintage test gear on upper shelves
  const gearColors = [0xbdb299, 0x94a3b8, 0xc7bea7, 0x64748b, 0xa8a29e];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 5; col++) {
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.40, 0.24, 0.34),
        new THREE.MeshStandardMaterial({ color: gearColors[(row * 5 + col) % gearColors.length], roughness: 0.65 })
      );
      box.position.set(-0.92 + col * 0.46, 0.98 + row * 0.62, -1.24);
      akihabaraShopSet.add(box);
    }
  }
  // HERO Yellowed Vintage Oscilloscope on the Bottom Shelf with `整備済 ¥24,800` Yellow Price Tag!
  const shopHeroScope = createVintageOscilloscopeRig(baseMats);
  shopHeroScope.group.position.set(0.0, 0.24, -1.16);
  shopHeroScope.priceTag.visible = true;
  shopHeroScope.drawScope(0, 'off');
  akihabaraShopSet.add(shopFloor, shopWall, shopHeroScope.group);

  // ===========================================================================
  // SET 5: 夕暮れの中央線・両膝の上に3kg中古オシロを宝物のように抱える湊!
  // ===========================================================================
  const trainReturnSet = new THREE.Group();
  trainReturnSet.visible = false;
  scene.add(trainReturnSet);

  const trainFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.0, 3.2),
    pbr.get('carpetTileDark', { repeatX: 3, repeatY: 2, tint: 0x64748b })
  );
  trainFloor.rotation.x = -Math.PI / 2;
  const trainWall = new THREE.Mesh(
    new THREE.PlaneGeometry(5.0, 2.6),
    pbr.get('archWhiteConcrete', { repeatX: 3, repeatY: 1, tint: 0xdbe2ea })
  );
  trainWall.position.set(0, 1.3, -1.1);
  // Dark night window with warm passing Tokyo city light streaks!
  const trainWin = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 1.05),
    new THREE.MeshBasicMaterial({ color: 0x090f1d })
  );
  trainWin.position.set(0, 1.48, -1.08);
  const cityStreaks = [];
  for (let i = 0; i < 14; i++) {
    const st = new THREE.Mesh(
      new THREE.PlaneGeometry(0.18 + (i % 3) * 0.14, 0.024),
      new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0xfbbf24 : (i % 3 === 1 ? 0x38bdf8 : 0xfef08a) })
    );
    st.position.set(-0.9 + (i * 0.28) % 1.8, 1.12 + (i % 5) * 0.15, -1.06);
    trainReturnSet.add(st);
    cityStreaks.push(st);
  }
  // Classic Japanese commuter green bench seat & chrome handrail
  const seatMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.88 });
  const seatBench = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.44, 0.56), seatMat);
  seatBench.position.set(0, 0.22, -0.78);
  const seatBack = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.55, 0.12), seatMat);
  seatBack.position.set(0, 0.65, -1.02);
  const handRail = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 3.6, 12), baseMats.chromeSteel);
  handRail.rotation.z = Math.PI / 2;
  handRail.position.set(0, 1.92, -0.42);

  // Seated Minato protectively hugging the 3kg vintage oscilloscope on his knees!
  const minatoTrain = createRealisticHuman(baseMats, {
    role: 'minato_train',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoTrain.root.position.set(0.0, -0.44, -0.68);
  minatoTrain.root.rotation.y = 0.0;
  minatoTrain.leftLeg.hipJoint.rotation.x = -1.42;
  minatoTrain.leftLeg.kneeJoint.rotation.x = 1.42;
  minatoTrain.rightLeg.hipJoint.rotation.x = -1.42;
  minatoTrain.rightLeg.kneeJoint.rotation.x = 1.42;
  minatoTrain.leftArm.shoulder.rotation.set(-0.72, 0, 0.18);
  minatoTrain.leftArm.elbow.rotation.set(-0.75, 0, 0);
  minatoTrain.rightArm.shoulder.rotation.set(-0.72, 0, -0.18);
  minatoTrain.rightArm.elbow.rotation.set(-0.75, 0, 0);

  const lapScope = createVintageOscilloscopeRig(baseMats);
  lapScope.group.scale.setScalar(0.88);
  lapScope.group.position.set(0.0, 0.50, -0.34);
  lapScope.drawScope(0, 'off');

  trainReturnSet.add(trainFloor, trainWall, trainWin, seatBench, seatBack, handRail, minatoTrain.root, lapScope.group);

  function updateTrainStreaks(t) {
    for (let i = 0; i < cityStreaks.length; i++) {
      const x = (((i * 0.37 - t * 2.4) % 2.1) + 2.1) % 2.1 - 1.05;
      cityStreaks[i].position.x = x;
    }
  }

  function setActiveSet(name) {
    room203Set.visible = name === 'room203';
    sakuraCampusSet.visible = name === 'sakura';
    uniLabSet.visible = name === 'uniLab';
    akihabaraShopSet.visible = name === 'akihabara';
    trainReturnSet.visible = name === 'train';
  }

  return {
    setActiveSet,
    deskGroup,
    shelfGroup,
    laptopGroup,
    magnifierOrg,
    vintageScope,
    muscleBus,
    doubleHelixMacro,
    sanwaMeter,
    newsWall,
    cncSkeletonGroup,
    macroHandR,
    macroHandL,
    minatoSpring,
    freshmanA,
    freshmanB,
    updateSakuraPetals,
    labScopeHero,
    labScopeL,
    labScopeR,
    shopHeroScope,
    updateTrainStreaks,
  };
}
