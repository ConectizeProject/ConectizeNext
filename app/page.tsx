"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  // Se não estiver logado, exibir a página inicial
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Conectize: Gerencie Seus Marketplaces
        </h1>
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          Gerencie múltiplos marketplaces através de uma única plataforma,
          aumentando eficiência e visibilidade.
        </p>
        <Button size="lg" asChild>
          <a href="/signup">Comece Agora</a>
        </Button>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Ferramentas que otimizam seu dia a dia
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Operação Ágil</h3>
              <p>
                Ferramentas que tornam sua operação mais ágil e lucrativa, com
                interface fácil de usar.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Vários Marketplaces</h3>
              <p>
                Controle de estoque centralizado e gestão em massa de anúncios
                para todos os seus canais de venda.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Gestão Financeira</h3>
              <p>
                Relatórios integrados e gestão financeira completa para
                maximizar seus resultados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Planos que cabem no seu bolso
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Mensal</h3>
            <p className="text-3xl font-bold mb-4">R$99,90</p>
            <Button className="w-full" asChild>
              <a href="/signup">Comece Agora</a>
            </Button>
          </div>
          <div className="border rounded-lg p-6 bg-primary text-primary-foreground">
            <div className="text-sm uppercase font-bold mb-2">Mais popular</div>
            <h3 className="text-xl font-bold mb-2">Trimestral</h3>
            <p className="text-3xl font-bold mb-4">R$89,90/mês</p>
            <Button variant="secondary" className="w-full" asChild>
              <a href="/signup">Comece Agora</a>
            </Button>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Anual</h3>
            <p className="text-3xl font-bold mb-4">R$79,90/mês</p>
            <Button className="w-full" asChild>
              <a href="/signup">Comece Agora</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
