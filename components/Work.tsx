import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type React from "react";

/* ─── Per-project SVG thumbnails (keyed by slug) ────────────
   These stay local since they are bespoke illustrations —
   only the project metadata comes from Supabase.
─────────────────────────────────────────────────────────── */

function MeridianThumbnail() {
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="240" fill="#12122a" />
      <rect width="108" height="240" fill="#0e0e22" />
      <rect
        x="16"
        y="20"
        width="52"
        height="7"
        rx="3.5"
        fill="#4F46E5"
        opacity="0.9"
      />
      <rect
        x="16"
        y="44"
        width="76"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.11"
      />
      <rect
        x="16"
        y="58"
        width="62"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.18"
      />
      <rect x="0" y="55" width="3" height="19" rx="1.5" fill="#4F46E5" />
      <rect
        x="16"
        y="72"
        width="70"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.11"
      />
      <rect
        x="16"
        y="86"
        width="58"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.11"
      />
      <rect
        x="16"
        y="100"
        width="68"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.11"
      />
      <rect
        x="16"
        y="190"
        width="76"
        height="24"
        rx="7"
        fill="#4F46E5"
        opacity="0.25"
      />
      <rect
        x="24"
        y="197"
        width="44"
        height="5"
        rx="2.5"
        fill="#4F46E5"
        opacity="0.8"
      />
      <rect x="124" y="16" width="128" height="58" rx="10" fill="#1a1a3e" />
      <rect
        x="138"
        y="28"
        width="46"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect
        x="138"
        y="42"
        width="72"
        height="14"
        rx="4"
        fill="#4F46E5"
        opacity="0.9"
      />
      <rect x="264" y="16" width="128" height="58" rx="10" fill="#1a1a3e" />
      <rect
        x="278"
        y="28"
        width="46"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect
        x="278"
        y="42"
        width="56"
        height="14"
        rx="4"
        fill="white"
        opacity="0.55"
      />
      <rect x="404" y="16" width="140" height="58" rx="10" fill="#1a1a3e" />
      <rect
        x="418"
        y="28"
        width="46"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect
        x="418"
        y="42"
        width="48"
        height="14"
        rx="4"
        fill="#818CF8"
        opacity="0.85"
      />
      <rect x="124" y="90" width="270" height="136" rx="12" fill="#1a1a3e" />
      <rect
        x="140"
        y="106"
        width="60"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect
        x="148"
        y="192"
        width="20"
        height="18"
        rx="3"
        fill="#4F46E5"
        opacity="0.45"
      />
      <rect
        x="178"
        y="178"
        width="20"
        height="32"
        rx="3"
        fill="#4F46E5"
        opacity="0.6"
      />
      <rect
        x="208"
        y="162"
        width="20"
        height="48"
        rx="3"
        fill="#4F46E5"
        opacity="0.75"
      />
      <rect
        x="238"
        y="170"
        width="20"
        height="40"
        rx="3"
        fill="#4F46E5"
        opacity="0.6"
      />
      <rect x="268" y="148" width="20" height="62" rx="3" fill="#4F46E5" />
      <rect
        x="298"
        y="158"
        width="20"
        height="52"
        rx="3"
        fill="#4F46E5"
        opacity="0.85"
      />
      <rect x="408" y="90" width="136" height="62" rx="10" fill="#1a1a3e" />
      <rect
        x="422"
        y="104"
        width="50"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <polyline
        points="422,142 436,132 450,137 464,122 478,127 492,112 506,116 520,108"
        stroke="#4F46E5"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="520" cy="108" r="3" fill="#4F46E5" />
      <rect x="408" y="164" width="136" height="62" rx="10" fill="#1a1a3e" />
      <rect
        x="422"
        y="178"
        width="38"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect
        x="422"
        y="192"
        width="96"
        height="4"
        rx="2"
        fill="white"
        opacity="0.1"
      />
      <rect
        x="422"
        y="200"
        width="80"
        height="4"
        rx="2"
        fill="white"
        opacity="0.1"
      />
      <rect
        x="422"
        y="208"
        width="60"
        height="4"
        rx="2"
        fill="#4F46E5"
        opacity="0.7"
      />
    </svg>
  );
}

