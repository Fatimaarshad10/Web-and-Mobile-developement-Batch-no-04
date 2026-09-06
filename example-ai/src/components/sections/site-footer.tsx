import Link from "next/link";
import { BracketFrame } from "@/components/ui/bracket-frame";
import { SubscribeForm } from "@/components/ui/subscribe-form";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/lib/footer";

export function SiteFooter() {
  return (
    <footer className="flex w-full flex-col justify-between bg-white px-5 pb-[22px] pt-[34px] sm:px-[34px] sm:pb-6 sm:pt-[50px] lg:min-h-[720px] lg:px-[88px] lg:pb-[30px] lg:pt-[78px]">
      <div className="mx-auto w-full max-w-[1260px]">
        <BracketFrame
          bracketTop={87}
          bracketBottom={65}
          cornerTopOffset={31}
          cornerBottomOffset={20}
          contentClassName=""
          className="mx-auto px-[14px] pb-7 pt-9 sm:px-[46px] sm:pb-7 sm:pt-[42px] lg:min-h-[555px] lg:px-[84px] lg:pb-[30px] lg:pt-[44px]"
        >
          {/* Newsletter */}
          <div className="mx-auto max-w-[620px] text-center">
            <h2 className="font-serif text-[36px] font-medium leading-[1.03] tracking-[-1.6px] lg:text-[clamp(36px,3.2vw,47px)]">
              Get the latest features, tips, and
              <br />
              updates delivered to your inbox
            </h2>

            <SubscribeForm />

            <nav
              aria-label="Social links"
              className="mt-8 flex items-center justify-center gap-[19px] text-base"
            >
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-[18px] w-[18px] items-center justify-center text-[#222] no-underline transition-opacity hover:opacity-60"
                >
                  <span aria-hidden="true">{social.glyph}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Link columns */}
          <div className="mt-[50px] grid grid-cols-2 items-start gap-x-7 gap-y-[34px] sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-[34px] lg:mt-16 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-[52px]">
            <div className="col-span-2 max-w-[340px] sm:col-span-1">
              <div className="flex items-center gap-3 font-serif text-[28px] leading-none">
                <BrandMark />
                Revora
              </div>
              <p className="mt-6 max-w-[320px] text-[13px] leading-[1.55] text-[#9d9d9d]">
                Empowering with real-time sales insights, smarter analytics, and
                data-driven growth decisions.
              </p>
            </div>

            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="mb-5 text-[13px] font-medium">{column.title}</h3>
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="mb-4 block text-[13px] text-[#292929] no-underline transition-opacity hover:opacity-60"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </BracketFrame>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex w-full max-w-[1085px] flex-col items-start justify-between gap-5 pt-5 text-xs sm:flex-row sm:items-center sm:gap-0 sm:pt-6">
        <div>© 2026 revora. All rights reserved.</div>
        <a href="#top" className="text-[#222] no-underline hover:opacity-60">
          Back to up
        </a>
      </div>
    </footer>
  );
}

/** Four-square brand mark. Decorative, so hidden from assistive tech. */
function BrandMark() {
  return (
    <div aria-hidden="true" className="relative h-[31px] w-[31px] flex-none">
      <span className="absolute left-0 top-0 h-3 w-3 rounded-[2px] bg-[#222]" />
      <span className="absolute right-0 top-0 h-3 w-3 rounded-[2px] bg-[#222]" />
      <span className="absolute bottom-0 left-0 h-3 w-3 rounded-[2px] bg-[#222]" />
      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-[2px] bg-[#222]" />
    </div>
  );
}
