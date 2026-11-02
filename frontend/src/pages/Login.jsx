import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Lock,
  Mail, 
  Phone,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Edit3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import Logo from '../components/common/Logo';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const { showToast } = useToast();

  const roleParam = searchParams.get('role');
  const redirectParam = searchParams.get('redirect');
  const emailParam = searchParams.get('email');
  const verifyParam = searchParams.get('verify');

  // Admin Mode detection
  const [isAdminMode, setIsAdminMode] = useState(
    roleParam === 'admin' || redirectParam === '/admin'
  );

  // OTP flow step: 'enter_identifier' | 'enter_otp'
  const [otpStep, setOtpStep] = useState('enter_identifier');

  // Patron input (Email or Phone Number)
  const [identifier, setIdentifier] = useState('');

  // Admin credentials (only for Staff Portal)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  
  // 6-digit OTP array
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputsRef = useRef([]);

  // States
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Check if identifier is phone-like
  const isPhoneInput = Boolean(identifier && !identifier.includes('@') && /^[+0-9\s-]+$/.test(identifier.trim()));

  // Sync params if URL changes (Admin mode or Registration redirect)
  useEffect(() => {
    if (roleParam === 'admin' || redirectParam === '/admin') {
      setIsAdminMode(true);
    }
    if (emailParam) {
      setIdentifier(emailParam);
      if (verifyParam === 'true') {
        setOtpStep('enter_otp');
        setResendTimer(45);
      }
    }
  }, [roleParam, redirectParam, emailParam, verifyParam]);

  // Resend Countdown Timer
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // If already authenticated, redirect
  if (isAuthenticated) {
    if (isAdminMode && isAdmin) {
      return <Navigate to={redirectParam || '/admin'} replace />;
    }
    if (!isAdminMode) {
      return <Navigate to={redirectParam && redirectParam !== '/admin' ? redirectParam : '/profile'} replace />;
    }
  }

  // Handle Send OTP (Email via Real Backend)
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const cleanInput = identifier.trim().toLowerCase();
    if (!cleanInput) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(cleanInput)) {
      setErrorMessage('Please enter a valid standard email address in lowercase (e.g., yourname@domain.com).');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.login(cleanInput);
      setIsSubmitting(false);

      if (res && res.success) {
        localStorage.setItem('pending_email', cleanInput);
        showToast(res.message || `Verification OTP sent to ${cleanInput}`, 'success');
        navigate('/verify-otp');
      } else {
        setErrorMessage(res?.message || 'Failed to dispatch OTP. Please check your email and try again.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Connection error. Please try again.');
    }
  };

  // Handle OTP digit changes
  const handleOtpDigitChange = (val, idx) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    const newOtp = [...otp];

    if (cleaned.length > 1) {
      const pasted = cleaned.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pasted[i] || '';
      }
      setOtp(newOtp);
      const nextFocus = Math.min(pasted.length, 5);
      if (otpInputsRef.current[nextFocus]) {
        otpInputsRef.current[nextFocus].focus();
      }
      return;
    }

    newOtp[idx] = cleaned;
    setOtp(newOtp);

    if (cleaned && idx < 5) {
      if (otpInputsRef.current[idx + 1]) {
        otpInputsRef.current[idx + 1].focus();
      }
    }
  };

  // Handle Backspace in OTP boxes
  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      if (otpInputsRef.current[idx - 1]) {
        otpInputsRef.current[idx - 1].focus();
      }
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    const cleanInput = identifier.trim().toLowerCase();
    setResendTimer(45);
    setOtp(['', '', '', '', '', '']);

    try {
      const res = await api.login(cleanInput);
      if (res && res.success) {
        showToast(res.message || `Fresh OTP dispatched to ${cleanInput}`, 'info');
      } else {
        showToast(res?.message || 'Failed to resend OTP', 'error');
      }
    } catch (err) {
      showToast('Error requesting fresh OTP', 'error');
    }

    if (otpInputsRef.current[0]) {
      otpInputsRef.current[0].focus();
    }
  };

  // Submit OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const fullOtp = otp.join('').trim();

    if (fullOtp.length < 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsSubmitting(true);
    const cleanEmail = identifier.trim().toLowerCase();

    try {
      const res = await api.verifyOtp(cleanEmail, fullOtp);
      setIsSubmitting(false);

      if (res && res.success) {
        const verifiedUser = res.user || res.data?.user || {
          id: 'usr_' + Date.now(),
          name: cleanEmail.split('@')[0] || 'Royal Patron',
          email: cleanEmail,
          role: 'user',
          tier: 'Royal Patron',
          rewardPoints: 100
        };

        const loginResult = login(verifiedUser, res.token);
        if (!loginResult.success) {
          setErrorMessage(loginResult.message);
          return;
        }
        showToast(`Welcome back, ${verifiedUser.name || 'Patron'}! Authentication verified.`, 'success');

        if (verifiedUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate(redirectParam && redirectParam !== '/admin' ? redirectParam : '/profile');
        }
      } else {
        setErrorMessage(res?.message || 'Invalid or expired verification code.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Verification error. Please try again.');
    }
  };

  // Submit Admin Password Login (Staff only)
  const handleAdminPasswordLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const cleanEmail = adminEmail.trim().toLowerCase();
    try {
      const response = await api.login(cleanEmail, adminPassword, 'admin');
      if (!response?.success || !response.token || response.user?.role !== 'admin') {
        setErrorMessage(response?.message || 'Administrator authentication failed.');
        return;
      }
      const result = login(response.user, response.token);
      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }
      showToast('Administrator sign-in successful.', 'success');
      navigate(redirectParam || '/admin');
    } catch (error) {
      setErrorMessage(error.message || 'Administrator authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4 py-12 relative overflow-hidden selection:bg-[#C59B27] selection:text-white">
      {/* Subtle soft warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DFBC77]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Luxury Login Card */}
      <div className="bg-white rounded-[32px] sm:rounded-[36px] border border-[#EBE5D8] p-7 sm:p-10 max-w-sm sm:max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.06)] space-y-6 relative z-10 text-center transition-all">
        
        {/* Top Branding Section */}
        <div className="text-center space-y-3.5">
          {/* Squircle Logo Container */}
          <div className="flex justify-center">
            <Link to="/" title="Return to Nihara D'Aura Home" className="group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FCFAF6] border border-[#DFBC77]/40 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-300 group-hover:scale-105">
                <Logo className="w-full h-full object-contain" alt="Nihara D'Aura" />
              </div>
            </Link>
          </div>

          {/* Pill Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#DFBC77]/60 bg-[#FAF7F2] text-[#855F14] text-[10.5px] font-semibold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>
                {isAdminMode 
                  ? 'STAFF PORTAL ACCESS' 
                  : otpStep === 'enter_otp' 
                    ? 'SECURITY VERIFICATION' 
                    : 'PURE AYURVEDIC SWEETNESS'}
              </span>
            </div>
          </div>

          {/* Brand Name exactly like Kosmico Wellness */}
          {!isAdminMode && otpStep !== 'enter_otp' && (
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Nihara D'Aura
            </h2>
          )}

          {/* Screen Title & Subtitle */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight">
              {isAdminMode 
                ? 'Staff Portal' 
                : otpStep === 'enter_otp' 
                  ? 'Verify Security Code' 
                  : 'Welcome Back'}
            </h1>
            <p className="text-sm text-stone-500 font-normal max-w-xs mx-auto leading-relaxed">
              {isAdminMode
                ? 'Enter administrative credentials to access management console'
                : otpStep === 'enter_otp'
                  ? `Enter the 6-digit verification code dispatched to ${identifier}`
                  : 'Enter your email or phone number to receive an OTP'}
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium flex items-start gap-2.5 shadow-xs animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* -------------------- ADMIN LOGIN FORM -------------------- */}
        {isAdminMode ? (
          <form onSubmit={handleAdminPasswordLogin} className="space-y-4">
            <div>
              <label className="text-xs sm:text-[13px] font-['Times_New_Roman',_Times,_serif] font-normal tracking-wide text-stone-700 block mb-2 text-left">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C59B27]">
                  <Mail className="w-4 h-4 text-[#C59B27]" />
                </div>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@niharadaura.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-[#C59B27] hover:border-[#855F14] focus:border-[#855F14] bg-[#FCFAF6] focus:bg-white text-stone-900 placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#C59B27]/20 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-[13px] font-['Times_New_Roman',_Times,_serif] font-normal tracking-wide text-stone-700 block mb-2 text-left">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C59B27]">
                  <Lock className="w-4 h-4 text-[#C59B27]" />
                </div>
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3.5 rounded-2xl border-2 border-[#C59B27] hover:border-[#855F14] focus:border-[#855F14] bg-[#FCFAF6] focus:bg-white text-stone-900 placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#C59B27]/20 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  aria-label={showAdminPassword ? 'Hide password' : 'Show password'}
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl font-['Times_New_Roman',_Times,_serif] text-base tracking-wider text-white bg-gradient-to-r from-[#9E7318] via-[#C59B27] to-[#855F14] hover:from-[#B0831D] hover:via-[#D4AF37] hover:to-[#9E7318] shadow-[0_12px_28px_rgba(184,134,11,0.32)] hover:shadow-[0_16px_36px_rgba(184,134,11,0.42)] flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Access Admin Console →'}</span>
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsAdminMode(false);
                  setErrorMessage('');
                  setAdminEmail('');
                  setAdminPassword('');
                }}
                className="text-xs font-['Times_New_Roman',_Times,_serif] font-normal text-[#855F14] hover:underline cursor-pointer"
              >
                ← Return to Patron Login
              </button>
            </div>
          </form>
        ) : (
          /* -------------------- USER PASSWORDLESS OTP LOGIN -------------------- */
          <div className="space-y-4">
            {otpStep === 'enter_identifier' ? (
              /* Step 1: Identifier Input Form */
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="text-left">
                  <label className="text-[11px] sm:text-xs font-bold text-stone-700 tracking-wider uppercase block mb-1.5">
                    EMAIL OR PHONE NUMBER
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#855F14]">
                      {isPhoneInput ? (
                        <Phone className="w-5 h-5 text-[#855F14]" />
                      ) : (
                        <Mail className="w-5 h-5 text-[#855F14]" />
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => {
                        const val = e.target.value;
                        const cleaned = val.includes('@') || /[A-Z]/.test(val) ? val.toLowerCase() : val;
                        setIdentifier(cleaned);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Email or Phone Number"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-[#855F14] bg-white text-stone-900 placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#C59B27]/15 transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl font-bold text-base text-white bg-[#855F14] hover:bg-[#6e4d0d] active:scale-[0.99] shadow-[0_8px_20px_rgba(133,95,20,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 mt-2"
                >
                  <span>{isSubmitting ? 'Sending OTP Code...' : 'Login →'}</span>
                </button>
              </form>
            ) : (
              /* Step 2: 6-Digit OTP Verification Form */
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="flex items-center justify-between text-xs text-stone-700 px-3 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8]">
                  <span>Dispatched to: <b className="text-stone-900">{identifier}</b></span>
                  <button
                    type="button"
                    onClick={() => setOtpStep('enter_identifier')}
                    className="text-[#855F14] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Change</span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-2 text-center uppercase tracking-wider">
                    Enter 6-Digit Verification Code
                  </label>
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputsRef.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpDigitChange(e.target.value, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                        className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold text-stone-900 bg-[#FCFAF6] focus:bg-white border-2 border-[#855F14] rounded-xl focus:ring-4 focus:ring-[#C59B27]/15 transition-all shadow-xs"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600 pt-1 px-1">
                  <span>Didn't receive code?</span>
                  {resendTimer > 0 ? (
                    <span className="text-stone-400 font-medium">Resend in {resendTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#855F14] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Resend Code</span>
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl font-bold text-base text-white bg-[#855F14] hover:bg-[#6e4d0d] active:scale-[0.99] shadow-[0_8px_20px_rgba(133,95,20,0.25)] flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Verifying Code...' : 'Verify & Enter →'}</span>
                </button>
              </form>
            )}

            {/* Passwordless & Encrypted Trust Row */}
            <div className="flex items-center justify-center gap-4 pt-1 text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#855F14]" /> Passwordless
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#855F14]" /> 256-Bit Encrypted
              </span>
            </div>

            {/* Footer Navigation */}
            <div className="text-center text-xs sm:text-sm text-stone-600 font-medium pt-1 space-y-2">
              <div>
                Don't have an account?{' '}
                <Link to="/register" className="text-[#855F14] font-bold hover:underline ml-1">
                  Sign Up
                </Link>
              </div>

              {!isAdminMode && (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminMode(true);
                      setErrorMessage('');
                    }}
                    className="text-[11px] text-stone-400 hover:text-[#855F14] transition-colors cursor-pointer"
                  >
                    Staff Portal Access
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
