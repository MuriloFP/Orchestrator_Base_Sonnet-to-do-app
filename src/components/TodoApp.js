import React from 'react';
import useTodos from '../hooks/useTodos';
import TodoForm from './TodoForm';
import FilterBar from './FilterBar';
import TodoList from './TodoList';

/**
 * Main todo application component
 */
const TodoApp = () => {
  const {
    todos,
    allTodos,
    filter,
    editingId,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    setEditingId,
    clearCompleted,
    getCounts
  } = useTodos();

  return (
    <main className="todo-app" role="main" aria-label="Todo Application">
      <div className="todo-app__container">
        <header className="todo-app__header">
          <h1 className="todo-app__title">
            <svg 
              className="todo-app__icon" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.67 0 3.22.46 4.56 1.26"></path>
            </svg>
            Todo
          </h1>
          <p className="todo-app__subtitle">
            Stay organized and get things done
          </p>
        </header>

        <div className="todo-app__content">
          <TodoForm
            addTodo={addTodo}
            updateTodo={updateTodo}
            editingId={editingId}
            setEditingId={setEditingId}
            todos={allTodos}
          />

          {allTodos.length > 0 && (
            <>
              <FilterBar
                filter={filter}
                setFilter={setFilter}
                getCounts={getCounts}
                clearCompleted={clearCompleted}
              />

              <div className="todo-app__list-container">
                <TodoList
                  todos={todos}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  setEditingId={setEditingId}
                />
              </div>
            </>
          )}
        </div>

        <footer className="todo-app__footer">
          <p className="todo-app__footer-text">
            Double-click to edit • Press Escape to cancel
          </p>
        </footer>
      </div>
    </main>
  );
};

export default TodoApp;