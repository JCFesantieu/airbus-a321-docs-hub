import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function FootprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pathname = "/docs/pavement/footprint";

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.footprint.title} 
        subtitle={dict.footprint.subtitle}
        category={dict.nav.pavement}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.footprint.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.footprint.diagram_title}
          </h2>
          <ContentCard 
            title={dict.footprint.diagram_card_title}
            description={dict.footprint.diagram_card_desc}
          >
            <DiagramViewer 
              src="/img/p380_vector_Diagram_Page_380.png" 
              alt="Landing Gear Footprint Diagram"
            />
          </ContentCard>
        </section>

        <DynamicTableSection pathname={pathname} title={dict.footprint.table_title} />
      </div>
    </div>
  );
}
