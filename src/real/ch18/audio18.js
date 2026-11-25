/**
 * Chapter 18 Procedural WebAudio Soundscape (`第18章：逆流する稲妻と、二度目の夏休み`):
 * - Night riverbank breeze, rhythmic untethered footsteps (`タン、タン、タン、タッ！`)
 * - BMS over-voltage cutoff shriek (`ピピッ——バチンッ！！`) & concrete crash (`ガシャァァンッ！！`)
 * - Level crossing warning bell (`カンカンカン…`) & decelerating express train regenerative whine (`キィィィン…ヒュゥゥン…`)
 * - Day 496 Obon night `1.1 m/s` sprint -> crisp `ザッ——ピタリ！！` brake triumph!
 */
export class Ch18AudioEngine {
  constructor() {
    this.ctx = null; this.master = null;
    this.droneOsc = null; this.droneGain = null;
    this.muted = false; this.active = false;
    this.triggered = new Set(); this._recDest = null;
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.24;
    this.master.connect(this.ctx.destination);
    this.droneOsc = this.ctx.createOscillator();
    this.droneOsc.type = 'sine'; this.droneOsc.frequency.value = 88;
    this.droneGain = this.ctx.createGain(); this.droneGain.gain.value = 0.0;
    this.droneOsc.connect(this.droneGain); this.droneGain.connect(this.master);
    this.droneOsc.start();
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    this.active = true;
  }

  pause() {
    this.active = false;
    if (this.droneGain && this.ctx) this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
  }

  setMuted(m) {
    this.muted = m;
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.24, this.ctx.currentTime, 0.06);
  }

  resetForSeek() { this.triggered.clear(); }

  getRecordingStream() {
    if (!this.ctx || !this.master) return null;
    if (!this._recDest) {
      this._recDest = this.ctx.createMediaStreamDestination();
      this.master.connect(this._recDest);
    }
    return this._recDest.stream;
  }

  tone(freq, dur, vol = 0.16, type = 'sine', endFreq = null) {
    if (!this.ctx || !this.active || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator(); const g = this.ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== null) osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + dur);
    g.gain.setValueAtTime(0.001, now); g.gain.linearRampToValueAtTime(vol, now + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0008, now + dur);
    osc.connect(g); g.connect(this.master); osc.start(now); osc.stop(now + dur + 0.04);
  }

  update(t) {
    if (!this.ctx || !this.active || this.muted) return;
    const now = this.ctx.currentTime;
    let f = 88, v = 0.04;
    if (t >= 88 && t < 101) { f = 520 - ((t - 88) / 13) * 320; v = 0.09; } // Express train regen whine!
    else if (t >= 112) { f = 130.8; v = 0.08; }
    this.droneOsc.frequency.setTargetAtTime(f, now, 0.08);
    this.droneGain.gain.setTargetAtTime(v, now, 0.08);

    const once = (k, cond, fn) => { if (cond && !this.triggered.has(k)) { this.triggered.add(k); fn(); } };
    once('bms_beep', t >= 34.0 && t < 35.0, () => this.tone(2400, 0.18, 0.24, 'square', 1800));
    once('crash', t >= 36.2 && t < 37.2, () => this.tone(130, 0.55, 0.34, 'sawtooth', 32));
    once('bell1', t >= 90.0 && t < 91.0, () => this.tone(740, 0.22, 0.18, 'triangle'));
    once('bell2', t >= 91.2 && t < 92.2, () => this.tone(740, 0.22, 0.18, 'triangle'));
    once('brake_ok', t >= 127.0 && t < 128.0, () => {
      this.tone(261.63, 1.5, 0.12, 'sine');
      this.tone(329.63, 1.5, 0.10, 'sine');
      this.tone(392.00, 1.5, 0.10, 'sine');
    });
  }

  dispose() {
    try { this.droneOsc?.stop(); this.ctx?.close(); } catch {}
    this.ctx = null;
  }
}
