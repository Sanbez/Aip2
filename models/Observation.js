var mongoose = require('mongoose');

var observationSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  moonPhase: {
    type: String,
    required: true
  },
  observation: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Observation', observationSchema);
