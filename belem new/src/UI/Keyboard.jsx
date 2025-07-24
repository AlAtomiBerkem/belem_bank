import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const Keyboard = ({ onInput, onClose }) => {
  const [isUpperCase, setIsUpperCase] = useState(false);
  
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
    <animated.div className="fixed inset-0 bg-black/25 flex justify-center items-end z-[9998]" style={overlayAnimation}>
      <div className="relative flex flex-col justify-center items-center w-[1139px] h-[501px] bg-[#30574D] text-[50px] font-normal leading-[41.14px] text-left font-nunito rounded-[38px] border-[5px] border-[#F4D3AD] scale-80 mb-5 z-[9999]">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className={`flex mb-2 gap-x-[6px]  ${rowIndex === 0 ? 'mt-2.5' : ''} ${rowIndex === layout.length - 1 ? 'mb-5' : ''}`}>
            {rowIndex === 0 && (
              <button className="flex items-center justify-center bg-[#618D82] text-white w-[95px] h-[86px] rounded-[18px] text-[40px] pb-2 font-semibold leading-[41.14px] font-nunito border-none active:bg-[#f3d2ab]" onClick={onClose}>
                ↓
              </button>
            )}
            {rowIndex === layout.length - 1 && (
              <button className="bg-[#618D82] text-white w-[95px] h-[86px] rounded-[18px] text-[50px] border-none" onClick={handleShift}>
                <img src="/keybord/Shift.png" alt="Shift" className="w-full h-full object-contain p-[15px]" />
              </button>
            )}
            {row.map((char, charIndex) => (
              <button
                key={charIndex}
                className="flex items-center justify-center bg-[#618D82] text-white w-[95px] h-[86px] rounded-[18px] text-[50px] font-semibold leading-[41.14px] font-nunito border-none active:bg-[#f3d2ab]"
                onClick={() => handleClick(char)}
              >
                {isUpperCase ? char.toUpperCase() : char}
              </button>
            ))}
            {rowIndex === layout.length - 1 && (
              <button className="bg-[#618D82] text-white w-[95px] h-[86px] rounded-[18px] text-[50px] border-none" onClick={handleDelete}>
                ←
              </button>
            )}
          </div>
        ))}
        <div className="flex gap-x-3">
          <button className="bg-[#618D82] text-white w-[195px] h-[86px] rounded-[18px] text-[50px] flex justify-center items-center border-none">
            <img src="/keybord/logo.png" alt="Logo" className="w-full h-full object-contain p-[15px]" />
          </button>
          <button className="bg-[#618D82] text-white w-[695px] h-[86px] rounded-[18px] text-[50px] border-none" onClick={handleSpace}></button>
          <button className="bg-[#618D82] text-white w-[195px] h-[86px] rounded-[18px] text-[50px] font-normal font-nunito flex justify-center items-center border-none" onClick={handleEnter}>
            ввод
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default Keyboard; 