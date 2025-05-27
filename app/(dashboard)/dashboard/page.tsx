"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { session, loading } = useSupabase();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">Pedidos</h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">Produtos</h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">Vendas</h3>
          <p className="mt-2 text-3xl font-bold">R$ 0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-medium">Marketplaces</h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-center text-gray-500">
          Em breve mais funcionalidades...
        </p>
      </div>
    </div>
  );
}
