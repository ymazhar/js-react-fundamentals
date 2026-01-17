/**
 * Controls Component Types
 * TypeScript interfaces and types for the Controls component
 */

/**
 * Props for the Controls component
 */
export interface ControlsProps {
  /** Whether the animation is currently playing */
  isPlaying: boolean;
  /** Whether the animation is at the starting position */
  isAtStart: boolean;
  /** Whether the animation has completed */
  isComplete: boolean;
  /** Current animation speed in milliseconds */
  speed: number;
  /** Current step index */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Callback when play button is clicked */
  onPlay: () => void;
  /** Callback when pause button is clicked */
  onPause: () => void;
  /** Callback when next step button is clicked */
  onNextStep: () => void;
  /** Callback when previous step button is clicked */
  onPreviousStep: () => void;
  /** Callback when reset button is clicked */
  onReset: () => void;
  /** Callback when speed is changed */
  onSpeedChange: (speed: number) => void;
}

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

/**
 * Speed label type
 */
export type SpeedLabel = 'Fast' | 'Normal' | 'Slow';
