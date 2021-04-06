import React from 'react';

import { mount, route, withView } from 'navi';

import withNotAuth from 'routes/withNotAuth';
import Home from '../containers/Home';
import CommonLayout from 'containers/layouts/CommonLayout';
import QuestionSurvey from '../containers/QuestionSurvey';
import SignIn from '../containers/SignIn';
import VersionTest from '../containers/VersionTest';
import VersionDetail from '../containers/VersionTest/VersionDetail';
import { View } from 'react-navi';
import Detail from '../containers/Home/Detail';
import withAuth from 'routes/withAuth';
import withAuthEntryCode from 'routes/withAuthEntryCode';
import JoinInPage from '../containers/JoinInPage/JoinInPage';

import ExaminationHealth from '../containers/ExaminationHealthy';
import ThanksForSurvey from '../containers/ThanksForSurvey';
// const isValidCode = localStorage.getItem('validCode');

export const routes = {
  '/': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <JoinInPage /> })),
  '/thanks': withAuthEntryCode(route({ title: 'guest.routes.resource.sign_in', view: <ThanksForSurvey /> })),
  '/examination': withAuthEntryCode(route({ title: 'guest.routes.resource.question', view: <ExaminationHealth /> })),
  '/login': withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <SignIn /> })),
  '/home': withView(
    <CommonLayout>
      <View />
    </CommonLayout>,
    mount({
      '/': withAuth(
        route({
          view: <Home />,
        }),
      ),
      '/:id': withAuth(
        route((req) => ({
          view: <Detail id={req.params.id} />,
        })),
      ),
    }),
  ),
  '/version': withView(
    <CommonLayout>
      <View />
    </CommonLayout>,
    mount({
      '/': withNotAuth(
        '/',
        route({
          view: <VersionTest />,
        }),
      ),
      '/:id': withNotAuth(
        '/:id',
        route((req) => ({
          view: <VersionDetail id={req.params.id} />,
        })),
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
