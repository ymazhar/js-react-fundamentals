/**
 * Controls Component
 * Provides play, pause, step, and reset controls for the animation
 */

import React from 'react';
import { ControlsProps } from './Controls.types';
import { CONTROLS_TITLE, BUTTON_LABELS, SPEED_CONFIG, getSpeedLabel } from './Controls.constants';
import styles from './Controls.module.scss';

/**
 * Controls component provides animation controls
 * Includes play/pause, step forward/back, reset, and speed adjustment
 */
const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  isAtStart,
  isComplete,
  speed,
  currentStep,
  totalSteps,
  onPlay,
  onPause,
  onNextStep,
  onPreviousStep,
  onReset,
  onSpeedChange,
}) => {
  const speedLabel = getSpeedLabel(speed);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSpeedChange(SPEED_CONFIG.invertValue - parseInt(e.target.value));
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{CONTROLS_TITLE}</h2>
        <span className={styles.stepInfo}>
          Step {Math.max(0, currentStep + 1)} of {totalSteps}
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          {/* Play/Pause button */}
          {isPlaying ? (
            <button className={`${styles.button} ${styles['button--primary']}`} onClick={onPause}>
              {BUTTON_LABELS.pause}
            </button>
          ) : (
            <button
              className={`${styles.button} ${styles['button--primary']}`}
              onClick={onPlay}
              disabled={isComplete}
            >
              {BUTTON_LABELS.play}
            </button>
          )}

          {/* Step backward */}
          <button
            className={`${styles.button} ${styles['button--secondary']}`}
            onClick={onPreviousStep}
            disabled={isAtStart || isPlaying}
          >
            {BUTTON_LABELS.back}
          </button>

          {/* Step forward */}
          <button
            className={`${styles.button} ${styles['button--secondary']}`}
            onClick={onNextStep}
            disabled={isComplete || isPlaying}
          >
            {BUTTON_LABELS.next}
          </button>

          {/* Reset button */}
          <button
            className={`${styles.button} ${styles['button--danger']}`}
            onClick={onReset}
            disabled={isAtStart}
          >
            {BUTTON_LABELS.reset}
          </button>

          {/* Speed control */}
          <div className={styles.speedControl}>
            <label htmlFor="speed-slider">Speed: {speedLabel}</label>
            <input
              id="speed-slider"
              type="range"
              className={styles.speedSlider}
              min={SPEED_CONFIG.min}
              max={SPEED_CONFIG.max}
              step={SPEED_CONFIG.step}
              value={SPEED_CONFIG.invertValue - speed}
              onChange={handleSpeedChange}
              aria-label={`Animation speed: ${speedLabel}`}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div
          className={styles.progressBar}
          role="progressbar"
          aria-valuenow={Math.max(0, currentStep + 1)}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-label={`Progress: step ${Math.max(0, currentStep + 1)} of ${totalSteps}`}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
