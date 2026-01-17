/**
 * EventLoopDiagram Component Types
 * TypeScript interfaces and types for the EventLoopDiagram component
 */

/**
 * Props for the EventLoopDiagram component
 */
export interface EventLoopDiagramProps {
  /** Whether the animation is currently playing (affects arrow animation) */
  isPlaying: boolean;
}

/**
 * Configuration for a diagram box
 */
export interface DiagramBoxConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  label: string;
  sublabel: string;
}

/**
 * Legend item configuration
 */
export interface LegendItemConfig {
  color: string;
  label: string;
}
