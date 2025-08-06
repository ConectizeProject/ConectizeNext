"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Tables } from "@/types_db";
import { getErrorRedirect } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe/client";
import { checkoutWithStripe } from "@/utils/stripe/server";
import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type Subscription = Tables<"subscriptions">;
type Product = Tables<"products">;
type Price = Tables<"prices">;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "lifetime" | "year" | "month";

export default function Pricing({ user, products, subscription }: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push("/signin/signup");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  if (!products.length) {
    return (
      <section className="py-20 bg-muted">
        <div className="container px-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-muted-foreground">
              Nenhum plano de preços encontrado. Crie-os no seu{" "}
              <a
                className="text-primary underline"
                href="https://dashboard.stripe.com/products"
                rel="noopener noreferrer"
                target="_blank"
              >
                Dashboard do Stripe
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
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
            Comece com 30 dias grátis e escolha o plano ideal para o seu negócio
          </p>

          {/* Billing Interval Toggle */}
          {intervals.length > 1 && (
            <div className="relative self-center mt-6 bg-muted border rounded-lg p-1 flex mt-8">
              {intervals.includes("month") && (
                <button
                  onClick={() => setBillingInterval("month")}
                  type="button"
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    billingInterval === "month"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Mensal
                </button>
              )}
              {intervals.includes("year") && (
                <button
                  onClick={() => setBillingInterval("year")}
                  type="button"
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    billingInterval === "year"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Anual
                </button>
              )}
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;

            const priceString = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);

            const isCurrentPlan = subscription
              ? product.name === subscription?.prices?.products?.name
              : false;

            return (
              <motion.div
                key={product.id}
                className={cn(
                  "relative rounded-lg border p-6",
                  isCurrentPlan
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Plano Atual
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{priceString}</span>
                  <span className="text-muted-foreground">
                    /{billingInterval === "month" ? "mês" : "ano"}
                  </span>
                </div>

                {/* Features list - you can customize this based on your product metadata */}
                <ul className="space-y-2 mb-6">
                  {product.metadata &&
                  typeof product.metadata === "object" &&
                  "features" in product.metadata ? (
                    JSON.parse(product.metadata.features as string).map(
                      (feature: string, featureIndex: number) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          <span>{feature}</span>
                        </li>
                      )
                    )
                  ) : (
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Funcionalidades incluídas</span>
                    </li>
                  )}
                </ul>

                <Button
                  className={cn(
                    "w-full",
                    isCurrentPlan
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : ""
                  )}
                  onClick={() => handleStripeCheckout(price)}
                  disabled={priceIdLoading === price.id}
                >
                  {priceIdLoading === price.id
                    ? "Carregando..."
                    : subscription
                    ? "Gerenciar"
                    : "Comece Agora"}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
