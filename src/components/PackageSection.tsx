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

const PackageSection = () => {
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
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Memuat paket wisata...</p>
      </div>
    );
  }

  return (
    <>
      {/* Packages Grid */}
      {packages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-cyan-200">
                {/* ... Isi Card di sini tetap sama persis seperti kode Anda ... */}
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
                    <CardTitle className="text-xl text-gray-800 mb-2">{pkg.nama_paket}</CardTitle>
                    <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
                        <DollarSign className="h-6 w-6" />
                        {formatRupiah(pkg.harga)}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{pkg.deskripsi}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{pkg.durasi}</span>
                    </div>
                    {pkg.fasilitas && (
                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-800 flex items-center gap-2"><Users className="h-4 w-4" />Fasilitas:</h4>
                            <div className="flex flex-wrap gap-1">
                                {pkg.fasilitas.split(',').map((fasilitas, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">{fasilitas.trim()}</Badge>
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
                            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                                onClick={() => window.open(`https://wa.me/${pkg.kontak.replace(/[^0-9]/g, '')}?text=Halo, saya tertarik dengan paket wisata ${pkg.nama_paket}`, '_blank')}>
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
          {/* ... Tampilan jika paket kosong, biarkan sama ... */}
        </div>
      )}
    </>
  );
};

export default PackageSection;