const Event = require('../models/Event');

// Create Event
const createEvent = async (req, res) => {
  const { title, description, date, location, category, visibility } = req.body;
  try {
    const newEvent = new Event({ title, description, date, location, category, visibility });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get All Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(400).send(error);
  }
};

// RSVP to Event
const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).send('Event not found');
    event.addAttendee(req.userId);
    res.json(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { createEvent, getEvents, rsvpEvent };
