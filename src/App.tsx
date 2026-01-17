/**
 * App Component
 * Main application component for the JavaScript Event Loop Visualizer
 *
 * This app demonstrates how the JavaScript event loop works by visualizing:
 * - The Call Stack (LIFO structure for function execution)
 * - The Task Queue (macrotasks like setTimeout callbacks)
 * - The Microtask Queue (Promise callbacks, higher priority than tasks)
 *
 * Users can select different code examples and step through the execution
 * to see how different types of code are processed by the event loop.
 */

import React, { useState } from 'react';
import { codeExamples } from './data/codeExamples';
import { CodeExample } from './types/eventLoop';
import { useEventLoop } from './hooks/useEventLoop';

// Import components from new folder structure
import {
  ChallengeSection,
  CodeEditor,
  Console,
  Controls,
  EventLoopDiagram,
  ExampleSelector,
  Queue,
  ReferencesSection,
  StepDescription,
} from './components';

// Import styles
import styles from './App.module.scss';

/** ID for the main content area (used by skip link) */
const MAIN_CONTENT_ID = 'main-content';

/**
 * Main App component
 * Orchestrates the event loop visualization
 */
const App: React.FC = () => {
  // Currently selected code example
  const [selectedExample, setSelectedExample] = useState<CodeExample>(codeExamples[0]);

  // Event loop state and controls from custom hook
  const {
    callStack,
    taskQueue,
    microtaskQueue,
    consoleOutput,
    currentStep,
    isPlaying,
    speed,
    currentStepData,
    isComplete,
    isAtStart,
    totalSteps,
    play,
    pause,
    nextStep,
    previousStep,
    reset,
    setSpeed,
  } = useEventLoop(selectedExample);

  /**
   * Handle example selection
   * Resets the visualization when a new example is selected
   */
  const handleSelectExample = (example: CodeExample) => {
    setSelectedExample(example);
  };

  return (
    <div className={styles.app}>
      {/* Skip link for keyboard users */}
      <a href={`#${MAIN_CONTENT_ID}`} className="skip-link">
        Skip to main content
      </a>

      {/* ARIA live region for step announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        style={{ position: 'absolute', left: '-9999px' }}
      >
        {currentStepData
          ? `Step ${currentStep + 1} of ${totalSteps}: ${currentStepData.description}`
          : 'Ready to start visualization'}
      </div>

      {/* Header with title and description */}
      <header className={styles.header}>
        <h1 className={styles.title}>🔄 JavaScript Event Loop Visualizer</h1>
        <p className={styles.subtitle}>
          Understand how JavaScript handles asynchronous code through the event loop
        </p>
      </header>

      <main id={MAIN_CONTENT_ID} className={styles.main}>
        {/* Left Sidebar - Example selection and diagram */}
        <aside className={styles.sidebar}>
          {/* Example selector */}
          <ExampleSelector
            examples={codeExamples}
            selectedExample={selectedExample}
            onSelectExample={handleSelectExample}
          />

          {/* Animation controls */}
          <Controls
            isPlaying={isPlaying}
            isAtStart={isAtStart}
            isComplete={isComplete}
            speed={speed}
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPlay={play}
            onPause={pause}
            onNextStep={nextStep}
            onPreviousStep={previousStep}
            onReset={reset}
            onSpeedChange={setSpeed}
          />

          {/* Console output */}
          <div className={styles.consoleCard}>
            <div className={styles.consoleCardContent}>
              <Console output={consoleOutput} />
            </div>
          </div>

          {/* Event loop diagram */}
          <EventLoopDiagram isPlaying={isPlaying} />
        </aside>

        {/* Main Visualization Area */}
        <section className={styles.visualizationArea}>
          {/* Code display */}
          <div className={styles.codeCard}>
            <div className={styles.codeCardHeader}>
              <h2 className={styles.codeCardTitle}>📄 Code: {selectedExample.name}</h2>
            </div>
            <div className={styles.codeCardContent}>
              <CodeEditor code={selectedExample.code} />
            </div>
          </div>

          {/* Current step description */}
          <StepDescription step={currentStepData} stepNumber={currentStep} />

          {/* Queue visualizations */}
          <div className={styles.queuesContainer}>
            <Queue type="callStack" items={callStack} />
            <Queue type="microtaskQueue" items={microtaskQueue} />
            <Queue type="taskQueue" items={taskQueue} />
          </div>

          {/* Challenge mode - predict the output */}
          <ChallengeSection />

          {/* References and learning resources */}
          <ReferencesSection />
        </section>
      </main>
    </div>
  );
};

export default App;
