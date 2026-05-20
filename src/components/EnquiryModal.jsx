import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

// ─── FLAVOR DATA ───────────────────────────────────────────────────────────────
const FLAVORS = [
  {
    id: "mint",
    name: "Mint",
    hindi: "पुदीना",
    emoji: "🌿",
    desc: "Cool, refreshing, and clean. A classic twist on traditional sattu with a crisp menthol finish.",
    color: "#2ECC71",
    bg: "#E8FBF0",
    tag: "Classic Refresher",
    // Contextual questions specific to this flavour
    questions: [
      {
        id: "coolness",
        label: "How was the mint intensity?",
        options: ["Too Mild", "Just Right", "Overpowering"],
      },
      {
        id: "freshness",
        label: "Did it feel refreshing after drinking?",
        options: ["Very Refreshing", "Somewhat", "Not Really"],
      },
      {
        id: "aftertaste",
        label: "Was the aftertaste pleasant?",
        options: ["Yes, clean finish", "Neutral", "No, lingered badly"],
      },
    ],
  },
  {
    id: "guava_chilli",
    name: "Guava Chilli",
    hindi: "अमरूद मिर्च",
    emoji: "🍈",
    desc: "Sweet tropical guava meets the slow burn of red chilli — bold, fruity, and fiery.",
    color: "#E74C3C",
    bg: "#FEF0EE",
    tag: "Bold & Fruity",
    questions: [
      {
        id: "heat_balance",
        label: "How was the chilli heat level?",
        options: ["Too Mild", "Balanced", "Too Spicy"],
      },
      {
        id: "fruitiness",
        label: "Was the guava flavour coming through clearly?",
        options: ["Yes, clearly", "Somewhat", "Not really"],
      },
      {
        id: "sweetness",
        label: "How was the sweetness?",
        options: ["Too Sweet", "Just Right", "Not Sweet Enough"],
      },
    ],
  },
  {
    id: "jal_jeera",
    name: "Jal Jeera",
    hindi: "जल जीरा",
    emoji: "🫙",
    desc: "The beloved street drink, reimagined. Cumin, black salt, and tamarind — deeply desi.",
    color: "#F39C12",
    bg: "#FEF9EC",
    tag: "Street Favourite",
    questions: [
      {
        id: "authenticity",
        label: "Did it taste like real Jal Jeera?",
        options: ["Spot on", "Close enough", "Not quite"],
      },
      {
        id: "salt_level",
        label: "How was the black salt (kala namak) level?",
        options: ["Too Mild", "Perfect", "Too Strong"],
      },
      {
        id: "sourness",
        label: "How was the tamarind tartness?",
        options: ["Too Sour", "Balanced", "Could be more tangy"],
      },
    ],
  },
  {
    id: "raw_mango",
    name: "Raw Mango",
    hindi: "कच्चा आम",
    emoji: "🥭",
    desc: "Tangy, tart, and summer-in-a-glass. Raw aam with a hint of rock salt — hits different on a hot day.",
    color: "#27AE60",
    bg: "#EAF9EE",
    tag: "Summer Special",
    questions: [
      {
        id: "tartness",
        label: "How was the tanginess?",
        options: ["Too Sour", "Perfectly Tangy", "Not Tangy Enough"],
      },
      {
        id: "mango_authenticity",
        label: "Did it taste like real kaccha aam?",
        options: ["Yes, authentic", "Close", "Felt artificial"],
      },
      {
        id: "salt_balance",
        label: "How was the rock salt balance?",
        options: ["Too Salty", "Just Right", "Needed More Salt"],
      },
    ],
  },
];

// Shared questions shown for any flavour
const SHARED_QUESTIONS = [
  {
    id: "consistency",
    label: "How was the mix consistency?",
    options: ["Too Thick", "Perfect", "Too Thin / Watery"],
  },
  {
    id: "solubility",
    label: "Did it dissolve well in water?",
    options: ["Dissolved Fully", "Mostly", "Left Lumps"],
  },
  {
    id: "buy",
    label: "Would you buy this product?",
    options: ["Definitely Yes", "Maybe", "No"],
  },
  {
    id: "price",
    label: "Ideal price per sachet (30g)?",
    options: ["₹20–30", "₹30–45", "₹45–60", "₹60+"],
  },
  {
    id: "channel",
    label: "Where would you buy it?",
    options: ["Local Kirana", "Quick Commerce (Blinkit/Zepto)", "D2C Website", "Modern Trade (DMart etc.)"],
  },
];

