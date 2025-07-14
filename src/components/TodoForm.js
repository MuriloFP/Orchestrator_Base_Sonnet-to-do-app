import React, { useState, useEffect, useRef } from 'react';

/**
 * Todo form component for adding and editing todos
 * @param {Object} props - Component props
 * @param {Function} props.addTodo - Function to add new todo
 * @param {Function} props.updateTodo - Function to update existing todo
 * @param {string|null} props.editingId - ID of todo being edited
 * @param {Function} props.setEditingId - Function to set editing state
 * @param {Array} props.todos - Array of all todos (to find editing todo)
 */
const TodoForm = ({ addTodo, updateTodo, editingId, setEditingId, todos }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Find the todo being edited
  const editingTodo = editingId ? todos.find(todo => todo.id === editingId) : null;

  // Set input value when entering edit mode
  useEffect(() => {
    if (editingTodo) {
      setInputValue(editingTodo.text);
      setError('');
    } else {
      setInputValue('');
      setError('');
    }
  }, [editingTodo]);

  // Auto-focus input when component mounts or enters edit mode
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedValue = inputValue.trim();
    
    // Validation
    if (!trimmedValue) {
      setError('Please enter a todo');
      return;
    }
    
    if (trimmedValue.length > 500) {
      setError('Todo must be 500 characters or less');
      return;
    }

    // Clear any previous errors
    setError('');

    if (editingId) {
      // Update existing todo
      updateTodo(editingId, { text: trimmedValue });
      setEditingId(null);
    } else {
      // Add new todo
      const success = addTodo(trimmedValue);
      if (success) {
        setInputValue('');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setInputValue('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const isEditing = Boolean(editingId);
  const placeholder = isEditing ? 'Edit todo...' : 'What needs to be done?';
  const submitText = isEditing ? 'Update' : 'Add';

  return (
    <form
      className="todo-form"
      onSubmit={handleSubmit}
      aria-label={isEditing ? 'Edit todo' : 'Add new todo'}
    >
      <div className="todo-form__input-group">
        <input
          ref={inputRef}
          type="text"
          className={`todo-form__input ${error ? 'todo-form__input--error' : ''}`}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={isEditing ? 'Edit todo text' : 'Enter new todo'}
          aria-describedby={error ? 'todo-form-error' : 'todo-form-help'}
          aria-invalid={error ? 'true' : 'false'}
          maxLength={500}
          required
        />
        
        <div className="todo-form__actions">
          {isEditing && (
            <button
              type="button"
              className="todo-form__btn todo-form__btn--cancel"
              onClick={handleCancel}
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="todo-form__btn todo-form__btn--submit"
            disabled={!inputValue.trim()}
            aria-label={isEditing ? 'Update todo' : 'Add todo'}
          >
            {submitText}
          </button>
        </div>
      </div>

      {error && (
        <div 
          id="todo-form-error"
          className="todo-form__error"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      {!error && (
        <div 
          id="todo-form-help"
          className="todo-form__help"
        >
          {isEditing ? 'Press Escape to cancel' : 'Press Enter to add todo'}
        </div>
      )}
    </form>
  );
};

export default TodoForm;