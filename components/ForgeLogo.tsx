export default function ForgeLogo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true" className="shrink-0">
      <rect x="1" y="1" width="28" height="28" rx="7" fill="var(--accent)" />
      <path
        d="M15 6c-1.3 4.6-6 5.6-6 10.4a6 6 0 0012 0c0-2.3-1.2-3.6-2.4-4.8.6 2.3-1.2 3.4-2.3 2.2.6-2.3-1.3-4.6-1.3-7.8z"
        fill="var(--charcoal)"
      />
    </svg>
  );
}
