// Key used to store tasks in the browser's Local Storage
const STORAGE_KEY = "studentTaskManager.tasks";

// Key used to store the user's theme preference
const THEME_KEY = "studentTaskManager.theme";

// Reads tasks from Local Storage. Returns an empty array if nothing is saved
// yet, or if something goes wrong (e.g. corrupted data).
export function loadTasksFromStorage() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (storedTasks) {
      return JSON.parse(storedTasks);
    }

    return [];
  } catch (error) {
    console.error("Failed to load tasks from Local Storage:", error);
    return [];
  }
}

// Saves the given tasks array to Local Storage.
export function saveTasksToStorage(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to Local Storage:", error);
  }
}

// Reads the saved theme preference ("light" or "dark").
// Defaults to "light" if nothing is saved yet.
export function loadThemeFromStorage() {
  try {
    const storedTheme = localStorage.getItem(THEME_KEY);
    return storedTheme === "dark" ? "dark" : "light";
  } catch (error) {
    console.error("Failed to load theme from Local Storage:", error);
    return "light";
  }
}

// Saves the given theme preference to Local Storage.
export function saveThemeToStorage(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error("Failed to save theme to Local Storage:", error);
  }
}