import { mount } from 'navi';

import { routes } from './resource';

export default mount({
  '*': mount(routes),
});
