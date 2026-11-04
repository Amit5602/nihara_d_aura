import { create } from 'zustand';
import adminApi from '../api/adminApi';

const DEFAULT_SETTINGS = {
  storeName: "Nihara D'Aura",
  lowStockThreshold: 5,
  targetMargins: { Jewellery: 18, Makeup: 45, Nails: 55, Candles: 60 },
};

const showFailure = (set, error) => {
  set({ error: error.message });
  return null;
};

const perform = async (set, request, onSuccess) => {
  try {
    const result = await request();
    onSuccess(result);
    set({ error: null });
    return result;
  } catch (error) {
    return showFailure(set, error);
  }
};

const useAdminStore = create((set, get) => ({
  darkMode: localStorage.getItem('nda_dark') === 'true',
  loading: false,
  error: null,
  products: [],
  orders: [],
  appointments: [],
  coupons: [],
  customers: [],
  services: [],
  categories: [],
  inventoryAdjustments: [],
  settings: DEFAULT_SETTINGS,
  checklist: { date: null, items: {} },
  toggleDark: () => set((state) => {
    const darkMode = !state.darkMode;
    localStorage.setItem('nda_dark', String(darkMode));
    return { darkMode };
  }),

  loadDashboard: async () => {
    set({ loading: true });
    return perform(set, () => adminApi.getDashboard(), (data) => {
      set({
        products: data.products || [],
        orders: data.orders || [],
        appointments: data.appointments || [],
        coupons: data.coupons || [],
        customers: data.customers || [],
        services: data.services || [],
        categories: data.categories || [],
        settings: { ...DEFAULT_SETTINGS, ...data.settings },
        loading: false
      });
    }).then((result) => {
      if (!result) set({ loading: false });
      return result;
    });
  },

  updateSettings: async (patch) => perform(set, () => adminApi.updateSettings(patch), (result) => {
    set((state) => ({ settings: { ...state.settings, ...result.settings } }));
  }),
  resetSettings: async () => {
    const defaults = { ...DEFAULT_SETTINGS };
    return get().updateSettings(defaults);
  },

  addProduct: async (product) => perform(set, () => adminApi.createProduct(product), (result) => {
    set((state) => ({ products: [result.product, ...state.products] }));
  }),
  updateProduct: async (id, patch) => {
    const previous = get().products.find((item) => item.id === id);
    return perform(set, () => adminApi.updateProduct(id, patch), (result) => {
      set((state) => ({
        products: state.products.map((item) => item.id === id ? result.product : item),
        ...(previous && Number(previous.stock) !== Number(result.product.stock) ? {
          inventoryAdjustments: [{
            productId: result.product.id,
            productName: result.product.name,
            delta: Number(result.product.stock) - Number(previous.stock),
            previousStock: Number(previous.stock),
            newStock: Number(result.product.stock),
            reason: patch.stockAdjustmentReason,
            adjustedAt: new Date().toISOString()
          }, ...state.inventoryAdjustments].slice(0, 200)
        } : {})
      }));
    });
  },
  deleteProduct: async (id) => perform(set, () => adminApi.deleteProduct(id), () => {
    set((state) => ({ products: state.products.filter((item) => item.id !== id) }));
  }),
  addService: async (service) => perform(set, () => adminApi.createService(service), (result) => {
    set((state) => ({ services: [result.service, ...state.services] }));
  }),
  updateService: async (id, patch) => perform(set, () => adminApi.updateService(id, patch), (result) => {
    set((state) => ({ services: state.services.map((item) => item.id === id ? result.service : item) }));
  }),
  deleteService: async (id) => perform(set, () => adminApi.deleteService(id), () => {
    set((state) => ({ services: state.services.filter((item) => item.id !== id) }));
  }),
  addCategory: async (category) => perform(set, () => adminApi.createCategory(category), (result) => {
    set((state) => ({ categories: [...state.categories, result.category] }));
  }),
  updateCategory: async (id, patch) => {
    const previous = get().categories.find((item) => item.id === id);
    return perform(set, () => adminApi.updateCategory(id, patch), (result) => {
      set((state) => ({
        categories: state.categories.map((item) => item.id === id ? result.category : item),
        products: state.products.map((product) => product.categorySlug === previous?.slug
          ? {
            ...product,
            category: result.category.name,
            categorySlug: result.category.slug,
            collection: result.category.name
          }
          : product)
      }));
    });
  },
  deleteCategory: async (id) => perform(set, () => adminApi.deleteCategory(id), () => {
    set((state) => ({ categories: state.categories.filter((item) => item.id !== id) }));
  }),
  loadInventoryAdjustments: async () => perform(set, () => adminApi.getInventoryAdjustments(), (data) => {
    set({ inventoryAdjustments: data.adjustments || [] });
  }),
  adjustInventory: async (id, adjustment) => perform(set, () => adminApi.adjustInventory(id, adjustment), (result) => {
    set((state) => ({
      products: state.products.map((product) => product.id === result.product.id ? result.product : product),
      inventoryAdjustments: [{
        productId: result.product.id,
        productName: result.product.name,
        delta: adjustment.delta,
        previousStock: result.product.stock - adjustment.delta,
        newStock: result.product.stock,
        reason: adjustment.reason,
        adjustedAt: new Date().toISOString()
      }, ...state.inventoryAdjustments].slice(0, 200)
    }));
  }),
  bulkUpdateProducts: async (ids, patch) => perform(set, async () => {
    const results = await Promise.all(ids.map((id) => adminApi.updateProduct(id, patch)));
    return results.map((result) => result.product);
  }, (products) => {
    const updates = new Map(products.map((product) => [product.id, product]));
    set((state) => ({ products: state.products.map((product) => updates.get(product.id) || product) }));
  }),
  bulkDeleteProducts: async (ids) => perform(set, async () => {
    await Promise.all(ids.map((id) => adminApi.deleteProduct(id)));
    return ids;
  }, (deletedIds) => {
    const removed = new Set(deletedIds);
    set((state) => ({ products: state.products.filter((product) => !removed.has(product.id)) }));
  }),

  updateOrderStatus: async (id, status) => perform(set, () => adminApi.updateOrder(id, { status }), (result) => {
    set((state) => ({ orders: state.orders.map((order) => order.id === id ? result.order : order) }));
  }),
  updateOrderDetails: async (id, patch) => perform(set, () => adminApi.updateOrder(id, patch), (result) => {
    set((state) => ({ orders: state.orders.map((order) => order.id === id ? result.order : order) }));
  }),

  addAppointment: async (appointment) => perform(set, () => adminApi.createAppointment(appointment), (result) => {
    set((state) => ({ appointments: [result.appointment, ...state.appointments] }));
  }),
  updateAppointment: async (id, patch) => perform(set, () => adminApi.updateAppointment(id, patch), (result) => {
    set((state) => ({ appointments: state.appointments.map((item) => item.id === id ? result.appointment : item) }));
  }),
  deleteAppointment: async (id) => perform(set, () => adminApi.deleteAppointment(id), () => {
    set((state) => ({ appointments: state.appointments.filter((item) => item.id !== id) }));
  }),

  addCoupon: async (coupon) => perform(set, () => adminApi.createCoupon(coupon), (result) => {
    set((state) => ({ coupons: [result.coupon, ...state.coupons] }));
  }),
  toggleCoupon: async (id) => {
    const coupon = get().coupons.find((item) => item.id === id);
    if (!coupon) return showFailure(set, new Error('Coupon not found'));
    return perform(set, () => adminApi.updateCoupon(id, { isActive: !coupon.isActive }), (result) => {
      set((state) => ({ coupons: state.coupons.map((item) => item.id === id ? result.coupon : item) }));
    });
  },
  deleteCoupon: async (id) => perform(set, () => adminApi.deleteCoupon(id), () => {
    set((state) => ({ coupons: state.coupons.filter((item) => item.id !== id) }));
  }),

  toggleChecklistItem: (key) => set((state) => {
    const today = new Date().toISOString().split('T')[0];
    const items = state.checklist.date === today ? { ...state.checklist.items } : {};
    items[key] = !items[key];
    return { checklist: { date: today, items } };
  }),

  addToast: () => {},

  exportData: () => {
    const { products, orders, appointments, coupons, settings } = get();
    return JSON.stringify({ products, orders, appointments, coupons, settings }, null, 2);
  },
  importData: async (json) => {
    try {
      const data = JSON.parse(json);
      if (!data || typeof data !== 'object' || !data.settings || Array.isArray(data)) return false;
      const result = await get().updateSettings(data.settings);
      return Boolean(result);
    } catch (error) {
      showFailure(set, error);
      return false;
    }
  },
}));

export default useAdminStore;
