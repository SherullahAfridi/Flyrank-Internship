function FilterBar({
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <fieldset className="filter-bar">
      <legend className="visually-hidden">Filter tasks</legend>

      <div className="filter-group">
        <label htmlFor="filter-status" className="form-label">
          Status
        </label>
        <select
          id="filter-status"
          name="filter-status"
          className="form-select"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="All">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-priority" className="form-label">
          Priority
        </label>
        <select
          id="filter-priority"
          name="filter-priority"
          className="form-select"
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-category" className="form-label">
          Category
        </label>
        <select
          id="filter-category"
          name="filter-category"
          className="form-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Assignment">Assignment</option>
          <option value="Quiz">Quiz</option>
          <option value="Exam">Exam</option>
          <option value="Project">Project</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      {/* Sort - now fully functional */}
      <div className="filter-group">
        <label htmlFor="filter-sort" className="form-label">
          Sort
        </label>
        <select
          id="filter-sort"
          name="filter-sort"
          className="form-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="alphabetical">Alphabetical (A–Z)</option>
          <option value="recentlyAdded">Recently Added</option>
          <option value="recentlyUpdated">Recently Updated</option>
        </select>
      </div>
    </fieldset>
  );
}

export default FilterBar;