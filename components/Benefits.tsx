"use client";

import { motion } from "framer-motion";

export default function Benefits() {
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
            <h3 className="text-xl font-bold mb-4">Planejamento de Compras</h3>
            <p className="text-muted-foreground">
              Otimize seus pedidos de compra com base em análises de demanda e
              estoque
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
