"use client";

import * as React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
// import { docsConfig } from "@/config/docs"; // This is now likely unnecessary for populating search items, content comes via props
import { useRouter, usePathname } from "next/navigation";
import Fuse from "fuse.js";
import { DocItem } from "@/lib/content-extractor"; // Import DocItem

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


export function Search({ searchableDocs }: { searchableDocs: DocItem[] }) { // Accept searchableDocs prop
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";

  // Use the passed searchableDocs directly for Fuse initialization
  const fuse = React.useMemo(() => {
    return new Fuse(searchableDocs, {
      keys: [
        { name: 'title', weight: 0.5 }, // Now available in DocItem
        { name: 'section', weight: 0.2 }, // Now available in DocItem
        { name: 'href', weight: 0.3 },
        { name: 'content', weight: 0.7 }, // Add content key for search
      ],
      includeScore: true,
      includeMatches: true, // Include match data for snippets
      threshold: 0.3,
      ignoreLocation: true,
      distance: 100,
      minMatchCharLength: 3,
    });
  }, [searchableDocs]); // Re-initialize Fuse if searchableDocs changes

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
            {results.slice(0, 5).map((result) => {
              const snippet = getSnippet(result.matches, 'content');
              return (
                <button
                  key={result.item.href}
                  className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                  onClick={() => onSelect(result.item.href)}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{result.item.title}</span> {/* title is now in DocItem */}
                    {snippet && <span className="text-xs text-muted-foreground">{snippet}</span>}
                    {result.item.section && <span className="text-xs text-muted-foreground">{result.item.section}</span>} {/* section is now in DocItem */}
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
