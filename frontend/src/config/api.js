const LIVE_API_BASE_URL = 'https://api.niharadaura.com/api';
const configuredApiBase = import.meta.env.VITE_API_BASE_URL?.trim();
const isLocalUrl = (value) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(?:\/|$)/i.test(value || '');

export const API_BASE_URL = (
  import.meta.env.PROD && (!configuredApiBase || isLocalUrl(configuredApiBase))
    ? LIVE_API_BASE_URL
    : configuredApiBase || 'http://localhost:5000/api'
).replace(/\/+$/, '');

const LIVE_SOCKET_URL = LIVE_API_BASE_URL.replace(/\/api\/?$/, '');
const configuredSocketUrl = import.meta.env.VITE_SOCKET_URL?.trim();
const apiOrigin = API_BASE_URL.match(/^https?:\/\/[^/]+/i)?.[0];

export const SOCKET_URL = (
  import.meta.env.PROD && (!configuredSocketUrl || isLocalUrl(configuredSocketUrl))
    ? apiOrigin || LIVE_SOCKET_URL
    : configuredSocketUrl || 'http://localhost:5000'
).replace(/\/+$/, '');
