import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function GroundClearancesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pathname = "/docs/description/ground-clearances";

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.ground_clearances.title} 
        subtitle={dict.ground_clearances.subtitle}
        category={dict.nav.description}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.ground_clearances.description}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <ContentCard title={dict.ground_clearances.configs_title} description={dict.ground_clearances.configs_desc}>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                {dict.ground_clearances.configs_list.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </ContentCard>
            
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 flex items-center">
              <p className="text-sm text-primary/80 italic leading-relaxed">
                <strong>Note:</strong> {dict.ground_clearances.note}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.ground_clearances.diagram_title}
          </h2>
          <ContentCard 
            title={dict.ground_clearances.card_title}
            description={dict.ground_clearances.card_description}
          >
            <DiagramViewer 
              src="/img/p57_vector_Diagram_Page_57.png" 
              alt="Ground Clearances Diagram"
            />
          </ContentCard>
        </section>

        <DynamicTableSection pathname={pathname} title={dict.ground_clearances.table_title} />
      </div>
    </div>
  );
}