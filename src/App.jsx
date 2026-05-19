import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./sections/Hero";
import Audience from "./sections/Audience";
import Makhana from "./sections/Makhana";
import Vision from "./sections/Vision";
import Partner from "./sections/Partner";
import Founders from "./sections/Founders";
import FinalCTA from "./sections/FinalCTA";

import "./styles/sections.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Hero />
        <Audience />
        <Makhana />
        <Vision />
        <Partner />
        <Founders />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
