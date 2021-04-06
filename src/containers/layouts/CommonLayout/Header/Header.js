import React, { useCallback, useEffect, useState } from 'react';
import { useCurrentRoute, useNavigation } from 'react-navi';
import Wrapper from './Header.styles';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { AlignLeft, Home, Power, Server, Layers } from 'react-feather';
import { authService } from 'utils/auth.service';

const Header = () => {
  const { navigate } = useNavigation();
  const activeRoute = useCurrentRoute().url.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = useCallback(() => {
    document.getElementById('overlay').style.display = 'block';
    setIsSidebarOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    document.getElementById('overlay').style.display = 'none';
    setIsSidebarOpen(false);
  }, []);

  useEffect(() => {
    document.getElementById('overlay').onclick = () => {
      document.getElementById('overlay').style.display = 'none';
      setIsSidebarOpen(false);
    };
  }, []);

  return (
    <Wrapper>
      <div>
        <button className="btn-menu" onClick={handleOpenSidebar} type="button">
          <AlignLeft name="burger" className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="side-bar-menu">
          <div className="title">
            <span>Ứng dụng khảo sát</span>
            {/* <X className="button-close" onClick={handleCloseSidebar} /> */}
          </div>

          <Navigation
            activeItemId={activeRoute}
            onSelect={({ itemId }) => {
              navigate(itemId);
              handleCloseSidebar();
            }}
            items={[
              {
                title: 'Trang chủ',
                itemId: '/home',
                elemBefore: () => <Home />,
              },
              {
                title: 'Quản lý đợt khảo sát',
                itemId: '/version',
                elemBefore: () => <Layers />,
              },
            ]}
          />

          <div className="settings">
            <Navigation
              activeItemId={activeRoute}
              items={[
                {
                  title: 'Đăng xuất',
                  itemId: '/login',
                  elemBefore: () => <Power name="activity" />,
                },
              ]}
              onSelect={({ itemId }) => {
                navigate(itemId);
                authService.logout();
                handleCloseSidebar();
              }}
            />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Header;
