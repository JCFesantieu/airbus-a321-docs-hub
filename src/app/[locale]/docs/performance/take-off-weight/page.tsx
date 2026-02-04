import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { DiagramViewer } from "@/components/layout/diagram-viewer";

import { getDictionary } from "@/lib/dictionary";



export default async function TakeOffWeightPage({

  params,

}: {

  params: Promise<{ locale: string }>;

}) {

  const { locale } = await params;

  const dict = await getDictionary(locale);

  const pathname = "/docs/performance/take-off-weight";



  return (

    <div className="space-y-8">

      <DocHero 

        title={dict.take_off_weight.title} 

        subtitle={dict.take_off_weight.subtitle}

        category={dict.nav.performance}

      />



      <div className="mx-auto max-w-5xl space-y-12">

        <section className="space-y-6">

          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">

            {dict.common.description}

          </h2>

          <div className="prose prose-slate max-w-none dark:prose-invert">

            <p className="text-lg leading-relaxed text-slate-600">

              {dict.take_off_weight.description}

            </p>

          </div>

        </section>



        <section className="space-y-6">

          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">

            {dict.take_off_weight.chart_title}

          </h2>

          <ContentCard 

            title={dict.take_off_weight.card_title}

            description={dict.take_off_weight.card_description}

          >

            <DiagramViewer 

              src="/img/p176_vector_Diagram_Page_176.png" 

              alt="Take-off Weight Chart"

            />

          </ContentCard>

        </section>



        <section className="space-y-6">

          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">

            {dict.take_off_weight.notice_title}

          </h2>

          <div className="rounded-xl border-l-8 border-red-600 bg-red-50 p-8 shadow-inner">

            <p className="text-xl font-bold text-red-900 mb-2 uppercase">{dict.take_off_weight.notice_title}</p>

            <p className="text-lg leading-relaxed text-red-800 italic">

              {dict.take_off_weight.description}

            </p>

          </div>

        </section>



        <DynamicTableSection pathname={pathname} title={dict.take_off_weight.table_title} />

      </div>

    </div>

  );

}
