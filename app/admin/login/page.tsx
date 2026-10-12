"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminUser, api, jsonBody, refreshCsrf } from "@/app/lib/admin-api";

type LoginResponse = { user: AdminUser };

export default function AdminLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      await refreshCsrf();
      const result = await api<LoginResponse>("/auth/login/", { method: "POST", body: jsonBody({ phone, password }) });
      await api<AdminUser>("/auth/me/");
      router.replace(result.user.role === "finance" ? "/admin/finance" : "/admin");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to sign in."); }
    finally { setBusy(false); }
  }

  return <main className="admin-login-page"><div className="admin-login-card"><div className="admin-login-brand"><span className="admin-brand-mark">Z</span><span><strong>Ziq Zema</strong><small>Management</small></span></div><h1>Welcome back</h1><p>Sign in with your administrator account to continue.</p>{error && <div className="admin-notice">{error}</div>}<form onSubmit={submit}><div className="admin-field"><label htmlFor="phone">Phone number</label><input className="admin-input" id="phone" autoComplete="username" value={phone} onChange={(e) => setPhone(e.target.value)} required /></div><div className="admin-field"><label htmlFor="password">Password</label><input className="admin-input" id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div><button className="admin-primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}<i className="fa-solid fa-arrow-right" /></button></form></div></main>;
}
