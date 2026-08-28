const mongoose = require('mongoose');

const toiletSchema = new mongoose.Schema(
  {
    locationInfo: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: String,
      required: true,
      trim: true,
    },
    nearPandal: {
      type: String,
      default: '',
    },
    mapLink: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'Bio-Toilet / Public Washroom',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Toilet', toiletSchema);