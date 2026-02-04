import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function PayloadRangePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pathname = "/docs/performance/payload-range";

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.payload_range.title} 
        subtitle={dict.payload_range.subtitle}
        category={dict.nav.performance}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600 border-l-4 border-accent pl-6 bg-slate-50 p-6 italic">
              {dict.payload_range.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.payload_range.chart_title}
          </h2>
          <ContentCard 
            title={dict.payload_range.card_title}
            description={dict.payload_range.card_description}
          >
            <DiagramViewer 
              src="/img/p172_vector_Diagram_Page_172.png" 
              alt="Payload Range Chart"
            />
          </ContentCard>
        </section>

        <DynamicTableSection pathname={pathname} title={dict.payload_range.table_title} />
      </div>
    </div>
  );
}