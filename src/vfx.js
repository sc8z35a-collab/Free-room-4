import * as THREE from 'three';
import { MOUNTAIN_PEAKS } from './world.js';
import { createDomainSealMaterial } from './shaders.js';
import { createMangaTextTexture } from './textures.js';
import {
  createGPUPlumeMaterial,
  createGPUConfettiMaterial,
  mergeRigidBoxesByMaterial,
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

export function createVFXSystem(scene, mats, sharedTimeUniform) {
  const rng = mulberry32(990077);
  const vfxGroup = new THREE.Group();
  scene.add(vfxGroup);

  const unitBox = new THREE.BoxGeometry(1, 1, 1);
  const dummy = new THREE.Object3D();
  const tmpColor = new THREE.Color();

  // --- 1. INVENTION #1C: Zero-CPU GPU Mountain TNT Mushroom Plumes (700 blocks!) ---
  const plumeCount = MOUNTAIN_PEAKS.length * 140;
  const pOriginT0 = new Float32Array(plumeCount * 4);
  const pVelLife = new Float32Array(plumeCount * 4);
  const pScaleSpin = new Float32Array(plumeCount * 3);
  let pIdx = 0;
  for (const peak of MOUNTAIN_PEAKS) {
    for (let i = 0; i < 140; i++) {
      const a = rng() * Math.PI * 2;
      const isCap = i >= 50;
      const rSpread = isCap ? 5 + rng() * 26 : rng() * 10;
      pOriginT0[pIdx * 4] = peak.x;
      pOriginT0[pIdx * 4 + 1] = 8.0;
      pOriginT0[pIdx * 4 + 2] = peak.z;
      pOriginT0[pIdx * 4 + 3] = peak.detonateTime + rng() * 0.28;

      pVelLife[pIdx * 4] = Math.cos(a) * rSpread * (isCap ? 1.15 : 0.45);
      pVelLife[pIdx * 4 + 1] = isCap ? 18 + rng() * 28 : 8 + rng() * 24;
      pVelLife[pIdx * 4 + 2] = Math.sin(a) * rSpread * (isCap ? 1.15 : 0.45);
      pVelLife[pIdx * 4 + 3] = 6.5 + rng() * 5.0;

      pScaleSpin[pIdx * 3] = isCap ? 3.2 + rng() * 4.8 : 2.6 + rng() * 3.8;
      pScaleSpin[pIdx * 3 + 1] = (rng() - 0.5) * 4;
      pScaleSpin[pIdx * 3 + 2] = rng();
      pIdx++;
    }
  }
  const plumeGeo = new THREE.BoxGeometry(1, 1, 1);
  plumeGeo.setAttribute('aOriginT0', new THREE.InstancedBufferAttribute(pOriginT0, 4));
  plumeGeo.setAttribute('aVelLife', new THREE.InstancedBufferAttribute(pVelLife, 4));
  plumeGeo.setAttribute('aScaleSpin', new THREE.InstancedBufferAttribute(pScaleSpin, 3));
  const plumeMesh = new THREE.InstancedMesh(plumeGeo, createGPUPlumeMaterial(sharedTimeUniform), plumeCount);
  plumeMesh.frustumCulled = false;
  vfxGroup.add(plumeMesh);

  // Supersonic Mountain Blast Shockwave Rings
  const blastRings = MOUNTAIN_PEAKS.map((peak) => {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.08, 6, 30),
      new THREE.MeshBasicMaterial({ color: 0xffd699, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    m.rotation.x = Math.PI / 2;
    m.position.set(peak.x, 14, peak.z);
    m.visible = false;
    vfxGroup.add(m);
    return { mesh: m, t0: peak.detonateTime };
  });

  // --- 2. Tractor TT Spray Debris & Exhaust Sparks (Act-Window Sleep!) ---
  const ttSprayCount = 150;
  const ttSprayData = [];
  for (let i = 0; i < ttSprayCount; i++) {
    const isExhaust = i < 42;
    ttSprayData.push({
      isExhaust,
      side: i % 2 === 0 ? -1 : 1,
      phase: rng(),
      vx: (rng() - 0.5) * (isExhaust ? 2.5 : 14),
      vy: isExhaust ? 9 + rng() * 10 : 7 + rng() * 12,
      vz: isExhaust ? -4 - rng() * 5 : -2 - rng() * 10,
      scale: isExhaust ? 0.55 + rng() * 0.65 : 0.45 + rng() * 0.75,
    });
  }
  const ttSprayMesh = new THREE.InstancedMesh(unitBox, new THREE.MeshBasicMaterial({ color: 0xffffff }), ttSprayCount);
  ttSprayMesh.frustumCulled = false;
  vfxGroup.add(ttSprayMesh);

  // --- 3. Creator Riu Genesis Light Pillar & Emerald Shockwave Rings ---
  const riuBeam = new THREE.Mesh(
    new THREE.CylinderGeometry(3.2, 6.2, 110, 14, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  riuBeam.position.set(0, 55, -28);
  riuBeam.visible = false;
  vfxGroup.add(riuBeam);

  const riuRings = [];
  for (let i = 0; i < 3; i++) {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.06, 6, 36),
      new THREE.MeshBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    r.rotation.x = Math.PI / 2;
    r.position.set(0, 0.8, -28);
    r.visible = false;
    vfxGroup.add(r);
    riuRings.push({ mesh: r, t0: 53.0 + i * 2.2 });
  }

  // --- 4. Domain Expansion「綻び / 極・綻び」Barrier, Arcane Seal & Unraveling Threads ---
  const domainBarrier = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 2),
    new THREE.MeshBasicMaterial({ color: 0xef233c, wireframe: true, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  domainBarrier.visible = false;
  vfxGroup.add(domainBarrier);

  const domainSealMat = createDomainSealMaterial();
  const domainGroundSeal = new THREE.Mesh(new THREE.PlaneGeometry(148, 148), domainSealMat);
  domainGroundSeal.rotation.x = -Math.PI / 2;
  domainGroundSeal.position.set(0, 0.35, -10);
  domainGroundSeal.visible = false;
  vfxGroup.add(domainGroundSeal);

  const domainHaloSeal = new THREE.Mesh(new THREE.PlaneGeometry(34, 34), domainSealMat);
  domainHaloSeal.position.set(0, 14, -22);
  domainHaloSeal.visible = false;
  vfxGroup.add(domainHaloSeal);

  const threadCount = 110;
  const threads = [];
  for (let i = 0; i < threadCount; i++) {
    const a = rng() * Math.PI * 2;
    const dist = 12 + rng() * 98;
    threads.push({
      x: Math.cos(a) * dist,
      z: -10 + Math.sin(a) * dist,
      phase: rng() * 10,
      speed: 6 + rng() * 12,
      h: 4 + rng() * 14,
      isGold: i % 3 !== 0,
    });
  }
  const threadMesh = new THREE.InstancedMesh(
    unitBox,
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.82, blending: THREE.AdditiveBlending, depthWrite: false }),
    threadCount
  );
  for (let i = 0; i < threadCount; i++) {
    threadMesh.setColorAt(i, tmpColor.setHex(threads[i].isGold ? 0xffd166 : 0xef233c));
  }
  threadMesh.instanceColor.needsUpdate = true;
  threadMesh.frustumCulled = false;
  vfxGroup.add(threadMesh);

  // --- 5. Captain Momonga's 38 Flaming Voxel Meteors (Batched to 2 InstancedMeshes!) ---
  const meteorCount = 38;
  const meteors = [];
  for (let i = 0; i < meteorCount; i++) {
    const isHero = i === 0;
    const size = isHero ? 5.8 : 1.7 + rng() * 3.1;
    const targetX = isHero ? -2.2 : (rng() - 0.5) * 86;
    const targetZ = isHero ? 44.5 : 24 + rng() * 68;
    const stopY = isHero ? 16.5 : 14 + rng() * 28;
    const startX = targetX + (isHero ? 36 : 28 + rng() * 32);
    const startY = isHero ? 158 : 140 + rng() * 65;
    const startZ = targetZ - (isHero ? 26 : 18 + rng() * 28);
    meteors.push({
      isHero,
      size,
      start: new THREE.Vector3(startX, startY, startZ),
      end: new THREE.Vector3(targetX, stopY, targetZ),
      launchTime: isHero ? 132.5 : 131.2 + rng() * 5.2,
      spin: new THREE.Vector3((rng() - 0.5) * 3.5, (rng() - 0.5) * 3.5, (rng() - 0.5) * 3.5),
      curPos: new THREE.Vector3(startX, startY, startZ),
    });
  }
  // Replaces 152 individual meteor meshes with JUST 2 InstancedMeshes (76x fewer draw calls!)
  const meteorRockInst = new THREE.InstancedMesh(unitBox, mats.meteorMagma, meteorCount * 2);
  const meteorAuraInst = new THREE.InstancedMesh(
    unitBox,
    new THREE.MeshBasicMaterial({ color: 0xff8c1a, transparent: true, opacity: 0.34, blending: THREE.AdditiveBlending, depthWrite: false }),
    meteorCount
  );
  meteorRockInst.frustumCulled = false;
  meteorAuraInst.frustumCulled = false;
  vfxGroup.add(meteorRockInst, meteorAuraInst);

  const trailCount = meteorCount * 8;
  const meteorTrailMesh = new THREE.InstancedMesh(
    unitBox,
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.82, blending: THREE.AdditiveBlending, depthWrite: false }),
    trailCount
  );
  meteorTrailMesh.frustumCulled = false;
  vfxGroup.add(meteorTrailMesh);

  // --- 6. INVENTION #1C: Zero-CPU GPU Finger-Snap Meteor Confetti (1,400 blocks!) ---
  const snapRing = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.09, 8, 40),
    new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  snapRing.position.set(0, 12.5, 49);
  snapRing.visible = false;
  vfxGroup.add(snapRing);

  const confettiCount = 1400;
  const cOrigin = new Float32Array(confettiCount * 3);
  const cVelScale = new Float32Array(confettiCount * 4);
  const cSpin = new Float32Array(confettiCount * 3);
  const cColor = new Float32Array(confettiCount * 3);
  const palette = [0x34d399, 0x38bdf8, 0xfde047, 0xf472b6, 0xa78bfa, 0xffffff];

  for (let i = 0; i < confettiCount; i++) {
    const mIdx = i < 240 ? 0 : i % meteorCount;
    const m = meteors[mIdx];
    const dir = new THREE.Vector3(rng() - 0.5, rng() - 0.32, rng() - 0.5).normalize();
    const spd = (mIdx === 0 ? 12 : 8) + rng() * 28;
    cOrigin[i * 3] = m.end.x + (rng() - 0.5) * m.size;
    cOrigin[i * 3 + 1] = m.end.y + (rng() - 0.5) * m.size;
    cOrigin[i * 3 + 2] = m.end.z + (rng() - 0.5) * m.size;

    cVelScale[i * 4] = dir.x * spd;
    cVelScale[i * 4 + 1] = dir.y * spd + 5;
    cVelScale[i * 4 + 2] = dir.z * spd;
    cVelScale[i * 4 + 3] = 0.45 + rng() * 0.95;

    cSpin[i * 3] = (rng() - 0.5) * 12;
    cSpin[i * 3 + 1] = (rng() - 0.5) * 12;
    cSpin[i * 3 + 2] = (rng() - 0.5) * 12;

    tmpColor.setHex(palette[i % palette.length]);
    cColor[i * 3] = tmpColor.r;
    cColor[i * 3 + 1] = tmpColor.g;
    cColor[i * 3 + 2] = tmpColor.b;
  }
  const confettiGeo = new THREE.BoxGeometry(1, 1, 1);
  confettiGeo.setAttribute('aOrigin', new THREE.InstancedBufferAttribute(cOrigin, 3));
  confettiGeo.setAttribute('aVelScale', new THREE.InstancedBufferAttribute(cVelScale, 4));
  confettiGeo.setAttribute('aSpin', new THREE.InstancedBufferAttribute(cSpin, 3));
  confettiGeo.setAttribute('aColor', new THREE.InstancedBufferAttribute(cColor, 3));
  const confettiMesh = new THREE.InstancedMesh(
    confettiGeo,
    createGPUConfettiMaterial(sharedTimeUniform, { value: 147.2 }, -3.6, 14.0),
    confettiCount
  );
  confettiMesh.frustumCulled = false;
  vfxGroup.add(confettiMesh);

  // --- 7. PHASE 2 MONUMENTAL VFX (ACTS 9-12: GIGA-TT Pillars, Moon-Meteor, Cosmic Starburst!) ---
  // Act 9: GIGA-TT Twin Magma-Fracture Energy Pillars
  const gigaPillars = new THREE.Group();
  gigaPillars.visible = false;
  const pillarMat = new THREE.MeshBasicMaterial({ color: 0xff4d6d, transparent: true, opacity: 0.48, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  for (const [px, pz] of [[-18, -14], [18, -14], [-14, 20], [14, 20]]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 2.8, 95, 8, 1, true), pillarMat);
    p.position.set(px, 47.5, pz);
    gigaPillars.add(p);
  }
  vfxGroup.add(gigaPillars);

  // Act 10: Wolf Maaki Rings Tactical Crimson Lock-On Laser
  const wolfLaser = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.9, 68, 8, 1, true),
    new THREE.MeshBasicMaterial({ color: 0xff3355, transparent: true, opacity: 0.72, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  wolfLaser.visible = false;
  vfxGroup.add(wolfLaser);

  // Act 11-12: Captain Momonga KF23's Planetoid-Scale "MOON-METEOR" (Merged into 2 draw calls!)
  const moonGroup = new THREE.Group();
  moonGroup.visible = false;
  const moonBoxes = [
    { w: 26, h: 26, d: 26, mat: mats.moonCrust },
    { w: 32, h: 18, d: 18, mat: mats.moonCrust },
    { w: 18, h: 32, d: 18, mat: mats.moonCrust },
    { w: 18, h: 18, d: 32, mat: mats.moonCrust },
    { w: 22, h: 22, d: 28, mat: mats.meteorMagma, x: 4, y: -3, z: 2 },
    { w: 22, h: 28, d: 22, mat: mats.meteorMagma, x: -4, y: 3, z: -2 },
  ];
  mergeRigidBoxesByMaterial(moonGroup, moonBoxes, false);
  const moonRing1 = new THREE.Mesh(
    new THREE.TorusGeometry(24, 1.15, 8, 36),
    new THREE.MeshBasicMaterial({ color: 0xff6b1a, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  moonRing1.rotation.x = Math.PI * 0.42;
  const moonRing2 = new THREE.Mesh(
    new THREE.TorusGeometry(29, 0.7, 6, 36),
    new THREE.MeshBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  moonRing2.rotation.set(Math.PI * 0.58, 0.4, 0);
  moonGroup.add(moonRing1, moonRing2);
  vfxGroup.add(moonGroup);

  // Act 11-12: Creator Riu x Joseph Emerald Genesis Ascent Pillar!
  const ascentPillar = new THREE.Mesh(
    new THREE.CylinderGeometry(2.6, 5.2, 85, 12, 1, true),
    new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.42, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false })
  );
  ascentPillar.visible = false;
  vfxGroup.add(ascentPillar);

  // Act 12 (t=285.5s): Zero-CPU GPU 900-Star Milky-Way Moon-Shatter Aurora Burst!
  const moonBurstRing = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.16, 8, 44),
    new THREE.MeshBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  moonBurstRing.position.set(0, 44, 34);
  moonBurstRing.visible = false;
  vfxGroup.add(moonBurstRing);

  const starCount = 900;
  const sOrigin = new Float32Array(starCount * 3);
  const sVelScale = new Float32Array(starCount * 4);
  const sSpin = new Float32Array(starCount * 3);
  const sColor = new Float32Array(starCount * 3);
  const auroraPalette = [0x34d399, 0xfde047, 0x38bdf8, 0xc084fc, 0xffffff, 0xfb923c];

  for (let i = 0; i < starCount; i++) {
    const theta = rng() * Math.PI * 2;
    const phi = Math.acos(2 * rng() - 1);
    const r = 4 + rng() * 14;
    const spd = 24 + rng() * 58;
    const dx = Math.sin(phi) * Math.cos(theta);
    const dy = Math.cos(phi) * 0.65 + 0.25;
    const dz = Math.sin(phi) * Math.sin(theta);

    sOrigin[i * 3] = dx * r;
    sOrigin[i * 3 + 1] = 44 + dy * r;
    sOrigin[i * 3 + 2] = 34 + dz * r;

    sVelScale[i * 4] = dx * spd;
    sVelScale[i * 4 + 1] = dy * spd;
    sVelScale[i * 4 + 2] = dz * spd;
    sVelScale[i * 4 + 3] = 0.7 + rng() * 1.45;

    sSpin[i * 3] = (rng() - 0.5) * 9;
    sSpin[i * 3 + 1] = (rng() - 0.5) * 9;
    sSpin[i * 3 + 2] = (rng() - 0.5) * 9;

    tmpColor.setHex(auroraPalette[i % auroraPalette.length]);
    sColor[i * 3] = tmpColor.r;
    sColor[i * 3 + 1] = tmpColor.g;
    sColor[i * 3 + 2] = tmpColor.b;
  }
  const starGeo = new THREE.BoxGeometry(1, 1, 1);
  starGeo.setAttribute('aOrigin', new THREE.InstancedBufferAttribute(sOrigin, 3));
  starGeo.setAttribute('aVelScale', new THREE.InstancedBufferAttribute(sVelScale, 4));
  starGeo.setAttribute('aSpin', new THREE.InstancedBufferAttribute(sSpin, 3));
  starGeo.setAttribute('aColor', new THREE.InstancedBufferAttribute(sColor, 3));
  const moonStarMesh = new THREE.InstancedMesh(
    starGeo,
    createGPUConfettiMaterial(sharedTimeUniform, { value: 285.5 }, -0.6, 18.0),
    starCount
  );
  moonStarMesh.frustumCulled = false;
  vfxGroup.add(moonStarMesh);

  // --- 8. Joseph Joestar ORA-ORA Shockwave Rings & Sparks (Act 8 & Act 12 Cosmic Overdrive!) ---
  const oraRings = [];
  for (let i = 0; i < 6; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.3, 0.11, 6, 24),
      new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xfacc15 : 0xa855f7,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    ring.visible = false;
    vfxGroup.add(ring);
    oraRings.push(ring);
  }

  const oraSparkCount = 180;
  const oraSparks = [];
  for (let i = 0; i < oraSparkCount; i++) {
    oraSparks.push({
      angle: rng() * Math.PI * 2,
      rad: 1.0 + rng() * 5.0,
      speed: 16 + rng() * 28,
      phase: rng(),
      scale: 0.3 + rng() * 0.62,
      isGold: i % 2 === 0,
    });
  }
  const oraSparkMesh = new THREE.InstancedMesh(
    unitBox,
    new THREE.MeshBasicMaterial({ color: 0xffffff, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.58, depthWrite: false }),
    oraSparkCount
  );
  oraSparkMesh.frustumCulled = false;
  vfxGroup.add(oraSparkMesh);

  // --- 9. 3D World-Space Anime/Manga Typography Sprites (Acts 1-12!) ---
  const makeMangaSprite = (text, opts, sx, sy) => {
    const tex = createMangaTextTexture(text, opts);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false });
    const sp = new THREE.Sprite(mat);
    sp.scale.set(sx, sy, 1);
    sp.visible = false;
    sp.renderOrder = 20;
    vfxGroup.add(sp);
    return sp;
  };

  const sfxSprites = {
    tntBoom: makeMangaSprite('ドゴォォォン!!', { fill: '#ffdd55', stroke: '#1c0505', glow: '#ff3b1f', fontSize: 108 }, 52, 14),
    ttSmash: makeMangaSprite('ズガァァァン!!', { fill: '#ffae33', stroke: '#1a0a04', glow: '#ff4500', fontSize: 108 }, 28, 7.5),
    riuGrow: makeMangaSprite('大森林増殖!!', { fill: '#6ee7b7', stroke: '#052e16', glow: '#10b981', fontSize: 108 }, 30, 8),
    domainTitle: makeMangaSprite('領域展開「綻び」', { fill: '#ffd166', stroke: '#140308', glow: '#ef233c', fontSize: 104 }, 36, 9.5),
    wolfHowl: makeMangaSprite('アオオオオオン!!', { fill: '#7dd3fc', stroke: '#0c1933', glow: '#ef4444', fontSize: 98 }, 24, 6.5),
    riuCancel: makeMangaSprite('あ、やっぱやめた。', { fill: '#a7f3d0', stroke: '#064e3b', glow: '#34d399', fontSize: 92 }, 18, 4.8),
    gogogoL: makeMangaSprite('ゴゴゴゴ', { fill: '#c084fc', stroke: '#1e0633', glow: '#9333ea', fontSize: 118 }, 12, 3.6),
    gogogoR: makeMangaSprite('ゴゴゴゴ', { fill: '#facc15', stroke: '#1e0633', glow: '#a855f7', fontSize: 118 }, 12, 3.6),
    gigaAwaken: makeMangaSprite('極・綻び!!', { fill: '#ffd166', stroke: '#1f0308', glow: '#ef233c', fontSize: 110 }, 34, 9),
    hollowBlast: makeMangaSprite('究極虚式・気楽滅殺!!', { fill: '#e879f9', stroke: '#19052e', glow: '#a855f7', fontSize: 90 }, 32, 8.2),
    moonDrop: makeMangaSprite('超巨大ムーン・メテオ!!', { fill: '#ff9e44', stroke: '#220602', glow: '#ff3b1f', fontSize: 88 }, 38, 9.5),
    cosmicOra: makeMangaSprite('超・天地おらおら!!', { fill: '#6ee7b7', stroke: '#052e16', glow: '#facc15', fontSize: 96 }, 30, 8),
    oraBurst: [],
  };

  const oraTexts = ['オラァ!!', 'オラオラ!!', 'オラッ!!', 'おらおらおらおら!!', 'オラァァァ!!'];
  for (let i = 0; i < 6; i++) {
    sfxSprites.oraBurst.push(
      makeMangaSprite(
        oraTexts[i % oraTexts.length],
        {
          fill: i % 2 === 0 ? '#fef08a' : '#f0abfc',
          stroke: '#1b042e',
          glow: i % 2 === 0 ? '#f59e0b' : '#c026d3',
          fontSize: 104,
        },
        14 + (i % 3) * 3,
        4.2
      )
    );
  }

  // --- Ultra-Fast Act-Window-Gated Update Function ---
  function update(t, state) {
    // 1. Zero-CPU GPU Plumes (Act-Window GPU Sleep!)
    plumeMesh.visible = t >= 12.0 && t <= 33.5;

    for (const r of blastRings) {
      const dt = t - r.t0;
      if (dt > 0 && dt < 2.8) {
        r.mesh.visible = true;
        const rad = 4 + dt * 42;
        r.mesh.scale.set(rad, rad, 1 + dt * 4);
        r.mesh.material.opacity = Math.max(0, 1 - dt / 2.8) * 0.9;
      } else {
        r.mesh.visible = false;
      }
    }

    // 2. Tractor TT Shredder Spray (Act-Window Sleep!)
    const ttActive = t >= 25.0 && t <= 46.8;
    ttSprayMesh.visible = ttActive;
    if (ttActive && state.ttPos) {
      const ttPos = state.ttPos;
      for (let i = 0; i < ttSprayCount; i++) {
        const sp = ttSprayData[i];
        const cyc = ((t * (sp.isExhaust ? 1.8 : 1.55) + sp.phase) % 1.0);
        const dt = cyc * 1.1;
        if (sp.isExhaust) {
          dummy.position.set(ttPos.x + sp.side * 2.25 + sp.vx * dt, 8.8 + sp.vy * dt, ttPos.z + 1.8 + sp.vz * dt);
          tmpColor.setRGB(1.0 - cyc * 0.6, 0.65 - cyc * 0.5, 0.15);
        } else {
          dummy.position.set(ttPos.x + sp.vx * dt * 0.65, Math.max(0.3, 1.2 + sp.vy * dt - 13 * dt * dt), ttPos.z + 5.8 + sp.vz * dt);
          tmpColor.setRGB(0.42, 0.3, 0.2);
        }
        dummy.rotation.set(dt * 8, dt * 6, 0);
        dummy.scale.setScalar(sp.scale * (1 - cyc * 0.55));
        dummy.updateMatrix();
        ttSprayMesh.setMatrixAt(i, dummy.matrix);
        ttSprayMesh.setColorAt(i, tmpColor);
      }
      ttSprayMesh.instanceMatrix.needsUpdate = true;
      if (ttSprayMesh.instanceColor) ttSprayMesh.instanceColor.needsUpdate = true;
    }

    // 3. Creator Riu Genesis Light Pillar & Emerald Shockrings
    const beamActive = t >= 46.0 && t <= 55.8;
    riuBeam.visible = beamActive;
    if (beamActive) {
      const fadeIn = clamp01((t - 46.0) / 1.5);
      const fadeOut = 1 - clamp01((t - 53.0) / 2.8);
      riuBeam.material.opacity = 0.18 * fadeIn * fadeOut * (0.88 + 0.12 * Math.sin(t * 14));
    }
    for (const r of riuRings) {
      const dt = t - r.t0;
      if (dt > 0 && dt < 5.5) {
        r.mesh.visible = true;
        const rad = 2 + dt * 20;
        r.mesh.scale.set(rad, rad, 1.8);
        r.mesh.material.opacity = Math.max(0, 1 - dt / 5.5) * 0.92;
      } else {
        r.mesh.visible = false;
      }
    }

    // 4. Domain Expansion「綻び / 極・綻び」Barrier, Arcane Seal & Unraveling Threads
    const dInt = state.domainIntensity ?? 0;
    const isBarrier1 = t >= 99.6 && t <= 105.5;
    const isBarrier2 = t >= 184.0 && t <= 190.0;
    domainBarrier.visible = isBarrier1 || isBarrier2;
    if (domainBarrier.visible) {
      const tStart = isBarrier2 ? 184.0 : 100.0;
      const dExp = clamp01((t - tStart) / 4.0);
      domainBarrier.position.set(0, isBarrier2 ? 12 : 5.5, isBarrier2 ? 10 : -13);
      domainBarrier.scale.setScalar(1.2 + Math.pow(dExp, 1.35) * 165);
      domainBarrier.rotation.set(t * 0.7, t * 1.1, 0);
      domainBarrier.material.opacity = (1 - clamp01((t - (tStart + 3.2)) / 2.2)) * 0.78;
    }

    domainSealMat.uniforms.uTime.value = t;
    domainSealMat.uniforms.uOpacity.value = dInt * 0.92;
    domainGroundSeal.visible = dInt > 0.02;
    domainHaloSeal.visible = dInt > 0.02 && (t < 116 || (t >= 184 && t <= 220));
    if (domainHaloSeal.visible) {
      domainHaloSeal.position.set(0, t >= 184 ? 22 : 14, t >= 184 ? 12 : -22);
    }

    threadMesh.visible = dInt > 0.02;
    if (threadMesh.visible) {
      for (let i = 0; i < threadCount; i++) {
        const th = threads[i];
        const py = ((t * th.speed + th.phase * 10) % 90) - 5;
        dummy.position.set(th.x, py, th.z);
        dummy.rotation.set(0, t * 1.2 + th.phase, 0);
        dummy.scale.set(0.24 * dInt, th.h * dInt, 0.24 * dInt);
        dummy.updateMatrix();
        threadMesh.setMatrixAt(i, dummy.matrix);
      }
      threadMesh.instanceMatrix.needsUpdate = true;
    }

    // 5. Batched Instanced 38 Flaming Voxel Meteors + Trails (Act-Window Sleep!)
    const snapTime = 147.2;
    const meteorsVisible = t >= 131.0 && t < snapTime;
    meteorRockInst.visible = meteorsVisible;
    meteorAuraInst.visible = meteorsVisible;
    meteorTrailMesh.visible = meteorsVisible;

    if (meteorsVisible) {
      let trailIdx = 0;
      const backDir = new THREE.Vector3();
      for (let i = 0; i < meteorCount; i++) {
        const m = meteors[i];
        if (t < m.launchTime) {
          dummy.position.set(0, -100, 0);
          dummy.scale.setScalar(0.0001);
          dummy.updateMatrix();
          meteorRockInst.setMatrixAt(i * 2, dummy.matrix);
          meteorRockInst.setMatrixAt(i * 2 + 1, dummy.matrix);
          meteorAuraInst.setMatrixAt(i, dummy.matrix);
          for (let k = 0; k < 8; k++) meteorTrailMesh.setMatrixAt(trailIdx++, dummy.matrix);
          continue;
        }
        const fallDur = m.isHero ? 10.6 : 9.2;
        const effectiveT = t > 142.8 ? 142.8 + (t - 142.8) * 0.04 : t;
        const easedP = Math.pow(clamp01((effectiveT - m.launchTime) / fallDur), 1.35);
        m.curPos.lerpVectors(m.start, m.end, easedP);

        dummy.position.copy(m.curPos);
        dummy.rotation.set(effectiveT * m.spin.x, effectiveT * m.spin.y, effectiveT * m.spin.z);
        dummy.scale.set(m.size, m.size, m.size);
        dummy.updateMatrix();
        meteorRockInst.setMatrixAt(i * 2, dummy.matrix);

        dummy.scale.set(m.size * 1.18, m.size * 0.72, m.size * 0.78);
        dummy.rotation.x += 0.65;
        dummy.updateMatrix();
        meteorRockInst.setMatrixAt(i * 2 + 1, dummy.matrix);

        dummy.scale.setScalar(m.size * 1.32);
        dummy.updateMatrix();
        meteorAuraInst.setMatrixAt(i, dummy.matrix);

        backDir.subVectors(m.start, m.end).normalize();
        for (let k = 0; k < 8; k++) {
          const frac = (k + 1) / 8;
          const jitter = Math.sin(t * 24 + i * 3 + k) * 0.45 * m.size * 0.25;
          dummy.position.set(
            m.curPos.x + backDir.x * frac * m.size * 5.2 + jitter,
            m.curPos.y + backDir.y * frac * m.size * 5.2,
            m.curPos.z + backDir.z * frac * m.size * 5.2 - jitter
          );
          dummy.rotation.set(t * 4 + k, t * 3 + i, 0);
          dummy.scale.setScalar(Math.max(0.2, m.size * (0.72 - frac * 0.52)));
          dummy.updateMatrix();
          meteorTrailMesh.setMatrixAt(trailIdx, dummy.matrix);
          tmpColor.setRGB(1.0, Math.max(0.15, 0.9 - frac * 0.78), Math.max(0.02, 0.35 - frac * 0.32));
          meteorTrailMesh.setColorAt(trailIdx, tmpColor);
          trailIdx++;
        }
      }
      meteorRockInst.instanceMatrix.needsUpdate = true;
      meteorAuraInst.instanceMatrix.needsUpdate = true;
      meteorTrailMesh.instanceMatrix.needsUpdate = true;
      if (meteorTrailMesh.instanceColor) meteorTrailMesh.instanceColor.needsUpdate = true;
    }

    // 6. Zero-CPU GPU Finger-Snap Meteor Confetti (Act-Window Sleep!)
    const dtSnap = t - snapTime;
    confettiMesh.visible = dtSnap > 0 && dtSnap < 14.5;
    if (dtSnap > 0 && dtSnap < 3.6) {
      snapRing.visible = true;
      const rad = 1.5 + dtSnap * 52;
      snapRing.scale.set(rad, rad, 2.2);
      snapRing.rotation.set(Math.PI / 2 - 0.25, dtSnap * 1.5, 0);
      snapRing.material.opacity = Math.max(0, 1 - dtSnap / 3.6);
    } else {
      snapRing.visible = false;
    }

    // 7. PHASE 2 MONUMENTAL VFX (Acts 9-12)
    gigaPillars.visible = t >= 186.0 && t <= 238.0;
    if (gigaPillars.visible) {
      const pGrow = clamp01((t - 186.0) / 3.0);
      gigaPillars.scale.set(1 + Math.sin(t * 14) * 0.12, pGrow, 1 + Math.cos(t * 14) * 0.12);
    }

    wolfLaser.visible = t >= 226.0 && t <= 239.0;
    if (wolfLaser.visible && state.wolfPos) {
      wolfLaser.position.set(state.wolfPos.x * 0.5, state.wolfPos.y + 8, state.wolfPos.z * 0.5);
      wolfLaser.rotation.set(0.35, 0, -1.15);
      const w = 0.75 + Math.sin(t * 28) * 0.25;
      wolfLaser.scale.set(w, 1, w);
    }

    // Act 11-12: Planetoid Moon-Meteor Descent -> Shatters at t=285.5s!
    const moonShatterT = 285.5;
    moonGroup.visible = t >= 244.0 && t < moonShatterT;
    if (moonGroup.visible) {
      const p = clamp01((t - 244.0) / 28.0);
      const yPos = 152 - Math.pow(p, 0.88) * 108; // Descends down to y=44 looming right over the town!
      const shakeMoon = t >= 274.0 ? Math.sin(t * 48) * 0.95 : 0;
      moonGroup.position.set(shakeMoon, yPos + Math.cos(t * 40) * (t >= 274 ? 0.6 : 0), 34);
      moonGroup.rotation.set(t * 0.18, t * 0.35, t * 0.12);
      moonRing1.rotation.z = t * 1.4;
      moonRing2.rotation.z = -t * 1.1;
    }

    // Act 11-12: Emerald Genesis Ascent Pillar under Joseph!
    ascentPillar.visible = t >= 261.0 && t <= 286.0;
    if (ascentPillar.visible) {
      ascentPillar.position.set(0, 42, 46);
      const w = 0.85 + Math.sin(t * 16) * 0.18;
      ascentPillar.scale.set(w, 1, w);
    }

    // Act 12: Zero-CPU GPU 900-Star Milky-Way Moon-Shatter Aurora!
    const dtMoon = t - moonShatterT;
    moonStarMesh.visible = dtMoon > 0 && dtMoon < 18.0;
    if (dtMoon > 0 && dtMoon < 4.5) {
      moonBurstRing.visible = true;
      const rad = 4 + dtMoon * 68;
      moonBurstRing.scale.set(rad, rad, 3.0);
      moonBurstRing.rotation.set(Math.PI / 2 - 0.35, dtMoon * 1.2, 0);
      moonBurstRing.material.opacity = Math.max(0, 1 - dtMoon / 4.5);
    } else {
      moonBurstRing.visible = false;
    }

    // 8. Joseph Joestar ORA-ORA Shockwaves & Sparks (Act 8 AND Act 12 Cosmic Overdrive!)
    const oraAct8 = t >= 159.5 && t <= 176.2;
    const oraAct12 = t >= 273.0 && t <= 285.6;
    const oraActive = oraAct8 || oraAct12;
    const jPos = state.josephPos ?? new THREE.Vector3(0, 0, 58);

    for (let i = 0; i < oraRings.length; i++) {
      const r = oraRings[i];
      r.visible = oraActive;
      if (oraActive) {
        const cyc = ((t * 3.8 + i / oraRings.length) % 1.0);
        r.material.color.setHex(oraAct12 ? (i % 2 === 0 ? 0x34d399 : 0xfde047) : (i % 2 === 0 ? 0xfacc15 : 0xa855f7));
        if (oraAct12) {
          // Punching UPWARD straight into the colossal Moon-Meteor!
          r.position.set(jPos.x + Math.sin(i * 2.1) * 1.6, jPos.y + 3.0 + cyc * 24.0, jPos.z - 2.0 - cyc * 10.0);
          r.rotation.set(Math.PI * 0.32, 0, 0);
        } else {
          r.position.set(jPos.x + Math.sin(i * 2.4) * 1.2, jPos.y + 2.4 + Math.cos(i * 1.9) * 0.9, jPos.z - 2.2 - cyc * 14.5);
          r.rotation.set(0, 0, 0);
        }
        const s = (0.55 + cyc * 4.2) * (oraAct12 ? 1.5 : 1.0);
        r.scale.set(s, s, 1);
        r.material.opacity = Math.sin(cyc * Math.PI) * 0.58;
      }
    }

    oraSparkMesh.visible = oraActive;
    if (oraActive) {
      for (let i = 0; i < oraSparkCount; i++) {
        const sp = oraSparks[i];
        const cyc = ((t * 2.8 + sp.phase) % 1.0);
        const r = sp.rad * (0.4 + cyc * 2.6);
        if (oraAct12) {
          dummy.position.set(jPos.x + Math.cos(sp.angle + t * 2) * r * 1.4, jPos.y + 2.5 + cyc * 28, jPos.z - 2 - cyc * 10);
          dummy.scale.set(sp.scale * 0.6, sp.scale * 3.8, sp.scale * 0.6);
        } else {
          dummy.position.set(jPos.x + Math.cos(sp.angle + t * 2) * r, jPos.y + 2.4 + Math.sin(sp.angle + t * 2) * r * 0.85, jPos.z - 1.5 - cyc * sp.speed * 0.65);
          dummy.scale.set(sp.scale * 0.5, sp.scale * 0.5, sp.scale * 3.2);
        }
        dummy.rotation.set(t * 14, sp.angle, 0);
        dummy.updateMatrix();
        oraSparkMesh.setMatrixAt(i, dummy.matrix);
        tmpColor.setHex(oraAct12 ? (sp.isGold ? 0xfde047 : 0x34d399) : (sp.isGold ? 0xfef08a : 0xd946ef));
        oraSparkMesh.setColorAt(i, tmpColor);
      }
      oraSparkMesh.instanceMatrix.needsUpdate = true;
      if (oraSparkMesh.instanceColor) oraSparkMesh.instanceColor.needsUpdate = true;
    }

    // 9. 3D World-Space Manga SFX Sprites (Acts 1-12!)
    const showSprite = (sp, cond, x, y, z, scaleMul = 1) => {
      sp.visible = cond;
      if (cond) {
        sp.position.set(x, y, z);
        if (!sp.userData.baseScale) sp.userData.baseScale = sp.scale.clone();
        sp.scale.copy(sp.userData.baseScale).multiplyScalar(scaleMul);
      }
    };

    let boomPeak = null;
    for (const pk of MOUNTAIN_PEAKS) {
      if (t >= pk.detonateTime && t < pk.detonateTime + 1.85) { boomPeak = pk; break; }
    }
    showSprite(sfxSprites.tntBoom, !!boomPeak, boomPeak ? boomPeak.x : 0, boomPeak ? boomPeak.height * 0.9 + 12 : 0, boomPeak ? boomPeak.z + 10 : 0, 1.0);
    showSprite(sfxSprites.ttSmash, t >= 30.8 && t <= 42.5, (state.ttPos?.x ?? 0) + Math.sin(t * 18) * 1.4, 11.5, (state.ttPos?.z ?? -40) + 4, 1.0);
    showSprite(sfxSprites.riuGrow, t >= 53.4 && t <= 59.5, 0, 17, -28, 1.05);
    showSprite(sfxSprites.domainTitle, t >= 96.5 && t <= 104.0, 0, 17.5, -16, 1.0);
    showSprite(sfxSprites.wolfHowl, t >= 122.0 && t <= 126.8, -32, 23.5, 14, 1.0);
    showSprite(sfxSprites.riuCancel, t >= 143.6 && t <= 147.1, 4.8, 16.5, 48.5, 1.0);
    showSprite(sfxSprites.gigaAwaken, t >= 186.0 && t <= 198.0, 0, 26, 14, 1.05);
    showSprite(sfxSprites.hollowBlast, t >= 216.0 && t <= 227.0, 14, 34, 6, 1.0);
    showSprite(sfxSprites.moonDrop, t >= 246.0 && t <= 258.0, 0, 74, 34, 1.15);
    showSprite(sfxSprites.cosmicOra, t >= 274.5 && t <= 285.0, 0, 32, 42, 1.12);

    const rageShow = t >= 154.4 && t <= 160.2;
    showSprite(sfxSprites.gogogoL, rageShow, jPos.x - 5.2, jPos.y + 5.8 + Math.sin(t * 14) * 0.4, jPos.z + 1.5, 1.0);
    showSprite(sfxSprites.gogogoR, rageShow, jPos.x + 5.4, jPos.y + 4.4 + Math.cos(t * 13) * 0.4, jPos.z + 1.5, 1.0);

    for (let i = 0; i < sfxSprites.oraBurst.length; i++) {
      const sp = sfxSprites.oraBurst[i];
      if (!oraActive) { sp.visible = false; continue; }
      const cyc = ((t * 2.4 + i / sfxSprites.oraBurst.length) % 1.0);
      const ang = i * 1.7 + Math.floor(t * 3) * 0.6;
      const rad = 4.5 + cyc * 9.0;
      if (oraAct12) {
        showSprite(sp, true, jPos.x + Math.cos(ang) * rad * 1.3, jPos.y + 4.0 + cyc * 18, jPos.z - 2 - cyc * 8, 0.7 + Math.sin(cyc * Math.PI) * 0.7);
      } else {
        showSprite(sp, true, jPos.x + Math.cos(ang) * rad, jPos.y + 2.8 + Math.sin(ang) * rad * 0.65, jPos.z - 2.0 - cyc * 11, 0.55 + Math.sin(cyc * Math.PI) * 0.72);
      }
    }
  }

  return { group: vfxGroup, update };
}
