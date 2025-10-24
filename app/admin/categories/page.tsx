import dataStore from '../../../lib/store';

export default function AdminCategoriesPage() {
  const categories = dataStore.getCategories();

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">Category hierarchy</h2>
        <p className="text-sm text-slate-500">
          Configure taxonomies, attach compliance metadata, and synchronize marketplace discovery.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article key={category.id} className="glass-panel space-y-3 p-5">
            <div className="flex items-center gap-3 text-lg font-semibold text-slate-800">
              <span className="text-3xl">{category.icon}</span>
              {category.name}
            </div>
            <p className="text-sm text-slate-500">{category.description}</p>
            <dl className="text-xs text-slate-500">
              <dt className="font-semibold uppercase tracking-wide">Slug</dt>
              <dd>{category.id}</dd>
            </dl>
            <button className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600">
              Edit taxonomy
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
