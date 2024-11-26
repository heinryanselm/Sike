import mongoose from "mongoose";
import logger from "../utils/logger";

export default async function connectDB(URL: string) {
  await mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("DB connected successfully");
    })
    .catch((e) => {
      logger.info("DB connection failed: ", e);
    });
}
