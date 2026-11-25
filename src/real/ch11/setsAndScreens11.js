import * as THREE from 'three';
import { createRealisticHuman } from '../humans.js';
import { createNextGenHandRig } from '../nextgen/pbrMicroTextures.js';
import { createHMD01Rev18Fighter } from '../ch09/hmd01Rev18Rig.js';
import { createCh10StoryProps } from '../ch10/qddAndHallProps.js';
import {
  createTapeMeasure72cm,
  createBareOutrunnerMotor80mm,
  createNewspaperSilhouetteWall,
  createYakisobaStallProps,
  createCondensationDropletWindow,
} from './ch11PropsAndRig.js';

/**
 * Dynamic Screens for Chapter 11:
 * 1. Overseas QDD Catalog Price Shock Laptop Screen (`¥45,000 × 16 = ¥720,000+` vs `残高 ¥316,120`)
 * 2. University Festival Banner (`東都農工大学 学園祭 · やきそば 500円`)
 * 3. Robotics Clubroom Exhibition Banner (`ロボティクス研究会 展示会場`)
 */
export function createCh11Screens() {
  // 1. Overseas QDD Actuator Catalog Laptop Screen
  const catC = document.createElement('canvas');
  catC.width = 1024; catC.height = 640;
  const cx = catC.getContext('2d');
  cx.fillStyle = '#0f172a'; cx.fillRect(0, 0, 1024, 640);
  // Browser top bar
  cx.fillStyle = '#1e293b'; cx.fillRect(0, 0, 1024, 52);
  cx.fillStyle = '#94a3b8'; cx.font = '700 20px monospace';
  cx.fillText('https://global-actuator-catalog.io/qdd-80-module', 28, 34);
  // Header
  cx.fillStyle = '#f8fafc'; cx.font = '900 30px sans-serif';
  cx.fillText('海外メーカー製 準ダイレクトドライブ (QDD) 完成品モジュール', 32, 106);
  // Left product schematic box
  cx.strokeStyle = '#38bdf8'; cx.lineWidth = 4; cx.strokeRect(32, 138, 272, 248);
  cx.fillStyle = '#1e293b'; cx.fillRect(34, 140, 268, 244);
  cx.strokeStyle = '#e2e8f0'; cx.lineWidth = 10;
  cx.beginPath(); cx.arc(168, 258, 72, 0, Math.PI * 2); cx.stroke();
  cx.strokeStyle = '#38bdf8'; cx.lineWidth = 6;
  cx.beginPath(); cx.arc(168, 258, 40, 0, Math.PI * 2); cx.stroke();
  cx.fillStyle = '#94a3b8'; cx.font = '700 19px monospace';
  cx.fillText('QDD-80 PRO · 18Nm', 66, 370);
  // Right price table
  cx.fillStyle = '#cbd5e1'; cx.font = '700 23px sans-serif';
  cx.fillText('単価（1関節モジュール）:', 334, 186);
  cx.fillStyle = '#fbbf24'; cx.font = '900 42px monospace';
  cx.fillText('¥45,000 / 個', 626, 190);
  cx.fillStyle = '#cbd5e1'; cx.font = '700 23px sans-serif';
  cx.fillText('全身 16自由度（脚12＋腕4）:', 334, 262);
  cx.fillStyle = '#f87171'; cx.font = '900 48px monospace';
  cx.fillText('¥720,000+', 660, 268);
  cx.fillStyle = '#94a3b8'; cx.font = '700 20px sans-serif';
  cx.fillText('※ 骨格CNC加工・電池・計算機込み総額：優に ¥1,000,000 超', 334, 326);
  // Stark red warning footer comparing against Minato's bank balance
  cx.fillStyle = '#7f1d1d'; cx.fillRect(32, 422, 960, 182);
  cx.strokeStyle = '#ef4444'; cx.lineWidth = 5; cx.strokeRect(32, 422, 960, 182);
  cx.fillStyle = '#fecaca'; cx.font = '800 26px sans-serif';
  cx.fillText('現在の貯金残高：¥316,120（深夜コンビニ半年分） → 片脚すら組めない', 52, 486);
  cx.fillStyle = '#34d399'; cx.font = '900 28px sans-serif';
  cx.fillText('▶ 活路：むき出しの平たいモーター＋自作丸型FOC基板で 1/5 コストへ！', 52, 558);

  const catTex = new THREE.CanvasTexture(catC);
  catTex.colorSpace = THREE.SRGBColorSpace;
  const catalogScreenMat = new THREE.MeshBasicMaterial({ map: catTex });

  // 2. Festival Yakisoba Booth Sign
  const festC = document.createElement('canvas');
  festC.width = 512; festC.height = 140;
  const fx = festC.getContext('2d');
  fx.fillStyle = '#fef3c7'; fx.fillRect(0, 0, 512, 140);
  fx.strokeStyle = '#dc2626'; fx.lineWidth = 10; fx.strokeRect(8, 8, 496, 124);
  fx.fillStyle = '#b91c1c'; fx.font = '900 56px serif'; fx.fillText('電電1年 特製やきそば', 24, 76);
  fx.fillStyle = '#0f172a'; fx.font = '800 30px sans-serif'; fx.fillText('肉大盛りサービス！ 500円', 92, 118);
  const festTex = new THREE.CanvasTexture(festC); festTex.colorSpace = THREE.SRGBColorSpace;
  const yakisobaSignMat = new THREE.MeshStandardMaterial({ map: festTex, roughness: 0.72 });

  // 3. Robotics Clubroom Prefab Sign
  const clubC = document.createElement('canvas');
  clubC.width = 512; clubC.height = 128;
  const rx = clubC.getContext('2d');
  rx.fillStyle = '#f8fafc'; rx.fillRect(0, 0, 512, 128);
  rx.fillStyle = '#1e3a8a'; rx.fillRect(0, 0, 512, 24);
  rx.fillStyle = '#0f172a'; rx.font = '900 42px sans-serif'; rx.fillText('ロボティクス研究会 展示会場', 24, 82);
  rx.fillStyle = '#475569'; rx.font = '700 20px monospace'; rx.fillText('TOUTO TECH UNIVERSITY · NORTH PREFAB', 38, 112);
  const clubTex = new THREE.CanvasTexture(clubC); clubTex.colorSpace = THREE.SRGBColorSpace;
  const clubSignMat = new THREE.MeshStandardMaterial({ map: clubTex, roughness: 0.75 });

  return { catalogScreenMat, yakisobaSignMat, clubSignMat };
}

