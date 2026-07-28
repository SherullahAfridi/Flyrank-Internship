function Header({ theme, onToggleTheme, onOpenSettings }) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isDark = theme === "dark";

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-logo" aria-hidden="true">
          📚
        </div>
        <div className="app-header-text">
          <h1 className="app-title">Student Task Manager</h1>
          <p className="app-subtitle">Organize your academic tasks efficiently.</p>
        </div>
        <p className="app-header-date">{formattedDate}</p>
        <button
          type="button"
          className="theme-toggle-button"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
        <button
          type="button"
          className="theme-toggle-button"
          onClick={onOpenSettings}
          aria-label="Open settings"
        >
          ⚙️
        </button>
      </div>
    </header>
  );
}

export default Header;