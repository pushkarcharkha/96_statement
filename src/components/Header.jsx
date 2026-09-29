import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Languages, 
  Eye, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Clock, 
  Maximize2, 
  Minimize2, 
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  RotateCcw
} from 'lucide-react';
import { translations } from '../data/translations';
import { audioEngine } from '../utils/audioEngine';

export default function Header({
  currentScreen,
  setCurrentScreen,
  language,
  setLanguage,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  audioEnabled,
  setAudioEnabled,
  collectionCount,
  onOpenCollection,
  onResetToAttract,
  showPresenterGuide,
  setShowPresenterGuide
}) {
  const [timeStr, setTimeStr] = useState('');
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const t = translations[language] || translations.en;

  // Real-time clock formatted for museum terminal
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
      };
      setTimeStr(now.toLocaleString('en-IN', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const navLinks = [
    { id: 'home', label: t.home },
    { id: 'search', label: t.search },
    { id: 'manuscripts', label: t.manuscripts },
    { id: 'audio-video', label: t.audioVideo },
    { id: 'timeline', label: t.timeline },
    { id: 'ask-assistant', label: t.askAssistant },
    { id: 'constitution', label: t.constitution },
    { id: 'lesson', label: t.lesson },
    { id: 'admin', label: t.admin },
    { id: 'hardware', label: t.hardware },
  ];

  return (
    <header className="relative z-40 bg-gradient-to-r from-[#061033] via-[#0B1F5C] to-[#1E3A8A] text-white shadow-xl border-b border-amber-500/20 select-none">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Branding & Emblems */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1.5 transition-all hover:bg-white/5 active:scale-95"
            title="Dr. Ambedkar International Centre"
          >
            {/* Spinning Ashoka Chakra Badge */}
            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-900/60 border border-amber-400/40 shadow-inner">
              <img 
                src="/assets/chakra.svg" 
                alt="Ashoka Chakra" 
                className="w-10 h-10 animate-spin-slow text-amber-300 drop-shadow-md"
              />
              <div className="absolute inset-0 rounded-full bg-radial-gradient from-transparent to-black/20 pointer-events-none" />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {t.instituteName}
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/30">
                  DAIC KIOSK
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-heading font-bold text-white tracking-wide leading-tight">
                {t.archiveTitle}
              </h1>
            </div>
          </button>
        </div>

        {/* Center: Live Clock & Screen Indicator */}
        <div className="hidden xl:flex items-center gap-6 px-4 py-1.5 bg-black/25 rounded-full border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs text-blue-200">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-mono tracking-wider font-medium">{timeStr}</span>
          </div>

          <div className="h-3.5 w-px bg-white/20" />

          {/* Quick Nav Drawer Trigger / Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400">Section:</span>
            <span className="text-amber-300 font-semibold bg-white/10 px-2.5 py-0.5 rounded-full">
              {navLinks.find(l => l.id === currentScreen)?.label || t.home}
            </span>
          </div>
        </div>

        {/* Right: Kiosk Touch Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher */}
          <div className="flex items-center bg-black/30 rounded-xl p-1 border border-white/15">
            {[
              { code: 'en', label: 'EN' },
              { code: 'hi', label: 'हिं' },
              { code: 'mr', label: 'मरा' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`touch-target px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  language === lang.code
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md scale-105'
                    : 'text-blue-100 hover:bg-white/10'
                }`}
                title={`Switch language to ${lang.label}`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Accessibility Toggle Button */}
          <button
            onClick={() => setShowAccessModal(!showAccessModal)}
            className={`touch-target px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
              highContrast || fontSize !== 'normal'
                ? 'bg-amber-400 text-slate-950 border-amber-300'
                : 'bg-black/30 text-blue-100 border-white/15 hover:bg-white/10'
            }`}
            title="Accessibility Controls"
          >
            <Eye className="w-5 h-5 text-amber-400" />
            <span className="hidden md:inline">{t.accessibility}</span>
          </button>

          {/* Audio Narration Toggle & Voice Test */}
          <button
            onClick={() => {
              const nextState = !audioEnabled;
              setAudioEnabled(nextState);
              audioEngine.playChime('tap');
              if (nextState) {
                const notice = language === 'hi' 
                  ? "ऑडियो गाइड सक्रिय है। डॉ. आंबेडकर अंतर्राष्ट्रीय केंद्र।"
                  : language === 'mr'
                  ? "ऑडिओ गाईड सक्रिय आहे. डॉ. आंबेडकर आंतरराष्ट्रीय केंद्र."
                  : "Audio narration enabled. Dr. Ambedkar International Centre Archive.";
                audioEngine.speakText(notice, language);
              } else {
                audioEngine.stopSpeech();
              }
            }}
            className={`touch-target p-2.5 rounded-xl border transition-all ${
              audioEnabled
                ? 'bg-blue-600 text-white border-blue-400 shadow-md ring-2 ring-amber-400/40'
                : 'bg-black/30 text-blue-300 border-white/15 hover:bg-white/10'
            }`}
            title={audioEnabled ? "Audio Narration Active (Touch to test/toggle)" : "Enable Audio Narration"}
          >
            {audioEnabled ? <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          {/* My Collection Drawer Trigger with Counter */}
          <button
            onClick={onOpenCollection}
            className="touch-target relative px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
            title="Open My Collection & Reading List"
          >
            <Bookmark className="w-4 h-4 fill-slate-950" />
            <span className="hidden lg:inline">{t.myCollection}</span>
            {collectionCount > 0 && (
              <span className="bg-blue-900 text-white text-[11px] font-mono px-2 py-0.5 rounded-full border border-white/30 shadow-inner">
                {collectionCount}
              </span>
            )}
          </button>

          {/* Quick Menu / All Screens modal toggle */}
          <button
            onClick={() => setShowNavMenu(!showNavMenu)}
            className="touch-target p-2.5 rounded-xl bg-black/30 text-white border border-white/15 hover:bg-white/10 transition-all"
            title="Open Directory Menu"
          >
            {showNavMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-amber-300" />}
          </button>

          {/* Attract Screen Lock Button (Kiosk Reset) */}
          <button
            onClick={onResetToAttract}
            className="touch-target p-2.5 rounded-xl bg-black/30 text-blue-200 border border-white/15 hover:bg-white/10 transition-all"
            title="Return to Attract Screen (Lock Kiosk)"
          >
            <RotateCcw className="w-4 h-4 text-blue-300" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:inline-flex touch-target p-2.5 rounded-xl bg-black/30 text-blue-200 border border-white/15 hover:bg-white/10 transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

        </div>
      </div>

      {/* Accessibility Flyout Modal */}
      {showAccessModal && (
        <div className="absolute top-full right-4 mt-2 w-80 bg-slate-900 border border-amber-400/40 rounded-2xl p-5 shadow-2xl z-50 text-white animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <h3 className="font-bold text-amber-300 flex items-center gap-2">
              <Eye className="w-4 h-4" /> {t.accessibility}
            </h3>
            <button 
              onClick={() => setShowAccessModal(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Font Size Selector */}
          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium">
              {t.fontSize}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: t.normal, scale: '100%' },
                { id: 'large', label: t.large, scale: '115%' },
                { id: 'extraLarge', label: t.extraLarge, scale: '130%' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFontSize(f.id)}
                  className={`touch-target flex-col py-2 px-1 rounded-xl text-xs font-semibold border transition-all ${
                    fontSize === f.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className="text-[10px] opacity-75">{f.scale}</span>
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Mode Toggle */}
          <div className="pt-2 border-t border-white/10">
            <label className="flex items-center justify-between cursor-pointer py-2">
              <div>
                <span className="text-sm font-semibold text-white block">{t.highContrast}</span>
                <span className="text-xs text-slate-400">High contrast gold on black</span>
              </div>
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  highContrast ? 'bg-amber-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    highContrast ? 'translate-x-6 bg-slate-950' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>
        </div>
      )}

      {/* Directory Menu Modal */}
      {showNavMenu && (
        <div className="fixed inset-0 top-[73px] bg-slate-950/80 backdrop-blur-md z-50 flex items-start justify-center p-6 overflow-y-auto">
          <div className="bg-[#0B1F5C] border border-amber-400/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-6">
              <div>
                <h3 className="text-2xl font-heading font-bold text-white">
                  Museum Terminal Directory
                </h3>
                <p className="text-sm text-blue-200">
                  Select any section to navigate immediately
                </p>
              </div>
              <button 
                onClick={() => setShowNavMenu(false)}
                className="touch-target p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentScreen(link.id);
                    setShowNavMenu(false);
                  }}
                  className={`touch-target justify-start p-4 rounded-2xl text-left border transition-all ${
                    currentScreen === link.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg scale-102'
                      : 'bg-white/5 text-white border-white/10 hover:bg-white/15 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${currentScreen === link.id ? 'bg-slate-950' : 'bg-amber-400'}`} />
                    <span className="text-base font-semibold">{link.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
