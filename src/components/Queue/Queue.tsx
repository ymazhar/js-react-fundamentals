/**
 * Queue Component
 * Visualizes a single queue (Call Stack, Task Queue, or Microtask Queue)
 * Uses Framer Motion for smooth enter/exit animations
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QueueProps } from './Queue.types';
import { QUEUE_CONFIG, ANIMATION_VARIANTS } from './Queue.constants';
import styles from './Queue.module.scss';

/**
 * Queue component visualizes execution items in a stack or queue
 * Shows smooth animations when items are added or removed
 */
const Queue: React.FC<QueueProps> = ({ type, items }) => {
  const config = QUEUE_CONFIG[type];

  return (
    <div className={`${styles.card} ${styles[`card--${type}`]}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={`${styles.label} ${styles[`label--${type}`]}`}>{config.title}</span>
        </h2>
        <span className={`${styles.badge} ${styles[`badge--${config.badgeType}`]}`}>
          {config.badge}
        </span>
      </div>
      <div className={styles.content}>
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div
              key="empty"
              className={styles.emptyMessage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {config.emptyMessage}
            </motion.div>
          ) : (
            <motion.div
              className={`${styles.itemsContainer} ${
                config.isStack ? styles['itemsContainer--stack'] : ''
              }`}
              layout
            >
              <AnimatePresence mode="popLayout">
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    className={`${styles.item} ${styles[`item--${item.type}`]}`}
                    variants={ANIMATION_VARIANTS.item}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout
                    layoutId={item.id}
                  >
                    {item.name}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Queue;
