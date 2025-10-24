import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// ▼▼▼ HAPUS 'BrowserRouter' DARI BARIS IMPOR INI ▼▼▼
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
// import PackageWisata from "./pages/PackageWisata";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {/* ▼▼▼ TAG <BrowserRouter> SUDAH DIHAPUS DARI SINI ▼▼▼ */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/paket-wisata" element={<PackageWisata />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* ▲▲▲ TAG <BrowserRouter> SUDAH DIHAPUS DARI SINI ▲▲▲ */}

      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;