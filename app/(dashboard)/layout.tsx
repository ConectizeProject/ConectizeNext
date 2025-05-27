"use server";

import { NotificationDropdown } from "@/components/NotificationDropdown";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/UserNav";
import { createClient } from "@/lib/supabase/server";
import { Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 pl-56 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container flex h-14 items-center">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-primary">ConectizeApp</span>
          </Link>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="w-full pl-8 bg-muted/50"
            />
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <NotificationDropdown />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-56 pt-4">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
