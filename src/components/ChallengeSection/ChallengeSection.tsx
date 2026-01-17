/**
 * ChallengeSection Component
 * Interactive challenge mode where users predict event loop output
 *
 * Features:
 * - Multiple challenges with increasing difficulty
 * - User input for predictions
 * - Immediate feedback on correctness
 * - Hints system
 * - Progress tracking
 * - Persistent state (saved to localStorage)
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChallengeSectionProps, ChallengeStatus } from './ChallengeSection.types';
import {
  SECTION_TITLE,
  SECTION_DESCRIPTION,
  BUTTON_LABELS,
  FEEDBACK_MESSAGES,
  DIFFICULTY_CONFIG,
  CHALLENGES,
  checkAnswer,
  STORAGE_KEY,
} from './ChallengeSection.constants';
import styles from './ChallengeSection.module.scss';

/**
 * State for each challenge
 */
interface ChallengeState {
  status: ChallengeStatus;
  userInput: string;
  isCorrect: boolean;
  hintIndex: number;
}

/**
 * Persisted state structure
 */
interface PersistedState {
  activeIndex: number;
  challengeStates: Record<string, ChallengeState>;
}

/**
 * Initial state for a challenge
 */
const getInitialChallengeState = (): ChallengeState => ({
  status: 'pending',
  userInput: '',
  isCorrect: false,
  hintIndex: -1,
});

/**
 * Load state from localStorage
 */
const loadPersistedState = (): PersistedState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn('Failed to load challenge progress from localStorage:', error);
  }
  return null;
};

/**
 * Save state to localStorage
 */
const savePersistedState = (state: PersistedState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save challenge progress to localStorage:', error);
  }
};

/**
 * Animation variants
 */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
  },
  exit: { opacity: 0, y: -20 },
};

const feedbackVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 500, damping: 30 },
  },
};

/**
 * Custom styles for syntax highlighter
 */
const codeStyle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  background: 'transparent',
  fontSize: '0.8rem',
  lineHeight: 1.5,
};

/**
 * ChallengeSection component
 */
