import React from 'react';

import { route } from 'navi';

import withNotAuth from 'routes/withNotAuth';
import ListPage from '../containers/ListPage/ListPage';

export const routes = {
  '/': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <ListPage /> })),
};
