import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useCurrentRoute, useNavigation } from 'react-navi';
import Wrapper from './Header.styles';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { AlignLeft, Power, User, PenTool, Layers, Home } from 'react-feather';
import { TOKEN, CURRENT_USER } from 'utils/constants';
import { NavDropdown } from 'react-bootstrap';

// import { TOKEN } from 'utils/constants';

const Header = () => {
  const { navigate } = useNavigation();
  const activeRoute = useCurrentRoute().url.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));

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
    if (activeRoute.match('/officer_tests')) return 'Kết quả khảo sát';
    if (activeRoute.match('/version_tests')) return 'Đợt khảo sát';
    if (activeRoute.match('/profile')) return 'Thông tin tài khoản';
    if (activeRoute.match('/account')) return 'Quản lý tài khoản';
    return '';
  }, [activeRoute]);

  return (
    <Wrapper>
      <div className="header-wrapper">
        <div className="group-left">
          <AlignLeft name="burger" cursor="pointer" onClick={handleOpenSidebar} className="w-6 h-6" />
          <div className="text-title">{titleHeader}</div>
        </div>
        <NavDropdown className="user-wrapper" title={<User size={30} />}>
          <NavDropdown.Item
            className={activeRoute.match('/profile') ? 'active' : ''}
            onClick={() => navigate('/profile')}
          >
            <PenTool />
            <span>Tài khoản</span>
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              localStorage.removeItem(TOKEN);
              localStorage.removeItem(CURRENT_USER);
              navigate('/login');
              window.location.reload();
            }}
          >
            <Power name="activity" />
            <span>Đăng xuất</span>
          </NavDropdown.Item>
        </NavDropdown>
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
              (user.roleMaster.roleCategories.includes(5) || user.roleMaster.name === 'doctor') && {
                title: 'Kết quả khảo sát',
                itemId: '/officer_tests',
                elemBefore: () => <Home />,
              },
              {
                title: 'Quản lý đợt khảo sát',
                itemId: '/version_tests',
                elemBefore: () => <Layers />,
              },
              (user.roleMaster.roleCategories.includes(1) || user.roleMaster.name === 'admin') && {
                title: 'Quản lý tài khoản',
                itemId: '/account',
                elemBefore: () => <User />,
              },
            ]}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default Header;
