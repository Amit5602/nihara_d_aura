import { User } from '../models/User.js';
import { Address } from '../models/BookingOrderAddress.js';
import { Product } from '../models/Product.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';

const userFilter = (userId) => ({
  $or: [{ id: userId }, ...(userId.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: userId }] : [])]
});

const addressFilter = (id, userId) => ({
  userId,
  $or: [{ id }, ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : [])]
});

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findOne(userFilter(req.userId));
    if (!user) return errorResponse(res, 'User not found', 404);
    return successResponse(res, { user });
  } catch (err) {
    return next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const currentUser = await User.findOne(userFilter(req.userId));
    if (!currentUser) return errorResponse(res, 'User not found', 404);

    const updates = {};
    for (const field of ['name', 'avatar']) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }
    if (req.body.phone !== undefined) {
      if (typeof req.body.phone !== 'string') {
        return errorResponse(res, 'Please provide a valid phone number.', 400);
      }
      const phone = req.body.phone.trim();
      if (phone) {
        const digits = phone.replace(/\D/g, '');
        const mobile = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
        if (!/^[6-9]\d{9}$/.test(mobile)) {
          return errorResponse(res, 'Please provide a valid 10-digit mobile number.', 400);
        }
        const formattedDigits = mobile.split('').join('[\\s().-]*');
        const phonePattern = new RegExp(`^(?:\\+?91[\\s().-]*)?${formattedDigits}$`);
        const existingPhone = await User.findOne({
          phone: phonePattern,
          _id: { $ne: currentUser._id }
        });
        if (existingPhone) {
          return errorResponse(res, 'An account already exists with this phone number.', 409);
        }
      }
      updates.phone = phone;
    }

    if (req.body.email !== undefined) {
      const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailRegex.test(email)) {
        return errorResponse(res, 'Please provide a valid email address.', 400);
      }

      const existingUser = await User.findOne({ email, _id: { $ne: currentUser._id } });
      if (existingUser) {
        return errorResponse(res, 'An account already exists with this email address.', 409);
      }
      updates.email = email;
    }

    const user = await User.findOneAndUpdate(userFilter(req.userId), { $set: updates }, {
      new: true,
      runValidators: true
    });
    if (!user) return errorResponse(res, 'User not found', 404);
    return successResponse(res, { user }, 'Profile updated successfully');
  } catch (err) {
    return next(err);
  }
};

export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ userId: req.userId }).sort({ createdAt: -1 });
    return successResponse(res, { addresses });
  } catch (err) {
    return next(err);
  }
};

export const addAddress = async (req, res, next) => {
  try {
    const address = await Address.create({
      ...req.body,
      userId: req.userId,
      id: `addr_${Date.now()}`
    });
    return successResponse(res, { address }, 'Address saved', 201);
  } catch (err) {
    return next(err);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const address = await Address.findOneAndUpdate(
      addressFilter(req.params.id, req.userId),
      req.body,
      { new: true, runValidators: true }
    );
    if (!address) return errorResponse(res, 'Address not found', 404);
    return successResponse(res, { address });
  } catch (err) {
    return next(err);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOneAndDelete(addressFilter(req.params.id, req.userId));
    if (!address) return errorResponse(res, 'Address not found', 404);
    return successResponse(res, { id: address.id });
  } catch (err) {
    return next(err);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findOne(userFilter(req.userId)).select('wishlist');
    if (!user) return errorResponse(res, 'User not found', 404);
    const wishlistIds = user.wishlist || [];
    const products = await Product.find({
      $or: [
        { id: { $in: wishlistIds } },
        { _id: { $in: wishlistIds.filter((id) => /^[0-9a-fA-F]{24}$/.test(id)) } }
      ]
    });
    return successResponse(res, { wishlist: products, products });
  } catch (err) {
    return next(err);
  }
};

export const toggleWishlist = async (req, res, next) => {
  try {
    const user = await User.findOne(userFilter(req.userId));
    if (!user) return errorResponse(res, 'User not found', 404);
    const currentWishlist = user.wishlist || [];
    const index = currentWishlist.indexOf(req.params.productId);
    const inWishlist = index < 0;
    if (inWishlist) currentWishlist.push(req.params.productId);
    else currentWishlist.splice(index, 1);
    user.wishlist = currentWishlist;
    await user.save();
    return successResponse(res, { inWishlist, wishlist: user.wishlist });
  } catch (err) {
    return next(err);
  }
};
