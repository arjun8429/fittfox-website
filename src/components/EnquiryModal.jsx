import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

const FLAVORS = [
  {
    id: "mint",
    name: "Mint",
    hindi: "पुदीना",
    emoji: "🌿",
    desc: "Cool, refreshing, and clean. A classic twist on traditional sattu with a crisp menthol finish that lingers.",
    color: "#2ECC71",
    bg: "#E8FBF0",
    tag: "Classic Refresher",
  },
  {
    id: "guava_chilli",
    name: "Guava Chilli",
    hindi: "अमरूद मिर्च",
    emoji: "🍈",
    desc: "Sweet tropical guava meets the slow burn of red chilli. Bold, fruity, and fiery — an unexpected combo that works.",
    color: "#E74C3C",
    bg: "#FEF0EE",
    tag: "Bold & Fruity",
  },
  {
    id: "jal_jeera",
    name: "Jal Jeera",
    hindi: "जल जीरा",
    emoji: "🫙",
    desc: "The beloved street drink, reimagined. Cumin, black salt, and tamarind in every sip — intensely desi, deeply familiar.",
    color: "#F39C12",
    bg: "#FEF9EC",
    tag: "Street Favourite",
  },
  {
    id: "raw_mango",
    name: "Raw Mango",
    hindi: "कच्चा आम",
    emoji: "🥭",
    desc: "Tangy, tart, and summer-in-a-glass. Raw aam with a hint of rock salt — the kind of flavour that hits different on a hot day.",
    color: "#27AE60",
    bg: "#EAF9EE",
    tag: "Summer Special",
  },
];

const RATINGS = ["⭐ Poor", "⭐⭐ Average", "⭐⭐⭐ Good", "⭐⭐⭐⭐ Great", "⭐⭐⭐⭐⭐ Loved it!"];

const ADDITIONAL_QUESTIONS = [
  {
    id: "sweetness",
    label: "How did you find the sweetness level?",
    options: ["Too Sweet", "Just Right", "Not Sweet Enough"],
  },
  {
    id: "consistency",
    label: "How was the mix consistency?",
    options: ["Too Thick", "Perfect", "Too Thin / Watery"],
  },
  {
    id: "aftertaste",
    label: "Was there an unpleasant aftertaste?",
    options: ["No, it was clean", "Slight aftertaste", "Yes, noticeably"],
  },
  {
    id: "buy",
    label: "Would you buy this product?",
    options: ["Definitely Yes", "Maybe", "No"],
  },
  {
    id: "price",
    label: "Ideal price point per sachet (30g)?",
    options: ["₹20–30", "₹30–45", "₹45–60", "₹60+"],
  },
  {
    id: "channel",
    label: "Where would you prefer to buy it?",
    options: ["Local Kirana", "Quick Commerce (Blinkit/Zepto)", "D2C Website", "Modern Trade (DMart, etc.)"],
  },
];

