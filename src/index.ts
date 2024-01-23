import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const mongoURL = process.env.DB_URL;

if (!mongoURL) throw Error("Missing db url");

mongoose.connect(mongoURL).then(() => {
  const PORT = parseInt(process.env.PORT || "3000");

  app.listen(PORT, () => {
    console.log(`Backend listening on ${PORT}`);
  });
});