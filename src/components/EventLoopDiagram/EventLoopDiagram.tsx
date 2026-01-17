/**
 * EventLoopDiagram Component
 * Visual diagram showing the flow of the event loop
 */

import React from 'react';
import { EventLoopDiagramProps } from './EventLoopDiagram.types';
import {
  DIAGRAM_TITLE,
  SVG_VIEWBOX,
  DIAGRAM_BOXES,
  EVENT_LOOP_CIRCLE,
  LEGEND_ITEMS,
} from './EventLoopDiagram.constants';
import styles from './EventLoopDiagram.module.scss';

/**
 * EventLoopDiagram shows a visual representation of the event loop
 * Includes the call stack, web APIs, task queue, and microtask queue
 */
const EventLoopDiagram: React.FC<EventLoopDiagramProps> = ({ isPlaying }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{DIAGRAM_TITLE}</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.diagramContainer}>
          <svg className={styles.svg} viewBox={SVG_VIEWBOX}>
            {/* Diagram boxes */}
            {DIAGRAM_BOXES.map((box, index) => (
              <g key={index}>
                <rect
                  className={styles.diagramBox}
                  x={box.x}
                  y={box.y}
                  width={box.width}
                  height={box.height}
                  fill={box.fill}
                  stroke={box.stroke}
                />
                <text
                  className={styles.diagramText}
                  x={box.x + box.width / 2}
                  y={box.y + 25}
                  textAnchor="middle"
                >
                  {box.label}
                </text>
                <text
                  className={styles.diagramSubtext}
                  x={box.x + box.width / 2}
                  y={box.y + 40}
                  textAnchor="middle"
                >
                  {box.sublabel}
                </text>
              </g>
            ))}

            {/* Event Loop Circle */}
            <circle
              cx={EVENT_LOOP_CIRCLE.cx}
              cy={EVENT_LOOP_CIRCLE.cy}
              r={EVENT_LOOP_CIRCLE.r}
              fill={EVENT_LOOP_CIRCLE.fill}
              stroke={EVENT_LOOP_CIRCLE.stroke}
              strokeWidth="2"
            />
            <text
              className={styles.diagramText}
              x={EVENT_LOOP_CIRCLE.cx}
              y={EVENT_LOOP_CIRCLE.cy + 3}
              textAnchor="middle"
            >
              Event
            </text>
            <text
              className={styles.diagramSubtext}
              x={EVENT_LOOP_CIRCLE.cx}
              y={EVENT_LOOP_CIRCLE.cy + 15}
              textAnchor="middle"
            >
              Loop
            </text>

            {/* Static Arrows */}
            {/* Call Stack -> Web APIs */}
            <path
              className={`${styles.staticPath} ${styles['staticPath--gray']}`}
              d="M 90 40 L 100 40"
              markerEnd="url(#arrowhead)"
            />

            {/* Web APIs -> Task Queue */}
            <path
              className={`${styles.staticPath} ${styles['staticPath--orange']}`}
              d="M 140 70 L 140 130"
              markerEnd="url(#arrowhead)"
            />

            {/* Task Queue -> Event Loop */}
            <path
              className={`${styles.staticPath} ${styles['staticPath--primary']}`}
              d="M 100 160 L 75 160"
              markerEnd="url(#arrowhead)"
            />

            {/* Animated Arrows */}
            {/* Microtask Queue -> Call Stack */}
            <path
              className={`${styles.arrowPath} ${isPlaying ? styles['arrowPath--animated'] : ''}`}
              d="M 190 40 Q 150 90 90 40"
              markerEnd="url(#arrowhead)"
            />

            {/* Event Loop -> Call Stack */}
            <path
              className={`${styles.arrowPath} ${isPlaying ? styles['arrowPath--animated'] : ''}`}
              d="M 50 135 L 50 70"
              markerEnd="url(#arrowhead)"
            />

            {/* Arrowhead marker definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
              </marker>
            </defs>
          </svg>

          {/* Legend */}
          <div className={styles.legend}>
            {LEGEND_ITEMS.map((item, index) => (
              <div key={index} className={styles.legendItem}>
                <span className={styles.legendColor} style={{ background: item.color }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLoopDiagram;
