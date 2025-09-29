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
        <section id="profil" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Profil Desa Punagaan
            </h2>
            <ProfileSection />
          </div>
        </section>
        <section id="wisata" className="py-16 bg-gradient-to-br from-cyan-50 to-blue-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Destinasi Wisata Unggulan
            </h2>
            <TourismSection />
          </div>
        </section>
        <section id="galeri" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <GallerySection />
          </div>
        </section>
        <section id="kontak" className="py-16 bg-gradient-to-br from-cyan-50 to-blue-100">
          <div className="container mx-auto px-4">
            <ContactSection />
          </div>
        </section>
      <Footer />
    </div>
  );
};

export default Index;
