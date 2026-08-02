"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

const AUTH_STORAGE_KEY = "ai-revenue-auth";
const USER_STORAGE_KEY = "ai-revenue-user";
const DEMO_EMAIL = "demo@airevenue.com";
const DEMO_PASSWORD = "12345678";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onCreateAccount?: () => void;
  prefillEmail?: string;
}

export function LoginModal({ open, onClose, onCreateAccount, prefillEmail = "" }: LoginModalProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setShowForm(false);
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setRememberMe(true);
      setError("");
      setLoading(false);
      return;
    }

    if (prefillEmail) {
      setEmail(prefillEmail);
      setShowForm(true);
    }
  }, [open, prefillEmail]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      setError("Please enter both your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    const savedCredentials = storedUser ? JSON.parse(storedUser) : null;
    const isSavedUserMatch = savedCredentials && normalizedEmail === savedCredentials.email && normalizedPassword === savedCredentials.password;
    const isDemoUserMatch = normalizedEmail === DEMO_EMAIL && normalizedPassword === DEMO_PASSWORD;

    if (!isSavedUserMatch && !isDemoUserMatch) {
      setError("Those credentials do not match our records. Please try again.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    localStorage.setItem(`${AUTH_STORAGE_KEY}-remember`, rememberMe ? "true" : "false");
    window.dispatchEvent(new Event("auth-change"));

    setLoading(false);
    onClose();
    router.push("/dashboard");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-center">
        <div className="relative h-16 w-16 overflow-hidden bg-transparent sm:h-20 sm:w-20">
          <Image src="/logo.png" alt="AI Revenue Recovery" fill className="object-contain" />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-600">Welcome back</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-[2rem]">
          Sign in to your account
        </h2>
      </div>

      {!showForm ? (
        <div className="mt-5 space-y-4">
          <p className="text-center text-sm leading-6 text-slate-500">
            Monitor revenue, recover lost sales, and act before growth slips away.
          </p>

          <Button
            type="button"
            onClick={() => setShowForm(true)}
            className="h-12 w-full rounded-xl bg-violet-600 text-sm font-medium text-white shadow-[0_16px_32px_-18px_rgba(124,92,252,0.8)] hover:bg-violet-500"
          >
            Continue
          </Button>
        </div>
      ) : (
        <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="login-email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@company.com"
                className="h-11 pl-10 text-sm focus-visible:ring-violet-500"
                autoComplete="email"
                aria-invalid={Boolean(error)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="login-password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <button type="button" className="text-xs font-medium text-violet-700 hover:text-violet-800">
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="h-11 pl-10 pr-11 text-sm focus-visible:ring-violet-500"
                autoComplete="current-password"
                aria-invalid={Boolean(error)}
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
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
            />
            Remember me
          </label>

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
            {loading ? "Signing in..." : "Login"}
          </Button>

          {onCreateAccount && (
            <button
              type="button"
              onClick={onCreateAccount}
              className="w-full text-center text-sm font-medium text-violet-700 transition-colors hover:text-violet-800"
            >
              Create Account
            </button>
          )}
        </form>
      )}

    </Modal>
  );
}
