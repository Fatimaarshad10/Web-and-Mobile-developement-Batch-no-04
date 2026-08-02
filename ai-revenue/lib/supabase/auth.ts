import { supabase } from "./client";

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
}

export interface ProfileData {
  authId: string;
  fullName: string;
  businessName: string;
  email: string;
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

  return { success: true, userId: data.user.id };
}

export async function createUserProfile(profile: ProfileData): Promise<SignUpOutcome> {
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

export async function signUpWithProfile(payload: SignUpPayload): Promise<SignUpOutcome> {
  const signUpResult = await signUpUser(payload);

  if (!signUpResult.success || !signUpResult.userId) {
    return signUpResult;
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
