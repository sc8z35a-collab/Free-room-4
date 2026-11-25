/**
 * Chapter 19 Procedural WebAudio Soundscape (`第19章：外乱への反射 ——「生き物」になった瞬間`):
 * - Late-summer night crickets under viaduct, natural 16-DOF stride (`タン、タン、タン`)
 * - Minato's resolute cheek slap, full-weight palm shove (`ドンッ！！`)
 * - Crisp rubber cross-step scuff (`キュッ！！ タンッ——タッ！！`) + soaring emotional string-pad chord!
 * - Late-night smartphone notification chimes (Tadokoro rapid-fire buzz + Sakakibara quiet chime)!
 */
export class Ch19AudioEngine {
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
    this.droneOsc.type = 'sine'; this.droneOsc.frequency.value = 110;
    this.droneGain = this.ctx.createGain(); this.droneGain.gain.value = 0;
    this.droneOsc.connect(this.droneGain); this.droneGain.connect(this.master);
    this.droneOsc.start();
  }

  resume() { this.init(); if (this.ctx?.state === 'suspended') this.ctx.resume().catch(() => {}); this.active = true; }
  pause() { this.active = false; if (this.droneGain && this.ctx) this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08); }
  setMuted(m) { this.muted = m; if (this.master && this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.24, this.ctx.currentTime, 0.06); }
  resetForSeek() { this.triggered.clear(); }

  getRecordingStream() {
    if (!this.ctx || !this.master) return null;
    if (!this._recDest) { this._recDest = this.ctx.createMediaStreamDestination(); this.master.connect(this._recDest); }
    return this._recDest.stream;
  }

  tone(freq, dur, vol = 0.16, type = 'sine', endFreq = null) {
    if (!this.ctx || !this.active || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator(); const g = this.ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== null) osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + dur);
    g.gain.setValueAtTime(0.001, now); g.gain.linearRampToValueAtTime(vol, now + 0.014);
    g.gain.exponentialRampToValueAtTime(0.0008, now + dur);
    osc.connect(g); g.connect(this.master); osc.start(now); osc.stop(now + dur + 0.04);
  }

  update(t) {
    if (!this.ctx || !this.active || this.muted) return;
    const now = this.ctx.currentTime;
    this.droneOsc.frequency.setTargetAtTime(t >= 95 ? 146.83 : 98.0, now, 0.1);
    this.droneGain.gain.setTargetAtTime(t >= 95 ? 0.09 : 0.04, now, 0.1);

    const once = (k, cond, fn) => { if (cond && !this.triggered.has(k)) { this.triggered.add(k); fn(); } };
    once('slap', t >= 79.0 && t < 80.0, () => this.tone(360, 0.08, 0.22, 'triangle', 120));
    once('palm_shove', t >= 92.5 && t < 93.5, () => this.tone(110, 0.26, 0.32, 'sawtooth', 42));
    once('scuff_cross', t >= 95.0 && t < 96.0, () => this.tone(1280, 0.14, 0.20, 'triangle', 480));
    once('living_chord', t >= 100.0 && t < 101.5, () => {
      this.tone(293.66, 2.4, 0.12, 'sine');
      this.tone(369.99, 2.4, 0.10, 'sine');
      this.tone(440.00, 2.4, 0.10, 'sine');
      this.tone(587.33, 2.4, 0.08, 'sine');
    });
    once('tadokoro_msg', t >= 125.0 && t < 126.0, () => this.tone(880, 0.12, 0.15, 'sine', 1174));
    once('sakakibara_mail', t >= 134.0 && t < 135.0, () => this.tone(587.33, 0.55, 0.16, 'sine', 880));
  }

  dispose() { try { this.droneOsc?.stop(); this.ctx?.close(); } catch {} this.ctx = null; }
}
