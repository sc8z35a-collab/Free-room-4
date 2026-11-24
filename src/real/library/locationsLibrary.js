import * as THREE from 'three';

/**
 * 24 Composable Pre-Built Location Prefabs (`loc_*`)
 * Each location composes multiple assets directly from the Master 200+ Library & 135-Tile Photographic PBR Atlas Bank!
 */
export function registerLocationsLibrary(registry, { pbr, spawn }) {
  const reg = (id, label, factory) => registry.register(id, { category: 'locations', label, factory });

  // 1. Room 203 Workbench Zone
  reg('loc_room203_workbench', 'Corpo Musashino Room 203 Engineering Workbench', () => {
    const g = new THREE.Group();
    const desk = spawn('arch_walnut_workbench');
    const lamp = spawn('prop_desk_lamp_led'); lamp.position.set(-0.52, 0.72, -0.22);
    const caliper = spawn('tool_vernier_caliper'); caliper.position.set(-0.46, 0.722, 0.16); caliper.rotation.y = 0.45;
    const multimeter = spawn('tool_multimeter_digital'); multimeter.position.set(0.46, 0.734, -0.14); multimeter.rotation.y = -0.3;
    const solderSpool = spawn('tool_solder_spool'); solderSpool.position.set(0.54, 0.744, 0.12);
    const hexSet = spawn('tool_hex_wrench_set'); hexSet.position.set(-0.36, 0.726, -0.18);
    const pegboard = spawn('arch_hardware_tool_pegboard'); pegboard.position.set(0.0, 1.25, -0.365);
    const cork = spawn('arch_cork_pinboard_wall'); cork.position.set(-0.88, 1.26, -0.365);
    const poster = spawn('arch_blueprint_poster'); poster.position.set(0.76, 1.26, -0.365);
    g.add(desk, lamp, caliper, multimeter, solderSpool, hexSet, pegboard, cork, poster);
    return g;
  });

  // 2. Room 203 Hard-Floor Practice Arena
  reg('loc_room203_practice_floor', 'Room 203 Wooden Floor & Hard Linoleum Practice Sheet', () => {
    const g = new THREE.Group();
    const wood = spawn('arch_room_floor_walnut', { w: 4.4, d: 5.2 });
    const linoleum = spawn('arch_hard_linoleum_mat', { w: 1.15, d: 1.75 });
    linoleum.position.set(-0.18, 0.0025, 0.45);
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 2.7), pbr.get('wallpaperWhiteWoven', { repeatX: 4, repeatY: 2 }));
    wall.position.set(0, 1.35, -1.95);
    const baseboard = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.09, 0.03), pbr.get('darkRusticPlanks', { repeatX: 4, repeatY: 1 }));
    baseboard.position.set(0, 0.045, -1.93);
    g.add(wood, linoleum, wall, baseboard);
    return g;
  });

  // 3. Room 203 Exterior Hallway & Room 103 Doorway
  reg('loc_room203_hallway_103', 'Room 203 Open Iron Doorway & Bare-Bulb Exterior Hallway', () => {
    const g = new THREE.Group();
    const wallMat = pbr.get('wallpaperWhiteWoven', { repeatX: 2, repeatY: 2 });
    const wallL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.5, 1.4), wallMat); wallL.position.set(0, 1.25, -1.18);
    const wallR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.5, 1.4), wallMat); wallR.position.set(0, 1.25, 1.18);
    const wallT = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.96), wallMat); wallT.position.set(0, 2.275, 0);
    const frame = spawn('arch_iron_door_frame');
    const door = spawn('arch_iron_door_leaf'); door.position.set(-0.32, 0.0, 0.68); door.rotation.y = 0.72;
    const bulb = spawn('arch_hallway_bare_bulb'); bulb.position.set(-0.48, 1.96, -0.05);
    const extFloor = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 4.2), pbr.get('sidewalkPavers', { repeatX: 2, repeatY: 4 }));
    extFloor.rotation.x = -Math.PI / 2; extFloor.position.set(-1.3, 0.002, 0);
    const rail = spawn('arch_hallway_steel_railing', { length: 4.0 }); rail.position.set(-1.45, 0, 0);
    const acUnit = spawn('arch_outdoor_ac_unit'); acUnit.position.set(-0.46, 0, -1.32); acUnit.rotation.y = Math.PI / 2;
    const meterBox = spawn('arch_white_meter_box'); meterBox.position.set(-0.07, 1.32, -1.05); meterBox.rotation.y = -Math.PI / 2;
    g.add(wallL, wallR, wallT, frame, door, bulb, extFloor, rail, acUnit, meterBox);
    return g;
  });

  // 4. Room 203 Midnight Bedside (Japanese Wired Frosted Glass Window!)
  reg('loc_room203_midnight_bedside', 'Room 203 Midnight Futon & Wired Frosted Window', () => {
    const g = new THREE.Group();
    const futon = spawn('prop_futon_mattress'); futon.position.set(-0.32, 0.045, 0.65);
    const pillow = spawn('prop_pillow_blue'); pillow.position.set(-0.32, 0.115, 0.02);
    const win = spawn('arch_wired_glass_window'); win.position.set(-0.2, 0.98, -1.62);
    g.add(futon, pillow, win);
    return g;
  });

  // 5. Room 203 Honored Bookshelf Shrine
  reg('loc_room203_bookshelf_shrine', 'Room 203 Top Bookshelf HMD-01 Honor Display', () => {
    const g = new THREE.Group();
    const shelf = spawn('arch_wooden_bookshelf');
    const books = spawn('prop_textbook_stack'); books.position.set(-0.34, 1.20, 0);
    const cert = spawn('prop_certificate_912'); cert.position.set(0.18, 1.25, 0.02); cert.rotation.x = -0.2;
    g.add(shelf, books, cert);
    return g;
  });

  // 6. Campus Kinmokusei Sunset Slope
  reg('loc_campus_kinmokusei_slope', 'October Kinmokusei Sunset Campus Walkway & Hedges', () => {
    const g = new THREE.Group();
    const road = spawn('arch_asphalt_road_segment', { w: 4.8, d: 22 });
    const sideL = spawn('arch_sidewalk_paver_bay', { w: 1.4, d: 22 }); sideL.position.set(-3.1, 0.06, 0);
    const sideR = spawn('arch_sidewalk_paver_bay', { w: 1.4, d: 22 }); sideR.position.set(3.1, 0.06, 0);
    const curbL = spawn('arch_concrete_curb_block', { length: 22 }); curbL.position.set(-2.4, 0, 0);
    const curbR = spawn('arch_concrete_curb_block', { length: 22 }); curbR.position.set(2.4, 0, 0);
    const tactile = spawn('arch_tactile_paving_strip', { length: 18 }); tactile.position.set(-2.72, 0.06, 0);
    const hedgeL = spawn('nat_kinmokusei_hedge', { length: 20 }); hedgeL.position.set(-3.65, 0.06, -1.5);
    const hedgeR = spawn('nat_kinmokusei_hedge', { length: 20 }); hedgeR.position.set(3.65, 0.06, -1.5);
    const leavesL = spawn('nat_fallen_leaves_patch', { w: 1.0, d: 12 }); leavesL.position.set(-1.95, 0.01, -1.0);
    const leavesR = spawn('nat_fallen_leaves_patch', { w: 1.0, d: 12 }); leavesR.position.set(1.95, 0.01, -1.0);
    const lampL = spawn('arch_streetlight_sodium'); lampL.position.set(-2.65, 0.06, -4.5);
    const lampR = spawn('arch_streetlight_sodium'); lampR.position.set(2.65, 0.06, -8.5); lampR.rotation.y = Math.PI;
    const drain = spawn('arch_storm_drain_grate'); drain.position.set(-2.05, 0.005, -0.6);
    const manhole = spawn('arch_seigaiha_manhole'); manhole.position.set(0.65, 0.005, -2.4);
    g.add(road, sideL, sideR, curbL, curbR, tactile, hedgeL, hedgeR, leavesL, leavesR, lampL, lampR, drain, manhole);
    return g;
  });

  // 7. Private Railway Concrete Viaduct Underpass (Night + Reflective Rain Puddles!)
  reg('loc_viaduct_underpass_night', 'Private Railway Concrete Viaduct Underpass Plaza', () => {
    const g = new THREE.Group();
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 22),
      pbr.get('viaductConcreteTire', { repeatX: 6, repeatY: 7 })
    );
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
    const gravelL = spawn('nat_gravel_shoulder', { w: 3.6, d: 18 }); gravelL.position.set(-4.2, 0.008, 0);
    const puddles = spawn('nat_rain_puddle_patch', { w: 2.0, d: 5.5 }); puddles.position.set(-1.65, 0.011, 2.2);
    const pebblesR = spawn('nat_riverbank_pebble_bed', { w: 3.6, d: 18 }); pebblesR.position.set(4.2, 0.008, 0);
    const deck = spawn('arch_viaduct_deck_girder', { length: 22 }); deck.position.set(0, 2.38, -1.6);
    const catenary = spawn('arch_catenary_mast_wire'); catenary.position.set(-2.8, 2.64, -2.1);
    const bike = spawn('arch_commuter_bicycle'); bike.position.set(-2.25, 0, -0.45); bike.rotation.y = 0.65;
    const backpack = spawn('prop_backpack_hiking'); backpack.position.set(-1.35, 0, 0.05); backpack.rotation.y = 0.4;
    const cone = spawn('prop_folding_cone_safety'); cone.position.set(2.15, 0, -0.9);
    const wheelStop = spawn('arch_concrete_wheel_stop'); wheelStop.position.set(-2.1, 0.06, -1.1);
    g.add(ground, gravelL, puddles, pebblesR, deck, catenary, bike, backpack, cone, wheelStop);
    for (const px of [-4.2, -1.4, 1.4, 4.2]) {
      const pier = spawn('arch_viaduct_pier_rust', { h: 2.38 });
      pier.position.set(px, 0, -1.8);
      g.add(pier);
    }
    return g;
  });

  // 8. Viaduct 3m Sprint Arena
  reg('loc_viaduct_sprint_arena', 'Viaduct Hard-Linoleum 3.0m Chalk Sprint Strip', () => {
    const g = new THREE.Group();
    const sheet = spawn('arch_hard_linoleum_mat', { w: 1.10, d: 3.60 }); sheet.position.set(0, 0.003, 1.55);
    const chalk = spawn('arch_chalk_sprint_track');
    g.add(sheet, chalk);
    return g;
  });

  // 9..24: Complete Composable Locations for Chapters 10–16 & Modular Reuse!
  reg('loc_hamamatsucho_trade_plaza', 'Hamamatsucho Industrial Trade Center Glass Plaza', () => {
    const g = new THREE.Group();
    const plaza = spawn('arch_interlocking_plaza', { w: 20, d: 20 });
    const ginkgoL = spawn('nat_ginkgo_carpet_strip', { w: 2.6, d: 10 }); ginkgoL.position.set(-3.2, 0.01, -1.5);
    const ginkgoR = spawn('nat_ginkgo_carpet_strip', { w: 2.6, d: 10 }); ginkgoR.position.set(3.2, 0.01, -1.5);
    const grateL = spawn('arch_tree_grate_castiron'); grateL.position.set(-3.4, 0.012, -2.6);
    const grateR = spawn('arch_tree_grate_castiron'); grateR.position.set(3.4, 0.012, -2.6);
    const step = spawn('arch_granite_plaza_curb', { w: 10.0 }); step.position.set(0, 0, -4.4);
    const colL = spawn('arch_white_facade_column', { h: 12.0 }); colL.position.set(-5.2, 0, -5.2);
    const colR = spawn('arch_white_facade_column', { h: 12.0 }); colR.position.set(5.2, 0, -5.2);
    const glass = spawn('arch_glass_curtain_wall'); glass.position.set(0, 6.5, -7.2);
    const treeL = spawn('nat_ginkgo_tree_autumn'); treeL.position.set(-3.4, 0, -2.6);
    const treeR = spawn('nat_ginkgo_tree_autumn'); treeR.position.set(3.4, 0, -2.6);
    g.add(plaza, ginkgoL, ginkgoR, grateL, grateR, step, colL, colR, glass, treeL, treeR);
    return g;
  });

  reg('loc_exhibition_hall_pits', 'Exhibition Hall Pit Tables Row (No.37 / No.38 / No.39)', () => {
    const g = new THREE.Group();
    const p37 = spawn('arch_pit_pipe_table', { width: 1.5 }); p37.position.x = -1.7;
    const p38 = spawn('arch_pit_pipe_table', { width: 0.92 }); p38.position.x = 0;
    const p39 = spawn('arch_pit_pipe_table', { width: 1.15 }); p39.position.x = 1.25;
    const chair = spawn('arch_folding_chair'); chair.position.set(0, 0, -0.58);
    g.add(p37, p38, p39, chair);
    return g;
  });

  reg('loc_exhibition_official_stage', 'Exhibition Official 3.0m Waxed Stage & Scoreboard', () => {
    const g = new THREE.Group();
    const pad = spawn('arch_arena_waxed_pad'); pad.position.set(0, 0.006, 1.5);
    const sb = spawn('arch_overhead_scoreboard'); sb.position.set(0, 2.25, -1.7);
    const bal = spawn('arch_spectator_balcony'); bal.position.set(0, 1.85, -5.8);
    g.add(pad, sb, bal);
    return g;
  });

  reg('loc_exhibition_disturbance_bay', 'Disturbance Test Bay with 300g Ceiling Pendulum', () => {
    const g = new THREE.Group();
    const mat = spawn('arch_green_rubber_mat', { w: 2.2, d: 2.4 });
    const pend = spawn('prop_pendulum_300g'); pend.position.set(0, 2.1, 0);
    g.add(mat, pend);
    return g;
  });

  reg('loc_exhibition_sunset_macro', 'Sunset Hall Macro Pit Desk', () => {
    const g = new THREE.Group();
    const table = spawn('arch_pit_pipe_table', { width: 1.2 });
    const qdd = spawn('part_qdd_disc_84mm'); qdd.position.set(0, 0.745, 0);
    const coffee = spawn('prop_coffee_can_black'); coffee.position.set(-0.32, 0.785, 0.12);
    g.add(table, qdd, coffee);
    return g;
  });

  reg('loc_robotics_clubroom', 'University Robotics Clubroom Workshop', () => {
    const g = new THREE.Group();
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), pbr.get('checkeredLinoleum', { repeatX: 5, repeatY: 5 }));
    fl.rotation.x = -Math.PI / 2;
    const door = spawn('arch_frosted_glass_door'); door.position.set(-3.5, 0, -2);
    const desk = spawn('arch_walnut_workbench'); desk.position.set(0, 0, -1.2);
    g.add(fl, door, desk);
    return g;
  });

  reg('loc_electronics_lab_bench', 'University EE Oscilloscope & Power Lab Bench', () => {
    const g = new THREE.Group();
    const desk = spawn('arch_walnut_workbench');
    const scope = spawn('tool_oscilloscope_bench'); scope.position.set(-0.28, 0.79, -0.15);
    const psu = spawn('tool_bench_psu_30v'); psu.position.set(0.32, 0.79, -0.14);
    const dmm = spawn('tool_multimeter_digital'); dmm.position.set(0.05, 0.735, 0.12);
    g.add(desk, scope, psu, dmm);
    return g;
  });

  reg('loc_akihabara_parts_counter', 'Akihabara Radio-Center Components Counter', () => {
    const g = new THREE.Group();
    const counter = spawn('arch_pit_pipe_table', { width: 1.6 });
    const pcb = spawn('part_pcb_hmd_green'); pcb.position.set(-0.2, 0.74, 0);
    const mosfet = spawn('part_mosfet_to220'); mosfet.position.set(0.1, 0.74, 0.08);
    g.add(counter, pcb, mosfet);
    return g;
  });

  reg('loc_konbini_night_front', 'Late-Night Convenience Store Front & Vending Machine', () => {
    const g = new THREE.Group();
    const pavers = spawn('arch_sidewalk_paver_bay', { w: 6, d: 6 });
    const vm = spawn('arch_vending_machine_night'); vm.position.set(-1.6, 0, -2.0);
    const glass = spawn('arch_frosted_glass_door'); glass.position.set(0.6, 0, -2.2);
    g.add(pavers, vm, glass);
    return g;
  });

  reg('loc_riverbank_embankment', 'Tamagawa Riverbank Pebble & Grass Embankment', () => {
    const g = new THREE.Group();
    const pebbles = spawn('nat_riverbank_pebble_bed', { w: 5, d: 14 });
    const grass = spawn('nat_grass_embankment', { w: 5, d: 14 }); grass.position.x = -5;
    const rock = spawn('nat_riverbed_boulder_wet'); rock.position.set(1.2, 0.12, -1.5);
    g.add(pebbles, grass, rock);
    return g;
  });

  reg('loc_hardware_metal_aisle', 'Home-Center Aluminum Sheet & Metal Hardware Aisle', () => {
    const g = new THREE.Group();
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(6, 10), pbr.get('terrazzoFloor', { repeatX: 4, repeatY: 6 }));
    fl.rotation.x = -Math.PI / 2;
    const plate = spawn('part_splint_raw_plate'); plate.position.set(0, 0.9, -1);
    g.add(fl, plate);
    return g;
  });

  reg('loc_station_platform_tactile', 'Private Railway Station Platform with Tactile Paving', () => {
    const g = new THREE.Group();
    const deck = spawn('arch_sidewalk_paver_bay', { w: 4, d: 16 });
    const tactile = spawn('arch_tactile_paving_strip', { length: 16 }); tactile.position.set(1.2, 0.008, 0);
    g.add(deck, tactile);
    return g;
  });

  reg('loc_commuter_train_deck', '4-Car Illuminated Express Train Consist', () => {
    const g = new THREE.Group();
    for (let c = 0; c < 4; c++) {
      const car = spawn('arch_express_train_car');
      car.position.x = c * 3.65;
      g.add(car);
    }
    return g;
  });

  reg('loc_rooftop_wind_pad', 'Engineering Building Rooftop Wind Test Pad', () => {
    const g = new THREE.Group();
    const pad = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), pbr.get('industrialLandingPad', { repeatX: 4, repeatY: 4 }));
    pad.rotation.x = -Math.PI / 2;
    const rail = spawn('arch_hallway_steel_railing', { length: 10 }); rail.position.set(-4.8, 0, 0);
    g.add(pad, rail);
    return g;
  });

  reg('loc_rl_virtual_sim_grid', 'Reinforcement Learning Virtual Training Void Grid', () => {
    const g = new THREE.Group();
    const grid = new THREE.GridHelper(16, 32, 0x38bdf8, 0x1e3a8a);
    g.add(grid);
    return g;
  });

  reg('loc_hero_turntable_studio', 'Photorealistic Robotics Macro Showcase Studio', () => {
    const g = new THREE.Group();
    const stage = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.45, 0.04, 36), pbr.get('polishedWhiteMarble'));
    stage.position.y = 0.02; stage.receiveShadow = true;
    g.add(stage);
    return g;
  });
}
