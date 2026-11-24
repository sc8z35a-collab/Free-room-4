export class Ch08AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.fired = new Set();
    this.recDest = null;
    this.lastFootstepIdx = -1;
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
  }

  pause() {
    // One-shot percussive/tonal cues stop naturally
  }

  resetForSeek() {
    this.fired.clear();
    this.lastFootstepIdx = -1;
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

  crispFootstep(vol = 0.20, pitch = 155) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, t0);
    osc.frequency.exponentialRampToValueAtTime(52, t0 + 0.075);
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.085);
    osc.connect(g).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + 0.10);
  }

  once(key, fn) {
    if (this.fired.has(key)) return;
    this.fired.add(key);
    fn();
  }

  update(t, playing) {
    if (!this.ctx || !this.master || !playing) return;

    // Snappy 0.45s rhythmic footfalls ("タッ、タッ、タッ……！") during Cut 2A (28.5..34.8s) and Scene 4 (82.5..107.0s)!
    if ((t >= 28.5 && t < 34.4) || (t >= 82.5 && t < 107.2)) {
      const idx = Math.floor(t / 0.45);
      if (idx !== this.lastFootstepIdx) {
        this.lastFootstepIdx = idx;
        this.crispFootstep(0.18, idx % 2 === 0 ? 165 : 148);
      }
    }

    if (t >= 13.5) {
      this.once('lipm_eureka', () => {
        this.tone(440, 1.4, 'sine', 0.10, 0);
        this.tone(554.37, 1.4, 'sine', 0.09, 0.12);
        this.tone(659.25, 1.6, 'triangle', 0.10, 0.24);
      });
    }
    if (t >= 34.8) {
      this.once('step4_trip', () => {
        // Glitch freeze + faceplant thud ("ガクンッ！")
        this.tone(180, 0.18, 'sawtooth', 0.11, 0);
        this.crispFootstep(0.42, 95);
      });
    }
    if (t >= 48.2) {
      this.once('pulseview_crime', () => {
        // Dramatic alert chord when 13.8ms Wi-Fi freeze gap appears!
        this.tone(220, 0.9, 'sawtooth', 0.07, 0);
        this.tone(207.65, 1.1, 'sine', 0.09, 0.14);
      });
    }
    if (t >= 69.5) {
      this.once('crystal_11us', () => {
        // Pure crystalline precision chord for ±11μs FreeRTOS Core 1 lock!
        this.tone(587.33, 1.5, 'sine', 0.10, 0);
        this.tone(880.00, 1.8, 'sine', 0.10, 0.12);
        this.tone(1174.66, 2.0, 'triangle', 0.08, 0.24);
      });
    }
    if (t >= 107.5) {
      this.once('finish_2m', () => {
        // Triumphant 2.0m 15.2s finish fanfare!
        this.tone(523.25, 1.4, 'triangle', 0.11, 0);
        this.tone(659.25, 1.6, 'triangle', 0.11, 0.12);
        this.tone(783.99, 2.2, 'sine', 0.12, 0.24);
      });
    }
    if (t >= 111.5) {
      this.once('ir_laser_beep', () => {
        // Non-contact IR thermometer crisp measurement beep ("ピッ！ 48.0°C")
        this.tone(2640, 0.09, 'sine', 0.11, 0);
        this.tone(2640, 0.12, 'sine', 0.11, 0.14);
      });
    }
    if (t >= 123.5) {
      this.once('poster_heartbeat', () => {
        // Dramatic low heartbeat thump ("ドクン") at tournament poster!
        this.crispFootstep(0.36, 78);
        setTimeout(() => this.crispFootstep(0.24, 68), 220);
      });
    }
    if (t >= 137.0) {
      this.once('entry_confirmed', () => {
        // Crisp entry click + soaring heroic final chord!
        this.tone(1046.5, 0.14, 'sine', 0.11, 0);
        this.tone(293.66, 4.2, 'sine', 0.11, 0.25);
        this.tone(440.00, 4.2, 'triangle', 0.10, 0.42);
        this.tone(587.33, 4.5, 'sine', 0.11, 0.60);
      });
    }
  }

  dispose() {
    try {
      this.ctx?.close();
    } catch (_) {}
  }
}
