const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");

dotenv.config(); // Load environment variables

const app = express();

// Connect to Database
connectDB()
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1); // Stop the server if DB connection fails
  });

// Middleware
app.use(cors());
app.use(express.json()); // Ensures API can handle JSON requests

// Routes
app.use("/api/auth", authRoutes);

// Handle undefined routes (404)
app.use((req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
