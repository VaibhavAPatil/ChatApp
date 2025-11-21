// 1. Load .env first
import dotenv from "dotenv";
dotenv.config();

// 2. Import packages
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

// 3. Import custom files (these may need .env variables)
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

// Express Instance
const app = express();

// 4. Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// 6. Connect to DB Note: Used Iffe
(async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
})();

// 7. Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server is running on port http://localhost:${port}`);
});
