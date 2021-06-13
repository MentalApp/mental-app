import { Home, Layers, User } from 'react-feather';

export const listItemAdmin = [
  {
    title: 'Quản lý đợt khảo sát',
    itemId: '/version_tests',
    elemBefore: () => <Layers />,
  },
  {
    title: 'Quản lý tài khoản',
    itemId: '/account',
    elemBefore: () => <User />,
  },
];

export const listItemDoctor = [
  {
    title: 'Kết quả khảo sát',
    itemId: '/officer_tests',
    elemBefore: () => <Home />,
  },
  {
    title: 'Quản lý đợt khảo sát',
    itemId: '/version_tests',
    elemBefore: () => <Layers />,
  },
];
