import { useState } from "react";
import EnquiryModal from "../components/EnquiryModal";

export default function FinalCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="cta-section">
        <div className="cta-content">
          <h2>Let’s Build Something Reliable.</h2>

          <div className="cta-actions">
            <button
              className="btn-primary"
              onClick={() => setOpen(true)}
            >
              Send an Enquiry
            </button>
          </div>
        </div>
      </section>

      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
        intent="enquiry"
      />
    </>
  );
}
