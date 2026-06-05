import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NewsletterDesdeCero from "./pages/NewsletterDesdeCero.tsx";
import RegistroConfirmadoNewsletter from "./pages/RegistroConfirmadoNewsletter.tsx";
import PagoConfirmado from "./pages/PagoConfirmado.tsx";
import ClasesMasAlquiler from "./pages/ClasesMasAlquiler.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/newsletter-desde-cero" element={<NewsletterDesdeCero />} />
          <Route path="/registro-confirmado-newsletter" element={<RegistroConfirmadoNewsletter />} />
          <Route path="/pago-confirmado" element={<PagoConfirmado />} />
          <Route path="/clases-de-rollers-mas-alquiler" element={<ClasesMasAlquiler />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
