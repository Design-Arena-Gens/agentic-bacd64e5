import dataStore from '../../../lib/store';

const securityControls = [
  {
    title: 'Authentication',
    description:
      'OAuth2 integration with adaptive MFA. Analyze login velocity anomalies per tenant in real-time.',
    status: 'Healthy'
  },
  {
    title: 'Authorization',
    description:
      'Role-based and attribute-based access layers. Policy checks enforce tenant isolation across APIs.',
    status: 'Healthy'
  },
  {
    title: 'Payments',
    description:
      'PCI-DSS compliant tokenization via Stripe. Transaction metadata synced to ledger every 10 minutes.',
    status: 'Healthy'
  },
  {
    title: 'Observability',
    description:
      'Centralized audit trails, alerting for rate spikes, and automated incident response playbooks.',
    status: 'Healthy'
  }
];

export default function AdminSecurityPage() {
  const activeUsers = dataStore.getUsers().filter((user) => user.status === 'active').length;
  const tenants = dataStore.getTenants().length;

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">Security posture</h2>
        <p className="text-sm text-slate-500">
          Continuous compliance monitoring with tenant-level guardrails and automated controls.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        <article className="glass-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Active users
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{activeUsers}</p>
          <p className="text-xs text-slate-500">Protected by adaptive MFA and SSO policies</p>
        </article>
        <article className="glass-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Tenants monitored
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{tenants}</p>
          <p className="text-xs text-slate-500">Automated policy enforcement per tenant context</p>
        </article>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {securityControls.map((control) => (
          <article key={control.title} className="glass-panel space-y-3 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">{control.title}</h3>
              <span className="badge bg-emerald-100 text-emerald-600">{control.status}</span>
            </div>
            <p className="text-sm text-slate-500">{control.description}</p>
            <button className="text-xs font-semibold text-primary-600">View details →</button>
          </article>
        ))}
      </section>
    </div>
  );
}
