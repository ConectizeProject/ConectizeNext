"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSupabase } from "@/hooks/useSupabase";
import { Cog, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function UserNav() {
  const router = useRouter();
  const { session, supabase } = useSupabase();
  const [initials, setInitials] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      const userEmail = session.user.email;
      setEmail(userEmail);

      // Extrair iniciais do email
      const emailParts = userEmail.split("@")[0].split(".");
      const initialsFromParts = emailParts
        .map((part: string) => part[0].toUpperCase())
        .join("");

      setInitials(
        initialsFromParts.length > 1
          ? initialsFromParts.substring(0, 2)
          : userEmail[0].toUpperCase()
      );
    }
  }, [session]);

  const handleSignOut = async () => {
    try {
      // Limpa o estado local primeiro
      setEmail("");
      setInitials("");

      // Faz o logout
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Limpa os cookies manualmente
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Força um refresh da página
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao sair:", error);
      toast.error("Erro ao fazer logout");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          aria-label="Menu do usuário"
        >
          <Avatar className="h-8 w-8 border border-primary/10">
            <AvatarFallback className="bg-primary/5 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.id ? "Conta Conectize" : "Não autenticado"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/configuracoes")}>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/configuracoes")}>
            <Cog className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
