import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Milestone, 
  Calendar, 
  MapPin, 
  Quote, 
  Volume2, 
  Bookmark, 
  CheckCircle, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { timelineEras, timelineMilestones } from '../data/timelineData';
import { translations } from '../data/translations';
import { audioEngine } from '../utils/audioEngine';

export default function InteractiveTimeline({ onAddToCollection, collectionItemIds, language }) {
  const t = translations[language] || translations.en;
  
  const [selectedEra, setSelectedEra] = useState('all');
  const [activeMilestoneModal, setActiveMilestoneModal] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  const filteredMilestones = selectedEra === 'all'
    ? timelineMilestones
    : timelineMilestones.filter(m => m.eraId === selectedEra);

  // Read quote via Web Speech TTS
  const handleListenQuote = (item) => {
    if (speakingId === item.id) {
      audioEngine.stopSpeech();
      setSpeakingId(null);
    } else {
      const quoteText = language === 'hi' ? item.quoteHi : language === 'mr' ? item.quoteMr : item.quote;
      setSpeakingId(item.id);
      audioEngine.speakText(
        quoteText,
        language,
        () => setSpeakingId(item.id),
        () => setSpeakingId(null)
      );
    }
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-10 py-6 space-y-6 select-none overflow-hidden">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
            <Milestone className="w-4 h-4 text-amber-500" />
            Chronological Panorama 1891–1956
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-[#0B1F5C]">
            {t.timeline}
          </h2>
          <p className="text-sm text-slate-600">
            Horizontal parallax journey across the five transformative epochs of Dr. B. R. Ambedkar's life
          </p>
        </div>

        {/* Scroll Nav Buttons for Kiosk Touch */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollLeft}
            className="touch-target px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-sm flex items-center gap-2 text-sm font-semibold active:scale-95"
            title="Scroll Earlier"
          >
            <ChevronLeft className="w-5 h-5 text-blue-800" />
            <span>Earlier (Left)</span>
          </button>

          <button
            onClick={scrollRight}
            className="touch-target px-5 py-3 rounded-2xl bg-[#0B1F5C] hover:bg-[#1E3A8A] text-white shadow-md flex items-center gap-2 text-sm font-semibold active:scale-95"
            title="Scroll Forward"
          >
            <span>Later (Right)</span>
            <ChevronRight className="w-5 h-5 text-amber-300" />
          </button>
        </div>
      </div>

      {/* Era Navigation Rail — scrolls horizontally, never overflows page */}
      <div className="w-full overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => setSelectedEra('all')}
            className={`touch-target px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
              selectedEra === 'all'
                ? 'bg-[#0B1F5C] text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Eras (1891–1956)
          </button>

          {timelineEras.map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`touch-target px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${
                selectedEra === era.id
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md border border-amber-400'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{era.name}</span>
              <span className="text-[10px] font-mono opacity-75">({era.years})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Parallax Scroll Runway */}
      <div 
        ref={scrollContainerRef}
        className="flex items-stretch gap-6 overflow-x-auto pb-8 pt-2 px-1 scroll-smooth snap-x snap-mandatory focus:outline-none w-full"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {filteredMilestones.map((m, index) => {
          const isSaved = collectionItemIds.includes(m.id);
          const isSpeaking = speakingId === m.id;
          const era = timelineEras.find(e => e.id === m.eraId);

          return (
            <div
              key={m.id}
              className="flex-shrink-0 w-[360px] sm:w-[400px] snap-center bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Banner with Year and Badge */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3 min-w-0">
                  <span className="text-2xl font-heading font-black text-[#0B1F5C] flex-shrink-0">
                    {m.year}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-right leading-tight max-w-[130px] break-words">
                    {m.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-blue-700" />
                  <span className="font-semibold text-slate-700">{m.date}</span>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span className="truncate">{m.location}</span>
                </div>

                {/* Duotone Archival Photo Box */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 bg-slate-950 duotone-hero border border-slate-200 shadow-inner">
                  <img
                    src={m.image}
                    alt={m.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] text-amber-200">
                    Era: {era?.name}
                  </div>
                </div>

                {/* Milestone Title */}
                <h3 className="text-lg font-heading font-bold text-[#0B1F5C] mb-2 leading-snug line-clamp-2 break-words">
                  {m.title}
                </h3>

                {/* Dr. Ambedkar's Exact Quote */}
                <div className="bg-amber-50/70 border-l-4 border-amber-500 p-3.5 rounded-r-xl mb-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-amber-800 font-bold">
                    <span className="flex items-center gap-1">
                      <Quote className="w-3.5 h-3.5 text-amber-600" /> Dr. Ambedkar's Quote:
                    </span>
                    <button
                      onClick={() => handleListenQuote(m)}
                      className="touch-target p-1 text-blue-900 hover:text-amber-800"
                      title="Listen to quote"
                    >
                      <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-600 animate-pulse' : ''}`} />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm italic text-slate-800 leading-relaxed font-heading">
                    "{language === 'hi' ? m.quoteHi : language === 'mr' ? m.quoteMr : m.quote}"
                  </p>
                </div>

                {/* Historical Significance */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {m.significance}
                </p>
              </div>

              {/* Bottom Touch Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                <button
                  onClick={() => setActiveMilestoneModal(m)}
                  className="touch-target px-3.5 py-2 text-xs font-semibold text-blue-800 hover:text-blue-950 flex items-center gap-1"
                >
                  <span>{t.viewDetails}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onAddToCollection({
                    id: m.id,
                    title: `${m.year}: ${m.title}`,
                    category: "Timeline Milestone",
                    citation: `${m.date}, ${m.location}`,
                    snippet: m.quote,
                    date: m.date
                  })}
                  className={`touch-target px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                    isSaved
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 hover:bg-[#0B1F5C] hover:text-white text-slate-800 border-slate-200'
                  }`}
                >
                  {isSaved ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5 text-amber-600" />}
                  <span>{isSaved ? t.savedToCollection : t.addToCollection}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal Deep Dive on Milestone Tap */}
      {activeMilestoneModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-amber-400 space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-3xl font-heading font-black text-[#0B1F5C]">
                  {activeMilestoneModal.year}
                </span>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  {activeMilestoneModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveMilestoneModal(null)}
                className="touch-target p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="bg-amber-50 p-5 rounded-2xl border-l-4 border-amber-500 space-y-2">
              <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block">
                Primary Historical Quote
              </span>
              <p className="text-base font-heading italic text-slate-900 leading-relaxed">
                "{language === 'hi' ? activeMilestoneModal.quoteHi : language === 'mr' ? activeMilestoneModal.quoteMr : activeMilestoneModal.quote}"
              </p>
            </div>

            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900">Historical Context & Impact:</h4>
              <p>{activeMilestoneModal.significance}</p>
              <p className="text-xs text-slate-500 font-mono pt-2">
                Location: {activeMilestoneModal.location} | Date: {activeMilestoneModal.date}
              </p>
            </div>

            <button
              onClick={() => setActiveMilestoneModal(null)}
              className="touch-target w-full py-3.5 bg-[#0B1F5C] text-white rounded-2xl font-bold hover:bg-blue-900 transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
