export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "AI Insights", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Sales Dashboard", href: "#" },
      { label: "Report Generator", href: "#" },
      { label: "Real-time Analytics", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Documentation", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "#" },
      { label: "Features", href: "#" },
      { label: "About Us", href: "#about" },
      { label: "Use Cases", href: "#" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", glyph: "◎", href: "#" },
  { label: "YouTube", glyph: "▶", href: "#" },
  { label: "X", glyph: "𝕏", href: "#" },
  { label: "Facebook", glyph: "●", href: "#" },
];
