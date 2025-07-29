import React, { useRef, useState, useEffect } from 'react';

const CustomScrollbar = ({
  children,
  height = 600,
  thumbHeight = 150,
  className = '',
  style = {},
  contentWidth = 256,
  hideFade = false,
  scrollbarColor,
}) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startThumbTop, setStartThumbTop] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [showFade, setShowFade] = useState(false);

  const syncThumb = () => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const ratio = scroll.scrollTop / (scroll.scrollHeight - scroll.clientHeight);
    setThumbTop(ratio * (height - thumbHeight));
  };

  const onDrag = (clientY) => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const deltaY = clientY - startY;
    const maxThumbTop = height - thumbHeight;
    let newThumbTop = Math.min(Math.max(startThumbTop + deltaY, 0), maxThumbTop);
    setThumbTop(newThumbTop);
    const ratio = newThumbTop / maxThumbTop;
    scroll.scrollTop = ratio * (scroll.scrollHeight - scroll.clientHeight);
  };

  // Проверка на необходимость fade
  const checkFade = () => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    setShowFade(scroll.scrollHeight > scroll.clientHeight + 1);
  };

  useEffect(() => {
    checkFade();
    const handleResize = () => checkFade();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging) return;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      onDrag(clientY);
    };
    const onUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('touchend', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, startY, startThumbTop]);

  const onScroll = () => {
    syncThumb();
    checkFade();
  };

  useEffect(() => {
    syncThumb();
  }, []);

  return (
    <div className={` scale-[1.4] mt-18 flex flex-row ${className}`} style={style}>
      <div
        style={{
          width: 5,
          height,
          background: 'rgba(120,150,140,0.4)',
          borderRadius: 12,
          marginRight: 12,
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            width: 17,
            height: thumbHeight,
            background: scrollbarColor || '#c7d7d3',
            borderRadius: 8,
            position: 'absolute',
            left: -6,
            top: thumbTop,
            cursor: 'pointer',
            touchAction: 'none',
          }}
          onMouseDown={e => {
            setIsDragging(true);
            setStartY(e.clientY);
            setStartThumbTop(thumbTop);
          }}
          onTouchStart={e => {
            setIsDragging(true);
            setStartY(e.touches[0].clientY);
            setStartThumbTop(thumbTop);
          }}
        />
      </div>
      <div style={{ position: 'relative', height, width: contentWidth }}>
        <div
          ref={scrollRef}
          className="overflow-auto"
          style={{
            height,
            width: contentWidth,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            overflowY: 'auto',
            touchAction: 'pan-y',
          }}
          onScroll={onScroll}
        >
          {children}
        </div>
        {showFade && !hideFade && (
          <div
            className="pointer-events-none absolute left-0 bottom-0 w-full"
            style={{
              height: '50%',
              background: 'linear-gradient(to top, #2F574C, transparent 99%)'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CustomScrollbar; 