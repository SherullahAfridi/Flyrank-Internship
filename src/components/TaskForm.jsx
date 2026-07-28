import { useState, useEffect } from "react";

function TaskForm({ addTask, updateTask, editingTask, onDone, showToast }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("assignment");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate);
      setPriority(editingTask.priority);
      setCategory(editingTask.category);
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "" || dueDate.trim() === "") {
      showToast("warning", "Please fill in both Task Title and Due Date.");
      return;
    }

    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        title: title.trim(),
        description: description.trim(),
        dueDate,
        priority,
        category,
      };
      updateTask(updatedTask);
    } else {
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        dueDate,
        priority,
        category,
      };
      addTask(newTask);
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setCategory("assignment");

    if (onDone) {
      onDone();
    }
  }

  return (
    <form className="task-form" aria-label="Add new task" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="task-title" className="form-label">
          Task Title
        </label>
        <input
          type="text"
          id="task-title"
          name="task-title"
          className="form-input"
          placeholder="e.g. Finish React assignment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description" className="form-label">
          Description
        </label>
        <textarea
          id="task-description"
          name="task-description"
          className="form-textarea"
          placeholder="Add any extra details about this task..."
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="task-due-date" className="form-label">
          Due Date
        </label>
        <input
          type="date"
          id="task-due-date"
          name="task-due-date"
          className="form-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-priority" className="form-label">
          Priority
        </label>
        <select
          id="task-priority"
          name="task-priority"
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="task-category" className="form-label">
          Category
        </label>
        <select
          id="task-category"
          name="task-category"
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="assignment">Assignment</option>
          <option value="quiz">Quiz</option>
          <option value="exam">Exam</option>
          <option value="project">Project</option>
          <option value="personal">Personal</option>
        </select>
      </div>

      <button type="submit" className="form-submit-button">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;