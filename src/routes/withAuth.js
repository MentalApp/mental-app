import { map, redirect } from 'navi';

// eslint-disable-next-line import/no-anonymous-default-export
export default matcher =>
  map((_, context) => {
    const valid = context.currentUser;

    // TODO: handle check authenticate user
    if (valid) {
      return matcher;
    }

    return redirect('/sign_in');
  });
