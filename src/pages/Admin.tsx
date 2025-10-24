// TAMBAHKAN IMPOR 'Link' dan 'Home'
import { Navigate, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, MapPin, Image, Package, FileText, Home } from 'lucide-react'; // <-- Tambahkan 'Home'
import ProfileAdmin from '@/components/admin/ProfileAdmin';
import WisataAdmin from '@/components/admin/WisataAdmin';
import GalleryAdmin from '@/components/admin/GalleryAdmin';
import PackageAdmin from '@/components/admin/PackageAdmin';

const Admin = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      <header className="bg-white shadow-sm border-b border-cyan-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* // MODIFIKASI BAGIAN HEADER */}
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Panel - Desa Wisata Punagaan
            </h1>
            
            {/* Buat div wrapper untuk menampung kedua tombol */}
            <div className="flex items-center gap-2">
              
              {/* Tombol Home BARU */}
              <Button 
                asChild // Prop ini membuat Button merender child-nya (Link)
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>

              {/* Tombol Logout yang sudah ada */}
              <Button 
                onClick={signOut}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
            {/* // AKHIR MODIFIKASI */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:flex">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Profil Desa
            </TabsTrigger>
            <TabsTrigger value="wisata" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Wisata
            </TabsTrigger>
            <TabsTrigger value="galeri" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Galeri
            </TabsTrigger>
            <TabsTrigger value="paket" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Paket Wisata
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileAdmin />
          </TabsContent>

          <TabsContent value="wisata" className="space-y-6">
            <WisataAdmin />
          </TabsContent>

          <TabsContent value="galeri" className="space-y-6">
            <GalleryAdmin />
          </TabsContent>

          <TabsContent value="paket" className="space-y-6">
            <PackageAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;