export type NavLink = {
  label: string;
  href: string;
};

/** Primary nav shown in the hero pill. Add routes here as pages are built. */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Insights", href: "#insights" },
  { label: "Pricing", href: "#pricing" },
];
