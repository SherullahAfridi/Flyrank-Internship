function SettingsPanel({ settings, updateSetting, theme, onToggleTheme, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel settings-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="section-heading">Settings</h2>
          <button type="button" className="modal-close-button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="settings-body">
          {/* Appearance */}
          <section className="settings-section">
            <h3 className="settings-section-title">Appearance</h3>

            <div className="settings-row">
              <label className="settings-label">Theme</label>
              <div className="settings-segmented">
                <button
                  type="button"
                  className={theme === "light" ? "segmented-active" : ""}
                  onClick={() => theme !== "light" && onToggleTheme()}
                >
                  ☀️ Light
                </button>
                <button
                  type="button"
                  className={theme === "dark" ? "segmented-active" : ""}
                  onClick={() => theme !== "dark" && onToggleTheme()}
                >
                  🌙 Dark
                </button>
              </div>
            </div>

            <div className="settings-row">
              <label htmlFor="setting-font-size" className="settings-label">
                Font Size
              </label>
              <select
                id="setting-font-size"
                className="form-select"
                value={settings.fontSize}
                onChange={(e) => updateSetting("fontSize", e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="settings-row">
              <label className="settings-label">Layout</label>
              <div className="settings-segmented">
                <button
                  type="button"
                  className={settings.layoutDensity === "comfortable" ? "segmented-active" : ""}
                  onClick={() => updateSetting("layoutDensity", "comfortable")}
                >
                  Comfortable
                </button>
                <button
                  type="button"
                  className={settings.layoutDensity === "compact" ? "segmented-active" : ""}
                  onClick={() => updateSetting("layoutDensity", "compact")}
                >
                  Compact
                </button>
              </div>
            </div>
          </section>

          {/* Dashboard */}
          <section className="settings-section">
            <h3 className="settings-section-title">Dashboard</h3>

            <div className="settings-row">
              <label htmlFor="setting-show-analytics" className="settings-label">
                Show Analytics Cards
              </label>
              <input
                type="checkbox"
                id="setting-show-analytics"
                checked={settings.showAnalytics}
                onChange={(e) => updateSetting("showAnalytics", e.target.checked)}
              />
            </div>

            <div className="settings-row">
              <label htmlFor="setting-show-completed" className="settings-label">
                Show Completed Tasks
              </label>
              <input
                type="checkbox"
                id="setting-show-completed"
                checked={settings.showCompletedTasks}
                onChange={(e) => updateSetting("showCompletedTasks", e.target.checked)}
              />
            </div>

            <div className="settings-row">
              <label htmlFor="setting-default-sort" className="settings-label">
                Default Sorting
              </label>
              <select
                id="setting-default-sort"
                className="form-select"
                value={settings.defaultSort}
                onChange={(e) => updateSetting("defaultSort", e.target.value)}
              >
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
                <option value="alphabetical">Alphabetical (A–Z)</option>
                <option value="recentlyAdded">Recently Added</option>
                <option value="recentlyUpdated">Recently Updated</option>
              </select>
            </div>

            <div className="settings-row">
              <label htmlFor="setting-default-filter" className="settings-label">
                Default Filter (Status)
              </label>
              <select
                id="setting-default-filter"
                className="form-select"
                value={settings.defaultFilterStatus}
                onChange={(e) => updateSetting("defaultFilterStatus", e.target.value)}
              >
                <option value="All">All Tasks</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </section>

          {/* Notifications */}
          <section className="settings-section">
            <h3 className="settings-section-title">Notifications</h3>

            <div className="settings-row">
              <label htmlFor="setting-toasts" className="settings-label">
                Enable Toast Notifications
              </label>
              <input
                type="checkbox"
                id="setting-toasts"
                checked={settings.enableToasts}
                onChange={(e) => updateSetting("enableToasts", e.target.checked)}
              />
            </div>

            <div className="settings-row">
              <label htmlFor="setting-toast-duration" className="settings-label">
                Auto Dismiss Duration
              </label>
              <select
                id="setting-toast-duration"
                className="form-select"
                value={settings.toastDuration}
                onChange={(e) => updateSetting("toastDuration", Number(e.target.value))}
                disabled={!settings.enableToasts}
              >
                <option value={2000}>2 seconds</option>
                <option value={3500}>3.5 seconds</option>
                <option value={5000}>5 seconds</option>
              </select>
            </div>
          </section>

          {/* Preferences */}
          <section className="settings-section">
            <h3 className="settings-section-title">Preferences</h3>

            <div className="settings-row">
              <label htmlFor="setting-confirm-delete" className="settings-label">
                Confirm Before Delete
              </label>
              <input
                type="checkbox"
                id="setting-confirm-delete"
                checked={settings.confirmBeforeDelete}
                onChange={(e) => updateSetting("confirmBeforeDelete", e.target.checked)}
              />
            </div>

            <div className="settings-row">
              <label htmlFor="setting-animations" className="settings-label">
                Enable Animations
              </label>
              <input
                type="checkbox"
                id="setting-animations"
                checked={settings.enableAnimations}
                onChange={(e) => updateSetting("enableAnimations", e.target.checked)}
              />
            </div>

            <p className="settings-note">
              All preferences save automatically to this browser.
            </p>
          </section>

          {/* About */}
          <section className="settings-section">
            <h3 className="settings-section-title">About</h3>
            <ul className="settings-about-list">
              <li>
                <span>Application Version</span> <span>1.0.0</span>
              </li>
              <li>
                <span>React Version</span> <span>19</span>
              </li>
              <li>
                <span>Developer</span> <span>Student Task Manager Team</span>
              </li>
              <li>
                <span>Build Date</span> <span>July 2026</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;