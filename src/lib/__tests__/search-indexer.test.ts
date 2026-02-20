// src/lib/__tests__/search-indexer.test.ts

import { createSearchIndex } from '../search-indexer';

describe('createSearchIndex', () => {
  it('should create a search index from documentation content', () => {
    const mockMappingData = {
      docs: [
        { "href": "/docs/test/doc1", "page": 1, "content": "This is content for document 1." },
        { "href": "/docs/test/doc2", "page": 2, "content": "Another document's content." },
      ],
    };

    const searchIndex = createSearchIndex(mockMappingData.docs);

    expect(searchIndex).toHaveProperty('search');
    expect(typeof searchIndex.search).toBe('function');

    // Test a simple search to ensure it can find content
    const results = searchIndex.search('document 1');
    // Expect at least one result
    expect(results.length).toBeGreaterThan(0);
    // Expect the first result to be the correct document
    expect(results[0].item.href).toBe('/docs/test/doc1');
  });

  it('should handle empty documentation content', () => {
    const mockMappingData = { docs: [] };
    const searchIndex = createSearchIndex(mockMappingData.docs);
    expect(searchIndex).toHaveProperty('search');
    expect(searchIndex.search('something')).toHaveLength(0);
  });
});
