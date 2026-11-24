/**
 * RealFilmAudioEngine — 10-Minute (600s) Realistic Foley, Acoustic Piano/Strings Score & Voice Engine
 * Crafted specifically for 『第一世代機 HMD-01 開発記 — 第1章・第2章』
 */
export class RealFilmAudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.streamDest = null;
    this.noiseBuffer = null;
    this.fridgeGain = null;
    this.servoBuzzGain = null;
    this.servoBuzzOsc = null;
    this.stepperGain = null;
    this.stepperOsc = null;
    this.buzzerGain = null;
    this.fanGain = null;
    this.muted = false;
    this.initialized = false;
    this.firedEvents = new Set();
    this.lastBeatIndex = -1;
    this.events = this._buildTimelineEvents();
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
    this.master.gain.value = this.muted ? 0 : 0.85;

    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    this.master.connect(comp);
    comp.connect(this.ctx.destination);

    this.streamDest = this.ctx.createMediaStreamDestination();
    comp.connect(this.streamDest);

    // 2s white/pink noise buffer for realistic mechanical foley
    const len = this.ctx.sampleRate * 2;
    this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    // Persistent continuous beds (modulated smoothly per frame)
    // 1. 100Hz Apartment Refrigerator Hum ("ブォォン……")
    const fridgeOsc = this.ctx.createOscillator();
    fridgeOsc.type = 'sine';
    fridgeOsc.frequency.value = 100;
    this.fridgeGain = this.ctx.createGain();
    this.fridgeGain.gain.value = 0;
    fridgeOsc.connect(this.fridgeGain).connect(this.master);
    fridgeOsc.start();

    // 2. STS3215 Servo Gear/Holding-Torque Buzz ("ジジジジッ" / "ウィィン")
    this.servoBuzzOsc = this.ctx.createOscillator();
    this.servoBuzzOsc.type = 'sawtooth';
    this.servoBuzzOsc.frequency.value = 220;
    const servoFilter = this.ctx.createBiquadFilter();
    servoFilter.type = 'bandpass';
    servoFilter.frequency.value = 950;
    servoFilter.Q.value = 3.2;
    this.servoBuzzGain = this.ctx.createGain();
    this.servoBuzzGain.gain.value = 0;
    this.servoBuzzOsc.connect(servoFilter).connect(this.servoBuzzGain).connect(this.master);
    this.servoBuzzOsc.start();

    // 3. Bambu Lab A1 High-Speed Stepper Harmonics
    this.stepperOsc = this.ctx.createOscillator();
    this.stepperOsc.type = 'triangle';
    this.stepperOsc.frequency.value = 440;
    this.stepperGain = this.ctx.createGain();
    this.stepperGain.gain.value = 0;
    this.stepperOsc.connect(this.stepperGain).connect(this.master);
    this.stepperOsc.start();

    // 4. Sanwa CD771 2850Hz Continuity Short Buzzer ("ピィィィィーッ！")
    const buzOsc = this.ctx.createOscillator();
    buzOsc.type = 'square';
    buzOsc.frequency.value = 2850;
    this.buzzerGain = this.ctx.createGain();
    this.buzzerGain.gain.value = 0;
    buzOsc.connect(this.buzzerGain).connect(this.master);
    buzOsc.start();

    // 5. Exhaust Ventilation Fan Whoosh
    const fanSrc = this.ctx.createBufferSource();
    fanSrc.buffer = this.noiseBuffer;
    fanSrc.loop = true;
    const fanFilter = this.ctx.createBiquadFilter();
    fanFilter.type = 'lowpass';
    fanFilter.frequency.value = 420;
    this.fanGain = this.ctx.createGain();
    this.fanGain.gain.value = 0;
    fanSrc.connect(fanFilter).connect(this.fanGain).connect(this.master);
    fanSrc.start();

    this.initialized = true;
  }

  getRecordingStream() {
    return this.streamDest ? this.streamDest.stream : null;
  }

  setMuted(m) {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : 0.85, this.ctx.currentTime, 0.04);
    }
    if (m && window.speechSynthesis) window.speechSynthesis.cancel();
  }

  resetForSeek(t) {
    this.firedEvents.clear();
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].t < t - 0.08) this.firedEvents.add(i);
    }
    this.lastBeatIndex = Math.floor(t * 2);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  pause() {
    if (this.fridgeGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.fridgeGain.gain.setTargetAtTime(0, now, 0.04);
      this.servoBuzzGain.gain.setTargetAtTime(0, now, 0.04);
      this.stepperGain.gain.setTargetAtTime(0, now, 0.04);
      this.buzzerGain.gain.setTargetAtTime(0, now, 0.03);
      this.fanGain.gain.setTargetAtTime(0, now, 0.04);
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  _playNoiseBurst({ freq = 1800, q = 2.0, dur = 0.08, gain = 0.25, type = 'bandpass' }) {
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

  _playPianoNote(freq, dur = 1.6, vol = 0.11) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc2.type = 'sine';
    osc1.frequency.value = freq;
    osc2.frequency.value = freq * 2;

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.018);
    g.gain.exponentialRampToValueAtTime(0.0008, now + dur);

    const g2 = this.ctx.createGain();
    g2.gain.value = 0.22;

    osc1.connect(g);
    osc2.connect(g2).connect(g);
    g.connect(this.master);
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + dur + 0.04);
    osc2.stop(now + dur + 0.04);
  }

  _playServoSnap() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // "シュッ" fast 1Mbps gear sweep + "カチリ" mechanical detent lock!
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(1380, now + 0.09);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.18, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    osc.connect(g).connect(this.master);
    osc.start(now);
    osc.stop(now + 0.12);

    setTimeout(() => {
      this._playNoiseBurst({ freq: 3400, q: 4.5, dur: 0.035, gain: 0.34 });
    }, 95);
  }

  _playShortPop() {
    if (!this.ctx) return;
    // "パチンッ！！" sharp high-voltage IC package crack!
    this._playNoiseBurst({ freq: 4200, q: 1.2, dur: 0.06, gain: 0.72, type: 'highpass' });
    this._playNoiseBurst({ freq: 950, q: 0.9, dur: 0.14, gain: 0.55, type: 'bandpass' });
  }

  _speak(text, pitch = 1.0, rate = 1.05) {
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

  _buildTimelineEvents() {
    return [
      { t: 4.5, fn: () => this._playNoiseBurst({ freq: 5200, q: 3.5, dur: 0.12, gain: 0.28 }) }, // Swarf crunch
      { t: 24.0, fn: () => this._speak('二足歩行？ ロボコンのルール上、車輪の方が圧倒的に合理的だよ。', 0.92, 1.08) },
      { t: 44.0, fn: () => this._playNoiseBurst({ freq: 2200, q: 5.0, dur: 0.04, gain: 0.25 }) }, // Whiteboard tap
      { t: 78.0, fn: () => this._speak('違うんだよな。俺が作りたいのは、自分の手で立たせる二足歩行だ。', 1.02, 1.02) },
      { t: 155.0, fn: () => this._speak('一万二千円の壁を超えられるか……これだ、STS三二一五！', 1.04, 1.06) },
      { t: 212.0, fn: () => this._playNoiseBurst({ freq: 2800, q: 4.0, dur: 0.04, gain: 0.28 }) }, // Enter key
      { t: 246.0, fn: () => this._speak('通信速度の初期値、百万ビーピーエス！ 九倍も速いじゃないか！', 1.08, 1.12) },
      { t: 268.0, fn: () => this._playServoSnap() }, // 01:42 AM "シュッ、カチリ"
      { t: 284.0, fn: () => this._speak('動いた……押し返してくる！ これが、最初の一軸だ！', 1.06, 1.04) },
      { t: 318.0, fn: () => this._speak('足首のロール軸がないと、足裏が浮いてエッジだけで立つことになるのか。', 1.02, 1.05) },
      { t: 378.0, fn: () => this._speak('三十キロはストール極限……連続で使えるのは十キロ以下、一グラムも無駄にできない！', 1.04, 1.08) },
      { t: 480.8, fn: () => this._playNoiseBurst({ freq: 680, q: 2.2, dur: 0.11, gain: 0.45 }) }, // Caliper case snag "ガツン"
      { t: 481.5, fn: () => this._playShortPop() }, // 01:15 AM "パチンッ！！" Burnout!
      { t: 485.0, fn: () => this._speak('うわっ……白い煙が！', 1.14, 1.18) },
      { t: 516.0, fn: () => this._speak('大電流を扱うグランドが浮けば、行き場を失った十二ボルトが信号線へ逆流する。', 0.84, 0.98) },
      { t: 558.0, fn: () => this._playNoiseBurst({ freq: 6500, q: 2.0, dur: 0.35, gain: 0.22 }) }, // 350°C solder sizzle "ジュッ"
      { t: 580.0, fn: () => this._speak('煙は出ない。残高七万八千四百二十円。ここから、全十六自由度へ進む！', 1.04, 1.02) },
    ];
  }

  update(t, isPlaying) {
    if (!this.initialized || !this.ctx || !isPlaying) return;
    const now = this.ctx.currentTime;

    // Trigger discrete foley & voice events
    for (let i = 0; i < this.events.length; i++) {
      if (!this.firedEvents.has(i) && t >= this.events[i].t && t < this.events[i].t + 0.35) {
        this.firedEvents.add(i);
        this.events[i].fn();
      }
    }

    // Continuous beds modulation
    // 1. Fridge hum audible in midnight quiet scenes (t=205..267)
    const fridgeTarget = t >= 205 && t < 267 ? 0.045 : 0.0;
    this.fridgeGain.gain.setTargetAtTime(fridgeTarget, now, 0.08);

    // 2. Servo torque buzz:
    //    - 01:42 AM finger twist pushback (t=278..295): intense 320Hz "ジジジジッ！"
    //    - Day 022 sine-wave kick before snag (t=458..480.8): smooth periodic "ウィィン"
    //    - Day 022 snag stall (t=480.8..481.5): strained low stall groan
    //    - Day 024 perfboard success kick (t=573..596): crisp healthy sine wave!
    let buzzVol = 0;
    let buzzFreq = 240;
    if (t >= 278 && t <= 295) {
      buzzVol = 0.085;
      buzzFreq = 310 + Math.sin(t * 55) * 35;
    } else if (t >= 458 && t < 480.8) {
      buzzVol = 0.045 * (0.4 + 0.6 * Math.abs(Math.cos(t * Math.PI)));
      buzzFreq = 210 + Math.abs(Math.cos(t * Math.PI)) * 180;
    } else if (t >= 480.8 && t < 481.5) {
      buzzVol = 0.11;
      buzzFreq = 135;
    } else if (t >= 573 && t <= 596) {
      buzzVol = 0.05 * (0.4 + 0.6 * Math.abs(Math.cos(t * Math.PI * 1.1)));
      buzzFreq = 230 + Math.abs(Math.cos(t * Math.PI * 1.1)) * 195;
    }
    this.servoBuzzOsc.frequency.setTargetAtTime(buzzFreq, now, 0.03);
    this.servoBuzzGain.gain.setTargetAtTime(buzzVol, now, 0.04);

    // 3. Bambu Lab A1 Stepper Printing Melody (Scene 9: t=412..448)
    if (t >= 412 && t <= 448) {
      this.stepperGain.gain.setTargetAtTime(0.032, now, 0.05);
      this.stepperOsc.frequency.setTargetAtTime(380 + Math.sin(t * 15.5) * 140 + Math.cos(t * 27) * 60, now, 0.02);
    } else {
      this.stepperGain.gain.setTargetAtTime(0, now, 0.05);
    }

    // 4. Sanwa CD771 Continuity Dead-Short Beep ("ピィィィィーッ！", t=495..502)
    this.buzzerGain.gain.setTargetAtTime(t >= 495 && t <= 502.5 ? 0.075 : 0, now, 0.02);

    // 5. Exhaust Fan Whoosh (t=490..505)
    this.fanGain.gain.setTargetAtTime(t >= 490 && t <= 505 ? 0.08 : 0, now, 0.1);

    // 6. Emotional Acoustic Piano Score (cuts to dead silence during midnight fail & burnout!)
    const beat = Math.floor(t * 2); // 120 BPM eighth-grid
    if (beat !== this.lastBeatIndex) {
      this.lastBeatIndex = beat;
      const silenceZone = (t >= 212 && t < 268) || (t >= 481.5 && t < 508);
      if (!silenceZone) {
        // Gentle reflective progression in D major / B minor -> uplifting D major finale
        const scale =
          t < 115
            ? [293.66, 329.63, 369.99, 440.0, 493.88, 587.33] // Chapter 1 opening / sunset
            : t < 300
            ? [369.99, 440.0, 493.88, 587.33, 659.25, 739.99] // Akiba & 01:42 AM triumph
            : t < 481.5
            ? [246.94, 293.66, 369.99, 440.0, 493.88, 587.33] // Chapter 2 focused engineering
            : [293.66, 369.99, 440.0, 587.33, 659.25, 739.99, 880.0]; // Lecture epiphany & Finale!

        if (beat % 2 === 0) {
          const note = scale[(beat / 2) % scale.length];
          const vol = t >= 268 && t < 300 ? 0.09 : t >= 568 ? 0.095 : 0.055;
          this._playPianoNote(note, 1.5, vol);
          if (beat % 8 === 0) {
            this._playPianoNote(note * 0.5, 2.6, vol * 0.85);
          }
        }
      }
    }
  }

  dispose() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {}
      this.ctx = null;
    }
    this.initialized = false;
  }
}
