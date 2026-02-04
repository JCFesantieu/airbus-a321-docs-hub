import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { getDictionary } from "@/lib/dictionary";

const abbreviations = [
  { term: "A/C", definition: "Aircraft" },
  { term: "ACF", definition: "Aircraft Cabin Flex" },
  { term: "ACN", definition: "Aircraft Classification Number" },
  { term: "AMM", definition: "Aircraft Maintenance Manual" },
  { term: "APU", definition: "Auxiliary Power Unit" },
  { term: "B/C", definition: "Business Class" },
  { term: "CBR", definition: "California Bearing Ratio" },
  { term: "CC", definition: "Cargo Compartment" },
  { term: "CG", definition: "Center of Gravity" },
  { term: "CKPT", definition: "Cockpit" },
  { term: "E", definition: "Young's Modulus" },
  { term: "ELEC", definition: "Electric, Electrical, Electricity" },
  { term: "ESWL", definition: "Equivalent Single Wheel Load" },
  { term: "FAA", definition: "Federal Aviation Administration" },
];

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.glossary_page.title} 
        subtitle={dict.glossary_page.subtitle}
        category={dict.nav.scope}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.glossary_page.list_title}
          </h2>
          <ContentCard>
            <div className="grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2">
              {abbreviations.map((item) => (
                <div key={item.term} className="flex items-baseline space-x-4 border-b border-slate-50 py-3 last:border-0">
                  <span className="font-black italic text-accent min-w-[80px] uppercase tracking-tighter">{item.term}</span>
                  <span className="text-slate-600 text-sm font-medium">{item.definition}</span>
                </div>
              ))}
            </div>
          </ContentCard>
        </section>
      </div>
    </div>
  );
}
