import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useCurrentRoute, useNavigation } from 'react-navi';
import Wrapper from './Header.styles';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { AlignLeft, Home, Power, Layers, User } from 'react-feather';
import { TOKEN } from 'utils/constants';

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

  const titleHeader = useMemo(() => {
    if (activeRoute.match('/home')) return 'Kết quả các bài khảo sát';
    if (activeRoute.match('/version')) return 'Đợt khảo sát';
    return '';
  }, [activeRoute]);

  return (
    <Wrapper>
      <div className="header-wrapper">
        <div className="group-left">
          <AlignLeft name="burger" cursor="pointer" onClick={handleOpenSidebar} className="w-6 h-6" />
          <div className="text-title">{titleHeader}</div>
        </div>
        <div className="user-wrapper">
          <User />
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="side-bar-menu" id="sidebar">
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
                localStorage.removeItem(TOKEN);
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
