import * as THREE from 'three';
import { makeRoundedBoxGeo } from '../hardware.js';

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };

/**
 * 1. Yellow Steel Retractable Tape Measure (`0cm -> 72cm` vertical extension!)
 * Features real crisp metric graduations with highlighted 38cm (HMD-01), 65cm (Sakakibara), and 72cm (HMD-02)!
 */
export function createTapeMeasure72cm(baseMats) {
  const group = new THREE.Group();

  // Compact rugged yellow-and-black tape measure housing resting on floor
  const caseMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.42, metalness: 0.12 });
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.86 });
  const body = new THREE.Mesh(makeRoundedBoxGeo(0.072, 0.068, 0.036, 0.012, 2), caseMat);
  body.position.set(0.036, 0.034, 0);
  body.castShadow = true;
  const grip = new THREE.Mesh(makeRoundedBoxGeo(0.056, 0.054, 0.040, 0.009, 2), gripMat);
  grip.position.set(0.036, 0.034, 0);
  const lockBtn = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.022, 0.016), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 }));
  lockBtn.position.set(0.002, 0.056, 0.014);
  group.add(body, grip, lockBtn);

  // Crisp Metric Tape Blade Texture (0..80cm)
  const tc = document.createElement('canvas');
  tc.width = 128; tc.height = 1024;
  const tx = tc.getContext('2d');
  tx.fillStyle = '#facc15'; tx.fillRect(0, 0, 128, 1024);
  tx.strokeStyle = '#0f172a'; tx.fillStyle = '#0f172a';
  // 80 cm -> 1024 px => 12.8 px per cm (bottom = 0cm, top = 80cm)
  for (let cm = 0; cm <= 80; cm++) {
    const y = 1024 - cm * 12.8;
    const isTen = cm % 10 === 0;
    const isKey = cm === 38 || cm === 65 || cm === 72;
    tx.lineWidth = isKey ? 4 : (isTen ? 3 : 1.5);
    tx.strokeStyle = isKey ? '#dc2626' : '#0f172a';
    tx.beginPath();
    tx.moveTo(0, y);
    tx.lineTo(isTen || isKey ? 52 : 28, y);
    tx.stroke();
    if (isTen || isKey) {
      tx.fillStyle = isKey ? '#b91c1c' : '#0f172a';
      tx.font = isKey ? '900 22px monospace' : '800 18px monospace';
      tx.fillText(`${cm}`, 58, y + 6);
    }
  }
  const tapeTex = new THREE.CanvasTexture(tc);
  tapeTex.colorSpace = THREE.SRGBColorSpace;
  tapeTex.anisotropy = 4;

  const bladeGeo = new THREE.BoxGeometry(0.024, 0.80, 0.0018);
  bladeGeo.translate(0, 0.40, 0); // Pivot at bottom (y=0) so scale.y extends upward cleanly!
  const bladeMat = new THREE.MeshStandardMaterial({ map: tapeTex, roughness: 0.34, metalness: 0.45 });
  const blade = new THREE.Mesh(bladeGeo, bladeMat);
  blade.position.set(0.002, 0.01, 0);
  group.add(blade);

  // Steel tip hook at the top of the extended tape
  const hook = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.004, 0.014), baseMats.chromeSteel);
  hook.position.set(0.002, 0.01, 0.006);
  group.add(hook);

  // Subtle holographic height guide bars & 72cm silhouette ghost beside the tape!
  const ghostGroup = new THREE.Group();
  const holoMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.34 });
  const gTorso = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.17, 0.08), holoMat); gTorso.position.y = 0.52;
  const gHead = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.07, 0.07), holoMat); gHead.position.y = 0.665;
  const gPelvis = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.07), holoMat); gPelvis.position.y = 0.39;
  for (const sx of [-1, 1]) {
    const gLeg = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.36, 0.048), holoMat);
    gLeg.position.set(sx * 0.056, 0.18, 0);
    const gArm = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.25, 0.032), holoMat);
    gArm.position.set(sx * 0.11, 0.45, 0);
    ghostGroup.add(gLeg, gArm);
  }
  ghostGroup.add(gTorso, gHead, gPelvis);
  ghostGroup.position.set(-0.22, 0, -0.04);
  ghostGroup.visible = false;
  group.add(ghostGroup);

  function setHeightMeters(hMeters) {
    const h = Math.max(0.02, Math.min(0.80, hMeters));
    blade.scale.y = h / 0.80;
    hook.position.y = 0.01 + h;
    ghostGroup.visible = h >= 0.42;
    if (ghostGroup.visible) {
      ghostGroup.scale.setScalar(clamp01((h - 0.36) / 0.36));
    }
  }
  setHeightMeters(0.04);

  return { group, setHeightMeters, ghostGroup };
}

