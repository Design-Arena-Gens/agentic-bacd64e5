const contentBlocks = [
  {
    title: 'Homepage hero',
    description: 'Control hero messaging, imagery, and promotional CTAs per tenant.',
    lastEditedBy: 'Samara Ray',
    updatedAt: new Date(Date.now() - 3600 * 1000).toISOString()
  },
  {
    title: 'Vendor spotlight carousel',
    description: 'Curate featured vendors and promotional banners with scheduling windows.',
    lastEditedBy: 'Editorial Team',
    updatedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString()
  },
  {
    title: 'Knowledge base',
    description: 'Manage articles, FAQs, and onboarding content syndicated across tenants.',
    lastEditedBy: 'Ops Enablement',
    updatedAt: new Date(Date.now() - 86400 * 1000).toISOString()
  }
];

export default function AdminCmsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">Content management</h2>
        <p className="text-sm text-slate-500">
          Orchestrate editorial content, contextual promotions, and support documentation.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contentBlocks.map((block) => (
          <article key={block.title} className="glass-panel space-y-3 p-5">
            <h3 className="text-lg font-semibold text-slate-800">{block.title}</h3>
            <p className="text-sm text-slate-500">{block.description}</p>
            <div className="text-xs text-slate-400">
              Last edited by {block.lastEditedBy}
              <br />
              {new Date(block.updatedAt).toLocaleString()}
            </div>
            <button className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600">
              Edit block
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
