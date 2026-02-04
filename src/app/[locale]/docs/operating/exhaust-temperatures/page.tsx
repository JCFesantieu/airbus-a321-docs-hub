import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function ExhaustTemperaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.exhaust_temperatures.title} 
        subtitle={dict.exhaust_temperatures.subtitle}
        category={dict.nav.operating}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.exhaust_temperatures.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.exhaust_temperatures.contours_title}
          </h2>
          <ContentCard 
            title={dict.exhaust_temperatures.contours_card_title}
            description={dict.exhaust_temperatures.contours_card_desc}
          >
            <DiagramViewer 
              src="/img/p334_vector_Diagram_Page_334.png" 
              alt="Engine Exhaust Temperatures"
            />
          </ContentCard>
        </section>
      </div>
    </div>
  );
}