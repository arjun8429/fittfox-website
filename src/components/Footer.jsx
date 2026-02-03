export default function Footer() {
  return (
    <footer className="footer2" id="contact">
      <div className="footer2-wrap">

        {/* TOP GLOW LINE */}
        <div className="footer2-glowline" />

        <div className="footer2-grid">
          {/* LEFT: CONTACT US + POLICIES */}
          <div className="footer2-left">
            <h2 className="footer2-title">Contact us</h2>

            <div className="footer2-socialmini">
              <a className="footer2-socialmini-link" href="#" aria-label="Facebook">f</a>
              <a className="footer2-socialmini-link" href="#" aria-label="Instagram">⌁</a>
              <a className="footer2-socialmini-link" href="#" aria-label="YouTube">▶</a>
            </div>

            <ul className="footer2-policies">
              <li><a href="#" className="footer2-policy-link">Terms and Condition</a></li>
              <li><a href="#" className="footer2-policy-link">Privacy Policy</a></li>
              <li><a href="#" className="footer2-policy-link">Shipping Policy</a></li>
              <li><a href="#" className="footer2-policy-link">Refund and Return Policy</a></li>
            </ul>
          </div>

          {/* MIDDLE: DETAILS */}
          <div className="footer2-middle">
            <div className="footer2-info">
              <div className="footer2-info-row">
                <span className="footer2-ic">✉️</span>
                <div>
                  <p className="footer2-label">Our Email:</p>
                  <a className="footer2-value" href="mailto:social@fittfox.in">social@fittfox.in</a>
                  <a className="footer2-value" href="mailto:fittfoxenterprise@gmail.com">fittfoxenterprise@gmail.com</a>
                </div>
              </div>

              <div className="footer2-info-row">
                <span className="footer2-ic">📞</span>
                <div>
                  <p className="footer2-label">Our phone number:</p>
                  <a className="footer2-value" href="tel:8825388731">8825388731</a>
                  <a className="footer2-value" href="tel:8340268944">8340268944</a>
                </div>
              </div>

              <div className="footer2-info-row">
                <span className="footer2-ic">📍</span>
                <div>
                  <p className="footer2-label">Our Address:</p>
                  <p className="footer2-value footer2-value-text">
                    Purnea, Bihar - 854301
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="footer2-right">
            <form className="footer2-form" onSubmit={(e) => e.preventDefault()}>
              <label className="footer2-inputlabel">
                <span>Name</span>
                <input
                  className="footer2-input"
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                />
              </label>

              <label className="footer2-inputlabel">
                <span>Email</span>
                <input
                  className="footer2-input"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
              </label>

              <label className="footer2-inputlabel">
                <span>Message</span>
                <textarea
                  className="footer2-textarea"
                  placeholder="Message"
                  rows="7"
                />
              </label>

              <button className="footer2-btn" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM GLOW LINE */}
        <div className="footer2-glowline footer2-glowline--bottom" />

        <div className="footer2-bottom">
          <p className="footer2-bottom-left">© 2026 FittFox. All rights reserved.</p>
          <p className="footer2-bottom-right">Snack Smart. Stay Fit.</p>
        </div>
      </div>
    </footer>
  );
}
