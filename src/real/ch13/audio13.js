/**
 * Chapter 13 Cinema WebAudio Synthesizer (`第13章：オシロスコープの幽霊`)
 * Matches the exact `playerShell.js` audio engine interface.
 */
export class Ch13AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.recDest = null;
    this.muted = false;
    this.fired = new Set();
  }

  init() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.34;
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
    if (this.master) this.master.gain.value = this.muted ? 0 : 0.34;
  }

  resetForSeek() {
    this.fired.clear();
  }

  getRecordingStream() {
    return this.recDest ? this.recDest.stream : null;
  }

  playTone(freq, dur, type = 'sine', vol = 0.22, slideTo = null) {
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

  playNoiseBurst(dur, vol = 0.35, highpass = 1200) {
    if (!this.ctx || this.muted || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      ch[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.32));
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

    // 1. Order button click & gentle solder sizzle
    if (t >= 10.5 && t < 11.5) {
      this.triggerOnce('solder_sizzle', () => this.playNoiseBurst(0.28, 0.14, 3400));
    }
    // 2. Full-bloom spring sakura chord @ t=23s
    if (t >= 23.0 && t < 24.5) {
      this.triggerOnce('sakura_chord', () => {
        this.playTone(587.33, 1.8, 'sine', 0.12);
        setTimeout(() => this.playTone(739.99, 1.8, 'sine', 0.11), 220);
        setTimeout(() => this.playTone(880.0, 2.2, 'sine', 0.10), 440);
      });
    }
    // 3. Sudden Violent Joint #5 & #6 EMI Seizure ("ビクッ！！ ガガッ！") @ t=46.0s
    if (t >= 46.0 && t < 47.2) {
      this.triggerOnce('emi_seizure', () => {
        this.playTone(145, 0.16, 'sawtooth', 0.38, 62);
        this.playNoiseBurst(0.22, 0.36, 900);
        setTimeout(() => {
          this.playTone(190, 0.14, 'square', 0.34, 54);
          this.playNoiseBurst(0.18, 0.30, 1400);
        }, 260);
      });
    }
    // 4. Vintage Oscilloscope Power-On Fan Hum ("ブゥン…") & Ghost Spike Crackle @ t=83.0s
    if (t >= 83.0 && t < 84.5) {
      this.triggerOnce('scope_on', () => {
        this.playTone(96, 1.8, 'triangle', 0.14, 118);
        setTimeout(() => this.playNoiseBurst(0.42, 0.22, 2600), 600);
      });
    }
    // 5. All 12 Muscles Clean Lock-In & Bilateral Haptic Sync Chord @ t=123.0s & t=134.0s
    if (t >= 123.0 && t < 124.5) {
      this.triggerOnce('clean_12_lock', () => {
        this.playTone(523.25, 1.6, 'sine', 0.14);
        setTimeout(() => this.playTone(659.25, 1.8, 'sine', 0.14), 160);
        setTimeout(() => this.playTone(1046.5, 2.2, 'sine', 0.12), 320);
      });
    }
    if (t >= 134.0 && t < 135.5) {
      this.triggerOnce('haptic_mirror', () => {
        this.playTone(440.0, 1.4, 'sine', 0.14, 659.25);
        setTimeout(() => this.playTone(659.25, 1.5, 'sine', 0.14, 880.0), 400);
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
