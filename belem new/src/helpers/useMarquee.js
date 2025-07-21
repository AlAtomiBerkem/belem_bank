import { useEffect, useRef } from 'react';

export const useMarquee = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);


  const checkAndAnimate = () => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;


    text.style.animation = '';
    text.style.removeProperty('--marquee-distance');


    requestAnimationFrame(() => {
      if (text.scrollWidth > container.clientWidth + 1) {
        const distance = text.scrollWidth - container.clientWidth;
        text.style.setProperty('--marquee-distance', `${distance}px`);
        const duration = 30; // секунд (было 14)
        text.style.animation = `marquee-alternate ${duration}s linear infinite alternate`;
      }
    });
  };

  useEffect(() => {
    checkAndAnimate();
    window.addEventListener('resize', checkAndAnimate);
    return () => {
      window.removeEventListener('resize', checkAndAnimate);
      const text = textRef.current;
      if (text) {
        text.style.animation = '';
        text.style.removeProperty('--marquee-distance');
      }
    };
  }, []);

  return [containerRef, textRef];
};