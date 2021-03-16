import { map, redirect } from 'navi';

// eslint-disable-next-line import/no-anonymous-default-export
export default (fallbackURL, matcher) =>
  map((_, context) => {
    const { currentUser } = context;
    if (!currentUser) {
      return matcher;
    }
    return redirect(fallbackURL);
  });
