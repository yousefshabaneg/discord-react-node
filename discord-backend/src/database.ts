import config from "./config";

import mongoose, { MongooseError } from "mongoose";

const connectionString = config.databaseConnection;
mongoose
  .connect(connectionString as string)
  .then(() => console.log("DB Connected Successfully"))
  .catch((err: MongooseError) => console.log("Mongo Error: ", err));
