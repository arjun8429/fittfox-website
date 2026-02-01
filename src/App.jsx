import Navbar from "./components/Navbar";

import Hero from "./sections/Hero";
import Audience from "./sections/Audience";
import Makhana from "./sections/Makhana";
import Vision from "./sections/Vision";
import Partner from "./sections/Partner";
import Founders from "./sections/Founders";
import FinalCTA from "./sections/FinalCTA";

import Footer from "./components/Footer";

import "./styles/sections.css";

function App() {
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
    </>
  );
}

export default App;
