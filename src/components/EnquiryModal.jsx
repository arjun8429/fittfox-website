import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { locationData } from "../data/locationdata";
import "../styles/EnquiryModal.css";

export default function EnquiryModal({ open, onClose, intent = "enquiry" }) {
  /* ---------------------------
     LOCATION STATE (UNCHANGED)
  ---------------------------- */
  const countries = Object.keys(locationData);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (open) {
      setCountry("");
      setState("");
      setCity("");
    }
  }, [open]);

  const states = country ? Object.keys(locationData[country]) : [];
  const cities = country && state ? locationData[country][state] : [];

  /* ---------------------------
     INTENT-BASED COPY (NEW)
  ---------------------------- */
  const copyMap = {
    partner: {
      title: "Become a FittFox Partner",
      subtitle:
        "Share a few details about your business. Our partnerships team will personally review and reach out.",
      cta: "Apply for Partnership",
    },
    conversation: {
      title: "Start a Sourcing Conversation",
      subtitle:
        "Tell us what you’re exploring. We’ll help you understand sourcing options, timelines, and next steps.",
      cta: "Start Conversation",
    },
    enquiry: {
      title: "Send an Enquiry",
      subtitle:
        "Have a question or requirement? Share the details and we’ll get back to you shortly.",
      cta: "Submit Enquiry",
    },
  };

  const { title, subtitle, cta } = copyMap[intent] || copyMap.enquiry;

  return (
    <AnimatePresence>
      {open && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* HEADER */}
            <div className="modal-header">
              <h3>{title}</h3>
              <button className="modal-close-icon" onClick={onClose}>
                ×
              </button>
            </div>

            <p className="modal-subtext">{subtitle}</p>

            {/* FORM */}
            <form className="enquiry-form">
              {/* YOUR DETAILS */}
              <div className="form-section">
                <h4>Your Details</h4>

                <div className="form-grid">
                  <input required placeholder="First Name *" />
                  <input required placeholder="Last Name *" />
                </div>

                <input
                  required
                  type="email"
                  placeholder="Email Address *"
                />

                <div className="phone-row">
                  <select required>
                    <option value="">Country Code</option>
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                  </select>

                  <input
                    required
                    placeholder="Mobile Number *"
                  />
                </div>
              </div>

              {/* BUSINESS */}
              <div className="form-section">
                <h4>Your Brand / Business</h4>

                <input
                  required
                  placeholder="Company / Brand Name *"
                />

                <input
                  required
                  placeholder="Business Type (Retail, Gym, Café, Distributor, etc.) *"
                />

                <div className="form-grid">
                  <select
                    required
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setState("");
                      setCity("");
                    }}
                  >
                    <option value="">Country *</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <select
                    required
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      setCity("");
                    }}
                    disabled={!country}
                  >
                    <option value="">State *</option>
                    {states.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!state}
                >
                  <option value="">City *</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* NOTES */}
              <div className="form-section">
                <h4>Anything we should know? (Optional)</h4>

                <textarea
                  placeholder="Volumes, timelines, sourcing needs, preferred regions, or any specific questions…"
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
              >
                {cta}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
