import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X,
  Phone,
  Calendar,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

import Logo from './Logo';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItemCount, setIsDrawerOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

  // Auto-close search and mobile menu when navigating
  React.useEffect(() => {
    setIsSearchOpen(false);
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key to close search
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setServicesMenuOpen(false);
      }
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      if (!prev) setMobileMenuOpen(false);
      return !prev;
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      if (!prev) setIsSearchOpen(false);
      return !prev;
    });
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/products' },
    { label: 'Categories', path: '/categories' }
  ];
  const bookingLink = { label: 'Book Appointment', path: '/book' };
  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DFC8] bg-white/90 backdrop-blur-xl shadow-[0_8px_28px_-18px_rgba(88,64,22,0.45)] transition-colors will-change-transform transform-gpu">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1 sm:gap-4">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <button 
              onClick={toggleMobileMenu} 
              className="lg:hidden p-1.5 sm:p-2 text-[#1C1917] hover:text-[#C59B27] transition-colors flex-shrink-0"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-1.5 sm:gap-3 group py-1 min-w-0" title="Nihara D'Aura Haute Luxury">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F5E6C4] to-[#AA7C11] shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <Logo className="h-9 sm:h-14 md:h-16 lg:h-[70px] w-auto rounded-full" alt="Nihara D'Aura Haute Luxury & Salon" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className="font-serif text-sm sm:text-xl lg:text-2xl font-extrabold tracking-tight text-[#1C1917] group-hover:text-[#C59B27] transition-colors leading-none truncate">
                  Nihara <span className="text-[#C59B27] italic font-serif">D'Aura</span>
                </span>
                <span className="text-[8px] sm:text-[10px] lg:text-[11px] uppercase tracking-wider sm:tracking-[0.2em] font-extrabold text-[#8C733E] mt-0.5 sm:mt-1 truncate">
                  Jewellery & Makeup
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 flex-shrink-0">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative py-1 text-sm font-medium tracking-[0.1em] transition-colors ${
                    isActive 
                      ? 'text-[#C59B27] font-semibold' 
                      : 'text-[#26221F] hover:text-[#C59B27]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#C59B27]" />
                  )}
                </Link>
              );
            })}
            <div className="relative">
              <button
                type="button"
                onClick={() => setServicesMenuOpen((open) => !open)}
                aria-expanded={servicesMenuOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 py-1 text-sm font-medium tracking-wide transition-colors ${
                  isServicesActive ? 'text-[#C59B27] font-semibold' : 'text-[#26221F] hover:text-[#C59B27]'
                }`}
              >
                Services <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesMenuOpen && (
                <div className="absolute left-0 top-full z-50 mt-3 w-52 rounded-xl border border-[#E8DFC8] bg-[#fffdf8] p-1.5 shadow-xl">
                  {[
                    { label: 'All services', path: '/services' },
                    { label: 'Makeup', path: '/services/makeup' },
                    { label: 'Salon', path: '/services/salon' }
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setServicesMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-[#3d3027] transition hover:bg-[#f7f0e2] hover:text-[#9b711e] focus:outline-none focus:ring-2 focus:ring-[#C59B27]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to={bookingLink.path}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B3861B] px-4 py-2 text-[10px] font-bold tracking-[0.1em] text-white shadow-[0_12px_20px_-12px_rgba(184,134,11,0.9)] transition-all hover:scale-[1.02] hover:shadow-[0_16px_24px_-12px_rgba(184,134,11,0.95)]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{bookingLink.label}</span>
            </Link>
          </nav>

          {/* Right: Search, Wishlist, Cart & Profile Actions */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            
            {/* Search Trigger Button */}
            <button
              onClick={toggleSearch}
              className={`rounded-full p-1.5 sm:p-2 transition-all ${
                isSearchOpen 
                  ? 'bg-[#C59B27] text-white shadow-sm' 
                  : 'text-[#26221F] hover:bg-[#F4ECE1] hover:text-[#C59B27]'
              }`}
              aria-label={isSearchOpen ? 'Close Search' : 'Open Search'}
              title={isSearchOpen ? 'Close Search' : 'Search catalog'}
            >
              {isSearchOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Search className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-1.5 sm:p-2 text-[#26221F] hover:text-[#C59B27] hover:bg-[#F4ECE1] rounded-full transition-all"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[9px] sm:text-[10px] font-bold text-white bg-[#C59B27] rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-1.5 sm:p-2 text-[#26221F] hover:text-[#C59B27] hover:bg-[#F4ECE1] rounded-full transition-all"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[9px] sm:text-[10px] font-bold text-white bg-[#C59B27] rounded-full animate-scale-in">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            <Link
              to={isAuthenticated ? '/profile' : '/login'}
              className="flex items-center p-1 text-[#26221F] hover:text-[#C59B27] rounded-full transition-all"
              title={isAuthenticated ? 'Customer Account' : 'Sign In'}
            >
              {isAuthenticated && user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-[#C59B27]"
                />
              ) : (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAD7AD] flex items-center justify-center text-[#855F14]">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              )}
            </Link>

            {/* Admin Dashboard Quick Access - RBAC: Admin Only */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold bg-[#FAF3E6] border border-[#DFBC77]/80 text-[#9E7318] hover:bg-[#C59B27] hover:text-white transition-all shadow-sm animate-scale-in"
                title="Admin Dashboard (Manage Products & Offers)"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Dropdown Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-[#E8DFC8] bg-[#FAF3E6]/95 backdrop-blur-md px-4 py-3.5 sm:py-4 shadow-xl transition-all duration-300 animate-fade-in">
          <div className="max-w-3xl mx-auto space-y-2.5">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-4 w-4 sm:w-5 h-4 sm:h-5 text-[#C59B27] pointer-events-none" />
              <input
                type="text"
                placeholder="Search luxury makeup, Kundan jewellery, scented candles, salon services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-11 sm:pl-12 pr-24 py-2.5 sm:py-3 text-xs sm:text-sm rounded-full border border-[#C59B27]/40 bg-white text-[#1C1917] placeholder:text-stone-400 focus:outline-none focus:border-[#C59B27] focus:ring-2 focus:ring-[#C59B27]/25 shadow-inner"
              />
              <div className="absolute right-2 flex items-center gap-1.5">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 sm:p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
                    title="Clear input"
                  >
                    <X className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-[#D4AF37] to-[#B3861B] rounded-full hover:shadow-md hover:scale-102 transition-all"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Popular Searches Quick Tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              <span className="text-stone-400 tracking-wider font-bold whitespace-nowrap text-[10px]">
                Popular:
              </span>
              {[
                'Kundan Haar',
                'Gold Jhumkas',
                'Silk Foundation',
                'Press-On Nails',
                'Mogra Candles',
                'Bridal Makeover'
              ].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    navigate(`/products?search=${encodeURIComponent(term)}`);
                    setIsSearchOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-full bg-white border border-[#DFBC77]/60 text-[#855F14] hover:bg-[#C59B27] hover:text-white transition-all whitespace-nowrap shadow-xs font-medium"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-menu" className="lg:hidden bg-[#FAF3E6]/98 backdrop-blur-md border-b border-[#E8DFC8] px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#26221F] hover:bg-[#F4ECE1] hover:text-[#C59B27]"
            >
              {item.label}
            </Link>
          ))}
          <div className="rounded-xl border border-[#E8DFC8] bg-white/70 p-3">
            <p className="px-1 pb-1 text-[10px] font-bold tracking-[0.1em] text-[#9b711e]">Services</p>
            <div className="grid grid-cols-2 gap-1">
              {[
                { label: 'Makeup', path: '/services/makeup' },
                { label: 'Salon', path: '/services/salon' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    location.pathname === item.path ? 'bg-[#f3e7cb] text-[#815f19]' : 'text-[#26221F] hover:bg-[#F4ECE1]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="mt-1 block rounded-lg px-3 py-1.5 text-xs text-stone-500 hover:text-[#9b711e]">
              View all services
            </Link>
          </div>
          <Link
            to={bookingLink.path}
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B3861B] px-3 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Book Appointment
          </Link>
          <div className="pt-2 border-t border-[#E8DFC8]/60 space-y-1">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-sm text-[#26221F] hover:bg-[#F4ECE1] rounded-lg"
            >
              <User className="w-4 h-4 text-[#C59B27]" />
              <span>My Profile & Account</span>
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-[#9E7318] bg-[#FAF3E6] rounded-lg"
              >
                <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
                <span>Admin Dashboard (Products & Offers)</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
