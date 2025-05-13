"use server";

import { cookies } from "next/headers";

type User = {
  id: string;
  email: string;
  name?: string;
};

type SignUpParams = {
  name: string;
  email: string;
};

type SignInParams = {
  user: User;
};

export async function signUp(params: SignUpParams) {
  try {
    return {
      success: true,
      message: "Account created successfully.",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  try {
    const { user } = params;
    
    // Store user info in a session cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: "user_session",
      value: JSON.stringify(user),
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return {
      success: true,
      message: "Successfully signed in."
    };
  } catch (error: any) {
    console.error("Sign in error:", error);
    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("user_session");
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("user_session");
  
  if (!session?.value) return null;
  
  try {
    return JSON.parse(session.value) as User;
  } catch {
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
