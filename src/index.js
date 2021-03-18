import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import '../src/common/style/mainStyle.scss';

const domain = (() => {
  const currentDomain = window.location.hostname;
  
  const {
    REACT_APP_MASTER_DOMAIN,
    REACT_APP_ADMIN_DOMAIN,
    REACT_APP_GUEST_DOMAIN,
  } = process.env;

  switch (currentDomain) {
    case REACT_APP_MASTER_DOMAIN:
      return 'master';
    case REACT_APP_ADMIN_DOMAIN:
      return 'admin';
    case REACT_APP_GUEST_DOMAIN:
      return 'guest';
    default:
      return 'guest';
  }
})();

const App = lazy(() => import(`domain/${domain}/containers/App`));

ReactDOM.render(
  <Suspense fallback={null}>
    <App />
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
