export class Ch06AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.fired = new Set();
    this.cicadaGain = null;
    this.servoOsc = null;
    this.servoGain = null;
  }

  ensureStarted() {
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

    // Filtered noise channel for August abura-zemi cicada chorus & lecture hall AC
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;

    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 4400;
    bp.Q.value = 3.2;

    this.cicadaGain = this.ctx.createGain();
    this.cicadaGain.gain.value = 0.0;
    noise.connect(bp).connect(this.cicadaGain).connect(this.master);
    noise.start();

    // Continuous servo whine oscillator (modulates for 200Hz hunting & 2A squat strain!)
    this.servoOsc = this.ctx.createOscillator();
    this.servoOsc.type = 'sawtooth';
    this.servoOsc.frequency.value = 260;
    const sFilt = this.ctx.createBiquadFilter();
    sFilt.type = 'lowpass';
    sFilt.frequency.value = 950;
    this.servoGain = this.ctx.createGain();
    this.servoGain.gain.value = 0.0;
    this.servoOsc.connect(sFilt).connect(this.servoGain).connect(this.master);
    this.servoOsc.start();
  }

  init() {
    this.ensureStarted();
    if (this.ctx && !this.recDest && this.ctx.createMediaStreamDestination) {
      this.recDest = this.ctx.createMediaStreamDestination();
      this.master.connect(this.recDest);
    }
  }

  pause() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.cicadaGain?.gain.setTargetAtTime(0, now, 0.04);
    this.servoGain?.gain.setTargetAtTime(0, now, 0.04);
  }

  resetForSeek() {
    this.fired.clear();
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

  resetTriggers() {
    this.fired.clear();
  }

  tone(freq, dur, type = 'sine', vol = 0.14, delay = 0) {
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

  impactThud(vol = 0.38) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(125, t0);
    osc.frequency.exponentialRampToValueAtTime(34, t0 + 0.28);
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.34);
    osc.connect(g).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + 0.36);
  }

  snapCrack(vol = 0.28) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime;
    const len = Math.floor(this.ctx.sampleRate * 0.06);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.22));
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1800;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t0);
    src.connect(hp).connect(g).connect(this.master);
    src.start(t0);
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
      this.cicadaGain?.gain.setTargetAtTime(0, now, 0.05);
      this.servoGain?.gain.setTargetAtTime(0, now, 0.05);
      return;
    }

    // Cicada ambient envelope (loud blazing August summer in 11..26s, soft distant night in 118..150s)
    let cicada = 0;
    if (t >= 11 && t < 26) cicada = 0.075 * (0.85 + 0.15 * Math.sin(t * 11));
    else if (t >= 82 && t < 104) cicada = 0.025;
    else if (t >= 118 && t < 150) cicada = 0.018 * (0.6 + 0.4 * Math.sin(t * 6.5));
    this.cicadaGain.gain.setTargetAtTime(cicada, now, 0.08);

    // Continuous servo whine for Hunting Oscillation (64..73s) & Strained Deep Squat (85..95s)
    if (t >= 64.5 && t < 73.2) {
      const u = (t - 64.5) / 8.7;
      const oscFreq = 240 + Math.abs(Math.sin(t * 14.0)) * (220 + u * 360);
      this.servoOsc.frequency.setTargetAtTime(oscFreq, now, 0.03);
      this.servoGain.gain.setTargetAtTime(0.05 + u * 0.09, now, 0.04);
    } else if (t >= 85.0 && t < 95.5) {
      const u = (t - 85.0) / 10.5;
      this.servoOsc.frequency.setTargetAtTime(175 + u * 55, now, 0.05);
      this.servoGain.gain.setTargetAtTime(0.065, now, 0.05);
    } else {
      this.servoGain.gain.setTargetAtTime(0.0, now, 0.06);
    }

    // Event cues synced tightly to director06.js timeline!
    if (t >= 9.2) {
      this.once('exam_chime', () => {
        // Classic Japanese university bell chime (Day 108 14:40!)
        this.tone(523.25, 0.7, 'sine', 0.13, 0.0);
        this.tone(659.25, 0.7, 'sine', 0.13, 0.35);
        this.tone(587.33, 0.7, 'sine', 0.13, 0.70);
        this.tone(392.00, 1.1, 'sine', 0.14, 1.05);
      });
    }
    if (t >= 15.0) {
      this.once('order_click', () => {
        this.tone(880, 0.12, 'sine', 0.12, 0);
        this.tone(1318.5, 0.25, 'sine', 0.13, 0.09);
      });
    }
    if (t >= 39.2) {
      this.once('hero_reveal', () => {
        // Warm inspiring triad when 380mm HMD-01 Rev 1.0 stands!
        this.tone(261.63, 2.2, 'triangle', 0.11, 0);
        this.tone(329.63, 2.2, 'triangle', 0.10, 0.08);
        this.tone(392.00, 2.4, 'sine', 0.11, 0.16);
      });
    }
    if (t >= 48.2) {
      this.once('scale_warn', () => {
        // Cold ominous low warning tone on "1,942 g"
        this.tone(146.83, 1.4, 'sawtooth', 0.06, 0);
        this.tone(138.59, 1.4, 'sine', 0.09, 0.22);
      });
    }
    if (t >= 56.5) {
      this.once('boot_pipo', () => {
        // "ピポッ！" 16-DOF startup beep!
        this.tone(1760, 0.09, 'square', 0.08, 0);
        this.tone(2349, 0.14, 'square', 0.09, 0.09);
      });
    }
    if (t >= 73.1) {
      this.once('faceplant_crash', () => {
        // "ドゴォンッ！！" Faceplant into 20mm EVA mat + plastic chin crack!
        this.impactThud(0.45);
        this.snapCrack(0.32);
      });
    }
    if (t >= 95.5) {
      this.once('wire_snap', () => {
        // "ブチッ！！" Right-hip scissor pinch snaps DATA wire!
        this.snapCrack(0.36);
        this.tone(1400, 0.07, 'sawtooth', 0.12, 0.02);
      });
    }
    if (t >= 98.2) {
      this.once('corkscrew_fall', () => {
        this.impactThud(0.38);
      });
    }
    if (t >= 106.0) {
      this.once('heat_alert', () => {
        // 63°C thermal alarm double beep
        this.tone(980, 0.14, 'square', 0.07, 0);
        this.tone(980, 0.14, 'square', 0.07, 0.22);
      });
    }
    if (t >= 134.0) {
      this.once('rev15_resolve', () => {
        // Calm midnight epiphany chord
        this.tone(293.66, 2.8, 'sine', 0.09, 0);
        this.tone(369.99, 2.8, 'sine', 0.08, 0.12);
        this.tone(440.00, 3.0, 'sine', 0.09, 0.24);
      });
    }
    if (t >= 143.5) {
      this.once('pa09_click', () => {
        // Crisp metallic ratchet click of PA-09 ("カチリ！")
        this.snapCrack(0.26);
        this.tone(2200, 0.05, 'triangle', 0.12, 0.01);
        this.tone(523.25, 3.5, 'sine', 0.10, 0.45);
        this.tone(659.25, 3.5, 'sine', 0.09, 0.60);
      });
    }
  }

  dispose() {
    try {
      this.servoOsc?.stop();
      this.ctx?.close();
    } catch (_) {}
  }
}
