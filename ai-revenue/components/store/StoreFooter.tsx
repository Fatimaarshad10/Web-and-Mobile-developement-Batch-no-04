"use client";

import { Store } from "@/lib/mock/stores";

interface StoreFooterProps {
  store: Store;
}

export default function StoreFooter({ store }: StoreFooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {store.name}. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            Powered by AI Revenue Recovery
          </p>
        </div>
      </div>
    </footer>
  );
}
