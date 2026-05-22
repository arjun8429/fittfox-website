import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

// ─── CONFIG ────────────────────────────────────────────────────────────────────
const GOOGLE_SCRIPT_URL =
//  "https://script.google.com/macros/s/AKfycbxe4Xu73enYc3QYzi6N5TZAqg1sV1e44PM79Jtr86MOATOW9WZ-J0fsSyRErFXvEUy5Mw/exec";
  "https://script.google.com/macros/s/AKfycbwMAyCwIx03DdRnvJGcDl0Zf5b4qd1glJ1UtfoXl0LRbe9zS-Kk0NeaikuOK7QpSWB29Q/exec";

// ─── FLAVOR DATA ───────────────────────────────────────────────────────────────
const FLAVORS = [
  {
    id: "mint",
    name: "Mint",
    hindi: "पुदीना",
    emoji: "🌿",
    color: "#16A34A",
    bg: "#F0FDF4",
    borderColor: "#BBF7D0",
    intensityLabel: "How was the mint intensity?",
  },
  {
    id: "guava_chilli",
    name: "Guava Chilli",
    hindi: "अमरूद मिर्च",
    emoji: "🍈",
    color: "#DC2626",
    bg: "#FEF2F2",
    borderColor: "#FECACA",
    intensityLabel: "How was the spice-fruit balance?",
  },
  {
    id: "jal_jeera",
    name: "Jal Jeera",
    hindi: "जल जीरा",
    emoji: "🫙",
    color: "#D97706",
    bg: "#FFFBEB",
    borderColor: "#FDE68A",
    intensityLabel: "How was the masala intensity?",
  },
  {
    id: "raw_mango",
    name: "Raw Mango",
    hindi: "कच्चा आम",
    emoji: "🥭",
    color: "#059669",
    bg: "#ECFDF5",
    borderColor: "#A7F3D0",
    intensityLabel: "How was the tanginess?",
  },
];

// ─── SHARED QUESTIONS ──────────────────────────────────────────────────────────
// multiSelect: true means multiple options can be chosen
const SHARED_QUESTIONS = [
  {
    id: "consistency",
    label: "How was the mix consistency?",
    options: ["Too thick", "Perfect", "Too thin"],
    multiSelect: false,
  },
  {
    id: "dissolve",
    label: "Did it dissolve well in water?",
    options: ["Dissolved fully", "Mostly", "Left lumps"],
    multiSelect: false,
  },
  {
    id: "buy",
    label: "Would you consider buying this?",
    options: ["Definitely", "Maybe", "Not likely"],
    multiSelect: false,
  },
  {
    id: "channel",
    label: "Where would you expect to buy this?",
    hint: "Select all that apply",
    options: ["Local Kirana", "Quick Commerce (Blinkit/Zepto)", "Brand Website", "Modern Trade (DMart etc.)"],
    multiSelect: true,
  },
];

// ─── STEP LABELS ───────────────────────────────────────────────────────────────
const STEP_LABELS = ["", "Flavours", "Rank", "Taste", "Experience", "Almost done", ""];
const TOTAL_STEPS = 5; // steps 1–5 shown in progress

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function ProgressBar({ step }) {
  const pct = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100);
  return (
    <div style={{ padding: "10px 20px 8px", borderBottom: "1px solid #F3F4F6" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.06em" }}>
          STEP {step} OF {TOTAL_STEPS}
        </span>
        <span style={{ fontSize: 11, color: "#9CA3AF" }}>{STEP_LABELS[step] || ""}</span>
      </div>
      <div style={{ height: 3, background: "#F3F4F6", borderRadius: 99, overflow: "hidden" }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ height: "100%", background: "#111827", borderRadius: 99 }}
        />
      </div>
    </div>
  );
}

// Single-select option card
function OptionCard({ label, selected, onClick, color = "#111827" }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        width: "100%", padding: "13px 16px",
        borderRadius: 14,
        border: selected ? `2px solid ${color}` : "2px solid #F3F4F6",
        background: selected ? color + "12" : "#FAFAFA",
        color: selected ? color : "#374151",
        fontWeight: selected ? 700 : 500,
        fontSize: 15, textAlign: "left",
        cursor: "pointer", fontFamily: "inherit",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 8,
        boxShadow: selected ? "none" : "0 1px 2px rgba(0,0,0,0.04)",
        transition: "border-color 0.15s, background 0.15s",
      }}
    >
      {label}
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            width: 20, height: 20, borderRadius: "50%",
            background: color, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 800, flexShrink: 0,
          }}
        >✓</motion.span>
      )}
    </motion.button>
  );
}

