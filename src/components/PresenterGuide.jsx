import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Mic, 
  Sparkles, 
  X, 
  Eye, 
  Volume2, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const demoSteps = [
  {
    screenId: 'attract',
    title: '1. Attract Screen (Museum Welcome)',
    script: '"Welcome to the Babasaheb Digital Heritage Archive touch kiosk at Dr. Ambedkar International Centre. It features an authentic 24-spoke Ashoka Chakra watermark and a blue duotone portrait with instant multi-lingual support in English, Hindi, and Marathi."'
  },
  {
    screenId: 'home',
    title: '2. Home Portal & Archival Pavilions',
    script: '"Entering the home screen, we see 35,000+ digitized pages, 142 speeches, and 395 constitutional articles organized into 3 clear pavilions: Core AI Research, Historical Media, and Mobile Handoff."'
  },
  {
    screenId: 'search',
    title: '3. Semantic Voice Search & D3 Knowledge Graph',
    script: '"Our semantic search supports voice queries via Web Speech API alongside an interactive D3 force-directed knowledge graph with 12 interconnected philosophical and legal nodes that highlight relationships and filter verified documents on click."'
  },
  {
    screenId: 'ask-assistant',
    title: '4. Ask Babasaheb (AI Research Assistant)',
    script: '"Unlike generic chatbots, this AI research assistant strictly grounds its answers in primary historical records, displaying exact volume and page citations. Out-of-archive queries are strictly declined to ensure ethical truth."'
  },
  {
    screenId: 'manuscripts',
    title: '5. High-Resolution Manuscripts & OCR',
    script: '"Visitors can zoom and pan through 600 DPI primary manuscripts like Castes in India, while the right panel displays OCR text with word-level confidence ratings and instant translations."'
  },
  {
    screenId: 'audio-video',
    title: '6. Restored Audio & Synced Transcripts',
    script: '"In the audio archive, visitors listen to restored historical speeches with real-time waveform visualizers and synchronized karaoke-style transcripts in English, Hindi, and Marathi."'
  },
  {
    screenId: 'constitution',
    title: '7. Constitution Explorer',
    script: '"The Constitution Explorer offers a tripartite view of landmark articles like Article 17, comparing Dr. Ambedkar\'s Constituent Assembly debate speech, the final 1950 enacted law, and plain-language public explainers."'
  },
  {
    screenId: 'timeline',
    title: '8. Interactive Timeline 1891–1956',
    script: '"A horizontal parallax scroll takes visitors across five epochs of Babasaheb\'s life, featuring milestone cards, archival photos, and verified quotes."'
  },
  {
    screenId: 'my-collection',
    title: '9. My Collection & QR Mobile Handoff',
    script: '"Visitors can compile an exhibition reading list, scan a dynamic offline QR code to take their dossier home on their smartphone, or export a high-definition printable bibliography."'
  },
  {
    screenId: 'hardware',
    title: '10. Kiosk Hardware & Offline Resilience',
    script: '"Finally, our hardware architecture diagram highlights the 55-inch touch terminal, local ZFS edge server, and complete 100% air-gapped offline operational resilience for cultural institutions."'
  }
];

export default function PresenterGuide({ currentScreen, onNavigate, onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);

  const currentStepIndex = demoSteps.findIndex(s => s.screenId === currentScreen);
  const activeStep = currentStepIndex !== -1 ? demoSteps[currentStepIndex] : demoSteps[0];

  const handleNext = () => {
    audioEngine.playChime('tap');
    const nextIdx = (currentStepIndex + 1) % demoSteps.length;
    onNavigate(demoSteps[nextIdx].screenId);
  };

  const handlePrev = () => {
    audioEngine.playChime('tap');
    const prevIdx = (currentStepIndex - 1 + demoSteps.length) % demoSteps.length;
    onNavigate(demoSteps[prevIdx].screenId);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 no-print">
        <button
          onClick={() => setIsMinimized(false)}
          className="touch-target px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 border-2 border-slate-950"
        >
          <Mic className="w-4 h-4" />
          <span>Show Voiceover Script</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl bg-slate-950/95 text-white backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-amber-400 no-print select-none animate-in slide-in-from-bottom-3">
      
      {/* Top Bar of Presenter Dock */}
      <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
              Video Demo Presenter Guide ({currentStepIndex + 1} of {demoSteps.length})
            </span>
            <h4 className="text-sm font-heading font-bold text-white">
              {activeStep.title}
            </h4>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="touch-target px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            onClick={handleNext}
            className="touch-target px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md scale-102"
            title="Next Step"
          >
            <span>Next Feature</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 ml-1"
            title="Minimize to button"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Voiceover Teleprompter Text */}
      <div className="bg-black/50 p-3 rounded-2xl border border-white/10 flex items-start gap-3">
        <span className="text-amber-400 text-xs font-bold whitespace-nowrap mt-0.5">
          🎙️ Voiceover Cue:
        </span>
        <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed italic">
          {activeStep.script}
        </p>
      </div>

    </div>
  );
}
