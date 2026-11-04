const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/Category');

// 1. Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 2. Get single category by slug or id
router.get('/:slugOrId', async (req, res) => {
  try {
    const { slugOrId } = req.params;
    let category;

    if (mongoose.Types.ObjectId.isValid(slugOrId)) {
      category = await Category.findById(slugOrId);
    }

    if (!category) {
      category = await Category.findOne({ slug: slugOrId.toLowerCase() });
    }

    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 3. Create category
router.post('/', async (req, res) => {
  try {
    const { name, slug, itemCount, image, description, subcategories } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: 'Category name is required' });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const category = new Category({
      name,
      slug: generatedSlug,
      itemCount: itemCount || 0,
      image: image || '',
      description: description || '',
      subcategories: subcategories || [],
    });

    const savedCategory = await category.save();
    res.status(201).json({ success: true, message: 'Category created successfully', data: savedCategory });
  } catch (error) {
    console.error('Error creating category:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'Category with this slug already exists' });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 4. Update category
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid category ID' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category updated successfully', data: updatedCategory });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 5. Delete category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid category ID' });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
