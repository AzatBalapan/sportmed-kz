import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { translations } from "@/lib/translations";
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useEffect } from 'react';
import FloatingActions from '@/components/FloatingActions';

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
import LegalActs from "./pages/LegalActs";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import BerikAsylov from "./pages/BerikAsylov";
import AidosSultangali from "./pages/AidosSultangali";
import FencingChampionship from "./pages/FencingChampionship";
import NewsArticle4 from "./pages/NewsArticle4";
import NewsArticle5 from "./pages/NewsArticle5";
import Profile from "./pages/Profile";
import Management from '@/pages/Management';
import Structure from '@/pages/Structure';
import NewsArticle6 from "./pages/NewsArticle6";
import NewsArticle7 from "./pages/NewsArticle7";
import NewsArticle8 from './pages/NewsArticle8';
import NewsArticle9 from './pages/NewsArticle9';
import NewsArticle10 from "./pages/NewsArticle10";

const queryClient = new QueryClient();

// Global accessibility effect
function AccessibilityGlobalEffect() {
  const { highContrast, fontSize, underlineLinks, disableAnimations } = useAccessibility();
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    // High contrast
    if (highContrast) {
      body.classList.add('access-high-contrast');
    } else {
      body.classList.remove('access-high-contrast');
    }
    // Font size (set CSS variable on html)
    html.style.setProperty('--access-font-size', `${fontSize * 100}%`);
    // Underline links
    if (underlineLinks) {
      body.classList.add('access-underline-links');
    } else {
      body.classList.remove('access-underline-links');
    }
    // Disable animations
    if (disableAnimations) {
      body.classList.add('access-disable-animations');
    } else {
      body.classList.remove('access-disable-animations');
    }
    return () => {
      html.style.setProperty('--access-font-size', '100%');
    };
  }, [highContrast, fontSize, underlineLinks, disableAnimations]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider translations={translations}>
        <AuthProvider>
          <AccessibilityProvider>
            <AccessibilityGlobalEffect />
            <FloatingActions />
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
                <Route path="/team/:doctorId" element={<Team />} />
                <Route path="/compliance" element={<Compliance />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/presidential-reserve" element={<NewsArticle />} />
                <Route path="/news/berik-asylov" element={<BerikAsylov />} />
                <Route path="/news/AidosSultangali" element={<AidosSultangali />} />
                <Route path="/news/fencing-championship" element={<FencingChampionship />} />
                <Route path="/news/sports-school-opening" element={<NewsArticle4 />} />
                <Route path="/news/world-boxing-cup" element={<NewsArticle5 />} />
                <Route path="/news/world-boxing-cup-6" element={<NewsArticle6 />} />
                <Route path="/news/new-article-9" element={<NewsArticle9 />} />
                <Route path="/news/new-article-10" element={<NewsArticle10 />} />
                <Route path="/news/youth-prize-daryn-7" element={<NewsArticle7 />} />
                <Route path="/news/state-policy-sport-8" element={<NewsArticle8 />} />
                <Route path="/presidential-address" element={<PresidentialAddress />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/legal-acts" element={<LegalActs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/management" element={<Management />} />
                <Route path="/structure" element={<Structure />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </AccessibilityProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