/**
 * 2. Extreme-Macro Hero Prop: Bare 80mm Flat Black Steel & Copper Outrunner Motor ("鉄と銅の輪っか")
 * - Machined black aluminum outer rotor bell with cooling vent spokes
 * - Exposed 24-slot bright metallic copper stator coil ring ("赤銅色の太い銅線の束")
 * - Visible neodymium magnet arc segments inside the airgap
 * - THREE thick raw phase cables (RED, YELLOW, BLACK) with bare stripped copper wire tips!
 * - Optional shimmering 50mm circular custom FOC driver PCB hologram hovering alongside!
 */
export function createBareOutrunnerMotor80mm(baseMats) {
  const group = new THREE.Group();

  const blackBellMat = new THREE.MeshPhysicalMaterial({
    color: 0x161920,
    roughness: 0.24,
    metalness: 0.86,
    clearcoat: 0.35,
  });
  const copperCoilMat = new THREE.MeshPhysicalMaterial({
    color: 0xc2591a,
    roughness: 0.28,
    metalness: 0.92,
    clearcoat: 0.30,
  });
  const magnetMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.22,
    metalness: 0.94,
  });
  const statorSteelMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    roughness: 0.44,
    metalness: 0.80,
  });

  // Stationary inner stator base + exposed 18 bright copper coil windings!
  const statorBase = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.030, 0.014, 28), statorSteelMat);
  statorBase.position.y = 0.010;
  group.add(statorBase);

  const coilCount = 18;
  for (let i = 0; i < coilCount; i++) {
    const ang = (i / coilCount) * Math.PI * 2;
    const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.0046, 0.0046, 0.013, 12), copperCoilMat);
    coil.position.set(Math.cos(ang) * 0.0285, 0.0115, Math.sin(ang) * 0.0285);
    coil.rotation.z = Math.PI / 2;
    coil.rotation.y = -ang;
    group.add(coil);
  }

  // Rotating outer black steel rotor bell (diameter 80mm = radius 0.040m, flat 22mm height)
  const rotorGroup = new THREE.Group();
  group.add(rotorGroup);

  const outerRim = new THREE.Mesh(new THREE.CylinderGeometry(0.0405, 0.0405, 0.021, 36, 1, true), blackBellMat);
  outerRim.position.y = 0.0125;
  outerRim.castShadow = true;
  const innerRim = new THREE.Mesh(new THREE.CylinderGeometry(0.0365, 0.0365, 0.019, 36, 1, true), magnetMat);
  innerRim.position.y = 0.0125;
  const topRing = new THREE.Mesh(new THREE.TorusGeometry(0.0385, 0.0022, 10, 36), blackBellMat);
  topRing.rotation.x = Math.PI / 2;
  topRing.position.y = 0.0225;
  const hubCap = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.014, 0.023, 24), blackBellMat);
  hubCap.position.y = 0.0125;
  const centerShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.0052, 0.0052, 0.026, 18), baseMats.chromeSteel);
  centerShaft.position.y = 0.013;
  rotorGroup.add(outerRim, innerRim, topRing, hubCap, centerShaft);

  // 6 machined radial rotor spokes leaving wide open windows so the copper coils gleam clearly through!
  for (let s = 0; s < 6; s++) {
    const a = (s / 6) * Math.PI * 2;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.0032, 0.0055), blackBellMat);
    spoke.position.set(Math.cos(a) * 0.025, 0.022, Math.sin(a) * 0.025);
    spoke.rotation.y = -a;
    rotorGroup.add(spoke);
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.0018, 0.0018, 0.004, 8), baseMats.chromeSteel);
    screw.position.set(Math.cos(a) * 0.0095, 0.0235, Math.sin(a) * 0.0095);
    rotorGroup.add(screw);
  }

  // THREE thick raw phase leads jutting out like severed blood vessels: RED, YELLOW, BLACK!
  const leadColors = [
    { hex: 0xdc2626, zOff: -0.011, bend: -0.026 }, // Red phase U
    { hex: 0xeab308, zOff:  0.000, bend:  0.002 }, // Yellow phase V
    { hex: 0x18181b, zOff:  0.011, bend:  0.028 }, // Black phase W
  ];
  for (const lc of leadColors) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.036, 0.006, lc.zOff),
      new THREE.Vector3(0.068, 0.007, lc.zOff + lc.bend * 0.45),
      new THREE.Vector3(0.108, 0.005, lc.zOff + lc.bend),
      new THREE.Vector3(0.132, 0.004, lc.zOff + lc.bend * 1.15),
    ]);
    const wire = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 16, 0.0026, 10, false),
      new THREE.MeshStandardMaterial({ color: lc.hex, roughness: 0.55 })
    );
    wire.castShadow = true;
    const bareTip = new THREE.Mesh(new THREE.CylinderGeometry(0.0020, 0.0018, 0.012, 8), copperCoilMat);
    bareTip.rotation.z = Math.PI / 2;
    bareTip.position.set(0.138, 0.004, lc.zOff + lc.bend * 1.18);
    group.add(wire, bareTip);
  }

  // Shimmering Holographic 50mm Circular Custom FOC Driver PCB Concept Ring!
  const focHolo = new THREE.Group();
  const pcbRing = new THREE.Mesh(
    new THREE.RingGeometry(0.010, 0.026, 32),
    new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.45 })
  );
  pcbRing.rotation.x = -Math.PI / 2;
  const pcbWire = new THREE.Mesh(
    new THREE.TorusGeometry(0.026, 0.0012, 8, 32),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
  );
  pcbWire.rotation.x = Math.PI / 2;
  focHolo.add(pcbRing, pcbWire);
  focHolo.position.set(0, 0.055, 0);
  focHolo.visible = false;
  group.add(focHolo);

  // Small White Overseas Shipping Box & Foam Pad
  const parcelBox = new THREE.Group();
  const whiteCardMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.82 });
  const boxBottom = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.045, 0.16), whiteCardMat);
  boxBottom.position.y = 0.0225;
  boxBottom.castShadow = true;
  const boxLid = new THREE.Mesh(new THREE.BoxGeometry(0.164, 0.018, 0.164), whiteCardMat);
  boxLid.position.set(-0.16, 0.009, -0.02);
  boxLid.rotation.y = 0.25;
  // Overseas shipping barcode sticker
  const stC = document.createElement('canvas'); stC.width = 256; stC.height = 128;
  const sx = stC.getContext('2d');
  sx.fillStyle = '#ffffff'; sx.fillRect(0, 0, 256, 128);
  sx.fillStyle = '#0f172a'; sx.font = '800 18px monospace'; sx.fillText('AIR MAIL · SHENZHEN → TOKYO', 10, 26);
  sx.font = '700 14px monospace'; sx.fillText('BLDC 5010-80mm RAW OUTRUNNER x1', 10, 50);
  for (let b = 0; b < 32; b++) { sx.fillRect(14 + b * 7, 68, (b % 3 === 0 ? 4 : 2), 42); }
  const stTex = new THREE.CanvasTexture(stC); stTex.colorSpace = THREE.SRGBColorSpace;
  const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.06), new THREE.MeshBasicMaterial({ map: stTex }));
  sticker.rotation.x = -Math.PI / 2;
  sticker.position.set(-0.16, 0.019, -0.02);
  sticker.rotation.z = -0.25;
  parcelBox.add(boxBottom, boxLid, sticker);

  return { group, rotorGroup, focHolo, parcelBox };
}

