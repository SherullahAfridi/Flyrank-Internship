import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  totalTaskCount,
  isLoaded,
  emptyMessage,
  confirmBeforeDelete,
  showArchived,
  selectedTaskIds,
  onToggleSelect,
  onClearSelection,
  onBulkComplete,
  onBulkArchive,
  onBulkDelete,
  onToggleComplete,
  onDelete,
  onEdit,
  onPin,
  onDuplicate,
  onArchive,
  onRestore,
  onAddClick,
}) {
  if (!isLoaded) {
    return (
      <div className="task-list" aria-busy="true" aria-label="Loading tasks">
        <div className="skeleton-card">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-text"></div>
          <div className="skeleton-line skeleton-text-short"></div>
        </div>
        <div className="skeleton-card">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-text"></div>
          <div className="skeleton-line skeleton-text-short"></div>
        </div>
      </div>
    );
  }

  const hasSelection = selectedTaskIds && selectedTaskIds.size > 0;

  if (tasks.length === 0) {
    if (totalTaskCount === 0) {
      if (showArchived) {
        return (
          <div className="empty-state premium-empty-state">
            <div className="empty-state-icon" aria-hidden="true">
              🗄️
            </div>
            <h3 className="empty-state-title">No archived tasks yet</h3>
            <p className="empty-state-description">
              Tasks you archive will show up here, ready to restore any time.
            </p>
          </div>
        );
      }
      return (
        <div className="empty-state premium-empty-state">
          <div className="empty-state-icon" aria-hidden="true">
            🗂️
          </div>
          <h3 className="empty-state-title">No tasks yet</h3>
          <p className="empty-state-description">
            Your task list is empty. Add your first assignment, quiz, or project
            to start staying on top of your academic schedule.
          </p>
          <button type="button" className="empty-state-cta" onClick={onAddClick}>
            + Add Your First Task
          </button>
        </div>
      );
    }

    return (
      <div className="empty-state premium-empty-state">
        <div className="empty-state-icon" aria-hidden="true">
          🔍
        </div>
        <h3 className="empty-state-title">{emptyMessage}</h3>
        <p className="empty-state-description">
          Try adjusting your search, filters, or sort options.
        </p>
      </div>
    );
  }

  return (
    <>
      {hasSelection && !showArchived && (
        <div className="bulk-action-bar">
          <span className="bulk-action-count">{selectedTaskIds.size} selected</span>
          <div className="bulk-action-buttons">
            <button type="button" className="btn btn-complete" onClick={onBulkComplete}>
              ✓ Complete
            </button>
            <button type="button" className="btn btn-pin" onClick={onBulkArchive}>
              🗄️ Archive
            </button>
            <button type="button" className="btn btn-delete" onClick={onBulkDelete}>
              🗑️ Delete
            </button>
            <button type="button" className="btn btn-edit" onClick={onClearSelection}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            confirmBeforeDelete={confirmBeforeDelete}
            showArchived={showArchived}
            isSelected={selectedTaskIds ? selectedTaskIds.has(task.id) : false}
            onToggleSelect={onToggleSelect}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
            onPin={onPin}
            onDuplicate={onDuplicate}
            onArchive={onArchive}
            onRestore={onRestore}
          />
        ))}
      </div>
    </>
  );
}

export default TaskList;