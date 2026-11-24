import * as THREE from 'three';
import { makeRoundedBoxGeo } from '../hardware.js';

/**
 * 65 Pre-Built Robotics, Actuator, Structural & Electronic Parts (`part_*`)
 * Powered by the 135-Tile Photographic PBR Atlas Bank!
 */
export function registerPartsLibrary(registry, { baseMats, ngMats, pbr }) {
  const aluMat = () => pbr.get('brushedStainlessDoor', { roughness: 0.24, metalness: 0.90, tint: 0xe6edf5 });
  const carbonMat = () => pbr.get('matteCarbonBlack', { repeatX: 2, repeatY: 2, roughness: 0.56, metalness: 0.22 });
  const darkMetal = () => pbr.get('darkSlateMetal', { roughness: 0.42, metalness: 0.72 });
  const rubberBlack = () => pbr.get('rubberDimpleBlack', { repeatX: 2, repeatY: 2, roughness: 0.78, metalness: 0.04 });
  const copperMat = () => new THREE.MeshPhysicalMaterial({ color: 0xd97706, roughness: 0.28, metalness: 0.88 });
  const brassMat = () => new THREE.MeshPhysicalMaterial({ color: 0xeab308, roughness: 0.26, metalness: 0.86 });
  const pcbGreen = () => new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.34, metalness: 0.22 });
  const pcbBurnt = () => pbr.get('charredEarth', { roughness: 0.88, metalness: 0.10, tint: 0x3f4f38 });

  const reg = (id, label, factory) => registry.register(id, { category: 'parts', label, factory });

  // --- SERVOS & ACTUATORS (8) ---
  reg('part_servo_sts3215', 'STS3215 Serial Bus Servo', () => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(makeRoundedBoxGeo(0.040, 0.040, 0.020, 0.002, 2), darkMetal());
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.041, 0.012, 0.0205), aluMat());
    const spline = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.008, 16), brassMat());
    spline.position.set(0.010, 0.024, 0);
    g.add(body, band, spline);
    return g;
  });

  reg('part_servo_stripped', 'Stripped-Gear Broken Servo', () => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(makeRoundedBoxGeo(0.040, 0.040, 0.020, 0.002, 2), pbr.get('panelStealthBlack'));
    const crackedCap = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.010, 0.021), darkMetal());
    crackedCap.position.set(0.002, 0.018, 0.002);
    crackedCap.rotation.z = 0.22;
    const bentShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.010, 12), aluMat());
    bentShaft.position.set(0.010, 0.025, 0);
    bentShaft.rotation.z = -0.35;
    g.add(body, crackedCap, bentShaft);
    return g;
  });

  reg('part_qdd_disc_84mm', 'QDD Planetary Disc Actuator 84mm', () => {
    const g = new THREE.Group();
    const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.022, 32), aluMat());
    const stator = new THREE.Mesh(new THREE.CylinderGeometry(0.0425, 0.0425, 0.006, 32), copperMat());
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.026, 20), darkMetal());
    g.add(housing, stator, hub);
    return g;
  });

  reg('part_qdd_disc_64mm', 'QDD Planetary Disc Actuator 64mm', () => {
    const g = new THREE.Group();
    const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.018, 28), aluMat());
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.021, 18), darkMetal());
    g.add(housing, hub);
    return g;
  });

  reg('part_brushless_stator', 'Flat Brushless Copper Stator', () => {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.007, 10, 24), copperMat());
    ring.rotation.x = Math.PI / 2;
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.012, 18), darkMetal());
    g.add(ring, core);
    return g;
  });

  reg('part_servo_horn_white', 'White Nylon Servo Horn', () => {
    const g = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.004, 18), baseMats.bambuWhite);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.003, 0.008), baseMats.bambuWhite);
    arm.position.x = 0.012;
    g.add(disc, arm);
    return g;
  });

  reg('part_servo_horn_alu', 'CNC Machined Aluminum Servo Horn', () => {
    const g = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.005, 20), aluMat());
    const arm = new THREE.Mesh(makeRoundedBoxGeo(0.034, 0.004, 0.009, 0.001, 2), aluMat());
    arm.position.x = 0.012;
    g.add(disc, arm);
    return g;
  });

  reg('part_servo_horn_snapped', 'Snapped Plastic Servo Horn', () => {
    const g = new THREE.Group();
    const half1 = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.004, 12, 1, false, 0, Math.PI * 1.3), baseMats.bambuWhite);
    const shard = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.003, 0.007), baseMats.bambuWhite);
    shard.position.set(0.016, 0.001, 0.005); shard.rotation.y = 0.55;
    g.add(half1, shard);
    return g;
  });

  // --- GEARS & DRIVETRAIN (8) ---
  const makeGear = (r, h, mat) => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 20), mat));
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const t = new THREE.Mesh(new THREE.BoxGeometry(r * 0.24, h * 0.92, r * 0.22), mat);
      t.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
      t.rotation.y = -a;
      g.add(t);
    }
    return g;
  };
  reg('part_gear_steel_spur', 'Hardened Steel Spur Gear', () => makeGear(0.012, 0.005, aluMat()));
  reg('part_gear_planetary_sun', 'Planetary Sun Gear', () => makeGear(0.008, 0.007, darkMetal()));
  reg('part_gear_planetary_ring', 'Planetary Internal Ring Gear', () => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.004, 10, 28), darkMetal());
    m.rotation.x = Math.PI / 2;
    return m;
  });
  reg('part_gear_bevel', 'Steel Bevel Gear', () => new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.013, 0.007, 16), aluMat()));
  reg('part_gear_teeth_shards', 'Shattered Steel Gear Teeth Shards', () => {
    const g = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const s = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.003, 0.004), aluMat());
      s.position.set(((i * 17) % 5 - 2) * 0.009, 0.002, ((i * 23) % 5 - 2) * 0.009);
      s.rotation.set(i * 0.7, i * 1.1, i * 0.5);
      g.add(s);
    }
    return g;
  });
  reg('part_ball_bearing_6802', '6802 Sealed Ball Bearing', () => {
    const g = new THREE.Group();
    const outer = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.0035, 10, 24), aluMat());
    outer.rotation.x = Math.PI / 2;
    const seal = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.005, 20), rubberBlack());
    g.add(outer, seal);
    return g;
  });
  reg('part_shaft_coupler', 'Flexible Aluminum Shaft Coupler', () => new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.022, 16), aluMat()));
  reg('part_timing_pulley', 'GT2 20T Timing Pulley', () => new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.014, 18), aluMat()));

  // --- FASTENERS & HARDWARE (9) ---
  const makeBolt = (r, l) => {
    const g = new THREE.Group();
    const head = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.7, r * 1.7, r * 1.2, 6), darkMetal());
    head.position.y = l * 0.5;
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(r, r, l, 10), aluMat());
    g.add(head, shaft);
    return g;
  };
  reg('part_bolt_m2', 'M2x8 Socket Bolt', () => makeBolt(0.0012, 0.008));
  reg('part_bolt_m3', 'M3x12 Socket Bolt', () => makeBolt(0.0018, 0.012));
  reg('part_bolt_m4', 'M4x16 Socket Bolt', () => makeBolt(0.0024, 0.016));
  reg('part_locknut_m3', 'M3 Nylon Locknut', () => new THREE.Mesh(new THREE.CylinderGeometry(0.0032, 0.0032, 0.003, 6), aluMat()));
  reg('part_washer_steel', 'Stainless Steel Washer', () => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(0.004, 0.0012, 6, 16), aluMat());
    m.rotation.x = Math.PI / 2;
    return m;
  });
  reg('part_standoff_brass', 'M3 Hex Brass Standoff', () => new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.018, 6), brassMat()));
  reg('part_spring_coil', 'Compression Steel Spring', () => {
    const g = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const c = new THREE.Mesh(new THREE.TorusGeometry(0.006, 0.0012, 6, 14), aluMat());
      c.rotation.x = Math.PI / 2 + 0.12;
      c.position.y = i * 0.004;
      g.add(c);
    }
    return g;
  });
  reg('part_zip_tie_black', 'Nylon Cable Tie', () => new THREE.Mesh(new THREE.TorusGeometry(0.016, 0.0014, 6, 20), carbonMat()));
  reg('part_hose_clamp', 'Stainless Worm Clamp', () => new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.0025, 8, 22), aluMat()));

  // --- ALUMINUM SPLINTS & CARBON STRUCTURAL FRAMES (12) ---
  reg('part_splint_shoulder_L', 'Hand-Bent 1.5mm Shoulder Splint', () => {
    const g = new THREE.Group();
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.0022, 0.026), aluMat());
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.0022, 0.042, 0.026), aluMat());
    side.position.set(0.021, -0.020, 0);
    g.add(top, side);
    return g;
  });
  reg('part_splint_hip_L', 'Hand-Bent 1.5mm Hip Reinforcement Splint', () => {
    const g = new THREE.Group();
    const vert = new THREE.Mesh(new THREE.BoxGeometry(0.0022, 0.048, 0.030), aluMat());
    const lip = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.0022, 0.030), aluMat());
    lip.position.set(-0.010, 0.023, 0);
    g.add(vert, lip);
    return g;
  });
  reg('part_splint_chest_arch', 'Silver Chest Rollbar Splint Arch', () => new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.0038, 10, 26, Math.PI), aluMat()));
  reg('part_splint_raw_plate', 'Raw 1.5mm Aluminum Sheet Stock', () => new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.002, 0.06), aluMat()));
  reg('part_splint_bent_90', '90-Degree Hand-Filed Aluminum Bracket', () => {
    const g = new THREE.Group();
    const a = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.002, 0.032), aluMat());
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.036, 0.002), aluMat());
    b.position.set(0, 0.018, -0.015);
    g.add(a, b);
    return g;
  });
  reg('part_frame_petgcf_thigh', 'PETG-CF Carbon Thigh Truss', () => new THREE.Mesh(makeRoundedBoxGeo(0.032, 0.088, 0.028, 0.003, 2), carbonMat()));
  reg('part_frame_petgcf_shin', 'PETG-CF Carbon Shin Truss', () => new THREE.Mesh(makeRoundedBoxGeo(0.028, 0.086, 0.026, 0.003, 2), carbonMat()));
  reg('part_frame_petgcf_pelvis', 'PETG-CF Pelvis Bridge Plate', () => new THREE.Mesh(makeRoundedBoxGeo(0.112, 0.010, 0.052, 0.002, 2), carbonMat()));
  reg('part_frame_petgcf_cracked', 'Fractured PETG-CF Hip Frame', () => {
    const g = new THREE.Group();
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.024, 0.024), carbonMat());
    const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.022, 0.024), carbonMat());
    p2.position.set(0.034, -0.006, 0.004); p2.rotation.z = -0.34;
    const crack = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.025, 0.026), new THREE.MeshBasicMaterial({ color: 0xf43f5e }));
    crack.position.set(0.018, 0, 0);
    g.add(p1, p2, crack);
    return g;
  });
  reg('part_frame_pla_warped', '63C Heat-Creep Warped PLA+ Bracket', () => {
    const g = new THREE.Group();
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.026, 0.024), baseMats.bambuWhite);
    b.rotation.set(0.28, 0.14, 0.32);
    g.add(b);
    return g;
  });
  reg('part_foot_plate_rubber', 'Carbon Foot Plate with Rubber Grips', () => {
    const g = new THREE.Group();
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.005, 0.098), carbonMat());
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.003, 0.094), rubberBlack());
    sole.position.y = -0.004;
    g.add(plate, sole);
    return g;
  });
  reg('part_rollbar_carbon', 'Overhead Carbon Rollbar Arch', () => new THREE.Mesh(new THREE.TorusGeometry(0.040, 0.005, 10, 24, Math.PI), carbonMat()));

  // --- ELECTRONICS, PCBs, POWER & WIRING (18) ---
  reg('part_pcb_hmd_green', 'Custom Emerald HMD-01 Core PCB', () => {
    const g = new THREE.Group();
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.003, 0.048), pcbGreen());
    const mcu = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.004, 0.018), darkMetal());
    mcu.position.y = 0.003;
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.003, 0.004), new THREE.MeshBasicMaterial({ color: 0x34d399 }));
    led.position.set(0.020, 0.003, 0.012);
    g.add(board, mcu, led);
    return g;
  });
  reg('part_pcb_burnt_april', 'April Smoked Burnt Prototype PCB', () => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.004, 0.046), pcbBurnt()));
    const soot = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.005, 14), carbonMat());
    soot.position.set(0.008, 0.002, 0.004);
    g.add(soot);
    return g;
  });
  reg('part_esp32s3_module', 'ESP32-S3 Dual-Core MCU Module', () => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.003, 0.018), darkMetal()));
    const shield = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.004, 0.015), aluMat());
    shield.position.set(-0.003, 0.003, 0);
    g.add(shield);
    return g;
  });
  reg('part_imu_bno085', '6-Axis IMU Sensor Breakout Board', () => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.002, 0.016), new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 })));
    const ic = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.002, 0.005), darkMetal());
    ic.position.y = 0.002;
    g.add(ic);
    return g;
  });
  reg('part_mosfet_to220', 'High-Current TO-220 MOSFET', () => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.010, 0.004), darkMetal()));
    const tab = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.006, 0.0015), aluMat());
    tab.position.set(0, 0.007, -0.001);
    g.add(tab);
    return g;
  });
  reg('part_capacitor_electrolytic', '1000uF Electrolytic Capacitor', () => new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.014, 14), darkMetal()));
  reg('part_inductor_toroid', 'Copper Toroid Power Inductor', () => new THREE.Mesh(new THREE.TorusGeometry(0.007, 0.003, 8, 18), copperMat()));
  reg('part_resistor_smd_array', 'SMD Resistor Strip', () => new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.002, 0.005), darkMetal()));
  reg('part_lipo_3s_1500', '3S 11.1V 1500mAh LiPo Battery Pack', () => new THREE.Mesh(makeRoundedBoxGeo(0.072, 0.024, 0.036, 0.004, 2), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.35 })));
  reg('part_lipo_6s_2200', '6S 22.2V High-Discharge LiPo Pack', () => new THREE.Mesh(makeRoundedBoxGeo(0.105, 0.044, 0.036, 0.005, 2), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.42 })));
  reg('part_xt60_connector', 'Yellow XT60 High-Current Connector', () => new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.009, 0.016), new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4 })));
  reg('part_xt30_connector', 'Yellow XT30 Compact Connector', () => new THREE.Mesh(new THREE.BoxGeometry(0.011, 0.006, 0.011), new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4 })));
  reg('part_jst_xh_header', 'JST-XH Balance Connector', () => new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.007, 0.006), baseMats.bambuWhite));
  reg('part_busbar_soldered', 'Tinned Copper Power Busbar', () => new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.003, 0.006), aluMat()));
  reg('part_wire_harness_3pin', '3-Pin Twisted Servo Bus Harness', () => {
    const g = new THREE.Group();
    const cols = [0xef4444, 0x1e293b, 0xfacc15];
    cols.forEach((col, i) => {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.0014, 0.0014, 0.085, 8), new THREE.MeshStandardMaterial({ color: col, roughness: 0.6 }));
      w.rotation.z = Math.PI / 2; w.position.z = (i - 1) * 0.003;
      g.add(w);
    });
    return g;
  });
  reg('part_wire_snapped_data', 'Pinched & Snapped Servo DATA Wire', () => {
    const g = new THREE.Group();
    const w1 = new THREE.Mesh(new THREE.CylinderGeometry(0.0016, 0.0016, 0.04, 8), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
    w1.rotation.z = 1.2; w1.position.x = -0.02;
    const w2 = w1.clone(); w2.rotation.z = -1.1; w2.position.x = 0.022;
    g.add(w1, w2);
    return g;
  });
  reg('part_logic_clip_red', 'IC Grabber Logic Probe Clip', () => new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.005, 0.042, 10), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })));
  reg('part_heatshrink_bundle', 'Heat-Shrink Tubing Bundle', () => new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.055, 10), carbonMat()));

  // --- COMPETITION & ARMOR MODULES (10) ---
  reg('part_cnc_chassis_red', 'Anodized Crimson CNC Frame Block', () => new THREE.Mesh(makeRoundedBoxGeo(0.08, 0.06, 0.04, 0.006, 2), pbr.get('scratchedRedSteel', { roughness: 0.24, metalness: 0.85 })));
  reg('part_cnc_chassis_blue', 'Anodized Cobalt CNC Frame Block', () => new THREE.Mesh(makeRoundedBoxGeo(0.08, 0.06, 0.04, 0.006, 2), pbr.get('panelWhiteBlueLab', { tint: 0x3b82f6, roughness: 0.24, metalness: 0.85 })));
  reg('part_armor_plate_white_orange', 'Competition Shell Plate (White/Orange)', () => new THREE.Mesh(makeRoundedBoxGeo(0.09, 0.07, 0.008, 0.002, 2), pbr.get('armorWhiteOrange')));
  reg('part_armor_plate_black_red', 'Competition Shell Plate (Black/Red)', () => new THREE.Mesh(makeRoundedBoxGeo(0.09, 0.07, 0.008, 0.002, 2), pbr.get('armorBlackCrimson')));
  reg('part_armor_plate_white_gold', 'Competition Shell Plate (White/Gold)', () => new THREE.Mesh(makeRoundedBoxGeo(0.09, 0.07, 0.008, 0.002, 2), pbr.get('armorWhiteGold')));
  reg('part_titanium_heat_shield', 'Heat-Blued Titanium Thermal Plate', () => new THREE.Mesh(makeRoundedBoxGeo(0.08, 0.05, 0.004, 0.001, 2), pbr.get('heatBluedTitanium')));
  reg('part_conduit_manifold', 'Internal Hydraulic/Cable Manifold', () => new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.025), pbr.get('mechConduitBay')));
  reg('part_rubber_sole_pad', '1mm High-Grip Dimpled Sole Pad', () => new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.003, 0.085), rubberBlack()));
  reg('part_encoder_magnet_ring', 'Diametric Magnetic Encoder Ring', () => new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.003, 16), aluMat()));
  reg('part_heatsink_finned', 'Extruded Aluminum Finned Heatsink', () => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.004, 0.036), darkMetal()));
    for (let f = -2; f <= 2; f++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.002, 0.014, 0.036), darkMetal());
      fin.position.set(f * 0.007, 0.008, 0);
      g.add(fin);
    }
    return g;
  });
}
