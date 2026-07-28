const SETTINGS_KEY = "studentTaskManager.settings";

export const DEFAULT_SETTINGS = {
  fontSize: "medium",           // "small" | "medium" | "large"
  layoutDensity: "comfortable", // "comfortable" | "compact"
  showAnalytics: true,
  showCompletedTasks: true,
  defaultSort: "dueDate",
  defaultFilterStatus: "All",
  enableToasts: true,
  toastDuration: 3500,
  confirmBeforeDelete: true,
  enableAnimations: true,
};

export function loadSettingsFromStorage() {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      // Merge with defaults so new settings added later always have a value
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Failed to load settings from Local Storage:", error);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettingsToStorage(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings to Local Storage:", error);
  }
}