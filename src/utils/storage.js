const STORAGE_KEY = 'todos-app-data';

/**
 * Load todos from localStorage
 * @returns {Object} Parsed data object or default state
 */
export const loadTodos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        todos: Array.isArray(parsed.todos) ? parsed.todos : [],
        filter: parsed.filter || 'all',
        editingId: parsed.editingId || null
      };
    }
    return {
      todos: [],
      filter: 'all',
      editingId: null
    };
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error);
    return {
      todos: [],
      filter: 'all',
      editingId: null
    };
  }
};

/**
 * Save todos to localStorage
 * @param {Object} data - Data object to save
 */
export const saveTodos = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error);
    // Could show user notification here in a real app
  }
};

/**
 * Generate unique ID for todos
 * @returns {string} Unique identifier
 */
export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

/**
 * Validate todo text
 * @param {string} text - Todo text to validate
 * @returns {Object} Validation result
 */
export const validateTodoText = (text) => {
  const trimmed = text.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Todo text is required' };
  }
  
  if (trimmed.length > 500) {
    return { isValid: false, error: 'Todo text must be 500 characters or less' };
  }
  
  return { isValid: true, text: trimmed };
};