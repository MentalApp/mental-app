import React from 'react';

import { route } from 'navi';

// import {
//   QUESTION,
// } from './breadcrumb';
import JoinInPage from '../containers/JoinInPage/JoinInPage';

import withNotAuth from 'routes/withNotAuth';
import ExaminationHealth from '../containers/ExaminationHealthy';
import ThanksForSurvey from '../containers/ThanksForSurvey';
// const isValidCode = localStorage.getItem('validCode');

export const routes = {
  '/thanks': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <ThanksForSurvey /> })),
  '/examination': withNotAuth('/', route({ title: 'guest.routes.resource.question', view: <ExaminationHealth /> })),
  '/': withNotAuth(
    '/',
    localStorage.getItem('validCode')
      ? route({ title: 'guest.routes.resource.question', view: <ExaminationHealth /> })
      : route({ title: 'guest.routes.resource.sign_in', view: <JoinInPage /> }),
  ),
};
