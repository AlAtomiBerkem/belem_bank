import React, { useState } from 'react';
import Keyboard from '../UI/Keyboard';
import '../UI/Keyboard.css';

export const SearchBar = () => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [searchValue, setSearchValue] = useState('');

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

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Поиск"
        value={searchValue}
        onFocus={handleFocus}
        className="w-[307px] h-[41px] rounded-[99px] border-[4px] border-[#C7D7D6] pl-4 text-white text-[48px] font-normal focus:outline-none placeholder-white placeholder-opacity-90 placeholder:text-[22px] placeholder:pl-2 placeholder:translate-y-[3px]"
      />
      {showKeyboard && (
        <Keyboard 
          onInput={handleInput}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default SearchBar;