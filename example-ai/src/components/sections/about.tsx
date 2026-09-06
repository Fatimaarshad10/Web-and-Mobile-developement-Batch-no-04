import { Fragment } from "react";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { ABOUT_STATS } from "@/lib/stats";

export function About() {
  return (
    <section
      id="about"
      className="flex w-full items-center justify-center bg-white px-[22px] py-[55px] sm:px-[35px] sm:py-[70px] lg:min-h-[700px] lg:px-[85px] lg:py-[110px]"
    >
      <div className="flex w-full max-w-[1260px] items-center justify-center">
        <BracketFrame className="px-3 pb-[45px] pt-[58px] sm:px-[45px] sm:pb-[60px] sm:pt-[70px] lg:min-h-[455px] lg:px-[110px] lg:pb-[70px] lg:pt-[82px]">
          <span className="mb-[22px] inline-flex items-center justify-center rounded-[20px] bg-pill px-[11px] py-[7px] text-xs leading-none text-[#313131]">
            About us
          </span>

          <h2 className="mx-auto max-w-[860px] font-serif text-[34px] font-medium leading-[1.08] tracking-[-1px] text-ink-light sm:text-[clamp(33px,3.25vw,47px)] sm:tracking-[-1.7px]">
            We help businesses turn sales data into clear insights,{" "}
            <span className="text-soft">
              so teams can spot opportunities, make smarter decisions, and grow
              revenue with confidence.
            </span>
          </h2>

          {/* Stats: stacked with horizontal rules on mobile, in a row with
              vertical rules from sm up. */}
          <div className="mx-auto mt-[50px] flex max-w-[720px] flex-col items-center gap-[25px] sm:mt-[74px] sm:grid sm:grid-cols-[1fr_1px_1fr_1px_1fr] sm:items-center sm:gap-0 sm:gap-x-[25px] lg:gap-x-[38px]">
            {ABOUT_STATS.map((stat, index) => (
              <Fragment key={stat.label}>
                {index > 0 && (
                  <div
                    aria-hidden="true"
                    className="h-px w-[70%] bg-line sm:h-[64px] sm:w-px sm:justify-self-center"
                  />
                )}
                <div className="text-center sm:text-left">
                  <div className="mb-2 whitespace-nowrap font-serif text-[36px] font-medium leading-none tracking-[-1.2px] sm:text-[39px]">
                    {stat.value}
                  </div>
                  <div className="whitespace-nowrap text-[13px] leading-[1.25] text-[#222]">
                    {stat.label}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </BracketFrame>
      </div>
    </section>
  );
}
