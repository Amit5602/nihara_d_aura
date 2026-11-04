const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Artist = require('../models/Artist');

// 1. Get all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find().sort({ rating: -1 });
    res.status(200).json({ success: true, count: artists.length, data: artists });
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 2. Get single artist by id or slug
router.get('/:slugOrId', async (req, res) => {
  try {
    const { slugOrId } = req.params;
    let artist;

    if (mongoose.Types.ObjectId.isValid(slugOrId)) {
      artist = await Artist.findById(slugOrId);
    }

    if (!artist) {
      artist = await Artist.findOne({ slug: slugOrId.toLowerCase() });
    }

    if (!artist) {
      return res.status(404).json({ success: false, error: 'Artist not found' });
    }

    res.status(200).json({ success: true, data: artist });
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 3. Create artist
router.post('/', async (req, res) => {
  try {
    const { name, slug, role, experience, rating, reviewCount, avatar, bio, specialties } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: 'Artist name is required' });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const artist = new Artist({
      name,
      slug: generatedSlug,
      role: role || 'Senior Stylist',
      experience: experience || '5+ Years',
      rating: rating || 5,
      reviewCount: reviewCount || 0,
      avatar: avatar || '',
      bio: bio || '',
      specialties: specialties || [],
    });

    const savedArtist = await artist.save();
    res.status(201).json({ success: true, message: 'Artist created successfully', data: savedArtist });
  } catch (error) {
    console.error('Error creating artist:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 4. Update artist
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid artist ID' });
    }

    const updatedArtist = await Artist.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedArtist) {
      return res.status(404).json({ success: false, error: 'Artist not found' });
    }

    res.status(200).json({ success: true, message: 'Artist updated successfully', data: updatedArtist });
  } catch (error) {
    console.error('Error updating artist:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 5. Delete artist
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid artist ID' });
    }

    const deletedArtist = await Artist.findByIdAndDelete(id);

    if (!deletedArtist) {
      return res.status(404).json({ success: false, error: 'Artist not found' });
    }

    res.status(200).json({ success: true, message: 'Artist deleted successfully' });
  } catch (error) {
    console.error('Error deleting artist:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
