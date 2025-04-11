"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Box,
  HelpCircle,
  Kanban,
  LineChart,
  LogOut,
  MessageSquare,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainLinks = [
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
    href: "/backlog",
    label: "Backlog",
    icon: Kanban,
  },
  {
    href: "/relatorios",
    label: "Relatórios",
    icon: LineChart,
  },
  {
    href: "/mensagens",
    label: "Mensagens",
    icon: MessageSquare,
  },
];

const configLinks = [
  {
    href: "/integracoes",
    label: "Integrações",
    icon: Settings,
  },
  {
    href: "/configuracoes",
    label: "Perfil",
    icon: User,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-56 border-r bg-background shadow-sm overflow-y-auto">
      <div className="flex flex-col h-full">
        <div className="py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-sm font-semibold tracking-tight text-muted-foreground uppercase">
              Principal
            </h2>
            <nav className="space-y-1 px-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href ||
                      pathname?.startsWith(`${link.href}/`)
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon
                    className={cn(
                      "mr-2 h-4 w-4",
                      pathname === link.href ||
                        pathname?.startsWith(`${link.href}/`)
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Separator className="my-4 mx-6" />

          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-sm font-semibold tracking-tight text-muted-foreground uppercase">
              Configurações
            </h2>
            <nav className="space-y-1 px-2">
              {configLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href ||
                      pathname?.startsWith(`${link.href}/`)
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon
                    className={cn(
                      "mr-2 h-4 w-4",
                      pathname === link.href ||
                        pathname?.startsWith(`${link.href}/`)
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-auto mb-8 px-3 py-2">
          <nav className="space-y-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
              Ajuda
            </Link>
            <Link
              href="/auth/signout"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4 text-muted-foreground" />
              Sair
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
