import { motion } from "framer-motion";
import "../styles/sections.css";

export default function Makhana() {
  return (
    <section className="makhana-section" id="makhana">
      <div className="makhana-grid">
        <motion.div
          className="makhana-text"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Why Makhana?</span>

          <h2>
            Old School Snack. <br /> New School Energy.
          </h2>

          <p>
            Makhana has always been clean, light, and powerful.
            We just gave it better flavor, better crunch,
            and a lifestyle it actually belongs to.
          </p>

          <p className="muted">
            No junk. No fake health talk.  
            Just smart snacking, done right.
          </p>
        </motion.div>

        <motion.div
          className="makhana-cards"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="makhana-card">High Protein</div>
          <div className="makhana-card">Low Cal</div>
          <div className="makhana-card">No Nasties</div>
          <div className="makhana-card">Everyday Snack</div>
        </motion.div>
      </div>
    </section>
  );
}
