# Specification: Airbus A321 Technical Documentation Hub

## 1. Project Overview
The goal is to create a modern, high-performance static website to host the "A321 Aircraft Characteristics - Airport and Maintenance Planning" technical documentation. The site will provide a superior user experience compared to a raw PDF, offering easy navigation, global search, and responsive design for engineers and planners.

## 2. Target Audience
- Airport Operators
- Airline Maintenance/Repair Organizations (MRO)
- Aircraft Ground Handling Personnel
- Maintenance Engineers and Planners

## 3. Technology Stack
- **Framework:** Next.js (Static Site Generation - SSG)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (for modern, utility-first styling)
- **UI Components:** Shadcn UI (Radix UI based)
- **Content Format:** MDX (Markdown with JSX) for flexible documentation pages
- **Icons:** Lucide React
- **Search:** Fuse.js (local client-side search) or Algolia DocSearch
- **Deployment:** Vercel, Netlify, or Google Cloud Run (Containerized)

## 4. Information Architecture
The site will mirror the structure of the PDF manual:
- **Home:** Overview and quick links.
- **Documentation:**
    - **Chapter 1: Scope** (Introduction, Glossary)
    - **Chapter 2: Aircraft Description** (Characteristics, Dimensions, Ground Clearances, Interior, Cargo, etc.)
    - **Chapter 3: Aircraft Performance** (Payload/Range, Take-off Weight, Landing Field Length)
    - **Chapter 4: Ground Maneuvering** (Turning Radii, Visibility, Turn Paths)
    - **Chapter 5: Terminal Servicing** (Ramp Layouts, Turn Round Times, Service Connections)
    - **Chapter 6: Operating Conditions** (Exhaust Velocities, Danger Areas)
    - **Chapter 7: Pavement Data** (Landing Gear Footprint, Loads, ACN/PCN, ACR/PCR)
    - **Chapter 8: Scaled Drawings**
    - **Chapter 10: Rescue & Fire Fighting**

## 5. Key Features
- **Sidebar Navigation:** Hierarchical navigation tree following the manual's TOC.
- **Global Search:** Fast, fuzzy search for subjects, figures, and technical terms.
- **Interactive Tables:** Responsive tables with sticky headers and high-contrast data rows.
- **Diagram Lightbox:** Large technical figures will open in a high-resolution zoomable lightbox.
- **Version/Revision Tracker:** Clear indication of revision dates (e.g., "Rev: Mar 01/22").
- **Dark/Light Mode:** Theme switching for high-visibility in different environments.
- **Print-Friendly CSS:** Optimized styling for printing specific documentation sections.

## 6. UI/UX Design Principles
- **Clean & Professional:** Minimalist aesthetic using a professional color palette (Airbus-inspired blues and grays).
- **High Readability:** Focus on typography (Inter or SF Pro) and proper line spacing for technical reading.
- **Mobile Responsive:** Full functionality on tablets and mobile devices for field use.
- **Breadcrumbs:** Clear path indicators on every sub-page.

## 7. Content Implementation Strategy
1. **Extraction:** Convert PDF text to Markdown and extract high-resolution images/SVG diagrams.
2. **Componentization:** Create reusable React components for recurring technical data structures (e.g., `AircraftCharacteristicTable`, `GroundClearanceDiagram`).
3. **Glossary Integration:** Autolink glossary terms within the text to provide instant definitions via tooltips.

## 8. Development Phases
- **Phase 1:** Scaffold Next.js project and setup documentation layout.
- **Phase 2:** Implement Sidebar navigation and global search.
- **Phase 3:** Populate Content (Chapters 1-2 as initial priority).
- **Phase 4:** Polishing (Theme support, Lightbox, Performance optimization).
- **Phase 5:** Final Build & Verification.

## 9. Google Cloud Run Deployment
To deploy the application to Google Cloud Run, follow these steps:

### 9.1 Containerization (Dockerfile)
Create a `Dockerfile` in the root directory using the official Next.js deployment template. Ensure `output: 'standalone'` is set in `next.config.ts` to minimize image size.

### 9.2 Build and Push to Artifact Registry
1.  **Enable APIs:** `gcloud services enable artifactregistry.googleapis.com run.googleapis.com`
2.  **Create Repository:** `gcloud artifacts repositories create airbus-docs --repository-format=docker --location=us-central1`
3.  **Build Image:** `docker build -t us-central1-docker.pkg.dev/[PROJECT_ID]/airbus-docs/app:latest .`
4.  **Push Image:** `docker push us-central1-docker.pkg.dev/[PROJECT_ID]/airbus-docs/app:latest`

### 9.3 Deploy to Cloud Run
Execute the following command to deploy:
```bash
gcloud run deploy airbus-docs-hub \
  --image us-central1-docker.pkg.dev/[PROJECT_ID]/airbus-docs/app:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### 9.4 Continuous Deployment
Integrate with Cloud Build or GitHub Actions to trigger automatic deployments on every push to the `main` branch.
