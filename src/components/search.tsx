"use client";

import * as React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { docsConfig } from "@/config/docs";
import { useRouter, usePathname } from "next/navigation";
import Fuse from "fuse.js";

export function Search() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";

  // Flatten the navigation for searching
  const searchableItems = React.useMemo(() => {
    const items: any[] = [];
    docsConfig.sidebarNav.forEach((section) => {
      section.items?.forEach((item) => {
        items.push({
          title: item.title,
          section: section.title,
          href: item.href,
        });
      });
    });
    return items;
  }, []);

  const fuse = new Fuse(searchableItems, {
    keys: ["title", "section"],
    threshold: 0.3,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      setResults(fuse.search(value));
    } else {
      setResults([]);
    }
  };

  const onSelect = (href: string) => {
    router.push(`/${currentLocale}${href}`);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-white/60" />
        <Input
          type="search"
          placeholder="Search documentation..."
          className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30 md:w-[250px] lg:w-[350px]"
          value={query}
          onChange={handleSearch}
        />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
          <div className="p-1">
            {results.slice(0, 5).map((result) => (
              <button
                key={result.item.href}
                className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                onClick={() => onSelect(result.item.href)}
              >
                <div className="flex flex-col text-left">
                  <span className="font-medium">{result.item.title}</span>
                  <span className="text-xs text-muted-foreground">{result.item.section}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
