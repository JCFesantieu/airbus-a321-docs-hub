import { extractDocumentationContent } from '../content-extractor';
import fs from 'fs';
import path from 'path';

// Mock fs.readFileSync and fs.existsSync
jest.mock('fs', () => ({
  ...jest.requireActual('fs'), // Import and retain default behavior
  readFileSync: jest.fn((filePath) => {
    if (filePath.includes(path.join('docs', 'mock', 'doc-a', 'content.md'))) {
      return 'Content for Doc A.';
    }
    if (filePath.includes(path.join('docs', 'mock', 'doc-b', 'content.md'))) {
      return 'Content for Doc B.';
    }
    return ''; // Default empty content
  }),
  existsSync: jest.fn((filePath) => {
    return filePath.includes(path.join('docs', 'mock', 'doc-a', 'content.md')) ||
           filePath.includes(path.join('docs', 'mock', 'doc-b', 'content.md'));
  }),
}));

describe('extractDocumentationContent', () => {
  const mockSidebarNav = [
    {
      title: 'Mock Section',
      items: [
        { title: 'Mock Doc A', href: '/docs/mock/doc-a' },
        { title: 'Mock Doc B', href: '/docs/mock/doc-b' },
        { title: 'Mock Doc C', href: '/docs/missing/doc-c' },
      ],
    },
  ];

  it('should extract and prepare documentation content from mapping data', () => {
    const mockMappingDocs = [
      { href: '/docs/mock/doc-a', page: 10 },
      { href: '/docs/mock/doc-b', page: 20 },
    ];

    const docs = extractDocumentationContent(mockMappingDocs, mockSidebarNav); // Pass mockSidebarNav

    expect(docs).toHaveLength(2);
    expect(docs[0]).toEqual({
      href: '/docs/mock/doc-a',
      page: 10,
      title: 'Mock Doc A', // Now includes title from sidebarNav
      section: 'Mock Section', // Now includes section from sidebarNav
      content: 'Content for Doc A.',
    });
    expect(docs[1]).toEqual({
      href: '/docs/mock/doc-b',
      page: 20,
      title: 'Mock Doc B',
      section: 'Mock Section',
      content: 'Content for Doc B.',
    });

    // Verify fs.readFileSync was called for both mock files
    expect(fs.readFileSync).toHaveBeenCalledWith(
        path.join(process.cwd(), 'src/app/docs/mock/doc-a', 'content.md'), 'utf-8');
    expect(fs.readFileSync).toHaveBeenCalledWith(
        path.join(process.cwd(), 'src/app/docs/mock/doc-b', 'content.md'), 'utf-8');
  });

  it('should return empty array if mapping data is empty', () => {
    const docs = extractDocumentationContent([], mockSidebarNav); // Pass mockSidebarNav
    expect(docs).toHaveLength(0);
  });

  it('should handle missing content files gracefully', () => {
    const mockMappingDocs = [
      { href: '/docs/mock/doc-a', page: 10 },
      { href: '/docs/missing/doc-c', page: 30 },
    ];

    const docs = extractDocumentationContent(mockMappingDocs, mockSidebarNav); // Pass mockSidebarNav

    expect(docs).toHaveLength(2);
    expect(docs[0].content).toBe('Content for Doc A.');
    expect(docs[0].title).toBe('Mock Doc A');
    expect(docs[0].section).toBe('Mock Section');
    expect(docs[1].content).toBe('');
    expect(docs[1].title).toBe('Mock Doc C'); // Should still get title from nav
    expect(docs[1].section).toBe('Mock Section');
  });
});
