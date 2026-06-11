"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema } from "@/validations/schemas";

/**
 * PRODUCTION-GRADE AUTH ACTIONS
 * Optimized for @supabase/ssr and Enterprise RBAC
 */

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const remember = formData.get("remember") === "true";
  
  // 1. Validation
  const validated = loginSchema.safeParse({ email, password });
  if (!validated.success) {
    return { error: "Invalid credentials format" };
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          const cookieOptions = remember 
            ? { ...options, maxAge: 60 * 60 * 24 * 365 } // Enforce 1 year persistence
            : { ...options, maxAge: undefined, expires: undefined }; // Session-only
          cookieStore.set({ name, value, ...cookieOptions });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  // 2. Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Set persistent login helper cookie for the proxy to read on refreshes
  if (remember) {
    cookieStore.set({ name: "sb-remember-me", value: "true", maxAge: 60 * 60 * 24 * 365, path: "/" });
  } else {
    cookieStore.set({ name: "sb-remember-me", value: "false", path: "/" });
  }

  // 3. Redirect based on role
  const role = data.user?.app_metadata?.role || "CUSTOMER";
  
  if (role === "SUPER_ADMIN" || role === "BRANCH_ADMIN") {
    redirect("/admin");
  }

  redirect("/account");
}

export async function signOut() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  await supabase.auth.signOut({ scope: "local" });
  cookieStore.set({ name: "sb-remember-me", value: "", maxAge: -1, path: "/" });
  redirect("/login");
}
