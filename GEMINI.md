# Airbus A321 Technical Documentation Hub - Gemini Context

This project is a modern, high-performance static website built with Next.js to host the "A321 Aircraft Characteristics - Airport and Maintenance Planning" technical documentation.

## Project Overview

- **Purpose:** Provide a searchable, responsive, and user-friendly interface for A321 technical documentation, improving upon the raw PDF experience.
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn UI (Radix UI based)
- **Icons:** Lucide React
- **Search:** Fuse.js for client-side fuzzy search.
- **Architecture:** 
    - `src/app`: Contains the application routes and layouts. Documentation pages are nested under `/docs`.
    - `src/components`: Reusable UI components (in `ui/`) and layout-specific components like `Header` and `Sidebar`.
    - `src/config`: Centralized configuration for the site, including navigation structure in `docs.ts`.
    - `src/data`: (Planned) Storage for structured technical data extracted from the manual.
    - `input/`: Contains the original PDF technical data.

## Building and Running

- **Development Server:** `npm run dev` - Starts the development server at http://localhost:3000.
- **Production Build:** `npm run build` - Creates an optimized production build.
- **Production Start:** `npm run start` - Starts the production server.
- **Linting:** `npm run lint` - Runs ESLint to check for code quality issues.

## Development Conventions

- **Component Architecture:** Prefer small, focused components. Use Shadcn UI for base components and extend them as needed.
- **Navigation:** All sidebar links are managed in `src/config/docs.ts`. Adding a new documentation page requires updating this file.
- **Documentation Pages:** Pages are currently implemented as React components in `src/app/docs/`. Data-heavy sections (like characteristics) should use structured arrays and mapping to render tables.
- **Type Safety:** Rigorous use of TypeScript interfaces for navigation and technical data.
- **Styling:** Use Tailwind CSS utility classes. Airbus-specific branding (blues/grays) should be maintained for a professional aesthetic.

## Key Files

- `spec.md`: The original project specification.
- `src/config/docs.ts`: Defines the documentation structure and sidebar navigation.
- `src/components/layout/sidebar.tsx`: Dynamic sidebar that tracks the current route.
- `src/components/search.tsx`: Fuzzy search implementation using Fuse.js.
- `src/app/layout.tsx`: Root layout providing the Header/Sidebar structure.
