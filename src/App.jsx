import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbarComponent/Navbar";
import { routes } from "./utils/route";
import BioPage from './pages/BioPage'
import ArtWorksPage from './pages/ArtWorksPage'
import ContactPage from './pages/ContactPage'
import FaQPage from './pages/FaQPage'
import ArtDetail from "./pages/ArtDetail";
import Whatsapp from "./components/whatsappComponent/Whatsapp";
import Footer from "./components/footerComponents/Footer";
import ScrollToTop from "./utils/scrollToTop";
import { useEffect } from 'react';
import { redirectToHash } from "./utils/redirectionToHash";
import SmallFormatPage from "./pages/SmallFormatPage";


function App() {
  useEffect(() => {
    redirectToHash();
  }, []);

  return (
    <>
      <div className="app-container">
        <Navbar/>
        <div className="content">
        <ScrollToTop>
        <Routes>
          <Route path={routes.artwork} element={<ArtWorksPage />} />
          <Route path={routes.faq} element={<FaQPage />} />
          <Route path={routes.bio} element={<BioPage />} />
          <Route path={routes.contact} element={<ContactPage />} />
          <Route path={routes.artDetailWithId} element={<ArtDetail/>} />
          <Route path={routes.smallFormat} element={<SmallFormatPage />} />
          <Route path="*" element={<h1>404-Page Not Found</h1>} />
        </Routes>
        </ScrollToTop>
        </div>
        <Whatsapp />
        <Footer />
      </div>
    </>
  );
}

export default App;
