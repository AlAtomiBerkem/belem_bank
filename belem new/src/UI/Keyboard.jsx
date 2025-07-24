import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const Keyboard = ({ onInput, onClose }) => {
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  
  const overlayAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }
  });

  const layout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']
  ];

  const handleTouchStart = (key) => {
    setActiveKey(key);
  };

  const handleTouchEnd = () => {
    setActiveKey(null);
  };

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

  const buttonBaseStyle = "bg-[#618D82] text-white rounded-[18px] border-none touch-manipulation select-none [-webkit-tap-highlight-color:transparent] transition-colors duration-50";
  const buttonActiveStyle = "bg-[#f3d2ab]";

  return (
    <animated.div className="fixed inset-0 bg-black/20 flex justify-center items-end z-[9998]" style={overlayAnimation}>
      <div className="relative flex flex-col justify-center items-center w-[1139px] h-[501px] bg-[#30574D] text-[50px] font-normal leading-[41.14px] text-left font-nunito rounded-[38px] border-[5px] border-[#F4D3AD] scale-80 -mb-8 z-[9999]">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className={`flex mb-2 gap-x-[6px] ${rowIndex === 0 ? 'mt-2.5' : ''} ${rowIndex === layout.length - 1 ? 'mb-5' : ''}`}>
            {rowIndex === 0 && (
              <button 
                className={`flex items-center justify-center w-[95px] h-[86px] text-[40px] pb-2 font-semibold leading-[41.14px] font-nunito ${buttonBaseStyle} ${activeKey === 'esc' ? buttonActiveStyle : ''}`}
                onClick={onClose}
                onTouchStart={() => handleTouchStart('esc')}
                onTouchEnd={handleTouchEnd}
              >
                <img src="/keybord/esc.png" alt="Down" className="w-full h-full scale-[0.5] object-contain p-[15px]" />
              </button>
            )}
            {rowIndex === layout.length - 1 && (
              <button 
                className={`w-[95px] h-[86px] text-[50px] ${buttonBaseStyle} ${activeKey === 'shift' ? buttonActiveStyle : ''}`}
                onClick={handleShift}
                onTouchStart={() => handleTouchStart('shift')}
                onTouchEnd={handleTouchEnd}
              >
                <img src="/keybord/Shift.png" alt="Shift" className="w-full h-full scale-[0.6] object-contain p-[15px]" />
              </button>
            )}
            {row.map((char, charIndex) => (
              <button
                key={charIndex}
                className={`flex items-center justify-center w-[95px] h-[86px] text-[50px] font-semibold leading-[41.14px] font-nunito ${buttonBaseStyle} ${activeKey === char ? buttonActiveStyle : ''}`}
                onClick={() => handleClick(char)}
                onTouchStart={() => handleTouchStart(char)}
                onTouchEnd={handleTouchEnd}
              >
                {isUpperCase ? char.toUpperCase() : char}
              </button>
            ))}
            {rowIndex === layout.length - 1 && (
              <button 
                className={`w-[95px] h-[86px] text-[50px] ${buttonBaseStyle} ${activeKey === 'delete' ? buttonActiveStyle : ''}`}
                onClick={handleDelete}
                onTouchStart={() => handleTouchStart('delete')}
                onTouchEnd={handleTouchEnd}
              >
                <img src="/keybord/delete.png" alt="Delete" className="w-full h-full scale-[0.6] object-contain p-[15px]" />
              </button>
            )}
          </div>
        ))}
        <div className="flex gap-x-3">
          <button 
            className={`w-[195px] h-[86px] text-[50px] flex justify-center items-center ${buttonBaseStyle} ${activeKey === 'logo' ? buttonActiveStyle : ''}`}
            onTouchStart={() => handleTouchStart('logo')}
            onTouchEnd={handleTouchEnd}
          >
            <img src="/keybord/logo.png" alt="Logo" className="w-full h-full object-contain p-[15px]" />
          </button>
          <button 
            className={`w-[695px] h-[86px] text-[50px] ${buttonBaseStyle} ${activeKey === 'space' ? buttonActiveStyle : ''}`}
            onClick={handleSpace}
            onTouchStart={() => handleTouchStart('space')}
            onTouchEnd={handleTouchEnd}
          />
          <button 
            className={`w-[195px] h-[86px] text-[50px] font-normal font-nunito flex justify-center items-center ${buttonBaseStyle} ${activeKey === 'enter' ? buttonActiveStyle : ''}`}
            onClick={handleEnter}
            onTouchStart={() => handleTouchStart('enter')}
            onTouchEnd={handleTouchEnd}
          >
            ввод
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default Keyboard; 