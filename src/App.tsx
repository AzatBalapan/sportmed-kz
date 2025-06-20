import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { translations } from "@/lib/translations";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import AboutFull from "./pages/AboutFull";
import Team from "./pages/Team";
import Compliance from "./pages/Compliance";
import PresidentialAddress from "./pages/PresidentialAddress";
import Contacts from "./pages/Contacts";
import Director from "./pages/Director";
import LegalActs from "./pages/LegalActs";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import BerikAsylov from "./pages/BerikAsylov";
import ChangePassword from "./pages/ChangePassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider translations={translations}>
        <AuthProvider>
          <Toaster />
          <Sonner />
          {/* Replace BrowserRouter with HashRouter for GitHub Pages compatibility */}
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<AboutFull />} />
              <Route path="/team" element={<Team />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/presidential-reserve" element={<NewsArticle />} />
              <Route path="/news/berik-asylov" element={<BerikAsylov />} />
              <Route path="/presidential-address" element={<PresidentialAddress />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/director" element={<Director />} />
              <Route path="/legal-acts" element={<LegalActs />} />
              <Route path="/change-password" element={<ChangePassword />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
