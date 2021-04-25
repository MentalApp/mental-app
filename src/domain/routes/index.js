import { mount } from 'navi';
import { authService } from 'utils/auth.service';

import { routes as routesAdmin } from './resourceAdmin';
import { routes as routesDoctor } from './resourceDoctor';
const currentUser = authService.getCurrentUser();

let routes;
if (currentUser.role === 'admin') routes = routesAdmin;
else routes = routesDoctor;

export default mount({
  '*': mount(routes),
});
