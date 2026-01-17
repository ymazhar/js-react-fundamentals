/**
 * CodeEditor Component
 * Displays the code example with syntax highlighting
 */

import React from 'react';
import { CodeEditorProps } from './CodeEditor.types';
import { KEYWORDS_PATTERN, SYNTAX_PATTERNS } from './CodeEditor.constants';
import styles from './CodeEditor.module.scss';

/**
 * Simple syntax highlighter for JavaScript code
 * Highlights keywords, strings, functions, comments, and numbers
 */
const highlightCode = (code: string): string => {
  // Order matters - process comments first to avoid conflicts
  const highlighted = code
    // Comments
    .replace(SYNTAX_PATTERNS.comments, '<span class="comment">$1</span>')
    // Strings (single and double quotes)
    .replace(SYNTAX_PATTERNS.strings, '<span class="string">$1$2$1</span>')
    // Keywords
    .replace(KEYWORDS_PATTERN, '<span class="keyword">$1</span>')
    // Function calls
    .replace(SYNTAX_PATTERNS.functionCalls, '<span class="function">$1</span>(')
    // Numbers
    .replace(SYNTAX_PATTERNS.numbers, '<span class="number">$1</span>')
    // Arrow functions
    .replace(/=&gt;/g, '=>');

  return highlighted;
};

/**
 * CodeEditor component displays code with syntax highlighting
 * Styled to look like a macOS code editor window
 */
const CodeEditor: React.FC<CodeEditorProps> = ({ code }) => {
  return (
    <div className={styles.wrapper}>
      {/* Window chrome with traffic light buttons */}
      <div className={styles.header}>
        <span className={`${styles.dot} ${styles['dot--close']}`} />
        <span className={`${styles.dot} ${styles['dot--minimize']}`} />
        <span className={`${styles.dot} ${styles['dot--maximize']}`} />
      </div>

      {/* Code content with syntax highlighting */}
      <pre className={styles.codeArea} dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </div>
  );
};

export default CodeEditor;
