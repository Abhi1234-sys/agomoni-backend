const Puja = require('../models/Puja');

// @desc    Get all pujas
// @route   GET /api/pujas
exports.getAllPujas = async (req, res) => {
  try {
    const pujas = await Puja.find().sort({ createdAt: -1 });
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

    res.status(200).json({ message: "Puja deleted successfully" });
  } catch (error) {
    console.error("Error deleting puja:", error);
    res.status(500).json({ message: error.message });
  }
};