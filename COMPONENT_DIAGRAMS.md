# Component Architecture Diagrams

## Component Hierarchy and Data Flow

```mermaid
graph TD
    A[TodoApp] --> B[TodoForm]
    A --> C[FilterBar]
    A --> D[TodoList]
    D --> E[TodoItem]
    D --> F[TodoItem]
    D --> G[TodoItem]
    
    H[useTodos Hook] --> A
    I[localStorage] --> H
    H --> I
    
    style A fill:#e1f5fe
    style H fill:#f3e5f5
    style I fill:#fff3e0
```

## Data Flow Architecture

```mermaid
graph LR
    A[User Action] --> B[Component Event Handler]
    B --> C[useTodos Hook Function]
    C --> D[State Update]
    D --> E[localStorage Sync]
    D --> F[Component Re-render]
    F --> G[UI Update]
    
    style A fill:#e8f5e8
    style C fill:#f3e5f5
    style E fill:#fff3e0
    style G fill:#e1f5fe
```

## Component Props and State Flow

```mermaid
graph TD
    subgraph "TodoApp Component"
        A[useTodos Hook]
        A --> B[todos, filter, editingId]
        A --> C[addTodo, updateTodo, deleteTodo, toggleTodo]
        A --> D[setFilter, setEditingId]
    end
    
    subgraph "TodoForm Component"
        E[Props: addTodo, updateTodo, editingId, setEditingId]
        F[Local State: inputValue]
    end
    
    subgraph "FilterBar Component"
        G[Props: filter, setFilter, todos]
        H[Computed: activeCount, completedCount]
    end
    
    subgraph "TodoList Component"
        I[Props: todos, toggleTodo, deleteTodo, setEditingId]
    end
    
    subgraph "TodoItem Component"
        J[Props: todo, toggleTodo, deleteTodo, setEditingId]
        K[Local State: isEditing]
    end
    
    B --> E
    C --> E
    D --> E
    
    B --> G
    D --> G
    
    B --> I
    C --> I
    D --> I
    
    I --> J
    
    style A fill:#f3e5f5
    style F fill:#fff3e0
    style H fill:#fff3e0
    style K fill:#fff3e0
```

## State Management Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant H as useTodos Hook
    participant S as React State
    participant L as localStorage
    
    U->>C: Interacts (click, type, etc.)
    C->>H: Calls hook function
    H->>S: Updates React state
    S->>H: Triggers useEffect
    H->>L: Saves to localStorage
    S->>C: Triggers re-render
    C->>U: Updates UI
```

## Component Lifecycle and Persistence

```mermaid
graph TD
    A[App Mount] --> B[useTodos Hook Init]
    B --> C[Load from localStorage]
    C --> D[Set Initial State]
    D --> E[Render Components]
    
    F[User Action] --> G[State Update]
    G --> H[useEffect Triggered]
    H --> I[Save to localStorage]
    G --> J[Component Re-render]
    
    K[App Unmount] --> L[Cleanup]
    
    style A fill:#e8f5e8
    style C fill:#fff3e0
    style I fill:#fff3e0
    style L fill:#ffebee
```

## Filter Logic Flow

```mermaid
graph TD
    A[All Todos] --> B{Current Filter}
    B -->|"all"| C[Return All Todos]
    B -->|"active"| D[Filter: !completed]
    B -->|"completed"| E[Filter: completed]
    
    C --> F[Display in TodoList]
    D --> F
    E --> F
    
    G[Filter Button Click] --> H[setFilter]
    H --> I[Hook Re-computes Filtered Todos]
    I --> F
    
    style B fill:#f3e5f5
    style F fill:#e1f5fe
```

## Animation Trigger Points

```mermaid
graph TD
    A[Todo Added] --> B[Slide-in Animation]
    C[Todo Completed] --> D[Checkbox + Strikethrough Animation]
    E[Todo Deleted] --> F[Slide-out Animation]
    G[Filter Changed] --> H[Fade Transition]
    I[Hover State] --> J[Scale + Shadow Animation]
    
    style B fill:#e8f5e8
    style D fill:#e8f5e8
    style F fill:#ffebee
    style H fill:#e1f5fe
    style J fill:#fff3e0
```

## Accessibility Flow

```mermaid
graph TD
    A[Keyboard Navigation] --> B[Tab Order]
    B --> C[TodoForm Input]
    C --> D[Filter Buttons]
    D --> E[Todo Items]
    E --> F[Todo Actions]
    
    G[Screen Reader] --> H[ARIA Labels]
    H --> I[Live Regions]
    I --> J[Status Updates]
    
    K[Focus Management] --> L[Visual Indicators]
    L --> M[High Contrast]
    
    style A fill:#f3e5f5
    style G fill:#f3e5f5
    style K fill:#f3e5f5
```

## Error Handling Flow

```mermaid
graph TD
    A[localStorage Operation] --> B{Success?}
    B -->|Yes| C[Continue Normal Flow]
    B -->|No| D[Log Error]
    D --> E[Fallback to Memory State]
    E --> F[Show User Warning]
    
    G[Invalid Todo Data] --> H[Validate Input]
    H --> I{Valid?}
    I -->|Yes| J[Process Todo]
    I -->|No| K[Show Error Message]
    
    style D fill:#ffebee
    style E fill:#fff3e0
    style F fill:#ffebee
    style K fill:#ffebee
```

## Performance Considerations

```mermaid
graph TD
    A[Component Renders] --> B{Todos Changed?}
    B -->|Yes| C[Re-compute Filtered Todos]
    B -->|No| D[Use Memoized Result]
    
    C --> E[Update localStorage]
    D --> F[Skip localStorage Update]
    
    G[Large Todo List] --> H[Consider Virtualization]
    H --> I[Implement if > 1000 items]
    
    style C fill:#fff3e0
    style D fill:#e8f5e8
    style E fill:#fff3e0
    style F fill:#e8f5e8
```

## Component Communication Patterns

```mermaid
graph TD
    subgraph "Parent to Child"
        A[TodoApp] -->|Props| B[TodoForm]
        A -->|Props| C[FilterBar]
        A -->|Props| D[TodoList]
        D -->|Props| E[TodoItem]
    end
    
    subgraph "Child to Parent"
        F[TodoForm] -->|Callback| A
        G[FilterBar] -->|Callback| A
        H[TodoItem] -->|Callback| A
    end
    
    subgraph "Shared State"
        I[useTodos Hook] -.->|Provides| A
        I -.->|Manages| J[Global State]
    end
    
    style I fill:#f3e5f5
    style J fill:#f3e5f5
```

This diagram collection provides a comprehensive visual guide to understanding the component architecture, data flow, and interaction patterns in the todo application.