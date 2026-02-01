export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* BRAND */}
        <div className="footer-brand">
          <h3>
            FITT<span>FOX</span>
          </h3>
          <p>Snack Smart. Stay Fit.</p>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <p className="footer-title">Contact</p>
          <ul>
            <li>📩 social@fittfox.in</li>
            <li>📩 fittfoxenterprise@gmail.com</li>
          </ul>
        </div>

        {/* CONNECT */}
        <div className="footer-social">
          <p className="footer-title">Connect</p>
          <ul>
            <li>📸 Instagram</li>
            <li>💼 LinkedIn</li>
            <li>✖️ X</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2026 FittFox. All rights reserved.
      </div>
    </footer>
  );
}