/**
 * 3. Full-Scale 720mm `HMD-02` Newspaper Blueprint Wall ("新聞紙を縦に二枚貼り合わせた壁の原寸大シルエット")
 * Draws dynamically stroke-by-stroke with a bold black permanent marker from floor (y=0) up to 720mm!
 */
export function createNewspaperSilhouetteWall(baseMats) {
  const group = new THREE.Group();

  const nc = document.createElement('canvas');
  nc.width = 768; nc.height = 1280;
  const nx = nc.getContext('2d');
  const nTex = new THREE.CanvasTexture(nc);
  nTex.colorSpace = THREE.SRGBColorSpace;
  nTex.anisotropy = 4;

  let lastProg = -1;
  function updateSilhouette(progress) {
    const p = clamp01(progress);
    if (Math.abs(p - lastProg) < 0.012) return;
    lastProg = p;

    // Authentic pale newsprint paper background (two vertical sheets taped together!)
    nx.fillStyle = '#d8d3c4'; nx.fillRect(0, 0, 768, 1280);
    // Faint newspaper text columns in background
    nx.fillStyle = 'rgba(71,85,105,0.16)';
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 48; row++) {
        nx.fillRect(36 + col * 144, 34 + row * 25, 118 - ((row * 17 + col * 23) % 24), 6);
      }
    }
    // Horizontal splice seam where two vertical newspaper sheets overlap at y = 640
    nx.strokeStyle = 'rgba(100,116,139,0.45)'; nx.lineWidth = 4;
    nx.beginPath(); nx.moveTo(0, 640); nx.lineTo(768, 640); nx.stroke();
    // Yellow masking tape strips at corners & center seam!
    nx.fillStyle = 'rgba(250,204,21,0.72)';
    nx.fillRect(10, 12, 85, 24); nx.fillRect(673, 12, 85, 24);
    nx.fillRect(10, 628, 72, 24); nx.fillRect(686, 628, 72, 24);
    nx.fillRect(10, 1244, 85, 24); nx.fillRect(673, 1244, 85, 24);

    // Dimension scale bar on the left (`0 mm` at y=1180 -> `720 mm` at y=180 => 1000 px = 720mm!)
    const y0 = 1180;
    const yTop = 180;
    const mmToY = (mm) => y0 - (mm / 720) * (y0 - yTop);

    nx.strokeStyle = '#334155'; nx.lineWidth = 4;
    nx.beginPath(); nx.moveTo(76, y0); nx.lineTo(76, yTop); nx.stroke();
    nx.fillStyle = '#0f172a'; nx.font = '900 28px monospace';
    nx.fillText('720mm', 14, yTop - 16);
    nx.fillStyle = '#94a3b8'; nx.font = '700 20px monospace';
    nx.fillText('380mm (HMD-01)', 90, mmToY(380) - 6);
    nx.setLineDash([8, 8]);
    nx.beginPath(); nx.moveTo(76, mmToY(380)); nx.lineTo(700, mmToY(380)); nx.stroke();
    nx.setLineDash([]);

    // Bold Black Permanent Marker Silhouette of `HMD-02` drawn progressively!
    const cx = 410;
    nx.strokeStyle = '#0f172a';
    nx.lineWidth = 10;
    nx.lineCap = 'round';
    nx.lineJoin = 'round';

    const drawCircle = (x, y, r, fill = false) => {
      nx.beginPath(); nx.arc(x, y, r, 0, Math.PI * 2);
      if (fill) { nx.fillStyle = 'rgba(15,23,42,0.12)'; nx.fill(); }
      nx.stroke();
    };

    // Stage 1 (p > 0.05): Feet & Long Shins ("長い脛")
    if (p > 0.05) {
      const k = smooth((p - 0.05) / 0.25);
      for (const s of [-1, 1]) {
        nx.strokeRect(cx + s * 96 - 46, y0 - 24, 92, 24); // Feet
        nx.beginPath();
        nx.moveTo(cx + s * 96, y0 - 24);
        nx.lineTo(cx + s * 96, y0 - 24 - k * 290); // Long shins
        nx.stroke();
        if (k > 0.85) drawCircle(cx + s * 96, mmToY(235), 42, true); // Circular 80mm QDD Knee Joints!
      }
    }
    // Stage 2 (p > 0.30): Muscular Thighs & Trim Pelvis ("力強い太もも・引き締まった腰")
    if (p > 0.30) {
      const k = smooth((p - 0.30) / 0.25);
      for (const s of [-1, 1]) {
        nx.beginPath();
        nx.moveTo(cx + s * 96, mmToY(235) - 42);
        nx.lineTo(cx + s * 92, mmToY(235) - 42 - k * 225);
        nx.stroke();
        if (k > 0.85) drawCircle(cx + s * 92, mmToY(435), 46, true); // Hip QDD Discs!
      }
      if (k > 0.7) nx.strokeRect(cx - 110, mmToY(465), 220, 62);
    }
    // Stage 3 (p > 0.55): Broad Shoulders, Torso & Head ("広い肩幅")
    if (p > 0.55) {
      const k = smooth((p - 0.55) / 0.30);
      nx.strokeRect(cx - 125 * k, mmToY(635), 250 * k, 225); // Chest / Spine Frame
      if (k > 0.6) {
        for (const s of [-1, 1]) {
          drawCircle(cx + s * 158, mmToY(610), 34, true); // Shoulder QDD Discs
          nx.beginPath();
          nx.moveTo(cx + s * 158, mmToY(610) + 34);
          nx.lineTo(cx + s * 168, mmToY(380));
          nx.stroke();
        }
        // Sensor head top at exact 720mm!
        nx.strokeRect(cx - 56, mmToY(720), 112, 82);
      }
    }
    // Stage 4 (p > 0.85): Bold "HMD-02 (720mm)" Callout Header!
    if (p > 0.85) {
      nx.fillStyle = '#0f172a'; nx.font = '900 54px serif';
      nx.fillText('HMD-02', 278, 120);
      nx.fillStyle = '#b91c1c'; nx.font = '800 22px monospace';
      nx.fillText('FULL SCALE 1:1  ·  H=720mm  ·  EST 7.5kg', 168, 154);
    }

    nTex.needsUpdate = true;
  }
  updateSilhouette(0);

  // Full 1:1 physical scale: width 0.56m × height 0.92m so 720mm on canvas equals exact 0.72m above floor!
  const sheet = new THREE.Mesh(
    new THREE.PlaneGeometry(0.56, 0.92),
    new THREE.MeshStandardMaterial({ map: nTex, roughness: 0.92 })
  );
  sheet.position.set(0, 0.46, 0);
  group.add(sheet);

  // Bold black permanent marker ("太い黒の油性マジック")
  const marker = new THREE.Group();
  const mBody = new THREE.Mesh(new THREE.CylinderGeometry(0.0085, 0.0085, 0.13, 12), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.35 }));
  mBody.rotation.x = Math.PI / 2;
  const mTip = new THREE.Mesh(new THREE.ConeGeometry(0.006, 0.018, 10), new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.5 }));
  mTip.rotation.x = -Math.PI / 2;
  mTip.position.z = -0.074;
  marker.add(mBody, mTip);
  marker.visible = false;
  group.add(marker);

  return { group, updateSilhouette, marker };
}

