const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ dynamic port (Render / production friendly)
const PORT = process.env.PORT || 5000;

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ API routes (always before static)
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

// ✅ serve frontend
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// ✅ test route (important for debugging)
app.get("/api", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ fallback route (ONLY for non-API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// ✅ start server
app.listen(PORT, () => {
  console.log(" Server started successfully");
  console.log(`http://localhost:${PORT}`);
});