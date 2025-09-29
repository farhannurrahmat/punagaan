import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import coralReefImage from '@/assets/coral-reef.jpg';
import villageImage from '@/assets/village-view.jpg';
import heroImage from '@/assets/hero-beach.jpg';

const GallerySection = () => {
  const galleryItems = [
    {
      id: 1,
      image: heroImage,
      title: 'Pantai Punagaan',
      category: 'Alam',
    },
    {
      id: 2,
      image: coralReefImage,
      title: 'Kehidupan Bawah Laut',
      category: 'Diving',
    },
    {
      id: 3,
      image: villageImage,
      title: 'Desa Nelayan',
      category: 'Budaya',
    },
    {
      id: 4,
      image: coralReefImage,
      title: 'Terumbu Karang',
      category: 'Alam',
    },
    {
      id: 5,
      image: heroImage,
      title: 'Sunset di Punagaan',
      category: 'Alam',
    },
    {
      id: 6,
      image: villageImage,
      title: 'Perahu Tradisional',
      category: 'Budaya',
    },
  ];

  return (
    <section id="galeri" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Galeri Punagaan
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Saksikan keindahan Desa Wisata Punagaan melalui koleksi foto terbaik kami
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryItems.map((item, index) => (
            <Card 
              key={item.id} 
              className={`group overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:scale-105 shadow-gentle hover:shadow-tropical ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                    index === 0 ? 'h-80 md:h-full' : 'h-64'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-ocean opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.category}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-accent/90 text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Gallery Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['Semua', 'Alam', 'Budaya', 'Diving', 'Kuliner'].map((category) => (
            <Button
              key={category}
              variant={category === 'Semua' ? 'default' : 'outline'}
              className={
                category === 'Semua'
                  ? 'bg-primary hover:bg-primary-light'
                  : 'border-primary/20 text-primary hover:bg-primary-lighter'
              }
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-tropical text-nature-foreground border-0 hover:opacity-90 shadow-tropical px-8 py-3 rounded-full"
          >
            Lihat Galeri Lengkap
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;