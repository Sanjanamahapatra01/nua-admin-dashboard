
import Keycloak from 'keycloak-js';

const keycloakConfig = {
    realm: 'admin-dashboard',
    url: 'http://localhost:8080',
    clientId: 'admin-dashboard'
};

const keycloak = new Keycloak(keycloakConfig);

const initKeycloak = async () => {
  try {
    await keycloak.init({ onLoad: 'login-required' });
    console.log('Keycloak initialized');
    return true; 
  } catch (error) {
    console.error('Keycloak initialization failed:', error);
    return false;
  }
};

const login = () => {
  keycloak.login();
};

const logout = () => {
  keycloak.logout();
};

const getToken = async () => {
  try {
    await keycloak.updateToken();
    return keycloak.token;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
};

const isAuthenticated = () => {
    return keycloak.authenticated !== undefined && keycloak.authenticated;
};

const onAuthSuccess = (callback) => {
  keycloak.onAuthSuccess = callback;
};

const onAuthError = (callback) => {
  keycloak.onAuthError = callback;
};

export {
  initKeycloak,
  login,
  logout,
  getToken,
  isAuthenticated,
  onAuthSuccess,
  onAuthError
};
