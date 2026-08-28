const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema(
  {
    spotName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    forPandal: {
      type: String,
      default: '',
    },
    mapLink: {
      type: String,
      default: '',
    },
    capacity: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Parking', parkingSchema);