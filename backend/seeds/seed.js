const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log(`Connected to database: ${mongoose.connection.name}`);

    const db = mongoose.connection.db;
    const collectionsToSeed = ['categories', 'products', 'services', 'artists', 'users'];

    for (const name of collectionsToSeed) {
      const filePath = path.join(__dirname, `${name}.json`);
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);

        if (Array.isArray(data) && data.length > 0) {
          const currentCount = await db.collection(name).countDocuments();
          if (currentCount === 0) {
            console.log(`Seeding collection '${name}' with ${data.length} documents...`);
            // Convert string $oid or date if needed, or insert directly
            const formatted = data.map(doc => {
              if (doc._id && typeof doc._id === 'string' && doc._id.length === 24) {
                doc._id = new mongoose.Types.ObjectId(doc._id);
              }
              if (doc.createdAt) doc.createdAt = new Date(doc.createdAt);
              if (doc.updatedAt) doc.updatedAt = new Date(doc.updatedAt);
              return doc;
            });
            await db.collection(name).insertMany(formatted);
            console.log(`Successfully seeded '${name}'!`);
          } else {
            console.log(`Collection '${name}' already has ${currentCount} documents. Skipping.`);
          }
        }
      }
    }

    console.log('Seeding process completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
