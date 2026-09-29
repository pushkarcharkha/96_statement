export const kioskHardwareArchitecture = {
  title: "DAIC Museum Kiosk & Edge Archive System Topology",
  subtitle: "High-Availability, Air-Gapped / Offline-Resilient Cultural Heritage Deployment",
  components: [
    {
      id: "touch-kiosk",
      name: "Interactive Touch Kiosk Terminal",
      category: "Visitor Interface",
      icon: "MonitorCheck",
      color: "#2563EB",
      status: "Online / Active",
      specs: [
        "Display: 55-inch 4K UHD Commercial IPS Panel (3840x2160 @ 60Hz)",
        "Touch Engine: 10-point Projected Capacitive (PCAP) with 6mm anti-vandal toughened glass",
        "Enclosure: IP54 dust-proof steel pedestal with wheelchair-accessible ADA compliant rake (15°)",
        "Onboard Compute: Intel Core i7-13700T, 32GB DDR5 RAM, 1TB NVMe Gen4 SSD",
        "Thermal & Power: Fanless silent dissipation, 2.0kVA Online UPS with 45-min battery fallback"
      ],
      role: "Renders the fluid kiosk interface, captures high-precision touch gestures, executes local vector searches, and handles instant audio-visual streaming."
    },
    {
      id: "smart-display",
      name: "Smart Display Wall (Panoramic Mirror)",
      category: "Ambient Exhibition",
      icon: "Tv",
      color: "#8B5CF6",
      status: "Synced via Zero-Latency HDMI/IP",
      specs: [
        "Array: 3x1 Bezel-less OLED 75-inch Video Wall (11520x2160 panoramic ribbon)",
        "Resolution: Ultra-wide high dynamic range (HDR10, 800 nits continuous brightness)",
        "Controller: Hardware video matrix scaler with frame-lock synchronization (<2ms delay)",
        "Display Mode: Idle attractor loop, synchronized knowledge graph visualization, and featured manuscript spotlights"
      ],
      role: "Broadcasts ambient visual narratives to surrounding museum gallery visitors, mirroring kiosk highlights without interfering with active user touch sessions."
    },
    {
      id: "archive-server",
      name: "Local Archive Edge Server (DAIC Node)",
      category: "On-Premise Infrastructure",
      icon: "Server",
      color: "#0B1F5C",
      status: "Running / RAID-6 Healthy",
      specs: [
        "Architecture: Dual AMD EPYC 9124 (32 Cores / 64 Threads), 128GB ECC RAM",
        "Storage Pool: 64TB ZFS RAID-6 (Dual Parity) with 4TB NVMe L2ARC read cache",
        "Database: Embedded SQLite + Local ChromaDB Vector Store for offline semantic query matching",
        "Network: Isolated 10GbE SFP+ optical backbone with zero external internet dependency"
      ],
      role: "Hosts the uncompressed 600 DPI TIFF master scans, multi-track lossless audio files, and full-text searchable indexes with sub-50ms query response."
    },
    {
      id: "nfc-qr-station",
      name: "NFC / QR Mobile Handoff Terminal",
      category: "Visitor Personalization",
      icon: "QrCode",
      color: "#10B981",
      status: "Ready for Tap & Scan",
      specs: [
        "NFC Transceiver: Dual-frequency ISO/IEC 14443 Type A/B + FeliCa reader",
        "Thermal Printer: High-speed 80mm kiosk receipt printer for instant physical souvenir QR dossiers",
        "Dynamic QR Engine: Real-time generation of encrypted payload links for browser handoff",
        "Protocol: Zero-app-install WebPWA handoff to iOS Safari / Android Chrome"
      ],
      role: "Allows visitors to seamlessly transfer their curated 'My Collection' reading list, annotated documents, and audio tracks to their personal smartphones with a single tap."
    },
    {
      id: "offline-mode",
      name: "Air-Gapped Offline Resilience System",
      category: "Fault Tolerance",
      icon: "ShieldAlert",
      color: "#F59E0B",
      status: "Failover Ready / Autonomous",
      specs: [
        "Air-gap Security: Physical hardware isolation prevents any remote external tampering",
        "Local TTS & Speech API: Built-in offline voice synthesis and on-device whisper acoustic models",
        "Scheduled Cold Mirroring: Nightly cryptographically signed rsync mirror to national cloud archive when administrative bypass link is established",
        "Mean Time Between Failures (MTBF): 120,000 continuous hours certified"
      ],
      role: "Ensures the museum terminal operates at 100% full fidelity 365 days a year, completely independent of public internet availability or network outages."
    }
  ],
  flowSteps: [
    { step: 1, title: "Visitor Touch Input", desc: "User interacts on the 55\" PCAP touch display with minimum 56px targets." },
    { step: 2, title: "Low-Latency Local Query", desc: "Edge server responds in <30ms from NVMe cache without internet." },
    { step: 3, title: "Dual Output", desc: "Kiosk displays high-res scans while the Panoramic Display mirrors ambient themes." },
    { step: 4, title: "Personal Mobile Handoff", desc: "User taps NFC or scans QR to take their personal dossier home." }
  ]
};
