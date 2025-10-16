import { useState, useEffect } from 'react';

const STORAGE_KEY = 'spinWheelShown';

export const useSpinWheelPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  useEffect(() => {
    // Check if user has spun before
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      console.log('SpinWheel: User has already spun the wheel');
      setHasSpun(true);
    } else {
      console.log('SpinWheel: User has not spun yet');
    }
  }, []);

  const openPopup = () => {
    console.log('SpinWheel: Opening popup manually');
    setShowPopup(true);
  };

  const closePopup = () => {
    console.log('SpinWheel: Closing popup');
    setShowPopup(false);
  };

  const markAsSpun = () => {
    console.log('SpinWheel: Marking as spun');
    setHasSpun(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  return { showPopup, closePopup, openPopup, hasSpun, markAsSpun };
};