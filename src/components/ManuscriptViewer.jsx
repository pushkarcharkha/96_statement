import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  RefreshCw, 
  Languages, 
  Volume2, 
  VolumeX, 
  FileText, 
  Bookmark, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Sliders,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { manuscriptsData } from '../data/manuscriptsData';
import { translations } from '../data/translations';
import { audioEngine } from '../utils/audioEngine';

export default function ManuscriptViewer({ onAddToCollection, collectionItemIds, language }) {
  const t = translations[language] || translations.en;

  const [activeManuscriptIndex, setActiveManuscriptIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [contrastMode, setContrastMode] = useState('sepia'); // 'sepia' or 'high-contrast'
  const [viewMode, setViewMode] = useState('ocr'); // 'ocr' or 'summary'
  const [transLang, setTransLang] = useState('en'); // 'en', 'hi', 'mr'
  const [isSpeaking, setIsSpeaking] = useState(false);

  const ms = manuscriptsData[activeManuscriptIndex];
  const isSaved = collectionItemIds.includes(ms.id);

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  // Text to Speech
  const handleToggleAudio = () => {
    if (isSpeaking) {
      audioEngine.stopSpeech();
      setIsSpeaking(false);
    } else {
      const textToRead = viewMode === 'summary' 
        ? (ms.summary[transLang] || ms.summary.en)
        : ms.ocrSegments.map(s => s.text).join(' ');
      
      setIsSpeaking(true);
      audioEngine.speakText(
        textToRead, 
        transLang, 
        () => setIsSpeaking(true), 
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-10 py-6 space-y-6 select-none">
      
      {/* Header with Manuscript Selector Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            DAIC Primary Archival Holdings
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-[#0B1F5C]">
            {t.manuscripts} & High-Resolution OCR
          </h2>
          <p className="text-sm text-slate-600">
            Inspect authentic primary drafts with word-level confidence evaluation and multi-lingual translation
          </p>
        </div>

        {/* 3 Manuscript Switcher Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto scrollbar-none">
          {manuscriptsData.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveManuscriptIndex(idx);
                handleReset();
                if (isSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className={`touch-target px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeManuscriptIndex === idx
                  ? 'bg-[#0B1F5C] text-white shadow-md'
                  : 'text-slate-700 hover:bg-white/80'
              }`}
            >
              <span>Sample {idx + 1}: {item.title.substring(0, 24)}...</span>
            </button>
          ))}
        </div>
      </div>

      {/* Archival Metadata Strip */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="text-slate-400 block font-medium uppercase text-[10px]">Accession Number</span>
            <span className="font-mono font-bold text-[#0B1F5C]">{ms.accessionNo}</span>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <span className="text-slate-400 block font-medium uppercase text-[10px]">Vault Location</span>
            <span className="font-medium text-slate-700">{ms.boxId}</span>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <span className="text-slate-400 block font-medium uppercase text-[10px]">Preservation</span>
            <span className="font-medium text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {ms.preservationStatus}
            </span>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <span className="text-slate-400 block font-medium uppercase text-[10px]">Overall OCR Score</span>
            <span className="font-mono font-bold text-blue-700">{ms.overallConfidence}% Confident</span>
          </div>
        </div>

        {/* Add to Collection Button */}
        <button
          onClick={() => onAddToCollection({
            id: ms.id,
            title: ms.title,
            category: "Manuscript",
            citation: ms.accessionNo,
            snippet: ms.ocrSegments[0]?.text || "Manuscript scan",
            date: ms.year
          })}
          className={`touch-target px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
            isSaved 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
              : 'bg-[#0B1F5C] hover:bg-[#1E3A8A] text-white border-[#0B1F5C]'
          }`}
        >
          {isSaved ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4 text-amber-300" />}
          <span>{isSaved ? t.savedToCollection : t.addToCollection}</span>
        </button>
      </div>

      {/* Main Dual Viewer: Scanned Page (Left) vs OCR / Translation (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Scanned Page Viewer with Zoom/Pan controls (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-4 shadow-xl border border-slate-800 flex flex-col justify-between">
          
          {/* Top Canvas Toolbar */}
          <div className="flex items-center justify-between bg-slate-950/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 mb-4 text-xs text-white">
            <div className="flex items-center gap-1">
              <button 
                onClick={handleZoomIn}
                className="touch-target p-2 rounded-lg hover:bg-white/15" 
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4 text-amber-300" />
              </button>
              <button 
                onClick={handleZoomOut}
                className="touch-target p-2 rounded-lg hover:bg-white/15" 
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 text-amber-300" />
              </button>
              <span className="font-mono text-[11px] px-2 text-slate-300">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button 
                onClick={handleRotate}
                className="touch-target p-2 rounded-lg hover:bg-white/15" 
                title="Rotate 90°"
              >
                <RotateCw className="w-4 h-4 text-blue-300" />
              </button>
              <button 
                onClick={handleReset}
                className="touch-target p-2 rounded-lg hover:bg-white/15" 
                title="Reset View"
              >
                <RefreshCw className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Filter:</span>
              <button
                onClick={() => setContrastMode(contrastMode === 'sepia' ? 'high-contrast' : 'sepia')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-amber-200"
              >
                {contrastMode === 'sepia' ? 'Sepia Vintage' : 'High-Pass B/W'}
              </button>
            </div>
          </div>

          {/* Interactive Simulated Scanned Page Container */}
          <div className="relative w-full h-[580px] bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-slate-800 shadow-inner">
            
            {/* The Document Page */}
            <div 
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transition: 'transform 0.25s ease-out'
              }}
              className={`relative w-[400px] h-[520px] rounded shadow-2xl p-8 transition-colors select-none ${
                contrastMode === 'sepia' 
                  ? 'bg-[#FBF8EF] text-[#292318] border-2 border-[#D9CDB8]' 
                  : 'bg-white text-black border-2 border-slate-400 contrast-150'
              }`}
            >
              {/* Paper Watermark & Archival Stamp */}
              <div className="absolute top-4 right-4 opacity-30 pointer-events-none">
                <div className="border-2 border-red-700 text-red-700 text-[9px] font-mono font-bold px-2 py-0.5 transform rotate-12 uppercase">
                  DAIC ARCHIVES • RESTRICTED
                </div>
              </div>

              {/* Document Header */}
              <div className="text-center border-b border-black/20 pb-3 mb-4 space-y-1">
                <p className="text-[10px] tracking-widest uppercase font-mono text-slate-500">
                  {ms.accessionNo} • Folio Page {ms.currentPage}
                </p>
                <h4 className="text-sm font-heading font-bold text-slate-900 leading-tight">
                  {ms.title}
                </h4>
                <p className="text-[9px] font-mono text-slate-600">
                  By Dr. B. R. Ambedkar, M.A., Ph.D., D.Sc., Barrister-at-Law
                </p>
              </div>

              {/* Typed Lines Simulation */}
              <div className="space-y-3 font-serif text-[11px] leading-relaxed text-justify opacity-90">
                <p>
                  "The Hindu civilization has produced three social classes which are rather peculiar to it. 
                  These are (1) The Untouchables, (2) The Criminal Tribes, and (3) The Aboriginal Tribes..."
                </p>
                <p>
                  "The Census of India 1941 enumerates their populations at 48 millions, 4 millions and 13 millions respectively. 
                  No other civilization has produced anything like these classes. Untouchability is not a racial concept..."
                </p>
                
                {/* Simulated handwritten pencil marginalia by Dr. Ambedkar */}
                <div className="bg-amber-100/50 p-2 border-l-2 border-amber-600 font-sans italic text-[10px] text-amber-900 rounded">
                  [Note in margin]: "Buddhism was overthrown through dietary supremacy and graded endogamy. Verify Census table 14."
                </div>

                <p>
                  "It is an artificial creation of religious taboo and broken tribal disintegration. 
                  The root of Untouchability lies in the contempt for Buddhism and the continued practice of beef-eating by the Broken Men..."
                </p>
              </div>

              {/* Bottom Official Emboss */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-black/10 pt-2">
                <span>Box: {ms.boxId}</span>
                <span>Page {ms.currentPage} of {ms.totalPages}</span>
              </div>
            </div>

          </div>

          {/* Scanned Viewer Footer Caption */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Scan Spec: 600 DPI 48-bit Color TIFF</span>
            <span>Use zoom buttons or touch drag to inspect</span>
          </div>

        </div>

        {/* Right: OCR Text, Confidence Highlights & Translations (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-6">
          
          {/* Controls Bar: Summary vs OCR, Translation, Audio */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            
            {/* View Mode Toggle: Summary vs Full OCR */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('ocr')}
                className={`touch-target px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'ocr'
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.ocrTranscription}
              </button>
              <button
                onClick={() => setViewMode('summary')}
                className={`touch-target px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'summary'
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.executiveSummary}
              </button>
            </div>

            {/* Right: Translate Language + Listen Audio */}
            <div className="flex items-center gap-2">
              
              {/* Translate Select */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <span className="text-slate-500 pl-2 pr-1">
                  <Languages className="w-3.5 h-3.5 text-blue-700" />
                </span>
                {['en', 'hi', 'mr'].map((lng) => (
                  <button
                    key={lng}
                    onClick={() => setTransLang(lng)}
                    className={`touch-target px-2.5 py-1 text-xs font-semibold rounded-lg ${
                      transLang === lng ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600'
                    }`}
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Listen TTS Button */}
              <button
                onClick={handleToggleAudio}
                className={`touch-target px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                  isSpeaking
                    ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                    : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-700" />}
                <span>{isSpeaking ? t.stopAudio : t.listenAudio}</span>
              </button>
            </div>

          </div>

          {/* OCR Confidence Legend */}
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 text-xs">
            <span className="font-semibold text-slate-700">Confidence Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-600">High (&gt;95%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-slate-600">Review (&lt;90%)</span>
            </div>
          </div>

          {/* Content Area: OCR with confidence highlighting vs Executive Summary */}
          {viewMode === 'ocr' ? (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>Verbatim Optical Character Recognition (De-skewed text):</span>
                <span className="font-mono text-emerald-700 font-bold">Accuracy: {ms.overallConfidence}%</span>
              </div>

              <div className="space-y-3 bg-[#FCFBF7] p-6 rounded-2xl border border-amber-200/60 font-serif text-sm sm:text-base leading-relaxed text-slate-900 shadow-inner">
                {ms.ocrSegments.map((seg, i) => (
                  <p key={i} className="relative group">
                    <span 
                      className={`rounded px-1.5 py-0.5 transition-colors ${
                        seg.isLow 
                          ? 'bg-amber-200/80 text-amber-950 border-b-2 border-amber-500' 
                          : 'hover:bg-blue-50'
                      }`}
                    >
                      {seg.text}
                    </span>

                    {/* Confidence Tooltip on Hover */}
                    <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border shadow-sm">
                      {seg.isLow ? (
                        <span className="text-amber-700 flex items-center gap-0.5">
                          <AlertCircle className="w-3 h-3" /> {seg.confidence}% (Review)
                        </span>
                      ) : (
                        <span className="text-emerald-700 flex items-center gap-0.5">
                          <CheckCircle className="w-3 h-3" /> {seg.confidence}%
                        </span>
                      )}
                    </span>
                    {seg.note && (
                      <span className="block text-[11px] text-amber-800 italic mt-0.5 font-sans">
                        ↳ Archival Curator Note: {seg.note}
                      </span>
                    )}
                  </p>
                ))}
              </div>

              {/* Translation Box if Hindi or Marathi is active */}
              {transLang !== 'en' && ms.translations[transLang] && (
                <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase">
                    <Languages className="w-4 h-4 text-amber-600" />
                    {transLang === 'hi' ? 'सत्यापित हिन्दी अनुवाद' : 'सत्यापित मराठी भाषांतर'}
                  </div>
                  <p className="text-sm font-devanagari text-slate-800 leading-relaxed">
                    {ms.translations[transLang]}
                  </p>
                </div>
              )}

            </div>
          ) : (
            /* Executive Summary Mode */
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Official Curatorial Archival Summary
              </div>

              <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 space-y-4 text-slate-800">
                <h4 className="text-lg font-heading font-bold text-[#0B1F5C]">
                  {ms.title} ({ms.year})
                </h4>
                <p className="text-sm sm:text-base leading-relaxed">
                  {ms.summary[transLang] || ms.summary.en}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-medium">Primary Paper Support</span>
                  <span className="font-semibold text-slate-800">{ms.originalPaperType}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-medium">Audio Reading Duration</span>
                  <span className="font-semibold text-slate-800">{ms.audioDuration}</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
