export class Ch11AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.fired = new Set();
    this.recDest = null;
    this.noiseGain = null;
    this.noiseFilter = null;
    this.lastCogIdx = -1;
    this.lastDrumIdx = -1;
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

    // Filtered noise channel for festival sizzle, autumn breeze, marker stroke, and winter night wind!
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    this.noiseFilter = this.ctx.createBiquadFilter();
    this.noiseFilter.type = 'bandpass';
    this.noiseFilter.frequency.value = 900;
    this.noiseFilter.Q.value = 0.7;

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
    this.lastCogIdx = -1;
    this.lastDrumIdx = -1;
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

  tone(freq, dur, type = 'sine', vol = 0.12, delay = 0) {
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

  thud(vol = 0.28, pitch = 110) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, t0);
    osc.frequency.exponentialRampToValueAtTime(38, t0 + 0.15);
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.17);
    osc.connect(g).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + 0.19);
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

    // Ambient layers: Festival yakisoba sizzle (46..62s), winter night wind (120..150s)
    if (t >= 46 && t < 62) {
      this.noiseFilter.frequency.setTargetAtTime(2400, now, 0.08);
      this.noiseGain.gain.setTargetAtTime(0.055, now, 0.12);
    } else if (t >= 122 && t < 150) {
      this.noiseFilter.frequency.setTargetAtTime(480, now, 0.10);
      this.noiseGain.gain.setTargetAtTime(0.026, now, 0.14);
    } else {
      this.noiseGain.gain.setTargetAtTime(0.0, now, 0.08);
    }

    // Distant live band drum pulse during Campus Festival (46..62s)
    if (t >= 46 && t < 62) {
      const dIdx = Math.floor(t / 0.48);
      if (dIdx !== this.lastDrumIdx) {
        this.lastDrumIdx = dIdx;
        this.thud(0.07, dIdx % 2 === 0 ? 85 : 160);
      }
    }

    // Heavy magnetic cogging detents ("ゴリ、ゴリ、ゴリ") when turning bare 80mm motor (110..120s)!
    if (t >= 110 && t < 120) {
      const cIdx = Math.floor(t / 0.55);
      if (cIdx !== this.lastCogIdx) {
        this.lastCogIdx = cIdx;
        this.thud(0.15, 130 + (cIdx % 3) * 14);
        this.tone(240, 0.04, 'sawtooth', 0.05, 0);
      }
    }

    if (t >= 17.5) {
      this.once('tape_extend', () => {
        // Steel tape measure unspooling & locking at 72cm ("シュルシュル…カチッ")!
        for (let i = 0; i < 6; i++) this.tone(820 + i * 95, 0.05, 'triangle', 0.05, i * 0.09);
        this.tone(1680, 0.06, 'square', 0.08, 0.72);
      });
    }
    if (t >= 34.0) {
      this.once('price_shock', () => {
        // Low stark minor chord on seeing ¥720,000+ catalog price
        this.tone(146.83, 2.2, 'sine', 0.10, 0);
        this.tone(174.61, 2.2, 'triangle', 0.08, 0.08);
        this.tone(220.00, 2.2, 'sine', 0.07, 0.16);
      });
    }
    if (t >= 44.5) {
      this.once('tape_snap_retract', () => {
        // Tape snapping back ("パチン！")
        this.tone(1420, 0.05, 'triangle', 0.13, 0);
        this.thud(0.18, 160);
      });
    }
    if (t >= 83.5) {
      this.once('kurata_shoulder_slap', () => {
        // Senior Kurata's hearty shoulder slap ("バンッ！") + warm hopeful major chord!
        this.thud(0.34, 115);
        this.tone(293.66, 2.8, 'sine', 0.09, 0.2);
        this.tone(369.99, 2.8, 'triangle', 0.08, 0.35);
        this.tone(440.00, 3.0, 'sine', 0.09, 0.5);
      });
    }
    if (t >= 104.5) {
      this.once('motor_reveal_chord', () => {
        // Mysterious metallic shimmer for the bare 80mm copper & iron motor reveal!
        this.tone(220.0, 3.2, 'sine', 0.10, 0);
        this.tone(329.63, 3.2, 'triangle', 0.08, 0.25);
        this.tone(493.88, 3.4, 'sine', 0.07, 0.5);
      });
    }
    if (t >= 139.0) {
      this.once('motor_knee_press_chime', () => {
        // Cold iron pressed onto 720mm right knee + crystalline winter window droplet chime!
        this.thud(0.18, 145);
        this.tone(1046.5, 2.2, 'sine', 0.07, 0.4);
        this.tone(261.63, 5.2, 'sine', 0.10, 0.8);
        this.tone(329.63, 5.2, 'triangle', 0.08, 1.0);
        this.tone(392.00, 5.4, 'sine', 0.09, 1.25);
        this.tone(523.25, 5.6, 'sine', 0.08, 1.5);
      });
    }
  }

  dispose() {
    try { this.ctx?.close(); } catch (_) {}
  }
}
