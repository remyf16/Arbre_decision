import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const normalizedBaseUrl = (() => {
  if (apiUrl) {
    return apiUrl.endsWith('/api') ? apiUrl : `${apiUrl.replace(/\/$/, '')}/api`;
  }

  // Fallback for the deployed frontend domain: route to the Render API host
  if (typeof window !== 'undefined' && window.location.origin.includes('arbre-decision-front.onrender.com')) {
    return 'https://arbre-decision.onrender.com/api';
  }

  // Local/proxy development
  return '/api';
})();

const instance = axios.create({
  baseURL: normalizedBaseUrl,
});

instance.interceptors.request.use(
  (config) => {
    if (config.url?.startsWith('/')) {
      config.url = config.url.slice(1);
    }
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
