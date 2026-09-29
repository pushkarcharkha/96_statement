# Babasaheb Digital Heritage Archive
### Dr. Ambedkar International Centre (DAIC), Ministry of Social Justice and Empowerment, Government of India

An interactive, responsive museum kiosk-style web prototype designed landscape-first (1920×1080) for the **Dr. Ambedkar International Centre (DAIC)** at 15 Janpath, New Delhi. Built with **React 18, Vite, Tailwind CSS, Framer Motion, and D3.js**.

---

## 🏛️ Theme & Design Aesthetics
- **Ambedkar Blue Palette**: `#0B1F5C` (Deep Primary), `#1E3A8A` (Rich Navy), `#2563EB` (Vibrant Blue)
- **Museum Accents**: Off-white `#F8FAFC` background, Gold accent `#F59E0B`
- **Typography**: 
  - Headings: *Playfair Display*
  - Body: *Inter*
  - Hindi / Marathi: *Noto Sans Devanagari*
- **Ashoka Chakra Watermark**: Authentic 24-spoke vector SVG slowly rotating in background (`60s linear infinite`)
- **Hero Display**: Bharat Ratna Dr. B. R. Ambedkar portrait with custom blue duotone overlay
- **Touch-First Compliance**: Minimum 56px touch targets for commercial kiosk screens (PCAP capacitive glass)

---

## 🌐 Global Kiosk Features
1. **Multi-Lingual i18n Switcher**: Seamless toggling between English (EN), हिन्दी (HI), and मराठी (MR) across all screens and labels.
2. **Idle Attract Screen**: Automatically activates after 60 seconds of inactivity (with 10-second warning toast). Resets immediately on any touch or key.
3. **Accessibility Controls**:
   - **Font Sizing**: Normal (100%), Large (115%), Extra Large (130%).
   - **High Contrast Mode**: Crisp black background with bright gold and white elements for visually impaired visitors.
   - **Audio Narration**: On-device text-to-speech for document snippets, plain explainers, and quotes.
4. **Live Museum Clock**: Displays IST real-time clock with seconds and current date.
5. **My Collection & Handoff**: Add items across any screen, view bibliographies, generate offline SVG QR codes for smartphone transfer, and print high-definition museum dossiers.

---

## 🖥️ 12 Core Archival Modules & Screens

| # | Screen | Description |
|---|---|---|
| **1** | **Attract Screen** | Dignified portrait, rotating Ashoka Chakra, cycling quotes with typing effect, and pulsing *"Touch Screen to Begin"* CTA. |
| **2** | **Home Screen** | Hero banner with blue duotone overlay, daily quote typewriter, live stats (35,420+ digitized pages), and 12 touch tiles. |
| **3** | **Semantic Search** | Search bar + Voice Input (Web Speech API with graceful fallback), filter tabs, and an interactive **D3 Force-Directed Knowledge Graph** (12 interconnected nodes) that highlights on hover and filters documents on click. |
| **4** | **Manuscript Viewer** | 3 sample manuscripts (The Untouchables 1948, Castes in India 1916, Waiting for a Visa 1935) with zoomable 600 DPI scan view (zoom, pan, rotate, filter), verbatim OCR text with word-level confidence highlighting, translations, and executive summary toggle. |
| **5** | **Audio-Video Archive** | Historic restored recordings (BBC Interview 1953, CAD Closing Speech Nov 25 1949, Deekshabhoomi 1956), dynamic real-time audio waveform visualizer, synchronized karaoke-style transcript highlighting, and multi-lingual subtitles. |
| **6** | **Interactive Timeline** | Horizontal parallax scroll across 1891–1956 covering 5 historical eras with milestone cards, photos, locations, and Dr. Ambedkar's quotes. |
| **7** | **Ask Babasaheb (AI)** | Ethical AI Research Assistant grounded in BAWS & CAD. Returns verified citation chips (`[CAD Vol. XI, p. 972]`, `[BAWS Vol. 1, p. 48]`). Strictly declines out-of-archive questions with *"Not found in the archive"*. |
| **8** | **Lesson of the Day** | Interactive 3D cards for *"Educate, Agitate, Organize"* with real quotes, historical context, and contemporary civic applications. |
| **9** | **Constitution Explorer** | Interactive explorer for key Articles (Preamble, Art 14, 15, 17, 21, 32, 44, 46) featuring a 3-column view: CAD Debate Speech Excerpt, Final 1950 Enacted Text, and Plain-Language Public Explainer. |
| **10** | **My Collection** | User reading list compiler with dynamic offline QR Code generator for mobile handoff and printable PDF / dossier export. |
| **11** | **Admin Dashboard** | DAIC preservation management console with master scan upload dropzone, live OCR queue with progress bars, metadata tagging form, and storage allocation charts. |
| **12** | **Hardware Architecture** | Technical museum kiosk topology diagram detailing the 55" touch kiosk, panoramic smart display, local edge server (ZFS RAID-6), NFC/QR handoff, and 100% offline air-gapped operational resilience. |

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v18 or higher recommended; v23 supported)
- npm (v9 or higher)

