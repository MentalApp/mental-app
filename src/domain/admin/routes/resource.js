import React from 'react';

import { route } from 'navi';

import withNotAuth from 'routes/withNotAuth';
import Home from '../containers/Home';
import CommonLayout from 'containers/layouts/CommonLayout';
import QuestionSurvey from '../containers/QuestionSurvey';
import SignIn from '../containers/SignIn';

export const routes = {
  '/sign_in': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <SignIn /> })),
  '/': withNotAuth(
    '/',
    route({
      title: 'guest.routes.resource.sign_in',
      view: (
        <CommonLayout>
          <Home />
        </CommonLayout>
      ),
    }),
  ),
  '/question': withNotAuth(
    '/',
    route({
      view: (
        <CommonLayout>
          <QuestionSurvey />
        </CommonLayout>
      ),
    }),
  ),
};
