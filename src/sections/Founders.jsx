import { motion } from "framer-motion";
import "../styles/sections.css";

export default function Founders() {
  return (
    <section className="founders-section" id="founders">
      <motion.div
        className="founders-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="section-tag">The People Behind FittFox</span>

        <h2>
          Built by Engineers. <br /> Driven by Culture & Fitness.
        </h2>

        <p className="founders-intro">
          We are Computer Science graduates from Manipal Institute of Technology,
          currently working with leading global technology companies.
          <br /><br />
          FittFox started with a simple idea — to modernize Indian superfoods
          and build a fitness-first brand that feels relevant, premium,
          and global.
        </p>
      </motion.div>

      <div className="founders-grid">
        {[
          {
            name: "Arjun Sharma",
            role: "Co-Founder",
          },
          {
            name: "Siddharth Singh",
            role: "Co-Founder",
          },
          {
            name: "Aditya Pratap Singh",
            role: "Co-Founder",
          },
        ].map((founder, index) => (
          <motion.div
            className="founder-card"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="founder-avatar">
              {founder.name.charAt(0)}
            </div>

            <h3>{founder.name}</h3>
            <p className="founder-role">{founder.role}</p>

            <div className="founder-socials">
              <span className="social-pill">LinkedIn</span>
              <span className="social-pill">Instagram</span>
              <span className="social-pill">X</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
