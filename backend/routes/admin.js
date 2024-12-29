const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth'); // Admin authentication middleware
const router = express.Router();

// Create an event
router.post('/events', auth, async (req, res) => {
  try {
    const { name, description, location, category, startDate, endDate } = req.body;
    const event = new Event({
      name,
      description,
      location,
      category,
      startDate,
      endDate,
      createdBy: req.user.id, // Admin ID from JWT
    });
    await event.save();
    res.status(201).json({ msg: 'Event created successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all events with filters
router.get('/events', auth, async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;

    let query = {};
    if (category) query.category = category;
    if (startDate || endDate) {
      query.startDate = {};
      if (startDate) query.startDate.$gte = new Date(startDate);
      if (endDate) query.startDate.$lte = new Date(endDate);
    }

    const events = await Event.find(query).sort({ startDate: 1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update an event
router.put('/events/:id', auth, async (req, res) => {
  try {
    const { name, description, location, category, startDate, endDate } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'Event not found' });

    event.name = name || event.name;
    event.description = description || event.description;
    event.location = location || event.location;
    event.category = category || event.category;
    event.startDate = startDate || event.startDate;
    event.endDate = endDate || event.endDate;

    await event.save();
    res.json({ msg: 'Event updated successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete an event
router.delete('/events/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'Event not found' });

    await event.deleteOne();
    res.json({ msg: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
