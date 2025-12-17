import Package from "../models/Package.js";

// Create new package
export const createPackage = async (req, res) => {
  try {
    const packageData = await Package.create(req.body);
    res.status(201).json(packageData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all packages
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get package by ID
export const getPackageById = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(packageData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update package
export const updatePackage = async (req, res) => {
  try {
    const packageData = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(packageData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete package
export const deletePackage = async (req, res) => {
  try {
    const packageData = await Package.findByIdAndDelete(req.params.id);
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json({ message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

