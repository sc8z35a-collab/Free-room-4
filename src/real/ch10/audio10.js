export class Ch10AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.fired = new Set();
    this.recDest = null;
    this.noiseGain = null;
    this.noiseFilter = null;
    this.lastFootIdx = -1;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.42;
    this.master.connect(this.ctx.destination);

    if (this.ctx.createMediaStreamDestination) {
      this.recDest = this.ctx.createMediaStreamDestination();
      this.master.connect(this.recDest);
    }

    // Filtered noise channel for November wind, Tokyo Bay sea breeze, hall applause swell, and pencil scratch!
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    this.noiseFilter = this.ctx.createBiquadFilter();
    this.noiseFilter.type = 'bandpass';
    this.noiseFilter.frequency.value = 600;
    this.noiseFilter.Q.value = 0.8;

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.value = 0.0;
    src.connect(this.noiseFilter).connect(this.noiseGain).connect(this.master);
    src.start();
  }

  pause() {
    if (!this.ctx) return;
    this.noiseGain?.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
  }

  resetForSeek() {
    this.fired.clear();
    this.lastFootIdx = -1;
  }

  getRecordingStream() {
    return this.recDest ? this.recDest.stream : null;
  }

  setMuted(m) {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : 0.42, this.ctx.currentTime, 0.04);
    }
  }

  tone(freq, dur, type = 'sine', vol = 0.13, delay = 0) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  thud(vol = 0.30, pitch = 120) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, t0);
    osc.frequency.exponentialRampToValueAtTime(40, t0 + 0.16);
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
    osc.connect(g).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + 0.20);
  }

  once(key, fn) {
    if (this.fired.has(key)) return;
    this.fired.add(key);
    fn();
  }

  update(t, playing) {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    if (!playing) {
      this.pause();
      return;
    }

    // Dynamic ambient noise: Nov wind (15..29s), warm thundering applause (79..87s), QDD silent air glide!
    if (t >= 15 && t < 29) {
      this.noiseFilter.frequency.setTargetAtTime(420, now, 0.08);
      this.noiseGain.gain.setTargetAtTime(0.032, now, 0.12);
    } else if (t >= 79.2 && t < 87.5) {
      this.noiseFilter.frequency.setTargetAtTime(1400, now, 0.05);
      this.noiseGain.gain.setTargetAtTime(0.11, now, 0.14);
    } else if (t >= 115 && t < 121.5) {
      this.noiseFilter.frequency.setTargetAtTime(1250, now, 0.05);
      this.noiseGain.gain.setTargetAtTime(0.075, now, 0.12);
    } else {
      this.noiseGain.gain.setTargetAtTime(0.0, now, 0.08);
    }

    // Crisp 34-step 9.12s autonomous sprint footfalls ("タタッ、タタッ……！！") during Cut 07 (68.5..78.5s)!
    if (t >= 68.5 && t < 78.6) {
      const idx = Math.floor(t / 0.295);
      if (idx !== this.lastFootIdx) {
        this.lastFootIdx = idx;
        this.thud(0.14, idx % 2 === 0 ? 195 : 178);
      }
    }

    if (t >= 14.5) {
      this.once('case_latch', () => {
        // Twin hard-case silver latches snapping shut ("パチン、パチン")!
        this.tone(1120, 0.05, 'triangle', 0.14, 0);
        this.tone(1340, 0.05, 'triangle', 0.14, 0.22);
      });
    }
    if (t >= 54.0) {
      this.once('referee_whistle', () => {
        // Piercing referee start whistle ("ピィィッ！！")!
        this.tone(2790, 0.55, 'sine', 0.13, 0);
        this.tone(2860, 0.52, 'triangle', 0.06, 0.02);
      });
    }
    if (t >= 60.5) {
      this.once('heel_slip', () => {
        // 2mm waxed-floor heel slip ("ツルッ") + crisp rubber bite recovery!
        this.tone(1620, 0.12, 'sawtooth', 0.06, 0);
        this.thud(0.16, 155);
      });
    }
    if (t >= 78.8) {
      this.once('goal_912_clear', () => {
        // Official stopwatch freeze + triumphant bright D-major applause chord!
        this.tone(2093, 0.16, 'sine', 0.12, 0);
        this.tone(293.66, 3.6, 'sine', 0.10, 0.25);
        this.tone(369.99, 3.6, 'triangle', 0.09, 0.40);
        this.tone(440.00, 3.8, 'sine', 0.10, 0.55);
        this.tone(587.33, 4.0, 'sine', 0.08, 0.70);
      });
    }
    if (t >= 94.8) {
      this.once('knee_gear_shatter', () => {
        // Shocking internal metallic gear fracture ("パキィンッ、ギャリリッ！！")!
        this.thud(0.36, 92);
        this.tone(1980, 0.14, 'sawtooth', 0.14, 0.0);
        for (let i = 0; i < 6; i++) {
          this.tone(920 + (i % 3) * 340, 0.045, 'sawtooth', 0.11, 0.08 + i * 0.06);
        }
      });
    }
    if (t >= 109.2) {
      this.once('sakakibara_shove_reflex', () => {
        // Heavy adult hand shove ("ドンッ！") -> silent tendon-like whoosh -> lightning cross-step ("タン、タッ！！")!
        this.thud(0.38, 82);
        this.tone(360, 0.22, 'sine', 0.08, 0.08);
        setTimeout(() => this.thud(0.22, 165), 320);
        setTimeout(() => this.thud(0.24, 190), 540);
      });
    }
    if (t >= 125.0) {
      this.once('qdd_feather_spin', () => {
        // Crystalline harmonic shimmer as spare silver QDD disc spins like ice!
        this.tone(523.25, 1.4, 'sine', 0.08, 0);
        this.tone(659.25, 1.6, 'sine', 0.07, 0.14);
        this.tone(1046.5, 1.8, 'sine', 0.06, 0.28);
      });
    }
    if (t >= 142.0) {
      this.once('hmd02_part1_finale', () => {
        // Grand Part I Finale ("第一部・完 — HMD-02") luminous orchestral swell!
        this.tone(261.63, 6.2, 'sine', 0.11, 0);
        this.tone(329.63, 6.2, 'triangle', 0.09, 0.25);
        this.tone(392.00, 6.4, 'sine', 0.10, 0.50);
        this.tone(523.25, 6.8, 'sine', 0.09, 0.80);
        this.tone(659.25, 6.8, 'sine', 0.07, 1.15);
      });
    }
  }

  dispose() {
    try {
      this.ctx?.close();
    } catch (_) {}
  }
}
