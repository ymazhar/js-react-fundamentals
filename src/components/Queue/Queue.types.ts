/**
 * Queue Component Types
 * TypeScript interfaces and types for the Queue component
 */

import { ExecutionItem } from '../../types/eventLoop';

/**
 * Queue type identifiers
 */
export type QueueType = 'callStack' | 'taskQueue' | 'microtaskQueue';

/**
 * Badge type for styling
 */
export type BadgeType = 'info' | 'warning' | 'success';

/**
 * Configuration for a queue type
 */
export interface QueueConfig {
  /** Display title for the queue */
  title: string;
  /** Message to show when queue is empty */
  emptyMessage: string;
  /** Badge text */
  badge: string;
  /** Badge styling type */
  badgeType: BadgeType;
  /** Whether items should be displayed in stack order (LIFO) */
  isStack: boolean;
  /** Description of the queue's purpose */
  description: string;
}

/**
 * Props for the Queue component
 */
export interface QueueProps {
  /** Type of queue to render */
  type: QueueType;
  /** Items currently in the queue */
  items: ExecutionItem[];
}
