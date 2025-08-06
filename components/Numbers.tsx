"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Calculator,
  FileSpreadsheet,
  TrendingUp,
} from "lucide-react";

export default function Numbers() {
  const items = [
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
  ];

  return (
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
          {items.map((item, index) => (
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
  );
}
