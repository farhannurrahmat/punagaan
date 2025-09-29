import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Package, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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

const PackageAdmin = () => {
  const [packages, setPackages] = useState<PackageWisata[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PackageWisata | null>(null);
  const [formData, setFormData] = useState({
    nama_paket: '',
    harga: 0,
    deskripsi: '',
    fasilitas: '',
    durasi: '',
    kontak: '',
    gambar: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('paket_pariwisata')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPackages(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Gagal memuat data paket wisata",
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
          .from('paket_pariwisata')
          .update(formData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: "Sukses", description: "Paket wisata berhasil diperbarui" });
      } else {
        const { error } = await supabase
          .from('paket_pariwisata')
          .insert(formData);
        
        if (error) throw error;
        toast({ title: "Sukses", description: "Paket wisata berhasil ditambahkan" });
      }
      
      setDialogOpen(false);
      setEditingItem(null);
      setFormData({ nama_paket: '', harga: 0, deskripsi: '', fasilitas: '', durasi: '', kontak: '', gambar: '' });
      fetchPackages();
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
        .from('package-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('package-images')
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

  const handleEdit = (item: PackageWisata) => {
    setEditingItem(item);
    setFormData({
      nama_paket: item.nama_paket,
      harga: item.harga,
      deskripsi: item.deskripsi,
      fasilitas: item.fasilitas,
      durasi: item.durasi,
      kontak: item.kontak,
      gambar: item.gambar,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus paket wisata ini?')) return;
    
    try {
      const { error } = await supabase
        .from('paket_pariwisata')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Sukses", description: "Paket wisata berhasil dihapus" });
      fetchPackages();
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
    setFormData({ nama_paket: '', harga: 0, deskripsi: '', fasilitas: '', durasi: '', kontak: '', gambar: '' });
    setDialogOpen(true);
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Kelola Paket Wisata</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={openAddDialog}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Paket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Paket Wisata' : 'Tambah Paket Wisata Baru'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama_paket">Nama Paket</Label>
                  <Input
                    id="nama_paket"
                    value={formData.nama_paket}
                    onChange={(e) => setFormData({ ...formData, nama_paket: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="harga">Harga (Rp)</Label>
                  <Input
                    id="harga"
                    type="number"
                    value={formData.harga}
                    onChange={(e) => setFormData({ ...formData, harga: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="durasi">Durasi</Label>
                  <Input
                    id="durasi"
                    value={formData.durasi}
                    onChange={(e) => setFormData({ ...formData, durasi: e.target.value })}
                    placeholder="e.g., 2 Hari 1 Malam"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kontak">Kontak</Label>
                  <Input
                    id="kontak"
                    value={formData.kontak}
                    onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                    placeholder="e.g., +62812345678"
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
                <Label htmlFor="fasilitas">Fasilitas</Label>
                <Textarea
                  id="fasilitas"
                  value={formData.fasilitas}
                  onChange={(e) => setFormData({ ...formData, fasilitas: e.target.value })}
                  placeholder="Pisahkan dengan koma (,)"
                  rows={2}
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
        {packages.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  {item.nama_paket}
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
                  alt={item.nama_paket}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-lg font-semibold text-green-600">
                  <DollarSign className="h-4 w-4" />
                  {formatRupiah(item.harga)}
                </div>
                <p className="text-sm text-gray-600">Durasi: {item.durasi}</p>
                <p className="text-sm text-gray-700">{item.deskripsi}</p>
                <p className="text-sm text-gray-600">Kontak: {item.kontak}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PackageAdmin;