/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';

function isMovilDetector() {
  const isWindow = typeof window === 'object';
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    handleWindow();
  }, []);

  function handleWindow() {
    if (!isWindow) return false;

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }

  function handleResize() {
    setWindowSize(getSize());
  }

  function getSize() {
    const width = isWindow ? window.innerWidth : undefined;
    if (width >= 768) {
      return false;
    }
    if (width < 767) {
      return true;
    }
    return undefined;
  }

  return windowSize;
}

export default isMovilDetector;
