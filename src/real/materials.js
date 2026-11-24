import * as THREE from 'three';

/**
 * Generates a realistic interior/daylight equirectangular environment map
 * processed through PMREMGenerator so metals, plastics, solder, glass, and eyes
 * exhibit lifelike physical specular reflections (IBL).
 */
export function createRealisticIBL(renderer) {
  const w = 512;
  const h = 256;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Base vertical room/sky gradient
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0.0, '#d8e4f2');
  bg.addColorStop(0.32, '#cfd8e3');
  bg.addColorStop(0.5, '#9ca3af');
  bg.addColorStop(0.75, '#4b433b');
  bg.addColorStop(1.0, '#26211d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Soft daylight window panel reflection (cool sky key)
  const winGrad = ctx.createRadialGradient(w * 0.25, h * 0.34, 6, w * 0.25, h * 0.34, 95);
  winGrad.addColorStop(0, 'rgba(240, 248, 255, 0.98)');
  winGrad.addColorStop(0.55, 'rgba(200, 226, 255, 0.55)');
  winGrad.addColorStop(1, 'rgba(200, 226, 255, 0)');
  ctx.fillStyle = winGrad;
  ctx.fillRect(0, 0, w, h);

  // Warm tungsten desk-lamp / ceiling softbox bounce
  const lampGrad = ctx.createRadialGradient(w * 0.72, h * 0.28, 6, w * 0.72, h * 0.28, 90);
  lampGrad.addColorStop(0, 'rgba(255, 236, 198, 0.95)');
  lampGrad.addColorStop(0.5, 'rgba(255, 206, 145, 0.48)');
  lampGrad.addColorStop(1, 'rgba(255, 190, 120, 0)');
  ctx.fillStyle = lampGrad;
  ctx.fillRect(0, 0, w, h);

  // Crisp studio rim strip
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.fillRect(w * 0.46, h * 0.14, w * 0.12, h * 0.06);

  const equirect = new THREE.CanvasTexture(canvas);
  equirect.mapping = THREE.EquirectangularReflectionMapping;
  equirect.colorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envRT = pmrem.fromEquirectangular(equirect);
  equirect.dispose();
  pmrem.dispose();
  return envRT;
}

