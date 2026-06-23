"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Building2, Mail, Phone } from "lucide-react";
import { Modal } from "./Modal";
import { formatDate } from "@/lib/utils";

export interface ClientRow {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  created_at: string;
}

function ClientForm({
  client,
  onSuccess,
}: {
  client?: ClientRow;
  onSuccess: () => void;
}) {
  const isEdit = !!client;
  const [form, setForm] = useState({
    name: client?.name ?? "",
    email: client?.email ?? "",
    password: "",
    company: client?.company ?? "",
    phone: client?.phone ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload: Record<string, unknown> = {
        name: form.name,
        email: form.email,
        company: form.company || null,
        phone: form.phone || null,
        ...(isEdit ? { id: client!.id } : { password: form.password }),
      };
      const res = await fetch("/api/admin/clients", {
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
          Full name <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <input
          className="forge-input"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Jane Smith"
          required
        />
      </div>

      <div>
        <label className={L} style={Ls}>
          Email address <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <input
          className="forge-input"
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="jane@example.com"
          required
        />
      </div>

      {!isEdit && (
        <div>
          <label className={L} style={Ls}>
            Portal password <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            className="forge-input"
            type="password"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            placeholder="Min. 8 characters"
            required
            minLength={8}
          />
          <p className="mt-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
            Client uses this to log in to the client portal.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={L} style={Ls}>
            Company
          </label>
          <input
            className="forge-input"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Acme Corp"
          />
        </div>
        <div>
          <label className={L} style={Ls}>
            Phone
          </label>
          <input
            className="forge-input"
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+1 555 000 0000"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="btn-fire w-full py-2.5 rounded-xl text-sm font-bold"
        style={{ opacity: saving ? 0.65 : 1 }}
      >
        {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Client"}
      </button>
    </form>
  );
}

export function ClientsClient({ clients }: { clients: ClientRow[] }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ClientRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(c: ClientRow) {
    setEditing(c);
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
    if (!confirm(`Delete "${name}"? This will remove their portal access.`))
      return;
    setDeletingId(id);
    await fetch("/api/admin/clients", {
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
            Clients
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {clients.length} registered client{clients.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-fire flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
        >
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {clients.map((c) => (
          <div
            key={c.id}
            className="group rounded-2xl p-5 flex flex-col gap-3"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: "var(--accent)" }}
                >
                  {c.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-sm font-bold truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.name}
                  </p>
                  {c.company && (
                    <div className="flex items-center gap-1">
                      <Building2
                        className="w-3 h-3 shrink-0"
                        style={{ color: "var(--text-muted)" }}
                      />
                      <p
                        className="text-xs truncate"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {c.company}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={() => openEdit(c)}
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
                  onClick={() => handleDelete(c.id, c.name)}
                  disabled={deletingId === c.id}
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
            </div>

            <div className="divider" />

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Mail
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: "var(--text-muted)" }}
                />
                <p
                  className="text-xs truncate"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {c.email}
                </p>
              </div>
              {c.phone && (
                <div className="flex items-center gap-2">
                  <Phone
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: "var(--text-muted)" }}
                  />
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {c.phone}
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs pt-1" style={{ color: "var(--text-muted)" }}>
              Since {formatDate(c.created_at)}
            </p>
          </div>
        ))}

        {clients.length === 0 && (
          <p
            className="col-span-3 text-center py-12 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No clients yet. Add one above.
          </p>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit Client" : "Add Client"}
      >
        <ClientForm client={editing ?? undefined} onSuccess={onSuccess} />
      </Modal>
    </>
  );
}
