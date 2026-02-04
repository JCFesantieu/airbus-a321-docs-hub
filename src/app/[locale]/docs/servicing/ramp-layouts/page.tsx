import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function RampLayoutsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.ramp_layouts.title} 
        subtitle={dict.ramp_layouts.subtitle}
        category={dict.nav.servicing}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.ramp_layouts.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.ramp_layouts.layout_title}
          </h2>
          <ContentCard 
            title={dict.ramp_layouts.layout_card_title}
            description={dict.ramp_layouts.layout_card_desc}
          >
            <DiagramViewer 
              src="/img/p228_vector_Diagram_Page_228.png" 
              alt="Typical Ramp Layout - Open Apron"
            />
          </ContentCard>
        </section>
      </div>
    </div>
  );
}