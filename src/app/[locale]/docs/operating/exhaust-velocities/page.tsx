import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function ExhaustVelocitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.exhaust_velocities.title} 
        subtitle={dict.exhaust_velocities.subtitle}
        category={dict.nav.operating}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.exhaust_velocities.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.exhaust_velocities.contours_title}
          </h2>
          <ContentCard 
            title={dict.exhaust_velocities.contours_card_title}
            description={dict.exhaust_velocities.contours_card_desc}
          >
            <DiagramViewer 
              src="/img/p324_vector_Diagram_Page_324.png" 
              alt="Engine Exhaust Velocities"
            />
          </ContentCard>
        </section>
      </div>
    </div>
  );
}