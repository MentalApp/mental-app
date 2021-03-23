import React from 'react';

import { route, withView, mount } from 'navi';
import { View } from 'react-navi';

// import {
//   QUESTION,
// } from './breadcrumb';
import JoinInPage from '../containers/JoinInPage/JoinInPage';

import withAuth from 'routes/withAuth';
import withNotAuth from 'routes/withNotAuth';
import ExaminationHealth from '../containers/ExaminationHealthy';

export const routes = {
  '/sign_in': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <JoinInPage /> })),
  '/examination': withNotAuth('/', route({ title: 'guest.routes.resource.question', view: <ExaminationHealth /> })),
  '/': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <JoinInPage /> })),
};
