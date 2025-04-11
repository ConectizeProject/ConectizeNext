import { createServerClient } from "@supabase/ssr";
import { NextRequest } from "next/server";

// Define a function to create a Supabase client for server-side operations
// The function takes a cookie store created with next/headers cookies as an argument
export const createClient = (request: NextRequest) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // The get method is used to retrieve a cookie by its name
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        // The set method is used to set a cookie with a given name, value, and options
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
        },
        // The remove method is used to delete a cookie by its name
        remove(name: string, options: any) {
          request.cookies.delete(name);
        },
      },
    }
  );

  return supabase;
};
