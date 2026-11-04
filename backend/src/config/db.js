import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { ServiceCatalogMigration } from '../models/ServiceCatalogMigration.js';
import { seedDatabaseIfEmpty } from './seed.js';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI or MONGODB_URI must be configured');
  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log(`[Database] MongoDB Live Connected: ${conn.connection.host}`);
  await seedDatabaseIfEmpty();
  const ringProductMigrationKey = 'remove-jewellery-ring-products-v1';
  if (!await ServiceCatalogMigration.exists({ key: ringProductMigrationKey })) {
    const removedRingProducts = await Product.deleteMany({
      $or: [
        {
          id: {
            $in: [
              'prod_diamond_ring',
              'prod_peacock_cocktail_ring',
              'prod_eternity_band',
              'prod_emerald_gold_ring',
              'prod_floral_signet_ring'
            ]
          }
        },
        {
          categorySlug: /^jewellery$/i,
          id: { $ne: 'prod_anti_tarnish_ring' },
          $or: [
            { name: /\b(rings?|bands?)\b/i },
            { slug: /\b(rings?|bands?)\b/i },
            { subcategory: /\b(rings?|bands?)\b/i }
          ]
        }
      ]
    });
    await ServiceCatalogMigration.create({ key: ringProductMigrationKey });
    if (removedRingProducts.deletedCount > 0) {
      console.log(`[Migration] Removed ${removedRingProducts.deletedCount} Ring-category products.`);
    }
  }
  await Product.updateOne(
    { id: 'prod_anti_tarnish_ring' },
    {
      $setOnInsert: {
        id: 'prod_anti_tarnish_ring',
        name: 'Everyday Anti-Tarnish Fashion Ring',
        slug: 'everyday-anti-tarnish-fashion-ring',
        category: 'Jewellery',
        categorySlug: 'jewellery',
        subcategory: 'Rings',
        price: 399,
        originalPrice: 399,
        discountPercent: 0,
        rating: 0,
        reviewCount: 0,
        isFeatured: false,
        isBestseller: false,
        images: ['/images/artificial-jewellery/rings.jpg'],
        description: 'An everyday fashion ring with an anti-tarnish finish. The stock photo is illustrative; the actual design may vary. Keep dry and store separately to help preserve the finish.',
        variants: ['Gold-tone finish'],
        sizes: ['Standard size'],
        features: [
          'Anti-tarnish finish',
          'Everyday fashion jewellery',
          'Illustrative stock photo; actual item may differ'
        ],
        stock: 0,
        status: 'Live'
      }
    },
    { upsert: true }
  );
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
