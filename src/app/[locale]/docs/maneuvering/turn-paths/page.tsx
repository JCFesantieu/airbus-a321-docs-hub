import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function TurnPathsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pathname = "/docs/maneuvering/turn-paths";

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.turn_paths.title} 
        subtitle={dict.turn_paths.subtitle}
        category={dict.nav.maneuvering}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.turn_paths.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.turn_paths.chart_title}
          </h2>
          <ContentCard 
            title={dict.turn_paths.card_title}
            description={dict.turn_paths.card_desc}
          >
            <DiagramViewer 
              src="/img/p203_vector_Diagram_Page_203.png" 
              alt="135 Degree Turn Path"
            />
          </ContentCard>
        </section>

        <DynamicTableSection pathname={pathname} title={dict.turn_paths.table_title} />
      </div>
    </div>
  );
}
