// import { useState } from "react";
// import "../styles/navbar.css";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);

//   const scrollToSection = (id) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth" });
//       setOpen(false);
//     }
//   };

//   return (
//     <header className="navbar">
//      <div className="navbar-container">
//   {/* Left: Text Logo */}
//   <div className="logo" onClick={() => scrollToSection("hero")}>
//     FITT<span>FOX</span>
//   </div>

//   {/* Center: Fox Logo */}
//   <div className="navbar-center-logo">
//     <img src="/logo.png" alt="FittFox Logo" />
//   </div>

//   {/* Right: Desktop Menu */}
//   <nav className="nav-links">
//     <button onClick={() => scrollToSection("vision")}>Vision</button>
//     <button onClick={() => scrollToSection("makhana")}>Makhana</button>
//     <button onClick={() => scrollToSection("audience")}>Who It’s For</button>
//     <button onClick={() => scrollToSection("partner")}>Partner</button>
//     <button onClick={() => scrollToSection("founders")}>About</button>
//   </nav>

//   {/* Mobile Hamburger */}
//   <div
//     className={`hamburger ${open ? "active" : ""}`}
//     onClick={() => setOpen(!open)}
//   >
//     <span></span>
//     <span></span>
//     <span></span>
//   </div>
// </div>


//       {/* Mobile Menu (unchanged) */}
//       {open && (
//         <div className="mobile-menu">
//           <button onClick={() => scrollToSection("vision")}>Vision</button>
//           <button onClick={() => scrollToSection("makhana")}>Makhana</button>
//           <button onClick={() => scrollToSection("audience")}>Who It’s For</button>
//           <button onClick={() => scrollToSection("partner")}>Partner</button>
//           <button onClick={() => scrollToSection("founders")}>About</button>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;



import { useState } from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LEFT: Desktop Text Logo */}
        <div
          className="logo desktop-logo"
          onClick={() => scrollToSection("hero")}
        >
          FITT<span>FOX</span>
        </div>

        {/* LEFT: Mobile Logo Icon */}
        <div
          className="mobile-logo"
          onClick={() => scrollToSection("hero")}
        >
          <img src="/logo2.png" alt="FittFox Logo" />
        </div>

        {/* CENTER: Desktop Center Logo */}
        <div className="navbar-center-logo">
          <img src="/logo2.png" alt="FittFox Logo" />
        </div>

        {/* RIGHT: Desktop Menu */}
        <nav className="nav-links">
          <button onClick={() => scrollToSection("vision")}>Vision</button>
          <button onClick={() => scrollToSection("makhana")}>Makhana</button>
          <button onClick={() => scrollToSection("audience")}>Who It’s For</button>
          <button onClick={() => scrollToSection("partner")}>Partner</button>
          <button onClick={() => scrollToSection("founders")}>About</button>
        </nav>

        {/* Mobile Hamburger */}
        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <button onClick={() => scrollToSection("vision")}>Vision</button>
          <button onClick={() => scrollToSection("makhana")}>Makhana</button>
          <button onClick={() => scrollToSection("audience")}>Who It’s For</button>
          <button onClick={() => scrollToSection("partner")}>Partner</button>
          <button onClick={() => scrollToSection("founders")}>About</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