const ChallengeSection: React.FC<ChallengeSectionProps> = ({ onChallengeComplete }) => {
  // Load persisted state or use defaults
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const persisted = loadPersistedState();
    return persisted?.activeIndex ?? 0;
  });

  // State for all challenges
  const [challengeStates, setChallengeStates] = useState<Record<string, ChallengeState>>(() => {
    const persisted = loadPersistedState();
    if (persisted?.challengeStates) {
      // Merge persisted state with any new challenges that might have been added
      const merged: Record<string, ChallengeState> = {};
      CHALLENGES.forEach(challenge => {
        merged[challenge.id] =
          persisted.challengeStates[challenge.id] || getInitialChallengeState();
      });
      return merged;
    }
    // Initialize fresh state
    const initial: Record<string, ChallengeState> = {};
    CHALLENGES.forEach(challenge => {
      initial[challenge.id] = getInitialChallengeState();
    });
    return initial;
  });

  // Persist state whenever it changes
  useEffect(() => {
    savePersistedState({ activeIndex, challengeStates });
  }, [activeIndex, challengeStates]);

  // Get current challenge and its state
  const currentChallenge = CHALLENGES[activeIndex];
  const currentState = challengeStates[currentChallenge.id];

  /**
   * Handle input change
   */
  const handleInputChange = useCallback(
    (value: string) => {
      setChallengeStates(prev => ({
        ...prev,
        [currentChallenge.id]: {
          ...prev[currentChallenge.id],
          userInput: value,
        },
      }));
    },
    [currentChallenge.id]
  );

  /**
   * Handle submission
   */
  const handleSubmit = useCallback(() => {
    const isCorrect = checkAnswer(currentState.userInput, currentChallenge.correctOutput);

    setChallengeStates(prev => ({
      ...prev,
      [currentChallenge.id]: {
        ...prev[currentChallenge.id],
        status: isCorrect ? 'correct' : 'incorrect',
        isCorrect,
      },
    }));

    // Notify parent if callback provided
    onChallengeComplete?.(currentChallenge.id, isCorrect);
  }, [currentChallenge, currentState.userInput, onChallengeComplete]);

  /**
   * Handle showing answer without submitting
   */
  const handleShowAnswer = useCallback(() => {
    setChallengeStates(prev => ({
      ...prev,
      [currentChallenge.id]: {
        ...prev[currentChallenge.id],
        status: 'submitted',
      },
    }));
  }, [currentChallenge.id]);

  /**
   * Handle reset
   */
  const handleReset = useCallback(() => {
    setChallengeStates(prev => ({
      ...prev,
      [currentChallenge.id]: getInitialChallengeState(),
    }));
  }, [currentChallenge.id]);

  /**
   * Handle showing hint
   */
  const handleShowHint = useCallback(() => {
    const hints = currentChallenge.hints || [];
    setChallengeStates(prev => ({
      ...prev,
      [currentChallenge.id]: {
        ...prev[currentChallenge.id],
        hintIndex: Math.min(prev[currentChallenge.id].hintIndex + 1, hints.length - 1),
      },
    }));
  }, [currentChallenge]);

  /**
   * Navigate to next challenge
   */
  const handleNextChallenge = useCallback(() => {
    if (activeIndex < CHALLENGES.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  }, [activeIndex]);

  /**
   * Reset all challenge progress
   */
  const handleResetAll = useCallback(() => {
    const fresh: Record<string, ChallengeState> = {};
    CHALLENGES.forEach(challenge => {
      fresh[challenge.id] = getInitialChallengeState();
    });
    setChallengeStates(fresh);
    setActiveIndex(0);
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Calculate progress
  const completedCount = Object.values(challengeStates).filter(
    state => state.status === 'correct'
  ).length;
  const progressPercent = (completedCount / CHALLENGES.length) * 100;

  // Check if answer should be shown
  const showAnswer = currentState.status !== 'pending';
  const hasHints = currentChallenge.hints && currentChallenge.hints.length > 0;
  const canShowMoreHints =
    hasHints && currentState.hintIndex < (currentChallenge.hints?.length || 0) - 1;

  return (
    <section className={styles.section} aria-labelledby="challenge-title">
      <div className={styles.card}>
        {/* Header */}
        <header className={styles.header}>
          <h2 id="challenge-title" className={styles.title}>
            {SECTION_TITLE}
          </h2>
          <p className={styles.description}>{SECTION_DESCRIPTION}</p>
        </header>

        <div className={styles.content}>
          {/* Challenge navigation */}
          <nav className={styles.challengeNav} aria-label="Challenge navigation">
            {CHALLENGES.map((challenge, index) => {
              const state = challengeStates[challenge.id];
              const isActive = index === activeIndex;
              const isCompleted = state.status === 'correct';

              return (
                <button
                  key={challenge.id}
                  className={`${styles.navButton} ${isActive ? styles['navButton--active'] : ''} ${
                    isCompleted ? styles['navButton--completed'] : ''
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {index + 1}
                </button>
              );
            })}
          </nav>

          {/* Active challenge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChallenge.id}
              className={styles.challengeCard}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Challenge header */}
              <div className={styles.challengeHeader}>
                <h3 className={styles.challengeTitle}>{currentChallenge.title}</h3>
                <span
                  className={`${styles.difficultyBadge} ${
                    styles[`difficultyBadge--${currentChallenge.difficulty}`]
                  }`}
                >
                  {DIFFICULTY_CONFIG[currentChallenge.difficulty].label}
                </span>
              </div>

              {/* Challenge body */}
              <div className={styles.challengeBody}>
                {/* Code block */}
                <div className={styles.codeBlock}>
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={codeStyle}
                  >
                    {currentChallenge.code}
                  </SyntaxHighlighter>
                </div>

                {/* Prediction input */}
                <div className={styles.predictionSection}>
                  <label htmlFor="prediction-input" className={styles.inputLabel}>
                    What will be logged to the console? (in order)
                  </label>
                  <textarea
                    id="prediction-input"
                    className={styles.predictionInput}
                    value={currentState.userInput}
                    onChange={e => handleInputChange(e.target.value)}
                    placeholder={FEEDBACK_MESSAGES.placeholder}
                    disabled={showAnswer}
                    aria-describedby="prediction-help"
                  />
                  <span id="prediction-help" className="sr-only">
                    Enter values separated by commas or new lines
                  </span>
                </div>

                {/* Action buttons */}
                <div className={styles.actions}>
                  {!showAnswer ? (
                    <>
                      <button
                        className={`${styles.actionButton} ${styles['actionButton--primary']}`}
                        onClick={handleSubmit}
                        disabled={!currentState.userInput.trim()}
                      >
                        {BUTTON_LABELS.submit}
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles['actionButton--secondary']}`}
                        onClick={handleShowAnswer}
                      >
                        {BUTTON_LABELS.showAnswer}
                      </button>
                      {hasHints && (
                        <button
                          className={`${styles.actionButton} ${styles['actionButton--hint']}`}
                          onClick={handleShowHint}
                          disabled={!canShowMoreHints && currentState.hintIndex >= 0}
                        >
                          {BUTTON_LABELS.showHint}
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        className={`${styles.actionButton} ${styles['actionButton--secondary']}`}
                        onClick={handleReset}
                      >
                        {BUTTON_LABELS.tryAgain}
                      </button>
                      {activeIndex < CHALLENGES.length - 1 && (
                        <button
                          className={`${styles.actionButton} ${styles['actionButton--primary']}`}
                          onClick={handleNextChallenge}
                        >
                          {BUTTON_LABELS.nextChallenge}
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Hints */}
                <AnimatePresence>
                  {currentState.hintIndex >= 0 && currentChallenge.hints && (
                    <motion.div
                      className={styles.hintSection}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <h4 className={styles.hintTitle}>💡 Hint {currentState.hintIndex + 1}:</h4>
                      <p className={styles.hintText}>
                        {currentChallenge.hints[currentState.hintIndex]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Feedback */}
                <AnimatePresence>
                  {(currentState.status === 'correct' || currentState.status === 'incorrect') && (
                    <motion.div
                      className={`${styles.feedback} ${
                        currentState.isCorrect
                          ? styles['feedback--correct']
                          : styles['feedback--incorrect']
                      }`}
                      variants={feedbackVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      role="alert"
                    >
                      {currentState.isCorrect
                        ? FEEDBACK_MESSAGES.correct
                        : FEEDBACK_MESSAGES.incorrect}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Answer reveal */}
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      className={styles.answerSection}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <h4 className={styles.answerTitle}>Correct Output:</h4>
                      <div className={styles.correctOutput}>
                        {currentChallenge.correctOutput.map((item, index) => (
                          <span key={index} className={styles.outputItem}>
                            {item}
                          </span>
                        ))}
                      </div>
                      <p className={styles.explanation}>{currentChallenge.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress indicator */}
          <div className={styles.progress}>
            <span className={styles.progressLabel}>Progress:</span>
            <div
              className={styles.progressBar}
              role="progressbar"
              aria-valuenow={completedCount}
              aria-valuemin={0}
              aria-valuemax={CHALLENGES.length}
            >
              <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
            </div>
            <span className={styles.progressText}>
              {completedCount}/{CHALLENGES.length}
            </span>
            {completedCount > 0 && (
              <button
                className={styles.resetAllButton}
                onClick={handleResetAll}
                aria-label="Reset all challenge progress"
              >
                {BUTTON_LABELS.resetAll}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
