"use client";

import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/UserNav";
import { useSupabase } from "@/hooks/useSupabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { session, loading } = useSupabase();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/signin");
    }
  }, [loading, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">ConectizeApp</span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-56 pt-4">
          <div className="container">{children}</div>
        </main>
      </div>
    </div>
  );
}
