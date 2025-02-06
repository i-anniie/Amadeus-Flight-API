import express from "express";
import authRoutes from "./routes/authRoutes.js";
import profileRotes from "./routes/profileRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRotes);
app.use("/api/flights", flightRoutes);

export default app;
