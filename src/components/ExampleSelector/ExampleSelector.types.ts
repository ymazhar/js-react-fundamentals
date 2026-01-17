/**
 * ExampleSelector Component Types
 * TypeScript interfaces and types for the ExampleSelector component
 */

import { CodeExample } from '../../types/eventLoop';

/**
 * Props for the ExampleSelector component
 */
export interface ExampleSelectorProps {
  /** Array of available code examples */
  examples: CodeExample[];
  /** Currently selected example (can be null) */
  selectedExample: CodeExample | null;
  /** Callback when an example is selected */
  onSelectExample: (example: CodeExample) => void;
}
