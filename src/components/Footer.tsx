import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Desa Wisata Punagaan</h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Menjelajahi keindahan alam Kepulauan Selayar dengan pengalaman wisata 
              yang tak terlupakan. Nikmati pesona pantai, budaya lokal, dan kehangatan 
              masyarakat Punagaan.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors duration-200"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li>
                <a href="#beranda" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#profil" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  Profil Desa
                </a>
              </li>
              <li>
                <a href="#wisata" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  Wisata
                </a>
              </li>
              <li>
                <a href="#galeri" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  Galeri
                </a>
              </li>
              <li>
                <a href="#kontak" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <p className="text-sm">
                Desa Punagaan, Bontobahari<br />
                Kepulauan Selayar, Sulawesi Selatan
              </p>
              <p className="text-sm">
                Telepon: +62 411 123 4567
              </p>
              <p className="text-sm">
                Email: info@desawisatapunagaan.id
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 text-sm">
            © 2024 Desa Wisata Punagaan. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors duration-200">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors duration-200">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;