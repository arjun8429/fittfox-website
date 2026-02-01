import { motion } from "framer-motion";
import "../styles/sections.css";

export default function Makhana() {
  return (
    <section className="makhana-section" id="makhana">
      <div className="makhana-grid">
        {/* LEFT CONTENT */}
        <motion.div
          className="makhana-text"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Our Product</span>
          <h2>Makhana, Sourced With Intent</h2>

          <p>
            At Fittfox, we don’t treat makhana as a commodity. We treat it as a
            supply chain responsibility.
          </p>

          <p>
            We source, grade, and deliver makhana for brands that care about
            consistency, traceability, and long-term reliability — whether
            you’re testing your first batch or scaling nationwide.
          </p>

          <p className="muted">
            From traditional farmer networks to modern machine-popped processes,
            we help brands choose the sourcing model that aligns with their
            product vision.
          </p>
        </motion.div>

        {/* RIGHT CARDS */}
        <div className="makhana-cards-large">
          {/* CARD 1 */}
          <motion.div
            className="makhana-big-card traditional"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="card-badge">Traditional</span>
            <h3>Makhana From Farmers</h3>
            <p>
              Sourced directly from farming communities using time-tested,
              manual popping techniques. Ideal for brands prioritizing
              authenticity and traditional sourcing.
            </p>
            <button className="card-btn">Know more</button>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            className="makhana-big-card modern"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="card-badge">Modern</span>
            <h3>Machine Popped Makhana</h3>
            <p>
              Precision-popped using controlled processes to ensure uniform
              size, cleaner output, and scalable volumes for growing brands.
            </p>
            <button className="card-btn">Know more</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
