import fs from 'fs';
import path from 'path';
import { productImagesMap } from './test90UniqueImages.js';
import { fullProductsList } from './generateProductsData.js';

// Apply unique images to every product
const updatedProducts = fullProductsList.map(product => {
  const uniqueImages = productImagesMap[product.id];
  if (!uniqueImages || uniqueImages.length === 0) {
    throw new Error(`Missing image for product ${product.id}`);
  }
  return {
    ...product,
    images: uniqueImages
  };
});

// 1. Update scripts/generateProductsData.js
const generateProductsFile = path.resolve('scripts/generateProductsData.js');
const newFileContent = `import fs from 'fs';\nimport path from 'path';\n\nexport const fullProductsList = ${JSON.stringify(updatedProducts, null, 2)};\n`;
fs.writeFileSync(generateProductsFile, newFileContent, 'utf8');
console.log('Updated scripts/generateProductsData.js');

// 2. Update frontend/src/services/mockData.js
const mockDataPath = path.resolve('frontend/src/services/mockData.js');
let mockDataContent = fs.readFileSync(mockDataPath, 'utf8');
const productsRegex = /products:\s*\[[\s\S]*?\],\s*services:/;
const newProductsString = `products: ${JSON.stringify(updatedProducts, null, 2)},\n  services:`;
mockDataContent = mockDataContent.replace(productsRegex, newProductsString);
fs.writeFileSync(mockDataPath, mockDataContent, 'utf8');
console.log('Updated frontend/src/services/mockData.js');

// 3. Update backend/src/data/initialData.js
const initialDataPath = path.resolve('backend/src/data/initialData.js');
let initialDataContent = fs.readFileSync(initialDataPath, 'utf8');
const backendProductsRegex = /products:\s*\[[\s\S]*?\],\s*services:/;
const newBackendProductsString = `products: ${JSON.stringify(updatedProducts, null, 2)},\n  services:`;
initialDataContent = initialDataContent.replace(backendProductsRegex, newBackendProductsString);
fs.writeFileSync(initialDataPath, initialDataContent, 'utf8');
console.log('Updated backend/src/data/initialData.js');

// 4. Update backend/src/data/liveStore.json
const liveStorePath = path.resolve('backend/src/data/liveStore.json');
if (fs.existsSync(liveStorePath)) {
  const liveStore = JSON.parse(fs.readFileSync(liveStorePath, 'utf8'));
  liveStore.products = updatedProducts;
  fs.writeFileSync(liveStorePath, JSON.stringify(liveStore, null, 2), 'utf8');
  console.log('Updated backend/src/data/liveStore.json');
}

console.log('Successfully applied unique images to all current products!');
