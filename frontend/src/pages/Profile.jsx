import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  Heart, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Edit3, 
  ChevronRight, 
  X,
  Upload,
  Check,
  Image as ImageIcon,
  ShieldCheck,
  Camera,
  Phone,
  User,
  Mail,
  Package,
  Ticket
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, updateProfile, logout } = useAuth();
  const { showToast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(user?.avatar || '');
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  const [ordersStat, setOrdersStat] = useState({ userId: null, count: null });
  const [wishlistStat, setWishlistStat] = useState({ userId: null, count: null });
  const [statsError, setStatsError] = useState({ userId: null, message: '' });
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponsLoaded, setCouponsLoaded] = useState(false);
  const [couponsError, setCouponsError] = useState('');
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const avatarInitials = (user?.name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  useEffect(() => {
    let active = true;
    if (!user?.id) return () => { active = false; };

    api.getMyOrders()
      .then((res) => {
        if (active) setOrdersStat({ userId: user.id, count: res.orders.length });
      })
      .catch((error) => {
        console.error('Could not load the signed-in user orders:', error.message);
        if (active) setStatsError({ userId: user.id, message: error.message });
      });
    api.getMyWishlist()
      .then((res) => {
        if (active) setWishlistStat({ userId: user.id, count: res.wishlist.length });
      })
      .catch((error) => {
        console.error('Could not load the signed-in user wishlist:', error.message);
        if (active) setStatsError({ userId: user.id, message: error.message });
      });
    api.getOffers()
      .then((res) => {
        if (!active) return;
        const now = Date.now();
        const offers = res.offers.filter((offer) => {
          if (offer.isActive === false) return false;
          if (!offer.validTill) return true;
          return new Date(`${offer.validTill}T23:59:59`).getTime() >= now;
        });
        setAvailableCoupons(offers);
        setCouponsLoaded(true);
      })
      .catch((error) => {
        console.error('Could not load active offers:', error.message);
        if (active) {
          setCouponsError(error.message);
          setCouponsLoaded(true);
        }
      });

    return () => { active = false; };
  }, [user?.id]);

  // Auth guard: redirect to login if not authenticated (safe after all hooks)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Optimize and resize uploaded image (crystal clear & lightweight)
  const processImageFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WEBP, GIF, SVG, etc.)', 'error');
      return;
    }

    setSelectedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 480;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
        setPreviewPhoto(optimizedDataUrl);
        setIsPhotoModalOpen(true);
        showToast('Image ready! Click "Save Photo" to apply.', 'info');
      };
      img.onerror = () => {
        showToast('Unable to process image file.', 'error');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
    // Reset file input value so user can reselect the same file if needed
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Save photo to auth state & backend
  const handleApplyPhoto = async () => {
    try {
      await updateProfile({ avatar: previewPhoto });
      setIsPhotoModalOpen(false);
      showToast('Profile photo updated successfully!', 'success');
    } catch (error) {
      showToast(error.message || 'Could not update your profile photo.', 'error');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim()
      });
      setIsEditModalOpen(false);
      showToast('Profile details updated successfully!', 'success');
    } catch (error) {
      showToast(error.message || 'Could not update your profile details.', 'error');
    }
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out of Nihara account', 'info');
    navigate('/login');
  };

  const menuItems = [
    ...(isAdmin ? [
      {
        title: 'Admin Dashboard (Catalog & Offers)',
        subtitle: 'Manage products, stock levels & active promo coupons',
        icon: ShieldCheck,
        link: '/admin',
        badge: 'Admin Panel'
      },
      {
        title: 'Settings',
        subtitle: 'Manage store preferences',
        icon: Settings,
        link: '/admin/settings'
      }
    ] : []),
    {
      title: 'My Orders',
      subtitle: 'Track past purchases and active orders',
      icon: ShoppingBag,
      link: '/orders'
    },
    {
      title: 'My Bookings',
      subtitle: 'View upcoming salon & at-home appointments',
      icon: Calendar,
      link: '/bookings'
    },
    {
      title: 'Saved Addresses',
      subtitle: 'Manage home & office delivery addresses',
      icon: MapPin,
      link: '/addresses'
    },
    {
      title: 'My Wishlist',
      subtitle: 'Saved items & beauty favorites',
      icon: Heart,
      link: '/wishlist'
    },
    {
      title: 'Help & Concierge Support',
      subtitle: 'support@niharadaura.com • 24/7 Support',
      icon: HelpCircle,
      onClick: () => showToast('Concierge: support@niharadaura.com | +91 92660 59846', 'info')
    }
  ];

  return (
    <div className="min-h-screen bg-transparent py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8 max-w-2xl lg:max-w-3xl mx-auto">
      
      {/* Title */}
      <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#1C1917] mb-6 lg:mb-10">
        My Profile
      </h1>

      {/* User Info Card matching screenshot */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-5 lg:p-6 shadow-sm flex items-center justify-between gap-4 mb-4 sm:mb-5">
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
          
          {/* Avatar with Golden border & Golden Camera badge */}
          <div 
            className="relative group cursor-pointer flex-shrink-0"
            onClick={() => {
              setPreviewPhoto(user?.avatar || '');
              setSelectedFileName('');
              fileInputRef.current?.click();
            }}
            title="Click to upload profile photo"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || 'Profile'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#C59B27] shadow-sm group-hover:opacity-90 transition-all"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF3E8] border-2 border-[#C59B27] text-[#855F14] flex items-center justify-center font-semibold text-lg">
                {avatarInitials || <User className="w-7 h-7" />}
              </div>
            )}
            <div 
              className="absolute -bottom-0.5 -right-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#C59B27] text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 group-hover:bg-[#A87D17] transition-transform"
              title="Upload photo"
            >
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>

          {/* User Details: Only Name, Email, Phone Number */}
          <div className="min-w-0">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] tracking-tight truncate">
              {user?.name || 'Name not provided'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5 truncate">
              {user?.email || 'Email not provided'}
            </p>
            {user?.phone && (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium mt-1">
                <Phone className="w-3.5 h-3.5 text-[#E91E63] fill-[#E91E63] flex-shrink-0" />
                <span className="text-[#855F14] font-semibold tracking-wide">
                  {user.phone}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Action: Pencil Edit Button with warm golden background */}
        <button
          onClick={() => {
            setFormData({
              name: user?.name || '',
              email: user?.email || '',
              phone: user?.phone || ''
            });
            setIsEditModalOpen(true);
          }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#FAF3E8] hover:bg-[#F2E5CE] text-[#855F14] border border-[#DFBC77]/40 flex items-center justify-center transition-all shadow-sm flex-shrink-0"
          title="Edit profile details"
        >
          <Edit3 className="w-5 h-5 text-[#855F14]" />
        </button>
      </div>

      {/* 3 Stats Cards Row (Orders, Wishlist, Coupons) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 lg:mb-8">
        
        {/* Orders Card (Golden theme) */}
        <div 
          onClick={() => navigate('/orders')}
          className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-5 shadow-sm text-center flex flex-col items-center justify-center hover:border-[#C59B27]/60 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF3E8] text-[#855F14] border border-[#DFBC77]/30 flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-[#C59B27] group-hover:text-white transition-all">
            <Package className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl sm:text-2xl text-[#1C1917] leading-none mb-1">
            {ordersStat.userId === user?.id ? ordersStat.count : '—'}
          </span>
          <span className="text-xs text-stone-500 font-medium">
            Orders
          </span>
        </div>

        {/* Wishlist Card */}
        <div 
          onClick={() => navigate('/wishlist')}
          className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-5 shadow-sm text-center flex flex-col items-center justify-center hover:border-[#C59B27]/60 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 text-rose-500" />
          </div>
          <span className="font-bold text-xl sm:text-2xl text-[#1C1917] leading-none mb-1">
            {wishlistStat.userId === user?.id ? wishlistStat.count : '—'}
          </span>
          <span className="text-xs text-stone-500 font-medium">
            Wishlist
          </span>
        </div>

        {/* Coupons Card */}
        <div 
          onClick={() => {
            if (!couponsLoaded) return;
            if (availableCoupons.length > 0) {
              setIsCouponModalOpen(true);
            } else {
              navigate('/cart');
            }
          }}
          className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-5 shadow-sm text-center flex flex-col items-center justify-center hover:border-[#C59B27]/60 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFF3E0] text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Ticket className="w-5 h-5 text-amber-600" />
          </div>
          <span className="font-bold text-xl sm:text-2xl text-[#1C1917] leading-none mb-1">
            {couponsLoaded ? availableCoupons.length : '—'}
          </span>
          <span className="text-xs text-stone-500 font-medium">
            Coupons
          </span>
        </div>

      </div>

      {statsError.userId === user?.id && statsError.message && (
        <p role="alert" className="text-center text-sm text-rose-700 mb-5">
          Could not load your profile activity: {statsError.message}
        </p>
      )}
      {couponsError && (
        <p role="alert" className="text-center text-sm text-rose-700 mb-5">
          Could not load available coupons: {couponsError}
        </p>
      )}

      {/* Menu Options List with warm luxury golden styling */}
      <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-10">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const content = (
            <div className="group flex items-center justify-between p-4 lg:p-5 bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-sm hover:border-[#C59B27]/60 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-[#FAF3E8] text-[#855F14] border border-[#DFBC77]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C59B27] group-hover:text-white transition-all shadow-sm">
                  <Icon className="w-5 h-5 lg:w-5.5 lg:h-5.5 transition-transform group-hover:scale-105" />
                </div>
                <div>
                  <h3 className="font-serif text-sm lg:text-base font-bold text-[#1C1917] group-hover:text-[#855F14] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-stone-500 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-stone-400 group-hover:text-[#C59B27] group-hover:translate-x-1 transition-all" />
            </div>
          );

          if (item.link) {
            return (
              <Link key={idx} to={item.link} className="block">
                {content}
              </Link>
            );
          }
          return (
            <div key={idx} onClick={item.onClick} className="block">
              {content}
            </div>
          );
        })}

        {/* Log Out Option */}
        <div
          onClick={handleLogout}
          className="group flex items-center justify-between p-4 lg:p-5 bg-white rounded-2xl sm:rounded-3xl border border-rose-100/90 shadow-sm hover:border-rose-300 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
              <LogOut className="w-5 h-5 lg:w-5.5 lg:h-5.5 transition-transform group-hover:scale-105" />
            </div>
            <div>
              <h3 className="font-serif text-sm lg:text-base font-bold text-rose-600">
                Log Out
              </h3>
              <p className="text-xs lg:text-sm text-stone-500 mt-0.5">
                Sign out from your Nihara account
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-rose-300 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      {/* Hidden Native File Input (Available always so camera icon triggers device chooser) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.svg,.bmp,.heic"
        className="hidden"
      />

      {/* ================= PURE IMAGE UPLOAD & PREVIEW MODAL ================= */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-stone-200 animate-scale-in relative">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-5">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#C59B27]" />
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  Upload Profile Photo
                </h3>
              </div>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Circular Avatar Preview */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative">
                {previewPhoto ? (
                  <img
                    src={previewPhoto}
                    alt="Profile preview"
                    className="w-28 h-28 rounded-full object-cover border-4 border-[#C59B27] shadow-lg"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-[#FAF3E8] border-4 border-[#C59B27] text-[#855F14] flex items-center justify-center font-semibold text-2xl shadow-lg">
                    {avatarInitials || <User className="w-10 h-10" />}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 px-2 py-0.5 bg-[#C59B27] text-white text-[9px] font-bold uppercase rounded-full shadow">
                  Preview
                </span>
              </div>
              {selectedFileName ? (
                <span className="text-xs font-semibold text-[#855F14] bg-[#FAF3E8] px-2.5 py-1 rounded-full mt-2.5 truncate max-w-xs border border-[#DFBC77]/60">
                  ✓ {selectedFileName}
                </span>
              ) : (
                <p className="text-[11px] text-stone-500 mt-2">
                  This photo will appear on your profile & orders
                </p>
              )}
            </div>

            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-7 text-center cursor-pointer transition-all ${
                isDragOver 
                  ? 'border-[#C59B27] bg-[#FAF3E8]' 
                  : 'border-stone-300 hover:border-[#C59B27] bg-[#FCF9F2]'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-white border border-[#DFBC77]/50 text-[#855F14] flex items-center justify-center mx-auto mb-2.5 shadow-sm">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-sm font-bold text-[#1C1917] mb-1">
                Click to browse or drag & drop photo
              </h4>
              <p className="text-[11px] text-stone-500 max-w-xs mx-auto mb-3">
                All formats supported: PNG, JPG, JPEG, WEBP, GIF, SVG
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C59B27] hover:bg-[#A87D17] text-white shadow-sm inline-flex items-center gap-1.5 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Choose From Device</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-5 border-t border-stone-100 mt-5">
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApplyPhoto}
                className="flex-1 bg-[#C59B27] hover:bg-[#A87D17] text-white py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold shadow-md flex items-center justify-center gap-1.5 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Save Photo</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= EDIT PROFILE DETAILS MODAL (Name, Email, Phone only) ================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-stone-200 animate-scale-in relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                  Edit Profile
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Update your name, email address, and mobile number
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-stone-50/50 focus:bg-white focus:outline-none focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
                    placeholder="Enter email address"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-stone-50/50 focus:bg-white focus:outline-none focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Mobile / Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter mobile number"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-stone-50/50 focus:bg-white focus:outline-none focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27] transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#A87D17] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= AVAILABLE COUPONS MODAL ================= */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-stone-200 animate-scale-in relative">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#FFF3E0] text-amber-600 flex items-center justify-center">
                  <Ticket className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                    My Available Coupons
                  </h3>
                  <p className="text-xs text-stone-500">
                    Active promo codes for your orders
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCouponModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {availableCoupons.length > 0 ? (
                availableCoupons.map((c, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#FCF9F2] border border-[#DFBC77]/50 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs uppercase bg-[#C59B27] text-white px-2 py-0.5 rounded-md shadow-sm">
                          {c.code}
                        </span>
                        <span className="text-xs font-bold text-stone-900">
                          {c.value ? (c.type === 'percent' ? `${c.value}% OFF` : `₹${c.value} OFF`) : (c.discountPercent ? `${c.discountPercent}% OFF` : 'Special Offer')}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1">
                        {c.description || c.name || `Valid on orders above ₹${c.minOrder || 0}`}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(c.code);
                        showToast(`Coupon code ${c.code} copied!`, 'success');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white text-[#855F14] border border-[#DFBC77] text-xs font-bold hover:bg-[#FAF3E8] transition-colors shadow-sm"
                    >
                      Copy
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <Ticket className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                  <p className="text-xs text-stone-500 font-medium">No active promo coupons available right now.</p>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setIsCouponModalOpen(false);
                navigate('/cart');
              }}
              className="w-full mt-5 py-2.5 rounded-xl bg-[#C59B27] hover:bg-[#A87D17] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Go to Shopping Bag</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
