"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { api, jsonBody } from "@/app/lib/admin-api";

type Course = { id: number; name: string };
type Package = { id: number; course: number; duration: string; days_in_week: string; price: number };
type Schedule = { id: number; package: number; days: string[]; start_time: string; end_time: string };
type Payment = { id: number; amount: number; payment_method: string; payment_reason: string; reference_no: string; status: string; created_date: string };
type Student = { id: number; name: string; phone: string; course: number; course_name: string; package: number; package_name: string; schedules: number[]; schedules_details: Schedule[]; registration_date: string; active: boolean; payments: Payment[]; changelog: { id: number; action: string; field_name: string; old_value: string; new_value: string; timestamp: string }[] };
const fresh = { name: "", phone: "", course: "", package: "", schedules: [] as number[], active: true };

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [modal, setModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [selected, setSelected] = useState<Student | null>(null);
  const [form, setForm] = useState(fresh);
  const [payment, setPayment] = useState({ amount: "", payment_method: "cash", payment_reason: "", reference_no: "", status: "paid" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const load = () => api<Student[]>("/students/").then(setStudents).catch((e) => setError(e.message));
  useEffect(() => { load(); api<Course[]>("/courses/").then(setCourses).catch(() => {}); }, []);
  const visible = useMemo(() => students.filter((student) => {
    const queryMatch = `${student.name} ${student.phone} ${student.course_name}`.toLowerCase().includes(search.toLowerCase());
    const statusMatch = statusFilter === "all" || (statusFilter === "active" ? student.active : !student.active);
    const courseMatch = courseFilter === "all" || String(student.course) === courseFilter;
    return queryMatch && statusMatch && courseMatch;
  }), [students, search, statusFilter, courseFilter]);

  async function setCourse(courseId: string) {
    const list = courseId ? await api<Package[]>(`/packages/?course=${courseId}`) : [];
    setPackages(list); setSchedules([]);
    setForm((old) => ({ ...old, course: courseId, package: "", schedules: [] }));
  }
  async function setPackage(packageId: string) {
    const list = packageId ? await api<Schedule[]>(`/schedules/?package=${packageId}`) : [];
    setSchedules(list); setForm((old) => ({ ...old, package: packageId, schedules: [] }));
  }
  async function openStudent(student?: Student) {
    setError(""); setSelected(student ?? null);
    if (student) {
      const packageList = await api<Package[]>(`/packages/?course=${student.course}`);
      const scheduleList = await api<Schedule[]>(`/schedules/?package=${student.package}`);
      setPackages(packageList); setSchedules(scheduleList);
      setForm({ name: student.name, phone: student.phone, course: String(student.course), package: String(student.package), schedules: student.schedules, active: student.active });
    } else { setPackages([]); setSchedules([]); setForm(fresh); }
    setModal(true);
  }
  async function submitStudent(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    const body = { name: form.name, phone: form.phone, course: Number(form.course), package: Number(form.package), schedules: form.schedules, active: form.active };
    try { await api(`/students/${selected ? `${selected.id}/` : ""}`, { method: selected ? "PATCH" : "POST", body: jsonBody(body) }); setModal(false); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not save student."); }
    finally { setBusy(false); }
  }
  async function archive(student: Student) {
    if (!window.confirm(`Archive ${student.name}?`)) return;
    try { await api(`/students/${student.id}/`, { method: "DELETE" }); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not archive student."); }
  }
  async function addPayment(event: FormEvent) {
    event.preventDefault(); if (!selected) return; setBusy(true); setError("");
    try { await api(`/students/${selected.id}/payments/`, { method: "POST", body: jsonBody({ ...payment, amount: Number(payment.amount) }) }); setPaymentModal(false); setPayment({ amount: "", payment_method: "cash", payment_reason: "", reference_no: "", status: "paid" }); await load(); const updated = await api<Student>(`/students/${selected.id}/`); setSelected(updated); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not record payment."); }
    finally { setBusy(false); }
  }
  async function updatePaymentStatus(item: Payment, status: string) {
    if (!selected) return;
    try { await api(`/payments/${item.id}/?student=${selected.id}`, { method: "PATCH", body: jsonBody({ status }) }); await load(); const updated = await api<Student>(`/students/${selected.id}/`); setSelected(updated); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not update payment."); }
  }
  async function deletePayment(item: Payment) {
    if (!selected || !window.confirm("Delete this payment record?")) return;
    try { await api(`/payments/${item.id}/?student=${selected.id}`, { method: "DELETE" }); await load(); const updated = await api<Student>(`/students/${selected.id}/`); setSelected(updated); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not delete payment."); }
  }
  return <>
    <div className="admin-heading"><div><h1>Students</h1><p>Manage enrollments, schedules, and student payments.</p></div><button className="admin-primary" onClick={() => openStudent()}><i className="fa-solid fa-plus" /> Register student</button></div>
    {error && !modal && !paymentModal && <div className="admin-notice">{error}</div>}
    <div className="admin-toolbar"><input className="admin-input admin-search" placeholder="Search students by name, phone, or course" value={search} onChange={(e) => setSearch(e.target.value)} /><select className="admin-select" style={{ width: 150 }} value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}><option value="all">All courses</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}</select><select className="admin-select" style={{ width: 145 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="all">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Student</th><th>Phone</th><th>Course</th><th>Package</th><th>Registered</th><th>Status</th><th /></tr></thead><tbody>{visible.map((student) => <tr key={student.id}><td><div className="admin-person"><span className="admin-person-avatar">{student.name.slice(0, 1).toUpperCase()}</span>{student.name}</div></td><td>{student.phone}</td><td>{student.course_name}</td><td>{student.package_name}</td><td>{student.registration_date}</td><td><span className={`admin-pill ${student.active ? "" : "inactive"}`}>{student.active ? "Active" : "Inactive"}</span></td><td><div className="admin-row-actions"><button title="View student" onClick={async () => { const full = await api<Student>(`/students/${student.id}/`); setSelected(full); setError(""); }}><i className="fa-regular fa-eye" /></button><button title="Edit student" onClick={() => openStudent(student)}><i className="fa-regular fa-pen-to-square" /></button>{student.active && <button title="Archive student" onClick={() => archive(student)}><i className="fa-regular fa-archive" /></button>}</div></td></tr>)}</tbody></table>{visible.length === 0 && <div className="admin-empty">No students found.</div>}</div>
    {selected && !modal && !paymentModal && <div className="admin-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}><section className="admin-modal wide"><div className="admin-modal-head"><div><h2>{selected.name}</h2><p>{selected.phone} · {selected.course_name} · {selected.package_name}</p></div><button className="admin-close" onClick={() => setSelected(null)}><i className="fa-solid fa-xmark" /></button></div>{error && <div className="admin-notice">{error}</div>}<div className="admin-panel-head"><h2>Payment history</h2><button className="admin-primary" onClick={() => setPaymentModal(true)}><i className="fa-solid fa-plus" /> Record payment</button></div>{selected.payments.length ? selected.payments.map((item) => <div className="admin-payment-row" key={item.id}><div><strong>{item.payment_reason || "Student payment"}</strong><div className="admin-list-secondary">{item.reference_no || "No reference"}</div></div><strong>{Number(item.amount).toLocaleString()} ETB</strong><span>{item.payment_method}</span><select className="admin-select" value={item.status} onChange={(e) => updatePaymentStatus(item, e.target.value)}><option value="draft">Draft</option><option value="paid">Paid</option><option value="canceled">Canceled</option></select><button className="admin-row-actions" title="Delete payment" onClick={() => deletePayment(item)}><i className="fa-regular fa-trash-can" /></button></div>) : <div className="admin-empty">No payments recorded yet.</div>}<div className="admin-panel-head" style={{ marginTop: 23 }}><h2>Change history</h2><small>{selected.changelog.length} recorded changes</small></div>{selected.changelog.slice(0, 6).map((item) => <div className="admin-list-row" key={item.id}><div><div className="admin-list-primary">{item.field_name} · {item.action}</div><div className="admin-list-secondary">{item.old_value || "—"} → {item.new_value || "—"}</div></div><span className="admin-list-secondary">{new Date(item.timestamp).toLocaleDateString()}</span></div>)}</section></div>}
    {modal && <div className="admin-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(false); }}><section className="admin-modal"><div className="admin-modal-head"><div><h2>{selected ? "Edit student" : "Register student"}</h2><p>Student contact, course, and schedule information.</p></div><button className="admin-close" onClick={() => setModal(false)}><i className="fa-solid fa-xmark" /></button></div>{error && <div className="admin-notice">{error}</div>}<form onSubmit={submitStudent}><div className="admin-form-grid"><div className="admin-field"><label>Full name</label><input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div><div className="admin-field"><label>Phone number</label><input className="admin-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div><div className="admin-field full"><label>Course</label><select className="admin-select" value={form.course} required onChange={(e) => setCourse(e.target.value)}><option value="">Select a course</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}</select></div><div className="admin-field full"><label>Package</label><select className="admin-select" value={form.package} required disabled={!packages.length} onChange={(e) => setPackage(e.target.value)}><option value="">Select a package</option>{packages.map((item) => <option key={item.id} value={item.id}>{item.duration} · {item.days_in_week} days · {Number(item.price).toLocaleString()} ETB</option>)}</select></div><div className="admin-field full"><label>Available schedules</label><select multiple className="admin-select" size={Math.min(5, Math.max(3, schedules.length))} value={form.schedules.map(String)} disabled={!schedules.length} onChange={(e) => setForm({ ...form, schedules: Array.from(e.target.selectedOptions, (option) => Number(option.value)) })}>{schedules.map((item) => <option key={item.id} value={item.id}>{item.days.join(", ")} · {item.start_time.slice(0, 5)}–{item.end_time.slice(0, 5)}</option>)}</select><small className="admin-list-secondary">Select one or more schedules.</small></div>{selected && <label className="admin-checkbox-row full"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Student is active</label>}</div><div className="admin-modal-actions"><button type="button" className="admin-secondary" onClick={() => setModal(false)}>Cancel</button><button className="admin-primary" disabled={busy}>{busy ? "Saving…" : selected ? "Save changes" : "Register student"}</button></div></form></section></div>}
    {paymentModal && selected && <div className="admin-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setPaymentModal(false); }}><section className="admin-modal"><div className="admin-modal-head"><div><h2>Record payment</h2><p>Add a payment entry for {selected.name}.</p></div><button className="admin-close" onClick={() => setPaymentModal(false)}><i className="fa-solid fa-xmark" /></button></div>{error && <div className="admin-notice">{error}</div>}<form onSubmit={addPayment}><div className="admin-form-grid"><div className="admin-field"><label>Amount (ETB)</label><input className="admin-input" type="number" min="0.01" step="0.01" value={payment.amount} onChange={(e) => setPayment({ ...payment, amount: e.target.value })} required /></div><div className="admin-field"><label>Payment method</label><select className="admin-select" value={payment.payment_method} onChange={(e) => setPayment({ ...payment, payment_method: e.target.value })}><option value="cash">Cash</option><option value="bank">Bank transfer</option><option value="wallet">Wallet transfer</option></select></div><div className="admin-field full"><label>Reason</label><input className="admin-input" value={payment.payment_reason} onChange={(e) => setPayment({ ...payment, payment_reason: e.target.value })} /></div><div className="admin-field"><label>Reference number</label><input className="admin-input" value={payment.reference_no} onChange={(e) => setPayment({ ...payment, reference_no: e.target.value })} /></div><div className="admin-field"><label>Status</label><select className="admin-select" value={payment.status} onChange={(e) => setPayment({ ...payment, status: e.target.value })}><option value="paid">Paid</option><option value="draft">Draft</option><option value="canceled">Canceled</option></select></div></div><div className="admin-modal-actions"><button type="button" className="admin-secondary" onClick={() => setPaymentModal(false)}>Cancel</button><button className="admin-primary" disabled={busy}>{busy ? "Saving…" : "Record payment"}</button></div></form></section></div>}
  </>;
}
