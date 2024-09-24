import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbarComponent/Navbar";
// import HomePage from "./pages/HomePage";
import { routes } from "./utils/route";
import BioPage from './pages/BioPage'
import ArtWorksPage from './pages/ArtWorksPage'
import ContactPage from './pages/ContactPage'
import FaQPage from './pages/FaQPage'
import ArtDetail from "./pages/ArtDetail";
import Whatsapp from "./components/whatsappComponent/Whatsapp";
import Footer from "./components/footerComponents/Footer";


function App() {
  return (
    <>
      <div className="app-container">
        <Navbar/>
        <div className="content">
        <Routes>
          {/* <Route path={routes.home} element={<HomePage />} /> */}
          <Route path={routes.bio} element={<BioPage />} />
          <Route path={routes.artwork} element={<ArtWorksPage />} />
          <Route path={routes.faq} element={<FaQPage />} />
          <Route path={routes.contact} element={<ContactPage />} />
          <Route path={routes.artDetailWithId} element={<ArtDetail/>} />
        </Routes>
        </div>
        <Whatsapp />
        <Footer />
      </div>
    </>
  );
}

export default App;
