import type { ReactNode } from "react";

/**
 * Ring chart used by the hero's opportunity card and the solution card.
 *
 * Built from a conic-gradient with an inset pseudo-element punching out the
 * middle, so there is no SVG or chart library involved. The ring is rotated so
 * the first segment starts at a chosen angle, and the label is counter-rotated
 * by the same amount to stay upright.
 *
 * `holeClassName` must match the card behind it: the "hole" is an opaque disc,
 * not real transparency.
 */
export function DonutChart({
  segments,
  rotation,
  holeClassName,
  label,
  value,
  size = 145,
  className = "",
}: {
  /** Ordered ring segments. Widths are relative and normalised to 360deg. */
  segments: { color: string; portion: number }[];
  /** Degrees to rotate the ring so segment one starts where the design wants. */
  rotation: number;
  /** Tailwind background class for the centre disc; match the card behind it. */
  holeClassName: string;
  label: ReactNode;
  value: ReactNode;
  size?: number;
  className?: string;
}) {
  const total = segments.reduce((sum, s) => sum + s.portion, 0);

  // Running offsets: each segment starts where the previous one ended.
  const stops = segments.reduce<{ stops: string[]; offset: number }>(
    (acc, segment) => {
      const start = (acc.offset / total) * 360;
      const nextOffset = acc.offset + segment.portion;
      const end = (nextOffset / total) * 360;
      return {
        stops: [...acc.stops, `${segment.color} ${start}deg ${end}deg`],
        offset: nextOffset,
      };
    },
    { stops: [], offset: 0 },
  ).stops;

  return (
    <div
      className={`relative rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        background: `conic-gradient(${stops.join(", ")})`,
      }}
    >
      {/* Centre disc: hides the middle of the ring to make it a donut */}
      <div
        className={`absolute inset-[15px] rounded-full ${holeClassName}`}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[2] grid place-items-center text-center text-[10px]"
        style={{ transform: `rotate(${-rotation}deg)` }}
      >
        <div>
          {label}
          <strong className="block font-medium text-white">{value}</strong>
        </div>
      </div>
    </div>
  );
}
