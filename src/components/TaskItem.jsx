import { useState, useRef, useEffect } from "react";

function TaskItem({
  task,
  confirmBeforeDelete,
  showArchived,
  isSelected,
  onToggleSelect,
  onToggleComplete,
  onDelete,
  onEdit,
  onPin,
  onDuplicate,
  onArchive,
  onRestore,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the quick-action menu when clicking outside it.
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const statusLabel = task.completed ? "Completed" : "Pending";
  const statusClass = task.completed ? "completed" : "pending";
  const completeButtonLabel = task.completed ? "Mark Pending" : "Mark Complete";

  function getDueDateInfo() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    const formattedDate = due.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (task.completed) return { label: `📅 ${formattedDate}`, urgencyClass: "" };
    if (due.getTime() < today.getTime())
      return { label: `🔴 Overdue · ${formattedDate}`, urgencyClass: "overdue" };
    if (due.getTime() === today.getTime())
      return { label: `🟠 Due Today · ${formattedDate}`, urgencyClass: "due-today" };
    if (due.getTime() === tomorrow.getTime())
      return { label: `🟡 Due Tomorrow · ${formattedDate}`, urgencyClass: "due-tomorrow" };
    return { label: `🟢 ${formattedDate}`, urgencyClass: "upcoming" };
  }

  const dueDateInfo = getDueDateInfo();

  function handleDeleteClick() {
    setIsMenuOpen(false);
    if (confirmBeforeDelete) {
      if (window.confirm("Are you sure you want to delete this task?")) {
        onDelete(task.id);
      }
    } else {
      onDelete(task.id);
    }
  }

  return (
    <article className={`task-item ${task.pinned ? "task-item-pinned" : ""}`}>
      <div className="task-item-header">
        <div className="task-title-group">
          <input
            type="checkbox"
            className="task-select-checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(task.id)}
            aria-label={`Select task: ${task.title}`}
          />
          {task.pinned && (
            <span className="pin-indicator" aria-hidden="true">
              📌
            </span>
          )}
          <h3 className="task-title">{task.title}</h3>
        </div>
        <span className={`badge badge-status-${statusClass}`}>{statusLabel}</span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <span className={`task-due-date ${dueDateInfo.urgencyClass}`}>{dueDateInfo.label}</span>
        <span className={`badge badge-priority-${task.priority}`}>{task.priority}</span>
        <span className={`badge badge-category badge-category-${task.category}`}>
          {task.category}
        </span>
      </div>

      <div className="task-actions">
        {showArchived ? (
          <button type="button" className="btn btn-complete" onClick={() => onRestore(task.id)}>
            ♻️ Restore
          </button>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-complete"
              onClick={() => onToggleComplete(task.id)}
            >
              ✓ {completeButtonLabel}
            </button>

            <div className="quick-action-menu" ref={menuRef}>
              <button
                type="button"
                className="btn btn-menu"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                aria-label="More actions"
              >
                ⋯
              </button>

              {isMenuOpen && (
                <div className="quick-action-dropdown" role="menu">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onDuplicate(task.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    📄 Duplicate
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onArchive(task.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    🗄️ Archive
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onPin(task.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    📌 {task.pinned ? "Unpin" : "Pin"}
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onEdit(task);
                      setIsMenuOpen(false);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="quick-action-danger"
                    onClick={handleDeleteClick}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default TaskItem;