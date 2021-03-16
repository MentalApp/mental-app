import React from 'react';

import { route, withView, mount } from 'navi';
import { View } from 'react-navi';

import {
  QUIZ,
} from './breadcrumb';
import JoinInPage from '../containers/JoinInPage/JoinInPage'

import withNotAuth from 'routes/withNotAuth';

export const routes = {
  '/join_in': withNotAuth('/', route({ title: 'guest.routes.resource.join_in', view: <JoinInPage /> })),
  '/quiz': withNotAuth('/', route({ title: 'guest.routes.resource.quiz', view: <JoinInPage /> })),
  '/': withNotAuth('/', route({ title: 'guest.routes.resource.join_in', view: <JoinInPage /> })),
};
