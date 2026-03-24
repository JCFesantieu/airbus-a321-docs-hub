// src/lib/search-indexer.ts
import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';

interface DocItem {
  href: string;
  page: number;
  title: string; // Add title
  section?: string; // Add section (optional)
  content: string; // Content is now mandatory
}

export function createSearchIndex(docs: DocItem[]): Fuse<DocItem> {
  const options: IFuseOptions<DocItem> = {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'section', weight: 0.2 },
      { name: 'href', weight: 0.3 },
      { name: 'content', weight: 0.7 },
    ],
    includeScore: true,
    includeMatches: true, // IMPORTANT: Include match data for snippets
    threshold: 0.3,
    ignoreLocation: true,
    distance: 100,
    minMatchCharLength: 3,
  };

  const fuse = new Fuse(docs, options);
  return fuse;
}
