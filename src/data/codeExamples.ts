/**
 * Code Examples for Event Loop Visualization
 * Each example includes the code and a sequence of steps that demonstrate
 * how the JavaScript event loop processes the code
 */

import type { CodeExample } from '../types/eventLoop';

// Re-export CodeExample type for convenience
export type { CodeExample } from '../types/eventLoop';

/**
 * Example 1: Basic Synchronous Code
 * Demonstrates simple call stack operations
 */
const syncExample: CodeExample = {
  id: 'sync',
  name: 'Synchronous Code',
  description: 'Shows how synchronous code executes on the call stack',
  code: `console.log('First');
console.log('Second');
console.log('Third');`,
  steps: [
    {
      description: 'Push main() onto the call stack - script starts executing',
      action: 'push',
      target: 'callStack',
      item: { id: 'main-1', name: 'main()', type: 'sync', status: 'running' },
    },
    {
      description: 'Push console.log("First") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-1', name: 'console.log("First")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("First") - outputs "First"',
      action: 'log',
      logMessage: 'First',
    },
    {
      description: 'Pop console.log("First") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push console.log("Second") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-2', name: 'console.log("Second")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Second") - outputs "Second"',
      action: 'log',
      logMessage: 'Second',
    },
    {
      description: 'Pop console.log("Second") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push console.log("Third") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-3', name: 'console.log("Third")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Third") - outputs "Third"',
      action: 'log',
      logMessage: 'Third',
    },
    {
      description: 'Pop console.log("Third") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop main() - script execution complete',
      action: 'pop',
      target: 'callStack',
    },
  ],
};

/**
 * Example 2: setTimeout Demonstration
 * Shows how setTimeout callbacks are placed in the task queue
 */
const setTimeoutExample: CodeExample = {
  id: 'setTimeout',
  name: 'setTimeout',
  description: 'Demonstrates how setTimeout callbacks are handled via the task queue',
  code: `console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

console.log('End');`,
  steps: [
    {
      description: 'Push main() onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'main-2', name: 'main()', type: 'sync', status: 'running' },
    },
    {
      description: 'Push console.log("Start") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-start', name: 'console.log("Start")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Start")',
      action: 'log',
      logMessage: 'Start',
    },
    {
      description: 'Pop console.log("Start") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push setTimeout() onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'settimeout-1', name: 'setTimeout()', type: 'setTimeout', status: 'running' },
    },
    {
      description:
        'setTimeout registers callback with Web APIs, callback will be added to task queue after 0ms',
      action: 'enqueue-task',
      target: 'taskQueue',
      item: { id: 'timeout-cb', name: 'Timeout callback', type: 'setTimeout', status: 'pending' },
    },
    {
      description: 'Pop setTimeout() from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push console.log("End") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-end', name: 'console.log("End")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("End")',
      action: 'log',
      logMessage: 'End',
    },
    {
      description: 'Pop console.log("End") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop main() - synchronous code complete',
      action: 'pop',
      target: 'callStack',
    },
    {
      description:
        'Call stack is empty! Event loop checks task queue and moves callback to call stack',
      action: 'dequeue-task',
      target: 'callStack',
      item: {
        id: 'timeout-cb-exec',
        name: 'Timeout callback',
        type: 'setTimeout',
        status: 'running',
      },
    },
    {
      description: 'Push console.log("Timeout callback") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-timeout', name: 'console.log("Timeout")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Timeout callback")',
      action: 'log',
      logMessage: 'Timeout callback',
    },
    {
      description: 'Pop console.log("Timeout callback") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop timeout callback from the call stack',
      action: 'pop',
      target: 'callStack',
    },
  ],
};

/**
 * Example 3: Promises
 * Shows how Promise.then callbacks go to the microtask queue
 */
