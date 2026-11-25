import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createNextGenHandRig } from '../nextgen/pbrMicroTextures.js';
import { createHMD01Rev18Fighter } from '../ch09/hmd01Rev18Rig.js';
import { createCh10StoryProps } from '../ch10/qddAndHallProps.js';
import {
  createNewspaperSilhouetteWall,
  createCondensationDropletWindow,
} from '../ch11/ch11PropsAndRig.js';
import {
  createBenchViseAndJointRig,
  createSafetyGogglesAndEStop,
  createExplosionAndSmokeRig,
  createTremblingTweezersRig,
  createSilverAlarmClockRig,
  createKotatsuAndSobaProps,
} from './ch12PropsAndRig.js';

/**
 * Live Dynamic Displays for Chapter 12:
 * 1. 24V Variable Bench PSU 7-Segment LED Panel (Normal / Shoot-Through Overload / E-Stop / Safe FOC)
 * 2. Laptop FOC Firmware & Virtual Spring Stiffness Monitor
 * 3. Warm New Year's Eve Television Screen in Family Living Room
 */
export function createCh12Screens() {
  // 1. 24V Bench PSU Display
  const psuC = document.createElement('canvas');
  psuC.width = 512; psuC.height = 256;
  const px = psuC.getContext('2d');
  const psuTex = new THREE.CanvasTexture(psuC);
  psuTex.colorSpace = THREE.SRGBColorSpace;
  const psuScreenMat = new THREE.MeshBasicMaterial({ map: psuTex });

  let lastPsuKey = '';
  function updatePsuDisplay(mode) {
    if (mode === lastPsuKey) return;
    lastPsuKey = mode;
    px.fillStyle = '#090d14'; px.fillRect(0, 0, 512, 256);
    px.strokeStyle = '#334155'; px.lineWidth = 6; px.strokeRect(8, 8, 496, 240);
    px.fillStyle = '#94a3b8'; px.font = '700 20px monospace';
    px.fillText('DC BENCH PSU // 24V HIGH-CURRENT', 26, 38);

    if (mode === 'off') {
      px.fillStyle = '#475569'; px.font = '900 72px monospace';
      px.fillText('00.0 V', 34, 128);
      px.fillText('00.0 A', 34, 212);
    } else if (mode === 'arm24') {
      px.fillStyle = '#22c55e'; px.font = '900 74px monospace';
      px.fillText('24.0 V', 34, 128);
      px.fillStyle = '#38bdf8';
      px.fillText('00.12 A', 34, 212);
      px.fillStyle = '#4ade80'; px.font = '800 22px monospace';
      px.fillText('OUT: ON', 368, 122);
    } else if (mode === 'short') {
      px.fillStyle = '#450a0a'; px.fillRect(10, 10, 492, 236);
      px.fillStyle = '#f87171'; px.font = '900 66px monospace';
      px.fillText('SHORT!!', 34, 122);
      px.fillStyle = '#fbbf24'; px.font = '900 64px monospace';
      px.fillText('48.2 A!', 34, 206);
    } else if (mode === 'estop') {
      px.fillStyle = '#ef4444'; px.font = '900 66px monospace';
      px.fillText('00.0 V', 34, 126);
      px.fillStyle = '#f87171'; px.font = '800 34px monospace';
      px.fillText('E-STOP CUTOFF', 34, 204);
    } else if (mode === 'soft_foc') {
      px.fillStyle = '#34d399'; px.font = '900 74px monospace';
      px.fillText('24.0 V', 34, 128);
      px.fillStyle = '#fbbf24';
      px.fillText('00.48 A', 34, 212);
      px.fillStyle = '#34d399'; px.font = '800 22px monospace';
      px.fillText('FOC OK', 378, 122);
      px.fillStyle = '#7dd3fc';
      px.fillText('DT:850ns', 358, 198);
    }
    psuTex.needsUpdate = true;
  }
  updatePsuDisplay('arm24');

  // 2. Laptop FOC Firmware / Spring-Damper Monitor
  const lapC = document.createElement('canvas');
  lapC.width = 1024; lapC.height = 640;
  const lx = lapC.getContext('2d');
  const lapTex = new THREE.CanvasTexture(lapC);
  lapTex.colorSpace = THREE.SRGBColorSpace;
  const laptopScreenMat = new THREE.MeshBasicMaterial({ map: lapTex });

  let lastLapMode = '';
  function updateLaptop(mode, kp = 1.2, deflectDeg = 0) {
    const key = `${mode}_${Math.round(kp * 10)}_${Math.round(deflectDeg)}`;
    if (key === lastLapMode) return;
    lastLapMode = key;
    lx.fillStyle = '#0b1120'; lx.fillRect(0, 0, 1024, 640);
    lx.fillStyle = '#1e293b'; lx.fillRect(0, 0, 1024, 52);
    lx.fillStyle = '#38bdf8'; lx.font = '800 22px monospace';
    lx.fillText('HMD-02 // FOC 6-GATE DRIVER FIRMWARE (46mm CIRCULAR PCB)', 28, 34);

    if (mode === 'bug_deadtime') {
      lx.fillStyle = '#fbbf24'; lx.font = '900 32px monospace';
      lx.fillText('TARGET_ANGLE = +10.0 deg   |   V_BUS = 24.0 V', 36, 118);
      lx.fillStyle = '#f87171'; lx.font = '900 36px monospace';
      lx.fillText('DEAD_TIME_NS = 0 ns   // WARNING: SHOOT-THROUGH RISK!', 36, 186);
      lx.fillStyle = '#94a3b8'; lx.font = '700 24px monospace';
      lx.fillText('HIGH_MOSFET_CLOSE();  LOW_MOSFET_OPEN();  // NO WAIT!', 36, 250);
      lx.fillStyle = '#7f1d1d'; lx.fillRect(36, 310, 952, 160);
      lx.strokeStyle = '#ef4444'; lx.lineWidth = 5; lx.strokeRect(36, 310, 952, 160);
      lx.fillStyle = '#fecaca'; lx.font = '900 36px sans-serif';
      lx.fillText('▶ Enterキー待機中：上門・下門 同時オン衝突の危険！', 64, 404);
    } else {
      lx.fillStyle = '#34d399'; lx.font = '900 32px monospace';
      lx.fillText('DEAD_TIME_NS = 850 ns  [SAFE]  |  OVER-CURRENT GUARD: ON', 32, 116);
      lx.fillStyle = '#f8fafc'; lx.font = '900 38px sans-serif';
      lx.fillText(`仮想バネ剛性 Kp = ${kp.toFixed(1)}   /   たわみ角 = ${deflectDeg.toFixed(1)}°`, 32, 186);
      // Soft Spring Compliance Waveform Graph
      lx.strokeStyle = '#334155'; lx.lineWidth = 2; lx.strokeRect(32, 224, 960, 270);
      lx.strokeStyle = '#475569'; lx.beginPath(); lx.moveTo(32, 359); lx.lineTo(992, 359); lx.stroke();
      lx.strokeStyle = '#34d399'; lx.lineWidth = 6;
      lx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const u = i / 120;
        const x = 44 + u * 936;
        const env = Math.sin(u * Math.PI) * Math.exp(-u * 1.4);
        const y = 359 + deflectDeg * 3.2 * env;
        if (i === 0) lx.moveTo(x, y); else lx.lineTo(x, y);
      }
      lx.stroke();
      lx.fillStyle = '#fde68a'; lx.font = '800 28px sans-serif';
      lx.fillText('状態：無音・バックドライバブル人工筋肉 —— 衝撃を吸収し音もなく復帰', 32, 560);
    }
    lapTex.needsUpdate = true;
  }
  updateLaptop('bug_deadtime');

  // 3. New Year's Eve Warm TV Screen
  const tvC = document.createElement('canvas');
  tvC.width = 512; tvC.height = 320;
  const tx = tvC.getContext('2d');
  const grad = tx.createLinearGradient(0, 0, 512, 320);
  grad.addColorStop(0, '#7c2d12'); grad.addColorStop(0.5, '#b91c1c'); grad.addColorStop(1, '#f59e0b');
  tx.fillStyle = grad; tx.fillRect(0, 0, 512, 320);
  tx.fillStyle = '#fef3c7'; tx.font = '900 42px serif';
  tx.fillText('大晦日 歌謡祭 LIVE', 64, 148);
  tx.fillStyle = '#fde68a'; tx.font = '700 26px monospace';
  tx.fillText('23:42   DEC 31', 152, 210);
  const tvTex = new THREE.CanvasTexture(tvC); tvTex.colorSpace = THREE.SRGBColorSpace;
  const tvScreenMat = new THREE.MeshBasicMaterial({ map: tvTex });

  return {
    psuScreenMat,
    updatePsuDisplay,
    laptopScreenMat,
    updateLaptop,
    tvScreenMat,
  };
}

