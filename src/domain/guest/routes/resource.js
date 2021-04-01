import React from 'react';

import { route } from 'navi';

// import {
//   QUESTION,
// } from './breadcrumb';
import JoinInPage from '../containers/JoinInPage/JoinInPage';

import withNotAuth from 'routes/withNotAuth';
import ExaminationHealth from '../containers/ExaminationHealthy';
import ThanksForSurvey from '../containers/ThanksForSurvey';
import withAuth from 'routes/withAuth';
// const isValidCode = localStorage.getItem('validCode');

export const routes = {
  '/thanks': withAuth(route({ title: 'guest.routes.resource.sign_in', view: <ThanksForSurvey /> })),
  '/examination': withAuth(route({ title: 'guest.routes.resource.question', view: <ExaminationHealth /> })),
  '/': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <JoinInPage /> })),
};
