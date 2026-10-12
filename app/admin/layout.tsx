import type { Metadata } from "next";
import AdminShell from "@/app/components/admin/AdminShell";
import "./admin.css";

export const metadata: Metadata = { title: "Management | Ziq Zema" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
