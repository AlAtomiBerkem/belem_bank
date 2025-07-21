import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const INACTIVITY_TIME = 2 * 60 * 1000;

export const useInactivityRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const timer = useRef();

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        if (location.pathname !== '/') {
          navigate('/');
        }
      }, INACTIVITY_TIME);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timer.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [navigate, location]);
}; 