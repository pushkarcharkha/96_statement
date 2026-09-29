import React, { useState } from 'react';
import { 
  Cpu, 
  Tv, 
  Server, 
  QrCode, 
  ShieldAlert, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  WifiOff, 
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { kioskHardwareArchitecture } from '../data/hardwareData';
import { translations } from '../data/translations';

export default function HardwareSlide({ language }) {
  const t = translations[language] || translations.en;

  const [activeComponentId, setActiveComponentId] = useState('touch-kiosk');

  const activeComponent = kioskHardwareArchitecture.components.find(
    c => c.id === activeComponentId
  ) || kioskHardwareArchitecture.components[0];

  const iconMap = {
    'touch-kiosk': Cpu,
    'smart-display': Tv,
    'archive-server': Server,
    'nfc-qr-station': QrCode,
    'offline-mode': ShieldAlert
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-10 py-6 space-y-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
            <Cpu className="w-4 h-4 text-amber-500" />
            Engineering & Infrastructure Blueprint
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-[#0B1F5C]">
            {t.hardware}: Museum Edge Ecosystem
          </h2>
          <p className="text-sm text-slate-600">
            {kioskHardwareArchitecture.subtitle}
          </p>
        </div>

        {/* Offline Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-900 border border-emerald-300 px-4 py-2 rounded-2xl text-xs font-bold">
          <WifiOff className="w-4 h-4 text-emerald-600" />
          <span>Air-Gapped 100% Offline Operational Resiliency</span>
        </div>
      </div>

      {/* Interactive System Topology Diagram */}
      <div className="bg-[#0B1F5C] rounded-3xl p-8 text-white shadow-2xl border border-amber-400/30 relative overflow-hidden">
        
        {/* Subtle Background Watermark */}
        <div className="absolute right-0 bottom-0 w-96 h-96 opacity-10 pointer-events-none">
          <img src="/assets/chakra.svg" alt="Watermark" className="w-full h-full animate-spin-slow text-white" />
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-300 font-mono font-bold">
              Topology Map
            </span>
            <h3 className="text-2xl font-heading font-bold text-white mt-1">
              Select any ecosystem tier to inspect hardware specifications
            </h3>
          </div>

          {/* 5 Architecture Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {kioskHardwareArchitecture.components.map((comp) => {
              const Icon = iconMap[comp.id] || Cpu;
              const isSelected = activeComponentId === comp.id;

              return (
                <button
                  key={comp.id}
                  onClick={() => setActiveComponentId(comp.id)}
                  className={`touch-target flex-col items-start p-5 rounded-2xl border-2 text-left transition-all relative ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-white shadow-xl scale-103 font-bold'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-slate-950 text-amber-400' : 'bg-white/15 text-amber-300'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      Online
                    </span>
                  </div>

                  <h4 className="text-sm font-heading font-bold leading-tight">
                    {comp.name}
                  </h4>
                  <p className={`text-[11px] mt-1 line-clamp-1 ${
                    isSelected ? 'text-slate-900 opacity-90' : 'text-blue-200'
                  }`}>
                    {comp.category}
                  </p>

                  {isSelected && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-500 rotate-45 border-r-2 border-b-2 border-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Workflow Sequence Strip */}
          <div className="bg-black/35 rounded-2xl p-5 border border-white/15 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
              Visitor Interaction Dataflow Pipeline
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kioskHardwareArchitecture.flowSteps.map((s) => (
                <div key={s.step} className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{s.title}</h5>
                    <p className="text-[11px] text-blue-200 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Selected Component Specification Deep Dive */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {activeComponent.category}
            </span>
            <h3 className="text-2xl font-heading font-extrabold text-[#0B1F5C] mt-2">
              {activeComponent.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Operational Status: {activeComponent.status}</span>
          </div>
        </div>

        {/* Role & Functional Mission */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
          <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">
            Architectural Role & Function
          </h4>
          <p className="text-base text-slate-800 leading-relaxed font-serif">
            {activeComponent.role}
          </p>
        </div>

        {/* Technical Hardware Specifications List */}
        <div className="space-y-3">
          <h4 className="text-sm font-heading font-bold text-[#0B1F5C] uppercase tracking-wider">
            Detailed Hardware & Software Specifications
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeComponent.specs.map((spec, i) => (
              <div 
                key={i} 
                className="flex items-start gap-3 p-4 rounded-xl bg-[#FAFBFD] border border-slate-200 text-xs font-mono text-slate-800"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Failover / Redundancy Benchmark Banner */}
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-300 flex items-center justify-between gap-4 text-xs text-amber-950">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <strong>Edge Redundancy Guarantee:</strong> If local museum power fluctuates, on-board 2kVA UPS maintains uninterrupted operation for 45 minutes with automatic clean SSD journal flushing.
            </div>
          </div>
          <span className="font-mono text-amber-800 font-bold whitespace-nowrap bg-white px-3 py-1 rounded-lg border border-amber-300">
            MTBF 120,000 hrs
          </span>
        </div>

      </div>

    </div>
  );
}
