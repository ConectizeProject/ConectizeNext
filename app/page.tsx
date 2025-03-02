import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <main className="pt-24">
        <section className="container py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Gerencie seus marketplaces em um só lugar
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Administre pedidos, estoque, flex, full e relatórios comerciais de
            forma integrada e eficiente.
          </p>
        </section>

        {/* Pricing Section */}
        <section className="container py-24">
          <h2 className="text-3xl font-bold text-center mb-12">Planos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mensal */}
            <div className="rounded-lg border p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-4">Mensal</h3>
              <div className="text-4xl font-bold mb-6">
                R$ 200<span className="text-lg font-normal">/mês</span>
              </div>
              <Button className="mt-auto">Começar agora</Button>
            </div>

            {/* Trimestral */}
            <div className="rounded-lg border p-6 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                Mais popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Trimestral</h3>
              <div className="text-4xl font-bold mb-6">
                R$ 180<span className="text-lg font-normal">/mês</span>
              </div>
              <Button className="mt-auto" variant="default">
                Começar agora
              </Button>
            </div>

            {/* Anual */}
            <div className="rounded-lg border p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-4">Anual</h3>
              <div className="text-4xl font-bold mb-6">
                R$ 150<span className="text-lg font-normal">/mês</span>
              </div>
              <Button className="mt-auto">Começar agora</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
