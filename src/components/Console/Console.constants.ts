/**
 * Console Component Constants
 * Static values and configuration for the Console component
 */

import { Variants } from 'framer-motion';

/** Default header text for the console */
export const CONSOLE_HEADER_TEXT = '📟 Console Output';

/** Placeholder text when console is empty */
export const CONSOLE_EMPTY_TEXT = 'No output yet...';

/** Console prompt character */
export const CONSOLE_PROMPT = '> ';

/**
 * Framer Motion animation variants for console lines
 */
export const ANIMATION_VARIANTS: Record<string, Variants> = {
  line: {
    initial: {
      opacity: 0,
      x: -20,
      height: 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      height: 'auto',
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
    },
  },
};
