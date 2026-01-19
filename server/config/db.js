import mongoose from "mongoose";
import env from "dotenv";

env.config();
const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("database berhasil dikoneksikan");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
export default connectDB;
