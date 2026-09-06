import { DonutChart } from "@/components/ui/donut-chart";

/**
 * Dark card holding the glass "Repeat Customers" chart.
 * The background is a diagonal repeating stripe with a soft light-to-dark wash
 * over it, giving the brushed, angled texture.
 */
export function SolutionCard() {
  return (
    <div
      className="flex min-h-[250px] items-center justify-center rounded-[20px] px-[22px] py-7 lg:min-h-[285px]"
      style={{
        background: [
          "linear-gradient(135deg, rgba(255,255,255,.05), rgba(0,0,0,.18))",
          "repeating-linear-gradient(130deg, #1d1d1d 0 8px, #242424 8px 13px)",
        ].join(", "),
      }}
    >
      <div className="w-full max-w-[260px] rounded-[17px] bg-[rgba(79,79,79,0.78)] px-4 pb-4 pt-[18px] text-white shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-[12px]">
        <div className="mb-[7px] font-serif text-[17px]">Repeat Customers</div>

        <div className="mb-3 flex gap-[22px] text-[10px] text-[#ededed]">
          <span className="flex items-center gap-[5px]">
            <span className="h-[7px] w-[7px] rounded-full bg-chart-lime-soft" />
            Repeat
          </span>
          <span className="flex items-center gap-[5px]">
            <span className="h-[7px] w-[7px] rounded-full bg-white" />
            One-time
          </span>
        </div>

        <div className="flex justify-center">
          <DonutChart
            rotation={-38}
            holeClassName="bg-[#464646]"
            segments={[
              { color: "var(--color-chart-lime-soft)", portion: 64 },
              { color: "#f0f0ef", portion: 18 },
              { color: "rgba(255,255,255,0.08)", portion: 18 },
            ]}
            label="Total Customers"
            value={<span className="mt-1 text-sm">100K</span>}
          />
        </div>
      </div>
    </div>
  );
}
