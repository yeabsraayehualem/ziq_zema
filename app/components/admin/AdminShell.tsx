"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminUser, api } from "@/app/lib/admin-api";

const adminLinks = [
  { href: "/admin", label: "Overview", icon: "fa-chart-pie" },
  { href: "/admin/students", label: "Students", icon: "fa-user-graduate" },
  { href: "/admin/employees", label: "Employees", icon: "fa-users" },
  { href: "/admin/finance", label: "Finance", icon: "fa-wallet" },
];
const financeLinks = [
  { href: "/admin/finance", label: "Finance", icon: "fa-wallet" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const links = user?.role === "finance" ? financeLinks : adminLinks;
  const homeHref = user?.role === "finance" ? "/admin/finance" : "/admin";

  useEffect(() => {
    if (pathname === "/admin/login") return;
    api<AdminUser>("/auth/me/").then(setUser).catch(() => router.replace("/admin/login")).finally(() => setLoading(false));
  }, [pathname, router]);

  async function logout() {
    try { await api("/auth/logout/", { method: "POST" }); } finally { router.replace("/admin/login"); }
  }

  if (pathname === "/admin/login") return <>{children}</>;
  if (loading || !user) return <main className="admin-loading"><span className="admin-spinner" />Loading your workspace…</main>;

  return <div className="admin-frame">
    <aside className="admin-sidebar">
      <Link href={homeHref} className="admin-brand"><span className="admin-brand-mark">Z</span><span><strong>Ziq Zema</strong><small>Management</small></span></Link>
      <div className="admin-nav-label">WORKSPACE</div>
      <nav className="admin-nav">
        {links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""}><i className={`fa-solid ${link.icon}`} />{link.label}</Link>)}
      </nav>
      <div className="admin-sidebar-bottom"><div className="admin-user-avatar">{user.name.slice(0, 1).toUpperCase()}</div><div className="admin-user-copy"><strong>{user.name}</strong><small>{user.role === "finance" ? "Finance" : "Administrator"}</small></div><button className="admin-icon-button" onClick={logout} aria-label="Sign out" title="Sign out"><i className="fa-solid fa-arrow-right-from-bracket" /></button></div>
    </aside>
    <main className="admin-main"><header className="admin-topbar"><div><span className="admin-breadcrumb">Ziq Zema <i className="fa-solid fa-chevron-right" /> {links.find((link) => link.href === pathname)?.label ?? "Management"}</span></div><div className="admin-topbar-right"><span className="admin-status"><span /> System online</span><span className="admin-date">{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date())}</span></div></header><section className="admin-content">{children}</section></main>
  </div>;
}