/**
 * Builds ALL 4 Monumental Chapter 12 Sets powered by the 340-Asset Master Library & 88-Atlas (792-Tile) Photographic PBR Engine!
 */
export function createCh12World(scene, baseMats, ngMats, screens, masterLib) {
  const { pbr, spawn } = masterLib;

  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats, masterLib);
  heroFighter.setBattleState({ scratched: true, hipCracked: true, silverSplints: true });
  const ch10Props = createCh10StoryProps(baseMats, ngMats);
  const newsWall = createNewspaperSilhouetteWall(baseMats);
  const condWindow = createCondensationDropletWindow(baseMats, pbr);

  const viseJoint = createBenchViseAndJointRig(baseMats, pbr);
  const safetyRig = createSafetyGogglesAndEStop(baseMats);
  const explosionRig = createExplosionAndSmokeRig();
  const tweezersRig = createTremblingTweezersRig(baseMats);
  const alarmClock = createSilverAlarmClockRig(baseMats);
  const kotatsuProps = createKotatsuAndSobaProps(baseMats, pbr);

  // Fingernail-detailed right hand for E-stop smash, trembling tweezers, and magical `ふわっ` cat-paw finger press!
  const macroHand = createNextGenHandRig(baseMats, ngMats, 1);
  macroHand.group.visible = false;
  scene.add(macroHand.group);

  // ===========================================================================
  // SET 1: 『コーポ武蔵野』203号室 — 万力・46mm丸基板・24V電源・保護メガネ・非常停止・新聞紙720mm壁＆12関節ホログラム!
  // ===========================================================================
  const room203Set = new THREE.Group();
  scene.add(room203Set);

  const roomFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(4.8, 5.4),
    pbr.get('darkWalnutStripFloor', { repeatX: 4, repeatY: 4 })
  );
  roomFloor.rotation.x = -Math.PI / 2;
  roomFloor.receiveShadow = true;
  room203Set.add(roomFloor);

  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 2.9),
    pbr.get('wallpaperWhiteWoven', { repeatX: 4, repeatY: 2 })
  );
  backWall.position.set(0, 1.45, -1.65);
  const baseboard = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 0.09, 0.03),
    pbr.get('darkRusticPlanks', { repeatX: 4, repeatY: 1 })
  );
  baseboard.position.set(0, 0.045, -1.63);
  room203Set.add(backWall, baseboard);

  // Honored Bookshelf with Retired HMD-01 & `規定完走証 9秒12` looking down over the lab!
  const shelfGroup = new THREE.Group();
  const shelfWood = pbr.get('parquetWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x9c724c });
  const shelfTop = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.026, 0.34), shelfWood);
  shelfTop.position.set(-1.05, 1.24, -1.42);
  const shelfL = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.68, 0.34), shelfWood);
  shelfL.position.set(-1.51, 0.92, -1.42);
  const shelfR = shelfL.clone(); shelfR.position.x = -0.59;
  ch10Props.certCard.position.set(-0.82, 1.305, -1.40);
  ch10Props.certCard.rotation.set(-0.18, -0.15, 0);
  shelfGroup.add(shelfTop, shelfL, shelfR, ch10Props.certCard);
  heroFighter.root.position.set(-1.12, 1.254, -1.40);
  heroFighter.root.rotation.set(0, 0.32, 0);
  heroFighter.setPose({
    pelvisPos: [0, 0.095, 0], pelvisRot: [-0.14, 0, 0],
    leftFootPos: [0.046, 0.02, 0.145], rightFootPos: [-0.046, 0.02, 0.145],
    leftArmPitch: 0.35, rightArmPitch: 0.35, leftArmRoll: 0.14, rightArmRoll: -0.14,
    pivotRotX: 0, pivotPosY: 0,
  });
  shelfGroup.add(heroFighter.root);
  room203Set.add(shelfGroup);

  // Full-Scale 720mm `HMD-02` Newspaper Silhouette Wall + 12 Glowing Ghost Joint Rings (`あと11個—合計12個`!)
  newsWall.group.position.set(0.08, 0.68, -1.62);
  newsWall.updateSilhouette(1.0);
  room203Set.add(newsWall.group);

  const twelveJointsGroup = new THREE.Group();
  twelveJointsGroup.position.set(0.08, 0.68, -1.602);
  const jointCoords = [
    // 12 Lower-body + hip/knee/ankle & shoulder target circular actuators on the 720mm silhouette!
    [-0.10, 0.56], [0.10, 0.56], // shoulders
    [-0.06, 0.41], [0.06, 0.41], // hip yaw
    [-0.09, 0.38], [0.09, 0.38], // hip pitch
    [-0.075, 0.28], [0.075, 0.28], // knees (right knee = hero #1!)
    [-0.075, 0.16], [0.075, 0.16], // ankle pitch
    [-0.075, 0.11], [0.075, 0.11], // ankle roll
  ];
  const ghostJointMats = [];
  for (let i = 0; i < jointCoords.length; i++) {
    const [jx, jy] = jointCoords[i];
    const isHero = i === 7; // Right knee!
    const jm = new THREE.MeshBasicMaterial({
      color: isHero ? 0x34d399 : 0x38bdf8,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.022, 0.032, 24), jm);
    ring.position.set(jx, jy, 0);
    twelveJointsGroup.add(ring);
    ghostJointMats.push({ mat: jm, isHero });
  }
  room203Set.add(twelveJointsGroup);

  // Winter Condensation Window + Distant Warm Christmas Apartment Lights outside!
  condWindow.group.position.set(1.18, 1.24, -1.61);
  room203Set.add(condWindow.group);

  const xmasAptLights = new THREE.Group();
  xmasAptLights.position.set(1.18, 1.24, -2.15);
  const aptColors = [0xfef08a, 0xfbbf24, 0xf87171, 0x34d399, 0xfde68a];
  for (let i = 0; i < 14; i++) {
    const lw = new THREE.Mesh(
      new THREE.PlaneGeometry(0.05, 0.06),
      new THREE.MeshBasicMaterial({ color: aptColors[i % aptColors.length] })
    );
    lw.position.set(((i % 5) - 2) * 0.14, (Math.floor(i / 5) - 1) * 0.16, 0);
    xmasAptLights.add(lw);
  }
  room203Set.add(xmasAptLights);

  // Main Workbench Desk (`折りたたみ作業机`)
  const deskGroup = new THREE.Group();
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.42, 0.036, 0.78),
    pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x8d6342 })
  );
  deskTop.position.set(0, 0.72, -0.52);
  deskTop.castShadow = true; deskTop.receiveShadow = true;
  for (const lx of [-0.65, 0.65]) {
    for (const lz of [-0.86, -0.18]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.72, 0.038), baseMats.blackAnodized);
      leg.position.set(lx, 0.36, lz);
      deskGroup.add(leg);
    }
  }
  deskGroup.add(deskTop);

  // Mount Bench Vise + Ceramic Mat + 80mm Motor + 46mm Circular Green FOC PCB + 25cm Aluminum Bar on Desk!
  viseJoint.group.position.set(0.02, 0.738, -0.48);
  deskGroup.add(viseJoint.group);

  // Mount Explosion & Smoke Rig squarely at the 46mm circular PCB front face!
  explosionRig.group.position.set(-0.056, 0.845, -0.462);
  deskGroup.add(explosionRig.group);

  // 24V Variable Bench Power Supply on Left of Desk with LIVE Digital LED Display!
  const psuGroup = new THREE.Group();
  psuGroup.position.set(-0.46, 0.738, -0.58);
  psuGroup.rotation.y = 0.28;
  const psuChassis = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.16, 0.22),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.45, metalness: 0.3 })
  );
  psuChassis.position.y = 0.08; psuChassis.castShadow = true;
  const psuFace = new THREE.Mesh(new THREE.PlaneGeometry(0.20, 0.10), screens.psuScreenMat);
  psuFace.position.set(0, 0.10, 0.111);
  const knobV = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.016, 14), baseMats.blackAnodized);
  knobV.rotation.x = Math.PI / 2; knobV.position.set(-0.06, 0.032, 0.115);
  const knobA = knobV.clone(); knobA.position.x = 0.02;
  psuGroup.add(psuChassis, psuFace, knobV, knobA);
  deskGroup.add(psuGroup);

  // Transparent Safety Goggles & Red Mushroom Emergency Stop Button positioned clear of the 25cm aluminum bar tip!
  safetyRig.gogglesGroup.position.set(0.36, 0.738, -0.26);
  safetyRig.gogglesGroup.rotation.y = -0.48;
  safetyRig.eStopGroup.position.set(0.36, 0.738, -0.40);
  deskGroup.add(safetyRig.gogglesGroup, safetyRig.eStopGroup);

  // Trembling Tweezers & SMD chip positioned on right work zone
  tweezersRig.group.position.set(0.16, 0.76, -0.36);
  tweezersRig.group.visible = false;
  deskGroup.add(tweezersRig.group);

  // Laptop on Rear-Right of Desk showing Live FOC Firmware / Spring-Damper Curves!
  const laptopGroup = new THREE.Group();
  laptopGroup.position.set(0.42, 0.738, -0.68);
  laptopGroup.rotation.y = -0.36;
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
  deskGroup.add(laptopGroup);

  room203Set.add(deskGroup);

  // ===========================================================================
  // SET 2: Day 263（12月24日・聖夜）駅前ロータリー 欅並木＆無数の白いイルミネーション!
  // ===========================================================================
  const xmasRotarySet = new THREE.Group();
  xmasRotarySet.visible = false;
  scene.add(xmasRotarySet);

  // Deep starry Christmas Eve night sky dome
  const xmasSkyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, uniforms: {},
    vertexShader: `varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vP; void main(){
      float h = clamp(normalize(vP).y * 1.4 + 0.06, 0.0, 1.0);
      vec3 col = mix(vec3(0.06, 0.10, 0.20), vec3(0.01, 0.02, 0.07), pow(h, 0.65));
      gl_FragColor = vec4(col, 1.0);
    }`,
  });
  xmasRotarySet.add(new THREE.Mesh(new THREE.SphereGeometry(60, 24, 16), xmasSkyMat));

  // Station Rotary Asphalt + Brick Sidewalk + Tactile Blocks (Atlases 46, 80, 85!)
  const rotaryRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 24),
    pbr.get('asphaltFine', { repeatX: 6, repeatY: 6, tint: 0x3b4454 })
  );
  rotaryRoad.rotation.x = -Math.PI / 2; rotaryRoad.receiveShadow = true;
  const sidewalk = new THREE.Mesh(
    new THREE.BoxGeometry(22, 0.10, 6.2),
    pbr.get('herringboneBrick', { repeatX: 8, repeatY: 3, tint: 0x8c7b70 })
  );
  sidewalk.position.set(0, 0.05, -2.8); sidewalk.receiveShadow = true;
  const tactileStrip = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 0.42),
    pbr.get('dualYellowTactileBlock', { repeatX: 28, repeatY: 1 })
  );
  tactileStrip.rotation.x = -Math.PI / 2; tactileStrip.position.set(0, 0.102, -0.35);

  const redPost = spawn('arch_red_postbox_jp'); redPost.position.set(3.2, 0.10, -1.8);
  const stationWall = new THREE.Mesh(
    new THREE.BoxGeometry(14, 5.2, 1.2),
    pbr.get('whiteFacadeTileGrid', { repeatX: 5, repeatY: 2, tint: 0x94a3b8 })
  );
  stationWall.position.set(0, 2.6, -7.2);
  // Warm glowing station windows
  for (let i = -2; i <= 2; i++) {
    const sw = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 1.4),
      new THREE.MeshBasicMaterial({ color: 0xfef08a })
    );
    sw.position.set(i * 2.4, 2.4, -6.58);
    xmasRotarySet.add(sw);
  }
  xmasRotarySet.add(rotaryRoad, sidewalk, tactileStrip, redPost, stationWall);

  // FOUR Tall Winter Zelkova Trees Wrapped in 320 Sparkling WHITE LED Illuminations ("無数の白いイルミネーション")!
  const treePositions = [[-4.2, -1.4], [-1.4, -1.4], [1.6, -1.4], [4.4, -1.4]];
  const barkMat = pbr.get('treeBarkRealistic', { repeatX: 1, repeatY: 3, tint: 0x4b3f35 });
  const grateMat = pbr.get('castIronTreeGrateFull', { repeatX: 1, repeatY: 1 });
  const ledPositions = [];
  for (const [tx, tz] of treePositions) {
    const grate = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.15), grateMat);
    grate.rotation.x = -Math.PI / 2; grate.position.set(tx, 0.103, tz);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 3.2, 12), barkMat);
    trunk.position.set(tx, 1.7, tz);
    xmasRotarySet.add(grate, trunk);

    // Bare winter zelkova crown branches
    for (let b = 0; b < 5; b++) {
      const ba = (b / 5) * Math.PI * 2;
      const br = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.08, 1.9, 8), barkMat);
      br.position.set(tx + Math.cos(ba) * 0.55, 3.55, tz + Math.sin(ba) * 0.55);
      br.rotation.set(Math.sin(ba) * 0.55, 0, -Math.cos(ba) * 0.55);
      xmasRotarySet.add(br);
    }

    // Spiral 80 crisp white/warm-white LED bulbs up trunk & spreading through branches!
    for (let k = 0; k < 80; k++) {
      const frac = k / 80;
      const ang = k * 0.72;
      const rad = frac < 0.55 ? 0.24 - frac * 0.12 : 0.25 + (frac - 0.55) * 2.2;
      const ly = 0.65 + frac * 3.85;
      ledPositions.push([tx + Math.cos(ang) * rad, ly, tz + Math.sin(ang) * rad, k]);
    }
  }
  const ledInst = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.028, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xf8fafc }),
    ledPositions.length
  );
  const _ld = new THREE.Object3D();
  function updateXmasLeds(t) {
    for (let i = 0; i < ledPositions.length; i++) {
      const [lx, ly, lz, seed] = ledPositions[i];
      const twinkle = 0.72 + 0.42 * Math.sin(t * 4.5 + seed * 1.9);
      _ld.position.set(lx, ly, lz);
      _ld.scale.setScalar(twinkle);
      _ld.updateMatrix();
      ledInst.setMatrixAt(i, _ld.matrix);
    }
    ledInst.instanceMatrix.needsUpdate = true;
  }
  xmasRotarySet.add(ledInst);

  // Minato walking home in dark winter coat ("コートの襟を立て、ポケットの中で冷えた右手を握りしめ")
  const minatoXmas = createRealisticHuman(baseMats, {
    role: 'minato_xmas',
    topMat: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.85 }),
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: true,
  });
  minatoXmas.root.position.set(-2.4, 0.10, -2.5);
  minatoXmas.root.rotation.y = Math.PI * 0.48;
  xmasRotarySet.add(minatoXmas.root);

  // Passing Couple / Family carrying a WHITE CHRISTMAS CAKE BOX ("白いケーキの箱を大事そうに提げた家族連れ")
  const passerA = createRealisticHuman(baseMats, {
    role: 'xmas_passer_a',
    topMat: new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.8 }),
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  const scarfA = new THREE.Mesh(
    new THREE.TorusGeometry(0.10, 0.032, 8, 18),
    new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.9 })
  );
  scarfA.rotation.x = Math.PI / 2; scarfA.position.set(0, 1.42, 0);
  passerA.root.add(scarfA);
  // White Christmas cake box held warmly in passerA's right hand!
  const cakeBox = new THREE.Group();
  const boxBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.15, 0.22),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.55 })
  );
  const redRibbon1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.226, 0.154, 0.022),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
  );
  const redRibbon2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.022, 0.154, 0.226),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
  );
  cakeBox.add(boxBody, redRibbon1, redRibbon2);
  cakeBox.position.set(0.04, -0.14, 0.04);
  passerA.rightArm.wrist.add(cakeBox);
  passerA.root.position.set(1.8, 0.10, -3.4);
  passerA.root.rotation.y = -Math.PI * 0.52;
  xmasRotarySet.add(passerA.root);

  const passerB = createRealisticHuman(baseMats, {
    role: 'xmas_passer_b',
    topMat: new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.82 }),
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  const scarfB = new THREE.Mesh(
    new THREE.TorusGeometry(0.10, 0.030, 8, 18),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.9 })
  );
  scarfB.rotation.x = Math.PI / 2; scarfB.position.set(0, 1.42, 0);
  passerB.root.add(scarfB);
  passerB.root.position.set(2.35, 0.10, -3.8);
  passerB.root.rotation.y = -Math.PI * 0.52;
  xmasRotarySet.add(passerB.root);

  // ===========================================================================
  // SET 3: Day 270（大晦日・実家帰省）白い霜柱の田舎道 ＋ 温かい実家の畳こたつ・年越しそば・父のみかん籠!
  // ===========================================================================
  const frostHomeSet = new THREE.Group();
  frostHomeSet.visible = false;
  scene.add(frostHomeSet);

  // Sub-zone A (z = +5..+14): Dusk Rural Countryside Lane with Crystalline 3D White Frost Pillars ("白い霜柱")!
  const duskSkyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, uniforms: {},
    vertexShader: `varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vP; void main(){
      float h = clamp(normalize(vP).y * 1.4 + 0.06, 0.0, 1.0);
      vec3 col = mix(vec3(0.88, 0.60, 0.44), vec3(0.16, 0.24, 0.48), pow(h, 0.55));
      gl_FragColor = vec4(col, 1.0);
    }`,
  });
  frostHomeSet.add(new THREE.Mesh(new THREE.SphereGeometry(60, 24, 16), duskSkyMat));

  const ruralGround = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 16),
    pbr.get('frostedWinterGrass', { repeatX: 6, repeatY: 4 })
  );
  ruralGround.rotation.x = -Math.PI / 2; ruralGround.position.set(0, 0, 8.0);
  const ruralRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 16),
    pbr.get('crackedDarkAsphalt', { repeatX: 2, repeatY: 6 })
  );
  ruralRoad.rotation.x = -Math.PI / 2; ruralRoad.position.set(0, 0.015, 8.0);
  frostHomeSet.add(ruralGround, ruralRoad);

  // Crystalline 3D Frost Pillars (`白い霜柱`) sparkling along the frosted field edge!
  const frostMat = new THREE.MeshStandardMaterial({ color: 0xf0f9ff, roughness: 0.16, metalness: 0.1, emissive: 0x38bdf8, emissiveIntensity: 0.15 });
  for (let i = 0; i < 42; i++) {
    const fx = (i % 2 === 0 ? -1.78 : 1.78) + ((i * 0.13) % 0.45) - 0.22;
    const fz = 4.6 + (i * 0.21);
    const fh = 0.045 + (i % 4) * 0.018;
    const crystal = new THREE.Mesh(new THREE.ConeGeometry(0.016, fh, 5), frostMat);
    crystal.position.set(fx, fh * 0.5, fz);
    frostHomeSet.add(crystal);
  }

  // Minato walking down the frosty rural lane carrying his small Boston bag ("小さなボストンバッグ")
  const minatoHomeWalk = createRealisticHuman(baseMats, {
    role: 'minato_home_walk',
    topMat: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85 }),
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  const bostonBag = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.24, 0.40),
    new THREE.MeshStandardMaterial({ color: 0x3f2e21, roughness: 0.72 })
  );
  bostonBag.position.set(0.06, -0.14, 0.0);
  minatoHomeWalk.rightArm.wrist.add(bostonBag);
  minatoHomeWalk.root.position.set(0.0, 0, 9.2);
  minatoHomeWalk.root.rotation.y = Math.PI;
  frostHomeSet.add(minatoHomeWalk.root);

  // Sub-zone B (z = -3..+3): Warm Japanese Family Home Tatami Living Room (`実家の居間のこたつ`)!
  const tatamiRoom = new THREE.Group();
  const tatamiFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.6, 5.2),
    pbr.get('tatamiBordered', { repeatX: 3, repeatY: 3 })
  );
  tatamiFloor.rotation.x = -Math.PI / 2; tatamiFloor.position.set(0, 0.02, -0.5);
  tatamiFloor.receiveShadow = true;

  const shojiBack = new THREE.Mesh(
    new THREE.PlaneGeometry(5.6, 2.7),
    pbr.get('shojiPaperScreen', { repeatX: 3, repeatY: 1 })
  );
  shojiBack.position.set(0, 1.37, -2.6);
  const plasterSideL = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 2.7),
    pbr.get('earthenPlasterWall', { repeatX: 3, repeatY: 1 })
  );
  plasterSideL.rotation.y = Math.PI / 2; plasterSideL.position.set(-2.7, 1.37, -0.5);
  const norenBanner = new THREE.Mesh(
    new THREE.PlaneGeometry(1.15, 0.65),
    pbr.get('indigoAsanohaNoren', { repeatX: 1, repeatY: 1 })
  );
  norenBanner.position.set(1.55, 2.02, -2.56);
  const bonsai = new THREE.Mesh(
    new THREE.PlaneGeometry(0.56, 0.56),
    pbr.get('pottedJapanesePineBonsai', { repeatX: 1, repeatY: 1 })
  );
  bonsai.position.set(-1.72, 0.92, -2.55);

  // Warm Corner Television playing New Year's Eve Song Show!
  const tvGroup = new THREE.Group();
  tvGroup.position.set(1.68, 0.45, -1.95);
  tvGroup.rotation.y = -0.52;
  const tvCabinet = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.56, 0.14), baseMats.blackAnodized);
  const tvFace = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 0.48), screens.tvScreenMat);
  tvFace.position.z = 0.072;
  tvGroup.add(tvCabinet, tvFace);

  kotatsuProps.group.position.set(0.0, 0.02, -0.45);
  tatamiRoom.add(tatamiFloor, shojiBack, plasterSideL, norenBanner, bonsai, tvGroup, kotatsuProps.group);

  // Father seated opposite at the kotatsu ("向かいに座る父") + Minato seated in front ("こたつで年越しそばをすする湊")!
  const fatherHome = createRealisticHuman(baseMats, {
    role: 'father_home',
    topMat: new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.88 }),
    pantsMat: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 }),
    hairMat: new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.85 }),
    hasBackpack: false,
  });
  fatherHome.root.position.set(0.02, -0.52, -1.26);
  fatherHome.root.rotation.y = 0.0;
  fatherHome.leftLeg.hipJoint.rotation.x = -1.45;
  fatherHome.rightLeg.hipJoint.rotation.x = -1.45;
  // Father's newspaper held in left hand
  const dadPaper = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.24, 0.008),
    new THREE.MeshStandardMaterial({ color: 0xe7e5e4, roughness: 0.92 })
  );
  dadPaper.position.set(-0.24, 0.56, -0.94);
  dadPaper.rotation.set(-0.22, 0.35, 0);
  tatamiRoom.add(fatherHome.root, dadPaper);

  const minatoKotatsu = createRealisticHuman(baseMats, {
    role: 'minato_kotatsu',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoKotatsu.root.position.set(-0.14, -0.52, 0.38);
  minatoKotatsu.root.rotation.y = Math.PI;
  minatoKotatsu.leftLeg.hipJoint.rotation.x = -1.45;
  minatoKotatsu.rightLeg.hipJoint.rotation.x = -1.45;
  tatamiRoom.add(minatoKotatsu.root);

  // Mother smiling near kitchen doorway ("玄関で出迎えてくれた母")
  const motherHome = createRealisticHuman(baseMats, {
    role: 'mother_home',
    topMat: new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.85 }),
    pantsMat: new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.88 }),
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  motherHome.root.position.set(1.25, 0.02, -1.35);
  motherHome.root.rotation.y = -0.68;
  tatamiRoom.add(motherHome.root);

  frostHomeSet.add(tatamiRoom);

  // ===========================================================================
  // SET 4: 2階の古い子供部屋 — 銀色の目覚まし時計『チッ…チッ…』＋『隙間』の気づき＋元日の切り餅!
  // ===========================================================================
  const childhoodRoomSet = new THREE.Group();
  childhoodRoomSet.visible = false;
  scene.add(childhoodRoomSet);

  const childFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(4.6, 4.6),
    pbr.get('tatamiWoven', { repeatX: 3, repeatY: 3 })
  );
  childFloor.rotation.x = -Math.PI / 2; childFloor.receiveShadow = true;
  const childWall = new THREE.Mesh(
    new THREE.PlaneGeometry(4.8, 2.8),
    pbr.get('weatheredLinenWall', { repeatX: 3, repeatY: 2 })
  );
  childWall.position.set(0, 1.4, -1.6);

  // High-school Wooden Study Desk (`高校時代まで使っていた学習机`)
  const studyDesk = new THREE.Mesh(
    new THREE.BoxGeometry(1.18, 0.04, 0.66),
    pbr.get('darkRusticPlanks', { repeatX: 2, repeatY: 1, tint: 0x9c724c })
  );
  studyDesk.position.set(0, 0.72, -1.12);
  studyDesk.castShadow = true; studyDesk.receiveShadow = true;
  for (const dx of [-0.54, 0.54]) {
    const dl = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.72, 0.58), pbr.get('darkRusticPlanks'));
    dl.position.set(dx, 0.36, -1.12);
    childhoodRoomSet.add(dl);
  }

  // Mount Old Silver Twin-Bell Alarm Clock squarely on the study desk!
  alarmClock.group.position.set(0.0, 0.74, -1.04);
  childhoodRoomSet.add(childFloor, childWall, studyDesk, alarmClock.group);

  // Mother's Wrapped Kirimoji Rice Cakes (`母が持たせてくれた切り餅の包み`) for Jan 2 Departure Beat!
  const kirimojiGroup = new THREE.Group();
  kirimojiGroup.position.set(0.32, 0.74, -0.96);
  const furoshiki = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.095, 0.16),
    pbr.get('floralStripFabric', { repeatX: 1, repeatY: 1, tint: 0xfef3c7 })
  );
  furoshiki.position.y = 0.048;
  const knot = new THREE.Mesh(
    new THREE.SphereGeometry(0.028, 10, 8),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.75 })
  );
  knot.position.y = 0.105;
  kirimojiGroup.add(furoshiki, knot);
  kirimojiGroup.visible = false;
  childhoodRoomSet.add(kirimojiGroup);

  // Clean set switcher
  function setActiveSet(name) {
    room203Set.visible = name === 'room203';
    xmasRotarySet.visible = name === 'xmasRotary';
    frostHomeSet.visible = name === 'frostHome';
    childhoodRoomSet.visible = name === 'childhood';
  }

  return {
    setActiveSet,
    deskGroup,
    shelfGroup,
    laptopGroup,
    psuGroup,
    viseJoint,
    safetyRig,
    explosionRig,
    tweezersRig,
    newsWall,
    twelveJointsGroup,
    ghostJointMats,
    condWindow,
    xmasAptLights,
    macroHand,
    updateXmasLeds,
    minatoXmas,
    passerA,
    passerB,
    minatoHomeWalk,
    kotatsuProps,
    fatherHome,
    minatoKotatsu,
    motherHome,
    alarmClock,
    kirimojiGroup,
  };
}
