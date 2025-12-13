import { useState, useEffect } from 'react';
import { getHomepageItems, getCategories } from '../services/api';
import { useWebsite } from '../context/WebsiteContext';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';
import ScrollToTopButton from '../components/ScrollToTopButton';
import NewsletterSignup from '../components/NewsletterSignup';
import CallToActionSection from '../components/CallToActionSection';
import HeroSection from '../components/HeroSection';
import PopularProductsSection from '../components/PopularProductsSection';
import MoreGamesSection from '../components/MoreGamesSection';
import BestSellingGamesSection from '../components/BestSellingGamesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import CategoriesSection from '../components/CategoriesSection';
import CommonBackground from '../components/CommonBackground';

interface HomepageItem {
  id: string;
  name: string;
  price: number | string;
  originalPrice?: number | string;
  slug: string;
  url?: string;
  isPopular?: boolean;
  rating?: number;
  people?: number;
  category?: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
}

const HomePage = () => {
  const [homepageItems, setHomepageItems] = useState<HomepageItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { getHeroList } = useWebsite();
  const heroList = getHeroList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, categoriesResponse] = await Promise.all([
          getHomepageItems(20),
          getCategories()
        ]);

        setHomepageItems(itemsResponse.data || []);
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        // Silent error handling
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        <CommonBackground />
        <LoadingSpinner
          size="xl"
          text="Ana Sayfa Yükleniyor..."
          variant="gaming"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <SEOHead />
      
      {/* Common Background */}
      <CommonBackground />

      <div className="w-full relative z-10">
        {/* Modern Vertical Layout - All Sections Stacked */}
        <div className="w-full space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* 1. Hero Section */}
            <section className="w-full">
              <div className="h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden rounded-3xl">
                <HeroSection
                  heroList={heroList}
                  currentHeroIndex={currentHeroIndex}
                  setCurrentHeroIndex={setCurrentHeroIndex}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
              </div>
            </section>

            {/* 2. Categories Section */}
            {categories.length > 0 && (
              <section className="w-full">
                <div className="rounded-3xl backdrop-blur-xl border p-8"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                  }}
                >
                  <CategoriesSection categories={categories} />
                </div>
              </section>
            )}

            {/* 3. Best Selling Games Section */}
            <section className="w-full">
              <div className="rounded-3xl backdrop-blur-xl border p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                }}
              >
                <BestSellingGamesSection homepageItems={homepageItems} />
              </div>
            </section>

            {/* 4. Popular Products Section */}
            <section className="w-full">
              <div className="rounded-3xl backdrop-blur-xl border p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                }}
              >
                <PopularProductsSection />
              </div>
            </section>

            {/* 5. How It Works Section */}
            <section className="w-full">
              <div className="rounded-3xl backdrop-blur-xl border p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                }}
              >
                <HowItWorksSection />
              </div>
            </section>

            {/* 6. More Games Section */}
            <section className="w-full">
              <div className="rounded-3xl backdrop-blur-xl border p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                }}
              >
                <MoreGamesSection homepageItems={homepageItems} />
              </div>
            </section>

            {/* 7. Newsletter Section */}
            <section className="w-full">
              <div className="rounded-3xl backdrop-blur-xl border p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                }}
              >
                <NewsletterSignup />
              </div>
            </section>

            {/* 8. Call To Action Section */}
            <section className="w-full">
              <div className="rounded-3xl backdrop-blur-xl border p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                }}
              >
                <CallToActionSection />
              </div>
            </section>

          </div>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default HomePage;
