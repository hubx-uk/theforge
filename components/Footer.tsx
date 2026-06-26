"use client";

import Link from "next/link";
import ForgeLogo from "./ForgeLogo";

const LINKS = {
  Development: [
    { label: "Web Apps", href: "/services/web-apps" },
    { label: "Mobile Apps", href: "/services/mobile-apps" },
    { label: "E-Commerce", href: "/services/ecommerce" },
  ],
  Marketing: [
    { label: "SEO", href: "/services/seo" },
    { label: "Paid Ads", href: "/services/paid-ads" },
    { label: "Content", href: "/services/content" },
  ],
  Workflow: [
    { label: "Automation", href: "/services/automation" },
    { label: "CRM Setup", href: "/services/crm-setup" },
    { label: "Analytics", href: "/services/analytics" },
  ],
  Explore: [
    { label: "About", href: "/about" },
    { label: "Our Approach", href: "/work/approach" },
    { label: "Case Studies", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Help & FAQs", href: "/help" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

export default function Footer({
  showClientPortal = true,
}: {
  showClientPortal?: boolean;
}) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-base)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              style={{ letterSpacing: "-0.03em" }}
            >
              <ForgeLogo size={26} />
              <span className="text-2xl font-black">
                <span style={{ color: "var(--accent)" }}>the</span>
                <span style={{ color: "var(--text-primary)" }}>forge</span>
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              A software development and digital marketing studio building
              systems that grow small and medium-sized businesses worldwide.
            </p>
            <a
              href="mailto:hello@theforge.ng"
              className="text-sm font-medium"
              style={{ color: "var(--accent)" }}
            >
              hello@theforge.ng
            </a>
          </div>

          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--text-primary)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--text-muted)")
                      }
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                {group === "Explore" && showClientPortal && (
                  <li>
                    <Link
                      href="/portal/login"
                      className="text-sm font-semibold transition-colors"
                      style={{ color: "var(--accent)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--accent-alt)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--accent)")
                      }
                    >
                      Client Portal →
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} theforge. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Built worldwide, for businesses everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