// Multi-select option card — square checkbox aesthetic
function MultiOptionCard({ label, selected, onClick, color = "#111827" }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        width: "100%", padding: "13px 16px",
        borderRadius: 14,
        border: selected ? `2px solid ${color}` : "2px solid #F3F4F6",
        background: selected ? color + "10" : "#FAFAFA",
        color: selected ? color : "#374151",
        fontWeight: selected ? 700 : 500,
        fontSize: 15, textAlign: "left",
        cursor: "pointer", fontFamily: "inherit",
        display: "flex", alignItems: "center", gap: 12,
        marginBottom: 8,
        boxShadow: selected ? "none" : "0 1px 2px rgba(0,0,0,0.04)",
        transition: "border-color 0.15s, background 0.15s",
      }}
    >
      {/* Checkbox */}
      <span style={{
        width: 20, height: 20, borderRadius: 6, flexShrink: 0,
        border: selected ? `2px solid ${color}` : "2px solid #D1D5DB",
        background: selected ? color : "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
      }}>
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ color: "#fff", fontSize: 11, fontWeight: 800, lineHeight: 1 }}
          >✓</motion.span>
        )}
      </span>
      {label}
    </motion.button>
  );
}

function NavRow({ onBack, onSkip, onNext, nextLabel = "Next →", nextDisabled = false, loading = false }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 24, alignItems: "center" }}>
      {onBack && (
        <button onClick={onBack} style={s.backBtn}>←</button>
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled || loading}
        style={{
          ...s.primaryBtn, flex: 1,
          opacity: (nextDisabled || loading) ? 0.4 : 1,
          cursor: (nextDisabled || loading) ? "default" : "pointer",
        }}
      >
        {loading ? "Submitting…" : nextLabel}
      </button>
      {onSkip && (
        <button onClick={onSkip} disabled={loading} style={{ ...s.skipBtn, opacity: loading ? 0.4 : 1 }}>
          Skip
        </button>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function SattuPoll({ open, onClose }) {
  // step 0=intro, 1=flavour-select, 2=rank, 3=flavour-q, 4=shared-q, 5=open-text, 6=done
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [triedIds, setTriedIds] = useState([]);
  const [orderedFlavors, setOrderedFlavors] = useState([]);
  // flavorAnswers[id] = { overall, intensity, again }
  const [flavorAnswers, setFlavorAnswers] = useState({});
  // sharedAnswers[qId] = string (single) | string[] (multi)
  const [sharedAnswers, setSharedAnswers] = useState({});
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triedFlavors = FLAVORS.filter((f) => triedIds.includes(f.id));
  const isMulti = triedIds.length > 1;

  const toggleFlavor = (id) =>
    setTriedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const setFlavorAnswer = (flavorId, key, val) =>
    setFlavorAnswers((prev) => ({ ...prev, [flavorId]: { ...(prev[flavorId] || {}), [key]: val } }));

  // Single select
  const setSharedSingle = (qId, val) =>
    setSharedAnswers((prev) => ({ ...prev, [qId]: val }));

  // Multi select toggle
  const toggleSharedMulti = (qId, val) => {
    setSharedAnswers((prev) => {
      const current = Array.isArray(prev[qId]) ? prev[qId] : [];
      const next = current.includes(val) ? current.filter((x) => x !== val) : [...current, val];
      return { ...prev, [qId]: next };
    });
  };

  const reset = () => {
    setStep(0); setName(""); setTriedIds([]); setOrderedFlavors([]);
    setFlavorAnswers({}); setSharedAnswers({}); setFeedbackText(""); setIsSubmitting(false);
  };

  const submitFeedback = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      submittedAt: new Date().toISOString(),
      name: name || "Anonymous",
      triedFlavorIds: triedIds,
      triedFlavorNames: triedFlavors.map((f) => f.name),
      ranking: isMulti
        ? orderedFlavors.map((f, i) => ({ rank: i + 1, id: f.id, name: f.name }))
        : [],
      flavourAnswers: flavorAnswers,
      productAnswers: sharedAnswers,
      openFeedback: feedbackText,
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        redirect: "follow",
        keepalive: true,
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setStep(6);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Could not submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  const fade = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.2 },
  };

  return (
    <div style={s.backdrop} onClick={onClose}>
      <motion.div
        style={s.card}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {/* ── HEADER ── */}
        <div style={s.header}>
          <div style={s.brandPill}>FITTFOX · Sattu ProMix</div>
          <button style={s.closeBtn} onClick={onClose}>×</button>
        </div>

        {/* ── PROGRESS BAR (steps 1–5) ── */}
        {step >= 1 && step <= 5 && <ProgressBar step={step} />}

        {/* ── BODY ── */}
        <div style={s.body}>
          <AnimatePresence mode="wait">

            {/* ════════════════ STEP 0 — INTRO ════════════════ */}
            {step === 0 && (
              <motion.div key="intro" {...fade} style={s.section}>
                <div style={{ textAlign: "center", paddingBottom: 24 }}>
                  <div style={{ fontSize: 56, marginBottom: 14 }}>👋</div>
                  <h2 style={s.introTitle}>
                    Hey there! You're one of the first to try FITTFOX Sattu ProMix.
                  </h2>
                  <p style={s.introDesc}>
                    Your input helps shape our first launch.
                  </p>
                  <div style={s.timePill}>⏱️ Takes just 2–3 minutes</div>
                </div>

                <input
                  style={s.input}
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  style={{ ...s.primaryBtn, width: "100%", marginTop: 14, fontSize: 16, padding: 15 }}
                  onClick={() => setStep(1)}
                >
                  Start →
                </motion.button>
              </motion.div>
            )}

            {/* ════════════════ STEP 1 — FLAVOUR SELECT ════════════════ */}
            {step === 1 && (
              <motion.div key="select" {...fade} style={s.section}>
                <h3 style={s.pageTitle}>What did you try today?</h3>
                <p style={s.pageSubtitle}>
                  Select every flavour you tasted — we'll only ask about those.
                </p>

                <div style={s.flavorGrid}>
                  {FLAVORS.map((f) => {
                    const sel = triedIds.includes(f.id);
                    return (
                      <motion.button
                        key={f.id}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => toggleFlavor(f.id)}
                        style={{
                          ...s.flavorCard,
                          background: sel ? f.bg : "#FAFAFA",
                          border: sel ? `2.5px solid ${f.color}` : "2px solid #F3F4F6",
                        }}
                      >
                        {sel && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{ ...s.flavorCheck, background: f.color }}
                          >✓</motion.div>
                        )}
                        <span style={{ fontSize: 34, marginBottom: 8 }}>{f.emoji}</span>
                        <span style={{ fontWeight: 700, fontSize: 14, color: sel ? f.color : "#111827" }}>
                          {f.name}
                        </span>
                        <span style={{ fontSize: 11, color: sel ? f.color : "#9CA3AF", marginTop: 2, opacity: 0.85 }}>
                          {f.hindi}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <NavRow
                  onBack={() => setStep(0)}
                  onNext={() => {
                    setOrderedFlavors(FLAVORS.filter((f) => triedIds.includes(f.id)));
                    setStep(isMulti ? 2 : 3);
                  }}
                  nextLabel={
                    triedIds.length === 0
                      ? "Select a flavour first"
                      : triedIds.length === 1
                      ? `Continue with ${FLAVORS.find((f) => f.id === triedIds[0])?.name} →`
                      : `Continue with ${triedIds.length} flavours →`
                  }
                  nextDisabled={triedIds.length === 0}
                />
              </motion.div>
            )}

            {/* ════════════════ STEP 2 — RANKING (multi only) ════════════════ */}
            {step === 2 && (
              <motion.div key="rank" {...fade} style={s.section}>
                <h3 style={s.pageTitle}>Rank the flavours</h3>
                <p style={s.pageSubtitle}>
                  Drag to reorder — start with the ones you enjoyed most.
                </p>

                <div style={s.rankLegend}>
                  <span>🥇 Most enjoyed</span>
                  <span style={{ color: "#D1D5DB", fontSize: 11 }}>hold & drag</span>
                  <span>👎 Least enjoyed</span>
                </div>

                <Reorder.Group
                  axis="y"
                  values={orderedFlavors}
                  onReorder={setOrderedFlavors}
                  style={{ listStyle: "none", padding: 0, margin: "0 0 4px", display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {orderedFlavors.map((f, idx) => (
                    <Reorder.Item key={f.id} value={f} style={{ listStyle: "none" }}>
                      <motion.div
                        whileDrag={{ scale: 1.03, boxShadow: "0 12px 32px rgba(0,0,0,0.13)", zIndex: 10, cursor: "grabbing" }}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "14px 16px",
                          background: f.bg,
                          border: `2px solid ${f.borderColor}`,
                          borderRadius: 16,
                          cursor: "grab", userSelect: "none", touchAction: "none",
                        }}
                      >
                        {/* Rank badge */}
                        <div style={{
                          width: 28, height: 28, borderRadius: "50%",
                          background: f.color, color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 800, fontSize: 12, flexShrink: 0,
                        }}>
                          {idx + 1}
                        </div>
                        <span style={{ fontSize: 24 }}>{f.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>{f.name}</div>
                          <div style={{ fontSize: 11, color: "#9CA3AF" }}>{f.hindi}</div>
                        </div>
                        {/* Drag handle */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingRight: 2, opacity: 0.28 }}>
                          {[0,1,2].map((i) => (
                            <div key={i} style={{ width: 18, height: 2, background: "#374151", borderRadius: 2 }} />
                          ))}
                        </div>
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>

                <NavRow
                  onBack={() => setStep(1)}
                  onSkip={() => setStep(3)}
                  onNext={() => setStep(3)}
                />
              </motion.div>
            )}

            {/* ════════════════ STEP 3 — PER-FLAVOUR QUESTIONS ════════════════ */}
            {step === 3 && (
              <motion.div key="flavour-q" {...fade} style={s.section}>
                <h3 style={s.pageTitle}>Tell us more</h3>
                <p style={s.pageSubtitle}>
                  {triedFlavors.length === 1
                    ? "A few quick questions about the flavour you tried."
                    : "Quick questions about each flavour you tried."}
                </p>

                {triedFlavors.map((f) => {
                  const ans = flavorAnswers[f.id] || {};
                  return (
                    <div key={f.id} style={{ marginBottom: 32 }}>
                      {/* Flavour pill header */}
                      <div style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "10px 14px", borderRadius: 12,
                        background: f.bg, border: `1.5px solid ${f.borderColor}`,
                        marginBottom: 16,
                      }}>
                        <span style={{ fontSize: 20 }}>{f.emoji}</span>
                        <span style={{ fontWeight: 700, color: f.color, fontSize: 15 }}>{f.name}</span>
                        <span style={{ fontSize: 11, color: f.color, opacity: 0.65 }}>{f.hindi}</span>
                      </div>

                      {/* Q1 — Overall */}
                      <div style={s.qBlock}>
                        <p style={s.qLabel}>How did you like this flavour overall?</p>
                        {["Loved it", "It was okay", "Didn't like it"].map((opt) => (
                          <OptionCard key={opt} label={opt}
                            selected={ans.overall === opt}
                            onClick={() => setFlavorAnswer(f.id, "overall", opt)}
                            color={f.color}
                          />
                        ))}
                      </div>

                      {/* Q2 — Intensity (adapts per flavour) */}
                      <div style={s.qBlock}>
                        <p style={s.qLabel}>{f.intensityLabel}</p>
                        {["Just right", "Too strong", "Too mild"].map((opt) => (
                          <OptionCard key={opt} label={opt}
                            selected={ans.intensity === opt}
                            onClick={() => setFlavorAnswer(f.id, "intensity", opt)}
                            color={f.color}
                          />
                        ))}
                      </div>

                      {/* Q3 — Again */}
                      <div style={s.qBlock}>
                        <p style={s.qLabel}>Would you drink this again?</p>
                        {["Yes", "Maybe", "No"].map((opt) => (
                          <OptionCard key={opt} label={opt}
                            selected={ans.again === opt}
                            onClick={() => setFlavorAnswer(f.id, "again", opt)}
                            color={f.color}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}

                <NavRow
                  onBack={() => setStep(isMulti ? 2 : 1)}
                  onSkip={() => setStep(4)}
                  onNext={() => setStep(4)}
                />
              </motion.div>
            )}

            {/* ════════════════ STEP 4 — PRODUCT EXPERIENCE ════════════════ */}
            {step === 4 && (
              <motion.div key="product" {...fade} style={s.section}>
                <h3 style={s.pageTitle}>Product experience</h3>
                <p style={s.pageSubtitle}>
                  Quick questions about the product itself.
                </p>

                {SHARED_QUESTIONS.map((q) => (
                  <div key={q.id} style={s.qBlock}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                      <p style={{ ...s.qLabel, margin: 0 }}>{q.label}</p>
                      {q.hint && (
                        <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500, whiteSpace: "nowrap" }}>
                          {q.hint}
                        </span>
                      )}
                    </div>

                    {q.multiSelect
                      ? q.options.map((opt) => {
                          const selected = Array.isArray(sharedAnswers[q.id]) && sharedAnswers[q.id].includes(opt);
                          return (
                            <MultiOptionCard
                              key={opt} label={opt}
                              selected={selected}
                              onClick={() => toggleSharedMulti(q.id, opt)}
                            />
                          );
                        })
                      : q.options.map((opt) => (
                          <OptionCard
                            key={opt} label={opt}
                            selected={sharedAnswers[q.id] === opt}
                            onClick={() => setSharedSingle(q.id, opt)}
                          />
                        ))
                    }
                  </div>
                ))}

                <NavRow
                  onBack={() => setStep(3)}
                  onSkip={() => setStep(5)}
                  onNext={() => setStep(5)}
                />
              </motion.div>
            )}

            {/* ════════════════ STEP 5 — OPEN TEXT ════════════════ */}
            {step === 5 && (
              <motion.div key="text" {...fade} style={s.section}>
                <h3 style={s.pageTitle}>Anything else?</h3>
                <p style={s.pageSubtitle}>
                  Unfiltered thoughts — what worked, what didn't, what's missing?{" "}
                  <span style={{ color: "#9CA3AF" }}>Optional.</span>
                </p>
                <textarea
                  style={s.textarea}
                  placeholder="e.g. The guava chilli was bold but too sweet. Sachet was hard to tear. Would love a no-sugar version…"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={5}
                />
                <div style={{ textAlign: "right", fontSize: 11, color: "#D1D5DB", marginBottom: 4 }}>
                  {feedbackText.length} characters
                </div>

                <NavRow
                  onBack={() => setStep(4)}
                  onSkip={submitFeedback}
                  onNext={submitFeedback}
                  nextLabel="Submit feedback ✓"
                  loading={isSubmitting}
                />
              </motion.div>
            )}

            {/* ════════════════ STEP 6 — DONE ════════════════ */}
            {step === 6 && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ ...s.section, textAlign: "center", padding: "44px 24px 36px" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  style={{ fontSize: 58, marginBottom: 16 }}
                >🙏</motion.div>

                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#111827", margin: "0 0 10px", fontFamily: "Georgia,serif" }}>
                  {name ? `Thank you, ${name}!` : "Thank you!"}
                </h3>
                <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, margin: "0 0 28px" }}>
                  We read every single response before deciding which flavours launch first.
                  <br />Your input genuinely matters.
                </p>

                {/* Tasted summary */}
                <div style={s.summaryBox}>
                  <div style={s.summaryLabel}>You tasted</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                    {triedFlavors.map((f) => (
                      <div key={f.id} style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "6px 14px", borderRadius: 99,
                        background: f.bg, border: `1.5px solid ${f.borderColor}`,
                        fontSize: 13, fontWeight: 600, color: f.color,
                      }}>
                        {f.emoji} {f.name}
                        {flavorAnswers[f.id]?.overall === "Loved it" && (
                          <span style={{ fontSize: 12 }}>❤️</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ranking recap (if multi) */}
                {isMulti && orderedFlavors.length > 0 && (
                  <div style={{ ...s.summaryBox, marginTop: 10 }}>
                    <div style={s.summaryLabel}>Your ranking</div>
                    {orderedFlavors.map((f, i) => (
                      <div key={f.id} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "7px 0", borderBottom: "1px solid #F3F4F6",
                        fontSize: 14,
                      }}>
                        <span style={{ width: 22, fontWeight: 800, color: f.color }}>#{i + 1}</span>
                        <span style={{ fontSize: 18 }}>{f.emoji}</span>
                        <span style={{ fontWeight: 600, color: "#111827" }}>{f.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button style={{ ...s.ghostBtn, flex: 1 }} onClick={reset}>
                    Submit another
                  </button>
                  <button style={{ ...s.primaryBtn, flex: 1 }} onClick={onClose}>
                    Done
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

// ─── STYLES ────────────────────────────────────────────────────────────────────
const s = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.52)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
    boxSizing: "border-box",
    overflowY: "auto",
  },

  card: {
    background: "#fff",
    borderRadius: 24,
    width: "100%",
    maxWidth: 480,
    maxHeight: "calc(100dvh - 40px)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 16px 50px rgba(0,0,0,0.18)",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "14px 20px 12px",
    borderBottom: "1px solid #F9FAFB",
    flexShrink: 0,
  },
  brandPill: {
    fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
    color: "#6B7280", textTransform: "uppercase",
    background: "#F9FAFB", padding: "4px 10px",
    borderRadius: 99, border: "1px solid #F3F4F6",
  },
  closeBtn: {
    width: 32, height: 32, borderRadius: "50%",
    background: "#F3F4F6", border: "none",
    fontSize: 18, color: "#6B7280",
    cursor: "pointer", lineHeight: 1,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  body: { overflowY: "auto", flex: 1, WebkitOverflowScrolling: "touch" },
  section: { padding: "22px 20px 36px" },

  // Intro
  introTitle: {
    fontSize: 22, fontWeight: 800, color: "#111827",
    fontFamily: "Georgia,serif", lineHeight: 1.3, margin: "0 0 10px",
  },
  introDesc: {
    fontSize: 15, color: "#6B7280", lineHeight: 1.6, margin: "0 0 12px",
  },
  timePill: {
    display: "inline-block",
    background: "#F0FDF4", color: "#16A34A",
    border: "1.5px solid #BBF7D0",
    borderRadius: 99, padding: "6px 14px",
    fontSize: 13, fontWeight: 600, marginBottom: 20,
  },
  input: {
    width: "100%", padding: "13px 16px",
    border: "2px solid #F3F4F6", borderRadius: 14,
    fontSize: 15, outline: "none",
    boxSizing: "border-box", fontFamily: "inherit",
    color: "#111827", background: "#FAFAFA",
  },

  // Page headers
  pageTitle: {
    fontSize: 22, fontWeight: 800, color: "#111827",
    margin: "0 0 6px", fontFamily: "Georgia,serif", lineHeight: 1.25,
  },
  pageSubtitle: {
    fontSize: 14, color: "#6B7280", lineHeight: 1.6, margin: "0 0 20px",
  },

  // Flavour grid
  flavorGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 4 },
  flavorCard: {
    position: "relative", display: "flex", flexDirection: "column", alignItems: "center",
    padding: "18px 12px", borderRadius: 18,
    cursor: "pointer", fontFamily: "inherit",
    transition: "border-color 0.15s, background 0.15s",
  },
  flavorCheck: {
    position: "absolute", top: 8, right: 8,
    width: 20, height: 20, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: 11, fontWeight: 800,
  },

  // Ranking
  rankLegend: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 12px", background: "#F9FAFB", borderRadius: 10,
    fontSize: 12, color: "#9CA3AF", fontWeight: 600, marginBottom: 12,
  },

  // Questions
  qBlock: { marginBottom: 22 },
  qLabel: { fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 10px", lineHeight: 1.4 },

  // Nav buttons
  primaryBtn: {
    padding: "14px 20px", background: "#111827", color: "#fff",
    border: "none", borderRadius: 14,
    fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
  },
  backBtn: {
    width: 44, height: 44, flexShrink: 0,
    background: "#F9FAFB", border: "2px solid #F3F4F6", borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18, color: "#374151", cursor: "pointer", fontFamily: "inherit",
  },
  skipBtn: {
    padding: "12px 14px", flexShrink: 0,
    background: "transparent", border: "2px solid #F3F4F6", borderRadius: 12,
    fontSize: 13, color: "#9CA3AF", fontWeight: 600,
    cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
  },
  ghostBtn: {
    padding: "13px 20px", background: "#F9FAFB", color: "#374151",
    border: "2px solid #F3F4F6", borderRadius: 14,
    fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  },

  // Textarea
  textarea: {
    width: "100%", padding: "13px 14px",
    border: "2px solid #F3F4F6", borderRadius: 14,
    fontSize: 14, lineHeight: 1.6, resize: "none", outline: "none",
    fontFamily: "inherit", color: "#111827", boxSizing: "border-box", background: "#FAFAFA",
  },

  // Done
  summaryBox: {
    background: "#F9FAFB", borderRadius: 16, padding: 16, marginBottom: 12, textAlign: "left",
  },
  summaryLabel: {
    fontSize: 11, fontWeight: 700, color: "#9CA3AF",
    textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10,
  },
};
