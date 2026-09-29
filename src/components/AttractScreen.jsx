import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, ShieldCheck, ChevronRight, Volume2 } from 'lucide-react';
import { translations } from '../data/translations';

export default function AttractScreen({ onBegin, language, setLanguage }) {
  const t = translations[language] || translations.en;

  const quotes = [
    {
      en: "Life should be great rather than long.",
      hi: "जीवन लम्बा होने के बजाय महान होना चाहिए।",
      mr: "आयुष्य हे लांब असण्यापेक्षा महान असायला हवे.",
      source: "Speech at Tilak Ghat, Bombay (1942)"
    },
    {
      en: "Cultivation of mind should be the ultimate aim of human existence.",
      hi: "मनुष्य के अस्तित्व का अंतिम ध्येय मन की संस्कृति और प्रबुद्धता होना चाहिए।",
      mr: "बुद्धीचा आणि मनाचा विकास हेच मानवी जीवनाचे अंतिम ध्येय असायला हवे.",
      source: "Depressed Classes Conference (1942)"
    },
    {
      en: "Political democracy cannot last unless there lies at the base of it social democracy.",
      hi: "राजनीतिक लोकतंत्र तब तक नहीं टिक सकता जब तक कि उसके आधार में सामाजिक लोकतंत्र न हो।",
      mr: "राजकीय लोकशाहीच्या पायाशी सामाजिक लोकशाही असल्याशिवाय ती चिरकाल टिकू शकत नाही.",
      source: "Constituent Assembly (25 Nov 1949)"
    },
    {
      en: "Educate, Agitate, Organize; have faith in yourselves.",
      hi: "शिक्षित बनो, संघर्ष करो, संगठित रहो; अपने आप में विश्वास रखो।",
      mr: "शिका, संघर्ष करा, संघटित व्हा; स्वतःवर विश्वास ठेवा.",
      source: "Bahishkrit Hitakarini Sabha (1924)"
    }
  ];

  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const currentQuote = quotes[activeQuoteIndex];

  return (
    <div 
      onClick={onBegin}
      className="fixed inset-0 z-50 bg-[#061033] text-white flex flex-col justify-between overflow-hidden cursor-pointer select-none"
    >
      {/* Background Rotating 24-Spoke Ashoka Chakra Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img 
          src="/assets/chakra.svg" 
          alt="Ashoka Chakra Watermark" 
          className="w-[1200px] h-[1200px] max-w-none opacity-10 animate-spin-slow text-blue-300 drop-shadow-[0_0_80px_rgba(37,99,235,0.4)]"
        />
        {/* Ambient radial lighting overlays */}
        <div className="absolute inset-0 bg-radial-gradient from-blue-900/30 via-slate-950/80 to-[#061033] pointer-events-none" />
      </div>

      {/* Top Bar: Institute Credentials & Language Select */}
      <header className="relative z-10 px-8 py-6 flex items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-amber-400/50 bg-blue-950/80 flex items-center justify-center p-1 shadow-md">
            <img src="/assets/chakra.svg" alt="Emblem" className="w-8 h-8 text-amber-400 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-widest text-amber-300 font-bold">
              {t.instituteName}
            </h2>
            <p className="text-[11px] text-blue-200">
              {t.instituteSub}
            </p>
          </div>
        </div>

        {/* Quick Language Switcher on Attract Screen */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/15"
        >
          {[
            { code: 'en', label: 'English' },
            { code: 'hi', label: 'हिन्दी' },
            { code: 'mr', label: 'मराठी' },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`touch-target px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                language === lang.code
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Hero & Portrait Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-center gap-12 my-auto w-full">
        
        {/* Left: Duotone Portrait with Gold Crest Frame */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex-shrink-0"
        >
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-3xl p-3 bg-gradient-to-tr from-amber-500/60 via-blue-500/40 to-amber-300/30 shadow-[0_0_80px_rgba(11,31,92,0.9)] border border-amber-400/40">
            <div className="relative w-full h-full rounded-2xl overflow-hidden duotone-hero bg-[#0B1F5C] shadow-inner">
              <img 
                src="/assets/babasaheb.webp" 
                alt="Bharat Ratna Dr. B. R. Ambedkar" 
                className="w-full h-full object-cover object-top filter contrast-125 brightness-95"
              />
              {/* Gold Archival Badge */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/30 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-amber-300 tracking-wider">
                  BHARAT RATNA DR. B. R. AMBEDKAR
                </span>
                <span className="text-[10px] text-blue-200">1891 – 1956</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Titles & Animated Rotating Quotation */}
        <div className="text-center lg:text-left max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/60 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Official Archival Museum Terminal
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            {t.archiveTitle}
          </h1>

          <p className="text-lg sm:text-xl text-blue-200 font-light leading-relaxed">
            {t.touchSubtitle}
          </p>

          {/* Cycling Dignified Quotes */}
          <div className="min-h-[140px] flex flex-col justify-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuoteIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <p className="text-xl sm:text-2xl font-heading italic text-amber-200 font-medium">
                  "{language === 'hi' ? currentQuote.hi : language === 'mr' ? currentQuote.mr : currentQuote.en}"
                </p>
                <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  — {currentQuote.source}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pulsing "Touch to Begin" Touch Target */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="touch-target px-8 py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-lg sm:text-xl flex items-center gap-3 shadow-[0_0_40px_rgba(245,158,11,0.5)] border-2 border-amber-200"
            >
              <span>{t.touchToBegin}</span>
              <ChevronRight className="w-6 h-6 animate-pulse" />
            </motion.div>

            <span className="text-xs text-blue-300 font-mono">
              Landscape 1920x1080 Interactive Kiosk
            </span>
          </div>

        </div>

      </main>

      {/* Bottom Footer: Touch prompt & Stats */}
      <footer className="relative z-10 px-8 py-4 bg-black/40 border-t border-white/10 text-center flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300">
        <div className="flex items-center gap-6">
          <span>{t.statsDigitized}</span>
          <span>•</span>
          <span>{t.statsSpeeches}</span>
          <span>•</span>
          <span>{t.statsArticles}</span>
          <span>•</span>
          <span>{t.statsAudio}</span>
        </div>
        <div className="mt-2 sm:mt-0 text-amber-300 font-medium flex items-center gap-2">
          <span>Dr. Ambedkar International Centre, 15 Janpath, New Delhi</span>
        </div>
      </footer>
    </div>
  );
}
