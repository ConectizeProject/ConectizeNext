import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url);

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.delete(name);
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.delete(name);
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Se o usuário não estiver autenticado e tentar acessar o dashboard, redireciona para o login
  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    const redirectUrl = new URL("/signin", requestUrl.origin);
    redirectUrl.searchParams.set(
      "error",
      "Você precisa estar logado para acessar esta página"
    );
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Se o usuário estiver autenticado e tentar acessar páginas de autenticação, redireciona para o dashboard
  if (
    session &&
    (request.nextUrl.pathname.startsWith("/signin") ||
      request.nextUrl.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
