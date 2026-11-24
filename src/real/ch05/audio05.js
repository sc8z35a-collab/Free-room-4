/**
 * Ch05AudioEngine — 02:30 (150.0s) Realistic Foley, Cicada Night Breeze & Score Engine
 * Crafted for 『第5章：深圳から届いた緑の基板』
 */
export class Ch05AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.streamDest = null;
    this.noiseBuffer = null;
    this.servoGain = null;
    this.servoOsc = null;
    this.buzzerGain = null;
    this.cicadaGain = null;
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
    comp.threshold.value = -13;
    comp.ratio.value = 4;
    this.master.connect(comp);
    comp.connect(this.ctx.destination);

    this.streamDest = this.ctx.createMediaStreamDestination();
    comp.connect(this.streamDest);

    const len = this.ctx.sampleRate * 2;
    this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const ch = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;

    // 1. 200Hz Hawk-Reflex Servo Glide ("ウィィィン、シュッ")
    this.servoOsc = this.ctx.createOscillator();
    this.servoOsc.type = 'sawtooth';
    this.servoOsc.frequency.value = 250;
    const svFlt = this.ctx.createBiquadFilter();
    svFlt.type = 'bandpass';
    svFlt.frequency.value = 1050;
    svFlt.Q.value = 3.0;
    this.servoGain = this.ctx.createGain();
    this.servoGain.gain.value = 0;
    this.servoOsc.connect(svFlt).connect(this.servoGain).connect(this.master);
    this.servoOsc.start();

    // 2. CD771 2850Hz Continuity Buzzer ("ピィィィィーッ！" when Pin 3 DATA shorts to GND!)
    const buzOsc = this.ctx.createOscillator();
    buzOsc.type = 'square';
    buzOsc.frequency.value = 2850;
    this.buzzerGain = this.ctx.createGain();
    this.buzzerGain.gain.value = 0;
    buzOsc.connect(this.buzzerGain).connect(this.master);
    buzOsc.start();

    // 3. Distant Early-Summer Cicada ("アブラゼミの鳴き声") outside July night window!
    const cicSrc = this.ctx.createBufferSource();
    cicSrc.buffer = this.noiseBuffer;
    cicSrc.loop = true;
    const cicFlt = this.ctx.createBiquadFilter();
    cicFlt.type = 'bandpass';
    cicFlt.frequency.value = 4400;
    cicFlt.Q.value = 5.5;
    this.cicadaGain = this.ctx.createGain();
    this.cicadaGain.gain.value = 0;
    cicSrc.connect(cicFlt).connect(this.cicadaGain).connect(this.master);
    cicSrc.start();

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
      this.buzzerGain.gain.setTargetAtTime(0, now, 0.03);
      this.cicadaGain.gain.setTargetAtTime(0, now, 0.05);
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  _burst({ freq = 2400, q = 3.0, dur = 0.06, gain = 0.25, type = 'bandpass' }) {
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

  _tone(freq, dur = 1.4, vol = 0.075, wave = 'triangle') {
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

  _playBootChime() {
    // "ピポッ！" crisp dual-tone piezo startup sound on HMD-CORE-v1!
    this._tone(1975.5, 0.09, 0.16, 'square');
    setTimeout(() => this._tone(987.77, 0.14, 0.16, 'square'), 95);
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
      { t: 2.5, fn: () => this._speak('落ち着く……基板設計は、電気電子の言葉がそのまま通じるぞ！', 1.03, 1.06) },
      { t: 21.0, fn: () => this._burst({ freq: 3800, q: 5.0, dur: 0.03, gain: 0.25 }) }, // Order click
      { t: 39.0, fn: () => this._speak('本物だ……俺が設計した緑のプリント基板、HMDコア・ブイワンだ！', 1.05, 1.05) },
      { t: 50.0, fn: () => this._burst({ freq: 6200, q: 2.0, dur: 0.35, gain: 0.22 }) }, // 360°C busbar solder sizzle "ジュッ"
      { t: 64.0, fn: () => this._speak('磁気干渉か！ 地磁気を切って六軸クォータニオンにすればピタリと止まる！', 1.05, 1.10) },
      { t: 88.0, fn: () => this._speak('うわぁぁぁっ、裏面視ボトムビューだ！ 一番ピンと三番ピンが逆転してる！', 1.12, 1.14) },
      { t: 97.5, fn: () => this._burst({ freq: 4800, q: 4.5, dur: 0.06, gain: 0.32 }) }, // OLFA knife trace cut "カリッ"
      { t: 99.0, fn: () => this._burst({ freq: 5100, q: 4.5, dur: 0.06, gain: 0.32 }) }, // "カリッ"
      { t: 113.5, fn: () => this._playBootChime() }, // Day 098 LiPo toggle switch "ピポッ！"
      { t: 126.0, fn: () => this._speak('生きてるみたいだ……外から電気をもらわなくても、自分の三半規管で水平を守り抜いてる！', 1.03, 1.02) },
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

    // Continuity Buzzer screaming at t = 83.5..87.5s when Pin 3 DATA shorts to GND!
    this.buzzerGain.gain.setTargetAtTime(t >= 83.5 && t <= 87.5 ? 0.08 : 0, now, 0.02);

    // 200Hz Hawk-Reflex Servo Glide (Scene 5: t = 115..144s)
    if (t >= 115 && t <= 144) {
      const rate = Math.abs(Math.cos((t - 115) * 1.45));
      this.servoOsc.frequency.setTargetAtTime(245 + rate * 175, now, 0.03);
      this.servoGain.gain.setTargetAtTime(0.046 * (0.35 + 0.65 * rate), now, 0.04);
    } else {
      this.servoGain.gain.setTargetAtTime(0, now, 0.04);
    }

    // Distant Cicada ("アブラゼミ") pulsing softly at Chapter 5 ending (t = 138..150s)
    const cicPulse = t >= 138 ? 0.022 * (0.5 + 0.5 * Math.sin(t * 16.0)) : 0;
    this.cicadaGain.gain.setTargetAtTime(cicPulse, now, 0.08);

    // Uplifting Electronic + Acoustic Piano Score (mutes briefly during Bottom-View shock 81..92s!)
    const beat = Math.floor(t * 2);
    if (beat !== this.lastBeat) {
      this.lastBeat = beat;
      if (t < 81.0 || t >= 92.0) {
        const notes =
          t < 58
            ? [329.63, 440.0, 493.88, 659.25, 739.99] // Crisp digital urban highway (A add9)
            : t < 112
            ? [293.66, 369.99, 440.0, 587.33] // Precision micro-surgery focus
            : [329.63, 415.30, 493.88, 659.25, 830.61, 987.77]; // Soaring E major Hawk-Reflex triumph!

        if (beat % 2 === 0) {
          const n = notes[(beat / 2) % notes.length];
          const v = t >= 113 ? 0.082 : 0.058;
          this._tone(n, 1.4, v, 'triangle');
          if (beat % 8 === 0) this._tone(n * 0.5, 2.5, v * 0.85, 'sine');
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
