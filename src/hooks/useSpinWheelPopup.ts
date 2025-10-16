import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'spinWheelShown';
const INACTIVITY_DELAY = 10000; // 10 seconds

export const useSpinWheelPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const alreadyShown = localStorage.getItem(STORAGE_KEY);
    
    console.log('SpinWheel: Checking if already shown:', alreadyShown);
    
    if (alreadyShown === 'true') {
      console.log('SpinWheel: Already shown, not showing again');
      return;
    }

    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      console.log('SpinWheel: Resetting timer');
      clearTimeout(inactivityTimer);
      
      inactivityTimer = setTimeout(() => {
        console.log('SpinWheel: 10 seconds of inactivity, showing popup');
        setShowPopup(true);
        localStorage.setItem(STORAGE_KEY, 'true');
      }, INACTIVITY_DELAY);
    };

    // Events that indicate user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    console.log('SpinWheel: Starting initial timer');
    // Start the timer initially
    resetTimer();

    // Reset timer on user activity
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    return () => {
      console.log('SpinWheel: Cleaning up');
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, []); // Empty dependency array - only run once on mount

  const closePopup = useCallback(() => {
    console.log('SpinWheel: Closing popup');
    setShowPopup(false);
  }, []);

  return { showPopup, closePopup };
};