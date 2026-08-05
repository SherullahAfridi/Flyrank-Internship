import { useState, useRef } from "react";
import Modal from "./components/Modal";
import Tabs from "./components/Tabs";
import Disclosure from "./components/Disclosure";
export default function App() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Accessibility Playground</h1>

      <p>FE-05 Assignment</p>

<button
  ref={buttonRef}
  onClick={() => setOpen(true)}
>
        Open Modal
      </button>

<Modal
  isOpen={open}
  onClose={() => {
    setOpen(false);
    buttonRef.current?.focus();
  }}
/>

      <Tabs />
      <Disclosure />
    </main>
  );
}