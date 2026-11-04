import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { LoaderCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import Logo from '../components/common/Logo';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRegistration = searchParams.get('flow') === 'register';
  const { login } = useAuth();
  const { showToast } = useToast();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const verificationInProgress = useRef(false);

  // Get email from URL params or localStorage
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    } else {
      const storedEmail = localStorage.getItem('pending_email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (val, idx) => {
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);

    // Auto-focus next input
    if (val && idx < 5) {
      const nextInput = document.getElementById(`otp-${idx + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      const prevInput = document.getElementById(`otp-${idx - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async (event) => {
    event?.preventDefault();
    if (verificationInProgress.current) return;

    const fullOtp = otp.join('').trim();
    if (fullOtp.length < 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    if (!email) {
      setErrorMessage('Email not found. Please go back to login.');
      return;
    }

    verificationInProgress.current = true;
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await api.verifyOtp(email, fullOtp);

      if (res && res.success) {
        const verifiedUser = res.user || res.data?.user;
        if (!verifiedUser || !res.token) {
          setErrorMessage('Verification succeeded, but the server did not return a valid sign-in session. Please try again.');
          return;
        }

        // Force admin role if email matches
        if (email === 'amitkry5602@gmail.com') {
          verifiedUser.role = 'admin';
        }

        const loginResult = login(verifiedUser, res.token);
        if (!loginResult.success) {
          setErrorMessage(loginResult.message || 'Could not start your sign-in session. Please try again.');
          return;
        }

        localStorage.removeItem('pending_email');
        localStorage.removeItem('pending_signup_name');
        showToast(`Welcome to Nihara D'Aura, ${verifiedUser.name}!`, 'success');

        // Redirect to admin dashboard if email is amitkry5602@gmail.com
        if (email === 'amitkry5602@gmail.com') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } else {
        setErrorMessage(res?.message || 'Invalid or expired verification code.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Verification error. Please try again.');
    } finally {
      verificationInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;
    if (!email) {
      setErrorMessage('Email not found. Please go back to login.');
      return;
    }

    setIsResending(true);
    setOtp(['', '', '', '', '', '']);
    setErrorMessage('');

    try {
      const res = isRegistration
        ? await api.register(localStorage.getItem('pending_signup_name') || '', email)
        : await api.login(email);
      if (res && res.success) {
        setCountdown(30);
        showToast(`New OTP sent to ${email}`, 'success');
      } else {
        setErrorMessage(res?.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error requesting a fresh OTP.');
    } finally {
      setIsResending(false);
    }

    const firstInput = document.getElementById('otp-0');
    if (firstInput) firstInput.focus();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4 py-12 relative overflow-hidden selection:bg-[#C59B27] selection:text-white">
      {/* Subtle soft warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DFBC77]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-white rounded-[32px] sm:rounded-[36px] border border-[#EBE5D8] p-7 sm:p-10 max-w-sm sm:max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.06)] space-y-6 text-center relative z-10 transition-all">

        <div className="space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <Link to="/" title="Return to Nihara D'Aura Home" className="group">
              <div className="w-20 h-20 rounded-2xl bg-[#FCFAF6] border border-[#DFBC77]/40 flex items-center justify-center p-2.5 shadow-xs transition-transform duration-300 group-hover:scale-105">
                <Logo className="w-full h-full object-contain" alt="Nihara D'Aura" />
              </div>
            </Link>
          </div>

          {/* Tagline */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#DFBC77]/60 bg-[#FAF7F2] text-[#855F14] text-[10.5px] font-semibold tracking-wider uppercase shadow-xs">
              <span>JEWELLERY • MAKEUP • SALON</span>
            </div>
          </div>

          {/* Company Name */}
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Nihara D'Aura
          </h2>

          {/* Back button */}
          <div className="text-left">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#855F14] transition-colors cursor-pointer"
            >
              ← Back
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight">
              Verify Code
            </h1>
            <div className="space-y-1.5">
              <p className="text-sm text-stone-500 font-normal leading-relaxed">
                Enter the 6-digit code sent to
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-stone-800 text-sm font-semibold">{email || 'your email'}</span>
                <Link
                  to="/login"
                  className="text-xs text-[#855F14] hover:text-[#523A0B] font-semibold underline cursor-pointer"
                >
                  Change
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium flex items-start gap-2.5 shadow-xs">
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="space-y-6 pt-1" onSubmit={handleVerify}>
          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                disabled={isSubmitting}
                className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-2xl transition-all shadow-xs ${
                  digit || i === 0
                    ? 'border-2 border-[#855F14] bg-white text-stone-900 focus:outline-none focus:ring-4 focus:ring-[#C59B27]/15'
                    : 'border border-stone-200 bg-[#FAF8F5] text-stone-900 focus:border-2 focus:border-[#855F14] focus:bg-white focus:outline-none'
                } disabled:opacity-50`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl font-bold text-base text-white bg-[#855F14] hover:bg-[#6e4d0d] active:scale-[0.99] shadow-[0_8px_20px_rgba(133,95,20,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70"
          >
            {isSubmitting && <LoaderCircle className="w-4 h-4 animate-spin" />}
            <span>{isSubmitting ? 'Verifying...' : 'Verify & Access Account'}</span>
          </button>

          <div className="flex items-center justify-between text-xs text-stone-600 font-medium pt-1 px-1">
            <span>{countdown > 0 ? `Resend available in ${formatTime(countdown)}` : "Didn't receive code?"}</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={countdown > 0 || isResending}
              className="text-[#855F14] font-bold hover:underline flex items-center gap-1 disabled:text-stone-400 disabled:no-underline disabled:cursor-not-allowed"
            >
              {isResending ? (
                <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3 h-3" />
              )}
              <span>{isResending ? 'Sending...' : 'Resend Code'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
