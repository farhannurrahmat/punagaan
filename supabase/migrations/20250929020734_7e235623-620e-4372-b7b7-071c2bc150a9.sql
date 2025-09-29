-- Create storage buckets for images and videos
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('village-images', 'village-images', true),
  ('tourism-images', 'tourism-images', true),
  ('gallery-media', 'gallery-media', true),
  ('package-images', 'package-images', true);

-- Create storage policies
CREATE POLICY "Public can view village images" ON storage.objects FOR SELECT USING (bucket_id = 'village-images');
CREATE POLICY "Admin can manage village images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'village-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can update village images" ON storage.objects FOR UPDATE USING (bucket_id = 'village-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can delete village images" ON storage.objects FOR DELETE USING (bucket_id = 'village-images' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view tourism images" ON storage.objects FOR SELECT USING (bucket_id = 'tourism-images');
CREATE POLICY "Admin can manage tourism images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'tourism-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can update tourism images" ON storage.objects FOR UPDATE USING (bucket_id = 'tourism-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can delete tourism images" ON storage.objects FOR DELETE USING (bucket_id = 'tourism-images' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view gallery media" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-media');
CREATE POLICY "Admin can manage gallery media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-media' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can update gallery media" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery-media' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can delete gallery media" ON storage.objects FOR DELETE USING (bucket_id = 'gallery-media' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view package images" ON storage.objects FOR SELECT USING (bucket_id = 'package-images');
CREATE POLICY "Admin can manage package images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'package-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can update package images" ON storage.objects FOR UPDATE USING (bucket_id = 'package-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can delete package images" ON storage.objects FOR DELETE USING (bucket_id = 'package-images' AND auth.role() = 'authenticated');

-- Create profil_desa table
CREATE TABLE public.profil_desa (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_desa TEXT NOT NULL,
  sejarah TEXT,
  visi TEXT,
  misi TEXT,
  gambar TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for profil_desa
ALTER TABLE public.profil_desa ENABLE ROW LEVEL SECURITY;

-- Create policies for profil_desa
CREATE POLICY "Anyone can view village profile" ON public.profil_desa FOR SELECT USING (true);
CREATE POLICY "Admin can update village profile" ON public.profil_desa FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can insert village profile" ON public.profil_desa FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create wisata table
CREATE TABLE public.wisata (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_wisata TEXT NOT NULL,
  deskripsi TEXT,
  gambar TEXT,
  lokasi TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for wisata
ALTER TABLE public.wisata ENABLE ROW LEVEL SECURITY;

-- Create policies for wisata
CREATE POLICY "Anyone can view tourism spots" ON public.wisata FOR SELECT USING (true);
CREATE POLICY "Admin can manage tourism spots" ON public.wisata FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update tourism spots" ON public.wisata FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete tourism spots" ON public.wisata FOR DELETE USING (auth.role() = 'authenticated');

-- Create galeri table
CREATE TABLE public.galeri (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  judul TEXT NOT NULL,
  tipe TEXT NOT NULL CHECK (tipe IN ('foto', 'video')),
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for galeri
ALTER TABLE public.galeri ENABLE ROW LEVEL SECURITY;

-- Create policies for galeri
CREATE POLICY "Anyone can view gallery" ON public.galeri FOR SELECT USING (true);
CREATE POLICY "Admin can manage gallery" ON public.galeri FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update gallery" ON public.galeri FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete gallery" ON public.galeri FOR DELETE USING (auth.role() = 'authenticated');

-- Create paket_pariwisata table
CREATE TABLE public.paket_pariwisata (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_paket TEXT NOT NULL,
  harga DECIMAL(12,2) NOT NULL,
  deskripsi TEXT,
  fasilitas TEXT,
  durasi TEXT,
  kontak TEXT,
  gambar TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for paket_pariwisata
ALTER TABLE public.paket_pariwisata ENABLE ROW LEVEL SECURITY;

-- Create policies for paket_pariwisata
CREATE POLICY "Anyone can view tourism packages" ON public.paket_pariwisata FOR SELECT USING (true);
CREATE POLICY "Admin can manage tourism packages" ON public.paket_pariwisata FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update tourism packages" ON public.paket_pariwisata FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete tourism packages" ON public.paket_pariwisata FOR DELETE USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profil_desa_updated_at
  BEFORE UPDATE ON public.profil_desa
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_wisata_updated_at
  BEFORE UPDATE ON public.wisata
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_paket_pariwisata_updated_at
  BEFORE UPDATE ON public.paket_pariwisata
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default village profile data
INSERT INTO public.profil_desa (nama_desa, sejarah, visi, misi) VALUES (
  'Desa Wisata Punagaan',
  'Punagaan adalah sebuah desa wisata yang terletak di Kepulauan Selayar, Sulawesi Selatan. Desa ini memiliki keindahan alam yang menawan dengan pantai berpasir putih, air laut yang jernih, dan terumbu karang yang masih alami.',
  'Menjadikan Desa Punagaan sebagai destinasi wisata unggulan yang berkelanjutan dengan tetap melestarikan budaya lokal dan kelestarian lingkungan.',
  'Mengembangkan potensi wisata alam dan budaya, Memberdayakan masyarakat lokal dalam sektor pariwisata, Melestarikan lingkungan dan ekosistem laut'
);