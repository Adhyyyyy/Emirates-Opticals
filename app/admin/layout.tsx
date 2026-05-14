import React from "react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/layouts/admin/AdminSidebar";
import { AdminHeader } from "@/components/layouts/admin/AdminHeader";
import { AdminShell } from "@/components/layouts/admin/AdminShell";
import { AdminMobileNav } from "@/components/layouts/admin/AdminMobileNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const role = user.app_metadata?.role || "CUSTOMER";
  const name = user.user_metadata?.name || user.email;

  return (
    <div className="min-h-screen bg-brand-pearl flex">
      {/* 1. Desktop Sidebar */}
      <AdminSidebar userRole={role} />

      {/* 2. Mobile Drawer */}
      <AdminMobileNav userRole={role} />

      {/* 3. Main Content Area */}
      <AdminShell>
        <AdminHeader userName={name} userRole={role} />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          {children}
        </main>
      </AdminShell>
    </div>
  );
}