const promiseExample: CodeExample = {
  id: 'promise',
  name: 'Promises',
  description:
    'Shows how Promise callbacks are handled via the microtask queue (higher priority than task queue)',
  code: `console.log('Start');

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
  });

console.log('End');`,
  steps: [
    {
      description: 'Push main() onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'main-3', name: 'main()', type: 'sync', status: 'running' },
    },
    {
      description: 'Push console.log("Start") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-p-start', name: 'console.log("Start")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Start")',
      action: 'log',
      logMessage: 'Start',
    },
    {
      description: 'Pop console.log("Start") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push Promise.resolve().then() onto the call stack',
      action: 'push',
      target: 'callStack',
      item: {
        id: 'promise-1',
        name: 'Promise.resolve().then()',
        type: 'promise',
        status: 'running',
      },
    },
    {
      description: 'Promise is already resolved, .then() callback goes directly to microtask queue',
      action: 'enqueue-microtask',
      target: 'microtaskQueue',
      item: {
        id: 'promise-cb-1',
        name: 'Promise 1 callback',
        type: 'microtask',
        status: 'pending',
      },
    },
    {
      description: 'Pop Promise.resolve().then() from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push console.log("End") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-p-end', name: 'console.log("End")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("End")',
      action: 'log',
      logMessage: 'End',
    },
    {
      description: 'Pop console.log("End") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop main() - synchronous code complete',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Call stack empty! Event loop checks microtask queue FIRST (before task queue)',
      action: 'dequeue-microtask',
      target: 'callStack',
      item: {
        id: 'promise-cb-exec',
        name: 'Promise 1 callback',
        type: 'microtask',
        status: 'running',
      },
    },
    {
      description: 'Push console.log("Promise 1") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: {
        id: 'log-promise-1',
        name: 'console.log("Promise 1")',
        type: 'sync',
        status: 'running',
      },
    },
    {
      description: 'Execute console.log("Promise 1")',
      action: 'log',
      logMessage: 'Promise 1',
    },
    {
      description: 'Pop console.log("Promise 1") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop Promise 1 callback from the call stack',
      action: 'pop',
      target: 'callStack',
    },
  ],
};

/**
 * Example 4: Mixed - setTimeout vs Promise
 * Demonstrates that microtasks have priority over tasks
 */
const mixedExample: CodeExample = {
  id: 'mixed',
  name: 'setTimeout vs Promise',
  description:
    'Demonstrates that microtasks (Promises) have higher priority than macrotasks (setTimeout)',
  code: `console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise');
  });

console.log('End');`,
  steps: [
    {
      description: 'Push main() onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'main-4', name: 'main()', type: 'sync', status: 'running' },
    },
    {
      description: 'Push console.log("Start") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-m-start', name: 'console.log("Start")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Start")',
      action: 'log',
      logMessage: 'Start',
    },
    {
      description: 'Pop console.log("Start") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push setTimeout() onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'settimeout-m', name: 'setTimeout()', type: 'setTimeout', status: 'running' },
    },
    {
      description: 'setTimeout callback is registered and added to task queue',
      action: 'enqueue-task',
      target: 'taskQueue',
      item: { id: 'timeout-m-cb', name: 'Timeout callback', type: 'setTimeout', status: 'pending' },
    },
    {
      description: 'Pop setTimeout() from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push Promise.resolve().then() onto the call stack',
      action: 'push',
      target: 'callStack',
      item: {
        id: 'promise-m',
        name: 'Promise.resolve().then()',
        type: 'promise',
        status: 'running',
      },
    },
    {
      description: 'Promise callback goes to microtask queue',
      action: 'enqueue-microtask',
      target: 'microtaskQueue',
      item: { id: 'promise-m-cb', name: 'Promise callback', type: 'microtask', status: 'pending' },
    },
    {
      description: 'Pop Promise.resolve().then() from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push console.log("End") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-m-end', name: 'console.log("End")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("End")',
      action: 'log',
      logMessage: 'End',
    },
    {
      description: 'Pop console.log("End") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop main() - synchronous code complete. Note: Both queues have items!',
      action: 'pop',
      target: 'callStack',
    },
    {
      description:
        '⭐ IMPORTANT: Microtask queue is processed BEFORE task queue! Moving Promise callback to call stack',
      action: 'dequeue-microtask',
      target: 'callStack',
      item: {
        id: 'promise-m-exec',
        name: 'Promise callback',
        type: 'microtask',
        status: 'running',
      },
    },
    {
      description: 'Push console.log("Promise") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: {
        id: 'log-promise-m',
        name: 'console.log("Promise")',
        type: 'sync',
        status: 'running',
      },
    },
    {
      description: 'Execute console.log("Promise")',
      action: 'log',
      logMessage: 'Promise',
    },
    {
      description: 'Pop console.log("Promise") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop Promise callback from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description:
        'Microtask queue is empty. Now check task queue - move Timeout callback to call stack',
      action: 'dequeue-task',
      target: 'callStack',
      item: {
        id: 'timeout-m-exec',
        name: 'Timeout callback',
        type: 'setTimeout',
        status: 'running',
      },
    },
    {
      description: 'Push console.log("Timeout") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: {
        id: 'log-timeout-m',
        name: 'console.log("Timeout")',
        type: 'sync',
        status: 'running',
      },
    },
    {
      description: 'Execute console.log("Timeout")',
      action: 'log',
      logMessage: 'Timeout',
    },
    {
      description: 'Pop console.log("Timeout") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop Timeout callback - all execution complete!',
      action: 'pop',
      target: 'callStack',
    },
  ],
};

