// src/pages/Index.tsx (atau di mana pun file ini berada)

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProfileSection from '@/components/ProfileSection';
import TourismSection from '@/components/TourismSection';
import PackageSection from '@/components/PackageSection'; // <-- 1. Impor komponen baru
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
          <ProfileSection />
        </div>
      </section>
      <section id="wisata" className="py-16 bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4">
          <TourismSection />
        </div>
      </section>
    
      <section id="paket-wisata" className="py-16 bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4">
          <PackageSection />
        </div>
      </section>

      {/* --- TAMBAHKAN BAGIAN INI --- */}
      {/* <section id="paket-wisata" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Paket Wisata Pilihan
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Pilih paket yang paling sesuai untuk petualangan Anda.
            </p>
          </div>
          <PackageSection /> 
        </div>
      </section> */}
      {/* --------------------------- */}

      <section id="galeri" className="py-16 bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4">
          <GallerySection />
        </div>
      </section>
      <section id="kontak" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ContactSection />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;