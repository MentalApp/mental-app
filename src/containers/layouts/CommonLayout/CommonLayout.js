import React from 'react';

import CommonLayoutWrapper from './CommonLayout.styles';
import Header from './Header';

const CommonLayout = ({ children }) => {
  return (
    <CommonLayoutWrapper>
      <Header />
      <div id="overlay"></div>
      {children}
    </CommonLayoutWrapper>
  );
};

export default CommonLayout;