/**
 * 4. Campus Festival Yakisoba Stall Props (Griddle, Overflowing Yakisoba Pack, Steel Tongs, 500-yen Coin)
 */
export function createYakisobaStallProps(baseMats, pbr) {
  const stallProps = new THREE.Group();

  // Sizzling Dark Cast-Iron Griddle (鉄板)
  const griddle = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.032, 0.52),
    new THREE.MeshStandardMaterial({ color: 0x1e2024, roughness: 0.42, metalness: 0.78 })
  );
  griddle.position.y = 0.016;
  // Mound of savory brown yakisoba noodles & cabbage on griddle!
  const noodles = new THREE.Mesh(
    makeRoundedBoxGeo(0.58, 0.055, 0.34, 0.022, 2),
    new THREE.MeshStandardMaterial({ color: 0x6b3e1e, roughness: 0.78 })
  );
  noodles.position.set(-0.08, 0.048, 0);
  // Subtle green cabbage & pink beni-shoga accents
  for (let i = 0; i < 12; i++) {
    const bit = new THREE.Mesh(
      new THREE.BoxGeometry(0.024, 0.012, 0.020),
      new THREE.MeshStandardMaterial({ color: i % 3 === 0 ? 0xdc2626 : 0x65a30d, roughness: 0.7 })
    );
    bit.position.set(-0.28 + (i % 6) * 0.085, 0.074, (i < 6 ? -0.07 : 0.07));
    bit.rotation.y = i * 0.6;
    stallProps.add(bit);
  }
  stallProps.add(griddle, noodles);

  // Overflowing Clear-Lid Plastic Yakisoba Pack tied with a rubber band!
  const yakisobaPack = new THREE.Group();
  const packBase = new THREE.Mesh(makeRoundedBoxGeo(0.16, 0.042, 0.11, 0.008, 2), new THREE.MeshPhysicalMaterial({ color: 0xf8fafc, roughness: 0.18, transparent: true, opacity: 0.58 }));
  const packFill = new THREE.Mesh(makeRoundedBoxGeo(0.148, 0.044, 0.098, 0.012, 2), new THREE.MeshStandardMaterial({ color: 0x6b3e1e, roughness: 0.72 }));
  packFill.position.y = 0.006;
  const beniTop = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.010, 0.022), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.65 }));
  beniTop.position.set(0.032, 0.028, 0.012);
  const rubberBand = new THREE.Mesh(new THREE.TorusGeometry(0.062, 0.0018, 6, 20), new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8 }));
  rubberBand.rotation.y = Math.PI / 2;
  rubberBand.scale.set(0.85, 0.42, 1);
  yakisobaPack.add(packBase, packFill, beniTop, rubberBand);

  // Rising Savory Smoke / Steam Wisps above the griddle
  const smokeMat = new THREE.MeshBasicMaterial({ color: 0xfef3c7, transparent: true, opacity: 0.24, depthWrite: false });
  const smokeWisps = [];
  for (let i = 0; i < 8; i++) {
    const w = new THREE.Mesh(new THREE.SphereGeometry(0.055 + (i % 3) * 0.022, 10, 8), smokeMat);
    stallProps.add(w);
    smokeWisps.push(w);
  }

  function updateSmoke(t) {
    smokeWisps.forEach((w, i) => {
      const ph = (t * 0.55 + i * 0.14) % 1.0;
      w.position.set(-0.22 + (i % 4) * 0.14 + Math.sin(t * 2 + i) * 0.04, 0.10 + ph * 0.72, Math.cos(t * 1.5 + i) * 0.04);
      const sc = 0.6 + ph * 1.4;
      w.scale.set(sc, sc * 1.25, sc);
    });
  }

  return { stallProps, yakisobaPack, updateSmoke };
}

