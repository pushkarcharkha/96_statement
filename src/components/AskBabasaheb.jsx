import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Bookmark, 
  CheckCircle, 
  ShieldAlert, 
  BookOpen, 
  Volume2,
  VolumeX,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { findGroundedAnswer } from '../data/aiAssistantData';
import { translations } from '../data/translations';
import { audioEngine } from '../utils/audioEngine';

export default function AskBabasaheb({ onAddToCollection, collectionItemIds, language }) {
  const t = translations[language] || translations.en;

  // Categorized recommended questions for video presentation
  const categorizedPrompts = [
    {
      category: "Constitutional Law",
      color: "border-blue-300 bg-blue-50 text-blue-900",
      icon: "⚖️",
      questions: [
        "What were Dr. Ambedkar's views on the Uniform Civil Code?",
        "Why was Article 17 drafted to abolish untouchability?",
        "What was his warning about Bhakti and hero-worship in politics?"
      ]
    },
    {
      category: "Economics & Nation Building",
      color: "border-amber-300 bg-amber-50 text-amber-900",
      icon: "🏛️",
      questions: [
        "What was Dr. Ambedkar's role in establishing the Reserve Bank of India?",
        "What are the three pillars: Educate, Agitate, Organize?"
      ]
    },
    {
      category: "Social Philosophy & Human Rights",
      color: "border-emerald-300 bg-emerald-50 text-emerald-900",
      icon: "📜",
      questions: [
        "How did he define the difference between caste and varna?",
        "What was the significance of the 1927 Mahad Satyagraha?",
        "Who will win the upcoming Cricket World Cup?" // out-of-domain demo
      ]
    }
  ];

  const [messages, setMessages] = useState([
    {
      id: 'msg-0',
      sender: 'assistant',
      text: "Namaskar. I am the DAIC Archival AI Research Assistant. I answer questions strictly using Dr. B. R. Ambedkar's verified collected works (BAWS) and Constituent Assembly records. Select any recommended question below to see a grounded answer with historical citations.",
      citations: [
        { source: "Verified Core", reference: "BAWS Vols. 1–22 & CAD Vols. I–XII", date: "Official Repository", page: "Complete Archive" }
      ],
      found: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    audioEngine.playChime('tap');

    // Append user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Grounded retrieval
    setTimeout(() => {
      const response = findGroundedAnswer(query);

      const assistantMsg = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        citations: response.citations,
        found: response.found
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSpeakAnswer = (msg) => {
    if (speakingMsgId === msg.id) {
      audioEngine.stopSpeech();
      setSpeakingMsgId(null);
    } else {
      // Unlock audio on user gesture
      audioEngine.unlockAudio();
      setSpeakingMsgId(msg.id);
      // Small delay to let unlock settle
      setTimeout(() => {
        audioEngine.speakText(
          msg.text,
          language,
          () => setSpeakingMsgId(msg.id),
          () => setSpeakingMsgId(null)
        );
      }, 200);
    }
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-10 py-6 space-y-6 select-none">
      
      {/* Header with Clear Purpose */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
            <Bot className="w-4 h-4 text-amber-500" />
            Verified Archival AI Assistant
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-[#0B1F5C]">
            Ask Babasaheb (AI Research Terminal)
          </h2>
          <p className="text-sm text-slate-600">
            Answers are grounded in 35,420+ archival pages with exact citations.
          </p>
        </div>

        {/* Ethical AI Guardrail Badge */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-start gap-2.5 max-w-md text-xs text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Research Assistant Policy:</strong>
            Strictly grounded in BAWS & CAD. Out-of-archive questions are declined.
          </div>
        </div>
      </div>

      {/* Prominent Recommended Questions for Video Presentation */}
      <div className="space-y-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-heading font-bold text-[#0B1F5C] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500" />
            Recommended Demo Questions (Tap any card to ask instantly)
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Categorized for Demonstration
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {categorizedPrompts.map((cat, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border ${cat.color} space-y-2`}>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                <span>{cat.icon}</span>
                <span>{cat.category}</span>
              </div>
              <div className="space-y-1.5">
                {cat.questions.map((q, qi) => (
                  <button
                    key={qi}
                    onClick={() => handleSendMessage(q)}
                    className="w-full text-left p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200 shadow-2xs hover:border-blue-400 transition-all flex items-start justify-between gap-1 group active:scale-98"
                  >
                    <span className="line-clamp-2">{q}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 flex-shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[520px]">
        
        {/* Chat Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSpeakingThis = speakingMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-md ${
                  isUser ? 'bg-amber-500 text-slate-950 font-bold text-xs' : 'bg-[#0B1F5C]'
                }`}>
                  {isUser ? 'YOU' : <Bot className="w-5 h-5 text-amber-300" />}
                </div>

                {/* Message Body */}
                <div className="space-y-3">
                  <div className={`p-5 rounded-3xl text-sm sm:text-base leading-relaxed shadow-sm relative group ${
                    isUser
                      ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none'
                      : msg.found
                      ? 'bg-white text-slate-900 border border-slate-200 rounded-tl-none'
                      : 'bg-red-50 text-red-950 border border-red-200 rounded-tl-none font-medium'
                  }`}>
                    {msg.text}

                    {/* Listen Audio Button for Answer */}
                    {!isUser && (
                      <button
                        onClick={() => handleSpeakAnswer(msg)}
                        className={`absolute top-3 right-3 p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                          isSpeakingThis
                            ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                        }`}
                        title="Listen to this answer"
                      >
                        {isSpeakingThis ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-700" />}
                        <span className="text-[10px]">{isSpeakingThis ? 'Stop' : 'Listen'}</span>
                      </button>
                    )}
                  </div>

                  {/* Citation Chips if Assistant message and found */}
                  {!isUser && msg.citations && msg.citations.length > 0 && (
                    <div className="space-y-2 bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs">
                      <div className="font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        Grounded Archival Citations ({msg.citations.length})
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {msg.citations.map((cit, ci) => (
                          <div 
                            key={ci}
                            className="bg-white px-3 py-1.5 rounded-xl border border-blue-300 font-mono text-[11px] text-slate-800 shadow-2xs flex items-center gap-2"
                          >
                            <span className="font-bold text-blue-900">{cit.reference}</span>
                            <span className="text-slate-400">•</span>
                            <span>p. {cit.page}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-amber-700">{cit.date}</span>
                          </div>
                        ))}
                      </div>

                      {/* Add to Collection button */}
                      <button
                        onClick={() => onAddToCollection({
                          id: msg.id,
                          title: `AI Grounded Note: ${msg.citations[0]?.reference}`,
                          category: "Research Assistant",
                          citation: msg.citations[0]?.reference,
                          snippet: msg.text.substring(0, 160) + "...",
                          date: msg.citations[0]?.date || "Archival Citation"
                        })}
                        className="touch-target mt-1 px-3 py-1.5 rounded-lg bg-blue-900 text-white hover:bg-blue-800 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-amber-300" />
                        <span>Save to My Collection</span>
                      </button>
                    </div>
                  )}

                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 items-center mr-auto">
              <div className="w-10 h-10 rounded-2xl bg-[#0B1F5C] text-white flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-300 animate-spin" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 text-xs text-slate-500 flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                Cross-referencing 35,420 archival records and Constituent Assembly debates...
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a historical or constitutional question..."
            className="flex-1 py-4 px-5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-slate-400"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="touch-target px-7 py-4 rounded-2xl bg-[#0B1F5C] hover:bg-[#1E3A8A] text-white font-bold text-sm flex items-center gap-2 shadow-md disabled:opacity-50 transition-all"
          >
            <span>Ask</span>
            <Send className="w-4 h-4 text-amber-300" />
          </button>
        </div>

      </div>

    </div>
  );
}
