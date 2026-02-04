import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DiagramViewer } from "@/components/layout/diagram-viewer";

import { getDictionary } from "@/lib/dictionary";



export default async function JackingPage({

  params,

}: {

  params: Promise<{ locale: string }>;

}) {

  const { locale } = await params;

  const dict = await getDictionary(locale);



  return (

    <div className="space-y-8">

      <DocHero 

        title={dict.jacking.title} 

        subtitle={dict.jacking.subtitle}

        category={dict.nav.description}

      />



      <div className="mx-auto max-w-5xl space-y-12">

        <section className="space-y-6">

          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">

            {dict.common.description}

          </h2>

          <div className="prose prose-slate max-w-none dark:prose-invert">

            <p className="text-lg leading-relaxed text-slate-600">

              {dict.jacking.description}

            </p>

          </div>

        </section>



        <section className="space-y-6">

          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">

            {dict.jacking.points_title}

          </h2>

          <ContentCard 

            title={dict.jacking.points_card_title}

            description={dict.jacking.points_card_desc}

          >

            <DiagramViewer 

              src="/img/p155_vector_Diagram_Page_155.png" 

              alt="Jacking Point Locations"

            />

          </ContentCard>

        </section>

      </div>

    </div>

  );

}
