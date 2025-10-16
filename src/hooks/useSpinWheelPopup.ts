import { useState } from 'react';

const STORAGE_KEY = 'spinWheelShown';

export const useSpinWheelPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasSpun, setHasSpun] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'true';
  });

  const openPopup = () => {
    console.log('SpinWheel: Opening popup manually');
    setShowPopup(true);
  };

  const closePopup = () => {
    console.log('SpinWheel: Closing popup');
    setShowPopup(false);
    setHasSpun(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  return { showPopup, closePopup, openPopup, hasSpun };
};