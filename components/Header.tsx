import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold hover:opacity-80 transition-opacity"
        >
          ConectizeApp
        </Link>
        <nav className="flex gap-4">
          <Link href="/signin">
            <Button variant="ghost">Entrar</Button>
          </Link>
          <Link href="/signup">
            <Button>Cadastrar</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
