import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import http from "http";
import { Server as SocketServer } from "socket.io";
import aiRoutes from "./routes/ai.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import healthRoutes from "./routes/health.js";
import { notFound, errorHandler } from "./middleware/error.js";
import "./jobs/scheduler.js";
import { sendReminderEmail } from "./utils/mailer.js";

import { initChatSocket } from "./socket/chat.js"; 

const app = express();


const origins = [
  "http://localhost:5173",
  "https://id-ten.vercel.app" // your frontend domain
];

  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (origins.includes(origin)) return cb(null, true);
    return cb(new Error("CORS: Origin not allowed"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

/** Security & perf */
app.use(helmet());
app.use(compression());

/** Logging & parsers */
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/ai", aiRoutes);
/** Rate limiting */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

/** Routes (basic) */
app.get("/", (req, res) => res.send("TaskFlow API is running"));
app.use("/api/health", healthRoutes);
if (authRoutes) app.use("/api/auth", authRoutes);
if (taskRoutes) app.use("/api/tasks", taskRoutes);

/** 404 + error handler */
app.use(notFound);
app.use(errorHandler);

/** —————— HTTP + socket.io setup —————— */
const server = http.createServer(app);

// create io AFTER server is created
const io = new SocketServer(server, {
  cors: {
    origin: origins,
    credentials: true,
  },
});

// store io on app so routes can use it
app.set("io", io);

// initialize any socket modules that need `io`
// ensure initChatSocket exists and is imported above
if (typeof initChatSocket === "function") {
  initChatSocket(io);
}

// socket connection logging
io.on("connection", (socket) => {
  console.log("🟢  Client connected:", socket.id);
  socket.on("disconnect", () => console.log("🔴  Client disconnected:", socket.id));
});

/** Start server after DB connection */
const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI).then(() => {
  server.listen(PORT, () => console.log(`🚀  Server on http://localhost:${PORT}`));
}).catch(err => {
  console.error("Failed to connect to DB:", err);
  process.exit(1);
});
