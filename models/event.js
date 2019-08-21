const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    attending: false
  });

module.exports = mongoose.model('Event', eventSchema);
