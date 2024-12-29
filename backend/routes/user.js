const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth'); // User authentication middleware
const router = express.Router();

// Get upcoming events
router.get('/events/upcoming', auth, async (req, res) => {
  try {
    const events = await Event.find({ startDate: { $gte: new Date() } }).sort({ startDate: 1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get past events
router.get('/events/past', auth, async (req, res) => {
  try {
    const events = await Event.find({ startDate: { $lt: new Date() } }).sort({ startDate: -1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// RSVP to an event
router.post('/events/:id/rsvp', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'Event not found' });

    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
    }

    res.json({ msg: 'RSVP successful', rsvpCount: event.attendees.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get attendees of an event
router.get('/events/:id/attendees', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name email');

    if (!event) return res.status(404).json({ msg: 'Event not found' });

    res.json({ attendees: event.attendees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
