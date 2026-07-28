import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import ToastContainer from "./ToastContainer";
import AnalyticsPanel from "./AnalyticsPanel";
import { loadTasksFromStorage, saveTasksToStorage } from "../utils/localStorage";

function Dashboard({ settings }) {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(settings.defaultFilterStatus);
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState(settings.defaultSort);
  const [editingTask, setEditingTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  // Task 34 additions
  const [selectedTaskIds, setSelectedTaskIds] = useState(new Set());
  const [showArchived, setShowArchived] = useState(false);

  const modalRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  useEffect(() => {
    const savedTasks = loadTasksFromStorage();
    setTasks(savedTasks);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, isLoaded]);

  function showToast(type, message) {
    if (!settings.enableToasts) return;
    const newToast = { id: Date.now(), type, message };
    setToasts((currentToasts) => [...currentToasts, newToast]);
    setTimeout(() => {
      removeToast(newToast.id);
    }, settings.toastDuration);
  }

  function removeToast(toastId) {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== toastId));
  }

  function logActivity(message) {
    const newEntry = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
    setActivityLog((currentLog) => [newEntry, ...currentLog].slice(0, 5));
  }

  function addTask(taskData) {
    const now = Date.now();
    const newTask = {
      id: now,
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      category: taskData.category,
      completed: false,
      pinned: false,
      archived: false,
      createdAt: now,
      updatedAt: now,
    };
    setTasks([...tasks, newTask]);
    showToast("success", "Task added successfully.");
    logActivity(`Added "${newTask.title}"`);
  }

  function toggleTaskCompletion(taskId) {
    const targetTask = tasks.find((task) => task.id === taskId);
    const willBeCompleted = targetTask ? !targetTask.completed : false;

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed, updatedAt: Date.now() } : task
    );
    setTasks(updatedTasks);

    showToast("success", willBeCompleted ? "Task marked as completed." : "Task marked as pending.");
    if (targetTask) {
      logActivity(`${willBeCompleted ? "Completed" : "Reopened"} "${targetTask.title}"`);
    }
  }

  function togglePin(taskId) {
    const targetTask = tasks.find((task) => task.id === taskId);
    const willBePinned = targetTask ? !targetTask.pinned : false;

    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, pinned: !task.pinned } : task))
    );

    if (targetTask) {
      logActivity(`${willBePinned ? "Pinned" : "Unpinned"} "${targetTask.title}"`);
    }
  }

  function deleteTask(taskId) {
    const targetTask = tasks.find((task) => task.id === taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
    showToast("info", "Task deleted.");
    if (targetTask) {
      logActivity(`Deleted "${targetTask.title}"`);
    }
  }

  // --- New: Duplicate ---
  function duplicateTask(taskId) {
    const original = tasks.find((task) => task.id === taskId);
    if (!original) return;

    const now = Date.now();
    const copy = {
      ...original,
      id: now,
      title: `${original.title} (Copy)`,
      completed: false,
      pinned: false,
      archived: false,
      createdAt: now,
      updatedAt: now,
    };
    setTasks([...tasks, copy]);
    showToast("success", "Task duplicated.");
    logActivity(`Duplicated "${original.title}"`);
  }

  // --- New: Archive / Restore ---
  function archiveTask(taskId) {
    const target = tasks.find((task) => task.id === taskId);
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, archived: true } : task))
    );
    showToast("info", "Task archived.");
    if (target) logActivity(`Archived "${target.title}"`);
  }

  function restoreTask(taskId) {
    const target = tasks.find((task) => task.id === taskId);
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, archived: false } : task))
    );
    showToast("success", "Task restored.");
    if (target) logActivity(`Restored "${target.title}"`);
  }

  // --- New: Selection + Bulk Actions ---
  function toggleTaskSelected(taskId) {
    setSelectedTaskIds((current) => {
      const next = new Set(current);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  }

  function clearSelection() {
    setSelectedTaskIds(new Set());
  }

  function bulkComplete() {
    setTasks(
      tasks.map((task) =>
        selectedTaskIds.has(task.id) ? { ...task, completed: true, updatedAt: Date.now() } : task
      )
    );
    showToast("success", `${selectedTaskIds.size} task(s) marked complete.`);
    logActivity(`Bulk-completed ${selectedTaskIds.size} task(s)`);
    clearSelection();
  }

  function bulkArchive() {
    setTasks(
      tasks.map((task) => (selectedTaskIds.has(task.id) ? { ...task, archived: true } : task))
    );
    showToast("info", `${selectedTaskIds.size} task(s) archived.`);
    logActivity(`Bulk-archived ${selectedTaskIds.size} task(s)`);
    clearSelection();
  }

  function bulkDelete() {
    const confirmed = window.confirm(
      `Delete ${selectedTaskIds.size} selected task(s)? This cannot be undone.`
    );
    if (!confirmed) return;

    setTasks(tasks.filter((task) => !selectedTaskIds.has(task.id)));
    showToast("info", `${selectedTaskIds.size} task(s) deleted.`);
    logActivity(`Bulk-deleted ${selectedTaskIds.size} task(s)`);
    clearSelection();
  }

  function startEditing(task) {
    lastFocusedElementRef.current = document.activeElement;
    setEditingTask(task);
    setIsFormOpen(true);
  }

  function updateTask(updatedTask) {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? { ...updatedTask, updatedAt: Date.now() } : task))
    );
    setEditingTask(null);
    showToast("success", "Task updated successfully.");
    logActivity(`Updated "${updatedTask.title}"`);
  }

  function openAddForm() {
    lastFocusedElementRef.current = document.activeElement;
    setEditingTask(null);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingTask(null);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  }

  useEffect(() => {
    if (!isFormOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeForm();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    if (modalRef.current) {
      const firstFocusable = modalRef.current.querySelector("button, input, select, textarea");
      if (firstFocusable) firstFocusable.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isFormOpen]);

  function handleSearchChange(newSearchTerm) {
    setSearchTerm(newSearchTerm);
  }
  function handleStatusChange(newStatus) {
    setSelectedStatus(newStatus);
  }
  function handlePriorityChange(newPriority) {
    setSelectedPriority(newPriority);
  }
  function handleCategoryChange(newCategory) {
    setSelectedCategory(newCategory);
  }
  function handleSortChange(newSortBy) {
    setSortBy(newSortBy);
  }

  function toggleArchiveView() {
    setShowArchived((current) => !current);
    clearSelection();
  }

  // Base pool: archived view shows only archived tasks; main view excludes archived.
  const basePool = tasks.filter((task) => (showArchived ? task.archived : !task.archived));

  const filteredTasks = basePool.filter((task) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchesSearch =
      task.title.toLowerCase().includes(lowerSearchTerm) ||
      task.description.toLowerCase().includes(lowerSearchTerm);

    if (showArchived) {
      // In archive view, only search applies — status/priority/category/showCompleted don't.
      return matchesSearch;
    }

    let matchesStatus = true;
    if (selectedStatus === "Pending") matchesStatus = task.completed === false;
    else if (selectedStatus === "Completed") matchesStatus = task.completed === true;

    let matchesPriority = true;
    if (selectedPriority !== "All") {
      matchesPriority = task.priority.toLowerCase() === selectedPriority.toLowerCase();
    }

    let matchesCategory = true;
    if (selectedCategory !== "All") {
      matchesCategory = task.category.toLowerCase() === selectedCategory.toLowerCase();
    }

    let respectsShowCompleted = true;
    if (!settings.showCompletedTasks && selectedStatus === "All") {
      respectsShowCompleted = task.completed === false;
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && respectsShowCompleted;
  });

  const priorityRank = { high: 0, medium: 1, low: 2 };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === "priority") return priorityRank[a.priority] - priorityRank[b.priority];
    if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
    if (sortBy === "recentlyAdded") return (b.createdAt || 0) - (a.createdAt || 0);
    if (sortBy === "recentlyUpdated") return (b.updatedAt || 0) - (a.updatedAt || 0);
    return 0;
  });

  const visibleTasks = showArchived
    ? sortedTasks
    : [...sortedTasks].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  function getEmptyMessage() {
    if (showArchived) {
      return searchTerm.trim() !== "" ? "No archived tasks match your search." : "No archived tasks yet.";
    }
    if (searchTerm.trim() !== "") return "No search results.";
    if (selectedStatus === "Completed") return "No completed tasks yet.";
    if (selectedStatus === "Pending") return "No pending tasks.";
    if (selectedPriority !== "All") return `No ${selectedPriority.toLowerCase()}-priority tasks found.`;
    if (selectedCategory !== "All") return `No tasks in "${selectedCategory}" found.`;
    return "No matching tasks found.";
  }

  const activeTasks = tasks.filter((task) => !task.archived);
  const totalTasks = activeTasks.length;
  const completedTasks = activeTasks.filter((task) => task.completed === true).length;
  const pendingTasks = activeTasks.filter((task) => task.completed === false).length;
  const highPriorityTasks = activeTasks.filter((task) => task.priority === "high").length;
  const archivedCount = tasks.filter((task) => task.archived).length;

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const dueTodayTasks = activeTasks.filter((task) => {
    if (task.completed) return false;
    const d = new Date(task.dueDate);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === todayDate.getTime();
  }).length;

  const overdueTasks = activeTasks.filter((task) => {
    if (task.completed) return false;
    const d = new Date(task.dueDate);
    d.setHours(0, 0, 0, 0);
    return d.getTime() < todayDate.getTime();
  }).length;

  const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  let productivityScore = 0;
  if (totalTasks > 0) {
    let earnedPoints = 0;
    let possiblePoints = 0;
    activeTasks.forEach((task) => {
      const weight = task.priority === "high" ? 2 : 1;
      possiblePoints += weight;
      if (task.completed) earnedPoints += weight;
    });
    productivityScore = Math.round((earnedPoints / possiblePoints) * 100);
  }

  return (
    <main className="dashboard">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <section className="stats-section" aria-label="Task statistics">
        <div className="stat-card">
          <p className="stat-label">Total Tasks</p>
          <p className="stat-value">{totalTasks}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Completed</p>
          <p className="stat-value">{completedTasks}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Pending</p>
          <p className="stat-value">{pendingTasks}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">High Priority</p>
          <p className="stat-value">{highPriorityTasks}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Due Today</p>
          <p className="stat-value">{dueTodayTasks}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Overdue</p>
          <p className="stat-value">{overdueTasks}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Completion Rate</p>
          <p className="stat-value">{completionPercentage}%</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Productivity Score</p>
          <p className="stat-value">{productivityScore}</p>
        </div>
      </section>

      {settings.showAnalytics && <AnalyticsPanel tasks={activeTasks} activityLog={activityLog} />}

      <section className="toolbar-section" aria-label="Search and filter tasks">
        <div className="toolbar-heading-row">
          <h2 className="section-heading">
            {showArchived ? "Archived Tasks" : "Search & Filter"}
          </h2>
          <button type="button" className="archive-toggle-button" onClick={toggleArchiveView}>
            {showArchived ? "← Back to Tasks" : `🗄️ Archive (${archivedCount})`}
          </button>
        </div>
        <div className="toolbar-row">
          <div className="toolbar-search">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </div>
          {!showArchived && (
            <div className="toolbar-filter">
              <FilterBar
                selectedStatus={selectedStatus}
                onStatusChange={handleStatusChange}
                selectedPriority={selectedPriority}
                onPriorityChange={handlePriorityChange}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
              />
            </div>
          )}
        </div>
      </section>

      <section className="task-list-section" aria-label="Task list">
        <TaskList
          tasks={visibleTasks}
          totalTaskCount={showArchived ? archivedCount : tasks.length}
          isLoaded={isLoaded}
          emptyMessage={getEmptyMessage()}
          confirmBeforeDelete={settings.confirmBeforeDelete}
          showArchived={showArchived}
          selectedTaskIds={selectedTaskIds}
          onToggleSelect={toggleTaskSelected}
          onClearSelection={clearSelection}
          onBulkComplete={bulkComplete}
          onBulkArchive={bulkArchive}
          onBulkDelete={bulkDelete}
          onToggleComplete={toggleTaskCompletion}
          onDelete={deleteTask}
          onEdit={startEditing}
          onPin={togglePin}
          onDuplicate={duplicateTask}
          onArchive={archiveTask}
          onRestore={restoreTask}
          onAddClick={openAddForm}
        />
      </section>

      <button type="button" className="fab-add-task" onClick={openAddForm} aria-label="Add new task">
        +
      </button>

      {isFormOpen && (
        <div className="modal-overlay" onClick={closeForm}>
          <div
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label={editingTask ? "Edit task" : "Add new task"}
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="section-heading">{editingTask ? "Edit Task" : "Add New Task"}</h2>
              <button type="button" className="modal-close-button" onClick={closeForm} aria-label="Close">
                ✕
              </button>
            </div>
            <TaskForm
              addTask={addTask}
              updateTask={updateTask}
              editingTask={editingTask}
              onDone={closeForm}
              showToast={showToast}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;