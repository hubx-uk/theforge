import Link from "next/link";

/* ─── Unique per-project thumbnail illustrations ─────────── */

function MeridianThumbnail() {
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      {/* bg */}
      <rect width="560" height="240" fill="#12122a" />
      {/* sidebar */}
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
      {/* stat tiles */}
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
      {/* bar chart */}
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
      {/* right sparkline panel */}
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
      {/* right activity panel */}
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

function RovaThumbnail() {
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="240" fill="#0a160b" />
      {/* top nav */}
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
      {/* cart */}
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
      {/* product grid 2×2 */}
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
      <rect
        x="30"
        y="218"
        width="70"
        height="4"
        rx="2"
        fill="white"
        opacity="0.22"
      />
      <rect
        x="30"
        y="226"
        width="44"
        height="4"
        rx="2"
        fill="white"
        opacity="0.12"
      />

      <rect x="152" y="148" width="124" height="88" rx="8" fill="#14261a" />
      <rect
        x="152"
        y="148"
        width="124"
        height="60"
        rx="8"
        fill="#14532d"
        opacity="0.45"
      />
      <rect
        x="166"
        y="160"
        width="60"
        height="4"
        rx="2"
        fill="#16A34A"
        opacity="0.5"
      />
      <rect
        x="166"
        y="218"
        width="70"
        height="4"
        rx="2"
        fill="white"
        opacity="0.22"
      />
      <rect
        x="166"
        y="226"
        width="44"
        height="4"
        rx="2"
        fill="white"
        opacity="0.12"
      />

      {/* right: featured product + CTA */}
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
      {/* big product label lines */}
      <rect
        x="312"
        y="74"
        width="80"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.18"
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
        y="102"
        width="100"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.18"
      />
      {/* price */}
      <rect
        x="312"
        y="172"
        width="60"
        height="10"
        rx="4"
        fill="#16A34A"
        opacity="0.9"
      />
      {/* Add to bag button */}
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
      {/* toolbar */}
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
      {/* table header */}
      <rect x="16" y="52" width="528" height="32" rx="0" fill="#0d1e2c" />
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
      {/* rows */}
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
      {/* pagination */}
      <rect x="200" y="246" width="160" height="1" fill="transparent" />
    </svg>
  );
}

function AxiomThumbnail() {
  const swatches = ["#F59E0B", "#D97706", "#92400E", "#1C1917", "#F5F5F4"];
  return (
    <svg
      viewBox="0 0 560 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="240" fill="#140d00" />
      {/* large lettermark — left half */}
      {/* "A" shape: two diagonal rects + crossbar */}
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
      {/* right half: type specimen */}
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
      {/* divider */}
      <rect x="254" y="118" width="280" height="1" fill="white" opacity="0.1" />
      {/* weight specimen */}
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
      {/* swatches */}
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
      {/* accent bottom bar */}
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
      {/* ambient glow blobs */}
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
      {/* edges */}
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
      {/* node halos */}
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
      {/* node circles */}
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
      {/* node dots */}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="4" fill="#A78BFA" />
      ))}
      {/* step label boxes */}
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

      {/* arrows */}
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

function CobaltThumbnail() {
  const kpis = [
    { label: "Revenue", value: "£2.4M", trend: "+18%", up: true, x: 16, y: 52 },
    {
      label: "Close Rate",
      value: "47%",
      trend: "+6pp",
      up: true,
      x: 286,
      y: 52,
    },
    {
      label: "Pipeline",
      value: "3.2×",
      trend: "Cov.",
      up: true,
      x: 16,
      y: 148,
    },
    { label: "NPS", value: "72", trend: "+4pts", up: true, x: 286, y: 148 },
  ];
  return (
    <svg
      viewBox="0 0 560 244"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <rect width="560" height="244" fill="#050f14" />
      {/* top bar */}
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
      {/* KPI tiles */}
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
          {/* label */}
          <rect
            x={k.x + 16}
            y={k.y + 16}
            width="64"
            height="5"
            rx="2.5"
            fill="white"
            opacity="0.28"
          />
          {/* value — thick block */}
          <rect
            x={k.x + 16}
            y={k.y + 30}
            width="96"
            height="20"
            rx="5"
            fill="#14B8A6"
            opacity="0.75"
          />
          {/* trend pill */}
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
          {/* small bar chart */}
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
      {/* bottom divider label */}
      <rect
        x="16"
        y="240"
        width="528"
        height="1"
        fill="#14B8A6"
        opacity="0.08"
      />
    </svg>
  );
}

/* ─── Project data ─────────────────────────────────────── */

const PROJECTS: Array<{
  title: string;
  category: string;
  desc: string;
  Thumbnail: () => React.ReactElement;
  href?: string;
}> = [
  {
    title: "Meridian Finance",
    category: "Web App · Supabase · Stripe",
    desc: "Real-time portfolio dashboard with subscription billing and SSO.",
    Thumbnail: MeridianThumbnail,
  },
  {
    title: "Rova Apparel",
    category: "E-Commerce · Stripe",
    desc: "High-conversion storefront with product bundling and upsells.",
    Thumbnail: RovaThumbnail,
  },
  {
    title: "Blueshift SaaS",
    category: "Web App · Next.js · Supabase",
    desc: "Multi-tenant B2B platform with role-based access and API keys.",
    Thumbnail: BlueshiftThumbnail,
  },
  {
    title: "Axiom Agency",
    category: "Web Design · Brand",
    desc: "Brand identity and marketing site — launched in 5 days.",
    Thumbnail: AxiomThumbnail,
  },
  {
    title: "Vertex AI",
    category: "AI Product · Automation",
    desc: "Intelligent workflows and customer insights powered by custom AI.",
    Thumbnail: VertexThumbnail,
    href: "/work/vertex-ai",
  },
  {
    title: "Cobalt Consulting",
    category: "Software Consulting · Scale",
    desc: "Technical strategy playbook and delivery support for a high-growth SaaS team.",
    Thumbnail: CobaltThumbnail,
    href: "/work/cobalt-consulting",
  },
];

/* ─── Component ─────────────────────────────────────────── */

import type React from "react";

export default function Work() {
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

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => {
            const card = (
              <div className="card rounded-2xl overflow-hidden cursor-pointer group">
                <div
                  className="relative h-56 overflow-hidden"
                  style={{ background: "#060a0f" }}
                >
                  <project.Thumbnail />
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
                    {project.category}
                  </p>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.desc}
                  </p>
                </div>
              </div>
            );

            return project.href ? (
              <Link key={project.title} href={project.href} className="block">
                {card}
              </Link>
            ) : (
              <div key={project.title}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
