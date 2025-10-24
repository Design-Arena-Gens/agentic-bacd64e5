import dataStore from '../../../lib/store';

export default function CategoriesPage() {
  const categories = dataStore.getCategories();

  return (
    <div className="container-responsive space-y-8 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">Marketplace categories</h1>
        <p className="text-sm text-slate-600">
          Every tenant can activate and customize category structures, pricing controls, and
          metadata. Explore baseline curated verticals powering the PulseMarket ecosystem.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article key={category.id} className="glass-panel p-6">
            <div className="flex items-center gap-3 text-lg font-semibold text-slate-800">
              <span className="text-3xl">{category.icon}</span>
              {category.name}
            </div>
            <p className="mt-2 text-sm text-slate-500">{category.description}</p>
            <a
              href={`/categories/${category.id}`}
              className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600"
            >
              View services →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
