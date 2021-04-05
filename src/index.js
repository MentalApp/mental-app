import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import '../src/common/style/mainStyle.scss';

const App = lazy(() => import(`domain/containers/App`));

ReactDOM.render(
  <Suspense fallback={null}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
