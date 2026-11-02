import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, Mail, Lock, ShieldCheck, ArrowRight, AlertCircle, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import Logo from '../components/common/Logo';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    identifier: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ name: false, identifier: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Name validation: Only alphabets, spaces, dots, apostrophes (at least 2 chars)
  const validateName = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return 'Please enter your full name.';
    if (trimmed.length < 2) return 'Full Name must be at least 2 characters long.';
    const nameRegex = /^[a-zA-Z\s'.]+$/;
    if (!nameRegex.test(trimmed)) {
      return 'Name must only contain alphabetic letters and spaces (no numbers or special characters).';
    }
    return '';
  };

  // Email / Phone validation: Standard lowercase email format or 10-digit mobile number
  const validateIdentifier = (input) => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return 'Please enter your email or phone number.';

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    const cleanDigits = trimmed.replace(/[^0-9]/g, '');
    const hasLetters = /[a-z]/i.test(trimmed);

    // If it has '@' or alphabets, treat as Email
    if (trimmed.includes('@') || hasLetters) {
      if (!emailRegex.test(trimmed)) {
        return 'Please enter a valid standard email in lowercase (e.g., yourname@domain.com).';
      }
      return '';
    }

    // Otherwise treat as Phone Number
    if (cleanDigits.length !== 10 || !/^[6-9]\d{9}$/.test(cleanDigits)) {
      return 'Please enter a valid 10-digit mobile number (starting with 6, 7, 8, or 9).';
    }

    return '';
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    // Disallow numbers directly in name input
    const cleaned = val.replace(/[0-9]/g, '');
    setFormData((prev) => ({ ...prev, name: cleaned }));
    if (errorMessage) setErrorMessage('');
    if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: false }));
  };

  const handleIdentifierChange = (e) => {
    const cleaned = e.target.value.toLowerCase();
    setFormData((prev) => ({ ...prev, identifier: cleaned }));
    if (errorMessage) setErrorMessage('');
    if (fieldErrors.identifier) setFieldErrors((prev) => ({ ...prev, identifier: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const nameError = validateName(formData.name);
    if (nameError) {
      setErrorMessage(nameError);
      setFieldErrors({ name: true, identifier: false });
      return;
    }

    const identifierError = validateIdentifier(formData.identifier);
    if (identifierError) {
      setErrorMessage(identifierError);
      setFieldErrors({ name: false, identifier: true });
      return;
    }

    setFieldErrors({ name: false, identifier: false });
    setIsSubmitting(true);

    const cleanName = formData.name.trim();
    const cleanIdentifier = formData.identifier.trim().includes('@')
      ? formData.identifier.trim().toLowerCase()
      : formData.identifier.trim().replace(/\D/g, '');

    try {
      const res = await api.register(cleanName, cleanIdentifier);
      setIsSubmitting(false);

      if (res && res.success) {
        localStorage.setItem('pending_signup_name', cleanName);
        localStorage.setItem('pending_email', cleanIdentifier);
        showToast(res.message || `Verification OTP sent to ${cleanIdentifier}!`, 'success');
        navigate('/verify-otp?flow=register');
      } else {
        setErrorMessage(res?.message || 'Registration failed. Please check your details and try again.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Registration request failed. Please try again.');
    }
  };

  const isPhoneInput = Boolean(
    formData.identifier &&
    !formData.identifier.includes('@') &&
    /^[+0-9\s-]+$/.test(formData.identifier.trim())
  );

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4 py-12 relative overflow-hidden selection:bg-[#C59B27] selection:text-white">
      {/* Subtle soft warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DFBC77]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Luxury Register Card */}
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
              <span>JOIN 50,000+ ROYAL PATRONS</span>
            </div>
          </div>

          {/* Heading & Subtitle exactly matching reference */}
          <div className="space-y-1.5 pt-1">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-stone-500 font-normal max-w-xs mx-auto leading-relaxed">
              Sign up with email or phone number for your luxury journey
            </p>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium flex items-start gap-2.5 shadow-xs animate-shake text-left">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FULL NAME */}
          <div className="text-left">
            <label className="text-[11px] sm:text-xs font-bold text-stone-700 tracking-wider uppercase block mb-1.5">
              FULL NAME
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#855F14]">
                <User className="w-5 h-5 text-[#855F14]" />
              </div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Full Name"
                className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 ${
                  fieldErrors.name ? 'border-rose-400 bg-rose-50/30' : 'border-[#855F14] bg-white'
                } text-stone-900 placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#C59B27]/15 transition-all shadow-xs`}
              />
            </div>
          </div>

          {/* EMAIL OR PHONE NUMBER */}
          <div className="text-left">
            <label className="text-[11px] sm:text-xs font-bold text-stone-700 tracking-wider uppercase block mb-1.5">
              EMAIL OR PHONE NUMBER
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                {isPhoneInput ? (
                  <Phone className="w-5 h-5 text-stone-400" />
                ) : (
                  <Mail className="w-5 h-5 text-stone-400" />
                )}
              </div>
              <input
                type="text"
                required
                value={formData.identifier}
                onChange={handleIdentifierChange}
                placeholder="Email or Phone Number"
                className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border ${
                  fieldErrors.identifier ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200 bg-[#FBF9F6]'
                } focus:border-2 focus:border-[#855F14] focus:bg-white text-stone-900 placeholder:text-stone-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#C59B27]/15 transition-all shadow-xs`}
              />
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl font-bold text-base text-white bg-[#855F14] hover:bg-[#6e4d0d] active:scale-[0.99] shadow-[0_8px_20px_rgba(133,95,20,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 mt-2"
          >
            <span>{isSubmitting ? 'Creating Account...' : 'Create Account →'}</span>
          </button>
        </form>

        {/* Security and Benefits Info Row */}
        <div className="flex items-center justify-center gap-4 pt-1 text-xs text-stone-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#855F14]" /> Passwordless
          </span>
          <span className="text-stone-300">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#855F14]" /> 100% Free Signup
          </span>
        </div>

        {/* Footer Navigation */}
        <div className="text-center text-xs sm:text-sm text-stone-600 font-medium pt-1">
          Already have an account?{' '}
          <Link to="/login" className="text-[#855F14] font-bold hover:underline ml-1">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}
