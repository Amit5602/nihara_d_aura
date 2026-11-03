import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useOffers } from './OffersContext';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { offers, validateCoupon } = useOffers();
  const { token } = useAuth();

  // Load saved cart from localStorage or start with empty bag
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nihara_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved cart:', e);
    }
    return [];
  });
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const [couponCode, setCouponCode] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync to storage & backend whenever cart items change
  const saveCart = useCallback((cartItems) => {
    try {
      localStorage.setItem('nihara_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
    if (token) {
      api.updateCartOnServer(cartItems).catch((error) => {
        console.error('Failed to sync cart with the server:', error.message);
      });
    }
  }, [token]);

  // Sync the signed-in user's cart; guests keep their cart locally.
  useEffect(() => {
    if (!token) return undefined;
    let active = true;
    api.getCart().then(res => {
      if (!active || !Array.isArray(res.items)) return;
      const mergedItems = [...res.items];
      for (const localItem of itemsRef.current) {
        const existing = mergedItems.find((item) =>
          item.productId === localItem.productId &&
          item.variant === localItem.variant &&
          item.size === localItem.size
        );
        if (existing) {
          existing.quantity = Math.max(existing.quantity, localItem.quantity);
        } else {
          mergedItems.push(localItem);
        }
      }
      setItems(mergedItems);
      try {
        localStorage.setItem('nihara_cart', JSON.stringify(mergedItems));
      } catch (error) {
        console.warn('Failed to save the server cart locally:', error);
      }
      api.updateCartOnServer(mergedItems).catch((error) => {
        console.error('Failed to sync the local cart with the server:', error.message);
      });
    }).catch((error) => {
      console.error('Failed to load the signed-in cart:', error.message);
    });
    return () => { active = false; };
  }, [token]);

  // Calculations
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + ((item.product?.price || 0) * item.quantity), 0);
  }, [items]);

  const coupon = useMemo(() => {
    if (!couponCode) return null;
    const offer = offers.find((item) => item.code.toUpperCase() === couponCode);
    if (!offer) return null;
    return {
      ...offer,
      type: offer.type || 'percent',
      value: Number(offer.value ?? offer.discountPercent) || 0,
      discountPercent: Number(offer.discountPercent) || 0,
      name: offer.name || offer.description
    };
  }, [couponCode, offers]);

  const discount = useMemo(() => {
    if (!coupon || !coupon.isActive) return 0;
    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) return 0;
    if (coupon.minOrder && subtotal < coupon.minOrder) return 0;
    const amount = coupon.type === 'flat'
      ? Number(coupon.value) || 0
      : Math.round((subtotal * (Number(coupon.value) || 0)) / 100);
    return Math.min(subtotal, amount);
  }, [subtotal, coupon]);

  const deliveryFee = 0; // Complimentary luxury delivery
  const totalAmount = useMemo(() => Math.max(0, subtotal - discount + deliveryFee), [subtotal, discount]);
  const totalItemCount = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);

  const addToCart = useCallback((product, quantity = 1, variant = 'Standard', size = 'Standard') => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.productId === product.id && i.variant === variant && i.size === size);
      let next;
      if (idx > -1) {
        next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
      } else {
        next = [...prev, { productId: product.id, product, quantity, variant, size }];
      }
      saveCart(next);
      return next;
    });
  }, [saveCart]);

  const updateQuantity = useCallback((productId, variant, size, delta) => {
    setItems(prev => {
      const next = prev.map(item => {
        if (
          item.productId === productId &&
          (variant ? item.variant === variant : true) &&
          (size ? item.size === size : true)
        ) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
      saveCart(next);
      return next;
    });
  }, [saveCart]);

  const removeFromCart = useCallback((productId, variant, size) => {
    setItems(prev => {
      const next = prev.filter(i => !(
        i.productId === productId &&
        (variant ? i.variant === variant : true) &&
        (size ? i.size === size : true)
      ));
      saveCart(next);
      return next;
    });
  }, [saveCart]);

  const applyCoupon = useCallback((code) => {
    const res = validateCoupon(code, subtotal);
    if (res.success) {
      setCouponCode(res.offer.code);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message };
  }, [setCouponCode, validateCoupon, subtotal]);

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
  }, [setCouponCode]);

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
    setCouponCode(null);
  }, [saveCart]);

  const contextValue = useMemo(() => ({
    items,
    subtotal,
    discount,
    deliveryFee,
    totalAmount,
    totalItemCount,
    coupon,
    isDrawerOpen,
    setIsDrawerOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    clearCart
  }), [
    items,
    subtotal,
    discount,
    totalAmount,
    totalItemCount,
    coupon,
    isDrawerOpen,
    setIsDrawerOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    clearCart
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
