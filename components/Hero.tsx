"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
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
  );
}
