import { DocHero } from "@/components/layout/doc-hero";
import { getDictionary } from "@/lib/dictionary";

export default async function IntroductionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-12">
      <DocHero 
        title={dict.intro.title} 
        subtitle={dict.intro.subtitle}
        category={dict.nav.scope}
      />
      
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="space-y-4">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary">{dict.intro.general}</h2>
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed">
              The A321 AIRCRAFT CHARACTERISTICS – AIRPORT AND MAINTENANCE PLANNING (AC) manual is issued for A321-100 and A321-200 series aircraft equipped with wing-tip fences or sharklets, to provide necessary data to airport operators, airlines and Maintenance/Repair Organizations (MRO) for airport and maintenance facilities planning.
            </p>
            <p className="text-lg leading-relaxed">
              The A320 family is the world's best-selling single-aisle aircraft. An A320 takes off or lands somewhere in the world every 1.5 seconds of every day, the family has recorded more than 117 million cycles since entry-into-service and records a best-in-class dispatch reliability of 99.7%.
            </p>
            <p className="text-lg leading-relaxed">
              The new engine option together with the large wingtip devices (sharklets) and a very innovative cabin, A321neo is the most cost-efficient aircraft ever. In its maximum seating capacity, A321neo can accommodates up to 244 passengers and shows the lowest seat mile cost on the single-aisle aircraft market.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary">A321neo Versions</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-2 text-xl font-bold text-accent">A321neo</h3>
              <p className="text-sm text-muted-foreground">
                Perfectly suited to fit into very competitive markets with a maximum passenger range of 3,400 nm (6,297 km).
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-2 text-xl font-bold text-accent">A321LR</h3>
              <p className="text-sm text-muted-foreground">
                Flies up to 4,000 nm (7,408 km) with 206 passengers because of the installation of Additional Centre Tanks (ACTs).
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-2 text-xl font-bold text-accent">A321XLR</h3>
              <p className="text-sm text-muted-foreground">
                Extends the range up to 4,700 nm (8,705 km) with an increased maximum takeoff weight of 101 tons.
              </p>
            </div>
          </div>
        </section>

        <div className="rounded-lg border-l-4 border-accent bg-muted p-6 text-sm italic shadow-inner">
          Note: This information is derived from the A321 AC manual Rev: Mar 01/22.
        </div>
      </div>
    </div>
  );
}
