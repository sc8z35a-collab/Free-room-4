/**
 * Chapter 20 Grand Finale Procedural WebAudio Soundscape (`最終章・第20章：五百二十日目の朝、アスファルトを踏みしめて`):
 * - Quiet midnight Room 203 nostalgia -> Dawn birdsong shimmer -> Synchronized side-by-side footsteps (`カツ、トン…`)
 * - Pebble crunch slip (`ジャリッ！！`) & nimble recovery step (`タンッ！`)
 * - Soaring Golden Sunrise Grand Finale Harmonic Progression (C -> G -> Am -> F -> C9!)
 */
export class Ch20AudioEngine {
  constructor() {
    this.ctx = null; this.master = null;
    this.padOsc1 = null; this.padOsc2 = null; this.padGain = null;
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

    this.padOsc1 = this.ctx.createOscillator();
    this.padOsc2 = this.ctx.createOscillator();
    this.padOsc1.type = 'sine'; this.padOsc2.type = 'triangle';
    this.padOsc1.frequency.value = 130.81; this.padOsc2.frequency.value = 196.00;
    this.padGain = this.ctx.createGain(); this.padGain.gain.value = 0;
    this.padOsc1.connect(this.padGain); this.padOsc2.connect(this.padGain);
    this.padGain.connect(this.master);
    this.padOsc1.start(); this.padOsc2.start();
  }

  resume() { this.init(); if (this.ctx?.state === 'suspended') this.ctx.resume().catch(() => {}); this.active = true; }
  pause() { this.active = false; if (this.padGain && this.ctx) this.padGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1); }
  setMuted(m) { this.muted = m; if (this.master && this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.24, this.ctx.currentTime, 0.06); }
  resetForSeek() { this.triggered.clear(); }

  getRecordingStream() {
    if (!this.ctx || !this.master) return null;
    if (!this._recDest) { this._recDest = this.ctx.createMediaStreamDestination(); this.master.connect(this._recDest); }
    return this._recDest.stream;
  }

  tone(freq, dur, vol = 0.14, type = 'sine', endFreq = null) {
    if (!this.ctx || !this.active || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator(); const g = this.ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== null) osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + dur);
    g.gain.setValueAtTime(0.001, now); g.gain.linearRampToValueAtTime(vol, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0008, now + dur);
    osc.connect(g); g.connect(this.master); osc.start(now); osc.stop(now + dur + 0.05);
  }

  update(t) {
    if (!this.ctx || !this.active || this.muted) return;
    const now = this.ctx.currentTime;
    const vol = t >= 78 ? 0.10 : (t >= 24 ? 0.06 : 0.04);
    const f1 = t >= 104 ? 146.83 : (t >= 78 ? 130.81 : 110.0);
    const f2 = t >= 104 ? 220.00 : (t >= 78 ? 196.00 : 164.81);
    this.padOsc1.frequency.setTargetAtTime(f1, now, 0.2);
    this.padOsc2.frequency.setTargetAtTime(f2, now, 0.2);
    this.padGain.gain.setTargetAtTime(vol, now, 0.15);

    const once = (k, cond, fn) => { if (cond && !this.triggered.has(k)) { this.triggered.add(k); fn(); } };
    once('dawn_stand', t >= 34.0 && t < 35.0, () => this.tone(330, 0.35, 0.14, 'sine', 220));
    once('pebble_slip', t >= 66.0 && t < 67.0, () => this.tone(960, 0.16, 0.22, 'sawtooth', 320));
    once('pebble_recover', t >= 67.6 && t < 68.5, () => this.tone(180, 0.14, 0.22, 'triangle', 75));
    once('sunrise_rays', t >= 80.0 && t < 82.0, () => {
      this.tone(261.63, 2.8, 0.12, 'sine');
      this.tone(329.63, 2.8, 0.10, 'sine');
      this.tone(392.00, 2.8, 0.10, 'sine');
      this.tone(523.25, 2.8, 0.09, 'sine');
    });
    once('finale_chord', t >= 132.0 && t < 134.0, () => {
      this.tone(293.66, 3.6, 0.12, 'sine');
      this.tone(369.99, 3.6, 0.10, 'sine');
      this.tone(440.00, 3.6, 0.10, 'sine');
      this.tone(587.33, 3.6, 0.09, 'sine');
      this.tone(659.25, 3.6, 0.07, 'sine');
    });
  }

  dispose() { try { this.padOsc1?.stop(); this.padOsc2?.stop(); this.ctx?.close(); } catch {} this.ctx = null; }
}
