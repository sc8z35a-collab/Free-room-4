import * as THREE from 'three';

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clampByte(v) {
  return Math.max(0, Math.min(255, Math.round(v)));
}

function hexToRgb(hex) {
  const n = typeof hex === 'string' ? parseInt(hex.replace('#', ''), 16) : hex;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbStr(r, g, b, a = 1) {
  return a >= 1
    ? `rgb(${clampByte(r)},${clampByte(g)},${clampByte(b)})`
    : `rgba(${clampByte(r)},${clampByte(g)},${clampByte(b)},${a})`;
}

/**
 * Generates crisp 16x16 voxel pixel-art textures upscaled to 128x128 with subtle
 * edge bevels, micro-shading, and a companion bump map so directional sunlight
 * catches every individual voxel face like a high-end shader pack.
 */
function makePixelTextures(painter, { seed = 1337, repeatX = 1, repeatY = 1, bevel = true, srgb = true } = {}) {
  const grid = 16;
  const scale = 8;
  const size = grid * scale;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const ctx = colorCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bctx = bumpCanvas.getContext('2d');

  const rng = mulberry32(seed);
  const heights = new Float32Array(grid * grid);

  const setCell = (gx, gy, r, g, b, h = 0.5) => {
    if (gx < 0 || gx >= grid || gy < 0 || gy >= grid) return;
    heights[gy * grid + gx] = h;
    ctx.fillStyle = rgbStr(r, g, b);
    ctx.fillRect(gx * scale, gy * scale, scale, scale);
    const bv = clampByte(h * 255);
    bctx.fillStyle = rgbStr(bv, bv, bv);
    bctx.fillRect(gx * scale, gy * scale, scale, scale);
  };

  painter({ grid, scale, size, ctx, bctx, rng, setCell });

  if (bevel) {
    // Subtle micro-bevel around the outer voxel edge so blocks read crisply in close-ups
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(0, 0, size, 3);
    ctx.fillRect(0, 0, 3, size);
    ctx.fillStyle = 'rgba(0,0,0,0.16)';
    ctx.fillRect(0, size - 4, size, 4);
    ctx.fillRect(size - 4, 0, 4, size);

    bctx.fillStyle = 'rgba(0,0,0,0.28)';
    bctx.fillRect(0, 0, size, 2);
    bctx.fillRect(0, size - 2, size, 2);
    bctx.fillRect(0, 0, 2, size);
    bctx.fillRect(size - 2, 0, 2, size);
  }

  const map = new THREE.CanvasTexture(colorCanvas);
  map.magFilter = THREE.NearestFilter;
  map.minFilter = THREE.LinearMipmapLinearFilter;
  map.anisotropy = 8;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeatX, repeatY);
  if (srgb) map.colorSpace = THREE.SRGBColorSpace;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.magFilter = THREE.NearestFilter;
  bumpMap.minFilter = THREE.LinearMipmapLinearFilter;
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(repeatX, repeatY);

  return { map, bumpMap, colorCanvas, bumpCanvas };
}

function makeNoisyBlock(baseHex, variance, seed, opts = {}) {
  const [br, bg, bb] = hexToRgb(baseHex);
  return makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const n = (rng() - 0.5) * 2 * variance;
          const speck = rng() < 0.08 ? -variance * 0.9 : rng() > 0.93 ? variance * 0.7 : 0;
          const d = n + speck;
          const h = 0.5 + (d / Math.max(1, variance * 2)) * 0.45;
          setCell(x, y, br + d, bg + d * 0.98, bb + d * 0.95, h);
        }
      }
    },
    { seed, ...opts }
  );
}

