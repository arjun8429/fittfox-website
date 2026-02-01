import { motion } from "framer-motion";
import "../styles/sections.css";

export default function Vision() {
  return (
    <section className="vision-section" id="vision">
      <motion.div
        className="vision-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="section-tag">Our Vision</span>

        <h2>
          Snacking Shouldn’t Feel Like a Trade-Off.
        </h2>

        <p>
          You shouldn’t have to choose between taste and health.
          Or between discipline and enjoyment.
        </p>

        <p className="muted">
          FittFox exists to make smart snacking feel effortless,
          modern, and honestly enjoyable — every single day.
        </p>
      </motion.div>
    </section>
  );
}
