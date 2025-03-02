"use client";

import { Button } from "@/components/ui/button";
import { translateSupabaseError } from "@/utils/supabase-errors";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/auth/callback?next=/update-password`,
      });

      if (error) {
        setError(translateSupabaseError(error.code));
        return;
      }

      setMessage("Verifique seu email para redefinir sua senha.");
    } catch (error) {
      setError("Ocorreu um erro ao tentar redefinir sua senha.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Recuperar senha</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Digite seu email para receber um link de recuperação
          </p>
        </div>

        <form onSubmit={handleReset} className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/50">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-md bg-green-50 p-4 text-sm text-green-500 dark:bg-green-900/50">
              {message}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/signin"
              className="text-sm text-primary hover:underline"
            >
              Voltar para o login
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Enviar link de recuperação
          </Button>
        </form>
      </div>
    </div>
  );
}
