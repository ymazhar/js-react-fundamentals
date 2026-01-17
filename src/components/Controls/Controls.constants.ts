/**
 * Controls Component Constants
 * Static values and configuration for the Controls component
 */

import { SpeedLabel } from './Controls.types';

/** Controls section title */
export const CONTROLS_TITLE = '🎮 Controls';

/** Button labels */
export const BUTTON_LABELS = {
  play: '▶️ Play',
  pause: '⏸️ Pause',
  back: '⏮️ Back',
  next: '⏭️ Next',
  reset: '🔄 Reset',
} as const;

/** Speed slider configuration */
export const SPEED_CONFIG = {
  min: 200,
  max: 2000,
  step: 100,
  /** Used to invert slider value (right = faster) */
  invertValue: 2200,
} as const;

/** Speed thresholds for labels */
export const SPEED_THRESHOLDS = {
  fast: 500,
  normal: 1000,
} as const;

/**
 * Get human-readable speed label based on speed value
 */
export const getSpeedLabel = (speed: number): SpeedLabel => {
  if (speed <= SPEED_THRESHOLDS.fast) return 'Fast';
  if (speed <= SPEED_THRESHOLDS.normal) return 'Normal';
  return 'Slow';
};
