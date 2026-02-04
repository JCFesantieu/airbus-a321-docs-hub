import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function RescueGeneralPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.rescue_general.title} 
        subtitle={dict.rescue_general.subtitle}
        category={dict.nav.rescue}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.rescue_general.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.rescue_general.chart_title}
          </h2>
          <ContentCard 
            title={dict.rescue_general.card_title}
            description={dict.rescue_general.card_desc}
          >
            <DiagramViewer 
              src="/img/p414_vector_Diagram_Page_414.png" 
              alt="Aircraft Rescue and Fire Fighting Chart"
            />
          </ContentCard>
        </section>
      </div>
    </div>
  );
}