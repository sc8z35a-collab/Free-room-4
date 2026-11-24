/**
 * 100% Procedural Web Audio API Cinematic Soundtrack + Foley SFX + Optional Japanese Voice
 * Zero external audio assets needed; also exposes a MediaStreamAudioDestinationNode
 * so the built-in 60fps WebM video recorder captures full audio!
 */
export class CinemaAudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.streamDest = null;
    this.noiseBuffer = null;

    this.muted = false;
    this.voiceEnabled = true;
    this.lastStepIndex = -1;
    this.lastT = -1;
    this.firedCues = new Set();
    this.spokenCues = new Set();
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
    this.master.gain.value = this.muted ? 0 : 0.72;

    // Gentle master limiter/compressor so massive explosions + ORA barrage punch hard without clipping
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -10;
    comp.knee.value = 12;
    comp.ratio.value = 6;
    comp.attack.value = 0.005;
    comp.release.value = 0.14;

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.42;
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.85;

    this.musicGain.connect(comp);
    this.sfxGain.connect(comp);
    comp.connect(this.master);
    this.master.connect(this.ctx.destination);

    // Tap stream destination for video+audio recording
    try {
      this.streamDest = this.ctx.createMediaStreamDestination();
      this.master.connect(this.streamDest);
    } catch {
      this.streamDest = null;
    }

    // Reusable 2-second white noise buffer for explosions, fuses, whooshes, punches
    const sampleRate = this.ctx.sampleRate;
    this.noiseBuffer = this.ctx.createBuffer(1, sampleRate * 2, sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }

  getAudioStream() {
    return this.streamDest ? this.streamDest.stream : null;
  }

  setMuted(m) {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : 0.72, this.ctx.currentTime, 0.04);
    }
    if (m && typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
  }

  setVoiceEnabled(v) {
    this.voiceEnabled = v;
    if (!v && typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
  }

  resetTimeline(newT) {
    this.firedCues.clear();
    this.spokenCues.clear();
    this.lastStepIndex = Math.floor(newT * 8);
    this.lastT = newT;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
  }

  // --- Low-level Synthesis Primitives ---
  playTone(freq, dur, { type = 'triangle', gain = 0.2, dest = null, attack = 0.01, slideTo = null, detune = 0 } = {}) {
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (detune) osc.detune.setValueAtTime(detune, now);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), now + dur);

    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(gain, now + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc.connect(g);
    g.connect(dest || this.musicGain);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  }

  playNoise(dur, { filterType = 'lowpass', freq = 800, freqEnd = 120, gain = 0.45, q = 1.0, dest = null } = {}) {
    if (!this.ctx || !this.noiseBuffer || this.muted) return;
    const now = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.Q.value = q;
    filter.frequency.setValueAtTime(freq, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(30, freqEnd), now + dur);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(gain, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    src.connect(filter);
    filter.connect(g);
    g.connect(dest || this.sfxGain);
    src.start(now);
    src.stop(now + dur + 0.03);
  }

  // --- Iconic Cinema Foley Effects ---
  sfxExplosion(power = 1.0) {
    this.playTone(95 * power, 1.35, { type: 'sine', gain: 0.72 * power, dest: this.sfxGain, slideTo: 24 });
    this.playTone(140, 0.5, { type: 'sawtooth', gain: 0.22 * power, dest: this.sfxGain, slideTo: 36 });
    this.playNoise(1.65, { filterType: 'lowpass', freq: 1400, freqEnd: 85, gain: 0.75 * power });
    this.playNoise(0.45, { filterType: 'bandpass', freq: 2400, freqEnd: 400, gain: 0.35 * power, q: 1.5 });
  }

  sfxFuseHiss() {
    this.playNoise(0.45, { filterType: 'highpass', freq: 3800, freqEnd: 5200, gain: 0.14 });
  }

  sfxForestPop(pitchMul = 1.0) {
    this.playTone(320 * pitchMul, 0.18, { type: 'sine', gain: 0.14, dest: this.sfxGain, slideTo: 780 * pitchMul });
    this.playTone(640 * pitchMul, 0.28, { type: 'triangle', gain: 0.09, dest: this.sfxGain });
  }

  sfxSwordClash() {
    this.playTone(1950, 0.14, { type: 'square', gain: 0.12, dest: this.sfxGain, slideTo: 2800 });
    this.playNoise(0.12, { filterType: 'highpass', freq: 4200, freqEnd: 1800, gain: 0.22 });
  }

  sfxDomainExpansion() {
    // Deep terrifying bass drop + shimmering crystal reality-fracture chime!
    this.playTone(72, 3.2, { type: 'sine', gain: 0.85, dest: this.sfxGain, slideTo: 26 });
    this.playTone(144, 2.4, { type: 'sawtooth', gain: 0.28, dest: this.sfxGain, slideTo: 52 });
    this.playNoise(2.2, { filterType: 'bandpass', freq: 3200, freqEnd: 240, gain: 0.55, q: 2.5 });
    for (const f of [880, 1174, 1396, 1760, 2217]) {
      this.playTone(f, 1.4, { type: 'sine', gain: 0.09, dest: this.sfxGain, slideTo: f * 0.94 });
    }
  }

  sfxWolfHowl() {
    // Expressive harmonic howling pitch-glide!
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    for (const [mult, amp] of [[1, 0.22], [2, 0.1], [3, 0.04]]) {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = mult === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(240 * mult, now);
      osc.frequency.exponentialRampToValueAtTime(590 * mult, now + 0.65);
      osc.frequency.exponentialRampToValueAtTime(530 * mult, now + 1.85);
      osc.frequency.exponentialRampToValueAtTime(340 * mult, now + 2.6);

      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(amp, now + 0.35);
      g.gain.setValueAtTime(amp, now + 1.75);
      g.gain.exponentialRampToValueAtTime(0.001, now + 2.7);

      osc.connect(g);
      g.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 2.75);
    }
  }

  sfxAlertKlaxon() {
    this.playTone(760, 0.28, { type: 'sawtooth', gain: 0.18, dest: this.sfxGain, slideTo: 520 });
  }

  sfxRecordScratch() {
    this.playTone(980, 0.24, { type: 'sawtooth', gain: 0.32, dest: this.sfxGain, slideTo: 130 });
    this.playNoise(0.22, { filterType: 'bandpass', freq: 1800, freqEnd: 400, gain: 0.35, q: 4 });
  }

  sfxFingerSnapShatter() {
    // Crisp snap click followed by shimmering crystal rainbow shatter!
    this.playNoise(0.045, { filterType: 'bandpass', freq: 2600, freqEnd: 1200, gain: 0.65, q: 3 });
    this.playTone(1850, 0.06, { type: 'triangle', gain: 0.32, dest: this.sfxGain, slideTo: 920 });
    const notes = [1046.5, 1318.5, 1568.0, 2093.0, 2637.0, 3136.0];
    notes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 0.85, { type: 'sine', gain: 0.14, dest: this.sfxGain });
      }, idx * 45);
    });
  }

  sfxOraPunch(heavy = false) {
    const pitch = heavy ? 110 : 155 + Math.random() * 55;
    this.playTone(pitch, heavy ? 0.22 : 0.11, { type: 'sine', gain: heavy ? 0.6 : 0.36, dest: this.sfxGain, slideTo: 32 });
    this.playNoise(heavy ? 0.18 : 0.08, { filterType: 'bandpass', freq: heavy ? 900 : 1400, freqEnd: 280, gain: heavy ? 0.45 : 0.26, q: 1.4 });
  }

  sfxToBeContinued() {
    // Iconic acoustic-guitar-esque Spanish/dramatic freeze chord!
    const chord = [196.0, 246.94, 293.66, 392.0, 493.88, 587.33];
    chord.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 2.4, { type: 'triangle', gain: 0.18, dest: this.musicGain, attack: 0.006 });
      }, i * 38);
    });
  }

  speakLine(id, text, rate = 1.08, pitch = 1.0) {
    if (!this.voiceEnabled || this.muted || this.spokenCues.has(id)) return;
    this.spokenCues.add(id);
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      u.rate = rate;
      u.pitch = pitch;
      u.volume = 0.88;
      window.speechSynthesis.speak(u);
    } catch {
      // Gracefully ignore in environments without speech synthesis
    }
  }

  // --- Synchronized Per-Frame Audio Sequencer ---
  update(t, isPlaying) {
    if (!isPlaying || !this.ctx) return;

    // Detect timeline jump / scrub
    if (this.lastT >= 0 && Math.abs(t - this.lastT) > 1.2) {
      this.resetTimeline(t);
    }
    this.lastT = t;

    const triggerOnce = (id, cueTime, fn) => {
      if (t >= cueTime && t < cueTime + 0.5 && !this.firedCues.has(id)) {
        this.firedCues.add(id);
        fn();
      }
    };

    // --- 1. One-Shot Story Foley & Japanese Voice Cues ---
    triggerOnce('boom0', 12.2, () => this.sfxExplosion(1.0));
    triggerOnce('boom1', 14.3, () => this.sfxExplosion(1.1));
    triggerOnce('boom2', 16.5, () => this.sfxExplosion(1.3));
    triggerOnce('boom3', 18.8, () => this.sfxExplosion(1.1));
    triggerOnce('boom4', 21.0, () => this.sfxExplosion(1.05));

    triggerOnce('ttEmerg', 25.2, () => this.sfxExplosion(0.95));
    triggerOnce('smash0', 30.8, () => this.sfxExplosion(0.75));
    triggerOnce('smash1', 34.4, () => this.sfxExplosion(0.75));
    triggerOnce('smash2', 38.2, () => this.sfxExplosion(0.8));
    triggerOnce('smash3', 41.8, () => this.sfxExplosion(0.85));

    triggerOnce('riuVoice', 52.2, () => this.speakLine('riuGrow', '森と森林を、一気に増殖させよう。', 1.02, 1.12));
    triggerOnce('riuSlam', 53.0, () => {
      this.playTone(130, 0.7, { type: 'sine', gain: 0.45, dest: this.sfxGain, slideTo: 55 });
      this.sfxForestPop(1.0);
    });

    triggerOnce('lilithVoice', 72.6, () => this.speakLine('lilith', '総員突撃！ジョセフ・ジョースターを止めるのです！', 1.12, 1.28));
    triggerOnce('domainVoice', 95.8, () => this.speakLine('domain', '天地創造術式解放。領域展開、綻び。', 0.92, 0.65));
    triggerOnce('domainBoom', 100.0, () => this.sfxDomainExpansion());

    triggerOnce('kirakuVoice', 113.2, () => this.speakLine('kiraku', 'この呪力、見逃すわけにはいかないな。滅ぼそう。', 0.98, 0.85));
    triggerOnce('wolfHowl', 122.0, () => this.sfxWolfHowl());

    triggerOnce('momongaVoice', 128.8, () => this.speakLine('momonga', 'まーきリングスより大規模襲来を確認！今すぐ隕石を降らせろ！', 1.16, 1.15));
    triggerOnce('meteorLaunch1', 131.5, () => this.sfxExplosion(0.9));
    triggerOnce('meteorLaunch2', 132.5, () => this.sfxExplosion(1.0));

    triggerOnce('recordScratch', 143.0, () => this.sfxRecordScratch());
    triggerOnce('riuCancelVoice', 143.7, () => this.speakLine('riuCancel', 'あ、やっぱやめた。', 1.0, 1.18));
    triggerOnce('fingerSnap', 147.2, () => this.sfxFingerSnapShatter());

    triggerOnce('josephRageVoice', 155.0, () => this.speakLine('josephRage', 'てめぇ…ふざけやがって！', 1.1, 0.82));
    triggerOnce('josephOraVoice', 160.2, () => this.speakLine('josephOra', 'おらおらおらおらおらおらおらおらあああああ！', 1.38, 0.88));
    triggerOnce('finalUppercut', 175.6, () => this.sfxExplosion(1.35));
    triggerOnce('tbcSting', 176.8, () => this.sfxToBeContinued());

    // --- Phase 2 Expansion Cues (3:00 - 5:00 | Acts 9-12!) ---
    triggerOnce('tbcShatter', 179.4, () => {
      this.sfxRecordScratch();
      this.sfxDomainExpansion();
    });
    triggerOnce('riuPhase2Voice', 180.6, () => this.speakLine('riuP2', 'ほぉ、本気を出してきたか。ならば第二幕だ！', 1.05, 1.12));
    triggerOnce('gigaTTAwaken', 184.5, () => this.sfxDomainExpansion());
    triggerOnce('gigaTTVoice', 186.0, () => this.speakLine('gigaTT', '極・領域再展開！超巨神重機、極TT覚醒！', 0.94, 0.62));

    triggerOnce('kirakuHollowVoice', 213.0, () => this.speakLine('kirakuH', '蒼と赫を合わせ、究極虚式、気楽滅殺！', 1.0, 0.85));
    triggerOnce('kirakuBeamBlast', 217.5, () => this.sfxExplosion(1.25));
    triggerOnce('wolfOverdriveHowl', 225.5, () => this.sfxWolfHowl());

    triggerOnce('momongaFinalVoice', 241.5, () => this.speakLine('momongaF', '全エネルギー解放！最終兵器、超巨大ムーン・メテオ投下！', 1.15, 1.12));
    triggerOnce('moonDropBoom', 244.5, () => this.sfxExplosion(1.35));
    triggerOnce('riuTeamupVoice', 257.5, () => this.speakLine('riuTeam', 'ジョセフ君、さっきはごめん。今度は本気で、一緒に吹き飛ばそう！', 1.05, 1.15));
    triggerOnce('empoweredChime', 261.5, () => this.sfxFingerSnapShatter());

    triggerOnce('cosmicOraVoice', 273.5, () => this.speakLine('cosmicOra', '超・天地おらおらおらおらおらおらあああああああ！！', 1.35, 0.9));
    triggerOnce('moonShatterBoom', 285.5, () => {
      this.sfxExplosion(1.45);
      this.sfxFingerSnapShatter();
    });

    // --- 2. 8th-Note Synchronized Dynamic Soundtrack & Continuous Foley ---
    const stepIndex = Math.floor(t * 8);
    if (stepIndex === this.lastStepIndex) return;
    this.lastStepIndex = stepIndex;

    // Act 1 (0..24s): Peaceful Alpine Harp -> Rising TNT Fuse Tension
    if (t < 24) {
      if (t < 11.8) {
        const arp = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 293.66, 392.0];
        if (stepIndex % 2 === 0) {
          this.playTone(arp[(stepIndex / 2) % arp.length], 0.45, { type: 'triangle', gain: 0.14 });
        }
        if (t > 6.5 && stepIndex % 2 === 0) {
          this.sfxFuseHiss();
          this.playTone(73.42, 0.25, { type: 'sawtooth', gain: 0.08 + ((t - 6.5) / 6) * 0.1 });
        }
      } else {
        // Epic war drums during cascading mountain blasts
        if (stepIndex % 2 === 0) {
          this.playTone(55, 0.22, { type: 'sine', gain: 0.26, slideTo: 32 });
        }
      }
      return;
    }

    // Act 2 (24..46s): Giant Mecha Tractor TT Heavy Industrial Bass & Diesel Chug!
    if (t < 46) {
      const riff = [65.41, 65.41, 77.78, 65.41, 98.0, 87.31, 77.78, 61.74];
      const note = riff[stepIndex % riff.length];
      this.playTone(note, 0.14, { type: 'sawtooth', gain: 0.18 });
      if (stepIndex % 2 === 0) {
        this.playTone(46, 0.12, { type: 'sine', gain: 0.22, slideTo: 28 });
        this.playNoise(0.06, { filterType: 'lowpass', freq: 420, freqEnd: 120, gain: 0.12 });
      }
      return;
    }

    // Act 3 (46..66s): Creator Riu Mystical Forest Proliferation Arpeggios + Popping Growth SFX!
    if (t < 66) {
      const notes = [293.66, 369.99, 440.0, 554.37, 659.25, 739.99, 659.25, 440.0];
      const f = notes[stepIndex % notes.length];
      this.playTone(f, 0.36, { type: 'sine', gain: 0.14 });
      if (stepIndex % 4 === 0) {
        this.playTone(f * 0.5, 0.65, { type: 'triangle', gain: 0.11 });
      }
      if (t >= 53.2 && t <= 63.8 && stepIndex % 2 === 0) {
        this.sfxForestPop(0.85 + ((stepIndex % 7) * 0.12));
      }
      return;
    }

    // Act 4 (66..86s): Lilith I Legion vs Joseph Joestar Heroic Battle Theme!
    if (t < 86) {
      const bass = [110, 110, 130.81, 146.83, 110, 164.81, 146.83, 130.81];
      this.playTone(bass[stepIndex % bass.length], 0.12, { type: 'sawtooth', gain: 0.16 });
      if (stepIndex % 2 === 0) {
        this.playTone(stepIndex % 4 === 0 ? 75 : 190, 0.1, { type: 'sine', gain: 0.24, slideTo: 38 });
      }
      if (stepIndex % 4 === 2) {
        this.playNoise(0.08, { filterType: 'highpass', freq: 1800, freqEnd: 800, gain: 0.14 });
      }
      if (t >= 74 && stepIndex % 5 === 0) {
        this.sfxSwordClash();
      }
      return;
    }

    // Act 5 (86..112s): Domain Expansion「綻び」Eerie Fracture Drone & Arcane Bells
    if (t < 112) {
      if (stepIndex % 4 === 0) {
        this.playTone(48.99, 0.72, { type: 'sine', gain: 0.26 });
        this.playTone(t >= 100 ? 73.42 : 51.91, 0.58, { type: 'sawtooth', gain: 0.1 });
      }
      if (t >= 98 && stepIndex % 3 === 0) {
        const bells = [622.25, 830.61, 932.33, 1244.5];
        this.playTone(bells[stepIndex % bells.length], 0.52, { type: 'sine', gain: 0.08 });
      }
      return;
    }

    // Act 6 (112..134s): Shijo Kiraku Menace -> Wolf Alert -> Captain Momonga Klaxon & War Drums
    if (t < 134) {
      if (t < 121.5) {
        // Dark sorcerer pulse
        if (stepIndex % 2 === 0) {
          this.playTone(stepIndex % 4 === 0 ? 58.27 : 69.3, 0.24, { type: 'sawtooth', gain: 0.16 });
        }
      } else if (t >= 127.0) {
        // Captain Momonga Red Alert Klaxon + Marching Orbital Drums
        if (stepIndex % 4 === 0) this.sfxAlertKlaxon();
        if (stepIndex % 2 === 0) {
          this.playTone(72, 0.14, { type: 'sine', gain: 0.25, slideTo: 34 });
        }
      }
      return;
    }

    // Act 7 (134..154s): Meteor Apocalypse -> DEAD SILENCE on "あ、やっぱやめた" -> Cheerful Sparkle!
    if (t < 154) {
      if (t < 142.9) {
        // Roaring apocalyptic meteor descent
        if (stepIndex % 2 === 0) {
          this.playTone(62, 0.2, { type: 'sawtooth', gain: 0.22, slideTo: 42 });
          this.playNoise(0.24, { filterType: 'bandpass', freq: 950, freqEnd: 260, gain: 0.18 });
        }
      } else if (t < 147.2) {
        // COMEDIC DEAD SILENCE while Riu casually shrugs "あ、やっぱやめた"!!
      } else {
        // Absurdly cheerful bright glockenspiel melody over sparkling meteor confetti!
        const happy = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25];
        if (stepIndex % 2 === 0) {
          this.playTone(happy[(stepIndex / 2) % happy.length], 0.32, { type: 'sine', gain: 0.13 });
        }
      }
      return;
    }

    // Act 8 (154..180s): Menacing JoJo Buildup -> BLISTERING ORA-ORA OVERDRIVE!!
    if (t < 180) {
      if (t < 159.8) {
        if (stepIndex % 2 === 0) {
          this.playTone(65 + (t - 154) * 8, 0.2, { type: 'sawtooth', gain: 0.2 });
        }
      } else if (t < 176.2) {
        const riff = [220, 261.63, 293.66, 311.13, 329.63, 293.66, 261.63, 246.94, 220, 261.63, 329.63, 392.0, 440, 392.0, 329.63, 293.66];
        const lead = riff[stepIndex % riff.length];
        this.playTone(lead, 0.12, { type: 'sawtooth', gain: 0.18 });
        this.playTone(lead * 0.5, 0.13, { type: 'square', gain: 0.12 });
        this.sfxOraPunch(stepIndex % 4 === 0);
      }
      return;
    }

    // Act 9 (180..210s): GIGA-TT God-Mecha Transformation Symphonic Metal!
    if (t < 210) {
      const gigaBass = [55, 55, 65.41, 73.42, 55, 82.41, 73.42, 61.74];
      this.playTone(gigaBass[stepIndex % gigaBass.length], 0.14, { type: 'sawtooth', gain: 0.21 });
      if (stepIndex % 2 === 0) {
        this.playTone(stepIndex % 4 === 0 ? 48 : 110, 0.12, { type: 'sine', gain: 0.28, slideTo: 28 });
      }
      if (stepIndex % 4 === 0) {
        const choir = [440, 523.25, 587.33, 659.25];
        this.playTone(choir[(stepIndex / 4) % choir.length], 0.55, { type: 'triangle', gain: 0.1 });
      }
      return;
    }

    // Act 10 (210..240s): 4-Faction Apocalypse Clash (Kiraku Hollow Beam + Lilith + Maaki Rings)!
    if (t < 240) {
      const clash = [146.83, 174.61, 196.0, 220.0, 174.61, 261.63, 220.0, 196.0];
      this.playTone(clash[stepIndex % clash.length], 0.13, { type: 'sawtooth', gain: 0.17 });
      if (stepIndex % 2 === 0) {
        this.playTone(72, 0.11, { type: 'sine', gain: 0.25, slideTo: 36 });
      }
      if (stepIndex % 6 === 0) this.sfxSwordClash();
      return;
    }

    // Act 11 (240..272s): Planetoid Moon-Meteor Dread -> Riu x Joseph Hopeful Counter-Attack Crescendo!
    if (t < 272) {
      if (t < 257) {
        if (stepIndex % 2 === 0) {
          this.playTone(55, 0.28, { type: 'sawtooth', gain: 0.22, slideTo: 38 });
          this.playNoise(0.18, { filterType: 'lowpass', freq: 650, freqEnd: 180, gain: 0.14 });
        }
      } else {
        // Uplifting heroic orchestral ascension as Riu supercharges Joseph's fists!
        const hero = [261.63, 329.63, 392.0, 523.25, 587.33, 659.25, 783.99, 1046.5];
        const f = hero[stepIndex % hero.length];
        this.playTone(f, 0.26, { type: 'triangle', gain: 0.16 });
        if (stepIndex % 2 === 0) this.playTone(f * 0.25, 0.22, { type: 'sawtooth', gain: 0.15 });
      }
      return;
    }

    // Act 12 (272..300s): Cosmic Emerald-Gold ORA-ORA Overdrive -> Majestic Golden Sunrise Finale!
    if (t < 285.6) {
      const cosmic = [261.63, 329.63, 392.0, 440.0, 523.25, 440.0, 392.0, 329.63, 293.66, 392.0, 493.88, 587.33, 659.25, 587.33, 493.88, 392.0];
      const f = cosmic[stepIndex % cosmic.length];
      this.playTone(f, 0.12, { type: 'sawtooth', gain: 0.2 });
      this.playTone(f * 0.5, 0.13, { type: 'square', gain: 0.13 });
      this.sfxOraPunch(stepIndex % 4 === 0);
    } else if (t < 298.5) {
      // Breathtaking serene golden-sunrise harp & warm major-9th strings finale!
      const dawn = [261.63, 329.63, 392.0, 493.88, 587.33, 659.25, 783.99, 659.25];
      if (stepIndex % 2 === 0) {
        const f = dawn[(stepIndex / 2) % dawn.length];
        this.playTone(f, 0.72, { type: 'sine', gain: 0.15 });
        if (stepIndex % 4 === 0) this.playTone(f * 0.5, 1.1, { type: 'triangle', gain: 0.12 });
      }
    }
  }
}
