import React, { useState } from 'react';

const Keyboard = ({ onInput, onClose }) => {
  const [isUpperCase, setIsUpperCase] = useState(false);
  
  const layout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']
  ];

  const handleClick = (char) => {
    onInput(isUpperCase ? char.toUpperCase() : char);
  };

  const handleDelete = () => {
    onInput('BACKSPACE');
  };

  const handleSpace = () => {
    onInput(' ');
  };

  const handleShift = () => {
    setIsUpperCase(!isUpperCase);
  };

  const handleEnter = () => {
    onClose();
  };

  return (
    <div className="keyboard-overlay">
      <div className="keyboard">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className={`row ${rowIndex === 0 ? 'rowStart' : ''} ${rowIndex === layout.length - 1 ? 'rowend' : ''}`}>
            {rowIndex === 0 && <button className="btn down-arrow" onClick={onClose}>↓</button>}
            {rowIndex === layout.length - 1 && (
              <button className="shift" onClick={handleShift}>
                <img src="/keybord/Shift.png" alt="Shift" className="w-full h-full object-contain" />
              </button>
            )}
            {row.map((char, charIndex) => (
              <button
                key={charIndex}
                className="btn"
                onClick={() => handleClick(char)}
              >
                {isUpperCase ? char.toUpperCase() : char}
              </button>
            ))}
            {rowIndex === layout.length - 1 && <button className="delete" onClick={handleDelete}>←</button>}
          </div>
        ))}
        <div className="row">
          <button className="logoKey">
            <img src="/keybord/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </button>
          <button className="space" onClick={handleSpace}></button>
          <button className="enter" onClick={handleEnter}>
            ввод
          </button>
        </div>
      </div>
    </div>
  );
};

export default Keyboard; 