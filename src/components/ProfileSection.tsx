import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Waves } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import villageImage from '@/assets/village-view.jpg';

const ProfileSection = () => {
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
    <section id="profil" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Profil {profileData?.nama_desa || 'Desa Punagaan'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mengenal lebih dekat desa wisata yang memadukan keindahan alam dengan kearifan lokal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={profileData?.gambar || villageImage}
              alt={profileData?.nama_desa || 'Desa Punagaan'}
              className="w-full h-96 object-cover rounded-2xl shadow-gentle"
            />
            <div className="absolute inset-0 bg-gradient-tropical opacity-20 rounded-2xl" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Tentang {profileData?.nama_desa || 'Punagaan'}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {profileData?.sejarah || 'Desa Punagaan terletak di Kepulauan Selayar, Sulawesi Selatan, yang dikenal sebagai salah satu destinasi wisata bahari terbaik di Indonesia.'}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center p-4 bg-primary-lighter border-primary/20">
                <CardContent className="p-0">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium text-primary">Lokasi</div>
                  <div className="text-xs text-muted-foreground">Selayar</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-4 bg-secondary-lighter border-secondary/20">
                <CardContent className="p-0">
                  <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <div className="text-sm font-medium text-secondary">Penduduk</div>
                  <div className="text-xs text-muted-foreground">2,500+</div>
                </CardContent>
              </Card>
              
              <Card className="text-center p-4 bg-nature-lighter border-nature/20">
                <CardContent className="p-0">
                  <Waves className="w-8 h-8 text-nature mx-auto mb-2" />
                  <div className="text-sm font-medium text-nature">Pantai</div>
                  <div className="text-xs text-muted-foreground">15+ Spot</div>
                </CardContent>
              </Card>
            </div>

            {/* Vision Mission */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Visi</h4>
                <p className="text-sm text-muted-foreground">
                  {profileData?.visi || 'Menjadi desa wisata bahari berkelanjutan yang melestarikan alam dan budaya lokal'}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-secondary mb-2">Misi</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {profileData?.misi || '• Mengembangkan pariwisata ramah lingkungan\n• Memberdayakan masyarakat lokal\n• Melestarikan ekosistem laut dan budaya'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;