# Airbus A321 Technical Documentation Hub

A modern, high-performance technical documentation portal for the **Airbus A321 Aircraft Characteristics - Airport and Maintenance Planning** manual. This project transforms raw PDF data into a searchable, responsive, and interactive web experience.

## 🚀 Live Demo
**URL:** [https://airbus-a321-docs-874417405692.europe-west1.run.app](https://airbus-a321-docs-874417405692.europe-west1.run.app)

## ✨ Key Features
- **Global Search:** Fuzzy search powered by `Fuse.js` for instant access to technical sections.
- **Responsive Design:** Optimized for desktop and mobile use by ground crews and airport planners.
- **Interactive Diagrams:** High-fidelity vector diagrams with advanced viewer capabilities.
- **Multilingual Support:** Infrastructure ready for internationalization (Next.js i18n).
- **MRO Optimized:** Structured data mapping for Maintenance, Repair, and Overhaul facilities.

## 🛠 Tech Stack
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn UI (Radix UI)
- **Icons:** Lucide React
- **Search:** Fuse.js

## 📂 Project Architecture
- `src/app/[locale]`: Localized application routes and layouts.
- `src/components`: Reusable UI components and layout elements.
- `src/config`: Centralized configuration (e.g., sidebar navigation in `docs.ts`).
- `src/data`: Structured technical data and mapping extracted from documentation.
- `src/lib`: Core utilities for search indexing and content extraction.
- `public/img`: Vector and bitmap diagrams for technical reference.

## 🛠 Development

### Prerequisites
- Node.js >= 20.0.0

### Getting Started
First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the result.

### Build and Test
```bash
# Type checking and production build
npm run build

# Run linting
npm run lint

# Run Jest tests
npm run test
```

## ☁️ Deployment

This application is optimized for **Google Cloud Run**.

### Deploying to Cloud Run
To deploy the application to your Google Cloud project:
```bash
gcloud run deploy airbus-a321-docs \
  --source . \
  --project [YOUR_PROJECT_ID] \
  --region europe-west1 \
  --allow-unauthenticated \
  --memory 1Gi
```
*Note: A minimum of 1Gi memory is required for building and starting the Next.js 16 server efficiently.*

## 📄 License
This project is licensed under the terms provided in the documentation sources (Airbus Technical Data).
