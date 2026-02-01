import { motion } from "framer-motion";
import "../styles/sections.css";

export default function Partner() {
  return (
    <section className="partner-section" id="partner">
      <motion.div
        className="partner-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="section-tag">Partner With Us</span>

        <h2>
          Built to Grow Together.
        </h2>

        <p>
          Whether you’re a retailer, café, gym, or distributor —
          FittFox is designed to fit naturally into modern lifestyles
          and high-quality spaces.
        </p>

        <p className="muted">
          Clean ingredients. Clear positioning.  
          A brand your customers already trust.
        </p>

        <div className="partner-actions">
          <button className="btn-primary">Become a Partner</button>
          <button className="btn-secondary">Start a Conversation</button>
        </div>
      </motion.div>
    </section>
  );
}
