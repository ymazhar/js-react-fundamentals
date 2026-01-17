/**
 * ChallengeSection Component Constants
 * Challenge examples for users to predict event loop behavior
 *
 * To add new challenges:
 * 1. Add a new challenge object to CHALLENGES array
 * 2. Ensure correctOutput matches exact console.log output order
 */

import { Challenge } from './ChallengeSection.types';

/** Section title and description */
export const SECTION_TITLE = '🧩 Challenge Mode';
export const SECTION_DESCRIPTION =
  'Test your understanding! Predict the console output before revealing the answer.';

/** localStorage key for persisting challenge progress */
export const STORAGE_KEY = 'eventloop-challenge-progress';

/** Button labels */
export const BUTTON_LABELS = {
  submit: 'Check Answer',
  showAnswer: 'Show Answer',
  tryAgain: 'Try Again',
  nextChallenge: 'Next Challenge',
  showHint: 'Show Hint',
  resetAll: 'Reset All Progress',
} as const;

/** Feedback messages */
export const FEEDBACK_MESSAGES = {
  correct: '🎉 Correct! You understand the event loop!',
  incorrect: '❌ Not quite. Review the explanation below.',
  placeholder: 'Enter your predicted output (e.g., "1, 2, 3" or each value on a new line)',
} as const;

/** Difficulty badge colors */
export const DIFFICULTY_CONFIG = {
  easy: { label: 'Easy', color: '#22c55e' },
  medium: { label: 'Medium', color: '#f97316' },
  hard: { label: 'Hard', color: '#ef4444' },
} as const;

/**
 * Challenge examples - ordered by difficulty
 */
export const CHALLENGES: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Basic setTimeout',
    difficulty: 'easy',
    code: `console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');`,
    correctOutput: ['A', 'C', 'B'],
    explanation:
      'Even with a 0ms delay, setTimeout callbacks are placed in the Task Queue and only execute after the Call Stack is empty. So "A" and "C" (synchronous) run first, then "B" (from task queue).',
    hints: [
      'setTimeout always goes to the Task Queue, regardless of delay',
      'Synchronous code always runs before any queued callbacks',
    ],
  },
  {
    id: 'challenge-2',
    title: 'Promise vs setTimeout',
    difficulty: 'easy',
    code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`,
    correctOutput: ['1', '4', '3', '2'],
    explanation:
      'Synchronous code (1, 4) runs first. Then, the Microtask Queue (Promise) is processed before the Task Queue (setTimeout). So "3" comes before "2".',
    hints: [
      'Microtasks (Promises) have priority over Macrotasks (setTimeout)',
      'All microtasks run before any macrotask',
    ],
  },
  {
    id: 'challenge-3',
    title: 'Nested Promises',
    difficulty: 'medium',
    code: `console.log('start');
Promise.resolve()
  .then(() => {
    console.log('promise 1');
    Promise.resolve().then(() => console.log('promise 2'));
  })
  .then(() => console.log('promise 3'));
console.log('end');`,
    correctOutput: ['start', 'end', 'promise 1', 'promise 2', 'promise 3'],
    explanation:
      'After sync code, "promise 1" runs and schedules "promise 2" as a new microtask. The nested microtask runs before "promise 3" because microtask queue is fully drained before continuing to the next .then() in the chain.',
    hints: [
      'Each .then() creates a new microtask when the previous one resolves',
      'Nested Promise.resolve().then() schedules immediately to microtask queue',
    ],
  },
  {
    id: 'challenge-4',
    title: 'setTimeout Chain',
    difficulty: 'medium',
    code: `setTimeout(() => console.log('timeout 1'), 0);
setTimeout(() => {
  console.log('timeout 2');
  Promise.resolve().then(() => console.log('promise inside'));
}, 0);
setTimeout(() => console.log('timeout 3'), 0);
console.log('sync');`,
    correctOutput: ['sync', 'timeout 1', 'timeout 2', 'promise inside', 'timeout 3'],
    explanation:
      'Sync runs first. Then timeouts execute in order (FIFO). But after "timeout 2", its Promise microtask runs before "timeout 3" because microtask queue is checked after each macrotask.',
    hints: [
      'Macrotasks execute one at a time',
      'After each macrotask, all microtasks are processed',
    ],
  },
  {
    id: 'challenge-5',
    title: 'Async/Await',
    difficulty: 'medium',
    code: `async function foo() {
  console.log('foo start');
  await Promise.resolve();
  console.log('foo end');
}
console.log('script start');
foo();
console.log('script end');`,
    correctOutput: ['script start', 'foo start', 'script end', 'foo end'],
    explanation:
      'async/await is syntactic sugar for Promises. "await" pauses the function and schedules the rest as a microtask. So "foo start" runs sync, then "script end", then "foo end" from microtask queue.',
    hints: ['Code before await runs synchronously', 'Code after await is scheduled as a microtask'],
  },
  {
    id: 'challenge-6',
    title: 'Multiple Queues',
    difficulty: 'hard',
    code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve()
  .then(() => {
    console.log('3');
    setTimeout(() => console.log('4'), 0);
  })
  .then(() => console.log('5'));
setTimeout(() => console.log('6'), 0);
console.log('7');`,
    correctOutput: ['1', '7', '3', '5', '2', '6', '4'],
    explanation:
      'Sync: 1, 7. Microtasks: 3 (schedules timeout "4"), then 5. Macrotasks in order: 2, 6, 4. Note that timeout "4" was scheduled last, so it runs last.',
    hints: [
      'Track the order things are added to each queue',
      'Microtasks scheduled during microtask processing run before any macrotask',
    ],
  },
  {
    id: 'challenge-7',
    title: 'Fetch Simulation',
    difficulty: 'hard',
    code: `console.log('start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve()
  .then(() => console.log('fetch response'))
  .then(() => {
    console.log('process data');
    return Promise.resolve();
  })
  .then(() => console.log('update UI'));
console.log('end');`,
    correctOutput: ['start', 'end', 'fetch response', 'process data', 'update UI', 'timeout'],
    explanation:
      'This simulates a fetch operation. All Promise chain (.then) callbacks are microtasks and run before the setTimeout macrotask. The chain executes in order: response → process → update.',
    hints: [
      'Promise chains execute their .then() callbacks in sequence',
      'All chained microtasks complete before any macrotask',
    ],
  },
];

/**
 * Get a challenge by ID
 */
export const getChallengeById = (id: string): Challenge | undefined => {
  return CHALLENGES.find(challenge => challenge.id === id);
};

/**
 * Normalize output for comparison (handles various input formats)
 */
export const normalizeOutput = (input: string): string[] => {
  // Handle comma-separated, newline-separated, or mixed
  return input
    .split(/[,\n]+/)
    .map(item => item.trim().replace(/^['"]|['"]$/g, '')) // Remove quotes
    .filter(item => item.length > 0);
};

/**
 * Check if user's prediction matches correct output
 */
export const checkAnswer = (userInput: string, correctOutput: string[]): boolean => {
  const normalized = normalizeOutput(userInput);
  if (normalized.length !== correctOutput.length) return false;
  return normalized.every(
    (item, index) => item.toLowerCase() === correctOutput[index].toLowerCase()
  );
};
