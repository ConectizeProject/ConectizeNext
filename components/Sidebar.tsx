"use client";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  Box,
  LineChart,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: BarChart3,
  },
  {
    href: "/vendas",
    label: "Vendas",
    icon: ShoppingCart,
  },
  {
    href: "/produtos",
    label: "Produtos",
    icon: Box,
  },
  {
    href: "/relatorios",
    label: "Relatórios",
    icon: LineChart,
  },
  {
    href: "/integracoes",
    label: "Integrações",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-56 border-r bg-background">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Menu
            </h2>
            <nav className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === link.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}
