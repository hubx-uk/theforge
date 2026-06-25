"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Modal } from "./Modal";
import { formatDate } from "@/lib/utils";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  tag: string;
  read_time: string;
  status: "draft" | "published";
  created_at: string;
}

const TAG_COLORS: Record<string, string> = {
  Engineering: "#4F46E5",
  Design: "var(--accent)",
  SEO: "#10B981",
  Process: "#F59E0B",
};

function BlogPostForm({
  post,
  onSuccess,
}: {
  post?: BlogPost;
  onSuccess: () => void;
}) {
  const isEdit = !!post;
  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    tag: post?.tag ?? "Engineering",
    read_time: post?.read_time ?? "5 min read",
    excerpt: post?.excerpt ?? "",
    body: post?.body ?? "",
    status: post?.status ?? "draft",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Auto-generate slug from title
  function handleTitleChange(val: string) {
    set("title", val);
    if (!isEdit) {
      const slugified = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      set("slug", slugified);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        ...(isEdit ? { id: post.id } : {}),
      };
      const res = await fetch("/api/admin/blog", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error ?? "Something went wrong");
      onSuccess();
    } catch (err: any) {
      setError(err.message ?? "Failed to save");
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

      <div>
        <label className={lbl} style={lbl_s}>
          Title <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <input
          className="forge-input"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g. Setting Up Auth in 20 Minutes"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl} style={lbl_s}>
            Slug <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            className="forge-input"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="nextjs-supabase-auth"
            required
          />
        </div>
        <div>
          <label className={lbl} style={lbl_s}>
            Tag
          </label>
          <select
            className="forge-input"
            value={form.tag}
            onChange={(e) => set("tag", e.target.value)}
            style={sel_s}
          >
            {["Engineering", "Design", "SEO", "Process"].map((tag) => (
              <option key={tag} value={tag} style={sel_s}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl} style={lbl_s}>
            Read time
          </label>
          <input
            className="forge-input"
            value={form.read_time}
            onChange={(e) => set("read_time", e.target.value)}
            placeholder="e.g. 6 min read"
            required
          />
        </div>
        <div>
          <label className={lbl} style={lbl_s}>
            Status
          </label>
          <select
            className="forge-input"
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            style={sel_s}
          >
            <option value="draft" style={sel_s}>
              Draft
            </option>
            <option value="published" style={sel_s}>
              Published
            </option>
          </select>
        </div>
      </div>

      <div>
        <label className={lbl} style={lbl_s}>
          Excerpt <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <textarea
          className="forge-input"
          rows={2}
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          placeholder="A brief preview shown in lists…"
          required
          style={{ resize: "none" }}
        />
      </div>

      <div>
        <label className={lbl} style={lbl_s}>
          Body (Markdown) <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <textarea
          className="forge-input font-mono text-xs leading-relaxed"
          rows={12}
          value={form.body}
          onChange={(e) => set("body", e.target.value)}
          placeholder="Write post content using markdown..."
          required
          style={{ resize: "vertical" }}
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="btn-fire w-full py-2.5 rounded-xl text-sm font-bold"
        style={{ opacity: saving ? 0.65 : 1 }}
      >
        {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Post"}
      </button>
    </form>
  );
}

export function BlogClient({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(p: BlogPost) {
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

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    await fetch("/api/admin/blog", {
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
            Blog Posts
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {posts.length} total posts
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-fire flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
        >
          <Plus className="w-4 h-4" /> New Post
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
              {["Post", "Tag", "Read Time", "Status", "Date", ""].map((h) => (
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
            {posts.map((p) => (
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
                <td className="px-5 py-4 max-w-sm">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="text-xs truncate mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    /{p.slug}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      background: `${TAG_COLORS[p.tag] ?? "#6B7280"}18`,
                      color: TAG_COLORS[p.tag] ?? "#6B7280",
                    }}
                  >
                    {p.tag}
                  </span>
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p.read_time}
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background:
                        p.status === "published"
                          ? "rgba(16,185,129,0.14)"
                          : "var(--bg-elevated)",
                      color:
                        p.status === "published"
                          ? "#10B981"
                          : "var(--text-secondary)",
                    }}
                  >
                    {p.status}
                  </span>
                </td>
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {formatDate(p.created_at)}
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
                      onClick={() => handleDelete(p.id, p.title)}
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
        {posts.length === 0 && (
          <p
            className="text-center py-12 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No blog posts yet. Click create above.
          </p>
        )}
      </div>

      <Modal
        open={modalOpen}
        onCloseAction={closeModal}
        title={editing ? "Edit Post" : "New Post"}
        wide
      >
        <BlogPostForm post={editing ?? undefined} onSuccess={onSuccess} />
      </Modal>
    </>
  );
}
