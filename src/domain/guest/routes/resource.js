import React from 'react';

import { route, withView, mount } from 'navi';
import { View } from 'react-navi';

// import {
//   QUESTION,
// } from './breadcrumb';
import JoinInPage from '../containers/JoinInPage/JoinInPage'
import Question from '../containers/Question/Question'
import Information from '../containers/Information/Information'

import withAuth from 'routes/withAuth';
import withNotAuth from 'routes/withNotAuth';

export const routes = {
  '/sign_in': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <JoinInPage /> })),
  '/question': withNotAuth('/', route({ title: 'guest.routes.resource.question', view: <Question /> })),
  '/information': withNotAuth('/', route({ title: 'guest.routes.resource.information', view: <Information /> })),
  '/': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <JoinInPage /> })),
};
