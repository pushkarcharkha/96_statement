import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bot, 
  Scale, 
  Scroll, 
  Milestone, 
  Radio, 
  GraduationCap, 
  Bookmark,
  ArrowRight,
  Quote,
  Shield,
  BookOpen,
  Mic
} from 'lucide-react';
import { translations } from '../data/translations';
import { audioEngine } from '../utils/audioEngine';

export default function HomeScreen({ onSelectScreen, language }) {
  const t = translations[language] || translations.en;

  // Typing effect for daily quote
  const quoteEnglish = "Political democracy cannot last unless there lies at the base of it social democracy. What does social democracy mean? It means a way of life which recognizes liberty, equality and fraternity as the principles of life.";
  const quoteHindi = "राजनीतिक लोकतंत्र तब तक नहीं टिक सकता जब तक उसके आधार में सामाजिक लोकतंत्र न हो। स्वतंत्रता, समानता और बंधुता जीवन के मूल सिद्धांत हैं।";
  const quoteMarathi = "राजकीय लोकशाहीच्या पायाशी सामाजिक लोकशाही असल्याशिवाय ती चिरकाल टिकू शकत नाही. स्वातंत्र्य, समता आणि बंधुता हे जीवनाचे मूलतत्त्व आहे.";

  const targetQuote = language === 'hi' ? quoteHindi : language === 'mr' ? quoteMarathi : quoteEnglish;
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCharIndex(0);
  }, [language]);

  useEffect(() => {
    if (charIndex < targetQuote.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + targetQuote.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 18);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, targetQuote]);

  // 6 primary features — clean and clear for video demonstration
  const features = [
    {
      id: 'ask-assistant',
      title: 'Ask Babasaheb',
      subtitle: 'AI Research Assistant',
      desc: 'Chat with our AI grounded in 35,000+ BAWS & CAD pages. Get instant answers with exact citations.',
      icon: Bot,
      badge: 'Try It Now',
      highlight: true, // Gold accent
      gradient: 'from-[#0B1F5C] to-[#1E3A8A]',
      badgeColor: 'bg-amber-400 text-slate-950',
    },
    {
      id: 'search',
      title: 'Semantic Search',
      subtitle: 'Speeches · Writings · Debates',
      desc: 'Search 35,420 archival records. Explore the D3 Knowledge Graph connecting Dr. Ambedkar\'s ideas.',
      icon: Search,
      badge: 'Explore Archive',
      gradient: 'from-[#1E3A8A] to-[#2563EB]',
      badgeColor: 'bg-blue-300/20 text-blue-100 border border-blue-400/40',
    },
    {
      id: 'constitution',
      title: 'Constitution Explorer',
      subtitle: '3-Way Article Comparison',
      desc: 'Compare Dr. Ambedkar\'s CAD debates alongside the final enacted law and plain-language explainers.',
      icon: Scale,
      badge: 'CAD Archives',
      gradient: 'from-[#142C75] to-[#1E3A8A]',
      badgeColor: 'bg-blue-300/20 text-blue-100 border border-blue-400/40',
    },
    {
      id: 'manuscripts',
      title: 'Manuscript Viewer',
      subtitle: '600 DPI Scans · OCR · Translation',
      desc: 'Zoom into original handwritten drafts, view OCR confidence scoring and listen to translations.',
      icon: Scroll,
      badge: 'Primary Sources',
      gradient: 'from-slate-900 to-[#0B1F5C]',
      badgeColor: 'bg-blue-300/20 text-blue-100 border border-blue-400/40',
    },
    {
      id: 'audio-video',
      title: 'Audio–Video Archive',
      subtitle: 'Restored Voice · Synced Transcript',
      desc: 'Listen to historic addresses with live waveform equalizer and real-time synchronized subtitles.',
      icon: Radio,
      badge: 'Restored Audio',
      gradient: 'from-[#0B1F5C] to-indigo-900',
      badgeColor: 'bg-blue-300/20 text-blue-100 border border-blue-400/40',
    },
    {
      id: 'timeline',
      title: 'Life & Legacy Timeline',
      subtitle: '1891 – 1956 · 5 Historical Eras',
      desc: 'Explore Dr. Ambedkar\'s journey from Mhow to Nagpur through milestone cards and archival photographs.',
      icon: Milestone,
      badge: '5 Eras',
      gradient: 'from-[#0B1F5C] to-blue-900',
      badgeColor: 'bg-blue-300/20 text-blue-100 border border-blue-400/40',
    },
  ];

  // Quick stats for credibility bar
  const stats = [
    { value: '35,420+', label: 'Digitized Pages' },
    { value: '142', label: 'Historic Speeches' },
    { value: '395', label: 'Constitutional Articles' },
    { value: '18', label: 'Restored Audio Tracks' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-73px)] bg-[#F8FAFC] pb-10">
      
      {/* Background Watermark Chakra */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <img 
          src="/assets/chakra.svg" 
          alt="Watermark" 
          className="w-[900px] h-[900px] max-w-none animate-spin-slow opacity-[0.035]"
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pt-8 space-y-8">
        
        {/* ── HERO BANNER ── */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-[#0B1F5C] border border-amber-400/25 shadow-2xl"
        >
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="/assets/babasaheb.webp" 
              alt="Dr. B. R. Ambedkar"
              className="absolute right-0 top-0 h-full w-auto object-cover object-top opacity-20 pointer-events-none"
              style={{ maxWidth: '45%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F5C] via-[#0B1F5C]/95 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-10">
            
            {/* Portrait frame — left */}
            <div className="flex-shrink-0 hidden lg:block">
              <div className="w-56 h-64 rounded-2xl p-2.5 bg-gradient-to-tr from-amber-400/60 via-blue-400/30 to-amber-200/30 shadow-xl border border-amber-300/30">
                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-950">
                  <img 
                    src="/assets/babasaheb.webp" 
                    alt="Dr. Babasaheb Ambedkar Portrait" 
                    className="w-full h-full object-cover object-top contrast-125"
                  />
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="flex-1 space-y-5 text-white">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  National Repository
                </span>
                <span className="text-blue-200 text-xs font-medium flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-300" />
                  Dr. Ambedkar International Centre, 15 Janpath, New Delhi
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
                  Babasaheb Digital Heritage Archive
                </h1>
                <p className="text-amber-300 text-sm font-semibold mt-1.5">
                  Touch Kiosk · Research · Public Education · Constitutional Heritage
                </p>
              </div>

              {/* Typing quote */}
              <div className="bg-white/8 backdrop-blur-md rounded-2xl p-5 border border-white/12 min-h-[80px] flex items-center">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm sm:text-base font-heading italic text-slate-100 leading-relaxed">
                      "{displayedText}"
                      <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-pulse align-middle" />
                    </p>
                    <p className="text-[11px] text-amber-300/80 mt-1.5 font-mono uppercase tracking-widest">
                      — Constituent Assembly Closing Address (25 Nov 1949)
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => { audioEngine.playChime('tap'); onSelectScreen('ask-assistant'); }}
                  className="touch-target px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center gap-2.5 shadow-lg transition-all active:scale-95"
                >
                  <Bot className="w-5 h-5" />
                  Ask Babasaheb AI
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { audioEngine.playChime('tap'); onSelectScreen('search'); }}
                  className="touch-target px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center gap-2.5 border border-white/20 transition-all active:scale-95"
                >
                  <Search className="w-4 h-4 text-amber-300" />
                  Search Archive
                </button>
                <button
                  onClick={() => { audioEngine.playChime('tap'); onSelectScreen('timeline'); }}
                  className="touch-target px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center gap-2.5 border border-white/20 transition-all active:scale-95"
                >
                  <Milestone className="w-4 h-4 text-amber-300" />
                  View Timeline
                </button>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 border-t border-white/10 bg-black/40">
            {stats.map((s, i) => (
              <div key={i} className={`py-3 px-4 text-center ${i > 0 ? 'border-l border-white/10' : ''}`}>
                <div className="text-xl font-bold font-mono text-amber-300">{s.value}</div>
                <div className="text-[11px] text-blue-200">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── SECTION TITLE ── */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F5C] uppercase tracking-widest">
            <BookOpen className="w-4 h-4 text-amber-500" />
            Explore the Archive
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>

        {/* ── 6 FEATURE CARDS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.button
                key={feat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                whileHover={{ scale: 1.025, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { audioEngine.playChime('tap'); onSelectScreen(feat.id); }}
                className={`text-left rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-200 bg-gradient-to-br ${feat.gradient} text-white border ${feat.highlight ? 'border-amber-400/60' : 'border-white/10'} flex flex-col justify-between min-h-[210px] group relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-amber-400`}
              >
                {/* Subtle shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />

                {/* Top: icon + badge */}
                <div className="flex items-start justify-between gap-3 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner group-hover:scale-110 transition-transform ${feat.highlight ? 'bg-amber-400/20 border-amber-400/40' : 'bg-white/10 border-white/20'}`}>
                    <Icon className={`w-6 h-6 ${feat.highlight ? 'text-amber-400' : 'text-blue-200'}`} />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${feat.badgeColor}`}>
                    {feat.badge}
                  </span>
                </div>

                {/* Middle: text */}
                <div className="space-y-1.5 my-4 relative z-10">
                  <h3 className={`text-lg font-heading font-bold leading-snug group-hover:text-amber-300 transition-colors ${feat.highlight ? 'text-amber-200' : 'text-white'}`}>
                    {feat.title}
                  </h3>
                  <div className="text-xs font-semibold text-amber-400/80">
                    {feat.subtitle}
                  </div>
                  <p className="text-xs text-blue-100/80 leading-relaxed line-clamp-2">
                    {feat.desc}
                  </p>
                </div>

                {/* Bottom: arrow */}
                <div className="flex items-center justify-between border-t border-white/10 pt-3 relative z-10">
                  <span className="text-xs font-semibold text-amber-300/80">Open</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ── SECONDARY TOOLS (compact row) ── */}
        <div className="pt-2">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-3 pl-1">More Tools</p>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'lesson', label: 'Lesson of the Day', icon: GraduationCap },
              { id: 'my-collection', label: 'My Collection & QR Handoff', icon: Bookmark },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { audioEngine.playChime('tap'); onSelectScreen(item.id); }}
                  className="touch-target flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-800 text-sm font-semibold shadow-sm transition-all active:scale-95"
                >
                  <Icon className="w-4 h-4 text-blue-700" />
                  {item.label}
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
