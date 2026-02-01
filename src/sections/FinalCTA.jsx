import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/sections.css";

export default function FinalCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CTA SECTION */}
      <section className="cta-section" id="cta">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2>Let’s Build Something Reliable.</h2>

          <p>
            Whether you’re testing your first batch or planning scale,  
            FittFox helps brands source makhana with clarity, consistency,  
            and long-term reliability.
          </p>

          <div className="cta-actions">
            <button
              className="btn-primary cta-glow"
              onClick={() => setOpen(true)}
            >
              Send an Enquiry
            </button>

            <button className="btn-secondary">
              Follow Our Journey
            </button>
          </div>
        </motion.div>
      </section>

      {/* ENQUIRY MODAL (UI ONLY) */}
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <motion.div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h3>Start a Conversation</h3>
            <p>
              Share a few details and we’ll get back to you with sourcing
              information.
            </p>

            <div className="modal-placeholder">
              Enquiry form coming soon.
            </div>

            <button
              className="btn-secondary modal-close"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
