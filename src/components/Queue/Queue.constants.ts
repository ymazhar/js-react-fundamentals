/**
 * Queue Component Constants
 * Static values and configuration for the Queue component
 */

import { Variants } from 'framer-motion';
import { QueueType, QueueConfig } from './Queue.types';

/**
 * Configuration for each queue type
 */
export const QUEUE_CONFIG: Record<QueueType, QueueConfig> = {
  callStack: {
    title: 'Call Stack',
    emptyMessage: 'Stack is empty',
    badge: 'LIFO',
    badgeType: 'info',
    isStack: true,
    description: 'Last In, First Out',
  },
  taskQueue: {
    title: 'Task Queue',
    emptyMessage: 'No pending tasks',
    badge: 'Macrotasks',
    badgeType: 'warning',
    isStack: false,
    description: 'setTimeout, setInterval, I/O',
  },
  microtaskQueue: {
    title: 'Microtask Queue',
    emptyMessage: 'No pending microtasks',
    badge: 'Priority',
    badgeType: 'success',
    isStack: false,
    description: 'Promises, queueMicrotask',
  },
} as const;

/**
 * Framer Motion animation variants for queue items
 */
export const ANIMATION_VARIANTS: Record<string, Variants> = {
  item: {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: -20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: 100,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  },
};
