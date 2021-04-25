import React from 'react';

import { mount, route, withView } from 'navi';

import withNotAuth from 'middleware/withNotAuth';
import OldHome from '../containers/OldHome';
import Home from '../containers/Home';
import CommonLayout from 'containers/layouts/CommonLayout';
// import QuestionSurvey from '../containers/QuestionSurvey';
import SignIn from '../containers/SignIn';
import VersionTest from '../containers/VersionTest';
import VersionDetail from '../containers/VersionTest/VersionDetail';
import { View } from 'react-navi';
import OldDetail from '../containers/OldHome/Detail';
import Detail from '../containers/Home/Detail';
import withAuth from 'middleware/withAuth';
import withAuthEntryCode from 'middleware/withAuthEntryCode';
import JoinInPage from '../containers/JoinInPage/JoinInPage';

import ExaminationHealth from '../containers/ExaminationHealthy';
import ThanksForSurvey from '../containers/ThanksForSurvey';
import Profile from '../containers/Profile/Profile';
import Account from '../containers/Account/Account';
import AccountDetail from '../containers/Account/AccountDetail';
import { authService } from 'utils/auth.service';

export const routes = {
  '/': !authService.getEntryCodeToken()
    ? withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <JoinInPage /> }))
    : withAuthEntryCode(route({ title: 'guest.routes.resource.question', view: <ExaminationHealth /> })),
  '/thanks': withAuthEntryCode(route({ title: 'guest.routes.resource.sign_in', view: <ThanksForSurvey /> })),
  '/examination': withAuthEntryCode(route({ title: 'guest.routes.resource.question', view: <ExaminationHealth /> })),
  '/login': !authService.getToken()
    ? withNotAuth('/', route({ title: 'guest.routes.resource.sign_in', view: <SignIn /> }))
    : withAuth(route({ view: <Home /> })),
  '/home': withView(
    <CommonLayout>
      <View />
    </CommonLayout>,
    mount({
      '/': withAuth(
        route({
          view: <VersionTest />,
        }),
      ),
      '/:id': withAuth(
        route((req) => ({
          view: <VersionDetail id={req.params.id} />,
        })),
      ),
    }),
  ),
  '/profile': withView(
    <CommonLayout>
      <View />
    </CommonLayout>,
    mount({
      '/': withAuth(
        route(() => ({
          view: <Profile />,
        })),
      ),
    }),
  ),
  '/account': withView(
    <CommonLayout>
      <View />
    </CommonLayout>,
    mount({
      '/': withAuth(
        route({
          view: <Account />,
        }),
      ),
      '/:id': withAuth(
        route((req) => ({
          view: <AccountDetail id={req.params.id} />,
        })),
      ),
    }),
  ),
  // '/question': withNotAuth(
  //   '/',
  //   route({
  //     view: (
  //       <CommonLayout>
  //         <QuestionSurvey />
  //       </CommonLayout>
  //     ),
  //   }),
  // ),
};
