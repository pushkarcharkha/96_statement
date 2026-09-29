import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  CheckCircle, 
  Radio, 
  Languages, 
  Sparkles, 
  Clock, 
  Disc,
  FastForward,
  Rewind,
  Sliders
} from 'lucide-react';
import { audioVideoData } from '../data/audioVideoData';
import { translations } from '../data/translations';
import { audioEngine } from '../utils/audioEngine';

export default function AudioVideoArchive({ onAddToCollection, collectionItemIds, language }) {
  const t = translations[language] || translations.en;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [subLanguage, setSubLanguage] = useState(language || 'en');
  const [volume, setVolume] = useState(0.85);

  const activeTrack = audioVideoData[activeIndex];
  const isSaved = collectionItemIds.includes(activeTrack.id);
  const cueSpeakingRef = useRef(-1);

  // Stop audio on unmount or track change
  useEffect(() => {
    return () => {
      audioEngine.stopSpeech();
    };
  }, []);

  // Playback timer and synchronized voice narration
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      audioEngine.startArchiveAmbience();

      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= activeTrack.duration) {
            setIsPlaying(false);
            audioEngine.stopSpeech();
            return 0;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    } else {
      audioEngine.stopSpeech();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeTrack.duration, playbackSpeed]);

  // Synchronize actual voice output to current cue
  useEffect(() => {
    if (!isPlaying) {
      cueSpeakingRef.current = -1;
      return;
    }

    const currentCueIdx = activeTrack.cues.findIndex(
      (cue) => currentTime >= cue.start && currentTime <= cue.end
    );

    if (currentCueIdx !== -1 && currentCueIdx !== cueSpeakingRef.current) {
      cueSpeakingRef.current = currentCueIdx;
      const cue = activeTrack.cues[currentCueIdx];
      const textToSpeak = cue[subLanguage] || cue.en;

      audioEngine.speakText(
        textToSpeak,
        subLanguage,
        null,
        () => {}
      );
    }
  }, [currentTime, isPlaying, subLanguage, activeTrack]);

  // Reset current time when changing track
  const handleSelectTrack = (idx) => {
    audioEngine.stopSpeech();
    setActiveIndex(idx);
    setCurrentTime(0);
    setIsPlaying(false);
    cueSpeakingRef.current = -1;
    audioEngine.playChime('tap');
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioEngine.stopSpeech();
    } else {
      // Unlock AudioContext + speech synthesis on user gesture
      audioEngine.unlockAudio();
      audioEngine.playChime('tap');
      setIsPlaying(true);
      // Immediately speak current segment
      const currentCue = activeTrack.cues.find(
        (cue) => currentTime >= cue.start && currentTime <= cue.end
      ) || activeTrack.cues[0];
      
      if (currentCue) {
        setTimeout(() => {
          audioEngine.speakText(currentCue[subLanguage] || currentCue.en, subLanguage);
        }, 300);
      }
    }
  };

  // Find active cue based on current time
  const currentCueIndex = activeTrack.cues.findIndex(
    (cue) => currentTime >= cue.start && currentTime <= cue.end
  );

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-10 py-6 space-y-6 select-none">
      
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
            <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
            DAIC Sound Archives & Historical Voice Vault
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-[#0B1F5C]">
            {t.audioVideo} & Real-Time Waveform
          </h2>
          <p className="text-sm text-slate-600">
            Digitally restored voice recordings with synchronized karaoke transcripts and multi-lingual subtitles
          </p>
        </div>

        {/* Subtitle Language Switcher */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold">
          <Languages className="w-4 h-4 text-blue-800 ml-1" />
          <span className="text-slate-500">Subtitles:</span>
          {['en', 'hi', 'mr'].map((lng) => (
            <button
              key={lng}
              onClick={() => setSubLanguage(lng)}
              className={`touch-target px-3 py-1.5 rounded-xl transition-all ${
                subLanguage === lng
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {lng === 'en' ? 'English' : lng === 'hi' ? 'हिन्दी' : 'मराठी'}
            </button>
          ))}
        </div>
      </div>

      {/* Track Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {audioVideoData.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => handleSelectTrack(idx)}
            className={`touch-target flex-col items-start p-5 rounded-3xl border text-left transition-all ${
              activeIndex === idx
                ? 'bg-[#0B1F5C] text-white border-amber-400 shadow-lg scale-101'
                : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                activeIndex === idx ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-600'
              }`}>
                Recording #{idx + 1}
              </span>
              <span className="text-xs font-mono opacity-80">{formatTime(item.duration)}</span>
            </div>
            <h4 className="text-base font-heading font-bold line-clamp-1">
              {item.title}
            </h4>
            <p className={`text-xs mt-1 ${activeIndex === idx ? 'text-blue-200' : 'text-slate-500'}`}>
              {item.date} • {item.location.split(',')[0]}
            </p>
          </button>
        ))}
      </div>

      {/* Main Player & Visualizer Console */}
      <div className="bg-[#0B1F5C] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-amber-400/30 relative overflow-hidden">
        
        {/* Subtle Watermark Chakra in Player */}
        <div className="absolute right-0 top-0 bottom-0 w-96 flex items-center justify-center opacity-10 pointer-events-none">
          <img src="/assets/chakra.svg" alt="Chakra" className="w-80 h-80 animate-spin-slow text-white" />
        </div>

        <div className="relative z-10 space-y-6">
          
          {/* Header of Active Track */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Disc className="w-4 h-4 animate-spin-slow text-amber-400" />
                {activeTrack.format}
              </span>
              <h3 className="text-2xl font-heading font-extrabold text-white mt-1">
                {activeTrack.title}
              </h3>
              <p className="text-xs text-blue-200">
                Source: {activeTrack.sourceReference}
              </p>
            </div>

            {/* Save to Collection */}
            <button
              onClick={() => onAddToCollection({
                id: activeTrack.id,
                title: activeTrack.title,
                category: "Audio Recording",
                citation: activeTrack.sourceReference,
                snippet: activeTrack.summary,
                date: activeTrack.date
              })}
              className={`touch-target px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                isSaved 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400' 
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              {isSaved ? <CheckCircle className="w-4 h-4" /> : <Bookmark className="w-4 h-4 text-amber-300" />}
              <span>{isSaved ? t.savedToCollection : t.addToCollection}</span>
            </button>
          </div>

          {/* Dynamic Waveform Visualizer */}
          <div className="bg-black/40 rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs text-blue-200 font-mono">
              <span>Waveform Equalizer Spectrum (24-bit 96kHz)</span>
              <span>{formatTime(currentTime)} / {formatTime(activeTrack.duration)}</span>
            </div>

            {/* Interactive Waveform Bar Visualizer */}
            <div className="h-28 flex items-center justify-between gap-1 sm:gap-1.5 overflow-hidden px-2">
              {activeTrack.waveform.map((val, i) => {
                const barProgress = (i / activeTrack.waveform.length) * activeTrack.duration;
                const isPassed = currentTime >= barProgress;
                const isCurrent = Math.abs(currentTime - barProgress) < (activeTrack.duration / activeTrack.waveform.length);

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentTime(barProgress)}
                    style={{
                      height: `${Math.max(val * (isPlaying ? (0.7 + Math.sin(currentTime * 2 + i) * 0.3) : 1), 12)}%`
                    }}
                    className={`flex-1 rounded-full transition-all duration-150 cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-400 shadow-[0_0_12px_#F59E0B] scale-y-110'
                        : isPassed
                        ? 'bg-blue-400/80 hover:bg-amber-300'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    title={`Jump to ${formatTime(barProgress)}`}
                  />
                );
              })}
            </div>

            {/* Progress Scrub Bar */}
            <div className="relative w-full">
              <input
                type="range"
                min="0"
                max={activeTrack.duration}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

          {/* Player Transport Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-black/30 p-4 rounded-2xl border border-white/10">
            
            {/* Left: Speed Selector */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400 mr-2">Speed:</span>
              {[0.75, 1, 1.25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`touch-target px-3 py-1.5 rounded-lg font-mono font-semibold transition-all ${
                    playbackSpeed === spd ? 'bg-amber-500 text-slate-950' : 'bg-white/10 hover:bg-white/15'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Center: Play, Pause, Scrub buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentTime(Math.max(currentTime - 10, 0))}
                className="touch-target p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
                title="Rewind 10 seconds"
              >
                <Rewind className="w-5 h-5" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="touch-target px-7 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base flex items-center gap-2 shadow-lg shadow-amber-500/30 scale-105 active:scale-95"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950" />}
                <span>{isPlaying ? 'Pause Audio' : 'Play Historic Voice'}</span>
              </button>

              <button
                onClick={() => setCurrentTime(Math.min(currentTime + 10, activeTrack.duration))}
                className="touch-target p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
                title="Forward 10 seconds"
              >
                <FastForward className="w-5 h-5" />
              </button>

              <button
                onClick={() => { setCurrentTime(0); setIsPlaying(false); }}
                className="touch-target p-3 rounded-full bg-white/10 hover:bg-white/20 text-slate-300"
                title="Restart Recording"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Volume slider */}
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Volume2 className="w-4 h-4 text-amber-300" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-20 sm:w-28 h-1.5 bg-white/20 rounded cursor-pointer accent-amber-400"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Synchronized Karaoke-style Transcript Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-[#0B1F5C] flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Synchronized Transcript
            </h3>
            <p className="text-xs text-slate-500">
              Lines highlight automatically in real time as audio plays. Touch any passage to jump playback.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {activeTrack.cues.length} Timed Cues
          </span>
        </div>

        {/* Synced Cues List */}
        <div className="space-y-3 pt-2">
          {activeTrack.cues.map((cue, idx) => {
            const isActive = currentCueIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => {
                  setCurrentTime(cue.start);
                  setIsPlaying(true);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-50 border-amber-400 shadow-md ring-2 ring-amber-400/40 scale-[1.01]'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {formatTime(cue.start)} – {formatTime(cue.end)}
                    </span>
                    {isActive && (
                      <span className="text-xs font-bold text-amber-700 flex items-center gap-1 animate-pulse">
                        <Play className="w-3 h-3 fill-amber-700" /> Playing Now
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">Touch to play this segment</span>
                </div>

                {/* Subtitle Line in selected language */}
                <p className={`text-base sm:text-lg leading-relaxed ${
                  subLanguage === 'hi' || subLanguage === 'mr' ? 'font-devanagari' : 'font-sans'
                } ${isActive ? 'text-slate-950 font-bold' : 'text-slate-700'}`}>
                  "{cue[subLanguage] || cue.en}"
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
