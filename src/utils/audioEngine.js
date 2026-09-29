// Bulletproof Museum Audio & Speech Synthesis Engine
// Handles Web Speech API, Chrome speech bugs, voice selection, and Web Audio API synthesis

class MuseumAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.currentUtterance = null;
    this.voices = [];
    this.vinylNode = null;
    this.isPlayingHistoricalAudio = false;
    this._voicesReady = false;
    this._pendingInit = false;

    if (typeof window !== 'undefined') {
      this._initVoicesWithRetry();
    }
  }

  _initVoicesWithRetry() {
    if ('speechSynthesis' in window) {
      // Load immediately if available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        this.voices = voices;
        this._voicesReady = true;
      }

      // Also register the event for delayed loading (Chrome)
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
        this._voicesReady = true;
      };

      // Retry for Chrome's lazy loading
      let retries = 0;
      const retryInterval = setInterval(() => {
        const v = window.speechSynthesis.getVoices();
        if (v.length > 0) {
          this.voices = v;
          this._voicesReady = true;
          clearInterval(retryInterval);
        }
        if (++retries > 20) clearInterval(retryInterval);
      }, 300);
    }
  }

  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        try {
          this.audioCtx = new AudioContext();
        } catch (e) {
          console.warn('AudioContext creation failed:', e);
          return null;
        }
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  // Must be called on a user gesture to unlock AudioContext
  unlockAudio() {
    const ctx = this.getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    // Also unlock speech synthesis with a silent utterance
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance('');
      u.volume = 0;
      window.speechSynthesis.speak(u);
      window.speechSynthesis.cancel();
    }
  }

  // Play a pleasant museum acoustic chime on button tap or screen change
  playChime(type = 'tap') {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'tap') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'bookmark') {
        // Three-note chime
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, i) => {
          const o2 = ctx.createOscillator();
          const g2 = ctx.createGain();
          o2.connect(g2);
          g2.connect(ctx.destination);
          o2.type = 'triangle';
          o2.frequency.value = freq;
          g2.gain.setValueAtTime(0.12, now + i * 0.1);
          g2.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.25);
          o2.start(now + i * 0.1);
          o2.stop(now + i * 0.1 + 0.25);
        });
      } else if (type === 'attract') {
        // Deep resonant gong-like sound for attract screen
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 1.2);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        osc.start(now);
        osc.stop(now + 1.5);
      }
    } catch (err) {
      console.warn('Audio chime error:', err);
    }
  }

  // Generate authentic historical archive gramophone/tape ambience
  startArchiveAmbience() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx || this.vinylNode) return;

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.010;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 900;
      filter.Q.value = 1.2;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      whiteNoise.start();
      this.vinylNode = { source: whiteNoise, gain: gainNode };
    } catch (e) {
      console.warn('Ambience error:', e);
    }
  }

  stopArchiveAmbience() {
    try {
      if (this.vinylNode) {
        this.vinylNode.source.stop();
        this.vinylNode.source.disconnect();
        this.vinylNode = null;
      }
    } catch (e) {
      console.warn('Stop ambience error:', e);
    }
  }

  // Speak text with guaranteed browser audio output and bug workarounds
  speakText(text, lang = 'en', onStart = null, onEnd = null) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      if (onEnd) onEnd();
      return;
    }

    // Cancel any stalled utterance & resume audio context
    window.speechSynthesis.cancel();

    // Ensure voices are loaded
    if (this.voices.length === 0) {
      this.voices = window.speechSynthesis.getVoices();
    }

    // Clean plain text
    const cleanText = text.replace(/\[.*?\]/g, '').replace(/[\"\']/g, '').trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    // Small delay for Chrome's cancel to flush
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      this.currentUtterance = utterance; // Prevents Chromium GC bug

      // Select best matched voice
      let targetLang = 'en-IN';
      if (lang === 'hi') targetLang = 'hi-IN';
      if (lang === 'mr') targetLang = 'mr-IN';

      let voice = this.voices.find(v => v.lang === targetLang);
      if (!voice) voice = this.voices.find(v => v.lang.startsWith(targetLang.slice(0, 2)));
      if (!voice && lang === 'mr') {
        voice = this.voices.find(v => v.lang.startsWith('hi'));
      }
      if (!voice) {
        voice = this.voices.find(v => v.lang.includes('en-IN') || v.name.includes('India')) ||
                this.voices.find(v => v.lang.startsWith('en')) ||
                this.voices[0];
      }

      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = targetLang;
      }

      utterance.rate = 0.92;
      utterance.pitch = 0.97;
      utterance.volume = 1.0;

      utterance.onstart = () => { if (onStart) onStart(); };
      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };
      utterance.onerror = (e) => {
        console.warn('Speech error:', e.error);
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      window.speechSynthesis.speak(utterance);

      // Keep-alive for Chrome (pauses after ~14s)
      const keepAlive = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(keepAlive);
        } else {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);
    }, 100);
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
    this.stopArchiveAmbience();
  }
}

export const audioEngine = new MuseumAudioEngine();
