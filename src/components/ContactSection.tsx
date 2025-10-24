// Impor yang dibutuhkan
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
// Impor ikon WhatsApp
import { FaWhatsapp } from 'react-icons/fa';

const ContactSection = () => {
  // --- Logika WhatsApp ---
  const adminPhoneNumber = "6281234567890"; // <-- GANTI NOMOR INI
  const defaultMessage = "Halo, saya mengunjungi website Desa Wisata Punagaan dan ingin bertanya...";
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;
  // --- Akhir Logika WhatsApp ---

  // --- Logika Google Maps (Direct Link) ---
  // Ini adalah LINK LANGSUNG (bukan embed) ke lokasi Desa Punagaan
  // Saya dapatkan dari Google Maps -> Share -> Copy Link
// INI KODE BARU YANG BENAR (menggunakan link Anda):
const gmapsDirectLink = "https://maps.app.goo.gl/TdZmGtf8kKtExPCT9";  // --- Akhir Logika Gmaps ---

  return (
    <section id="kontak" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hubungi Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ada pertanyaan? Kami siap membantu merencanakan kunjungan Anda ke Desa Wisata Punagaan
          </p>
        </div>

        {/* --- Tata Letak Grid Utama (Info Kiri, Lokasi/WA Kanan) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* === KOLOM KIRI: Informasi Kontak === */}
          
          {/* Hapus div wrapper 'space-y-8' dan tambahkan 'h-full' 
               pada Card agar mengisi penuh tinggi grid */}
          <Card className="shadow-gentle h-full">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Informasi Kontak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Alamat */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Alamat</h4>
                  <p className="text-muted-foreground text-sm">
                    Desa Punagaan, Kecamatan Bontobahari<br />
                    Kabupaten Kepulauan Selayar, Sulawesi Selatan
                  </p>
                </div>
              </div>

              {/* Telepon */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Telepon</h4>
                  <p className="text-muted-foreground text-sm">+62 411 123 4567</p>
                  <p className="text-muted-foreground text-sm">+62 812 3456 7890 (WhatsApp)</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <p className="text-muted-foreground text-sm">info@desawisatapunagaan.id</p>
                  <p className="text-muted-foreground text-sm">wisata@punagaan.selayar.id</p>
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Jam Operasional</h4>
                  <p className="text-muted-foreground text-sm">Senin - Minggu: 08:00 - 17:00 WITA</p>
                  <p className="text-muted-foreground text-sm">Konsultasi: 24/7 (WhatsApp)</p>
                </div>
              </div>
              
            </CardContent>
          </Card>

          {/* === KOLOM KANAN: Lokasi & WhatsApp === */}
          {/* Kolom ini berisi 2 kartu yang lebih pendek */}
          <div className="space-y-8">

            {/* 1. Kartu Lokasi (Tombol Direct Link) */}
            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Lokasi Kami</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                
                <MapPin className="w-16 h-16 text-blue-600" />
                
                <p className="text-muted-foreground">
                  Lihat lokasi kami langsung di Google Maps untuk arahan yang lebih akurat.
                </p>

                <Button 
                  asChild
                  size="lg"
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg py-6 text-lg"
                >
                  <a 
                    href={gmapsDirectLink} // <-- MENGGUNAKAN LINK LANGSUNG
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <MapPin className="w-6 h-6" />
                    Buka Google Maps
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* 2. Kartu WhatsApp (Tombol Biru) */}
            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Chat via WhatsApp</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                
                <FaWhatsapp className="w-16 h-16 text-green-500" />
                
                <p className="text-muted-foreground">
                  Respons tercepat? Hubungi kami langsung di WhatsApp.
                </p>

                <Button 
                  asChild
                  size="lg"
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg py-6 text-lg"
                >
                  <a 
                    href={whatsappUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                    Mulai Chat
                  </a>
                </Button>
              </CardContent>
            </Card>

          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;