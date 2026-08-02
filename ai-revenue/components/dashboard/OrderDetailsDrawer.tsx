import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function OrderDetailsDrawer({ open, onClose }: OrderDetailsDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-[2px]">
      <div className="h-full w-full max-w-xl border-l border-slate-200 bg-white p-6 shadow-2xl transition-transform duration-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Order details</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">#A10482</h3>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose} className="h-9 w-9 rounded-xl hover:bg-slate-100">
            <X className="h-4 w-4 text-slate-500" />
          </Button>
        </div>

        <div className="mt-6 space-y-6">
          <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Customer</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">JD</div>
              <div>
                <p className="font-semibold text-slate-900">John Davis</p>
                <p className="text-sm text-slate-500">john@example.com</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[18px] border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Shipping</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">2979 Oak Avenue<br />Seattle, WA 98101</p>
            </div>
            <div className="rounded-[18px] border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Payment</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">Visa •••• 4242<br />Status: Paid</p>
            </div>
          </div>

          <div className="rounded-[18px] border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Products</p>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between text-sm text-slate-700">
                <span>Summit Trail Backpack</span>
                <span>$162.00</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-700">
                <span>Aero Running Jacket</span>
                <span>$124.00</span>
              </div>
            </div>
          </div>

          <div className="rounded-[18px] border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Timeline</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div>• Order placed — Mar 18, 10:42 AM</div>
              <div>• Payment captured — Mar 18, 10:45 AM</div>
              <div>• Order packed — Mar 19, 3:15 PM</div>
              <div>• Shipped — Mar 20, 8:00 AM</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500">
              Mark as shipped
            </Button>
            <Button variant="outline" className="rounded-xl border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Contact customer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
