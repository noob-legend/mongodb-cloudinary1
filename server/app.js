import express from "express";
import connectDB from "./config/db.js";
import env from "dotenv";
import router from "./routers/photoRouters.js";
import cors from "cors";

env.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/photos", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server berjalan di port ", PORT);
});
