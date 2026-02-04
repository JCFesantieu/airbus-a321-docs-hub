import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DiagramViewer } from "@/components/layout/diagram-viewer";
import { getDictionary } from "@/lib/dictionary";

export default async function EscapeSlidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.escape_slides.title} 
        subtitle={dict.escape_slides.subtitle}
        category={dict.nav.description}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.escape_slides.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.escape_slides.loc_title}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed text-slate-600 font-bold mb-4">
                {dict.escape_slides.loc_intro}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-accent shrink-0" />
                  <span className="text-slate-600">{dict.escape_slides.loc_std}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-accent shrink-0" />
                  <span className="text-slate-600">{dict.escape_slides.loc_std_2}</span>
                </li>
              </ul>
              
              <p className="text-lg leading-relaxed text-slate-600 font-bold mt-8 mb-4">
                {dict.escape_slides.loc_neo_intro}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-accent shrink-0" />
                  <span className="text-slate-600">{dict.escape_slides.loc_neo_1}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-accent shrink-0" />
                  <span className="text-slate-600">{dict.escape_slides.loc_neo_2}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-accent shrink-0" />
                  <span className="text-slate-600">{dict.escape_slides.loc_neo_3}</span>
                </li>
              </ul>
            </div>
            
            <ContentCard title={dict.escape_slides.card_title} description={dict.escape_slides.card_description}>
              <DiagramViewer 
                src="/img/p110_vector_Diagram_Page_110.png" 
                alt="Escape Slides Location"
              />
            </ContentCard>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.escape_slides.dim_title}
          </h2>
          <ContentCard 
            title={dict.escape_slides.card_title_2}
            description={dict.escape_slides.card_description_2}
          >
            <DiagramViewer 
              src="/img/p111_vector_Diagram_Page_111.png" 
              alt="Escape Slides Dimensions"
            />
          </ContentCard>
        </section>
      </div>
    </div>
  );
}