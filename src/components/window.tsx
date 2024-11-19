"use client"
import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Define a function to handle the resize event
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Set the initial width
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;
