import * as THREE from 'three';

/**
 * Converts a grayscale height canvas into a true RGB Tangent-Space Normal Map!
 */
export function heightCanvasToNormalTex(heightCanvas, strength = 2.4, repeatX = 1, repeatY = 1) {
  const w = heightCanvas.width;
  const h = heightCanvas.height;
  const hctx = heightCanvas.getContext('2d');
  const src = hctx.getImageData(0, 0, w, h).data;

  const normC = document.createElement('canvas');
  normC.width = w;
  normC.height = h;
  const nctx = normC.getContext('2d');
  const out = nctx.createImageData(w, h);
  const dst = out.data;

  const sample = (x, y) => {
    const wx = ((x % w) + w) % w;
    const wy = ((y % h) + h) % h;
    return src[(wy * w + wx) * 4] / 255.0;
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = (sample(x + 1, y) - sample(x - 1, y)) * strength;
      const dy = (sample(x, y + 1) - sample(x, y - 1)) * strength;
      let nx = -dx;
      let ny = dy; // OpenGL +Y tangent normal
      let nz = 1.0;
      const inv = 1.0 / Math.hypot(nx, ny, nz);
      nx *= inv;
      ny *= inv;
      nz *= inv;
      const idx = (y * w + x) * 4;
      dst[idx] = Math.round((nx * 0.5 + 0.5) * 255);
      dst[idx + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      dst[idx + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      dst[idx + 3] = 255;
    }
  }
  nctx.putImageData(out, 0, 0);

  const tex = new THREE.CanvasTexture(normC);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = 8;
  return tex;
}

/**
 * Rich Multi-Light Architectural Studio HDRI Environment Map (1024x512)
 * Produces razor-crisp metallic highlights on gold ENIG pads, lead-free solder, stainless blades, and LPI solder mask!
 */
export function createNextGenStudioIBL(renderer) {
  const w = 1024;
  const h = 512;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0.0, '#dce8f8');
  bg.addColorStop(0.28, '#cbd5e1');
  bg.addColorStop(0.48, '#64748b');
  bg.addColorStop(0.52, '#3b332b');
  bg.addColorStop(1.0, '#181411');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Crisp overhead softbox strip + warm tungsten desk-lamp specular lobe + cool window pane!
  const addSoftbox = (x, y, rx, ry, col) => {
    const g = ctx.createRadialGradient(x, y, 4, x, y, Math.max(rx, ry));
    g.addColorStop(0, col);
    g.addColorStop(0.55, col.replace('0.98', '0.35'));
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  };
  addSoftbox(w * 0.24, h * 0.30, 180, 110, 'rgba(235, 246, 255, 0.98)');
  addSoftbox(w * 0.72, h * 0.24, 165, 95, 'rgba(255, 232, 185, 0.98)');
  // Sharp specular catchlight bars (crucial for realistic metal/solder/glass glints!)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.fillRect(w * 0.44, h * 0.11, w * 0.16, h * 0.035);
  ctx.fillStyle = 'rgba(255, 242, 210, 0.85)';
  ctx.fillRect(w * 0.66, h * 0.16, w * 0.09, h * 0.025);

  const eq = new THREE.CanvasTexture(c);
  eq.mapping = THREE.EquirectangularReflectionMapping;
  eq.colorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const rt = pmrem.fromEquirectangular(eq);
  eq.dispose();
  pmrem.dispose();
  return rt;
}

/**
 * Generates High-Resolution 1024x1024 PBR Materials (Color + Normal + Roughness/Metalness)
 * for `HMD-CORE-v1` Emerald JLCPCB Board, Birch Plywood Balance Board, Pore-Detailed Walnut,
 * and Realistic Fingernail-Equipped Human Hands!
 */
