const mongoose = require('mongoose');

const pujaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    theme: {
      type: String,
      default: '',
    },
    mapLink: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    //Resturant name and map link
    restaurant1: { type: String, default: '' },
    restaurant1Map: { type: String, default: '' },
    restaurant2: { type: String, default: '' },
    restaurant2Map: { type: String, default: '' },
    restaurant3: { type: String, default: '' },
    restaurant3Map: { type: String, default: '' },
    //Nxt Puja pandal name and map link
    nextPuja1: { type: String, default: '' },
    nextPuja1Map: { type: String, default: '' },
    nextPuja2: { type: String, default: '' },
    nextPuja2Map: { type: String, default: '' },
    //Parking and Toilet
    parking: { type: String, default: '' },
    toilet: { type: String, default: '' },
  },
  {
    timestamps: true,
    autoIndex: false,
  }
);

const Puja = mongoose.model('Puja', pujaSchema);

Puja.collection.dropIndexes().catch(() => {});

module.exports = Puja;