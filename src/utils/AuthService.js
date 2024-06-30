// AuthService.js
const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

export const saveTokenAndUser = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearTokenAndUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const handleTokenExpiration = () => {
  clearTokenAndUser();
};

export const getToken = () => localStorage?.getItem(TOKEN_KEY);
export const getUser = () => JSON.parse(localStorage?.getItem(USER_KEY));
export const getAPIToken = () => process.env.API_TOKEN;
