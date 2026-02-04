import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function LandingLengthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pathname = "/docs/performance/landing-length";

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.landing_length.title} 
        subtitle={dict.landing_length.subtitle}
        category={dict.nav.performance}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.landing_length.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.landing_length.chart_title}
          </h2>
          <ContentCard 
            title={dict.landing_length.card_title}
            description={dict.landing_length.card_description}
          >
            <DiagramViewer 
              src="/img/p187_vector_Diagram_Page_187.png" 
              alt="Landing Field Length Chart"
            />
          </ContentCard>
        </section>

        <DynamicTableSection pathname={pathname} title={dict.landing_length.table_title} />
      </div>
    </div>
  );
}
