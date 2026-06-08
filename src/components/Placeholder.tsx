import { ImageIcon } from "lucide-react";

interface PlaceholderProps {
  label: string;
  aspect?: string;
  className?: string;
}

export function Placeholder({ label, aspect = "aspect-[4/3]", className = "" }: PlaceholderProps) {
  return (
    <div
      className={`group relative ${aspect} w-full overflow-hidden rounded-xl border border-gold/30 bg-[var(--card-soft)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 hover:border-gold/60 hover:shadow-[0_16px_40px_-16px_rgba(176,141,87,0.25)] ${className}`}
    >
      {/* Diagonal subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 14px, rgba(176,141,87,0.06) 14px 15px)",
        }}
      />
      {/* Corner marks */}
      <CornerMark className="left-3 top-3" />
      <CornerMark className="right-3 top-3 rotate-90" />
      <CornerMark className="left-3 bottom-3 -rotate-90" />
      <CornerMark className="right-3 bottom-3 rotate-180" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-background/60 backdrop-blur-sm">
          <ImageIcon className="h-5 w-5 text-gold" strokeWidth={1.25} />
        </div>
        <div className="space-y-1">
          <p className="font-display text-base text-graphite">{label}</p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Upload your image
          </p>
        </div>
      </div>
    </div>
  );
}

function CornerMark({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute h-4 w-4 ${className}`}>
      <div className="absolute left-0 top-0 h-px w-full bg-gold/60" />
      <div className="absolute left-0 top-0 h-full w-px bg-gold/60" />
    </div>
  );
}
