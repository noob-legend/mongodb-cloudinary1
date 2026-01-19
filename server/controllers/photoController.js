import Photo from "../models/Photo.js";
import cloudinary from "../config/cloudinary.js";

// create ==
export const createPhoto = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.file.path,
    ); /* req.file.path ada karena multer membuatnya hasil file  yang di upload*/

    const photo = await Photo.create({
      title: req.body.title,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// read ==
export const getPhotos = async (req, res) => {
  const photos = await Photo.find();
  res.json(photos);
};

// update
export const updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo tidak ditemukan" });
    }

    await cloudinary.uploader.destroy(photo.cloudinaryId);

    const result = await cloudinary.uploader.upload(req.file.path);

    photo.imageUrl = result.secure_url;
    photo.cloudinaryId = result.public_id;
    photo.title = req.body.title || photo.title;

    photo.save();
    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete ==
export const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo tidak ditemukan" });
    }

    await cloudinary.uploader.destroy(photo.cloudinaryId);
    await photo.deleteOne();

    res.json({ message: "photo sudah berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
