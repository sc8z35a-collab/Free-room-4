/**
 * Ch04AudioEngine — 02:30 (150.0s) Realistic Foley, June Rain, Bear-Trap NaN Crash & Score Engine
 * Crafted exclusively for 『第4章：線形代数の復習と、逆運動学の暴走』
 */
export class Ch04AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.streamDest = null;
    this.noiseBuffer = null;
    this.servoGain = null;
    this.servoOsc = null;
    this.rainGain = null;
    this.psuFanGain = null;
    this.muted = false;
    this.initialized = false;
    this.fired = new Set();
    this.lastBeat = -1;
    this.events = this._buildEvents();
  }

  init() {
    if (this.initialized) {
      if (this.ctx?.state === 'suspended') this.ctx.resume();
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.88;

    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -12;
    comp.ratio.value = 4.5;
    this.master.connect(comp);
    comp.connect(this.ctx.destination);

    this.streamDest = this.ctx.createMediaStreamDestination();
    comp.connect(this.streamDest);

    const len = this.ctx.sampleRate * 2;
    this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const ch = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;

    // 1. 12-Axis Servo IK Harmonic Whir / Stall Howl ("ウィィン、シュッ" / "ギギギギギッ！！")
    this.servoOsc = this.ctx.createOscillator();
    this.servoOsc.type = 'sawtooth';
    this.servoOsc.frequency.value = 240;
    const svFilter = this.ctx.createBiquadFilter();
    svFilter.type = 'bandpass';
    svFilter.frequency.value = 980;
    svFilter.Q.value = 2.8;
    this.servoGain = this.ctx.createGain();
    this.servoGain.gain.value = 0;
    this.servoOsc.connect(svFilter).connect(this.servoGain).connect(this.master);
    this.servoOsc.start();

    // 2. 12V 15A Industrial PSU Cooling Fan Hum
    const fanSrc = this.ctx.createBufferSource();
    fanSrc.buffer = this.noiseBuffer;
    fanSrc.loop = true;
    const fanFlt = this.ctx.createBiquadFilter();
    fanFlt.type = 'lowpass';
    fanFlt.frequency.value = 340;
    this.psuFanGain = this.ctx.createGain();
    this.psuFanGain.gain.value = 0;
    fanSrc.connect(fanFlt).connect(this.psuFanGain).connect(this.master);
    fanSrc.start();

    // 3. June Rainy Night Ambience ("しとしと降り続く梅雨の雨")
    const rainSrc = this.ctx.createBufferSource();
    rainSrc.buffer = this.noiseBuffer;
    rainSrc.loop = true;
    const rainFlt = this.ctx.createBiquadFilter();
    rainFlt.type = 'bandpass';
    rainFlt.frequency.value = 1650;
    rainFlt.Q.value = 0.8;
    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.value = 0;
    rainSrc.connect(rainFlt).connect(this.rainGain).connect(this.master);
    rainSrc.start();

    this.initialized = true;
  }

  getRecordingStream() {
    return this.streamDest ? this.streamDest.stream : null;
  }

  setMuted(m) {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : 0.88, this.ctx.currentTime, 0.04);
    }
    if (m && window.speechSynthesis) window.speechSynthesis.cancel();
  }

  resetForSeek(t) {
    this.fired.clear();
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].t < t - 0.08) this.fired.add(i);
    }
    this.lastBeat = Math.floor(t * 2);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  pause() {
    if (this.ctx && this.servoGain) {
      const now = this.ctx.currentTime;
      this.servoGain.gain.setTargetAtTime(0, now, 0.03);
      this.psuFanGain.gain.setTargetAtTime(0, now, 0.04);
      this.rainGain.gain.setTargetAtTime(0, now, 0.05);
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  _burst({ freq = 2000, q = 2.0, dur = 0.08, gain = 0.3, type = 'bandpass' }) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const flt = this.ctx.createBiquadFilter();
    flt.type = type;
    flt.frequency.value = freq;
    flt.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    src.connect(flt).connect(g).connect(this.master);
    src.start(now);
    src.stop(now + dur + 0.02);
  }

  _tone(freq, dur = 1.4, vol = 0.08, wave = 'triangle') {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = wave;
    osc.frequency.value = freq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0008, now + dur);
    osc.connect(g).connect(this.master);
    osc.start(now);
    osc.stop(now + dur + 0.03);
  }

  _playBearTrapCrash() {
    if (!this.ctx) return;
    // 1. "ギャリッ、ガツンッ！！" Violent 12-servo gear slam
    this._burst({ freq: 1450, q: 1.4, dur: 0.14, gain: 0.78, type: 'bandpass' });
    this._tone(92, 0.22, 0.45, 'sawtooth');
    // 2. "バキィッ！！" Gunshot-like PLA left-hip cradle shatter 140ms later!
    setTimeout(() => {
      this._burst({ freq: 3800, q: 1.1, dur: 0.09, gain: 0.85, type: 'highpass' });
      this._burst({ freq: 780, q: 1.8, dur: 0.18, gain: 0.55, type: 'bandpass' });
    }, 140);
  }

  _speak(text, pitch = 1.02, rate = 1.06) {
    if (this.muted || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      u.pitch = pitch;
      u.rate = rate;
      u.volume = 0.85;
      window.speechSynthesis.speak(u);
    } catch {}
  }

  _buildEvents() {
    return [
      { t: 1.0, fn: () => { this._tone(1046.5, 0.12, 0.14, 'sine'); setTimeout(() => this._tone(1318.5, 0.18, 0.14, 'sine'), 110); } }, // ATM chime
      { t: 4.0, fn: () => this._speak('よし。十万七千九百二十円……これで左脚が生やせる！', 1.03, 1.06) },
      { t: 13.0, fn: () => this._speak('あっぶな、サーボまでミラーしたら存在しない左利きのサーボになるじゃないか。', 1.04, 1.10) },
      { t: 31.0, fn: () => this._speak('直交行列の転置と余弦定理……全部が一本のコードに繋がったぞ！', 1.05, 1.08) },
      { t: 57.0, fn: () => this._speak('すげえ……座標を指定しただけで、十二個の関節が勝手に協調して動いてる！', 1.06, 1.08) },
      { t: 74.0, fn: () => this._playBearTrapCrash() }, // 02:10 AM NaN Bear-Trap Crash!!
      { t: 74.4, fn: () => this._speak('ぐっ、あぁっ！？', 1.18, 1.22) },
      { t: 79.5, fn: () => this._burst({ freq: 420, q: 2.5, dur: 0.09, gain: 0.55 }) }, // AC plug yank "ブツン"
      { t: 92.0, fn: () => this._speak('ロボットは、人間のたぶん大丈夫を絶対に許さない。数学の例外がそのまま凶器になるんだ。', 0.98, 1.02) },
      { t: 103.5, fn: () => this._burst({ freq: 1900, q: 3.5, dur: 0.06, gain: 0.35 }) }, // Red E-Stop latch click
      { t: 123.0, fn: () => this._speak('綺麗だ……本当に、数式がそのまま肉体になってる。', 1.02, 1.00) },
      { t: 138.5, fn: () => this._burst({ freq: 2600, q: 4.0, dur: 0.05, gain: 0.38 }) }, // Lap 30 "ガクッ" pin glitch
      { t: 146.5, fn: () => this._burst({ freq: 4500, q: 6.0, dur: 0.025, gain: 0.25 }) }, // Mouse click on KiCad!
    ];
  }

  update(t, isPlaying) {
    if (!this.initialized || !this.ctx || !isPlaying) return;
    const now = this.ctx.currentTime;

    for (let i = 0; i < this.events.length; i++) {
      if (!this.fired.has(i) && t >= this.events[i].t && t < this.events[i].t + 0.35) {
        this.fired.add(i);
        this.events[i].fn();
      }
    }

    // 1. 12V 15A PSU Fan Hum (runs during Scene 3 until plug yanked at 79.5s, and during Scene 5)
    const fanOn = (t >= 52 && t < 79.5) || (t >= 115 && t <= 142);
    this.psuFanGain.gain.setTargetAtTime(fanOn ? 0.045 : 0, now, 0.05);

    // 2. 12-DOF Servo Sound:
    //    - 52..67s: Silky aerial bicycle ellipse ("ウィィン、シュッ")
    //    - 67..74s: Slow linear downward extension toward z=-220mm singularity
    //    - 74..79.5s: VIOLENT 15A STALL HOWL ("ギギギギギッ！！")
    //    - 118..141s: Silky-smooth 100Hz 3D pelvis circle ("氷の上を滑る旋回")
    let svVol = 0;
    let svFreq = 240;
    if (t >= 52 && t < 67) {
      svVol = 0.048 * (0.5 + 0.5 * Math.abs(Math.sin(t * 3.8)));
      svFreq = 240 + Math.abs(Math.sin(t * 3.8)) * 170;
    } else if (t >= 67 && t < 74.0) {
      svVol = 0.038;
      svFreq = 195;
    } else if (t >= 74.0 && t < 79.5) {
      svVol = 0.145;
      svFreq = 148 + Math.sin(t * 85) * 28;
    } else if (t >= 118 && t < 141) {
      svVol = 0.044;
      svFreq = 265 + Math.sin(t * 2.6) * 65;
    }
    this.servoOsc.frequency.setTargetAtTime(svFreq, now, 0.025);
    this.servoGain.gain.setTargetAtTime(svVol, now, 0.03);

    // 3. June Rain Ambience (Scene 5: 115..150s)
    this.rainGain.gain.setTargetAtTime(t >= 115 ? 0.055 : 0, now, 0.12);

    // 4. Musical Score (cuts dead silent during 74.0s..88.0s NaN accident shock!)
    const beat = Math.floor(t * 2);
    if (beat !== this.lastBeat) {
      this.lastBeat = beat;
      if (t < 73.8 || t >= 88.5) {
        const notes =
          t < 52
            ? [329.63, 392.0, 493.88, 587.33, 659.25] // Bright discovery (E minor / G major)
            : t < 74
            ? [293.66, 349.23, 440.0, 523.25] // Anticipation
            : t < 115
            ? [220.0, 261.63, 329.63, 392.0, 440.0] // Calm analytical resolve
            : [293.66, 369.99, 440.0, 554.37, 587.33, 739.99]; // Luminous rainy-night beauty (D maj7)

        if (beat % 2 === 0) {
          const n = notes[(beat / 2) % notes.length];
          const v = t >= 118 ? 0.075 : 0.055;
          this._tone(n, 1.35, v, 'triangle');
          if (beat % 8 === 0) this._tone(n * 0.5, 2.4, v * 0.85, 'sine');
        }
      }
    }
  }

  dispose() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (this.ctx) {
      try { this.ctx.close(); } catch {}
      this.ctx = null;
    }
    this.initialized = false;
  }
}