/**
 * Builds ALL 3 Monumental Chapter 11 Sets powered by our 340-Asset Master Library & 88-Atlas (792-Tile) Photographic PBR Engine!
 */
export function createCh11World(scene, baseMats, ngMats, screens, masterLib) {
  const { pbr, spawn } = masterLib;

  const heroFighter = createHMD01Rev18Fighter(baseMats, ngMats, masterLib);
  heroFighter.setBattleState({ scratched: true, hipCracked: true, silverSplints: true });
  const ch10Props = createCh10StoryProps(baseMats, ngMats);

  const tapeMeasure = createTapeMeasure72cm(baseMats);
  const bareMotor = createBareOutrunnerMotor80mm(baseMats);
  const newsWall = createNewspaperSilhouetteWall(baseMats);
  const yakiStall = createYakisobaStallProps(baseMats, pbr);
  const condWindow = createCondensationDropletWindow(baseMats, pbr);

  // Fingernail-detailed right hand for frozen pencil, turning bare 80mm motor, pressing motor onto knee!
  const macroHand = createNextGenHandRig(baseMats, ngMats, 1);
  macroHand.group.visible = false;
  scene.add(macroHand.group);

  // ===========================================================================
  // SET 1: 『コーポ武蔵野』203号室 — 本棚の退役HMD-01・机のHMD-02ノート＆PC・72cmメジャー・80mm銅モーター・新聞紙720mm壁＆結露窓!
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

  // Honored Top Bookshelf with Silent Retired HMD-01 & `規定完走証 9秒12` (left side of back wall!)
  const shelfGroup = new THREE.Group();
  const shelfWood = pbr.get('parquetWoodFloor', { repeatX: 2, repeatY: 1, tint: 0x9c724c });
  const shelfTop = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.026, 0.34), shelfWood);
  shelfTop.position.set(-0.98, 1.24, -1.42);
  const shelfMid = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.024, 0.34), shelfWood);
  shelfMid.position.set(-0.98, 0.92, -1.42);
  const shelfL = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.68, 0.34), shelfWood);
  shelfL.position.set(-1.44, 0.92, -1.42);
  const shelfR = shelfL.clone(); shelfR.position.x = -0.52;
  shelfGroup.add(shelfTop, shelfMid, shelfL, shelfR);
  // White Completion Certificate beside retired HMD-01
  ch10Props.certCard.position.set(-0.76, 1.305, -1.40);
  ch10Props.certCard.rotation.set(-0.18, -0.15, 0);
  shelfGroup.add(ch10Props.certCard);
  room203Set.add(shelfGroup);

  // Seat retired HMD-01 permanently on the top bookshelf!
  heroFighter.root.position.set(-1.05, 1.254, -1.40);
  heroFighter.root.rotation.set(0, 0.28, 0);
  heroFighter.setPose({
    pelvisPos: [0, 0.095, 0], pelvisRot: [-0.14, 0, 0],
    leftFootPos: [0.046, 0.02, 0.145], rightFootPos: [-0.046, 0.02, 0.145],
    leftArmPitch: 0.35, rightArmPitch: 0.35, leftArmRoll: 0.14, rightArmRoll: -0.14,
    pivotRotX: 0, pivotPosY: 0,
  });
  room203Set.add(heroFighter.root);

  // Full-Scale 720mm `HMD-02` Newspaper Silhouette Wall right beside the bookshelf (x = 0.05, z = -1.62)!
  newsWall.group.position.set(0.02, 0.01, -1.62);
  newsWall.group.visible = false;
  room203Set.add(newsWall.group);

  // Winter Condensation Window on right side of back wall (x = 1.05, y = 1.18, z = -1.61)!
  condWindow.group.position.set(1.06, 1.16, -1.61);
  room203Set.add(condWindow.group);

  // Photographic Walnut Workbench (z = -0.48) with Pegboard, Corkboard, Blueprint, Desk Lamp, 24V PSU & Laptop!
  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 0, -0.48);
  room203Set.add(deskGroup);

  const deskMesh = spawn('arch_walnut_workbench');
  const deskLamp = spawn('prop_desk_lamp_led'); deskLamp.position.set(-0.54, 0.72, -0.22);
  const pegboard = spawn('arch_hardware_tool_pegboard'); pegboard.position.set(0.0, 1.25, -0.365);
  const blueprint = spawn('arch_blueprint_poster'); blueprint.position.set(0.76, 1.26, -0.365);
  deskGroup.add(deskMesh, deskLamp, pegboard, blueprint);

  // Open `HMD-02` Notebook & Frozen Mechanical Pencil on desk
  ch10Props.updateHmd02Notebook(1.0);
  ch10Props.hmd02Notebook.position.set(0.0, 0.725, 0.04);
  ch10Props.mechPencil.position.set(0.09, 0.755, 0.05);
  ch10Props.mechPencil.rotation.set(0.45, 0.2, -0.35);
  deskGroup.add(ch10Props.hmd02Notebook, ch10Props.mechPencil);

  // Engineering Laptop displaying Overseas QDD Catalog Price Shock!
  const laptopGroup = new THREE.Group();
  const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.014, 0.24), pbr.get('brushedAluHairline'));
  const lapLid = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.23, 0.010), pbr.get('brushedAluHairline'));
  lapLid.position.set(0, 0.115, -0.118); lapLid.rotation.x = -0.16;
  const lapScr = new THREE.Mesh(new THREE.PlaneGeometry(0.335, 0.208), screens.catalogScreenMat);
  lapScr.position.set(0, 0.115, -0.111); lapScr.rotation.x = -0.16;
  laptopGroup.add(lapBase, lapLid, lapScr);
  laptopGroup.position.set(0.0, 0.727, -0.02);
  laptopGroup.visible = false;
  deskGroup.add(laptopGroup);

  // 24V Bench DC Power Supply + Overseas White Parcel Box + Bare 80mm Outrunner Motor on Desk!
  const psu24v = spawn('tool_bench_psu_30v');
  psu24v.position.set(-0.34, 0.78, -0.10);
  psu24v.visible = false;
  bareMotor.parcelBox.position.set(0.02, 0.720, -0.04);
  bareMotor.parcelBox.visible = false;
  bareMotor.group.position.set(0.02, 0.766, -0.04);
  bareMotor.group.visible = false;
  deskGroup.add(psu24v, bareMotor.parcelBox, bareMotor.group);

  // Standalone Bare 80mm Motor for pressing directly onto the Wall Silhouette's Right Knee!
  const wallMotor = createBareOutrunnerMotor80mm(baseMats);
  wallMotor.group.rotation.x = Math.PI / 2;
  wallMotor.group.position.set(0.11, 0.34, -1.59);
  wallMotor.group.visible = false;
  room203Set.add(wallMotor.group);

  // Tape Measure standing right on Room 203 floor beside the desk edge (x = 0.05, z = 0.35)!
  tapeMeasure.group.position.set(0.06, 0.0, 0.28);
  tapeMeasure.group.visible = false;
  room203Set.add(tapeMeasure.group);

  // Winter Minato wearing Plaid Electric Lap Blanket wrapped around his waist ("チェック柄の電気ひざ掛け")!
  const minatoWinter = createRealisticHuman(baseMats, {
    role: 'minato_winter',
    topMat: baseMats.hoodieNavy,
    pantsMat: pbr.get('blueCheckeredCurtain', { repeatX: 3, repeatY: 3, tint: 0x7c9cb8 }), // Cozy plaid electric lap blanket!
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoWinter.root.position.set(-0.55, 0, -0.78);
  minatoWinter.root.visible = false;
  room203Set.add(minatoWinter.root);

  // Faint white winter breath vapor puff near Minato's face in Dec 6 freeze!
  const breathPuff = new THREE.Mesh(
    new THREE.SphereGeometry(0.048, 10, 8),
    new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.26, depthWrite: false })
  );
  breathPuff.visible = false;
  room203Set.add(breathPuff);

  // ===========================================================================
  // SET 2: 東都農工大学 学園祭キャンパス — 黄金の銀杏並木・赤いハチマキの田所＆焼きそば模擬店・公園ベンチ!
  // ===========================================================================
  const festivalSet = new THREE.Group();
  festivalSet.visible = false;
  scene.add(festivalSet);

  const autumnSkyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {},
    vertexShader: `varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vP; void main(){
      float h = clamp(normalize(vP).y * 1.4 + 0.06, 0.0, 1.0);
      vec3 col = mix(vec3(0.82, 0.90, 0.98), vec3(0.16, 0.42, 0.78), pow(h, 0.7));
      gl_FragColor = vec4(col, 1.0);
    }`,
  });
  festivalSet.add(new THREE.Mesh(new THREE.SphereGeometry(55, 24, 16), autumnSkyMat));

  // Classic Red Herringbone Brick Campus Festival Plaza (Atlas 85!) + Golden Ginkgo Carpet Strips!
  const festGround = spawn('arch_herringbone_brick_plaza', { w: 22, d: 24 });
  const ginkgoStripL = spawn('nat_ginkgo_carpet_strip', { w: 2.8, d: 18 }); ginkgoStripL.position.set(-3.8, 0.01, -2.0);
  const ginkgoStripR = spawn('nat_ginkgo_carpet_strip', { w: 2.8, d: 18 }); ginkgoStripR.position.set(3.8, 0.01, -2.0);
  const treeL = spawn('nat_ginkgo_tree_autumn'); treeL.position.set(-4.2, 0, -2.6);
  const treeR = spawn('nat_ginkgo_tree_autumn'); treeR.position.set(4.2, 0, -2.4);
  const treeBack = spawn('nat_ginkgo_tree_autumn'); treeBack.position.set(-3.8, 0, -7.2);
  const fountain = spawn('arch_park_water_fountain'); fountain.position.set(3.4, 0, -0.6);
  const festCork = spawn('arch_community_corkboard'); festCork.position.set(-2.9, 1.45, -3.5); festCork.rotation.y = 0.4;
  festivalSet.add(festGround, ginkgoStripL, ginkgoStripR, treeL, treeR, treeBack, fountain, festCork);

  // Yakisoba Festival Tent Booth with Photographic Wooden Counter, Red-White Striped Awning & Glowing Chochin Lanterns!
  const boothGroup = new THREE.Group();
  boothGroup.position.set(0.0, 0, -3.2);
  const counterBox = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 0.88, 0.72),
    pbr.get('woodenYataiStall', { repeatX: 2, repeatY: 1 })
  );
  counterBox.position.y = 0.44; counterBox.castShadow = true; counterBox.receiveShadow = true;
  // Tent canopy roof (Red & White Striped Shop Awning, Atlas 46!)
  const awningRoof = new THREE.Mesh(
    new THREE.BoxGeometry(2.9, 0.14, 1.85),
    pbr.get('redWhiteShopAwning', { repeatX: 3, repeatY: 2 })
  );
  awningRoof.position.set(0, 2.38, -0.2); awningRoof.rotation.x = 0.12;
  const awningValance = new THREE.Mesh(
    new THREE.BoxGeometry(2.9, 0.34, 0.04),
    pbr.get('redWhiteShopAwning', { repeatX: 3, repeatY: 1 })
  );
  awningValance.position.set(0, 2.18, 0.72);
  for (const px of [-1.35, 1.35]) {
    for (const pz of [-0.95, 0.65]) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 2.35, 10), baseMats.chromeSteel);
      pole.position.set(px, 1.175, pz);
      boothGroup.add(pole);
    }
  }
  const yakiSign = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 0.48), screens.yakisobaSignMat);
  yakiSign.position.set(0, 2.18, 0.75);
  const lanternL = spawn('arch_glowing_chochin_lantern'); lanternL.position.set(-1.15, 1.86, 0.74);
  const lanternR = spawn('arch_glowing_chochin_lantern'); lanternR.position.set(1.15, 1.86, 0.74);

  // Mount sizzling yakisoba griddle & smoke wisps on booth counter!
  yakiStall.stallProps.position.set(0.0, 0.88, 0.02);
  boothGroup.add(counterBox, awningRoof, awningValance, yakiSign, lanternL, lanternR, yakiStall.stallProps);
  festivalSet.add(boothGroup);

  // Neighboring Blue-Striped Festival Booth in background for lively depth!
  const boothBlue = new THREE.Group();
  boothBlue.position.set(3.4, 0, -5.2);
  boothBlue.rotation.y = -0.35;
  const bAwning = spawn('arch_blue_stripe_awning', { w: 2.6 }); bAwning.position.set(0, 2.1, 0);
  const bCounter = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.88, 0.7), pbr.get('woodRegisterCounter')); bCounter.position.y = 0.44;
  boothBlue.add(bAwning, bCounter);
  festivalSet.add(boothBlue);

  // Tadokoro behind the yakisoba griddle wearing a BRIGHT RED HACHIMAKI HEADBAND ("赤いハチマキ")!
  const tadokoroFest = createRealisticHuman(baseMats, {
    role: 'tadokoro_fest',
    topMat: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.82 }), // Festival happi/t-shirt
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  const hachiMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.65 });
  const redHachimaki = new THREE.Mesh(
    new THREE.TorusGeometry(0.102, 0.015, 10, 28),
    hachiMat
  );
  redHachimaki.rotation.x = Math.PI / 2;
  redHachimaki.position.set(0, 1.675, 0.0);
  const hachiTailL = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.12, 0.010), hachiMat);
  hachiTailL.position.set(-0.032, 1.62, -0.108); hachiTailL.rotation.set(0.28, 0, 0.24);
  const hachiTailR = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.11, 0.010), hachiMat);
  hachiTailR.position.set(0.032, 1.62, -0.108); hachiTailR.rotation.set(0.28, 0, -0.22);
  tadokoroFest.root.add(redHachimaki, hachiTailL, hachiTailR);
  tadokoroFest.root.position.set(0.16, 0, -3.64);
  festivalSet.add(tadokoroFest.root);

  // Minato at Festival (buying yakisoba -> sitting on green park bench eating warm yakisoba!)
  const minatoFest = createRealisticHuman(baseMats, {
    role: 'minato_fest',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoFest.root.position.set(-0.22, 0, -2.15);
  minatoFest.root.rotation.y = Math.PI;
  festivalSet.add(minatoFest.root);

  // Overflowing Yakisoba Pack held cleanly in front of Minato / on bench
  yakiStall.yakisobaPack.position.set(-0.18, 1.05, -2.55);
  festivalSet.add(yakiStall.yakisobaPack);

  // Photographic Green Slatted Campus Park Bench (Atlas 23!) for Cut 05
  const parkBench = spawn('arch_park_bench_green');
  parkBench.position.set(-2.2, 0, -0.4);
  parkBench.rotation.y = 0.65;
  festivalSet.add(parkBench);

  // 80 Instanced Swirling Golden Ginkgo Leaves across the festival campus!
  const festLeafInst = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(0.055, 0.055),
    new THREE.MeshBasicMaterial({ color: 0xfde047, side: THREE.DoubleSide }),
    80
  );
  const _fDummy = new THREE.Object3D();
  function updateFestLeaves(t) {
    for (let i = 0; i < 80; i++) {
      const lx = ((i * 0.73 + t * 0.65) % 9.0) - 4.5;
      const ly = 0.06 + Math.abs(Math.sin(t * 0.95 + i)) * 3.1;
      const lz = -5.5 + ((i * 0.51) % 7.5);
      _fDummy.position.set(lx, ly, lz);
      _fDummy.rotation.set(t * 2.1 + i, t * 1.6 + i * 0.5, i);
      _fDummy.updateMatrix();
      festLeafInst.setMatrixAt(i, _fDummy.matrix);
    }
    festLeafInst.instanceMatrix.needsUpdate = true;
  }
  festivalSet.add(festLeafInst);

  // ===========================================================================
  // SET 3: 北端プレハブ棟『ロボティクス研究会』展示会場 — 倉田先輩の爆笑＆肩バンッ!
  // ===========================================================================
  const clubroomSet = new THREE.Group();
  clubroomSet.visible = false;
  scene.add(clubroomSet);

  const clubFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(9.0, 9.0),
    pbr.get('checkeredLinoleum', { repeatX: 6, repeatY: 6 })
  );
  clubFloor.rotation.x = -Math.PI / 2;
  clubFloor.receiveShadow = true;
  const clubWallB = new THREE.Mesh(
    new THREE.PlaneGeometry(9.0, 3.2),
    pbr.get('archWhiteConcrete', { repeatX: 4, repeatY: 2, tint: 0xf2f4f7 })
  );
  clubWallB.position.set(0, 1.6, -2.6);
  const clubWallL = new THREE.Mesh(
    new THREE.PlaneGeometry(9.0, 3.2),
    pbr.get('archWhiteConcrete', { repeatX: 4, repeatY: 2, tint: 0xeef2f6 })
  );
  clubWallL.rotation.y = Math.PI / 2; clubWallL.position.set(-3.4, 1.6, 0);

  // Authentic University Robotics Clubroom Assets from our 340-Asset Library!
  const chalkboard = spawn('arch_classroom_chalkboard'); chalkboard.position.set(-0.4, 1.55, -2.56);
  const binderCab = spawn('arch_office_binder_cabinet'); binderCab.position.set(-2.3, 0, -2.35);
  const labCab = spawn('arch_sliding_lab_cabinet'); labCab.position.set(2.1, 0, -2.35);
  const exitDoor = spawn('arch_green_exit_door'); exitDoor.position.set(-3.34, 0, -0.9); exitDoor.rotation.y = Math.PI / 2;
  const blindsWin = spawn('arch_window_blinds_white', { w: 1.8, h: 1.25 }); blindsWin.position.set(1.45, 1.55, -2.56);
  const clubBanner = new THREE.Mesh(new THREE.PlaneGeometry(1.85, 0.46), screens.clubSignMat);
  clubBanner.position.set(-0.4, 2.48, -2.55);

  // Exhibition Display Table with Shiny Red CNC Club Robot!
  const clubTable = spawn('arch_pit_pipe_table', { width: 1.45 }); clubTable.position.set(-1.35, 0, -0.85);
  const displayBot = ch10Props.redCncBot.clone();
  displayBot.position.set(-1.35, 0.74, -0.85);
  const clubChair = spawn('arch_folding_chair'); clubChair.position.set(0.85, 0, -1.65);

  clubroomSet.add(
    clubFloor, clubWallB, clubWallL, chalkboard, binderCab, labCab, exitDoor,
    blindsWin, clubBanner, clubTable, displayBot, clubChair
  );

  // Senior Kurata (Olive Work Blouson) & Minato standing face-to-face in the Robotics Clubroom!
  const kurataClub = createRealisticHuman(baseMats, {
    role: 'kurata_club',
    topMat: new THREE.MeshStandardMaterial({ color: 0x3f6212, roughness: 0.78 }),
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  kurataClub.root.position.set(0.58, 0, -0.85);
  kurataClub.root.rotation.y = -Math.PI * 0.45;

  const minatoClub = createRealisticHuman(baseMats, {
    role: 'minato_club',
    topMat: baseMats.hoodieNavy,
    pantsMat: baseMats.jeansDark,
    hairMat: baseMats.hairBlack,
    hasBackpack: false,
  });
  minatoClub.root.position.set(-0.28, 0, -0.85);
  minatoClub.root.rotation.y = Math.PI * 0.45;
  clubroomSet.add(kurataClub.root, minatoClub.root);

  function setActiveSet(name) {
    room203Set.visible = name === 'room203';
    festivalSet.visible = name === 'festival';
    clubroomSet.visible = name === 'clubroom';
  }

  return {
    setActiveSet,
    room203Set,
    deskGroup,
    shelfGroup,
    laptopGroup,
    psu24v,
    heroFighter,
    ch10Props,
    tapeMeasure,
    bareMotor,
    wallMotor,
    newsWall,
    condWindow,
    minatoWinter,
    breathPuff,
    macroHand,
    festivalSet,
    yakiStall,
    tadokoroFest,
    minatoFest,
    parkBench,
    updateFestLeaves,
    clubroomSet,
    kurataClub,
    minatoClub,
  };
}
