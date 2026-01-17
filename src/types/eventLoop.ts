/**
 * Types for the Event Loop Visualizer
 * Defines the structure of execution items and application state
 */

// Represents an item that can be in the call stack, task queue, or microtask queue
export interface ExecutionItem {
  id: string; // Unique identifier for animation tracking
  name: string; // Display name of the function/task
  type: 'sync' | 'setTimeout' | 'promise' | 'microtask'; // Type of execution
  status: 'pending' | 'running' | 'completed'; // Current status
  sourceCode?: string; // Optional source code snippet
}

// Represents the current state of the event loop visualization
export interface EventLoopState {
  callStack: ExecutionItem[]; // LIFO structure - main execution context
  taskQueue: ExecutionItem[]; // FIFO - setTimeout, setInterval callbacks
  microtaskQueue: ExecutionItem[]; // FIFO - Promise callbacks, queueMicrotask
  consoleOutput: string[]; // Simulated console.log output
  currentStep: number; // Current step in the animation
  isPlaying: boolean; // Whether animation is playing
  speed: number; // Animation speed (ms per step)
}

// Represents a step in the execution sequence
export interface ExecutionStep {
  description: string; // Human-readable description of what happens
  action:
    | 'push'
    | 'pop'
    | 'enqueue-task'
    | 'enqueue-microtask'
    | 'dequeue-task'
    | 'dequeue-microtask'
    | 'log';
  target?: 'callStack' | 'taskQueue' | 'microtaskQueue';
  item?: ExecutionItem;
  logMessage?: string;
}

// Predefined code examples for users to explore
export interface CodeExample {
  id: string;
  name: string;
  description: string;
  code: string;
  steps: ExecutionStep[];
}

// Animation state for smooth transitions
export interface AnimationState {
  isAnimating: boolean;
  fromQueue: 'callStack' | 'taskQueue' | 'microtaskQueue' | null;
  toQueue: 'callStack' | 'taskQueue' | 'microtaskQueue' | null;
  itemId: string | null;
}
