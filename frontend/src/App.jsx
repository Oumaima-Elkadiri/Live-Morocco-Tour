import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import LanguageSwitcher from "./components/traduction";
import ContactIcon from "./components/contactIcon";
import Footer from "./components/footer";
import AdminNewsletter from "./pages/AdminNewsletter";
import ScrollToTop from "./components/ScrollToTop";

// Lazy loading des composants
const Home = lazy(() => import("./components/home"));
const About = lazy(() => import("./components/about"));
const Contact = lazy(() => import("./components/contact"));
const Details = lazy(() => import("./components/details"));

// Fallback pour le Suspense
const LoadingFallback = () => <div>Chargement...</div>;

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <LanguageSwitcher />
      <ContactIcon />
      {/* Suspense pour gérer le chargement des composants lazy */}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/details" element={<Details />} />
          <Route path="/admin/newsletter" element={<AdminNewsletter />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;