// src/services/tokenService.js

const TOKEN_KEY = 'access_token';

// Get the token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Set the token in localStorage
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Remove the token from localStorage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
