import * as THREE from 'three';
import { createWaterMaterial } from './shaders.js';
import {
  createGPUBallisticMaterial,
  createGPUForestMaterial,
  createStaticMegaAtlas,
  buildSingleDrawVoxelGeometry,
} from './optimizer.js';

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

function clamp01(x) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

export const MOUNTAIN_PEAKS = [
  { id: 0, x: -96, z: -126, radius: 24, height: 34, detonateTime: 12.2 },
  { id: 1, x: -49, z: -118, radius: 26, height: 42, detonateTime: 14.3 },
  { id: 2, x: 0, z: -112, radius: 30, height: 50, detonateTime: 16.5 },
  { id: 3, x: 51, z: -120, radius: 25, height: 41, detonateTime: 18.8 },
  { id: 4, x: 98, z: -128, radius: 24, height: 35, detonateTime: 21.0 },
];

export const ROADSIDE_TARGETS = [
  { x: -3.5, z: -76, smashTime: 30.8 },
  { x: 4.5, z: -58, smashTime: 34.4 },
  { x: -3.0, z: -40, smashTime: 38.2 },
  { x: 3.0, z: -24, smashTime: 41.8 },
];

/**
 * Helper: Builds a GPU Analytic Kinematics (GAK) Ballistic Mesh (0 CPU loops per frame!)
 */
function buildGPUBallisticMesh(records, baseMat, timeUniform, castShadow = true) {
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const count = records.length;
  const aOrigin = new Float32Array(count * 3);
  const aVelDelay = new Float32Array(count * 4);
  const aSpinScale = new Float32Array(count * 4);

  for (let i = 0; i < count; i++) {
    const b = records[i];
    aOrigin[i * 3] = b.bx;
    aOrigin[i * 3 + 1] = b.by;
    aOrigin[i * 3 + 2] = b.bz;

    aVelDelay[i * 4] = b.vx;
    aVelDelay[i * 4 + 1] = b.vy;
    aVelDelay[i * 4 + 2] = b.vz;
    aVelDelay[i * 4 + 3] = b.detonateTime + (b.delay || 0);

    aSpinScale[i * 4] = b.rx;
    aSpinScale[i * 4 + 1] = b.ry;
    aSpinScale[i * 4 + 2] = b.rz;
    // Negative scale encodes static crater rim block in vertex shader!
    aSpinScale[i * 4 + 3] = b.isRim ? -b.scale : b.scale;
  }

  geo.setAttribute('aOrigin', new THREE.InstancedBufferAttribute(aOrigin, 3));
  geo.setAttribute('aVelDelay', new THREE.InstancedBufferAttribute(aVelDelay, 4));
  geo.setAttribute('aSpinScale', new THREE.InstancedBufferAttribute(aSpinScale, 4));

  const mat = createGPUBallisticMaterial(baseMat, timeUniform);
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  // Identity instance matrices uploaded ONCE at startup; GPU shader handles all transforms!
  const id = new THREE.Matrix4();
  for (let i = 0; i < count; i++) mesh.setMatrixAt(i, id);
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  return mesh;
}

/**
 * Helper: Builds a GPU Analytic Elastic Sprouting Forest Layer (0 CPU loops per frame!)
 */
function buildGPUForestMesh(parts, baseMat, timeUniform, castShadow = true) {
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const count = parts.length;
  const aTreePosTime = new Float32Array(count * 4);
  const aTreeScaleOx = new Float32Array(count * 4);
  const aTreeOz = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const p = parts[i];
    aTreePosTime[i * 4] = p.tx;
    aTreePosTime[i * 4 + 1] = p.oy;
    aTreePosTime[i * 4 + 2] = p.tz;
    aTreePosTime[i * 4 + 3] = p.spawnTime;

    aTreeScaleOx[i * 4] = p.sx;
    aTreeScaleOx[i * 4 + 1] = p.sy;
    aTreeScaleOx[i * 4 + 2] = p.sz;
    aTreeScaleOx[i * 4 + 3] = p.ox;

    aTreeOz[i] = p.oz;
  }

  geo.setAttribute('aTreePosTime', new THREE.InstancedBufferAttribute(aTreePosTime, 4));
  geo.setAttribute('aTreeScaleOx', new THREE.InstancedBufferAttribute(aTreeScaleOx, 4));
  geo.setAttribute('aTreeOz', new THREE.InstancedBufferAttribute(aTreeOz, 1));

  const mat = createGPUForestMaterial(baseMat, timeUniform);
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  const id = new THREE.Matrix4();
  for (let i = 0; i < count; i++) mesh.setMatrixAt(i, id);
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  return mesh;
}

