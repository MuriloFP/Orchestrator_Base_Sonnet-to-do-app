import React, { useState } from 'react';

/**
 * Individual todo item component
 * @param {Object} props - Component props
 * @param {Object} props.todo - Todo object
 * @param {Function} props.toggleTodo - Function to toggle todo completion
 * @param {Function} props.deleteTodo - Function to delete todo
 * @param {Function} props.setEditingId - Function to set editing state
 */
const TodoItem = ({ todo, toggleTodo, deleteTodo, setEditingId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleEdit = () => {
    setEditingId(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleDoubleClick = () => {
    setEditingId(todo.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      handleDelete();
    }
  };

  return (
    <li 
      className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handleDoubleClick}
    >
      <div className="todo-item__content">
        <label className="todo-item__checkbox-label">
          <input
            type="checkbox"
            className="todo-item__checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            aria-describedby={`todo-text-${todo.id}`}
            aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          />
          <span className="todo-item__checkbox-custom"></span>
        </label>
        
        <span 
          id={`todo-text-${todo.id}`}
          className="todo-item__text"
          tabIndex="0"
          onKeyDown={handleKeyDown}
          role="button"
          aria-label={`Todo: ${todo.text}. Press Enter to toggle completion, Delete to remove, or double-click to edit.`}
        >
          {todo.text}
        </span>
      </div>

      <div className={`todo-item__actions ${isHovered ? 'todo-item__actions--visible' : ''}`}>
        <button
          className="todo-item__action-btn todo-item__edit-btn"
          onClick={handleEdit}
          aria-label={`Edit "${todo.text}"`}
          title="Edit todo"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        
        <button
          className="todo-item__action-btn todo-item__delete-btn"
          onClick={handleDelete}
          aria-label={`Delete "${todo.text}"`}
          title="Delete todo"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;