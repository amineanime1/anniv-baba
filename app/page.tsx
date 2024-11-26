import { HeroSection } from '@/components/hero-section';
import { FeaturedProducts } from '@/components/featured-products';
import { Categories } from '@/components/categories';
import { AboutSection } from '@/components/about-section';
import { FeaturesSection } from '@/components/features-section';
import { TestimonialsSection } from '@/components/testimonials-section';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
      <Categories />
      <TestimonialsSection />
      <AboutSection />
    </div>
  );
}