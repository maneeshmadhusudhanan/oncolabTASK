import React from 'react';

const AnimatedHeading = ({ children, className = '' }) => {
  return (
    <h1 className={'text-4xl md:text-5xl font-bold text-gray-900 animate-slide-in' + (className ? ' ' + className : '')}>
      {children}
    </h1>
  );
};

export default AnimatedHeading;
