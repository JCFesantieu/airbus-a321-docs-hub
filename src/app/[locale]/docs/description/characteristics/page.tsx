import { DocHero } from "@/components/layout/doc-hero";
import { getTablesForPath } from "@/lib/data-loader";
import { TechnicalTable } from "@/components/layout/technical-table";
import { getDictionary } from "@/lib/dictionary";

export default async function CharacteristicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const dynamicTables = getTablesForPath("/docs/description/characteristics");

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.characteristics.title} 
        subtitle={dict.characteristics.subtitle}
        category={dict.nav.description}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.common.description}
          </h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-slate-600">
              {dict.characteristics.description}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
            {dict.characteristics.technical_data}
          </h2>
          
          {dynamicTables.length > 0 ? (
            <div className="space-y-12">
              {dynamicTables.map((tableData, i) => (
                <TechnicalTable key={i} data={tableData} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
              <p className="text-slate-400 italic">{dict.characteristics.no_data}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
