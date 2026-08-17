import { supabase } from "./client";

// Security: Passwords are NEVER stored in the `profiles` table.
// Supabase Auth (`supabase.auth.signUp`) is the only mechanism that handles
// password hashing and storage. Our application database stores only
// non-sensitive profile data (auth_id, full_name, business_name, email).
//
// If a `password` column already exists in `public.profiles` from an earlier
// schema version, do NOT use it. Remove it with a destructive migration such
// as: ALTER TABLE public.profiles DROP COLUMN IF EXISTS password;
// Only run that if you confirm the column exists and is unused.

const PASSWORD_FIELDS = new Set([
  "password",
  "password_hash",
  "password_hex",
  "confirm_password",
  "confirmPassword",
]);

function stripPasswordFields(payload: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (PASSWORD_FIELDS.has(key)) {
      continue;
    }
    sanitized[key] = value;
  }
  return sanitized;
}

export function assertNoPasswordLeak(payload: Record<string, unknown>): void {
  const leaked = Object.keys(payload).filter((key) => PASSWORD_FIELDS.has(key));
  if (leaked.length > 0) {
    throw new Error(
      `Security violation: password-related fields must not be stored in profiles. Detected: ${leaked.join(", ")}`
    );
  }
}
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export interface SignUpPayload {
  fullName: string;
  businessName: string;
  email: string;
  password: string;
}

export type SignUpErrorMap = Partial<Record<Extract<keyof SignUpPayload, "email" | "fullName" | "businessName" | "password">, string>>;

export interface SignUpOutcome {
  success: boolean;
  error?: string;
  userId?: string;
  session?: { access_token: string } | null;
}

export interface ProfileData {
  authId: string;
  fullName: string;
  businessName: string;
  email: string;
}

export interface ProfileUpdatePayload {
  fullName?: string;
  businessName?: string;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return { success: false, error: error?.message ?? "No authenticated user found." };
  }
  return { success: true, user: data.user };
}

export async function getProfile(authId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("auth_id, full_name, business_name, email, created_at")
    .eq("auth_id", authId)
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, profile: data };
}

export async function updateProfile(authId: string, payload: ProfileUpdatePayload) {
  const updateData: Record<string, string> = {};
  if (payload.fullName !== undefined) updateData.full_name = payload.fullName.trim();
  if (payload.businessName !== undefined) updateData.business_name = payload.businessName.trim();

  const { data, error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("auth_id", authId)
    .select("auth_id, full_name, business_name, email, created_at")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, profile: data };
}

export function validateSignUp(payload: SignUpPayload): SignUpErrorMap {
  const errors: SignUpErrorMap = {};

  if (!payload.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!payload.businessName.trim()) {
    errors.businessName = "Business name is required.";
  }

  if (!payload.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(payload.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!payload.password) {
    errors.password = "Password is required.";
  } else if (payload.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  return errors;
}

export const hasErrors = (errors: SignUpErrorMap): boolean => Object.keys(errors).length > 0;

export async function signUpUser(payload: SignUpPayload): Promise<SignUpOutcome> {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email.trim(),
    password: payload.password,
  });

  if (error || !data.user) {
    return {
      success: false,
      error: error?.message ?? "Unable to create account. Please try again.",
    };
  }

  return { success: true, userId: data.user.id, session: data.session };
}

// NOTE: Never insert passwords, password hashes, or confirm passwords into `profiles`.
// Supabase Auth is the sole owner of credential data.
export async function createUserProfile(profile: ProfileData): Promise<SignUpOutcome> {
  assertNoPasswordLeak({
    auth_id: profile.authId,
    full_name: profile.fullName,
    business_name: profile.businessName,
    email: profile.email,
  });

  const { error } = await supabase.from("profiles").insert({
    auth_id: profile.authId,
    full_name: profile.fullName.trim(),
    business_name: profile.businessName.trim(),
    email: profile.email.trim(),
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return { success: true, userId: profile.authId };
}

export interface SignInOutcome {
  success: boolean;
  error?: string;
  session?: { access_token: string } | null;
}

export async function signInUser(email: string, password: string): Promise<SignInOutcome> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message === "Invalid login credentials"
        ? "Those credentials do not match our records. Please try again."
        : error.message,
    };
  }

  return { success: true, session: data.session };
}

export async function signUpWithProfile(payload: SignUpPayload): Promise<SignUpOutcome> {
  const signUpResult = await signUpUser(payload);

  if (!signUpResult.success || !signUpResult.userId) {
    return signUpResult;
  }

  if (!signUpResult.session) {
    return {
      success: false,
      error: "Please confirm your email address before continuing. Check your inbox for the confirmation link.",
    };
  }

  const profile: ProfileData = {
    authId: signUpResult.userId,
    fullName: payload.fullName,
    businessName: payload.businessName,
    email: payload.email,
  };

  const profileResult = await createUserProfile(profile);

  if (!profileResult.success) {
    return profileResult;
  }

  return { success: true, userId: signUpResult.userId };
}
