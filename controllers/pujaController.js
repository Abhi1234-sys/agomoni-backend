const Puja = require('../models/Puja');
const NodeCache = require('node-cache');

// Initialize cache with 5 hour TTL (Time To Live)
const myCache = new NodeCache({ stdTTL: 18000 });

// @desc    Get all pujas
// @route   GET /api/pujas
exports.getAllPujas = async (req, res) => {
  try {
    // 1. Check if data exists in cache
    if (myCache.has('all_pujas')) {
      return res.status(200).json(JSON.parse(myCache.get('all_pujas')));
    }

    // 2. Fetch from MongoDB if cache miss
    const pujas = await Puja.find().sort({ createdAt: -1 });

    // 3. Save result to cache
    myCache.set('all_pujas', JSON.stringify(pujas));

    res.status(200).json(pujas);
  } catch (error) {
    console.error("Error fetching pujas:", error);
    res.status(500).json({ message: "Failed to fetch pujas" });
  }
};

// @desc    Create a new puja
// @route   POST /api/pujas
exports.createPuja = async (req, res) => {
  try {
    const newPuja = new Puja(req.body);
    const savedPuja = await newPuja.save();

    // Invalidate cache on new creation
    myCache.del('all_pujas');

    res.status(201).json(savedPuja);
  } catch (error) {
    console.error("Error creating puja:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a puja
// @route   PUT /api/pujas/:id
exports.updatePuja = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPuja = await Puja.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPuja) {
      return res.status(404).json({ message: "Puja not found" });
    }

    // Invalidate cache on update
    myCache.del('all_pujas');

    res.status(200).json(updatedPuja);
  } catch (error) {
    console.error("Error updating puja:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a puja
// @route   DELETE /api/pujas/:id
exports.deletePuja = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPuja = await Puja.findByIdAndDelete(id);

    if (!deletedPuja) {
      return res.status(404).json({ message: "Puja not found" });
    }

    // Invalidate cache on delete
    myCache.del('all_pujas');

    res.status(200).json({ message: "Puja deleted successfully" });
  } catch (error) {
    console.error("Error deleting puja:", error);
    res.status(500).json({ message: error.message });
  }
};
//cache warming
export const warmPujaCache = async () => {
  try {
    const pujas = await Puja.find();
    myCache.set('all_pujas', pujas); // অথবা আপনার ব্যবহৃত cache key টি লিখুন
    console.log('🔥 Puja Cache Warmed Successfully!');
  } catch (error) {
    console.error('❌ Puja Cache Warming Failed:', error.message);
  }
};