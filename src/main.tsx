/**
 * Main Entry Point
 * JavaScript Event Loop Visualizer
 *
 * This application provides an interactive visualization of how the
 * JavaScript event loop processes synchronous and asynchronous code.
 *
 * Key concepts demonstrated:
 * - Call Stack: Where synchronous code executes (LIFO)
 * - Task Queue: Where macrotasks (setTimeout callbacks) wait
 * - Microtask Queue: Where microtasks (Promise callbacks) wait
 * - Event Loop: Coordinates between call stack and queues
 *
 * The microtask queue has higher priority than the task queue,
 * which is why Promises execute before setTimeout even with 0 delay.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

// Global styles for the application
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #0f172a;
    color: #e2e8f0;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.5);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.5);
  }

  /* Selection color */
  ::selection {
    background: rgba(99, 102, 241, 0.3);
  }
`;

// Inject global styles
const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

// Mount the React application
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
