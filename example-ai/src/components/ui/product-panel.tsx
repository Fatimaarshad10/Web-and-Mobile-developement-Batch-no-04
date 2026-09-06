import { PRODUCT_METRICS, PRODUCT_RANKS } from "@/lib/products";

/**
 * The lime product-analytics mockup in the left column: a deeper lime card on a
 * lighter lime panel, holding a header strip, a featured product, three metrics
 * and a ranked bar list.
 */
export function ProductPanel() {
  return (
    <div className="flex items-center justify-center rounded-[10px] bg-panel p-4 py-7 sm:p-[28px] lg:min-h-[546px] lg:p-[58px]">
      <div className="w-full rounded-[10px] bg-panel-deep p-5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] lg:max-w-[420px]">
        {/* Header strip */}
        <div className="flex items-center justify-between gap-4 rounded-lg bg-white px-[14px] py-[15px]">
          <div>
            <h4 className="mb-[5px] font-serif text-[17px] font-medium">
              Top Selling Product
            </h4>
            <p className="text-xs text-[#2a2a2a]">
              Based on total revenue this month
            </p>
          </div>
          <div className="whitespace-nowrap rounded-[20px] border border-[#d9d9d9] px-3 py-2 text-xs">
            Oct,2026&nbsp;&nbsp;⌄
          </div>
        </div>

        {/* Featured product */}
        <div className="my-5 mb-[26px] flex items-center gap-[14px] text-white">
          <Bicycle />
          <div>
            <h3 className="mb-[7px] text-[17px] font-medium">
              Modern Electric Bicycle
            </h3>
            <span className="inline-block rounded-[14px] bg-white/18 px-[10px] py-[5px] text-[11px]">
              Popular now
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-7 mt-2 grid grid-cols-3 text-white">
          {PRODUCT_METRICS.map((metric, index) => (
            <div
              key={metric.label}
              className={
                index === 0
                  ? "pr-[18px]"
                  : "border-l border-white/20 pl-[25px] pr-[18px]"
              }
            >
              <strong className="mb-1.5 block text-lg font-medium">
                {metric.value}
              </strong>
              <span className="text-[11px]">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Ranked list */}
        <div className="grid gap-[18px] text-white">
          {PRODUCT_RANKS.map((rank) => (
            <div key={rank.name}>
              <div className="mb-2 flex justify-between text-xs">
                <span>{rank.name}</span>
                <span>{rank.place}</span>
              </div>
              <div className="h-[7px] overflow-hidden rounded-[6px] bg-white/25">
                <div
                  className={`h-full rounded-[6px] ${rank.fillClassName}`}
                  style={{ width: `${rank.share}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Decorative bicycle built from layered gradients: two radial gradients form the
 * wheels, two linear gradients the frame, and the pseudo-element the crossbar.
 * Purely illustrative, so it is hidden from assistive tech.
 */
function Bicycle() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[60px] w-[86px] flex-none rounded-[7px] after:absolute after:left-[29px] after:top-[29px] after:h-[3px] after:w-[28px] after:-rotate-[8deg] after:bg-[#303030] after:content-['']"
      style={{
        background: [
          "radial-gradient(circle at 26% 63%, transparent 0 9px, #2b2b2b 10px 11px, transparent 12px)",
          "radial-gradient(circle at 73% 63%, transparent 0 9px, #2b2b2b 10px 11px, transparent 12px)",
          "linear-gradient(26deg, transparent 44%, #303030 45% 48%, transparent 49%)",
          "linear-gradient(147deg, transparent 44%, #303030 45% 48%, transparent 49%)",
          "#eef2e7",
        ].join(", "),
      }}
    />
  );
}