export function createNextGenMicroMaterials() {
  // ===========================================================================
  // 1. HMD-CORE-v1 Custom 2-Layer JLCPCB Emerald PCB (Color + Normal + Roughness!)
  // ===========================================================================
  const pcbColorC = document.createElement('canvas');
  pcbColorC.width = 1024;
  pcbColorC.height = 1024;
  const pctx = pcbColorC.getContext('2d');

  const pcbHeightC = document.createElement('canvas');
  pcbHeightC.width = 1024;
  pcbHeightC.height = 1024;
  const hctx = pcbHeightC.getContext('2d');

  const pcbRoughC = document.createElement('canvas');
  pcbRoughC.width = 1024;
  pcbRoughC.height = 1024;
  const rctx = pcbRoughC.getContext('2d');

  // Deep translucent JLCPCB Emerald Green LPI Solder Mask base
  pctx.fillStyle = '#075e36';
  pctx.fillRect(0, 0, 1024, 1024);
  hctx.fillStyle = '#707070';
  hctx.fillRect(0, 0, 1024, 1024);
  rctx.fillStyle = '#2e2e2e'; // Very glossy LPI lacquer (~0.18 roughness)
  rctx.fillRect(0, 0, 1024, 1024);

  // Subtle brighter green copper pours & 0.2mm signal traces raised beneath LPI solder mask!
  pctx.strokeStyle = '#0d7a47';
  hctx.strokeStyle = '#b8b8b8'; // Raised 35um copper trace emboss!
  pctx.lineWidth = 7;
  hctx.lineWidth = 8;
  for (let i = 0; i < 22; i++) {
    const y = 90 + i * 38;
    pctx.beginPath();
    pctx.moveTo(95, y);
    pctx.lineTo(360, y);
    pctx.lineTo(410, y + (i % 2 === 0 ? 22 : -22));
    pctx.lineTo(920, y + (i % 2 === 0 ? 22 : -22));
    pctx.stroke();

    hctx.beginPath();
    hctx.moveTo(95, y);
    hctx.lineTo(360, y);
    hctx.lineTo(410, y + (i % 2 === 0 ? 22 : -22));
    hctx.lineTo(920, y + (i % 2 === 0 ? 22 : -22));
    hctx.stroke();
  }

  // CENTRAL 8.8mm EXPOSED ENIG 24k GOLD SOLDER-MASK APERTURE ("レジスト開口の銅帯")!
  pctx.fillStyle = '#eab308';
  pctx.fillRect(110, 448, 804, 128);
  pctx.fillStyle = '#fde047';
  pctx.fillRect(116, 456, 792, 112);
  hctx.fillStyle = '#d8d8d8';
  hctx.fillRect(110, 448, 804, 128);
  rctx.fillStyle = '#181818'; // Mirror-like gold pad roughness (~0.09)
  rctx.fillRect(110, 448, 804, 128);

  // Dense Via-Stitching Array along the Exposed Busbar + Ground Plane Vias!
  const drawVia = (vx, vy, r = 9) => {
    pctx.fillStyle = '#fbbf24';
    pctx.beginPath(); pctx.arc(vx, vy, r, 0, Math.PI * 2); pctx.fill();
    pctx.fillStyle = '#041f12';
    pctx.beginPath(); pctx.arc(vx, vy, r * 0.45, 0, Math.PI * 2); pctx.fill();
    hctx.fillStyle = '#202020';
    hctx.beginPath(); hctx.arc(vx, vy, r * 0.5, 0, Math.PI * 2); hctx.fill();
  };
  for (let vx = 140; vx <= 884; vx += 38) {
    drawVia(vx, 472, 8);
    drawVia(vx, 552, 8);
  }
  for (let gx = 120; gx <= 900; gx += 76) {
    for (const gy of [120, 904]) drawVia(gx, gy, 7);
  }

  // 4 Corner M3 Gold Mounting Holes
  for (const [cx, cy] of [[68, 68], [956, 68], [68, 956], [956, 956]]) {
    pctx.fillStyle = '#facc15';
    pctx.beginPath(); pctx.arc(cx, cy, 34, 0, Math.PI * 2); pctx.fill();
    pctx.fillStyle = '#090d12';
    pctx.beginPath(); pctx.arc(cx, cy, 18, 0, Math.PI * 2); pctx.fill();
  }

  // Crisp White Silkscreen Typography ("HMD-CORE-v1 / Rev 1.0 / Designed by M.Saeki")
  pctx.fillStyle = '#f8fafc';
  rctx.fillStyle = '#a0a0a0'; // Matte white silkscreen ink!
  pctx.font = '900 38px monospace';
  pctx.fillText('HMD-CORE-v1  Rev 1.0', 128, 78);
  pctx.font = '800 30px monospace';
  pctx.fillText('Designed by M.Saeki', 545, 968);

  pctx.font = '800 22px monospace';
  pctx.fillText('PORT1:R_LEG', 135, 868);
  pctx.fillText('PORT2:L_LEG', 335, 868);
  pctx.fillText('PORT3:R_ARM', 545, 868);
  pctx.fillText('PORT4:L_ARM', 755, 868);
  pctx.fillText('3S LiPo 12.6V', 120, 432);
  pctx.fillText('Q1:4mΩ IDEAL DIODE', 360, 432);
  pctx.fillText('BNO085 IMU (CoM)', 415, 622);
  pctx.fillText('BZ1 10.2V', 815, 220);

  // Silkscreen component outlines
  pctx.strokeStyle = '#f8fafc';
  pctx.lineWidth = 4;
  pctx.strokeRect(130, 140, 290, 240); // ESP32-S3 outline
  pctx.strokeRect(435, 640, 165, 130); // BNO085 outline
  for (const px of [155, 355, 565, 775]) {
    pctx.strokeRect(px, 882, 115, 56); // 4x 5264-3P connector silkscreen boxes!
  }

  const pcbColorTex = new THREE.CanvasTexture(pcbColorC);
  pcbColorTex.colorSpace = THREE.SRGBColorSpace;
  pcbColorTex.anisotropy = 8;
  const pcbNormalTex = heightCanvasToNormalTex(pcbHeightC, 2.8);
  const pcbRoughTex = new THREE.CanvasTexture(pcbRoughC);

  const hmdCorePcbTopMat = new THREE.MeshPhysicalMaterial({
    map: pcbColorTex,
    normalMap: pcbNormalTex,
    normalScale: new THREE.Vector2(0.55, 0.55),
    roughnessMap: pcbRoughTex,
    roughness: 0.85,
    metalness: 0.18,
    clearcoat: 0.92,
    clearcoatRoughness: 0.09,
  });

  const fr4EdgeMat = new THREE.MeshStandardMaterial({
    color: 0xc8b278, // Authentic raw woven fiberglass epoxy edge!
    roughness: 0.62,
  });

  // ===========================================================================
  // 2. Natural Birch Plywood Balance Board ("厚さ12mm・幅40cmの合板")
  // ===========================================================================
  const plyColC = document.createElement('canvas');
  plyColC.width = 1024;
  plyColC.height = 512;
  const bctx = plyColC.getContext('2d');

  const plyHgtC = document.createElement('canvas');
  plyHgtC.width = 512;
  plyHgtC.height = 256;
  const bhctx = plyHgtC.getContext('2d');

  bctx.fillStyle = '#d9be93';
  bctx.fillRect(0, 0, 1024, 512);
  bhctx.fillStyle = '#808080';
  bhctx.fillRect(0, 0, 512, 256);

  for (let y = 0; y < 512; y += 2) {
    const wave = Math.sin(y * 0.035) * 18 + Math.cos(y * 0.09) * 7;
    const tone = 205 + Math.sin((y + wave) * 0.14) * 18;
    bctx.fillStyle = `rgb(${tone + 12}, ${tone - 14}, ${tone - 52})`;
    bctx.fillRect(0, y, 1024, 2);
  }
  for (let i = 0; i < 320; i++) {
    bhctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';
    bhctx.fillRect(0, Math.random() * 256, 512, 1.5);
  }

  const plyColTex = new THREE.CanvasTexture(plyColC);
  plyColTex.colorSpace = THREE.SRGBColorSpace;
  plyColTex.anisotropy = 8;
  const plyNormTex = heightCanvasToNormalTex(plyHgtC, 1.8);

  const birchPlywoodMat = new THREE.MeshPhysicalMaterial({
    map: plyColTex,
    normalMap: plyNormTex,
    normalScale: new THREE.Vector2(0.35, 0.35),
    roughness: 0.58,
    clearcoat: 0.08,
  });

  // ===========================================================================
  // 3. Rich Pore-Textured Satin Walnut Engineering Desktop
  // ===========================================================================
  const walColC = document.createElement('canvas');
  walColC.width = 1024;
  walColC.height = 512;
  const wctx = walColC.getContext('2d');
  const wg = wctx.createLinearGradient(0, 0, 1024, 0);
  wg.addColorStop(0, '#4a2f1d');
  wg.addColorStop(0.5, '#5b3b25');
  wg.addColorStop(1, '#462c1a');
  wctx.fillStyle = wg;
  wctx.fillRect(0, 0, 1024, 512);
  for (let i = 0; i < 480; i++) {
    wctx.fillStyle = i % 2 === 0 ? 'rgba(22,10,4,0.16)' : 'rgba(145,98,62,0.09)';
    wctx.fillRect(0, Math.random() * 512, 1024, 1 + Math.random() * 2.5);
  }
  const walTex = new THREE.CanvasTexture(walColC);
  walTex.colorSpace = THREE.SRGBColorSpace;
  walTex.anisotropy = 8;

  const walnutProMat = new THREE.MeshPhysicalMaterial({
    map: walTex,
    normalMap: plyNormTex,
    normalScale: new THREE.Vector2(0.22, 0.22),
    roughness: 0.32,
    metalness: 0.02,
    clearcoat: 0.36,
    clearcoatRoughness: 0.24,
  });

  // ===========================================================================
  // 4. Micro-Pore Human Skin + Glossy Keratin Fingernail + UV Fluorescent Resin!
  // ===========================================================================
  const skinHgtC = document.createElement('canvas');
  skinHgtC.width = 256;
  skinHgtC.height = 256;
  const sctx = skinHgtC.getContext('2d');
  sctx.fillStyle = '#808080';
  sctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2400; i++) {
    sctx.fillStyle = i % 2 === 0 ? '#949494' : '#6b6b6b';
    sctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 1.5);
  }
  const skinNormTex = heightCanvasToNormalTex(skinHgtC, 1.3, 4, 4);

  const skinNextGen = new THREE.MeshPhysicalMaterial({
    color: 0xeec0a2,
    normalMap: skinNormTex,
    normalScale: new THREE.Vector2(0.18, 0.18),
    roughness: 0.52,
    sheen: 0.34,
    sheenRoughness: 0.62,
    sheenColor: new THREE.Color(0xffb89e),
    clearcoat: 0.06,
    clearcoatRoughness: 0.5,
  });

  const fingernailMat = new THREE.MeshPhysicalMaterial({
    color: 0xf7dcd2,
    roughness: 0.18,
    clearcoat: 0.92,
    clearcoatRoughness: 0.08,
  });

  const goldEnigMat = new THREE.MeshPhysicalMaterial({
    color: 0xfbbf24,
    metalness: 0.98,
    roughness: 0.11,
    clearcoat: 0.5,
  });

  const solderBusbarMat = new THREE.MeshPhysicalMaterial({
    color: 0xeef2f8,
    normalMap: skinNormTex,
    normalScale: new THREE.Vector2(0.08, 0.08),
    metalness: 0.99,
    roughness: 0.07,
    clearcoat: 0.75,
  });

  const uvMaskResinMat = new THREE.MeshPhysicalMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 0.25,
    transparent: true,
    opacity: 0.88,
    roughness: 0.08,
    clearcoat: 1.0,
  });

  const lipoWrapBlue = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    roughness: 0.24,
    metalness: 0.12,
    clearcoat: 0.75,
    clearcoatRoughness: 0.15,
  });

  return {
    hmdCorePcbTopMat,
    fr4EdgeMat,
    birchPlywoodMat,
    walnutProMat,
    skinNextGen,
    fingernailMat,
    goldEnigMat,
    solderBusbarMat,
    uvMaskResinMat,
    lipoWrapBlue,
  };
}

