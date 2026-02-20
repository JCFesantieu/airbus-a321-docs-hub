// src/lib/__tests__/search-indexer.test.ts

import { createSearchIndex } from '../search-indexer';
import mappingData from '../../data/mapping.json'; // Import actual mapping data

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

    const results = searchIndex.search('document 1');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.href).toBe('/docs/test/doc1');
  });

  it('should handle empty documentation content', () => {
    const mockMappingData = { docs: [] };
    const searchIndex = createSearchIndex(mockMappingData.docs);
    expect(searchIndex).toHaveProperty('search');
    expect(searchIndex.search('something')).toHaveLength(0);
  });

  // New test case for integrating Fuse.js with actual mapping data and perform search
  it('should integrate Fuse.js with actual mapping data and perform search for an existing entry', () => {
    // Create mock DocItem with content from mappingData
    const docsWithContent = mappingData.docs.map(doc => ({
      ...doc,
      content: `Content for ${doc.href} with some keywords like Airbus and A321.` // Mock content
    }));

    const actualSearchIndex = createSearchIndex(docsWithContent);

    expect(actualSearchIndex).toHaveProperty('search');
    expect(typeof actualSearchIndex.search).toBe('function');

    // Test a search for a known term from the mock content
    const results = actualSearchIndex.search('Airbus');

    // Expect at least one result
    expect(results.length).toBeGreaterThan(0);

    // Expect one of the results to contain "Airbus" in its content
    const airbusDoc = results.find(item => item.item.content?.includes('Airbus'));
    expect(airbusDoc).toBeDefined();
  });

  it('should integrate Fuse.js with actual mapping data and return no results for non-existing entry', () => {
    const docsWithContent = mappingData.docs.map(doc => ({
      ...doc,
      content: `Content for ${doc.href} with some keywords like Airbus and A321.`
    }));

    const actualSearchIndex = createSearchIndex(docsWithContent);
    const results = actualSearchIndex.search('nonexistent_keyword');
    expect(results).toHaveLength(0);
  });
});
