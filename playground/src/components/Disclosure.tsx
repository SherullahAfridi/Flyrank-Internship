import { useState } from "react";

export default function Disclosure() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Disclosure</h2>

      <button
        id="disclosure-button"
        aria-expanded={open}
        aria-controls="disclosure-panel"
        onClick={() => setOpen(!open)}
      >
        {open ? "Hide Details" : "Show Details"}
      </button>

      <div
        id="disclosure-panel"
        role="region"
        aria-labelledby="disclosure-button"
        hidden={!open}
        style={{
          marginTop: "1rem",
          padding: "1rem",
          border: "1px solid gray",
        }}
      >
        This is the disclosure content. It can be expanded and collapsed.
      </div>
    </div>
  );
}