### Setup & Run
```bash
# 1. Install dependencies
npm install

# 2. Start development dev server (Vite)
npm run dev

# 3. Open browser at:
# http://localhost:5173
```

### Production Build & Preview
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Repository Structure
```
├── public/
│   └── assets/
│       ├── babasaheb.jpg        # Duotone hero portrait
│       ├── babasaheb.webp       # High-efficiency WebP portrait
│       └── chakra.svg           # 24-spoke Ashoka Chakra vector
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Global museum top navigation
│   │   ├── AttractScreen.jsx    # Screen 1: Idle Attract Screen
│   │   ├── HomeScreen.jsx       # Screen 2: 12-Tile Master Portal
│   │   ├── SemanticSearch.jsx   # Screen 3: Search + D3 Knowledge Graph
│   │   ├── ManuscriptViewer.jsx # Screen 4: Scanned Page & OCR
│   │   ├── AudioVideoArchive.jsx# Screen 5: Waveform & Synced Transcripts
│   │   ├── InteractiveTimeline.jsx # Screen 6: 1891-1956 Horizontal Scroll
│   │   ├── AskBabasaheb.jsx     # Screen 7: Grounded AI Assistant
│   │   ├── LessonOfTheDay.jsx   # Screen 8: Educate Agitate Organize
│   │   ├── ConstitutionExplorer.jsx # Screen 9: 3-Way Article Comparison
│   │   ├── MyCollection.jsx     # Screen 10: QR Handoff & Printable PDF
│   │   ├── AdminDashboard.jsx   # Screen 11: OCR Queue & Preservation
│   │   ├── HardwareSlide.jsx    # Screen 12: Kiosk Edge Architecture
│   │   └── IdleAttractTimer.jsx # 60s Inactivity Tracker
│   ├── data/
│   │   ├── translations.js      # English, Hindi, Marathi UI labels
│   │   ├── speechesAndWritings.js # BAWS volumes, speeches, articles
│   │   ├── knowledgeGraphData.js# D3 nodes and relational links
│   │   ├── manuscriptsData.js   # 3 high-res manuscripts with OCR confidence
│   │   ├── audioVideoData.js    # Historic recordings with timed cues
│   │   ├── timelineData.js      # 5 historical eras & milestone cards
│   │   ├── constitutionData.js  # Articles, CAD speeches, explainers
│   │   ├── lessonsData.js       # Educate, Agitate, Organize modules
│   │   ├── aiAssistantData.js   # Grounded knowledge base & citations
│   │   ├── adminData.js         # Preservation stats & OCR jobs
│   │   └── hardwareData.js      # Kiosk specs & offline system topology
│   ├── utils/
│   │   └── qrGenerator.js       # Offline dynamic SVG QR generator
│   ├── App.jsx                  # Master screen state coordinator
│   ├── index.css                # Tailwind, touch targets, duotone filters
│   └── main.jsx                 # React root DOM mount
├── index.html                   # HTML5 shell with Google Fonts
├── tailwind.config.js           # Theme colors, fonts, animations
├── vite.config.js               # Vite build configuration
└── package.json                 # Project dependencies & scripts
```

---

## 🏛️ Produced for
**Dr. Ambedkar International Centre (DAIC)**  
Ministry of Social Justice and Empowerment, Government of India  
15 Janpath, New Delhi - 110001
