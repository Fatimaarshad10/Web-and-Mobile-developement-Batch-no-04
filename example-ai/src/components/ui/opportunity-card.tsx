import { DonutChart } from "@/components/ui/donut-chart";

/**
 * "Revenue signals" card floating over the hero image.
 * The ring itself is the shared DonutChart; only the segments and the colour of
 * the centre disc differ from the solution card's version.
 */
export function OpportunityCard() {
  return (
    <div className="rounded-[17px] border border-white/12 bg-[rgba(52,54,49,0.68)] p-[19px] shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-[18px]">
      <div className="font-serif text-lg text-white">Revenue signals</div>

      <div className="mt-2 flex gap-[18px] text-[10px] text-[#c3c5be]">
        <div className="flex items-center gap-1.5">
          <span className="h-[7px] w-[7px] rounded-full bg-lime" />
          High intent
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-[7px] w-[7px] rounded-full bg-white" />
          Normal
        </div>
      </div>

      <div className="mt-[15px] flex justify-center">
        <DonutChart
          rotation={-40}
          holeClassName="bg-card"
          className="text-[#dadbd6]"
          segments={[
            { color: "var(--color-lime)", portion: 225 },
            { color: "#f1f1ed", portion: 67 },
            { color: "rgba(255,255,255,0.08)", portion: 68 },
          ]}
          label="Opportunity score"
          value={<span className="mt-[3px] text-lg">82%</span>}
        />
      </div>
    </div>
  );
}
