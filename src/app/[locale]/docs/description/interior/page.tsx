import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DiagramViewer } from "@/components/layout/diagram-viewer";

export default function InteriorPage() {
  return (
    <div className="space-y-8">
      <DocHero 
        title="Interior Arrangements" 
        subtitle="Detailed plan views of typical cabin configurations for the A321 variants."
        category="Chapter 2: Aircraft Description"
      />
      
      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">Description</h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              This section provides detailed plan views of the interior arrangements for various A321 models. The configurations shown are typical and may vary according to operator specifications.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">Typical Configuration</h2>
          <ContentCard 
            title="Single-Class, High Density"
            description="Typical layout for A321-100, A321-200 and A321neo models."
          >
            <DiagramViewer 
              src="/img/p76_vector_Diagram_Page_76.png" 
              alt="Interior Arrangements - Plan View"
            />
          </ContentCard>
        </section>
      </div>
    </div>
  );
}