function makeSmoothTexture(w, h, drawFn, { repeatX = 1, repeatY = 1, srgb = true } = {}) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  drawFn(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 8;
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createRealisticMaterialSuite() {
  const mats = {};

  // 1. Aged Oak Wood Plank Flooring + Bump Map
  const woodColor = makeSmoothTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#8b5e3c';
    ctx.fillRect(0, 0, w, h);
    const planks = 6;
    const pw = w / planks;
    for (let p = 0; p < planks; p++) {
      const hueShift = (p % 3 - 1) * 9;
      ctx.fillStyle = `rgb(${138 + hueShift}, ${94 + hueShift * 0.7}, ${58 + hueShift * 0.5})`;
      ctx.fillRect(p * pw, 0, pw, h);
      // Wood fiber streaks
      for (let i = 0; i < 90; i++) {
        const x = p * pw + Math.random() * pw;
        ctx.fillStyle = i % 2 === 0 ? 'rgba(65,36,16,0.09)' : 'rgba(210,165,118,0.07)';
        ctx.fillRect(x, 0, 1 + Math.random() * 2.2, h);
      }
      // Plank vertical seam & horizontal joint
      ctx.fillStyle = 'rgba(34, 18, 8, 0.58)';
      ctx.fillRect(p * pw, 0, 2, h);
      const jointY = ((p * 173 + 90) % (h - 40)) + 20;
      ctx.fillRect(p * pw, jointY, pw, 2);
    }
  }, { repeatX: 4, repeatY: 4 });

  const woodBump = makeSmoothTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, w, h);
    const pw = w / 6;
    for (let p = 0; p < 6; p++) {
      ctx.fillStyle = '#222222';
      ctx.fillRect(p * pw, 0, 2, h);
      for (let i = 0; i < 45; i++) {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';
        ctx.fillRect(p * pw + Math.random() * pw, 0, 1.5, h);
      }
    }
  }, { repeatX: 4, repeatY: 4, srgb: false });

  mats.woodFloor = new THREE.MeshPhysicalMaterial({
    map: woodColor,
    bumpMap: woodBump,
    bumpScale: 0.015,
    roughness: 0.42,
    metalness: 0.02,
    clearcoat: 0.22,
    clearcoatRoughness: 0.35,
  });

  // 2. Authentic Woven Tatami Mat (6畳一間)
  const tatamiTex = makeSmoothTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#9aa06c';
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 3) {
      ctx.fillStyle = y % 6 === 0 ? 'rgba(218, 222, 168, 0.22)' : 'rgba(92, 98, 56, 0.2)';
      ctx.fillRect(0, y, w, 1.8);
    }
    for (let x = 0; x < w; x += 16) {
      ctx.fillStyle = 'rgba(70, 76, 44, 0.1)';
      ctx.fillRect(x, 0, 1, h);
    }
    // Traditional dark green/navy cloth tatami border (畳縁)
    ctx.fillStyle = '#1f362d';
    ctx.fillRect(0, 0, 22, h);
    ctx.fillRect(w - 22, 0, 22, h);
  }, { repeatX: 3, repeatY: 2 });

  mats.tatami = new THREE.MeshStandardMaterial({
    map: tatamiTex,
    bumpMap: tatamiTex,
    bumpScale: 0.012,
    roughness: 0.82,
    metalness: 0.0,
  });

  // 3. Aged Off-White Apartment Wallpaper & Walnut Folding Desk
  const wallBump = makeSmoothTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 1800; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#969696' : '#6c6c6c';
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
  }, { repeatX: 8, repeatY: 4, srgb: false });

  mats.wallPaper = new THREE.MeshStandardMaterial({
    color: 0xeae5dc,
    bumpMap: wallBump,
    bumpScale: 0.008,
    roughness: 0.88,
  });

  const deskTex = makeSmoothTexture(512, 512, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, '#5c3d28');
    g.addColorStop(0.5, '#694730');
    g.addColorStop(1, '#583924');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 240; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(30,16,8,0.12)' : 'rgba(155,112,78,0.08)';
      ctx.fillRect(0, Math.random() * h, w, 1 + Math.random() * 2.5);
    }
  });
  mats.deskWood = new THREE.MeshPhysicalMaterial({
    map: deskTex,
    bumpMap: deskTex,
    bumpScale: 0.005,
    roughness: 0.36,
    metalness: 0.02,
    clearcoat: 0.24,
    clearcoatRoughness: 0.28,
  });

  // 4. Precision Metals, Plastics, 3D-Printed PLA Layer Lines & Electronics
  const brushBump = makeSmoothTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y++) {
      const v = 112 + Math.random() * 32;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(0, y, w, 1);
    }
  }, { repeatX: 3, repeatY: 3, srgb: false });

  mats.brushedAlu = new THREE.MeshPhysicalMaterial({
    color: 0xd4dae2,
    bumpMap: brushBump,
    bumpScale: 0.006,
    metalness: 0.92,
    roughness: 0.26,
    clearcoat: 0.1,
  });
  mats.darkAnodized = new THREE.MeshPhysicalMaterial({
    color: 0x242830,
    bumpMap: brushBump,
    bumpScale: 0.005,
    metalness: 0.85,
    roughness: 0.3,
  });
  mats.chromeSteel = new THREE.MeshPhysicalMaterial({
    color: 0xf1f5f9,
    metalness: 0.97,
    roughness: 0.11,
  });
  mats.brass = new THREE.MeshPhysicalMaterial({
    color: 0xd9a441,
    metalness: 0.94,
    roughness: 0.2,
  });
  mats.copper = new THREE.MeshPhysicalMaterial({
    color: 0xd97745,
    metalness: 0.95,
    roughness: 0.22,
  });
  mats.solderShiny = new THREE.MeshPhysicalMaterial({
    color: 0xe6ecf5,
    metalness: 0.98,
    roughness: 0.08,
    clearcoat: 0.65,
  });

  // Authentic 0.20mm FDM 3D-Printed Matte Black PLA Layer-Line Material!
  const plaLayerBump = makeSmoothTexture(128, 256, (ctx, w, h) => {
    for (let y = 0; y < h; y += 4) {
      ctx.fillStyle = '#b8b8b8';
      ctx.fillRect(0, y, w, 2);
      ctx.fillStyle = '#484848';
      ctx.fillRect(0, y + 2, w, 2);
    }
  }, { repeatX: 2, repeatY: 16, srgb: false });

  mats.printedPLA = new THREE.MeshPhysicalMaterial({
    color: 0x1c1e22,
    bumpMap: plaLayerBump,
    bumpScale: 0.012,
    roughness: 0.48,
    metalness: 0.05,
    clearcoat: 0.1,
    clearcoatRoughness: 0.45,
  });

  // Feetech STS3215 Fiberglass-Polyamide Case & White Servo Horn
  mats.servoBody = new THREE.MeshPhysicalMaterial({
    color: 0x17191d,
    roughness: 0.34,
    metalness: 0.08,
    clearcoat: 0.22,
    clearcoatRoughness: 0.32,
  });
  mats.servoHornWhite = new THREE.MeshPhysicalMaterial({
    color: 0xf4f6f8,
    roughness: 0.3,
    metalness: 0.02,
    clearcoat: 0.3,
  });

  // Bambu Lab A1 White/Grey Polymer, Gold PEI Sheet, Concrete Slab & Rubber Pad
  mats.bambuWhite = new THREE.MeshPhysicalMaterial({
    color: 0xedeff2,
    roughness: 0.28,
    clearcoat: 0.25,
  });
  mats.peiGold = new THREE.MeshPhysicalMaterial({
    color: 0xd4a13e,
    bumpMap: wallBump,
    bumpScale: 0.01,
    metalness: 0.86,
    roughness: 0.32,
  });
  mats.concrete = new THREE.MeshStandardMaterial({
    color: 0x9aa0a6,
    bumpMap: wallBump,
    bumpScale: 0.025,
    roughness: 0.94,
  });
  mats.rubberBlack = new THREE.MeshStandardMaterial({
    color: 0x181a1c,
    roughness: 0.88,
  });

  // Solderless Breadboard Texture & Green FR-4 Perfboard Texture
  const breadTex = makeSmoothTexture(512, 256, (ctx, w, h) => {
    ctx.fillStyle = '#f6f5f0';
    ctx.fillRect(0, 0, w, h);
    // Red & Blue power bus lines
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(14, 14, w - 28, 3);
    ctx.fillRect(14, h - 34, w - 28, 3);
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(14, 34, w - 28, 3);
    ctx.fillRect(14, h - 14, w - 28, 3);
    // Center DIP channel groove
    ctx.fillStyle = '#dedcd4';
    ctx.fillRect(10, h * 0.5 - 12, w - 20, 24);
    // 2.54mm socket holes
    ctx.fillStyle = '#2b2d30';
    for (let x = 20; x < w - 16; x += 10) {
      for (const y of [22, 44, 68, 80, 92, 104, 152, 164, 176, 188, 212, 234]) {
        ctx.fillRect(x, y, 4.5, 4.5);
      }
    }
  });
  mats.breadboard = new THREE.MeshPhysicalMaterial({
    map: breadTex,
    roughness: 0.38,
    clearcoat: 0.18,
  });

  const perfTex = makeSmoothTexture(512, 384, (ctx, w, h) => {
    ctx.fillStyle = '#0f5e36';
    ctx.fillRect(0, 0, w, h);
    for (let x = 18; x < w - 12; x += 14) {
      for (let y = 18; y < h - 12; y += 14) {
        ctx.fillStyle = '#d4a656';
        ctx.beginPath();
        ctx.arc(x, y, 4.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0a2918';
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
  mats.perfboard = new THREE.MeshPhysicalMaterial({
    map: perfTex,
    roughness: 0.34,
    metalness: 0.15,
    clearcoat: 0.35,
  });
  mats.pcbEsp = new THREE.MeshPhysicalMaterial({
    color: 0x141619,
    roughness: 0.32,
    metalness: 0.2,
    clearcoat: 0.3,
  });
  mats.icPackage = new THREE.MeshStandardMaterial({ color: 0x191b1f, roughness: 0.52 });
  mats.icBurnt = new THREE.MeshStandardMaterial({ color: 0x0b0a0a, roughness: 0.96, emissive: 0x330800, emissiveIntensity: 0.3 });
  mats.xt60Yellow = new THREE.MeshPhysicalMaterial({ color: 0xf59e0b, roughness: 0.3, clearcoat: 0.25 });
  mats.hakkoBlue = new THREE.MeshPhysicalMaterial({ color: 0x1d4ed8, roughness: 0.32, clearcoat: 0.28 });
  mats.sanwaHolster = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.65 });
  mats.wireRed = new THREE.MeshPhysicalMaterial({ color: 0xdc2626, roughness: 0.4, clearcoat: 0.2 });
  mats.wireBlack = new THREE.MeshPhysicalMaterial({ color: 0x18181b, roughness: 0.42, clearcoat: 0.2 });
  mats.wireYellow = new THREE.MeshPhysicalMaterial({ color: 0xfacc15, roughness: 0.4, clearcoat: 0.2 });
  mats.wireBlue = new THREE.MeshPhysicalMaterial({ color: 0x0284c7, roughness: 0.4, clearcoat: 0.2 });
  mats.petBottle = new THREE.MeshPhysicalMaterial({
    color: 0x94c973,
    transparent: true,
    opacity: 0.78,
    roughness: 0.1,
    transmission: 0.45,
    clearcoat: 1.0,
  });
  mats.glassClear = new THREE.MeshPhysicalMaterial({
    color: 0xdbeafe,
    transparent: true,
    opacity: 0.34,
    roughness: 0.08,
    metalness: 0.1,
    clearcoat: 1.0,
  });
  mats.asphalt = new THREE.MeshStandardMaterial({
    color: 0x2e3238,
    bumpMap: wallBump,
    bumpScale: 0.03,
    roughness: 0.88,
  });

  // 5. Realistic Human Skin, Eyes, Hair & Clothing Materials
  mats.skin = new THREE.MeshPhysicalMaterial({
    color: 0xeec1a4,
    roughness: 0.56,
    metalness: 0.0,
    sheen: 0.28,
    sheenRoughness: 0.65,
    sheenColor: new THREE.Color(0xffbfa8),
    clearcoat: 0.05,
    clearcoatRoughness: 0.55,
  });
  mats.lips = new THREE.MeshPhysicalMaterial({
    color: 0xc97b72,
    roughness: 0.42,
    clearcoat: 0.18,
  });
  mats.eyeSclera = new THREE.MeshPhysicalMaterial({
    color: 0xfafafa,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  });
  const irisTex = makeSmoothTexture(128, 128, (ctx, w, h) => {
    const cx = w / 2, cy = h / 2;
    const g = ctx.createRadialGradient(cx, cy, 8, cx, cy, 58);
    g.addColorStop(0, '#09090b');
    g.addColorStop(0.32, '#09090b');
    g.addColorStop(0.45, '#4a2c18');
    g.addColorStop(0.85, '#2b190e');
    g.addColorStop(1, '#140c07');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // Tiny specular catchlight baked + physical clearcoat on top
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.arc(cx - 14, cy - 14, 7, 0, Math.PI * 2);
    ctx.fill();
  });
  mats.eyeIris = new THREE.MeshPhysicalMaterial({
    map: irisTex,
    roughness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  });

  mats.hairBlack = new THREE.MeshPhysicalMaterial({
    color: 0x1a191e,
    bumpMap: brushBump,
    bumpScale: 0.008,
    roughness: 0.46,
    sheen: 0.35,
    sheenColor: new THREE.Color(0x3f4756),
  });
  mats.hairBrown = new THREE.MeshPhysicalMaterial({
    color: 0x2c211b,
    bumpMap: brushBump,
    bumpScale: 0.008,
    roughness: 0.48,
    sheen: 0.3,
  });
  mats.hairGrey = new THREE.MeshPhysicalMaterial({
    color: 0x8d939c,
    bumpMap: brushBump,
    bumpScale: 0.008,
    roughness: 0.52,
    sheen: 0.3,
  });

  const makeFabric = (hex, rough = 0.78) =>
    new THREE.MeshPhysicalMaterial({
      color: hex,
      bumpMap: wallBump,
      bumpScale: 0.006,
      roughness: rough,
      sheen: 0.42,
      sheenRoughness: 0.8,
      sheenColor: new THREE.Color(hex).offsetHSL(0, 0, 0.12),
    });

  mats.hoodieNavy = makeFabric(0x1f2d42, 0.78);
  mats.shirtWhite = makeFabric(0xf1f4f8, 0.75);
  mats.jeansDark = makeFabric(0x232d3b, 0.84);
  mats.kurataJacket = makeFabric(0x2f483e, 0.74);
  mats.profSuit = makeFabric(0x363942, 0.72);
  mats.backpackBlack = makeFabric(0x1b1e24, 0.68);
  mats.sneakerWhite = new THREE.MeshStandardMaterial({ color: 0xeef2f6, roughness: 0.55 });
  mats.sneakerNavy = new THREE.MeshStandardMaterial({ color: 0x1e3a5f, roughness: 0.62 });

  return mats;
}

/**
 * 6 High-Resolution Live Dynamic Screens & Documents (Dirty-Flagged Zero-Waste CanvasTextures!)
 */
export function createDynamicScreens() {
  // --- 1. Laptop Screen (1024 x 640) ---
  const lapCanvas = document.createElement('canvas');
  lapCanvas.width = 1024;
  lapCanvas.height = 640;
  const lctx = lapCanvas.getContext('2d');
  const lapTex = new THREE.CanvasTexture(lapCanvas);
  lapTex.colorSpace = THREE.SRGBColorSpace;
  const laptopMat = new THREE.MeshBasicMaterial({ map: lapTex });

  // --- 2. Smartphone Screen (512 x 1024) ---
  const phCanvas = document.createElement('canvas');
  phCanvas.width = 512;
  phCanvas.height = 1024;
  const pctx = phCanvas.getContext('2d');
  const phTex = new THREE.CanvasTexture(phCanvas);
  phTex.colorSpace = THREE.SRGBColorSpace;
  const phoneMat = new THREE.MeshBasicMaterial({ map: phTex });

  // --- 3. Sanwa CD771 Multimeter LCD (512 x 320) ---
  const mmCanvas = document.createElement('canvas');
  mmCanvas.width = 512;
  mmCanvas.height = 320;
  const mctx = mmCanvas.getContext('2d');
  const mmTex = new THREE.CanvasTexture(mmCanvas);
  mmTex.colorSpace = THREE.SRGBColorSpace;
  const meterMat = new THREE.MeshBasicMaterial({ map: mmTex });

  // --- 4. 5mm Grid Engineering Notebook (1024 x 768) ---
  const nbCanvas = document.createElement('canvas');
  nbCanvas.width = 1024;
  nbCanvas.height = 768;
  const nctx = nbCanvas.getContext('2d');
  const nbTex = new THREE.CanvasTexture(nbCanvas);
  nbTex.colorSpace = THREE.SRGBColorSpace;
  const notebookMat = new THREE.MeshStandardMaterial({ map: nbTex, roughness: 0.85 });

  // --- 5. Robotics Club Whiteboard (1024 x 640, static once drawn) ---
  const wbCanvas = document.createElement('canvas');
  wbCanvas.width = 1024;
  wbCanvas.height = 640;
  const wctx = wbCanvas.getContext('2d');
  wctx.fillStyle = '#f8fafc';
  wctx.fillRect(0, 0, 1024, 640);
  wctx.strokeStyle = '#cbd5e1';
  wctx.lineWidth = 6;
  wctx.strokeRect(12, 12, 1000, 616);
  wctx.fillStyle = '#0f172a';
  wctx.font = '800 34px sans-serif';
  wctx.fillText('東都農工大学 ロボティクス研究会 — 2026年度 完全分業体制', 48, 74);
  const drawWbBox = (x, y, w, h, title, lines, accent) => {
    wctx.strokeStyle = accent;
    wctx.lineWidth = 4;
    wctx.strokeRect(x, y, w, h);
    wctx.fillStyle = accent;
    wctx.font = '800 26px sans-serif';
    wctx.fillText(title, x + 20, y + 42);
    wctx.fillStyle = '#1e293b';
    wctx.font = '600 20px sans-serif';
    lines.forEach((ln, i) => wctx.fillText(ln, x + 20, y + 84 + i * 34));
  };
  drawWbBox(48, 120, 290, 260, '機械班 (Mech)', ['・3D CAD 筐体設計', '・旋盤 / フライス加工', '・メカナム駆動・空圧'], '#1d4ed8');
  drawWbBox(366, 120, 300, 260, '回路班 (Circuit) ★募集', ['・1年夏まで: ライントレーサ', '・先輩機ワイヤーハーネス加工', '※旋盤・3D CAD 触るの禁止'], '#dc2626');
  drawWbBox(694, 120, 282, 260, '制御班 (Control)', ['・オムニ経路追従', '・自動射出シーケンス', '※二足歩行は非合理的のため対象外'], '#047857');
  wctx.fillStyle = '#b91c1c';
  wctx.font = '800 25px sans-serif';
  wctx.fillText('目標：NHK学生ロボコン 優勝（車輪型 秒速 3.0 m/s 安定走行）', 48, 460);
  const wbTex = new THREE.CanvasTexture(wbCanvas);
  wbTex.colorSpace = THREE.SRGBColorSpace;
  const whiteboardMat = new THREE.MeshPhysicalMaterial({ map: wbTex, roughness: 0.16, clearcoat: 0.85 });

  // --- 6. Lecture Hall Green Chalkboard (1280 x 640) ---
  const cbCanvas = document.createElement('canvas');
  cbCanvas.width = 1280;
  cbCanvas.height = 640;
  const cctx = cbCanvas.getContext('2d');
  const cbTex = new THREE.CanvasTexture(cbCanvas);
  cbTex.colorSpace = THREE.SRGBColorSpace;
  const chalkboardMat = new THREE.MeshStandardMaterial({ map: cbTex, roughness: 0.82 });

  let curLap = '';
  let curPhone = '';
  let curMeter = '';
  let curNb = '';
  let curChalk = -1;

  function setLaptopMode(mode) {
    if (mode === curLap) return;
    curLap = mode;
    lctx.fillStyle = '#0d1117';
    lctx.fillRect(0, 0, 1024, 640);
    // Top titlebar
    lctx.fillStyle = '#161b22';
    lctx.fillRect(0, 0, 1024, 38);
    lctx.fillStyle = '#8b949e';
    lctx.font = '600 16px monospace';

    if (mode === 'code_115200') {
      lctx.fillText('ESP32-S3 — servo_single_test.cpp (PlatformIO)', 24, 25);
      const lines = [
        ['#include <Arduino.h>', '#ff7b72'],
        ['// Feetech STS3215 Single-Wire Half-Duplex UART Test', '#8b949e'],
        ['void setup() {', '#d2a8ff'],
        ['  Serial1.begin(115200, SERIAL_8N1, 18, 17); // <-- 115200 bps?', '#ffa657'],
        ['  uint8_t pkt[] = {0xFF, 0xFF, 0x01, 0x09, 0x03, 0x2A,', '#c9d1d9'],
        ['                   0x00, 0x08, 0x00, 0x00, 0xE8, 0x03, 0xD5};', '#79c0ff'],
        ['  Serial1.write(pkt, sizeof(pkt)); // Target = 2048 (180.0 deg)', '#c9d1d9'],
        ['}', '#d2a8ff'],
        ['', '#8b949e'],
        ['> Uploading to ESP32-S3... Done.  [Servo Response: NONE]', '#f85149'],
      ];
      lctx.font = '600 22px monospace';
      lines.forEach(([txt, col], i) => {
        lctx.fillStyle = col;
        lctx.fillText(txt, 36, 92 + i * 48);
      });
    } else if (mode === 'datasheet_1mbps') {
      lctx.fillStyle = '#f8fafc';
      lctx.fillRect(0, 38, 1024, 602);
      lctx.fillStyle = '#0f172a';
      lctx.font = '800 26px sans-serif';
      lctx.fillText('FEETECH STS3215 Communication Protocol & Memory Table (EPROM)', 34, 88);
      const rows = [
        ['0x03', 'Main Version', 'R', 'Default: 9'],
        ['0x05', 'ID (Servo Identifier)', 'R/W', 'Default: 1 (0x01)'],
        ['0x06', 'Baud Rate (通信速度初期値)', 'R/W', 'Default: 0  =>  1,000,000 bps (1 Mbps) !!'],
        ['0x2A', 'Goal Position (L / H)', 'R/W', '0 ~ 4095 (0.088 deg/step, 2048 = 180.0°)'],
      ];
      rows.forEach((r, i) => {
        const y = 135 + i * 92;
        const hi = i === 2;
        lctx.fillStyle = hi ? '#fef3c7' : '#f1f5f9';
        lctx.fillRect(34, y, 956, 74);
        if (hi) {
          lctx.strokeStyle = '#dc2626';
          lctx.lineWidth = 5;
          lctx.strokeRect(34, y, 956, 74);
        }
        lctx.fillStyle = hi ? '#b91c1c' : '#1e293b';
        lctx.font = hi ? '800 24px monospace' : '600 21px monospace';
        lctx.fillText(`${r[0]}  |  ${r[1]}  |  ${r[3]}`, 54, y + 46);
      });
      lctx.fillStyle = '#dc2626';
      lctx.font = '800 26px sans-serif';
      lctx.fillText('115,200 bps ではなく約9倍速い 1,000,000 bps (1Mbps) が初期値！', 38, 565);
    } else if (mode === 'code_1mbps') {
      lctx.fillText('ESP32-S3 — servo_single_test.cpp [01:42 AM]', 24, 25);
      lctx.fillStyle = '#1f472a';
      lctx.fillRect(28, 120, 968, 66);
      lctx.font = '700 24px monospace';
      lctx.fillStyle = '#56d364';
      lctx.fillText('Serial1.begin(1000000, SERIAL_8N1, RX_PIN, TX_PIN); // 1 Mbps!', 44, 162);
      lctx.fillStyle = '#79c0ff';
      lctx.fillText('Goal Position = 2048 (180.0 deg)  |  12-bit Magnetic Encoder Active', 44, 255);
      lctx.fillStyle = '#ffd166';
      lctx.fillText('[01:42:11] ACK OK — Present Pos: 2048 -> Deflection +9 -> Torque Pushback!', 44, 340);
    } else if (mode === 'torque_curve') {
      lctx.fillStyle = '#ffffff';
      lctx.fillRect(0, 38, 1024, 602);
      lctx.fillStyle = '#0f172a';
      lctx.font = '800 26px sans-serif';
      lctx.fillText('STS3215 (12V) トルク ― 回転数 ― 電流特性グラフ', 40, 88);
      // Axes
      lctx.strokeStyle = '#334155';
      lctx.lineWidth = 3;
      lctx.beginPath();
      lctx.moveTo(100, 130); lctx.lineTo(100, 520); lctx.lineTo(940, 520);
      lctx.stroke();
      // Safe continuous green zone vs Red Stall Burnout Zone
      lctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
      lctx.fillRect(102, 140, 260, 378);
      lctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
      lctx.fillRect(680, 140, 258, 378);
      // Speed decreasing, Current rising line
      lctx.strokeStyle = '#2563eb'; lctx.lineWidth = 5;
      lctx.beginPath(); lctx.moveTo(102, 165); lctx.lineTo(930, 515); lctx.stroke();
      lctx.strokeStyle = '#dc2626'; lctx.lineWidth = 5;
      lctx.beginPath(); lctx.moveTo(102, 495); lctx.lineTo(930, 155); lctx.stroke();
      lctx.fillStyle = '#047857'; lctx.font = '800 22px sans-serif';
      lctx.fillText('定格連続領域: 7.5〜10.0 kg·cm', 118, 185);
      lctx.fillText('HMD-01 静的膝負荷: 9.9 kg·cm (ギリギリ!)', 118, 225);
      lctx.fillStyle = '#b91c1c';
      lctx.fillText('ストール極限: 30 kg·cm / 2.7A', 640, 195);
      lctx.fillText('※数分でコイル焼損！連続使用不可', 620, 232);
      lctx.fillStyle = '#1e293b'; lctx.font = '700 20px monospace';
      lctx.fillText('0 kg·cm                               10 kg·cm                              30 kg·cm (Stall)', 100, 565);
    } else if (mode === 'cad_error') {
      lctx.fillStyle = '#1e2229';
      lctx.fillRect(0, 38, 1024, 602);
      lctx.fillStyle = '#e2e8f0'; lctx.font = '700 20px sans-serif';
      lctx.fillText('Autodesk Fusion — HMD-01_Bracket_v0.f3d  [未拘束スケッチ エラー]', 32, 76);
      // Distorted red error polygon + unconstrained blue lines
      lctx.strokeStyle = '#38bdf8'; lctx.lineWidth = 4;
      lctx.strokeRect(220, 180, 480, 240);
      lctx.fillStyle = 'rgba(239, 68, 68, 0.42)';
      lctx.strokeStyle = '#ef4444'; lctx.lineWidth = 5;
      lctx.beginPath();
      lctx.moveTo(220, 180); lctx.lineTo(745, 145); lctx.lineTo(660, 465); lctx.lineTo(190, 410); lctx.closePath();
      lctx.fill(); lctx.stroke();
      lctx.fillStyle = '#fca5a5'; lctx.font = '800 24px monospace';
      lctx.fillText('! ERROR: Extrude3 Compute Failed — Unconstrained Sketch Geometry', 90, 545);
    } else if (mode === 'cad_leg') {
      lctx.fillStyle = '#1b2430';
      lctx.fillRect(0, 38, 1024, 602);
      lctx.fillStyle = '#93c5fd'; lctx.font = '700 21px sans-serif';
      lctx.fillText('Autodesk Fusion — HMD-01 Right Leg v0.1 (Hip / Knee / Ankle Pitch 3-DOF)', 32, 78);
      lctx.strokeStyle = '#38bdf8'; lctx.lineWidth = 4;
      lctx.strokeRect(390, 120, 220, 100);
      lctx.strokeRect(425, 220, 150, 150);
      lctx.strokeRect(425, 370, 150, 140);
      lctx.strokeRect(370, 510, 260, 52);
      lctx.fillStyle = '#6ee7b7'; lctx.font = '700 20px monospace';
      lctx.fillText('Fully Constrained [OK] | L1=93mm, L2=93mm, Foot=34mm | Total=220mm', 120, 605);
    } else if (mode === 'sine_error') {
      lctx.fillStyle = '#2d070a';
      lctx.fillRect(0, 38, 1024, 602);
      lctx.fillStyle = '#ff6b6b'; lctx.font = '800 30px monospace';
      lctx.fillText('[FATAL] USB Serial Device Disconnected (COM4 Lost)', 64, 240);
      lctx.font = '700 23px monospace';
      lctx.fillText('ESP32-S3 Overvoltage / Short Detected — 3.3V Rail Collapsed (0.4 Ohm)', 48, 320);
    } else {
      lctx.fillText('HMD-01 Telemetry Monitor — Universal Perfboard v0.2 [PASS]', 24, 25);
      lctx.fillStyle = '#34d399'; lctx.font = '700 24px monospace';
      lctx.fillText('ID:01 Hip_P   Pos:2410  Load: 18%  Volt:12.1V  Temp:31C  [OK]', 44, 150);
      lctx.fillText('ID:02 Knee_P  Pos:1580  Load: 34%  Volt:12.0V  Temp:33C  [OK]', 44, 220);
      lctx.fillText('ID:03 Ank_P   Pos:2190  Load: 21%  Volt:12.1V  Temp:30C  [OK]', 44, 290);
      lctx.fillStyle = '#ffd166';
      lctx.fillText('AWG18 Star-GND + XT60 + 3A Blade Fuse + Series Clamp: ZERO FAULTS', 44, 410);
    }
    lapTex.needsUpdate = true;
  }

  function setPhoneMode(mode) {
    if (mode === curPhone) return;
    curPhone = mode;
    pctx.fillStyle = '#f8fafc';
    pctx.fillRect(0, 0, 512, 1024);
    if (mode === 'bank_185k') {
      pctx.fillStyle = '#0f172a';
      pctx.fillRect(0, 0, 512, 160);
      pctx.fillStyle = '#ffffff';
      pctx.font = '700 26px sans-serif';
      pctx.fillText('むさしの銀行 普通預金', 42, 102);
      pctx.fillStyle = '#64748b';
      pctx.font = '600 24px sans-serif';
      pctx.fillText('現在残高（開発初期資本金）', 42, 260);
      pctx.fillStyle = '#0f172a';
      pctx.font = '900 66px monospace';
      pctx.fillText('¥185,412', 42, 365);
      pctx.fillStyle = '#e2e8f0';
      pctx.fillRect(42, 430, 428, 4);
      pctx.fillStyle = '#334155';
      pctx.font = '600 22px sans-serif';
      pctx.fillText('03/29  引越アルバイト給与  +¥98,400', 42, 510);
      pctx.fillText('04/01  高校積立口座より     +¥87,012', 42, 575);
      pctx.fillStyle = '#b91c1c';
      pctx.fillText('※仕送り・生活費の流用厳禁', 42, 690);
    } else if (mode === 'camera_rec') {
      pctx.fillStyle = '#090d16';
      pctx.fillRect(0, 0, 512, 1024);
      pctx.fillStyle = '#ef4444';
      pctx.beginPath(); pctx.arc(64, 72, 14, 0, Math.PI * 2); pctx.fill();
      pctx.fillStyle = '#ffffff'; pctx.font = '700 28px monospace';
      pctx.fillText('REC  00:00:04', 94, 82);
      pctx.strokeStyle = 'rgba(255,255,255,0.45)'; pctx.lineWidth = 3;
      pctx.strokeRect(48, 160, 416, 680);
    } else {
      pctx.fillStyle = '#0f172a';
      pctx.fillRect(0, 0, 512, 150);
      pctx.fillStyle = '#ffffff'; pctx.font = '800 28px sans-serif';
      pctx.fillText('学生バイト応募完了', 42, 95);
      pctx.fillStyle = '#047857'; pctx.font = '800 26px sans-serif';
      pctx.fillText('✓ コンビニ深夜シフト (¥1,375/h)', 34, 280);
      pctx.fillText('✓ 駅前個別指導塾講師 (¥1,400/h)', 34, 365);
      pctx.fillStyle = '#334155'; pctx.font = '700 24px monospace';
      pctx.fillText('現在開発残高: ¥78,420', 34, 520);
      pctx.fillText('目標: 全16自由度 完走へ', 34, 580);
    }
    phTex.needsUpdate = true;
  }

  function setMeterMode(mode) {
    if (mode === curMeter) return;
    curMeter = mode;
    mctx.fillStyle = mode === 'short' ? '#fca5a5' : '#b8c9b4';
    mctx.fillRect(0, 0, 512, 320);
    mctx.strokeStyle = '#334155';
    mctx.lineWidth = 8;
    mctx.strokeRect(8, 8, 496, 304);
    mctx.fillStyle = '#0f172a';
    mctx.font = '700 26px monospace';
    if (mode === '12v') {
      mctx.fillText('DC V   AUTO', 32, 56);
      mctx.font = '900 108px monospace';
      mctx.fillText('12.14 V', 34, 215);
    } else if (mode === 'short') {
      mctx.fillStyle = '#991b1b';
      mctx.fillText(')))  CONT / SHORT  3.3V-GND', 28, 56);
      mctx.font = '900 108px monospace';
      mctx.fillText('0.4 Ω', 64, 215);
      mctx.font = '800 28px monospace';
      mctx.fillText('BEEP!! DEAD SHORT', 95, 282);
    } else {
      mctx.fillText('DC V   PASS', 32, 56);
      mctx.font = '900 104px monospace';
      mctx.fillText('12.10 V', 34, 215);
    }
    mmTex.needsUpdate = true;
  }

  function setNotebookMode(mode) {
    if (mode === curNb) return;
    curNb = mode;
    nctx.fillStyle = '#fcfbf7';
    nctx.fillRect(0, 0, 1024, 768);
    // Crisp 5mm cyan-grey engineering grid
    nctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    nctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 24) {
      nctx.beginPath(); nctx.moveTo(x, 0); nctx.lineTo(x, 768); nctx.stroke();
    }
    for (let y = 0; y < 768; y += 24) {
      nctx.beginPath(); nctx.moveTo(0, y); nctx.lineTo(1024, y); nctx.stroke();
    }
    nctx.fillStyle = '#1e293b';
    if (mode === 'akiba_list') {
      nctx.font = '800 32px sans-serif';
      nctx.fillText('Day 003 初期設備・第1軸検証 支出集計', 48, 72);
      nctx.font = '600 25px monospace';
      const items = [
        '・Bambu Lab A1 (256mm角造形) ........ ¥54,800',
        '・コンクリート平板 + 防振ゴム ....... ¥ 1,430',
        '・白光 FX-600 / 三和 CD771 / 工具 ... ¥26,800',
        '・Feetech STS3215 ×2 (12V/12bit) .... ¥ 5,900',
        '・ESP32-S3 + FE-URT-1 + 12V5A電源 ... ¥ 5,800',
        '----------------------------------------------',
        '  初日支出合計: -¥94,730   残り資金: ¥90,270',
      ];
      items.forEach((ln, i) => {
        nctx.fillStyle = i === 6 ? '#b91c1c' : '#1e293b';
        nctx.fillText(ln, 48, 145 + i * 66);
      });
    } else if (mode === 'hex_packet') {
      nctx.font = '800 30px sans-serif';
      nctx.fillText('STS3215 半二重シリアル パケット手計算 (1 Mbps)', 48, 72);
      nctx.font = '700 26px monospace';
      nctx.fillText('[0xFF][0xFF] [ID:01] [Len:09] [Inst:03] [Addr:2A]', 48, 165);
      nctx.fillStyle = '#1d4ed8';
      nctx.fillText('目標中央 180.0° = 2048 = 0x0800 -> Little Endian: 0x00, 0x08', 48, 248);
      nctx.fillStyle = '#0f172a';
      nctx.fillText('Checksum = ~(01+09+03+2A+00+08+00+00+E8+03) = 0xD5', 48, 330);
      nctx.fillStyle = '#b91c1c';
      nctx.fillText('★ Address 0x06 Default Baud = 1,000,000 bps !!', 48, 425);
    } else if (mode === 'dof_torque') {
      nctx.font = '800 32px sans-serif';
      nctx.fillText('第一世代機『HMD-01』基本諸元・膝ピッチ軸トルク計算', 48, 72);
      nctx.font = '700 25px monospace';
      nctx.fillText('身長 H = 380 mm (大腿 93 + 下腿 93 + 足首 34 = 脚 190 mm)', 48, 155);
      nctx.fillText('自由度 = 16 DOF (片脚6軸 [Yaw/Roll/Pitch/Knee/AnkP/AnkR]×2 + 腕2×2)', 48, 220);
      nctx.fillText('目標総質量 m_total = 1.80 kg (STS3215 55g × 16 = 880g)', 48, 285);
      nctx.fillStyle = '#1d4ed8';
      nctx.fillText('τ_static = m·g·L·sin(45°) = 1.5 × 9.81 × 0.093 × 0.707', 48, 380);
      nctx.fillText('         = 0.968 N·m  (≈ 9.9 kg·cm)', 48, 435);
      nctx.fillStyle = '#b91c1c';
      nctx.fillText('※定格連続 7.5〜10.0 kg·cm + 着地動的負荷 1.5倍 → 1gも無駄不可！', 48, 525);
    } else {
      nctx.font = '800 32px sans-serif';
      nctx.fillText('Day 024 電源・信号分離 ユニバーサル基板改修完了', 48, 72);
      nctx.font = '700 26px monospace';
      nctx.fillText('・焼損原因: ブレッドボード GND浮き → DATA線 12V逆流', 48, 165);
      nctx.fillText('・対策: AWG18 極太すずめっきGND母線 + XT60 + 3Aヒューズ', 48, 240);
      nctx.fillText('・信号保護: 直列電流制限抵抗 + クランプ保護 (逆流根絶)', 48, 315);
      nctx.fillStyle = '#b91c1c';
      nctx.font = '900 38px monospace';
      nctx.fillText('残り開発資金: ¥78,420  (今回支出 -¥11,850)', 48, 455);
    }
    nbTex.needsUpdate = true;
  }

  function setChalkProgress(stage) {
    if (stage === curChalk) return;
    curChalk = stage;
    cctx.fillStyle = '#193829';
    cctx.fillRect(0, 0, 1280, 640);
    // Subtle chalk dust smudge
    cctx.fillStyle = 'rgba(255,255,255,0.04)';
    cctx.fillRect(80, 60, 1120, 520);

    cctx.fillStyle = '#f8fafc';
    cctx.font = '700 34px serif';
    cctx.fillText('電気回路Ⅰ — 第3回：キルヒホッフの電流則 (KCL) と帰還路 (Return Path)', 52, 74);

    // KCL Formula
    cctx.fillStyle = '#fef08a';
    cctx.font = '900 58px serif';
    cctx.fillText('∑ I_in  =  ∑ I_out', 92, 185);

    if (stage >= 1) {
      // Schematic of 12V -> Servo -> Broken GND -> Backfeed into 3.3V MCU!
      cctx.strokeStyle = '#ffffff';
      cctx.lineWidth = 4;
      cctx.strokeRect(110, 260, 240, 150); // 12V PSU
      cctx.strokeRect(510, 240, 270, 180); // STS3215 Servo
      cctx.strokeRect(930, 260, 250, 150); // ESP32-S3 (3.3V)

      cctx.font = '700 26px sans-serif';
      cctx.fillStyle = '#ffffff';
      cctx.fillText('12V 動力電源', 148, 345);
      cctx.fillText('サーボ (12V系)', 555, 330);
      cctx.fillText('マイコン (3.3V)', 962, 345);

      // +12V top line
      cctx.strokeStyle = '#fca5a5';
      cctx.beginPath(); cctx.moveTo(350, 290); cctx.lineTo(510, 290); cctx.stroke();

      // Broken GND bottom line!
      cctx.strokeStyle = '#94a3b8';
      cctx.beginPath(); cctx.moveTo(350, 490); cctx.lineTo(560, 490); cctx.stroke();
      cctx.fillStyle = '#f87171';
      cctx.font = '900 44px sans-serif';
      cctx.fillText('✕ GND浮き（断線！）', 475, 552);

      // Deadly 12V backfeed arrow through DATA -> GPIO ESD Diode -> 3.3V!
      cctx.strokeStyle = '#facc15';
      cctx.lineWidth = 6;
      cctx.beginPath(); cctx.moveTo(780, 330); cctx.lineTo(930, 330); cctx.stroke();
      cctx.fillStyle = '#fde047';
      cctx.font = '800 26px sans-serif';
      cctx.fillText('DATA信号線へ12V逆流！ → 保護ダイオード突破・焼損', 600, 215);
    }
    cbTex.needsUpdate = true;
  }

  // Initialize defaults
  setLaptopMode('code_115200');
  setPhoneMode('bank_185k');
  setMeterMode('12v');
  setNotebookMode('akiba_list');
  setChalkProgress(1);

  return {
    laptopMat,
    phoneMat,
    meterMat,
    notebookMat,
    whiteboardMat,
    chalkboardMat,
    setLaptopMode,
    setPhoneMode,
    setMeterMode,
    setNotebookMode,
    setChalkProgress,
  };
}
