import { useState } from 'react';

export const useSpinWheelPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    console.log('SpinWheel: Opening popup');
    setShowPopup(true);
  };

  const closePopup = () => {
    console.log('SpinWheel: Closing popup');
    setShowPopup(false);
  };

  return { showPopup, closePopup, openPopup };
};