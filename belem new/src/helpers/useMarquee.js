import { useEffect, useRef } from 'react';

export const useMarquee = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const distance = text.scrollWidth - container.clientWidth;
    if (distance > 0) {
      text.style.setProperty('--marquee-distance', `${distance}px`);
      const duration = 14; // секунд
      text.style.animation = `marquee-alternate ${duration}s linear infinite alternate`;
    }

    return () => {
      if (text) {
        text.style.animation = '';
        text.style.removeProperty('--marquee-distance');
      }
    };
  }, []);

  return [containerRef, textRef];
};