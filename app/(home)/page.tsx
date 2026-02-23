import { Hero } from '@/components/home/Hero';
import { GetStartedSection } from '@/components/home/GetStartedSection';

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 w-full max-md:w-auto mx-auto px-6 py-12">
      <Hero />
      <GetStartedSection />
    </div>
  );
}
