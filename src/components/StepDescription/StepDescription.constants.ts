/**
 * StepDescription Component Constants
 * Static values and configuration for the StepDescription component
 */

import { Variants } from 'framer-motion';

/** Section title */
export const STEP_DESCRIPTION_TITLE = '📝 Current Step';

/** Placeholder text when no step is active */
export const STEP_PLACEHOLDER_TEXT =
  'Click "Play" or "Next" to start the visualization. Watch how JavaScript processes code through the event loop!';

/**
 * Framer Motion animation variants for step description
 */
export const ANIMATION_VARIANTS: Record<string, Variants> = {
  description: {
    initial: {
      opacity: 0,
      y: 10,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.15,
      },
    },
  },
};
