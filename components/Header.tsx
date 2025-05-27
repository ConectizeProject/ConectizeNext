import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity"
        >
          <span className="text-primary">Conectize</span>
          <span className="text-muted-foreground">App</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#ferramentas"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Ferramentas
          </Link>
          <Link
            href="#precos"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Preços
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" className="hidden md:block">
              Conectar
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="hidden md:block">Cadastrar</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
