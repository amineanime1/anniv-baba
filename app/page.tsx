import { HeroSection } from '@/components/hero-section';
import { FeaturedProducts } from '@/components/featured-products';
import { Categories } from '@/components/categories';
import { AboutSection } from '@/components/about-section';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <FeaturedProducts />
      <Categories />
      <AboutSection />
    </div>
  );
}