function JosrenThumbnail() {
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="240" fill="#0a160b" />
      <rect width="560" height="36" fill="#0d1c0e" />
      <rect
        x="20"
        y="14"
        width="60"
        height="6"
        rx="3"
        fill="#16A34A"
        opacity="0.85"
      />
      <rect
        x="200"
        y="15"
        width="40"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.18"
      />
      <rect
        x="254"
        y="15"
        width="40"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.18"
      />
      <rect
        x="308"
        y="15"
        width="40"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.18"
      />
      <rect
        x="512"
        y="10"
        width="28"
        height="18"
        rx="5"
        fill="#16A34A"
        opacity="0.25"
      />
      <rect
        x="519"
        y="14"
        width="14"
        height="5"
        rx="2.5"
        fill="#16A34A"
        opacity="0.85"
      />
      <rect x="16" y="48" width="124" height="88" rx="8" fill="#14261a" />
      <rect
        x="16"
        y="48"
        width="124"
        height="60"
        rx="8"
        fill="#16A34A"
        opacity="0.18"
      />
      <rect
        x="30"
        y="60"
        width="60"
        height="4"
        rx="2"
        fill="#16A34A"
        opacity="0.5"
      />
      <rect
        x="30"
        y="118"
        width="70"
        height="4"
        rx="2"
        fill="white"
        opacity="0.22"
      />
      <rect
        x="30"
        y="126"
        width="44"
        height="4"
        rx="2"
        fill="white"
        opacity="0.12"
      />
      <rect x="152" y="48" width="124" height="88" rx="8" fill="#14261a" />
      <rect
        x="152"
        y="48"
        width="124"
        height="60"
        rx="8"
        fill="#15803d"
        opacity="0.28"
      />
      <rect
        x="166"
        y="60"
        width="60"
        height="4"
        rx="2"
        fill="#16A34A"
        opacity="0.5"
      />
      <rect
        x="166"
        y="118"
        width="70"
        height="4"
        rx="2"
        fill="white"
        opacity="0.22"
      />
      <rect
        x="166"
        y="126"
        width="44"
        height="4"
        rx="2"
        fill="white"
        opacity="0.12"
      />
      <rect x="16" y="148" width="124" height="88" rx="8" fill="#14261a" />
      <rect
        x="16"
        y="148"
        width="124"
        height="60"
        rx="8"
        fill="#166534"
        opacity="0.35"
      />
      <rect
        x="30"
        y="160"
        width="60"
        height="4"
        rx="2"
        fill="#16A34A"
        opacity="0.5"
      />
      <rect x="152" y="148" width="124" height="88" rx="8" fill="#14261a" />
      <rect x="294" y="48" width="250" height="178" rx="10" fill="#14261a" />
      <rect
        x="294"
        y="48"
        width="250"
        height="110"
        rx="10"
        fill="#16A34A"
        opacity="0.16"
      />
      <rect
        x="312"
        y="86"
        width="140"
        height="10"
        rx="4"
        fill="white"
        opacity="0.55"
      />
      <rect
        x="312"
        y="172"
        width="60"
        height="10"
        rx="4"
        fill="#16A34A"
        opacity="0.9"
      />
      <rect x="312" y="190" width="200" height="26" rx="13" fill="#16A34A" />
      <rect
        x="350"
        y="199"
        width="80"
        height="6"
        rx="3"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}

