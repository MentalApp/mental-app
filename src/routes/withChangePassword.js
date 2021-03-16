/* istanbul ignore file */

import React from 'react';

import { route, withView } from 'navi';
import { View } from 'react-navi';

import ChangePasswordPage from 'containers/ChangePasswordPage';
import CommonLayout from 'containers/layouts/CommonLayout';
import withAuth from 'routes/withAuth';
import withResource from 'routes/withResource';

const withChangePassword = (url, breadcrumb) =>
  withAuth(
    withView(
      <CommonLayout>
        <div className="container" style={{ marginBottom: 50 }}>
          <div className="row" style={{ margin: 0 }}>
            <View />
          </div>
        </div>
      </CommonLayout>,
      withResource(url, data =>
        route({
          title: 'routes.change_password_page',
          data: { breadcrumb },
          view: <ChangePasswordPage url={url} data={data} />,
        }),
      ),
    ),
  );

export default withChangePassword;
