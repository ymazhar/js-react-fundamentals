# JavaScript Event Loop Visualizer

An interactive React application that visually explains how the JavaScript event loop works. Watch in real-time how function calls move between the call stack, task queue, and microtask queue.

[![CI](https://github.com/ymazhar/js-react-fundamentals/actions/workflows/ci.yml/badge.svg)](https://github.com/ymazhar/js-react-fundamentals/actions/workflows/ci.yml)
[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://ymazhar.github.io/js-react-fundamentals/)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)

## 🎯 Features

- **Animated Visualization** of the call stack, task queue (macrotasks), and microtask queue
- **Interactive Code Examples** demonstrating:
  - Synchronous code execution
  - `setTimeout` and the task queue
  - Promises and the microtask queue
  - Priority differences between tasks and microtasks
  - Nested promise chains
- **Playback Controls**: Play, pause, step through, and reset animations
- **Adjustable Speed**: Control animation speed with a slider
- **Console Output**: See simulated `console.log` output in real-time
- **Event Loop Diagram**: Visual representation of how the event loop works
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Modern, clean UI with a dark color scheme

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fundamentals

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📜 Available Scripts

| Script                 | Description                            |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Start development server               |
| `npm run build`        | Build for production                   |
| `npm run preview`      | Preview production build               |
| `npm run lint`         | Run ESLint                             |
| `npm run lint:fix`     | Fix ESLint errors automatically        |
| `npm run format`       | Format code with Prettier              |
| `npm run format:check` | Check code formatting                  |
| `npm run type-check`   | Run TypeScript type checking           |
| `npm run validate`     | Run all checks (types + lint + format) |

## 🏗️ Project Structure

```
src/
├── App.tsx                        # Main application component
├── App.module.scss                # App-level styles
├── main.tsx                       # Entry point
├── types/
│   └── eventLoop.ts               # TypeScript interfaces
├── data/
│   └── codeExamples.ts            # Code examples with execution steps
├── hooks/
│   └── useEventLoop.ts            # State management hook
├── styles/
│   ├── _variables.scss            # SCSS variables and mixins
│   └── StyledComponents.ts        # Legacy styled-components (being migrated)
└── components/
    ├── index.ts                   # Barrel export for all components
    ├── CodeEditor/
    │   ├── index.ts               # Barrel export
    │   ├── CodeEditor.tsx         # Main component
    │   ├── CodeEditor.types.ts    # TypeScript interfaces
    │   ├── CodeEditor.constants.ts # Static values
    │   └── CodeEditor.module.scss # Scoped styles
    ├── Console/
    │   ├── index.ts
    │   ├── Console.tsx
    │   ├── Console.types.ts
    │   ├── Console.constants.ts
    │   └── Console.module.scss
    ├── Controls/
    │   ├── index.ts
    │   ├── Controls.tsx
    │   ├── Controls.types.ts
    │   ├── Controls.constants.ts
    │   └── Controls.module.scss
    ├── EventLoopDiagram/
    │   ├── index.ts
    │   ├── EventLoopDiagram.tsx
    │   ├── EventLoopDiagram.types.ts
    │   ├── EventLoopDiagram.constants.ts
    │   └── EventLoopDiagram.module.scss
    ├── ExampleSelector/
    │   ├── index.ts
    │   ├── ExampleSelector.tsx
    │   ├── ExampleSelector.types.ts
    │   ├── ExampleSelector.constants.ts
    │   └── ExampleSelector.module.scss
    ├── Queue/
    │   ├── index.ts
    │   ├── Queue.tsx
    │   ├── Queue.types.ts
    │   ├── Queue.constants.ts
    │   └── Queue.module.scss
    └── StepDescription/
        ├── index.ts
        ├── StepDescription.tsx
        ├── StepDescription.types.ts
        ├── StepDescription.constants.ts
        └── StepDescription.module.scss
```

### Component Folder Convention

Each component follows a consistent structure:

| File                     | Purpose                                     |
| ------------------------ | ------------------------------------------- |
| `Component.tsx`          | Main React component implementation         |
| `Component.types.ts`     | TypeScript interfaces and types             |
| `Component.constants.ts` | Static values, configuration, magic strings |
| `Component.module.scss`  | Scoped SCSS styles                          |
| `index.ts`               | Barrel export for clean imports             |

## 🧠 Understanding the Event Loop

The JavaScript event loop is the mechanism that handles asynchronous operations. This visualizer helps you understand:

### Call Stack (LIFO)

- Where synchronous code executes
- Functions are pushed when called and popped when they return

### Task Queue (Macrotasks)

- Holds callbacks from `setTimeout`, `setInterval`, I/O operations
- Processed one at a time when the call stack is empty

### Microtask Queue

- Holds Promise callbacks (`.then()`, `.catch()`, `.finally()`)
- **Higher priority** than the task queue
- All microtasks are processed before the next macrotask

### Key Insight

```javascript
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('End');

// Output: Start, End, Promise, Timeout
// Promise executes before Timeout despite both being async!
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Styled Components** - CSS-in-JS styling
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

## 🎨 Code Quality

This project uses:

- **ESLint** with TypeScript and React plugins
- **Prettier** for consistent code formatting
- **Pre-commit hooks** via Husky to ensure code quality

Run all checks with:

```bash
npm run validate
```

## 📝 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ to help developers understand JavaScript's event loop
