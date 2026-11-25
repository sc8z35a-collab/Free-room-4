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
    const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(1.42, 1), pbr.get('ginkgoLeavesCarpet', { repeatX: 2, repeatY: 2 }));
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

  // === EXPANSION PACK (ATLASES 16–30): 32 ADDITIONAL PHOTOGRAPHIC URBAN, WORKSHOP & SEASONAL ASSETS (TOTAL = 240 ASSETS!) ===
  reg('arch_park_bench_green', 'architecture', 'Japanese Park Green Wooden Slat Bench', () => {
    const g = new THREE.Group();
    const wood = pbr.get('greenParkBenchWood', { repeatX: 2, repeatY: 1 });
    const iron = pbr.get('darkSlateMetal', { metalness: 0.78 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.05, 0.44), wood); seat.position.y = 0.44;
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.38, 0.05), wood); back.position.set(0, 0.74, -0.20); back.rotation.x = -0.14;
    for (const sx of [-0.66, 0.66]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.44, 0.44), iron); leg.position.set(sx, 0.22, 0); g.add(leg);
    }
    g.add(seat, back); return g;
  });
  reg('arch_chain_link_fence', 'architecture', 'Galvanized Chain-Link Perimeter Fence', ({ w = 3.2, h = 1.8 } = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.04), pbr.get('chainLinkFence', { repeatX: 3, repeatY: 2 }));
    m.position.y = h * 0.5; return m;
  });
  reg('arch_cinder_block_wall', 'architecture', 'Japanese Concrete Cinder-Block Alley Wall', ({ w = 3.6, h = 1.6 } = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.16), pbr.get('concreteCinderBlock', { repeatX: 3, repeatY: 2 }));
    m.position.y = h * 0.5; m.castShadow = true; m.receiveShadow = true; return m;
  });
  reg('arch_wired_glass_window', 'architecture', 'Japanese Wired Frosted Apartment Window', ({ w = 1.48, h = 1.12 } = {}) => {
    const g = new THREE.Group();
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), pbr.get('wiredFrostedGlass', { repeatX: 2, repeatY: 2 }));
    const frameMat = pbr.get('brushedAluHairline', { metalness: 0.86 });
    const top = new THREE.Mesh(new THREE.BoxGeometry(w + 0.08, 0.045, 0.05), frameMat); top.position.y = h * 0.5;
    const bot = top.clone(); bot.position.y = -h * 0.5;
    const mid = new THREE.Mesh(new THREE.BoxGeometry(0.04, h, 0.05), frameMat);
    g.add(pane, top, bot, mid); return g;
  });
  reg('arch_glass_block_wall', 'architecture', 'Translucent Architectural Glass-Block Partition', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 0.10), pbr.get('architecturalGlassBk', { repeatX: 2, repeatY: 2 }));
    m.position.y = 1.1; return m;
  });
  reg('arch_cork_pinboard_wall', 'architecture', 'Room 203 Cork Design Schedule Pinboard', () => {
    const g = new THREE.Group();
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.54, 0.018), pbr.get('corkPinboard'));
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.80, 0.58, 0.012), pbr.get('birchPlywoodSheet')); frame.position.z = -0.004;
    g.add(frame, board); return g;
  });
  reg('arch_osb_pegboard_wall', 'architecture', 'OSB Workshop Tool Backing Board', () => new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.72, 0.018), pbr.get('osbParticleBoard')));
  reg('arch_birch_plywood_panel', 'architecture', 'Birch Plywood Prototyping Baseboard', () => new THREE.Mesh(new THREE.BoxGeometry(0.90, 0.016, 0.60), pbr.get('birchPlywoodSheet')));
  reg('arch_interlocking_plaza', 'architecture', 'Hamamatsucho Interlocking Brick Plaza Floor', ({ w = 18, d = 18 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('interlockingBrick', { repeatX: 9, repeatY: 9 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_white_facade_column', 'architecture', 'White Square-Tile Modern Building Column', ({ h = 6.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.85, h, 0.85), pbr.get('whiteFacadeTileGrid', { repeatX: 1, repeatY: 5 }));
    m.position.y = h * 0.5; return m;
  });
  reg('arch_granite_plaza_curb', 'architecture', 'Polished Gray Granite Plaza Step Curb', ({ w = 6.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.16, 0.42), pbr.get('polishedGrayGranite', { repeatX: 4, repeatY: 1 }));
    m.position.y = 0.08; m.receiveShadow = true; return m;
  });
  reg('arch_herringbone_walkway', 'architecture', 'Red Herringbone Brick Campus Path', ({ w = 3.2, d = 14 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('herringboneBrick', { repeatX: 3, repeatY: 12 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_athletic_track_lane', 'architecture', 'Red All-Weather Athletic Sprint Track', ({ w = 3.0, d = 12 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('athleticRunningTrack', { repeatX: 1, repeatY: 6 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_railroad_tie_steps', 'architecture', 'Timber Railroad-Tie Park Embankment Steps', () => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 4.5), pbr.get('railroadTieSteps', { repeatX: 1, repeatY: 3 }));
    m.rotation.x = -Math.PI * 0.38; m.position.y = 0.8; return m;
  });
  reg('arch_composite_deck_patio', 'architecture', 'Bolted Composite Wood Outdoor Deck', ({ w = 4.0, d = 4.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('compositeDecking', { repeatX: 3, repeatY: 3 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_tree_grate_castiron', 'architecture', 'Cast-Iron Sidewalk Tree-Pit Grate', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.025, 1.15), pbr.get('castIronTreeGrate'));
    m.position.y = 0.012; m.receiveShadow = true; return m;
  });
  reg('arch_steel_chain_barrier', 'architecture', 'Galvanized Steel Chain Perimeter Guard', () => new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.45, 0.04), pbr.get('galvanizedSteelChain', { repeatX: 2, repeatY: 1 })));
  reg('arch_shoji_sliding_door', 'architecture', 'Traditional Japanese Shoji Paper Screen', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.95, 0.92), pbr.get('shojiPaperScreen'));
    m.position.y = 0.975; return m;
  });
  reg('arch_kawara_eave_roof', 'architecture', 'Japanese Kawara Ceramic Tile Eave Roof', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.14, 1.8), pbr.get('kawaraRoofTile', { repeatX: 3, repeatY: 2 }));
    m.rotation.x = 0.35; return m;
  });
  reg('arch_bamboo_garden_fence', 'architecture', 'Bound Natural Bamboo Garden Fence', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.5, 0.08), pbr.get('bambooFenceBound', { repeatX: 2, repeatY: 1 }));
    m.position.y = 0.75; return m;
  });
  reg('arch_gabion_retaining_wall', 'architecture', 'Wire-Cage Gabion Riverbank Retaining Wall', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 0.65), pbr.get('gabionWireRocks', { repeatX: 2, repeatY: 1 }));
    m.position.y = 0.6; return m;
  });
  reg('arch_corten_rust_planter', 'architecture', 'Weathered Corten-Steel Plaza Planter Box', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.52, 1.4), pbr.get('cortenRustPlate'));
    m.position.y = 0.26; return m;
  });
  reg('arch_grass_grid_parking', 'architecture', 'Eco Concrete Grass-Grid Parking Pad', ({ w = 4.0, d = 6.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('grassGridPavers', { repeatX: 3, repeatY: 4 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_white_clapboard_wall', 'architecture', 'White Painted Horizontal Clapboard Wall', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.8, 0.14), pbr.get('whiteWoodSiding', { repeatX: 2, repeatY: 2 }));
    m.position.y = 1.4; return m;
  });
  reg('nat_ginkgo_carpet_strip', 'nature', 'Golden Yellow Ginkgo Fallen-Leaves Carpet', ({ w = 2.4, d = 10 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('ginkgoLeavesCarpet', { repeatX: 2, repeatY: 8 }));
    m.rotation.x = -Math.PI / 2; m.position.y = 0.008; m.receiveShadow = true; return m;
  });
  reg('nat_autumn_maple_carpet', 'nature', 'Crimson Japanese Maple Fallen-Leaves Patch', ({ w = 2.0, d = 5.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('autumnMapleLeaves', { repeatX: 2, repeatY: 4 }));
    m.rotation.x = -Math.PI / 2; m.position.y = 0.008; return m;
  });
  reg('nat_sakura_petal_drift', 'nature', 'Spring Cherry Blossom Petals Carpet', ({ w = 2.2, d = 6.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('sakuraPetalsCarpet', { repeatX: 2, repeatY: 5 }));
    m.rotation.x = -Math.PI / 2; m.position.y = 0.008; return m;
  });
  reg('nat_frosted_winter_patch', 'nature', 'Crisp Frosted Winter Grass Embankment', ({ w = 4.0, d = 10 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('frostedWinterGrass', { repeatX: 3, repeatY: 7 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('nat_snow_dusted_ground', 'nature', 'January Light-Snow-Dusted Ground Patch', ({ w = 5.0, d = 10 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('snowDustedGround', { repeatX: 3, repeatY: 6 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('nat_rain_puddle_patch', 'nature', 'Reflective Rain Puddles on Gravel Ground', ({ w = 2.4, d = 5.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('rainPuddleGravel', { repeatX: 2, repeatY: 4 }));
    m.rotation.x = -Math.PI / 2; m.position.y = 0.009; m.receiveShadow = true; return m;
  });
  reg('nat_wet_autumn_leaves', 'nature', 'Rain-Soaked Glistening Autumn Leaves Patch', ({ w = 1.8, d = 4.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('wetAutumnLeaves', { repeatX: 2, repeatY: 4 }));
    m.rotation.x = -Math.PI / 2; m.position.y = 0.009; return m;
  });
  reg('nat_lotus_pond_surface', 'nature', 'Shimmering Sunlit Lotus Pond Water Surface', ({ w = 6.0, d = 6.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('lotusPondCaustics', { repeatX: 3, repeatY: 3 }));
    m.rotation.x = -Math.PI / 2; return m;
  });

  // === EXPANSION PACK 2 (ATLASES 31–45): 30 MORE LIVED-IN APARTMENT, WORKSHOP & NATURAL ASSETS (TOTAL = 270 ASSETS!) ===
  reg('arch_shoe_cabinet_entry', 'architecture', 'Japanese Wooden Entryway Shoe Cabinet (Getabako)', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.96, 0.36), pbr.get('woodenShoeCabinet'));
    m.position.y = 0.48; m.castShadow = true; return m;
  });
  reg('arch_retro_gas_stove', 'architecture', 'Apartment 2-Burner Retro Gas Stove Unit', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.85, 0.54), pbr.get('retroGasStoveFront'));
    m.position.y = 0.425; return m;
  });
  reg('arch_mug_cupboard_wall', 'architecture', 'Glass-Door Wooden Mug & Dish Cupboard', () => new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.82, 0.30), pbr.get('glassMugCupboard')));
  reg('arch_bath_mirror_shelf', 'architecture', 'Apartment Sink Mirror & Toothbrush Shelf', () => new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.72, 0.14), pbr.get('bathMirrorSinkShelf')));
  reg('arch_apt_parcel_lockers', 'architecture', 'Apartment Entrance Mailboxes & Parcel Lockers', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.48, 0.38), pbr.get('aptParcelLockers'));
    m.position.y = 0.74; return m;
  });
  reg('arch_steel_storage_rack', 'architecture', 'Steel Shelving Rack Stacked with Cardboard Boxes', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.65, 0.44), pbr.get('steelRackCardboard'));
    m.position.y = 0.825; m.castShadow = true; return m;
  });
  reg('arch_blue_workshop_locker', 'architecture', 'Weathered Blue Steel Workshop Locker', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.88, 1.72, 0.48), pbr.get('blueWorkshopLocker'));
    m.position.y = 0.86; m.castShadow = true; return m;
  });
  reg('arch_coin_laundry_washer', 'architecture', 'Stainless Front-Load Coin Laundry Machine', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.96, 0.72), pbr.get('coinLaundryWasher'));
    m.position.y = 0.48; return m;
  });
  reg('arch_blue_hand_truck', 'architecture', 'Wheeled Blue Steel Platform Hand Truck', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.82, 0.78), pbr.get('blueHandTruckDeck'));
    m.position.y = 0.41; return m;
  });
  reg('arch_work_gloves_shelf', 'architecture', 'Workshop Hanging Work-Gloves Storage Shelf', () => new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.82, 0.24), pbr.get('workGlovesShelf')));
  reg('arch_wire_spool_shelf', 'architecture', 'Organized Wire & Thread Spools Shelf', () => new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.82, 0.24), pbr.get('wireSpoolRack')));
  reg('arch_hardware_hook_board', 'architecture', 'Wooden Workshop Pulley & Shackle Tool Board', () => new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.78, 0.04), pbr.get('hardwareHookBoard')));
  reg('arch_canvas_wall_pockets', 'architecture', 'Hanging Canvas Multi-Pocket Tool Organizer', () => new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.72, 0.04), pbr.get('canvasWallPockets')));
  reg('arch_apt_ceiling_lamp', 'architecture', 'Warm Frosted Square Apartment Ceiling Lamp', () => new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 0.42), pbr.get('frostedCeilingLamp')));
  reg('arch_exhaust_vent_wall', 'architecture', 'Apartment Kitchen/Room Louvered Exhaust Vent', () => new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.20, 0.04), pbr.get('dustyLouveredVent')));
  reg('arch_blueprint_poster', 'architecture', 'Framed Vintage Aerospace Blueprint Wall Poster', () => new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.42, 0.015), pbr.get('vintageBlueprintArt')));
  reg('arch_ocean_photo_frame', 'architecture', 'Framed Coastal Ocean View Wall Picture', () => new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.46, 0.025), pbr.get('framedOceanPhoto')));
  reg('arch_metal_filings_mat', 'architecture', 'Rubber Bench Mat Dusted with Metal Filings', ({ w = 0.65, d = 0.42 } = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.004, d), pbr.get('metalFilingsRubber', { repeatX: 2, repeatY: 1 }));
    m.position.y = 0.002; m.receiveShadow = true; return m;
  });
  reg('arch_condensation_window', 'architecture', 'Winter Condensation-Covered Glass Window', ({ w = 1.4, h = 1.1 } = {}) => {
    const g = new THREE.Group();
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), pbr.get('condensationGlass'));
    const fm = pbr.get('brushedAluHairline');
    const top = new THREE.Mesh(new THREE.BoxGeometry(w + 0.06, 0.04, 0.05), fm); top.position.y = h * 0.5;
    const bot = top.clone(); bot.position.y = -h * 0.5;
    g.add(pane, top, bot); return g;
  });
  reg('arch_seigaiha_curtain', 'architecture', 'Japanese Indigo Seigaiha Window Curtain', () => new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.45, 0.04), pbr.get('seigaihaBlueCurtain')));
  reg('arch_crimson_noren_cloth', 'architecture', 'Crimson Linen Noren Doorway Curtain', () => new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.62, 0.02), pbr.get('crimsonNorenLinen')));
  reg('arch_black_leather_pad', 'architecture', 'Black Pebbled Leather Protective Desk Pad', () => new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.008, 0.32), pbr.get('blackPebbledLeather')));
  reg('arch_hinoki_shelf_plank', 'architecture', 'Pale Hinoki Cypress Display Shelf Board', () => new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.024, 0.28), pbr.get('paleHinokiCypress')));
  reg('arch_terry_towel_folded', 'architecture', 'Fluffy White Terry-Cloth Folded Bath Towel', () => {
    const m = new THREE.Mesh(makeRoundedBoxGeo(0.32, 0.026, 0.24, 0.010, 2), pbr.get('terryClothWhite', { repeatX: 2, repeatY: 2 }));
    m.position.y = 0.013; m.receiveShadow = true; return m;
  });
  reg('arch_striped_towel_pad', 'architecture', 'Blue-Striped Fluffy Terry Bath Towel', () => {
    const m = new THREE.Mesh(makeRoundedBoxGeo(0.32, 0.024, 0.24, 0.010, 2), pbr.get('stripedBathTowel'));
    m.position.y = 0.012; m.receiveShadow = true; return m;
  });
  reg('arch_closet_storage_box', 'architecture', 'Linen-Covered Apartment Closet Storage Box', () => new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.34), pbr.get('closetFabricBox')));
  reg('arch_canvas_laundry_hamper', 'architecture', 'Woven Canvas Student Laundry Basket', () => new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.48, 0.36), pbr.get('canvasLaundryBag')));
  reg('nat_clear_river_surface', 'nature', 'Crystal-Clear Caustic Pebbled River Water', ({ w = 6.0, d = 14 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('clearCausticRiver', { repeatX: 3, repeatY: 7 }));
    m.rotation.x = -Math.PI / 2; return m;
  });
  reg('nat_coastal_seafoam_edge', 'nature', 'Tokyo Bay Seafoam Wet Sand Shoreline', ({ w = 6.0, d = 12 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('seafoamWetSand', { repeatX: 3, repeatY: 6 }));
    m.rotation.x = -Math.PI / 2; return m;
  });
  reg('nat_oak_leaf_forest_bed', 'nature', 'Crisp Dry Oak Fallen Leaves Forest Bed', ({ w = 4.0, d = 8.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('dryOakFallenLeaves', { repeatX: 3, repeatY: 6 }));
    m.rotation.x = -Math.PI / 2; return m;
  });

  // =========================================================================
  // BATCH 4 (ATLASES 46–60): 30 HIGH-VALUE SCHOOL, STATION, SHOP & LAB ASSETS
  // =========================================================================
  reg('arch_classroom_chalkboard', 'architecture', 'Japanese Classroom Green Chalkboard with Wood Frame', () => {
    const g = new THREE.Group();
    const board = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.15, 0.04), pbr.get('greenClassroomChalkboard'));
    const tray = new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.04, 0.09), pbr.get('brushedAluHairline'));
    tray.position.set(0, -0.58, 0.03);
    g.add(board, tray); return g;
  });
  reg('arch_univ_reception_counter', 'architecture', 'University / Hall Glass Reception Counter Window', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 0.55), pbr.get('univReceptionCounter'));
    m.position.y = 0.7; return m;
  });
  reg('arch_univ_library_bookshelf', 'architecture', 'Full University Library Wooden Bookshelf', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.05, 0.42), pbr.get('univLibraryBookshelf'));
    m.position.y = 1.025; m.castShadow = true; return m;
  });
  reg('arch_gym_wood_court', 'architecture', 'Polished Gymnasium Hardwood Court Floor', ({ w = 12, d = 16 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('gymWoodCourtFloor', { repeatX: 4, repeatY: 6 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_warm_lit_apt_window', 'architecture', 'Warm-Lit Apartment Sliding Aluminum Window', () => new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.05, 0.06), pbr.get('warmLitAptWindow')));
  reg('arch_frosted_balcony_rail', 'architecture', 'Japanese Apartment Frosted-Glass Balcony Railing', ({ w = 2.4 } = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 1.05, 0.06), pbr.get('frostedBalconyRailing', { repeatX: Math.max(1, Math.round(w / 1.2)), repeatY: 1 }));
    m.position.y = 0.525; return m;
  });
  reg('arch_white_meter_box', 'architecture', 'White Steel Apartment Utility Meter-Box Door', () => new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.92, 0.06), pbr.get('whiteSteelMeterBox')));
  reg('arch_ribbed_concrete_stair', 'architecture', 'Ribbed Concrete Outdoor Apartment Stairwell Block', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.4), pbr.get('ribbedConcreteStair', { repeatX: 1, repeatY: 2 }));
    m.position.y = 0.45; return m;
  });
  reg('arch_compact_sink_stove', 'architecture', 'Compact Stainless 3-Burner Kitchen Sink & Stove', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.85, 0.58), pbr.get('compactThreeBurnerSink'));
    m.position.y = 0.425; return m;
  });
  reg('arch_japanese_unit_bath', 'architecture', 'Japanese Apartment Unit-Bath Tub & Shower Panel', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.85, 0.78), pbr.get('japaneseUnitBathTub'));
    m.position.y = 0.925; return m;
  });
  reg('arch_konbini_drink_cooler', 'architecture', 'Illuminated Japanese Konbini Beverage Cooler Wall', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.85, 1.95, 0.65), pbr.get('konbiniDrinkCooler'));
    m.position.y = 0.975; return m;
  });
  reg('arch_train_platform_edge', 'architecture', 'Railway Station Platform Safety Edge with Tactile Strip', ({ w = 2.4, d = 18 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('trainPlatformEdgeLine', { repeatX: 1, repeatY: 8 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_sliding_lab_cabinet', 'architecture', 'White Sliding-Glass University Lab Specimen Cabinet', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.78, 0.46), pbr.get('slidingGlassLabCabinet'));
    m.position.y = 0.89; m.castShadow = true; return m;
  });
  reg('arch_stacked_coin_washers', 'architecture', 'Stacked Commercial Coin-Laundry Washing Machines', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.85, 0.78), pbr.get('stackedCoinWashers'));
    m.position.y = 0.925; return m;
  });
  reg('arch_seigaiha_manhole', 'architecture', 'Japanese Cast-Iron Seigaiha Street Manhole Cover', () => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.012, 24), pbr.get('seigaihaManholeCover'));
    m.position.y = 0.006; m.receiveShadow = true; return m;
  });
  reg('arch_tricolor_recycle_bins', 'architecture', 'Tri-Color Japanese Public Recycling Bin Station', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.92, 0.46), pbr.get('tricolorRecycleBins'));
    m.position.y = 0.46; m.castShadow = true; return m;
  });
  reg('arch_glowing_chochin_lantern', 'architecture', 'Glowing Crimson Japanese Chochin Paper Lantern', () => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.34, 16), pbr.get('glowingRedChochin'));
    return m;
  });
  reg('arch_koushi_sliding_door', 'architecture', 'Traditional Wooden Koushi Lattice Sliding Doors', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.65, 2.0, 0.06), pbr.get('woodenKoushiSlidingDoor'));
    m.position.y = 1.0; return m;
  });
  reg('arch_wood_system_kitchen', 'architecture', 'Modern Oak System Kitchen Counter & Range Hood', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.05, 0.62), pbr.get('woodSystemKitchenUnit'));
    m.position.y = 1.025; return m;
  });
  reg('arch_matte_black_fridge', 'architecture', 'Sleek Matte-Black Multi-Door Refrigerator', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.78, 0.68), pbr.get('matteBlackFridge'));
    m.position.y = 0.89; m.castShadow = true; return m;
  });
  reg('arch_riveted_stainless_wall', 'architecture', 'Brushed Riveted Stainless Steel Facility Wall', ({ w = 4.0, h = 2.8 } = {}) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), pbr.get('rivetedStainlessWall', { repeatX: 2, repeatY: 1 })));
  reg('arch_blue_stripe_subway_wall', 'architecture', 'White Subway Tile Wall with Double Blue Stripe', ({ w = 6.0, h = 2.8 } = {}) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), pbr.get('blueStripeSubwayTile', { repeatX: 3, repeatY: 1 })));
  reg('arch_hex_mesh_grille', 'architecture', 'Heavy Industrial Hexagonal Steel Ventilation Grille', () => new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.72, 0.06), pbr.get('hexMeshIndustrialGrille')));
  reg('arch_outdoor_ac_unit', 'architecture', 'Japanese Outdoor AC Condenser Unit on Concrete Blocks', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.64, 0.34), pbr.get('outdoorAcCondenserUnit'));
    m.position.y = 0.32; m.castShadow = true; return m;
  });
  reg('arch_hardware_tool_pegboard', 'architecture', 'Workshop Mechanic Pegboard Packed with Hand Tools', () => new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.64, 0.025), pbr.get('hardwareToolPegboard')));
  reg('arch_shokudo_ticket_machine', 'architecture', 'Japanese Shokudo Meal Ticket Vending Machine', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.68, 1.56, 0.44), pbr.get('shokudoTicketMachine'));
    m.position.y = 0.78; m.castShadow = true; return m;
  });
  reg('arch_office_binder_cabinet', 'architecture', 'Gray Steel Office Shelving Packed with Binders', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.75, 0.42), pbr.get('officeBinderSteelCabinet'));
    m.position.y = 0.875; m.castShadow = true; return m;
  });
  reg('arch_warehouse_parcel_rack', 'architecture', 'Heavy-Duty Steel Logistics Warehouse Parcel Rack', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.95, 0.56), pbr.get('warehouseCardboardRack'));
    m.position.y = 0.975; m.castShadow = true; return m;
  });
  reg('arch_scifi_holo_console', 'architecture', 'Cyan Holographic Telemetry & Global Map Console', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.92, 0.08), pbr.get('scifiHoloDataConsole'));
    return m;
  });
  reg('arch_industrial_cable_loom', 'architecture', 'Clamped Multi-Color Heavy Industrial Cable Loom Panel', ({ w = 1.6, h = 1.2 } = {}) => new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.08), pbr.get('bundledMulticolorCables')));

  // =========================================================================
  // BATCH 5 (ATLASES 61–73): 20 SUBWAY, TRAIN, TUNNEL, FOOD & RUIN ASSETS
  // =========================================================================
  reg('arch_subway_ballast_track', 'architecture', 'Tokyo Subway Steel Rail & Ballast Track Bed', ({ w = 3.2, d = 18 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('subwayBallastTracks', { repeatX: 1, repeatY: 6 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_subway_station_wall', 'architecture', 'Tokyo Subway Weathered Tile Wall & 3-Seat Bench', ({ w = 6.0, h = 2.8 } = {}) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), pbr.get('subwayStationBenchWall', { repeatX: 2, repeatY: 1 })));
  reg('arch_subway_exit_corridor', 'architecture', 'Subway Concrete Exit Arrow Wall & Maintenance Door', ({ w = 4.5, h = 2.8 } = {}) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), pbr.get('subwayExitArrowCorridor', { repeatX: 2, repeatY: 1 })));
  reg('arch_subway_platform_slab', 'architecture', 'Subway Tactile Platform Edge & Concrete Deck', ({ w = 3.2, d = 16 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('subwayPlatformTactile', { repeatX: 1, repeatY: 6 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_subway_train_car_shell', 'architecture', 'Photorealistic Tokyo Subway Commuter Train Car', () => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.8, 3.0, 12.0), pbr.get('subwayCarSideWindows', { repeatX: 3, repeatY: 1 }));
    body.position.y = 1.95;
    const front = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 3.0), pbr.get('subwayCarFrontCabFace'));
    front.position.set(0, 1.95, 6.01);
    const roof = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 12.0), pbr.get('subwayCarRoofVentPanel', { repeatX: 1, repeatY: 3 }));
    roof.rotation.x = -Math.PI / 2; roof.position.y = 3.46;
    g.add(body, front, roof); return g;
  });
  reg('arch_subway_interior_bay', 'architecture', 'Tokyo Subway Interior Moquette Seat & Window Bay', () => {
    const g = new THREE.Group();
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.2), pbr.get('subwayCarMoquetteSeat'));
    wall.position.set(0, 1.1, -1.25);
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.5), pbr.get('subwayCarAisleFloor'));
    fl.rotation.x = -Math.PI / 2;
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.5), pbr.get('subwayCarInteriorCeiling'));
    ceil.rotation.x = Math.PI / 2; ceil.position.y = 2.2;
    g.add(wall, fl, ceil); return g;
  });
  reg('arch_shield_tunnel_ring', 'architecture', 'Curved Precast Concrete Shield Tunnel Lining', ({ w = 6.0, h = 4.0 } = {}) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), pbr.get('shieldTunnelConcreteRing', { repeatX: 2, repeatY: 1 })));
  reg('arch_highway_guardrail', 'architecture', 'Galvanized Bolted Steel Highway Guardrail Beam', ({ length = 6.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.36, length), pbr.get('boltedHighwayGuardrail', { repeatX: 3, repeatY: 1 }));
    m.position.y = 0.62; m.castShadow = true; return m;
  });
  reg('arch_galvanized_utility_pole', 'architecture', 'Galvanized Steel Street Utility Pole', ({ h = 6.5 } = {}) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, h, 14), pbr.get('galvanizedSteelPole', { repeatX: 1, repeatY: 4 }));
    m.position.y = h * 0.5; m.castShadow = true; return m;
  });
  reg('arch_pvc_strip_curtain', 'architecture', 'Industrial Clear PVC Warehouse Strip Curtain', () => new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.1, 0.03), pbr.get('clearPvcStripCurtain')));
  reg('arch_indigo_asanoha_noren', 'architecture', 'Traditional Indigo Asanoha Pattern Noren Curtain', () => new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.72, 0.02), pbr.get('indigoAsanohaNoren')));
  reg('arch_kraft_rice_sack', 'architecture', 'Photorealistic Twine-Tied Kraft Paper 5kg Rice Sack', () => {
    const m = new THREE.Mesh(makeRoundedBoxGeo(0.28, 0.36, 0.14, 0.028, 2), pbr.get('kraftRiceSackTwine'));
    m.position.y = 0.18; m.castShadow = true; return m;
  });
  reg('arch_shrine_kawara_roof', 'architecture', 'Lichen-Speckled Japanese Kawara Ceramic Tile Roof', ({ w = 4.0, d = 2.6 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('lichenKawaraRoofTiles', { repeatX: 3, repeatY: 2 }));
    m.rotation.x = -Math.PI * 0.38; return m;
  });
  reg('arch_vermilion_shrine_wall', 'architecture', 'Weathered Peeling Vermilion Shrine Timber Wall', ({ w = 3.2, h = 2.6 } = {}) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), pbr.get('peelingVermilionShrine', { repeatX: 2, repeatY: 1 })));
  reg('arch_gothic_stone_arch', 'architecture', 'Romanesque Carved Limestone Archway Panel', () => new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.8, 0.24), pbr.get('romanStoneArchVault')));
  reg('arch_dented_yellow_drum', 'architecture', 'Weathered Dented Yellow Steel Industrial Oil Drum', () => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.88, 20), pbr.get('dentedYellowOilDrum'));
    m.position.y = 0.44; m.castShadow = true; return m;
  });
  reg('arch_mine_wood_crate', 'architecture', 'Weathered Heavy Wooden Industrial Shipping Crate', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.76, 0.76), pbr.get('weatheredMineWoodCrate'));
    m.position.y = 0.38; m.castShadow = true; return m;
  });
  reg('arch_board_formed_bunker', 'architecture', 'Board-Formed Raw Concrete Underground Bunker Wall', ({ w = 5.0, h = 3.0 } = {}) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), pbr.get('boardFormedBunkerWall', { repeatX: 2, repeatY: 1 })));
  reg('nat_autumn_momiji_bed', 'nature', 'Red Japanese Momiji Maple Leaves Forest Floor', ({ w = 4.0, d = 8.0 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('autumnMomijiSoilBed', { repeatX: 3, repeatY: 6 }));
    m.rotation.x = -Math.PI / 2; return m;
  });
  reg('nat_quarry_granite_cliff', 'nature', 'Japanese Quarry Chiseled Granite Cliff Wall', ({ w = 6.0, h = 4.0 } = {}) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), pbr.get('chiseledVerticalQuarry', { repeatX: 3, repeatY: 2 })));

  // =========================================================================
  // BATCH 6 (ATLASES 74–88): 20 URBAN, APARTMENT, LAB & HERITAGE ASSETS (TOTAL = 340!)
  // =========================================================================
  reg('arch_wood_dish_cupboard', 'architecture', 'Japanese Wooden Glass-Door Dish Cupboard', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.48, 0.38), pbr.get('woodGlassDishCupboard'));
    m.position.y = 0.74; m.castShadow = true; return m;
  });
  reg('arch_laundry_drying_rack', 'architecture', 'Indoor Apartment Hanging Laundry Drying Rack', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.38, 0.42), pbr.get('indoorLaundryDryingRack'));
    m.position.y = 0.69; return m;
  });
  reg('arch_window_blinds_white', 'architecture', 'White Horizontal Aluminum Window Venetian Blinds', ({ w = 1.4, h = 1.2 } = {}) => new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.03), pbr.get('whiteWindowBlinds')));
  reg('arch_houseplant_shelf', 'architecture', 'Two-Tier Wooden Wall Shelf with Potted Plants', () => new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.92, 0.24), pbr.get('pottedHouseplantShelves')));
  reg('arch_pc_workstation_top', 'architecture', 'Top-Down PC Monitor, Keyboard & Notebook Desk Surface', () => new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.02, 0.62), pbr.get('topDownPcMonitorDesk')));
  reg('arch_green_exit_door', 'architecture', 'Japanese Green Steel Emergency Exit Door & Sign', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.05, 2.15, 0.08), pbr.get('greenEmergencyExitDoor'));
    m.position.y = 1.075; return m;
  });
  reg('arch_stainless_elevators', 'architecture', 'Twin Brushed Stainless Hall Elevator Doors', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.4, 0.12), pbr.get('twinStainlessElevators'));
    m.position.y = 1.2; return m;
  });
  reg('arch_metro_route_sign', 'architecture', 'Illuminated Tokyo Metro Colored Transit Route Map', () => new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.92, 0.05), pbr.get('metroTransitRouteMap')));
  reg('arch_fire_alarm_box', 'architecture', 'Red Japanese Corridor Fire Alarm Call Point', () => new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.04), pbr.get('redFireAlarmCallPoint')));
  reg('arch_red_postbox_jp', 'architecture', 'Classic Red Cylindrical Japanese Street Postbox', () => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, 1.25, 16), pbr.get('classicRedJapanesePost'));
    m.position.y = 0.625; m.castShadow = true; return m;
  });
  reg('arch_park_water_fountain', 'architecture', 'Stainless Steel Campus / Park Drinking Fountain', () => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.88, 16), pbr.get('stainlessParkFountain'));
    m.position.y = 0.44; m.castShadow = true; return m;
  });
  reg('arch_community_corkboard', 'architecture', 'Campus Festival Flyers & Pinned Community Corkboard', () => new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.85, 0.04), pbr.get('communityPinnedCorkboard')));
  reg('arch_blue_stripe_awning', 'architecture', 'Blue-and-White Scalloped Festival Booth Awning', ({ w = 2.6 } = {}) => new THREE.Mesh(new THREE.BoxGeometry(w, 0.68, 0.04), pbr.get('blueWhiteStripeAwning', { repeatX: 2, repeatY: 1 })));
  reg('arch_street_newsstand', 'architecture', 'Green Metal Street Newspaper & Magazine Stand', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.38, 0.48), pbr.get('greenStreetNewsstand'));
    m.position.y = 0.69; m.castShadow = true; return m;
  });
  reg('arch_parcel_pickup_locker', 'architecture', 'Smart Automated Parcel Delivery Pickup Locker Bank', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.65, 1.85, 0.52), pbr.get('smartParcelPickupLocker'));
    m.position.y = 0.925; m.castShadow = true; return m;
  });
  reg('arch_umbrella_rack', 'architecture', 'Wire-Mesh Entrance Umbrella Stand with Umbrellas', () => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.58, 14), pbr.get('meshUmbrellaStandRack'));
    m.position.y = 0.29; return m;
  });
  reg('arch_cleanroom_hatch', 'architecture', 'White Aerospace Cleanroom Pressure Hatch Panel', () => new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 0.08), pbr.get('whiteCleanroomHatch')));
  reg('arch_o2_cylinder_rack', 'architecture', 'Pressurized Laboratory Gas / O2 Cylinder Rack', () => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.65, 0.48), pbr.get('pressurizedO2TankRack'));
    m.position.y = 0.825; return m;
  });
  reg('arch_herringbone_brick_plaza', 'architecture', 'Classic Red Herringbone Brick Campus Plaza Floor', ({ w = 8, d = 14 } = {}) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pbr.get('herringboneRedBrickPaver', { repeatX: 4, repeatY: 7 }));
    m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
  });
  reg('arch_drystone_retaining_wall', 'architecture', 'Natural Japanese Fitted Granite Retaining Wall', ({ w = 6, h = 2.4 } = {}) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), pbr.get('fittedGraniteFieldstone', { repeatX: 3, repeatY: 1 })));
}
