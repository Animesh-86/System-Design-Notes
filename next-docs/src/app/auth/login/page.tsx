"use client";

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ArrowRight, BookOpen, CheckCircle2, Loader2, ShieldCheck, Sparkles, Wand2 } from 'lucide-react';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#060608]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await signIn('google', { callbackUrl });
    } catch {
      setError('Google sign-in could not start. Check GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_URL, and the Google redirect URI settings.');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050506] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute -top-32 left-[-6rem] h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="absolute bottom-[-8rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              System Design Hub
            </div>

            <div className="mt-8 max-w-2xl space-y-5">
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Sign in and keep your system design notes in sync.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Use the Google account configured in your OAuth console. This page is aligned with the setup in your screenshots: localhost for development, the Vercel domain for production, and the Google callback route under <span className="font-semibold text-white">/api/auth/callback/google</span>.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Protected access',
                  text: 'Session-based auth keeps the reader and dashboard behind login.',
                },
                {
                  icon: Wand2,
                  title: 'OAuth only',
                  text: 'No dead email/password form, just the working Google flow.',
                },
                {
                  icon: ArrowRight,
                  title: 'Fast callback',
                  text: 'Redirects back to your selected page after sign-in completes.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <item.icon className="h-5 w-5 text-cyan-300" />
                  <h2 className="mt-3 text-sm font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-4 text-sm leading-6 text-slate-300">
              <div className="flex items-center gap-2 font-semibold text-cyan-200">
                <CheckCircle2 className="h-4 w-4" />
                Required Google Console settings
              </div>
              <p className="mt-2">
                Add <span className="font-semibold text-white">http://localhost:3000</span> and your production domain as authorized JavaScript origins, and add both <span className="font-semibold text-white">/api/auth/callback/google</span> URLs as redirect URIs.
              </p>
            </div>
          </section>

          <aside className="flex items-center">
            <div className="w-full rounded-[2rem] border border-white/10 bg-[#0d0d10]/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 shadow-lg shadow-sky-500/20">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Authentication</p>
                  <h2 className="text-xl font-bold text-white">Continue with Google</h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                  <p>Matches the attached OAuth setup for localhost and the Vercel deployment.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                  <p>Uses your existing NextAuth route at <span className="font-semibold text-white">/api/auth/[...nextauth]</span>.</p>
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                <span>{loading ? 'Opening Google sign-in...' : 'Continue with Google'}</span>
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>

              <p className="mt-4 text-xs leading-6 text-slate-500">
                You will be redirected to Google, then returned to your requested page or the dashboard.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}