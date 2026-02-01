import { motion } from "framer-motion";
import "../styles/sections.css";

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="hero-tag">India’s Smart Makhana Supply Partner
</span>

        <h1 className="hero-title">
        The Smarter Way <br /> to Source Makhana.
        </h1>

        <p className="hero-subtitle">
        We source and supply all grades of premium makhana —
  trusted by growing brands across India for quality,
  consistency, and scale.
        </p>

        <div className="hero-actions">
          <button className="btn-secondary">Explore Our Grades</button>
          <button
  className="btn-primary"
  onClick={() => document.getElementById("partner")?.scrollIntoView({ behavior: "smooth" })}
>
  Work With Us
</button>
        </div>
      </motion.div>
    </section>
  );
}
