# Todo App Architecture Plan

## Project Overview
A clean, minimalistic task-tracking web app built with Node.js and React, focusing on simplicity and core functionality.

## 1. Project Structure

```
todo-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── TodoApp.js          # Main app container
│   │   ├── TodoList.js         # List of todos
│   │   ├── TodoItem.js         # Individual todo item
│   │   ├── TodoForm.js         # Add/edit todo form
│   │   └── FilterBar.js        # Filter controls
│   ├── hooks/
│   │   └── useTodos.js         # Custom hook for todo logic
│   ├── utils/
│   │   └── storage.js          # localStorage utilities
│   ├── styles/
│   │   ├── index.css           # Global styles
│   │   ├── TodoApp.css         # App container styles
│   │   ├── TodoList.css        # List styles
│   │   ├── TodoItem.css        # Item styles
│   │   ├── TodoForm.css        # Form styles
│   │   └── FilterBar.css       # Filter styles
│   ├── App.js                  # Root component
│   └── index.js                # Entry point
├── package.json
└── README.md
```

### Rationale for Simple Structure:
- **Flat component structure**: Easy to navigate and understand
- **Minimal folders**: Only essential directories (components, hooks, utils, styles)
- **Co-located styles**: Each component has its own CSS file for maintainability
- **Single custom hook**: Centralizes todo logic without over-engineering

## 2. Technology Stack

### Core Dependencies:
- **React 18**: Latest stable version with hooks
- **Create React App**: Simple setup without complex build configuration
- **No state management library**: Using built-in React state and custom hooks

### Development Dependencies:
- **ESLint**: Code quality
- **Prettier**: Code formatting

### Rationale:
- **Minimal dependencies**: Reduces bundle size and complexity
- **Standard tooling**: Familiar setup for most developers
- **No external state management**: React's built-in state is sufficient for this scope

## 3. Component Hierarchy

```
TodoApp (Main Container)
├── TodoForm (Add new todos)
├── FilterBar (All/Active/Completed filters)
└── TodoList (List container)
    └── TodoItem[] (Individual todo items)
```

### Component Responsibilities:

#### TodoApp
- Main application container
- Manages global app state
- Handles data persistence
- Coordinates between child components

#### TodoForm
- Input field for new todos
- Edit mode for existing todos
- Form validation and submission

#### FilterBar
- Filter buttons (All, Active, Completed)
- Active filter state indication
- Clear completed todos action

#### TodoList
- Renders list of filtered todos
- Handles empty state display
- Manages list animations

#### TodoItem
- Individual todo display
- Toggle completion status
- Edit/delete actions
- Micro-animations for state changes

## 4. Data Models

### Todo Object Structure:
```javascript
{
  id: string,           // Unique identifier (timestamp-based)
  text: string,         // Todo description
  completed: boolean,   // Completion status
  createdAt: number,    // Creation timestamp
  updatedAt: number     // Last modification timestamp
}
```

### Application State:
```javascript
{
  todos: Todo[],        // Array of todo objects
  filter: string,       // Current filter ('all', 'active', 'completed')
  editingId: string|null // ID of todo being edited (null if none)
}
```

### Rationale:
- **Simple data structure**: Easy to understand and manipulate
- **Minimal fields**: Only essential properties
- **Timestamps**: Useful for sorting and debugging
- **Flat state**: No nested objects to complicate updates

## 5. State Management Approach

### Custom Hook Pattern:
```javascript
// useTodos.js
const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  
  // Todo operations
  const addTodo = (text) => { /* ... */ };
  const updateTodo = (id, updates) => { /* ... */ };
  const deleteTodo = (id) => { /* ... */ };
  const toggleTodo = (id) => { /* ... */ };
  
  // Filter operations
  const setFilter = (newFilter) => { /* ... */ };
  const getFilteredTodos = () => { /* ... */ };
  
  // Persistence
  useEffect(() => {
    // Load from localStorage on mount
  }, []);
  
  useEffect(() => {
    // Save to localStorage on todos change
  }, [todos]);
  
  return {
    todos: getFilteredTodos(),
    filter,
    editingId,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    setEditingId
  };
};
```

### Rationale:
- **Single source of truth**: All todo logic in one custom hook
- **Automatic persistence**: useEffect handles localStorage sync
- **Clean API**: Simple functions for all operations
- **No prop drilling**: Hook can be used in any component that needs todo data

## 6. Styling Approach

