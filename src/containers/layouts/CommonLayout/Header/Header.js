import React from 'react';
import { useCurrentRoute, useNavigation } from 'react-navi';
import Wrapper from './Header.styles';

const Header = () => {
  const { navigate } = useNavigation();
  const activeRoute = useCurrentRoute().url.pathname;

  return (
    <Wrapper>
      <div onClick={() => navigate('/home')} className={`item-header ${activeRoute.includes('/home') ? 'active' : ''}`}>
        Trang chủ
      </div>
      <div
        onClick={() => navigate('/question')}
        className={`item-header ${activeRoute.includes('/question') ? 'active' : ''}`}
      >
        Câu hỏi khảo sát
      </div>
    </Wrapper>
  );
};

export default Header;
