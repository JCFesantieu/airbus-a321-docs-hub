import Link from "next/link";
import { ArrowRight, BookOpen, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="flex flex-col gap-12 py-8 md:py-12 lg:py-24">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-3xl font-black uppercase italic leading-tight tracking-tighter md:text-5xl lg:text-7xl lg:leading-[1.1] text-primary">
          Airbus A321 <br /> Technical Data
        </h1>
        <p className="max-w-[750px] text-lg font-light tracking-wide text-slate-600 sm:text-xl">
          Modern interface for Airport and Maintenance Planning (AC) technical documentation.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button asChild size="lg" className="rounded-none font-bold uppercase tracking-widest px-8">
          <Link href={`/${locale}/docs/scope/introduction`}>
            Enter Hub
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild className="rounded-none font-bold uppercase tracking-widest px-8 border-primary text-primary">
          <Link href={`/${locale}/docs/scope/glossary`}>
            Glossary
          </Link>
        </Button>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 mt-12">
        <div className="flex flex-col gap-4 p-6 border rounded-xl bg-white shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-primary">Certified Data</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Full technical specifications and ground handling characteristics directly from source.
          </p>
        </div>
        <div className="flex flex-col gap-4 p-6 border rounded-xl bg-white shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-white">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-primary">High Fidelity</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Interactive vector diagrams with advanced zoom and rotation for precise study.
          </p>
        </div>
        <div className="flex flex-col gap-4 p-6 border rounded-xl bg-white shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-primary">
            <Settings className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-primary">MRO Optimized</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Engineered for airport operators and specialized maintenance organizations.
          </p>
        </div>
      </div>
    </div>
  );
}