/**
 * Example 5: Nested Promises
 * Shows chained promises and microtask queue behavior
 */
const nestedPromiseExample: CodeExample = {
  id: 'nested-promise',
  name: 'Nested Promises',
  description: 'Shows how chained promises add multiple items to the microtask queue',
  code: `console.log('Start');

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    return Promise.resolve();
  })
  .then(() => {
    console.log('Promise 2');
  });

console.log('End');`,
  steps: [
    {
      description: 'Push main() onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'main-5', name: 'main()', type: 'sync', status: 'running' },
    },
    {
      description: 'Push console.log("Start") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-n-start', name: 'console.log("Start")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Start")',
      action: 'log',
      logMessage: 'Start',
    },
    {
      description: 'Pop console.log("Start")',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push Promise chain setup onto the call stack',
      action: 'push',
      target: 'callStack',
      item: {
        id: 'promise-chain',
        name: 'Promise.resolve().then().then()',
        type: 'promise',
        status: 'running',
      },
    },
    {
      description: 'First .then() callback added to microtask queue',
      action: 'enqueue-microtask',
      target: 'microtaskQueue',
      item: { id: 'promise-1-cb', name: 'Promise 1 then', type: 'microtask', status: 'pending' },
    },
    {
      description: 'Pop Promise chain setup',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push console.log("End") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-n-end', name: 'console.log("End")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("End")',
      action: 'log',
      logMessage: 'End',
    },
    {
      description: 'Pop console.log("End")',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop main() - synchronous code complete',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Process microtask queue - move Promise 1 callback to call stack',
      action: 'dequeue-microtask',
      target: 'callStack',
      item: { id: 'promise-1-exec', name: 'Promise 1 then', type: 'microtask', status: 'running' },
    },
    {
      description: 'Push console.log("Promise 1") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-p1', name: 'console.log("Promise 1")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Promise 1")',
      action: 'log',
      logMessage: 'Promise 1',
    },
    {
      description: 'Pop console.log("Promise 1")',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'return Promise.resolve() - schedules next .then() callback to microtask queue',
      action: 'enqueue-microtask',
      target: 'microtaskQueue',
      item: { id: 'promise-2-cb', name: 'Promise 2 then', type: 'microtask', status: 'pending' },
    },
    {
      description: 'Pop Promise 1 then callback',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Process microtask queue - move Promise 2 callback to call stack',
      action: 'dequeue-microtask',
      target: 'callStack',
      item: { id: 'promise-2-exec', name: 'Promise 2 then', type: 'microtask', status: 'running' },
    },
    {
      description: 'Push console.log("Promise 2") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-p2', name: 'console.log("Promise 2")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Promise 2")',
      action: 'log',
      logMessage: 'Promise 2',
    },
    {
      description: 'Pop console.log("Promise 2")',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop Promise 2 then callback - all execution complete!',
      action: 'pop',
      target: 'callStack',
    },
  ],
};

/**
 * Example 6: Basic Fetch API
 * Demonstrates how fetch works with Promises and the event loop
 */
