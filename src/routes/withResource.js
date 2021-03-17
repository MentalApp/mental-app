import { map } from 'navi';

import api from 'configureAxios';

// eslint-disable-next-line import/no-anonymous-default-export
export default (url, matcher) =>
  map(async req => {
    let id = req.params.id;
    try {
      const { data } = await api.get(`${url}/${id}`);
      return matcher(data.data);
    } catch (e) {
      return matcher({});
    }
  });
