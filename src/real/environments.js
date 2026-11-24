import * as THREE from 'three';
import {
  createSTS3215Servo,
  createBambuLabA1,
  createPrototypeRightLeg,
  createEraserChopstickRig,
  createElectronicsBench,
  createRoboconMecanumMachine,
} from './hardware.js';
import { createRealisticHuman, createMacroHandRig } from './humans.js';

export function createAllEnvironments(scene, mats, screens) {
  // ===========================================================================
  // SET 1: 東都農工大学 ロボティクス研究会 プレハブ部室 (Scene 1)
  // ===========================================================================
  const clubroom = new THREE.Group();
  scene.add(clubroom);

  const clubFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(8.5, 8.5),
    new THREE.MeshStandardMaterial({ color: 0x626870, roughness: 0.76, metalness: 0.08 })
  );
  clubFloor.rotation.x = -Math.PI / 2;
  clubFloor.receiveShadow = true;
  clubroom.add(clubFloor);

  // Prefab walls & ceiling beams
  const prefabWallMat = new THREE.MeshStandardMaterial({ color: 0xd8dde3, roughness: 0.82 });
  const clubBackWall = new THREE.Mesh(new THREE.PlaneGeometry(8.5, 3.4), prefabWallMat);
  clubBackWall.position.set(0, 1.7, -3.2);
  clubBackWall.receiveShadow = true;
  clubroom.add(clubBackWall);

  const clubSideWall = new THREE.Mesh(new THREE.PlaneGeometry(8.5, 3.4), prefabWallMat);
  clubSideWall.rotation.y = Math.PI / 2;
  clubSideWall.position.set(-3.6, 1.7, 0);
  clubroom.add(clubSideWall);

  // Gleaming spiral aluminum swarf shavings scattered underfoot (InstancedMesh)
  const swarfGeo = new THREE.TorusGeometry(0.012, 0.0022, 6, 14, Math.PI * 1.65);
  const swarfInst = new THREE.InstancedMesh(swarfGeo, mats.chromeSteel, 90);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 90; i++) {
    const r = 0.4 + ((i * 73) % 100) * 0.024;
    const a = i * 2.399;
    dummy.position.set(Math.cos(a) * r, 0.004, 0.4 + Math.sin(a) * r * 0.8);
    dummy.rotation.set(Math.PI / 2 + (i % 5) * 0.1, a, i * 0.7);
    dummy.scale.setScalar(0.7 + (i % 4) * 0.25);
    dummy.updateMatrix();
    swarfInst.setMatrixAt(i, dummy.matrix);
  }
  clubroom.add(swarfInst);

  // Background Industrial Metal Lathe & Drill Press
  const latheGroup = new THREE.Group();
  latheGroup.position.set(-2.55, 0, -2.1);
  const latheStand = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.82, 0.55), mats.kurataJacket);
  latheStand.position.y = 0.41;
  latheStand.castShadow = true;
  latheGroup.add(latheStand);
  const latheBed = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.16, 0.34), mats.darkAnodized);
  latheBed.position.y = 0.90;
  latheGroup.add(latheBed);
  const latheChuck = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.12, 20), mats.chromeSteel);
  latheChuck.rotation.z = Math.PI / 2;
  latheChuck.position.set(-0.38, 1.06, 0);
  latheGroup.add(latheChuck);
  clubroom.add(latheGroup);

  // Organizational Chart Whiteboard ("完全分業体制")
  const wbFrame = new THREE.Mesh(new THREE.BoxGeometry(1.96, 1.24, 0.03), mats.brushedAlu);
  wbFrame.position.set(0.65, 1.62, -3.15);
  clubroom.add(wbFrame);
  const wbSurface = new THREE.Mesh(new THREE.PlaneGeometry(1.88, 1.16), screens.whiteboardMat);
  wbSurface.position.set(0.65, 1.62, -3.13);
  clubroom.add(wbSurface);

  // Central Steel Workbench + NHK Robocon Quad-Mecanum Machine + Bottled Green Tea
  const clubTable = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.045, 1.1), mats.deskWood);
  clubTable.position.set(-0.15, 0.74, -0.45);
  clubTable.castShadow = true;
  clubTable.receiveShadow = true;
  clubroom.add(clubTable);
  for (const [lx, lz] of [[-0.9, -0.92], [0.6, -0.92], [-0.9, 0.02], [0.6, 0.02]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.74, 0.045), mats.darkAnodized);
    leg.position.set(lx, 0.37, lz);
    clubroom.add(leg);
  }

  const roboconBot = createRoboconMecanumMachine(mats);
  roboconBot.root.position.set(-0.22, 0.765, -0.48);
  roboconBot.root.rotation.y = 0.35;
  clubroom.add(roboconBot.root);

  // Green Tea PET Bottle handed to Minato
  const teaBottle = new THREE.Group();
  const bottleBody = new THREE.Mesh(new THREE.CylinderGeometry(0.033, 0.034, 0.17, 18), mats.petBottle);
  bottleBody.position.y = 0.085;
  const bottleCap = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.02, 14), mats.servoHornWhite);
  bottleCap.position.y = 0.18;
  teaBottle.add(bottleBody, bottleCap);
  teaBottle.position.set(0.46, 0.765, -0.15);
  clubroom.add(teaBottle);

  const kurata = createRealisticHuman(mats, {
    role: 'kurata',
    topMat: mats.kurataJacket,
    pantsMat: mats.jeansDark,
    hairMat: mats.hairBrown,
    hairStyle: 'kurata',
  });
  kurata.root.position.set(0.72, 0, -1.15);
  kurata.root.rotation.y = -0.48;
  clubroom.add(kurata.root);

  const minatoClub = createRealisticHuman(mats, {
    role: 'minato',
    topMat: mats.hoodieNavy,
    pantsMat: mats.jeansDark,
    hairMat: mats.hairBlack,
    hasBackpack: true,
  });
  minatoClub.root.position.set(0.32, 0, 0.65);
  minatoClub.root.rotation.y = Math.PI - 0.15;
  clubroom.add(minatoClub.root);

  // ===========================================================================
  // SET 2: 夕暮れの駐輪場とソメイヨシノ (Scene 2)
  // ===========================================================================
  const courtyard = new THREE.Group();
  courtyard.visible = false;
  scene.add(courtyard);

  const groundAsphalt = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), mats.asphalt);
  groundAsphalt.rotation.x = -Math.PI / 2;
  groundAsphalt.receiveShadow = true;
  courtyard.add(groundAsphalt);

  // Sunset Sky Backdrop Dome
  const sunsetSkyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
      uTop: { value: new THREE.Color(0x2b3c6b) },
      uMid: { value: new THREE.Color(0xe87c52) },
      uBot: { value: new THREE.Color(0xfcd392) },
    },
    vertexShader: `
      varying vec3 vWorld;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform vec3 uTop;
      uniform vec3 uMid;
      uniform vec3 uBot;
      varying vec3 vWorld;
      void main() {
        float h = clamp(normalize(vWorld).y, 0.0, 1.0);
        vec3 col = h < 0.28 ? mix(uBot, uMid, h / 0.28) : mix(uMid, uTop, (h - 0.28) / 0.72);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const skyDome = new THREE.Mesh(new THREE.SphereGeometry(48, 32, 20), sunsetSkyMat);
  courtyard.add(skyDome);

  // Bicycle Shelter Roof & Parked Student Bicycles
  const shelterRoof = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.05, 2.1), mats.brushedAlu);
  shelterRoof.position.set(-1.6, 2.18, -2.2);
  shelterRoof.rotation.x = 0.1;
  courtyard.add(shelterRoof);

  for (let b = 0; b < 4; b++) {
    const bike = new THREE.Group();
    bike.position.set(-2.9 + b * 0.85, 0, -2.1);
    bike.rotation.y = 0.18;
    for (const wz of [-0.52, 0.52]) {
      const tire = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.022, 10, 28), mats.rubberBlack);
      tire.rotation.y = Math.PI / 2;
      tire.position.set(0, 0.35, wz);
      tire.castShadow = true;
      bike.add(tire);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.305, 0.008, 8, 24), mats.chromeSteel);
      rim.rotation.y = Math.PI / 2;
      rim.position.set(0, 0.35, wz);
      bike.add(rim);
    }
    const frameBar = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.95, 10), mats.chromeSteel);
    frameBar.rotation.x = Math.PI / 2 - 0.25;
    frameBar.position.set(0, 0.58, 0);
    bike.add(frameBar);
    courtyard.add(bike);
  }

  // Somei-Yoshino Cherry Blossom Trees (ソメイヨシノ)
  const barkMat = new THREE.MeshStandardMaterial({ color: 0x473832, roughness: 0.9 });
  const sakuraMat = new THREE.MeshPhysicalMaterial({
    color: 0xffdfe8,
    roughness: 0.72,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xffb6c9),
  });
  for (const [tx, tz, sc] of [[1.9, -2.6, 1.05], [-0.4, -4.2, 1.18], [3.6, -1.2, 0.92]]) {
    const tree = new THREE.Group();
    tree.position.set(tx, 0, tz);
    tree.scale.setScalar(sc);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 2.3, 14), barkMat);
    trunk.position.y = 1.15;
    trunk.castShadow = true;
    tree.add(trunk);

    const puffs = [
      [0, 2.8, 0, 1.05],
      [-0.75, 2.55, 0.45, 0.82],
      [0.82, 2.6, 0.35, 0.85],
      [0.15, 3.25, -0.4, 0.9],
      [-0.55, 2.9, -0.55, 0.78],
    ];
    for (const [px, py, pz, pr] of puffs) {
      const blossom = new THREE.Mesh(new THREE.SphereGeometry(pr, 16, 14), sakuraMat);
      blossom.scale.set(1.15, 0.78, 1.1);
      blossom.position.set(px, py, pz);
      blossom.castShadow = true;
      tree.add(blossom);
    }
    courtyard.add(tree);
  }

  const minatoCourtyard = createRealisticHuman(mats, {
    role: 'minato',
    topMat: mats.hoodieNavy,
    pantsMat: mats.jeansDark,
    hairMat: mats.hairBlack,
    hasBackpack: true,
  });
  minatoCourtyard.root.position.set(0.15, 0, -0.35);
  minatoCourtyard.root.rotation.y = 0.28;
  courtyard.add(minatoCourtyard.root);

  // Smartphone held upright in Minato's right hand in Courtyard (showing ¥185,412 bank screen!)
  const courtPhone = new THREE.Group();
  const cpBody = new THREE.Mesh(new THREE.BoxGeometry(0.074, 0.152, 0.008), mats.darkAnodized);
  const cpScr = new THREE.Mesh(new THREE.PlaneGeometry(0.068, 0.144), screens.phoneMat);
  cpScr.position.z = 0.0046;
  courtPhone.add(cpBody, cpScr);
  courtPhone.position.set(0.28, 1.18, 0.02);
  courtPhone.rotation.set(-0.28, -0.18, 0.03);
  courtyard.add(courtPhone);

  // ===========================================================================
  // SET 3: 秋葉原ガード下・電子部品専門店 (Scene 3)
  // ===========================================================================
  const akihabara = new THREE.Group();
  akihabara.visible = false;
  scene.add(akihabara);

  const shopFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(6.5, 8.0),
    new THREE.MeshPhysicalMaterial({ color: 0xc8ccd0, roughness: 0.34, clearcoat: 0.3 })
  );
  shopFloor.rotation.x = -Math.PI / 2;
  shopFloor.receiveShadow = true;
  akihabara.add(shopFloor);

  // Wall-to-wall tiny plastic component drawers (InstancedMesh of 240 drawers!)
  const drawerGeo = new THREE.BoxGeometry(0.15, 0.072, 0.22);
  const drawerMat = new THREE.MeshPhysicalMaterial({ color: 0x2f6b55, roughness: 0.36, clearcoat: 0.2 });
  const drawers = new THREE.InstancedMesh(drawerGeo, drawerMat, 240);
  let dIdx = 0;
  for (const wallSide of [-1, 1]) {
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 10; col++) {
        dummy.position.set(wallSide * 1.65, 0.38 + row * 0.082, -2.4 + col * 0.17);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        drawers.setMatrixAt(dIdx++, dummy.matrix);
      }
    }
  }
  akihabara.add(drawers);

  // Glass Actuator Comparison Counter (Cheap PWM vs High-End vs Hero Feetech STS3215!)
  const counterBase = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.92, 0.62), mats.bambuWhite);
  counterBase.position.set(0, 0.46, -0.85);
  counterBase.castShadow = true;
  counterBase.receiveShadow = true;
  akihabara.add(counterBase);

  const counterTopGlass = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.015, 0.63), mats.glassClear);
  counterTopGlass.position.set(0, 0.93, -0.85);
  akihabara.add(counterTopGlass);

  // 1) Left: Cheap Blue Plastic PWM Hobby Servo (¥800)
  const pwmServo = new THREE.Mesh(
    new THREE.BoxGeometry(0.032, 0.030, 0.016),
    new THREE.MeshPhysicalMaterial({ color: 0x2563eb, transparent: true, opacity: 0.85, roughness: 0.25 })
  );
  pwmServo.position.set(-0.32, 0.96, -0.78);
  akihabara.add(pwmServo);

  // 2) Center Hero Riser: Feetech STS3215 (12V, 30 kg·cm, 12-bit Magnetic Encoder, ¥2,950)
  const heroRiser = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.095, 0.025, 28), mats.darkAnodized);
  heroRiser.position.set(0, 0.95, -0.76);
  akihabara.add(heroRiser);

  const akibaSTS = createSTS3215Servo(mats, 1.45);
  akibaSTS.root.position.set(0, 0.99, -0.76);
  akibaSTS.root.rotation.y = 0.45;
  akihabara.add(akibaSTS.root);

  // 3) Right: Expensive Industrial Smart Actuator (¥35,000)
  const proServo = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.058, 0.038), mats.darkAnodized);
  proServo.position.set(0.32, 0.97, -0.78);
  akihabara.add(proServo);

  const minatoAkiba = createRealisticHuman(mats, {
    role: 'minato',
    topMat: mats.hoodieNavy,
    pantsMat: mats.jeansDark,
    hairMat: mats.hairBlack,
    hasBackpack: true,
  });
  minatoAkiba.root.position.set(0.05, 0, -0.18);
  minatoAkiba.root.rotation.y = Math.PI;
  akihabara.add(minatoAkiba.root);

  // ===========================================================================
  // SET 4: 『コーポ武蔵野』203号室 — 1K・6畳一間 (Scenes 4, 5, 6, 7, 8, 9, 10, 12)
  // ===========================================================================
  const apartment = new THREE.Group();
  apartment.visible = false;
  scene.add(apartment);

  // Aged Oak Entrance Floor + 6-Mat Tatami Living Area
  const roomWood = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 4.6), mats.woodFloor);
  roomWood.rotation.x = -Math.PI / 2;
  roomWood.receiveShadow = true;
  apartment.add(roomWood);

  const tatamiArea = new THREE.Mesh(new THREE.BoxGeometry(2.72, 0.018, 3.55), mats.tatami);
  tatamiArea.position.set(0.15, 0.009, 0.1);
  tatamiArea.receiveShadow = true;
  apartment.add(tatamiArea);

  // Walls & Ceiling
  const roomBackWall = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 2.5), mats.wallPaper);
  roomBackWall.position.set(0, 1.25, -1.95);
  roomBackWall.receiveShadow = true;
  apartment.add(roomBackWall);

  const roomLeftWall = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 2.5), mats.wallPaper);
  roomLeftWall.rotation.y = Math.PI / 2;
  roomLeftWall.position.set(-1.75, 1.25, 0.1);
  roomLeftWall.receiveShadow = true;
  apartment.add(roomLeftWall);

  const roomRightWall = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 2.5), mats.wallPaper);
  roomRightWall.rotation.y = -Math.PI / 2;
  roomRightWall.position.set(1.75, 1.25, 0.1);
  roomRightWall.receiveShadow = true;
  apartment.add(roomRightWall);

  // Wooden Baseboards (巾木)
  const baseboardMat = new THREE.MeshStandardMaterial({ color: 0x543824, roughness: 0.65 });
  const bbBack = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.06, 0.02), baseboardMat);
  bbBack.position.set(0, 0.03, -1.94);
  apartment.add(bbBack);

  // Window with Outside Sky Glow + Parted Lace Curtains
  const windowGlowMat = new THREE.MeshBasicMaterial({ color: 0x0b162c });
  const windowBackdrop = new THREE.Mesh(new THREE.PlaneGeometry(1.45, 1.15), windowGlowMat);
  windowBackdrop.position.set(-0.05, 1.42, -1.935);
  apartment.add(windowBackdrop);

  const sashFrame = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.04, 0.05), mats.brushedAlu);
  sashFrame.position.set(-0.05, 0.84, -1.92);
  apartment.add(sashFrame);

  const curtainMat = new THREE.MeshPhysicalMaterial({
    color: 0xf8fafc,
    transparent: true,
    opacity: 0.76,
    roughness: 0.85,
    sheen: 0.4,
  });
  for (const cx of [-0.62, 0.52]) {
    const curtain = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 1.28, 16, 1, true), curtainMat);
    curtain.scale.set(1.2, 1.0, 0.35);
    curtain.position.set(cx, 1.42, -1.88);
    apartment.add(curtain);
  }

  // Humming Small White Refrigerator (ブォォン……)
  const fridge = new THREE.Group();
  fridge.position.set(-1.32, 0, -1.38);
  const fridgeBody = new THREE.Mesh(new THREE.BoxGeometry(0.52, 1.12, 0.56), mats.bambuWhite);
  fridgeBody.position.y = 0.56;
  fridgeBody.castShadow = true;
  fridgeBody.receiveShadow = true;
  fridge.add(fridgeBody);
  const fridgeSeam = new THREE.Mesh(new THREE.BoxGeometry(0.525, 0.008, 0.565), mats.brushedAlu);
  fridgeSeam.position.y = 0.78;
  fridge.add(fridgeSeam);
  apartment.add(fridge);

  // Wall Exhaust Ventilation Fan (換気扇 — spins after white smoke burnout!)
  const exhaustFan = new THREE.Group();
  exhaustFan.position.set(-1.73, 1.92, -0.65);
  exhaustFan.rotation.y = Math.PI / 2;
  const fanHousing = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.04), mats.bambuWhite);
  exhaustFan.add(fanHousing);
  const fanBlades = new THREE.Group();
  for (let b = 0; b < 5; b++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.12, 0.008), mats.darkAnodized);
    blade.position.y = 0.06;
    const piv = new THREE.Group();
    piv.rotation.z = (b / 5) * Math.PI * 2;
    piv.add(blade);
    fanBlades.add(piv);
  }
  fanBlades.position.z = 0.022;
  exhaustFan.add(fanBlades);
  apartment.add(exhaustFan);

  // Walnut Folding Engineering Desk (Top Surface at y = 0.720m, centered at x=0, z=-0.55m)
  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 0, -0.55);

  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.028, 0.62), mats.deskWood);
  deskTop.position.y = 0.706;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  for (const [lx, lz] of [[-0.52, -0.26], [0.52, -0.26], [-0.52, 0.26], [0.52, 0.26]]) {
    const dLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.695, 14), mats.darkAnodized);
    dLeg.position.set(lx, 0.348, lz);
    dLeg.castShadow = true;
    deskGroup.add(dLeg);
  }

  // Articulated Architect Clamp Desk Lamp (Upper Left of Desk)
  const lampGroup = new THREE.Group();
  lampGroup.position.set(-0.49, 0.72, -0.24);
  const lampArm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.36, 12), mats.darkAnodized);
  lampArm1.position.set(0.04, 0.17, 0.02);
  lampArm1.rotation.z = -0.24;
  lampGroup.add(lampArm1);
  const lampArm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.32, 12), mats.darkAnodized);
  lampArm2.position.set(0.21, 0.38, 0.06);
  lampArm2.rotation.z = -1.12;
  lampGroup.add(lampArm2);
  const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.072, 0.11, 22, 1, true), mats.darkAnodized);
  lampShade.position.set(0.36, 0.41, 0.09);
  lampShade.rotation.z = 0.32;
  lampGroup.add(lampShade);
  const lampBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.028, 14, 12),
    new THREE.MeshBasicMaterial({ color: 0xfff3d1 })
  );
  lampBulb.position.set(0.35, 0.385, 0.09);
  lampGroup.add(lampBulb);
  deskGroup.add(lampGroup);

  // Mount Electronics Bench onto Desk Top (y = 0.720m)
  const bench = createElectronicsBench(mats, screens);
  bench.root.position.set(0, 0.72, 0);
  deskGroup.add(bench.root);

  // Mount 3-DOF Prototype Right Leg v0.1 clamped to Front-Right Edge of Desk!
  const protoLeg = createPrototypeRightLeg(mats);
  protoLeg.root.position.set(0.16, 0.72, 0.285);
  deskGroup.add(protoLeg.root);

  protoLeg.flawGroup.position.set(0.05, 0.72, 0.14);
  deskGroup.add(protoLeg.flawGroup);

  // Mount Eraser + Chopstick 4-DOF vs 6-DOF Demo Rig on Desk
  const eraserRig = createEraserChopstickRig(mats);
  eraserRig.root.position.set(0.02, 0.72, 0.12);
  deskGroup.add(eraserRig.root);

  apartment.add(deskGroup);

  // Bambu Lab A1 + Concrete Slab + Anti-Vibration Rubber on Sturdy Side Stand next to Desk
  const printerStand = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.38, 0.48), mats.darkAnodized);
  printerStand.position.set(0.92, 0.19, -0.58);
  printerStand.castShadow = true;
  printerStand.receiveShadow = true;
  apartment.add(printerStand);

  const bambuA1 = createBambuLabA1(mats);
  bambuA1.root.position.set(0.92, 0.38, -0.58);
  bambuA1.root.rotation.y = -0.28;
  apartment.add(bambuA1.root);

  // Student Desk Chair + Seated/Standing Minato + Macro Hand Rig
  const chairGroup = new THREE.Group();
  chairGroup.position.set(0, 0, 0.08);
  const chairSeat = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.045, 22), mats.backpackBlack);
  chairSeat.position.y = 0.44;
  chairSeat.castShadow = true;
  chairGroup.add(chairSeat);
  const chairPost = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.42, 14), mats.chromeSteel);
  chairPost.position.y = 0.21;
  chairGroup.add(chairPost);
  const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.34, 0.04), mats.backpackBlack);
  chairBack.position.set(0, 0.68, 0.19);
  chairBack.castShadow = true;
  chairGroup.add(chairBack);
  apartment.add(chairGroup);

  const minatoRoom = createRealisticHuman(mats, {
    role: 'minato',
    topMat: mats.hoodieNavy,
    pantsMat: mats.jeansDark,
    hairMat: mats.hairBlack,
    hasBackpack: false,
  });
  minatoRoom.root.position.set(0, 0, 0.06);
  minatoRoom.root.rotation.y = Math.PI;
  apartment.add(minatoRoom.root);

  // High-Detail Macro Right Hand Rig for Extreme Close-Ups on Desk
  const macroHand = createMacroHandRig(mats);
  macroHand.group.visible = false;
  apartment.add(macroHand.group);

  // ===========================================================================
  // SET 5: 東都農工大学 講義棟 1限『電気回路Ⅰ』階段教室 (Scene 11)
  // ===========================================================================
  const lecture = new THREE.Group();
  lecture.visible = false;
  scene.add(lecture);

  const lecFloor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), mats.woodFloor);
  lecFloor.rotation.x = -Math.PI / 2;
  lecFloor.receiveShadow = true;
  lecture.add(lecFloor);

  const lecWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 4.2), mats.wallPaper);
  lecWall.position.set(0, 2.1, -3.4);
  lecWall.receiveShadow = true;
  lecture.add(lecWall);

  // Large Green Lecture Chalkboard (∑ I_in = ∑ I_out + Floating GND Backfeed Diagram)
  const cbFrame = new THREE.Mesh(new THREE.BoxGeometry(3.92, 1.78, 0.04), baseboardMat);
  cbFrame.position.set(0, 1.92, -3.36);
  lecture.add(cbFrame);

  const cbMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 1.66), screens.chalkboardMat);
  cbMesh.position.set(0, 1.92, -3.33);
  lecture.add(cbMesh);

  // Professor's Podium & Professor Todo (藤堂教授)
  const podium = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.04, 0.58), mats.deskWood);
  podium.position.set(-1.25, 0.52, -2.35);
  podium.castShadow = true;
  lecture.add(podium);

  const profTodo = createRealisticHuman(mats, {
    role: 'professor',
    topMat: mats.profSuit,
    innerMat: mats.shirtWhite,
    pantsMat: mats.profSuit,
    hairMat: mats.hairGrey,
    hairStyle: 'professor',
    hasGlasses: true,
  });
  profTodo.root.position.set(-0.85, 0, -2.65);
  profTodo.root.rotation.y = 0.42;
  lecture.add(profTodo.root);

  // Tiered Lecture Desks + Seated Minato having his KCL Epiphany
  for (let row = 0; row < 3; row++) {
    const rz = -0.65 + row * 1.15;
    const ry = row * 0.14;
    const lDesk = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.72, 0.44), mats.deskWood);
    lDesk.position.set(0, ry + 0.36, rz);
    lDesk.castShadow = true;
    lDesk.receiveShadow = true;
    lecture.add(lDesk);

    if (row === 1) {
      // Open notebook on Minato's lecture desk
      const lecNb = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.20), screens.notebookMat);
      lecNb.rotation.x = -Math.PI / 2;
      lecNb.position.set(0.15, ry + 0.725, rz + 0.04);
      lecture.add(lecNb);
    }
  }

  const minatoLecture = createRealisticHuman(mats, {
    role: 'minato',
    topMat: mats.hoodieNavy,
    pantsMat: mats.jeansDark,
    hairMat: mats.hairBlack,
    hasBackpack: false,
  });
  minatoLecture.root.position.set(0.15, 0.14, 0.88);
  minatoLecture.root.rotation.y = Math.PI;
  lecture.add(minatoLecture.root);

  const sets = { clubroom, courtyard, akihabara, apartment, lecture };

  function setActiveSet(name) {
    for (const [k, g] of Object.entries(sets)) {
      g.visible = k === name;
    }
  }

  return {
    sets,
    setActiveSet,
    // Clubroom refs
    kurata,
    minatoClub,
    roboconBot,
    teaBottle,
    // Courtyard refs
    minatoCourtyard,
    courtPhone,
    // Akihabara refs
    minatoAkiba,
    akibaSTS,
    // Apartment refs
    windowGlowMat,
    exhaustFan,
    fanBlades,
    deskGroup,
    bench,
    protoLeg,
    eraserRig,
    bambuA1,
    chairGroup,
    minatoRoom,
    macroHand,
    // Lecture refs
    profTodo,
    minatoLecture,
  };
}
