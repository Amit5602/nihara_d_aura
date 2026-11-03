import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOffers } from '../../context/OffersContext';
import { getProductImage, getProductImageAlt } from '../../data/jewelleryCategories';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { offers } = useOffers();
  const { 
    items, 
    subtotal, 
    discount, 
    totalAmount, 
    isDrawerOpen, 
    setIsDrawerOpen, 
    updateQuantity, 
    removeFromCart,
    coupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  // Handle ESC key to close cart
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, setIsDrawerOpen]);

  if (!isDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const res = applyCoupon(couponCode);
    setCouponMsg(res.message);
  };

  const handleProceedCheckout = () => {
    setIsDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-md bg-gradient-to-b from-[#FDFBF7] via-[#FAF3E8] to-[#F5EAD5] flex flex-col shadow-2xl border-l border-[#DFBC77]/40 animate-slide-left">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8DFC8] flex items-center justify-between bg-white/90 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C59B27]" />
              <h2 className="font-serif text-lg font-bold text-[#1C1917]">Shopping Bag</h2>
              <span className="text-xs bg-[#FCF9F2] text-[#855F14] font-bold px-2 py-0.5 rounded-full border border-[#DFBC77]/40">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#FCF9F2] border border-[#DFBC77]/40 flex items-center justify-center mx-auto mb-4 text-[#C59B27] shadow-inner">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">Your Bag is Empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  Discover our certified Kundan jewellery, silk cosmetics, and salon suites.
                </p>
                <button
                  onClick={() => { setIsDrawerOpen(false); navigate('/products'); }}
                  className="btn-gold mt-6 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-3.5 border border-[#DFBC77]/35 flex gap-3 shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={getProductImage(item.product)}
                    alt={getProductImageAlt(item.product)}
                    onError={(e) => { e.currentTarget.src = '/hero-slide-1.jpg'; }}
                    className="w-16 h-16 rounded-xl object-cover bg-stone-50 border border-[#E8DFC8] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-xs font-bold text-[#1C1917] truncate">
                          {item.product?.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.variant, item.size)}
                          className="text-stone-300 hover:text-red-500 transition-colors p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Variant: <span className="font-medium text-stone-700">{item.variant}</span> {item.size ? `• ${item.size}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      <span className="text-xs font-bold text-[#1C1917]">
                        ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#DFBC77]/50 rounded-lg overflow-hidden bg-[#FCF9F2]">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variant, item.size, -1)}
                          className="px-2 py-0.5 text-xs text-[#855F14] hover:bg-[#EAD7AD] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-[#1C1917]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variant, item.size, 1)}
                          className="px-2 py-0.5 text-xs text-[#855F14] hover:bg-[#EAD7AD] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E8DFC8] bg-white space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Enter promo coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs uppercase tracking-wider rounded-lg border border-stone-300 focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-gold px-3 py-1.5 text-xs font-bold rounded-lg"
                  >
                    Apply
                  </button>
                </div>

                {/* Available Offers Chips */}
                <div className="flex items-center flex-wrap gap-1 pt-1">
                  {offers.filter(o => o.isActive).map(o => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => {
                        setCouponCode(o.code);
                        const res = applyCoupon(o.code);
                        setCouponMsg(res.message);
                      }}
                      className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 border border-amber-200 text-[#9E7318] hover:bg-amber-100"
                    >
                      {o.code} ({o.discountPercent}%)
                    </button>
                  ))}
                </div>

                {couponMsg && (
                  <p className="text-[11px] text-amber-700 font-medium pl-1">{couponMsg}</p>
                )}
                {coupon && (
                  <div className="flex items-center justify-between bg-amber-50 px-2.5 py-1 rounded text-xs text-amber-800 border border-amber-200">
                    <span>Active: <strong>{coupon.code}</strong> ({coupon.discountPercent}% OFF)</span>
                    <button type="button" onClick={removeCoupon} className="text-stone-400 hover:text-stone-700 text-xs font-semibold">Remove</button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-green-700 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-[#855F14] font-sans font-bold text-base">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleProceedCheckout}
                className="w-full btn-gold py-3 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
