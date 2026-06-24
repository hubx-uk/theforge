"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageShell from "@/components/PageShell";

const PLANS = [
  { id: "spark", label: "Spark", price: "$999", period: "one-time" },
  { id: "ember", label: "Ember", price: "$2,499", period: "one-time" },
  { id: "blaze", label: "Blaze", price: "$4,999", period: "one-time" },
  { id: "inferno", label: "Inferno", price: "$1,499", period: "/month" },
];

function GetStartedForm() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState(searchParams.get("plan") || "blaze");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selected = PLANS.find((p) => p.id === plan)!;

  return (
    <div className="max-w-xl mx-auto px-6 py-40">
      <div className="text-center mb-10">
        <span className="section-label">Start Your Project</span>
        <h1
          className="text-4xl font-black mb-2"
          style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
        >
          Choose Your <span className="text-fire">Plan</span>
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Select a plan and enter your email to begin.
        </p>
      </div>

      {/* Plan picker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {PLANS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlan(p.id)}
            className={`py-4 rounded-xl text-sm font-bold flex flex-col items-center gap-1 border transition-all ${plan === p.id ? "btn-fire border-transparent" : "btn-ghost"}`}
          >
            <span>{p.label}</span>
            <span className="text-xs font-normal opacity-75">{p.price}</span>
          </button>
        ))}
      </div>

      {/* Selected summary */}
      <div
        className="rounded-xl p-4 mb-6 flex items-center justify-between"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div>
          <p className="font-bold" style={{ color: "var(--text-primary)" }}>
            {selected.label} Plan
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Billed {selected.period}
          </p>
        </div>
        <span className="text-xl font-black text-fire">{selected.price}</span>
      </div>

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="forge-input mb-4"
      />

      <button
        onClick={handleCheckout}
        disabled={loading || !email}
        className="btn-fire w-full py-4 rounded-xl text-sm font-bold disabled:opacity-60"
      >
        {loading ? "Redirecting to Stripe…" : "Continue to Checkout →"}
      </button>

      <p
        className="text-center text-xs mt-4"
        style={{ color: "var(--text-muted)" }}
      >
        Secure checkout via Stripe. See our{" "}
        <a href="/refund" style={{ color: "var(--accent)" }}>
          Refund Policy
        </a>
        .
      </p>
    </div>
  );
}

export default function GetStarted() {
  return (
    <PageShell>
      <Suspense
        fallback={
          <div
            className="py-40 text-center"
            style={{ color: "var(--text-muted)" }}
          >
            Loading…
          </div>
        }
      >
        <GetStartedForm />
      </Suspense>
    </PageShell>
  );
}
