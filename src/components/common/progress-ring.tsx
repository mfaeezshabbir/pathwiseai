import { cn } from "@/lib/utils";

export function ProgressRing({
  value,
  size = 56,
  stroke = 5,
  className,
  label = true,
}: {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
  label?: boolean;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-secondary"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          className={cn(
            "transition-[stroke-dashoffset] duration-700 ease-out",
            pct >= 100 ? "stroke-success" : "stroke-primary",
          )}
        />
      </svg>
      {label && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold tabular-nums">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
