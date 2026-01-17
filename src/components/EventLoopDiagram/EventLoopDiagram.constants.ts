/**
 * EventLoopDiagram Component Constants
 * Static values and configuration for the EventLoopDiagram component
 */

import { DiagramBoxConfig, LegendItemConfig } from './EventLoopDiagram.types';

/** Section title */
export const DIAGRAM_TITLE = '🔄 Event Loop Flow';

/** SVG viewBox dimensions */
export const SVG_VIEWBOX = '0 0 280 200';

/** Diagram box configurations */
export const DIAGRAM_BOXES: DiagramBoxConfig[] = [
  {
    x: 10,
    y: 10,
    width: 80,
    height: 60,
    fill: 'rgba(59, 130, 246, 0.2)',
    stroke: '#3b82f6',
    label: 'Call Stack',
    sublabel: '(LIFO)',
  },
  {
    x: 100,
    y: 10,
    width: 80,
    height: 60,
    fill: 'rgba(148, 163, 184, 0.2)',
    stroke: '#94a3b8',
    label: 'Web APIs',
    sublabel: '(Browser)',
  },
  {
    x: 190,
    y: 10,
    width: 80,
    height: 60,
    fill: 'rgba(34, 197, 94, 0.2)',
    stroke: '#22c55e',
    label: 'Microtasks',
    sublabel: '(Promises)',
  },
  {
    x: 100,
    y: 130,
    width: 80,
    height: 60,
    fill: 'rgba(249, 115, 22, 0.2)',
    stroke: '#f97316',
    label: 'Task Queue',
    sublabel: '(setTimeout)',
  },
];

/** Event loop circle configuration */
export const EVENT_LOOP_CIRCLE = {
  cx: 50,
  cy: 160,
  r: 25,
  fill: 'rgba(99, 102, 241, 0.2)',
  stroke: '#6366f1',
};

/** Legend items */
export const LEGEND_ITEMS: LegendItemConfig[] = [
  { color: '#3b82f6', label: 'Sync / Call Stack' },
  { color: '#f97316', label: 'Macrotasks' },
  { color: '#22c55e', label: 'Microtasks' },
];
