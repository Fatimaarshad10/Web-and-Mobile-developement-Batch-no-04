import { cn } from "@/lib/utils";

interface RevenueTrendChartProps {
  data: number[];
  className?: string;
}

export function RevenueTrendChart({ data, className }: RevenueTrendChartProps) {
  const width = 760;
  const height = 220;
  const chartHeight = 180;
  const padding = 20;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / (data.length - 1);
      const y = height - padding - ((value - min) / range) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={cn("rounded-[20px] border border-slate-200 bg-slate-50/60 p-3", className)}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full">
        <defs>
          <linearGradient id="revenueGlow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1={padding}
            x2={width - padding}
            y1={padding + line * 42}
            y2={padding + line * 42}
            stroke="#E2E8F0"
            strokeDasharray="5 7"
            strokeWidth="1"
          />
        ))}

        <polyline
          fill="none"
          stroke="#7C5CFC"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
        />

        <polygon
          points={`20,180 ${points} 740,180`}
          fill="url(#revenueGlow)"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
