"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { Modal } from "./Modal";

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  title: string;
  description: string;
  body: string;
  industry: string;
  tier: "Spark" | "Ember" | "Blaze" | "Inferno" | "Custom";
  color: string;
  tags: string[];
  home_category: string | null;
  home_desc: string | null;
  show_on_home: boolean;
  show_on_work: boolean;
  sort_order: number;
  created_at: string;
}

const TIERS = ["Spark", "Ember", "Blaze", "Inferno", "Custom"] as const;

function splitTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function CaseStudyForm({
  caseStudy,
  onSuccess,
}: {
  caseStudy?: CaseStudy;
  onSuccess: () => void;
}) {
  const isEdit = !!caseStudy;
  const [form, setForm] = useState({
    slug: caseStudy?.slug ?? "",
    client: caseStudy?.client ?? "",
    title: caseStudy?.title ?? "",
    description: caseStudy?.description ?? "",
    body: caseStudy?.body ?? "",
    industry: caseStudy?.industry ?? "",
    tier: caseStudy?.tier ?? "Custom",
    color: caseStudy?.color ?? "#FE7F2D",
    tags: (caseStudy?.tags ?? []).join(", "),
    home_category: caseStudy?.home_category ?? "",
    home_desc: caseStudy?.home_desc ?? "",
    show_on_home: caseStudy?.show_on_home ?? true,
    show_on_work: caseStudy?.show_on_work ?? true,
    sort_order: String(caseStudy?.sort_order ?? 0),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  function handleClientChange(value: string) {
    set("client", value);
    if (!isEdit) set("slug", slugify(value));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        ...(isEdit ? { id: caseStudy.id } : {}),
        tags: splitTags(form.tags),
        sort_order: Number(form.sort_order),
        home_category: form.home_category || null,
        home_desc: form.home_desc || null,
      };

      const res = await fetch("/api/admin/case-studies", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error ?? "Something went wrong");
      onSuccess();
    } catch (err: any) {
      setError(err.message ?? "Failed to save case study");
    } finally {
      setSaving(false);
    }
  }

  const lbl = "block text-xs font-semibold mb-1.5";
  const lbl_s = { color: "var(--text-secondary)" };
  const sel_s = {
    background: "var(--bg-elevated)",
    color: "var(--text-primary)",
  };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl} style={lbl_s}>
            Client <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            className="forge-input"
            value={form.client}
            onChange={(e) => handleClientChange(e.target.value)}
            placeholder="e.g. Jovico World"
            required
          />
        </div>
        <div>
          <label className={lbl} style={lbl_s}>
            Slug <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            className="forge-input"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="jovico"
            required
          />
        </div>
      </div>

      <div>
        <label className={lbl} style={lbl_s}>
          Title <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <input
          className="forge-input"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Case-study headline"
          required
        />
      </div>

      <div>
        <label className={lbl} style={lbl_s}>
          Summary <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <textarea
          className="forge-input"
          rows={3}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Short description shown on cards and the case-study hero."
          required
          style={{ resize: "vertical" }}
        />
      </div>

      <div>
        <label className={lbl} style={lbl_s}>
          Body (Markdown) <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <textarea
          className="forge-input font-mono text-xs leading-relaxed"
          rows={14}
          value={form.body}
          onChange={(e) => set("body", e.target.value)}
          placeholder="## The Challenge&#10;&#10;Describe the project, approach, and outcome..."
          required
          style={{ resize: "vertical" }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={lbl} style={lbl_s}>
            Industry
          </label>
          <input
            className="forge-input"
            value={form.industry}
            onChange={(e) => set("industry", e.target.value)}
            placeholder="E-Commerce / Retail"
            required
          />
        </div>
        <div>
          <label className={lbl} style={lbl_s}>
            Tier
          </label>
          <select
            className="forge-input"
            value={form.tier}
            onChange={(e) => set("tier", e.target.value)}
            style={sel_s}
          >
            {TIERS.map((tier) => (
              <option key={tier} value={tier} style={sel_s}>
                {tier}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={lbl} style={lbl_s}>
            Accent
          </label>
          <input
            className="forge-input"
            value={form.color}
            onChange={(e) => set("color", e.target.value)}
            placeholder="#FE7F2D"
            required
          />
        </div>
      </div>

      <div>
        <label className={lbl} style={lbl_s}>
          Tags
        </label>
        <input
          className="forge-input"
          value={form.tags}
          onChange={(e) => set("tags", e.target.value)}
          placeholder="Next.js, Supabase, Stripe"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl} style={lbl_s}>
            Home category
          </label>
          <input
            className="forge-input"
            value={form.home_category}
            onChange={(e) => set("home_category", e.target.value)}
            placeholder="Web App / Supabase / Stripe"
          />
        </div>
        <div>
          <label className={lbl} style={lbl_s}>
            Sort order
          </label>
          <input
            className="forge-input"
            type="number"
            value={form.sort_order}
            onChange={(e) => set("sort_order", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={lbl} style={lbl_s}>
          Home card description
        </label>
        <textarea
          className="forge-input"
          rows={2}
          value={form.home_desc}
          onChange={(e) => set("home_desc", e.target.value)}
          style={{ resize: "vertical" }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--text-secondary)",
          }}
        >
          <input
            type="checkbox"
            checked={form.show_on_home}
            onChange={(e) => set("show_on_home", e.target.checked)}
          />
          Show on homepage
        </label>
        <label
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--text-secondary)",
          }}
        >
          <input
            type="checkbox"
            checked={form.show_on_work}
            onChange={(e) => set("show_on_work", e.target.checked)}
          />
          Show on work page
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="btn-fire w-full py-2.5 rounded-xl text-sm font-bold"
        style={{ opacity: saving ? 0.65 : 1 }}
      >
        {saving
          ? "Saving..."
          : isEdit
            ? "Save Case Study"
            : "Create Case Study"}
      </button>
    </form>
  );
}

