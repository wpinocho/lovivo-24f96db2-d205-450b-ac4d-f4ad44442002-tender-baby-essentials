import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'spinWheelShown';
const INACTIVITY_DELAY = 10000; // 10 seconds

export const useSpinWheelPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const alreadyShown = localStorage.getItem(STORAGE_KEY);
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      
      if (!hasShown) {
        inactivityTimer = setTimeout(() => {
          setShowPopup(true);
          setHasShown(true);
          localStorage.setItem(STORAGE_KEY, 'true');
        }, INACTIVITY_DELAY);
      }
    };

    // Events that indicate user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    // Start the timer initially
    resetTimer();

    // Reset timer on user activity
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [hasShown]);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  return { showPopup, closePopup };
};