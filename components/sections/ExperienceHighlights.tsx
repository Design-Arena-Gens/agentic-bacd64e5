const highlights = [
  {
    title: 'Multi-tenant architecture',
    description:
      'Isolate configuration, content, and vendor rosters per tenant with flexible pricing controls.',
    metrics: ['Tenant-level SLA insights', 'Custom subscription plans', 'Branded storefronts']
  },
  {
    title: 'Real-time operations',
    description:
      'Socket-powered updates stream vendor availability, order progress, and live geolocation.',
    metrics: ['Sub-200ms event fan-out', 'Live location tracking', 'Automated order alerts']
  },
  {
    title: 'Actionable intelligence',
    description:
      'Unified analytics surfaces revenue, conversion funnels, and utilization signals across tenants.',
    metrics: ['Revenue intelligence', 'Vendor scorecards', 'User engagement heatmaps']
  }
];

export default function ExperienceHighlights() {
  return (
    <section className="container-responsive">
      <div className="glass-panel overflow-hidden bg-gradient-to-br from-white via-white to-primary-50 p-10">
        <div className="grid gap-8 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.description}</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {item.metrics.map((metric) => (
                  <li key={metric} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary-500" />
                    {metric}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
