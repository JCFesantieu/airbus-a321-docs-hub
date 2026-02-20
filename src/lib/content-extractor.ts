// src/lib/content-extractor.ts
import fs from 'fs';
import path from 'path';

// Define the DocItem interface similar to search-indexer.ts
interface DocItem {
  href: string;
  page: number;
  content: string; // Content is now mandatory
}

interface MappingDoc {
    href: string;
    page: number;
}

export function extractDocumentationContent(mappingDocs: MappingDoc[]): DocItem[] {
  const docs: DocItem[] = [];
  const baseDocsPath = path.join(process.cwd(), 'src/app/docs'); // Assuming content is under src/app/docs

  for (const mappingDoc of mappingDocs) {
    // Convert href like '/docs/scope/introduction' to file path like 'src/app/docs/scope/introduction/content.md'
    const docPathSegments = mappingDoc.href.split('/').slice(2); // ['scope', 'introduction'] for /docs/scope/introduction
    const contentFilePath = path.join(baseDocsPath, ...docPathSegments, 'content.md'); // e.g., src/app/docs/scope/introduction/content.md

    let content = '';
    if (fs.existsSync(contentFilePath)) {
      content = fs.readFileSync(contentFilePath, 'utf-8');
    } else {
      // Fallback or warning if content.md doesn't exist
      console.warn(`Content file not found for ${mappingDoc.href} at ${contentFilePath}`);
    }

    docs.push({
      href: mappingDoc.href,
      page: mappingDoc.page,
      content: content,
    });
  }
  return docs;
}
