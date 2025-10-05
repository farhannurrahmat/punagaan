import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Users, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PackageWisata {
  id: string;
  nama_paket: string;
  harga: number;
  deskripsi: string;
  fasilitas: string;
  durasi: string;
  kontak: string;
  gambar: string;
}

const PackageWisata = () => {
  const [packages, setPackages] = useState<PackageWisata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('paket_pariwisata')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat paket wisata...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Paket Wisata Punagaan
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nikmati pengalaman tak terlupakan dengan berbagai paket wisata yang telah kami siapkan. 
            Dari wisata bahari hingga eksplorasi budaya lokal, temukan petualangan yang sesuai dengan keinginan Anda.
          </p>
        </div>

        {/* Packages Grid */}
        {packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-cyan-200">
                {pkg.gambar && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pkg.gambar} 
                      alt={pkg.nama_paket}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-semibold text-cyan-700">{pkg.durasi}</span>
                    </div>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 mb-2">
                    {pkg.nama_paket}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
                    <DollarSign className="h-6 w-6" />
                    {formatRupiah(pkg.harga)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pkg.deskripsi}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{pkg.durasi}</span>
                  </div>

                  {pkg.fasilitas && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-800 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Fasilitas:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {pkg.fasilitas.split(',').map((fasilitas, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {fasilitas.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{pkg.kontak}</span>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                        onClick={() => window.open(`https://wa.me/${pkg.kontak.replace(/[^0-9]/g, '')}?text=Halo, saya tertarik dengan paket wisata ${pkg.nama_paket}`, '_blank')}
                      >
                        Pesan Sekarang
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">Belum Ada Paket Wisata</h3>
            <p className="text-gray-500">Paket wisata akan segera tersedia. Silakan kembali lagi nanti.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg border border-cyan-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Butuh Paket Khusus?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Kami juga menyediakan paket wisata custom sesuai kebutuhan dan budget Anda. 
            Hubungi kami untuk konsultasi dan dapatkan penawaran terbaik!
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            onClick={() => window.open('https://wa.me/6281234567890?text=Halo, saya ingin konsultasi paket wisata custom', '_blank')}
          >
            Konsultasi Gratis
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PackageWisata;