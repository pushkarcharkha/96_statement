import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Flame, 
  Users, 
  Quote, 
  Sparkles, 
  Bookmark, 
  CheckCircle, 
  Printer, 
  ArrowRight,
  HelpCircle,
  Compass
} from 'lucide-react';
import { lessonsData } from '../data/lessonsData';
import { translations } from '../data/translations';

export default function LessonOfTheDay({ onAddToCollection, collectionItemIds, language }) {
  const t = translations[language] || translations.en;

  const [activeTab, setActiveTab] = useState('educate');
  const activeLesson = lessonsData.find(l => l.id === activeTab) || lessonsData[0];
  const isSaved = collectionItemIds.includes(activeLesson.id);

  const iconMap = {
    GraduationCap,
    Flame,
    Users
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-10 py-6 space-y-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
            <Compass className="w-4 h-4 text-amber-500" />
            The Three Eternal Pillars
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-[#0B1F5C]">
            {t.lesson}: "Educate, Agitate, Organize"
          </h2>
          <p className="text-sm text-slate-600">
            Timeless socio-political guidance from Dr. Ambedkar with contemporary democratic relevance
          </p>
        </div>

        {/* Print / Save Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintCard}
            className="touch-target px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-sm flex items-center gap-2 text-xs font-semibold"
          >
            <Printer className="w-4 h-4 text-blue-800" />
            <span>Print Lesson Card</span>
          </button>

          <button
            onClick={() => onAddToCollection({
              id: activeLesson.id,
              title: `Lesson: ${activeLesson.pillar}`,
              category: "Lesson of the Day",
              citation: activeLesson.quoteSource,
              snippet: activeLesson.quote,
              date: "Daily Reflection"
            })}
            className={`touch-target px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all ${
              isSaved
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-[#0B1F5C] hover:bg-[#1E3A8A] text-white border-[#0B1F5C]'
            }`}
          >
            {isSaved ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4 text-amber-300" />}
            <span>{isSaved ? t.savedToCollection : t.addToCollection}</span>
          </button>
        </div>
      </div>

      {/* Three Pillars Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lessonsData.map((item) => {
          const Icon = iconMap[item.icon] || GraduationCap;
          const isSelected = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id)}
              className={`p-6 rounded-3xl text-left border-2 transition-all flex flex-col justify-between shadow-md ${
                isSelected
                  ? 'bg-gradient-to-br from-[#0B1F5C] to-[#1E3A8A] text-white border-amber-400 ring-4 ring-amber-400/20 shadow-xl'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-blue-50 text-blue-900'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider ${
                    isSelected ? 'bg-black/30 text-amber-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    Pillar
                  </span>
                </div>

                <h3 className="text-2xl font-heading font-extrabold mb-1">
                  {item.pillar}
                </h3>
                <p className={`text-sm font-devanagari font-semibold ${isSelected ? 'text-amber-300' : 'text-blue-800'}`}>
                  {item.pillarDevanagari}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-amber-200' : 'text-slate-500'}>
                  Touch to explore
                </span>
                <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Expanded Active Lesson Deep-Dive Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLesson.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 space-y-8"
        >
          {/* Real Quote Banner */}
          <div className="bg-gradient-to-r from-amber-50 via-amber-100/50 to-blue-50 rounded-2xl p-6 sm:p-8 border-l-8 border-amber-500 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Quote className="w-4 h-4 text-amber-600" />
              Immortal Historical Dictum:
            </div>
            <p className="text-xl sm:text-2xl font-heading italic text-slate-900 leading-relaxed font-semibold">
              "{activeLesson.quote}"
            </p>
            <p className="text-xs font-mono text-slate-600 uppercase tracking-widest pt-2">
              — {activeLesson.quoteSource}
            </p>
          </div>

          {/* Dual Column: Historical Context vs Modern Application */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Historical Context */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
              <h4 className="text-lg font-heading font-bold text-[#0B1F5C] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Historical Context & Philosophy
              </h4>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {language === 'hi' ? activeLesson.contextHi : language === 'mr' ? activeLesson.contextMr : activeLesson.context}
              </p>
            </div>

            {/* Modern Civic Application */}
            <div className="bg-blue-50/60 rounded-2xl p-6 border border-blue-200 space-y-3">
              <h4 className="text-lg font-heading font-bold text-blue-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-700" />
                Modern Application for Today's Citizens
              </h4>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {language === 'hi' ? activeLesson.modernApplicationHi : language === 'mr' ? activeLesson.modernApplicationMr : activeLesson.modernApplication}
              </p>
            </div>

          </div>

          {/* Daily Reflection Question */}
          <div className="bg-[#0B1F5C] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 text-slate-950">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h5 className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                  Daily Visitor Meditation
                </h5>
                <p className="text-base font-heading font-medium text-slate-100">
                  {activeLesson.reflectionQuestion}
                </p>
              </div>
            </div>

            <button
              onClick={() => onAddToCollection({
                id: `reflection-${activeLesson.id}`,
                title: `Reflection: ${activeLesson.pillar}`,
                category: "Reflection Question",
                citation: "DAIC Daily Meditation",
                snippet: activeLesson.reflectionQuestion,
                date: "Today"
              })}
              className="touch-target px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold whitespace-nowrap"
            >
              Save Reflection to Dossier
            </button>
          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
