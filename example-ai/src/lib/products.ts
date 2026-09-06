export type ProductRank = {
  name: string;
  place: string;
  /** Bar width as a percentage of the track. */
  share: number;
  /** Tailwind background class for the filled portion. */
  fillClassName: string;
};

export const PRODUCT_METRICS = [
  { value: "$24,500", label: "Total Sales" },
  { value: "1,240 pcs", label: "Units Sold" },
  { value: "+18%", label: "Growth" },
];

export const PRODUCT_RANKS: ProductRank[] = [
  {
    name: "Modern Electric Bicycle",
    place: "1st",
    share: 100,
    fillClassName: "bg-chart-lime",
  },
  { name: "Smart Camera", place: "2nd", share: 48, fillClassName: "bg-white" },
  {
    name: "Red Electric Kettle",
    place: "3rd",
    share: 29,
    fillClassName: "bg-chart-blue",
  },
];