const RATINGS = ["Poor", "Average", "Good", "Great", "Loved it!"];

// Paste your Google Apps Script Web App URL here after deployment
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw91D4ZX2sqRZM4Yu_2i9oUSOlbEst-Wb25GXlFMu8zF5Nn5gMYlPDcQmHAZ0EXjhwfpg/exec";

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function SattuPoll({ open, onClose }) {
  // steps: 0=intro, 1=flavour-select, 2=rank(multi) or rate(single), 3=contextual-q, 4=shared-q, 5=text, 6=done
  const [step, setStep] = useState(0);
  const [triedFlavors, setTriedFlavors] = useState([]); // ids of flavours tasted
  const [orderedFlavors, setOrderedFlavors] = useState([]);
  const [flavorRating, setFlavorRating] = useState({}); // { flavorId: 1-5 }
  const [contextAnswers, setContextAnswers] = useState({}); // { "flavorId.qId": answer }
  const [sharedAnswers, setSharedAnswers] = useState({});
  const [feedbackText, setFeedbackText] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMulti = triedFlavors.length > 1;
  const triedFlavorObjects = FLAVORS.filter((f) => triedFlavors.includes(f.id));

  // Build contextual questions for all tried flavours
  const allContextQuestions = triedFlavorObjects.flatMap((f) =>
    f.questions.map((q) => ({ ...q, flavorId: f.id, flavor: f }))
  );

  const totalSteps = 6;
  const progress = Math.round((step / totalSteps) * 100);

  const toggleFlavor = (id) => {
    setTriedFlavors((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const proceedFromFlavorSelect = () => {
    const selected = FLAVORS.filter((f) => triedFlavors.includes(f.id));
    setOrderedFlavors(selected);
    setStep(2);
  };

  const handleContextAnswer = (flavorId, qId, val) => {
    setContextAnswers((prev) => ({ ...prev, [`${flavorId}.${qId}`]: val }));
  };

  const handleSharedAnswer = (qId, val) => {
    setSharedAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const reset = () => {
    setStep(0);
    setTriedFlavors([]);
    setOrderedFlavors([]);
    setFlavorRating({});
    setContextAnswers({});
    setSharedAnswers({});
    setFeedbackText("");
    setName("");
    setIsSubmitting(false);
  };


  const submitFeedback = async () => {
    if (isSubmitting) return;

    const ranking = isMulti
      ? orderedFlavors.map((flavor, index) => ({
          rank: index + 1,
          id: flavor.id,
          name: flavor.name,
        }))
      : [];

    const triedFlavorNames = triedFlavorObjects.map((flavor) => flavor.name);

    const payload = {
      submittedAt: new Date().toISOString(),
      name: name || "Anonymous",
      triedFlavorIds: triedFlavors,
      triedFlavorNames,
      ranking,
      ratings: flavorRating,
      flavourSpecificAnswers: contextAnswers,
      productAnswers: sharedAnswers,
      openFeedback: feedbackText,
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
    };

    try {
      setIsSubmitting(true);

      console.log("Submitting FittFox feedback:", payload);

      // Google Apps Script works best from static frontends with a simple no-cors POST.
      // Do not use application/json here because it can trigger a CORS preflight.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        redirect: "follow",
        keepalive: true,
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setStep(6);
    } catch (error) {
      console.error("Feedback submission failed:", error);
      alert("Sorry, feedback could not be submitted. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

        {/* PROGRESS BAR */}
        {step > 0 && step < 6 && (
          <div style={styles.progressWrap}>
            <div style={styles.progressBar}>
              <motion.div
                style={styles.progressFill}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span style={styles.progressLabel}>Step {step} of {totalSteps}</span>
          </div>
        )}

        <div style={styles.body}>
          <AnimatePresence mode="wait">

            {/* ── STEP 0: INTRO ── */}
            {step === 0 && (
              <motion.div key="intro" {...fadeSlide} style={styles.section}>
                <div style={styles.bigEmoji}>🥤</div>
                <h3 style={styles.sectionTitle}>Hey Taster 👋</h3>
                <p style={styles.sectionDesc}>
                  You've just sampled <strong>FITTFOX Sattu Premix</strong> — a high-protein functional drink built for real life.
                  <br /><br />
                  Your honest feedback shapes which flavours we launch first. Takes under 3 minutes.
                </p>
                <input
                  style={{ ...styles.input, marginBottom: "20px" }}
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button style={styles.primaryBtn} onClick={() => setStep(1)}>
                  Start Feedback →
                </button>
              </motion.div>
            )}

            {/* ── STEP 1: WHICH FLAVOUR(S) DID YOU TRY? ── */}
            {step === 1 && (
              <motion.div key="flavour-select" {...fadeSlide} style={styles.section}>
                <h3 style={styles.sectionTitle}>What did you try today?</h3>
                <p style={styles.sectionDesc}>
                  Select the flavour(s) you actually tasted. We'll only ask you about those.
                </p>
                <div style={styles.flavorSelectGrid}>
                  {FLAVORS.map((f) => {
                    const selected = triedFlavors.includes(f.id);
                    return (
                      <motion.button
                        key={f.id}
                        style={{
                          ...styles.flavorSelectCard,
                          background: selected ? f.color : f.bg,
                          borderColor: f.color,
                          color: selected ? "#fff" : "#1A1A1A",
                        }}
                        onClick={() => toggleFlavor(f.id)}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span style={styles.selectEmoji}>{f.emoji}</span>
                        <div style={styles.selectName}>{f.name}</div>
                        <div style={{ ...styles.selectHindi, color: selected ? "rgba(255,255,255,0.7)" : "#999" }}>
                          {f.hindi}
                        </div>
                        {selected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={styles.checkmark}
                          >
                            ✓
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                <div style={styles.navRow}>
                  <button style={styles.ghostBtn} onClick={() => setStep(0)}>← Back</button>
                  <button
                    style={{ ...styles.primaryBtn, flex: 1, opacity: triedFlavors.length > 0 ? 1 : 0.4 }}
                    onClick={() => triedFlavors.length > 0 && proceedFromFlavorSelect()}
                  >
                    {triedFlavors.length === 0
                      ? "Select at least one"
                      : triedFlavors.length === 1
                      ? `Continue with ${FLAVORS.find((f) => f.id === triedFlavors[0])?.name} →`
                      : `Continue with ${triedFlavors.length} flavours →`}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: RANK (multi) or RATE (single) ── */}
            {step === 2 && (
              <motion.div key="rank-rate" {...fadeSlide} style={styles.section}>
                {isMulti ? (
                  <>
                    <h3 style={styles.sectionTitle}>Rank the Flavours</h3>
                    <p style={styles.sectionDesc}>
                      Drag to reorder — <strong>best at top</strong>, worst at bottom.
                    </p>
                    <div style={styles.rankHint}>
                      <span>🥇 Best</span>
                      <span style={{ color: "#BBB" }}>↕ drag to reorder</span>
                      <span>💀 Worst</span>
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
                            <span style={{ fontSize: "22px" }}>{f.emoji}</span>
                            <div>
                              <div style={styles.flavorName}>{f.name}</div>
                              <div style={styles.flavorHindi}>{f.hindi}</div>
                            </div>
                            <span style={styles.dragHandle}>⠿</span>
                          </motion.div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  </>
                ) : (
                  <>
                    <h3 style={styles.sectionTitle}>Rate your experience</h3>
                    <p style={styles.sectionDesc}>How was the {triedFlavorObjects[0]?.name} flavour overall?</p>
                    {triedFlavorObjects.map((f) => (
                      <div key={f.id} style={{ ...styles.ratingCard, borderColor: f.color + "55", background: f.bg }}>
                        <div style={styles.ratingCardTop}>
                          <span style={{ fontSize: "28px" }}>{f.emoji}</span>
                          <div>
                            <div style={{ ...styles.flavorName, color: f.color }}>{f.name}</div>
                            <div style={styles.flavorTag}>{f.tag}</div>
                          </div>
                        </div>
                        <p style={styles.flavorDesc}>{f.desc}</p>
                        <div style={styles.starRow}>
                          {RATINGS.map((label, i) => {
                            const val = i + 1;
                            const active = flavorRating[f.id] === val;
                            return (
                              <button
                                key={i}
                                style={{
                                  ...styles.starBtn,
                                  background: active ? f.color : "#F0F0F0",
                                  color: active ? "#fff" : "#555",
                                }}
                                onClick={() => setFlavorRating((p) => ({ ...p, [f.id]: val }))}
                              >
                                {val}★
                              </button>
                            );
                          })}
                        </div>
                        {flavorRating[triedFlavorObjects[0]?.id] && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ ...styles.ratingLabel, color: f.color }}
                          >
                            {RATINGS[flavorRating[f.id] - 1]}
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </>
                )}
                <div style={styles.navRow}>
                  <button style={styles.ghostBtn} onClick={() => setStep(1)}>← Back</button>
                  <button style={styles.skipBtn} onClick={() => setStep(3)}>Skip</button>
                  <button style={{ ...styles.primaryBtn, flex: 1 }} onClick={() => setStep(3)}>
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: CONTEXTUAL QUESTIONS (flavour-specific) ── */}
            {step === 3 && (
              <motion.div key="contextual" {...fadeSlide} style={styles.section}>
                <h3 style={styles.sectionTitle}>Flavour Details</h3>
                <p style={styles.sectionDesc}>
                  Specific questions about the flavour(s) you tried. Skip anything you're unsure about.
                </p>

                {triedFlavorObjects.map((f) => (
                  <div key={f.id} style={styles.flavorQBlock}>
                    <div style={{ ...styles.flavorQHeader, borderColor: f.color, background: f.bg }}>
                      <span style={{ fontSize: "18px" }}>{f.emoji}</span>
                      <span style={{ ...styles.flavorName, color: f.color }}>{f.name}</span>
                    </div>
                    {f.questions.map((q) => {
                      const key = `${f.id}.${q.id}`;
                      return (
                        <div key={q.id} style={styles.questionBlock}>
                          <p style={styles.questionLabel}>{q.label}</p>
                          <div style={styles.optionRow}>
                            {q.options.map((opt) => {
                              const active = contextAnswers[key] === opt;
                              return (
                                <button
                                  key={opt}
                                  style={{
                                    ...styles.optionBtn,
                                    background: active ? f.color : "#F5F5F5",
                                    color: active ? "#fff" : "#333",
                                    borderColor: active ? f.color : "#E5E5E5",
                                  }}
                                  onClick={() => handleContextAnswer(f.id, q.id, opt)}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}

                <div style={styles.navRow}>
                  <button style={styles.ghostBtn} onClick={() => setStep(2)}>← Back</button>
                  <button style={styles.skipBtn} onClick={() => setStep(4)}>Skip</button>
                  <button style={{ ...styles.primaryBtn, flex: 1 }} onClick={() => setStep(4)}>
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: SHARED PRODUCT QUESTIONS ── */}
            {step === 4 && (
              <motion.div key="shared" {...fadeSlide} style={styles.section}>
                <h3 style={styles.sectionTitle}>About the Product</h3>
                <p style={styles.sectionDesc}>
                  General questions about the product experience. Skip anything you're unsure of.
                </p>

                {SHARED_QUESTIONS.map((q) => (
                  <div key={q.id} style={styles.questionBlock}>
                    <p style={styles.questionLabel}>{q.label}</p>
                    <div style={styles.optionRow}>
                      {q.options.map((opt) => {
                        const active = sharedAnswers[q.id] === opt;
                        return (
                          <button
                            key={opt}
                            style={{
                              ...styles.optionBtn,
                              background: active ? "#1A1A1A" : "#F5F5F5",
                              color: active ? "#fff" : "#333",
                              borderColor: active ? "#1A1A1A" : "#E5E5E5",
                            }}
                            onClick={() => handleSharedAnswer(q.id, opt)}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div style={styles.navRow}>
                  <button style={styles.ghostBtn} onClick={() => setStep(3)}>← Back</button>
                  <button style={styles.skipBtn} onClick={() => setStep(5)}>Skip</button>
                  <button style={{ ...styles.primaryBtn, flex: 1 }} onClick={() => setStep(5)}>
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 5: OPEN TEXT ── */}
            {step === 5 && (
              <motion.div key="text" {...fadeSlide} style={styles.section}>
                <h3 style={styles.sectionTitle}>Anything Else?</h3>
                <p style={styles.sectionDesc}>
                  Your most honest, unfiltered thought — what worked, what didn't, what's missing?
                  <br />
                  <span style={{ color: "#BBB", fontSize: "13px" }}>This is optional — skip if you've covered everything.</span>
                </p>
                <textarea
                  style={styles.textarea}
                  placeholder="e.g. The guava chilli was bold but left a weird aftertaste. Would love a no-added-sugar version. The sachet was hard to tear open..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={6}
                />
                <div style={styles.charCount}>{feedbackText.length} characters</div>
                <div style={styles.navRow}>
                  <button style={styles.ghostBtn} onClick={() => setStep(4)}>← Back</button>
                  <button
                    style={{ ...styles.skipBtn, opacity: isSubmitting ? 0.6 : 1 }}
                    onClick={submitFeedback}
                    disabled={isSubmitting}
                  >
                    Skip
                  </button>
                  <button
                    style={{ ...styles.primaryBtn, flex: 1, opacity: isSubmitting ? 0.7 : 1 }}
                    onClick={submitFeedback}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit ✓"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 6: DONE ── */}
            {step === 6 && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ ...styles.section, textAlign: "center", padding: "36px 24px" }}
              >
                <div style={styles.bigEmoji}>🙏</div>
                <h3 style={{ ...styles.sectionTitle, fontSize: "22px" }}>
                  {name ? `Thank you, ${name}!` : "Thank you!"}
                </h3>
                <p style={styles.sectionDesc}>
                  We're reading every response before deciding which flavours go first.
                  Your input genuinely matters.
                </p>

                {/* Summary */}
                <div style={styles.summaryBox}>
                  <div style={styles.summaryTitle}>You tasted</div>
                  {triedFlavorObjects.map((f, i) => (
                    <div key={f.id} style={styles.summaryRow}>
                      {isMulti && (
                        <span style={{ color: f.color, fontWeight: 800, minWidth: "28px" }}>
                          #{orderedFlavors.findIndex((x) => x.id === f.id) + 1}
                        </span>
                      )}
                      <span style={{ fontSize: "18px" }}>{f.emoji}</span>
                      <span style={{ fontWeight: 600 }}>{f.name}</span>
                      <span style={styles.summaryStars}>
                        {flavorRating[f.id] ? "★".repeat(flavorRating[f.id]) : "—"}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button style={{ ...styles.ghostBtn, flex: 1 }} onClick={() => { reset(); }}>
                    Submit Another
                  </button>
                  <button style={{ ...styles.primaryBtn, flex: 1 }} onClick={onClose}>
                    Close
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// ─── ANIMATION PRESET ──────────────────────────────────────────────────────────
const fadeSlide = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
  transition: { duration: 0.22 },
};

// ─── STYLES ────────────────────────────────────────────────────────────────────
const styles = {
  backdrop: {
    position: "fixed", inset: 0,
    background: "rgba(10,10,10,0.55)",
    backdropFilter: "blur(4px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, padding: "16px",
  },
  card: {
    background: "#fff", borderRadius: "20px",
    width: "100%", maxWidth: "520px", maxHeight: "88vh",
    display: "flex", flexDirection: "column", overflow: "hidden",
    boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    padding: "20px 24px 14px",
    borderBottom: "1px solid #F0F0F0", background: "#FAFAFA",
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
    padding: "10px 24px 6px", background: "#FAFAFA",
    borderBottom: "1px solid #F0F0F0",
  },
  progressBar: {
    height: "4px", background: "#EFEFEF", borderRadius: "4px",
    overflow: "hidden", marginBottom: "4px",
  },
  progressFill: {
    height: "100%", background: "#1A1A1A", borderRadius: "4px",
  },
  progressLabel: { fontSize: "11px", color: "#AAA", fontWeight: 600 },
  body: { overflowY: "auto", flex: 1 },
  section: { padding: "24px" },
  bigEmoji: { fontSize: "48px", textAlign: "center", marginBottom: "12px" },
  sectionTitle: {
    fontSize: "20px", fontWeight: 800, color: "#1A1A1A",
    margin: "0 0 8px", fontFamily: "'Georgia', serif",
  },
  sectionDesc: {
    fontSize: "14px", color: "#555", lineHeight: "1.6", margin: "0 0 20px",
  },
  input: {
    width: "100%", padding: "10px 14px",
    border: "1.5px solid #E5E5E5", borderRadius: "10px",
    fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  },

  // Buttons
  primaryBtn: {
    padding: "13px", background: "#1A1A1A", color: "#fff",
    border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
  },
  ghostBtn: {
    padding: "12px 18px", background: "#F5F5F5", color: "#555",
    border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: 600,
    cursor: "pointer", fontFamily: "inherit",
  },
  skipBtn: {
    padding: "12px 16px", background: "transparent", color: "#AAA",
    border: "1.5px solid #E5E5E5", borderRadius: "12px", fontSize: "13px",
    fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  },
  navRow: { display: "flex", gap: "8px", marginTop: "20px", alignItems: "center" },

  // Flavour select grid
  flavorSelectGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px",
  },
  flavorSelectCard: {
    position: "relative", display: "flex", flexDirection: "column", alignItems: "center",
    padding: "16px 12px", border: "2px solid", borderRadius: "16px",
    cursor: "pointer", textAlign: "center", transition: "all 0.15s",
    fontFamily: "inherit",
  },
  selectEmoji: { fontSize: "28px", marginBottom: "6px" },
  selectName: { fontWeight: 700, fontSize: "14px", marginBottom: "2px" },
  selectHindi: { fontSize: "11px" },
  checkmark: {
    position: "absolute", top: "8px", right: "10px",
    fontWeight: 800, fontSize: "14px", color: "#fff",
  },

  // Ranking
  rankHint: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 14px", background: "#F9F9F9", borderRadius: "8px",
    marginBottom: "12px", fontSize: "13px", color: "#888", fontWeight: 600,
  },
  reorderList: { padding: 0, display: "flex", flexDirection: "column", gap: "8px" },
  flavorRankCard: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "14px 16px", border: "2px solid", borderRadius: "14px",
    cursor: "grab", userSelect: "none",
  },
  rankNum: { fontSize: "16px", fontWeight: 900, minWidth: "28px" },
  flavorName: { fontWeight: 700, fontSize: "15px", color: "#1A1A1A" },
  flavorHindi: { fontSize: "12px", color: "#999" },
  dragHandle: { marginLeft: "auto", fontSize: "18px", color: "#CCC" },

  // Single rating
  ratingCard: { border: "2px solid", borderRadius: "16px", padding: "16px", marginBottom: "14px" },
  ratingCardTop: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" },
  flavorTag: { fontSize: "11px", fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em" },
  flavorDesc: { fontSize: "13px", color: "#666", lineHeight: "1.5", margin: "0 0 12px" },
  starRow: { display: "flex", gap: "6px", flexWrap: "wrap" },
  starBtn: {
    padding: "6px 12px", border: "none", borderRadius: "8px",
    fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
  },
  ratingLabel: { fontSize: "12px", fontWeight: 700, marginTop: "8px", letterSpacing: "0.04em" },

  // Contextual questions
  flavorQBlock: { marginBottom: "24px" },
  flavorQHeader: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "8px 14px", border: "2px solid", borderRadius: "10px",
    marginBottom: "12px",
  },
  questionBlock: { marginBottom: "16px" },
  questionLabel: { fontSize: "14px", fontWeight: 700, color: "#1A1A1A", margin: "0 0 8px" },
  optionRow: { display: "flex", flexWrap: "wrap", gap: "8px" },
  optionBtn: {
    padding: "8px 14px", border: "1.5px solid", borderRadius: "8px",
    fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
    transition: "all 0.15s",
  },

  // Text
  textarea: {
    width: "100%", padding: "14px", border: "1.5px solid #E5E5E5", borderRadius: "12px",
    fontSize: "14px", lineHeight: "1.6", resize: "vertical", outline: "none",
    fontFamily: "inherit", color: "#333", boxSizing: "border-box",
  },
  charCount: { textAlign: "right", fontSize: "12px", color: "#BBB", marginTop: "4px", marginBottom: "8px" },

  // Done summary
  summaryBox: { background: "#F9F9F9", borderRadius: "14px", padding: "16px", margin: "16px 0", textAlign: "left" },
  summaryTitle: {
    fontSize: "11px", fontWeight: 700, color: "#999",
    textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px",
  },
  summaryRow: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "7px 0", borderBottom: "1px solid #EFEFEF", fontSize: "14px",
  },
  summaryStars: { marginLeft: "auto", color: "#F39C12", fontSize: "13px" },
};
