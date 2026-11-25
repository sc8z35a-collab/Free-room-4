/**
 * Chapter 14 Cinema WebAudio Synthesizer (`第14章：黒い金属と炭素の骨格`)
 * - 4AM CAD alert beep -> relief chord
 * - Rainy midnight pull-tab pop (`カシュッ`) of warm canned coffee
 * - Heavy steel pipe clanks during 180cm gantry build
 * - Crisp ice-on-ice CNC fit (`スッ……カチリ`) + pure metallic `キィン` bolt ring
 * - Silky silent leg drop + warm fist-to-knee metal tap (`コツン`) + heroic HMD-02 birth chord!
 */
export class Ch14AudioEngine {
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
      this.master.gain.value = this.muted ? 0 : 0.35;
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
    if (this.master) this.master.gain.value = this.muted ? 0 : 0.35;
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
    g.gain.linearRampToValueAtTime(vol, now + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(g).connect(this.master);
    osc.start(now);
    osc.stop(now + dur + 0.03);
  }

  playNoiseBurst(dur, vol = 0.28, highpass = 1400) {
    if (!this.ctx || this.muted || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      ch[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.30));
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

    // 1. 4AM CAD alert -> safe clearance fix
    if (t >= 6.0 && t < 7.2) {
      this.triggerOnce('cad_fix', () => {
        this.playTone(740, 0.14, 'triangle', 0.14);
        setTimeout(() => this.playTone(987.77, 0.22, 'sine', 0.14), 120);
      });
    }
    // 2. Canned coffee pull-tab pop (`カシュッ`) @ t=28s
    if (t >= 28.0 && t < 29.0) {
      this.triggerOnce('coffee_pop', () => {
        this.playNoiseBurst(0.11, 0.24, 2400);
        this.playTone(1240, 0.08, 'triangle', 0.12, 680);
      });
    }
    // 3. Heavy steel pipe gantry lock-in clank @ t=48s
    if (t >= 48.0 && t < 49.0) {
      this.triggerOnce('pipe_clank', () => {
        this.playTone(320, 0.26, 'triangle', 0.22, 180);
        this.playTone(640, 0.18, 'sine', 0.12);
      });
    }
    // 4. Ice-on-Ice CNC Precision Fit (`スッ……カチリ`) & Pure Metallic Ring (`キィン`) @ t=81.5s
    if (t >= 81.5 && t < 82.8) {
      this.triggerOnce('cnc_kachiri', () => {
        this.playNoiseBurst(0.05, 0.18, 3200);
        this.playTone(1760, 0.65, 'sine', 0.18);
        setTimeout(() => this.playTone(2637, 0.95, 'sine', 0.14), 240);
      });
    }
    // 5. HMD-02 Birth Reveal Heroic Warm Chord @ t=110s
    if (t >= 110.0 && t < 111.5) {
      this.triggerOnce('hmd02_birth', () => {
        this.playTone(220.0, 3.2, 'sine', 0.16);
        this.playTone(329.63, 3.2, 'sine', 0.14);
        setTimeout(() => this.playTone(440.0, 3.4, 'sine', 0.14), 240);
        setTimeout(() => this.playTone(554.37, 3.6, 'sine', 0.12), 480);
      });
    }
    // 6. Gentle Fist-to-Black-Metal-Knee Tap (`コツン`) @ t=140.5s
    if (t >= 140.5 && t < 141.5) {
      this.triggerOnce('knee_kotsun', () => {
        this.playTone(420, 0.14, 'triangle', 0.24, 190);
        this.playTone(1180, 0.20, 'sine', 0.10);
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
