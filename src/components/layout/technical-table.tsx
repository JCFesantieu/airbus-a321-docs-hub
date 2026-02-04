import { TableData } from "@/lib/data-loader";
import { ContentCard } from "./content-card";

interface TechnicalTableProps {
  data: TableData;
}

export function TechnicalTable({ data }: TechnicalTableProps) {
  return (
    <div className="space-y-8">
      {data.tables.map((table, idx) => (
        <ContentCard key={idx} title={table.title} description={`Source: Page ${data.metadata.Source_Page}`}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  {table.headers.map((header, hIdx) => (
                    <th 
                      key={hIdx} 
                      className="border border-white/10 px-4 py-3 text-left font-black uppercase tracking-tighter italic"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rIdx) => (
                  <tr 
                    key={rIdx} 
                    className="border-b transition-colors hover:bg-slate-50"
                  >
                    {table.headers.map((header, hIdx) => (
                      <td key={hIdx} className="border-x border-slate-100 px-4 py-3 text-slate-600 font-medium">
                        {/* Style spécial pour les unités si présentes */}
                        {formatCellValue(row[header])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentCard>
      ))}
    </div>
  );
}

function formatCellValue(value: string) {
  if (!value) return "-";
  // Si la valeur contient des parenthèses (souvent les unités lb/in), on atténue le texte à l'intérieur
  const parts = value.split(/(\(.*\))/);
  return (
    <span>
      {parts.map((part, i) => 
        part.startsWith('(') ? (
          <span key={i} className="ml-1 text-[10px] font-normal text-slate-400 uppercase tracking-tighter">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
