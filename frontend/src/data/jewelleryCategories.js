export const ARTIFICIAL_JEWELLERY = {
  name: 'Artificial Jewellery',
  slug: 'artificial-jewellery',
  description: 'Explore statement fashion jewellery for everyday wear, celebrations and bridal looks.',
  subcategories: [
    'Earrings',
    'Necklaces & Sets',
    'Rings',
    'Bangles & Bracelets',
    'Pendants',
    'Bridal Jewellery',
    'Jewellery Sets',
    'Couple Jewellery',
    'Personalised Jewellery',
    'Anklets',
    'Gift Boxes'
  ]
};

export const ARTIFICIAL_JEWELLERY_IMAGES = {
  Earrings: '/images/artificial-jewellery/earrings.jpg',
  'Necklaces & Sets': '/images/artificial-jewellery/necklaces.jpg',
  Rings: '/images/artificial-jewellery/rings.jpg',
  'Bangles & Bracelets': '/images/artificial-jewellery/bangles.jpg',
  Pendants: '/images/artificial-jewellery/pendants.jpg',
  'Bridal Jewellery': '/images/artificial-jewellery/bridal.jpg',
  'Jewellery Sets': '/images/artificial-jewellery/sets.jpg',
  'Couple Jewellery': '/images/artificial-jewellery/couple.jpg',
  'Personalised Jewellery': '/images/artificial-jewellery/personalised.jpg',
  Anklets: '/images/artificial-jewellery/anklets.jpg',
  'Gift Boxes': '/images/artificial-jewellery/gift-boxes.jpg'
};

export const REMOVED_JEWELLERY_PRODUCT_IDS = [
  'prod_diamond_ring',
  'prod_peacock_cocktail_ring',
  'prod_eternity_band',
  'prod_emerald_gold_ring',
  'prod_floral_signet_ring'
];

const seedImageReplacements = {
  prod_choker: {
    source: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
    replacement: '/images/artificial-jewellery/choker-stock-rose.jpg'
  },
  prod_rosegold_diamond_choker: {
    source: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=85',
    replacement: '/images/artificial-jewellery/choker-stock-diamond.jpg'
  },
  prod_rosegold_floral_choker: {
    source: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1200&q=85',
    replacement: '/images/artificial-jewellery/choker-stock-floral.jpg'
  },
  prod_rosegold_emerald_choker: {
    source: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85',
    replacement: '/images/artificial-jewellery/necklace-editorial.jpg'
  },
  prod_rosegold_pearl_choker: {
    source: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=85',
    replacement: '/images/artificial-jewellery/choker-stock-pearl.jpg'
  },
  prod_solitaire_studs: {
    source: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1200&q=85',
    replacement: '/images/artificial-jewellery/studs-stock.jpg'
  },
  prod_tikka: {
    source: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
    replacement: '/images/artificial-jewellery/tikka-stock.jpg'
  },
  prod_pendant_chain: {
    source: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES.Pendants
  },
  prod_temple_danglers: {
    source: '/images/products/jewellery_temple_gold_jhumkas.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES.Earrings
  },
  prod_filigree_jhumka: {
    source: '/images/products/jewellery_temple_gold_jhumkas.jpg',
    replacement: '/images/artificial-jewellery/jewellery-editorial.jpg'
  },
  prod_polki_bridal_set: {
    source: '/images/products/jewellery_royal_kundan_haar.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES['Jewellery Sets']
  },
  prod_kundan_chandbalis: {
    source: '/images/products/jewellery_kundan_chandbalis.jpg',
    replacement: '/images/artificial-jewellery/jhumka-stock-closeup.jpg'
  },
  prod_gold_locket: {
    source: '/images/products/jewellery_lakshmi_gold_locket.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES.Pendants
  },
  prod_ganesha_pendant: {
    source: '/images/products/jewellery_gold_ganesha_pendant.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES.Pendants
  },
  prod_evil_eye_pendant: {
    source: '/images/products/jewellery_evil_eye_pendant.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES.Pendants
  },
  prod_om_sacred_locket: {
    source: '/images/products/jewellery_sacred_om_locket.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES.Pendants
  },
  prod_temple_kasu_set: {
    source: '/images/products/jewellery_royal_kundan_haar.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES['Necklaces & Sets']
  },
  prod_guluband_collar_set: {
    source: '/images/products/jewellery_royal_kundan_haar.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES['Personalised Jewellery']
  },
  prod_nakshi_kada: {
    source: '/images/products/jewellery_nakshi_temple_kada.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES.Anklets
  },
  prod_filigree_kangan: {
    source: '/images/products/jewellery_nakshi_temple_kada.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES['Gift Boxes']
  },
  prod_peacock_temple_cuff: {
    source: '/images/products/jewellery_nakshi_temple_kada.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES['Bridal Jewellery']
  },
  prod_ruby_gold_bangles: {
    source: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=85',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES['Bangles & Bracelets']
  },
};

