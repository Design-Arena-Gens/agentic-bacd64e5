export default function RegisterPage() {
  return (
    <div className="container-responsive flex min-h-[60vh] flex-col items-center justify-center py-12">
      <div className="glass-panel w-full max-w-xl space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Create account</h1>
          <p className="text-sm text-slate-500">
            Join PulseMarket to unlock curated vendors, live availability, and secure payments.
          </p>
        </div>
        <form className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-600">
            First name
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="Jamie"
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            Last name
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="Rivera"
            />
          </label>
          <label className="sm:col-span-2 text-sm font-semibold text-slate-600">
            Email
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="you@example.com"
            />
          </label>
          <label className="sm:col-span-2 text-sm font-semibold text-slate-600">
            Password
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="••••••••"
            />
          </label>
          <label className="sm:col-span-2 flex items-center gap-3 text-xs text-slate-500">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary-500" />
            I agree to the Terms of Service and Privacy Policy.
          </label>
          <button
            type="submit"
            className="sm:col-span-2 rounded-xl bg-primary-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Create account
          </button>
        </form>
        <p className="text-center text-xs text-slate-400">
          We never share your data. Encryption and compliance tooling protects every tenant.
        </p>
      </div>
    </div>
  );
}
