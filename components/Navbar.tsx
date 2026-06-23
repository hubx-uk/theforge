"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  ChevronDown,
  CircleHelp,
  Code2,
  FileText,
  Gauge,
  Megaphone,
  PanelsTopLeft,
  Rocket,
  Search,
  ShoppingBag,
  Smartphone,
  Workflow,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import ForgeLogo from "./ForgeLogo";

type Dropdown = "services" | "work" | "resources";

const SERVICE_GROUPS = [
  {
    title: "Development",
    eyebrow: "Build",
    items: [
      {
        label: "Web apps",
        desc: "Fast, scalable digital products",
        href: "/services/web-apps",
        icon: PanelsTopLeft,
      },
      {
        label: "Mobile apps",
        desc: "Useful products for iOS and Android",
        href: "/services/mobile-apps",
        icon: Smartphone,
      },
      {
        label: "E-commerce",
        desc: "Shopify and WooCommerce stores",
        href: "/services/ecommerce",
        icon: ShoppingBag,
      },
    ],
  },
  {
    title: "Marketing",
    eyebrow: "Grow",
    items: [
      {
        label: "SEO",
        desc: "Technical and content-led growth",
        href: "/services/seo",
        icon: Search,
      },
      {
        label: "Paid ads",
        desc: "Campaigns built to convert",
        href: "/services/paid-ads",
        icon: Megaphone,
      },
      {
        label: "Content",
        desc: "Clear stories that earn attention",
        href: "/services/content",
        icon: FileText,
      },
    ],
  },
  {
    title: "Workflow",
    eyebrow: "Scale",
    items: [
      {
        label: "Automation",
        desc: "Connect tools and remove busywork",
        href: "/services/automation",
        icon: Workflow,
      },
      {
        label: "CRM setup",
        desc: "A clean system for every lead",
        href: "/services/crm-setup",
        icon: Gauge,
      },
      {
        label: "Analytics",
        desc: "Decision-ready reporting",
        href: "/services/analytics",
        icon: BarChart3,
      },
    ],
  },
];

const RESOURCES = [
  {
    label: "Blog",
    desc: "Ideas for building and growing",
    href: "/blog",
    icon: FileText,
  },
  {
    label: "Pricing",
    desc: "Straightforward ways to work together",
    href: "/pricing",
    icon: Gauge,
  },
  {
    label: "Help & FAQs",
    desc: "Quick answers before we get started",
    href: "/help",
    icon: CircleHelp,
  },
];

