import { useRef, useState } from "react";

const tabs = [
  {
    id: "home",
    label: "Home",
    content: "Welcome to the Home tab.",
  },
  {
    id: "profile",
    label: "Profile",
    content: "This is your Profile.",
  },
  {
    id: "settings",
    label: "Settings",
    content: "Settings content goes here.",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("home");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Tabs</h2>

      <div role="tablist" aria-label="Sample Tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            aria-selected={activeTab === tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => {
              let nextIndex = index;

              switch (e.key) {
                case "ArrowRight":
                  nextIndex = (index + 1) % tabs.length;
                  break;

                case "ArrowLeft":
                  nextIndex = (index - 1 + tabs.length) % tabs.length;
                  break;

                case "Home":
                  nextIndex = 0;
                  break;

                case "End":
                  nextIndex = tabs.length - 1;
                  break;

                default:
                  return;
              }

              e.preventDefault();

              setActiveTab(tabs[nextIndex].id);
              tabRefs.current[nextIndex]?.focus();
            }}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "1rem",
        }}
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}