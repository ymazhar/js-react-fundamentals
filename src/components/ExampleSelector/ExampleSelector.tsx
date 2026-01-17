/**
 * ExampleSelector Component
 * Allows users to select different code examples to visualize
 */

import React from 'react';
import { ExampleSelectorProps } from './ExampleSelector.types';
import { EXAMPLE_SELECTOR_TITLE } from './ExampleSelector.constants';
import styles from './ExampleSelector.module.scss';

/**
 * ExampleSelector displays a list of available code examples
 * Users can click to select an example for visualization
 */
const ExampleSelector: React.FC<ExampleSelectorProps> = ({
  examples,
  selectedExample,
  onSelectExample,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{EXAMPLE_SELECTOR_TITLE}</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.list}>
          {examples.map(example => (
            <button
              key={example.id}
              className={`${styles.button} ${
                selectedExample?.id === example.id ? styles['button--active'] : ''
              }`}
              onClick={() => onSelectExample(example)}
            >
              {example.name}
              <p className={styles.description}>{example.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExampleSelector;
