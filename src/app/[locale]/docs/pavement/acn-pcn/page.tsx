import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function AcnPcnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pathname = "/docs/pavement/acn-pcn";

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.acn_pcn.title} 
        subtitle={dict.acn_pcn.subtitle}
        category={dict.nav.pavement}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.acn_pcn.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.acn_pcn.table_title}
          </h2>
          <ContentCard 
            title={dict.acn_pcn.card_title}
            description={dict.acn_pcn.card_description}
          >
            <DiagramViewer 
              src="/img/p399_vector_Diagram_Page_399.png" 
              alt="ACN Table"
            />
          </ContentCard>
        </section>

        <DynamicTableSection pathname={pathname} title={dict.acn_pcn.dynamic_table_title} />
      </div>
    </div>
  );
}