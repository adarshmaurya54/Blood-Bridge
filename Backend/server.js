const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Dotenv config
dotenv.config();

// MongoDB connection
connectDB();

// Create Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conditional logging for production
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined")); // Production logging
} else {
  app.use(morgan("dev")); // Development logging
}

// Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Handle all other routes by sending the frontend's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  console.log("Running in development mode.");
}
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes and redirect them to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Port Configuration
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.bgBlue.white
  );
});
