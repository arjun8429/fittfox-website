import { motion } from "framer-motion";
import "../styles/sections.css";

export default function Vision() {
  return (
    <section className="vision-section" id="vision">
      <motion.div
        className="vision-wrapper"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <span className="vision-tag">Our Vision</span>

        <h2 className="vision-title">
          Organising Trust in the <span>Makhana Ecosystem</span>
        </h2>

        <p className="vision-text">
          Makhana today exists in fragments — informal sourcing, inconsistent
          standards, and systems built on relationships instead of structure.
          <br />
          <br />
          At FittFox, our vision is to bring order to this ecosystem — aligning
          farmers, processors, and brands through shared standards, transparent
          practices, and long-term thinking.
        </p>

        <p className="vision-highlight">
          We believe makhana deserves to evolve from a local commodity into a
          globally respected ingredient — supported by trust, traceability,
          and readiness for scale.
        </p>

        <div className="vision-divider" />
      </motion.div>
    </section>
  );
}
