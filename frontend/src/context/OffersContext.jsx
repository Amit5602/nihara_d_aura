import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import adminApi from '../api/adminApi';
import { API_BASE_URL } from '../config/api.js';
import { useSocket } from './SocketContext';
import { useToast } from './ToastContext';

const OffersContext = createContext();
export function OffersProvider({ children }) {
  const [offers, setOffers] = useState([]);
  const { socket } = useSocket();
  const { showToast } = useToast();

  const fetchOffers = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/offers`);
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(`Offers API returned an invalid response (${response.status})`);
    }
    if (!response.ok || data.success === false) {
      throw new Error(data.message || `Could not load offers (${response.status})`);
    }
    if (!Array.isArray(data.offers)) {
      throw new Error('Offers API returned an invalid offers list');
    }
    return data.offers;
  }, []);

  useEffect(() => {
    let active = true;
    const loadOffers = async () => {
      try {
        const currentOffers = await fetchOffers();
        if (active) setOffers(currentOffers);
      } catch (error) {
        if (active) showToast(`Could not load live offers: ${error.message}`, 'error');
      }
    };
    loadOffers();
    return () => { active = false; };
  }, [fetchOffers, showToast]);

  useEffect(() => {
    if (!socket) return undefined;
    const refresh = () => {
      fetchOffers().then(setOffers).catch((error) => {
        showToast(`Could not refresh live offers: ${error.message}`, 'error');
      });
    };
    socket.on('offer:created', refresh);
    socket.on('offer:updated', refresh);
    socket.on('offer:deleted', refresh);
    return () => {
      socket.off('offer:created', refresh);
      socket.off('offer:updated', refresh);
      socket.off('offer:deleted', refresh);
    };
  }, [socket, fetchOffers, showToast]);

  const addOffer = useCallback(async (offerData) => {
    const code = (offerData.code || '').trim().toUpperCase();
    if (!code) return { success: false, message: 'Coupon code is required' };
    if (offers.some((offer) => offer.code.toUpperCase() === code)) {
      return { success: false, message: `Offer with code "${code}" already exists` };
    }
    try {
      const result = await adminApi.createCoupon({
        code,
        description: offerData.description || offerData.name || `${code} Special Discount`,
        type: offerData.type || 'percent',
        value: offerData.value ?? offerData.discountPercent ?? 10,
        minOrder: offerData.minOrder || 0,
        usageLimit: offerData.usageLimit || 0,
        validTill: offerData.validTill,
        isActive: offerData.isActive !== false
      });
      setOffers((current) => [result.coupon, ...current]);
      return { success: true, offer: result.coupon };
    } catch (error) {
      showToast(`Could not create offer: ${error.message}`, 'error');
      return { success: false, message: error.message };
    }
  }, [offers, showToast]);

  const deleteOffer = useCallback(async (idOrCode) => {
    const target = offers.find((offer) =>
      offer.id === idOrCode || offer.code.toUpperCase() === String(idOrCode).toUpperCase()
    );
    if (!target) return { success: false, message: 'Offer not found' };
    try {
      await adminApi.deleteCoupon(target.id);
      setOffers((current) => current.filter((offer) => offer.id !== target.id));
      return { success: true, message: `Offer "${target.code}" removed successfully` };
    } catch (error) {
      showToast(`Could not delete offer: ${error.message}`, 'error');
      return { success: false, message: error.message };
    }
  }, [offers, showToast]);

  const toggleOffer = useCallback(async (idOrCode) => {
    const target = offers.find((offer) =>
      offer.id === idOrCode || offer.code.toUpperCase() === String(idOrCode).toUpperCase()
    );
    if (!target) return { success: false, message: 'Offer not found' };
    try {
      const result = await adminApi.updateCoupon(target.id, { isActive: !target.isActive });
      setOffers((current) => current.map((offer) =>
        offer.id === target.id ? result.coupon : offer
      ));
      return { success: true, offer: result.coupon };
    } catch (error) {
      showToast(`Could not update offer: ${error.message}`, 'error');
      return { success: false, message: error.message };
    }
  }, [offers, showToast]);

  const validateCoupon = useCallback((code, cartSubtotal = 0) => {
    if (!code) return { success: false, message: 'Please enter a coupon code.' };
    const clean = code.trim().toUpperCase();
    const offer = offers.find((item) => item.code.toUpperCase() === clean);

    if (!offer) {
      return { success: false, message: `Invalid coupon code "${clean}".` };
    }
    if (!offer.isActive) {
      return { success: false, message: `Coupon code "${clean}" is inactive.` };
    }
    if (offer.validTill && new Date(`${offer.validTill}T23:59:59`).getTime() < Date.now()) {
      return { success: false, message: `Coupon code "${clean}" has expired.` };
    }
    if (offer.usageLimit > 0 && offer.usedCount >= offer.usageLimit) {
      return { success: false, message: `Coupon code "${clean}" has reached its usage limit.` };
    }
    if (offer.minOrder && cartSubtotal < offer.minOrder) {
      return {
        success: false,
        message: `Coupon "${clean}" requires a minimum purchase of ₹${offer.minOrder.toLocaleString('en-IN')}. (Current: ₹${cartSubtotal.toLocaleString('en-IN')})`
      };
    }

    const value = Number(offer.value ?? offer.discountPercent) || 0;
    const discount = offer.type === 'flat' ? `₹${value.toLocaleString('en-IN')}` : `${value}%`;
    return {
      success: true,
      message: `Coupon ${clean} applied (${discount} OFF)!`,
      offer
    };
  }, [offers]);

  const contextValue = useMemo(() => ({
    offers,
    addOffer,
    deleteOffer,
    toggleOffer,
    validateCoupon
  }), [offers, addOffer, deleteOffer, toggleOffer, validateCoupon]);

  return (
    <OffersContext.Provider value={contextValue}>
      {children}
    </OffersContext.Provider>
  );
}

export const useOffers = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error('useOffers must be used within an OffersProvider');
  }
  return context;
};
