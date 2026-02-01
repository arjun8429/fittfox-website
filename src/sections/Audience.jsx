import { motion } from "framer-motion";
import "../styles/sections.css";


export default function Audience() {
  return (
    <section className="audience-section" id="audience">
      <motion.div
        className="audience-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Made for Your Kind of Days</h2>
        <p>
          Different days. Same smart snacking.
        </p>
      </motion.div>

      <div className="audience-grid">
        {[
          {
            title: "Gym Days",
            text: "High protein. Light crunch. Zero drama.",
            emoji: "🏋️",
          },
          {
            title: "Work Days",
            text: "Clean energy without the crash.",
            emoji: "💻",
          },
          {
            title: "Chill Days",
            text: "Snack freely. No guilt attached.",
            emoji: "🎮",
          },
        ].map((item, index) => (
          <motion.div
            className="audience-card"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <span className="audience-emoji">{item.emoji}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
