import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Wisata {
  id: string;
  nama_wisata: string;
  deskripsi: string;
  gambar: string;
  lokasi: string;
}

const WisataAdmin = () => {
  const [wisata, setWisata] = useState<Wisata[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Wisata | null>(null);
  const [formData, setFormData] = useState({
    nama_wisata: '',
    deskripsi: '',
    gambar: '',
    lokasi: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchWisata();
  }, []);

  const fetchWisata = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('wisata')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWisata(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Gagal memuat data wisata",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('wisata')
          .update(formData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: "Sukses", description: "Data wisata berhasil diperbarui" });
      } else {
        const { error } = await supabase
          .from('wisata')
          .insert(formData);
        
        if (error) throw error;
        toast({ title: "Sukses", description: "Data wisata berhasil ditambahkan" });
      }
      
      setDialogOpen(false);
      setEditingItem(null);
      setFormData({ nama_wisata: '', deskripsi: '', gambar: '', lokasi: '' });
      fetchWisata();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('tourism-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('tourism-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, gambar: data.publicUrl });
      
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

  const handleEdit = (item: Wisata) => {
    setEditingItem(item);
    setFormData({
      nama_wisata: item.nama_wisata,
      deskripsi: item.deskripsi,
      gambar: item.gambar,
      lokasi: item.lokasi,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data wisata ini?')) return;
    
    try {
      const { error } = await supabase
        .from('wisata')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Sukses", description: "Data wisata berhasil dihapus" });
      fetchWisata();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setFormData({ nama_wisata: '', deskripsi: '', gambar: '', lokasi: '' });
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Kelola Data Wisata</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={openAddDialog}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Wisata
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Wisata' : 'Tambah Wisata Baru'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama_wisata">Nama Wisata</Label>
                  <Input
                    id="nama_wisata"
                    value={formData.nama_wisata}
                    onChange={(e) => setFormData({ ...formData, nama_wisata: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lokasi">Lokasi</Label>
                  <Input
                    id="lokasi"
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea
                  id="deskripsi"
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  rows={3}
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
                {formData.gambar && (
                  <img 
                    src={formData.gambar} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
              </div>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                {editingItem ? 'Update' : 'Simpan'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wisata.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {item.nama_wisata}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {item.gambar && (
                <img 
                  src={item.gambar} 
                  alt={item.nama_wisata}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}
              <p className="text-sm text-gray-600 mb-2">{item.lokasi}</p>
              <p className="text-sm text-gray-700">{item.deskripsi}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WisataAdmin;