export function createMaterialLibrary() {
  const mats = {};

  // 1. Grass Top & Side & Dirt
  const grassTopTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const n = (rng() - 0.5) * 28;
          const blade = (x + y * 3) % 5 === 0 ? 12 : 0;
          setCell(x, y, 76 + n * 0.7, 152 + n + blade, 58 + n * 0.6, 0.55 + (n + blade) / 90);
        }
      }
    },
    { seed: 101 }
  );

  const grassSideTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const overhang = 3 + ((x * 7 + 3) % 3);
          if (y < overhang) {
            const n = (rng() - 0.5) * 24;
            setCell(x, y, 74 + n * 0.7, 148 + n, 56 + n * 0.6, 0.75);
          } else {
            const n = (rng() - 0.5) * 24;
            const pebble = rng() < 0.1 ? -22 : 0;
            setCell(x, y, 122 + n + pebble, 86 + n * 0.8 + pebble, 58 + n * 0.6 + pebble, 0.45 + n / 80);
          }
        }
      }
    },
    { seed: 102 }
  );

  const dirtTex = makeNoisyBlock(0x7c5538, 18, 103);
  const stoneTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const strata = Math.sin(y * 0.9 + (x % 4) * 0.4) * 10;
          const n = (rng() - 0.5) * 26 + strata;
          const crack = (y === 5 && x > 3 && x < 12) || (y === 11 && x < 9) ? -28 : 0;
          const v = 128 + n + crack;
          setCell(x, y, v * 0.97, v * 0.99, v * 1.03, 0.5 + (n + crack) / 90);
        }
      }
    },
    { seed: 104 }
  );

  const deepStoneTex = makeNoisyBlock(0x4a505c, 16, 105);
  const snowTex = makeNoisyBlock(0xeff5fc, 10, 106);
  const scorchedTex = makeNoisyBlock(0x282321, 14, 107);

  mats.grassTop = new THREE.MeshStandardMaterial({ map: grassTopTex.map, bumpMap: grassTopTex.bumpMap, bumpScale: 0.14, roughness: 0.88, metalness: 0.02 });
  mats.grassSide = new THREE.MeshStandardMaterial({ map: grassSideTex.map, bumpMap: grassSideTex.bumpMap, bumpScale: 0.14, roughness: 0.9, metalness: 0.02 });
  mats.dirt = new THREE.MeshStandardMaterial({ map: dirtTex.map, bumpMap: dirtTex.bumpMap, bumpScale: 0.16, roughness: 0.94, metalness: 0.02 });
  mats.stone = new THREE.MeshStandardMaterial({ map: stoneTex.map, bumpMap: stoneTex.bumpMap, bumpScale: 0.22, roughness: 0.86, metalness: 0.06 });
  mats.deepStone = new THREE.MeshStandardMaterial({ map: deepStoneTex.map, bumpMap: deepStoneTex.bumpMap, bumpScale: 0.24, roughness: 0.82, metalness: 0.1 });
  mats.snow = new THREE.MeshStandardMaterial({ map: snowTex.map, bumpMap: snowTex.bumpMap, bumpScale: 0.08, roughness: 0.65, metalness: 0.05 });
  mats.scorched = new THREE.MeshStandardMaterial({ map: scorchedTex.map, bumpMap: scorchedTex.bumpMap, bumpScale: 0.25, roughness: 0.95, metalness: 0.04 });

  // Ground tiled grass material
  const groundTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const n = (rng() - 0.5) * 22;
          setCell(x, y, 70 + n * 0.7, 138 + n, 54 + n * 0.6, 0.55 + n / 80);
        }
      }
    },
    { seed: 108, repeatX: 90, repeatY: 90, bevel: true }
  );
  mats.groundGrass = new THREE.MeshStandardMaterial({ map: groundTex.map, bumpMap: groundTex.bumpMap, bumpScale: 0.14, roughness: 0.9, metalness: 0.02 });

  // 2. Iconic Minecraft-Style Voxel TNT Block!
  const tntSideTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      // Red dynamite sticks vertically segmented + crisp white central label band with "TNT"
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const seam = x % 4 === 0 ? -24 : x % 4 === 3 ? -12 : 8;
          const n = (rng() - 0.5) * 14;
          if (y >= 5 && y <= 10) {
            // White band
            const w = 236 + (rng() - 0.5) * 10;
            setCell(x, y, w, w * 0.98, w * 0.95, 0.8);
          } else if (y === 4 || y === 11) {
            // Dark binding strap
            setCell(x, y, 42, 34, 34, 0.35);
          } else {
            // Red dynamite casing
            setCell(x, y, 212 + seam + n, 40 + n * 0.4, 34 + n * 0.4, 0.65 + seam / 80);
          }
        }
      }
      // Crisp pixel-art "TNT" lettering inside white band (rows 6..9)
      const pixels = [
        // T (cols 1..3)
        [1, 6], [2, 6], [3, 6], [2, 7], [2, 8], [2, 9],
        // N (cols 5..9)
        [5, 6], [5, 7], [5, 8], [5, 9],
        [6, 7], [7, 8],
        [8, 6], [8, 7], [8, 8], [8, 9],
        // T (cols 11..13)
        [11, 6], [12, 6], [13, 6], [12, 7], [12, 8], [12, 9],
      ];
      for (const [px, py] of pixels) {
        setCell(px, py, 20, 20, 24, 0.95);
      }
    },
    { seed: 201 }
  );

  const tntTopTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const cx = (x % 4) - 1.5;
          const cy = (y % 4) - 1.5;
          const dist = Math.hypot(cx, cy);
          const n = (rng() - 0.5) * 16;
          if (dist < 1.1) {
            setCell(x, y, 185 + n, 44, 38, 0.7);
          } else {
            setCell(x, y, 52 + n * 0.5, 42, 40, 0.3);
          }
        }
      }
      // Central sparkling fuse cap
      setCell(7, 7, 255, 220, 120, 1.0);
      setCell(8, 7, 255, 160, 40, 1.0);
      setCell(7, 8, 255, 140, 30, 1.0);
      setCell(8, 8, 255, 240, 180, 1.0);
    },
    { seed: 202 }
  );

  const tntSideMat = new THREE.MeshStandardMaterial({ map: tntSideTex.map, bumpMap: tntSideTex.bumpMap, bumpScale: 0.16, roughness: 0.72, metalness: 0.05 });
  const tntTopMat = new THREE.MeshStandardMaterial({ map: tntTopTex.map, bumpMap: tntTopTex.bumpMap, bumpScale: 0.18, roughness: 0.78, metalness: 0.05 });
  mats.tntMulti = [tntSideMat, tntSideMat, tntTopMat, tntTopMat, tntSideMat, tntSideMat];
  mats.tntSide = tntSideMat;
  mats.tntArmed = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffd27a,
    emissiveIntensity: 2.2,
    roughness: 0.2,
  });

  // 3. Trees & Forest
  const barkTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const ridge = Math.sin(x * 1.5) * 14;
          const n = (rng() - 0.5) * 18 + ridge;
          setCell(x, y, 102 + n, 72 + n * 0.75, 46 + n * 0.55, 0.5 + ridge / 40);
        }
      }
    },
    { seed: 301 }
  );
  const darkBarkTex = makeNoisyBlock(0x4b3423, 14, 302);
  const leavesEmeraldTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const cluster = ((x * 3 + y * 5) % 4 === 0) ? 18 : -10;
          const n = (rng() - 0.5) * 26 + cluster;
          setCell(x, y, 42 + n * 0.5, 146 + n, 52 + n * 0.5, 0.55 + cluster / 50);
        }
      }
    },
    { seed: 303 }
  );
  const leavesPineTex = makeNoisyBlock(0x1f6236, 18, 304);
  const leavesGlowTex = makeNoisyBlock(0x3ce08c, 22, 305);

  mats.bark = new THREE.MeshStandardMaterial({ map: barkTex.map, bumpMap: barkTex.bumpMap, bumpScale: 0.22, roughness: 0.92 });
  mats.darkBark = new THREE.MeshStandardMaterial({ map: darkBarkTex.map, bumpMap: darkBarkTex.bumpMap, bumpScale: 0.22, roughness: 0.92 });
  mats.leavesEmerald = new THREE.MeshStandardMaterial({ map: leavesEmeraldTex.map, bumpMap: leavesEmeraldTex.bumpMap, bumpScale: 0.16, roughness: 0.8 });
  mats.leavesPine = new THREE.MeshStandardMaterial({ map: leavesPineTex.map, bumpMap: leavesPineTex.bumpMap, bumpScale: 0.16, roughness: 0.84 });
  mats.leavesGlow = new THREE.MeshStandardMaterial({
    map: leavesGlowTex.map,
    emissive: 0x18b86a,
    emissiveIntensity: 0.55,
    roughness: 0.55,
  });

  // 4. Voxel Town Materials
  const cobbleTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const bx = (x + (y >> 2) * 2) % 4;
          const by = y % 4;
          const mortar = bx === 0 || by === 0;
          const n = (rng() - 0.5) * 20;
          if (mortar) {
            setCell(x, y, 68 + n * 0.5, 70 + n * 0.5, 74 + n * 0.5, 0.2);
          } else {
            const v = 136 + n;
            setCell(x, y, v, v * 0.99, v * 0.96, 0.72);
          }
        }
      }
    },
    { seed: 401 }
  );
  const plasterTex = makeNoisyBlock(0xe8dfc8, 12, 402);
  const plankTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const seam = y % 4 === 0 ? -24 : 0;
          const n = (rng() - 0.5) * 14;
          setCell(x, y, 166 + n + seam, 122 + n * 0.8 + seam, 76 + n * 0.6 + seam, seam ? 0.25 : 0.68);
        }
      }
    },
    { seed: 403 }
  );
  const roofTerracottaTex = makeNoisyBlock(0xa64430, 16, 404);
  const roofSlateTex = makeNoisyBlock(0x3b485e, 14, 405);
  const roofBlueTex = makeNoisyBlock(0x2c5c8a, 14, 406);
  const windowGlowTex = makePixelTextures(
    ({ grid, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const frame = x === 0 || x === 15 || y === 0 || y === 15 || x === 7 || x === 8 || y === 7 || y === 8;
          if (frame) {
            setCell(x, y, 62, 42, 28, 0.8);
          } else {
            setCell(x, y, 255, 214, 126, 0.35);
          }
        }
      }
    },
    { seed: 407 }
  );
  const clockFaceTex = makePixelTextures(
    ({ grid, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const d = Math.hypot(x - 7.5, y - 7.5);
          if (d > 6.8) setCell(x, y, 72, 62, 42, 0.8);
          else if (d > 5.8) setCell(x, y, 218, 178, 72, 0.9);
          else setCell(x, y, 248, 242, 224, 0.5);
        }
      }
      // Clock hands
      for (let i = 3; i <= 8; i++) setCell(8, i, 25, 25, 30, 1.0);
      for (let i = 8; i <= 12; i++) setCell(i, 8, 25, 25, 30, 1.0);
    },
    { seed: 408 }
  );

  mats.cobble = new THREE.MeshStandardMaterial({ map: cobbleTex.map, bumpMap: cobbleTex.bumpMap, bumpScale: 0.2, roughness: 0.88 });
  mats.plaster = new THREE.MeshStandardMaterial({ map: plasterTex.map, bumpMap: plasterTex.bumpMap, bumpScale: 0.1, roughness: 0.86 });
  mats.plank = new THREE.MeshStandardMaterial({ map: plankTex.map, bumpMap: plankTex.bumpMap, bumpScale: 0.16, roughness: 0.82 });
  mats.roofTerracotta = new THREE.MeshStandardMaterial({ map: roofTerracottaTex.map, bumpMap: roofTerracottaTex.bumpMap, bumpScale: 0.18, roughness: 0.78 });
  mats.roofSlate = new THREE.MeshStandardMaterial({ map: roofSlateTex.map, bumpMap: roofSlateTex.bumpMap, bumpScale: 0.18, roughness: 0.74, metalness: 0.12 });
  mats.roofBlue = new THREE.MeshStandardMaterial({ map: roofBlueTex.map, bumpMap: roofBlueTex.bumpMap, bumpScale: 0.18, roughness: 0.74, metalness: 0.1 });
  mats.windowGlow = new THREE.MeshStandardMaterial({
    map: windowGlowTex.map,
    emissive: 0xffb84d,
    emissiveMap: windowGlowTex.map,
    emissiveIntensity: 1.4,
    roughness: 0.3,
  });
  mats.clockFace = new THREE.MeshStandardMaterial({
    map: clockFaceTex.map,
    emissive: 0xffdf99,
    emissiveIntensity: 0.55,
    roughness: 0.4,
  });
  mats.lanternGlow = new THREE.MeshStandardMaterial({
    color: 0xffe4a0,
    emissive: 0xffa733,
    emissiveIntensity: 2.6,
    roughness: 0.2,
  });

  // 5. Giant Mecha Tractor "TT" Materials
  const tractorMetalTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const rivet = (x === 2 || x === 13) && (y === 2 || y === 13);
          const n = (rng() - 0.5) * 16;
          if (rivet) setCell(x, y, 165, 172, 180, 0.95);
          else setCell(x, y, 68 + n, 78 + n, 70 + n, 0.55);
        }
      }
    },
    { seed: 501 }
  );
  const tractorHazardTex = makePixelTextures(
    ({ grid, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const stripe = ((x + y) >> 2) % 2 === 0;
          if (stripe) setCell(x, y, 240, 178, 22, 0.7);
          else setCell(x, y, 28, 30, 36, 0.45);
        }
      }
    },
    { seed: 502 }
  );
  const tractorEmblemTTTex = makePixelTextures(
    ({ grid, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const border = x === 0 || x === 15 || y === 0 || y === 15;
          if (border) setCell(x, y, 235, 175, 36, 0.9);
          else setCell(x, y, 24, 26, 32, 0.4);
        }
      }
      // Bold glowing crimson-gold "TT"
      const ttPixels = [
        // Left T
        [2, 4], [3, 4], [4, 4], [5, 4], [6, 4],
        [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11],
        // Right T
        [9, 4], [10, 4], [11, 4], [12, 4], [13, 4],
        [11, 5], [11, 6], [11, 7], [11, 8], [11, 9], [11, 10], [11, 11],
      ];
      for (const [px, py] of ttPixels) {
        setCell(px, py, 255, 68, 42, 1.0);
      }
    },
    { seed: 503 }
  );
  const tractorTireTex = makePixelTextures(
    ({ grid, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const lug = (y % 4 < 2) && ((x + (y >> 2) * 3) % 4 < 2);
          setCell(x, y, lug ? 48 : 24, lug ? 48 : 24, lug ? 52 : 28, lug ? 0.9 : 0.25);
        }
      }
    },
    { seed: 504 }
  );

  mats.tractorBody = new THREE.MeshStandardMaterial({ map: tractorMetalTex.map, bumpMap: tractorMetalTex.bumpMap, bumpScale: 0.2, roughness: 0.42, metalness: 0.72 });
  mats.tractorCrimson = new THREE.MeshStandardMaterial({ color: 0xb91c1c, bumpMap: tractorMetalTex.bumpMap, bumpScale: 0.16, roughness: 0.36, metalness: 0.62 });
  mats.tractorHazard = new THREE.MeshStandardMaterial({ map: tractorHazardTex.map, bumpMap: tractorHazardTex.bumpMap, bumpScale: 0.14, roughness: 0.5, metalness: 0.45 });
  mats.tractorEmblemTT = new THREE.MeshStandardMaterial({
    map: tractorEmblemTTTex.map,
    emissive: 0xff3b1f,
    emissiveMap: tractorEmblemTTTex.map,
    emissiveIntensity: 1.25,
    roughness: 0.3,
    metalness: 0.6,
  });
  mats.tractorTire = new THREE.MeshStandardMaterial({ map: tractorTireTex.map, bumpMap: tractorTireTex.bumpMap, bumpScale: 0.28, roughness: 0.9, metalness: 0.08 });
  mats.tractorCore = new THREE.MeshStandardMaterial({ color: 0xffaa22, emissive: 0xff5500, emissiveIntensity: 1.55, roughness: 0.2, metalness: 0.3 });
  mats.tractorSteel = new THREE.MeshStandardMaterial({ color: 0x9aa4b2, roughness: 0.3, metalness: 0.85 });

  // 6. Character Materials
  const makeCloth = (hex, roughness = 0.68, metalness = 0.12, emissive = 0x000000, emissiveIntensity = 0) =>
    new THREE.MeshStandardMaterial({ color: hex, roughness, metalness, emissive, emissiveIntensity });

  mats.skin = makeCloth(0xf2c29b, 0.72, 0.02);
  mats.skinPale = makeCloth(0xf6dcd2, 0.68, 0.02);
  mats.darkHair = makeCloth(0x281e19, 0.78, 0.05);
  mats.silverHair = makeCloth(0xe4ecf7, 0.45, 0.22, 0x3a5a8c, 0.18);

  // Creator Riu
  mats.riuWhite = makeCloth(0xf4faf7, 0.42, 0.18);
  mats.riuEmerald = makeCloth(0x10b981, 0.35, 0.25, 0x059669, 0.45);
  mats.riuGold = makeCloth(0xffd166, 0.22, 0.88, 0xf59e0b, 0.38);
  mats.riuGlow = new THREE.MeshStandardMaterial({ color: 0x6ee7b7, emissive: 0x10b981, emissiveIntensity: 1.35, roughness: 0.2 });

  // Lilith I & Royal Legion
  mats.lilithArmor = makeCloth(0x881337, 0.3, 0.72, 0x4c0519, 0.35);
  mats.lilithDark = makeCloth(0x1c1420, 0.45, 0.55);
  mats.lilithWing = new THREE.MeshStandardMaterial({ color: 0x3b071e, emissive: 0xdc2626, emissiveIntensity: 0.75, roughness: 0.35, metalness: 0.45 });
  mats.lilithGold = makeCloth(0xfbbf24, 0.22, 0.9, 0xb45309, 0.32);
  mats.knightArmor = makeCloth(0x6e1a2f, 0.38, 0.74);
  mats.knightSteel = makeCloth(0xc4cbd6, 0.28, 0.84);

  // Joseph Joestar
  const scarfTex = makePixelTextures(
    ({ grid, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const band = (y >> 2) % 2 === 0;
          if (band) setCell(x, y, 245, 186, 46, 0.6);
          else setCell(x, y, 36, 98, 128, 0.5);
        }
      }
    },
    { seed: 601 }
  );
  mats.josephJacket = makeCloth(0x3a4d34, 0.74, 0.08);
  mats.josephShirt = makeCloth(0x1e2530, 0.78, 0.05);
  mats.josephPants = makeCloth(0x3b332b, 0.82, 0.04);
  mats.josephScarf = new THREE.MeshStandardMaterial({ map: scarfTex.map, roughness: 0.65 });
  mats.josephHeadband = makeCloth(0xd93829, 0.55, 0.1, 0x7f1d1d, 0.2);
  mats.hamonGold = new THREE.MeshStandardMaterial({ color: 0xfff3a0, emissive: 0xf59e0b, emissiveIntensity: 1.45, roughness: 0.15 });
  mats.oraFist = new THREE.MeshStandardMaterial({
    color: 0xc084fc,
    emissive: 0x7e22ce,
    emissiveIntensity: 1.15,
    transparent: true,
    opacity: 0.76,
    roughness: 0.22,
    metalness: 0.25,
  });
  mats.oraFistGold = new THREE.MeshStandardMaterial({
    color: 0xfde047,
    emissive: 0xd97706,
    emissiveIntensity: 1.3,
    transparent: true,
    opacity: 0.84,
    roughness: 0.2,
  });

  // Shijo Kiraku
  mats.kirakuCoat = makeCloth(0x14172b, 0.52, 0.3, 0x1e1b4b, 0.25);
  mats.kirakuTrim = makeCloth(0x7c3aed, 0.3, 0.55, 0x6d28d9, 0.85);
  mats.kirakuEye = new THREE.MeshStandardMaterial({ color: 0x67e8f9, emissive: 0x06b6d4, emissiveIntensity: 1.45 });
  mats.kirakuOrb = new THREE.MeshStandardMaterial({ color: 0x2e1065, emissive: 0x9333ea, emissiveIntensity: 1.45, roughness: 0.18 });

  // Wolf "Maaki Rings"
  mats.wolfFur = makeCloth(0xdbe4f0, 0.68, 0.1);
  mats.wolfDark = makeCloth(0x475569, 0.64, 0.25);
  mats.wolfArmor = makeCloth(0x1e293b, 0.35, 0.78);
  mats.maakiRing = new THREE.MeshStandardMaterial({ color: 0xfde68a, emissive: 0xf59e0b, emissiveIntensity: 1.35, roughness: 0.2, metalness: 0.65 });
  mats.wolfVisor = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, emissive: 0x0284c7, emissiveIntensity: 1.35 });

  // Captain Momonga KF23 + Flagship
  const kf23Tex = makePixelTextures(
    ({ grid, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const edge = x === 0 || x === 15 || y === 0 || y === 15;
          setCell(x, y, edge ? 245 : 22, edge ? 190 : 42, edge ? 52 : 78, edge ? 0.85 : 0.45);
        }
      }
      // Crisp cyan/gold "23" badge motif
      const px = [
        [2, 5], [3, 5], [4, 5], [5, 5], [5, 6], [5, 7], [4, 7], [3, 7], [2, 8], [2, 9], [2, 10], [3, 10], [4, 10], [5, 10],
        [9, 5], [10, 5], [11, 5], [12, 5], [12, 6], [12, 7], [10, 7], [11, 7], [12, 8], [12, 9], [12, 10], [11, 10], [10, 10], [9, 10],
      ];
      for (const [x, y] of px) setCell(x, y, 56, 224, 248, 1.0);
    },
    { seed: 701 }
  );
  mats.momongaFur = makeCloth(0x9a643d, 0.76, 0.04);
  mats.momongaBelly = makeCloth(0xf4e4cb, 0.78, 0.02);
  mats.momongaCoat = makeCloth(0x172b52, 0.5, 0.3);
  mats.momongaBadge = new THREE.MeshStandardMaterial({ map: kf23Tex.map, emissive: 0x38bdf8, emissiveMap: kf23Tex.map, emissiveIntensity: 0.9, roughness: 0.35, metalness: 0.6 });
  mats.shipHull = new THREE.MeshStandardMaterial({ map: tractorMetalTex.map, color: 0x4b5c75, roughness: 0.38, metalness: 0.78 });
  mats.shipTrim = makeCloth(0xd4a02c, 0.28, 0.85);
  mats.shipThruster = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, emissive: 0x0284c7, emissiveIntensity: 1.55 });
  mats.alertRed = new THREE.MeshStandardMaterial({ color: 0xff4444, emissive: 0xdc2626, emissiveIntensity: 1.55 });

  // 7. Domain Expansion「綻び」& Magma Meteors
  const domainObsidianTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const fissure = Math.abs(x - y) === 0 || (x + y === 15 && x > 4);
          if (fissure) {
            setCell(x, y, 255, 192, 82, 1.0);
          } else {
            const n = (rng() - 0.5) * 14;
            setCell(x, y, 16 + n * 0.4, 12 + n * 0.4, 22 + n * 0.5, 0.4);
          }
        }
      }
    },
    { seed: 801 }
  );
  mats.domainObsidian = new THREE.MeshStandardMaterial({
    map: domainObsidianTex.map,
    emissive: 0xff6b35,
    emissiveMap: domainObsidianTex.map,
    emissiveIntensity: 1.05,
    roughness: 0.25,
    metalness: 0.65,
  });

  const meteorMagmaTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const vein = ((x * 5 + y * 3) % 11 === 0) || ((x * 2 - y * 3 + 32) % 13 === 0);
          if (vein) {
            setCell(x, y, 255, 145 + rng() * 80, 28, 0.95);
          } else {
            const n = (rng() - 0.5) * 18;
            setCell(x, y, 42 + n, 30 + n * 0.7, 28 + n * 0.6, 0.45);
          }
        }
      }
    },
    { seed: 802 }
  );
  mats.meteorMagma = new THREE.MeshStandardMaterial({
    map: meteorMagmaTex.map,
    bumpMap: meteorMagmaTex.bumpMap,
    bumpScale: 0.28,
    emissive: 0xff5a12,
    emissiveMap: meteorMagmaTex.map,
    emissiveIntensity: 1.55,
    roughness: 0.65,
  });

  // 8. Phase 2 Expansion Materials (Acts 9-12: GIGA-TT, Hollow Singularity, Moon-Meteor, Cosmic Emerald ORA!)
  mats.gigaWing = new THREE.MeshStandardMaterial({
    color: 0xffd166,
    emissive: 0xef233c,
    emissiveIntensity: 1.45,
    transparent: true,
    opacity: 0.9,
    roughness: 0.15,
    metalness: 0.5,
  });
  mats.kirakuBlue = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 1.65, roughness: 0.15 });
  mats.kirakuRed = new THREE.MeshStandardMaterial({ color: 0xfb7185, emissive: 0xe11d48, emissiveIntensity: 1.65, roughness: 0.15 });
  mats.kirakuHollow = new THREE.MeshStandardMaterial({
    color: 0xe879f9,
    emissive: 0x9333ea,
    emissiveIntensity: 1.75,
    transparent: true,
    opacity: 0.88,
    roughness: 0.1,
  });
  mats.oraFistEmerald = new THREE.MeshStandardMaterial({
    color: 0x6ee7b7,
    emissive: 0x10b981,
    emissiveIntensity: 1.35,
    transparent: true,
    opacity: 0.82,
    roughness: 0.18,
  });

  const moonCrustTex = makePixelTextures(
    ({ grid, rng, setCell }) => {
      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          const d1 = Math.hypot(x - 5, y - 5);
          const d2 = Math.hypot(x - 11, y - 10);
          const crack = Math.abs(x - y) === 0 || (x + y === 15 && rng() < 0.75);
          if (crack) {
            setCell(x, y, 255, 110 + rng() * 90, 24, 0.95);
          } else if (d1 < 2.6 || d2 < 2.1) {
            setCell(x, y, 52, 48, 58, 0.25);
          } else {
            const n = (rng() - 0.5) * 24;
            setCell(x, y, 108 + n, 98 + n, 112 + n, 0.62);
          }
        }
      }
    },
    { seed: 909 }
  );
  mats.moonCrust = new THREE.MeshStandardMaterial({
    map: moonCrustTex.map,
    bumpMap: moonCrustTex.bumpMap,
    bumpScale: 0.34,
    emissive: 0xff4500,
    emissiveMap: moonCrustTex.map,
    emissiveIntensity: 1.25,
    roughness: 0.72,
  });

  // Pack tile specifications for Invention #2: 1-Draw-Call Static Voxel World PBR Mega-Atlas!
  mats._atlasSpecs = [
    { key: 'grass', colorSource: grassTopTex.colorCanvas, bumpSource: grassTopTex.bumpCanvas },
    { key: 'stone', colorSource: stoneTex.colorCanvas, bumpSource: stoneTex.bumpCanvas },
    { key: 'deepStone', colorSource: deepStoneTex.colorCanvas, bumpSource: deepStoneTex.bumpCanvas },
    { key: 'cobble', colorSource: cobbleTex.colorCanvas, bumpSource: cobbleTex.bumpCanvas },
    { key: 'plaster', colorSource: plasterTex.colorCanvas, bumpSource: plasterTex.bumpCanvas },
    { key: 'plank', colorSource: plankTex.colorCanvas, bumpSource: plankTex.bumpCanvas },
    { key: 'roofTerracotta', colorSource: roofTerracottaTex.colorCanvas, bumpSource: roofTerracottaTex.bumpCanvas },
    { key: 'roofSlate', colorSource: roofSlateTex.colorCanvas, bumpSource: roofSlateTex.bumpCanvas },
    { key: 'roofBlue', colorSource: roofBlueTex.colorCanvas, bumpSource: roofBlueTex.bumpCanvas },
    { key: 'windowGlow', colorSource: windowGlowTex.colorCanvas, bumpSource: windowGlowTex.bumpCanvas, emissiveSource: windowGlowTex.colorCanvas },
    { key: 'lanternGlow', flatHex: '#ffe4a0', emissiveHex: '#ffa733' },
    { key: 'bark', colorSource: barkTex.colorCanvas, bumpSource: barkTex.bumpCanvas },
    { key: 'leavesPine', colorSource: leavesPineTex.colorCanvas, bumpSource: leavesPineTex.bumpCanvas },
  ];

  return mats;
}

