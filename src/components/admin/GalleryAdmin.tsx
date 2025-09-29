import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Image, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Gallery {
  id: string;
  judul: string;
  tipe: 'foto' | 'video';
  url: string;
}

const GalleryAdmin = () => {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Gallery | null>(null);
  const [formData, setFormData] = useState({
    judul: '',
    tipe: 'foto' as 'foto' | 'video',
    url: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('galeri')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGallery((data as Gallery[]) || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Gagal memuat data galeri",
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
          .from('galeri')
          .update(formData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: "Sukses", description: "Data galeri berhasil diperbarui" });
      } else {
        const { error } = await supabase
          .from('galeri')
          .insert(formData);
        
        if (error) throw error;
        toast({ title: "Sukses", description: "Data galeri berhasil ditambahkan" });
      }
      
      setDialogOpen(false);
      setEditingItem(null);
      setFormData({ judul: '', tipe: 'foto', url: '' });
      fetchGallery();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('gallery-media')
        .getPublicUrl(filePath);

      setFormData({ ...formData, url: data.publicUrl });
      
      toast({
        title: "Sukses",
        description: "File berhasil diupload",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: Gallery) => {
    setEditingItem(item);
    setFormData({
      judul: item.judul,
      tipe: item.tipe,
      url: item.url,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data galeri ini?')) return;
    
    try {
      const { error } = await supabase
        .from('galeri')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Sukses", description: "Data galeri berhasil dihapus" });
      fetchGallery();
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
    setFormData({ judul: '', tipe: 'foto', url: '' });
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Kelola Galeri</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={openAddDialog}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Media' : 'Tambah Media Baru'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="judul">Judul</Label>
                  <Input
                    id="judul"
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipe">Tipe Media</Label>
                  <Select 
                    value={formData.tipe} 
                    onValueChange={(value: 'foto' | 'video') => setFormData({ ...formData, tipe: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="foto">Foto</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input
                  id="file"
                  type="file"
                  accept={formData.tipe === 'foto' ? 'image/*' : 'video/*'}
                  onChange={handleFileUpload}
                />
                {formData.url && (
                  <div className="mt-2">
                    {formData.tipe === 'foto' ? (
                      <img 
                        src={formData.url} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <video 
                        src={formData.url} 
                        className="w-64 h-32 object-cover rounded-lg"
                        controls
                      />
                    )}
                  </div>
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
        {gallery.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {item.tipe === 'foto' ? <Image className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                  {item.judul}
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
              {item.tipe === 'foto' ? (
                <img 
                  src={item.url} 
                  alt={item.judul}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <video 
                  src={item.url} 
                  className="w-full h-32 object-cover rounded-lg"
                  controls
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdmin;