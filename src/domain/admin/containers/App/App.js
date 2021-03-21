import React from 'react';

import BaseApp from 'containers/BaseApp';
import routes from 'domain/admin/routes';

const App = () => {
  return <BaseApp routes={routes} />;
};

export default App;
