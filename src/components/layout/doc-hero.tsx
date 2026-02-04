import Image from "next/image";

interface DocHeroProps {
  title: string;
  subtitle?: string;
  category?: string;
}

export function DocHero({ title, subtitle, category }: DocHeroProps) {
  return (
    <div className="relative -mx-4 -mt-6 mb-8 overflow-hidden bg-primary px-4 py-16 md:-mx-8 md:-mt-8 md:px-12 lg:py-24">
      {/* Background Pattern / Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,174,239,0.15),transparent)] opacity-50" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black/20 to-transparent" />
      
      <div className="relative max-w-4xl space-y-4">
        {category && (
          <div className="inline-block bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            {category}
          </div>
        )}
        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-lg font-light tracking-wide text-white/80 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 h-1 w-24 bg-accent" />
    </div>
  );
}
