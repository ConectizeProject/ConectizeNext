import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const error_description = requestUrl.searchParams.get("error_description");
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  // Se houver erro, redireciona para a página de login com a mensagem de erro
  if (error || error_description) {
    const errorUrl = new URL("/signin", requestUrl.origin);
    errorUrl.searchParams.set(
      "error",
      error_description || error || "Erro na autenticação"
    );
    return NextResponse.redirect(errorUrl);
  }

  // Se não houver código, redireciona para a página inicial
  if (!code) {
    return NextResponse.redirect(new URL("/", requestUrl.origin));
  }

  try {
    const response = NextResponse.redirect(new URL(next, requestUrl.origin));

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            response.cookies.set(name, value, options);
          },
          remove(name: string, options: any) {
            response.cookies.delete(name);
          },
        },
      }
    );

    const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      const errorUrl = new URL("/signin", requestUrl.origin);
      errorUrl.searchParams.set("error", exchangeError.message);
      return NextResponse.redirect(errorUrl);
    }

    // Se a troca foi bem sucedida e temos uma sessão
    if (data.session) {
      // Atualiza os cookies com a nova sessão
      response.cookies.set({
        name: "supabase-auth-token",
        value: JSON.stringify([
          data.session.refresh_token,
          data.session.access_token,
        ]),
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 dias
      });

      return response;
    }

    // Se não temos sessão, algo deu errado
    const errorUrl = new URL("/signin", requestUrl.origin);
    errorUrl.searchParams.set("error", "Não foi possível iniciar a sessão");
    return NextResponse.redirect(errorUrl);
  } catch (error) {
    // Em caso de erro inesperado
    const errorUrl = new URL("/signin", requestUrl.origin);
    errorUrl.searchParams.set(
      "error",
      "Ocorreu um erro durante a autenticação"
    );
    return NextResponse.redirect(errorUrl);
  }
}
