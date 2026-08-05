import { useEffect, useRef, type CSSProperties } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!isOpen) return;

  dialogRef.current?.focus();

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key === "Tab") {
      const focusableElements =
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

      if (!focusableElements || focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={overlayStyle}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1}
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title">Accessibility Modal</h2>

        <p>
          This modal is being built from scratch for the FE-05 assignment.
        </p>

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle: CSSProperties = {
  background: "white",
  padding: "2rem",
  borderRadius: "8px",
  width: "400px",
};