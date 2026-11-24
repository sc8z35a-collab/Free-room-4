export class Ch09AudioEngine {
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

    // Filtered noise channel for overhead express train rumble, October cold rain, and hand-filing!
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    this.noiseFilter = this.ctx.createBiquadFilter();
    this.noiseFilter.type = 'bandpass';
    this.noiseFilter.frequency.value = 300;
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

  thud(vol = 0.34, pitch = 110) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, t0);
    osc.frequency.exponentialRampToValueAtTime(36, t0 + 0.18);
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
    osc.connect(g).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + 0.24);
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

    // Dynamic ambient noise: train rumble (40..49s, 102..108s), cold rain (56..63s), hand-file "シュッ、シュッ" (86..96s)!
    if ((t >= 40 && t < 49) || (t >= 102 && t < 109)) {
      this.noiseFilter.frequency.setTargetAtTime(160, now, 0.05);
      this.noiseGain.gain.setTargetAtTime(0.11, now, 0.12);
    } else if (t >= 56 && t < 64) {
      this.noiseFilter.frequency.setTargetAtTime(2200, now, 0.05);
      this.noiseGain.gain.setTargetAtTime(0.045, now, 0.1);
    } else if (t >= 86 && t < 96) {
      this.noiseFilter.frequency.setTargetAtTime(1750, now, 0.04);
      const rasp = 0.012 + Math.max(0, Math.sin(t * 14.0)) * 0.048;
      this.noiseGain.gain.setTargetAtTime(rasp, now, 0.03);
    } else {
      this.noiseGain.gain.setTargetAtTime(0.0, now, 0.08);
    }

    // Rapid 9.48s sprint footfalls ("タタッ、タタッ……！！") during Cut 11 (124..138s)!
    if (t >= 124.2 && t < 138.2) {
      const idx = Math.floor(t / 0.34);
      if (idx !== this.lastFootIdx) {
        this.lastFootIdx = idx;
        this.thud(0.16, idx % 2 === 0 ? 180 : 162);
      }
    }

    if (t >= 20.5) this.once('hard_crash1', () => this.thud(0.32, 130));
    if (t >= 26.8) this.once('wood_boom', () => this.thud(0.45, 72)); // Heavy wooden floorboard thud!
    if (t >= 29.3) {
      this.once('iron_knock', () => {
        // Three polite yet firm knocks on thin iron apartment door ("コン、コン、コン")!
        for (let k = 0; k < 3; k++) {
          this.tone(240, 0.08, 'triangle', 0.18, k * 0.28);
          this.tone(420, 0.05, 'sine', 0.10, k * 0.28);
        }
      });
    }
    if (t >= 54.5) {
      this.once('gear_strip', () => {
        // Stripped metal gear empty rattle ("ガリッ…カラカラカラッ！！")!
        for (let i = 0; i < 8; i++) {
          this.tone(820 + (i % 3) * 260, 0.045, 'sawtooth', 0.11, i * 0.075);
        }
      });
    }
    if (t >= 73.2) {
      this.once('interphone', () => {
        // Morning apartment interphone ("ピンポーン")!
        this.tone(659.25, 0.45, 'sine', 0.14, 0);
        this.tone(523.25, 0.85, 'sine', 0.14, 0.36);
      });
    }
    if (t >= 77.5) {
      this.once('mom_memo_warm', () => {
        // Warm nostalgic chord for Mom's handwritten note & 4th-grade alarm clock!
        this.tone(261.63, 3.2, 'sine', 0.09, 0);
        this.tone(329.63, 3.2, 'sine', 0.08, 0.16);
        this.tone(392.00, 3.4, 'triangle', 0.08, 0.32);
      });
    }
    if (t >= 97.5) {
      this.once('scale_1784_pass', () => {
        this.tone(587.33, 0.5, 'sine', 0.10, 0);
        this.tone(880.00, 0.8, 'sine', 0.11, 0.12);
      });
    }
    if (t >= 104.2) {
      this.once('catenary_spark', () => {
        // Electric blue overhead catenary spark zap!
        this.tone(1850, 0.09, 'sawtooth', 0.11, 0);
        this.tone(1320, 0.11, 'square', 0.08, 0.06);
      });
    }
    if (t >= 121.0) {
      this.once('getup_success', () => {
        // Triumphant autonomous stand-up chord ("……立った……！")
        this.tone(329.63, 1.8, 'sine', 0.10, 0);
        this.tone(440.00, 2.0, 'triangle', 0.10, 0.12);
        this.tone(659.25, 2.2, 'sine', 0.10, 0.24);
      });
    }
    if (t >= 138.2) {
      this.once('sprint_948_finale', () => {
        // Stopwatch freeze beep + deep emotional forehead-to-silver-shoulder chord!
        this.tone(2093, 0.14, 'sine', 0.11, 0);
        this.tone(293.66, 4.8, 'sine', 0.10, 0.45);
        this.tone(369.99, 4.8, 'sine', 0.09, 0.65);
        this.tone(440.00, 5.2, 'triangle', 0.10, 0.85);
        this.tone(587.33, 5.5, 'sine', 0.08, 1.10);
      });
    }
  }

  dispose() {
    try {
      this.ctx?.close();
    } catch (_) {}
  }
}
