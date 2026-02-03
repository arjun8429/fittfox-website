import { useState } from "react";
import { motion } from "framer-motion";
import EnquiryModal from "../components/EnquiryModal";
import "../styles/sections.css";

export default function Partner() {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState("partner");

  return (
    <>
      <section className="partner-section" id="partner">
        <motion.div
          className="partner-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Partner With Us</span>

          <h2>Built to Grow Together.</h2>

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
            <button
              className="btn-primary"
              onClick={() => {
                setIntent("partner");
                setOpen(true);
              }}
            >
              Become a Partner
            </button>

            <button
              className="btn-secondary"
              onClick={() => {
                setIntent("conversation");
                setOpen(true);
              }}
            >
              Start a Conversation
            </button>
          </div>
        </motion.div>
      </section>

      {/* REUSABLE MODAL */}
      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
        intent={intent}
      />
    </>
  );
}



