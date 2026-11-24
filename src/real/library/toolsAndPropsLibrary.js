import * as THREE from 'three';
import { makeRoundedBoxGeo } from '../hardware.js';

/**
 * 65 Pre-Built Workshop Tools, Instruments, Living Props, Food & Competition Gear (`tool_*`, `prop_*`)
 * Powered by the 135-Tile Photographic PBR Atlas Bank!
 */
export function registerToolsAndPropsLibrary(registry, { baseMats, ngMats, pbr }) {
  const steelMat = () => pbr.get('brushedStainlessDoor', { roughness: 0.24, metalness: 0.90 });
  const darkMetal = () => pbr.get('darkSlateMetal', { roughness: 0.44, metalness: 0.72 });
  const rubberGrip = () => pbr.get('rubberDimpleBlack', { roughness: 0.76, metalness: 0.05 });
  const towelMat = () => pbr.get('bathTowelWoven', { repeatX: 2, repeatY: 2, roughness: 0.94 });
  const cardboardMat = () => pbr.get('wovenCanvasBurlap', { tint: 0xc2965e, roughness: 0.90 });
  const blueViseMat = () => new THREE.MeshPhysicalMaterial({ color: 0x1d4ed8, roughness: 0.42, metalness: 0.62, clearcoat: 0.25 });
  const orangeHandleMat = () => new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.62 });

  const reg = (id, category, label, factory) => registry.register(id, { category, label, factory });

  // === METALWORKING & ASSEMBLY TOOLS (18) ===
  reg('tool_bench_vise_blue', 'tools', 'Cast-Iron Desktop Bench Vise', () => {
    const g = new THREE.Group();
    const base = new THREE.Mesh(makeRoundedBoxGeo(0.115, 0.056, 0.090, 0.006, 2), blueViseMat());
    base.position.y = 0.028; base.castShadow = true;
    const jaw1 = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.030, 0.022), darkMetal());
    jaw1.position.set(0, 0.068, -0.015);
    const jaw2 = jaw1.clone(); jaw2.position.z = 0.015;
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.135, 12), steelMat());
    rod.rotation.z = Math.PI / 2; rod.position.set(0, 0.032, 0.058);
    g.add(base, jaw1, jaw2, rod);
    return g;
  });

  reg('tool_bath_towel_folded', 'tools', '4-Folded Sound-Dampening Bath Towel', () => {
    const m = new THREE.Mesh(makeRoundedBoxGeo(0.32, 0.024, 0.24, 0.009, 2), towelMat());
    m.position.y = 0.012; m.receiveShadow = true;
    return m;
  });

  reg('tool_steel_file_bastard', 'tools', 'Hand Steel Bastard File', () => {
    const g = new THREE.Group();
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.005, 0.017), pbr.get('perforatedMetalSheet', { repeatX: 3, repeatY: 1, roughness: 0.52, metalness: 0.80 }));
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.013, 0.092, 14), orangeHandleMat());
    handle.rotation.z = Math.PI / 2; handle.position.x = 0.132;
    g.add(blade, handle);
    return g;
  });

  reg('tool_hacksaw_frame', 'tools', 'Metal Hacksaw', () => {
    const g = new THREE.Group();
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.012, 0.008), blueViseMat());
    topBar.position.y = 0.06;
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.008, 0.002), steelMat());
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.085, 0.018), rubberGrip());
    grip.position.set(0.13, 0.025, 0);
    g.add(topBar, blade, grip);
    return g;
  });

  reg('tool_vernier_caliper', 'tools', 'Digital Stainless Vernier Caliper', () => {
    const g = new THREE.Group();
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.004, 0.016), steelMat());
    const jawL = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.004, 0.044), steelMat());
    jawL.position.set(-0.085, 0, 0.016);
    const slider = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.008, 0.024), darkMetal());
    slider.position.set(-0.02, 0.003, 0);
    g.add(rail, jawL, slider);
    return g;
  });

  reg('tool_hex_wrench_25mm', 'tools', '2.5mm L-Shaped Hex Wrench', () => {
    const g = new THREE.Group();
    const l1 = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.0022, 0.075, 6), steelMat());
    l1.rotation.z = Math.PI / 2;
    const l2 = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.0022, 0.024, 6), steelMat());
    l2.rotation.x = Math.PI / 2; l2.position.set(0.036, 0, 0.011);
    g.add(l1, l2);
    return g;
  });

  reg('tool_hex_wrench_set', 'tools', 'Metric Hex Wrench Holder Set', () => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.012, 0.025), orangeHandleMat()));
    for (let i = 0; i < 6; i++) {
      const k = new THREE.Mesh(new THREE.CylinderGeometry(0.0018, 0.0018, 0.06 + i * 0.012, 6), steelMat());
      k.rotation.x = Math.PI / 2; k.position.set(-0.022 + i * 0.009, 0.008, 0.03);
      g.add(k);
    }
    return g;
  });

  reg('tool_screwdriver_phillips', 'tools', 'Precision Phillips Screwdriver', () => {
    const g = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.095, 10), steelMat());
    shaft.rotation.z = Math.PI / 2;
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.011, 0.078, 12), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.5 }));
    grip.rotation.z = Math.PI / 2; grip.position.x = 0.082;
    g.add(shaft, grip);
    return g;
  });

  reg('tool_flush_cutters', 'tools', 'Micro Flush Wire Cutters', () => {
    const g = new THREE.Group();
    const h1 = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.008, 0.010), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
    h1.position.set(0.03, 0, -0.012); h1.rotation.y = 0.16;
    const h2 = h1.clone(); h2.position.z = 0.012; h2.rotation.y = -0.16;
    const jaw = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.032, 4), darkMetal());
    jaw.rotation.z = Math.PI / 2; jaw.position.x = -0.022;
    g.add(h1, h2, jaw);
    return g;
  });

  reg('tool_wire_stripper', 'tools', 'Automatic Wire Stripper', () => new THREE.Mesh(makeRoundedBoxGeo(0.14, 0.015, 0.045, 0.004, 2), orangeHandleMat()));
  reg('tool_tweezers_precision', 'tools', 'ESD Precision Steel Tweezers', () => new THREE.Mesh(new THREE.ConeGeometry(0.006, 0.125, 4), steelMat()));
  reg('tool_ball_peen_hammer', 'tools', 'Workshop Peen Hammer', () => {
    const g = new THREE.Group();
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.013, 0.24, 12), pbr.get('walnutWoodFloor'));
    handle.rotation.z = Math.PI / 2;
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.072, 14), darkMetal());
    head.rotation.x = Math.PI / 2; head.position.x = -0.105;
    g.add(handle, head);
    return g;
  });
  reg('tool_aluminum_shears', 'tools', 'Aviation Tin Snips', () => new THREE.Mesh(makeRoundedBoxGeo(0.18, 0.016, 0.048, 0.004, 2), new THREE.MeshStandardMaterial({ color: 0x16a34a })));
  reg('tool_drill_driver', 'tools', 'Cordless Electric Drill', () => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.028, 0.14, 14), new THREE.MeshStandardMaterial({ color: 0x0d9488, roughness: 0.45 }));
    body.rotation.z = Math.PI / 2; body.position.y = 0.095;
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.095, 0.028), rubberGrip());
    grip.position.set(0.02, 0.045, 0);
    g.add(body, grip);
    return g;
  });
  reg('tool_sandpaper_block', 'tools', '400-Grit Sanding Block', () => new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.024, 0.048), pbr.get('packedEarthGravel', { tint: 0x52525b })));
  reg('tool_grease_tube', 'tools', 'Molybdenum Gear Grease Tube', () => new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.006, 0.088, 12), pbr.get('panelWhiteOrange')));
  reg('tool_deburring_tool', 'tools', 'Swivel Metal Deburring Tool', () => new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.007, 0.12, 10), blueViseMat()));
  reg('tool_c_clamp', 'tools', 'Cast Iron C-Clamp', () => new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.008, 8, 18, Math.PI * 1.4), darkMetal()));

  // === ELECTRONICS & LAB INSTRUMENTS (12) ===
  reg('tool_soldering_iron', 'tools', 'Hakko-Style Soldering Iron', () => {
    const g = new THREE.Group();
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.010, 0.11, 14), blueViseMat());
    grip.rotation.z = Math.PI / 2;
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.004, 0.075, 12), steelMat());
    barrel.rotation.z = Math.PI / 2; barrel.position.x = -0.088;
    g.add(grip, barrel);
    return g;
  });
  reg('tool_solder_spool', 'tools', 'Lead-Free Solder Wire Spool', () => new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.048, 20), steelMat()));
  reg('tool_flux_syringe', 'tools', 'Rosin Flux Dispenser Syringe', () => new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.095, 12), new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.35 })));
  reg('tool_multimeter_digital', 'tools', 'Yellow Digital Multimeter', () => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(makeRoundedBoxGeo(0.082, 0.028, 0.148, 0.006, 2), new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 }));
    const lcd = new THREE.Mesh(new THREE.PlaneGeometry(0.062, 0.038), new THREE.MeshBasicMaterial({ color: 0x94a3b8 }));
    lcd.rotation.x = -Math.PI / 2; lcd.position.set(0, 0.0145, -0.038);
    const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.020, 0.006, 18), darkMetal());
    dial.position.set(0, 0.016, 0.018);
    g.add(body, lcd, dial);
    return g;
  });
  reg('tool_logic_analyzer_24mhz', 'tools', '24MHz 8ch USB Logic Analyzer', () => new THREE.Mesh(makeRoundedBoxGeo(0.056, 0.014, 0.028, 0.003, 2), darkMetal()));
  reg('tool_ir_thermometer', 'tools', 'Infrared Laser Thermometer', () => new THREE.Mesh(makeRoundedBoxGeo(0.042, 0.125, 0.082, 0.006, 2), orangeHandleMat()));
  reg('tool_bench_psu_30v', 'tools', '30V 10A Variable Bench PSU', () => new THREE.Mesh(makeRoundedBoxGeo(0.14, 0.16, 0.21, 0.008, 2), pbr.get('panelWhiteBlueLab')));
  reg('tool_oscilloscope_bench', 'tools', '4-Channel Digital Oscilloscope', () => new THREE.Mesh(makeRoundedBoxGeo(0.28, 0.15, 0.12, 0.008, 2), pbr.get('panelCleanWhiteTech')));
  reg('tool_kitchen_scale_digital', 'tools', 'Precision 2kg Digital Scale', () => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.022, 0.20), baseMats.bambuWhite));
    const pan = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.005, 0.14), steelMat());
    pan.position.set(0, 0.013, -0.02);
    g.add(pan);
    return g;
  });
  reg('tool_usb_c_cable', 'tools', 'Coiled USB-C Data Cable', () => new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.0035, 8, 24), rubberGrip()));
  reg('tool_hot_air_gun', 'tools', 'SMD Hot Air Rework Wand', () => new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 0.18, 14), darkMetal()));
  reg('tool_uv_curing_pen', 'tools', 'UV Solder Mask Curing Pen', () => new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.11, 12), new THREE.MeshStandardMaterial({ color: 0x7c3aed, metalness: 0.7, roughness: 0.3 })));

  // === LIVING, STUDY, CARE PACKAGE & FOOD PROPS (22) ===
  reg('prop_mikan_box_graveyard', 'props', 'Mikan Cardboard Parts Graveyard Box', () => {
    const g = new THREE.Group();
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.012, 0.24), cardboardMat());
    bottom.position.y = 0.006;
    const wF = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 0.008), cardboardMat()); wF.position.set(0, 0.07, 0.12);
    const wB = wF.clone(); wB.position.z = -0.12;
    const wL = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.14, 0.24), cardboardMat()); wL.position.set(-0.16, 0.07, 0);
    const wR = wL.clone(); wR.position.x = 0.16;
    g.add(bottom, wF, wB, wL, wR);
    return g;
  });

  reg('prop_care_package_box', 'props', 'Mom Care Package Cardboard Box', () => {
    const g = new THREE.Group();
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.014, 0.32), cardboardMat()); b.position.y = 0.007;
    const wF = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.010), cardboardMat()); wF.position.set(0, 0.08, 0.16);
    const wB = wF.clone(); wB.position.z = -0.16;
    const wL = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.16, 0.32), cardboardMat()); wL.position.set(-0.21, 0.08, 0);
    const wR = wL.clone(); wR.position.x = 0.21;
    g.add(b, wF, wB, wL, wR);
    return g;
  });

  reg('prop_rice_bag_5kg', 'props', '5kg Fresh Harvest White Rice Bag', () => new THREE.Mesh(makeRoundedBoxGeo(0.17, 0.095, 0.23, 0.018, 2), pbr.get('washiPaperSoft', { roughness: 0.85 })));
  reg('prop_red_apple_newspaper', 'props', 'Newspaper-Wrapped Shiny Red Apple', () => {
    const g = new THREE.Group();
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.030, 0.044, 14), pbr.get('washiPaperSoft', { tint: 0xd1d5db }));
    collar.position.y = 0.022;
    const apple = new THREE.Mesh(new THREE.SphereGeometry(0.033, 16, 14), new THREE.MeshPhysicalMaterial({ color: 0xdc2626, roughness: 0.20, clearcoat: 0.78 }));
    apple.position.y = 0.046;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.0018, 0.0022, 0.012, 6), pbr.get('treeBarkRealistic'));
    stem.position.y = 0.079;
    g.add(collar, apple, stem);
    return g;
  });

  reg('prop_steaming_rice_bowl', 'props', 'Ceramic Bowl of Hot White Rice', () => {
    const g = new THREE.Group();
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.068, 20, 14, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55), new THREE.MeshPhysicalMaterial({ color: 0x1e3a5f, roughness: 0.26, clearcoat: 0.6 }));
    bowl.position.y = 0.068;
    const mound = new THREE.Mesh(new THREE.SphereGeometry(0.060, 18, 12), pbr.get('steamingWhiteRiceMacro', { repeatX: 2, repeatY: 2 }));
    mound.scale.set(1, 0.46, 1); mound.position.y = 0.062;
    g.add(bowl, mound);
    return g;
  });

  reg('prop_chopsticks_pair', 'props', 'Wooden Chopsticks Pair', () => {
    const g = new THREE.Group();
    for (const z of [-0.005, 0.005]) {
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.0018, 0.0036, 0.21, 8), pbr.get('parquetWoodFloor'));
      s.rotation.z = Math.PI / 2; s.position.z = z;
      g.add(s);
    }
    return g;
  });

  reg('prop_nameko_miso_cup', 'props', 'Instant Nameko Miso Soup Packet', () => new THREE.Mesh(makeRoundedBoxGeo(0.095, 0.022, 0.070, 0.005, 2), new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.65 })));
  reg('prop_flyer_memo_mom', 'props', 'Handwritten Supermarket Flyer Memo', () => new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.002, 0.13), pbr.get('washiPaperSoft', { tint: 0xe6e0cf })));
  reg('prop_smartphone_screen', 'props', 'Modern Black Smartphone', () => new THREE.Mesh(makeRoundedBoxGeo(0.074, 0.008, 0.150, 0.003, 2), darkMetal()));
  reg('prop_laptop_workstation', 'props', 'Engineering Laptop Computer', () => {
    const g = new THREE.Group();
    const base = new THREE.Mesh(makeRoundedBoxGeo(0.32, 0.012, 0.22, 0.004, 2), steelMat());
    const lid = new THREE.Mesh(makeRoundedBoxGeo(0.32, 0.21, 0.008, 0.003, 2), steelMat());
    lid.position.set(0, 0.105, -0.11); lid.rotation.x = -0.18;
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.295, 0.185), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
    scr.position.set(0, 0.105, -0.105); scr.rotation.x = -0.18;
    g.add(base, lid, scr);
    return g;
  });
  reg('prop_university_notebook', 'props', 'A4 Ruled University Notebook', () => new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.012, 0.29), pbr.get('washiPaperSoft')));
  reg('prop_mechanical_pencil', 'props', '0.5mm Drafting Mechanical Pencil', () => new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.145, 10), darkMetal()));
  reg('prop_textbook_robotics', 'props', 'Humanoid Robotics Hardcover Textbook', () => new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.032, 0.25), new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.78 })));
  reg('prop_textbook_stack', 'props', 'Stack of 4 Engineering Textbooks', () => {
    const g = new THREE.Group();
    const cols = [0x1e3a8a, 0x991b1b, 0x065f46, 0x475569];
    cols.forEach((c, i) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.028, 0.24), new THREE.MeshStandardMaterial({ color: c, roughness: 0.82 }));
      b.position.set((i % 2) * 0.008, 0.014 + i * 0.029, 0); b.rotation.y = (i - 1.5) * 0.06;
      g.add(b);
    });
    return g;
  });
  reg('prop_coffee_can_black', 'props', 'Canned Black Boss Coffee', () => new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.105, 16), darkMetal()));
  reg('prop_water_bottle_pet', 'props', '500ml PET Water Bottle', () => new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.20, 14), new THREE.MeshPhysicalMaterial({ color: 0xdbeafe, roughness: 0.12, transparent: true, opacity: 0.72 })));
  reg('prop_camping_lantern_white', 'props', 'Battery-Powered White Camping Lantern', () => {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.062, 0.044, 20), darkMetal()); base.position.y = 0.022;
    const globe = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.125, 20), new THREE.MeshBasicMaterial({ color: 0xf8fafc })); globe.position.y = 0.106;
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.054, 0.032, 20), darkMetal()); cap.position.y = 0.184;
    g.add(base, globe, cap);
    return g;
  });
  reg('prop_desk_lamp_led', 'props', 'Articulated White LED Desk Lamp', () => {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.082, 0.016, 18), baseMats.bambuWhite); base.position.y = 0.008;
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.42, 10), steelMat()); arm.position.set(0, 0.21, -0.04); arm.rotation.x = 0.25;
    const head = new THREE.Mesh(makeRoundedBoxGeo(0.16, 0.016, 0.055, 0.004, 2), baseMats.bambuWhite); head.position.set(0, 0.41, 0.05);
    g.add(base, arm, head);
    return g;
  });
  reg('prop_alcohol_wipe_cloth', 'props', 'Disinfectant Alcohol Wipe Cloth', () => new THREE.Mesh(makeRoundedBoxGeo(0.085, 0.005, 0.075, 0.002, 2), towelMat()));
  reg('prop_futon_mattress', 'props', 'Quilted Single Futon Mattress', () => new THREE.Mesh(makeRoundedBoxGeo(1.02, 0.09, 1.88, 0.025, 2), pbr.get('quiltedKnitFabric', { repeatX: 3, repeatY: 5, tint: 0x64748b })));
  reg('prop_pillow_blue', 'props', 'Soft Cotton Bed Pillow', () => new THREE.Mesh(makeRoundedBoxGeo(0.45, 0.095, 0.28, 0.032, 2), pbr.get('quiltedKnitFabric', { tint: 0xcbd5e1 })));
  reg('prop_trash_bin_parts', 'props', 'Plastic Workshop Scrap Bin', () => new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.095, 0.26, 16), pbr.get('matteCarbonBlack')));

  // === COMPETITION & FIELD EQUIPMENT (13) ===
  reg('prop_hard_case_black', 'props', 'Resin Transport Hard Case with Latches', () => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(makeRoundedBoxGeo(0.46, 0.14, 0.32, 0.014, 2), pbr.get('panelStealthBlack', { roughness: 0.44 }));
    body.position.y = 0.07;
    for (const lx of [-0.14, 0.14]) {
      const latch = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.030, 0.016), steelMat());
      latch.position.set(lx, 0.09, 0.164);
      g.add(latch);
    }
    g.add(body);
    return g;
  });
  reg('prop_stopwatch_digital', 'props', 'Handheld Digital Sprint Stopwatch', () => new THREE.Mesh(makeRoundedBoxGeo(0.062, 0.018, 0.076, 0.008, 2), darkMetal()));
  reg('prop_pendulum_300g', 'props', '300g Soft Urethane Test Pendulum', () => {
    const g = new THREE.Group();
    const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 1.8, 8), steelMat()); wire.position.y = -0.9;
    const bob = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.095, 20), new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.88 }));
    bob.rotation.z = Math.PI / 2; bob.position.y = -1.8;
    g.add(wire, bob);
    return g;
  });
  reg('prop_certificate_912', 'props', 'Competition Completion Certificate Card', () => new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.102, 0.003), pbr.get('washiPaperSoft')));
  reg('prop_pit_number_plate', 'props', 'White Pit Entry Number Placard', () => new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.004), pbr.get('exhibitionWhiteTile')));
  reg('prop_backpack_hiking', 'props', 'Large Hiking Backpack for Viaduct Transport', () => {
    const g = new THREE.Group();
    const pack = new THREE.Mesh(makeRoundedBoxGeo(0.32, 0.54, 0.22, 0.045, 2), pbr.get('carpetTileDark', { tint: 0x334155 }));
    pack.position.y = 0.27;
    const pocket = new THREE.Mesh(makeRoundedBoxGeo(0.24, 0.20, 0.08, 0.025, 2), pbr.get('carpetTileDark', { tint: 0x1e293b }));
    pocket.position.set(0, 0.18, 0.12);
    g.add(pack, pocket);
    return g;
  });
  reg('prop_rolled_linoleum_sheet', 'props', 'Rolled Rigid Hard Floor Sheet Tube', () => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 1.05, 18), pbr.get('hardLinoleumSheet', { repeatX: 2, repeatY: 2 }));
    m.castShadow = true;
    return m;
  });
  reg('prop_gantry_stand_alu', 'props', 'Aluminum Humanoid Hanging Stand', () => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.012, 0.20), steelMat()));
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.54, 12), steelMat()); pole.position.set(0, 0.27, -0.07);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.014, 0.10), steelMat()); arm.position.set(0, 0.53, -0.02);
    g.add(pole, arm);
    return g;
  });
  reg('prop_cnc_bot_red', 'props', 'Competitor Anodized Red CNC Robot', () => {
    const g = new THREE.Group();
    const m = pbr.get('scratchedRedSteel', { roughness: 0.22, metalness: 0.88 });
    const torso = new THREE.Mesh(makeRoundedBoxGeo(0.13, 0.14, 0.08, 0.012, 2), m); torso.position.y = 0.30;
    const l1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.20, 0.04), m); l1.position.set(-0.04, 0.12, 0);
    const l2 = l1.clone(); l2.position.x = 0.04;
    g.add(torso, l1, l2);
    return g;
  });
  reg('prop_cnc_bot_blue', 'props', 'Competitor Anodized Blue CNC Robot', () => {
    const g = new THREE.Group();
    const m = pbr.get('panelWhiteBlueLab', { tint: 0x3b82f6, roughness: 0.22, metalness: 0.88 });
    const torso = new THREE.Mesh(makeRoundedBoxGeo(0.13, 0.14, 0.08, 0.012, 2), m); torso.position.y = 0.30;
    const l1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.20, 0.04), m); l1.position.set(-0.04, 0.12, 0);
    const l2 = l1.clone(); l2.position.x = 0.04;
    g.add(torso, l1, l2);
    return g;
  });
  reg('prop_chalk_stick_white', 'props', 'White Track-Marking Chalk Stick', () => new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.075, 10), baseMats.bambuWhite));
  reg('prop_tool_pouch_canvas', 'props', 'Canvas Field Repair Tool Roll', () => new THREE.Mesh(makeRoundedBoxGeo(0.24, 0.045, 0.12, 0.015, 2), pbr.get('wovenCanvasBurlap', { tint: 0x8c7b65 })));
  reg('prop_folding_cone_safety', 'props', 'Orange Safety Traffic Cone', () => {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.025, 0.26), orangeHandleMat()); base.position.y = 0.012;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.10, 0.42, 14), orangeHandleMat()); cone.position.y = 0.22;
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.072, 0.08, 14), baseMats.bambuWhite); stripe.position.y = 0.24;
    g.add(base, cone, stripe);
    return g;
  });
}
