# Changelog

All notable changes to the Airbus A321 Technical Documentation Hub will be documented in this file.

## [0.2.0] - 2026-02-06

### Added
- **Production Deployment:** Successfully deployed to Google Cloud Run (`europe-west1`) with automated build pipelines.
- **Node.js Environment Lock:** Injected `engines` field in `package.json` to enforce `node >= 20.0.0`, ensuring build stability across environments.

### Changed
- **Dictionary Synchronization:** Achieved 100% key parity across `en.json`, `fr.json`, `de.json`, and `es.json` to satisfy TypeScript strict typing in the App Router.
- **Unified Component Schema:** Standardized all documentation cards to use a consistent `card_title` and `card_description` structure.
- **Cloud Run Optimization:** Configured the service to listen on port `3000` to match Next.js standalone output and updated `artifactregistry.createOnPushWriter` permissions for seamless deployment.

### Fixed
- **TypeScript Build Failures:** Resolved "Property does not exist" errors in technical pages (`landing_length`, `take_off_weight`) caused by missing dictionary keys.
- **Deployment Blockers:** Fixed `denied: gcr.io repo does not exist` by migrating to Artifact Registry and correcting IAM policy bindings.

## [0.1.0] - 2026-01-30
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
