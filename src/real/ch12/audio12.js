/**
 * Chapter 12 Cinema WebAudio Synthesizer (`第12章：聖夜の閃光と、柔らかい鉄`)
 * Matches the exact `Ch11AudioEngine` interface for `playerShell.js` recording & mute/seek hooks.
 */
export class Ch12AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.recDest = null;
    this.muted = false;
    this.fired = new Set();
    this.lastTickSec = -1;
  }

  init() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.36;
      this.master.connect(this.ctx.destination);
      try {
        this.recDest = this.ctx.createMediaStreamDestination();
        this.master.connect(this.recDest);
      } catch {
        this.recDest = null;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  pause() {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  setMuted(m) {
    this.muted = !!m;
    if (this.master) this.master.gain.value = this.muted ? 0 : 0.36;
  }

  resetForSeek() {
    this.fired.clear();
    this.lastTickSec = -1;
  }

  getRecordingStream() {
    return this.recDest ? this.recDest.stream : null;
  }

  playTone(freq, dur, type = 'sine', vol = 0.25, slideTo = null) {
    if (!this.ctx || this.muted || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, now + dur);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(g).connect(this.master);
    osc.start(now);
    osc.stop(now + dur + 0.03);
  }

  playNoiseBurst(dur, vol = 0.5, highpass = 220) {
    if (!this.ctx || this.muted || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      ch[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.28));
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const flt = this.ctx.createBiquadFilter();
    flt.type = 'highpass';
    flt.frequency.value = highpass;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    src.connect(flt).connect(g).connect(this.master);
    src.start(now);
  }

  triggerOnce(key, fn) {
    if (this.fired.has(key)) return;
    this.fired.add(key);
    fn();
  }

  update(t, isPlaying) {
    if (!isPlaying || !this.ctx || this.ctx.state !== 'running') return;

    if (t >= 19.0 && t < 20.5) {
      this.triggerOnce('xmas_bell', () => {
        this.playTone(1046.5, 1.4, 'sine', 0.11);
        setTimeout(() => this.playTone(1318.5, 1.4, 'sine', 0.09), 180);
        setTimeout(() => this.playTone(1568.0, 1.8, 'sine', 0.08), 360);
      });
    }
    if (t >= 44.0 && t < 45.2) {
      this.triggerOnce('psu_on', () => this.playTone(880, 0.14, 'triangle', 0.16));
    }
    if (t >= 52.2 && t < 53.5) {
      this.triggerOnce('shoot_through_bang', () => {
        this.playTone(150, 0.45, 'sawtooth', 0.55, 28);
        this.playNoiseBurst(0.68, 0.72, 120);
        setTimeout(() => this.playNoiseBurst(0.32, 0.24, 2400), 120);
      });
    }
    if (t >= 57.8 && t < 58.8) {
      this.triggerOnce('estop_thunk', () => {
        this.playTone(120, 0.12, 'square', 0.32, 48);
        this.playNoiseBurst(0.08, 0.22, 600);
      });
    }
    if (t >= 96.5 && t < 98.0) {
      this.triggerOnce('joya_bell', () => {
        this.playTone(110.0, 4.2, 'sine', 0.34);
        this.playTone(221.4, 3.2, 'sine', 0.16);
        this.playTone(334.0, 2.4, 'triangle', 0.08);
      });
    }
    if (t >= 98.0 && t <= 112.0) {
      const sec = Math.floor(t);
      if (sec !== this.lastTickSec) {
        this.lastTickSec = sec;
        this.playNoiseBurst(0.025, 0.16, 3200);
        this.playTone(sec % 2 === 0 ? 1950 : 1720, 0.022, 'triangle', 0.09);
      }
    }
    if (t >= 120.0 && t < 121.2) {
      this.triggerOnce('joint1_safe_on', () => {
        this.playTone(659.25, 0.22, 'sine', 0.14);
        setTimeout(() => this.playTone(987.77, 0.35, 'sine', 0.14), 140);
      });
    }
    if (t >= 128.0 && t < 129.5) {
      this.triggerOnce('fuwa_chime', () => {
        this.playTone(523.25, 1.6, 'sine', 0.16);
        setTimeout(() => this.playTone(659.25, 1.8, 'sine', 0.15), 220);
        setTimeout(() => this.playTone(783.99, 2.2, 'sine', 0.14), 460);
      });
    }
    if (t >= 140.5 && t < 141.6) {
      this.triggerOnce('fist_slam', () => {
        this.playTone(95, 0.18, 'triangle', 0.42, 36);
        setTimeout(() => this.playTone(280, 0.48, 'sine', 0.18, 420), 90);
      });
    }
    if (t >= 147.2 && t < 148.5) {
      this.triggerOnce('emi_tease', () => {
        this.playNoiseBurst(0.26, 0.12, 4200);
        this.playTone(1420, 0.32, 'sawtooth', 0.05, 840);
      });
    }
  }

  dispose() {
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}
