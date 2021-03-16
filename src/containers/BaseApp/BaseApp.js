import React, { Suspense, useState, useEffect } from 'react';

import { Router, NotFoundBoundary, View } from 'react-navi';

// import PageTitle from 'components/PageTitle';
// import NotFoundPage from 'containers/NotFoundPage';
// import { Provider as MessageProvider } from 'contexts/message';
// import { Provider as ModalConfirmUnSaveDataProvider } from 'contexts/modalConfirmUnSaveData';
// import { authService } from 'utils/auth.service';

function BaseApp({routes}) {
  return (
    <Router routes={routes} >
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  );
}

export default BaseApp;
