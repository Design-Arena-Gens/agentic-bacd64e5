export default function LoginPage() {
  return (
    <div className="container-responsive flex min-h-[60vh] flex-col items-center justify-center py-12">
      <div className="glass-panel w-full max-w-md space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Log in</h1>
          <p className="text-sm text-slate-500">
            Access your marketplace account with secure authentication.
          </p>
        </div>
        <form className="space-y-4">
          <label className="block text-left text-sm font-semibold text-slate-600">
            Email
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-left text-sm font-semibold text-slate-600">
            Password
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="••••••••"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-xl bg-primary-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Continue
          </button>
        </form>
        <p className="text-center text-xs text-slate-400">
          Protected by adaptive MFA and real-time risk scoring.
        </p>
      </div>
    </div>
  );
}
