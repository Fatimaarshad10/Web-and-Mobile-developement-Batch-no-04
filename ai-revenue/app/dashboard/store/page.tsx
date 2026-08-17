"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { Store } from "@/lib/mock/stores";
import { getStores, createStore } from "@/lib/supabase/stores";
import { getCurrentUser } from "@/lib/supabase/auth";
import { Loader2 } from "lucide-react";

export default function StorePage() {
  const router = useRouter();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    logo: "",
    heroTitle: "",
    heroDescription: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadStores = async () => {
      setLoading(true);
      setError("");

      const userResult = await getCurrentUser();
      if (!userResult.success || !userResult.user) {
        setError("Please sign in to view stores.");
        setLoading(false);
        return;
      }

      try {
        const data = await getStores(userResult.user.id);
        setStores(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stores.");
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Store name is required";
    if (!form.slug.trim()) newErrors.slug = "Store slug is required";
    if (!form.heroTitle.trim()) newErrors.heroTitle = "Hero title is required";
    if (!form.heroDescription.trim()) newErrors.heroDescription = "Hero description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const userResult = await getCurrentUser();
    if (!userResult.success || !userResult.user) {
      setError("Please sign in to create a store.");
      return;
    }

    setSaving(true);
    try {
      const newStore = await createStore(userResult.user.id, {
        name: form.name,
        slug: form.slug,
        description: form.description,
        logo: form.logo,
        heroTitle: form.heroTitle,
        heroDescription: form.heroDescription,
      });
      setStores((prev) => [newStore, ...prev]);
      setForm({ name: "", slug: "", description: "", logo: "", heroTitle: "", heroDescription: "" });
      setErrors({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create store.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 py-4">
      <div>
        <p className="text-sm font-semibold text-violet-600">Storefront</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
          Stores
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Create and manage your public storefronts.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
          <SectionHeader
            eyebrow="Create"
            title="Create Store"
            description="Set up a new public storefront for your products."
          />

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Store Name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Fatima Fashion"
                className={cn("mt-1.5", errors.name && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100")}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Store Slug</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder="e.g. fatima-fashion"
                className={cn("mt-1.5", errors.slug && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100")}
              />
              {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Store Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Short description of your store"
                rows={3}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Store Logo URL</label>
              <Input
                value={form.logo}
                onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))}
                placeholder="https://example.com/logo.png"
                className="mt-1.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Hero Title</label>
              <Input
                value={form.heroTitle}
                onChange={(e) => setForm((f) => ({ ...f, heroTitle: e.target.value }))}
                placeholder="e.g. Welcome to Fatima Fashion"
                className={cn("mt-1.5", errors.heroTitle && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100")}
              />
              {errors.heroTitle && <p className="mt-1 text-xs text-red-600">{errors.heroTitle}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Hero Description</label>
              <textarea
                value={form.heroDescription}
                onChange={(e) => setForm((f) => ({ ...f, heroDescription: e.target.value }))}
                placeholder="Short hero description for your store"
                rows={3}
                className={cn("mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100", errors.heroDescription && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100")}
              />
              {errors.heroDescription && <p className="mt-1 text-xs text-red-600">{errors.heroDescription}</p>}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setForm({ name: "", slug: "", description: "", logo: "", heroTitle: "", heroDescription: "" })}
                className="rounded-xl border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 disabled:opacity-50"
              >
                {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : "Create Store"}
              </Button>
            </div>
          </form>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.26)]">
          <SectionHeader
            eyebrow="Your stores"
            title="Existing Stores"
            description="Manage your created stores."
          />

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
            </div>
          ) : stores.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No stores yet. Create your first store to get started.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{store.name}</p>
                    <p className="text-xs text-slate-500">/{store.slug}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/store/${store.slug}`)}
                    className="rounded-xl border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                  >
                    Open Store
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}