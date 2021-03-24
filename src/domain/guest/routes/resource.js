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
import ThanksForSurvey from '../containers/ThanksForSurvey';

export const routes = {
  '/thanks': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <ThanksForSurvey /> })),
  '/examination': withNotAuth('/', route({ title: 'guest.routes.resource.question', view: <ExaminationHealth /> })),
  '/': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <JoinInPage /> })),
};
