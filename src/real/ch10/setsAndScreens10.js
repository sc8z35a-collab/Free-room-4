import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createNextGenHandRig } from '../nextgen/pbrMicroTextures.js';
import { createHMD01Rev18Fighter } from '../ch09/hmd01Rev18Rig.js';
import {
  createSakakibaraQddHumanoid,
  createSpareQddDiscMacro,
  createCh10StoryProps,
} from './qddAndHallProps.js';

/**
 * Dynamic Arena Scoreboard + Pit Number Plates + Orion Star Sky Canvas Textures!
 */
export function createCh10Screens() {
  // 1. Massive Overhead Arena Digital Scoreboard ("ENTRY No.38 佐伯 湊 -> 09.12 s CLEAR!!")
  const sbC = document.createElement('canvas');
  sbC.width = 1024; sbC.height = 384;
  const sbx = sbC.getContext('2d');
  const sbTex = new THREE.CanvasTexture(sbC);
  sbTex.colorSpace = THREE.SRGBColorSpace;

  let lastKey = '';
  function updateScoreboard(mode, timeSec = 0) {
    const key = `${mode}_${timeSec.toFixed(2)}`;
    if (key === lastKey) return;
    lastKey = key;

    sbx.fillStyle = '#07101f';
    sbx.fillRect(0, 0, 1024, 384);
    sbx.strokeStyle = mode === 'clear' ? '#10b981' : (mode === 'qdd' ? '#38bdf8' : (mode === 'shatter' ? '#ef4444' : '#60a5fa'));
    sbx.lineWidth = 10;
    sbx.strokeRect(10, 10, 1004, 364);

    if (mode === 'run' || mode === 'clear') {
      sbx.fillStyle = '#93c5fd'; sbx.font = '700 28px sans-serif';
      sbx.fillText('第19回 全日本アマチュア二足歩行競技会 · 規定審査 (3.0m)', 42, 60);
      sbx.fillStyle = '#f8fafc'; sbx.font = '800 38px sans-serif';
      sbx.fillText('No.38  佐伯 湊（個人・大学1年）  [HMD-01]', 42, 122);
      sbx.fillStyle = mode === 'clear' ? '#34d399' : '#f8fafc';
      sbx.font = '900 132px monospace';
      sbx.fillText(`${timeSec.toFixed(2).padStart(5, '0')} s`, 64, 276);
      sbx.fillStyle = mode === 'clear' ? '#10b981' : '#f59e0b';
      sbx.font = '900 44px sans-serif';
      sbx.fillText(mode === 'clear' ? '★ ゴール完走！ CLEAR!!' : 'AUTONOMOUS WALKING...', 520, 260);
      sbx.fillStyle = '#cbd5e1'; sbx.font = '700 24px monospace';
      sbx.fillText('PRONE GET-UP: PASS (IMU REFLEX SAVE)  |  STEPS: 34', 42, 342);
    } else if (mode === 'shatter') {
      sbx.fillStyle = '#fca5a5'; sbx.font = '800 30px sans-serif';
      sbx.fillText('実環境・外乱テストセッション  |  300g ウレタン振り子衝突', 42, 68);
      sbx.fillStyle = '#ef4444'; sbx.font = '900 76px sans-serif';
      sbx.fillText('右膝ギア破損 · 停止', 42, 188);
      sbx.fillStyle = '#e2e8f0'; sbx.font = '700 30px sans-serif';
      sbx.fillText('高減速比ギア（非バックドライバブル）の限界：逃げ場のない衝撃', 42, 272);
      sbx.fillStyle = '#94a3b8'; sbx.font = '700 24px monospace';
      sbx.fillText('ENTRY No.38  HMD-01  —  RIGID POSITION-CONTROL GEAR FAILURE', 42, 336);
    } else {
      sbx.fillStyle = '#7dd3fc'; sbx.font = '800 30px sans-serif';
      sbx.fillText('実環境・外乱テストセッション  |  ENTRY No.39 榊原 恒一', 42, 68);
      sbx.fillStyle = '#38bdf8'; sbx.font = '900 68px sans-serif';
      sbx.fillText('QDD柔軟関節 ＋ クロスステップ反射', 42, 184);
      sbx.fillStyle = '#e0f2fe'; sbx.font = '700 30px sans-serif';
      sbx.fillText('横突き飛ばし衝撃吸収 → 0.2秒で左脚交差踏み出し・完全復帰！！', 42, 268);
      sbx.fillStyle = '#34d399'; sbx.font = '700 24px monospace';
      sbx.fillText('BACKDRIVABLE TORQUE CONTROL + RL NEURAL POLICY · 650mm', 42, 336);
    }
    sbTex.needsUpdate = true;
  }
  updateScoreboard('run', 0);
  const scoreboardMat = new THREE.MeshBasicMaterial({ map: sbTex });

  // 2. Pit Table Number Cards (`No. 37`, `No. 38`, `No. 39`)
  function makePitPlateMat(numStr, subStr, accent = '#1e3a8a') {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 128;
    const x = c.getContext('2d');
    x.fillStyle = '#ffffff'; x.fillRect(0, 0, 256, 128);
    x.fillStyle = accent; x.fillRect(0, 0, 256, 28);
    x.fillStyle = '#0f172a'; x.font = '900 50px monospace'; x.fillText(numStr, 26, 84);
    x.fillStyle = '#475569'; x.font = '700 18px sans-serif'; x.fillText(subStr, 18, 114);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.78 });
  }

  // 3. Crisp November Night Sky with Orion Constellation ("冬の星座であるオリオン座")!
  const skyC = document.createElement('canvas');
  skyC.width = 512; skyC.height = 512;
  const kx = skyC.getContext('2d');
  const grd = kx.createLinearGradient(0, 0, 0, 512);
  grd.addColorStop(0, '#030816');
  grd.addColorStop(0.65, '#0b1936');
  grd.addColorStop(1, '#162749');
  kx.fillStyle = grd; kx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 140; i++) {
    const sx = ((i * 197) % 500) + 6;
    const sy = ((i * 313) % 480) + 10;
    const r = (i % 5 === 0) ? 1.8 : 0.9;
    kx.fillStyle = `rgba(226,232,240,${0.35 + (i % 6) * 0.1})`;
    kx.beginPath(); kx.arc(sx, sy, r, 0, Math.PI * 2); kx.fill();
  }
  const orionStars = [
    { x: 185, y: 122, r: 6.2, col: '#fdba74' }, // Betelgeuse
    { x: 332, y: 142, r: 4.8, col: '#e0f2fe' }, // Bellatrix
    { x: 228, y: 248, r: 4.4, col: '#bae6fd' }, // Alnitak
    { x: 256, y: 238, r: 4.5, col: '#bae6fd' }, // Alnilam
    { x: 284, y: 228, r: 4.4, col: '#bae6fd' }, // Mintaka
    { x: 196, y: 368, r: 4.5, col: '#e0f2fe' }, // Saiph
    { x: 344, y: 356, r: 6.4, col: '#7dd3fc' }, // Rigel
  ];
  kx.strokeStyle = 'rgba(125,211,252,0.26)'; kx.lineWidth = 1.6;
  const links = [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [5, 6]];
  for (const [a, b] of links) {
    kx.beginPath();
    kx.moveTo(orionStars[a].x, orionStars[a].y);
    kx.lineTo(orionStars[b].x, orionStars[b].y);
    kx.stroke();
  }
  for (const st of orionStars) {
    const sg = kx.createRadialGradient(st.x, st.y, 0, st.x, st.y, st.r * 3.4);
    sg.addColorStop(0, st.col);
    sg.addColorStop(0.35, st.col);
    sg.addColorStop(1, 'rgba(0,0,0,0)');
    kx.fillStyle = sg;
    kx.beginPath(); kx.arc(st.x, st.y, st.r * 3.4, 0, Math.PI * 2); kx.fill();
  }
  const orionTex = new THREE.CanvasTexture(skyC); orionTex.colorSpace = THREE.SRGBColorSpace;
  const orionSkyMat = new THREE.MeshBasicMaterial({ map: orionTex });

  return {
    scoreboardMat,
    updateScoreboard,
    pit37Mat: makePitPlateMat('No. 37', '東工大ロボティクス部', '#dc2626'),
    pit38Mat: makePitPlateMat('No. 38', '個人・佐伯 湊 [HMD-01]', '#0f172a'),
    pit39Mat: makePitPlateMat('No. 39', '個人・榊原 恒一', '#0284c7'),
    orionSkyMat,
  };
}

