"use client";

import { motion } from "framer-motion";
import { Boxes, Calculator, Package, Send, ShoppingCart } from "lucide-react";

export default function Features() {
  const features = [
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
  ];

  return (
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
          {features.map((feature, index) => (
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
  );
}
