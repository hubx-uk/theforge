"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({
  open,
  onCloseAction,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onCloseAction: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onCloseAction]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-16 px-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCloseAction}
      />
      <div
        className={`relative z-10 w-full ${wide ? "max-w-2xl" : "max-w-lg"} rounded-2xl`}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h2
            className="text-base font-black"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
          >
            {title}
          </h2>
          <button
            onClick={onCloseAction}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              color: "var(--text-muted)",
              background: "var(--bg-elevated)",
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
