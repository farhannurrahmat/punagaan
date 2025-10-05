import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import coralReefImage from '@/assets/coral-reef.jpg';

const TourismSection = () => {
  const [attractions, setAttractions] = useState<any[]>([]);

  useEffect(() => {
    fetchAttractions();
  }, []);

  const fetchAttractions = async () => {
    const { data } = await supabase
      .from('wisata')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setAttractions(data);
  };

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
          {attractions.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Belum ada data wisata tersedia
            </div>
          ) : (
            attractions.map((attraction) => (
              <Card key={attraction.id} className="group hover:transform hover:scale-105 transition-all duration-300 shadow-gentle hover:shadow-ocean">
                <div className="relative overflow-hidden">
                  <img
                    src={attraction.gambar || coralReefImage}
                    alt={attraction.nama_wisata}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-ocean opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary-lighter rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{attraction.nama_wisata}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {attraction.deskripsi || 'Destinasi wisata yang menawan'}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {attraction.lokasi || 'Punagaan, Selayar'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
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