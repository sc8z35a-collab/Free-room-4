export class Ch07AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.fired = new Set();
    this.recDest = null;
    this.fanGain = null;
    this.servoOsc = null;
    this.servoGain = null;
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

    // Soft filament dryer & Bambu fan air hum
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 420;
    this.fanGain = this.ctx.createGain();
    this.fanGain.gain.value = 0.0;
    src.connect(lp).connect(this.fanGain).connect(this.master);
    src.start();

    // Silky cycloid servo whisper oscillator
    this.servoOsc = this.ctx.createOscillator();
    this.servoOsc.type = 'triangle';
    this.servoOsc.frequency.value = 320;
    const sFilt = this.ctx.createBiquadFilter();
    sFilt.type = 'bandpass';
    sFilt.frequency.value = 680;
    sFilt.Q.value = 1.6;
    this.servoGain = this.ctx.createGain();
    this.servoGain.gain.value = 0.0;
    this.servoOsc.connect(sFilt).connect(this.servoGain).connect(this.master);
    this.servoOsc.start();
  }

  pause() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.fanGain?.gain.setTargetAtTime(0, now, 0.05);
    this.servoGain?.gain.setTargetAtTime(0, now, 0.05);
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

  tone(freq, dur, type = 'sine', vol = 0.13, delay = 0) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.014);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  softStep(vol = 0.18) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, t0);
    osc.frequency.exponentialRampToValueAtTime(42, t0 + 0.11);
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.13);
    osc.connect(g).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + 0.15);
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

    // Gentle dryer fan ambience during Scene 1 (0..34s)
    this.fanGain.gain.setTargetAtTime(t < 34 ? 0.032 : 0.006, now, 0.12);

    // Silky servo whisper during 4-step walk (82..106s)
    if (t >= 82 && t < 106) {
      const f = 290 + Math.abs(Math.sin(t * 2.2)) * 180;
      this.servoOsc.frequency.setTargetAtTime(f, now, 0.05);
      this.servoGain.gain.setTargetAtTime(0.042, now, 0.06);
    } else {
      this.servoGain.gain.setTargetAtTime(0.0, now, 0.06);
    }

    if (t >= 2.2) {
      this.once('line_ping', () => {
        this.tone(1046.5, 0.12, 'sine', 0.10, 0);
        this.tone(1318.5, 0.18, 'sine', 0.11, 0.09);
      });
    }
    if (t >= 25.5) {
      this.once('scale_pass', () => {
        // Joyful emerald PASS triad on 1,762 g!
        this.tone(523.25, 0.6, 'sine', 0.11, 0);
        this.tone(659.25, 0.7, 'sine', 0.11, 0.10);
        this.tone(783.99, 1.0, 'sine', 0.12, 0.20);
      });
    }
    if (t >= 49.5) {
      this.once('pd_poke', () => {
        // Short damped viscous servo "shh" on finger poke!
        this.tone(420, 0.16, 'triangle', 0.09, 0);
        this.tone(310, 0.22, 'sine', 0.08, 0.08);
      });
    }
    if (t >= 64.5) {
      this.once('toe_scrape', () => {
        this.softStep(0.24);
        this.tone(160, 0.18, 'sawtooth', 0.06, 0.04);
      });
    }
    if (t >= 76.0) {
      this.once('ota_ok', () => {
        this.tone(880, 0.12, 'sine', 0.10, 0);
        this.tone(1174.6, 0.24, 'sine', 0.11, 0.10);
      });
    }
    // 4 Silent Cat-Paw Footfalls during the 03:12 AM Historic Walk!
    if (t >= 90.5) this.once('step_1', () => this.softStep(0.16));
    if (t >= 96.5) this.once('step_2', () => this.softStep(0.16));
    if (t >= 101.0) this.once('step_3', () => this.softStep(0.16));
    if (t >= 105.5) {
      this.once('step_4_triumph', () => {
        this.softStep(0.18);
        // Deep emotional warm midnight chord ("146日目の16センチ")!
        this.tone(261.63, 3.8, 'sine', 0.11, 0.35);
        this.tone(329.63, 3.8, 'sine', 0.10, 0.50);
        this.tone(392.00, 4.0, 'sine', 0.11, 0.65);
        this.tone(523.25, 4.2, 'triangle', 0.09, 0.85);
      });
    }
    if (t >= 123.5) {
      this.once('thermal_75c_alarm', () => {
        // Piezo "ピピピピッ！" 75°C Thermal Shutdown Alarm!
        for (let i = 0; i < 4; i++) {
          this.tone(2450, 0.09, 'square', 0.10, i * 0.13);
        }
        setTimeout(() => this.softStep(0.32), 620);
      });
    }
    if (t >= 141.5) {
      this.once('zmp_horizon', () => {
        // Crisp early-September hopeful chord toward Chapter 8 ZMP!
        this.tone(293.66, 3.6, 'sine', 0.10, 0);
        this.tone(369.99, 3.6, 'sine', 0.09, 0.14);
        this.tone(440.00, 3.8, 'sine', 0.10, 0.28);
        this.tone(587.33, 4.0, 'triangle', 0.08, 0.45);
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
