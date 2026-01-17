/**
 * StepDescription Component
 * Shows the description of the current execution step with animations
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepDescriptionProps } from './StepDescription.types';
import {
  STEP_DESCRIPTION_TITLE,
  STEP_PLACEHOLDER_TEXT,
  ANIMATION_VARIANTS,
} from './StepDescription.constants';
import styles from './StepDescription.module.scss';

/**
 * StepDescription displays what's happening at each step
 * Helps users understand the event loop behavior
 */
const StepDescription: React.FC<StepDescriptionProps> = ({ step, stepNumber }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{STEP_DESCRIPTION_TITLE}</h2>
      </div>
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {step ? (
            <motion.div
              key={stepNumber}
              className={`${styles.descriptionBox} ${styles['descriptionBox--highlighted']}`}
              variants={ANIMATION_VARIANTS.description}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.span
                className={styles.stepIndicator}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                {stepNumber + 1}
              </motion.span>
              {step.description}
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              className={styles.descriptionBox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {STEP_PLACEHOLDER_TEXT}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StepDescription;
