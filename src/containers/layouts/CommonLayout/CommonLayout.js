import React from 'react';

import CommonLayoutWrapper from './CommonLayout.styles';
import Footer from '../../../components/Footer';
import Header from './Header';

const CommonLayout = ({ children }) => {
  return (
    <CommonLayoutWrapper>
      <Header />
      <div id="overlay"></div>
      <div className="children">{children}</div>
      <Footer />
    </CommonLayoutWrapper>
  );
};

export default CommonLayout;
