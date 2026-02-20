// src/lib/search-indexer.ts
import Fuse from 'fuse.js';

interface DocItem {
  href: string;
  page: number;
  content?: string; // Assuming content might be present for indexing
}

export function createSearchIndex(docs: DocItem[]): Fuse<DocItem> {
  const options: Fuse.IFuseOptions<DocItem> = {
    keys: [
      { name: 'href', weight: 0.3 }, // Give href a lower weight
      { name: 'content', weight: 0.7 }, // Give content a higher weight
    ],
    includeScore: true,
    // includeMatches: true, // For debugging purposes
    threshold: 0.3,
    ignoreLocation: true, // Search throughout the entire string
    distance: 100, // Distance for fuzzy matching. A higher value means more fuzziness.
    minMatchCharLength: 3, // Minimum number of characters to be a match
  };

  const fuse = new Fuse(docs, options);
  return fuse;
}
