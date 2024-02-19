import { Application } from "express";

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app: Application = express();
app.use(express.json());
app.use(cors());

//Routes

app.use("/api/auth", authRoutes);
export default app;