const fetchExample: CodeExample = {
  id: 'fetch',
  name: 'Fetch API',
  description: 'Shows how fetch() returns a Promise and interacts with the event loop',
  code: `console.log('Start');

fetch('/api/data')
  .then(response => {
    console.log('Got response');
    return response.json();
  })
  .then(data => {
    console.log('Got data');
  });

console.log('End');`,
  steps: [
    {
      description: 'Push main() onto the call stack - script starts executing',
      action: 'push',
      target: 'callStack',
      item: { id: 'main-1', name: 'main()', type: 'sync', status: 'running' },
    },
    {
      description: 'Push console.log("Start") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-start', name: 'console.log("Start")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Start") - outputs "Start"',
      action: 'log',
      logMessage: 'Start',
    },
    {
      description: 'Pop console.log("Start") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push fetch("/api/data") onto the call stack - initiates network request',
      action: 'push',
      target: 'callStack',
      item: { id: 'fetch-1', name: 'fetch("/api/data")', type: 'promise', status: 'running' },
    },
    {
      description:
        'fetch() returns a Promise immediately and hands off network request to Web APIs',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push console.log("End") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-end', name: 'console.log("End")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("End") - outputs "End"',
      action: 'log',
      logMessage: 'End',
    },
    {
      description: 'Pop console.log("End") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop main() - synchronous code complete. Event loop checks queues.',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: '⏳ Network request completes - response callback added to microtask queue',
      action: 'enqueue-microtask',
      target: 'microtaskQueue',
      item: {
        id: 'fetch-then-1',
        name: '.then(response => ...)',
        type: 'microtask',
        status: 'pending',
      },
    },
    {
      description: 'Event loop moves first .then() callback to call stack',
      action: 'dequeue-microtask',
      target: 'callStack',
      item: {
        id: 'fetch-then-1-exec',
        name: '.then(response => ...)',
        type: 'microtask',
        status: 'running',
      },
    },
    {
      description: 'Push console.log("Got response") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: {
        id: 'log-response',
        name: 'console.log("Got response")',
        type: 'sync',
        status: 'running',
      },
    },
    {
      description: 'Execute console.log("Got response")',
      action: 'log',
      logMessage: 'Got response',
    },
    {
      description: 'Pop console.log("Got response")',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'response.json() returns a Promise - schedules next .then() when JSON is parsed',
      action: 'enqueue-microtask',
      target: 'microtaskQueue',
      item: {
        id: 'fetch-then-2',
        name: '.then(data => ...)',
        type: 'microtask',
        status: 'pending',
      },
    },
    {
      description: 'Pop first .then() callback',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Event loop moves second .then() callback to call stack',
      action: 'dequeue-microtask',
      target: 'callStack',
      item: {
        id: 'fetch-then-2-exec',
        name: '.then(data => ...)',
        type: 'microtask',
        status: 'running',
      },
    },
    {
      description: 'Push console.log("Got data") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-data', name: 'console.log("Got data")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Got data")',
      action: 'log',
      logMessage: 'Got data',
    },
    {
      description: 'Pop console.log("Got data")',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop second .then() callback - fetch complete!',
      action: 'pop',
      target: 'callStack',
    },
  ],
};

/**
 * Example 7: Fetch with setTimeout Race
 * Demonstrates the interaction between fetch (microtasks) and setTimeout (macrotasks)
 */
