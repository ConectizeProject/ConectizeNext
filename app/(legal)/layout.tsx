import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="container px-4 py-12">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