const seedImageReplacementsBySlug = {
  'antique-22k-gold-guluband-collar-earrings-suite': {
    source: '/images/products/jewellery_royal_kundan_haar.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES['Personalised Jewellery']
  },
  'mughal-polki-emerald-grand-bridal-haar-set': {
    source: '/images/products/jewellery_royal_kundan_haar.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES['Jewellery Sets']
  },
  'south-indian-temple-gold-kasu-mala-bridal-set': {
    source: '/images/products/jewellery_royal_kundan_haar.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES['Necklaces & Sets']
  },
  'royal-22k-gold-kundan-bridal-haar-set': {
    source: '/images/products/jewellery_royal_kundan_haar.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES['Bridal Jewellery']
  },
  '22k-solid-gold-carved-antique-kangan-set-of-2': {
    source: '/images/products/jewellery_nakshi_temple_kada.jpg',
    replacement: '/images/artificial-jewellery/bangles-stock-ornate.jpg'
  },
  'royal-nakshi-lakshmi-temple-kada': {
    source: '/images/products/jewellery_nakshi_temple_kada.jpg',
    replacement: '/images/artificial-jewellery/bangles-stock-mehndi.jpg'
  },
  'royal-jaipur-openable-filigree-gold-bangle': {
    source: '/images/products/jewellery_nakshi_temple_kada.jpg',
    replacement: '/images/artificial-jewellery/bangles-stock-bracelets.jpg'
  },
  'antique-finish-22k-gold-peacock-kada-cuff': {
    source: '/images/products/jewellery_nakshi_temple_kada.jpg',
    replacement: '/images/artificial-jewellery/bangles-stock-black.jpg'
  },
  '22k-solid-gold-peacock-temple-jhumkas': {
    source: '/images/products/jewellery_temple_gold_jhumkas.jpg',
    replacement: ARTIFICIAL_JEWELLERY_IMAGES.Earrings
  },
  'antique-22k-gold-lakshmi-temple-danglers': {
    source: '/images/products/jewellery_temple_gold_jhumkas.jpg',
    replacement: '/images/artificial-jewellery/jhumka-stock-closeup.jpg'
  },
  'traditional-rajasthani-filigree-22k-gold-jhumkas': {
    source: '/images/products/jewellery_temple_gold_jhumkas.jpg',
    replacement: '/images/artificial-jewellery/jhumka-stock-mehndi.jpg'
  }
};

const jewelleryTerms = new Set(['jewellery', 'jewelry', 'artificial jewellery', 'fashion jewellery']);

