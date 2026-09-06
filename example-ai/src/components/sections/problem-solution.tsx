import { ProductPanel } from "@/components/ui/product-panel";
import { SolutionCard } from "@/components/ui/solution-card";

export function ProblemSolution() {
  return (
    <section
      id="platform"
      className="flex w-full justify-center bg-white px-[18px] py-[35px] sm:px-[35px] sm:py-[55px] lg:min-h-[720px] lg:px-[90px] lg:py-[86px]"
    >
      <div className="grid w-full max-w-[1260px] items-start gap-[42px] lg:grid-cols-[1.02fr_1.15fr]">
        <ProductPanel />

        <div>
          <span className="mb-[22px] inline-flex rounded-[20px] bg-pill px-3 py-[7px] text-[11px]">
            The Problem &amp; Solution
          </span>

          <h2 className="max-w-[560px] font-serif text-[44px] font-medium leading-[0.98] tracking-[-2.2px] text-[#181818] lg:text-[clamp(48px,4.2vw,65px)]">
            Disconnected Sales Insights Across Teams
          </h2>

          <p className="mb-11 mt-7 max-w-[610px] text-[15px] leading-[1.65] text-[#5d5d5d]">
            Most teams struggle to get a clear and complete view of their sales
            performance across different tools and channels.
          </p>

          <div className="grid items-center gap-7 sm:grid-cols-2 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h3 className="mb-[18px] font-serif text-[30px] font-medium leading-[1.1] tracking-[-0.8px]">
                Bring all sales data into one system
              </h3>
              <p className="mb-6 text-[13px] leading-[1.45] text-[#636363]">
                RevenuePilot brings everything together—so you can track,
                analyze, and grow your sales in real time.
              </p>
              <button
                type="button"
                className="cursor-pointer rounded-3xl bg-white px-[29px] py-3 text-[13px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_2px_10px_rgba(0,0,0,0.10)]"
              >
                Learn More
              </button>
            </div>

            <SolutionCard />
          </div>
        </div>
      </div>
    </section>
  );
}
