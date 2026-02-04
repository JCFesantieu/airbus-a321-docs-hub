import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function CargoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pathname = "/docs/description/cargo";

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.cargo.title} 
        subtitle={dict.cargo.subtitle}
        category={dict.nav.description}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.cargo.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.cargo.loc_dim_title}
          </h2>
          <ContentCard 
            title={dict.cargo.card_title}
            description={dict.cargo.card_description}
          >
            <DiagramViewer 
              src="/img/p85_vector_Diagram_Page_85.png" 
              alt="Cargo Compartments Locations and Dimensions"
            />
          </ContentCard>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.cargo.loading_title}
          </h2>
          <ContentCard 
            title={dict.cargo.card_title_2}
            description={dict.cargo.card_description_2}
          >
            <DiagramViewer 
              src="/img/p87_vector_Diagram_Page_87.png" 
              alt="Cargo Compartments Loading Combinations"
            />
          </ContentCard>
        </section>

        <DynamicTableSection pathname={pathname} title={dict.cargo.table_title} />
      </div>
    </div>
  );
}