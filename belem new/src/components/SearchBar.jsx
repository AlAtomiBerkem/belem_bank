import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import Keyboard from '../UI/Keyboard';

export const SearchBar = ({ onSearch }) => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const transitions = useTransition(showKeyboard, {
    from: { bottom: '-600px' },
    enter: { bottom: '0px' },
    leave: { bottom: '-600px' },
    config: { tension: 280, friction: 24 }
  });

  useEffect(() => {
    onSearch?.(searchValue.toLowerCase());
  }, [searchValue, onSearch]);

  const handleInput = (char) => {
    if (char === 'BACKSPACE') {
      setSearchValue(prev => prev.slice(0, -1));
    } else {
      setSearchValue(prev => prev + char);
    }
  };

  const handleFocus = () => {
    setShowKeyboard(true);
  };

  const handleClose = () => {
    setShowKeyboard(false);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Поиск"
        value={searchValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        className="w-[307px] h-[41px] rounded-[99px] border-[4px] border-[#C7D7D6] pl-4 text-white text-[48px] font-normal focus:outline-none placeholder-white placeholder-opacity-90 placeholder:text-[22px] placeholder:pl-2 placeholder:translate-y-[3px] bg-transparent"
      />
      {transitions((style, item) =>
        item && (
          <animated.div style={{ position: 'fixed', left: 0, right: 0, zIndex: 9999, ...style }}>
            <Keyboard 
              onInput={handleInput}
              onClose={handleClose}
            />
          </animated.div>
        )
      )}
    </div>
  );
};

export default SearchBar;