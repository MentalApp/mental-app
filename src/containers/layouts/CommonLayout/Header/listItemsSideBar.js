import { Home, Layers, User } from 'react-feather';

export const listItemAdmin = [
  {
    title: 'Quản lý đợt khảo sát',
    itemId: '/home',
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
    itemId: '/home',
    elemBefore: () => <Home />,
  },
  {
    title: 'Quản lý đợt khảo sát',
    itemId: '/version',
    elemBefore: () => <Layers />,
  },
];
