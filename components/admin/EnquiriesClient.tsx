"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, ExternalLink, Mail } from "lucide-react";
import { Modal } from "./Modal";
import { formatDate } from "@/lib/utils";

export interface Enquiry {
  id: string;
  name: string;
  company: string | null;
  email: string;
  work_needed: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  notes: string | null;
  created_at: string;
}

type Filter = "all" | "new" | "read" | "replied" | "archived";

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  new: { label: "New", color: "#FE7F2D", bg: "rgba(254,127,45,0.14)" },
  read: { label: "Read", color: "#3B82F6", bg: "rgba(59,130,246,0.14)" },
  replied: { label: "Replied", color: "#10B981", bg: "rgba(16,185,129,0.14)" },
  archived: {
    label: "Archived",
    color: "#6B7280",
    bg: "rgba(107,114,128,0.14)",
  },
};

const WORK_LABEL: Record<string, string> = {
  "web-apps": "Web App",
  "mobile-apps": "Mobile App",
  ecommerce: "E-commerce",
  seo: "SEO",
  "paid-ads": "Paid Ads",
  content: "Content",
  automation: "Automation",
  "crm-setup": "CRM Setup",
  analytics: "Analytics",
  "not-sure": "Not sure yet",
};

export function EnquiriesClient({ enquiries }: { enquiries: Enquiry[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [editStatus, setEditStatus] = useState<string>("new");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const counts: Record<string, number> = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    read: enquiries.filter((e) => e.status === "read").length,
    replied: enquiries.filter((e) => e.status === "replied").length,
    archived: enquiries.filter((e) => e.status === "archived").length,
  };

  const visible =
    filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter);

  async function openEnquiry(e: Enquiry) {
    setSelected(e);
    setEditStatus(e.status === "new" ? "read" : e.status);
    setEditNotes(e.notes ?? "");
    // auto-mark new → read silently
    if (e.status === "new") {
      await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: e.id, status: "read" }),
      });
      router.refresh();
    }
  }

  function closeModal() {
    setSelected(null);
    setEditStatus("new");
    setEditNotes("");
  }

  async function saveChanges() {
    if (!selected) return;
    setSaving(true);
    await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selected.id,
        status: editStatus,
        notes: editNotes || null,
      }),
    });
    setSaving(false);
    closeModal();
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this enquiry permanently?")) return;
    setDeletingId(id);
    await fetch("/api/admin/enquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeletingId(null);
    router.refresh();
  }

  const FILTERS: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "read", label: "Read" },
    { key: "replied", label: "Replied" },
    { key: "archived", label: "Archived" },
  ];

  return (
    <>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
          >
            Enquiries
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {counts.new} unread · {counts.all} total
          </p>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div
        className="flex items-center gap-1 mb-6 p-1 rounded-xl w-fit"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
        }}
      >
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: filter === key ? "var(--bg-surface)" : "transparent",
              color:
                filter === key ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: filter === key ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
            }}
          >
            {label}
            {counts[key] > 0 && (
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  background:
                    key === "new" && counts.new > 0
                      ? "var(--accent)"
                      : "var(--bg-elevated)",
                  color:
                    key === "new" && counts.new > 0
                      ? "var(--on-accent)"
                      : "var(--text-muted)",
                }}
              >
                {counts[key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
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
              {["", "Name", "Service", "Company", "Date", "Status", ""].map(
                (h, i) => (
                  <th
                    key={i}
                    className="px-5 py-3.5 text-xs font-bold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
            {visible.map((e) => {
              const sc = STATUS_CONFIG[e.status];
              return (
                <tr
                  key={e.id}
                  className="group cursor-pointer transition-colors"
                  onClick={() => openEnquiry(e)}
                  onMouseEnter={(ev) =>
                    (ev.currentTarget.style.background = "var(--bg-elevated)")
                  }
                  onMouseLeave={(ev) =>
                    (ev.currentTarget.style.background = "transparent")
                  }
                >
                  {/* Unread dot */}
                  <td className="pl-5 pr-2 py-4 w-6">
                    {e.status === "new" && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                  </td>
                  {/* Name + email */}
                  <td className="px-3 py-4">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {e.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {e.email}
                    </p>
                  </td>
                  {/* Service */}
                  <td
                    className="px-3 py-4 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {WORK_LABEL[e.work_needed] ?? e.work_needed}
                  </td>
                  {/* Company */}
                  <td
                    className="px-3 py-4 text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {e.company || "—"}
                  </td>
                  {/* Date */}
                  <td
                    className="px-3 py-4 text-sm whitespace-nowrap"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {formatDate(e.created_at)}
                  </td>
                  {/* Status badge */}
                  <td className="px-3 py-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: sc.bg, color: sc.color }}
                    >
                      {sc.label}
                    </span>
                  </td>
                  {/* Delete */}
                  <td className="px-4 py-4">
                    <button
                      onClick={(ev) => {
                        ev.stopPropagation();
                        handleDelete(e.id);
                      }}
                      disabled={deletingId === e.id}
                      title="Delete"
                      className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: "rgba(239,68,68,0.12)",
                        color: "#EF4444",
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {visible.length === 0 && (
          <p
            className="text-center py-14 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {filter === "all" ? "No enquiries yet." : `No ${filter} enquiries.`}
          </p>
        )}
      </div>

      {/* ── Detail modal ── */}
      <Modal open={!!selected} onClose={closeModal} title="Enquiry" wide>
        {selected && (
          <div className="space-y-5">
            {/* Contact info */}
            <div
              className="rounded-xl p-4 flex flex-col gap-2"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="font-bold text-base"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selected.name}
                  </p>
                  {selected.company && (
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {selected.company}
                    </p>
                  )}
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full shrink-0 font-semibold"
                  style={{
                    background: STATUS_CONFIG[selected.status].bg,
                    color: STATUS_CONFIG[selected.status].color,
                  }}
                >
                  {STATUS_CONFIG[selected.status].label}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`mailto:${selected.email}`}
                  className="flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: "var(--accent)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail className="w-3.5 h-3.5" />
                  {selected.email}
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {formatDate(selected.created_at)}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "var(--bg-surface)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {WORK_LABEL[selected.work_needed] ?? selected.work_needed}
                </span>
              </div>
            </div>

            {/* Message */}
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Message
              </p>
              <div
                className="rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  maxHeight: 220,
                  overflowY: "auto",
                }}
              >
                {selected.message}
              </div>
            </div>

            {/* Status + notes */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Status
                </label>
                <select
                  className="forge-input"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  style={{
                    background: "var(--bg-elevated)",
                    color: "var(--text-primary)",
                  }}
                >
                  {Object.entries(STATUS_CONFIG).map(([v, { label }]) => (
                    <option
                      key={v}
                      value={v}
                      style={{ background: "var(--bg-elevated)" }}
                    >
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Internal notes
              </label>
              <textarea
                className="forge-input"
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Notes visible only to the admin team…"
                style={{ resize: "vertical" }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1 gap-3">
              <a
                href={`mailto:${selected.email}?subject=Re: Your enquiry about ${WORK_LABEL[selected.work_needed] ?? selected.work_needed}`}
                className="btn-fire flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                onClick={() => setEditStatus("replied")}
              >
                <Mail className="w-4 h-4" /> Reply by email
              </a>
              <div className="flex items-center gap-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium"
                  style={{
                    color: "var(--text-secondary)",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={saveChanges}
                  disabled={saving}
                  className="btn-fire px-5 py-2.5 rounded-xl text-sm font-bold"
                  style={{ opacity: saving ? 0.65 : 1 }}
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