const fetchVsTimeoutExample: CodeExample = {
  id: 'fetch-vs-timeout',
  name: 'Fetch vs setTimeout',
  description: 'Shows how fetch Promise callbacks (microtasks) run before setTimeout (macrotasks)',
  code: `console.log('Start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

fetch('/api/data')
  .then(() => {
    console.log('fetch then');
  });

Promise.resolve()
  .then(() => {
    console.log('Promise then');
  });

console.log('End');`,
  steps: [
    {
      description: 'Push main() onto the call stack - script starts executing',
      action: 'push',
      target: 'callStack',
      item: { id: 'main-1', name: 'main()', type: 'sync', status: 'running' },
    },
    {
      description: 'Push console.log("Start") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-start', name: 'console.log("Start")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("Start") - outputs "Start"',
      action: 'log',
      logMessage: 'Start',
    },
    {
      description: 'Pop console.log("Start") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push setTimeout onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'timeout-1', name: 'setTimeout(..., 0)', type: 'setTimeout', status: 'running' },
    },
    {
      description: 'setTimeout registers callback with Web APIs, schedules for task queue',
      action: 'enqueue-task',
      target: 'taskQueue',
      item: {
        id: 'timeout-cb',
        name: 'setTimeout callback',
        type: 'setTimeout',
        status: 'pending',
      },
    },
    {
      description: 'Pop setTimeout from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push fetch("/api/data") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'fetch-1', name: 'fetch("/api/data")', type: 'promise', status: 'running' },
    },
    {
      description: 'fetch() returns a Promise and initiates network request via Web APIs',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push Promise.resolve() onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'promise-1', name: 'Promise.resolve()', type: 'promise', status: 'running' },
    },
    {
      description: 'Promise.resolve() is already resolved - schedule .then() as microtask',
      action: 'enqueue-microtask',
      target: 'microtaskQueue',
      item: { id: 'promise-then', name: 'Promise .then()', type: 'microtask', status: 'pending' },
    },
    {
      description: 'Pop Promise.resolve() from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Push console.log("End") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-end', name: 'console.log("End")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("End") - outputs "End"',
      action: 'log',
      logMessage: 'End',
    },
    {
      description: 'Pop console.log("End") from the call stack',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop main() - synchronous code complete',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: '⏳ fetch completes - add callback to microtask queue',
      action: 'enqueue-microtask',
      target: 'microtaskQueue',
      item: { id: 'fetch-then', name: 'fetch .then()', type: 'microtask', status: 'pending' },
    },
    {
      description:
        '🔄 Event loop: Process ALL microtasks before any macrotasks. Move Promise.then() to call stack',
      action: 'dequeue-microtask',
      target: 'callStack',
      item: {
        id: 'promise-then-exec',
        name: 'Promise .then()',
        type: 'microtask',
        status: 'running',
      },
    },
    {
      description: 'Push console.log("Promise then") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: {
        id: 'log-promise',
        name: 'console.log("Promise then")',
        type: 'sync',
        status: 'running',
      },
    },
    {
      description: 'Execute console.log("Promise then")',
      action: 'log',
      logMessage: 'Promise then',
    },
    {
      description: 'Pop console.log("Promise then")',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop Promise .then() callback',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Still have microtasks! Move fetch .then() to call stack',
      action: 'dequeue-microtask',
      target: 'callStack',
      item: { id: 'fetch-then-exec', name: 'fetch .then()', type: 'microtask', status: 'running' },
    },
    {
      description: 'Push console.log("fetch then") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: { id: 'log-fetch', name: 'console.log("fetch then")', type: 'sync', status: 'running' },
    },
    {
      description: 'Execute console.log("fetch then")',
      action: 'log',
      logMessage: 'fetch then',
    },
    {
      description: 'Pop console.log("fetch then")',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop fetch .then() callback',
      action: 'pop',
      target: 'callStack',
    },
    {
      description:
        '🔄 Microtask queue empty! Now process task queue. Move setTimeout callback to call stack',
      action: 'dequeue-task',
      target: 'callStack',
      item: {
        id: 'timeout-cb-exec',
        name: 'setTimeout callback',
        type: 'setTimeout',
        status: 'running',
      },
    },
    {
      description: 'Push console.log("setTimeout") onto the call stack',
      action: 'push',
      target: 'callStack',
      item: {
        id: 'log-timeout',
        name: 'console.log("setTimeout")',
        type: 'sync',
        status: 'running',
      },
    },
    {
      description: 'Execute console.log("setTimeout")',
      action: 'log',
      logMessage: 'setTimeout',
    },
    {
      description: 'Pop console.log("setTimeout")',
      action: 'pop',
      target: 'callStack',
    },
    {
      description: 'Pop setTimeout callback - all execution complete!',
      action: 'pop',
      target: 'callStack',
    },
  ],
};

// Export all examples
export const codeExamples: CodeExample[] = [
  syncExample,
  setTimeoutExample,
  promiseExample,
  mixedExample,
  nestedPromiseExample,
  fetchExample,
  fetchVsTimeoutExample,
];

export const getExampleById = (id: string): CodeExample | undefined => {
  return codeExamples.find(example => example.id === id);
};
