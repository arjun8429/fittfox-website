import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { locationData } from "../data/locationdata";
import "../styles/EnquiryModal.css";

export default function EnquiryModal({ open, onClose, intent }) {
  // ✅ HOOKS MUST ALWAYS RUN
  const countries = Object.keys(locationData);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setCountry("");
      setState("");
      setCity("");
    }
  }, [open]);

  const states = country ? Object.keys(locationData[country]) : [];
  const cities =
    country && state ? locationData[country][state] : [];

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
              <h3>
                {intent === "partner"
                  ? "Become a Partner"
                  : "Start a Conversation"}
              </h3>

              <button
                className="modal-close-icon"
                onClick={onClose}
              >
                ×
              </button>
            </div>

            <p className="modal-subtext">
              {intent === "partner"
                ? "Tell us about your brand and partnership interest."
                : "Share a few details and our sourcing team will reach out."}
            </p>

            {/* FORM */}
            <form className="enquiry-form">
              {/* PERSONAL */}
              <div className="form-section">
                <h4>Personal Details</h4>

                <div className="form-grid">
                  <input required placeholder="First Name *" />
                  <input required placeholder="Last Name *" />
                </div>

                <input
                  required
                  type="email"
                  placeholder="Email ID *"
                />

                <div className="phone-row">
                  <select required>
                    <option value="">Code</option>
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>

                  <input
                    required
                    placeholder="Mobile Number *"
                  />
                </div>
              </div>

              {/* BRAND */}
              <div className="form-section">
                <h4>Brand Details</h4>

                <input
                  required
                  placeholder="Company Name *"
                />

                <input
                  required
                  placeholder="Company Sector *"
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
                <h4>Additional Notes (Optional)</h4>

                <textarea
                  placeholder="Anything you'd like us to know — volumes, timelines, locations, etc."
                />
              </div>

              <button
                type="submit"
                className="btn-primary submit-btn"
              >
                {intent === "partner"
                  ? "Apply for Partnership"
                  : "Submit Enquiry"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
