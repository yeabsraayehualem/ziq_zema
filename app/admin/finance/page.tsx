"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/app/lib/admin-api";

type FinancePayment = {
  id: number;
  user_name: string;
  payment_type: "in" | "out";
  payed_date: string;
  payment_method: string;
  payment_reason: string;
  reference_no: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "canceled";
};

const money = (amount: number) => `${Number(amount).toLocaleString()} ETB`;

export default function FinanceDashboardPage() {
  const [payments, setPayments] = useState<FinancePayment[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api<FinancePayment[]>("/finance/payments/").then(setPayments).catch((reason) => setError(reason.message));
  }, []);

  const totals = useMemo(() => payments.reduce((result, payment) => {
    if (payment.status === "paid") {
      if (payment.payment_type === "in") result.income += Number(payment.amount);
      else result.expenses += Number(payment.amount);
    }
    if (payment.status === "draft" || payment.status === "sent") result.pending += 1;
    return result;
  }, { income: 0, expenses: 0, pending: 0 }), [payments]);

  return <>
    <div className="admin-heading">
      <div><h1>Finance</h1><p>Review income, expenses, and recent payment records.</p></div>
    </div>
    {error && <div className="admin-notice">{error}</div>}
    <div className="admin-cards">
      <article className="admin-stat"><div className="admin-stat-top"><span>Paid income</span><span className="admin-stat-icon"><i className="fa-solid fa-arrow-trend-up" /></span></div><strong>{money(totals.income)}</strong><small>Recorded incoming payments</small></article>
      <article className="admin-stat"><div className="admin-stat-top"><span>Paid expenses</span><span className="admin-stat-icon"><i className="fa-solid fa-arrow-trend-down" /></span></div><strong>{money(totals.expenses)}</strong><small>Recorded outgoing payments</small></article>
      <article className="admin-stat"><div className="admin-stat-top"><span>Pending records</span><span className="admin-stat-icon"><i className="fa-solid fa-clock" /></span></div><strong>{totals.pending}</strong><small>Draft or sent payments</small></article>
    </div>
    <section className="admin-panel">
      <div className="admin-panel-head"><h2>Recent payments</h2><small>{payments.length} records</small></div>
      {payments.length ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Reason</th><th>Type</th><th>Date</th><th>Method</th><th>Recorded by</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>{payments.map((payment) => <tr key={payment.id}>
              <td><strong>{payment.payment_reason}</strong>{payment.reference_no && <div className="admin-list-secondary">Ref: {payment.reference_no}</div>}</td>
              <td>{payment.payment_type === "in" ? "Income" : "Expense"}</td>
              <td>{new Date(payment.payed_date).toLocaleDateString()}</td>
              <td>{payment.payment_method}</td>
              <td>{payment.user_name}</td>
              <td>{money(payment.amount)}</td>
              <td><span className={`admin-pill ${payment.status === "canceled" ? "inactive" : ""}`}>{payment.status}</span></td>
            </tr>)}</tbody>
          </table>
        </div>
      ) : error ? null : <div className="admin-empty">Loading or no payments have been recorded yet.</div>}
    </section>
  </>;
}
