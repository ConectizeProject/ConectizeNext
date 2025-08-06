import Benefits from "@/components/Benefits";
import Export from "@/components/Export";
import Features from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import Numbers from "@/components/Numbers";
import Pricing from "@/components/Pricing";
import { createClient } from "@/utils/supabase/client";
import {
  getProducts,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";

export default async function Home() {
  const supabase = await createClient();

  const [products, subscription, user] = await Promise.all([
    getProducts(supabase),
    getSubscription(supabase),
    getUser(supabase),
  ]);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Pricing
        user={user}
        products={products ?? []}
        subscription={subscription}
      />
      <Features />
      <Numbers />
      <Export />
      <Benefits />
      <Footer />
    </div>
  );
}
