import { Navbar } from "@/components/layout/navbar";
import { RevenueCard } from "@/components/ui/revenue-card";
import { OpportunityCard } from "@/components/ui/opportunity-card";

/**
 * The source photo is a tall portrait headshot with the head high in the frame.
 * `crop=top` anchors the crop window to the top edge so the whole head stays in
 * shot: a default centre crop slices the top of the head off. CSS then places
 * the subject on the right, clear of the headline column.
 */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=top&w=1400&h=1150&q=90";

export function Hero() {
  return (
    <section
      className="relative min-h-[950px] w-full overflow-hidden md:min-h-[760px]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(7,8,7,0.97) 0%, rgba(7,8,7,0.92) 26%, rgba(7,8,7,0.62) 48%, rgba(7,8,7,0.18) 68%, rgba(7,8,7,0.10) 100%), url("${HERO_IMAGE}")`,
        backgroundSize: "cover",
        backgroundPosition: "78% top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Vignette: darkens the outer edges without dimming the subject */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 72% 42%, transparent 22%, rgba(0,0,0,0.06) 45%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      <Navbar />

      {/* Headline column */}
      <div className="relative z-[4] w-full px-5 pb-[300px] pt-[85px] md:w-3/4 md:px-0 md:pb-20 md:pl-[30px] md:pt-[125px] lg:w-[61%] lg:pl-20">
        <div className="mb-[27px] inline-flex items-center gap-[7px] rounded-[20px] border border-white/10 bg-white/13 px-3 py-[7px] text-xs text-[#ededeb] backdrop-blur-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_12px_var(--color-lime)]" />
          AI-powered revenue intelligence
        </div>

        <h1 className="max-w-[680px] font-serif text-[48px] font-medium leading-[1.02] tracking-[-2px] text-cream md:text-[clamp(53px,5vw,76px)] md:tracking-[-2.6px]">
          Turn every revenue signal into{" "}
          <span className="text-lime">growth.</span>
        </h1>

        <p className="mt-7 max-w-[520px] text-sm leading-[1.7] text-muted md:text-base">
          Connect your sales, customer and business data. Let AI detect
          opportunities, predict revenue and recommend the next best action
          for your team.
        </p>

        <div className="mt-8 flex flex-col items-start gap-[18px] sm:flex-row sm:items-center">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-3 rounded-[28px] bg-lime px-[21px] py-[15px] text-sm font-bold text-[#15170d] shadow-[0_12px_35px_rgba(200,237,32,0.13)] transition duration-200 hover:-translate-y-0.5 hover:bg-lime-bright"
          >
            Start growing with AI
            <span className="grid h-[25px] w-[25px] place-items-center rounded-full bg-black/12">
              ↗
            </span>
          </button>

          <a href="#platform" className="text-sm text-[#dedfd9]">
            Explore the platform <span className="ml-[5px]">→</span>
          </a>
        </div>
      </div>

      {/* Floating analytics cards */}
      <aside className="absolute bottom-[55px] left-5 right-5 z-[5] flex flex-col gap-[15px] md:left-auto md:bottom-[76px] md:right-[30px] md:w-[250px] lg:right-[70px] lg:w-[300px]">
        <RevenueCard />
        <OpportunityCard />
      </aside>

      <p className="absolute bottom-5 left-5 z-[4] text-[11px] text-white/48 md:bottom-[30px] md:left-[30px] lg:left-20">
        Revenue intelligence for modern growth teams
      </p>
    </section>
  );
}