export default function SattuPoll({ open, onClose }) {
  const [step, setStep] = useState(0); // 0=intro, 1=priority, 2=ratings, 3=additional, 4=text, 5=done
  const [orderedFlavors, setOrderedFlavors] = useState(FLAVORS);
  const [flavorRatings, setFlavorRatings] = useState({});
  const [additionalAnswers, setAdditionalAnswers] = useState({});
  const [feedbackText, setFeedbackText] = useState("");
  const [name, setName] = useState("");

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleRating = (flavorId, rating) => {
    setFlavorRatings((prev) => ({ ...prev, [flavorId]: rating }));
  };

  const handleAdditional = (qId, val) => {
    setAdditionalAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const canProceed = () => {
    if (step === 2) return Object.keys(flavorRatings).length === FLAVORS.length;
    if (step === 3) return Object.keys(additionalAnswers).length === ADDITIONAL_QUESTIONS.length;
    return true;
  };

  if (!open) return null;

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <motion.div
        style={styles.card}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 24 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <div style={styles.brandTag}>FITTFOX × Sattu Premix</div>
            <h2 style={styles.headerTitle}>Taster's Feedback</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        {/* PROGRESS */}
        {step > 0 && step < 5 && (
          <div style={styles.progressWrap}>
            <div style={styles.progressBar}>
              <motion.div
                style={{ ...styles.progressFill, width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span style={styles.progressLabel}>Step {step} of {totalSteps}</span>
          </div>
        )}

        <div style={styles.body}>
          <AnimatePresence mode="wait">
            {/* STEP 0 — INTRO */}
            {step === 0 && (
              <motion.div key="intro" {...fadeSlide} style={styles.section}>
                <div style={styles.introEmoji}>🥤</div>
                <h3 style={styles.sectionTitle}>Hey Taster 👋</h3>
                <p style={styles.sectionDesc}>
                  You've just sampled <strong>FITTFOX Sattu Premix</strong> — a high-protein functional drink built for real life.
                  <br /><br />
                  This quick poll takes under <strong>3 minutes</strong>. Your honest feedback directly shapes which flavours we launch first.
                </p>
                <div style={styles.nameRow}>
                  <input
                    style={styles.input}
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button style={styles.primaryBtn} onClick={() => setStep(1)}>
                  Start Feedback →
                </button>
              </motion.div>
            )}

            {/* STEP 1 — PRIORITY RANKING */}
            {step === 1 && (
              <motion.div key="rank" {...fadeSlide} style={styles.section}>
                <h3 style={styles.sectionTitle}>Rank the Flavours</h3>
                <p style={styles.sectionDesc}>
                  Drag to reorder — <strong>best at the top</strong>, worst at the bottom.
                </p>
                <div style={styles.rankHint}>
                  <span style={styles.rankBadge} data-pos="1">🥇 Best</span>
                  <span style={styles.rankArrow}>↕ drag</span>
                  <span style={styles.rankBadge} data-pos="4">💀 Worst</span>
                </div>
                <Reorder.Group
                  axis="y"
                  values={orderedFlavors}
                  onReorder={setOrderedFlavors}
                  style={styles.reorderList}
                >
                  {orderedFlavors.map((f, idx) => (
                    <Reorder.Item key={f.id} value={f} style={{ listStyle: "none" }}>
                      <motion.div
                        style={{ ...styles.flavorRankCard, borderColor: f.color, background: f.bg }}
                        whileDrag={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                      >
                        <span style={{ ...styles.rankNum, color: f.color }}>#{idx + 1}</span>
                        <span style={styles.flavorEmoji}>{f.emoji}</span>
                        <div>
                          <div style={styles.flavorName}>{f.name}</div>
                          <div style={styles.flavorHindi}>{f.hindi}</div>
                        </div>
                        <span style={styles.dragHandle}>⠿</span>
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
                <div style={styles.navRow}>
                  <button style={styles.ghostBtn} onClick={() => setStep(0)}>← Back</button>
                  <button style={styles.primaryBtn} onClick={() => setStep(2)}>Next →</button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — INDIVIDUAL RATINGS */}
            {step === 2 && (
              <motion.div key="rate" {...fadeSlide} style={styles.section}>
                <h3 style={styles.sectionTitle}>Rate Each Flavour</h3>
                <p style={styles.sectionDesc}>Tap to rate all four.</p>

                {FLAVORS.map((f) => (
                  <div key={f.id} style={{ ...styles.ratingCard, borderColor: f.color + "44", background: f.bg }}>
                    <div style={styles.ratingCardTop}>
                      <span style={styles.flavorEmoji}>{f.emoji}</span>
                      <div>
                        <div style={{ ...styles.flavorName, color: f.color }}>{f.name}</div>
                        <div style={styles.flavorTag}>{f.tag}</div>
                      </div>
                    </div>
                    <p style={styles.flavorDesc}>{f.desc}</p>
                    <div style={styles.starRow}>
                      {RATINGS.map((r, i) => (
                        <button
                          key={i}
                          style={{
                            ...styles.starBtn,
                            background: flavorRatings[f.id] === i + 1 ? f.color : "#F5F5F5",
                            color: flavorRatings[f.id] === i + 1 ? "#fff" : "#333",
                          }}
                          onClick={() => handleRating(f.id, i + 1)}
                        >
                          {i + 1}★
                        </button>
                      ))}
                    </div>
                    {flavorRatings[f.id] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ ...styles.ratingLabel, color: f.color }}
                      >
                        {RATINGS[flavorRatings[f.id] - 1]}
                      </motion.div>
                    )}
                  </div>
                ))}

                <div style={styles.navRow}>
                  <button style={styles.ghostBtn} onClick={() => setStep(1)}>← Back</button>
                  <button
                    style={{ ...styles.primaryBtn, opacity: canProceed() ? 1 : 0.4 }}
                    onClick={() => canProceed() && setStep(3)}
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — ADDITIONAL QUESTIONS */}
            {step === 3 && (
              <motion.div key="additional" {...fadeSlide} style={styles.section}>
                <h3 style={styles.sectionTitle}>Quick Questions</h3>
                <p style={styles.sectionDesc}>A few more product-specific inputs.</p>

                {ADDITIONAL_QUESTIONS.map((q) => (
                  <div key={q.id} style={styles.questionBlock}>
                    <p style={styles.questionLabel}>{q.label}</p>
                    <div style={styles.optionRow}>
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          style={{
                            ...styles.optionBtn,
                            background: additionalAnswers[q.id] === opt ? "#1A1A1A" : "#F5F5F5",
                            color: additionalAnswers[q.id] === opt ? "#fff" : "#333",
                            borderColor: additionalAnswers[q.id] === opt ? "#1A1A1A" : "#E5E5E5",
                          }}
                          onClick={() => handleAdditional(q.id, opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div style={styles.navRow}>
                  <button style={styles.ghostBtn} onClick={() => setStep(2)}>← Back</button>
                  <button
                    style={{ ...styles.primaryBtn, opacity: canProceed() ? 1 : 0.4 }}
                    onClick={() => canProceed() && setStep(4)}
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4 — OPEN TEXT */}
            {step === 4 && (
              <motion.div key="text" {...fadeSlide} style={styles.section}>
                <h3 style={styles.sectionTitle}>Anything Else?</h3>
                <p style={styles.sectionDesc}>
                  Your most honest, unfiltered thought — what did we get right, what needs work, what's missing?
                </p>
                <textarea
                  style={styles.textarea}
                  placeholder="e.g. The guava chilli was amazing but needs less sweetness. The packaging could be easier to tear open. Would love a no-sugar version..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={6}
                />
                <div style={styles.charCount}>{feedbackText.length} characters</div>
                <div style={styles.navRow}>
                  <button style={styles.ghostBtn} onClick={() => setStep(3)}>← Back</button>
                  <button style={styles.primaryBtn} onClick={() => setStep(5)}>
                    Submit Feedback ✓
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5 — THANK YOU */}
            {step === 5 && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ ...styles.section, textAlign: "center", padding: "40px 24px" }}
              >
                <div style={styles.doneEmoji}>🙏</div>
                <h3 style={{ ...styles.sectionTitle, fontSize: "22px" }}>
                  {name ? `Thank you, ${name}!` : "Thank you!"}
                </h3>
                <p style={styles.sectionDesc}>
                  Your feedback is genuinely valuable. We're reading every response carefully before deciding which flavours go to market first.
                  <br /><br />
                  <strong>Your top pick: {orderedFlavors[0].emoji} {orderedFlavors[0].name}</strong>
                </p>
                <div style={styles.summaryBox}>
                  <div style={styles.summaryTitle}>Your Flavour Ranking</div>
                  {orderedFlavors.map((f, i) => (
                    <div key={f.id} style={styles.summaryRow}>
                      <span style={{ color: f.color, fontWeight: 700 }}>#{i + 1}</span>
                      <span>{f.emoji} {f.name}</span>
                      <span style={styles.summaryStars}>
                        {flavorRatings[f.id] ? `${"★".repeat(flavorRatings[f.id])}` : "—"}
                      </span>
                    </div>
                  ))}
                </div>
                <button style={styles.primaryBtn} onClick={onClose}>Close</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

const fadeSlide = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
  transition: { duration: 0.22 },
};

const styles = {
  backdrop: {
    position: "fixed", inset: 0,
    background: "rgba(10,10,10,0.55)",
    backdropFilter: "blur(4px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, padding: "16px",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    width: "100%", maxWidth: "520px",
    maxHeight: "88vh",
    display: "flex", flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    padding: "20px 24px 14px",
    borderBottom: "1px solid #F0F0F0",
    background: "#FAFAFA",
  },
  brandTag: {
    fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em",
    color: "#888", textTransform: "uppercase", marginBottom: "4px",
  },
  headerTitle: {
    margin: 0, fontSize: "18px", fontWeight: 800, color: "#1A1A1A",
    fontFamily: "'Georgia', serif",
  },
  closeBtn: {
    background: "none", border: "none", fontSize: "22px",
    cursor: "pointer", color: "#888", lineHeight: 1, padding: "0 4px",
  },
  progressWrap: {
    padding: "10px 24px 6px",
    background: "#FAFAFA",
    borderBottom: "1px solid #F0F0F0",
  },
  progressBar: {
    height: "4px", background: "#EFEFEF", borderRadius: "4px", overflow: "hidden",
    marginBottom: "4px",
  },
  progressFill: {
    height: "100%", background: "#1A1A1A", borderRadius: "4px",
    transition: "width 0.4s ease",
  },
  progressLabel: {
    fontSize: "11px", color: "#AAA", fontWeight: 600,
  },
  body: {
    overflowY: "auto", flex: 1,
  },
  section: {
    padding: "24px",
  },
  introEmoji: {
    fontSize: "48px", textAlign: "center", marginBottom: "12px",
  },
  sectionTitle: {
    fontSize: "20px", fontWeight: 800, color: "#1A1A1A",
    margin: "0 0 8px", fontFamily: "'Georgia', serif",
  },
  sectionDesc: {
    fontSize: "14px", color: "#555", lineHeight: "1.6", margin: "0 0 20px",
  },
  nameRow: {
    marginBottom: "20px",
  },
  input: {
    width: "100%", padding: "10px 14px",
    border: "1.5px solid #E5E5E5", borderRadius: "10px",
    fontSize: "14px", outline: "none", boxSizing: "border-box",
    fontFamily: "inherit",
  },
  primaryBtn: {
    width: "100%", padding: "13px",
    background: "#1A1A1A", color: "#fff",
    border: "none", borderRadius: "12px",
    fontSize: "15px", fontWeight: 700, cursor: "pointer",
    fontFamily: "inherit", transition: "opacity 0.2s",
  },
  ghostBtn: {
    padding: "12px 20px",
    background: "#F5F5F5", color: "#555",
    border: "none", borderRadius: "12px",
    fontSize: "14px", fontWeight: 600, cursor: "pointer",
    fontFamily: "inherit",
  },
  navRow: {
    display: "flex", gap: "10px", marginTop: "20px",
  },
  // RANKING
  rankHint: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "8px 14px",
    background: "#F9F9F9", borderRadius: "8px", marginBottom: "12px",
    fontSize: "13px", color: "#888",
  },
  rankBadge: { fontWeight: 700, color: "#1A1A1A" },
  rankArrow: { color: "#BBB" },
  reorderList: {
    padding: 0, display: "flex", flexDirection: "column", gap: "8px",
  },
  flavorRankCard: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "14px 16px",
    border: "2px solid",
    borderRadius: "14px",
    cursor: "grab", userSelect: "none",
    background: "#fff",
  },
  rankNum: {
    fontSize: "16px", fontWeight: 900, minWidth: "28px",
  },
  flavorEmoji: { fontSize: "24px" },
  flavorName: { fontWeight: 700, fontSize: "15px", color: "#1A1A1A" },
  flavorHindi: { fontSize: "12px", color: "#999" },
  dragHandle: { marginLeft: "auto", fontSize: "18px", color: "#CCC" },
  // RATINGS
  ratingCard: {
    border: "2px solid",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "14px",
  },
  ratingCardTop: {
    display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px",
  },
  flavorTag: {
    fontSize: "11px", fontWeight: 600, color: "#999",
    textTransform: "uppercase", letterSpacing: "0.06em",
  },
  flavorDesc: {
    fontSize: "13px", color: "#666", lineHeight: "1.5",
    margin: "0 0 12px",
  },
  starRow: {
    display: "flex", gap: "6px", flexWrap: "wrap",
  },
  starBtn: {
    padding: "6px 12px", border: "none", borderRadius: "8px",
    fontSize: "13px", fontWeight: 700, cursor: "pointer",
    transition: "all 0.15s", fontFamily: "inherit",
  },
  ratingLabel: {
    fontSize: "12px", fontWeight: 700, marginTop: "8px",
    letterSpacing: "0.04em",
  },
  // ADDITIONAL
  questionBlock: {
    marginBottom: "20px",
  },
  questionLabel: {
    fontSize: "14px", fontWeight: 700, color: "#1A1A1A",
    margin: "0 0 8px",
  },
  optionRow: {
    display: "flex", flexWrap: "wrap", gap: "8px",
  },
  optionBtn: {
    padding: "8px 14px",
    border: "1.5px solid",
    borderRadius: "8px",
    fontSize: "13px", fontWeight: 600,
    cursor: "pointer", transition: "all 0.15s",
    fontFamily: "inherit",
  },
  // TEXT
  textarea: {
    width: "100%", padding: "14px",
    border: "1.5px solid #E5E5E5", borderRadius: "12px",
    fontSize: "14px", lineHeight: "1.6",
    resize: "vertical", outline: "none",
    fontFamily: "inherit", color: "#333",
    boxSizing: "border-box",
  },
  charCount: {
    textAlign: "right", fontSize: "12px", color: "#BBB", marginTop: "4px", marginBottom: "8px",
  },
  // DONE
  doneEmoji: { fontSize: "52px", textAlign: "center", marginBottom: "12px" },
  summaryBox: {
    background: "#F9F9F9", borderRadius: "14px", padding: "16px",
    margin: "16px 0",
  },
  summaryTitle: {
    fontSize: "12px", fontWeight: 700, color: "#999",
    textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px",
  },
  summaryRow: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "6px 0",
    borderBottom: "1px solid #EFEFEF",
    fontSize: "14px",
  },
  summaryStars: {
    marginLeft: "auto", color: "#F39C12", fontSize: "13px",
  },
};
