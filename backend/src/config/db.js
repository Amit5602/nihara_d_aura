import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { seedDatabaseIfEmpty } from './seed.js';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI or MONGODB_URI must be configured');
  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log(`[Database] MongoDB Live Connected: ${conn.connection.host}`);
  await seedDatabaseIfEmpty();
  const removedRingProducts = await Product.deleteMany({
    id: {
      $in: [
        'prod_diamond_ring',
        'prod_peacock_cocktail_ring',
        'prod_eternity_band',
        'prod_emerald_gold_ring',
        'prod_floral_signet_ring'
      ]
    }
  });
  if (removedRingProducts.deletedCount > 0) {
    console.log(`[Migration] Removed ${removedRingProducts.deletedCount} ring products from the catalog.`);
  }
  const imageFix = await Product.updateOne(
    {
      slug: 'warm-spiced-chai-vanilla-aromatherapy-melts',
      'images.0': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85'
    },
    {
      $set: {
        'images.0': 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85'
      }
    }
  );
  if (imageFix.modifiedCount > 0) {
    console.log('[Migration] Corrected the wax melts product image.');
  }
  return true;
};