function BlueshiftThumbnail() {
  const rows = [
    {
      y: 96,
      avatarFill: "#0EA5E9",
      badge: "#1e3a4c",
      badgeTxt: "#0EA5E9",
      highlight: true,
    },
    {
      y: 126,
      avatarFill: "#64748B",
      badge: "#1c2c3a",
      badgeTxt: "#94A3B8",
      highlight: false,
    },
    {
      y: 156,
      avatarFill: "#0EA5E9",
      badge: "#1e3a4c",
      badgeTxt: "#0EA5E9",
      highlight: false,
    },
    {
      y: 186,
      avatarFill: "#64748B",
      badge: "#1c2c3a",
      badgeTxt: "#94A3B8",
      highlight: false,
    },
    {
      y: 216,
      avatarFill: "#0EA5E9",
      badge: "#1e3a4c",
      badgeTxt: "#0EA5E9",
      highlight: false,
    },
  ];
  return (
    <svg
      viewBox="0 0 560 252"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="252" fill="#060f1a" />
      <rect x="16" y="14" width="180" height="24" rx="7" fill="#0f1f2e" />
      <rect
        x="28"
        y="22"
        width="80"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.18"
      />
      <rect
        x="430"
        y="12"
        width="114"
        height="28"
        rx="8"
        fill="#0EA5E9"
        opacity="0.85"
      />
      <rect
        x="452"
        y="21"
        width="64"
        height="6"
        rx="3"
        fill="white"
        opacity="0.9"
      />
      <rect x="16" y="52" width="528" height="32" fill="#0d1e2c" />
      <rect
        x="76"
        y="62"
        width="60"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.28"
      />
      <rect
        x="210"
        y="62"
        width="44"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.28"
      />
      <rect
        x="330"
        y="62"
        width="44"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.28"
      />
      <rect
        x="440"
        y="62"
        width="44"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.28"
      />
      {rows.map((r, i) => (
        <g key={i}>
          {r.highlight && (
            <rect
              x="16"
              y={r.y}
              width="528"
              height="26"
              fill="#0EA5E9"
              opacity="0.08"
            />
          )}
          <circle
            cx="42"
            cy={r.y + 13}
            r="10"
            fill={r.avatarFill}
            opacity="0.7"
          />
          <rect
            x="62"
            y={r.y + 8}
            width="90"
            height="5"
            rx="2.5"
            fill="white"
            opacity="0.5"
          />
          <rect
            x="62"
            y={r.y + 17}
            width="64"
            height="4"
            rx="2"
            fill="white"
            opacity="0.18"
          />
          <rect
            x="204"
            y={r.y + 8}
            width="68"
            height="12"
            rx="6"
            fill={r.badge}
          />
          <rect
            x="214"
            y={r.y + 12}
            width="44"
            height="4"
            rx="2"
            fill={r.badgeTxt}
            opacity="0.8"
          />
          <circle
            cx="358"
            cy={r.y + 13}
            r="5"
            fill={r.avatarFill}
            opacity={r.highlight ? 1 : 0.4}
          />
          <rect
            x="428"
            y={r.y + 8}
            width="24"
            height="12"
            rx="4"
            fill={r.highlight ? "#0EA5E9" : "transparent"}
            stroke="#0EA5E9"
            strokeWidth="1"
            opacity="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

function AxiomsThumbnail() {
  const swatches = ["#F59E0B", "#D97706", "#92400E", "#1C1917", "#F5F5F4"];
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="240" fill="#140d00" />
      <rect
        x="40"
        y="30"
        width="22"
        height="160"
        rx="6"
        transform="rotate(-14 40 30)"
        fill="#F59E0B"
        opacity="0.9"
      />
      <rect
        x="100"
        y="30"
        width="22"
        height="160"
        rx="6"
        transform="rotate(14 180 30)"
        fill="#F59E0B"
        opacity="0.9"
      />
      <rect
        x="62"
        y="116"
        width="76"
        height="16"
        rx="6"
        fill="#F59E0B"
        opacity="0.7"
      />
      <rect x="236" y="1" width="1" height="238" fill="white" opacity="0.06" />
      <rect
        x="254"
        y="32"
        width="130"
        height="18"
        rx="5"
        fill="white"
        opacity="0.7"
      />
      <rect
        x="254"
        y="58"
        width="200"
        height="10"
        rx="4"
        fill="white"
        opacity="0.22"
      />
      <rect
        x="254"
        y="74"
        width="180"
        height="10"
        rx="4"
        fill="white"
        opacity="0.22"
      />
      <rect
        x="254"
        y="90"
        width="160"
        height="10"
        rx="4"
        fill="white"
        opacity="0.22"
      />
      <rect x="254" y="118" width="280" height="1" fill="white" opacity="0.1" />
      <rect
        x="254"
        y="130"
        width="240"
        height="8"
        rx="3"
        fill="white"
        opacity="0.55"
      />
      <rect
        x="254"
        y="144"
        width="200"
        height="7"
        rx="3"
        fill="white"
        opacity="0.35"
      />
      <rect
        x="254"
        y="157"
        width="160"
        height="6"
        rx="3"
        fill="white"
        opacity="0.18"
      />
      <rect
        x="254"
        y="182"
        width="280"
        height="1"
        fill="white"
        opacity="0.08"
      />
      {swatches.map((c, i) => (
        <rect
          key={i}
          x={254 + i * 48}
          y="196"
          width="38"
          height="28"
          rx="7"
          fill={c}
        />
      ))}
      <rect
        x="40"
        y="225"
        width="180"
        height="3"
        rx="1.5"
        fill="#F59E0B"
        opacity="0.45"
      />
    </svg>
  );
}

function VertexThumbnail() {
  const nodes = [
    { cx: 80, cy: 120 },
    { cx: 80, cy: 72 },
    { cx: 80, cy: 168 },
    { cx: 280, cy: 96 },
    { cx: 280, cy: 144 },
    { cx: 480, cy: 120 },
  ];
  const edges = [
    [0, 3],
    [0, 4],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 5],
  ];
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="240" fill="#0c0c1e" />
      <ellipse
        cx="280"
        cy="120"
        rx="180"
        ry="90"
        fill="#8B5CF6"
        opacity="0.06"
      />
      <ellipse cx="80" cy="120" rx="60" ry="60" fill="#8B5CF6" opacity="0.07" />
      <ellipse
        cx="480"
        cy="120"
        rx="60"
        ry="60"
        fill="#8B5CF6"
        opacity="0.07"
      />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#8B5CF6"
          strokeWidth="1.5"
          opacity="0.35"
          strokeDasharray="5 4"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r="22"
          fill="#8B5CF6"
          opacity="0.1"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r="14"
          fill="#1a1040"
          stroke="#8B5CF6"
          strokeWidth="2"
          opacity="0.9"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="4" fill="#A78BFA" />
      ))}
      <rect
        x="28"
        y="194"
        width="104"
        height="32"
        rx="8"
        fill="#1a1040"
        stroke="#8B5CF6"
        strokeWidth="1"
        opacity="0.7"
      />
      <rect
        x="40"
        y="201"
        width="50"
        height="5"
        rx="2.5"
        fill="#A78BFA"
        opacity="0.8"
      />
      <rect
        x="40"
        y="212"
        width="74"
        height="4"
        rx="2"
        fill="white"
        opacity="0.18"
      />
      <rect
        x="228"
        y="194"
        width="104"
        height="32"
        rx="8"
        fill="#1a1040"
        stroke="#8B5CF6"
        strokeWidth="1"
        opacity="0.7"
      />
      <rect
        x="240"
        y="201"
        width="50"
        height="5"
        rx="2.5"
        fill="#A78BFA"
        opacity="0.8"
      />
      <rect
        x="240"
        y="212"
        width="74"
        height="4"
        rx="2"
        fill="white"
        opacity="0.18"
      />
      <rect
        x="428"
        y="194"
        width="104"
        height="32"
        rx="8"
        fill="#1a1040"
        stroke="#8B5CF6"
        strokeWidth="1"
        opacity="0.7"
      />
      <rect
        x="440"
        y="201"
        width="50"
        height="5"
        rx="2.5"
        fill="#A78BFA"
        opacity="0.8"
      />
      <rect
        x="440"
        y="212"
        width="74"
        height="4"
        rx="2"
        fill="white"
        opacity="0.18"
      />
      <polyline
        points="185,120 230,120"
        stroke="#8B5CF6"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <polyline
        points="222,116 230,120 222,124"
        stroke="#8B5CF6"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <polyline
        points="385,120 430,120"
        stroke="#8B5CF6"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <polyline
        points="422,116 430,120 422,124"
        stroke="#8B5CF6"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function HubxThumbnail() {
  const kpis = [
    { x: 16, y: 52 },
    { x: 286, y: 52 },
    { x: 16, y: 148 },
    { x: 286, y: 148 },
  ];
  return (
    <svg
      viewBox="0 0 560 244"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="244" fill="#050f14" />
      <rect width="560" height="38" fill="#081820" />
      <rect
        x="16"
        y="14"
        width="100"
        height="8"
        rx="4"
        fill="#14B8A6"
        opacity="0.8"
      />
      <rect
        x="420"
        y="12"
        width="60"
        height="14"
        rx="5"
        fill="#14B8A6"
        opacity="0.2"
      />
      <rect
        x="490"
        y="12"
        width="54"
        height="14"
        rx="5"
        fill="#14B8A6"
        opacity="0.8"
      />
      <rect
        x="500"
        y="16"
        width="34"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.9"
      />
      {kpis.map((k, i) => (
        <g key={i}>
          <rect
            x={k.x}
            y={k.y}
            width="252"
            height="82"
            rx="12"
            fill="#081820"
            stroke="#14B8A6"
            strokeWidth="0.75"
            opacity="0.8"
          />
          <rect
            x={k.x + 16}
            y={k.y + 16}
            width="64"
            height="5"
            rx="2.5"
            fill="white"
            opacity="0.28"
          />
          <rect
            x={k.x + 16}
            y={k.y + 30}
            width="96"
            height="20"
            rx="5"
            fill="#14B8A6"
            opacity="0.75"
          />
          <rect
            x={k.x + 16}
            y={k.y + 58}
            width="54"
            height="14"
            rx="7"
            fill="#14B8A6"
            opacity="0.15"
          />
          <rect
            x={k.x + 22}
            y={k.y + 63}
            width="36"
            height="4"
            rx="2"
            fill="#14B8A6"
            opacity="0.7"
          />
          <rect
            x={k.x + 180}
            y={k.y + 50}
            width="8"
            height="20"
            rx="2"
            fill="#14B8A6"
            opacity="0.3"
          />
          <rect
            x={k.x + 192}
            y={k.y + 40}
            width="8"
            height="30"
            rx="2"
            fill="#14B8A6"
            opacity="0.5"
          />
          <rect
            x={k.x + 204}
            y={k.y + 32}
            width="8"
            height="38"
            rx="2"
            fill="#14B8A6"
            opacity="0.75"
          />
          <rect
            x={k.x + 216}
            y={k.y + 24}
            width="8"
            height="46"
            rx="2"
            fill="#14B8A6"
          />
        </g>
      ))}
    </svg>
  );
}

function JovicoThumbnail() {
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="240" fill="#0f1a0c" />
      {/* Top nav */}
      <rect width="560" height="40" fill="#152010" />
      <rect
        x="20"
        y="14"
        width="70"
        height="8"
        rx="4"
        fill="#FE7F2D"
        opacity="0.9"
      />
      <rect
        x="200"
        y="16"
        width="40"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.2"
      />
      <rect
        x="254"
        y="16"
        width="40"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.2"
      />
      <rect
        x="308"
        y="16"
        width="40"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.2"
      />
      <rect
        x="490"
        y="12"
        width="54"
        height="18"
        rx="9"
        fill="#FE7F2D"
        opacity="0.85"
      />
      <rect
        x="500"
        y="17"
        width="34"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.9"
      />
      {/* Hero product area */}
      <rect x="16" y="56" width="256" height="168" rx="10" fill="#1c2e14" />
      <rect
        x="16"
        y="56"
        width="256"
        height="100"
        rx="10"
        fill="#FE7F2D"
        opacity="0.12"
      />
      <rect
        x="32"
        y="80"
        width="100"
        height="7"
        rx="3.5"
        fill="white"
        opacity="0.6"
      />
      <rect
        x="32"
        y="94"
        width="160"
        height="12"
        rx="4"
        fill="white"
        opacity="0.85"
      />
      <rect
        x="32"
        y="114"
        width="120"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect
        x="32"
        y="178"
        width="80"
        height="10"
        rx="5"
        fill="#FE7F2D"
        opacity="0.9"
      />
      <rect
        x="32"
        y="196"
        width="210"
        height="22"
        rx="11"
        fill="#FE7F2D"
        opacity="0.8"
      />
      {/* Product grid right */}
      <rect x="284" y="56" width="128" height="78" rx="8" fill="#1c2e14" />
      <rect
        x="284"
        y="56"
        width="128"
        height="46"
        rx="8"
        fill="#FE7F2D"
        opacity="0.1"
      />
      <rect
        x="296"
        y="116"
        width="80"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect
        x="296"
        y="124"
        width="56"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.18"
      />
      <rect x="424" y="56" width="120" height="78" rx="8" fill="#1c2e14" />
      <rect
        x="424"
        y="56"
        width="120"
        height="46"
        rx="8"
        fill="#FE7F2D"
        opacity="0.15"
      />
      <rect
        x="436"
        y="116"
        width="80"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect x="284" y="146" width="128" height="78" rx="8" fill="#1c2e14" />
      <rect
        x="284"
        y="146"
        width="128"
        height="46"
        rx="8"
        fill="#FE7F2D"
        opacity="0.08"
      />
      <rect
        x="296"
        y="206"
        width="80"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect x="424" y="146" width="120" height="78" rx="8" fill="#1c2e14" />
      <rect
        x="436"
        y="206"
        width="80"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
    </svg>
  );
}

