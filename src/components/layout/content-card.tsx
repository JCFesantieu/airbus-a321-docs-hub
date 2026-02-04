import { cn } from "@/lib/utils";

interface ContentCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentCard({ title, description, children, className }: ContentCardProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md", className)}>
      {(title || description) && (
        <div className="border-b bg-slate-50/50 px-6 py-4">
          {title && <h3 className="text-lg font-bold text-primary">{title}</h3>}
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
