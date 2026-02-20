"use client";

import * as React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname } from "next/navigation";
import Fuse from "fuse.js";
import { DocItem } from "@/lib/content-extractor";
import { cn } from "@/lib/utils";

// Helper function to extract a snippet from Fuse.js match
function getSnippet(matches: Fuse.FuseResultMatch[] | undefined, key: string, maxLength: number = 100): string | null {
  if (!matches) return null;
  const contentMatch = matches.find(m => m.key === key);
  if (!contentMatch || !contentMatch.value || !contentMatch.indices) return null;

  const value = contentMatch.value;
  const [start, end] = contentMatch.indices[0]; // Take the first match

  const contextLength = maxLength / 2;
  let snippetStart = Math.max(0, start - contextLength);
  let snippetEnd = Math.min(value.length, end + contextLength);

  // Adjust start to be at a word boundary
  if (snippetStart > 0) {
    const firstSpace = value.indexOf(' ', snippetStart);
    if (firstSpace !== -1 && firstSpace < start) snippetStart = firstSpace + 1;
  }

  // Adjust end to be at a word boundary
  if (snippetEnd < value.length) {
    const lastSpace = value.lastIndexOf(' ', snippetEnd);
    if (lastSpace !== -1 && lastSpace > end) snippetEnd = lastSpace;
  }

  let snippet = value.substring(snippetStart, snippetEnd);

  if (snippetStart > 0) snippet = '...' + snippet;
  if (snippetEnd < value.length) snippet = snippet + '...';

  return snippet;
}


export function Search({ searchableDocs }: { searchableDocs: DocItem[] }) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";

  const fuse = React.useMemo(() => {
    return new Fuse(searchableDocs, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'section', weight: 0.2 },
        { name: 'href', weight: 0.3 },
        { name: 'content', weight: 0.7 },
      ],
      includeScore: true,
      includeMatches: true,
      threshold: 0.3,
      ignoreLocation: true,
      distance: 100,
      minMatchCharLength: 3,
    });
  }, [searchableDocs]);

  // Debounce the search logic
  React.useEffect(() => {
    if (query.length > 1) {
      const handler = setTimeout(() => {
        setResults(fuse.search(query));
        setActiveIndex(-1); // Reset active index on new search results
      }, 300); // 300ms debounce delay

      return () => {
        clearTimeout(handler);
      };
    } else {
      setResults([]);
      setActiveIndex(-1);
    }
  }, [query, fuse]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex !== -1 && results[activeIndex]) {
        onSelect(results[activeIndex].item.href);
      }
    }
  };

  const onSelect = (href: string) => {
    router.push(`/${currentLocale}${href}`);
    setQuery("");
    setResults([]);
    setActiveIndex(-1);
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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
          <div className="p-1">
            {results.slice(0, 5).map((result, index) => {
              const snippet = getSnippet(result.matches, 'content');
              return (
                <button
                  key={result.item.href}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    { "focused-result bg-accent text-accent-foreground": index === activeIndex }
                  )}
                  onClick={() => onSelect(result.item.href)}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{result.item.title}</span>
                    {snippet && <span className="text-xs text-muted-foreground">{snippet}</span>}
                    {result.item.section && <span className="text-xs text-muted-foreground">{result.item.section}</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
