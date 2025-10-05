import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hero-beach.jpg';

const Hero = () => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profil_desa')
      .select('*')
      .single();
    
    if (data) setProfileData(data);
  };
  return (
    <section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Selamat Datang di
            <span className="block text-accent mt-2">
              Desa Wisata Punagaan
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Nikmati keindahan alam, budaya ramah, dan pesona laut biru di Selayar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => {
                const packageSection = document.getElementById('paket-wisata');
                if (packageSection) {
                  packageSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/paket-wisata';
                }
              }}
              className="bg-secondary hover:bg-secondary-light text-secondary-foreground font-semibold px-8 py-4 rounded-full shadow-tropical transition-all duration-300"
            >
              Jelajahi Sekarang
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('profil')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-white/70 w-6 h-6" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 fill-background"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;