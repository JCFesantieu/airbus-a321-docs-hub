import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { DiagramViewer } from "@/components/layout/diagram-viewer";

import { getDictionary } from "@/lib/dictionary";

export default async function LandingGearPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pathname = "/docs/description/landing-gear";

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.landing_gear.title} 
        subtitle={dict.landing_gear.subtitle}
        category={dict.nav.description}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.landing_gear.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.landing_gear.main_gear_title}
          </h2>
          <ContentCard 
            title={dict.landing_gear.main_gear_card_title}
            description={dict.landing_gear.main_gear_card_desc}
          >
            <DiagramViewer 
              src="/img/p115_vector_Diagram_Page_115.png" 
              alt="Main Landing Gear"
            />
          </ContentCard>
        </section>

        <DynamicTableSection pathname={pathname} title={dict.landing_gear.table_title} />
      </div>
    </div>
  );
}
