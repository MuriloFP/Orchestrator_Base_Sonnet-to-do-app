# Minimalistic Todo App

A clean, modern task-tracking web application built with React and Node.js. Features a beautiful, responsive design with smooth animations and persistent data storage.

![Todo App Screenshot](https://via.placeholder.com/800x600/667eea/ffffff?text=Todo+App+Screenshot)

## ✨ Features

- **Clean & Minimalistic Design**: Beautiful gradient backgrounds with modern typography
- **Full CRUD Operations**: Add, edit, complete, and delete todos
- **Smart Filtering**: View all, active, or completed tasks
- **Data Persistence**: Your todos are saved between browser sessions
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Accessibility First**: Full keyboard navigation and screen reader support
- **Modern React**: Built with React 18 hooks and functional components

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ and npm installed on your machine

### Installation

1. **Clone or download this project**
   ```bash
   cd to-do-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app

## 🎯 Usage

### Adding Todos
- Type your task in the input field
- Press Enter or click the "Add" button
- Your todo appears at the top of the list

### Managing Todos
- **Complete**: Click the checkbox to mark as done
- **Edit**: Double-click on any todo text to edit inline
- **Delete**: Hover over a todo and click the delete button

### Filtering
- **All**: Shows all todos (default)
- **Active**: Shows only incomplete todos
- **Completed**: Shows only completed todos
- **Clear Completed**: Remove all completed todos at once

### Keyboard Shortcuts
- `Enter`: Add new todo or save edit
- `Escape`: Cancel editing
- `Tab`: Navigate between elements
- `Space`: Toggle todo completion
- `Delete/Backspace`: Delete focused todo

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── TodoApp.js      # Main app container
│   ├── TodoForm.js     # Add/edit form
│   ├── FilterBar.js    # Filter controls
│   ├── TodoList.js     # List container
│   └── TodoItem.js     # Individual todo item
├── hooks/
│   └── useTodos.js     # Custom hook for state management
├── utils/
│   └── storage.js      # localStorage utilities
└── styles/             # CSS modules
    ├── index.css       # Global styles & variables
    ├── TodoApp.css     # App container styles
    ├── TodoForm.css    # Form styling
    ├── FilterBar.css   # Filter controls
    ├── TodoList.css    # List styling
    └── TodoItem.css    # Item styling
```

### Key Technologies
- **React 18**: Modern hooks-based architecture
- **CSS Custom Properties**: Consistent theming system
- **localStorage**: Client-side data persistence
- **Semantic HTML**: Accessible markup structure

### Design Principles
- **Mobile-First**: Responsive design starting from 320px
- **Performance**: <60KB bundle size, <100ms interactions
- **Accessibility**: WCAG 2.1 AA compliant
- **Modern CSS**: Flexbox, Grid, and CSS animations

## 🎨 Customization

### Color Scheme
Edit CSS custom properties in `src/styles/index.css`:

```css
:root {
  --color-primary: #007bff;        /* Main accent color */
  --color-success: #28a745;        /* Completion color */
  --color-danger: #dc3545;         /* Delete/error color */
  --color-text-primary: #212529;   /* Main text */
  --color-background: #ffffff;     /* Background */
}
```

### Animations
Modify transition speeds in `src/styles/index.css`:

```css
:root {
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- Semantic HTML for accessibility
- CSS custom properties for maintainability

## 📦 Build & Deploy

### Production Build
```bash
npm run build
```

Creates an optimized build in the `build/` folder ready for deployment.

### Deployment Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use `gh-pages` package
- **Any static hosting**: Upload the `build` folder contents

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by modern todo applications
- Icons from Feather Icons
- Gradient backgrounds inspired by UI Gradients
- Accessibility guidelines from WCAG 2.1

---

**Made with ❤️ and React**

*A clean, minimalistic approach to task management that focuses on what matters most - getting things done.*