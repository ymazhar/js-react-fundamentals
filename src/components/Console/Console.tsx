/**
 * Console Component
 * Displays simulated console.log output with smooth animations
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConsoleProps } from './Console.types';
import { CONSOLE_HEADER_TEXT, CONSOLE_EMPTY_TEXT, ANIMATION_VARIANTS } from './Console.constants';
import styles from './Console.module.scss';

/**
 * Console component displays simulated console output
 * Shows the order in which console.log statements execute
 */
const Console: React.FC<ConsoleProps> = ({ output }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{CONSOLE_HEADER_TEXT}</div>
      <div className={styles.output}>
        <AnimatePresence mode="popLayout">
          {output.length === 0 ? (
            <motion.div
              key="empty"
              className={styles.empty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {CONSOLE_EMPTY_TEXT}
            </motion.div>
          ) : (
            output.map((line, index) => (
              <motion.div
                key={`${index}-${line}`}
                className={styles.line}
                variants={ANIMATION_VARIANTS.line}
                initial="initial"
                animate="animate"
              >
                {line}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Console;
