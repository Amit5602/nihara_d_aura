const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// 1. Get all products (with filtering, search, sorting, and pagination)
router.get('/', async (req, res) => {
  try {
    const {
      category,
      categorySlug,
      subcategory,
      isFeatured,
      isBestseller,
      search,
      sort,
      page = 1,
      limit = 100,
    } = req.query;

    const query = {};

    if (category) {
      query.category = new RegExp(`^${category}$`, 'i');
    }
    if (categorySlug) {
      query.categorySlug = categorySlug.toLowerCase();
    }
    if (subcategory) {
      query.subcategory = new RegExp(`^${subcategory}$`, 'i');
    }
    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }
    if (isBestseller !== undefined) {
      query.isBestseller = isBestseller === 'true';
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { subcategory: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    else if (sort === 'price_desc') sortOptions = { price: -1 };
    else if (sort === 'rating') sortOptions = { rating: -1 };
    else if (sort === 'name') sortOptions = { name: 1 };

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);
    const skip = (parsedPage - 1) * parsedLimit;

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortOptions).skip(skip).limit(parsedLimit),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 2. Get single product by slug or id
router.get('/:slugOrId', async (req, res) => {
  try {
    const { slugOrId } = req.params;
    let product;

    if (mongoose.Types.ObjectId.isValid(slugOrId)) {
      product = await Product.findById(slugOrId);
    }

    if (!product) {
      product = await Product.findOne({ slug: slugOrId.toLowerCase() });
    }

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 3. Create a new product
router.post('/', async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      categorySlug,
      subcategory,
      price,
      originalPrice,
      discountPercent,
      rating,
      reviewCount,
      images,
      description,
      variants,
      sizes,
      features,
      stock,
      isFeatured,
      isBestseller,
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, error: 'name, price, and category are required' });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const generatedCategorySlug = categorySlug || category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const product = new Product({
      name,
      slug: generatedSlug,
      category,
      categorySlug: generatedCategorySlug,
      subcategory,
      price,
      originalPrice,
      discountPercent,
      rating,
      reviewCount,
      images,
      description,
      variants,
      sizes,
      features,
      stock,
      isFeatured,
      isBestseller,
    });

    const savedProduct = await product.save();
    res.status(201).json({ success: true, message: 'Product created successfully', data: savedProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'Product with this slug already exists' });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 4. Update a product by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid product ID' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 5. Delete a product by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid product ID' });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
