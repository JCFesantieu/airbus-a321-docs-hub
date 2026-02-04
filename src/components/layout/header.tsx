"use client";

import Link from "next/link";
import { Search } from "@/components/search";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";

  const languages = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "de", label: "DE" },
    { code: "es", label: "ES" },
  ];

  const getTargetHref = (langCode: string) => {
    const segments = pathname.split("/");
    segments[1] = langCode;
    return segments.join("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary text-primary-foreground shadow-lg">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center space-x-4">
          <Link href={`/${currentLocale}`} className="flex items-center space-x-2">
            <span className="text-xl font-black tracking-tighter uppercase italic">
              AIRBUS
            </span>
            <span className="hidden h-6 w-[1px] bg-white/20 sm:inline-block" />
            <span className="hidden text-sm font-light tracking-wide uppercase sm:inline-block opacity-90">
              A321 Technical Data
            </span>
          </Link>
        </div>
        
        <nav className="mr-8 hidden items-center space-x-8 text-xs font-bold uppercase tracking-widest md:flex">
          <Link
            href={`/${currentLocale}/docs/scope/introduction`}
            className="transition-opacity hover:opacity-100 opacity-80"
          >
            Maintain
          </Link>
          <Link
            href={`/${currentLocale}/docs/scope/glossary`}
            className="transition-opacity hover:opacity-100 opacity-80"
          >
            Glossary
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-6">
          <div className="hidden items-center space-x-3 md:flex">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={getTargetHref(lang.code)}
                className={cn(
                  "text-[10px] font-black transition-all hover:text-white",
                  currentLocale === lang.code ? "text-white ring-1 ring-white/30 px-1.5 py-0.5 rounded" : "text-white/40"
                )}
              >
                {lang.label}
              </Link>
            ))}
          </div>
          <div className="w-full max-w-sm md:w-auto">
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
}
