"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { api, jsonBody } from "@/app/lib/admin-api";

type Employee = { phone: string; name: string; role: string; salary: number; courses: number[]; courses_names?: string[]; is_active: boolean; changelog?: { id: number; action: string; changed_by_name: string; field_name: string; old_value: string; new_value: string; timestamp: string }[] };
type Course = { id: number; name: string };
const empty = { phone: "", name: "", role: "teacher", salary: "0", courses: [] as number[], password: "", is_active: true };

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const load = () => api<Employee[]>("/employees/").then(setEmployees).catch((e) => setError(e.message));
  useEffect(() => { load(); api<Course[]>("/courses/").then(setCourses).catch(() => {}); }, []);
  const visible = useMemo(() => employees.filter((item) => `${item.name} ${item.phone} ${item.role}`.toLowerCase().includes(search.toLowerCase())), [employees, search]);
  function open(employee?: Employee) {
    setError(""); setSelected(employee ?? null);
    setForm(employee ? { phone: employee.phone, name: employee.name, role: employee.role, salary: String(employee.salary), courses: employee.courses, password: "", is_active: employee.is_active } : empty);
    setModal(true);
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    const payload: Record<string, unknown> = { name: form.name, role: form.role, salary: Number(form.salary), courses: form.courses, is_active: form.is_active };
    if (!selected) { payload.phone = form.phone; if (form.password) payload.password = form.password; }
    else if (form.password) payload.password = form.password;
    try {
      await api(`/employees/${selected ? `${encodeURIComponent(selected.phone)}/` : ""}`, { method: selected ? "PATCH" : "POST", body: jsonBody(payload) });
      setModal(false); await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Could not save employee."); }
    finally { setBusy(false); }
  }
  async function archive(employee: Employee) {
    if (!window.confirm(`Archive ${employee.name}? They will lose access to the workspace.`)) return;
    try { await api(`/employees/${encodeURIComponent(employee.phone)}/`, { method: "DELETE" }); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not archive employee."); }
  }
  return <>
    <div className="admin-heading"><div><h1>Employees</h1><p>Manage staff accounts, roles, assigned courses, and salary details.</p></div><button className="admin-primary" onClick={() => open()}><i className="fa-solid fa-plus" /> Add employee</button></div>
    {error && !modal && <div className="admin-notice">{error}</div>}
    <div className="admin-toolbar"><input className="admin-input admin-search" placeholder="Search by name, phone, or role" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Employee</th><th>Phone</th><th>Role</th><th>Courses</th><th>Salary</th><th>Status</th><th /></tr></thead><tbody>{visible.map((employee) => <tr key={employee.phone}><td><div className="admin-person"><span className="admin-person-avatar">{employee.name.slice(0, 1).toUpperCase()}</span>{employee.name}</div></td><td>{employee.phone}</td><td>{employee.role}</td><td>{employee.courses_names?.join(", ") || "—"}</td><td>{Number(employee.salary).toLocaleString()}</td><td><span className={`admin-pill ${employee.is_active ? "" : "inactive"}`}>{employee.is_active ? "Active" : "Archived"}</span></td><td><div className="admin-row-actions"><button title="Edit employee" onClick={() => open(employee)}><i className="fa-regular fa-pen-to-square" /></button>{employee.is_active && <button title="Archive employee" onClick={() => archive(employee)}><i className="fa-regular fa-archive" /></button>}</div></td></tr>)}</tbody></table>{visible.length === 0 && <div className="admin-empty">No employees found.</div>}</div>
    {modal && <div className="admin-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(false); }}><section className="admin-modal"><div className="admin-modal-head"><div><h2>{selected ? "Edit employee" : "Add employee"}</h2><p>Employee account details and access.</p></div><button className="admin-close" onClick={() => setModal(false)}><i className="fa-solid fa-xmark" /></button></div>{error && <div className="admin-notice">{error}</div>}<form onSubmit={submit}><div className="admin-form-grid"><div className="admin-field"><label>Full name</label><input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div><div className="admin-field"><label>Phone number</label><input className="admin-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={!!selected} required /></div><div className="admin-field"><label>Role</label><select className="admin-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="teacher">Teacher</option><option value="finance">Finance</option><option value="admin">Admin</option></select></div><div className="admin-field"><label>Monthly salary</label><input className="admin-input" type="number" min="0" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} /></div><div className="admin-field full"><label>Assigned courses</label><select multiple className="admin-select" size={Math.min(5, Math.max(3, courses.length))} value={form.courses.map(String)} onChange={(e) => setForm({ ...form, courses: Array.from(e.target.selectedOptions, (option) => Number(option.value)) })}>{courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}</select></div><div className="admin-field full"><label>{selected ? "New password (optional)" : "Password (leave blank for default)"}</label><input className="admin-input" type="password" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>{selected && <label className="admin-checkbox-row full"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Account is active</label>}</div><div className="admin-modal-actions"><button type="button" className="admin-secondary" onClick={() => setModal(false)}>Cancel</button><button className="admin-primary" disabled={busy}>{busy ? "Saving…" : selected ? "Save changes" : "Create employee"}</button></div></form>{selected && <div><div className="admin-panel-head" style={{ marginTop: 20 }}><h2>Change history</h2><small>{selected.changelog?.length ?? 0} recorded changes</small></div>{selected.changelog?.slice(0, 6).map((item) => <div className="admin-list-row" key={item.id}><div><div className="admin-list-primary">{item.field_name} · {item.action}</div><div className="admin-list-secondary">{item.old_value || "—"} → {item.new_value || "—"}</div></div><span className="admin-list-secondary">{item.changed_by_name || "System"} · {new Date(item.timestamp).toLocaleDateString()}</span></div>)}</div>}</section></div>}
  </>;
}
