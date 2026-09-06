/**
 * The four-dot diamond that sits beside the "AI Revenue" wordmark.
 * Pure CSS squares positioned in a 26x26 box, same as the original design.
 */
export function LogoMark() {
  return (
    <div className="relative h-[26px] w-[26px]" aria-hidden="true">
      <span className="absolute left-[9px] top-0 h-2 w-2 rounded-[2px] bg-white" />
      <span className="absolute left-0 top-[9px] h-2 w-2 rounded-[2px] bg-white" />
      <span className="absolute right-0 top-[9px] h-2 w-2 rounded-[2px] bg-white" />
      <span className="absolute bottom-0 left-[9px] h-2 w-2 rounded-[2px] bg-white" />
    </div>
  );
}
