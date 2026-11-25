import * as THREE from 'three';

/**
 * Chapter 20 Monumental Dawn Campus Zelkova Promenade & Volumetric God-Rays Engine
 * (`最終章・第20章：五百二十日目の朝、アスファルトを踏みしめて`):
 * - Wet morning-dew asphalt promenade lined with 12 towering Zelkova trees (`欅並木`)
 * - Bright yellow tactile braille paving strip (`黄色い点字ブロック`) & rolling round pebbles (`丸い小石`)
 * - Research Building (`研究棟`) w/ automatic glass door + Day-1 Bicycle Parking rack (`駐輪場の脇`)
 * - Breathing Volumetric Golden Sunrise God-Rays (`金色の朝日の矢`) piercing through the zelkova canopy!
 * - Fluttering golden-yellow zelkova leaves + hero single leaf grazing HMD-02's visor & rubber fist!
 */

export function createDawnCampusPromenadeRig(baseMats, pbr) {
  const group = new THREE.Group();

  // Wide Dew-Wet Campus Asphalt Promenade (`夜露に濡れたアスファルトの道`)
  const roadMat = pbr.get('asphaltRoadDry', { repeatX: 4, repeatY: 16, tint: 0x3b4252 });
  roadMat.roughness = 0.42; // subtle morning-dew sheen!
  roadMat.metalness = 0.14;
  const road = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 46), roadMat);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0, -14);
  road.receiveShadow = true;
  group.add(road);

  // Side Curb Grass / Stone Walkways on both sides
  const sideMat = pbr.get('mossGroundFloor', { repeatX: 6, repeatY: 18, tint: 0x3f6212 });
  for (const sx of [-7.6, 7.6]) {
    const lawn = new THREE.Mesh(new THREE.PlaneGeometry(8.2, 46), sideMat);
    lawn.rotation.x = -Math.PI / 2;
    lawn.position.set(sx, -0.02, -14);
    lawn.receiveShadow = true;
    group.add(lawn);
  }

  // Iconic Bright Yellow Tactile Braille Paving Strip (`黄色い点字ブロックの帯`) at z = -5.5!
  const brailleGroup = new THREE.Group();
  brailleGroup.position.set(0, 0.004, -5.5);
  const yellowTileMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.55 });
  const tileBase = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.006, 0.34), yellowTileMat);
  tileBase.receiveShadow = true;
  brailleGroup.add(tileBase);
  for (let bx = -2.4; bx <= 2.4; bx += 0.24) {
    for (let bz = -0.10; bz <= 0.10; bz += 0.10) {
      const bump = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.018, 0.008, 8), yellowTileMat);
      bump.position.set(bx, 0.007, bz);
      brailleGroup.add(bump);
    }
  }
  group.add(brailleGroup);

  // Hero Rolling Round Pebble (`枯れ葉の下の丸い小石`) at z = -10.4 + Scattered Brown Fallen Leaves!
  const pebble = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.024, 1),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.72 })
  );
  pebble.position.set(0.28, 0.022, -10.4);
  pebble.castShadow = true;
  group.add(pebble);

  const fallenLeafMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.85, side: THREE.DoubleSide });
  for (let i = 0; i < 42; i++) {
    const lf = new THREE.Mesh(new THREE.CircleGeometry(0.042, 6), fallenLeafMat);
    lf.rotation.x = -Math.PI / 2;
    lf.rotation.z = i * 1.1;
    lf.position.set(((i * 1.37) % 5.6) - 2.8, 0.005, 2.0 - i * 0.68);
    group.add(lf);
  }

  // 12 Towering Campus Zelkova Trees (`欅並木`) flanking both sides of the promenade!
  const trunkMat = pbr.get('barkTreeDark', { repeatX: 1, repeatY: 3, tint: 0x5c4636 });
  const leafGoldMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.75 });
  const leafGreenMat = new THREE.MeshStandardMaterial({ color: 0x4d7c0f, roughness: 0.78 });
  for (let i = 0; i < 6; i++) {
    const tz = 1.5 - i * 5.2;
    for (const side of [-1, 1]) {
      const tx = side * 4.35;
      const tree = new THREE.Group();
      tree.position.set(tx, 0, tz);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 3.8, 12), trunkMat);
      trunk.position.y = 1.9; trunk.castShadow = true;
      tree.add(trunk);
      // Lush overlapping late-summer / early-autumn zelkova canopy clusters
      const offsets = [[0, 4.6, 0, 1.85], [-0.9, 4.1, 0.5, 1.35], [0.95, 4.2, -0.4, 1.4], [0.1, 5.2, 0.4, 1.3]];
      offsets.forEach(([ox, oy, oz, r], j) => {
        const foliage = new THREE.Mesh(
          new THREE.DodecahedronGeometry(r, 1),
          (i + j) % 3 === 0 ? leafGoldMat : leafGreenMat
        );
        foliage.position.set(ox, oy, oz);
        foliage.castShadow = true;
        tree.add(foliage);
      });
      group.add(tree);
    }
  }

  // Research Building (`研究棟`) on Right Side at z = -15.5 w/ Glass Automatic Door!
  const researchBldg = new THREE.Group();
  researchBldg.position.set(5.4, 0, -15.5);
  const bldgWall = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 6.2, 9.0),
    pbr.get('archWhiteConcrete', { repeatX: 4, repeatY: 3, tint: 0xe2e8f0 })
  );
  bldgWall.position.set(1.8, 3.1, 0); bldgWall.receiveShadow = true;
  const autoDoorGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(2.0, 2.35),
    new THREE.MeshPhysicalMaterial({ color: 0xbae6fd, roughness: 0.12, metalness: 0.25, opacity: 0.85, transparent: true })
  );
  autoDoorGlass.rotation.y = -Math.PI / 2;
  autoDoorGlass.position.set(-0.32, 1.18, 0);
  researchBldg.add(bldgWall, autoDoorGlass);
  group.add(researchBldg);

  // Nostalgic Day-1 Bicycle Parking Rack (`駐輪場の脇`) at z = -22.5!
  const bikeRackGroup = new THREE.Group();
  bikeRackGroup.position.set(-3.4, 0, -22.5);
  const rackRoof = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 4.8), baseMats.aluminumBrushed);
  rackRoof.position.set(0, 2.35, 0);
  for (const pz of [-2.1, 2.1]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.35, 10), baseMats.chromeSteel);
    post.position.set(0.8, 1.18, pz);
    bikeRackGroup.add(post);
  }
  for (let b = -1.6; b <= 1.6; b += 0.8) {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.018, 8, 16, Math.PI), baseMats.chromeSteel);
    hoop.position.set(0.1, 0.02, b);
    bikeRackGroup.add(hoop);
  }
  bikeRackGroup.add(rackRoof);
  group.add(bikeRackGroup);

  // BREATHING VOLUMETRIC GOLDEN SUNRISE GOD-RAYS (`欅の葉の隙間から金色の矢のように降り注ぐ朝日`)!
  const godRayMat = new THREE.MeshBasicMaterial({
    color: 0xfef08a,
    transparent: true,
    opacity: 0.0,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const godRays = [];
  for (let i = 0; i < 6; i++) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.1 + (i % 3) * 0.45, 9.5, 16, 1, true), godRayMat);
    cone.position.set(2.4 - (i % 2) * 1.4, 3.6, -9.5 - i * 2.8);
    cone.rotation.z = 0.48;
    cone.rotation.x = 0.14;
    group.add(cone);
    godRays.push(cone);
  }

  // Fluttering Golden-Yellow Zelkova Leaves + HERO SINGLE LEAF grazing HMD-02's visor & rubber fist!
  const leafYellowMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xca8a04,
    emissiveIntensity: 0.35,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const driftingLeaves = [];
  for (let i = 0; i < 36; i++) {
    const lf = new THREE.Mesh(new THREE.CircleGeometry(0.036, 5), leafYellowMat);
    group.add(lf);
    driftingLeaves.push({
      mesh: lf,
      baseX: ((i * 2.13) % 6.4) - 3.2,
      baseZ: -2.0 - i * 0.72,
      speed: 0.35 + (i % 4) * 0.12,
      phase: i * 1.7,
    });
  }
  const heroLeaf = new THREE.Mesh(new THREE.CircleGeometry(0.038, 6), leafYellowMat);
  heroLeaf.visible = false;
  group.add(heroLeaf);

  function updateAtmosphere(t, sunStrength01 = 0) {
    godRayMat.opacity = sunStrength01 * 0.14;
    for (let i = 0; i < godRays.length; i++) {
      godRays[i].scale.x = 0.92 + Math.sin(t * 0.8 + i) * 0.10;
    }
    for (const d of driftingLeaves) {
      const cyc = (t * d.speed * 0.25 + d.phase * 0.1) % 1.0;
      d.mesh.position.set(
        d.baseX + Math.sin(t * 1.4 + d.phase) * 0.45,
        4.2 * (1 - cyc) + 0.05,
        d.baseZ + Math.cos(t * 1.1 + d.phase) * 0.25
      );
      d.mesh.rotation.set(t * 1.6 + d.phase, t * 2.2, Math.sin(t + d.phase));
    }
  }

  return { group, pebble, heroLeaf, updateAtmosphere };
}