function FabricaThumbnail() {
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="240" fill="#0d1117" />
      {/* Sidebar */}
      <rect width="130" height="240" fill="#0a0f15" />
      <rect
        x="14"
        y="20"
        width="60"
        height="7"
        rx="3.5"
        fill="#D9591A"
        opacity="0.9"
      />
      <rect
        x="14"
        y="48"
        width="100"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.1"
      />
      <rect
        x="14"
        y="62"
        width="90"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.18"
      />
      <rect x="0" y="58" width="3" height="19" rx="1.5" fill="#D9591A" />
      <rect
        x="14"
        y="76"
        width="80"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.1"
      />
      <rect
        x="14"
        y="90"
        width="70"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.1"
      />
      <rect
        x="14"
        y="104"
        width="85"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.1"
      />
      {/* Main content */}
      <rect x="146" y="16" width="398" height="32" rx="8" fill="#141c24" />
      <rect
        x="160"
        y="25"
        width="80"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.2"
      />
      <rect
        x="480"
        y="20"
        width="50"
        height="22"
        rx="7"
        fill="#D9591A"
        opacity="0.8"
      />
      <rect
        x="490"
        y="25"
        width="30"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.9"
      />
      {/* Project cards */}
      <rect x="146" y="60" width="188" height="80" rx="8" fill="#141c24" />
      <rect
        x="160"
        y="74"
        width="80"
        height="5"
        rx="2.5"
        fill="#D9591A"
        opacity="0.6"
      />
      <rect
        x="160"
        y="86"
        width="120"
        height="7"
        rx="3.5"
        fill="white"
        opacity="0.55"
      />
      <rect
        x="160"
        y="100"
        width="90"
        height="4"
        rx="2"
        fill="white"
        opacity="0.2"
      />
      <rect
        x="160"
        y="120"
        width="50"
        height="12"
        rx="6"
        fill="#D9591A"
        opacity="0.25"
      />
      <rect
        x="166"
        y="124"
        width="36"
        height="4"
        rx="2"
        fill="#D9591A"
        opacity="0.8"
      />
      <rect x="346" y="60" width="198" height="80" rx="8" fill="#141c24" />
      <rect
        x="360"
        y="74"
        width="80"
        height="5"
        rx="2.5"
        fill="#D9591A"
        opacity="0.6"
      />
      <rect
        x="360"
        y="86"
        width="140"
        height="7"
        rx="3.5"
        fill="white"
        opacity="0.55"
      />
      <rect
        x="360"
        y="100"
        width="90"
        height="4"
        rx="2"
        fill="white"
        opacity="0.2"
      />
      <rect
        x="360"
        y="120"
        width="60"
        height="12"
        rx="6"
        fill="#D9591A"
        opacity="0.2"
      />
      <rect
        x="366"
        y="124"
        width="46"
        height="4"
        rx="2"
        fill="#D9591A"
        opacity="0.7"
      />
      {/* Quote builder */}
      <rect x="146" y="152" width="398" height="76" rx="8" fill="#141c24" />
      <rect
        x="160"
        y="164"
        width="100"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.25"
      />
      <rect
        x="160"
        y="178"
        width="340"
        height="8"
        rx="4"
        fill="white"
        opacity="0.08"
      />
      <rect
        x="160"
        y="178"
        width="210"
        height="8"
        rx="4"
        fill="#D9591A"
        opacity="0.4"
      />
      <rect
        x="160"
        y="194"
        width="80"
        height="4"
        rx="2"
        fill="white"
        opacity="0.18"
      />
      <rect
        x="440"
        y="192"
        width="90"
        height="22"
        rx="7"
        fill="#D9591A"
        opacity="0.8"
      />
      <rect
        x="452"
        y="198"
        width="66"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}

