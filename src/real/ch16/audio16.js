/**
 * Chapter 16 Procedural WebAudio Soundscape (`第16章：夢と現実の断崖 —— Sim-to-Realの洗礼`):
 * - XT90-S two-stage anti-spark mechanical click (`カチッ…グッ`) + Jetson Orin Nano whisper fan (`シュゥゥ…`)
 * - 0.1s hopeful servo hum -> 0.3s piercing metallic shriek (`キィィィン…ガガッ！！`) & violent black-panther thudding (`ガンッ！バァンッ！`)
 * - Heavy crimson mushroom E-stop slam (`バチンッ！`) & eerie gantry sway creak (`ギシ…ギシ…`)
 * - Quiet wet-cardboard collapse sigh -> oscilloscope diagnostic pulse -> warm summer sine-sweep resonance!
 */
export class Ch16AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.droneOsc = null;
    this.droneGain = null;
    this.noiseNode = null;
    this.noiseGain = null;
    this.muted = false;
    this.active = false;
    this.triggered = new Set();
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.24;
    this.master.connect(this.ctx.destination);

    this.droneOsc = this.ctx.createOscillator();
    this.droneOsc.type = 'triangle';
    this.droneOsc.frequency.value = 82;
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.value = 0.0;
    this.droneOsc.connect(this.droneGain);
    this.droneGain.connect(this.master);
    this.droneOsc.start();

    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.22;
    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buf;
    this.noiseNode.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1100;
    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.value = 0.0;
    this.noiseNode.connect(filter);
    filter.connect(this.noiseGain);
    this.noiseGain.connect(this.master);
    this.noiseNode.start();
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    this.active = true;
  }

  pause() {
    this.active = false;
    if (this.droneGain && this.ctx) this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
    if (this.noiseGain && this.ctx) this.noiseGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
  }

  setMuted(m) {
    this.muted = m;
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.24, this.ctx.currentTime, 0.06);
  }

  resetTriggers() {
    this.triggered.clear();
  }

  resetForSeek() {
    this.triggered.clear();
  }

  getRecordingStream() {
    if (!this.ctx || !this.master) return null;
    if (!this._recDest) {
      this._recDest = this.ctx.createMediaStreamDestination();
      this.master.connect(this._recDest);
    }
    return this._recDest.stream;
  }

  tone(freq, dur, vol = 0.16, type = 'sine', endFreq = null) {
    if (!this.ctx || !this.active || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== null) osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + dur);
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0008, now + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(now);
    osc.stop(now + dur + 0.03);
  }

  update(t) {
    if (!this.ctx || !this.active || this.muted) return;
    const now = this.ctx.currentTime;

    // Ambient fan / tension bed
    let droneFreq = 82;
    let droneVol = 0.05;
    let noiseVol = 0.03;
    if (t >= 37 && t < 53) {
      // Violent metallic oscillation shriek & mechanical pandemonium!
      droneFreq = 260 + Math.sin(t * 42) * 110;
      droneVol = 0.18;
      noiseVol = 0.18;
    } else if (t >= 53 && t < 62) {
      // Dead silence after E-stop slam — eerie faint creaking
      droneFreq = 58;
      droneVol = 0.04;
      noiseVol = 0.01;
    } else if (t >= 104 && t < 130) {
      // Overcast July lecture hall & humid wind on walkway
      droneFreq = 110;
      droneVol = 0.04;
      noiseVol = 0.05;
    } else if (t >= 130) {
      // Gentle hopeful sine-wave system-ID sweep
      droneFreq = 146.8 + Math.sin(t * 2.0) * 18;
      droneVol = 0.08;
      noiseVol = 0.02;
    }

    this.droneOsc.frequency.setTargetAtTime(droneFreq, now, 0.06);
    this.droneGain.gain.setTargetAtTime(droneVol, now, 0.08);
    this.noiseGain.gain.setTargetAtTime(noiseVol, now, 0.08);

    const once = (key, cond, fn) => {
      if (cond && !this.triggered.has(key)) {
        this.triggered.add(key);
        fn();
      }
    };

    once('xt_stage1', t >= 4.4 && t < 5.2, () => this.tone(880, 0.08, 0.18, 'square', 440));
    once('xt_seat', t >= 7.6 && t < 8.4, () => this.tone(620, 0.12, 0.22, 'triangle', 220));
    once('jetson_boot', t >= 12.0 && t < 13.0, () => this.tone(523.25, 0.35, 0.12, 'sine', 783.99));
    once('shriek', t >= 39.2 && t < 40.5, () => this.tone(1980, 0.65, 0.24, 'sawtooth', 920));
    once('mat_kick', t >= 43.2 && t < 44.5, () => this.tone(125, 0.42, 0.32, 'sawtooth', 36));
    once('gantry_slam', t >= 49.0 && t < 50.2, () => this.tone(160, 0.45, 0.30, 'square', 42));
    once('estop_slam', t >= 53.5 && t < 54.5, () => this.tone(240, 0.18, 0.32, 'square', 55));
    once('cardboard_collapse', t >= 66.5 && t < 67.5, () => this.tone(190, 0.48, 0.16, 'triangle', 68));
    once('summer_chord', t >= 134.0 && t < 135.5, () => {
      this.tone(261.63, 1.4, 0.11, 'sine');
      this.tone(329.63, 1.4, 0.09, 'sine');
      this.tone(392.0, 1.4, 0.09, 'sine');
    });
  }

  dispose() {
    try {
      this.droneOsc?.stop();
      this.noiseNode?.stop();
      this.ctx?.close();
    } catch {}
    this.ctx = null;
  }
}
