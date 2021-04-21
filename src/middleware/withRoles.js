import { map, redirect } from 'navi';

// eslint-disable-next-line import/no-anonymous-default-export
export default (role, fallbackURL, matcher) =>
  map((_, context) => {
    const { currentUser } = context;

    if (!currentUser) {
      return redirect('/sign_in');
    }

    if (currentUser.role !== role) {
      return redirect(fallbackURL);
    }

    return matcher;
  });