export function CaseStudiesClient({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(item: CaseStudy) {
    setEditing(item);
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

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    await fetch("/api/admin/case-studies", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeletingId(null);
    router.refresh();
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
          >
            Case Studies
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {caseStudies.length} editable case studies
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-fire flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
        >
          <Plus className="w-4 h-4" /> New Case Study
        </button>
      </div>

      <div
        className="rounded-2xl overflow-x-auto"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <table className="w-full min-w-[920px]">
          <thead>
            <tr
              className="border-b text-left"
              style={{ borderColor: "var(--border)" }}
            >
              {["Case Study", "Tier", "Surfaces", "Tags", "Order", ""].map(
                (h) => (
                  <th
                    key={h}
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
            {caseStudies.map((item) => (
              <tr
                key={item.id}
                className="group transition-colors"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--bg-elevated)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td className="px-5 py-4 max-w-md">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-xs truncate mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.client} /work/{item.slug}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${item.color}18`,
                      color: item.color,
                    }}
                  >
                    {item.tier}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <span
                      title="Homepage"
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: "var(--bg-elevated)",
                        color: item.show_on_home
                          ? "var(--accent)"
                          : "var(--text-muted)",
                      }}
                    >
                      {item.show_on_home ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                    </span>
                    <span
                      title="Work page"
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: "var(--bg-elevated)",
                        color: item.show_on_work
                          ? "var(--accent)"
                          : "var(--text-muted)",
                      }}
                    >
                      {item.show_on_work ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p
                    className="text-xs max-w-xs truncate"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.tags.join(", ") || "No tags"}
                  </p>
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.sort_order}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(item)}
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
                      onClick={() => handleDelete(item.id, item.title)}
                      disabled={deletingId === item.id}
                      title="Delete"
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: "rgba(239,68,68,0.12)",
                        color: "#EF4444",
                        opacity: deletingId === item.id ? 0.5 : 1,
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {caseStudies.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  No case studies yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen}
        onCloseAction={closeModal}
        title={editing ? "Edit Case Study" : "New Case Study"}
        wide
      >
        <CaseStudyForm caseStudy={editing ?? undefined} onSuccess={onSuccess} />
      </Modal>
    </>
  );
}
