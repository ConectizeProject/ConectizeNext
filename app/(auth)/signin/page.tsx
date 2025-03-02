"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { useSupabase } from "@/hooks/useSupabase";
import { translateSupabaseError } from "@/utils/supabase-errors";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const { supabase } = useSupabase();

  useEffect(() => {
    const errorMessage = searchParams.get("error");
    if (errorMessage) {
      setError(errorMessage);
    }
  }, [searchParams]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(translateSupabaseError(error.code));
        return;
      }

      if (data.session) {
        router.refresh();
        setTimeout(() => {
          router.push(redirectTo);
        }, 100);
      }
    } catch (error) {
      setError("Ocorreu um erro ao tentar fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Entrar no ConectizeApp</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Ou{" "}
            <Link href="/signup" className="text-primary hover:underline">
              criar uma nova conta
            </Link>
          </p>
        </div>

        <form onSubmit={handleSignIn} className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/50">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <FormInput
              id="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormInput
              id="password"
              type="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
