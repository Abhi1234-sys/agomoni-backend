const Restaurant = require('../models/Restaurant');
const Parking = require('../models/Parking');
const Toilet = require('../models/Toilet');

//  RESTAURANTS
exports.getAllRestaurants = async (req, res) => {
  try {
    const data = await Restaurant.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRestaurant = async (req, res) => {
  try {
    const item = new Restaurant(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const item = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PARKING
exports.getAllParkings = async (req, res) => {
  try {
    const data = await Parking.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createParking = async (req, res) => {
  try {
    const item = new Parking(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateParking = async (req, res) => {
  try {
    const item = await Parking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteParking = async (req, res) => {
  try {
    await Parking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//TOILETS
exports.getAllToilets = async (req, res) => {
  try {
    const data = await Toilet.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createToilet = async (req, res) => {
  try {
    const item = new Toilet(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateToilet = async (req, res) => {
  try {
    const item = await Toilet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteToilet = async (req, res) => {
  try {
    await Toilet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};