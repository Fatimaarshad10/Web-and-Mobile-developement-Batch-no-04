"use client";

import { Eye, EyeOff, LockKeyhole, Mail, User, Building2, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { signUpWithProfile, validateSignUp } from "@/lib/supabase/auth";

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onLoginOpen: (prefillEmail?: string) => void;
}

interface SignUpFormState {
  fullName: string;
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const initialForm: SignUpFormState = {
  fullName: "",
  businessName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

function getPasswordStrength(password: string) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return score;
}

function getStrengthMeta(score: number) {
  if (score <= 1) {
    return { label: "Weak", className: "bg-rose-500", width: "w-1/4" };
  }

  if (score === 2) {
    return { label: "Fair", className: "bg-amber-500", width: "w-2/4" };
  }

  if (score === 3) {
    return { label: "Good", className: "bg-sky-500", width: "w-3/4" };
  }

  return { label: "Strong", className: "bg-emerald-500", width: "w-full" };
}

export function SignUpModal({ open, onClose, onLoginOpen }: SignUpModalProps) {
  const [form, setForm] = useState<SignUpFormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormState, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const successTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setForm(initialForm);
      setErrors({});
      setShowPassword(false);
      setShowConfirmPassword(false);
      setLoading(false);
      setSuccess(false);
      setError("");
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
      return;
    }
  }, [open]);

  const passwordStrength = getPasswordStrength(form.password);
  const strengthMeta = getStrengthMeta(passwordStrength);

  const updateField = <K extends keyof SignUpFormState>(field: K, value: SignUpFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setError("");
  };

  const validateForm = () => {
    const domainErrors = validateSignUp({
      fullName: form.fullName,
      businessName: form.businessName,
      email: form.email,
      password: form.password,
    });

    const nextErrors: Partial<Record<keyof SignUpFormState, string>> = { ...domainErrors };

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.agreeToTerms) {
      nextErrors.agreeToTerms = "You must accept the terms and conditions.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);

    const result = await signUpWithProfile({
      fullName: form.fullName,
      businessName: form.businessName,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    setSuccess(true);

    successTimerRef.current = window.setTimeout(() => {
      onClose();
      onLoginOpen(form.email.trim());
    }, 1400);
  };

  return (
    <Modal open={open} onClose={onClose} className="max-w-xl rounded-[24px] p-5 sm:p-6">
      <div className="flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 ring-8 ring-violet-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-white">
            <Building2 className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-600">Get started</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-[2rem]">
          Create your account
        </h2>
      </div>

      {success ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-emerald-900">Account created successfully</h3>
          <p className="mt-2 text-sm leading-6 text-emerald-700">
            We saved your workspace details and are opening the sign in flow now.
          </p>
        </div>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="signup-full-name" className="text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="signup-full-name"
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  placeholder="Jane Smith"
                  className="h-11 pl-10 text-sm focus-visible:ring-violet-500"
                  aria-invalid={Boolean(errors.fullName)}
                />
              </div>
              {errors.fullName && <p className="text-xs text-rose-600">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="signup-business-name" className="text-sm font-medium text-slate-700">
                Business Name
              </label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="signup-business-name"
                  value={form.businessName}
                  onChange={(event) => updateField("businessName", event.target.value)}
                  placeholder="Northstar Goods"
                  className="h-11 pl-10 text-sm focus-visible:ring-violet-500"
                  aria-invalid={Boolean(errors.businessName)}
                />
              </div>
              {errors.businessName && <p className="text-xs text-rose-600">{errors.businessName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-email" className="text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="signup-email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="name@company.com"
                className="h-11 pl-10 text-sm focus-visible:ring-violet-500"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-600">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(event) => updateField("password", event.target.value)}
                placeholder="Create a password"
                className="h-11 pl-10 pr-11 text-sm focus-visible:ring-violet-500"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {form.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  <span>Password strength</span>
                  <span className="text-slate-700">{strengthMeta.label}</span>
                </div>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((segment) => (
                    <span
                      key={segment}
                      className={cn(
                        "h-2 flex-1 rounded-full transition-all",
                        segment < passwordStrength ? strengthMeta.className : "bg-slate-200",
                        passwordStrength > 0 && segment === passwordStrength - 1 && "ring-2 ring-violet-200"
                      )}
                    />
                  ))}
                </div>
              </div>
            )}

            {errors.password && <p className="text-xs text-rose-600">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-confirm-password" className="text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(event) => updateField("confirmPassword", event.target.value)}
                placeholder="Re-enter your password"
                className="h-11 pl-10 pr-11 text-sm focus-visible:ring-violet-500"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-rose-600">{errors.confirmPassword}</p>}
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.agreeToTerms}
              onChange={(event) => updateField("agreeToTerms", event.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
            />
            <span>
              I agree to the <span className="font-medium text-violet-700">Terms &amp; Conditions</span>
            </span>
          </label>
          {errors.agreeToTerms && <p className="-mt-2 text-xs text-rose-600">{errors.agreeToTerms}</p>}

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-violet-600 text-sm font-medium text-white shadow-[0_16px_32px_-18px_rgba(124,92,252,0.8)] hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      )}

      {!success && (
        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onLoginOpen(form.email || undefined);
            }}
            className="font-medium text-violet-700 transition-colors hover:text-violet-800"
          >
            Sign In
          </button>
        </p>
      )}
    </Modal>
  );
}
