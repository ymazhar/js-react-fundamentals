/**
 * StepDescription Component Types
 * TypeScript interfaces and types for the StepDescription component
 */

import { ExecutionStep } from '../../types/eventLoop';

/**
 * Props for the StepDescription component
 */
export interface StepDescriptionProps {
  /** Current execution step data (null if not started) */
  step: ExecutionStep | null;
  /** Current step number (0-based index) */
  stepNumber: number;
}
