const Animal = require("../models/Animal");
const sendResponse = require("../utils/responseHandler");

// Get all animals
const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    sendResponse(res, 200, true, animals, "Animals fetched successfully");
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to fetch animals");
  }
};

// Get a single animal by ID
const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return sendResponse(res, 404, false, null, "Animal not found");
    }
    sendResponse(res, 200, true, animal, "Animal fetched successfully");
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to fetch animal");
  }
};

// Add a new animal
const createAnimal = async (req, res) => {
  const { name, category, price, description, image } = req.body;

  try {
    const animal = new Animal({ name, category, price, description, image });
    const savedAnimal = await animal.save();
    sendResponse(res, 201, true, savedAnimal, "Animal added successfully");
  } catch (error) {
    sendResponse(res, 400, false, null, "Failed to add animal");
  }
};

// Update an animal by ID
const updateAnimal = async (req, res) => {
  const { name, category, price, description, image } = req.body;

  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      { name, category, price, description, image },
      { new: true }
    );

    if (!updatedAnimal) {
      return sendResponse(res, 404, false, null, "Animal not found");
    }

    sendResponse(res, 200, true, updatedAnimal, "Animal updated successfully");
  } catch (error) {
    sendResponse(res, 400, false, null, "Failed to update animal");
  }
};

// Delete an animal by ID
const deleteAnimal = async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);

    if (!deletedAnimal) {
      return sendResponse(res, 404, false, null, "Animal not found");
    }

    sendResponse(res, 200, true, null, "Animal deleted successfully");
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to delete animal");
  }
};

module.exports = {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};
