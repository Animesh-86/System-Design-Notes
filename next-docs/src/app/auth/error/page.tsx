import Link from 'next/link';

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const error = searchParams?.error;

  const messageMap: Record<string, string> = {
    OAuthAccountNotLinked: 'This Google account is not linked to an existing login on this site yet.',
    AccessDenied: 'Google sign-in was denied by the provider.',
    Configuration: 'Authentication is not configured correctly on the server.',
    Callback: 'Google sign-in failed while returning to the site.',
    Default: 'Something went wrong during sign-in.',
  };

  const message = messageMap[error || ''] || messageMap.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050506] text-white px-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-lg">
        <h1 className="text-2xl font-bold">Sign-in error</h1>
        <p className="mt-3 text-sm text-slate-300">{message}</p>

        {error && <p className="mt-3 text-xs text-slate-500">Error code: {error}</p>}

        <div className="mt-6 flex gap-3">
          <Link href="/auth/login" className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-950">
            Back to sign in
          </Link>
          <Link href="/" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-white/90 hover:bg-white/5">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}