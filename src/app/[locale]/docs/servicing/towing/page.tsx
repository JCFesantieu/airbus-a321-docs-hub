import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function TowingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.towing.title} 
        subtitle={dict.towing.subtitle}
        category={dict.nav.servicing}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.towing.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.towing.req_title}
          </h2>
          <ContentCard 
            title={dict.towing.card_title}
            description={dict.towing.card_description}
          >
            <DiagramViewer 
              src="/img/p316_vector_Diagram_Page_316.png" 
              alt="Ground Towing Requirements"
            />
          </ContentCard>
        </section>
      </div>
    </div>
  );
}
