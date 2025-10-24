// src/pages/Auth.tsx (atau di mana pun file Anda berada)

import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth'; // Anda bisa menghapus 'signUp' dari hook jika mau
import { useToast } from '@/hooks/use-toast';
import { Waves } from 'lucide-react';

const Auth = () => {
  // HAPUS: State 'isLogin' tidak lagi diperlukan
  // const [isLogin, setIsLogin] = useState(true); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // HAPUS: Kita tidak lagi memanggil 'signUp' dari frontend
  const { user, signIn } = useAuth(); 
  const { toast } = useToast();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // UBAH: Hapus logika ternary, HANYA panggil signIn
    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } 
    // HAPUS: Blok 'else if (!isLogin)' tidak diperlukan lagi
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Waves className="h-12 w-12 text-cyan-600" />
          </div>
          {/* UBAH: Judul sekarang statis 'Login Admin' */}
          <CardTitle className="text-2xl font-bold text-gray-800">
            Login Admin
          </CardTitle>
          <p className="text-gray-600">
            Sistem Informasi Desa Wisata Punagaan
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@punagaan.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700" 
              disabled={loading}
            >
              {/* UBAH: Teks tombol sekarang statis 'Login' */}
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
          {/* HAPUS: Hapus seluruh div yang berisi tombol untuk pindah mode 'Daftar' */}
          {/* <div className="mt-4 text-center">
            <button ... >
              {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Login'}
            </button>
          </div> 
          */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;