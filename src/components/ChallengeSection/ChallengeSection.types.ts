/**
 * ChallengeSection Component Types
 * TypeScript interfaces and types for the ChallengeSection component
 */

/**
 * Difficulty level for challenges
 */
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Status of a challenge attempt
 */
export type ChallengeStatus = 'pending' | 'submitted' | 'correct' | 'incorrect';

/**
 * Represents a single challenge with code and expected output
 */
export interface Challenge {
  /** Unique identifier */
  id: string;
  /** Challenge title */
  title: string;
  /** The code snippet to analyze */
  code: string;
  /** The correct console output (array of log messages in order) */
  correctOutput: string[];
  /** Explanation of why this output occurs */
  explanation: string;
  /** Difficulty level */
  difficulty: ChallengeDifficulty;
  /** Optional hints for the user */
  hints?: string[];
}

/**
 * User's attempt at a challenge
 */
export interface ChallengeAttempt {
  /** The challenge being attempted */
  challengeId: string;
  /** User's predicted output */
  userPrediction: string;
  /** Whether the prediction was correct */
  isCorrect: boolean;
  /** Timestamp of the attempt */
  timestamp: Date;
}

/**
 * Props for the ChallengeSection component
 */
export interface ChallengeSectionProps {
  /** Optional callback when user completes a challenge */
  onChallengeComplete?: (challengeId: string, isCorrect: boolean) => void;
}

/**
 * Props for individual ChallengeCard component
 */
export interface ChallengeCardProps {
  /** The challenge to display */
  challenge: Challenge;
  /** Current status of the challenge */
  status: ChallengeStatus;
  /** User's current input */
  userInput: string;
  /** Whether to show the answer */
  showAnswer: boolean;
  /** Whether the answer was correct */
  isCorrect: boolean;
  /** Callback when user types in input */
  onInputChange: (value: string) => void;
  /** Callback when user submits their prediction */
  onSubmit: () => void;
  /** Callback to reset the challenge */
  onReset: () => void;
  /** Callback to show hint */
  onShowHint: () => void;
  /** Current hint index shown */
  hintIndex: number;
}
