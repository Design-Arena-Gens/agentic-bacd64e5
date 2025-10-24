import { notFound } from 'next/navigation';
import dataStore from '../../../../lib/store';
import ServiceCard from '../../../../components/ServiceCard';

type CategoryPageProps = {
  params: {
    categoryId: string;
  };
};

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const category = dataStore.getCategories().find((item) => item.id === params.categoryId);
  if (!category) {
    notFound();
  }
  const services = dataStore.getServices({ categoryId: category.id });

  return (
    <div className="container-responsive space-y-8 py-12">
      <header className="space-y-3">
        <span className="badge bg-primary-100 text-primary-700">{category.icon} curated</span>
        <h1 className="text-3xl font-semibold text-slate-900">{category.name}</h1>
        <p className="text-sm text-slate-600">{category.description}</p>
      </header>
      <div className="grid-auto-fit">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
