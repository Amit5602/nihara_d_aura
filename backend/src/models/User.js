import mongoose from 'mongoose';

const LEGACY_DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d';

const UserSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: false, default: '', trim: true },
  password: { type: String, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String, default: '' },
  tier: { type: String, enum: ['Silver', 'Gold', 'Royal Elite', 'Royal Patron', 'Master Admin'], default: 'Royal Elite' },
  rewardPoints: { type: Number, default: 450 },
  wishlist: [{ type: String }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret.id || ret._id.toString();
      if (ret.avatar === LEGACY_DEFAULT_AVATAR) ret.avatar = '';
      return ret;
    }
  }
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
