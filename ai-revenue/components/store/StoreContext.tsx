"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Store } from "@/lib/mock/stores";
import { getStoreBySlug } from "@/lib/supabase/stores";

interface StoreContextValue {
  store: Store | null;
  loading: boolean;
  error: string;
}

const StoreContext = createContext<StoreContextValue | null>(null);

interface StoreProviderProps {
  children: ReactNode;
  slug: string;
}

export function StoreProvider({ children, slug }: StoreProviderProps) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadStore = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getStoreBySlug(slug);
        if (!cancelled) {
          setStore(data);
          if (!data) {
            setError("Store not found");
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load store");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadStore();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <StoreContext.Provider value={{ store, loading, error }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
