"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/app/lib/admin-api";

type Dashboard = {
  totals: Record<string, number>;
  students_per_course: { name: string; count: number }[];
  today_schedules: { id: number; course: string; package: string; start_time: string; end_time: string; student_count: number }[];
  recent_students: { id: number; name: string; course: string }[];
  recent_employees: { phone: string; name: string; role: string }[];
  today: string;
};

export default function DashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { api<Dashboard>("/learning/dashboard/").then(setData).catch((e) => setError(e.message)); }, []);
  if (error) return <div className="admin-notice">{error}</div>;
  if (!data) return <div className="admin-empty">Loading dashboard…</div>;
  const cards = [
    ["Total students", data.totals.students, "fa-user-graduate", `${data.totals.active_students} currently active`],
    ["Employees", data.totals.employees, "fa-users", `${data.totals.active_employees} active employees`],
    ["Courses", data.totals.courses, "fa-music", "Available programs"],
    ["Active packages", data.totals.active_packages, "fa-box-open", "With enrolled students"],
  ];
  const peak = Math.max(1, ...data.students_per_course.map((item) => item.count));
  return <>
    <div className="admin-heading"><div><h1>Good day</h1><p>Here’s what’s happening at Ziq Zema today.</p></div><Link href="/admin/students" className="admin-primary"><i className="fa-solid fa-plus" /> Register student</Link></div>
    <div className="admin-cards">{cards.map(([label, value, icon, note]) => <article className="admin-stat" key={String(label)}><div className="admin-stat-top"><span>{label}</span><span className="admin-stat-icon"><i className={`fa-solid ${icon}`} /></span></div><strong>{value}</strong><small>{note}</small></article>)}</div>
    <div className="admin-grid">
      <section className="admin-panel"><div className="admin-panel-head"><h2>Students by course</h2><small>All enrollments</small></div><div className="admin-chart">{data.students_per_course.length ? data.students_per_course.map((item) => <div className="admin-bar-wrap" key={item.name} title={`${item.name}: ${item.count}`}><div className="admin-bar" style={{ height: `${Math.max(5, item.count / peak * 100)}%` }} /><span className="admin-bar-label">{item.name}</span></div>) : <div className="admin-empty">No course enrollments yet.</div>}</div></section>
      <section className="admin-panel"><div className="admin-panel-head"><h2>Today’s schedule</h2><small>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${data.today}T12:00:00`))}</small></div><div className="admin-list">{data.today_schedules.length ? data.today_schedules.map((item) => <div className="admin-list-row" key={item.id}><div><div className="admin-list-primary">{item.course}</div><div className="admin-list-secondary">{item.package} · {item.start_time.slice(0, 5)}–{item.end_time.slice(0, 5)}</div></div><span className="admin-count">{item.student_count} students</span></div>) : <div className="admin-empty">No sessions scheduled for today.</div>}</div></section>
      <section className="admin-panel"><div className="admin-panel-head"><h2>Recently registered</h2><Link href="/admin/students" className="admin-list-secondary">View all →</Link></div><div className="admin-list">{data.recent_students.map((student) => <div className="admin-list-row" key={student.id}><div><div className="admin-list-primary">{student.name}</div><div className="admin-list-secondary">{student.course}</div></div><i className="fa-solid fa-chevron-right admin-list-secondary" /></div>)}</div></section>
      <section className="admin-panel"><div className="admin-panel-head"><h2>Team</h2><Link href="/admin/employees" className="admin-list-secondary">Manage →</Link></div><div className="admin-list">{data.recent_employees.map((employee) => <div className="admin-list-row" key={employee.phone}><div><div className="admin-list-primary">{employee.name}</div><div className="admin-list-secondary">{employee.role}</div></div><span className="admin-list-secondary">{employee.phone}</span></div>)}</div></section>
    </div>
  </>;
}
