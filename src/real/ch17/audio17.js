/**
 * Chapter 17 Procedural WebAudio Engine (`第17章：身体の声を聴く夏 —— 7.62キロの初起立`):
 * - Chirp sine sweep (`1Hz -> 50Hz`), sizzling yakiniku grill warmth, summer crickets
 * - Calm sword-master servo breath (`シュン、クッ`), triumphant harmonic chord on `7.62 kg` U-slack stand!
 * - Four heavy dignified barefoot footsteps (`トン…トン…トン…トン`), and eerie `28.4 V` over-voltage ping!
 */
export class Ch17AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.droneOsc = null;
    this.droneGain = null;
    this.noiseNode = null;
    this.noiseGain = null;
    this.muted = false;
    this.active = false;
    this.triggered = new Set();
    this._recDest = null;
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
    this.droneOsc.type = 'sine';
    this.droneOsc.frequency.value = 98;
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.value = 0.0;
    this.droneOsc.connect(this.droneGain);
    this.droneGain.connect(this.master);
    this.droneOsc.start();

    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.22;
    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buf;
    this.noiseNode.loop = true;
    const flt = this.ctx.createBiquadFilter();
    flt.type = 'bandpass'; flt.frequency.value = 1800;
    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.value = 0.0;
    this.noiseNode.connect(flt);
    flt.connect(this.noiseGain);
    this.noiseGain.connect(this.master);
    this.noiseNode.start();
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    this.active = true;
  }

  pause() {
    this.active = false;
    if (this.droneGain && this.ctx) this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
    if (this.noiseGain && this.ctx) this.noiseGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
  }

  setMuted(m) {
    this.muted = m;
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.24, this.ctx.currentTime, 0.06);
  }

  resetForSeek() {
    this.triggered.clear();
  }

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
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== null) osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + dur);
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0008, now + dur);
    osc.connect(g); g.connect(this.master);
    osc.start(now); osc.stop(now + dur + 0.04);
  }

  update(t) {
    if (!this.ctx || !this.active || this.muted) return;
    const now = this.ctx.currentTime;
    let droneF = 98, droneV = 0.05, noiseV = 0.02;
    if (t >= 10 && t < 19) {
      droneF = 110 + ((t - 10) / 9) * 320; // Chirp sweep!
      droneV = 0.09;
    } else if (t >= 57 && t < 69) {
      noiseV = 0.09; // Yakiniku sizzle!
      droneV = 0.03;
    } else if (t >= 88 && t < 128) {
      droneF = 130.81; // Warm C3 resonance of standing miracle!
      droneV = 0.10;
    }
    this.droneOsc.frequency.setTargetAtTime(droneF, now, 0.06);
    this.droneGain.gain.setTargetAtTime(droneV, now, 0.08);
    this.noiseGain.gain.setTargetAtTime(noiseV, now, 0.08);

    const once = (k, cond, fn) => {
      if (cond && !this.triggered.has(k)) { this.triggered.add(k); fn(); }
    };

    once('slip', t >= 7.2 && t < 8.0, () => this.tone(420, 0.18, 0.15, 'triangle', 680));
    once('stand_breath', t >= 88.2 && t < 89.0, () => this.tone(320, 0.32, 0.16, 'sine', 196));
    once('stand_miracle', t >= 91.0 && t < 92.5, () => {
      this.tone(261.63, 2.2, 0.13, 'sine');
      this.tone(329.63, 2.2, 0.11, 'sine');
      this.tone(392.00, 2.2, 0.11, 'sine');
      this.tone(523.25, 2.2, 0.08, 'sine');
    });
    for (let s = 0; s < 4; s++) {
      const ts = 116.5 + s * 2.4;
      once(`step_${s}`, t >= ts && t < ts + 0.5, () => this.tone(92, 0.18, 0.24, 'triangle', 42));
    }
    once('spike_28_4v', t >= 133.0 && t < 134.5, () => this.tone(1320, 0.35, 0.16, 'sawtooth', 880));
  }

  dispose() {
    try {
      this.droneOsc?.stop();
      this.noiseNode?.stop();
      this.ctx?.close();
    } catch {}
    this.ctx = null;
  }
}
