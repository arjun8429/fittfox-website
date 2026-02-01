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
        <span className="hero-tag">Fox Mode On 🦊</span>

        <h1 className="hero-title">
          Healthy, <br /> But Not Boring.
        </h1>

        <p className="hero-subtitle">
          Smart makhana snacks for gym days, workdays,
          and everything in between.
        </p>

        <div className="hero-actions">
          <button className="btn-primary">Explore Flavors</button>
          <button className="btn-secondary">Why FittFox?</button>
        </div>
      </motion.div>
    </section>
  );
}
