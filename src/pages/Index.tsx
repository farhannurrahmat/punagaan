import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProfileSection from '@/components/ProfileSection';
import TourismSection from '@/components/TourismSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProfileSection />
      <TourismSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
