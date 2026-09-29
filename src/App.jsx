import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import AttractScreen from './components/AttractScreen';
import HomeScreen from './components/HomeScreen';
import SemanticSearch from './components/SemanticSearch';
import ManuscriptViewer from './components/ManuscriptViewer';
import AudioVideoArchive from './components/AudioVideoArchive';
import InteractiveTimeline from './components/InteractiveTimeline';
import AskBabasaheb from './components/AskBabasaheb';
import LessonOfTheDay from './components/LessonOfTheDay';
import ConstitutionExplorer from './components/ConstitutionExplorer';
import MyCollection from './components/MyCollection';
import AdminDashboard from './components/AdminDashboard';
import HardwareSlide from './components/HardwareSlide';
import IdleAttractTimer from './components/IdleAttractTimer';
import { Bookmark, CheckCircle, ArrowLeft } from 'lucide-react';
import { translations } from './data/translations';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('attract'); // 'attract', 'home', etc.
  const [language, setLanguage] = useState('en'); // 'en', 'hi', 'mr'
  const [fontSize, setFontSize] = useState('normal'); // 'normal', 'large', 'extraLarge'
  const [highContrast, setHighContrast] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  
  // My Collection state with initial rich seed items
  const [collection, setCollection] = useState([
    {
      id: "aoc-1936",
      title: "Annihilation of Caste",
      category: "Writings",
      citation: "BAWS Vol. 1, pp. 23–96",
      snippet: "Caste is not merely division of labour. It is also a division of labourers.",
      date: "May 1936"
    },
    {
      id: "art-17",
      title: "Article 17: Abolition of Untouchability",
      category: "Constitutional Article",
      citation: "CAD Vol. VII, 29 Nov 1948",
      snippet: "'Untouchability' is abolished and its practice in any form is forbidden.",
      date: "29 November 1948"
    }
  ]);

  const [toastMessage, setToastMessage] = useState('');

  const t = translations[language] || translations.en;

  // Manage body class for High Contrast
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Manage body font scale
  useEffect(() => {
    if (fontSize === 'large') {
      document.documentElement.style.fontSize = '18px';
    } else if (fontSize === 'extraLarge') {
      document.documentElement.style.fontSize = '20px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
  }, [fontSize]);

  // Add to collection helper with duplicate prevention
  const handleAddToCollection = (item) => {
    audioEngine.playChime('bookmark');
    if (!collection.some(c => c.id === item.id)) {
      setCollection(prev => [item, ...prev]);
      showToast(`Added "${item.title.substring(0, 30)}..." to My Collection`);
    } else {
      showToast(`Already saved in My Collection`);
    }
  };

  const handleRemoveFromCollection = (id) => {
    setCollection(prev => prev.filter(c => c.id !== id));
    showToast(`Removed from My Collection`);
  };

  const handleClearCollection = () => {
    setCollection([]);
    showToast(`Collection cleared`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  const collectionItemIds = collection.map(c => c.id);

  // Screen transition animations
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  // Render current screen component
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onSelectScreen={setCurrentScreen} language={language} />;
      
      case 'search':
      case 'speeches':
      case 'writings':
      case 'debates':
        return (
          <SemanticSearch 
            onAddToCollection={handleAddToCollection}
            collectionItemIds={collectionItemIds}
            language={language}
          />
        );

      case 'manuscripts':
        return (
          <ManuscriptViewer 
            onAddToCollection={handleAddToCollection}
            collectionItemIds={collectionItemIds}
            language={language}
          />
        );

      case 'audio-video':
        return (
          <AudioVideoArchive 
            onAddToCollection={handleAddToCollection}
            collectionItemIds={collectionItemIds}
            language={language}
          />
        );

      case 'timeline':
        return (
          <InteractiveTimeline 
            onAddToCollection={handleAddToCollection}
            collectionItemIds={collectionItemIds}
            language={language}
          />
        );

      case 'ask-assistant':
        return (
          <AskBabasaheb 
            onAddToCollection={handleAddToCollection}
            collectionItemIds={collectionItemIds}
            language={language}
          />
        );

      case 'lesson':
        return (
          <LessonOfTheDay 
            onAddToCollection={handleAddToCollection}
            collectionItemIds={collectionItemIds}
            language={language}
          />
        );

      case 'constitution':
        return (
          <ConstitutionExplorer 
            onAddToCollection={handleAddToCollection}
            collectionItemIds={collectionItemIds}
            language={language}
          />
        );

      case 'my-collection':
        return (
          <MyCollection 
            collection={collection}
            onRemoveItem={handleRemoveFromCollection}
            onClearCollection={handleClearCollection}
            language={language}
          />
        );

      case 'admin':
        return <AdminDashboard language={language} />;

      case 'hardware':
        return <HardwareSlide language={language} />;

      default:
        return <HomeScreen onSelectScreen={setCurrentScreen} language={language} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Idle Attract Timer (Returns to attract after 60s of inactivity) */}
      <IdleAttractTimer
        isAttractScreen={currentScreen === 'attract'}
        onTimeout={() => setCurrentScreen('attract')}
        idleSeconds={60}
      />

      {/* Attract Screen Modal / View */}
      {currentScreen === 'attract' ? (
        <AttractScreen
          onBegin={() => {
            audioEngine.unlockAudio();
            audioEngine.playChime('attract');
            setCurrentScreen('home');
          }}
          language={language}
          setLanguage={setLanguage}
        />
      ) : (
        <>
          {/* Global Museum Kiosk Top Navigation */}
          <Header
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            language={language}
            setLanguage={setLanguage}
            fontSize={fontSize}
            setFontSize={setFontSize}
            highContrast={highContrast}
            setHighContrast={setHighContrast}
            audioEnabled={audioEnabled}
            setAudioEnabled={setAudioEnabled}
            collectionCount={collection.length}
            onOpenCollection={() => setCurrentScreen('my-collection')}
            onResetToAttract={() => setCurrentScreen('attract')}
          />

          {/* Sub-bar with "Back to Home" for screens other than Home */}
          {currentScreen !== 'home' && (
            <div className="bg-slate-100/90 backdrop-blur-sm border-b border-slate-200 px-6 py-2.5 flex items-center justify-between no-print select-none">
              <button
                onClick={() => setCurrentScreen('home')}
                className="touch-target px-4 py-2 rounded-xl text-xs font-bold text-blue-900 hover:bg-white flex items-center gap-2 border border-slate-200 shadow-xs transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-amber-600" />
                <span>{t.backToHome}</span>
              </button>

              <div className="text-xs text-slate-500 font-mono hidden sm:block">
                DAIC Touch Terminal 1920x1080 • Active Mode
              </div>
            </div>
          )}

          {/* Main Dynamic Viewport */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Toast Notification Container */}
          {toastMessage && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0B1F5C] text-white px-6 py-3 rounded-2xl shadow-2xl border border-amber-400 text-xs font-bold flex items-center gap-2 animate-fade-in select-none">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Bottom Kiosk Status Strip */}
          <footer className="bg-slate-900 text-slate-400 text-xs py-3 px-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 no-print select-none">
            <div className="flex items-center gap-4">
              <span className="text-amber-300 font-semibold">
                Dr. Ambedkar International Centre
              </span>
              <span>•</span>
              <span>15 Janpath, New Delhi - 110001</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span>Touch Target: 56px Compliant</span>
              <span>•</span>
              <span className="text-emerald-400">Offline Edge Ready</span>
            </div>
          </footer>
        </>
      )}

    </div>
  );
}
