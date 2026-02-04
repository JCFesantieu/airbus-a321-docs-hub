import { DocHero } from "@/components/layout/doc-hero";
import { ContentCard } from "@/components/layout/content-card";
import { DynamicTableSection } from "@/components/layout/dynamic-table-section";
import { getDictionary } from "@/lib/dictionary";

export default async function DimensionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const pathname = "/docs/description/dimensions";

  return (
    <div className="space-y-8">
      <DocHero 
        title={dict.dimensions.title} 
        subtitle={dict.dimensions.subtitle}
        category={dict.nav.description}
      />

      <div className="mx-auto max-w-5xl space-y-12">
        <div className="grid gap-8 md:grid-cols-2">
          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
              {dict.dimensions.main_dimensions}
            </h2>
            <ContentCard>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-100 py-2">
                  <span className="text-slate-500 font-medium">{dict.dimensions.wingspan}</span>
                  <span className="font-bold text-primary">34.10 m (111.88 ft)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-2">
                  <span className="text-slate-500 font-medium">{dict.dimensions.length}</span>
                  <span className="font-bold text-primary">44.51 m (146.03 ft)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-2">
                  <span className="text-slate-500 font-medium">{dict.dimensions.height}</span>
                  <span className="font-bold text-primary">11.91 m (39.07 ft)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-2">
                  <span className="text-slate-500 font-medium">{dict.dimensions.diameter}</span>
                  <span className="font-bold text-primary">3.95 m (12.96 ft)</span>
                </div>
              </div>
            </ContentCard>
          </section>

          <section className="space-y-6 flex flex-col">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
              {dict.dimensions.tech_note_title}
            </h2>
            <div className="flex-1 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 flex items-center justify-center">
              <p className="text-slate-500 italic text-center leading-relaxed">
                {dict.dimensions.tech_note_desc}
              </p>
            </div>
          </section>
        </div>

        <DynamicTableSection pathname={pathname} title={dict.dimensions.table_title} />
      </div>
    </div>
  );
}