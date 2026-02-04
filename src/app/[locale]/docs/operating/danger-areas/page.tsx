import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function DangerAreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.danger_areas.title} 
        subtitle={dict.danger_areas.subtitle}
        category={dict.nav.operating}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.danger_areas.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.danger_areas.diagram_title}
          </h2>
          <ContentCard 
            title={dict.danger_areas.card_title}
            description={dict.danger_areas.card_description}
          >
            <DiagramViewer 
              src="/img/p359_vector_Diagram_Page_359.png" 
              alt="Danger Areas of Engines"
            />
          </ContentCard>
        </section>
      </div>
    </div>
  );
}
