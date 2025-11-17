import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const normalizedBaseUrl = (() => {
  if (apiUrl) {
    const trimmedEnvUrl = apiUrl.replace(/\/$/, '');
    return trimmedEnvUrl.endsWith('/api') ? trimmedEnvUrl : `${trimmedEnvUrl}/api`;
  }

  if (typeof window !== 'undefined') {
    const origin = window.location.origin.replace(/\/$/, '');

    // Front-end déployé sur Render (domaine front) -> cibler automatiquement l'API Render
    if (origin.includes('arbre-decision-front.onrender.com')) {
      return 'https://arbre-decision.onrender.com/api';
    }

    // Fallback générique : même origine + /api
    return `${origin}/api`;
  }

  // Local/proxy development (SSR/tests sans window)
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
