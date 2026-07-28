function Toast({ toast, onClose }) {
  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div className={`toast toast-${toast.type}`} role="status">
      <span className="toast-icon" aria-hidden="true">
        {icons[toast.type]}
      </span>
      <p className="toast-message">{toast.message}</p>
      <button
        type="button"
        className="toast-close-button"
        onClick={() => onClose(toast.id)}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;