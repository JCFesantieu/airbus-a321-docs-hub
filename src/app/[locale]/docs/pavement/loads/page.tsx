import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function PavementLoadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pathname = "/docs/pavement/loads";

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.pavement_loads.title} 
        subtitle={dict.pavement_loads.subtitle}
        category={dict.nav.pavement}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.pavement_loads.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.pavement_loads.chart_title}
          </h2>
          <ContentCard 
            title={dict.pavement_loads.card_title}
            description={dict.pavement_loads.card_desc}
          >
            <DiagramViewer 
              src="/img/p386_vector_Diagram_Page_386.png" 
              alt="Maximum Pavement Loads"
            />
          </ContentCard>
        </section>

        <DynamicTableSection pathname={pathname} title={dict.pavement_loads.table_title} />
      </div>
    </div>
  );
}
