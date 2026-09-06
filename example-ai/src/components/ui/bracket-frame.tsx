import type { ReactNode } from "react";

/**
 * The technical-drawing frame used by the About and Footer sections.
 *
 * How it is drawn:
 *  - The frame itself has only top and bottom rules (no side borders).
 *  - Two brackets hang outside the left and right edges, each with a top,
 *    bottom and one side rule, producing the "[ ]" shape.
 *  - Four small boxes sit over the long rules. They are painted the same colour
 *    as the section background, so they mask a gap in the line and create the
 *    stepped break near each corner.
 *
 * That masking is why the corners are `bg-white`: it only works while the
 * surrounding section is white. If this frame is ever used on a tinted
 * background, the corner fill must change to match it.
 *
 * Brackets and corners are decorative, so they are hidden below `sm`, where the
 * frame falls back to a plain four-sided border.
 *
 * The two call sites differ only in how far the brackets are inset and how far
 * the corner masks are nudged, so those are props. The defaults are the About
 * section's values.
 */
export function BracketFrame({
  children,
  bracketTop = 74,
  bracketBottom = 56,
  cornerTopOffset = 25,
  cornerBottomOffset = 18,
  className = "",
  contentClassName = "text-center",
}: {
  children: ReactNode;
  /** Distance from the frame's top edge to where the brackets start. */
  bracketTop?: number;
  /** Distance from the frame's bottom edge to where the brackets end. */
  bracketBottom?: number;
  /** Downward nudge of the two top corner masks. */
  cornerTopOffset?: number;
  /** Upward nudge of the two bottom corner masks. */
  cornerBottomOffset?: number;
  className?: string;
  contentClassName?: string;
}) {
  const cornerBase =
    "pointer-events-none absolute hidden h-[29px] w-[23px] border-x border-line bg-white sm:block " +
    "before:absolute before:-left-px before:-right-px before:border-t before:border-line before:content-['']";

  // The brackets are ::before / ::after on this element. Their vertical inset
  // varies per section, so it is set inline rather than through a class.
  const bracketInset = {
    "--bracket-top": `${bracketTop}px`,
    "--bracket-bottom": `${bracketBottom}px`,
  } as React.CSSProperties;

  return (
    <div
      style={bracketInset}
      className={`
        relative w-full max-w-[1085px]
        border-x border-y border-line
        sm:border-x-0
        before:absolute before:bottom-[var(--bracket-bottom)] before:top-[var(--bracket-top)]
        before:hidden before:w-[24px] before:border-y before:border-l before:border-line
        before:content-[''] before:-left-[24px] sm:before:block
        lg:before:-left-[42px] lg:before:w-[42px]
        after:absolute after:bottom-[var(--bracket-bottom)] after:top-[var(--bracket-top)]
        after:hidden after:w-[24px] after:border-y after:border-r after:border-line
        after:content-[''] after:-right-[24px] sm:after:block
        lg:after:-right-[42px] lg:after:w-[42px]
        ${className}
      `}
    >
      {/* Corner masks: top pair breaks the top rule, bottom pair the bottom */}
      <span
        className={`${cornerBase} left-0 top-0 before:top-0`}
        style={{ transform: `translateY(${cornerTopOffset}px)` }}
      />
      <span
        className={`${cornerBase} right-0 top-0 before:top-0`}
        style={{ transform: `translateY(${cornerTopOffset}px)` }}
      />
      <span
        className={`${cornerBase} bottom-0 left-0 before:bottom-0`}
        style={{ transform: `translateY(-${cornerBottomOffset}px)` }}
      />
      <span
        className={`${cornerBase} bottom-0 right-0 before:bottom-0`}
        style={{ transform: `translateY(-${cornerBottomOffset}px)` }}
      />

      <div className={`relative z-[2] ${contentClassName}`}>{children}</div>
    </div>
  );
}
