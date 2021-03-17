import { CURRENT_USER, TOKEN } from './constants';

export const authService = {
  init() {
    try {
      const storeToken = this.getToken();
      if (!storeToken) throw new Error();

      const storeData = window.localStorage.getItem(CURRENT_USER);
      this.currentUser = storeData && JSON.parse(storeData);
    } catch (e) {
      this.currentUser = undefined;
    }
  },
  login({ currentUser, token, isRememberMe = false, isCheckingStaffRole = false }) {
    window.localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));
    const today = new Date();
    token.expiry = isRememberMe ? token.expiry : today.setDate(today.getDate() + 1) / 1000;
    window.localStorage.setItem(TOKEN, JSON.stringify(token));
    this.currentUser = currentUser;
    if (this.callback) {
      // staff will reload page so no need callback
      if (!!isCheckingStaffRole) {
        return;
      }

      this.callback(currentUser);
    }
  },
  getToken() {
    const token = window.localStorage.getItem(TOKEN);
    // token not exists
    if (!token) {
      this.clearStorage();
      return undefined;
    }

    const tokenDecode = JSON.parse(token);

    var current_time = new Date().getTime() / 1000;
    // token expired
    if (current_time > tokenDecode.expiry) {
      this.clearStorage();
      return undefined;
    }
    return token;
  },
  getCurrentUser() {
    if (this.currentUser) return this.currentUser;

    const storeData = window.localStorage.getItem(CURRENT_USER);
    return JSON.parse(storeData);
  },
  setCurrentUser(currentUser) {
    const oldToken = JSON.parse(window.localStorage.getItem('token'));
    window.localStorage.setItem(TOKEN, JSON.stringify({ ...oldToken, uid: currentUser.uid }));

    // avoid re-update id
    const id = this.currentUser ? { id: this.currentUser.id } : {};

    const currentUserUpdate = { ...currentUser, ...id };

    window.localStorage.setItem(CURRENT_USER, JSON.stringify(currentUserUpdate));
    this.currentUser = currentUserUpdate;
    if (this.callback) {
      this.callback(currentUserUpdate);
    }
  },
  logout() {
    delete this.currentUser;
    this.clearStorage();

    if (this.callback) {
      this.callback(undefined);
    }
  },
  clearStorage() {
    window.localStorage.clear();
  },
  subscribe(callback) {
    this.callback = callback;
    return () => {
      this.callback = undefined;
    };
  },
};
