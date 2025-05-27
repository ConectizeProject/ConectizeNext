"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/utils/auth-helpers/client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Calculator,
  Check,
  FileSpreadsheet,
  Package,
  Send,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
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

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Marketplace background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <motion.div
          className="container relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Análises de negócio precisas para seu sucesso nos principais
            marketplaces
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Ferramentas poderosas para agilizar e expandir suas vendas
          </p>
          <Button size="lg" className="gap-2" asChild>
            <a href="/signup">
              Comece Agora
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-muted">
        <div className="container px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planos que cabem no seu bolso
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comece com 30 dias grátis e escolha o plano ideal para o seu
              negócio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Básico",
                price: "R$ 60",
                period: "/mês",
                popular: false,
                features: [
                  "500 pedidos/mês",
                  "1 usuário",
                  "1 CNPJ",
                  "1 marketplace",
                ],
              },
              {
                name: "Intermediário",
                price: "R$ 150",
                period: "/mês",
                popular: true,
                features: [
                  "2000 pedidos/mês",
                  "3 usuários",
                  "2 CNPJs",
                  "Marketplaces ilimitados",
                ],
              },
              {
                name: "Premium",
                price: "R$ 250",
                period: "/mês",
                popular: false,
                features: [
                  "5000 pedidos/mês",
                  "5 usuários",
                  "5 CNPJs",
                  "Marketplaces ilimitados",
                ],
              },
              {
                name: "Avançado",
                price: "R$ 400",
                period: "/mês",
                popular: false,
                features: [
                  "Pedidos ilimitados",
                  "Usuários ilimitados",
                  "CNPJs ilimitados",
                  "Marketplaces ilimitados",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={cn(
                  "relative rounded-lg border p-6",
                  plan.popular
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Mais Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "w-full",
                    plan.popular
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : ""
                  )}
                  asChild
                >
                  <a href="/signup">Comece Agora</a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="ferramentas" className="py-20 bg-muted">
        <div className="container px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Principais Funcionalidades
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ferramentas essenciais para otimizar sua operação e aumentar suas
              vendas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Package className="w-6 h-6" />,
                title: "Gestão de Estoque",
                description: "Controle completo do seu inventário",
              },
              {
                icon: <Send className="w-6 h-6" />,
                title: "Envios FULL",
                description: "Integração com principais transportadoras",
              },
              {
                icon: <Calculator className="w-6 h-6" />,
                title: "Gestão Financeira",
                description: "Controle de custos e lucratividade",
              },
              {
                icon: <Boxes className="w-6 h-6" />,
                title: "Planejamento de Estoque",
                description: "Previsão de demanda e compras",
              },
              {
                icon: <ShoppingCart className="w-6 h-6" />,
                title: "Emissão de Etiquetas",
                description: "Geração automática de etiquetas",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tenha visibilidade de seus números de forma precisa
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Análise inteligente de vendas e lucros com visão completa da saúde
              do seu negócio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Visão Geral",
                description: "Dashboard completo com KPIs",
              },
              {
                icon: <Calculator className="w-6 h-6" />,
                title: "Custos e Impostos",
                description: "Controle de custos e impostos",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Taxas e Despesas",
                description: "Acompanhamento de despesas",
              },
              {
                icon: <FileSpreadsheet className="w-6 h-6" />,
                title: "Lucratividade",
                description: "Cálculo preciso de margens",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-card p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-primary mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Exporte dados para planilhas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Integração facilitada com outras plataformas para análises
              complementares
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefícios Extras
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ferramentas poderosas para aumentar vendas e lucros
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-bold mb-4">
                Notificações Inteligentes
              </h3>
              <p className="text-muted-foreground">
                Receba alertas antecipados de baixo estoque e mantenha seu
                inventário sempre atualizado
              </p>
            </motion.div>

            <motion.div
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-bold mb-4">
                Planejamento de Compras
              </h3>
              <p className="text-muted-foreground">
                Otimize seus pedidos de compra com base em análises de demanda e
                estoque
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
