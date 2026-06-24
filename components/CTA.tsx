"use client";

import { useEffect, useState } from "react";

const WORK_OPTIONS = [
  { value: "web-apps", label: "Web apps" },
  { value: "mobile-apps", label: "Mobile apps" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "seo", label: "SEO" },
  { value: "paid-ads", label: "Paid ads" },
  { value: "content", label: "Content" },
  { value: "automation", label: "Automation" },
  { value: "crm-setup", label: "CRM setup" },
  { value: "analytics", label: "Analytics" },
  { value: "not-sure", label: "Not sure yet" },
];

export default function CTA() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    workNeeds: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get(
      "service",
    );
    if (
      requestedService &&
      WORK_OPTIONS.some((o) => o.value === requestedService)
    ) {
      setForm((f) => ({ ...f, workNeeds: requestedService }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }

      setStatus("success");
      setForm({ name: "", company: "", email: "", workNeeds: "", message: "" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <section className="py-28" style={{ background: "var(--bg-surface)" }}>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="section-label">Ready to Build?</span>
        <h2
          className="mb-4 text-4xl font-black md:text-5xl"
          style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
        >
          Let&apos;s <span className="text-fire">Forge Something</span> Great
        </h2>
        <p
          className="mx-auto mb-12 max-w-md"
          style={{ color: "var(--text-secondary)" }}
        >
          Tell us what needs work. We&apos;ll respond within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-name"
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="forge-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-company"
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Company{" "}
                <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Company or organisation"
                className="forge-input"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-email"
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@company.com"
                className="forge-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-work"
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                What needs work?
              </label>
              <select
                id="contact-work"
                name="workNeeds"
                required
                value={form.workNeeds}
                onChange={(e) =>
                  setForm({ ...form, workNeeds: e.target.value })
                }
                className="forge-input"
                style={{
                  background: "var(--bg-elevated)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {WORK_OPTIONS.map((o) => (
                  <option
                    key={o.value}
                    value={o.value}
                    style={{ background: "var(--bg-elevated)" }}
                  >
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-message"
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What is happening now, and what would better look like?"
              className="forge-input resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-fire flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send it to theforge"}
          </button>

          {status === "success" && (
            <p
              className="text-center text-sm font-medium"
              style={{ color: "#16A34A" }}
            >
              ✓ Sent! We&apos;ll be in touch within 24 hours.
            </p>
          )}

          {status === "error" && (
            <p
              className="text-center text-sm font-medium"
              style={{ color: "var(--accent)" }}
            >
              {errorMsg ||
                "Something went wrong — email us at hello@theforge.io"}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
