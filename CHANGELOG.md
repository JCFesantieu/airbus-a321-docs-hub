# Changelog

All notable changes to the Airbus A321 Technical Documentation Hub will be documented in this file.

## [Unreleased] - 2026-01-30

### Added
- **Multi-language Support (i18n):**
    - Implemented native Next.js routing with `[locale]` segments.
    - Added comprehensive translation dictionaries for English, French, German, and Spanish.
    - Developed a `getDictionary` utility for server-side translation loading.
    - Added an elegant Language Switcher in the Header.
- **Interactive Diagram Viewer:**
    - Created `DiagramViewer` component using `framer-motion`.
    - Features: High-resolution zoom (up to 500%), 90-degree rotation, drag-to-pan, and immersive Fullscreen mode.
- **Vision-based Data Extraction:**
    - New script `extract_tables_vision.py` using Gemini 3 Flash Vision.
    - Automatically identifies and converts graphical tables from diagrams into structured JSON.
    - Implemented `src/data/mapping.json` to link extracted data to specific website pages.
- **Dynamic Data Integration:**
    - Developed `DynamicTableSection` and `TechnicalTable` components.
    - Tables extracted by AI now appear automatically on the relevant documentation pages.
    - Intelligent cell formatting for technical units (kg, lb, m, ft).
- **Airbus Corporate Design:**
    - Complete UI overhaul inspired by official Airbus digital standards.
    - New color palette: Airbus Deep Blue (`#00205B`) and Sky Blue (`#00AEEF`).
    - Added `DocHero` component for high-impact section headers.
    - Added `ContentCard` for structured layout of technical assets.
- **Advanced PDF Processing:**
    - Improved `extract_pdf.py` with precision vector diagram extraction.
    - Tight bounding box calculation to remove noise and margins from technical drawings.
    - Smart filename generation using detected "FIGURE" titles.

### Changed
- **Information Architecture:**
    - Reorganized all 30+ documentation pages to prioritize the "Description" section at the top for better readability.
    - Moved all assets to `public/img/` for proper Next.js static serving.
- **Infrastructure:**
    - Migrated from API Key authentication to Vertex AI (GCP) using Application Default Credentials (ADC).
    - Upgraded extraction logic to use the `gemini-3-flash-preview` model.

### Fixed
- **Routing:** Corrected TurboPack errors by implementing a standard root layout and proper CSS imports.
- **Navigation:** Updated the fuzzy search engine (`Fuse.js`) to be locale-aware and preserve the selected language during navigation.
- **Build Errors:** Fixed redundant imports and client/server component boundary issues.
