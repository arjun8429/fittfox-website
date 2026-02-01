import { motion } from "framer-motion";
import "../styles/sections.css";

export default function FinalCTA() {
  return (
    <section className="cta-section" id="cta">
      <motion.div
        className="cta-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Ready to Snack Smarter?</h2>

        <p>
          Join the FittFox movement and make clean,
          effortless snacking part of your everyday life.
        </p>

        <div className="cta-actions">
          <button className="btn-primary">Explore Flavors</button>
          <button className="btn-secondary">Follow Our Journey</button>
        </div>
      </motion.div>
    </section>
  );
}
