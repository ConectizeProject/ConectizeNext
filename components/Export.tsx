"use client";

import { motion } from "framer-motion";

export default function Export() {
  return (
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
  );
}
