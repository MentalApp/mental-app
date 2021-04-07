import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import './index.css';
import { Router } from 'react-router-dom';
import '../src/common/style/mainStyle.scss';
import 'assets/scss/paper-dashboard.scss?v=1.2.0';

const App = lazy(() => import(`domain/containers/App`));

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
