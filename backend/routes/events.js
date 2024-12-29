const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to check JWT and extract user ID
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Create event route
router.post('/events', authMiddleware, async (req, res) => {
  const { name, description, location, category, date } = req.body;
  const userId = req.user;  // From token verification

  const newEvent = new Event({
    name,
    description,
    location,
    category,
    date,
    userId, // Store userId
    createdBy: userId, // Store createdBy field
  });

  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fetch user's events route
router.get('/events', authMiddleware, async (req, res) => {
  const userId = req.user; // From token verification

  try {
    const events = await Event.find({ userId }); // Fetch events for the logged-in user
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// RSVP route
router.post('/events/rsvp/:eventId', authMiddleware, async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user; // From token verification

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user has already RSVPed
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ msg: 'You have already RSVPed' });
    }

    event.attendees.push(userId); // Add user to attendees list
    await event.save();

    res.status(200).json({ msg: 'RSVP successful', event });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get a single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name');
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// RSVP to an event
router.post('/:id/rsvp', authMiddleware, async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    if (event.attendees.includes(userId)) {
      return res.status(400).json({ msg: 'Already RSVP to this event' });
    }

    event.attendees.push(userId);
    await event.save();

    res.json({ msg: 'RSVP successful', attendees: event.attendees.length });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete an event (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    if (event.createdBy.toString() !== req.user.toString()) {
      return res.status(403).json({ msg: 'Not authorized to delete this event' });
    }

    await event.remove();
    res.json({ msg: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update an event (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, description, location, category, startDate, endDate } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    if (event.createdBy.toString() !== req.user.toString()) {
      return res.status(403).json({ msg: 'Not authorized to update this event' });
    }

    event.name = name || event.name;
    event.description = description || event.description;
    event.location = location || event.location;
    event.category = category || event.category;
    event.startDate = startDate || event.startDate;
    event.endDate = endDate || event.endDate;

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
