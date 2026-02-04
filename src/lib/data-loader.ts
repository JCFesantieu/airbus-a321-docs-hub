import mapping from "@/data/mapping.json";
import fs from "fs";
import path from "path";

export interface TableData {
  metadata: {
    Source_Page: string;
    Document_Section: string;
  };
  tables: Array<{
    title: string;
    headers: string[];
    rows: Array<Record<string, string>>;
  }>;
}

export function getTablesForPath(pathname: string): TableData[] {
  // Strip locale prefix if present (e.g., /fr/docs -> /docs)
  const segments = pathname.split("/");
  const normalizedPath = segments.length > 2 && ["en", "fr", "de", "es"].includes(segments[1])
    ? "/" + segments.slice(2).join("/")
    : pathname;

  const entry = mapping.docs.find((d) => d.href === normalizedPath);
  if (!entry) return [];

  const tablesDir = path.join(process.cwd(), "src/data/tables");
  if (!fs.existsSync(tablesDir)) return [];

  const files = fs.readdirSync(tablesDir);
  const pagePrefix = `p${entry.page}_`;
  
  const pageFiles = files.filter(f => f.startsWith(pagePrefix) && f.endsWith(".json"));
  
  return pageFiles.map(file => {
    const filePath = path.join(tablesDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  });
}
