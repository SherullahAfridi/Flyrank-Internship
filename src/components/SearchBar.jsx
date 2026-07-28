function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search-input" className="visually-hidden">
        Search tasks
      </label>

      <span className="search-icon" aria-hidden="true">
        🔍
      </span>

      <input
        type="text"
        id="search-input"
        name="search-input"
        className="search-input"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;