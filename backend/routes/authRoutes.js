const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Configure Nodemailer (Hostinger SMTP for official domain / Gmail for personal)
const isGmail = (process.env.EMAIL_USER || '').toLowerCase().endsWith('@gmail.com');

const transporter = nodemailer.createTransport(
  isGmail
    ? {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      }
    : {
        host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
        port: parseInt(process.env.EMAIL_PORT || '465', 10),
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      }
);

// Generate 6-digit numeric OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper: Send OTP Email
const sendOTPEmail = async (email, name, otp, purpose = 'registration') => {
  console.log(`\n========================================`);
  console.log(`[AUTH] ${purpose.toUpperCase()} OTP for ${email}: ${otp}`);
  console.log(`========================================\n`);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return false;
  }

  try {
    const mailOptions = {
      from: `"Nihara D'Aura" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your OTP for Nihara D'Aura`,
      text: `Hello ${name || 'User'},\n\nYour OTP is: ${otp}\nIt is valid for 10 minutes.\n\nThank you,\nNihara D'Aura Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #f0e6d2; border-radius: 10px; background-color: #fffdfa;">
          <h2 style="color: #2b1f14; text-align: center; margin-bottom: 8px;">Nihara D'Aura</h2>
          <p style="color: #6d5b45; text-align: center; font-size: 14px; margin-top: 0;">Luxury Bridal, Jewellery & Self-Care</p>
          <hr style="border: 0; border-top: 1px solid #ebdcc5; margin: 20px 0;" />
          <p style="color: #333; font-size: 15px;">Hello <strong>${name || 'Valued Guest'}</strong>,</p>
          <p style="color: #555; font-size: 14px; line-height: 1.5;">Please use the one-time password (OTP) below to complete your authentication:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #b38728; background: #faf4e8; padding: 14px 28px; border: 1px dashed #b38728; border-radius: 8px; display: inline-block;">${otp}</span>
          </div>
          <p style="color: #888; font-size: 13px; text-align: center;">This OTP is valid for <strong>10 minutes</strong>. Do not share this code with anyone.</p>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error('Nodemailer error (Check EMAIL_USER and EMAIL_PASS in .env):', err.message);
    return false;
  }
};

// 1. Register: Create Account with Name & Email -> Send OTP
router.post('/register', async (req, res) => {
  try {
    const { fullName, name, email, mobileNumber, phone, avatar } = req.body;

    const resolvedName = fullName || name;
    const resolvedPhone = mobileNumber || phone || '';

    if (!resolvedName || !email) {
      return res.status(400).json({ success: false, error: 'fullName (or name) and email are required', message: 'fullName and email are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });

    if (user && user.isVerified) {
      return res.status(400).json({ success: false, error: 'User with this email already exists. Please login instead.', message: 'User with this email already exists. Please login instead.' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (!user) {
      user = new User({
        fullName: resolvedName.trim(),
        name: resolvedName.trim(),
        email: normalizedEmail,
        mobileNumber: resolvedPhone.trim(),
        phone: resolvedPhone.trim(),
        otp,
        otpExpires,
        avatar: avatar || '',
        isVerified: false,
      });
    } else {
      user.fullName = resolvedName.trim();
      user.name = resolvedName.trim();
      if (resolvedPhone) {
        user.mobileNumber = resolvedPhone.trim();
        user.phone = resolvedPhone.trim();
      }
      user.otp = otp;
      user.otpExpires = otpExpires;
      if (avatar) user.avatar = avatar;
    }

    await user.save();

    const emailSent = await sendOTPEmail(normalizedEmail, resolvedName, otp, 'Registration');

    res.status(200).json({
      success: true,
      message: emailSent ? 'OTP sent successfully to your email' : 'OTP generated successfully (check server logs in dev)',
      email: normalizedEmail
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ success: false, error: 'Internal server error', message: 'Internal server error' });
  }
});

// 2. Login: Existing user requests OTP via Email
router.post('/login', async (req, res) => {
  try {
    const { email, phone } = req.body;
    const identifier = (email || phone || '').toLowerCase().trim();

    if (!identifier) {
      return res.status(400).json({ success: false, error: 'email or phone is required', message: 'email or phone is required' });
    }

    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier },
        { mobileNumber: identifier }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'No account found with this email/phone. Please register first.', message: 'No account found with this email/phone. Please register first.' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const userName = user.fullName || user.name || 'User';
    const emailSent = await sendOTPEmail(user.email, userName, otp, 'Login');

    res.status(200).json({
      success: true,
      message: emailSent ? 'Login OTP sent successfully to your email' : 'Login OTP generated successfully (check server logs in dev)',
      email: user.email
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ success: false, error: 'Internal server error', message: 'Internal server error' });
  }
});

// 3. Verify OTP: Verifies OTP, activates account & returns JWT auth token + user profile
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'email and otp are required', message: 'email and otp are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { phone: normalizedEmail },
        { mobileNumber: normalizedEmail }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found', message: 'User not found' });
    }

    if (user.otp !== String(otp).trim() || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP', message: 'Invalid or expired OTP' });
    }

    // Mark verified and clear OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate JWT Token
    const jwtSecret = process.env.JWT_SECRET || 'secret123';
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '30d' });

    res.status(200).json({
      success: true,
      message: 'Account verified successfully',
      token,
      user: {
        id: user.id,
        _id: user.id,
        fullName: user.fullName || user.name,
        name: user.name || user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber || user.phone || '',
        phone: user.phone || user.mobileNumber || '',
        avatar: user.avatar || '',
        tier: user.tier || 'Royal Member',
        rewardPoints: user.rewardPoints || 0,
        role: user.role || 'user',
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Error in verify-otp:', error);
    res.status(500).json({ success: false, error: 'Internal server error', message: 'Internal server error' });
  }
});

// 4. Validate saved session and return current user profile (GET /api/auth/me)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || 'secret123';

    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    const userId = decoded.user?.id || decoded.id;
    const user = await User.findById(userId).select('-password -otp -otpExpires');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        _id: user.id,
        fullName: user.fullName || user.name,
        name: user.name || user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber || user.phone || '',
        phone: user.phone || user.mobileNumber || '',
        avatar: user.avatar || '',
        tier: user.tier || 'Royal Member',
        rewardPoints: user.rewardPoints || 0,
        role: user.role || 'user',
        isVerified: user.isVerified,
        addresses: user.addresses || [],
        wishlist: user.wishlist || [],
        cart: user.cart || []
      }
    });
  } catch (error) {
    console.error('Error in /auth/me:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
