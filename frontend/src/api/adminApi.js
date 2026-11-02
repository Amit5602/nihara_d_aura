import { API_BASE_URL } from '../config/api.js';

async function request(path, options = {}) {
  let session;
  try {
    session = JSON.parse(localStorage.getItem('nihara_auth') || 'null');
  } catch {
    throw new Error('Saved sign-in data is invalid');
  }
  if (!session?.token || session.user?.role !== 'admin') {
    throw new Error('Please sign in with an administrator account');
  }

  const response = await fetch(`${API_BASE_URL}/admin${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.token}`,
      ...options.headers
    }
  });
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error(`Admin API returned an invalid response (${response.status})`);
  }
  if (!response.ok || result.success === false) {
    throw new Error(result.message || `Admin request failed (${response.status})`);
  }
  return result;
}

const json = (method, body) => ({ method, body: JSON.stringify(body) });

export const adminApi = {
  async getDashboard() {
    return request('/dashboard');
  },
  async createProduct(product) {
    return request('/products', json('POST', product));
  },
  async updateProduct(id, patch) {
    return request(`/products/${encodeURIComponent(id)}`, json('PATCH', patch));
  },
  async deleteProduct(id) {
    return request(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
  async updateOrder(id, patch) {
    return request(`/orders/${encodeURIComponent(id)}`, json('PATCH', patch));
  },
  async createAppointment(appointment) {
    return request('/appointments', json('POST', appointment));
  },
  async updateAppointment(id, patch) {
    return request(`/appointments/${encodeURIComponent(id)}`, json('PATCH', patch));
  },
  async deleteAppointment(id) {
    return request(`/appointments/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
  async createCoupon(coupon) {
    return request('/coupons', json('POST', coupon));
  },
  async updateCoupon(id, patch) {
    return request(`/coupons/${encodeURIComponent(id)}`, json('PATCH', patch));
  },
  async deleteCoupon(id) {
    return request(`/coupons/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
  async updateSettings(settings) {
    return request('/settings', json('PUT', settings));
  },
  async getAnalytics(days = 30) {
    return request(`/analytics?days=${days}`);
  },
  async getServices(category) {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    return request(`/services${query}`);
  },
  async getCategories() {
    return request('/categories');
  },
  async createCategory(category) {
    return request('/categories', json('POST', category));
  },
  async updateCategory(id, patch) {
    return request(`/categories/${encodeURIComponent(id)}`, json('PATCH', patch));
  },
  async deleteCategory(id) {
    return request(`/categories/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
  async getInventoryAdjustments() {
    return request('/inventory/adjustments');
  },
  async adjustInventory(id, adjustment) {
    return request(`/inventory/${encodeURIComponent(id)}/adjustments`, json('POST', adjustment));
  },
  async createService(service) {
    return request('/services', json('POST', service));
  },
  async updateService(id, patch) {
    return request(`/services/${encodeURIComponent(id)}`, json('PATCH', patch));
  },
  async deleteService(id) {
    return request(`/services/${encodeURIComponent(id)}`, { method: 'DELETE' });
  }
};

export default adminApi;