const PHASES = ["Diagnose", "Build", "Launch", "Measure & refine", "Repeat"];

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function DropdownButton({
  label,
  open,
  onClick,
}: {
  label: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="nav-link flex items-center gap-1"
      aria-expanded={open}
      onClick={onClick}
    >
      {label}
      <ChevronDown
        className="h-3 w-3 transition-transform duration-200"
        style={{ transform: open ? "rotate(180deg)" : undefined }}
      />
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Dropdown | null>(null);
  const [mobileSection, setMobileSection] = useState<Dropdown | null>(null);
  const { theme, toggle } = useTheme();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = (name: Dropdown) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);
  };

  const toggleDropdown = (name: Dropdown) =>
    setOpenDropdown((current) => (current === name ? null : name));
  const closeMobile = () => {
    setMenuOpen(false);
    setMobileSection(null);
  };

  const surface =
    theme === "dark" ? "rgba(23,42,54,0.88)" : "rgba(255,255,255,0.9)";

  return (
    <header
      className="fixed z-50 left-0 right-0"
      style={{
        top: scrolled ? 16 : 0,
        transition: "top 0.4s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: "none",
      }}
    >
      <div
        className="hidden lg:flex items-center mx-auto"
        style={{
          pointerEvents: "auto",
          maxWidth: scrolled ? 960 : "100%",
          borderRadius: scrolled ? 9999 : 0,
          padding: scrolled ? "0 0.60rem" : "0 2rem",
          height: scrolled ? 56 : 72,
          background: scrolled ? surface : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(1.8)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.8)" : "none",
          border: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,0.18)" : "none",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <Link
          href="/"
          className="shrink-0 mr-auto ml-2 flex items-center gap-2"
          style={{ letterSpacing: "-0.03em" }}
        >
          <ForgeLogo size={scrolled ? 24 : 28} />
          <span
            className="font-black select-none"
            style={{
              fontSize: scrolled ? "1.2rem" : "1.5rem",
              transition: "font-size 0.4s ease",
            }}
          >
            <span style={{ color: "var(--accent)" }}>the</span>
            <span style={{ color: "var(--text-primary)" }}>forge</span>
          </span>
        </Link>

        <nav
          className="relative flex items-center gap-5 mx-auto"
          aria-label="Main navigation"
        >
          <div
            className="static"
            onMouseEnter={() => open("services")}
            onMouseLeave={scheduleClose}
          >
            <DropdownButton
              label="Services"
              open={openDropdown === "services"}
              onClick={() => toggleDropdown("services")}
            />
            {openDropdown === "services" && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[820px] rounded-3xl p-3 shadow-2xl"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={() => open("services")}
                onMouseLeave={scheduleClose}
              >
                <div className="grid grid-cols-3 gap-2">
                  {SERVICE_GROUPS.map((group) => (
                    <div
                      key={group.title}
                      className="rounded-2xl p-3"
                      style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div
                        className="px-2 pb-3 mb-1"
                        style={{ borderBottom: "1px solid var(--border)" }}
                      >
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.18em]"
                          style={{ color: "var(--accent)" }}
                        >
                          {group.eyebrow}
                        </span>
                        <p
                          className="font-bold mt-0.5"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {group.title}
                        </p>
                      </div>
                      {group.items.map(({ label, desc, href, icon: Icon }) => (
                        <Link
                          key={label}
                          href={href}
                          className="group flex gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-[var(--accent-glow)]"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span
                            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                            style={{
                              background: "var(--accent-glow)",
                              color: "var(--accent)",
                            }}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span>
                            <span
                              className="block text-sm font-semibold"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {label}
                            </span>
                            <span
                              className="mt-0.5 block text-[11px] leading-4"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {desc}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <Link
                  href="/services"
                  className="mt-2 flex items-center justify-between rounded-2xl px-5 py-3 text-sm font-semibold"
                  style={{
                    color: "var(--text-primary)",
                    background: "var(--accent-glow)",
                  }}
                  onClick={() => setOpenDropdown(null)}
                >
                  Explore every capability{" "}
                  <span style={{ color: "var(--accent)" }}>
                    View services →
                  </span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="nav-link">
            About
          </Link>

          <div
            className="static"
            onMouseEnter={() => open("work")}
            onMouseLeave={scheduleClose}
          >
            <DropdownButton
              label="Work"
              open={openDropdown === "work"}
              onClick={() => toggleDropdown("work")}
            />
            {openDropdown === "work" && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] rounded-3xl p-3 shadow-2xl"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={() => open("work")}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href="/work/approach"
                  className="block rounded-2xl p-5 transition-colors hover:bg-[var(--accent-glow)]"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                  onClick={() => setOpenDropdown(null)}
                >
                  <span
                    className="flex items-center gap-2 font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Rocket
                      className="h-4 w-4"
                      style={{ color: "var(--accent)" }}
                    />{" "}
                    Our approach
                  </span>
                  <span
                    className="mt-1 block text-xs leading-5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    One continuous system that turns the right problem into
                    measurable progress.
                  </span>
                  <span className="mt-4 flex items-center gap-1.5 overflow-hidden">
                    {PHASES.map((phase, index) => (
                      <span
                        key={phase}
                        className="flex items-center gap-1.5 whitespace-nowrap text-[10px] font-semibold"
                        style={{
                          color:
                            index === 0
                              ? "var(--accent)"
                              : "var(--text-secondary)",
                        }}
                      >
                        {phase}
                        {index < PHASES.length - 1 && (
                          <span style={{ color: "var(--border-hover)" }}>
                            →
                          </span>
                        )}
                      </span>
                    ))}
                  </span>
                </Link>
                <Link
                  href="/work"
                  className="mt-2 flex items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-[var(--accent-glow)]"
                  onClick={() => setOpenDropdown(null)}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      background: "var(--accent-glow)",
                      color: "var(--accent)",
                    }}
                  >
                    <Code2 className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span
                      className="block text-sm font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Case studies
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      See the products and results we have delivered.
                    </span>
                  </span>
                  <span style={{ color: "var(--accent)" }}>→</span>
                </Link>
              </div>
            )}
          </div>

          <div
            className="static"
            onMouseEnter={() => open("resources")}
            onMouseLeave={scheduleClose}
          >
            <DropdownButton
              label="Resources"
              open={openDropdown === "resources"}
              onClick={() => toggleDropdown("resources")}
            />
            {openDropdown === "resources" && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[340px] rounded-3xl p-3 shadow-2xl"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={() => open("resources")}
                onMouseLeave={scheduleClose}
              >
                {RESOURCES.map(({ label, desc, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-[var(--accent-glow)]"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{
                        background: "var(--accent-glow)",
                        color: "var(--accent)",
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span
                        className="block text-sm font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {label}
                      </span>
                      <span
                        className="text-[11px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {desc}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2 ml-auto shrink-0">
          <button
            onClick={toggle}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link
            href="/get-started"
            className="btn-fire px-4 py-2 rounded-full text-sm whitespace-nowrap"
          >
            Get started →
          </Link>
        </div>
      </div>

      <div
        className={`lg:hidden flex items-center justify-between px-4 mx-4 ${menuOpen ? "rounded-t-3xl" : "rounded-full"}`}
        style={{
          pointerEvents: "auto",
          height: 54,
          background: scrolled || menuOpen ? surface : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          border:
            scrolled || menuOpen
              ? "1px solid var(--border)"
              : "1px solid transparent",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ letterSpacing: "-0.03em" }}
          onClick={closeMobile}
        >
          <ForgeLogo size={22} />
          <span className="text-xl font-black">
            <span style={{ color: "var(--accent)" }}>the</span>
            <span style={{ color: "var(--text-primary)" }}>forge</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  background: "var(--text-primary)",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(4px,4px)"
                      : i === 1
                        ? "scaleX(0)"
                        : "rotate(-45deg) translate(4px,-4px)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden mx-4 max-h-[calc(100vh-88px)] overflow-y-auto rounded-b-3xl px-4 pb-5 pt-3"
          style={{
            pointerEvents: "auto",
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderTop: 0,
          }}
        >
          <MobileSection
            label="Services"
            open={mobileSection === "services"}
            onClick={() =>
              setMobileSection((value) =>
                value === "services" ? null : "services",
              )
            }
          >
            {SERVICE_GROUPS.map((group) => (
              <div key={group.title} className="mb-4">
                <p
                  className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: "var(--accent)" }}
                >
                  {group.title}
                </p>
                {group.items.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="block rounded-xl px-3 py-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                    onClick={closeMobile}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </MobileSection>
          <Link
            href="/about"
            className="block border-b px-2 py-3.5 text-sm font-semibold"
            style={{
              color: "var(--text-primary)",
              borderColor: "var(--border)",
            }}
            onClick={closeMobile}
          >
            About
          </Link>
          <MobileSection
            label="Work"
            open={mobileSection === "work"}
            onClick={() =>
              setMobileSection((value) => (value === "work" ? null : "work"))
            }
          >
            <Link
              href="/work/approach"
              className="block rounded-xl px-3 py-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
              onClick={closeMobile}
            >
              Our approach
            </Link>
            <Link
              href="/work"
              className="block rounded-xl px-3 py-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
              onClick={closeMobile}
            >
              Case studies
            </Link>
          </MobileSection>
          <MobileSection
            label="Resources"
            open={mobileSection === "resources"}
            onClick={() =>
              setMobileSection((value) =>
                value === "resources" ? null : "resources",
              )
            }
          >
            {RESOURCES.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block rounded-xl px-3 py-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
                onClick={closeMobile}
              >
                {label}
              </Link>
            ))}
          </MobileSection>
          <Link
            href="/contact"
            className="block border-b px-2 py-3.5 text-sm font-semibold"
            style={{
              color: "var(--text-primary)",
              borderColor: "var(--border)",
            }}
            onClick={closeMobile}
          >
            Contact
          </Link>
          <Link
            href="/get-started"
            className="btn-fire mt-4 block rounded-xl py-3 text-center text-sm"
            onClick={closeMobile}
          >
            Get started →
          </Link>
        </div>
      )}
    </header>
  );
}

function MobileSection({
  label,
  open,
  onClick,
  children,
}: {
  label: string;
  open: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      <button
        className="flex w-full items-center justify-between px-2 py-3.5 text-sm font-semibold"
        style={{ color: "var(--text-primary)" }}
        onClick={onClick}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className="h-4 w-4 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}