### Plain CSS with CSS Custom Properties:
```css
/* index.css - Global styles and CSS variables */
:root {
  --primary-color: #007bff;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --text-primary: #333;
  --text-secondary: #666;
  --background: #ffffff;
  --border-color: #e0e0e0;
  --shadow: 0 2px 4px rgba(0,0,0,0.1);
  --border-radius: 8px;
  --transition: all 0.2s ease;
}
```

### Component-Specific CSS Files:
- Each component has its own CSS file
- BEM-like naming convention for clarity
- Responsive design with CSS Grid/Flexbox

### Rationale:
- **No additional dependencies**: Plain CSS keeps it simple
- **CSS Custom Properties**: Easy theming and consistency
- **Modular styles**: Each component's styles are isolated
- **Modern CSS**: Grid and Flexbox for layouts

## 7. Animation Strategy

### Micro-Interactions:
1. **Todo Addition**: Slide-in from top with fade
2. **Todo Completion**: Checkbox animation + text strikethrough
3. **Todo Deletion**: Slide-out with fade
4. **Filter Changes**: Smooth transitions between filtered states
5. **Hover States**: Subtle scale/shadow changes

### CSS Transitions:
```css
.todo-item {
  transition: var(--transition);
}

.todo-item:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.todo-item--completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.todo-enter {
  opacity: 0;
  transform: translateY(-10px);
}

.todo-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: var(--transition);
}
```

### Rationale:
- **CSS-only animations**: No JavaScript animation libraries
- **Subtle effects**: Enhance UX without being distracting
- **Performance**: CSS transitions are hardware-accelerated
- **Consistent timing**: Using CSS custom properties for timing

## 8. Accessibility Requirements

### Keyboard Navigation:
- Tab through all interactive elements
- Enter/Space to activate buttons
- Escape to cancel editing

### ARIA Labels:
- Proper labeling for screen readers
- Live regions for dynamic content updates
- Semantic HTML elements

### Visual Accessibility:
- High contrast colors
- Focus indicators
- Scalable text (rem units)

### Implementation:
```javascript
// Example accessibility features
<button 
  aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
  onClick={() => toggleTodo(todo.id)}
>
  <input 
    type="checkbox" 
    checked={todo.completed}
    onChange={() => {}} // Controlled by button click
    aria-hidden="true" // Button handles the interaction
  />
</button>

<div role="status" aria-live="polite">
  {todos.length} {todos.length === 1 ? 'task' : 'tasks'} remaining
</div>
```

## 9. Data Persistence Strategy

### localStorage Implementation:
```javascript
// storage.js
const STORAGE_KEY = 'todos-app-data';

export const loadTodos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load todos:', error);
    return [];
  }
};

export const saveTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos:', error);
  }
};
```

### Rationale:
- **Simple persistence**: localStorage is sufficient for this scope
- **Error handling**: Graceful fallbacks for storage failures
- **JSON serialization**: Easy to work with JavaScript objects
- **Single storage key**: Keeps localStorage clean

## 10. Implementation Roadmap

### Phase 1: Core Structure
1. Set up Create React App
2. Create basic component structure
3. Implement data models and custom hook
4. Add localStorage persistence

### Phase 2: Core Functionality
1. Implement add todo functionality
2. Add toggle completion feature
3. Implement delete todo
4. Add edit todo capability

### Phase 3: Filtering & UI Polish
1. Implement filter functionality
2. Add styling and responsive design
3. Implement micro-animations
4. Add accessibility features

### Phase 4: Testing & Refinement
1. Manual testing across devices
2. Accessibility testing
3. Performance optimization
4. Code cleanup and documentation

## 11. File Size Estimates

### Bundle Size (Production):
- React + ReactDOM: ~40KB gzipped
- Application code: ~10-15KB gzipped
- **Total estimated bundle**: ~50-55KB gzipped

### Rationale:
- Very lightweight due to minimal dependencies
- Most of the size comes from React itself
- Application code is minimal and efficient

## 12. Browser Support

### Target Browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Features Used:
- ES6+ JavaScript (supported by Create React App's Babel config)
- CSS Custom Properties
- CSS Grid and Flexbox
- localStorage API

### Rationale:
- Modern browsers only (no IE support needed)
- Standard web APIs that are well-supported
- Create React App handles most compatibility concerns

This architecture provides a solid foundation for a clean, maintainable, and performant todo application while keeping complexity minimal and focusing on core functionality.