function ManellaThumbnail() {
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="240" fill="#0a0a14" />
      {/* Top nav */}
      <rect width="560" height="38" fill="#0d0d1a" />
      <rect
        x="20"
        y="14"
        width="56"
        height="7"
        rx="3.5"
        fill="#6366F1"
        opacity="0.9"
      />
      <rect
        x="186"
        y="16"
        width="40"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.2"
      />
      <rect
        x="240"
        y="16"
        width="40"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.2"
      />
      <rect
        x="294"
        y="16"
        width="40"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.2"
      />
      <rect
        x="460"
        y="12"
        width="80"
        height="18"
        rx="9"
        fill="#6366F1"
        opacity="0.8"
      />
      {/* Performance badges */}
      <rect
        x="16"
        y="54"
        width="120"
        height="40"
        rx="8"
        fill="#6366F1"
        opacity="0.12"
        stroke="#6366F1"
        strokeWidth="0.5"
        strokeOpacity="0.3"
      />
      <rect
        x="26"
        y="62"
        width="36"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect
        x="26"
        y="72"
        width="60"
        height="10"
        rx="4"
        fill="#6366F1"
        opacity="0.8"
      />
      <rect
        x="148"
        y="54"
        width="120"
        height="40"
        rx="8"
        fill="#6366F1"
        opacity="0.08"
        stroke="#6366F1"
        strokeWidth="0.5"
        strokeOpacity="0.2"
      />
      <rect
        x="158"
        y="62"
        width="36"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect
        x="158"
        y="72"
        width="60"
        height="10"
        rx="4"
        fill="#6366F1"
        opacity="0.6"
      />
      {/* Product grid 3×2 */}
      <rect x="16" y="106" width="162" height="118" rx="8" fill="#12122a" />
      <rect
        x="16"
        y="106"
        width="162"
        height="72"
        rx="8"
        fill="#6366F1"
        opacity="0.1"
      />
      <rect
        x="30"
        y="190"
        width="100"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect
        x="30"
        y="200"
        width="60"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.15"
      />
      <rect x="192" y="106" width="162" height="118" rx="8" fill="#12122a" />
      <rect
        x="192"
        y="106"
        width="162"
        height="72"
        rx="8"
        fill="#6366F1"
        opacity="0.14"
      />
      <rect
        x="206"
        y="190"
        width="100"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      <rect x="368" y="106" width="176" height="118" rx="8" fill="#12122a" />
      <rect
        x="368"
        y="106"
        width="176"
        height="72"
        rx="8"
        fill="#6366F1"
        opacity="0.08"
      />
      <rect
        x="382"
        y="190"
        width="100"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.3"
      />
      {/* Speed metric bar */}
      <rect x="280" y="54" width="264" height="40" rx="8" fill="#12122a" />
      <rect
        x="294"
        y="64"
        width="60"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.2"
      />
      <rect
        x="294"
        y="76"
        width="216"
        height="8"
        rx="4"
        fill="white"
        opacity="0.06"
      />
      <rect
        x="294"
        y="76"
        width="72"
        height="8"
        rx="4"
        fill="#6366F1"
        opacity="0.8"
      />
    </svg>
  );
}

