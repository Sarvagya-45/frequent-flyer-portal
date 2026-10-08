import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import frequentFlyerRoutes from "./routes/frequentFlyerRoutes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_ORIGIN
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "frequent-flyer-portal-api"
  });
});

app.use("/api/frequent-flyer", frequentFlyerRoutes);

app.use((_req, res) => {
  res.status(404).json({
    message: "API route not found"
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Frequent Flyer API running on http://localhost:${PORT}`);
});
