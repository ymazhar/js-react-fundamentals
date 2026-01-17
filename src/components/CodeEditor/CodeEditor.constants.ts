/**
 * CodeEditor Component Constants
 * Static values and configuration for the CodeEditor component
 */

/** macOS-style window button colors */
export const WINDOW_BUTTON_COLORS = {
  close: '#ff5f57',
  minimize: '#febc2e',
  maximize: '#28c840',
} as const;

/** JavaScript keywords to highlight */
export const JS_KEYWORDS = [
  'const',
  'let',
  'var',
  'function',
  'return',
  'if',
  'else',
  'for',
  'while',
  'do',
  'switch',
  'case',
  'break',
  'continue',
  'new',
  'this',
  'class',
  'extends',
  'import',
  'export',
  'from',
  'default',
  'async',
  'await',
] as const;

/** Regex pattern for JavaScript keywords */
export const KEYWORDS_PATTERN = new RegExp(`\\b(${JS_KEYWORDS.join('|')})\\b`, 'g');

/** Regex patterns for syntax highlighting */
export const SYNTAX_PATTERNS = {
  comments: /(\/\/.*$)/gm,
  strings: /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g,
  functionCalls: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,
  numbers: /\b(\d+)\b/g,
} as const;
