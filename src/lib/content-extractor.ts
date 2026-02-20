import fs from 'fs';
import path from 'path';

// Define the DocItem interface
export interface DocItem { // Export the interface
  href: string;
  page: number;
  title: string; // Add title
  section?: string; // Add section (optional)
  content: string;
}

interface MappingDoc {
    href: string;
    page: number;
}

// Interface for sidebar navigation item
interface SidebarNavItem {
  title: string;
  href?: string;
  items?: SidebarNavItem[];
}

export function extractDocumentationContent(mappingDocs: MappingDoc[], sidebarNav: SidebarNavItem[]): DocItem[] {
  const docs: DocItem[] = [];
  const baseDocsPath = path.join(process.cwd(), 'src/app/docs');

  // Flatten sidebar navigation for easier lookup
  const flattenedNav: Record<string, { title: string; section?: string }> = {};
  sidebarNav.forEach(section => {
    section.items?.forEach(item => {
      if (item.href) {
        flattenedNav[item.href] = { title: item.title, section: section.title };
      }
    });
  });


  for (const mappingDoc of mappingDocs) {
    const docPathSegments = mappingDoc.href.split('/').slice(2);
    const contentFilePath = path.join(baseDocsPath, ...docPathSegments, 'content.md');

    let content = '';
    if (fs.existsSync(contentFilePath)) {
      content = fs.readFileSync(contentFilePath, 'utf-8');
    } else {
      console.warn(`Content file not found for ${mappingDoc.href} at ${contentFilePath}`);
    }

    const navInfo = flattenedNav[mappingDoc.href] || { title: mappingDoc.href, section: undefined };

    docs.push({
      href: mappingDoc.href,
      page: mappingDoc.page,
      title: navInfo.title,
      section: navInfo.section,
      content: content,
    });
  }
  return docs;
}
