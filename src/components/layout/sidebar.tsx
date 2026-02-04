"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsConfig } from "@/config/docs";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";

  return (
    <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 border-r bg-slate-50/50 md:sticky md:block">
      <ScrollArea className="h-full py-6 pr-6 lg:py-8">
        <div className="w-full px-4">
          {docsConfig.sidebarNav.map((item, index) => (
            <div key={index} className="pb-8">
              <h4 className="mb-3 px-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {item.title}
              </h4>
              {item.items?.length && (
                <div className="grid grid-flow-row auto-rows-max space-y-1 text-sm">
                  {item.items.map((subItem, subIndex) => {
                    const hrefWithLocale = `/${currentLocale}${subItem.href}`;
                    return (
                      <Link
                        key={subIndex}
                        href={hrefWithLocale}
                        className={cn(
                          "group flex w-full items-center rounded-md border border-transparent px-3 py-2 transition-all",
                          pathname === hrefWithLocale
                            ? "bg-white font-bold text-primary shadow-sm ring-1 ring-slate-200"
                            : "text-slate-600 hover:bg-white/50 hover:text-primary"
                        )}
                      >
                        {subItem.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
