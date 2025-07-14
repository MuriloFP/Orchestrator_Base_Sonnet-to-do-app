import { useState, useEffect, useMemo } from 'react';
import { loadTodos, saveTodos, generateId, validateTodoText } from '../utils/storage';

/**
 * Custom hook for managing todo state and operations
 * @returns {Object} Todo state and operations
 */
const useTodos = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const data = loadTodos();
    setAllTodos(data.todos);
    setFilter(data.filter);
    setEditingId(data.editingId);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const data = {
      todos: allTodos,
      filter,
      editingId
    };
    saveTodos(data);
  }, [allTodos, filter, editingId]);

  // Memoized filtered todos based on current filter
  const todos = useMemo(() => {
    switch (filter) {
      case 'active':
        return allTodos.filter(todo => !todo.completed);
      case 'completed':
        return allTodos.filter(todo => todo.completed);
      default:
        return allTodos;
    }
  }, [allTodos, filter]);

  /**
   * Add a new todo
   * @param {string} text - Todo text
   */
  const addTodo = (text) => {
    const validation = validateTodoText(text);
    if (!validation.isValid) {
      console.error('Invalid todo text:', validation.error);
      return false;
    }

    const newTodo = {
      id: generateId(),
      text: validation.text,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    setAllTodos(prev => [newTodo, ...prev]);
    return true;
  };

  /**
   * Update an existing todo
   * @param {string} id - Todo ID
   * @param {Object} updates - Updates to apply
   */
  const updateTodo = (id, updates) => {
    setAllTodos(prev => prev.map(todo => {
      if (todo.id === id) {
        const updatedTodo = {
          ...todo,
          ...updates,
          updatedAt: Date.now()
        };

        // Validate text if it's being updated
        if (updates.text !== undefined) {
          const validation = validateTodoText(updates.text);
          if (!validation.isValid) {
            console.error('Invalid todo text:', validation.error);
            return todo; // Return unchanged todo
          }
          updatedTodo.text = validation.text;
        }

        return updatedTodo;
      }
      return todo;
    }));
  };

  /**
   * Delete a todo
   * @param {string} id - Todo ID
   */
  const deleteTodo = (id) => {
    setAllTodos(prev => prev.filter(todo => todo.id !== id));
    // Clear editing state if we're deleting the todo being edited
    if (editingId === id) {
      setEditingId(null);
    }
  };

  /**
   * Toggle todo completion status
   * @param {string} id - Todo ID
   */
  const toggleTodo = (id) => {
    updateTodo(id, { 
      completed: !allTodos.find(todo => todo.id === id)?.completed 
    });
  };

  /**
   * Clear all completed todos
   */
  const clearCompleted = () => {
    setAllTodos(prev => prev.filter(todo => !todo.completed));
  };

  /**
   * Get counts for different todo states
   */
  const getCounts = () => {
    const total = allTodos.length;
    const completed = allTodos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  };

  return {
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
  };
};

export default useTodos;