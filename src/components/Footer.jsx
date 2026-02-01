import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>FITT<span>FOX</span></h3>
          <p>Snack Smart. Stay Fitt.</p>
        </div>

        <div className="footer-links">
          <span>Instagram</span>
          <span>LinkedIn</span>
          <span>X</span>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} FittFox. All rights reserved.
      </div>
    </footer>
  );
}