export function createVoxelWorld(scene, mats, sharedTimeUniform) {
  const rng = mulberry32(202604);
  const worldGroup = new THREE.Group();
  scene.add(worldGroup);

  const unitBox = new THREE.BoxGeometry(1, 1, 1);
  const dummy = new THREE.Object3D();

  // --- 1. Base Ground Terrain & Animated GLSL River ---
  const groundMesh = new THREE.Mesh(new THREE.PlaneGeometry(460, 460), mats.groundGrass);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.receiveShadow = true;
  worldGroup.add(groundMesh);

  const riverBed = new THREE.Mesh(new THREE.BoxGeometry(260, 1.4, 11.5), mats.deepStone);
  riverBed.position.set(0, -0.65, 18);
  riverBed.receiveShadow = true;
  worldGroup.add(riverBed);

  const waterMat = createWaterMaterial();
  const riverWater = new THREE.Mesh(new THREE.PlaneGeometry(260, 10.5, 36, 6), waterMat);
  riverWater.rotation.x = -Math.PI / 2;
  riverWater.position.set(0, 0.14, 18);
  worldGroup.add(riverWater);

  // --- 2. INVENTION #2: Static PBR Mega-Atlas Single-Draw World Merger! ---
  // Entire Voxel Town (16 houses, clocktower, fountain, market, lamps), Stone Bridge,
  // Watchtower Cliff, and Flanking Valley Hills rendered in ONE SINGLE DRAW CALL!
  const staticBoxList = [];
  const pushBox = (bucket, x, y, z, sx = 1, sy = 1, sz = 1) => {
    staticBoxList.push({ bucket, x, y, z, sx, sy, sz });
  };

  // Flanking scenic voxel hills on West and East sides of the valley
  const hillCenters = [
    { x: -78, z: -52, r: 24, h: 14 },
    { x: -84, z: -12, r: 22, h: 12 },
    { x: -82, z: 45, r: 26, h: 15 },
    { x: 78, z: -56, r: 25, h: 15 },
    { x: 84, z: -10, r: 22, h: 13 },
    { x: 84, z: 48, r: 25, h: 14 },
  ];
  for (const hc of hillCenters) {
    const step = 4;
    for (let dx = -hc.r; dx <= hc.r; dx += step) {
      for (let dz = -hc.r; dz <= hc.r; dz += step) {
        const d = Math.hypot(dx, dz) / hc.r;
        if (d > 1.0) continue;
        const n = Math.sin((hc.x + dx) * 0.12) * Math.cos((hc.z + dz) * 0.11) * 2.2;
        const colH = Math.max(2, Math.round((1 - d * d) * hc.h + n));
        pushBox('stone', hc.x + dx, (colH - 1) * 0.5, hc.z + dz, step, colH - 1, step);
        pushBox('grass', hc.x + dx, colH - 0.5, hc.z + dz, step, 1, step);
      }
    }
  }

  // Maaki Rings Watchtower Cliff Crag at (-34, 0, 14)
  const cliffX = -34;
  const cliffZ = 14;
  for (let dx = -10; dx <= 10; dx += 2) {
    for (let dz = -9; dz <= 9; dz += 2) {
      const dist = Math.hypot(dx * 0.95, dz * 1.1);
      if (dist > 10.2) continue;
      let h = Math.round(14.5 * Math.pow(Math.max(0, 1 - dist / 11.2), 0.72));
      if (dist < 4.2) h = 14;
      if (h < 2) continue;
      pushBox('deepStone', cliffX + dx, (h - 1) * 0.5, cliffZ + dz, 2, h - 1, 2);
      pushBox(dist < 5.5 ? 'stone' : 'grass', cliffX + dx, h - 0.5, cliffZ + dz, 2, 1, 2);
    }
  }
  for (const [px, pz, ph] of [[-41, 10, 7], [-39, 19, 6], [-43, 15, 8]]) {
    pushBox('bark', px, 10 + ph * 0.5, pz, 1.2, ph, 1.2);
    pushBox('leavesPine', px, 10 + ph + 1.2, pz, 4.2, 2.2, 4.2);
    pushBox('leavesPine', px, 10 + ph + 3.2, pz, 2.8, 2.0, 2.8);
    pushBox('leavesPine', px, 10 + ph + 4.8, pz, 1.4, 1.6, 1.4);
  }

  // Arched Stone Bridge across River at (0, 0, 18)
  for (let z = 11; z <= 25; z += 1.5) {
    const arch = Math.cos(((z - 18) / 7) * (Math.PI * 0.5)) * 1.4;
    pushBox('cobble', 0, 0.5 + arch, z, 9.5, 0.9, 1.6);
    pushBox('stone', -4.6, 1.3 + arch, z, 0.7, 1.1, 1.5);
    pushBox('stone', 4.6, 1.3 + arch, z, 0.7, 1.1, 1.5);
  }
  for (const bx of [-4.6, 4.6]) {
    for (const bz of [12.5, 18, 23.5]) {
      pushBox('deepStone', bx, 1.8, bz, 1.1, 3.6, 1.1);
      if (bz === 12.5 || bz === 23.5) pushBox('lanternGlow', bx, 3.9, bz, 0.85, 0.85, 0.85);
    }
  }

  // Detailed Voxel Town (z = +26 .. +92)
  pushBox('cobble', 0, 0.08, 52, 26, 0.25, 24);
  pushBox('cobble', 0, 0.08, 34, 10, 0.25, 18);
  pushBox('cobble', 0, 0.08, 70, 12, 0.25, 16);
  pushBox('cobble', -24, 0.08, 52, 28, 0.25, 8);
  pushBox('cobble', 24, 0.08, 52, 28, 0.25, 8);

  // Town Archway Gate & Watchtowers
  for (const gx of [-7.5, 7.5]) {
    pushBox('stone', gx, 4.5, 27, 4.2, 9, 4.2);
    pushBox('deepStone', gx, 9.5, 27, 5, 1.2, 5);
    pushBox('roofSlate', gx, 11.4, 27, 3.6, 2.8, 3.6);
    pushBox('lanternGlow', gx * 0.72, 6.2, 25.2, 0.8, 0.8, 0.8);
  }
  pushBox('stone', 0, 7.2, 27, 11, 2.2, 2.8);
  pushBox('deepStone', 0, 8.6, 27, 11.6, 0.8, 3.4);

  // Town Center Stepped Stone Fountain at (0, 0, 52)
  pushBox('stone', 0, 0.6, 52, 8.2, 1.1, 8.2);
  pushBox('deepStone', 0, 1.6, 52, 2.2, 2.4, 2.2);
  pushBox('stone', 0, 2.8, 52, 3.4, 0.6, 3.4);
  pushBox('deepStone', 0, 3.9, 52, 1.1, 1.8, 1.1);
  const fountainWater = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.65, 6.8), waterMat);
  fountainWater.position.set(0, 0.9, 52);
  worldGroup.add(fountainWater);
  const fountainJet = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 2.6, 0.65),
    new THREE.MeshStandardMaterial({ color: 0x7dd3fc, emissive: 0x38bdf8, emissiveIntensity: 1.0, transparent: true, opacity: 0.78 })
  );
  fountainJet.position.set(0, 5.4, 52);
  worldGroup.add(fountainJet);

  const buildVoxelHouse = (hx, hz, w, d, h, roofKey, facing = 0) => {
    pushBox('cobble', hx, 0.6, hz, w + 0.6, 1.2, d + 0.6);
    pushBox('plaster', hx, 1.2 + h * 0.5, hz, w, h, d);
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        pushBox('plank', hx + sx * (w * 0.5 - 0.25), 1.2 + h * 0.5, hz + sz * (d * 0.5 - 0.25), 0.7, h + 0.2, 0.7);
      }
    }
    pushBox('plank', hx, 1.2 + h * 0.52, hz, w + 0.25, 0.55, d + 0.25);

    const winFloors = h >= 6.5 ? [2.8, 6.0] : [3.0];
    for (const wy of winFloors) {
      for (const wx of [-w * 0.26, w * 0.26]) {
        pushBox('windowGlow', hx + wx, wy, hz - d * 0.5 - 0.08, 1.35, 1.45, 0.22);
        pushBox('windowGlow', hx + wx, wy, hz + d * 0.5 + 0.08, 1.35, 1.45, 0.22);
      }
      pushBox('windowGlow', hx - w * 0.5 - 0.08, wy, hz, 0.22, 1.45, 1.5);
      pushBox('windowGlow', hx + w * 0.5 + 0.08, wy, hz, 0.22, 1.45, 1.5);
    }

    const doorZ = facing >= 0 ? hz - d * 0.5 - 0.1 : hz + d * 0.5 + 0.1;
    pushBox('bark', hx, 2.2, doorZ, 1.5, 2.4, 0.35);

    for (let i = 0; i < 5; i++) {
      const frac = 1 - i / 5;
      pushBox(roofKey, hx, 1.2 + h + 0.5 + i * 0.9, hz, w * frac + 1.3, 0.95, d * frac + 1.3);
    }
    pushBox('deepStone', hx + w * 0.28, 1.2 + h + 3.4, hz + d * 0.2, 1.2, 3.6, 1.2);
  };

  const houses = [
    [-16, 35, 9, 8, 6.8, 'roofTerracotta', 1],
    [16, 35, 9, 8, 6.5, 'roofBlue', 1],
    [-28, 37, 10, 9, 7.2, 'roofSlate', 1],
    [28, 37, 10, 8, 6.8, 'roofTerracotta', 1],
    [-20, 46, 8, 8, 6.4, 'roofBlue', 1],
    [20, 46, 8, 8, 7.0, 'roofTerracotta', 1],
    [-34, 47, 9, 8, 5.8, 'roofTerracotta', 1],
    [34, 47, 9, 8, 6.2, 'roofSlate', 1],
    [-20, 61, 9, 8, 7.4, 'roofSlate', -1],
    [20, 61, 9, 8, 6.8, 'roofBlue', -1],
    [-35, 62, 10, 9, 6.4, 'roofTerracotta', -1],
    [35, 62, 10, 9, 7.2, 'roofSlate', -1],
    [-16, 75, 9, 8, 7.8, 'roofTerracotta', -1],
    [16, 75, 9, 8, 7.4, 'roofBlue', -1],
    [-30, 78, 10, 9, 6.5, 'roofSlate', -1],
    [30, 78, 10, 9, 6.8, 'roofTerracotta', -1],
  ];
  for (const h of houses) buildVoxelHouse(...h);

  // Grand Town Clocktower at (0, 0, 76)
  pushBox('cobble', 0, 3.0, 76, 8.6, 6, 8.6);
  pushBox('stone', 0, 11.0, 76, 7.2, 11, 7.2);
  pushBox('deepStone', 0, 17.5, 76, 8.0, 2.2, 8.0);
  for (const sx of [-2.8, 2.8]) {
    for (const sz of [-2.8, 2.8]) pushBox('stone', sx, 20.5, 76 + sz, 1.3, 4.2, 1.3);
  }
  pushBox('lanternGlow', 0, 20.5, 76, 1.8, 2.0, 1.8);
  for (let s = 0; s < 6; s++) {
    const w = 8.4 - s * 1.25;
    pushBox('roofSlate', 0, 23.0 + s * 1.15, 76, w, 1.2, w);
  }
  pushBox('lanternGlow', 0, 30.2, 76, 0.7, 1.4, 0.7);

  // Streetlamps & Market Stalls
  for (const [lx, lz] of [
    [-6.5, 34], [6.5, 34], [-11.5, 42], [11.5, 42],
    [-11.5, 52], [11.5, 52], [-11.5, 62], [11.5, 62],
    [-6.5, 68], [6.5, 68],
  ]) {
    pushBox('deepStone', lx, 2.2, lz, 0.45, 4.4, 0.45);
    pushBox('lanternGlow', lx, 4.7, lz, 0.9, 0.9, 0.9);
  }
  for (const [mx, mz, roofK] of [
    [-9.5, 46.5, 'roofTerracotta'], [9.5, 46.5, 'roofBlue'],
    [-9.5, 57.5, 'roofBlue'], [9.5, 57.5, 'roofTerracotta'],
  ]) {
    pushBox('plank', mx, 0.65, mz, 3.6, 1.3, 2.0);
    pushBox('bark', mx - 1.5, 1.9, mz, 0.3, 2.6, 0.3);
    pushBox('bark', mx + 1.5, 1.9, mz, 0.3, 2.6, 0.3);
    pushBox(roofK, mx, 3.3, mz, 4.0, 0.45, 2.6);
  }

  // Compile ALL static terrain/town/bridge/cliff blocks into 1 SINGLE DRAW CALL!
  const { material: staticAtlasMat, uvRects } = createStaticMegaAtlas(mats._atlasSpecs);
  const staticWorldGeo = buildSingleDrawVoxelGeometry(staticBoxList, uvRects);
  const staticWorldMesh = new THREE.Mesh(staticWorldGeo, staticAtlasMat);
  staticWorldMesh.castShadow = true;
  staticWorldMesh.receiveShadow = true;
  worldGroup.add(staticWorldMesh);

  // Clocktower 4-sided glowing dials (1 instanced draw call)
  const clockDialInst = new THREE.InstancedMesh(new THREE.BoxGeometry(3.8, 3.8, 0.3), mats.clockFace, 4);
  const clockTransforms = [
    [0, 14.5, 72.3, 0],
    [0, 14.5, 79.7, Math.PI],
    [-3.7, 14.5, 76, Math.PI / 2],
    [3.7, 14.5, 76, -Math.PI / 2],
  ];
  clockTransforms.forEach(([cx, cy, cz, ry], i) => {
    dummy.position.set(cx, cy, cz);
    dummy.rotation.set(0, ry, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    clockDialInst.setMatrixAt(i, dummy.matrix);
  });
  clockDialInst.instanceMatrix.needsUpdate = true;
  worldGroup.add(clockDialInst);

  // --- 3. INVENTION #1A: GPU Analytic Destructible 5-Peak Mountain Range + TNT ---
  const mountainRecords = { stone: [], deepStone: [], grass: [], snow: [] };
  const tntRecords = [];
  const craterRims = [];

  for (const peak of MOUNTAIN_PEAKS) {
    const step = 3.0;
    const rMax = peak.radius;
    for (let dx = -rMax; dx <= rMax; dx += step) {
      for (let dz = -rMax; dz <= rMax; dz += step) {
        const dist = Math.hypot(dx, dz);
        const normD = dist / rMax;
        if (normD > 1.0) continue;

        const ridgeNoise =
          Math.sin((peak.x + dx) * 0.14 + peak.id) * 4.2 +
          Math.cos((peak.z + dz) * 0.16 - peak.id * 2) * 3.8;
        const maxH = Math.max(3, Math.round(Math.pow(1 - normD, 1.15) * peak.height + ridgeNoise * (1 - normD * 0.6)));
        const minY = normD > 0.72 ? 0 : Math.max(0, maxH - 12);

        for (let y = minY; y <= maxH; y += step) {
          const isTop = y + step > maxH;
          const isSouthGap = peak.id === 2 && dz > -4 && Math.abs(dx) < 18;
          const isRim = !isSouthGap && y <= 6 && normD > 0.58;
          let bucket = 'stone';
          if (isTop && y > peak.height * 0.64) bucket = 'snow';
          else if (isTop && y < peak.height * 0.36) bucket = 'grass';
          else if (y < 9) bucket = 'deepStone';

          const outDir = new THREE.Vector3(dx + (rng() - 0.5) * 8, 6 + y * 0.55 + rng() * 14, dz + (rng() - 0.5) * 8).normalize();
          const speed = isRim ? 0 : 22 + rng() * 44;

          mountainRecords[bucket].push({
            detonateTime: peak.detonateTime,
            isRim,
            bx: peak.x + dx,
            by: y + step * 0.5,
            bz: peak.z + dz,
            scale: step * 1.01,
            vx: outDir.x * speed,
            vy: Math.abs(outDir.y) * speed * 1.15 + 12,
            vz: outDir.z * speed,
            rx: (rng() - 0.5) * 7,
            ry: (rng() - 0.5) * 7,
            rz: (rng() - 0.5) * 7,
            delay: rng() * 0.35,
          });
        }

        if (dz > -6 && normD > 0.22 && normD < 0.78 && rng() < 0.23) {
          tntRecords.push({
            detonateTime: peak.detonateTime,
            x: peak.x + dx,
            y: maxH + step * 0.85,
            z: peak.z + dz + 1.4,
            scale: 2.35,
            phase: rng() * Math.PI * 2,
          });
        }
      }
    }

    const craterMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(peak.radius * 0.58, peak.radius * 0.74, 1.4, 14),
      mats.meteorMagma
    );
    craterMesh.position.set(peak.x, 0.25, peak.z);
    craterMesh.visible = false;
    worldGroup.add(craterMesh);
    craterRims.push({ mesh: craterMesh, detonateTime: peak.detonateTime });
  }

  // Zero-CPU GPU Ballistic Mountain Meshes! (Shadows enabled for dramatic sunlit silhouettes)
  for (const [key, records] of Object.entries(mountainRecords)) {
    const mat = key === 'grass' ? mats.grassTop : mats[key];
    worldGroup.add(buildGPUBallisticMesh(records, mat, sharedTimeUniform, true));
  }

  // TNT Blocks (Act-Window Sleep after t=22s!)
  const tntNormalMesh = new THREE.InstancedMesh(unitBox, mats.tntMulti, tntRecords.length);
  const tntFlashMesh = new THREE.InstancedMesh(unitBox, mats.tntArmed, tntRecords.length);
  tntNormalMesh.castShadow = true;
  tntNormalMesh.frustumCulled = false;
  tntFlashMesh.frustumCulled = false;
  worldGroup.add(tntNormalMesh, tntFlashMesh);

  // --- 4. TT's Progressive Trench & GPU Ballistic Roadside Boulders ---
  const trenchSegments = 48;
  const trenchMesh = new THREE.InstancedMesh(unitBox, mats.scorched, trenchSegments * 3);
  trenchMesh.receiveShadow = true;
  trenchMesh.frustumCulled = false;
  worldGroup.add(trenchMesh);

  const roadsideBlocks = [];
  for (const tgt of ROADSIDE_TARGETS) {
    for (let i = 0; i < 24; i++) {
      const ox = (rng() - 0.5) * 5.2;
      const oy = 0.6 + Math.floor(i / 6) * 1.15;
      const oz = (rng() - 0.5) * 4.5;
      const side = ox >= 0 ? 1 : -1;
      roadsideBlocks.push({
        detonateTime: tgt.smashTime,
        isRim: false,
        bx: tgt.x + ox,
        by: oy,
        bz: tgt.z + oz,
        scale: 1.15 + rng() * 0.45,
        vx: side * (10 + rng() * 16) + (rng() - 0.5) * 6,
        vy: 9 + rng() * 14,
        vz: 8 + rng() * 12,
        rx: (rng() - 0.5) * 9,
        ry: (rng() - 0.5) * 9,
        rz: (rng() - 0.5) * 9,
        delay: 0,
      });
    }
  }
  worldGroup.add(buildGPUBallisticMesh(roadsideBlocks, mats.stone, sharedTimeUniform, true));

  // --- 5. INVENTION #1B: Zero-CPU GPU Analytic Megafauna Forest (410+ Trees!) ---
  const trunkParts = [];
  const leafEmeraldParts = [];
  const leafPineParts = [];
  const leafGlowParts = [];

  for (let i = 0; i < 410; i++) {
    let tx, tz;
    for (let tries = 0; tries < 20; tries++) {
      tx = (rng() - 0.5) * 155;
      tz = -92 + rng() * 102;
      const inRiver = Math.abs(tz - 18) < 9;
      const inBattleGlade = Math.hypot(tx - 0, tz - 2) < 24;
      const inTTSpot = Math.hypot(tx - 0, tz - (-16)) < 22;
      const inRiuSpot = Math.hypot(tx - 0, tz - (-28)) < 16;
      const inKirakuLane = Math.hypot(tx - 12, tz - (-6)) < 18;
      const inCliff = Math.hypot(tx - cliffX, tz - cliffZ) < 16;
      if (!inRiver && !inBattleGlade && !inTTSpot && !inRiuSpot && !inKirakuLane && !inCliff) break;
    }

    const distFromRiu = Math.hypot(tx - 0, tz - (-28));
    const spawnTime = 53.2 + (distFromRiu / 88) * 10.5 + rng() * 1.2;
    const type = rng();

    if (type < 0.42) {
      const th = 5 + rng() * 4.5;
      trunkParts.push({ tx, tz, spawnTime, ox: 0, oy: th * 0.5, oz: 0, sx: 1.25, sy: th, sz: 1.25 });
      leafEmeraldParts.push({ tx, tz, spawnTime, ox: 0, oy: th + 1.2, oz: 0, sx: 5.2, sy: 2.6, sz: 5.2 });
      leafEmeraldParts.push({ tx, tz, spawnTime, ox: 0.4, oy: th + 3.2, oz: -0.3, sx: 3.6, sy: 2.0, sz: 3.6 });
      if (rng() < 0.35) leafGlowParts.push({ tx, tz, spawnTime, ox: 1.4, oy: th + 0.6, oz: 1.2, sx: 1.2, sy: 1.2, sz: 1.2 });
    } else if (type < 0.8) {
      const th = 7 + rng() * 7.5;
      trunkParts.push({ tx, tz, spawnTime, ox: 0, oy: th * 0.45, oz: 0, sx: 1.15, sy: th * 0.9, sz: 1.15 });
      leafPineParts.push({ tx, tz, spawnTime, ox: 0, oy: th * 0.55, oz: 0, sx: 5.4, sy: 2.5, sz: 5.4 });
      leafPineParts.push({ tx, tz, spawnTime, ox: 0, oy: th * 0.55 + 2.4, oz: 0, sx: 4.1, sy: 2.3, sz: 4.1 });
      leafPineParts.push({ tx, tz, spawnTime, ox: 0, oy: th * 0.55 + 4.5, oz: 0, sx: 2.6, sy: 2.1, sz: 2.6 });
      leafPineParts.push({ tx, tz, spawnTime, ox: 0, oy: th * 0.55 + 6.4, oz: 0, sx: 1.3, sy: 1.8, sz: 1.3 });
    } else {
      const th = 14 + rng() * 11;
      trunkParts.push({ tx, tz, spawnTime, ox: 0, oy: th * 0.5, oz: 0, sx: 2.3, sy: th, sz: 2.3 });
      leafEmeraldParts.push({ tx, tz, spawnTime, ox: 0, oy: th + 1.4, oz: 0, sx: 8.4, sy: 3.2, sz: 8.4 });
      leafPineParts.push({ tx, tz, spawnTime, ox: 0, oy: th + 4.0, oz: 0, sx: 6.2, sy: 2.6, sz: 6.2 });
      leafGlowParts.push({ tx, tz, spawnTime, ox: 0, oy: th + 6.0, oz: 0, sx: 3.4, sy: 1.8, sz: 3.4 });
      leafGlowParts.push({ tx, tz, spawnTime, ox: -3.2, oy: th - 0.4, oz: 2.6, sx: 1.2, sy: 2.4, sz: 1.2 });
      leafGlowParts.push({ tx, tz, spawnTime, ox: 3.0, oy: th - 0.6, oz: -2.4, sx: 1.2, sy: 2.2, sz: 1.2 });
    }
  }

  const forestGroup = new THREE.Group();
  forestGroup.add(
    buildGPUForestMesh(trunkParts, mats.bark, sharedTimeUniform, true),
    buildGPUForestMesh(leafEmeraldParts, mats.leavesEmerald, sharedTimeUniform, true),
    buildGPUForestMesh(leafPineParts, mats.leavesPine, sharedTimeUniform, false),
    buildGPUForestMesh(leafGlowParts, mats.leavesGlow, sharedTimeUniform, false)
  );
  worldGroup.add(forestGroup);

  // --- 6. Chunky Drifting Voxel Clouds ---
  const cloudRecords = [];
  for (let i = 0; i < 38; i++) {
    cloudRecords.push({
      x: (rng() - 0.5) * 340,
      y: 78 + rng() * 24,
      z: (rng() - 0.5) * 300 - 20,
      sx: 10 + rng() * 18,
      sy: 2.6 + rng() * 1.4,
      sz: 6 + rng() * 10,
      speed: 0.6 + rng() * 0.9,
    });
  }
  const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, metalness: 0, transparent: true, opacity: 0.86 });
  const cloudMesh = new THREE.InstancedMesh(unitBox, cloudMat, cloudRecords.length);
  cloudMesh.frustumCulled = false;
  worldGroup.add(cloudMesh);

  // --- 7. Domain Expansion「綻び / 極・綻び」Floating Fractured Terrain Islands ---
  const domainIslandCount = 54;
  const domainIslands = [];
  for (let i = 0; i < domainIslandCount; i++) {
    const angle = (i / domainIslandCount) * Math.PI * 2 + rng() * 0.3;
    const dist = 28 + rng() * 88;
    domainIslands.push({
      x: Math.cos(angle) * dist,
      z: -8 + Math.sin(angle) * dist,
      targetY: 12 + rng() * 44,
      sx: 3.5 + rng() * 6.5,
      sy: 2.0 + rng() * 4.5,
      sz: 3.5 + rng() * 6.5,
      phase: rng() * Math.PI * 2,
      spinY: (rng() - 0.5) * 0.4,
    });
  }
  const domainIslandMesh = new THREE.InstancedMesh(unitBox, mats.domainObsidian, domainIslandCount);
  domainIslandMesh.frustumCulled = false;
  worldGroup.add(domainIslandMesh);

  let lastTrenchZ = -999;

  // --- Ultra-Fast Per-Frame Update (Zero loops for mountains, boulders & forest!) ---
  function update(t, state) {
    waterMat.uniforms.uTime.value = t;
    fountainJet.scale.y = 0.85 + 0.25 * Math.sin(t * 9.5);

    // Act-Window GPU Sleep for Forest (Zero GPU vertex cost before Act 3!)
    forestGroup.visible = t >= 52.8;

    // Mountain glowing craters
    for (const c of craterRims) {
      const vis = t >= c.detonateTime;
      c.mesh.visible = vis;
      if (vis) {
        const cool = 1 - clamp01((t - c.detonateTime) / 38) * 0.75;
        c.mesh.scale.set(1, 0.7 + 0.3 * cool, 1);
      }
    }

    // TNT Blocks (Act-Window GPU Sleep after Act 1!)
    const tntActive = t < 21.8;
    tntNormalMesh.visible = tntActive;
    tntFlashMesh.visible = tntActive;
    if (tntActive) {
      for (let i = 0; i < tntRecords.length; i++) {
        const tnt = tntRecords[i];
        const timeLeft = tnt.detonateTime - t;
        if (timeLeft <= 0) {
          dummy.position.set(0, -50, 0);
          dummy.scale.setScalar(0.0001);
          dummy.updateMatrix();
          tntNormalMesh.setMatrixAt(i, dummy.matrix);
          tntFlashMesh.setMatrixAt(i, dummy.matrix);
        } else {
          const armed = timeLeft < 4.5 && t > 6.2;
          const flashRate = armed ? 6 + (4.5 - timeLeft) * 4.5 : 0;
          const isFlashing = armed && Math.sin(t * flashRate + tnt.phase) > 0.12;
          const swell = armed ? 1 + (1 - timeLeft / 4.5) * 0.24 * Math.abs(Math.sin(t * flashRate)) : 1;
          dummy.position.set(tnt.x, tnt.y, tnt.z);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.setScalar(tnt.scale * swell);
          dummy.updateMatrix();
          if (isFlashing) {
            tntFlashMesh.setMatrixAt(i, dummy.matrix);
            dummy.scale.setScalar(0.0001);
            dummy.updateMatrix();
            tntNormalMesh.setMatrixAt(i, dummy.matrix);
          } else {
            tntNormalMesh.setMatrixAt(i, dummy.matrix);
            dummy.scale.setScalar(0.0001);
            dummy.updateMatrix();
            tntFlashMesh.setMatrixAt(i, dummy.matrix);
          }
        }
      }
      tntNormalMesh.instanceMatrix.needsUpdate = true;
      tntFlashMesh.instanceMatrix.needsUpdate = true;
    }

    // Dirty-checked TT Trench (Only uploads when TT is actively carving!)
    const ttZ = state.ttTrenchZ ?? -120;
    trenchMesh.visible = ttZ > -108;
    if (trenchMesh.visible && Math.abs(ttZ - lastTrenchZ) > 0.5) {
      lastTrenchZ = ttZ;
      let idx = 0;
      for (let s = 0; s < trenchSegments; s++) {
        const segZ = -108 + s * 2.0;
        const revealed = segZ <= ttZ;
        for (let side = -1; side <= 1; side++) {
          if (revealed) {
            const isTrack = side !== 0;
            dummy.position.set(side * 4.2, isTrack ? 0.18 : 0.09, segZ);
            dummy.rotation.set(0, (s % 2) * 0.08 * side, 0);
            dummy.scale.set(isTrack ? 2.6 : 5.4, isTrack ? 0.45 : 0.22, 2.2);
          } else {
            dummy.position.set(0, -30, 0);
            dummy.scale.setScalar(0.0001);
          }
          dummy.updateMatrix();
          trenchMesh.setMatrixAt(idx++, dummy.matrix);
        }
      }
      trenchMesh.instanceMatrix.needsUpdate = true;
    }

    // Chunky Voxel Clouds (Sleep when Domain covers sky)
    const dAmt = state.domainIntensity ?? 0;
    cloudMesh.visible = dAmt < 0.88;
    if (cloudMesh.visible) {
      cloudMat.opacity = 0.86 * (1 - dAmt * 0.85);
      for (let i = 0; i < cloudRecords.length; i++) {
        const c = cloudRecords[i];
        const wrappedX = (((c.x + t * c.speed + 180) % 360) + 360) % 360 - 180;
        dummy.position.set(wrappedX, c.y, c.z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(c.sx, c.sy, c.sz);
        dummy.updateMatrix();
        cloudMesh.setMatrixAt(i, dummy.matrix);
      }
      cloudMesh.instanceMatrix.needsUpdate = true;
    }

    // Domain Expansion Floating Islands (Act-Window GPU Sleep when inactive!)
    domainIslandMesh.visible = dAmt > 0.01;
    if (domainIslandMesh.visible) {
      const lift = Math.pow(dAmt, 0.75);
      for (let i = 0; i < domainIslandCount; i++) {
        const isl = domainIslands[i];
        const bob = Math.sin(t * 1.4 + isl.phase) * 1.8 * lift;
        dummy.position.set(isl.x, -4 + (isl.targetY + 4) * lift + bob, isl.z);
        dummy.rotation.set(Math.sin(t * 0.5 + isl.phase) * 0.12, t * isl.spinY, Math.cos(t * 0.4 + isl.phase) * 0.1);
        dummy.scale.set(isl.sx * lift, isl.sy * lift, isl.sz * lift);
        dummy.updateMatrix();
        domainIslandMesh.setMatrixAt(i, dummy.matrix);
      }
      domainIslandMesh.instanceMatrix.needsUpdate = true;
    }
  }

  return { group: worldGroup, update };
}
