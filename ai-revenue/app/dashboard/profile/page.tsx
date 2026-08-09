"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Building2, Mail, Save, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, getProfile, updateProfile, type ProfileUpdatePayload } from "@/lib/supabase/auth";
import { supabase } from "@/lib/supabase/client";

const AUTH_STORAGE_KEY = "ai-revenue-auth";

interface ProfileForm {
  fullName: string;
  businessName: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState<ProfileForm>({ fullName: "", businessName: "", email: "" });
  const [authId, setAuthId] = useState<string | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    if (!isAuthenticated) {
      router.replace("/?login=1");
      return;
    }

    const loadProfile = async () => {
      const userResult = await getCurrentUser();
      if (!userResult.success || !userResult.user) {
        router.replace("/?login=1");
        return;
      }

      const profileResult = await getProfile(userResult.user.id);
      if (profileResult.success && profileResult.profile) {
        const profile = profileResult.profile;
        setAuthId(profile.auth_id ?? userResult.user.id);
        setForm({
          fullName: profile.full_name ?? "",
          businessName: profile.business_name ?? "",
          email: profile.email ?? userResult.user.email ?? "",
        });
      } else {
        setAuthId(userResult.user.id);
        setForm((prev) => ({ ...prev, email: userResult.user.email ?? prev.email }));
      }

      setLoading(false);
    };

    loadProfile();
  }, [router]);

  const handleSave = async () => {
    if (!authId) return;
    setSaving(true);
    setError("");
    setSuccess("");

    const payload: ProfileUpdatePayload = {
      fullName: form.fullName,
      businessName: form.businessName,
    };

    const result = await updateProfile(authId, payload);
    setSaving(false);

    if (!result.success) {
      setError(result.error ?? "Failed to update profile.");
      return;
    }

    setSuccess("Profile updated successfully.");
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="text-sm text-slate-500">View and update your workspace details.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workspace Information</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {success}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                  disabled={!editing}
                  className="h-11 pl-9 text-sm"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="businessName" className="text-sm font-medium text-slate-700">
                Business Name
              </label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="businessName"
                  value={form.businessName}
                  onChange={(event) => setForm((prev) => ({ ...prev, businessName: event.target.value }))}
                  disabled={!editing}
                  className="h-11 pl-9 text-sm"
                  placeholder="Your business name"
                />
              </div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  disabled
                  className="h-11 bg-slate-50 pl-9 text-sm text-slate-500"
                />
              </div>
              <p className="text-xs text-slate-400">Email cannot be changed from here.</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            {editing ? (
              <>
                <Button variant="outline" onClick={() => setEditing(false)} disabled={saving}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}