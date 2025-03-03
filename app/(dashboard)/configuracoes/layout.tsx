"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface SidebarNavItem {
  title: string;
  href: string;
  isAdmin?: boolean;
}

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Usuário",
    href: "/configuracoes",
  },
  {
    title: "Assinatura",
    href: "/configuracoes/assinatura",
  },
  {
    title: "Usuários",
    href: "/configuracoes/usuarios",
    isAdmin: true,
  },
  {
    title: "Planos",
    href: "/configuracoes/planos",
    isAdmin: true,
  },
  {
    title: "Alertas",
    href: "/configuracoes/alertas",
    isAdmin: true,
  },
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
}

function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href
              ? "bg-accent text-accent-foreground"
              : "transparent"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default function ConfiguracoesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Desconectado com sucesso");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Erro ao desconectar");
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <div className="space-y-6">
            <div>
              <div className="text-sm font-medium">Configurações Gerais</div>
              <SidebarNav
                items={sidebarNavItems.filter((item) => !item.isAdmin)}
              />
            </div>
            <div>
              <div className="text-sm font-medium">Administrador</div>
              <SidebarNav
                items={sidebarNavItems.filter((item) => item.isAdmin)}
              />
            </div>
            <div className="pt-6">
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
