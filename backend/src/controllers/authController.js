import jwt from 'jsonwebtoken';
import { timingSafeEqual } from 'crypto';
import { User } from '../models/User.js';
import { Otp } from '../models/Otp.js';
import { sendOtpEmail } from '../services/emailService.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';

/**
 * Generate 6-digit numeric OTP
 */
const generate6DigitOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const normalizePhone = (value) => String(value || '').replace(/\D/g, '');

const findUserByPhone = (phone) => {
  const formattedDigits = phone.split('').join('[\\s().-]*');
  const phonePattern = new RegExp(`^(?:\\+?91[\\s().-]*)?${formattedDigits}$`);
  return User.findOne({ phone: phonePattern });
};

const credentialsMatch = (provided, configured) => {
  if (!provided || !configured) return false;
  const providedBuffer = Buffer.from(provided);
  const configuredBuffer = Buffer.from(configured);
  return providedBuffer.length === configuredBuffer.length
    && timingSafeEqual(providedBuffer, configuredBuffer);
};

const signToken = (user) => jwt.sign(
  { id: user.id || user._id.toString(), email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

/**
 * POST /api/auth/login
 * Patron enters email -> receives 6-digit OTP
 * Admin enters email & password -> immediate authentication
 */
export const login = async (req, res, next) => {
  try {
    const { email, phone, password, role } = req.body || {};
    const cleanEmail = (email || '').trim().toLowerCase();

    if (role === 'admin') {
      const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
      const adminPassword = process.env.ADMIN_PASSWORD || '';
      if (!adminEmail || !adminPassword) {
        return errorResponse(res, 'Admin login is not configured on the server', 503);
      }
      if (cleanEmail !== adminEmail || !credentialsMatch(password || '', adminPassword)) {
        return errorResponse(res, 'Invalid admin credentials', 401);
      }

      const adminUser = await User.findOneAndUpdate(
        { email: adminEmail },
        {
          $set: { role: 'admin', tier: 'Master Admin' },
          $setOnInsert: {
            id: `usr_admin_${Date.now()}`,
            name: 'Store Administrator'
          }
        },
        { new: true, upsert: true, runValidators: true }
      );
      return successResponse(res, {
        token: signToken(adminUser),
        user: adminUser
      }, 'Welcome to the Nihara D’Aura management portal');
    }

    const configuredAdminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    if (configuredAdminEmail && cleanEmail === configuredAdminEmail) {
      return errorResponse(res, 'Use the administrator sign-in form for this email address', 403);
    }

    if (!cleanEmail && phone) {
      const cleanPhone = normalizePhone(phone);
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        return errorResponse(res, 'Please enter a valid 10-digit mobile number.', 400);
      }

      const existingPhoneUser = await findUserByPhone(cleanPhone);
      if (!existingPhoneUser) {
        return errorResponse(res, 'No account exists for this mobile number. Please sign up first.', 404);
      }
      return errorResponse(res, 'Phone OTP sign-in is not configured yet. Please sign in with your email.', 503);
    }

    // Standard Email format validation
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return errorResponse(res, 'Please enter a valid standard email address in lowercase (e.g., name@domain.com).', 400);
    }

    // Check if user exists (optional info)
    const existingUser = await User.findOne({ email: cleanEmail });
    if (!existingUser) {
      return errorResponse(res, 'No account exists for this email. Please sign up first.', 404);
    }
    if (existingUser?.role === 'admin') {
      return errorResponse(res, 'Admin accounts must use the configured administrator sign-in', 403);
    }

    // Generate real 6-digit OTP
    const otpCode = generate6DigitOtp();

    // Store in Otp collection with 10-minute expiry
    await Otp.findOneAndUpdate(
      { email: cleanEmail },
      {
        email: cleanEmail,
        otp: otpCode,
        fullName: existingUser?.name || '',
        purpose: 'login',
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );

    const delivery = await sendOtpEmail(cleanEmail, otpCode, existingUser?.name || '', 'login');
    if (!delivery.sent) {
      await Otp.deleteOne({ email: cleanEmail, otp: otpCode });
      return errorResponse(res, 'We could not send the verification email. Please try again later.', 503);
    }

    return successResponse(res, {
      email: cleanEmail,
      requiresOtp: true,
      exists: Boolean(existingUser)
    }, `Verification OTP has been sent to ${cleanEmail}. Valid for 10 minutes.`);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/register
 * Patron enters fullName & email -> receives 6-digit OTP
 */
export const register = async (req, res, next) => {
  try {
    const { fullName, name, email, phone } = req.body || {};
    const rawName = fullName || name || '';
    const cleanName = rawName.trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPhone = normalizePhone(phone);
    const isPhoneSignup = !cleanEmail && Boolean(phone);

    // Name validation: only alphabets and spaces, min 2 chars
    const nameRegex = /^[a-zA-Z\s'.]{2,50}$/;
    if (!cleanName || !nameRegex.test(cleanName)) {
      return errorResponse(res, 'Name must only contain alphabetic letters and spaces (minimum 2 characters).', 400);
    }

    if (isPhoneSignup) {
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        return errorResponse(res, 'Please provide a valid 10-digit mobile number.', 400);
      }
    } else {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!cleanEmail || !emailRegex.test(cleanEmail)) {
        return errorResponse(res, 'Please provide a valid email address.', 400);
      }
    }

    const existing = isPhoneSignup
      ? await findUserByPhone(cleanPhone)
      : await User.findOne({ email: cleanEmail });
    if (existing) {
      const identifier = isPhoneSignup ? 'mobile number' : 'email';
      return errorResponse(res, `An account with this ${identifier} already exists. Please log in instead.`, 409);
    }

    if (isPhoneSignup) {
      return errorResponse(res, 'Phone OTP verification is not configured yet. Please sign up with your email for now.', 503);
    }

    // Generate real 6-digit OTP
    const otpCode = generate6DigitOtp();

    // Store in Otp collection
    await Otp.findOneAndUpdate(
      { email: cleanEmail },
      {
        email: cleanEmail,
        otp: otpCode,
        fullName: cleanName,
        purpose: 'register',
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );

    const delivery = await sendOtpEmail(cleanEmail, otpCode, cleanName, 'register');
    if (!delivery.sent) {
      await Otp.deleteOne({ email: cleanEmail, otp: otpCode });
      return errorResponse(res, 'We could not send the verification email. Please try again later.', 503);
    }

    return successResponse(res, {
      email: cleanEmail,
      fullName: cleanName,
      requiresOtp: true
    }, `Verification OTP dispatched to ${cleanEmail}. Valid for 10 minutes.`, 201);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/verify-otp
 * Verifies the 6-digit code and logs the user in
 */
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body || {};
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanOtp = (otp || '').trim();

    if (!cleanEmail || !cleanOtp) {
      return errorResponse(res, 'Please provide both email address and verification OTP.', 400);
    }

    // Check in Otp collection or fallback to dev master code '123456'
    const storedOtp = await Otp.findOne({ email: cleanEmail, otp: cleanOtp });
    if (!storedOtp) {
      return errorResponse(res, 'Invalid or expired verification code. Please request a new OTP.', 400);
    }

    // If OTP was verified, remove it so it cannot be reused
    if (storedOtp) {
      await Otp.deleteOne({ _id: storedOtp._id });
    }

    // Check if user already exists in DB
    let user = await User.findOne({ email: cleanEmail });
    if (user?.role === 'admin') {
      return errorResponse(res, 'Admin accounts must use the configured administrator sign-in', 403);
    }

    // If user does not exist (Registration flow), create user record in MongoDB
    if (!user) {
      if (storedOtp.purpose !== 'register') {
        return errorResponse(res, 'No account exists for this email. Please sign up first.', 404);
      }
      const savedName = storedOtp?.fullName || cleanEmail.split('@')[0] || 'Royal Patron';
      user = await User.create({
        id: `usr_${Date.now()}`,
        name: savedName,
        email: cleanEmail,
        phone: '',
        role: 'user',
        tier: 'Royal Patron',
        rewardPoints: 100
      });
    }

    // Issue JWT token
    const token = jwt.sign(
      { id: user.id || user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return successResponse(res, {
      token,
      user
    }, `Welcome to Nihara D'Aura, ${user.name}!`);
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ id: req.userId }, ...(req.userId.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: req.userId }] : [])]
    });
    if (!user) return errorResponse(res, 'User not found', 404);
    return successResponse(res, { user });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    return successResponse(res, null, 'Logged out successfully');
  } catch (err) {
    next(err);
  }
};
