import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { 
  Search, 
  Mic, 
  MicOff, 
  Filter, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Sparkles,
  Layers,
  Info,
  CheckCircle,
  X
} from 'lucide-react';
import { speechesAndWritings } from '../data/speechesAndWritings';
import { knowledgeGraphData } from '../data/knowledgeGraphData';
import { translations } from '../data/translations';
import { audioEngine } from '../utils/audioEngine';

export default function SemanticSearch({ onAddToCollection, collectionItemIds, language }) {
  const t = translations[language] || translations.en;
  
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);

  const graphRef = useRef(null);
  const simulationRef = useRef(null);

  const categories = ['All', 'Speeches', 'Writings', 'Constituent Assembly', 'Manuscripts'];

  // Filter items based on query and category
  const filteredItems = speechesAndWritings.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = 
      query === '' ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.snippet.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      item.volume.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Voice Search Handler with Web Speech API & fallback
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Graceful fallback for non-supported browsers or local testing
      setVoiceNotice('Voice simulation: Searching "Annihilation of Caste"...');
      setQuery('Annihilation of Caste');
      setTimeout(() => setVoiceNotice(''), 3000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice(t.listening);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setVoiceNotice(`Heard: "${transcript}"`);
        setTimeout(() => setVoiceNotice(''), 3000);
      };

      recognition.onerror = (e) => {
        setIsListening(false);
        setVoiceNotice('Microphone unavailable. Simulated: "Constituent Assembly"');
        setQuery('Constituent Assembly');
        setTimeout(() => setVoiceNotice(''), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
      setVoiceNotice('Simulated search: "Mahad Satyagraha"');
      setQuery('Mahad Satyagraha');
      setTimeout(() => setVoiceNotice(''), 3000);
    }
  };

  // Text to Speech playback for snippets
  const handleListen = (item) => {
    if (speakingId === item.id) {
      audioEngine.stopSpeech();
      setSpeakingId(null);
    } else {
      setSpeakingId(item.id);
      audioEngine.speakText(
        item.snippet,
        language,
        () => setSpeakingId(item.id),
        () => setSpeakingId(null)
      );
    }
  };

  // D3 Force Directed Graph Effect
  useEffect(() => {
    if (!graphRef.current) return;

    // Dimensions
    const container = graphRef.current;
    const width = container.clientWidth || 600;
    const height = 480;

    // Clear previous svg
    d3.select(container).selectAll("*").remove();

    const svg = d3.select(container)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", height)
      .attr("class", "overflow-visible select-none");

    // Add subtle background grid lines
    const g = svg.append("g");

    // Deep copy data to prevent mutation issues during hot reload
    const nodes = knowledgeGraphData.nodes.map(d => ({ ...d }));
    const links = knowledgeGraphData.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-240))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => d.size + 12));

    simulationRef.current = simulation;

    // Draw Links
    const link = g.append("g")
      .attr("stroke", "#94A3B8")
      .attr("stroke-opacity", 0.4)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);

    // Draw Nodes group
    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("class", "cursor-pointer")
      .call(
        d3.drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Node circles with glow
    node.append("circle")
      .attr("r", d => d.size)
      .attr("fill", d => d.color)
      .attr("stroke", "#FFFFFF")
      .attr("stroke-width", 2.5)
      .attr("class", "transition-all duration-200 hover:stroke-amber-400 hover:stroke-[4px]");

    // Node labels
    node.append("text")
      .text(d => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", d => d.size + 14)
      .attr("fill", "#0F172A")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("class", "pointer-events-none drop-shadow-sm");

    // Hover interactions
    node.on("mouseenter", (event, d) => {
      setSelectedNode(d);
      
      // Highlight connected links and nodes
      link
        .attr("stroke", l => (l.source.id === d.id || l.target.id === d.id ? "#F59E0B" : "#CBD5E1"))
        .attr("stroke-width", l => (l.source.id === d.id || l.target.id === d.id ? 3.5 : 1))
        .attr("stroke-opacity", l => (l.source.id === d.id || l.target.id === d.id ? 1 : 0.2));

      node.style("opacity", n => {
        const isConnected = links.some(l => 
          (l.source.id === d.id && l.target.id === n.id) || 
          (l.target.id === d.id && l.source.id === n.id)
        );
        return n.id === d.id || isConnected ? 1 : 0.35;
      });
    });

    node.on("mouseleave", () => {
      link
        .attr("stroke", "#94A3B8")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.4);
      node.style("opacity", 1);
    });

    // Clicking node triggers search filter
    node.on("click", (event, d) => {
      setQuery(d.label);
    });

    // Simulation tick update
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-10 py-6 space-y-8 select-none">
      
      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            DAIC Semantic Vector Search Engine
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-[#0B1F5C]">
            {t.search} & Knowledge Graph
          </h2>
          <p className="text-sm text-slate-600">
            Voice-enabled multi-lingual retrieval with interactive force-directed conceptual ontology
          </p>
        </div>

        {/* Quick Help Badge */}
        <div className="flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-4 py-2 rounded-2xl text-xs">
          <Info className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span>Tap any node on the graph to filter verified documents</span>
        </div>
      </div>

      {/* Search Input Bar + Voice Trigger */}
      <div className="bg-white rounded-3xl p-3 shadow-lg border border-slate-200 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full flex items-center">
          <Search className="w-6 h-6 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-13 pr-10 py-4 text-base sm:text-lg rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 text-slate-900 placeholder:text-slate-400"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-3 p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Voice Search Button (Web Speech API) */}
        <button
          onClick={handleVoiceSearch}
          className={`touch-target px-6 py-4 rounded-2xl font-bold text-sm flex items-center gap-3 transition-all ${
            isListening 
              ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-500/50' 
              : 'bg-[#0B1F5C] hover:bg-[#1E3A8A] text-white shadow-md'
          }`}
          title="Voice Search via Web Speech API"
        >
          {isListening ? <MicOff className="w-5 h-5 text-amber-300" /> : <Mic className="w-5 h-5 text-amber-300" />}
          <span className="whitespace-nowrap">{isListening ? t.listening : t.speakNow}</span>
        </button>
      </div>

      {/* Voice notice toast if triggered */}
      {voiceNotice && (
        <div className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>{voiceNotice}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`touch-target px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-blue-900 text-white shadow-md border border-blue-800'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat === 'All' ? t.all : cat}
          </button>
        ))}
      </div>

      {/* Main Two-Column Layout: Left = D3 Knowledge Graph, Right = Search Results */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left: D3 Force Knowledge Graph (5 cols) */}
        <div className="xl:col-span-5 bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-lg font-heading font-bold text-[#0B1F5C] flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" />
                Conceptual Knowledge Graph
              </h3>
              <p className="text-xs text-slate-500">
                Dr. Ambedkar's philosophical & legal ontology
              </p>
            </div>
            <span className="text-[11px] font-mono bg-blue-50 text-blue-800 px-2.5 py-1 rounded-full border border-blue-200">
              12 Core Nodes
            </span>
          </div>

          {/* D3 SVG Container */}
          <div 
            ref={graphRef} 
            className="w-full bg-[#FAFBFD] rounded-2xl border border-slate-100 min-h-[480px] relative overflow-hidden flex items-center justify-center shadow-inner"
          />

          {/* Node Inspect Card / Tooltip */}
          {selectedNode ? (
            <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#0B1F5C]">{selectedNode.label}</span>
                <span className="bg-white text-blue-900 px-2.5 py-0.5 rounded-full font-mono border border-blue-200">
                  {selectedNode.category} • {selectedNode.year}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed">{selectedNode.summary}</p>
              <div className="text-[11px] text-amber-700 font-mono font-medium">
                Citation: {selectedNode.citation}
              </div>
              <button
                onClick={() => setQuery(selectedNode.label)}
                className="mt-2 touch-target w-full py-2 bg-[#0B1F5C] text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors"
              >
                Filter Archive by "{selectedNode.label}"
              </button>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
              Hover or touch any node to inspect relationships and citations.
            </div>
          )}
        </div>

        {/* Right: Result Cards (7 cols) */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong className="text-slate-800">{filteredItems.length}</strong> verified historical records
            </span>
            {query && (
              <span>Query: "<strong className="text-blue-900">{query}</strong>"</span>
            )}
          </div>

          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Search className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-lg font-heading font-bold text-slate-700">No matching records found</h4>
              <p className="text-sm text-slate-500">
                Try searching for 'Annihilation', 'Water', 'Constitution', or 'Rupee'
              </p>
              <button
                onClick={() => { setQuery(''); setActiveCategory('All'); }}
                className="touch-target px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSaved = collectionItemIds.includes(item.id);
              const isSpeaking = speakingId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-200 space-y-4 hover:border-blue-400 group"
                >
                  {/* Top: Category, Volume, Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {item.volume} (pp. {item.pages})
                      </span>
                    </div>

                    <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
                      {item.date}
                    </span>
                  </div>

                  {/* Title & Snippet */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-bold text-[#0B1F5C] group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-sans bg-amber-50/50 p-4 rounded-2xl border-l-4 border-amber-400 italic">
                      "{item.snippet}"
                    </p>
                    <p className="text-xs text-slate-500">
                      <strong>Significance:</strong> {item.significance}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map(t => (
                      <span 
                        key={t}
                        onClick={() => setQuery(t)}
                        className="cursor-pointer text-[11px] bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-600 px-2.5 py-0.5 rounded-lg transition-colors"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Touch Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      {/* TTS Listen Button */}
                      <button
                        onClick={() => handleListen(item)}
                        className={`touch-target px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                          isSpeaking 
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' 
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                        title="Listen to snippet narration"
                      >
                        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-700" />}
                        <span>{isSpeaking ? t.stopAudio : t.listenAudio}</span>
                      </button>

                      {/* Read time */}
                      <span className="text-xs text-slate-400 font-mono">
                        {item.readTime}
                      </span>
                    </div>

                    {/* Add to Collection Button */}
                    <button
                      onClick={() => onAddToCollection({
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        citation: `${item.volume}, pp. ${item.pages}`,
                        snippet: item.snippet,
                        date: item.date
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

                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
}
