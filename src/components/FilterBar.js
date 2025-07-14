import React from 'react';

/**
 * Filter bar component for filtering todos and showing statistics
 * @param {Object} props - Component props
 * @param {string} props.filter - Current filter ('all', 'active', 'completed')
 * @param {Function} props.setFilter - Function to set filter
 * @param {Function} props.getCounts - Function to get todo counts
 * @param {Function} props.clearCompleted - Function to clear completed todos
 */
const FilterBar = ({ filter, setFilter, getCounts, clearCompleted }) => {
  const counts = getCounts();
  const filters = [
    { key: 'all', label: 'All', count: counts.total },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Completed', count: counts.completed }
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    if (counts.completed > 0) {
      clearCompleted();
    }
  };

  const handleKeyDown = (e, filterKey) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFilterChange(filterKey);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const currentIndex = filters.findIndex(f => f.key === filter);
      let nextIndex;
      
      if (e.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : filters.length - 1;
      } else {
        nextIndex = currentIndex < filters.length - 1 ? currentIndex + 1 : 0;
      }
      
      handleFilterChange(filters[nextIndex].key);
    }
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__stats">
        <div 
          className="filter-bar__count"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="filter-bar__count-number">{counts.active}</span>
          <span className="filter-bar__count-text">
            {counts.active === 1 ? 'task' : 'tasks'} remaining
          </span>
        </div>
      </div>

      <div 
        className="filter-bar__filters"
        role="tablist"
        aria-label="Filter todos"
      >
        {filters.map((filterOption) => (
          <button
            key={filterOption.key}
            className={`filter-bar__filter ${
              filter === filterOption.key ? 'filter-bar__filter--active' : ''
            }`}
            onClick={() => handleFilterChange(filterOption.key)}
            onKeyDown={(e) => handleKeyDown(e, filterOption.key)}
            role="tab"
            aria-selected={filter === filterOption.key}
            aria-controls="todo-list"
            aria-label={`Show ${filterOption.label.toLowerCase()} todos (${filterOption.count})`}
          >
            <span className="filter-bar__filter-text">{filterOption.label}</span>
            <span className="filter-bar__filter-count">{filterOption.count}</span>
          </button>
        ))}
      </div>

      <div className="filter-bar__actions">
        {counts.completed > 0 && (
          <button
            className="filter-bar__clear-btn"
            onClick={handleClearCompleted}
            aria-label={`Clear ${counts.completed} completed ${counts.completed === 1 ? 'task' : 'tasks'}`}
            title="Clear completed tasks"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
            </svg>
            <span className="filter-bar__clear-text">Clear completed</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;