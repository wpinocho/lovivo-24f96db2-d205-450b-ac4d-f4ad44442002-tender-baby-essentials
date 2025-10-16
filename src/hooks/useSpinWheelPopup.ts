import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'spinWheelShown';
const INACTIVITY_DELAY = 10000; // 10 seconds

export const useSpinWheelPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log('SpinWheel: Initial check - already shown?', stored === 'true');
    return stored === 'true';
  });

  useEffect(() => {
    // Don't set up timer if already shown
    if (hasShown) {
      console.log('SpinWheel: Already shown before, not setting up timer');
      return;
    }

    console.log('SpinWheel: Setting up inactivity detection');
    let inactivityTimer: NodeJS.Timeout;

    const startTimer = () => {
      console.log('SpinWheel: Starting 10 second timer');
      clearTimeout(inactivityTimer);
      
      inactivityTimer = setTimeout(() => {
        console.log('SpinWheel: 10 seconds passed! Showing popup');
        setShowPopup(true);
        setHasShown(true);
        localStorage.setItem(STORAGE_KEY, 'true');
      }, INACTIVITY_DELAY);
    };

    const resetTimer = () => {
      console.log('SpinWheel: User activity detected, resetting timer');
      startTimer();
    };

    // Events that indicate user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    // Start initial timer
    startTimer();

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    console.log('SpinWheel: Event listeners attached');

    // Cleanup
    return () => {
      console.log('SpinWheel: Cleaning up');
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [hasShown]); // Re-run if hasShown changes

  const closePopup = useCallback(() => {
    console.log('SpinWheel: Closing popup');
    setShowPopup(false);
  }, []);

  return { showPopup, closePopup };
};