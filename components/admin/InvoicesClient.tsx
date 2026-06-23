"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Modal } from "./Modal";
import { formatDate, formatUSD, INVOICE_STATUS_LABEL } from "@/lib/utils";

export interface ClientOption {
  id: string;
  name: string;
}
export interface ProjectOption {
  id: string;
  name: string;
  client_id: string | null;
}
export interface InvoiceRow {
  id: string;
  description: string;
  amount: number;
  invoice_type: string;
  status: string;
  due_date: string | null;
  client_id: string;
  project_id: string | null;
  clients: { name: string; email: string } | null;
  projects: { name: string } | null;
}

const STATUS_COLOR: Record<string, string> = {
  draft: "#6B7280",
  sent: "#3B82F6",
  paid: "#10B981",
  overdue: "#EF4444",
  void: "#4B5563",
};

function InvoiceForm({
  invoice,
  clients,
  projects,
  onSuccess,
}: {
  invoice?: InvoiceRow;
  clients: ClientOption[];
  projects: ProjectOption[];
  onSuccess: () => void;
}) {
  const isEdit = !!invoice;
  const [form, setForm] = useState({
    client_id: invoice?.client_id ?? "",
    project_id: invoice?.project_id ?? "",
    description: invoice?.description ?? "",
    amount: invoice?.amount?.toString() ?? "",
    invoice_type: invoice?.invoice_type ?? "one_time",
    status: invoice?.status ?? "draft",
    due_date: invoice?.due_date ? invoice.due_date.split("T")[0] : "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const filteredProjects = form.client_id
    ? projects.filter((p) => p.client_id === form.client_id)
    : projects;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        client_id: form.client_id,
        project_id: form.project_id || null,
        description: form.description,
        amount: Number(form.amount),
        invoice_type: form.invoice_type,
        status: form.status,
        due_date: form.due_date || null,
        ...(isEdit ? { id: invoice!.id } : {}),
      };
      const res = await fetch("/api/admin/invoices", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error ?? "Something went wrong");
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const L = "block text-xs font-semibold mb-1.5";
  const Ls = { color: "var(--text-secondary)" };
  const Ss = { background: "var(--bg-elevated)", color: "var(--text-primary)" };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <p
          className="text-sm rounded-xl px-4 py-3"
          style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}
        >
          {error}
        </p>
      )}

      <div>
        <label className={L} style={Ls}>
          Client <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <select
          className="forge-input"
          value={form.client_id}
          onChange={(e) => {
            set("client_id", e.target.value);
            set("project_id", "");
          }}
          required
          style={Ss}
        >
          <option value="">— Select a client —</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id} style={Ss}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={L} style={Ls}>
          Project (optional)
        </label>
        <select
          className="forge-input"
          value={form.project_id}
          onChange={(e) => set("project_id", e.target.value)}
          style={Ss}
        >
          <option value="">— No project —</option>
          {filteredProjects.map((p) => (
            <option key={p.id} value={p.id} style={Ss}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={L} style={Ls}>
          Description <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <input
          className="forge-input"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="e.g. Ember plan — website build"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={L} style={Ls}>
            Amount (USD) <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            className="forge-input"
            type="number"
            min="1"
            step="0.01"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            placeholder="2499"
            required
          />
        </div>
        <div>
          <label className={L} style={Ls}>
            Invoice type
          </label>
          <select
            className="forge-input"
            value={form.invoice_type}
            onChange={(e) => set("invoice_type", e.target.value)}
            style={Ss}
          >
            <option value="one_time" style={Ss}>
              One-time
            </option>
            <option value="retainer" style={Ss}>
              Retainer
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={L} style={Ls}>
            Status
          </label>
          <select
            className="forge-input"
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            style={Ss}
          >
            {Object.entries(INVOICE_STATUS_LABEL).map(([v, l]) => (
              <option key={v} value={v} style={Ss}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={L} style={Ls}>
            Due date
          </label>
          <input
            className="forge-input"
            type="date"
            value={form.due_date}
            onChange={(e) => set("due_date", e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="btn-fire w-full py-2.5 rounded-xl text-sm font-bold"
        style={{ opacity: saving ? 0.65 : 1 }}
      >
        {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Invoice"}
      </button>
    </form>
  );
}

export function InvoicesClient({
  invoices,
  clients,
  projects,
}: {
  invoices: InvoiceRow[];
  clients: ClientOption[];
  projects: ProjectOption[];
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<InvoiceRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const totalPaid = invoices
    .filter((i) => i.status === "paid")
    .reduce((s, i) => s + Number(i.amount), 0);
  const totalPending = invoices
    .filter((i) => ["sent", "overdue"].includes(i.status))
    .reduce((s, i) => s + Number(i.amount), 0);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(inv: InvoiceRow) {
    setEditing(inv);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }
  function onSuccess() {
    closeModal();
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this invoice? This cannot be undone.")) return;
    setDeletingId(id);
    await fetch("/api/admin/invoices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeletingId(null);
    router.refresh();
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
          >
            Invoices
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {invoices.length} total invoice{invoices.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-fire flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
        >
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {[
          {
            label: "Total Collected",
            value: formatUSD(totalPaid),
            color: "#10B981",
          },
          {
            label: "Outstanding",
            value: formatUSD(totalPending),
            color: "#F59E0B",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl p-5"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              {label}
            </p>
            <p
              className="text-3xl font-black"
              style={{ color, letterSpacing: "-0.03em" }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <table className="w-full">
          <thead>
            <tr
              className="border-b text-left"
              style={{ borderColor: "var(--border)" }}
            >
              {[
                "Description",
                "Client",
                "Project",
                "Amount",
                "Type",
                "Status",
                "Due",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="group transition-colors"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--bg-elevated)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td
                  className="px-5 py-4 text-sm max-w-xs"
                  style={{ color: "var(--text-primary)" }}
                >
                  <p className="truncate">{inv.description}</p>
                </td>
                <td className="px-5 py-4">
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {inv.clients?.name ?? "—"}
                  </p>
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {inv.projects?.name ?? "—"}
                </td>
                <td
                  className="px-5 py-4 text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {formatUSD(Number(inv.amount))}
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-medium capitalize"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {inv.invoice_type.replace("_", "-")}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: `${STATUS_COLOR[inv.status]}18`,
                      color: STATUS_COLOR[inv.status],
                    }}
                  >
                    {INVOICE_STATUS_LABEL[inv.status]}
                  </span>
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {inv.due_date ? formatDate(inv.due_date) : "—"}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(inv)}
                      title="Edit"
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: "var(--bg-elevated)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(inv.id)}
                      disabled={deletingId === inv.id}
                      title="Delete"
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: "rgba(239,68,68,0.12)",
                        color: "#EF4444",
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && (
          <p
            className="text-center py-12 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No invoices yet. Create one above.
          </p>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit Invoice" : "New Invoice"}
      >
        <InvoiceForm
          invoice={editing ?? undefined}
          clients={clients}
          projects={projects}
          onSuccess={onSuccess}
        />
      </Modal>
    </>
  );
}
