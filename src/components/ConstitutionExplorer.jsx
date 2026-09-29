import React, { useState } from 'react';
import { 
  Scale, 
  BookOpen, 
  MessageSquare, 
  FileCheck, 
  Bookmark, 
  CheckCircle, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Shield,
  Layers,
  Info
} from 'lucide-react';
import { constitutionArticles } from '../data/constitutionData';
import { translations } from '../data/translations';
import { audioEngine } from '../utils/audioEngine';

export default function ConstitutionExplorer({ onAddToCollection, collectionItemIds, language }) {
  const t = translations[language] || translations.en;

  const [activeArticleId, setActiveArticleId] = useState('art-17'); // default Article 17
  const [isSpeaking, setIsSpeaking] = useState(false);

  const article = constitutionArticles.find(a => a.id === activeArticleId) || constitutionArticles[0];
  const isSaved = collectionItemIds.includes(article.id);

  const handleListenExplainer = () => {
    if (isSpeaking) {
      audioEngine.stopSpeech();
      setIsSpeaking(false);
    } else {
      const explainerText = article.plainExplainer[language] || article.plainExplainer.en;
      setIsSpeaking(true);
      audioEngine.speakText(
        explainerText,
        language,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-10 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
            <Scale className="w-4 h-4 text-amber-500" />
            Republic of India Constitutional Repository
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-[#0B1F5C]">
            {t.constitution}
          </h2>
          <p className="text-sm text-slate-600">
            Compare Dr. Ambedkar's Constituent Assembly debate speeches, final text, and plain-language public explainers
          </p>
        </div>

        {/* Collection & Audio Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleListenExplainer}
            className={`touch-target px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all ${
              isSpeaking
                ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-700" />}
            <span>{isSpeaking ? t.stopAudio : "Listen Plain Explainer"}</span>
          </button>

          <button
            onClick={() => onAddToCollection({
              id: article.id,
              title: `${article.articleNumber}: ${article.title}`,
              category: "Constitutional Article",
              citation: article.cadSpeaker,
              snippet: article.finalText.substring(0, 180) + "...",
              date: article.cadDate
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

      {/* Article Selector Navigation Rail */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {constitutionArticles.map((art) => (
          <button
            key={art.id}
            onClick={() => {
              setActiveArticleId(art.id);
              if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }
            }}
            className={`touch-target px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${
              activeArticleId === art.id
                ? 'bg-[#0B1F5C] text-white shadow-lg border-2 border-amber-400'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 shadow-sm'
            }`}
          >
            <span className="font-bold">{art.articleNumber}</span>
            <span className={`text-[11px] font-normal max-w-[90px] truncate ${activeArticleId === art.id ? 'text-amber-300' : 'text-slate-500'}`}>
              {art.title}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Article Showcase Header */}
      <div className="bg-[#0B1F5C] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-400/30 flex flex-col md:flex-row md:items-start justify-between gap-6 overflow-hidden">
        <div className="min-w-0 flex-1">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 inline-block">
            {article.part}
          </span>
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white mt-3 leading-snug break-words">
            {article.articleNumber}: {article.title}
          </h3>
          <p className="text-xs text-blue-200 mt-2">
            Debated under Drafting Committee Chairmanship of Dr. B. R. Ambedkar
          </p>
        </div>

        {/* Key Tenets Tags */}
        <div className="flex flex-wrap gap-2 flex-shrink-0 max-w-xs">
          {article.keyTenets.map((k, i) => (
            <span key={i} className="text-xs bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
              ✓ {k}
            </span>
          ))}
        </div>
      </div>

      {/* 3-Column Tripartite Archival Comparison Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Dr. Ambedkar's CAD Debate Excerpt */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mb-4">
              <MessageSquare className="w-4 h-4 text-amber-600" />
              1. CAD Debate Speech Excerpt
            </div>
            
            <p className="text-sm sm:text-base font-heading italic text-slate-800 leading-relaxed bg-[#FCFBF7] p-5 rounded-2xl border-l-4 border-amber-500 shadow-inner">
              "{article.cadExcerpt}"
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500 space-y-1">
            <p><strong>Speaker:</strong> {article.cadSpeaker}</p>
            <p><strong>Session Date:</strong> {article.cadDate}</p>
          </div>
        </div>

        {/* Column 2: Final Adopted Constitutional Text */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 p-2.5 rounded-xl border border-blue-200 mb-4">
              <FileCheck className="w-4 h-4 text-blue-700" />
              2. Final Adopted Text (1950)
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-sm sm:text-base font-serif text-slate-900 leading-relaxed shadow-inner">
              {article.finalText}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500 space-y-1">
            <p><strong>Status:</strong> Enacted Law of the Land</p>
            <p><strong>Effective Date:</strong> 26 January 1950</p>
          </div>
        </div>

        {/* Column 3: Plain Language Public Explainer */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 mb-4">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              3. Plain-Language Explainer
            </div>

            <p className="text-sm sm:text-base text-slate-800 leading-relaxed bg-emerald-50/40 p-5 rounded-2xl border border-emerald-100 shadow-inner">
              {article.plainExplainer[language] || article.plainExplainer.en}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500 space-y-1">
            <p><strong>Audience:</strong> Citizens, Students & Researchers</p>
            <p><strong>Language:</strong> {language.toUpperCase()}</p>
          </div>
        </div>

      </div>

    </div>
  );
}
