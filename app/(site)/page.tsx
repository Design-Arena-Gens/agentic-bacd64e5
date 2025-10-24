import dataStore from '../../lib/store';
import HeroBanner from '../../components/HeroBanner';
import CategoryGrid from '../../components/CategoryGrid';
import RealtimeTicker from '../../components/RealtimeTicker';
import FeaturedVendors from '../../components/sections/FeaturedVendors';
import TrendingServices from '../../components/sections/TrendingServices';
import ExperienceHighlights from '../../components/sections/ExperienceHighlights';

export const revalidate = 0;

export default async function HomePage() {
  const vendors = dataStore.getVendors();
  const services = dataStore.getServices();

  return (
    <div className="space-y-12">
      <HeroBanner totalVendors={vendors.length} totalServices={services.length} />
      <RealtimeTicker />
      <CategoryGrid />
      <FeaturedVendors />
      <TrendingServices />
      <ExperienceHighlights />
    </div>
  );
}
