import React from 'react';
import CustomScrollbar from '../UI/CustomScrollbar.jsx';

const SCROLLBAR_THRESHOLD = 7; 

const AutoScrollbar = ({ children, itemCount, height = 500, contentWidth = 980, ...props }) => {
  const compact = itemCount <= SCROLLBAR_THRESHOLD;
  if (!compact) {
    return (
      <CustomScrollbar height={height} contentWidth={contentWidth} {...props}>
        {typeof children === 'function' ? children({ compact: false }) : children}
      </CustomScrollbar>
    );
  }
  return typeof children === 'function'
    ? children({ compact: true })
    : <div>{children}</div>;
};

export default AutoScrollbar; 