/**
 * Generates crisp 3D world-space anime/manga typography sprites (ゴゴゴゴ, オラァ!, 綻び, etc.)
 */
export function createMangaTextTexture(text, {
  fill = '#ffd166',
  stroke = '#14081e',
  glow = '#ff4d6d',
  fontSize = 112,
  width = 1024,
  height = 256,
  italic = true,
} = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width / 2, height / 2);
  if (italic) ctx.transform(1, -0.06, -0.18, 1, 0, 0);

  ctx.font = `900 ${fontSize}px "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Outer energy glow
  ctx.shadowColor = glow;
  ctx.shadowBlur = 26;
  ctx.lineJoin = 'round';
  ctx.lineWidth = Math.max(12, fontSize * 0.16);
  ctx.strokeStyle = stroke;
  ctx.strokeText(text, 0, 0);

  // Inner sharp highlight outline
  ctx.shadowBlur = 0;
  ctx.lineWidth = Math.max(4, fontSize * 0.05);
  ctx.strokeStyle = '#ffffff';
  ctx.strokeText(text, -2, -2);

  // Gradient fill
  const grad = ctx.createLinearGradient(0, -fontSize * 0.6, 0, fontSize * 0.6);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.28, fill);
  grad.addColorStop(1, glow);
  ctx.fillStyle = grad;
  ctx.fillText(text, 0, 0);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}
