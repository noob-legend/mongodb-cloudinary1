import connectdb from "../config/db.js";
import mongoose from "mongoose";

describe("coba keneksi", () => {
  beforeAll(async () => {
    await connectdb();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("hasil koneksi", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
