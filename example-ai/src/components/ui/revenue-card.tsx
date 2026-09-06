/**
 * "AI-attributed revenue" card: a headline metric plus a mini bar chart.
 * Bar heights are data-driven so this can later be fed from a real API.
 */
const BARS = [
  { height: 30, active: false },
  { height: 48, active: true },
  { height: 40, active: false },
  { height: 65, active: true },
  { height: 58, active: false },
  { height: 78, active: true },
  { height: 65, active: false },
  { height: 95, active: true },
];

export function RevenueCard() {
  return (
    <div className="hidden rounded-[17px] border border-white/12 bg-[rgba(52,54,49,0.68)] p-[19px] shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-[18px] sm:block">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-serif text-xl text-white">$1.24M</div>
          <div className="mt-1 text-[11px] text-[#bbbdb6]">
            AI-attributed revenue
          </div>
        </div>
        <div className="text-xs font-semibold text-lime">+18.4%</div>
      </div>

      <div className="mt-[17px] flex h-[53px] items-end gap-[5px]">
        {BARS.map((bar, index) => (
          <div
            key={index}
            style={{ height: `${bar.height}%` }}
            className={`flex-1 rounded-t-[3px] ${
              bar.active ? "bg-lime" : "bg-[#75786f]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
