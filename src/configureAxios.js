import axios from 'axios';
import get from 'lodash/get';

import { authService } from 'utils/auth.service';

const TIMEOUT = 65 * 1000;

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: TIMEOUT,
});

const pending = {};
const CancelToken = axios.CancelToken;

request.interceptors.request.use(function (config) {
  const token = authService.getToken();
  if (!!token) {
    /* istanbul ignore next */
    const commonHeaders = token ? JSON.parse(token) : '';
    config.headers.accessToken = commonHeaders;
  }

  return config;
});

request.interceptors.request.use(
  (config) => {
    if (config.method === 'get') {
      if (pending[config.url]) {
        pending[config.url].cancel('REQUEST_IS_CANCELLED');
      }
      const CancelTokenX = CancelToken.source();
      config.cancelToken = CancelTokenX.token;
      !config.ignoreCancel && (pending[config.url] = CancelTokenX);
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

/* istanbul ignore next */
request.interceptors.response.use(
  (response) => {
    delete pending[response.config.url];
    return response;
  },
  (error) => {
    const token = authService.getToken();
    if (token && get(error, 'response.status') === 401) {
      authService.clearStorage();
      window.location.href = '/sign_in';
      return;
    }
    return Promise.reject(error);
  },
);

export default request;
