import { getTablesForPath } from "@/lib/data-loader";
import { TechnicalTable } from "./technical-table";

interface DynamicTableSectionProps {
  pathname: string;
  title?: string;
}

export function DynamicTableSection({ pathname, title = "Technical Data" }: DynamicTableSectionProps) {
  const dynamicTables = getTablesForPath(pathname);

  if (dynamicTables.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-black uppercase italic tracking-tighter text-primary border-b pb-2">
        {title}
      </h2>
      <div className="space-y-12">
        {dynamicTables.map((tableData, i) => (
          <TechnicalTable key={i} data={tableData} />
        ))}
      </div>
    </section>
  );
}
