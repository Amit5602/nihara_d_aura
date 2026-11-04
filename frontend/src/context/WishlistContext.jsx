import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { REMOVED_JEWELLERY_PRODUCT_IDS } from '../data/jewelleryCategories.js';

const WishlistContext = createContext();
const removedProductIds = new Set(REMOVED_JEWELLERY_PRODUCT_IDS);

export function WishlistProvider({ children }) {
  const { token } = useAuth();
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('nihara_wishlist');
      const savedIds = saved ? JSON.parse(saved) : [];
      const currentIds = savedIds.filter((id) => !removedProductIds.has(id));
      if (currentIds.length !== savedIds.length) {
        localStorage.setItem('nihara_wishlist', JSON.stringify(currentIds));
      }
      return currentIds;
    } catch {
      return [];
    }
  });

  // Sync with server wishlist on mount
  useEffect(() => {
    if (!token) return undefined;
    let isMounted = true;
    api.getWishlist().then(res => {
      if (isMounted && res && res.wishlist) {
        const serverIds = res.wishlist
          .map(p => p.id || p._id)
          .filter((id) => !removedProductIds.has(id));
        if (serverIds.length > 0) {
          setWishlistIds(prev => {
            const merged = Array.from(new Set([...prev, ...serverIds]));
            try {
              localStorage.setItem('nihara_wishlist', JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      }
    }).catch(err => {
      console.warn('Could not sync wishlist with server:', err.message);
    });
    return () => { isMounted = false; };
  }, [token]);

  const toggleWishlist = useCallback(async (productId) => {
    setWishlistIds(prev => {
      const next = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem('nihara_wishlist', JSON.stringify(next));
      } catch {}
      return next;
    });

    if (token) {
      try {
        await api.toggleWishlistOnServer(productId);
      } catch (err) {
        console.warn('Server wishlist toggle error:', err.message);
      }
    }
  }, [token]);

  const isInWishlist = useCallback((productId) => {
    return wishlistIds.includes(productId);
  }, [wishlistIds]);

  const removeFromWishlist = useCallback(async (productId) => {
    setWishlistIds(prev => {
      const next = prev.filter(id => id !== productId);
      try {
        localStorage.setItem('nihara_wishlist', JSON.stringify(next));
      } catch {}
      return next;
    });

    if (token) {
      try {
        await api.toggleWishlistOnServer(productId);
      } catch (err) {
        console.warn('Server wishlist remove error:', err.message);
      }
    }
  }, [token]);

  const value = useMemo(() => ({
    wishlistIds,
    toggleWishlist,
    isInWishlist,
    removeFromWishlist,
    count: wishlistIds.length
  }), [wishlistIds, toggleWishlist, isInWishlist, removeFromWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