/**
 * Builds a Next-Gen Photorealistic Articulated Hand with Individual Glossy Keratin Fingernails
 * and Knuckle Contours (side = -1 for Left Hand, +1 for Right Hand)
 */
export function createNextGenHandRig(baseMats, ngMats, side = 1) {
  const group = new THREE.Group();

  const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.030, 0.20, 24), baseMats.hoodieNavy);
  sleeve.rotation.x = Math.PI / 2;
  sleeve.position.set(0, 0, 0.145);
  sleeve.castShadow = true;
  group.add(sleeve);

  const wrist = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.025, 0.045, 20), ngMats.skinNextGen);
  wrist.rotation.x = Math.PI / 2;
  wrist.position.set(0, 0, 0.032);
  group.add(wrist);

  const palm = new THREE.Mesh(new THREE.SphereGeometry(0.030, 24, 18), ngMats.skinNextGen);
  palm.scale.set(0.98, 0.42, 1.15);
  palm.position.set(0, 0, -0.004);
  palm.castShadow = true;
  group.add(palm);

  const fingerSpecs = [
    { x: -0.020 * side, r: 0.0056, l1: 0.024, l2: 0.019 }, // Index
    { x: -0.007 * side, r: 0.0059, l1: 0.026, l2: 0.021 }, // Middle
    { x:  0.006 * side, r: 0.0055, l1: 0.024, l2: 0.019 }, // Ring
    { x:  0.018 * side, r: 0.0049, l1: 0.019, l2: 0.016 }, // Little
  ];

  const fingers = [];
  for (const fs of fingerSpecs) {
    const knuckle = new THREE.Group();
    knuckle.position.set(fs.x, 0.001, -0.032);

    const s1 = new THREE.Mesh(new THREE.CapsuleGeometry(fs.r, fs.l1, 8, 14), ngMats.skinNextGen);
    s1.rotation.x = Math.PI / 2;
    s1.position.z = -fs.l1 * 0.5;
    s1.castShadow = true;
    knuckle.add(s1);

    const tip = new THREE.Group();
    tip.position.z = -fs.l1 - fs.r * 0.25;
    const s2 = new THREE.Mesh(new THREE.CapsuleGeometry(fs.r * 0.88, fs.l2, 8, 14), ngMats.skinNextGen);
    s2.rotation.x = Math.PI / 2;
    s2.position.z = -fs.l2 * 0.5;
    s2.castShadow = true;
    tip.add(s2);

    // Glossy Keratin Fingernail Plate!
    const nail = new THREE.Mesh(new THREE.SphereGeometry(fs.r * 0.78, 14, 10), ngMats.fingernailMat);
    nail.scale.set(0.92, 0.24, 1.35);
    nail.position.set(0, fs.r * 0.76, -fs.l2 * 0.68);
    tip.add(nail);

    knuckle.add(tip);
    group.add(knuckle);
    fingers.push({ knuckle, tip });
  }

  // Opposable Thumb + Thumbnail
  const thumb = new THREE.Group();
  thumb.position.set(-0.026 * side, -0.004, -0.014);
  thumb.rotation.y = side * 0.48;
  const ts1 = new THREE.Mesh(new THREE.CapsuleGeometry(0.0062, 0.024, 8, 14), ngMats.skinNextGen);
  ts1.rotation.x = Math.PI / 2;
  ts1.position.z = -0.015;
  ts1.castShadow = true;
  thumb.add(ts1);
  const tNail = new THREE.Mesh(new THREE.SphereGeometry(0.005, 12, 10), ngMats.fingernailMat);
  tNail.scale.set(0.95, 0.24, 1.3);
  tNail.position.set(0, 0.005, -0.023);
  thumb.add(tNail);
  group.add(thumb);

  function setGrip(curl = 0.45) {
    fingers.forEach((f, idx) => {
      f.knuckle.rotation.x = -curl * (0.65 + idx * 0.07);
      f.tip.rotation.x = -curl * 0.78;
    });
    thumb.rotation.x = -curl * 0.35;
  }

  return { group, fingers, thumb, setGrip };
}
