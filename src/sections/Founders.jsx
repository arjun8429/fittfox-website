import { useState } from "react";
import "../styles/sections.css";

export default function Founders() {
  const [flipped, setFlipped] = useState(null);

  const founders = [
    {
      name: "Arjun Sharma",
      role: "Co-Founder",
      email: "arjuns8429@gmail.com",
      phone: "8825388731",
    },
    {
      name: "Siddharth Singh",
      role: "Co-Founder",
      email: "siddharthsinghinsta09@gmail.com",
      phone: "8340268944",
    },
    {
      name: "Aditya Pratap Singh",
      role: "Co-Founder",
      email: "thakuradityasingh@gmail.com",
      phone: "7007350679",
    },
  ];

  return (
    <section className="founders-section" id="founders">
      <div className="founders-header">
        <span className="section-tag">The People Behind FittFox</span>
        <h2>
          Built by Engineers. <br />
          Driven by Culture & Fitness.
        </h2>
      </div>

      <div className="founders-grid">
        {founders.map((founder, index) => (
          <div
            key={index}
            className={`founder-flip-card ${
              flipped === index ? "flipped" : ""
            }`}
            onClick={() =>
              setFlipped(flipped === index ? null : index)
            }
          >
            <div className="founder-flip-inner">
              {/* FRONT */}
              <div className="founder-front">
                <div className="founder-avatar">
                  {founder.name.charAt(0)}
                </div>
                <h3>{founder.name}</h3>
                <p className="founder-role">{founder.role}</p>
                <span className="flip-hint">Tap to view contact</span>
              </div>

              {/* BACK */}
              <div className="founder-back">
                <h3>{founder.name}</h3>

                <a
                  href={`mailto:${founder.email}`}
                  className="founder-contact"
                >
                  📧 {founder.email}
                </a>

                <a
                  href={`tel:${founder.phone}`}
                  className="founder-contact"
                >
                  📞 {founder.phone}
                </a>

                <div className="founder-socials">
                  <span className="social-pill">🔗 LinkedIn</span>
                  <span className="social-pill">📸 Instagram</span>
                  <span className="social-pill">❌ X</span>
                </div>

                <span className="flip-hint back">Tap to go back</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
