import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Camera, Waves, Fish } from 'lucide-react';
import coralReefImage from '@/assets/coral-reef.jpg';

const TourismSection = () => {
  const attractions = [
    {
      id: 1,
      name: 'Taman Laut Takabonerate',
      description: 'Salah satu taman laut terbesar di dunia dengan terumbu karang yang menakjubkan dan keanekaragaman hayati yang luar biasa.',
      image: coralReefImage,
      category: 'Diving & Snorkeling',
      icon: Fish,
      highlights: ['Terumbu Karang', 'Diving', 'Snorkeling', 'Fotografi Bawah Laut']
    },
    {
      id: 2,
      name: 'Pantai Pasir Putih Punagaan',
      description: 'Pantai dengan pasir putih yang halus dan air laut yang jernih, perfect untuk bersantai dan menikmati sunset.',
      image: coralReefImage,
      category: 'Beach & Relaxation',
      icon: Waves,
      highlights: ['Pantai Putih', 'Sunset', 'Swimming', 'Beach Volleyball']
    },
    {
      id: 3,
      name: 'Desa Tradisional Nelayan',
      description: 'Eksplorasi kehidupan nelayan tradisional dan belajar tentang budaya maritim yang telah turun temurun.',
      image: coralReefImage,
      category: 'Cultural Experience',
      icon: Camera,
      highlights: ['Budaya Lokal', 'Nelayan', 'Perahu Tradisional', 'Kuliner Laut']
    },
  ];

  return (
    <section id="wisata" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Destinasi Wisata Unggulan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jelajahi keajaiban alam dan budaya Punagaan yang menawan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction) => {
            const IconComponent = attraction.icon;
            return (
              <Card key={attraction.id} className="group hover:transform hover:scale-105 transition-all duration-300 shadow-gentle hover:shadow-ocean">
                <div className="relative overflow-hidden">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-ocean opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <Badge className="absolute top-4 left-4 bg-accent/90 text-accent-foreground">
                    {attraction.category}
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary-lighter rounded-lg">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{attraction.name}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {attraction.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {attraction.highlights.map((highlight, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs bg-secondary-lighter text-secondary border-secondary/20"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      Punagaan, Selayar
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-primary/20 text-primary hover:bg-primary-lighter"
                    >
                      Lihat Detail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-ocean text-white border-0 hover:opacity-90 shadow-ocean px-8 py-3 rounded-full"
          >
            Lihat Semua Destinasi
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TourismSection;