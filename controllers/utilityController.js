const NodeCache = require('node-cache');
const Restaurant = require('../models/Restaurant');
const Parking = require('../models/Parking');
const Toilet = require('../models/Toilet');


const utilityCache = new NodeCache({ stdTTL: 18000 });

const CACHE_KEYS = {
  restaurants: 'all_restaurants',
  parkings: 'all_parkings',
  toilets: 'all_toilets',
};

//  RESTAURANTS
exports.getAllRestaurants = async (req, res) => {
  try {
    const cacheKey = CACHE_KEYS.restaurants;

   
    const cachedData = utilityCache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const data = await Restaurant.find().sort({ createdAt: -1 });

  
    utilityCache.set(cacheKey, data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRestaurant = async (req, res) => {
  try {
    const item = new Restaurant(req.body);
    const saved = await item.save();
    utilityCache.del(CACHE_KEYS.restaurants); 
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const item = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    utilityCache.del(CACHE_KEYS.restaurants); 
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    utilityCache.del(CACHE_KEYS.restaurants); 
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PARKING
exports.getAllParkings = async (req, res) => {
  try {
    const cacheKey = CACHE_KEYS.parkings;

    const cachedData = utilityCache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const data = await Parking.find().sort({ createdAt: -1 });

    utilityCache.set(cacheKey, data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createParking = async (req, res) => {
  try {
    const item = new Parking(req.body);
    const saved = await item.save();
    utilityCache.del(CACHE_KEYS.parkings);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateParking = async (req, res) => {
  try {
    const item = await Parking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    utilityCache.del(CACHE_KEYS.parkings);
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteParking = async (req, res) => {
  try {
    await Parking.findByIdAndDelete(req.params.id);
    utilityCache.del(CACHE_KEYS.parkings);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//TOILETS
exports.getAllToilets = async (req, res) => {
  try {
    const cacheKey = CACHE_KEYS.toilets;

    const cachedData = utilityCache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const data = await Toilet.find().sort({ createdAt: -1 });

    utilityCache.set(cacheKey, data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createToilet = async (req, res) => {
  try {
    const item = new Toilet(req.body);
    const saved = await item.save();
    utilityCache.del(CACHE_KEYS.toilets);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateToilet = async (req, res) => {
  try {
    const item = await Toilet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    utilityCache.del(CACHE_KEYS.toilets);
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteToilet = async (req, res) => {
  try {
    await Toilet.findByIdAndDelete(req.params.id);
    utilityCache.del(CACHE_KEYS.toilets);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//cache warming
exports.warmUtilityCache = async () => {
  try {
    const [restaurants, parkings, toilets] = await Promise.all([
      Restaurant.find(),
      Parking.find(),
      Toilet.find()
    ]);

    myCache.set('all_restaurants', restaurants);
    myCache.set('all_parkings', parkings);
    myCache.set('all_toilets', toilets);

    console.log('🔥 Utility Cache Warmed Successfully!');
  } catch (error) {
    console.error('❌ Utility Cache Warming Failed:', error.message);
  }
};