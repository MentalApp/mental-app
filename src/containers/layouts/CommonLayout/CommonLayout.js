import React, { useEffect } from 'react';

import CommonLayoutWrapper from './CommonLayout.styles';
import Footer from '../../../components/Footer';
import Header from './Header';
// import { checkAdminPermission } from 'utils/utils';
// import { useCurrentRoute } from 'react-navi';
// import { toastError } from 'utils/toastify';

const CommonLayout = ({ children }) => {
  // const isAdmin = checkAdminPermission();
  // const route = useCurrentRoute().url.pathname;

  // useEffect(() => {
  //   if (isAdmin) {
  //     !['/version_tests', '/account'].includes(route) && toastError('Không tìm thấy thông tin bạn yêu cầu.');
  //     return;
  //   }
  //   !['/version_tests', '/officer_tests'].includes(route) && toastError('Không tìm thấy thông tin bạn yêu cầu.');
  //   return;
  // }, [route, isAdmin]);

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
