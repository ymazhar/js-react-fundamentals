/**
 * ReferencesSection Component Constants
 * Curated list of resources for learning about the JavaScript event loop
 *
 * To add new resources:
 * 1. Find the appropriate category in RESOURCE_CATEGORIES
 * 2. Add a new resource object with id, title, description, url, and optional author/duration
 */

import { ResourceCategoryData } from './ReferencesSection.types';

/** Section title */
export const SECTION_TITLE = '📚 References & Resources';

/** Section description */
export const SECTION_DESCRIPTION =
  'Dive deeper into the JavaScript event loop with these curated resources.';

/**
 * Curated list of resources organized by category
 * Easy to update - just add new entries to the resources array
 */
export const RESOURCE_CATEGORIES: ResourceCategoryData[] = [
  {
    id: 'documentation',
    title: 'Official Documentation',
    icon: '📖',
    resources: [
      {
        id: 'mdn-event-loop',
        title: 'MDN: Event Loop',
        description:
          'Comprehensive documentation on the event loop, including the runtime model and how JavaScript handles concurrency.',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
        author: 'MDN Web Docs',
      },
      {
        id: 'mdn-microtasks',
        title: 'MDN: Microtasks Guide',
        description:
          'In-depth guide on microtasks, including when and why to use queueMicrotask().',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide',
        author: 'MDN Web Docs',
      },
      {
        id: 'html-spec-event-loop',
        title: 'HTML Living Standard: Event Loops',
        description:
          'The official HTML specification for event loops - the authoritative source for how browsers implement the event loop.',
        url: 'https://html.spec.whatwg.org/multipage/webappapis.html#event-loops',
        author: 'WHATWG',
      },
      {
        id: 'nodejs-event-loop',
        title: 'Node.js Event Loop Documentation',
        description:
          "Official Node.js guide explaining the event loop, timers, and process.nextTick() in Node.js's implementation.",
        url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick',
        author: 'Node.js',
      },
    ],
  },
  {
    id: 'articles',
    title: 'Articles & Blog Posts',
    icon: '📝',
    resources: [
      {
        id: 'jake-archibald-tasks',
        title: 'Tasks, Microtasks, Queues and Schedules',
        description:
          'An excellent interactive article by Jake Archibald that visually explains the difference between tasks and microtasks.',
        url: 'https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/',
        author: 'Jake Archibald',
        duration: '15 min read',
      },
      {
        id: 'javascript-info-event-loop',
        title: 'JavaScript.info: Event Loop',
        description:
          'Clear and beginner-friendly explanation of the event loop with practical examples and exercises.',
        url: 'https://javascript.info/event-loop',
        author: 'JavaScript.info',
        duration: '20 min read',
      },
      {
        id: 'lydia-hallie-event-loop',
        title: 'JavaScript Visualized: Event Loop',
        description:
          'A visual guide to understanding the event loop with animated GIFs that make complex concepts easy to grasp.',
        url: 'https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif',
        author: 'Lydia Hallie',
        duration: '10 min read',
      },
      {
        id: 'builder-io-visual-guide',
        title: 'A Visual Guide to the Event Loop',
        description:
          'Another great visual explanation with interactive diagrams showing how the call stack and queues work together.',
        url: 'https://www.builder.io/blog/visual-guide-to-the-javascript-event-loop',
        author: 'Builder.io',
        duration: '12 min read',
      },
    ],
  },
  {
    id: 'videos',
    title: 'Video Tutorials',
    icon: '🎥',
    resources: [
      {
        id: 'philip-roberts-talk',
        title: 'What the heck is the event loop anyway?',
        description:
          'The classic JSConf talk by Philip Roberts that made the event loop accessible to everyone. A must-watch!',
        url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ',
        author: 'Philip Roberts',
        duration: '26 min',
      },
      {
        id: 'jake-archibald-talk',
        title: 'In The Loop - JSConf.Asia',
        description:
          'Jake Archibald dives deep into the event loop, requestAnimationFrame, and rendering in this fantastic talk.',
        url: 'https://www.youtube.com/watch?v=cCOL7MC4Pl0',
        author: 'Jake Archibald',
        duration: '35 min',
      },
      {
        id: 'fireship-event-loop',
        title: 'The JavaScript Event Loop Explained',
        description:
          "A quick and visual explanation of the event loop in Fireship's signature fast-paced style.",
        url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ',
        author: 'Fireship',
        duration: '5 min',
      },
      {
        id: 'akshay-saini-event-loop',
        title: 'Namaste JavaScript - Event Loop',
        description:
          'In-depth Hindi/English tutorial covering the event loop, microtasks, and how browsers handle async code.',
        url: 'https://www.youtube.com/watch?v=8zKuNo4ay8E',
        author: 'Akshay Saini',
        duration: '40 min',
      },
    ],
  },
];

/**
 * External link icon SVG path (for accessibility)
 */
export const EXTERNAL_LINK_LABEL = 'Opens in new tab';
