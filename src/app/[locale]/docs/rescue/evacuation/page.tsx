import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function EvacuationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.evacuation.title} 
        subtitle={dict.evacuation.subtitle}
        category={dict.nav.rescue}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.evacuation.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.evacuation.devices_title}
          </h2>
          <ContentCard 
            title={dict.evacuation.card_title}
            description={dict.evacuation.card_description}
          >
            <DiagramViewer 
              src="/img/p415_vector_Diagram_Page_415.png" 
              alt="Emergency Evacuation Devices"
            />
          </ContentCard>
        </section>
      </div>
    </div>
  );
}
