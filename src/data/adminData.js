export const adminPreservationStats = {
  totalStorageTB: 50.0,
  usedStorageTB: 14.8,
  percentageUsed: 29.6,
  totalItemsDigitized: 35420,
  checksumIntegrityRate: 100.0,
  lastColdStorageBackup: "2026-09-29 03:00 IST",
  backupTiers: [
    { name: "Hot Tier (NVMe Local Kiosk Cache)", size: "2.4 TB", status: "Active / Low-Latency" },
    { name: "Warm Tier (DAIC On-Premise NAS RAID-6)", size: "12.4 TB", status: "Synchronized" },
    { name: "Cold Tier (NIC Glacier Offline Tape Archive)", size: "14.8 TB", status: "Verified SHA-256" }
  ],
  categoryBreakdown: [
    { category: "Manuscripts & High-Res Scans (600 DPI TIFF)", count: 18240, sizeGB: 9400, percent: 63.5 },
    { category: "Audio / Video Restored Master Tapes (FLAC/ProRes)", count: 210, sizeGB: 3200, percent: 21.6 },
    { category: "Constituent Assembly Transcripts & Metadata", count: 8650, sizeGB: 1400, percent: 9.5 },
    { category: "Photographic Glass Plates & Documents", count: 8320, sizeGB: 800, percent: 5.4 }
  ]
};

export const initialOcrQueue = [
  {
    id: "job-801",
    documentName: "States_and_Minorities_Draft_Addendum_1947.pdf",
    pages: 42,
    fileSize: "18.4 MB",
    status: "Processing",
    progress: 78,
    currentStep: "Layout analysis & confidence evaluation",
    checksum: "sha256:8b4f2c91a03e91d8...f7e1",
    startTime: "18:42:10"
  },
  {
    id: "job-802",
    documentName: "Round_Table_Conference_Speech_Vol2_1931.tiff",
    pages: 18,
    fileSize: "64.2 MB",
    status: "Deskewing",
    progress: 42,
    currentStep: "Binarization and skew correction (0.4 deg)",
    checksum: "sha256:3a91e5c021ff782b...c902",
    startTime: "18:48:30"
  },
  {
    id: "job-803",
    documentName: "Bahishkrit_Bharat_Editorial_No14_1928.tiff",
    pages: 8,
    fileSize: "41.0 MB",
    status: "Queued",
    progress: 5,
    currentStep: "Awaiting Tesseract Devanagari OCR engine",
    checksum: "sha256:77f12a88d3e56bc1...33a4",
    startTime: "18:52:15"
  },
  {
    id: "job-804",
    documentName: "Columbia_Dissertation_Faculty_Letter_1916.pdf",
    pages: 4,
    fileSize: "3.2 MB",
    status: "Completed",
    progress: 100,
    currentStep: "Integrity verified (SHA-256 Match). Ingested into database.",
    checksum: "sha256:22bc4501ef67912a...aa10",
    startTime: "18:30:00"
  }
];
