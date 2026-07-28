import { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import SettingsPanel from "./components/SettingsPanel";
import { loadThemeFromStorage, saveThemeToStorage } from "./utils/localStorage";
import { loadSettingsFromStorage, saveSettingsToStorage } from "./utils/settingsStorage";

function App() {
  const [theme, setTheme] = useState("light");
  const [settings, setSettings] = useState(loadSettingsFromStorage());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = loadThemeFromStorage();
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    saveThemeToStorage(theme);
  }, [theme]);

  // Apply appearance settings to the whole document via data attributes
  useEffect(() => {
    document.documentElement.setAttribute("data-font-size", settings.fontSize);
    document.documentElement.setAttribute("data-density", settings.layoutDensity);
    document.documentElement.setAttribute(
      "data-animations",
      settings.enableAnimations ? "on" : "off"
    );
  }, [settings.fontSize, settings.layoutDensity, settings.enableAnimations]);

  useEffect(() => {
    saveSettingsToStorage(settings);
  }, [settings]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  function updateSetting(key, value) {
    setSettings((currentSettings) => ({ ...currentSettings, [key]: value }));
  }

  return (
    <div className="app-container">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <Dashboard settings={settings} />
      <Footer />

      {isSettingsOpen && (
        <SettingsPanel
          settings={settings}
          updateSetting={updateSetting}
          theme={theme}
          onToggleTheme={toggleTheme}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;