import dotenv from "dotenv";

dotenv.config();

const { API_PORT, DATABASE, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export default {
  apiPort: parseInt(API_PORT as string, 10) || 3000,
  databaseConnection: DATABASE,
  jwtSecret: JWT_SECRET || "Secret Key",
  jwtExpiration: JWT_EXPIRES_IN || "7D",
};
