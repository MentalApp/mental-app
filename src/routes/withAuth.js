import { map, redirect } from 'navi';
import { authService } from 'utils/auth.service';

// eslint-disable-next-line import/no-anonymous-default-export
export default (matcher) =>
  map(() => {
    const valid = authService.getToken();

    // TODO: handle check authenticate user
    if (valid) {
      return matcher;
    }

    return redirect('/');
  });
