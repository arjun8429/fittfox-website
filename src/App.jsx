import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Audience from "./sections/Audience";
import Makhana from "./sections/Makhana";
import Vision from "./sections/Vision";
import Partner from "./sections/Partner";
import Founders from "./sections/Founders";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./components/Footer";

import EnquiryModal from "./components/EnquiryModal";

import "./styles/sections.css";

function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("enquiry") === "true") {
      setIsEnquiryOpen(true);
    }
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Audience />
        <Makhana />
        <Vision />
        <Partner />
        <Founders />
        <FinalCTA />
      </main>

      <Footer />

      <EnquiryModal
        open={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </>
  );
}

export default App;
