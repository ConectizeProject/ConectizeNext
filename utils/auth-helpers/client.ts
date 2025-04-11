"use client";

import { getURL } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/client";
import { User } from '@supabase/supabase-js';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect, useState } from "react";
import { redirectToPath } from "./server";

export type AuthError = {
  message: string;
  code?: string;
};

export type AuthResponse = {
  error: AuthError | null;
  success: boolean;
  message?: string;
};

export async function handleRequest(
  e: React.FormEvent<HTMLFormElement>,
  requestFunc: (formData: FormData) => Promise<string>,
  router: AppRouterInstance | null = null
): Promise<boolean | void> {
  // Prevent default form submission refresh
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const redirectUrl: string = await requestFunc(formData);

  if (router) {
    // If client-side router is provided, use it to redirect
    return router.push(redirectUrl);
  } else {
    // Otherwise, redirect server-side
    return await redirectToPath(redirectUrl);
  }
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    const supabase = createClient();
    const redirectURL = getURL("/auth/callback");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectURL,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return {
        error: {
          message: error.message,
          code: error.code,
        },
        success: false,
      };
    }

    return {
      error: null,
      success: true,
    };
  } catch (error) {
    return {
      error: {
        message: "Ocorreu um erro ao tentar fazer login com o Google",
      },
      success: false,
    };
  }
}

export async function signInWithMagicLink(
  email: string
): Promise<AuthResponse> {
  try {
    const supabase = createClient();
    const redirectURL = getURL("/auth/callback");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectURL,
      },
    });

    if (error) {
      return {
        error: {
          message: error.message,
          code: error.code,
        },
        success: false,
      };
    }

    return {
      error: null,
      success: true,
      message: "Link de acesso enviado para seu email",
    };
  } catch (error) {
    return {
      error: {
        message: "Ocorreu um erro ao tentar enviar o link de acesso",
      },
      success: false,
    };
  }
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        error: {
          message: error.message,
          code: error.code,
        },
        success: false,
      };
    }

    return {
      error: null,
      success: true,
    };
  } catch (error) {
    return {
      error: {
        message: "Ocorreu um erro ao tentar fazer login",
      },
      success: false,
    };
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        setIsLoading(true);
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error('Erro ao obter usuário:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getUser();
  }, []);

  return { user, isLoading };
}