/**
 * 5. Winter Condensation Window with Sliding Glistening Water Droplet (Atlas 43 `condensationGlass`!)
 */
export function createCondensationDropletWindow(baseMats, pbr) {
  const group = new THREE.Group();
  const pane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.98, 1.02),
    pbr.get('condensationGlass', { repeatX: 1, repeatY: 1, tint: 0x9fb8d4, roughness: 0.22 })
  );
  const fm = pbr.get('brushedAluHairline');
  const fT = new THREE.Mesh(new THREE.BoxGeometry(1.04, 0.04, 0.05), fm); fT.position.y = 0.51;
  const fB = fT.clone(); fB.position.y = -0.51;
  const fL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.04, 0.05), fm); fL.position.x = -0.50;
  const fR = fL.clone(); fR.position.x = 0.50;

  // Animated glistening 3D water droplet sliding down the lower edge of the glass!
  const dropMat = new THREE.MeshPhysicalMaterial({
    color: 0xe0f2fe,
    roughness: 0.04,
    metalness: 0.15,
    clearcoat: 1.0,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.35,
  });
  const droplet = new THREE.Mesh(new THREE.SphereGeometry(0.011, 14, 12), dropMat);
  droplet.scale.set(0.85, 1.35, 0.55);
  droplet.position.set(-0.14, 0.12, 0.012);

  const streak = new THREE.Mesh(
    new THREE.PlaneGeometry(0.0055, 0.36),
    new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.55 })
  );
  streak.position.set(-0.14, 0.12, 0.006);

  group.add(pane, fT, fB, fL, fR, droplet, streak);

  function setDropletProgress(u) {
    const k = clamp01(u);
    const yStart = 0.24;
    const yEnd = -0.44;
    const yCur = yStart + (yEnd - yStart) * k;
    droplet.position.set(-0.14 + Math.sin(k * 9) * 0.005, yCur, 0.012);
    const len = Math.max(0.01, yStart - yCur);
    streak.scale.y = len / 0.36;
    streak.position.set(-0.14, yStart - len * 0.5, 0.006);
  }

  return { group, setDropletProgress };
}
