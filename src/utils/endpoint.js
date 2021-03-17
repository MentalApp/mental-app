import * as constants from './constants';

export const getCurrentEndpoint = () => {
  const currentDomain = window.location.hostname;

  const {
    REACT_APP_MASTER_DOMAIN,
    REACT_APP_ADMIN_DOMAIN,
    REACT_APP_GUEST_DOMAIN,
  } = process.env;

  switch (currentDomain) {
    case REACT_APP_MASTER_DOMAIN:
      return constants.MASTER_ENDPOINT;
    case REACT_APP_ADMIN_DOMAIN:
      return constants.ADMIN_ENDPOINT;
    case REACT_APP_GUEST_DOMAIN:
      return constants.GUEST_ENDPOINT;
    default:
      return constants.GUEST_ENDPOINT;
  }
};
