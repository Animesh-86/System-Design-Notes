'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/nextAuthOptions';

export async function signInWithEmail(formData?: FormData) {
  void formData;
  // Email/password auth is not implemented — use Google OAuth via NextAuth
  return { error: 'Email sign-in is not available. Please use "Continue with Google".' };
}

export async function signUpWithEmail(formData?: FormData) {
  void formData;
  // Email/password auth is not implemented — use Google OAuth via NextAuth
  return { error: 'Email sign-up is not available. Please use "Continue with Google".' };
}

export async function signInWithGoogle() {
  // Redirect to NextAuth's Google sign-in endpoint
  redirect('/api/auth/signin/google');
}

export async function signOut() {
  redirect('/api/auth/signout');
}

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
