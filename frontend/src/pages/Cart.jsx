import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, X, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOffers } from '../context/OffersContext';
import { getProductImage, getProductImageAlt } from '../data/jewelleryCategories';

export default function Cart() {
  const navigate = useNavigate();
  const { offers } = useOffers();
  const { 
    items, 
    subtotal, 
    discount, 
    totalAmount, 
    updateQuantity, 
    removeFromCart,
    coupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const res = applyCoupon(promoCode);
    setCouponMessage(res.message);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-transparent px-4 py-10 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#DFBC77] bg-[#FAF3E8] text-[#C59B27] shadow-inner">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <span className="section-eyebrow">Your bag</span>
        <h2 className="mt-4 font-serif text-3xl font-bold text-[#1C1917] sm:text-4xl">
          Your Shopping Bag is Empty
        </h2>
        <p className="mt-3 max-w-md text-sm text-stone-500 sm:text-base">
          Discover our luxury collections and add your favourites.
        </p>
        <Link
          to="/products"
          className="btn-gold mt-7 rounded-full px-8 py-3 text-[10px] font-bold uppercase tracking-[0.22em] shadow-md"
        >
          Explore Nihara Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-1.5 text-stone-600 transition-colors hover:bg-stone-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <span className="section-eyebrow">Luxury bag</span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-[#1C1917] sm:text-4xl">
            Shopping Bag
          </h1>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Cart Item Cards */}
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between gap-4 rounded-[1.75rem] border border-stone-200/90 bg-white p-4 shadow-[0_18px_32px_-28px_rgba(78,59,17,0.5)] transition-all hover:border-[#0A6847]/40 hover:shadow-[0_24px_36px_-28px_rgba(78,59,17,0.5)] sm:flex-row sm:items-center sm:p-5"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getProductImage(item.product)}
                  alt={getProductImageAlt(item.product)}
                  onError={(e) => { e.currentTarget.src = '/hero-slide-1.jpg'; }}
                  className="h-16 w-16 flex-shrink-0 rounded-2xl border border-stone-200 bg-stone-100 object-cover sm:h-20 sm:w-20"
                />
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1C1917] sm:text-lg">
                    {item.product?.name}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500">
                    Variant: <span className="font-medium text-stone-800">{item.variant}</span> {item.size ? `• Size: ${item.size}` : ''}
                  </p>
                  <p className="mt-2 text-sm font-bold text-[#0A6847] sm:hidden">
                    ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 border-t border-stone-100 pt-3 sm:justify-end sm:border-t-0 sm:pt-0">
                <span className="hidden text-base font-bold text-[#0A6847] sm:block">
                  ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                </span>

                <div className="flex items-center overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
                  <button
                    onClick={() => updateQuantity(item.productId, item.variant, item.size, -1)}
                    className="px-3 py-1.5 text-xs font-bold text-stone-700 transition-colors hover:bg-stone-200"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.variant, item.size, 1)}
                    className="px-3 py-1.5 text-xs font-bold text-stone-700 transition-colors hover:bg-stone-200"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId, item.variant, item.size)}
                  className="rounded-full p-1 text-stone-300 transition-colors hover:text-red-500"
                  title="Remove from bag"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code / Voucher Card */}
        <div className="space-y-2 rounded-[1.75rem] border border-stone-200/90 bg-white p-4 shadow-[0_18px_32px_-28px_rgba(78,59,17,0.5)] sm:p-5">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-700">
            Promo Code / Voucher
          </label>
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-stone-800 focus:border-[#0A6847] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#0A6847] px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm transition-colors hover:bg-[#085238]"
            >
              Apply
            </button>
          </form>

          {/* Quick Clickable Active Coupons */}
          <div className="flex items-center flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-stone-400 font-medium">Available Offers:</span>
            {offers.filter(o => o.isActive).map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setPromoCode(o.code);
                  const res = applyCoupon(o.code);
                  setCouponMessage(res.message);
                }}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5E9] border border-[#0A6847]/20 text-[#0A6847] hover:bg-[#D4EDDA] transition-colors"
                title={`Click to apply ${o.type === 'flat' ? `₹${Number(o.value).toLocaleString('en-IN')}` : `${o.value ?? o.discountPercent}%`} OFF (Min ₹${o.minOrder})`}
              >
                {o.code} ({o.type === 'flat' ? `₹${Number(o.value).toLocaleString('en-IN')}` : `${o.value ?? o.discountPercent}%`} OFF)
              </button>
            ))}
          </div>

          {couponMessage && (
            <p className="text-xs text-amber-800 font-medium pl-1">{couponMessage}</p>
          )}
          {coupon && (
            <div className="flex items-center justify-between bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 text-xs text-emerald-900 mt-2">
              <span>Applied: <strong>{coupon.code}</strong> ({coupon.type === 'flat' ? `₹${Number(coupon.value).toLocaleString('en-IN')}` : `${coupon.value}%`} OFF - {coupon.name})</span>
              <button type="button" onClick={removeCoupon} className="text-stone-400 hover:text-stone-700 text-xs font-semibold">Remove</button>
            </div>
          )}
        </div>

        {/* Price Breakdown Card */}
        <div className="space-y-3 rounded-[1.75rem] border border-stone-200/90 bg-white p-5 text-xs text-stone-600 shadow-[0_18px_32px_-28px_rgba(78,59,17,0.5)]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-700">
              <span>Discount ({coupon?.code})</span>
              <span>-₹{discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-bold text-[#0A6847]">FREE</span>
          </div>
          <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-bold text-stone-900">
            <span>Total Amount</span>
            <span className="text-lg font-sans font-bold text-[#0A6847]">₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/checkout')}
          className="btn-gold flex w-full items-center justify-center gap-2 rounded-[1.5rem] py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg transition-all hover:shadow-xl"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>

    </div>
  );
}
