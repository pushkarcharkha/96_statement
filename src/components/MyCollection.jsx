import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Printer, 
  QrCode, 
  Share2, 
  Download, 
  Sparkles, 
  CheckCircle, 
  X, 
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { generateQrSvg } from '../utils/qrGenerator';
import { translations } from '../data/translations';

export default function MyCollection({ 
  collection, 
  onRemoveItem, 
  onClearCollection, 
  language 
}) {
  const t = translations[language] || translations.en;

  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Generate dynamic QR URL / payload
  const dossierPayload = `https://daic.gov.in/archive/dossier?items=${collection.map(c => c.id).join(',')}&t=${Date.now()}`;
  const qrSvgHtml = generateQrSvg(dossierPayload, 220);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(dossierPayload);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-10 py-6 space-y-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
            <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
            Curated Visitor Reading List & Dossier
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-[#0B1F5C]">
            {t.myCollection} ({collection.length} Records)
          </h2>
          <p className="text-sm text-slate-600">
            Export your selected historical texts, speeches, and manuscripts via QR mobile transfer or official printed dossier
          </p>
        </div>

        {/* Global Collection Actions */}
        <div className="flex items-center gap-3">
          {collection.length > 0 && (
            <>
              <button
                onClick={() => setShowQrModal(true)}
                className="touch-target px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-md active:scale-95"
              >
                <QrCode className="w-5 h-5 text-slate-950" />
                <span>{t.generateQr}</span>
              </button>

              <button
                onClick={handlePrint}
                className="touch-target px-5 py-3 rounded-2xl bg-[#0B1F5C] hover:bg-[#1E3A8A] text-white font-bold text-sm flex items-center gap-2 shadow-md active:scale-95"
              >
                <Printer className="w-5 h-5 text-amber-300" />
                <span>{t.downloadPdf}</span>
              </button>

              <button
                onClick={onClearCollection}
                className="touch-target px-4 py-3 rounded-2xl bg-white hover:bg-red-50 text-red-700 border border-red-200 text-xs font-bold"
                title="Clear all saved records"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Printable Museum Letterhead View (Appears on print or screen) */}
      <div className="print-only hidden p-8 border-b-2 border-slate-900 mb-6 text-center space-y-2">
        <h1 className="text-2xl font-bold uppercase tracking-widest">
          Dr. Ambedkar International Centre (DAIC), New Delhi
        </h1>
        <h2 className="text-xl font-serif italic text-slate-800">
          Official Archival Exhibition Dossier & Research Bibliography
        </h2>
        <p className="text-xs text-slate-600">
          Generated on {new Date().toLocaleString('en-IN')} | Kiosk Terminal #01
        </p>
      </div>

      {/* Main Content: Empty State vs Cards Grid */}
      {collection.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4 max-w-2xl mx-auto shadow-sm">
          <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-900 mx-auto flex items-center justify-center">
            <Bookmark className="w-10 h-10 text-amber-500" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-[#0B1F5C]">
            Your Collection is Currently Empty
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            As you explore manuscripts, speeches, the Constitution, and historical timelines on this touch terminal, tap the <strong>"Save to Collection"</strong> button to compile your personalized museum reading list.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collection.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md border border-slate-200 flex flex-col justify-between space-y-4 group relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-900 px-3 py-1 rounded-full border border-blue-200">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      #{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-[#0B1F5C] group-hover:text-blue-700">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-amber-700 mt-1">
                    Citation: {item.citation}
                  </div>

                  <p className="text-sm text-slate-700 mt-3 bg-slate-50 p-4 rounded-2xl italic leading-relaxed border-l-4 border-blue-600">
                    "{item.snippet}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between no-print">
                  <span className="text-xs text-slate-400">{item.date}</span>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="touch-target px-3.5 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.removeFromCollection}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bibliography Summary Table for Printable Export */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
            <h4 className="text-sm font-heading font-bold text-slate-900 uppercase tracking-wider">
              Bibliographical Citation Index ({collection.length} entries)
            </h4>
            <ul className="text-xs font-mono text-slate-700 space-y-1.5 list-disc list-inside">
              {collection.map((c, i) => (
                <li key={i}>
                  <strong>{c.title}</strong> — {c.citation} ({c.date})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* QR Code Handoff Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6 no-print">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-amber-400 text-center space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading font-bold text-xl text-[#0B1F5C] flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-500" />
                Mobile Handoff
              </h3>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Scan this QR code with your smartphone camera to access your curated reading dossier and take it home.
            </p>

            {/* Offline SVG QR Display */}
            <div 
              className="flex justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner"
              dangerouslySetInnerHTML={{ __html: qrSvgHtml }}
            />

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-500 block truncate">
                {dossierPayload}
              </span>
              <button
                onClick={handleCopyLink}
                className="touch-target px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold w-full flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4 text-blue-700" />
                <span>{copiedLink ? "Link Copied to Clipboard!" : "Copy Dossier Link"}</span>
              </button>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="touch-target w-full py-3.5 bg-[#0B1F5C] text-white rounded-2xl font-bold hover:bg-blue-900 transition-colors"
            >
              Done Scanning
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
