const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Service = require('../models/Service');

// 1. Get all services (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = {};

    if (category) {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    const services = await Service.find(query).sort({ price: 1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 2. Get single service by slug or id
router.get('/:slugOrId', async (req, res) => {
  try {
    const { slugOrId } = req.params;
    let service;

    if (mongoose.Types.ObjectId.isValid(slugOrId)) {
      service = await Service.findById(slugOrId);
    }

    if (!service) {
      service = await Service.findOne({ slug: slugOrId.toLowerCase() });
    }

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 3. Create service
router.post('/', async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      price,
      durationMinutes,
      rating,
      reviewCount,
      image,
      description,
      inclusions,
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, error: 'name, price, and category are required' });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const service = new Service({
      name,
      slug: generatedSlug,
      category,
      price,
      durationMinutes: durationMinutes || 60,
      rating: rating || 5,
      reviewCount: reviewCount || 0,
      image: image || '',
      description: description || '',
      inclusions: inclusions || [],
    });

    const savedService = await service.save();
    res.status(201).json({ success: true, message: 'Service created successfully', data: savedService });
  } catch (error) {
    console.error('Error creating service:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'Service with this slug already exists' });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 4. Update service
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid service ID' });
    }

    const updatedService = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedService) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    res.status(200).json({ success: true, message: 'Service updated successfully', data: updatedService });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 5. Delete service
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid service ID' });
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
