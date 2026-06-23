"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const STATS = [
  { number: "120+", label: "Projects Shipped" },
  { number: "5★", label: "Client Rating" },
  { number: "48h", label: "Avg. First Draft" },
  { number: "$0", label: "Template Clichés" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
      hue: number;
    }> = [];

    const spawn = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.9,
        vy: -(Math.random() * 2.2 + 0.8),
        size: Math.random() * 3 + 0.8,
        alpha: Math.random() * 0.65 + 0.2,
        decay: Math.random() * 0.005 + 0.003,
        hue: Math.random() > 0.45 ? 22 : 38,
      });
    };

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.35) spawn();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,60%,${p.alpha})`;
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Bottom-up radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 105%, rgba(254,127,45,0.22), transparent 68%)",
        }}
      />

      {/* Dot-grid — CSS-only, no JS theme dep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(254,127,45,0.18) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.45,
        }}
      />

      {/* Ember canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.55 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
        <div>
          <div
            className="mb-10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 fade-in-up"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-hover)",
            }}
          >
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{
                color: "var(--text-muted)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Now accepting new projects
            </span>
          </div>

          <h1
            className="mb-6 font-black leading-none fade-in-up"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              animationDelay: "0.1s",
              opacity: 0,
              letterSpacing: "-0.04em",
              color: "var(--text-primary)",
            }}
          >
            We Don't Guess
            <br />
            At Growth.
            <br />
            <span className="text-fire">We Forge It!</span>
          </h1>

          <p
            className="mb-10 max-w-xl text-lg md:text-xl fade-in-up"
            style={{
              animationDelay: "0.2s",
              opacity: 0,
              color: "var(--text-secondary)",
              fontFamily: "Inter, sans-serif",
              lineHeight: "1.75",
            }}
          >
            theforge builds the web, mobile, commerce, marketing, and workflow
            systems small and mid-sized businesses run on — measured at every
            step, so every part of the system pulls its weight.
          </p>

          <div
            className="mb-8 flex flex-wrap gap-4 fade-in-up lg:mb-0"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            <Link
              href="/get-started"
              className="btn-fire rounded-xl px-8 py-4 text-base font-bold"
            >
              Start Your Project →
            </Link>
            <Link
              href="/work"
              className="btn-ghost rounded-xl px-8 py-4 text-base font-bold"
            >
              See Our Work
            </Link>
          </div>
        </div>

        <div
          className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl fade-in-up md:grid-cols-4"
          style={{
            animationDelay: "0.4s",
            opacity: 0,
            border: "1px solid var(--border-hover)",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 px-8 py-6"
              style={{
                background: "var(--bg-surface)",
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
              }}
            >
              <span className="stat-number">{stat.number}</span>
              <span
                className="mt-1 text-xs font-semibold uppercase tracking-wider"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--bg-base), transparent)",
        }}
      />
    </section>
  );
}
