import React, { useState } from 'react';
import { 
  Settings, 
  UploadCloud, 
  Cpu, 
  ShieldCheck, 
  Database, 
  HardDrive, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileCheck,
  RefreshCw,
  PlusCircle,
  Layers,
  Lock
} from 'lucide-react';
import { adminPreservationStats, initialOcrQueue } from '../data/adminData';
import { translations } from '../data/translations';

export default function AdminDashboard({ language }) {
  const t = translations[language] || translations.en;

  const [queue, setQueue] = useState(initialOcrQueue);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Manuscript',
    accessionNo: 'DAIC-ARC-2026-NEW-01',
    volume: 'BAWS Uncatalogued',
    language: 'English',
    preservationTier: 'Grade A1 (Deacidified / Cold Storage)'
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isSimulatingQueue, setIsSimulatingQueue] = useState(false);

  // Form submission handler
  const handleIngest = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const newJob = {
      id: `job-${Date.now().toString().slice(-3)}`,
      documentName: `${formData.title.replace(/\s+/g, '_')}_Scan.tiff`,
      pages: 12,
      fileSize: "28.6 MB",
      status: "Processing",
      progress: 15,
      currentStep: "Optical binarization & font character alignment",
      checksum: `sha256:${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      startTime: new Date().toLocaleTimeString('en-IN')
    };

    setQueue([newJob, ...queue]);
    setUploadSuccess(true);
    setFormData({
      title: '',
      category: 'Manuscript',
      accessionNo: `DAIC-ARC-2026-NEW-${Math.floor(Math.random() * 90 + 10)}`,
      volume: 'BAWS Uncatalogued',
      language: 'English',
      preservationTier: 'Grade A1 (Deacidified / Cold Storage)'
    });

    setTimeout(() => setUploadSuccess(false), 4000);
  };

  // Simulate progress step
  const handleStepSimulation = () => {
    setIsSimulatingQueue(true);
    setQueue(prev => prev.map(job => {
      if (job.progress < 100) {
        const nextProgress = Math.min(job.progress + 25, 100);
        return {
          ...job,
          progress: nextProgress,
          status: nextProgress === 100 ? 'Completed' : 'Processing',
          currentStep: nextProgress === 100 ? 'Verified SHA-256 match & added to catalog' : 'Running Tesseract Devanagari OCR'
        };
      }
      return job;
    }));
    setTimeout(() => setIsSimulatingQueue(false), 800);
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-10 py-6 space-y-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
            <Settings className="w-4 h-4 text-amber-500" />
            DAIC Archival Ingestion & Curation Console
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-[#0B1F5C]">
            {t.admin}
          </h2>
          <p className="text-sm text-slate-600">
            Real-time optical character recognition queue, metadata ingestion, cryptographic SHA-256 verification, and storage tiers
          </p>
        </div>

        {/* Step Simulation Trigger */}
        <button
          onClick={handleStepSimulation}
          className="touch-target px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isSimulatingQueue ? 'animate-spin' : ''}`} />
          <span>Simulate OCR Pipeline Step</span>
        </button>
      </div>

      {/* Top 4 Preservation Status Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Storage Pool */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Storage Pool</span>
            <HardDrive className="w-5 h-5 text-blue-700" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-black font-mono text-[#0B1F5C]">
              {adminPreservationStats.usedStorageTB} / {adminPreservationStats.totalStorageTB} TB
            </div>
            <div className="text-xs text-slate-500">
              {adminPreservationStats.percentageUsed}% ZFS RAID-6 Capacity
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${adminPreservationStats.percentageUsed}%` }}
            />
          </div>
        </div>

        {/* Digitized Pages */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Master Scans</span>
            <FileCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-black font-mono text-[#0B1F5C]">
              {adminPreservationStats.totalItemsDigitized.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-700 font-medium">
              100% Ingested & Deacidified
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            600 DPI uncompressed archival TIFFs
          </div>
        </div>

        {/* SHA-256 Checksum Integrity */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Checksum Integrity</span>
            <ShieldCheck className="w-5 h-5 text-amber-500" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-black font-mono text-emerald-600">
              {adminPreservationStats.checksumIntegrityRate}% Pass
            </div>
            <div className="text-xs text-slate-500">
              Zero bit-rot across all archival pools
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            Continuous cryptographic verification
          </div>
        </div>

        {/* Cold Storage Backup */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Cold Backup Status</span>
            <Database className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-1">
            <div className="text-base font-bold text-slate-900">
              Tape Sync Verified
            </div>
            <div className="text-xs text-slate-500">
              Last mirror: {adminPreservationStats.lastColdStorageBackup}
            </div>
          </div>
          <div className="text-[11px] text-purple-700 font-medium">
            NIC Glacier Off-site Redundancy Active
          </div>
        </div>

      </div>

      {/* Main Dual Grid: Left = Ingestion Dropzone & Tagging Form, Right = Live OCR Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Metadata Tagging & Upload Area (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-6">
          <div>
            <h3 className="text-xl font-heading font-bold text-[#0B1F5C] flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-blue-700" />
              Document Upload & Metadata Tagging
            </h3>
            <p className="text-xs text-slate-500">
              Ingest new scans into the DAIC preservation database
            </p>
          </div>

          {/* Upload Dropzone Container */}
          <div className="border-2 border-dashed border-blue-300 hover:border-blue-600 bg-blue-50/50 rounded-2xl p-6 text-center space-y-2 cursor-pointer transition-colors">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 mx-auto flex items-center justify-center">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-800">
              Drag & Drop Master Scans (TIFF/PDF)
            </p>
            <p className="text-[11px] text-slate-500">
              Maximum 500MB per file • 600 DPI recommended
            </p>
          </div>

          {uploadSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Document ingested successfully and queued for OCR pipeline!</span>
            </div>
          )}

          {/* Metadata Form */}
          <form onSubmit={handleIngest} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Document Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Mahad Conference Draft Resolution (1927)"
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium"
                >
                  <option>Manuscript</option>
                  <option>Speech Transcript</option>
                  <option>Constituent Assembly Note</option>
                  <option>Photographic Plate</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={e => setFormData({ ...formData, language: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium"
                >
                  <option>English</option>
                  <option>Marathi</option>
                  <option>Hindi</option>
                  <option>Gujarati / Sanskrit</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Accession ID
                </label>
                <input
                  type="text"
                  value={formData.accessionNo}
                  onChange={e => setFormData({ ...formData, accessionNo: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Archival Volume / Box
                </label>
                <input
                  type="text"
                  value={formData.volume}
                  onChange={e => setFormData({ ...formData, volume: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Preservation Status Tier
              </label>
              <input
                type="text"
                value={formData.preservationTier}
                onChange={e => setFormData({ ...formData, preservationTier: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium"
              />
            </div>

            <button
              type="submit"
              className="touch-target w-full py-3.5 bg-[#0B1F5C] hover:bg-[#1E3A8A] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Submit & Begin OCR Pipeline</span>
            </button>
          </form>
        </div>

        {/* Right: Live OCR Processing Queue (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-heading font-bold text-[#0B1F5C] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-500" />
                Live OCR Processing Queue
              </h3>
              <p className="text-xs text-slate-500">
                Automated deskew, Devanagari/English OCR, confidence evaluation, and SHA-256 verification
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-blue-50 text-blue-900 px-3 py-1 rounded-full border border-blue-200">
              {queue.length} Active Jobs
            </span>
          </div>

          {/* Queue Jobs List */}
          <div className="space-y-4">
            {queue.map((job) => (
              <div
                key={job.id}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900 line-clamp-1">
                      {job.documentName}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {job.pages} pages • {job.fileSize} • Started {job.startTime}
                    </p>
                  </div>

                  <span className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    job.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : job.status === 'Processing'
                      ? 'bg-blue-100 text-blue-800 animate-pulse'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {job.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-600">{job.currentStep}</span>
                    <span className="font-bold text-blue-900">{job.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        job.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>

                {/* Checksum verification chip */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-200">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" /> Integrity Hash: {job.checksum}
                  </span>
                  <span className="text-emerald-700 font-semibold">
                    {job.progress === 100 ? '✓ Verified Valid' : 'Verifying...'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Storage Category Breakdown Chart / Table */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-heading font-bold text-slate-900 uppercase tracking-wider">
              Archival Storage Allocation Breakdown
            </h4>
            <div className="space-y-2 text-xs">
              {adminPreservationStats.categoryBreakdown.map((cat, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-700 font-medium">{cat.category}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-500">{cat.count.toLocaleString()} files</span>
                    <span className="font-bold text-blue-900">{cat.sizeGB} GB ({cat.percent}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
