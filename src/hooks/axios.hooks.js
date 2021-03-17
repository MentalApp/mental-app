import { useState, useEffect, useMemo, useCallback } from 'react';

import qs from 'qs';

import api from 'configureAxios';

export const useQuery = ({ url, params = {}, skip = false, ignoreCancel = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [errors, setErrors] = useState(null);
  const [forceRequest, setForceRequest] = useState(false);
  const extractParams = useMemo(() => JSON.stringify(params), [params]);

  useEffect(() => {
    if (!!skip) {
      return;
    }

    setLoading(true);

    const params = JSON.parse(extractParams);
    api({
      url,
      method: 'GET',
      params,
      ignoreCancel,
      paramsSerializer: /* istanbul ignore next */ params => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    })
      .then(response => {
        if (response.status === 200) {
          setData(response.data);
        }
        setErrors(null);
        setLoading(false);
      })
      .catch(error => {
        const message = error?.message;
        if (message !== 'REQUEST_IS_CANCELLED') {
          setErrors(error);
          setData(null);
          setLoading(false);
        }
      });
  }, [extractParams, url, forceRequest, skip, ignoreCancel]);

  const force = useCallback(() => {
    setForceRequest({});
  }, []);

  return { loading, data, errors, force };
};

export const useMutation = ({ url, method = 'POST' }) => {
  const mutate = useCallback(
    async data => {
      const dataRequest = data ? data : null;
      return api[method.toLocaleLowerCase()](url, dataRequest);
    },
    [method, url],
  );

  return [mutate];
};
