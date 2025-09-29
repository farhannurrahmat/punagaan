import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save } from 'lucide-react';

interface ProfileDesa {
  id: string;
  nama_desa: string;
  sejarah: string;
  visi: string;
  misi: string;
  gambar: string;
}

const ProfileAdmin = () => {
  const [profile, setProfile] = useState<ProfileDesa | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profil_desa')
        .select('*')
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Gagal memuat profil desa",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profil_desa')
        .update({
          nama_desa: profile.nama_desa,
          sejarah: profile.sejarah,
          visi: profile.visi,
          misi: profile.misi,
          gambar: profile.gambar,
        })
        .eq('id', profile.id);

      if (error) throw error;

      toast({
        title: "Sukses",
        description: "Profil desa berhasil diperbarui",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('village-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('village-images')
        .getPublicUrl(filePath);

      setProfile({ ...profile, gambar: data.publicUrl });
      
      toast({
        title: "Sukses",
        description: "Gambar berhasil diupload",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!profile) {
    return <div className="flex justify-center p-8">Profil tidak ditemukan</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          Edit Profil Desa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nama_desa">Nama Desa</Label>
              <Input
                id="nama_desa"
                value={profile.nama_desa}
                onChange={(e) => setProfile({ ...profile, nama_desa: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gambar">Upload Gambar</Label>
              <Input
                id="gambar"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {profile.gambar && (
                <img 
                  src={profile.gambar} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sejarah">Sejarah</Label>
            <Textarea
              id="sejarah"
              value={profile.sejarah}
              onChange={(e) => setProfile({ ...profile, sejarah: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visi">Visi</Label>
            <Textarea
              id="visi"
              value={profile.visi}
              onChange={(e) => setProfile({ ...profile, visi: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="misi">Misi</Label>
            <Textarea
              id="misi"
              value={profile.misi}
              onChange={(e) => setProfile({ ...profile, misi: e.target.value })}
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            disabled={saving}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileAdmin;