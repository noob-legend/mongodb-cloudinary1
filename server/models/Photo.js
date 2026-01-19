import mongoose from "mongoose";

let photoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "cloudinary_pertama",
  },
);

const model = mongoose.model("Photo", photoSchema);
export default model;
