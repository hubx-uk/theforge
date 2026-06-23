"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Modal } from "./Modal";
import { formatDate, formatUSD, PROJECT_STATUS_LABEL } from "@/lib/utils";

export interface ClientOption {
  id: string;
  name: string;
  email: string;
}
export interface ProjectRow {
  id: string;
  name: string;
  client_id: string | null;
  plan_tier: string;
  billing_type: string;
  status: string;
  budget: number | null;
  retainer_amount: number | null;
  start_date: string | null;
  target_date: string | null;
  description: string | null;
  clients: { name: string; email: string } | null;
}

const STATUS_COLOR: Record<string, string> = {
  discovery: "#6366F1",
  in_progress: "#F59E0B",
  review: "#3B82F6",
  completed: "#10B981",
  on_hold: "#6B7280",
};
const TIER_COLOR: Record<string, string> = {
  spark: "#94A3B8",
  ember: "#F59E0B",
  blaze: "#FE7F2D",
  inferno: "#D9591A",
  custom: "#6366F1",
};

function ProjectForm({
  project,
  clients,
  onSuccess,
}: {
  project?: ProjectRow;
  clients: ClientOption[];
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    name: project?.name ?? "",
    client_id: project?.client_id ?? "",
    plan_tier: project?.plan_tier ?? "custom",
    billing_type: project?.billing_type ?? "one_time",
    status: project?.status ?? "discovery",
    budget: project?.budget?.toString() ?? "",
    retainer_amount: project?.retainer_amount?.toString() ?? "",
    target_date: project?.target_date ? project.target_date.split("T")[0] : "",
    description: project?.description ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name,
        client_id: form.client_id || null,
        plan_tier: form.plan_tier,
        billing_type: form.billing_type,
        status: form.status,
        budget: form.budget ? Number(form.budget) : null,
        retainer_amount: form.retainer_amount
          ? Number(form.retainer_amount)
          : null,
        target_date: form.target_date || null,
        description: form.description || null,
        ...(project ? { id: project.id } : {}),
      };
      const res = await fetch("/api/admin/projects", {
        method: project ? "PATCH" : "POST",
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
          Project name <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <input
          className="forge-input"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Acme Corp Website"
          required
        />
      </div>
      <div>
        <label className={L} style={Ls}>
          Client
        </label>
        <select
          className="forge-input"
          value={form.client_id}
          onChange={(e) => set("client_id", e.target.value)}
          style={Ss}
        >
          <option value="">— No client —</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id} style={Ss}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={L} style={Ls}>
            Plan tier
          </label>
          <select
            className="forge-input"
            value={form.plan_tier}
            onChange={(e) => set("plan_tier", e.target.value)}
            style={Ss}
          >
            {["spark", "ember", "blaze", "inferno", "custom"].map((t) => (
              <option key={t} value={t} style={Ss}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={L} style={Ls}>
            Billing type
          </label>
          <select
            className="forge-input"
            value={form.billing_type}
            onChange={(e) => set("billing_type", e.target.value)}
            style={Ss}
          >
            <option value="one_time" style={Ss}>
              One-time
            </option>
            <option value="retainer" style={Ss}>
              Retainer
            </option>
            <option value="both" style={Ss}>
              Both
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
            {Object.entries(PROJECT_STATUS_LABEL).map(([v, l]) => (
              <option key={v} value={v} style={Ss}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={L} style={Ls}>
            Budget (USD)
          </label>
          <input
            className="forge-input"
            type="number"
            min="0"
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
            placeholder="2499"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={L} style={Ls}>
            Retainer / mo (USD)
          </label>
          <input
            className="forge-input"
            type="number"
            min="0"
            value={form.retainer_amount}
            onChange={(e) => set("retainer_amount", e.target.value)}
            placeholder="799"
          />
        </div>
        <div>
          <label className={L} style={Ls}>
            Target date
          </label>
          <input
            className="forge-input"
            type="date"
            value={form.target_date}
            onChange={(e) => set("target_date", e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className={L} style={Ls}>
          Description
        </label>
        <textarea
          className="forge-input"
          rows={3}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Brief overview…"
          style={{ resize: "vertical" }}
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="btn-fire w-full py-2.5 rounded-xl text-sm font-bold"
        style={{ opacity: saving ? 0.65 : 1 }}
      >
        {saving ? "Saving…" : project ? "Save Changes" : "Create Project"}
      </button>
    </form>
  );
}

export function ProjectsClient({
  projects,
  clients,
}: {
  projects: ProjectRow[];
  clients: ClientOption[];
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(p: ProjectRow) {
    setEditing(p);
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
  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeletingId(null);
    router.refresh();
  }
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
          >
            Projects
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {projects.length} total project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-fire flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
        >
          <Plus className="w-4 h-4" /> New Project
        </button>
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
                "Project",
                "Client",
                "Plan",
                "Budget",
                "Status",
                "Target",
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
            {projects.map((p) => (
              <tr
                key={p.id}
                className="group transition-colors"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--bg-elevated)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td className="px-5 py-4">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {p.name}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {p.clients?.name ?? "—"}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {p.clients?.email ?? ""}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                    style={{
                      background: `${TIER_COLOR[p.plan_tier] ?? "#6B7280"}18`,
                      color: TIER_COLOR[p.plan_tier] ?? "#6B7280",
                    }}
                  >
                    {p.plan_tier}
                  </span>
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p.budget ? formatUSD(p.budget) : "—"}
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: `${STATUS_COLOR[p.status]}18`,
                      color: STATUS_COLOR[p.status],
                    }}
                  >
                    {PROJECT_STATUS_LABEL[p.status]}
                  </span>
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {p.target_date ? formatDate(p.target_date) : "—"}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(p)}
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
                      onClick={() => handleDelete(p.id, p.name)}
                      disabled={deletingId === p.id}
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
        {projects.length === 0 && (
          <p
            className="text-center py-12 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No projects yet. Create one above.
          </p>
        )}
      </div>
      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit Project" : "New Project"}
      >
        <ProjectForm
          project={editing ?? undefined}
          clients={clients}
          onSuccess={onSuccess}
        />
      </Modal>
    </>
  );
}
