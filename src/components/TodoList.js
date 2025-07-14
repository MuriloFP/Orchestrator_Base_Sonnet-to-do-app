import React from 'react';
import TodoItem from './TodoItem';

/**
 * Todo list container component
 * @param {Object} props - Component props
 * @param {Array} props.todos - Array of filtered todos
 * @param {Function} props.toggleTodo - Function to toggle todo completion
 * @param {Function} props.deleteTodo - Function to delete todo
 * @param {Function} props.setEditingId - Function to set editing state
 */
const TodoList = ({ todos, toggleTodo, deleteTodo, setEditingId }) => {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <div className="todo-list-empty__icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.67 0 3.22.46 4.56 1.26"></path>
          </svg>
        </div>
        <h3 className="todo-list-empty__title">No todos yet</h3>
        <p className="todo-list-empty__message">
          Add a task above to get started organizing your day!
        </p>
      </div>
    );
  }

  return (
    <ul
      className="todo-list"
      aria-label="Todo items"
      aria-live="polite"
    >
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          setEditingId={setEditingId}
        />
      ))}
    </ul>
  );
};

export default TodoList;