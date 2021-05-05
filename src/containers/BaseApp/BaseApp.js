import NotFound from 'domain/containers/NotFound';
import React, { Suspense } from 'react';

import { NotFoundBoundary, Router, View } from 'react-navi';

// import PageTitle from 'components/PageTitle';
// import NotFoundPage from 'containers/NotFoundPage';
// import { Provider as MessageProvider } from 'contexts/message';
// import { Provider as ModalConfirmUnSaveDataProvider } from 'contexts/modalConfirmUnSaveData';
// import { authService } from 'utils/auth.service';

function BaseApp({ routes }) {
  return (
    <Router routes={routes}>
      <NotFoundBoundary render={() => <NotFound />}>
        <Suspense fallback={null}>
          <View />
        </Suspense>
      </NotFoundBoundary>
    </Router>
  );
}

export default BaseApp;
