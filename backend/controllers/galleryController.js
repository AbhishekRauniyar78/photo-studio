import Photo from "../models/Photo.js";

// Create new photo
export const createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);
    res.status(201).json(photo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all photos
export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get photo by ID
export const getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json(photo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update photo
export const updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json(photo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete photo
export const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json({ message: "Photo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

