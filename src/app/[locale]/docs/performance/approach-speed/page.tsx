import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { getDictionary } from "@/lib/dictionary";

export default async function ApproachSpeedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.approach_speed.title} 
        subtitle={dict.approach_speed.subtitle}
        category={dict.nav.performance}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.approach_speed.card_title}
          </h2>
          <ContentCard title={dict.approach_speed.card_title} description={dict.approach_speed.card_description}>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed text-slate-600">
                {dict.approach_speed.description}
              </p>
              
              <div className="my-8 flex flex-col items-center justify-center rounded-2xl border-2 border-accent/20 bg-slate-50 p-12">
                <span className="text-6xl font-black italic tracking-tighter text-primary">140 kt</span>
                <p className="mt-4 text-sm font-bold uppercase tracking-widest text-slate-400">at MLW of 75,500 kg (166,449 lb)</p>
              </div>

              <p className="text-xl font-bold text-primary text-center">
                {dict.approach_speed.category_prefix} <span className="text-accent uppercase italic">{dict.approach_speed.category_name}</span>.
              </p>
              
              <div className="mt-12 rounded-lg border-l-4 border-slate-300 bg-slate-100 p-4 text-sm italic text-slate-500">
                {dict.approach_speed.note}
              </div>
            </div>
          </ContentCard>
        </section>
      </div>
    </div>
  );
}