/* ─── Thumbnail registry — maps slug → component ───────── */
const THUMBNAILS: Record<string, () => React.ReactElement> = {
  "meridian-finance": MeridianThumbnail,
  "josren-apparel": JosrenThumbnail,
  "blueshift-saas": BlueshiftThumbnail,
  axioms: AxiomsThumbnail,
  "vertex-ai": VertexThumbnail,
  "hubx-consulting": HubxThumbnail,
  jovico: JovicoThumbnail,
  fabrica: FabricaThumbnail,
  manella: ManellaThumbnail,
};

function DefaultThumbnail({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="240" fill="#0d1117" />
      <rect
        x="180"
        y="80"
        width="200"
        height="80"
        rx="16"
        fill={color}
        opacity="0.12"
      />
      <rect
        x="210"
        y="108"
        width="140"
        height="8"
        rx="4"
        fill={color}
        opacity="0.6"
      />
      <rect
        x="230"
        y="124"
        width="100"
        height="6"
        rx="3"
        fill="white"
        opacity="0.2"
      />
    </svg>
  );
}

type CaseStudy = {
  id: string;
  slug: string;
  client: string;
  title: string;
  home_category: string | null;
  home_desc: string | null;
  color: string;
};

export const revalidate = 60;

export default async function Work() {
  const { data: projects, error } = await supabaseAdmin
    .from("case_studies")
    .select("id, slug, client, title, home_category, home_desc, color")
    .eq("show_on_home", true)
    .order("sort_order");

  // Graceful fallback if table doesn't exist yet
  const list: CaseStudy[] = error ? [] : (projects ?? []);

  return (
    <section className="py-28" style={{ background: "var(--bg-surface)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="section-label">Our Work</span>
            <h2
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
            >
              Forged in the Wild
            </h2>
          </div>
          <Link
            href="/work"
            className="text-sm font-semibold transition-colors"
            style={{ color: "var(--accent)" }}
          >
            View all projects →
          </Link>
        </div>

        {list.length === 0 ? (
          <p
            className="text-center py-20 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No projects to display yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {list.map((project) => {
              const Thumbnail = THUMBNAILS[project.slug];
              const href = `/work/${project.slug}`;

              const card = (
                <div className="card rounded-2xl overflow-hidden cursor-pointer group">
                  <div
                    className="relative h-56 overflow-hidden"
                    style={{ background: "#060a0f" }}
                  >
                    {Thumbnail ? (
                      <Thumbnail />
                    ) : (
                      <DefaultThumbnail color={project.color} />
                    )}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(0,0,0,0.12)" }}
                    />
                  </div>
                  <div className="p-6">
                    <p
                      className="text-xs font-medium uppercase tracking-wider mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {project.home_category ?? project.client}
                    </p>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.client}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.home_desc ?? project.title}
                    </p>
                  </div>
                </div>
              );

              return (
                <Link key={project.id} href={href} className="block">
                  {card}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
