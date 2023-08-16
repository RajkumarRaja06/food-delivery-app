import React, { useState, useEffect } from 'react';
import { MobileHeader, ComputerHeader } from '.';

const HeaderContainer = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 768;

  React.useEffect(() => {
    const handleViewSize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleViewSize);
  }, []);

  return breakpoint > width ? <MobileHeader /> : <ComputerHeader />;
};

export default HeaderContainer;
