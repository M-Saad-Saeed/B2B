export function Logo({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const color = variant === "dark" ? "var(--graphite)" : "var(--ivory)";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold">
        <span className="font-display text-lg tracking-tight text-gold">CLS</span>
      </div>
      <div className="flex flex-col leading-none">
        <span
          className="font-display text-base tracking-wider uppercase"
          style={{ color }}
        >
          Custom Logo Sign
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-taupe mt-0.5">
          Premium Signage Atelier
        </span>
      </div>
    </div>
  );
}