const subcategoryKeywords = {
  Earrings: ['earring', 'earrings', 'jhumka', 'jhumkas', 'chandbali', 'chandbalis', 'chand bali', 'ear stud', 'studs', 'hoop earrings', 'danglers', 'dangler', 'maang tikka'],
  'Necklaces & Sets': ['necklace', 'necklaces', 'haar', 'choker', 'neck chain', 'necklace set', 'neck set', 'collar', 'guluband', 'mala'],
  Rings: ['ring', 'rings', 'band', 'bands'],
  'Bangles & Bracelets': ['bangle', 'bangles', 'bracelet', 'bracelets', 'kada', 'kadas', 'kangan', 'churi', 'churis', 'cuff bracelet'],
  Pendants: ['pendant', 'pendants', 'locket', 'lockets', 'talisman', 'mangalsutra'],
  'Bridal Jewellery': ['bridal', 'bride', 'wedding', 'bridal set', 'bridal haar', 'wedding set', 'wedding suite', 'suite'],
  'Jewellery Sets': ['jewellery set', 'jewelry set', 'necklace set', 'necklace and ring set', 'necklace and earrings set'],
  'Couple Jewellery': ['couple jewellery', 'couple jewelry', 'couple ring', 'couple necklace', 'couple bracelet', 'couple set'],
  'Personalised Jewellery': ['personalised', 'personalized', 'custom name', 'name necklace', 'initial necklace'],
  Anklets: ['anklet', 'anklets', 'payal'],
  'Gift Boxes': ['gift box', 'gift boxes', 'gift hamper', 'jewellery box', 'jewelry box']
};

export function isArtificialJewellery(productOrCategory) {
  const category = typeof productOrCategory === 'string'
    ? productOrCategory
    : `${productOrCategory?.category || ''} ${productOrCategory?.categorySlug || ''} ${productOrCategory?.collection || ''}`;
  const normalized = category.toLowerCase().trim();

  return normalized.split(/[\s/_-]+/).some((part) => jewelleryTerms.has(part))
    || normalized.includes('jewellery')
    || normalized.includes('jewelry');
}

export function matchesJewellerySubcategory(product, subcategory) {
  return ARTIFICIAL_JEWELLERY.subcategories.includes(subcategory)
    && getJewellerySubcategory(product) === subcategory;
}

export function getJewellerySubcategory(product) {
  const text = `${product?.name || ''} ${product?.slug || ''}`.toLowerCase();
  const matches = (keywords) => keywords.some((keyword) => {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z])${escapedKeyword}($|[^a-z])`).test(text);
  });

  if (matches(['bridal', 'bride', 'wedding'])) return 'Bridal Jewellery';
  if (matches(subcategoryKeywords['Gift Boxes'])) return 'Gift Boxes';
  if (matches(subcategoryKeywords['Personalised Jewellery'])) return 'Personalised Jewellery';
  if (matches(subcategoryKeywords['Couple Jewellery'])) return 'Couple Jewellery';
  if (matches(subcategoryKeywords.Anklets)) return 'Anklets';
  if (matches(subcategoryKeywords['Jewellery Sets'])) return 'Jewellery Sets';
  if (matches(subcategoryKeywords['Bangles & Bracelets'])) return 'Bangles & Bracelets';
  if (matches(subcategoryKeywords.Rings)) return 'Rings';
  if (matches(subcategoryKeywords.Pendants)) return 'Pendants';
  if (matches(subcategoryKeywords['Necklaces & Sets'])) return 'Necklaces & Sets';
  if (matches(subcategoryKeywords.Earrings)) return 'Earrings';

  return ARTIFICIAL_JEWELLERY.subcategories.includes(product?.subcategory)
    ? product.subcategory
    : 'Necklaces & Sets';
}

export function getProductImages(product) {
  const productImages = Array.isArray(product?.images)
    ? product.images.filter((image) => typeof image === 'string' && image.trim())
    : [];
  const legacyImageReplacement = seedImageReplacementsBySlug[product?.slug]
    || seedImageReplacements[product?.id || product?._id];
  if (legacyImageReplacement && productImages.includes(legacyImageReplacement.source)) {
    return [legacyImageReplacement.replacement];
  }
  if (productImages.length > 0) return productImages;

  return [getProductFallbackImage(product)];
}

export function getProductFallbackImage(product) {
  if (isArtificialJewellery(product)) {
    return ARTIFICIAL_JEWELLERY_IMAGES[getJewellerySubcategory(product)] || '/hero-slide-1.jpg';
  }

  return '/hero-slide-1.jpg';
}

export function getProductImage(product, index = 0) {
  const images = getProductImages(product);
  return images[index] || images[0];
}

export function getProductImageAlt(product) {
  return isArtificialJewellery(product)
    ? `Illustrative stock photo of ${getJewellerySubcategory(product)}; actual item may differ`
    : product?.name || 'Product image';
}
