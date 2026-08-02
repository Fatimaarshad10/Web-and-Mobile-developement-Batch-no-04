import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductRow {
  image: string;
  name: string;
  units: string;
  revenue: string;
  conversion: string;
  growth: number;
}

interface TopProductsTableProps {
  products: ProductRow[];
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Top Performing Products</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Units Sold</th>
              <th className="px-5 py-3 font-medium">Revenue</th>
              <th className="px-5 py-3 font-medium">Conversion</th>
              <th className="px-5 py-3 font-medium">Growth</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.name} className="border-t border-slate-200 transition-colors hover:bg-slate-50/80">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-100 to-blue-100 ring-1 ring-slate-200" />
                    <div>
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-xs text-slate-400">#{product.image}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{product.units}</td>
                <td className="px-5 py-4 text-sm font-semibold text-slate-900">{product.revenue}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{product.conversion}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    <ArrowUpRight className="h-3 w-3" />
                    {product.growth}%
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-500 hover:bg-slate-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
