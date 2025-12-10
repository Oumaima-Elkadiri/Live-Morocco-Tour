import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import LanguageSwitcher from "./components/traduction";
import ContactIcon from "./components/contactIcon";
import Footer from "./components/footer";

// Lazy loading des composants
const Home = lazy(() => import("./components/home"));
const About = lazy(() => import("./components/about"));
const Contact = lazy(() => import("./components/contact"));
const Detailsessai = lazy(() => import("./components/detailsessai"));

// Fallback pour le Suspense
const LoadingFallback = () => <div>Chargement...</div>;

function App() {
  return (
    <Router>
      <Header />
      <LanguageSwitcher />
      <ContactIcon />
      {/* Suspense pour gérer le chargement des composants lazy */}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detailsessai" element={<Detailsessai />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;