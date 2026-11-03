import { mockData } from './mockData.js';
import { API_BASE_URL } from '../config/api.js';

const authRequestError = (error) => ({
  success: false,
  message: error instanceof TypeError
    ? `Unable to reach the authentication server at ${API_BASE_URL}. Check the API URL, server availability, and CORS settings.`
    : error.message || 'Authentication request failed. Please try again.'
});

const getAuthHeaders = () => {
  try {
    const stored = localStorage.getItem('nihara_auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.token) {
        return {
          'Authorization': `Bearer ${parsed.token}`,
          'x-user-role': parsed.user?.role || 'user'
        };
      }
    }
  } catch (e) {}
  return {};
};

// Safe request wrapper that tries the Express server first and falls back to mockData
async function request(endpoint, options = {}, useFallback = true) {
  try {
    const authHeaders = getAuthHeaders();
    delete authHeaders['x-user-role'];
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...(options.headers || {})
      },
      ...options
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'Server error');
    }
    return await res.json();
  } catch (err) {
    if (!useFallback) throw err;
    console.warn(`[API Fallback] Request to ${endpoint} routed to offline mock store:`, err.message);
    return null; // Will trigger service fallback
  }
}

export const api = {
  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const serverRes = await request(`/products?${query}`);
    if (serverRes && serverRes.products) return serverRes;

    // Fallback logic
    let products = [...mockData.products];
    if (params.category && params.category.toLowerCase() !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return { success: true, products, total: products.length };
  },

  async getProductById(id) {
    const serverRes = await request(`/products/${id}`);
    if (serverRes && serverRes.product) return serverRes;

    const product = mockData.products.find(p => p.id === id || p.slug === id);
    const related = mockData.products.filter(p => p.id !== id).slice(0, 4);
    return { success: true, product, related };
  },

  // Categories
  async getCategories() {
    const serverRes = await request('/categories');
    if (serverRes && serverRes.categories) return serverRes;
    return { success: true, categories: mockData.categories };
  },

  async getOffers() {
    const serverRes = await request('/offers', {}, false);
    if (serverRes && Array.isArray(serverRes.offers)) return serverRes;
    throw new Error(serverRes?.message || 'Could not load active offers.');
  },

  async getCategoryBySlug(slug) {
    const serverRes = await request(`/categories/${slug}`);
    if (serverRes && serverRes.category) return serverRes;
    const category = mockData.categories.find(c => c.slug === slug || c.id === slug);
    return { success: true, category };
  },

  // Salon Services & Artists
  async getServices() {
    const serverRes = await request('/services');
    if (serverRes && serverRes.services) return serverRes;
    return { success: true, services: mockData.services };
  },

  async getServiceById(id) {
    const serverRes = await request(`/services/${id}`);
    if (serverRes && serverRes.service) return serverRes;
    const service = mockData.services.find(s => s.id === id);
    return { success: true, service };
  },

  async getArtists() {
    const serverRes = await request('/artists');
    if (serverRes && serverRes.artists) return serverRes;
    return { success: true, artists: mockData.artists };
  },

  async getSalon() {
    const serverRes = await request('/salon');
    if (serverRes && serverRes.salon) return serverRes;
    return {
      success: true,
      salon: {
        name: "Nihara D'Aura Flagship Salon",
        address: "423 A, 4th Floor, Tower 3, NX One Tower, Greater Noida (West), UP - 201306",
        phone: "+91 92660 59846",
        email: "support@niharadaura.com",
        hours: "09:00 AM - 08:30 PM (Daily)",
        amenities: ["Valet Parking", "Complimentary Kashmiri Kahwa", "Private Bridal Suites", "Sterilized Tools"]
      }
    };
  },

  // Bookings
  async getBookings() {
    const serverRes = await request('/bookings');
    if (serverRes && serverRes.bookings) return serverRes;
    return { success: true, bookings: mockData.bookings };
  },

  async createBooking(bookingData) {
    const serverRes = await request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
    if (serverRes && serverRes.booking) return serverRes;

    return serverRes || { success: false, message: 'Appointment could not be saved. Check your sign-in and backend connection.' };
  },

  async cancelBooking(bookingId) {
    const serverRes = await request(`/bookings/${bookingId}`, { method: 'DELETE' });
    if (serverRes) return serverRes;

    const b = mockData.bookings.find(bk => bk.id === bookingId || bk.bookingId === bookingId);
    if (b) {
      b.status = 'Cancelled';
      b.canCancel = false;
    }
    return { success: true, message: 'Appointment Cancelled' };
  },

  // Cart
  async getCart() {
    const serverRes = await request('/cart', {}, false);
    if (serverRes && Array.isArray(serverRes.items)) return serverRes;
    throw new Error(serverRes?.message || 'Could not load your cart.');
  },

  async updateCartOnServer(items) {
    return await request('/cart', {
      method: 'PUT',
      body: JSON.stringify({ items })
    }, false);
  },

  // Wishlist
  async getWishlist() {
    const serverRes = await request('/profile/wishlist');
    if (serverRes && serverRes.wishlist) return serverRes;
    return { success: true, wishlist: [] };
  },

  async getMyWishlist() {
    const serverRes = await request('/profile/wishlist', {}, false);
    if (serverRes && Array.isArray(serverRes.wishlist)) return serverRes;
    throw new Error(serverRes?.message || 'Could not load your wishlist.');
  },

  async toggleWishlistOnServer(productId) {
    return await request(`/profile/wishlist/${productId}`, {
      method: 'POST'
    });
  },

  // Payment Gateway
  async createPaymentIntent(payload) {
    const serverRes = await request('/payment/create-intent', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (serverRes && serverRes.paymentIntent) return serverRes;

    return {
      success: true,
      paymentIntent: {
        intentId: 'pay_intent_' + Math.floor(10000000 + Math.random() * 90000000),
        amount: payload.amount,
        currency: 'INR',
        merchantName: 'Nihara D Aura Studio'
      }
    };
  },

  async verifyPayment(payload) {
    const serverRes = await request('/payment/verify', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (serverRes && serverRes.verification) return serverRes;

    const txnRef = payload.transactionId || 'TXN_' + Math.floor(100000000 + Math.random() * 900000000);
    return {
      success: true,
      verification: {
        success: true,
        transactionId: txnRef,
        paymentMethod: payload.paymentMethod || 'Online Payment Gateway',
        status: 'PAID'
      }
    };
  },

  // Orders
  async getOrders() {
    const serverRes = await request('/orders');
    if (serverRes && serverRes.orders) return serverRes;
    return { success: true, orders: mockData.orders };
  },

  async getMyOrders() {
    const serverRes = await request('/orders', {}, false);
    if (serverRes && Array.isArray(serverRes.orders)) return serverRes;
    throw new Error(serverRes?.message || 'Could not load your orders.');
  },

  async createOrder(orderData) {
    const serverRes = await request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
    if (serverRes && serverRes.order) return serverRes;

    return serverRes || { success: false, message: 'Order could not be saved. Check your sign-in and backend connection.' };
  },

  // Profile & Addresses
  async getProfile() {
    const serverRes = await request('/profile', {}, false);
    if (serverRes && serverRes.user) return serverRes;
    throw new Error(serverRes?.message || 'Could not load your profile.');
  },

  async getCurrentUser() {
    const stored = JSON.parse(localStorage.getItem('nihara_auth') || 'null');
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: stored?.token ? { Authorization: `Bearer ${stored.token}` } : {}
    });
    const result = await response.json();
    if (!response.ok) {
      const error = new Error(result.message || 'Session validation failed');
      error.status = response.status;
      throw error;
    }
    if (result && typeof result === 'object' && typeof result.success !== 'boolean') {
      return { ...result, success: true };
    }
    return result;
  },

  async updateProfile(data) {
    const serverRes = await request('/profile/update', {
      method: 'PUT',
      body: JSON.stringify(data)
    }, false);
    if (serverRes && serverRes.user) return serverRes;
    throw new Error(serverRes?.message || 'Profile update failed.');
  },

  async getAddresses() {
    const serverRes = await request('/profile/addresses');
    if (serverRes && serverRes.addresses) return serverRes;
    return { success: true, addresses: mockData.addresses };
  },

  async addAddress(addressData) {
    const serverRes = await request('/profile/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData)
    });
    if (serverRes && serverRes.address) return serverRes;
    const newAddr = {
      id: `addr_${Date.now()}`,
      isDefault: mockData.addresses.length === 0,
      ...addressData
    };
    mockData.addresses.push(newAddr);
    return { success: true, address: newAddr };
  },

  async updateAddress(id, addressData) {
    const serverRes = await request(`/profile/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(addressData)
    });
    if (serverRes && serverRes.address) return serverRes;
    const idx = mockData.addresses.findIndex(a => a.id === id);
    if (idx !== -1) {
      if (addressData.isDefault) {
        mockData.addresses.forEach(a => a.isDefault = false);
      }
      mockData.addresses[idx] = { ...mockData.addresses[idx], ...addressData };
      return { success: true, address: mockData.addresses[idx] };
    }
    return { success: false, message: 'Address not found' };
  },

  async deleteAddress(id) {
    const serverRes = await request(`/profile/addresses/${id}`, {
      method: 'DELETE'
    });
    mockData.addresses = mockData.addresses.filter(a => a.id !== id);
    return { success: true };
  },

  // Auth & Real OTP API
  async register(fullName, identifier) {
    try {
      const cleanIdentifier = identifier.trim().toLowerCase();
      const body = cleanIdentifier.includes('@')
        ? { fullName, email: cleanIdentifier }
        : { fullName, phone: cleanIdentifier.replace(/\D/g, '') };
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await res.json();
      if (!result || typeof result !== 'object') {
        return { success: false, message: 'Authentication server returned an invalid response.' };
      }
      return {
        ...result,
        message: result.message || result.error,
        success: typeof result.success === 'boolean' ? result.success : res.ok
      };
    } catch (err) {
      return authRequestError(err);
    }
  },

  async login(identifier, password = '', role = 'user') {
    try {
      const cleanIdentifier = identifier.trim().toLowerCase();
      const body = role === 'admin' || cleanIdentifier.includes('@')
        ? { email: cleanIdentifier, password, role }
        : { phone: cleanIdentifier.replace(/\D/g, ''), password, role };
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await res.json();
      if (!result || typeof result !== 'object') {
        return { success: false, message: 'Authentication server returned an invalid response.' };
      }
      return {
        ...result,
        message: result.message || result.error,
        success: typeof result.success === 'boolean' ? result.success : res.ok
      };
    } catch (err) {
      return authRequestError(err);
    }
  },

  async verifyOtp(email, otp) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const result = await res.json();
      if (!result || typeof result !== 'object') {
        return { success: false, message: 'Authentication server returned an invalid response.' };
      }
      return {
        ...result,
        message: result.message || result.error,
        success: typeof result.success === 'boolean' ? result.success : res.ok
      };
    } catch (err) {
      return authRequestError(err);
    }
  }
};
