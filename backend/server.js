import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import frequentFlyerRoutes from "./routes/frequentFlyerRoutes.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // such as curl or direct server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "frequent-flyer-portal-api",
  });
});

app.use("/api/frequent-flyer", frequentFlyerRoutes);

app.use((_req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "CORS origin not allowed",
    });
  }

  res.status(500).json({
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Frequent Flyer API running on http://localhost:${PORT}`);
});
