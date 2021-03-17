import React from 'react';

import { route, withView, mount } from 'navi';
import { View } from 'react-navi';

// import {
//   QUIZ,
// } from './breadcrumb';
import JoinInPage from '../containers/JoinInPage/JoinInPage'
import Quiz from '../containers/Quiz/Quiz'
import Information from '../containers/Information/Information'

import withNotAuth from 'routes/withNotAuth';

export const routes = {
  '/join_in': withNotAuth('/', route({ title: 'guest.routes.resource.join_in', view: <JoinInPage /> })),
  '/quiz': withNotAuth('/', route({ title: 'guest.routes.resource.quiz', view: <Quiz /> })),
  '/information': withNotAuth('/', route({ title: 'guest.routes.resource.information', view: <Information /> })),
  '/': withNotAuth('/', route({ title: 'guest.routes.resource.join_in', view: <JoinInPage /> })),
};