/**
 * Builds ALL 3 Monumental Chapter 10 Sets powered by the 320-Asset Master Library & 73-Atlas (657-Tile) Photographic PBR Engine!
 * 1. `room203Set`: Spotless Sat-night desk (pegboard + corkboard + blueprint + lamp), Hard Case packing, Bedside Futon + Wired Frosted Window, Honored Top Bookshelf + Orion Sky Window + Blank HMD-02 Notebook!
 * 2. `hamamatsuchoExtSet`: Glass-walled Industrial Trade Center skyscraper under crisp cloudless November blue sky + interlocking plaza + golden ginkgo carpets + cast-iron tree grates + manhole + recycling bins + 90 swirling ginkgo leaves!
 * 3. `exhibitionHallSet`: Blazing-white Exhibition Hall (photographic terrazzo floor, recessed fluorescent ceiling panels, Pit Row No.37/38/39, Sakakibara & 65cm QDD, Central Waxed Arena + Red 3m Goal Line + Overhead Scoreboard + Balcony Kurata Thumbs-Up + 300g Pendulum Disturbance Mat!)
 */
export function createCh10World(scene, baseMats, ngMats, screens, masterLib) {
  const { pbr, spawn } = masterLib;

  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats, masterLib);
  heroFighter.setBattleState({ scratched: true, hipCracked: false, silverSplints: true });
  const qddBot = createSakakibaraQddHumanoid(baseMats, heroFighter.aluSplintMat);
  const spareQddMacro = createSpareQddDiscMacro(baseMats);
  const props = createCh10StoryProps(baseMats, ngMats);

  // Next-Gen Fingernail-Detailed Right Hand (wiping HMD-01, touching cold hard case, spinning spare QDD disc!)
  const macroHand = createNextGenHandRig(baseMats, ngMats, 1);
  macroHand.group.visible = false;
  scene.add(macroHand.group);

  // ===========================================================================
  // SET 1: 『コーポ武蔵野』203号室 — 前夜祭の綺麗な机・枕元ハードケース・本棚殿堂入り・オリオン座・HMD-02ノート!
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
    new THREE.PlaneGeometry(5.0, 2.9),
    pbr.get('wallpaperWhiteWoven', { repeatX: 4, repeatY: 2 })
  );
  backWall.position.set(0, 1.45, -1.65);
  const baseboard = new THREE.Mesh(
    new THREE.BoxGeometry(5.0, 0.09, 0.03),
    pbr.get('darkRusticPlanks', { repeatX: 4, repeatY: 1 })
  );
  baseboard.position.set(0, 0.045, -1.63);
  room203Set.add(backWall, baseboard);

  // Spotless Photographic Walnut Workbench (top y = 0.720m, z = -0.55m)
  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 0, -0.55);
  room203Set.add(deskGroup);

  const deskMesh = spawn('arch_walnut_workbench');
  const deskLamp = spawn('prop_desk_lamp_led'); deskLamp.position.set(-0.54, 0.72, -0.22);
  const pegboard = spawn('arch_hardware_tool_pegboard'); pegboard.position.set(0.0, 1.25, -0.365);
  const corkboard = spawn('arch_cork_pinboard_wall'); corkboard.position.set(-0.88, 1.26, -0.365);
  const blueprint = spawn('arch_blueprint_poster'); blueprint.position.set(0.76, 1.26, -0.365);
  deskGroup.add(deskMesh, deskLamp, pegboard, corkboard, blueprint);

  // Mount Hard Case, Maintenance Tools, and Blank HMD-02 Notebook on Desk
  props.hardCase.position.set(0.0, 0.720, 0.0);
  props.hardCase.visible = false;
  props.maintenanceTools.position.set(0.0, 0.720, 0.04);
  props.maintenanceTools.visible = false;
  props.hmd02Notebook.position.set(0.0, 0.725, 0.04);
  props.hmd02Notebook.visible = false;
  props.mechPencil.position.set(0.04, 0.755, 0.05);
  props.mechPencil.rotation.set(0.45, 0.2, -0.35);
  props.mechPencil.visible = false;
  deskGroup.add(props.hardCase, props.maintenanceTools, props.hmd02Notebook, props.mechPencil);

  // Bedside Futon + Pillow + Wired Frosted Glass Window for Nov 5 Midnight Scene!
  const bedsideGroup = new THREE.Group();
  bedsideGroup.visible = false;
  const futon = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 0.09, 1.85),
    pbr.get('stripedQuiltMattress', { repeatX: 2, repeatY: 2, tint: 0x6b7c93 })
  );
  futon.position.set(-0.32, 0.045, 0.65);
  const pillow = spawn('prop_pillow_blue'); pillow.position.set(-0.32, 0.115, 0.02);
  const wiredWin = spawn('arch_wired_glass_window'); wiredWin.position.set(-0.2, 0.98, -1.60);
  // Cold black hard case resting right beside Minato's pillow!
  const bedsideCase = props.hardCase.clone();
  bedsideCase.position.set(0.42, 0.0, 0.14);
  bedsideCase.rotation.y = -0.22;
  bedsideGroup.add(futon, pillow, wiredWin, bedsideCase);
  room203Set.add(bedsideGroup);

  // Honored Bookshelf Top Shelf ("本棚の一番上の段 — 特等席") + Crisp Orion Starry Night Window!
  const retirementGroup = new THREE.Group();
  retirementGroup.visible = false;
  const shelfWood = pbr.get('parquetWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x9c724c });
  const shelfTop = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.026, 0.34), shelfWood);
  shelfTop.position.set(-0.22, 1.24, -1.35);
  shelfTop.receiveShadow = true;
  const shelfMid = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.024, 0.34), shelfWood);
  shelfMid.position.set(-0.22, 0.92, -1.35);
  const shelfL = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.68, 0.34), shelfWood);
  shelfL.position.set(-0.70, 0.92, -1.35);
  const shelfR = shelfL.clone(); shelfR.position.x = 0.26;
  retirementGroup.add(shelfTop, shelfMid, shelfL, shelfR);

  const bookCols = [0x1e3a8a, 0x991b1b, 0x065f46, 0x334155, 0x854d0e];
  for (let b = 0; b < 5; b++) {
    const bk = new THREE.Mesh(
      new THREE.BoxGeometry(0.032, 0.21 + (b % 2) * 0.02, 0.16),
      new THREE.MeshStandardMaterial({ color: bookCols[b], roughness: 0.85 })
    );
    bk.position.set(-0.62 + b * 0.036, 1.355, -1.36);
    retirementGroup.add(bk);
  }
  props.certCard.position.set(-0.04, 1.305, -1.33);
  props.certCard.rotation.set(-0.18, -0.18, 0);
  retirementGroup.add(props.certCard);

  // Night Window right beside Bookshelf revealing sparkling Orion Constellation!
  const orionPane = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 0.96), screens.orionSkyMat);
  orionPane.position.set(0.86, 1.48, -1.61);
  const orionFrameT = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.04, 0.05), baseMats.darkAnodized);
  orionFrameT.position.set(0.86, 1.96, -1.59);
  const orionFrameB = orionFrameT.clone(); orionFrameB.position.y = 1.00;
  const orionFrameL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.00, 0.05), baseMats.darkAnodized);
  orionFrameL.position.set(0.37, 1.48, -1.59);
  const orionFrameR = orionFrameL.clone(); orionFrameR.position.x = 1.35;
  retirementGroup.add(orionPane, orionFrameT, orionFrameB, orionFrameL, orionFrameR);
  room203Set.add(retirementGroup);

  // ===========================================================================
  // SET 2: 浜松町・産業貿易センター外観 — 11月の青空・ガラス巨大ビル・銀杏絨毯＆90枚舞う落ち葉!
  // ===========================================================================
  const hamamatsuchoExtSet = new THREE.Group();
  hamamatsuchoExtSet.visible = false;
  scene.add(hamamatsuchoExtSet);

  const blueSkyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {},
    vertexShader: `varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vP; void main(){
      float h = clamp(normalize(vP).y * 1.4 + 0.08, 0.0, 1.0);
      vec3 col = mix(vec3(0.68, 0.86, 0.98), vec3(0.11, 0.34, 0.72), pow(h, 0.65));
      gl_FragColor = vec4(col, 1.0);
    }`,
  });
  hamamatsuchoExtSet.add(new THREE.Mesh(new THREE.SphereGeometry(55, 24, 16), blueSkyMat));

  // Summon entire photographic Hamamatsucho Trade Plaza from Master Library!
  const plazaPrefab = spawn('loc_hamamatsucho_trade_plaza');
  hamamatsuchoExtSet.add(plazaPrefab);

  // Extra street realism from Batches 4–5 (Manhole, Recycle Bins, Utility Pole, Guardrail)
  const plazaManhole = spawn('arch_seigaiha_manhole'); plazaManhole.position.set(1.45, 0.008, 1.2);
  const plazaBins = spawn('arch_tricolor_recycle_bins'); plazaBins.position.set(-4.3, 0, -4.1); plazaBins.rotation.y = 0.25;
  const plazaPole = spawn('arch_galvanized_utility_pole', { h: 6.2 }); plazaPole.position.set(4.5, 0, -1.6);
  hamamatsuchoExtSet.add(plazaManhole, plazaBins, plazaPole);

  // Towering Reflective Glass Curtain Wall behind Entrance Signage
  const glassFacadeMat = new THREE.MeshPhysicalMaterial({
    color: 0x60a5fa,
    roughness: 0.12,
    metalness: 0.85,
    clearcoat: 0.9,
  });
  const mullionMat = pbr.get('brushedAluHairline');
  const bldgCore = new THREE.Mesh(new THREE.BoxGeometry(11.8, 14.5, 3.8), glassFacadeMat);
  bldgCore.position.set(0, 7.25, -7.6);
  hamamatsuchoExtSet.add(bldgCore);
  for (let gx = -5; gx <= 5; gx++) {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.12, 14.5, 0.16), mullionMat);
    col.position.set(gx * 1.05, 7.25, -5.66);
    hamamatsuchoExtSet.add(col);
  }
  for (let gy = 1; gy <= 8; gy++) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.14, 0.18), mullionMat);
    beam.position.set(0, gy * 1.6, -5.65);
    hamamatsuchoExtSet.add(beam);
  }

  // Entrance Signage ("東京都立 産業貿易センター 浜松町館")
  const signC = document.createElement('canvas');
  signC.width = 512; signC.height = 96;
  const sgx = signC.getContext('2d');
  sgx.fillStyle = '#0f172a'; sgx.fillRect(0, 0, 512, 96);
  sgx.fillStyle = '#f8fafc'; sgx.font = '800 32px sans-serif'; sgx.fillText('産業貿易センター 浜松町館', 44, 52);
  sgx.fillStyle = '#38bdf8'; sgx.font = '700 18px monospace'; sgx.fillText('19th ALL-JAPAN BIPED ROBOT COMPETITION', 52, 82);
  const signTex = new THREE.CanvasTexture(signC); signTex.colorSpace = THREE.SRGBColorSpace;
  const entranceSign = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 0.78), new THREE.MeshBasicMaterial({ map: signTex }));
  entranceSign.position.set(0, 2.55, -5.50);
  hamamatsuchoExtSet.add(entranceSign);

  // 90 Instanced Swirling Yellow Ginkgo Leaves!
  const leafInst = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(0.055, 0.055),
    new THREE.MeshBasicMaterial({ color: 0xfde047, side: THREE.DoubleSide }),
    90
  );
  const _lDummy = new THREE.Object3D();
  function updateGinkgoLeaves(t) {
    for (let i = 0; i < 90; i++) {
      const lx = ((i * 0.67 + t * 0.85) % 8.4) - 4.2;
      const ly = 0.05 + Math.abs(Math.sin(t * 1.1 + i)) * 2.8;
      const lz = -3.8 + ((i * 0.43) % 6.2);
      _lDummy.position.set(lx, ly, lz);
      _lDummy.rotation.set(t * 2.4 + i, t * 1.9 + i * 0.7, i);
      _lDummy.updateMatrix();
      leafInst.setMatrixAt(i, _lDummy.matrix);
    }
    leafInst.instanceMatrix.needsUpdate = true;
  }
  hamamatsuchoExtSet.add(leafInst);

  // Minato walking toward the Trade Center carrying his black hard case!
  const minatoExt = createRealisticHuman(baseMats, {
    role: 'minato_ext',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: true,
  });
  // Black hard case hanging in Minato's right hand!
  const carryCase = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.34, 0.44),
    new THREE.MeshPhysicalMaterial({ color: 0x161920, roughness: 0.38, metalness: 0.18 })
  );
  carryCase.position.set(0.02, -0.22, 0.02);
  minatoExt.rightArm.wrist.add(carryCase);
  minatoExt.root.position.set(-0.35, 0, -0.8);
  minatoExt.root.rotation.y = Math.PI;
  hamamatsuchoExtSet.add(minatoExt.root);

  // ===========================================================================
  // SET 3: 浜松町 巨大真っ白展示ホール — 実写テラゾ床・蛍光灯天井・ピットNo.37/38/39・榊原・規定ステージ・倉田・300g振り子!
  // ===========================================================================
  const exhibitionHallSet = new THREE.Group();
  exhibitionHallSet.visible = false;
  scene.add(exhibitionHallSet);

  // Vast Glossy Photographic Terrazzo Exhibition Floor (Atlas 47!)
  const hallFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 26),
    pbr.get('lightTerrazzoHallFloor', { repeatX: 12, repeatY: 13, roughness: 0.22 })
  );
  hallFloor.rotation.x = -Math.PI / 2;
  hallFloor.receiveShadow = true;
  exhibitionHallSet.add(hallFloor);

  // Photographic Architectural Concrete Hall Walls (Atlas 15!)
  const whiteWallMat = pbr.get('archWhiteConcrete', { repeatX: 6, repeatY: 2, tint: 0xf4f7fb });
  const hallBackWall = new THREE.Mesh(new THREE.PlaneGeometry(24, 7.5), whiteWallMat);
  hallBackWall.position.set(0, 3.75, -7.8);
  const hallSideL = new THREE.Mesh(new THREE.PlaneGeometry(24, 7.5), whiteWallMat);
  hallSideL.rotation.y = Math.PI / 2; hallSideL.position.set(-10, 3.75, 0);
  const hallSideR = hallSideL.clone(); hallSideR.rotation.y = -Math.PI / 2; hallSideR.position.x = 10;
  exhibitionHallSet.add(hallBackWall, hallSideL, hallSideR);

  // Photographic Recessed Fluorescent Ceiling Light Strips (Atlas 60!)
  const ceilPanelMat = pbr.get('recessedFluorescentPanel', { repeatX: 10, repeatY: 1 });
  for (const cz of [-5.5, -2.5, 0.5, 3.5]) {
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(14, 0.65), ceilPanelMat);
    strip.rotation.x = Math.PI / 2;
    strip.position.set(0, 6.2, cz);
    exhibitionHallSet.add(strip);
  }

  // --- PIT ROW AREA (Located at z = -4.2, x = -2.2 .. +2.2) ---
  const pitRowGroup = new THREE.Group();
  pitRowGroup.position.set(0, 0, -4.2);
  exhibitionHallSet.add(pitRowGroup);

  const tableWhiteMat = pbr.get('cleanWhiteTerrazzo', { repeatX: 2, repeatY: 1, roughness: 0.52 });
  function makePitTable(xPos, width, plateMat) {
    const g = new THREE.Group();
    g.position.set(xPos, 0, 0);
    const top = new THREE.Mesh(new THREE.BoxGeometry(width, 0.032, 0.65), tableWhiteMat);
    top.position.y = 0.72;
    top.castShadow = true; top.receiveShadow = true;
    for (const lx of [-width * 0.44, width * 0.44]) {
      for (const lz of [-0.26, 0.26]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.71, 8), baseMats.chromeSteel);
        leg.position.set(lx, 0.355, lz);
        g.add(leg);
      }
    }
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.16), plateMat);
    plate.position.set(0, 0.60, 0.33);
    g.add(top, plate);
    return g;
  }

  // Pit No. 37 (University Team with shiny Red & Blue CNC Metallic Robots + Duralumin Case!)
  const pit37 = makePitTable(-1.75, 1.55, screens.pit37Mat);
  props.redCncBot.position.set(-0.36, 0.736, -0.04);
  props.blueCncBot.position.set(0.32, 0.736, -0.04);
  const duraluminCase = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.12, 0.28), pbr.get('brushedAluHairline'));
  duraluminCase.position.set(-0.02, 0.796, 0.14);
  pit37.add(props.redCncBot, props.blueCncBot, duraluminCase);
  pitRowGroup.add(pit37);

  // Pit No. 38 (Minato's Lonely 90cm White Pipe Table & Single Folding Chair!)
  const pit38 = makePitTable(0.0, 0.92, screens.pit38Mat);
  const pit38Chair = spawn('arch_folding_chair');
  pit38Chair.position.set(0, 0, -0.58);
  const pit38Case = props.hardCase.clone();
  pit38Case.position.set(-0.20, 0.736, 0.06);
  pit38Case.scale.setScalar(0.85);
  pit38.add(pit38Chair, pit38Case);
  pitRowGroup.add(pit38);

  // Pit No. 39 (Sakakibara Koichi — Plaid Flannel Shirt, Canned Black Coffee, 65cm QDD Stand!)
  const pit39 = makePitTable(1.25, 1.15, screens.pit39Mat);
  const coffeeCan = spawn('prop_coffee_can_black');
  coffeeCan.position.set(-0.32, 0.788, 0.14);
  const coffeeLabel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0268, 0.0268, 0.036, 16),
    new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 })
  );
  coffeeLabel.position.set(-0.32, 0.795, 0.14);
  pit39.add(coffeeCan, coffeeLabel);
  pitRowGroup.add(pit39);

  // Sakakibara Koichi in Photographic Plaid Flannel Shirt (Atlas 49 gingham tinted flannel!)
  const sakakibara = createRealisticHuman(baseMats, {
    role: 'sakakibara',
    topMat: pbr.get('blueGinghamTablecloth', { repeatX: 4, repeatY: 4, tint: 0x6b8299 }),
    pantsMat: new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.82 }),
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  sakakibara.root.position.set(1.25, 0, -4.82);
  exhibitionHallSet.add(sakakibara.root);

  // Minato inside the Exhibition Hall (watching stage, bowing, rushing to shattered knee, sunset handshake!)
  const minatoHall = createRealisticHuman(baseMats, {
    role: 'minato_hall',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoHall.root.position.set(-0.38, 0, -0.55);
  exhibitionHallSet.add(minatoHall.root);

  // Spare QDD Disc Macro Table Display & RL Ghost Clones mounted on Pit 39 for Sunset Scene!
  spareQddMacro.group.position.set(1.12, 0.748, -4.12);
  spareQddMacro.group.visible = false;
  props.rlGhostGroup.position.set(1.12, 0.748, -4.18);
  exhibitionHallSet.add(spareQddMacro.group, props.rlGhostGroup);

  // --- CENTRAL OFFICIAL COMPETITION STAGE (z = -0.2 .. +3.4) ---
  const stagePad = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 0.012, 4.0),
    pbr.get('cleanWhiteTerrazzo', { repeatX: 3, repeatY: 4, tint: 0xcbd5e1, roughness: 0.14 })
  );
  stagePad.position.set(0, 0.006, 1.50);
  stagePad.receiveShadow = true;
  exhibitionHallSet.add(stagePad);

  // Crisp White Start Line (z = 0.0m) & Bold Red Finish Line (z = 3.0m "赤いゴールライン")!
  const startLine = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.032), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  startLine.rotation.x = -Math.PI / 2; startLine.position.set(0, 0.014, 0.0);
  const finishLine = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.065), new THREE.MeshBasicMaterial({ color: 0xdc2626 }));
  finishLine.rotation.x = -Math.PI / 2; finishLine.position.set(0, 0.014, 3.0);
  exhibitionHallSet.add(startLine, finishLine);

  // Overhead Digital Arena Scoreboard
  const scoreboardBoard = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.2), screens.scoreboardMat);
  scoreboardBoard.position.set(0, 2.25, -1.65);
  const sbFrame = new THREE.Mesh(new THREE.BoxGeometry(3.32, 1.32, 0.12), baseMats.darkAnodized);
  sbFrame.position.set(0, 2.25, -1.72);
  exhibitionHallSet.add(scoreboardBoard, sbFrame);

  // Back Spectator Balcony Railing + Kurata Senior giving a Silent Right-Hand Thumbs-Up!
  const balconyGroup = new THREE.Group();
  balconyGroup.position.set(0, 0, -5.8);
  const balDeck = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.25, 1.8), whiteWallMat);
  balDeck.position.set(0, 1.85, 0);
  const balRail = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.06, 0.06), baseMats.chromeSteel);
  balRail.position.set(0, 2.95, 0.85);
  for (let rx = -4.5; rx <= 4.5; rx += 1.5) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.0, 0.04), baseMats.chromeSteel);
    post.position.set(rx, 2.45, 0.85);
    balconyGroup.add(post);
  }
  const kurataBalcony = createRealisticHuman(baseMats, {
    role: 'kurata',
    topMat: new THREE.MeshStandardMaterial({ color: 0x3f6212, roughness: 0.78 }),
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  kurataBalcony.root.position.set(0.0, 1.98, 0.45);
  kurataBalcony.rightArm.shoulder.rotation.set(-1.18, 0.15, -0.18);
  kurataBalcony.rightArm.elbow.rotation.set(-0.92, 0, 0);
  balconyGroup.add(balDeck, balRail, kurataBalcony.root);
  exhibitionHallSet.add(balconyGroup);

  // Spectator Crowd flanking left/right of arena (colorful university windbreakers!)
  const crowdCols = [0x1d4ed8, 0xb91c1c, 0x0f766e, 0x334155, 0x4338ca, 0x1e293b];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const sp = new THREE.Group();
      const torso = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.19, 0.65, 10),
        new THREE.MeshStandardMaterial({ color: crowdCols[(i + (side > 0 ? 2 : 0)) % crowdCols.length], roughness: 0.82 })
      );
      torso.position.y = 1.15;
      const hd = new THREE.Mesh(new THREE.SphereGeometry(0.105, 10, 8), baseMats.skin);
      hd.position.y = 1.62;
      sp.add(torso, hd);
      sp.position.set(side * 2.25, 0, 0.1 + i * 0.62);
      exhibitionHallSet.add(sp);
    }
  }

  // Afternoon Disturbance Test 300g Pendulum & Shatter FX mounted over Stage Center (z = 1.2m)
  props.pendulumPivot.position.set(0.0, 2.24, 1.20);
  props.pendulumPivot.visible = false;
  props.shatterGroup.position.set(-0.04, 0.14, 1.20);
  exhibitionHallSet.add(props.pendulumPivot, props.shatterGroup);

  // Mount Hero Fighter & Sakakibara 65cm QDD Humanoid into Scene
  scene.add(heroFighter.root);
  qddBot.root.visible = false;
  scene.add(qddBot.root);

  function setActiveSet(name) {
    room203Set.visible = name === 'room203';
    hamamatsuchoExtSet.visible = name === 'exterior';
    exhibitionHallSet.visible = name === 'hall';
  }

  return {
    setActiveSet,
    room203Set,
    deskGroup,
    bedsideGroup,
    retirementGroup,
    hamamatsuchoExtSet,
    updateGinkgoLeaves,
    minatoExt,
    minatoHall,
    exhibitionHallSet,
    pitRowGroup,
    sakakibara,
    kurataBalcony,
    balconyGroup,
    heroFighter,
    qddBot,
    spareQddMacro,
    macroHand,
    props,
  };
}
