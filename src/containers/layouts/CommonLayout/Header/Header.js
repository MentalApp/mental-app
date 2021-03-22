import React, { useCallback } from 'react';
import { useCurrentRoute, useNavigation } from 'react-navi';
import Wrapper from './Header.styles';

const Header = () => {
  const { navigate } = useNavigation();
  const activeRoute = useCurrentRoute().url.pathname;

  return (
    <Wrapper>
      <div onClick={() => navigate('/')} className={`item-header ${activeRoute === '/' ? 'active' : ''}`}>
        Trang chủ
      </div>
      <div
        onClick={() => navigate('/question')}
        className={`item-header ${activeRoute === '/question' ? 'active' : ''}`}
      >
        Câu hỏi khảo sát
      </div>
    </Wrapper>
  );
};

export default Header;
