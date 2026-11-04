import fs from 'fs';
import path from 'path';
import { fullProductsList } from './generateProductsData.js';

const mockDataPath = path.resolve('frontend/src/services/mockData.js');
const initialDataPath = path.resolve('backend/src/data/initialData.js');
const liveStorePath = path.resolve('backend/src/data/liveStore.json');

// 1. Update frontend/src/services/mockData.js
let mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

// Replace categories counts
mockDataContent = mockDataContent.replace(
  /id:\s*"cat_makeup"[\s\S]*?itemCount:\s*\d+/,
  (match) => match.replace(/itemCount:\s*\d+/, 'itemCount: 20')
);
mockDataContent = mockDataContent.replace(
  /id:\s*"cat_jewellery"[\s\S]*?itemCount:\s*\d+/,
  (match) => match.replace(/itemCount:\s*\d+/, 'itemCount: 30')
);
mockDataContent = mockDataContent.replace(
  /id:\s*"cat_nails"[\s\S]*?itemCount:\s*\d+/,
  (match) => match.replace(/itemCount:\s*\d+/, 'itemCount: 20')
);
mockDataContent = mockDataContent.replace(
  /id:\s*"cat_candles"[\s\S]*?itemCount:\s*\d+/,
  (match) => match.replace(/itemCount:\s*\d+/, 'itemCount: 20')
);

// Replace products: [ ... ] with fullProductsList
const productsRegex = /products:\s*\[[\s\S]*?\],\s*services:/;
const newProductsString = `products: ${JSON.stringify(fullProductsList, null, 2)},\n  services:`;

if (!productsRegex.test(mockDataContent)) {
  throw new Error("Could not find products array in mockData.js");
}
mockDataContent = mockDataContent.replace(productsRegex, newProductsString);
fs.writeFileSync(mockDataPath, mockDataContent, 'utf8');
console.log('Updated mockData.js successfully!');

// 2. Update backend/src/data/initialData.js
let initialDataContent = fs.readFileSync(initialDataPath, 'utf8');

const updatedCategories = [
  {
    id: "cat_makeup",
    name: "Makeup Services & Products",
    slug: "makeup",
    itemCount: 20,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    description: "Weightless silk formulations, molten metallics, and bridal perfection crafted for timeless radiance.",
    subcategories: ["Face Foundations", "Lipsticks & Gloss", "Eyeshadow Palettes", "Blushes & Highlighters"]
  },
  {
    id: "cat_jewellery",
    name: "Handcrafted 22K Real Gold & Diamond Jewellery",
    slug: "jewellery",
    itemCount: 30,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
    description: "BIS 22K/18K Hallmarked gold jhumkas, bridal haar sets, 24K gold lockets & pendants, solitaire rings, and antique gold bangles.",
    subcategories: ["Gold Earrings & Jhumkas", "Bridal Haar & Sets", "Gold Lockets & Pendants", "Temple Gold Bangles", "Gold Rings & Bands", "Rings", "Rose Gold Chokers"]
  },
  {
    id: "cat_nails",
    name: "Nail Extensions & Nail Art",
    slug: "nails",
    itemCount: 20,
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53",
    description: "Salon-grade press-on suites, chrome mirrors, soft gel extensions, and nourishing cuticle elixirs.",
    subcategories: ["Press-On Kits", "Gel Lacquer", "Chrome Nail Art", "Cuticle Elixirs"]
  },
  {
    id: "cat_candles",
    name: "Candles & Home Fragrance",
    slug: "candles",
    itemCount: 20,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59",
    description: "Hand-poured pure soy wax jars, royal mogra reed diffusers, and botanical room mists.",
    subcategories: ["Soy Wax Jar Candles", "Reed Diffusers", "Aroma Room Sprays", "Wax Melts"]
  }
];

// Replace categories in initialData.js
const categoriesRegex = /categories:\s*\[[\s\S]*?\],\s*products:/;
const newCategoriesString = `categories: ${JSON.stringify(updatedCategories, null, 2)},\n  products:`;
initialDataContent = initialDataContent.replace(categoriesRegex, newCategoriesString);

// Replace products in initialData.js
const backendProductsRegex = /products:\s*\[[\s\S]*?\],\s*services:/;
const newBackendProductsString = `products: ${JSON.stringify(fullProductsList, null, 2)},\n  services:`;
initialDataContent = initialDataContent.replace(backendProductsRegex, newBackendProductsString);

fs.writeFileSync(initialDataPath, initialDataContent, 'utf8');
console.log('Updated backend initialData.js successfully!');

// 3. Update backend/src/data/liveStore.json if it exists
if (fs.existsSync(liveStorePath)) {
  try {
    const liveStore = JSON.parse(fs.readFileSync(liveStorePath, 'utf8'));
    liveStore.categories = updatedCategories;
    liveStore.products = fullProductsList;
    fs.writeFileSync(liveStorePath, JSON.stringify(liveStore, null, 2), 'utf8');
    console.log('Updated backend liveStore.json successfully!');
  } catch (err) {
    console.error('Error updating liveStore.json:', err);
  }
}
