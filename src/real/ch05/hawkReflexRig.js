import * as THREE from 'three';
import { createHMD01Lower12DOF } from '../ch04/ik12dofRig.js';
import { createHMDCorePCBRig } from './hmdCorePcbRig.js';
import { createNextGenHandRig } from '../nextgen/pbrMicroTextures.js';

const L1 = 0.093;
const L2 = 0.093;
const H_ANK = 0.034;
const HIP_HALF_W = 0.042;

/**
 * Builds the Climax Day 098 Untethered Autonomous 12-DOF Hawk-Reflex Rig (1,222 g)
 * standing completely cable-free (`3S LiPo` + `HMD-CORE-v1`) atop a 400mm Birch Plywood
 * Balance Board gripped & tilted (`±8°` Roll, `+10°` Pitch, 3D Swirl) by Minato's two hands!
 */
export function createHawkReflexSystem(baseMats, ngMats) {
  const root = new THREE.Group();

  // Central Fulcrum Roller under the Plywood Balance Board
  const fulcrum = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.24, 24), baseMats.rubberBlack);
  fulcrum.rotation.x = Math.PI / 2;
  fulcrum.position.set(0, 0.016, 0);
  fulcrum.castShadow = true;
  root.add(fulcrum);

  // Tilting 400mm x 260mm x 12mm Birch Plywood Balance Board ("厚さ12ミリ・幅40センチの合板")
  const boardPivot = new THREE.Group();
  boardPivot.position.set(0, 0.032, 0);
  root.add(boardPivot);

  const boardMesh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.012, 0.26), ngMats.birchPlywoodMat);
  boardMesh.position.y = 0.006; // Top surface of board in boardPivot space = y = +0.012m!
  boardMesh.castShadow = true;
  boardMesh.receiveShadow = true;
  boardPivot.add(boardMesh);

  // Untethered 12-DOF Lower-Body Robot + Dorsal Carrier (`HMD-CORE-v1` + `3S LiPo` = 1,222g, ZERO CABLES!)
  // Placed in `root` world space so its pelvis stays PINNED DEAD-HORIZONTAL in world space while board tilts!
  const robot = createHMD01Lower12DOF(baseMats);
  root.add(robot.root);

  // Dorsal Autonomous Carrier Frame bolted atop Pelvis!
  const carrier = new THREE.Group();
  carrier.position.set(0, 0.026, 0);
  robot.pelvis.add(carrier);

  const carrierFrame = new THREE.Mesh(new THREE.BoxGeometry(0.092, 0.006, 0.068), baseMats.printedPLA);
  carrierFrame.castShadow = true;
  carrier.add(carrierFrame);

  // Blue 3S 1300mAh LiPo Pack nestled on lower carrier deck
  const onboardLipo = new THREE.Mesh(new THREE.BoxGeometry(0.070, 0.020, 0.034), ngMats.lipoWrapBlue);
  onboardLipo.position.set(0, 0.013, -0.012);
  onboardLipo.castShadow = true;
  carrier.add(onboardLipo);

  // Repaired Emerald `HMD-CORE-v1` PCB mounted horizontally right on top of Pelvis CoM so viewer sees it stay DEAD-LEVEL!
  const onboardPcb = createHMDCorePCBRig(baseMats, ngMats, 1.12);
  onboardPcb.setAssemblyState({ stage: 'uv_cured', busbarProgress: 1.0, ledOn: true });
  onboardPcb.root.position.set(0, 0.030, 0.004);
  carrier.add(onboardPcb.root);

  // Chrome Main Toggle Power Switch on Rear of Carrier
  const toggleSwitch = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.003, 0.014, 12), baseMats.chromeSteel);
  toggleSwitch.position.set(0.036, 0.035, -0.024);
  toggleSwitch.rotation.x = -0.35;
  carrier.add(toggleSwitch);

  // Minato's Two Fingernail-Detailed Hands gripping Left & Right edges of the Birch Plywood Board!
  const leftHand = createNextGenHandRig(baseMats, ngMats, -1);
  leftHand.setGrip(0.55);
  const rightHand = createNextGenHandRig(baseMats, ngMats, 1);
  rightHand.setGrip(0.55);
  root.add(leftHand.group, rightHand.group);

  // Reusable Quaternion / Vector scratch for exact Arbitrary-Inclined-Plane 12-DOF Hawk IK!
  const _boardEuler = new THREE.Euler();
  const _boardQuat = new THREE.Quaternion();
  const _footLocal = new THREE.Vector3();
  const _footWorld = new THREE.Vector3();
  const _ankOffset = new THREE.Vector3();
  const _ankWorld = new THREE.Vector3();
  const _thighQuat = new THREE.Quaternion();
  const _hipEuler = new THREE.Euler();
  const _shinQuat = new THREE.Quaternion();
  const _shinInv = new THREE.Quaternion();
  const _ankQuat = new THREE.Quaternion();
  const _ankEuler = new THREE.Euler();
  const _qZ = new THREE.Quaternion();
  const _qX = new THREE.Quaternion();
  const _axisZ = new THREE.Vector3(0, 0, 1);
  const _axisX = new THREE.Vector3(1, 0, 0);

  /**
   * Solves Exact 12-DOF Hawk-Reflex Compliance Leveling:
   * - Board tilts by `boardRoll` (Z) and `boardPitch` (X)
   * - Both feet stay 100.00% flush on the tilted board surface (both 3D position AND normal rotation `q_board`!)
   * - Pelvis & `HMD-CORE-v1` stay PINNED DEAD-HORIZONTAL (`Euler = [0,0,0]`) at fixed world height `pelvisY`!
   */
  function updateHawkReflex({
    boardRoll = 0,  // radians (+ = right side lifted / tilted left!)
    boardPitch = 0, // radians (+ = front lifted / pitched back!)
    showHands = true,
  } = {}) {
    _boardEuler.set(boardPitch, 0, boardRoll, 'XZY');
    _boardQuat.setFromEuler(_boardEuler);
    boardPivot.quaternion.copy(_boardQuat);

    // Fixed world-space horizontal pelvis (pinned in space like a hawk's head!)
    const pelvisWorldY = 0.032 + 0.012 + 0.194; // 194mm above neutral board surface -> plenty of travel for ±10°!
    robot.root.position.set(0, 0, 0);
    robot.pelvis.position.set(0, pelvisWorldY, 0);
    robot.pelvis.quaternion.identity(); // 0.00° tilt — ROCK-SOLID EARTH HORIZONTAL!

    const legs = [robot.rightLeg, robot.leftLeg];
    for (const leg of legs) {
      // Foot sole contact point on top surface of board (y = +0.012 in boardPivot local space)
      _footLocal.set(leg.side * HIP_HALF_W, 0.012, 0).applyQuaternion(_boardQuat);
      _footWorld.set(_footLocal.x, 0.032 + _footLocal.y, _footLocal.z);

      // Ankle 2-axis intersection point is H_ANK (34mm) along the tilted board's surface normal!
      _ankOffset.set(0, H_ANK, 0).applyQuaternion(_boardQuat);
      _ankWorld.copy(_footWorld).add(_ankOffset);

      // Hip 3-axis intersection point (pelvis is horizontal at [0, pelvisWorldY, 0]!)
      const hx = leg.side * HIP_HALF_W;
      const hy = pelvisWorldY;
      const hz = 0;

      // Vector from Ankle Intersection UP to Hip Intersection
      const ux = hx - _ankWorld.x;
      const uy = hy - _ankWorld.y;
      const uz = hz - _ankWorld.z;

      const d = Math.min(L1 + L2 - 0.0002, Math.max(0.06, Math.hypot(ux, uy, uz)));
      const cosQ4 = Math.max(-1, Math.min(1, (d * d - L1 * L1 - L2 * L2) / (2 * L1 * L2)));
      const q4 = Math.acos(cosQ4);

      const phi = Math.atan2(ux, uy);
      const u_yz = Math.hypot(ux, uy);
      const psi = Math.atan2(-uz, u_yz);

      const thighPitch = -(psi + q4 * 0.5);
      _qZ.setFromAxisAngle(_axisZ, -phi);
      _qX.setFromAxisAngle(_axisX, thighPitch);
      _thighQuat.copy(_qZ).multiply(_qX);

      // Since R_pelvis = Identity, Hip local quaternion IS _thighQuat!
      _hipEuler.setFromQuaternion(_thighQuat, 'YZX');
      leg.hipYaw.rotation.set(0, _hipEuler.y, 0);
      leg.hipRoll.rotation.set(0, 0, _hipEuler.z);
      leg.hipPitch.rotation.set(_hipEuler.x, 0, 0);

      leg.kneePitch.rotation.set(q4, 0, 0);

      _qX.setFromAxisAngle(_axisX, q4);
      _shinQuat.copy(_thighQuat).multiply(_qX);
      _shinInv.copy(_shinQuat).invert();

      // Foot target orientation = _boardQuat (100% flush with tilted plywood!). R_ankle = R_shin^T * R_board!
      _ankQuat.copy(_shinInv).multiply(_boardQuat);
      _ankEuler.setFromQuaternion(_ankQuat, 'XZY');
      leg.anklePitch.rotation.set(_ankEuler.x, 0, 0);
      leg.ankleRoll.rotation.set(0, 0, _ankEuler.z);
    }

    // Position Minato's Left & Right Fingernail-Detailed Hands gripping the tilting board edges!
    leftHand.group.visible = showHands;
    rightHand.group.visible = showHands;
    if (showHands) {
      const lEdge = new THREE.Vector3(-0.215, 0.008, 0.09).applyQuaternion(_boardQuat);
      leftHand.group.position.set(lEdge.x - 0.015, 0.032 + lEdge.y + 0.006, lEdge.z + 0.045);
      leftHand.group.rotation.set(-0.12 + boardPitch * 0.5, -0.32, boardRoll * 0.6);

      const rEdge = new THREE.Vector3(0.215, 0.008, 0.09).applyQuaternion(_boardQuat);
      rightHand.group.position.set(rEdge.x + 0.015, 0.032 + rEdge.y + 0.006, rEdge.z + 0.045);
      rightHand.group.rotation.set(-0.12 + boardPitch * 0.5, 0.32, boardRoll * 0.6);
    }
  }

  return {
    root,
    boardPivot,
    robot,
    onboardPcb,
    leftHand,
    rightHand,
    updateHawkReflex,
  };
}
