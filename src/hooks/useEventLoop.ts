/**
 * useEventLoop Hook
 * Manages the state and logic for the event loop visualization
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { EventLoopState, ExecutionStep, CodeExample } from '../types/eventLoop';

// Initial state for the event loop
const initialState: EventLoopState = {
  callStack: [],
  taskQueue: [],
  microtaskQueue: [],
  consoleOutput: [],
  currentStep: -1,
  isPlaying: false,
  speed: 1000,
};

/**
 * Custom hook to manage event loop visualization state
 * @param example - The code example to visualize
 */
export const useEventLoop = (example: CodeExample | null) => {
  // Main state for the event loop visualization
  const [state, setState] = useState<EventLoopState>(initialState);

  // Ref for the auto-play interval
  const intervalRef = useRef<number | null>(null);

  // Get the current step data
  const currentStepData: ExecutionStep | null =
    example && state.currentStep >= 0 && state.currentStep < example.steps.length
      ? example.steps[state.currentStep]
      : null;

  /**
   * Execute a single step in the visualization
   */
  const executeStep = useCallback((step: ExecutionStep) => {
    setState(prev => {
      const newState = { ...prev };

      switch (step.action) {
        case 'push':
          // Push an item onto the call stack
          if (step.item && step.target === 'callStack') {
            newState.callStack = [...prev.callStack, step.item];
          }
          break;

        case 'pop':
          // Pop an item from the call stack
          if (step.target === 'callStack' && prev.callStack.length > 0) {
            newState.callStack = prev.callStack.slice(0, -1);
          }
          break;

        case 'enqueue-task':
          // Add an item to the task queue (macrotask queue)
          if (step.item) {
            newState.taskQueue = [...prev.taskQueue, step.item];
          }
          break;

        case 'enqueue-microtask':
          // Add an item to the microtask queue
          if (step.item) {
            newState.microtaskQueue = [...prev.microtaskQueue, step.item];
          }
          break;

        case 'dequeue-task':
          // Move an item from task queue to call stack
          if (prev.taskQueue.length > 0 && step.item) {
            newState.taskQueue = prev.taskQueue.slice(1);
            newState.callStack = [...prev.callStack, step.item];
          }
          break;

        case 'dequeue-microtask':
          // Move an item from microtask queue to call stack
          if (prev.microtaskQueue.length > 0 && step.item) {
            newState.microtaskQueue = prev.microtaskQueue.slice(1);
            newState.callStack = [...prev.callStack, step.item];
          }
          break;

        case 'log':
          // Add output to the console
          if (step.logMessage) {
            newState.consoleOutput = [...prev.consoleOutput, step.logMessage];
          }
          break;
      }

      return newState;
    });
  }, []);

  /**
   * Move to the next step
   */
  const nextStep = useCallback(() => {
    if (!example) return;

    setState(prev => {
      const newStepIndex = prev.currentStep + 1;

      // Check if we've reached the end
      if (newStepIndex >= example.steps.length) {
        // Stop playing if we reach the end
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return { ...prev, isPlaying: false };
      }

      return { ...prev, currentStep: newStepIndex };
    });
  }, [example]);

  /**
   * Execute current step when step index changes
   */
  useEffect(() => {
    if (example && state.currentStep >= 0 && state.currentStep < example.steps.length) {
      executeStep(example.steps[state.currentStep]);
    }
  }, [state.currentStep, example, executeStep]);

  /**
   * Move to the previous step (reset and replay to that point)
   */
  const previousStep = useCallback(() => {
    if (!example || state.currentStep <= 0) return;

    // Reset state and replay to the previous step
    setState(prev => ({
      ...initialState,
      speed: prev.speed,
      currentStep: -1,
    }));

    // Schedule replay to the previous step
    setTimeout(() => {
      const targetStep = state.currentStep - 1;
      setState(prev => ({ ...prev, currentStep: 0 }));

      // Replay all steps up to the target
      let currentReplayStep = 0;
      const replayInterval = setInterval(() => {
        if (currentReplayStep >= targetStep) {
          clearInterval(replayInterval);
          return;
        }
        currentReplayStep++;
        setState(prev => ({ ...prev, currentStep: currentReplayStep }));
      }, 50);
    }, 50);
  }, [example, state.currentStep]);

  /**
   * Start auto-playing the animation
   */
  const play = useCallback(() => {
    if (!example) return;

    setState(prev => ({ ...prev, isPlaying: true }));

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start auto-advance
    intervalRef.current = window.setInterval(() => {
      nextStep();
    }, state.speed);
  }, [example, state.speed, nextStep]);

  /**
   * Pause the animation
   */
  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Reset the visualization to the beginning
   */
  const reset = useCallback(() => {
    pause();
    setState(prev => ({
      ...initialState,
      speed: prev.speed,
    }));
  }, [pause]);

  /**
   * Set the animation speed
   */
  const setSpeed = useCallback(
    (speed: number) => {
      setState(prev => ({ ...prev, speed }));

      // If playing, restart with new speed
      if (state.isPlaying && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
          nextStep();
        }, speed);
      }
    },
    [state.isPlaying, nextStep]
  );

  /**
   * Clean up interval on unmount
   */
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  /**
   * Reset when example changes
   */
  useEffect(() => {
    reset();
  }, [example?.id, reset]);

  // Calculate progress
  const totalSteps = example?.steps.length ?? 0;
  const progress = totalSteps > 0 ? Math.min(((state.currentStep + 1) / totalSteps) * 100, 100) : 0;
  const isComplete = state.currentStep >= totalSteps - 1;
  const isAtStart = state.currentStep < 0;

  return {
    // State
    callStack: state.callStack,
    taskQueue: state.taskQueue,
    microtaskQueue: state.microtaskQueue,
    consoleOutput: state.consoleOutput,
    currentStep: state.currentStep,
    isPlaying: state.isPlaying,
    speed: state.speed,

    // Computed
    currentStepData,
    progress,
    isComplete,
    isAtStart,
    totalSteps,

    // Actions
    play,
    pause,
    nextStep,
    previousStep,
    reset,
    setSpeed,
  };
};
