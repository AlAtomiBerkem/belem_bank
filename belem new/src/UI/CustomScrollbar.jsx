import React, { useRef, useState, useEffect } from 'react';

const CustomScrollbar = ({
  children,
  height = 600,
  thumbHeight = 150,
  className = '',
  style = {},
  contentWidth = 256,
}) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startThumbTop, setStartThumbTop] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);


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

  const onScroll = () => syncThumb();

  useEffect(() => {
    syncThumb();
  }, []);

  return (
    <div className={`flex flex-row ${className}`} style={style}>
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
            background: '#c7d7d3',
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
      <div
        ref={scrollRef}
        className="overflow-auto"
        style={{
          height,
          width: contentWidth,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onScroll={onScroll}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomScrollbar; 