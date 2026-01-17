/**
 * CodeEditor Component
 * Displays the code example with syntax highlighting using react-syntax-highlighter
 */

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeEditorProps } from './CodeEditor.types';
import styles from './CodeEditor.module.scss';

/**
 * Custom style overrides for the syntax highlighter
 * Compact styling to fit more content in viewport
 */
const customStyle: React.CSSProperties = {
  margin: 0,
  padding: '0.75rem',
  fontSize: '0.8rem',
  lineHeight: 1.5,
  background: 'transparent',
  fontFamily: "'JetBrains Mono', monospace",
  overflow: 'auto',
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
      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        customStyle={customStyle}
        showLineNumbers={false}
        wrapLines={true}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeEditor;
