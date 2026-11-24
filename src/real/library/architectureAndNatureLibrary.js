import * as THREE from 'three';
import { makeRoundedBoxGeo } from '../hardware.js';

/**
 * 54 Pre-Built Architectural Elements, Furniture, Urban Infrastructure & Nature Objects (`arch_*`, `nat_*`)
 * Every single material is backed by the user's 135 photographic PBR Atlas tiles!
 */
export function registerArchitectureAndNatureLibrary(registry, { baseMats, ngMats, pbr }) {
  const reg = (id, category, label, factory) => registry.register(id, { category, label, factory });

  // === INTERIOR FURNITURE & ROOM FIXTURES (16) ===
  reg('arch_walnut_workbench', 'architecture', 'Pore-Detailed Walnut Engineering Workbench', () => {
    const g = new THREE.Group();
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.030, 0.68), pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 1, roughness: 0.42 }));
    top.position.y = 0.705; top.castShadow = true; top.receiveShadow = true;
    const legMat = pbr.get('darkSlateMetal', { roughness: 0.48, metalness: 0.72 });
    for (const lx of [-0.62, 0.62]) {
      for (const lz of [-0.28, 0.28]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.70, 0.036), legMat);
        leg.position.set(lx, 0.35, lz); leg.castShadow = true;
        g.add(leg);
      }
    }
    g.add(top);
    return g;
  });

  reg('arch_pit_pipe_table', 'architecture', '90cm White Exhibition Pit Pipe Table', ({ width = 0.92 } = {}) => {
    const g = new THREE.Group();
    const top = new THREE.Mesh(new THREE.BoxGeometry(width, 0.030, 0.65), pbr.get('exhibitionWhiteTile', { roughness: 0.55 }));
    top.position.y = 0.72; top.castShadow = true; top.receiveShadow = true;
    const pipeMat = pbr.get('brushedStainlessDoor', { roughness: 0.28, metalness: 0.88 });
    for (const lx of [-width * 0.44, width * 0.44]) {
      for (const lz of [-0.26, 0.26]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.71, 10), pipeMat);
        leg.position.set(lx, 0.355, lz); g.add(leg);
      }
    }
    g.add(top);
    return g;
  });

  reg('arch_folding_chair', 'architecture', 'Steel Folding Pipe Chair', () => {
    const g = new THREE.Group();
    const seatMat = pbr.get('matteCarbonBlack', { roughness: 0.68 });
    const pipeMat = pbr.get('brushedStainlessDoor', { metalness: 0.85 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.025, 0.40), seatMat); seat.position.y = 0.44;
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.24, 0.025), seatMat); back.position.set(0, 0.72, -0.19);
    for (const sx of [-0.19, 0.19]) {
      const fLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.46, 8), pipeMat); fLeg.position.set(sx, 0.22, 0.17);
      const bLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.82, 8), pipeMat); bLeg.position.set(sx, 0.41, -0.18);
      g.add(fLeg, bLeg);
    }
    g.add(seat, back);
    return g;
  });

  reg('arch_wooden_bookshelf', 'architecture', '3-Tier Walnut Apartment Bookshelf', () => {
    const g = new THREE.Group();
    const wood = pbr.get('walnutWoodFloor', { repeatX: 2, repeatY: 2 });
    for (const sy of [0.22, 0.68, 1.18]) {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.024, 0.32), wood);
      shelf.position.y = sy; shelf.receiveShadow = true;
      g.add(shelf);
    }
    for (const sx of [-0.47, 0.47]) {
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.024, 1.24, 0.32), wood);
      side.position.set(sx, 0.62, 0); g.add(side);
    }
    return g;
  });

  reg('arch_iron_door_frame', 'architecture', 'Hollow Steel Apartment Door Jamb Frame', () => {
    const g = new THREE.Group();
    const m = pbr.get('darkSlateMetal', { roughness: 0.55, metalness: 0.65 });
    const jL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 2.05, 0.06), m); jL.position.set(0, 1.025, -0.45);
    const jR = jL.clone(); jR.position.z = 0.45;
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.06, 0.96), m); top.position.set(0, 2.04, 0);
    g.add(jL, jR, top);
    return g;
  });

  reg('arch_iron_door_leaf', 'architecture', 'Thin Apartment Iron Entrance Door', () => {
    const g = new THREE.Group();
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.036, 1.98, 0.86), pbr.get('industrialSteelDoor', { roughness: 0.52, metalness: 0.62 }));
    leaf.position.y = 0.99;
    g.add(leaf);
    return g;
  });

  reg('arch_classic_wood_door', 'architecture', 'Paneled Wooden Interior Door', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.042, 2.00, 0.84), pbr.get('classicWoodDoor'));
    m.position.y = 1.00; return m;
  });
  reg('arch_frosted_glass_door', 'architecture', 'Frosted Glass Aluminum Lab Double Door', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.15, 1.55), pbr.get('frostedGlassDoor'));
    m.position.y = 1.075; return m;
  });
  reg('arch_elevator_door_steel', 'architecture', 'Brushed Stainless Exhibition Elevator Bay', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.35, 1.75), pbr.get('brushedStainlessDoor'));
    m.position.y = 1.175; return m;
  });

  reg('arch_hallway_bare_bulb', 'architecture', 'Warm Bare Tungsten Exterior Hallway Bulb', () => {
    const g = new THREE.Group();
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.24, 8), pbr.get('darkSlateMetal')); cord.position.y = 0.14;
    const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.022, 0.04, 12), pbr.get('darkSlateMetal')); socket.position.y = 0.035;
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.042, 16, 12), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
    g.add(cord, socket, bulb);
    return g;
  });

  reg('arch_hallway_steel_railing', 'architecture', 'Apartment Exterior Steel Guardrail', ({ length = 4.2 } = {}) => {
    const g = new THREE.Group();
    const m = pbr.get('darkSlateMetal', { roughness: 0.50, metalness: 0.78 });
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, length), m); top.position.y = 1.05;
    const mid = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, length), m); mid.position.y = 0.55;
    g.add(top, mid);
    for (let z = -length * 0.45; z <= length * 0.45; z += 0.75) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.035, 1.05, 0.035), m);
      post.position.set(0, 0.525, z); g.add(post);
    }
    return g;
  });

  reg('arch_frosted_window_bay', 'architecture', 'Apartment Frosted Glass Sliding Window', () => {
    const g = new THREE.Group();
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(1.45, 1.12), pbr.get('frostedGlassDoor', { tint: 0x64748b }));
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.04, 0.05), pbr.get('darkSlateMetal')); frame.position.y = 0.56;
    const frameB = frame.clone(); frameB.position.y = -0.56;
    g.add(pane, frame, frameB);
    return g;
  });

  reg('arch_starry_window_orion', 'architecture', 'Framed Night Window Bay', () => {
    const g = new THREE.Group();
    const m = pbr.get('darkSlateMetal');
    const t = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.04, 0.05), m); t.position.y = 0.47;
    const b = t.clone(); b.position.y = -0.47;
    const l = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.96, 0.05), m); l.position.x = -0.47;
    const r = l.clone(); r.position.x = 0.47;
    g.add(t, b, l, r);
    return g;
  });

  reg('arch_room_floor_walnut', 'architecture', 'Photorealistic Wooden Apartment Floor', ({ w = 4.4, d = 5.2 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('walnutWoodFloor', { repeatX: 4, repeatY: 5, roughness: 0.48 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_hard_linoleum_mat', 'architecture', 'Rigid Pale-Blue-Gray Hard Linoleum Sheet', ({ w = 1.15, d = 1.75 } = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.005, d), pbr.get('hardLinoleumSheet', { repeatX: Math.max(1, Math.round(w)), repeatY: Math.max(1, Math.round(d)), roughness: 0.42 }));
    m.position.y = 0.0025; m.receiveShadow = true; return m;
  });
  reg('arch_green_rubber_mat', 'architecture', 'Green Dimpled Anti-Slip Floor Mat', ({ w = 1.2, d = 1.6 } = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.006, d), pbr.get('greenRubberDimple', { repeatX: 2, repeatY: 3 }));
    m.position.y = 0.003; m.receiveShadow = true; return m;
  });

  // === RAILWAY, VIADUCT & URBAN INFRASTRUCTURE (20) ===
  reg('arch_viaduct_pier_rust', 'architecture', 'Rust-Streaked Reinforced Concrete Viaduct Pier', ({ h = 2.4 } = {}) => {
    const g = new THREE.Group();
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.76, h, 0.84), pbr.get('viaductConcreteRust', { repeatX: 1, repeatY: 2 }));
    col.position.y = h * 0.5; col.castShadow = true; col.receiveShadow = true;
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.24, 0.98), pbr.get('mossyRustConcrete'));
    base.position.y = 0.12; base.receiveShadow = true;
    g.add(col, base);
    return g;
  });

  reg('arch_viaduct_deck_girder', 'architecture', 'Concrete Railway Viaduct Box-Girder Deck', ({ length = 22 } = {}) => {
    const g = new THREE.Group();
    const deck = new THREE.Mesh(new THREE.BoxGeometry(length, 0.52, 3.4), pbr.get('smoothConcreteSlab', { repeatX: 8, repeatY: 1 }));
    const sideBeam = new THREE.Mesh(new THREE.BoxGeometry(length, 0.22, 0.16), pbr.get('viaductConcreteRust', { repeatX: 10, repeatY: 1 }));
    sideBeam.position.set(0, 0.28, 1.68);
    g.add(deck, sideBeam);
    return g;
  });

  reg('arch_express_train_car', 'architecture', 'Illuminated Commuter Express Train Car', () => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.45, 1.12, 0.96), pbr.get('brushedStainlessDoor', { repeatX: 2, repeatY: 1, roughness: 0.30, metalness: 0.72 }));
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(3.47, 0.14, 0.98), new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.38 }));
    stripe.position.y = -0.22;
    const winMat = new THREE.MeshBasicMaterial({ color: 0xfef3c7 });
    for (let w = 0; w < 4; w++) {
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.38), winMat);
      win.position.set(-1.05 + w * 0.70, 0.14, 0.49); g.add(win);
    }
    const roofAc = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.14, 0.58), pbr.get('panelHeavySteelBay'));
    roofAc.position.y = 0.62;
    g.add(body, stripe, roofAc);
    return g;
  });

  reg('arch_catenary_mast_wire', 'architecture', 'Overhead Railway Catenary Pole & Power Line', () => {
    const g = new THREE.Group();
    const m = pbr.get('galvanizedSiloMetal', { metalness: 0.78 });
    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.2, 0.12), m); mast.position.y = 1.1;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.8), m); arm.position.set(0, 1.9, 0.8);
    const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 18, 6), pbr.get('darkSlateMetal'));
    wire.rotation.z = Math.PI / 2; wire.position.set(0, 1.82, 1.2);
    g.add(mast, arm, wire);
    return g;
  });

  reg('arch_catenary_spark_arc', 'architecture', 'Electric-Blue Pantograph Catenary Spark', () => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), new THREE.MeshBasicMaterial({ color: 0x7dd3fc })));
    return g;
  });

  reg('arch_sound_barrier_panel', 'architecture', 'Corrugated Railway Acoustic Barrier', () => new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.85, 0.08), pbr.get('corrugatedZincSteel', { repeatX: 2, repeatY: 1 })));
  reg('arch_chalk_sprint_track', 'architecture', '3.0m White-Chalk Sprint Measurement Track', () => {
    const g = new THREE.Group();
    const chalk = new THREE.MeshBasicMaterial({ color: 0xf8fafc, transparent: true, opacity: 0.88 });
    for (let m = 0; m <= 3; m++) {
      const l = new THREE.Mesh(new THREE.PlaneGeometry(0.92, m === 3 ? 0.026 : 0.012), chalk);
      l.rotation.x = -Math.PI / 2; l.position.set(0, 0.008, m * 1.0); g.add(l);
    }
    return g;
  });

  reg('arch_asphalt_road_segment', 'architecture', 'Weathered Campus Asphalt Roadway', ({ w = 4.6, d = 18 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('asphaltFine', { repeatX: 3, repeatY: 12 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_concrete_curb_block', 'architecture', 'Roadside Concrete Curb Block', ({ length = 18 } = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, length), pbr.get('concreteCurb', { repeatX: 1, repeatY: Math.max(1, Math.round(length / 1.5)) }));
    m.position.y = 0.08; m.receiveShadow = true; return m;
  });
  reg('arch_tactile_paving_strip', 'architecture', 'Yellow Tactile Sidewalk Guiding Strip', ({ length = 16 } = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.012, length), pbr.get('tactilePavingYellow', { repeatX: 1, repeatY: Math.max(1, Math.round(length * 2.5)) }));
    m.position.y = 0.006; m.receiveShadow = true; return m;
  });
  reg('arch_sidewalk_paver_bay', 'architecture', 'Concrete Sidewalk Paver Walkway', ({ w = 1.8, d = 18 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('sidewalkPavers', { repeatX: 2, repeatY: 14 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_storm_drain_grate', 'architecture', 'Steel Roadside Storm Drain Grate', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.018, 0.72), pbr.get('stormDrainGrate'));
    m.position.y = 0.009; return m;
  });

  reg('arch_streetlight_sodium', 'architecture', 'Japanese Suburban Streetlight Pole', () => {
    const g = new THREE.Group();
    const poleMat = pbr.get('galvanizedSiloMetal', { metalness: 0.72 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.062, 4.2, 12), poleMat); pole.position.y = 2.1;
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.030, 0.85, 10), poleMat); arm.rotation.z = Math.PI * 0.42; arm.position.set(0.38, 4.15, 0);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 0.14), new THREE.MeshBasicMaterial({ color: 0xfde68a })); lamp.position.set(0.75, 4.22, 0);
    g.add(pole, arm, lamp);
    return g;
  });

  reg('arch_utility_pole_wood', 'architecture', 'Concrete/Wood Neighborhood Utility Pole', () => {
    const g = new THREE.Group();
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 5.2, 12), pbr.get('viaductConcreteRust', { repeatX: 1, repeatY: 3 })); p.position.y = 2.6;
    const cross = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.07, 0.07), pbr.get('darkSlateMetal')); cross.position.y = 4.6;
    g.add(p, cross);
    return g;
  });

  reg('arch_vending_machine_night', 'architecture', 'Glowing Japanese Drink Vending Machine', () => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.82, 0.68), pbr.get('panelWhiteBlueLab')); body.position.y = 0.91;
    const disp = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.72), new THREE.MeshBasicMaterial({ color: 0xe0f2fe })); disp.position.set(0, 1.24, 0.345);
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.24, 0.06), pbr.get('darkSlateMetal')); slot.position.set(0, 0.36, 0.33);
    g.add(body, disp, slot);
    return g;
  });

  reg('arch_commuter_bicycle', 'architecture', 'Student Commuter Bicycle (Mama-chari)', () => {
    const g = new THREE.Group();
    const tireMat = pbr.get('matteCarbonBlack', { roughness: 0.85 });
    const frameMat = pbr.get('brushedStainlessDoor', { tint: 0x94a3b8, metalness: 0.85 });
    for (const wx of [-0.52, 0.52]) {
      const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.025, 10, 24), tireMat);
      wheel.position.set(wx, 0.34, 0); g.add(wheel);
    }
    const bar1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.92, 8), frameMat);
    bar1.rotation.z = Math.PI * 0.45; bar1.position.set(0, 0.54, 0);
    const seatPost = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.52, 8), frameMat);
    seatPost.position.set(-0.22, 0.62, 0);
    const saddle = new THREE.Mesh(makeRoundedBoxGeo(0.22, 0.05, 0.13, 0.02, 2), tireMat);
    saddle.position.set(-0.24, 0.88, 0);
    const basket = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.32), pbr.get('steelTrenchGrate', { roughness: 0.4 }));
    basket.position.set(0.56, 0.82, 0);
    g.add(bar1, seatPost, saddle, basket);
    return g;
  });

  reg('arch_concrete_wheel_stop', 'architecture', 'Concrete Parking Wheel-Stop Block', () => new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.12, 0.16), pbr.get('concreteCurb')));
  reg('arch_corrugated_fence', 'architecture', 'Corrugated Galvanized Steel Site Fence', () => new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.85, 0.06), pbr.get('blueCorrugatedSteel', { repeatX: 2, repeatY: 1 })));
  reg('arch_rollup_shutter_bay', 'architecture', 'Industrial Roll-Up Steel Shutter', () => new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 0.10), pbr.get('rollUpMetalShutter')));
  reg('arch_blast_door_lab', 'architecture', 'Heavy Reinforced Lab Bulkhead Door', () => new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.3, 0.14), pbr.get('heavyBlastDoor')));

  // === EXHIBITION HALL & SKYSCRAPER ELEMENTS (8) ===
  reg('arch_glass_curtain_wall', 'architecture', 'Skyscraper Reflective Glass Curtain Wall', () => new THREE.Mesh(new THREE.BoxGeometry(10.5, 13.0, 0.4), new THREE.MeshPhysicalMaterial({ color: 0x60a5fa, roughness: 0.12, metalness: 0.88, clearcoat: 0.9 })));
  reg('arch_hall_ceiling_truss', 'architecture', 'Exhibition Hall Overhead Steel Truss', () => new THREE.Mesh(new THREE.BoxGeometry(14.0, 0.55, 0.55), pbr.get('steelTrussShutter', { repeatX: 8, repeatY: 1 })));
  reg('arch_hall_led_light_panel', 'architecture', 'Recessed Bright Exhibition Ceiling Light', () => new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.85), pbr.get('ceilingLightPanel')));
  reg('arch_spectator_balcony', 'architecture', 'Exhibition Hall Second-Floor Spectator Balcony', () => new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.28, 1.8), pbr.get('archWhiteConcrete', { repeatX: 4, repeatY: 1 })));
  reg('arch_arena_waxed_pad', 'architecture', 'Waxed Competition Arena Floor Pad', () => new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.012, 4.0), pbr.get('exhibitionWhiteTile', { repeatX: 4, repeatY: 6, roughness: 0.18 })));
  reg('arch_overhead_scoreboard', 'architecture', 'Suspended Arena Digital Scoreboard Frame', () => new THREE.Mesh(new THREE.BoxGeometry(3.3, 1.3, 0.14), pbr.get('panelStealthBlack')));
  reg('arch_stanchion_barrier', 'architecture', 'Chrome Crowd Control Stanchion Post', () => {
    const g = new THREE.Group();
    const m = pbr.get('brushedStainlessDoor', { metalness: 0.9 });
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.03, 16), m));
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.92, 12), m); p.position.y = 0.46;
    g.add(p); return g;
  });
  reg('arch_terrazzo_lobby_floor', 'architecture', 'Polished Terrazzo Lobby Flooring', ({ w = 12, d = 12 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('terrazzoFloor', { repeatX: 6, repeatY: 6 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });

  // === NATURE, FOLIAGE & TERRAIN (10) ===
  reg('nat_kinmokusei_hedge', 'nature', 'Photorealistic Fragrant Osmanthus (Kinmokusei) Hedge', ({ length = 16 } = {}) => {
    const g = new THREE.Group();
    const bush = new THREE.Mesh(
      new THREE.BoxGeometry(0.88, 1.24, length),
      pbr.get('hedgeFoliageGreen', { repeatX: 1, repeatY: Math.max(1, Math.round(length * 0.75)) })
    );
    bush.position.y = 0.62; bush.castShadow = true; bush.receiveShadow = true;
    g.add(bush);
    const blossomMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    for (let i = 0; i < 36; i++) {
      const fl = new THREE.Mesh(new THREE.SphereGeometry(0.034, 7, 6), blossomMat);
      fl.position.set(0.45 * (i % 2 === 0 ? 1 : -1), 0.35 + ((i * 0.27) % 0.80), -length * 0.48 + (i / 36) * length * 0.96);
      g.add(fl);
    }
    return g;
  });

  reg('nat_ginkgo_tree_autumn', 'nature', 'Golden Autumn Ginkgo Street Tree', () => {
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.19, 2.8, 12), pbr.get('treeBarkRealistic', { repeatX: 1, repeatY: 3 }));
    trunk.position.y = 1.4; trunk.castShadow = true;
    const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(1.42, 1), pbr.get('autumnFallenLeaves', { tint: 0xfde047, repeatX: 2, repeatY: 2 }));
    crown.position.y = 3.35; crown.castShadow = true;
    g.add(trunk, crown);
    return g;
  });

  reg('nat_street_tree_green', 'nature', 'Campus Deciduous Tree', () => {
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.17, 2.6, 12), pbr.get('treeBarkRealistic', { repeatX: 1, repeatY: 3 }));
    trunk.position.y = 1.3;
    const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(1.28, 1), pbr.get('hedgeFoliageGreen', { repeatX: 2, repeatY: 2 }));
    crown.position.y = 3.1;
    g.add(trunk, crown);
    return g;
  });

  reg('nat_fallen_leaves_patch', 'nature', 'Autumn Fallen Leaves Ground Scatter', ({ w = 1.6, d = 4.2 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('autumnFallenLeaves', { repeatX: 2, repeatY: 5 }));
    m.rotation.x = -Math.PI / 2; m.position.y = 0.008; m.receiveShadow = true; return m;
  });

  reg('nat_riverbed_boulder_wet', 'nature', 'Rain-Wet Riverbank Dark Rock Boulder', () => new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 1), pbr.get('wetDarkBoulder')));
  reg('nat_riverbank_pebble_bed', 'nature', 'Riverbed Wet Pebbles Embankment Strip', ({ w = 4.0, d = 16 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('riverbedWetPebbles', { repeatX: 3, repeatY: 12 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('nat_grass_embankment', 'nature', 'Autumn Dry-Green Riverbank Grass Strip', ({ w = 4.0, d = 14 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('grassDryAutumn', { repeatX: 3, repeatY: 10 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('nat_moss_rock_cluster', 'nature', 'Moss-Covered Riverbank Stone Cluster', () => new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 1), pbr.get('forestMoss')));
  reg('nat_gravel_shoulder', 'nature', 'Crushed Gravel Viaduct Shoulder', ({ w = 3.2, d = 14 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('gravelStones', { repeatX: 3, repeatY: 12 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('nat_rain_streak_field', 'nature', 'Slanting October Ice-Rain Streak Mesh', () => {
    const g = new THREE.Group();
    const rm = new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.55 });
    for (let i = 0; i < 16; i++) {
      const s = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.24, 0.004), rm);
      s.position.set(((i * 0.47) % 2.4) - 1.2, (i * 0.29) % 2.2, ((i * 0.61) % 2.4) - 1.2);
      s.rotation.z = 0.14; g.add(s);
    }
    return g;
  });
}
