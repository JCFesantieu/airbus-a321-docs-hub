import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function ConnectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.connections.title} 
        subtitle={dict.connections.subtitle}
        category={dict.nav.servicing}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.connections.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.connections.layout_title}
          </h2>
          <ContentCard 
            title={dict.connections.layout_card_title}
            description={dict.connections.layout_card_desc}
          >
            <DiagramViewer 
              src="/img/p252_vector_Diagram_Page_252.png" 
              alt="Ground Service Connections Layout"
            />
          </ContentCard>
        </section>
      </div>
    </div>
  );
}
