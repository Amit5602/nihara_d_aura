const LIVE_API_BASE_URL = 'https://api.niharadaura.com/api';
const configuredApiBase = import.meta.env.VITE_API_BASE_URL?.trim();
const configuredLocalApi = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(?:\/|$)/i.test(configuredApiBase || '');

export const API_BASE_URL = (
  import.meta.env.PROD && (!configuredApiBase || configuredLocalApi)
    ? LIVE_API_BASE_URL
    : configuredApiBase || 'http://localhost:5000/api'
).replace(/\/+$/, '');
