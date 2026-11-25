/**
 * Chapter 15 Cinema WebAudio Synthesizer (`第15章：仮想空間の四千人の分身`)
 * - Train hum & 350W RTX 3090 GPU triple-fan spool-up
 * - Stopwatch clicks for bifilar pendulum system ID
 * - Domino collapse rumble & comic rapid crab-hop blips
 * - Triumphant 300-million-step human stride synth swell
 * - Sharp 5kg lateral impact thump (`ドンッ`) & crisp cross-step recovery (`タッ！`)
 */
export class Ch15AudioEngine {
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
    const g = ctxGain(this.ctx, vol, dur);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, now + dur);
    osc.connect(g).connect(this.master);
    osc.start(now);
    osc.stop(now + dur + 0.03);
  }

  playNoiseBurst(dur, vol = 0.28, highpass = 800) {
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

    // 1. RTX 3090 350W GPU Triple-Fan Spool-Up ("ブォォォン……") @ t=12s
    if (t >= 12.0 && t < 13.5) {
      this.triggerOnce('gpu_spool', () => {
        this.playTone(72, 2.2, 'sawtooth', 0.10, 148);
        this.playNoiseBurst(1.6, 0.14, 420);
      });
    }
    // 2. Bifilar Pendulum Stopwatch Click (`ピッ`) @ t=34s
    if (t >= 34.0 && t < 35.0) {
      this.triggerOnce('stopwatch_beep', () => this.playTone(2200, 0.08, 'sine', 0.14));
    }
    // 3. 4,096 Clones Domino Collapse Rumble @ t=49s
    if (t >= 49.0 && t < 50.5) {
      this.triggerOnce('domino_collapse', () => {
        this.playTone(130, 0.45, 'triangle', 0.24, 46);
        this.playNoiseBurst(0.55, 0.26, 220);
      });
    }
    // 4. 300-Million-Step Miracle Stride Triumphant Chord @ t=106s
    if (t >= 106.0 && t < 107.5) {
      this.triggerOnce('stride_miracle', () => {
        this.playTone(261.63, 3.0, 'sine', 0.15);
        this.playTone(329.63, 3.0, 'sine', 0.13);
        setTimeout(() => this.playTone(392.0, 3.2, 'sine', 0.13), 240);
        setTimeout(() => this.playTone(523.25, 3.6, 'sine', 0.12), 480);
      });
    }
    // 5. 5kg Lateral Impulse Slam (`ドンッ`) + Cross-Step Recovery (`タッ！`) @ t=123.5s
    if (t >= 123.5 && t < 124.8) {
      this.triggerOnce('impulse_5kg', () => {
        this.playTone(110, 0.24, 'sawtooth', 0.34, 38);
        this.playNoiseBurst(0.22, 0.32, 320);
        setTimeout(() => {
          this.playTone(587.33, 0.25, 'triangle', 0.18);
          setTimeout(() => this.playTone(880.0, 0.55, 'sine', 0.16), 160);
        }, 550);
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

function ctxGain(ctx, vol, dur) {
  const now = ctx.currentTime;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(vol, now + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  return g;
}
