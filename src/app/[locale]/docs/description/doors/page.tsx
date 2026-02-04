import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function DoorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pathname = "/docs/description/doors";

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.doors.title} 
        subtitle={dict.doors.subtitle}
        category={dict.nav.description}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.doors.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.doors.ident_title}
          </h2>
          <ContentCard 
            title={dict.doors.card_title}
            description={dict.doors.card_description}
          >
            <DiagramViewer 
              src="/img/p93_vector_Diagram_Page_93.png" 
              alt="Door Identification and Location"
            />
          </ContentCard>
        </section>

        <DynamicTableSection pathname={pathname} title={dict.doors.table_title} />
      </div>
    </div>
  );
}