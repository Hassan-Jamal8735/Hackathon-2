const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    category: String,
    date: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Added userId
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Added createdBy
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
