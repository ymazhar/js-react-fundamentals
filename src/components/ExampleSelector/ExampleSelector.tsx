/**
 * ExampleSelector Component
 * Allows users to select different code examples to visualize
 * Uses a dropdown to save space
 */

import React from 'react';
import { ExampleSelectorProps } from './ExampleSelector.types';
import { EXAMPLE_SELECTOR_TITLE } from './ExampleSelector.constants';
import styles from './ExampleSelector.module.scss';

/**
 * ExampleSelector displays a dropdown of available code examples
 * Users can select an example for visualization
 */
const ExampleSelector: React.FC<ExampleSelectorProps> = ({
  examples,
  selectedExample,
  onSelectExample,
}) => {
  // Handle dropdown change
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = examples.find(ex => ex.id === e.target.value);
    if (selected) {
      onSelectExample(selected);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{EXAMPLE_SELECTOR_TITLE}</h2>
      </div>
      <div className={styles.content}>
        {/* Dropdown select */}
        <select
          className={styles.select}
          value={selectedExample?.id || ''}
          onChange={handleChange}
          aria-label="Select a code example"
        >
          {examples.map(example => (
            <option key={example.id} value={example.id}>
              {example.name}
            </option>
          ))}
        </select>

        {/* Show description of selected example */}
        {selectedExample && <p className={styles.description}>{selectedExample.description}</p>}
      </div>
    </div>
  );
};

export default ExampleSelector;
