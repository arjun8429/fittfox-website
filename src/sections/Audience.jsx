// import { useState } from "react";
// import { motion } from "framer-motion";
// import "../styles/sections.css";

// const cards = [
//   {
//     stage: "Discovery",
//     title: "First Batches",
//     tagline: "Small quantities. Serious intent.",
//     icon: "🧪",
//     description:
//       "Test multiple makhana grades, compare quality, and make confident sourcing decisions before committing at scale.",
//   },
//   {
//     stage: "Launch",
//     title: "Launch Ready",
//     tagline: "Confidence in every pack.",
//     icon: "🚀",
//     description:
//       "Lock the right grades and ensure consistent quality so your first customers experience exactly what your brand promises.",
//   },
//   {
//     stage: "Growth",
//     title: "Scaling Supply",
//     tagline: "Without surprises.",
//     icon: "📈",
//     description:
//       "Stable volumes, predictable grading, and clear communication to support your brand as demand grows.",
//   },
//   {
//     stage: "Bulk",
//     title: "Bulk & Repeat",
//     tagline: "Built for reliability.",
//     icon: "🔁",
//     description:
//       "Designed for repeat orders, large volumes, and long-term supply relationships with established brands.",
//   },
// ];

// // export default function Audience() {
// //   const [active, setActive] = useState(null);

// //   return (
// //     <section className="audience-section" id="audience">
// //       {/* Header */}
// //       <motion.div
// //         className="audience-header"
// //         initial={{ opacity: 0, y: 30 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.6 }}
// //         viewport={{ once: true }}
// //       >
// //         <h2>From First Batch to Full Scale</h2>
// //         <p>
// //           We support brands at every stage of their makhana sourcing journey —
// //           from early trials to consistent, large-scale supply.
// //         </p>
// //       </motion.div>

// //       {/* Cards */}
// //       <div className="audience-grid">
// //         {cards.map((card, index) => (
// //           <motion.div
// //             key={index}
// //             className={`audience-card ${active === index ? "flipped" : ""}`}
// //             onClick={() =>
// //               setActive(active === index ? null : index)
// //             }
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ delay: index * 0.12 }}
// //             viewport={{ once: true }}
// //           >
// //             <div className="audience-card-inner">
// //               {/* FRONT */}
// //               <div className="audience-card-front">
// //                 <span className="audience-stage">{card.stage}</span>
// //                 <div className="audience-icon">{card.icon}</div>
// //                 <h3>{card.title}</h3>
// //                 <p className="audience-tagline">{card.tagline}</p>
// //                 <span className="audience-hint">Tap to learn more</span>
// //               </div>

// //               {/* BACK */}
// //               <div className="audience-card-back">
// //                 <h3>{card.title}</h3>
// //                 <p>{card.description}</p>
// //                 <span className="audience-hint">Tap to go back</span>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }

// export default function Audience() {
//   const [active, setActive] = useState(null);

//   const handleToggle = (index, e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setActive((prev) => (prev === index ? null : index));
//   };

//   return (
//     <section className="audience-section" id="audience">
//       {/* Wrapper to detect outside taps */}
//       <div onClick={() => setActive(null)}>
//         {/* Header */}
//         <motion.div
//           className="audience-header"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <h2>From First Batch to Full Scale</h2>
//           <p>
//             We support brands at every stage of their makhana sourcing journey —
//             from early trials to consistent, large-scale supply.
//           </p>
//         </motion.div>

//         {/* Cards */}
//         <div className="audience-grid">
//           {cards.map((card, index) => (
//             <motion.div
//               key={index}
//               className={`audience-card ${active === index ? "flipped" : ""}`}
//               onClick={(e) => handleToggle(index, e)}
//               whileTap={{ scale: 0.985 }}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.12 }}
//               viewport={{ once: true }}
//             >
//               <div
//                 className="audience-card-inner"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* FRONT */}
//                 <div className="audience-card-front">
//                   <span className="audience-stage">{card.stage}</span>
//                   <div className="audience-icon">{card.icon}</div>
//                   <h3>{card.title}</h3>
//                   <p className="audience-tagline">{card.tagline}</p>
//                   <span className="audience-hint">Tap to learn more</span>
//                 </div>

//                 {/* BACK */}
//                 <div className="audience-card-back">
//                   <h3>{card.title}</h3>
//                   <p>{card.description}</p>
//                   <span className="audience-hint">Tap to go back</span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/sections.css";

const cards = [
  {
    stage: "Discovery",
    title: "First Batches",
    tagline: "Small quantities. Serious intent.",
    icon: "🧪",
    description:
      "Test multiple makhana grades, compare quality, and make confident sourcing decisions before committing at scale.",
  },
  {
    stage: "Launch",
    title: "Launch Ready",
    tagline: "Confidence in every pack.",
    icon: "🚀",
    description:
      "Lock the right grades and ensure consistent quality so your first customers experience exactly what your brand promises.",
  },
  {
    stage: "Growth",
    title: "Scaling Supply",
    tagline: "Without surprises.",
    icon: "📈",
    description:
      "Stable volumes, predictable grading, and clear communication to support your brand as demand grows.",
  },
  {
    stage: "Bulk",
    title: "Bulk & Repeat",
    tagline: "Built for reliability.",
    icon: "🔁",
    description:
      "Designed for repeat orders, large volumes, and long-term supply relationships with established brands.",
  },
];

export default function Audience() {
  const [active, setActive] = useState(null);

  const toggleCard = (index) => {
    setActive((prev) => (prev === index ? null : index));
  };

  const closeAll = () => setActive(null);

  return (
    <section className="audience-section" id="audience">
      {/* Outside tap closes */}
      <div onClick={closeAll}>
        {/* Header */}
        <motion.div
          className="audience-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>From First Batch to Full Scale</h2>
          <p>
            We support brands at every stage of their makhana sourcing journey —
            from early trials to consistent, large-scale supply.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="audience-grid">
          {cards.map((card, index) => {
            const isFlipped = active === index;

            return (
              <motion.div
                key={index}
                className={`audience-card ${isFlipped ? "flipped" : ""}`}
                // IMPORTANT: stop the outside-close, then toggle
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCard(index);
                }}
                whileTap={{ scale: 0.985 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                viewport={{ once: true }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCard(index);
                  }
                }}
              >
                <div className="audience-card-inner">
                  {/* FRONT */}
                  <div className="audience-card-front">
                    <span className="audience-stage">{card.stage}</span>
                    <div className="audience-icon">{card.icon}</div>
                    <h3>{card.title}</h3>
                    <p className="audience-tagline">{card.tagline}</p>
                    <span className="audience-hint">
                      {isFlipped ? "Tap to go back" : "Tap to learn more"}
                    </span>
                  </div>

                  {/* BACK */}
                  <div className="audience-card-back">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span className="audience-hint">Tap to go back</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

